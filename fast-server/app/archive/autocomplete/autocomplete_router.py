from fastapi import APIRouter, Depends, HTTPException
from elasticsearch import AsyncElasticsearch

from app.dependency import get_field_index, get_genre_index, get_client

from app.archive.autocomplete.constants import *


router = APIRouter(
    prefix='/fapi/auto'
)


@router.get('/fields')
async def fields(client: AsyncElasticsearch = Depends(get_client),
                 index: str = Depends(get_field_index)):
    try:
        result = await client.search(index=index, query=get_field_query())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get('/{video_type}/genres/{genre}')
async def genres(video_type: VideoType, genre: str,
                 client: AsyncElasticsearch = Depends(get_client()),
                 index: str = Depends(get_genre_index)):
    try:
        query = get_genre_query(genre, video_type)
        result = await client.search(index=index, query=query)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
