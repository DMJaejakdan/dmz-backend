# Mongo DB

## Volumn 설정

1. 최초 실행 시 사용자와 데이터를 생성하도록 설정하기

    [./mongo/initdb.d/mongo-init.sh](../../mongo/initdb.d/mongo-init.sh)
    
    ```shell
    #!/bin/bash
    set -e

    mongosh <<EOF
    use $MONGO_INITDB_DATABASE;
    db.createUser({
    user: "$MONGO_USER",
    pwd: "$MONGO_PASSWORD", 
    roles: [
        {
        role: "readWrite",
        db: "$MONGO_INITDB_DATABASE",
        },
    ],
    });
    db.createCollection("test");
    db.test.insert([
        {"id": "id1", "title": "test1"},
        {"id": "id2", "title": "test2"}
    ]);

    EOF
    ```

2. MongoDB 데이터 마운트하기

    `./mongo/data/`

## MongoDB 실행하기

Docker를 이용해 EC2에 MongoDB 실행하기

```bash
docker run \
    -d \
    --name mongo \
    -e TZ=Asia/Seoul \
    -e MONGO_INITDB_ROOT_USERNAME=<root user id> \
    -e MONGO_INITDB_ROOT_PASSWORD=<root user password> \
    -e MONGO_INITDB_DATABASE=<default database> \
    -e MONGO_USER=<login user id> \
    -e MONGO_PASSWORD=<login user password> \
    -v $(pwd)/mongo/initdb.d:/docker-entrypoint-initdb.d:ro \
    -v $(pwd)/mongo/data:/data/db \
    -p 27017:27017 \
    --log-opt max-size=100m \
    --log-opt max-file=5 \
  mongo
```

## MongoDB Shell에 접속하기

```bash
docker exec -it <container_id/container_name> bash

mongosh admin -u <id> -p <password>
```

## MongoDB 데이터 덤프하고 백업하기

1. dump
    
    ```bash
    mongodump --out 위치 --host 호스트 --port 포트 -u 계정명 -p 비번 --db 백업하려는_DB
    ```
    
2. backup
    
    ```bash
    mongorestore --host 호스트 --port 포트 -u 계정명 -p 비번 --drop 드랍할_DB --db 복구하려는_DB <덤프 파일 위치>
    ```