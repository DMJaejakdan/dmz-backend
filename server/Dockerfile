FROM gradle:7.4-jdk11-alpine AS builder

WORKDIR /app

# 그래들 파일이 변경되었을 때만 새롭게 의존패키지 다운로드 받게함.
COPY build.gradle settings.gradle /app/

# 컴파일 된 쿼리타입 엔티티 삭제
RUN gradle cleanQuerydslSourceDir

RUN gradle clean build -Pprofile=prod -x test --parallel --continue > /dev/null 2>&1 || true

# 빌더 이미지에서 애플리케이션 빌드
COPY ./ ./

RUN gradle build -Pprofile=prod -x test --parallel

FROM openjdk:11-jdk

WORKDIR /app

# ARG JAR_FILE=/build/libs/*.jar

COPY --from=builder /app/build/libs/*.jar /app/app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-Duser.timezone=Asia/Seoul", "-jar", "app.jar"]