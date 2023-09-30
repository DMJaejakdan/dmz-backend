# Jenkins 연결하기

## EC2 설정

### swap 메모리 선언

Jenkins는 빌드를 여러 번 진행할수록 많은 메모리를 사용하므로 메모리 관리가 필요함.

일반적으로 swap 영역은 서버 메모리의 2배로 할당함.

```bash
df -h
sudo fallocate -l 8G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
free -h
```

### Jenkins Docker Image 받기

```bash
sudo docker pull jenkins/jenkins:lts
```

### Jenkins 실행

```bash
sudo docker run \
    -d \
    -e JENKINS_OPTS="--httpPort=9090" \
    -p 9090:9090 \
    -p 50000:50000 \
    --env JAVA_OPTS=-Xmx2g \
    -v /etc/localtime:/etc/localtime:ro \
    -e TZ=Asia/Seoul \
    -v /jenkins:/var/jenkins_home \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /usr/bin/docker-compose:/usr/bin/docker-compose \
    --name jenkins \
    -u root \
    jenkins/jenkins:lts
```

**옵션 설명**

- `-d`

    Docker Container를 detach 모드로 실행

- 포트 변경

    Jenkins의 기본 포트 번호는 8080

    Springboot에서 8080번 포트를 사용하기 위해 Jenkins 포트 번호를 **9090**으로 변경함

    1. `-e JENKINS_OPTS="--httpPort=9090"`
    2. `-p 9090:9090`

- `--env JAVA_OPTS=-Xmx2g`

    Jenkins 메모리 제한을 2GB로 설정

- timezone 설정

    - `-v /etc/localtime:/etc/localtime:ro`

        EC2 서버의 타임존 가져와서 마운트

    - `-e TZ=Asia/Seoul`

- `-v /jenkins:/var/jenkins_home`

    Jenkins 설정을 저장하도록 볼륨 마운트

- `-v /var/run/docker.sock:/var/run/docker.sock`

    `docker.sock`은 docker 서비스와 통신하기 위한 주요 경로

- `-v /usr/bin/docker-compose:/usr/bin/docker-compose`

    Docker Compose 볼륨 마운트 => Jenkins 내부에 Docker Compose를 설치하지 않아도 사용할 수 있음

- `--name jenkins`

    Docker Container name 지정

### Jenkins 초기 비밀번호 확인

```bash
docker exec -it jenkins bash

cat /var/jenkins_home/secrets/initialAdminPassword
```

### Jenkins 내부에 Docker 설치

Docker Compose는 외부 볼륨을 마운트 해두었기 때문에 따로 설치하지 않아도 동작함.

```bash
docker exec -it jenkins bash

apt-get update
apt-get -y install apt-transport-https ca-certificates curl gnupg2 software-properties-common
curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg > /tmp/dkey; apt-key add /tmp/dkey
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") $(lsb_release -cs) stable"

apt-get update
apt-get -y install docker-ce
```

## Jenkins 설정

### Gitlab 연동을 위해 필요한 Jenkins Plugins

- SSH Agent
- Docker
- Docker Commons
- Docker Pipeline
- Docker API
- Generic Webhook Trigger
- GitLab
- GitLab API
- GitLab Authentication

### Credentials 추가하기

[Jenkins 관리] - [Credentials] - [Add Credentials]

- `Username`: Gitlab ID
- `Password`: GItlab Password
- `ID`: Script에서 사용할 변수명

## Pipeline

### 새로운 Pipeline 생성

[새로운 Item] - [Pipeline]

✅ Build when a change is pushed to GitLab. GitLab webhook URL: http:~~

✅ Push Events

[고급]

✅ Enable [ci-skip]

✅ Ignore WIP Merge Requests

✅ Set build description to build casuse (eg. Merge request or Git Push)

✅ Allow all branches to trigger this job

**`Generate`** ⇒ token 확인

### Gitlab webhook 설정

[Settings] - [Webhooks]

- `URL` : Gitlab Webhook URL
- `Secret token` : Jenkins에서 생성한 token
- `Trigger - Push Event - Wildcard pattern` : 브랜치명 입력

### Pipeline Script 작성

**기본적인 서버 실행 과정**

1. clone 받기
2. 환경 변수 설정
3. 실행 중인 docker 종료
4. build
5. 실행

⇒ Jenkins Pipeline Script도 이 순서대로 작성함.

본 프로젝트에서는 **Declarative Pipeline**로 script를 작성함.

[Jenkinsfile](../../infra/j9a602/Jenkinsfile)

```groovy
pipeline {
  agent any

  stages {
    stage('Clone Repository') {
      steps {
        echo 'Clone Repository'
        git branch: '<브랜치명>', url: '<Repository URL>', credentialsId: '<생성한 Credential ID>'
      }
    }

    stage('Set Environment') {
      steps {
        echo 'Copy require file to pipeline folder'
        sh 'cp <Jenkins 내부의 환경변수 파일 위치> <환경변수 파일이 위치해야할 곳>'
      }
    }

    stage('Docker down') {
      steps {
        echo 'Docker compose down'
        sh 'sudo docker-compose down --rmi all'
      }
    }

    stage('Docker Build') {
        steps {
        echo 'docker compose build'
        sh 'sudo docker-compose build --no-cache'
        }
        post {
            success {
                echo 'Success to build'
            }
            failure {
                echo 'Docker build failed. clear unused file'
                sh 'sudo docker system prune -f'
                error 'pipeline aborted'
            }
        }
    }

    stage('Docker up') {
      steps {
        echo 'Docker compose up'
        sh 'sudo docker-compose up -d'
      }
    }

    stage('Docker clear') {
      steps {
        sh 'docker system prune -f'
      }
    }
  }
}
```

## Jenkins - Mattermost 연동하기

### Mattermost Incoming Webhook 설정

[통합] - [전체 Incoming Webhook] - [Incoming Webhook 추가하기]

⇒ 생성된 Webhook 주소 저장

### Jenkins 설정

1. `Mattermost Notification Plugin` 설치

2. [Jenkins 관리] - [System] - [Global Mattermost Notifier Settings]

    - `Endpoint` : 생성된 Webhook 주소
    - `Channel` : Incoming Webhook 추가 시 설정한 채널명
    - `Build Server URL` : Jenkins 주소

### Pipeline Script 추가

```groovy
pipeline {
	agent any

	stages {
		stage () {}
	}

	post {
	    success {
	    	script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()

                mattermostSend (
                    color: 'good',
                    message: "배포 성공: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)",
                    endpoint: '<webhook endpoint>',
                    channel: '<알림 받을 채널명>'
                )
	        }
	    }
	    failure {
	    	script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()

                mattermostSend (
                    color: 'danger',
                    message: "배포 실패: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)",
                    endpoint: '<webhook endpoint>',
                    channel: '<알림 받을 채널명>'
                )
	        }
	    }
	}
}
```
