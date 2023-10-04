# ELK


```plaintext
ELK
│  docker-compose.yml
├─ elasticsearch
│  │  Dockerfile
│  ├─ config
│  │      elasticsearch.yml
│  └─ data
│      └─ nodes                
├─ kibana
│  │  Dockerfile
│  └─ config
│          kibana.yml    
└─ logstash
    │  Dockerfile
    ├─ config
    │      logstash.yml  
    └─ pipeline
            logstash.conf
```

1. [Elastic Search](./2-4-1-elasticsearch.md)

2. [Logstash](./2-4-2-logstash.md)

3. [Kibana](./2-4-3-kibana.md)

4. **Docker Compose**

    **기본 포트**

    - ElasticSearch : `9200`, `9300`
    - Logstash : `5001/tcp`, `5001/udp`, `9600`
    - Kibana : `5601`

    **방화벽 문제로 변경한 포트**

    - ElasticSearch : `3200`, `3300`
    - Logstash : `40000`, `40001`, `3600`
    - Kibana : `3601`

    ```yaml
    version: '3.2'

    services:
    elasticsearch:
        container_name: elasticsearch
        build:
            context: ./elasticsearch
            dockerfile: Dockerfile
        args:
            ELK_VERSION: 7.8.1
        volumes:
            - type: bind
                source: './elasticsearch/config/elasticsearch.yml'
                target: /usr/share/elasticsearch/config/elasticsearch.yml
                read_only: true
            - type: bind
                source: './elasticsearch/data'
                target: /usr/share/elasticsearch/data
        ports:
            - '3200:9200'
            - '3300:9300'
        environment:
            ES_JAVA_OPTS: '-Xmx256m -Xms256m'
            ELASTIC_PASSWORD: changeme
            discovery.type: single-node
        networks:
            - elk

    logstash:
        container_name: logstash
        build:
            context: ./logstash
            dockerfile: Dockerfile
        args:
            ELK_VERSION: 7.8.1
        volumes:
            - type: bind
                source: './logstash/config/logstash.yml'
                target: /usr/share/logstash/config/logstash.yml
                read_only: true
            - type: bind
                source: './logstash/pipeline'
                target: /usr/share/logstash/pipeline
                read_only: true
        ports:
            - '40000:5001/tcp'
            - '40000:5001/udp'
            - '3600:9600'
        environment:
            LS_JAVA_OPTS: '-Xmx256m -Xms256m'
        networks:
            - elk
        depends_on:
            - elasticsearch

    kibana:
        container_name: kibana
        build:
            context: ./kibana
            dockerfile: Dockerfile
        args:
            ELK_VERSION: 7.8.1
        volumes:
            - type: bind
                source: './kibana/config/kibana.yml'
                target: /usr/share/kibana/config/kibana.yml
                read_only: true
        ports:
            - '3601:5601'
        networks:
            - elk
        depends_on:
            - elasticsearch

    networks:
        elk:
            driver: bridge
```

---

### `AccessDeniedException[/usr/share/elasticsearch/data/nodes]`가 발생한다면

볼륨 마운트 된 폴더에 접근할 수 없어서 생기는 문제

`sudo chown -R 1000:1000 ./elasticsearch/data`