from typing import Union
from fastapi import FastAPI
import pytz
from datetime import datetime

app = FastAPI()

server_timezone = pytz.timezone('Asia/Seoul')

@app.get("/fapi")
def read_root():
    current_time = datetime.now(server_timezone)
    return {"message": "현재 시각: {}".format(current_time)}
