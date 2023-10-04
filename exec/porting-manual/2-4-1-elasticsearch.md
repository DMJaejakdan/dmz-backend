# ELK - Elastic Search

1. **Dockerfile**
```docker
FROM docker.elastic.co/elasticsearch/elasticsearch:7.8.1
```

2. **config/elasticsearch.yml**
```yaml
cluster.name: 'docker-cluster'
network.host: 0.0.0.0

xpack.license.self_generated.type: trial
xpack.security.enabled: true
xpack.monitoring.collection.enabled: true
```