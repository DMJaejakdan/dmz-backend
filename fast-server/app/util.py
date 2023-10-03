import logging
import time

from elasticsearch import AsyncElasticsearch
from exception import ElasticsearchNotConnectedException


def wait_elasticsearch(es: AsyncElasticsearch, interval=2000, max_retries=30, params=None, headers=None):
    attempts = 0

    while attempts < max_retries:
        try:
            resp = es.info(params=params, headers=headers)
            logging.info('Connected to elasticsearch.')
            return resp
        except ElasticsearchNotConnectedException:
            logging.warning(
                f'Could not connect to Elasticsearch. Retry will occur in {interval}ms.')
            attempts += 1
            time.sleep(interval / 1000)

    raise ElasticsearchNotConnectedException()
