from fastapi import HTTPException
from typing import List

from app.archive.exception import NotFoundException


class MovieDetail:

    name_kr: str
    name_en: str
    poster_path: str
    released_date: str
    rating: str
    plot: str
    box_office: str
    running_time: str
    genres: List[str]
    keywords: List[str]
    companies: List[str]
    actors: List[str]
    crews: List[str]
    source: dict

    def __init__(self, detail: dict):
        self.source = detail['_source']

    def parse(self, details: bool = False) -> dict:
        self.name_kr = self.source['name_kr']
        self.name_en = self.source['name_en']
        self.poster_path = self.source['poster_path'] if len(self.source['poster_path']) > 0 else None
        self.released_date = self.source['released_date'] if self.source['released_date'] != '1500-01-01' else None
        self.rating = self.source['rating'] if self.source['rating'] != 'unknown' else None
        self.plot = self.source['plot']
        self.box_office = self.source['box_office'] if self.source['box_office'] != -1 else None
        self.running_time = self.source['running_time'] if self.source['running_time'] == -1 else None

        self.genres = []
        self._parse_iteratively(self.genres, 'genre')

        self.keywords = []
        self._parse_iteratively(self.keywords, 'keyword')

        self.companies = []
        self._parse_iteratively(self.companies, 'company')

        self.actors = []
        self._parse_people(self.actors, 'actor')

        self.crews = []
        self._parse_people(self.crews, 'crew')

        if details:
            return self._details_to_dict()

        return self._to_dict()

    def _parse_iteratively(self, target: list, field: str):
        for value in self.source[field]:
            target.append(value['name'])

    def _parse_people(self, target: list, field: str):
        for value in self.source[field]:
            person = dict()
            person['id'] = value['id']
            person['name'] = value['name']
            person['role'] = value['role']
            person['profile_path'] = value['profile_path'] if len(value['profile_path']) > 0 else None
            target.append(person)

    def _details_to_dict(self) -> dict:
        result = dict()
        result['name_kr'] = self.name_kr
        result['name_en'] = self.name_en
        result['poster_path'] = self.poster_path
        result['released_date'] = self.released_date
        result['rating'] = self.rating
        result['plot'] = self.plot
        result['box_office'] = self.box_office
        result['running_time'] = self.running_time
        result['genres'] = self.genres
        result['keywords'] = self.keywords
        result['companies'] = self.companies
        result['actors'] = self.actors
        result['crews'] = self.crews
        return result

    def _to_dict(self) -> dict:
        result = dict()
        result['name'] = self.name_kr
        result['poster_path'] = self.poster_path

        if not self.released_date:
            result['released_date'] = None
        else:
            result['released_date'] = f'{self.released_date.split("-")[0]}년'

        result['genres'] = self.genres
        result['actors'] = [actor['name'] for actor in self.actors]
        result['crews'] = [crew['name'] for crew in self.crews]
        return result


def convert_list_from(response: dict) -> dict:
    hits = response['hits']['hits']

    try:
        result = {'movies': []}
        for hit in hits:
            result['movies'].append(MovieDetail(hit).parse())
        return result
    except NotFoundException as e:
        raise HTTPException(status_code=500, detail=str(e))


def convert_detail_from(response: dict) -> dict:
    hits = response['hits']['hits']

    try:
        return MovieDetail(hits[0]).parse(details=True)
    except NotFoundException as e:
        raise HTTPException(status_code=500, detail=str(e))