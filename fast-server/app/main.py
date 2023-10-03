import pytz

from fastapi import FastAPI
from datetime import datetime
from fastapi_elasticsearch import ElasticsearchAPIQueryBuilder

from app.dependency import close_client

from app.archive.movie import movie_router
from app.archive.drama import drama_router
from app.archive.people import people_router
from app.archive.autocomplete import autocomplete_router

app = FastAPI()

server_timezone = pytz.timezone('Asia/Seoul')

app.include_router(movie_router.router)
app.include_router(drama_router.router)
app.include_router(people_router.router)
app.include_router(autocomplete_router.router)

query_builder = ElasticsearchAPIQueryBuilder()


@app.get('/fapi')
def read_root():
    current_time = datetime.now(server_timezone)
    return {'message': f'현재 시각: {{{current_time}}}'}


@app.on_event('shutdown')
async def app_shutdown():
    await close_client()
