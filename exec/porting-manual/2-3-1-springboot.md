# Server - Springboot

1. **Dockerfile**

    ```docker
    FROM gradle:7.4-jdk11-alpine AS builder

    WORKDIR /app

    COPY build.gradle settings.gradle /app/

    RUN gradle cleanQuerydslSourceDir

    RUN gradle clean build -Pprofile=prod -x test --parallel --continue > /dev/null 2>&1 || true

    COPY ./ ./

    RUN gradle build -Pprofile=prod -x test --parallel

    FROM openjdk:11-jdk

    WORKDIR /app

    COPY --from=builder /app/build/libs/*.jar /app/app.jar

    EXPOSE 8080

    ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-Duser.timezone=Asia/Seoul", "-jar", "app.jar"]
    ```

2. 환경 변수

    **./server/src/main/resources/env.yml**에 작성

    Jenkins를 사용하는 경우 **Jenkins 내부**에 작성

    ```yaml
    RDS_DB_URL: <RDS DB URL>
    RDS_DB_USERNAME: <RDS DB Username>
    RDS_DB_PASSWORD: <RDS DB Password>
    TMDB_API_KEY: <TMDB API Key>
    ```

---

### jar 파일 생성 시 `*plain.jar`을 생성하지 않도록 설정하기

**build.gradle**
```gradle
jar {
    enabled = false
}
```


### 서버의 Timezone 설정하기

1. Springboot 설정

    1. **jar 파일 실행 시 옵션 설정**

        `java -Duser.timezone=Asia/Seoul -jar *.jar`

    2. `@PostContruct` 사용

        ```java
        @SpringBootApplication
        public class TestApplication {

            @PostConstruct
            void setServerTime() {
                TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
            }

            public static void main(String[] args) {
                application.run(TestApplication.class, args);
            }
        }
        ```

    본 프로젝트에서는 코드에 포함시키지 않고 실행 시 지정하는 **1번** 방법을 선택함.

2. docker container 설정
    
    `-e TZ=Asia/Seoul`