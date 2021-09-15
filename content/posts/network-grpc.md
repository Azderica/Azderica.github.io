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

## gRPC의 장점

### 성능

- 효율적인 이진 메시지 형식인 Protobuf를 사용해 직렬화합니다.
- 작은 메시지 페이로드를 발생시켜 모바일 앱과 같은 제한된 대역폭 시나리오에서 중요합니다.
- 이진 프레이밍 및 압축, HTTP/2 프로토콜은 간단하며, 보내고 받을 때 모두 효율적입니다.

### 코드 생성

- gRPC 프레임워크는 코드 생성에 대한 최고 수준의 지원을 제공합니다.
- gRPC 프레임워크는 .proto 파일에서 서비스 기본 클래스, 메시지, 전체 클라이언트를 생성합니다.

### 엄격한 사양

- gRPC는 플랫폼 및 구현에 상관없이 일치하므로 이를 준수하기만 하면 됩니다.
- [gRPC 서비스가 따라야 하는 형식에 대한 지침](https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-HTTP2.md)

### 스트리밍

- HTTP/2는 수명이 긴 실시간 통신 스트림에 대한 기초를 제공합니다.
- gRPC 서비스는 모든 스트리밍 조합을 지원합니다.
  - 단항(스트리밍 없음), 서버-클라이언트 스트리밍, 클라이언트-서버 스트리밍, 양방향 스트리밍

### 최종 기한/시간 초과 및 취소

- gRPC는 클라이언트가 RPC가 완료될 때까지대기하는 기간을 지정하도록 할 수 있습니다.
- 최종기한이 서버에 전송되고 서버에서 최종 기한을 초과하는 경우 수행할 결정을 결정할 수 있습니다. (ex. 요청 취소 등)
- 자식 gRPC 호출을 통해 최종 기한 및 취소를 전파하면 리소스 사용 제한이 가능합니다.

<br/>

## gRPC가 적합한 상황인 경우

### 마이크로 서비스

- gRPC는 대기 시간이 짧고 처리량이 높은 통신을 위해 설계되었습니다.
- gRPC는 효율성이 중요한 경량 마이크로 서비스에 적합합니다.

### 지점간 실시간 통신

- 양방향 스트리밍을 위한 뛰어난 지원 기능을 제공합니다.
- gRPC 서비스는 풀링을 사용하지 않고 실시간으로 메시지 푸쉬가 가능합니다.

### Polyglot 환경

- gRPC 도구는 널리 사용되는 모든 개발 언어를 지원하여, 다중 언어 환경에서 적합합니다.

### 네트워크 제한 환경

- gRPC 메시지는 경량 메시지 형식인 Protobuf를 사용해 직렬화됩니다.

### IPC(프로세스 간 통신)

- [gRPC와 프로세스 간 통신](https://docs.microsoft.com/ko-kr/aspnet/core/grpc/interprocess?view=aspnetcore-5.0)

<br/>

## gRPC의 약점

### 제한된 브라우저 지원

- 현재 브라우저에서 gRPC 서비스를 직접 호출하는 것은 불가능합니다.
- gRPC는 HTTP/2 기능을 많이 사용하며 브라우저에는 웹 요청에 필요한 제어 수준을 제공하지 않습니다.

#### gRPC를 브라우저 앱으로 가져오는 방법

- [gRPC-Web](https://grpc.io/docs/platforms/web/basics/)
- [gRPC에서 JSON 웹 API](https://docs.microsoft.com/ko-kr/aspnet/core/grpc/httpapi?view=aspnetcore-5.0)

### 사람이 읽을 수 없습니다.

- gRPC 메시지는 기본적으로 Protobuf로 인코딩됩니다.
- 이를 읽을려면 추가적인 도구가 필요합니다. (서버 리플렉션이나 gRPC 명령줄 도구)

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
- [Microservices with gRPC](https://medium.com/@goinhacker/microservices-with-grpc-d504133d191d)
