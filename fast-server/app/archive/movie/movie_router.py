from fastapi import APIRouter, Depends, HTTPException
from elasticsearch import AsyncElasticsearch

from app.dependency import get_client


router = APIRouter(
    prefix='/fapi/movie'
)


@router.get("/search")
async def search(query: str, client: AsyncElasticsearch = Depends(get_client)):
    try:
        result = client.search(index='your_index', q=query)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
