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

4. [Docker Compose](../../elk/docker-compose.yml)

    **기본 포트**

    - ElasticSearch : `9200`, `9300`
    - Logstash : `5001/tcp`, `5001/udp`, `9600`
    - Kibana : `5601`

    **방화벽 문제로 변경한 포트**

    - ElasticSearch : `3200`, `3300`
    - Logstash : `40000`, `40001`, `3600`
    - Kibana : `3601`

---

**`AccessDeniedException[/usr/share/elasticsearch/data/nodes]`가 발생한다면**

볼륨 마운트 된 폴더에 접근할 수 없어서 생기는 문제

`sudo chown -R 1000:1000 ./elasticsearch/data`