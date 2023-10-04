from fastapi import APIRouter, Depends, HTTPException
from elasticsearch import AsyncElasticsearch

from app.dependency import get_movie_index, get_client

from app.archive.movie.constants import SearchCondition, get_detail_query


router = APIRouter(
    prefix='/fapi/movie'
)


@router.get("/search")
async def search(page: int | None = 0,
                 size: int | None = 10,
                 sort: str | None = None,
                 name: str | None = None,
                 plot: str | None = None,
                 people: str | None = None,
                 genres: str | None = None,
                 keywords: str | None = None,
                 companies: str | None = None,
                 ratings: str | None = None,
                 s_date: str | None = None,
                 e_date: str | None = None,
                 client: AsyncElasticsearch = Depends(get_client),
                 index: str = Depends(get_movie_index)):

    condition = SearchCondition(page=page, size=size, sort=sort,
                                name=name, plot=plot, people=people,
                                genres=genres, keywords=keywords,
                                companies=companies, ratings=ratings,
                                s_date=s_date, e_date=e_date)

    try:
        result = await client.search(index=index, query=condition.get_query(),
                                     from_=condition.from_, size=condition.size)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{movie_id}")
async def search(movie_id: int,
                 client: AsyncElasticsearch = Depends(get_client),
                 index: str = Depends(get_movie_index)):
    try:
        result = await client.search(index=index, query=get_detail_query(movie_id))
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
