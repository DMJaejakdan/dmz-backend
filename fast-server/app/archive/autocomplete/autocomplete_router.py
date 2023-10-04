from fastapi import APIRouter, Depends, HTTPException
from elasticsearch import AsyncElasticsearch

from app.dependency import get_field_index, get_client

from app.archive.autocomplete.constants import get_field_query


router = APIRouter(
    prefix='/fapi/auto'
)


@router.get("fields")
async def fields(client: AsyncElasticsearch = Depends(get_client),
                 index: str = Depends(get_field_index)):
    try:
        result = await client.search(index=index, query=get_field_query())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
