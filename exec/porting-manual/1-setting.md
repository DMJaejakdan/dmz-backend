# EC2 환경 기본 설정

## EC2 초기 설정

### EC2 패키지 버전 관리

```bash
sudo apt-get update # 인스턴스에 설치된 패키지 목록 최신화
sudo apt-get upgrade # 인스턴스에 설치된 패키지들을 최신 버전으로 업그레이드
```

### EC2 Timezone 설정

```bash
date # Mon Sep 11 01:45:45 UTC 2023
sudo timedatectl set-timezone Asia/Seoul
date # Mon Sep 11 10:45:55 KST 2023
```

### UFW 설정

`ufw` : ubuntu에서 기본으로 제공하는 방화벽 설정 도구

```bash
sudo apt install ufw

sudo ufw default deny incoming
sudo ufw default allow outgoing

# 방화벽 규칙 추가
sudo ufw allow ssh # 22
sudo ufw allow http # 80
sudo ufw allow https # 443

# ufw 활성화
sudo ufw enable

# 방화벽 규칙 확인
sudo ufw status numbered

# 방화벽 규칙 삭제
sudo ufw delete [규칙번호]
```

### 필요한 패키지 설치

```bash
sudo apt install -y vim

sudo apt install npm
npm install -g n
n stable

node --version

# yarn을 사용하는 경우
sudo npm install -g yarn
```

## Java 설치

**Java 11** 버전 사용

### 패키지 설치

```bash
sudo apt-get install openjdk-11-jdk

java -version
javac -version
```

### 환경 변수 설정

```bash
readlink -f `which java` # /usr/lib/jvm/java-11-openjdk-amd64/bin/java

vi /etc/profile
# 파일 맨 끝에 입력
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64

source /etc/profile # 환경변수 설정 적용

echo $JAVA_HOME # /usr/lib/jvm/java-11-openjdk-amd64
```

## Nginx 설정

### Nginx 설치

```bash
sudo apt-get install nginx
nginx -v
```

nginx에 문제가 생겨 삭제해야한다면 `/etc/nginx`까지 삭제해야함

```bash
sudo apt-get -y remove --purge nginx nginx-full nginx-common
```

### Nginx Reverse Proxy

**Reverse Proxy를 사용하는 이유**

1. 클라이언트는 nginx를 통해 서버에 접근 ⇒ ngin가 들어온 요청을 확인하고 서버에 요청 전달
2. 서버의 포트가 노출되지 않음
3. 포트가 노출되더라도 방화벽이나 보안 정책으로 막아두었다면 포트를 통해 서버에 직접 접근 불가
4. SSL/TLS 등 복잡한 https 설정을 nginx에서 관리
5. 로드 밸런싱 역할 수행 가능

**Reverse Proxy를 설정하는 방법**

1. `nginx.conf` 수정하기
2. **`/etc/nginx/conf.d` 폴더에 설정 파일(`.conf`) 추가하기**

⇒ `nginx.conf`에는 `include /etc/nginx/conf.d/*.conf;` 를 포함하고 있으므로 **2번** 방법 사용 시 관리 용이

`/etc/nginx/conf.d/default.conf` 예시

```bash
upstream frontend {
    server localhost:3000;
}

upstream backend {
    server localhost:8080;
}

server {
    listen 80;
    server_name <dns>;

    location /api {
        proxy_pass http://backend;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        proxy_pass http://frontend;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**설정 파일 수정 후에는 nginx 재시작 필요**
```bash
sudo nginx -t # systax 검사
sudo service nginx restart
```

## SSL 설정하기 w/ `certbot`

```bash
# snap을 이용하여 core 설치 -> snap을 최신 버전으로 유지하기 위해 설치
sudo snap install core

# core를 refresh 해준다.
sudo snap refresh core

# 기존에 잘못된 certbot이 설치되어있을 수도 있으니 삭제 해준다.
sudo apt remove certbot

# certbot 설치
sudo snap install --classic certbot

# certbot 명령을 로컬에서 실행할 수 있도록 snap의 certbot 파일을 로컬의 cerbot과 링크(연결) 시켜준다. -s 옵션은 심볼릭링크를 하겠다는 것.
ln -s /snap/bin/certbot /usr/bin/certbot

