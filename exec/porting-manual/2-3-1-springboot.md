# Server - Springboot

1. [Dockerfile](../../server/Dockerfile)

---

### jar 파일 생성 시 `*plain.jar`을 생성하지 않도록 설정하기

[build.gradle](../../server/build.gradle)
```
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