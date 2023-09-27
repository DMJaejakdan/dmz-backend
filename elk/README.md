# ELK

## Getting Started

1. ### `.env` 파일 생성
   `ELASTIC_USERNAME`, `ELASTIC_PASSWORD`, `RDS_USERNAME`, `RDS_PASSWORD`와 같은 유저 이름, 비밀번호를 입력합니다. `JDBC_CONNECTION_STRING`의 경우, `RDS 경로`와 `DB 이름`을 알맞게 넣어주시기 바랍니다. `ELK_VERSION`은 원하는 버전대로 설정하시면 됩니다.
   ```
   ELK_VERSION=8.10.1
   ELASTSIC_PASSWORD=
   JDBC_DRIVER_LIBRARY='/usr/share/logstash/logstash-core/lib/jars/mysql-connector-java.jar'
   JDBC_CONNECTION_STRING='jdbc:mysql://<RDS 경로>:3306/<DB 이름>'
   JDBC_DRIVER_CLASS='com.mysql.jdbc.Driver'
   RDS_USERNAME=
   RDS_PASSWORD=
   ```
2. ### docker-compose 실행
   ```bash
   docker-compose up
   ```

   