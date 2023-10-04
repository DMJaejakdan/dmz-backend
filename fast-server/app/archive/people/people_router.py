from fastapi import APIRouter, Depends, HTTPException
from elasticsearch import AsyncElasticsearch

from app.dependency import get_people_index, get_client

from app.archive.people.constants import SearchCondition, get_detail_query


router = APIRouter(
    prefix='/fapi/people'
)


@router.get('/search')
async def search(page: int | None = 0,
                 size: int | None = 10,
                 sort: str | None = None,
                 name: str | None = None,
                 fields: str | None = None,
                 genders: str | None = None,
                 ages: str | None = None,
                 client: AsyncElasticsearch = Depends(get_client),
                 index: str = Depends(get_people_index)):

    condition = SearchCondition(page=page, size=size, sort=sort,
                                name=name, fields=fields,
                                genders=genders, ages=ages)

    try:
        result = await client.search(index=index, query=condition.get_query(),
                                     from_=condition.from_, size=condition.size)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get('/{person_id}')
async def detail(person_id: int,
                 client: AsyncElasticsearch = Depends(get_client),
                 index: str = Depends(get_people_index)):
    try:
        result = await client.search(index=index, query=get_detail_query(person_id))
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
