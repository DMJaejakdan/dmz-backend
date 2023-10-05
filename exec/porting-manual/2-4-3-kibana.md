# ELK - Kibana

1. **Dockerfile**

    ```docker
    ARG ELK_VERSION

    FROM docker.elastic.co/kibana/kibana:${ELK_VERSION}
    ```

2. **config/kibana.yml**

    ```yaml
    server.name: kibana
    server.host: '0.0.0.0'
    elasticsearch.hosts: [ 'http://elasticsearch:9200' ]
    xpack.monitoring.ui.container.elasticsearch.enabled: true

    elasticsearch.username: 'kibana_system'
    elasticsearch.password: ${KIBANA_SYSTEM_PASSWORD}
    ```