---
title: '[Network] gRPC란?'
slug: 00-network-gRPC
date: 2021-09-15
published: true
tags: ['Network', 'gRPC', 'HTTP', 'Server', 'Backend']
series: false
cover_image: ./images/GrpcText.jpg
canonical_url: false
description: 'gRPC의 개념과 HTTP API의 차이점에 대해 작성합니다.'
---

# gRPC

![image](https://user-images.githubusercontent.com/42582516/133439409-25e1eb69-4d77-4428-abeb-bb20ad3ef5df.png)

## gRPC란

- gRPC는 높은 성능의 오픈소스 범용 RPC 프레임워크입니다.
- 기본적인 개념은 RPC와 동일하지만 특징으로 HTTP/2 기반으로 양방향 스트리밍을 지원하며 메시지의 압축률과 성능이 좋습니ㅏㄷ.

### RPC란

- Remote Procedure Call의 약자로 프로세스간의 통신 기법 중 하나입니다.
- 다른 프로세스에 있는 함수를 호출할 때, 마치 같은 프로세스내에 있는 것 처럼 호출가능합니다. (클라이언트는 일반 로컬 메소드처럼 사용)
- 다양한 환경, 플랫폼에 제약없이 사용할 수 있기 때문에 분산 시스템 기법에 효과적입니다.

![RPC](https://user-images.githubusercontent.com/42582516/133439697-c1e7a3b7-733e-46ba-aa9b-098d580e286e.png)

> RPC 진행 과정

1. Client가 자신의 Stub을 호출합니다.
2. Stub은 Client가 넘겨준 Parameter들을 Server와 통신할 수 있는 표준 메세지 형태로 변환한 후 Server에 메시지 전송합니다.
3. Server측에서는 Client가 Stub을 통해 전송한 메세지를 Server의 Stub에 넘겨줍니다.
4. Server측의 Stub은 Client가 전송한 메세지를 자신이 이해할 수 있는 형태로 변환을 해서 Client가 호출한 Method를 실행합니다.
5. Method 실행 결과를 Stub을 통해 Client에게 전달합니다.
6. Client는 Server와 같은 방식으로 Server가 전송한 메세지를 받고 이해햡니다.

> stub?

Client와 Server가 통신할 수 있도록 메시지의 형태를 변환하는 프로그램

<br/>

## gRPC의 특징

<br/>

## gRPC의 장점

<br/>

## gRPC와 HTTP API와의 차이

| 기능                 | gRPC                     | HTTP API with JSON       |
| -------------------- | ------------------------ | ------------------------ |
| 계약                 | 필수(.proto)             | 선택 사항(Open API)      |
| 프로토콜             | HTTP/2                   | HTTP                     |
| Payload              | Protobuf(소형, 이진)     | JSON(대형, 가독성)       |
| 규범                 | 엄격한 사양              | 느슨함, 모든 HTTP가 유효 |
| 스트리밍             | 클라이언트, 서버, 양방향 | 클라이언트, 서버         |
| 브라우저 지원        | 아니요(gRPC-웹 필요)     | 웹                       |
| 보안                 | 전송(TLS)                | 전송(TLS)                |
| 클라이언트 코드 생성 | 예                       | OpenAPI + 타사 도구      |

---

**출처**

- [What is RPC](http://what-and-why-and-how.blogspot.com/2019/11/rpc-what-is-rpc-remote-procedure-call.html)
- [ms docs, gRPC Service and HTTP API](https://docs.microsoft.com/ko-kr/aspnet/core/grpc/comparison?view=aspnetcore-5.0)
