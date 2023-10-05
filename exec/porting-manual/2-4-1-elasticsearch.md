# ELK - Elastic Search

1. **Dockerfile**

    ```docker
    ARG ELK_VERSION

    FROM docker.elastic.co/elasticsearch/elasticsearch:${ELK_VERSION}
    ```

2. **config/elasticsearch.yml**

    ```yaml
    cluster.name: 'docker-cluster'
    network.host: 0.0.0.0

    xpack.license.self_generated.type: trial
    xpack.security.enabled: true
    xpack.monitoring.collection.enabled: true
    ```