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
          ELK_VERSION: ${ELK_VERSION}
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
          ELASTIC_PASSWORD: ${ELK_PASSWORD}
          discovery.type: single-node
        networks:
          - elk
  
      logstash:
        container_name: logstash
        build:
          context: ./logstash
          dockerfile: Dockerfile
        args:
          ELK_VERSION: ${ELK_VERSION}
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
        LOGSTASH_INTERNAL_PASSWORD: ${ELK_PASSWORD}
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
          ELK_VERSION: ${ELK_VERSION}
        volumes:
          - type: bind
            source: './kibana/config/kibana.yml'
            target: /usr/share/kibana/config/kibana.yml
            read_only: true
        ports:
          - '3601:5601'
        environment:
          KIBANA_SYSTEM_PASSWORD: ${ELK_PASSWORD}
        networks:
          - elk
        depends_on:
          - elasticsearch

    networks:
      elk:
        driver: bridge
    ```

이후 작업에 대한 보다 자세한 설명은 [이 곳](../../elk/README.md)에서 확인할 수 있음

5. **.env**

    본 프로젝트에서는 8.10.1 ELK 버전을 사용함.

    ```
    ELK_VERSION=8.10.1
    ELk_PASSWORD=
    JDBC_DRIVER_LIBRARY='/usr/share/logstash/logstash-core/lib/jars/mysql-connector-java.jar'
    JDBC_CONNECTION_STRING='jdbc:mysql://<RDS 경로>:3306/<DB 이름>'
    JDBC_DRIVER_CLASS='com.mysql.jdbc.Driver'
    RDS_USERNAME=
    RDS_PASSWORD=
    ```

6. Elastic Search 컨테이너의 `kibana_system` 비밀번호 변경

    `kibana_system`의 비밀번호를 변경하기 위해 아래의 명령어를 실행함.

    `kibana_system_password`는 `.env`에서 설정한 `ELK_PASSWORD`를 대입함.

    ```bash
    curl -X POST "http://localhost:3200/_security/user/kibana_system/_password" -H "Content-Type: application/json" -d '{
    "password": "<kibana_system_password>"
    }'
    ```

7. Elasticsearch에 index 추가

   Elasticsearch에 `genre`, `keyword`, `company`, `channel`, `field`, `movie`, `drama`, `people` index를 추가하는 작업을 위해 [es_index.sh](../../elk/es_index.sh) 파일을 실행함.

   인덱스에 대한 정보는 [./elasticsearch/index](../../elk/elasticsearch/index/)에 위치함

   ```bash
   source es_index.sh
   ```

8. Elasticsearch에 bulk로 데이터 삽입

   Elasticsearch의 각 인덱스에 데이터를 삽입하기 위해 `es_bulk.sh`을 실행함.

   ```bash
   source es_bulk.sh
   ```
---

### `AccessDeniedException[/usr/share/elasticsearch/data/nodes]`가 발생한다면

볼륨 마운트 된 폴더에 접근할 수 없어서 생기는 문제

=> `sudo chown -R 1000:1000 ./elasticsearch/data`