# 인증서 발급
sudo certbot --nginx # nginx에 SSL 적용
```

## Docker

### Docker 설치하기

```bash
# 필요한 패키지 설치
sudo apt-get -y install apt-transport-https ca-certificates curl gnupg-agent software-properties-common

# docker 공식 GPG Key 등록
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add

# Docker Repository 등록
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# Docker 설치
sudo apt-get update && sudo apt-get install docker-ce docker-ce-cli containerd.io

docker -v

# Docker 그룹에 사용자 추가
sudo usermod -aG docker ubuntu
sudo service docker restart
```

**설치한 패키지에 대한 설명**

- `apt-transport-https`
    
    https를 통해 sw를 다운로드 받기 위한 패키지
    
    패키지 관리자가 https를 통해 데이터 및 패키지에 접근할 수 있도록 함
    
- `ca-certificates`
    
    인증된 SSL/TLS 인증서 리스트 관리
    
    certificate authority에서 발행하는 디지털 서명. SSL 인증서의 PEM 파일이 포함되어 있어 SSL 기반 앱이 SSL 연결이 되어 있는지 확인 가능.
    
- `curl`
    
    URL에서 데이터를 전송하는데 사용
    
    특정 웹사이트에서 데이터를 다운로드 받을 때 사용
    
- `gnupg-agent`
    
    GNU 프라이버시 가드
    
    사용자 인증에 사용되는 키 관리와 관련된 작업 수행
    
- `software-properties-common`
    
    PPA(개인 패키지 저장도, Personal Package Archive) 추가 및 제거 시 사용
    
- `docker-ce`
    
    Docker Community Edition
    
- `docker-ce-cli`
    
    Docker Community Edition의 CLI 지원용 패키지
    
- `containerd.io`
    
    Docker Container Runtime
    

### docker-compose 설치하기

```bash
# json을 커맨트 라인에서 처리하는데 사용
sudo apt install jq

# docker compose 버전 정보를 찾아 환경 변수로 저장
DCVERSION=$(curl --silent https://api.github.com/repos/docker/compose/releases/latest | jq .name -r)

# docker compose의 목표 경로 지정
DCDESTINATION=/usr/bin/docker-compose

# docker compose 최신 버전 받고 목표 경로에 저장
sudo curl -L https://github.com/docker/compose/releases/download/${DCVERSION}/docker-compose-$(uname -s)-$(uname -m) -o $DCDESTINATION

# 모든 사용자가 사용할 수 있도록 실행 권한 부여
sudo chmod 755 $DCDESTINATION

docker-compose -v
```

## Docker Container 방화벽 설정 w/ `ufw-docker`

**ufw ≠ firewall**

실제 EC2의 **방화벽** 역할을 하는 건 **`iptables`** ⇒ **`ufw`는 방화벽 관리자**

- ufw는 사용자가 명령어를 입력하면 해당 명령어에 알맞은 규칙을 iptables의 필터에 추가하는 방식으로 동작함
- Docker도 iptables를 수정할 수 있는 기능을 가짐

    **+ 이 기능은 ufw가 설정하는 규칙보다 더 위에 규칙을 만들기 때문에 더 우선시 됨**

**⇒ [ufw-docker](https://github.com/chaifeng/ufw-docker)로 Docker의 방화벽 문제 해결**

1. 사설 네트워크 IP에서의 요청은 모두 허용 **(내부 망에서 서로 접근 허용)**
2. 공용 네트워크에서의 TCP, UDP 요청은 모두 차단 **(외부 망에서 접근 차단)**
3. `ufw-user-forward` 체인을 가장 앞에 둬 **ufw → docker 규칙 순으로 적용**

### ufw-docker 설치하기

```bash
sudo wget -O /usr/local/bin/ufw-docker https://github.com/chaifeng/ufw-docker/raw/master/ufw-docker
sudo chmod +x /usr/local/bin/ufw-docker

# /etc/ufw/after.rules 백업
mkdir ~/backup
sudo cp /etc/ufw/after.rules ~/backup

# ufw-docker 적용하고 ufw 재시작
sudo ufw-docker install
sudo systemctl restart ufw
```

### ufw-docker를 이용해 방화벽 규칙 추가하기

```bash
sudo ufw-docker allow <container-name> <port>
```