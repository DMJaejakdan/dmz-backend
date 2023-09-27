ARG ELK_VERSION

FROM docker.elastic.co/logstash/logstash:${ELK_VERSION}

COPY ./connector/mysql-connector-j-8.0.33.jar /usr/share/logstash/logstash-core/lib/jars/mysql-connector-java.jar