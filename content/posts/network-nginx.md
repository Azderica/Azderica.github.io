---
title: '[Network] NGINX란?'
slug: 00-network-nginx
date: 2021-01-14
published: true
tags: ['Network', 'Nginx', 'Web', 'Server', 'Backend']
series: false,
cover_image: ./images/NginxLogo.png
canonical_url: false
description: 'NGINX에 대해 작성합니다.'
---

# Nginx란.

## Nignx의 정의.

Nginx는 가벼움과 높은 성능을 목표로 하는 웹서버 소프트웨어입니다.

이러한 Nginx는 트래픽이 많은 웹사이트를 위해 확장성을 위해 설계한 비동기 이벤트 기반 구조를 가지고 있습니다.

일반적으로 **웹 서버, 리버스 프록시 및 메일 프록시** 기능을 가집니다.

<br/>

## Apache VS Nginx

주로 Nginx는 Apache 서버와 비교를 하는데, 현재는 Nginx가 1위를 차지하고 있습니다.

![server-rank](https://user-images.githubusercontent.com/42582516/104517057-bd5bcf00-5638-11eb-8e24-859c5bf2ee88.png)

> Apache

- 쓰레드 / 프로세스 기반 구조로 요청 하나당 쓰레드 하나가 처리하는 구조입니다.
- 사용자가 많으면 많은 쓰레드가 생성되고, 메모리와 CPU 낭비가 심합니다.

> Nginx

- 비동기 Event-Driven 기반의 구조입니다.
- 다수의 연결을 효과적으로 처리가능합니다.
- 대부분의 코어 모듈이 Apache보다 적은 리소스로 더 빠르게 동작가능합니다.
- 더 작은 쓰레드로 클라이언트의 요청들을 처리 가능합니다.

Apache와 Nginx의 가장 큰 차이는 Thread 방식과 Event-drive의 차이입니다.

![Thread-VS-Event-Driven](https://user-images.githubusercontent.com/42582516/104517420-4bd05080-5639-11eb-92a5-dc3f78cc5891.png)

다음 그림처럼 쓰레드 기반은 하나의 커넥션 당 하나의 쓰레드를 사용하지만, Event-driven 방식은 여러 커넥션을 모두 Event-Handler를 통해 비동기 방식으로 처리해서 먼저 처리되는 것부터 로직이 진행됩니다.

<br/>

## Nginx 활용

Nginx은 다음과 같은 기능으로 사용할 수 있습니다.

- HTTP Server
  - 정적 파일을 처리하는 web server의 역할을 수행합니다.
- Reverse proxy server
  - 클라이언트의 요청을 Application server에 배분합니다.
  - 클라이언트 80포트 요청을 8080, 8081 등 여러 Application server로 보내줍니다.
  - 각 application server에 요청을 배분해서 부하를 분산합니다. (load balancing)
- Mail proxy server
- Generic TCP/UDP proxy server

<br/>

## Nginx Proxy

node.js에서 nginx.conf를 파일을 수정하여 아래처럼 수정하면됩니다.

```conf
server {
  listen    81;
  server_name localhost;

  location / {
    proxy_pass http://127.0.0.1:3000/;
  }
}
```

다음과 같이 수정을 하게 되면, 81번 포트로 접속을 해도 3000번 포트의 서버에 접속이 되게됩니다.

<br/>

## 마무리.

오늘은 간략하게 Nginx에 대해 정리해보았습니다.

---

**출처**

- http://nginx.org/en/
- https://news.netcraft.com/
- https://smjeon.dev/etc/nginx/
- https://m.blog.naver.com/jhc9639/220967352282
