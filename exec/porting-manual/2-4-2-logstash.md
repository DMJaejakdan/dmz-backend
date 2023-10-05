# ELK - Logstash

1. **Dockerfile**

    ```docker
    ARG ELK_VERSION

    FROM docker.elastic.co/logstash/logstash:${ELK_VERSION}

    COPY ./connector/mysql-connector-j-8.0.33.jar /usr/share/logstash/logstash-core/lib/jars/mysql-connector-java.jar
    ```

2. **config/logstash.yml**

    ```yaml
    http.host: '0.0.0.0'
    xpack.monitoring.elasticsearch.hosts: ['http://elasticsearch:9200']

    xpack.monitoring.enabled: true
    xpack.monitoring.elasticsearch.username: 'logstash_internal'
    xpack.monitoring.elasticsearch.password: ${LOGSTASH_INTERNAL_PASSWORD}
    ```

3. **config/pipelines.yml**

    ```yaml
    - pipeline.id: fresh_pull_index
      path.config: "ls_confs/fresh_pull/fresh_pull_index.conf"
    ```

4. **config/fresh_pull/fresh_pull_index.conf**

    ```
    input {
      jdbc {
        jdbc_driver_library => '${JDBC_DRIVER_LIBRARY}'
        jdbc_connection_string => '${JDBC_CONNECTION_STRING}'
        jdbc_driver_class => '${JDBC_DRIVER_CLASS}'
        jdbc_user => '${RDS_USERNAME}'
        jdbc_password => '${RDS_PASSWORD}'
        statement_filepath => 'scripts/fresh_pull/index.sql'
      }
    }
    filter {
      json{
        id => 'id'
        source => 'rows'
        remove_field => 'rows'
      }
    } 
    output {
      
    }
    ```

5. MySQL Connector 파일

	본 프로젝트에서는 8.0.33 버전을 사용함


5. **pipeline/logstash.conf**

    ```
    input {
      tcp {
        port => 5001
      }
    }

    output {
      elasticsearch {
        hosts => "elasticsearch:9200"
        user => "logstash_internal"
        password => "${LOGSTASH_INTERNAL_PASSWORD}"
        index => "elk-logger"
      }
    }
    ```