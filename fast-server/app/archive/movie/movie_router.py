from fastapi import APIRouter, Depends, HTTPException
from elasticsearch import AsyncElasticsearch

from app.archive.dependencies import get_elasticsearch


router = APIRouter(
    prefix='/fapi/movie'
)


@router.get("/search")
async def search(query: str, es: AsyncElasticsearch = Depends(get_elasticsearch)):
    try:
        result = es.search(index='your_index', q=query)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
