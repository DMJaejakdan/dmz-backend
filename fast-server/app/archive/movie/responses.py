from fastapi import HTTPException
from typing import List

from app.archive.exception import NotFoundException


class MovieDetail:

    movie: dict
    str_fields: List[str]
    list_fields: List[str]
    people_fields: List[str]
    source: dict

    def __init__(self, detail: dict):
        self.movie = dict()
        self.source = detail['_source']
        self._init_movie()

    def _init_movie(self):
        self.str_fields = ['name_kr', 'name_en', 'poster_path', 'released_date',
                           'rating', 'plot', 'box_office', 'running_time']
        self.list_fields = ['genre', 'keyword', 'company']
        self.people_fields = ['actor', 'crew']

        for field in self.str_fields:
            self.movie[field] = None

        for field in self.list_fields:
            self.movie[field] = []

        for field in self.people_fields:
            self.movie[field] = []

    def parse(self, details: bool = False) -> dict:
        for field in self.str_fields:
            if self.source.get(field) == 'unknown':
                continue

            self.movie[field] = self.source.get(field)

        for field in self.list_fields:
            self._parse_iteratively(self.movie[field], field)

        for field in self.people_fields:
            self._parse_people(self.movie[field], field)

        if details:
            return self.movie

        return self._to_dict()

    def _parse_iteratively(self, target: list, field: str):
        for value in self.source[field]:
            target.append(value.get('name'))

    def _parse_people(self, target: list, field: str):
        for value in self.source[field]:
            person = dict()
            person['tmdb_id'] = value.get('tmdb_id')
            person['name'] = value.get('name')
            person['role'] = value.get('role')
            person['profile_path'] = value.get('profile_path')
            target.append(person)

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

    if len(hits) == 0:
        return {'result not found': None}

    return MovieDetail(hits[0]).parse(details=True)
