---
title: '[Docker] Docker란?'
slug: 00-docker
date: 2020-11-19
published: true
tags: ['Docker', 'Containter', 'Backend']
series: false
cover_image: ./images/DockerLogo.png
canonical_url: false
description: ' 도커에 대한 기본 내용을 정리한 글입니다. '
---

# Docker.

![image](https://user-images.githubusercontent.com/42582516/99796462-dd0ed380-2b70-11eb-9ed1-88a6f7dbd2be.png)

> 귀여운 고래 모습을 볼 수 있다.

도커에 대해 사용하고 있으나, 도커에 대한 명확한 정의를 할려고하면, 컨테이너화 기술 정도밖에 기억이 나지않는다.

그래서 이번 기회에 docker(도커)에 대해서 한 번 정의해볼려고 한다.

<br/>

## Docker의 정의

- Linux 컨테이너를 만들고 사용할 수 있도록 하는 컨테이너화 기술
- 컨테이너 기반의 오픈소스 가상화 플랫폼
  - PC, AWS, Azure, Google Cloud 등에서 어디든 실행할 수 있습니다.

<br/>

## Container(컨테이너)

격리된 공간에서 사용되는 프로세스가 동작하는 기술입니다. 컨테이너와 같은 가상화 기술 말고도, VMware 등과의 가상화 기술과는 차이가 있습니다.

컨테이너는 마이크로서비스, 애플리케이션 등을 실행하는데 필요한 모든 것이 포함되어 있습니다. 컨테이너에 있는 모든 것은 '이미지'라는 모든 라이브러리와 종속성 등을 포함하는 파일에 저장됩니다.

![image](https://user-images.githubusercontent.com/42582516/99797425-915d2980-2b72-11eb-8e11-8b7be0b4f30a.png)

VM과 같이, 추가적인 OS를 설치하여 가상화하는 것은 성능상의 문제가 있습니다. 최근 HVM(CPU 가상화 기술)등을 이용한 기술이 있지만 이 또한 Docker에 비해 성능적 이슈가 존재합니다.

프로세스를 컨테이너로 격리하여 사용하는 방법은 프로세스만을 격리시키기 때문에 빠르게 동작합니다. CPU나 메모리 모두 필요한 만큼만 추가로 사용하고 성능적으로도 거의 이슈가 없습니다.

하나의 서버에 여러개의 컨테이너를 돌려도 서로 영향을 미치지 않고, 독립적으로 실행되기 때문에 가벼운 느낌을 받을 수 있습니다. 실행중인 컨테이너에서 명령어를 입력할 수 있고, 사용자를 추가하거나 여러개의 프로세스를 백그라운드로 실행될 수도 있습니다. 더 나아가서 CPU나 메모리 사용량을 제한할 수 있고, 호스트의 특정 포트와 연결하고 호스트의 특정 디렉토리를 내부 디렉토리인 것처럼 사용할 수도 있습니다.

<br/>

### **But, 무조건 컨테이너가 답인가요?**

> VM과 Container는 사용시기가 다릅니다.

#### VM이 좀 더 유리할 때

- 기존, 레거시 및 모놀리식 워크로드를 가져올 때
- 위험한 개발 사이클을 분리할 때
- 인프라 리소스(네트워크 ,서버, 데이터 등)의 프로비저닝
- 다른 OS에서 다른 OS를 실행할 때 (Ex, Linux -> Unix)

#### 컨테이너가 유리할 때

- Cloud native application을 빌드 할 때
- 마이크로서비스 패키징 등에서
- DevOps나 CI/CD 등의 환경에서
- 동일한 OS를 공유하는 다양한 공간에서 확장할 때

<br/>

## Image(이미지)

도커에서 가장 중요한 개념은 컨테이너와 더불어 다른 하나는 이미지(Image)입니다.

![image](https://user-images.githubusercontent.com/42582516/99798882-1cd7ba00-2b75-11eb-92ff-8af89b0eafee.png)

이미지는 앞서 이야기 했듯이 **컨테이너 실행에 필요한 파일과 설정값을 포함하고 있는 파일**입니다. 이러한 이미지는 상태값을 가지지 않고 변하지 않습니다.

위의 그림처럼, 컨테이너는 이미지를 실행한 상태라고 볼 수 있으며 추가/변경 사항은 컨테이너에 저장됩니다. 같은 이미지에서는 여러개의 컨테이너를 생성할 수 있고 컨테이너의 상태가 바뀌거나 삭제되더라도 이미지는 변하지 않고 남아 있습니다.

이미지의 예시로는 다음과 같습니다.

- ubuntu image, db image, nginx 등등이 존재합ㄴ니다.
- 좀 더 자세하게 보고 싶다면 아래의 링크를 추천드립니다.
  - [Docker Hub](https://hub.docker.com/)
  - [Docker Repository](https://docs.docker.com/registry/)

<br/>

## Docker의 장점.

### 레이어 저장방식

![image](https://user-images.githubusercontent.com/42582516/99800041-11858e00-2b77-11eb-8ef4-c1d0187332a5.png)

도커 이미지는 컨테이너를 실행하기 위한 모든 정보를 가지고 있기 때문에 용량이 큽니다. 이러한 이미지가 쌓일수록 비효율적입니다.

이를 해결하기 위해서 도커는 레이어의 개념을 사용합니다. 윗 사진처럼 ubuntu가 A, B, C의 레이어를 가지고 nginx가 A, B, C, nginx 등의 레이어를 가진다면 A, B, C는 중복되기 때문에 nginx 레이어만 받으며, 효율적으로 이미지를 관리합니다.

이렇기 때문에 기존의 이미지 레이어 위에 여러 컨테이너를 생성하더라도 최소양의 용량만 사용합니다.

### 이미지 경로

![image](https://user-images.githubusercontent.com/42582516/99871551-169e1800-2c1f-11eb-8b5a-31f81ee8ece8.png)

이미지를 url 방식으로 관리해서 태그를 붙일 수 있습니다. ubuntu 14.04의 이미지는 `docker.io/libary/ubuntu:14.04`이나 `docker.io/libaray/ubuntu:trusty`이며, `docker.io/library` 는 생략할 수 있습니다. 이러한 방식을 통해서 이해하기 쉽고 편리하게 사용할 수 있습니다.

### Dockerfile

도커는 이미지 파일을 만들기 위해서 `Dockerfile`이라는 파일에 DSL(Domain-specific language) 언어를 통해서 이미지 생성 과정을 작성합니다.

```docker
FROM ubuntu:18.04
COPY . /app
RUN make /app
CMD python /app/app.py
```

다음과 같이, `Dockerfile` 의 예시를 볼 수 있습니다. 위의 샘플은 복잡하지 않다는 것을 알 수 있습니다.

다음에 대해서 간략하게 설명하면, 다음과 같습니다.

- FROM : ubuntu:18.04 Docker image으로 부터 레이어를 만듭니다.
- COPY : Docker의 현재 directory에 파일을 추가합니다.
- RUN : make를 통해 어플리케이션을 빌드합니다.
- CMD : 해당 컨테이너안에서 어떠한 명령을 할지 특정합니다.

해당 `Dockerfile`을 통해서 어떤 프로그램을 설치할려고 할때, 쉽게 관리할 수 있습니다.

### Docker Hub

`Docker Hub`를 통해서 공개 이미지를 무료로 사용할 수도 있습니다.

### Command, API

`Docker` 클라이언트의 커맨드 명령어는 쉽게 만들어져있습니다.

간단한 명령어는 다음과 같습니다.

| 명령어                                      | 내용                                    |
| ------------------------------------------- | --------------------------------------- |
| `docker search {image-name}`                | docker hub로부터 이미지 검색            |
| `docker pull {image-name}`                  | docker hub로부터 이미지 다운로드        |
| `docker images`                             | 현재 PC에 다운 받아있는 이미지등을 출력 |
| `docker run <옵션> {image-name} <실행파일>` | 컨테이너 생성과 동시에 접속             |
| `docker ps`                                 | 실행중인 컨테이너 확인                  |
| `docker start {containter-Id}`              | 종료된 컨테이너 실행                    |

이 외에도 다양한 명령어와 옵션 등이 있지만, 간단하게 설명했습니다.

### 좋은 생태계와 커뮤니티

도커는 큰 생태계를 가지고 있으며, 좋은 커뮤니티를 가지고 있습니다. 많은 기업들과 협력하여서 클라우드 컨테이너에서 사실상의 표준이 되었습니다.

또한, 발전속도가 빠른 오픈소스이기때문에, 사용하면서 필요한 부분은 대부분 금방 나오고 있습니다.

## 마무리.

도커에 대한 이론적인 부분에 대해, 간략하지만 크게 정리하였습니다. 이후 도커를 직접 설치하고, 이를 활용하는 모습은 이후에 추가적으로 정리하겠습니다. 감사합니다.

---

**출처**

- https://www.redhat.com/ko/topics/containers/what-is-docker
- https://subicura.com/2017/01/19/docker-guide-for-beginners-1.html
- https://www.redhat.com/ko/topics/containers/containers-vs-vms
- https://siner308.github.io/2019/02/25/django-docker-custom-image/
- https://captcha.tistory.com/49
- https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
