# Server - Fast API

1. [requirements.txt](../../fast-server/requirements.txt)

    프로젝트에서 사용하는 패키지

2. **Dockerfile**
```docker
FROM python:3.11

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./app /code/app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```