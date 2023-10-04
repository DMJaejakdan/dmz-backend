from enum import Enum


class VideoType(str, Enum):
    MOVIE = 'movie'
    DRAMA = 'drama'


def get_field_query() -> dict:
    return {'match_all': {}}


def get_genre_query(genre: str, video_type: VideoType) -> dict:
    query = dict()
    query['bool'] = dict()
    query['bool']['must'] = []

    prefix = {'prefix': {'name': genre}}
    query['bool']['must'].append(prefix)

    match = {'match': {video_type.value: True}}
    query['bool']['must'].append(match)

    return query
