# Server

1. [Springboot](./2-3-1-springboot.md)

2. [Next.js](./2-3-2-nextjs.md)

3. [Fast API](./2-3-3-fastapi.md)

4. **Docker Compose**

    각 서버에서 설정한 timezone 설정과 별개로 docker container 내부의 timezone도 설정해주어야 함. (`-e TZ=Asia/Seoul`)

    본 파일에서는 Next.js 서버 4개, Springboot 서버 1개, Fast API 서버 1개 총 6개의 서버를 컨테이너 묶음으로 관리함.

    ```yaml
    version: '3'
    services:
      <service-name>:
        container_name: <container-name>
        image: <image-name>
        build:
          context: <folder-name>
          dockerfile: <Dockerfile-name>
        ports:
          - <port>
        environment:
          - TZ=Asia/Seoul
        stdin_open: true
    ```
