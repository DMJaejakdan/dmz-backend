# Data Dump

[Google Drive](https://drive.google.com/drive/folders/1HzfMVRV0-UfUYfzez1--uOkLmRJ35qu9?usp=sharing)

1. [MySQL](./mysql-dump/)

2. MongoDB

    용량이 큰 관계로 [Google Drive 링크](https://drive.google.com/drive/folders/1QHqd0AJF1s5LdGaA_fFLudQHZY_0a7eP?usp=sharing)로 대체합니다.

    **MongoDB Shell로 Dump Data 복구하는 법**
    
    ```bash
    mongorestore --host 호스트 --port 포트 -u 계정명 -p 비번 --drop 드랍할_DB --db 복구하려는_DB <덤프 파일 위치>
    ```