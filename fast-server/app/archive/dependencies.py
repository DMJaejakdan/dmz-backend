from elasticsearch import AsyncElasticsearch

from app.main import es


def get_elasticsearch() -> AsyncElasticsearch:
    return es
