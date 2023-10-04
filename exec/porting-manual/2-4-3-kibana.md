# ELK - Kibana

1. **Dockerfile**
```docker
FROM docker.elastic.co/kibana/kibana:7.8.1
```

2. **config/kibana.yml**
```yaml
server.name: kibana
server.host: '0'

elasticsearch.hosts: ['http://elasticsearch:9200']
xpack.monitoring.ui.container.elasticsearch.enabled: true

elasticsearch.username: elastic
elasticsearch.password: changeme
```