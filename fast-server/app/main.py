import pytz

from fastapi import FastAPI
from datetime import datetime
from elasticsearch import AsyncElasticsearch
from fastapi_elasticsearch import ElasticsearchAPIQueryBuilder

from util import wait_elasticsearch
from archive.movie import movie_router
from archive.drama import drama_router
from archive.people import people_router


app = FastAPI()

es = AsyncElasticsearch()
wait_elasticsearch(es)

server_timezone = pytz.timezone('Asia/Seoul')

app.include_router(movie_router.router)
app.include_router(drama_router.router)
app.include_router(people_router.router)

query_builder = ElasticsearchAPIQueryBuilder()


@app.get('/fapi')
def read_root():
    current_time = datetime.now(server_timezone)
    return {'message': f'현재 시각: {{{current_time}}}'}


@app.on_event('shutdown')
async def app_shutdown():
    await es.close()
