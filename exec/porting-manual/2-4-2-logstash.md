# ELK - Logstash

1. **Dockerfile**
```docker
FROM docker.elastic.co/logstash/logstash:7.8.1
```

2. **config/logstash.yml**
```yaml
http.host: '0.0.0.0'
xpack.monitoring.elasticsearch.hosts: ['http://elasticsearch:9200']

xpack.monitoring.enabled: true
xpack.monitoring.elasticsearch.username: elastic
xpack.monitoring.elasticsearch.password: changeme
```

3. **pipeline/logstash.conf**
```
input {
	tcp {
		port => 5001
	}
}

## Add your filters / logstash plugins configuration here

output {
	elasticsearch {
		hosts => "elasticsearch:9200"
		user => "elastic"
		password => "changeme"
		index => "elk-logger"
	}
}
```