---
title: "[RabbitMQ] What is RabbitMQ"
slug: 00-rabbitmq
date: 2022-03-09
published: false
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

--- 

**출처**

- [AWS - Message Queue](https://aws.amazon.com/ko/message-queue/)
- [Kafka vs RabbitMQ](https://coding-nyan.tistory.com/129)
- [메시지큐(Message Queue) 알아보기](https://12bme.tistory.com/176)
- [What is AMQP and why is it used in RabbitMQ?](https://www.cloudamqp.com/blog/what-is-amqp-and-why-is-it-used-in-rabbitmq.html)
- [(번역)마이크로서비스 - RabbitMQ를 사용하는 이유](https://velog.io/@cckn/%EB%B2%88%EC%97%AD%EB%A7%88%EC%9D%B4%ED%81%AC%EB%A1%9C%EC%84%9C%EB%B9%84%EC%8A%A4-RabbitMQ%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0)
- [[AMQP][RabbitMQ]RabbitMQ를 사용하는 이유와 설치방법](https://kamang-it.tistory.com/entry/AMQPRabbitMQRabbitMQ%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0%EC%99%80-%EC%84%A4%EC%B9%98%EB%B0%A9%EB%B2%95-1)


