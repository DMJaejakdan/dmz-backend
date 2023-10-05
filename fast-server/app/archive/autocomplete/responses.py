from fastapi import HTTPException

from app.archive.exception import NotFoundException


def fields_from(response: dict) -> dict:
    hits = response['hits']['hits']
    result = {'fields': []}

    try:
        for hit in hits:
            new_row = {'id': hit['_id'], 'name': hit['_source']['name_kr']}
            result['fields'].append(new_row)
        return result
    except NotFoundException as e:
        raise HTTPException(status_code=500, detail=str(e))
