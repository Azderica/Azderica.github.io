---
title: "[RabbitMQ] What is RabbitMQ"
slug: 00-rabbitmq
date: 2022-03-09
published: true
tags: ["RabbitMQ", "Kafka", "Platform", "Message Queue", "Backend"]
series: false
cover_image: ./images/RabbitmqLogo.png
canonical_url: false
description: " RabbitMQ에 대한 기본적인 내용을 정리하고, Kafka와의 차이에 대해 서술합니다."
---

# What is RabbitMQ.

과거 오래전에 Kafka에 대한 개념을 정리했습니다. (그 후로 따로 업무에서 사용해본적은 없지만...) 그럼에도 불구하고 백엔드 개발자라면 이후 필요시 사용할 수 있다고 생각하기 때문에 오늘은 rabbitmq에 대해 정리합니다. 마찬가지로 쓴 적은 없지만, NAS 서버의 앞단에 rabbitmq가 설치된 것은 봤습니다.

- [카프카 공부](https://azderica.github.io/00-kafka/)

<br/>

## 메시지 큐

들어가기 앞서, 메시지 큐에 대한 내용부터 잡습니다. 메시지 큐(message queue)는 **서버리스 및 마이크로서비스 아키텍처에서 사용되는 비동기 서비스 간 통신의 한 형태**입니다.

![message queue](https://user-images.githubusercontent.com/42582516/157424872-337442d7-0166-4f18-b6bb-82ff29a6db6a.png)

메시지 큐를 통해 시스템의 서로 다른 부분이 통신하고 비동기식으로 작업을 처리할 수 있습니다.

- 메시지 큐는 메시지를 임시로 저장하는 간단한 버퍼를 제공합니다.
- 메시지 전송 및 수신을 위해 허용하는 엔드포인트를 제공합니다.
- 생산자라 부르는 구성 요소가 메시지를 대기열에 추가하고, 소비자라 부르는 구성요소가 메시지를 검색하고 이를 사용해 어떤 작업을 수행할 때까지 대기열 에 저장됩니다.

### 메시지 큐의 장점

메시지 큐는 다음의 장점을 가집니다.

- Asynchronous(비동기) : Queue에 넣음을 통해서 나중에 처리 가능합니다.
- Decoupling(비동조) : Application과 분리할 수 있습니다.
- Resilience(탄력성) : 일부가 실패해도 전체에 영향을 받지 않습니다.
- Redundancy(과잉) : 실패시 재실행이 가능합니다.
- Guarantees(보증) : 작업 처리에 대해 확인이 가능합니다.
- Scalable(확장성) : 다수의 프로세스뜰이 큐에 메시지를 보낼 수 있습니다.

위의 장점들을 살리기 위해 일반적으로 **메시지 큐**를 사용합니다.

### 이때 메시지 큐가 적합합니다.

- 다른 곳의 API로부터 데이터 송수신이 가능합니다.
- 다양한 애플리케이션에서 비동기 통신을 할 수 있습니다.
- 이메일 발송 및 문서 업로드가 가능합니다.
- 많은 양의 프로세스들을 처리할 수 있습니다.


<br/>

## RabbitMQ는 그래서 뭐야?

> RabbitMQ is the most widely deployed open source message broker (공식 홈페이지)

> RabbitMQ는 가장 널리 퍼져있는 오픈소스 메세지브로커입니다.

RabbitMQ는 다음을 지원합니다.

- AMQP 프로토콜을 구현해 놓은 프로그램입니다.
  - *AMQP : Advanced Message Queuing Protocol의 약자이며 IP 네트워크를 통한 프로세스 간 통신에 중점을 둔 애플리케이션 계층 프로토콜입니다.
  - [AMQP에 대한 상세 설명](https://www.cloudamqp.com/blog/what-is-amqp-and-why-is-it-used-in-rabbitmq.html)
- 신뢰성, 안전성, 성능을 충족할 수 있도록 다양한 기능을 제공합니다.
- 유연한 라우팅: Message Queue가 도착하기 전에 라우팅되며 플러그인을 통해 더 복잡한 라우팅도 가능합니다.
- 클러스터링을 제공합니다.
  - *클러스터링 : 로컬네트워크에 있는 여러 RabbitMQ 서버를 논리적으로 클러스트링할 수 있고 논리적인 브로커도 가능합니다.
- 관리 UI가 있어 편하게 관리 가능합니다.
- 거의 모든 언어와 운영체제를 지원합니다.
- 오픈소스로 상업적 지원이 가능합니다.

<br/>

## RabbitMQ 외의 서비스

### ActiveMQ

- 풀자바 메시지 서비스(JMS) 클라이언트와 함께 자바로 만든 오픈소스 메시지 브로커
- 시스템은 엔터프라이즈 기능을 제공합니다.

다음의 특징이 있습니다.

- 다양한 언어 환경의 클라이언트들과 프로토콜을 지원합니다.
- Spring 지원으로 쉽게 설정이 가능합니다.
- 고성능의 저널을 사용할 때에 JDBC를 사용하여 매우 빠른 Persistnece을 지원합니다.
- 고성능의 클러스터링, 클라이언트-서버, Peer 기반 통신을 지원을 위한 설계가 되어 있습니다.
- REST API를 통해 웹기반 메시징 API를 지원합니다.
- 웹브라우저가 메시징 도구가 될 수 있도록, Ajax를 통해 순수한 DHTML을 사용한 웹스트리밍을 지원합니다.

### ZeroMQ

- 메시징 라이브러리
- 복잡한 커뮤니케이션 시스템을 설계할 수 있도록 해줍니다.
- ZeroMQ는 in-process, inter-process, TCP, and multicast 처럼 다양한 방식으로 메시지를 전송하는 소켓을 제공합니다.

다음의 특징을 가집니다.

- 퍼포먼스
  - AMQP보다 빠르며, AMQP처럼 과도하게 복잡한 프로토콜이 없습니다.
  - 신뢰성 있는 멀티캐스트같은 효율적인 전송을 활용합니다.
  - 지능적인 메시지 묶음을 확용합니다.
- 단순성
  - 비동기 send 호출을 부르기만 하면, 메시지를 별도의 큐에 넣고 필요한 모든 일을 해줍니다.
  - 이벤트 중심의 프레임워크에도 최적입니다.
- 확장성
  - 복수의 접점을 가질 수 있으며, 자동으로 메시지 부하 분산을 수행합니다.

### Kafka

- 대용량의 실시간 로그 처리에 특화되어 설계된 메시징 시스템으로서 기존 범용 메시징 시스템대비 TPS가 매우 우수합니다.
- 분산 시스템을 기본으로 설계되었기 때문에, 기존 메시징 시스템에 비해 분산 및 복제 구성을 손쉽게 할 수 있습니다.
- AMQP 프로토콜이나 JMS API를 사용하지 않고 단순한 메시지 헤더를 지닌 TCP 기반의 프로토콜을 사용하여 프로토콜에 의한 오버헤드를 감소시킵니다.

상세 내용은 [카프카 공부](https://azderica.github.io/00-kafka/) 을 참조하면 좋습니다.

<br/>

## Kafka 와 RabbitMQ 중에서 어떤 것을 선택할 것인가.

> 일반적으로 많이 사용하는 두 메시지큐인 Kafka와 RabbitMQ를 비교합니다.

- RabbitMQ는 메시지 브로커 방식이고, Kafka는 pub/sub 방식입니다.
- 메시지브로커
  - 메시지브로커는 응용프로그램, 서비스 및 시스템이 정보를 통신하고 교환할 수 있도록 하는 소프트웨어 모듈입니다
  - 메시지 브로커는 지정된 수신인에게 메시지를 확인, 라우팅, 저장 및 배달합니다.
- pub/sub
  - 생산자가 원하는 각 메시지를 게시할 수 있도록 하는 메시지 배포 패턴입니다.

일반적으로 Kafka는 고성능을 추구하기 때문에 비교적 무거우나, 대용량 데이터를 다루지 않는다면 가벼운 RabbitMQ가 더 낫습니다.

### Kafka가 적절한 경우

- Kafka는 복잡한 라우팅에 의존하지 않고 최대 처리량으로 스트리밍하는데 가장 적합합니다.
- 이벤트 소싱, 스트림 처리 및 일련의 이벤트로 시스템에 대한 모델링 변경을 수행하는 데 이상적입니다.
- Kafka는 다단계 파이프라인에서 데이터를 처리하는데도 적합합니다.
- 스트리밍 데이터를 저장, 읽기, 다시 읽기 및 분석하는 프레임워크가 필요한 경우에 더 좋습니다.
- 특히, **정기적으로 감사하는 시스템이나 메시지를 영구적으로 저장하는 데 이상적입니다.**

### RabbitMQ가 적절한 경우

- 복잡한 라우팅의 경우 RabbitMQ를 사용합니다.
- RabbitMQ는 신속한 요청-응답이 필요한 웹 서버에 적합합니다.
- 부하가 높은 작업자 간에 부하를 공유합니다.
- RabbitMQ는 백그라운드 작업이나 PDF 변환, 파일 검색 또는 이미지 확장과 같은 장기 실행 작업도 처리할 수 있습니다.
- 즉, **장시간 실행되는 태스크, 안정적인 백그라운드 작업 실행, 애플리케이션 간/내부 통신/통합이 필요할 때 RabbitMQ를 사용합니다.**

<br/>

## 그외 용어에 대한 설명

### JMS란.

- JMS는 MOM(Message-Oriented Middleware, 메시지 지향 미들웨어)을 자바에서 지원하는 표준 API
- Java EE에 기반한 애플리케이션 구성요소에서 메시지를 작성, 전송, 수신하고 읽을 수 있도록 하는 API
- JMS는 서버 구성을 통해 큐와 같은 기타 자원을 관리할 수 있습니다.
- JMS는 다른 자바 애플리케이션들끼리 통신이 가능하지만 다른 MOM의 통신이 어렵습니다. (ex. AMQL, SMTP)
- JMS 라이브러리는 AMQP를 지원하지 않습니다.

다음의 필수요소를 지원합니다.

- 메시지 경로를 지정하고 전달하는 메시징 공급자 개념
- 별개의 메시징 패턴 또는 도메인
- 동기식 및 비동기식 메시지 수신 기능
- 안정적인 메시지 전달 지원
- 공통 메시지 형식

조금 더 상세한 정보를 보고 싶다면 아래를 공유합니다.

- [JMS 상세 내용](https://www.ibm.com/docs/ko/cics-ts/5.6?topic=server-java-message-service-jms)]
- [MOM 표준으로서의 JMS](https://docs.oracle.com/cd/E19148-01/820-0532/gbpdg/index.html)

### AMQP에 대해 상세하게 보기

![AMQP 명세](https://user-images.githubusercontent.com/42582516/157615147-53398e01-737a-40b7-8550-8ed9034947e6.png)


- AMQP는 ISO 응용 계층의 MOM 표준입니다.
- AMQP는 IP 네트워크 간의 프로세스 간 통신에 초점을 맞춘 응용 프로그램 계층 프로토콜
- AMQP의 목표는 TCP/IP 연결을 통해 메시지를 브로커 서비스를 통해 전달할 수 있도록 하는 것입니다.
- AMQP는 프로토콜만 맞다면 다른 AMQP를 사용한 애플리케이션끼리 통신이 가능합니다.
- AMQP는 이진 프로토콜입니다.

상세한 내용은 아래와 같습니다.

- [What is AMQP ...](https://www.cloudamqp.com/blog/what-is-amqp-and-why-is-it-used-in-rabbitmq.html)

--- 

**출처**

- [AWS - Message Queue](https://aws.amazon.com/ko/message-queue/)
- [Kafka vs RabbitMQ](https://coding-nyan.tistory.com/129)
- [메시지큐(Message Queue) 알아보기](https://12bme.tistory.com/176)
- [What is AMQP and why is it used in RabbitMQ?](https://www.cloudamqp.com/blog/what-is-amqp-and-why-is-it-used-in-rabbitmq.html)
- [(번역)마이크로서비스 - RabbitMQ를 사용하는 이유](https://velog.io/@cckn/%EB%B2%88%EC%97%AD%EB%A7%88%EC%9D%B4%ED%81%AC%EB%A1%9C%EC%84%9C%EB%B9%84%EC%8A%A4-RabbitMQ%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0)
- [[AMQP][RabbitMQ]RabbitMQ를 사용하는 이유와 설치방법](https://kamang-it.tistory.com/entry/AMQPRabbitMQRabbitMQ%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0%EC%99%80-%EC%84%A4%EC%B9%98%EB%B0%A9%EB%B2%95-1)


