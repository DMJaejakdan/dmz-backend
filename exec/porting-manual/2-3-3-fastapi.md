# Server - Fast API

1. **requirements.txt**

    프로젝트에서 사용할 전체 패키지 목록을 버전과 함께 작성함.

    본 프로젝트에서 사용한 패키지 내역은 다음과 같음

    ```plaintext
    aiohttp==3.8.5
    fastapi==0.103.1
    elasticsearch~=8.10.0
    nest-asyncio==1.5.8
    pydantic==1.10.13
    pydantic_core==2.6.3
    pydantic[dotenv]
    python-dateutil==2.8.2
    pytz==2023.3.post1
    uvicorn==0.23.2
    requests==2.31.0
    ```

2. **.env**

   ```
   HOST=
   PORT=
   ELASTIC_USERNAME=
   ELASTIC_PASSWORD=
   MOVIE_INDEX='movie'
   DRAMA_INDEX='drama'
   PEOPLE_INDEX='people'
   GENRE_INDEX='genre'
   KEYWORD_INDEX='keyword'
   COMPANY_INDEX='company'
   RATING_INDEX='rating'
   FIELD_INDEX='field'
   CHANNEL_INDEX='channel'
   ```

3. **Dockerfile**

    ```docker
    FROM python:3.11

    WORKDIR /code

    COPY ./requirements.txt /code/requirements.txt

    COPY ./.env /code/.env

    RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

    COPY ./app /code/app

    EXPOSE 8000

    CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
    ```