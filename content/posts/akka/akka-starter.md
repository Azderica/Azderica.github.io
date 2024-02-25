---
title: '[Akka] Akka이란?'
slug: 00-akka-starter
date: 2021-01-24
published: true
tags: ['Opensource', 'Akka', 'Concurrency', 'Java']
series: false
cover_image: ./images/AkkaLogo.png
canonical_url: false
description: 'Akka에 대한 기본 내용을 정리합니다.'
---

# Akka

회사에서는 주로 사용하는 언어는 C#과 Java인데, 분산처리 환경에 대한 이야기를 보다보면 Akka에 대해 들어보게 됩니다. 그러나 저에게는 너무 생소한 개념이라 한번 정리의 필요성을 느꼈습니다.

## Akka란?

- **JVM 상의 동시성과 분산 어플리케이션을 단순화 하는 오픈 소스 툴킷**입니다.
- 동시성을 위해 여러 프로그래밍 모델을 지원하며, Erlang으로부터 영향을 받아서 actor기반의 동시성이 두드러집니다.
- Akka는 Java환경 및 .net Framework에서 이용가능하며, Actor 모델은 이제 대부분으 개발플랫폼에서 툴킷형태로 사용가능합니다.
  - [Akka Scala Document](https://doc.akka.io/docs/akka/2.4/scala.html#scala-api)
  - [Akka Java Document](https://doc.akka.io/docs/akka/2.4/java.html#java-api)

<br/>

## 왜 필요해요?

> Amdahl's Law : 멀티코어를 사용하는 프로그램의 속도는 프로그램 내부에 존재하는 순차적 부분이 사용하는 시간에 의해서 제한됩니다.

![Amdahl's Law](https://user-images.githubusercontent.com/42582516/105619519-ae45ff80-5e36-11eb-9e17-a460356274d3.png)

동시성 구현을 위해 Thread나 Task를 ExecutorService에 제출하는 코드를 구성하고, 이를 실행하면 여러개의 Thread가 동시에 작업을 합니다. 하지만 코드 중에서는 Thread나 Task를 사용하지 않는 순차적 작업을 진행하는 곳이 존재합니다. 이러한 순차적인 작업의 시간 때문에 프로그램이 낼 수 잇는 속도의 최대치는 정해집니다.

이러한 문제를 해결하기 위해서 Akka는 곳곳에 존재하는 순차적인 부분을 전부 없애거나 최소한으로 만들기 위해서 사용합니다.

<br/>

## Akka의 기술

### 1. Actor

- 배포, 동시성, 병렬성을 위하 단순하고 높은 수준의 추상화를 제공합니다.
- 비동기식, 비차단식, 고성능 메시지 기반의 프로그래밍 모델입니다.
- 매우 가벼운 이벤트 기반의 프로세스입니다. (GB당 수백만의 힙 메모리)

### 2. Fault Tolerance (내결함성)

- "let-it-crash" 의미가 있는 Supervisor hierarchies(감독 계층구조)를 가집니다.
- Actor 시스템은 여러 JVM을 포괄해서 내결함성 시스템을 제공할 수 있습니다.
- 스스로 문제를 해결하고, 멈추지 않는 내결함성이 높은 시스템을 작성하는데 유리합니다.

### 3. Location Transparency (위치 투영성)

- Akka의 모든 것은 분산 환경에서 작동하도록 설계되었습니다.
- Actor의 모든 상호작용은 순수한 메시지 전달을 사용하며, 모든 것은 비동기적입니다.

### 4. Persistence (지속성)

- Actor가 경험하는 상태 변경은 Actor은 시작하거나 다시 시작할 때 지속할 수 있습니다.
- 그렇기 때문에 JVM이 충돌하거나 다른 노드로 마이그레이션된 경우에도 행위자가 자신의 상태를 복구할 수 있습니다.

<br/>

## Actor Model

Actor Model은 모든 것이 Actor 라는 철학을 가지고 있습니다. 이는 모든 것이 객체라는 객체지향프로그래밍의 철학과 일부 비슷합니다.

Actor Model은 기본 개념은 아래와 같습니다.

- `Send a finite number of messages to other actors`
  - 다른 Actor에 한정된 개수의 메세지를 보낼 수 있습니다.
- `Create a finite number of new actors`
  - 유한한 개수의 Actor를 만들 수 있습니다.
- `Designate the behavior to be used for the next message it receives`
  - 다른 Actor가 받을 메세지에 사용할 행동을 지정할 수 있습니다.
- `There is no assumed sequence to the above actions and they could be carried out in parallel.`
  - 위에서 언급된 조치는 정해진 순서가 없으며, 동시에 수행될 수 잇습니다.

<br/>

## Akka의 특징

- Throughput(처리율)
  - 암달의 법칙에서 설명하는 순차적인 부분이 차지하는 면적을 최소한으로 줄이면서 프로그램의 전체적인 처리율은 그와 반비례해서 급등합니다.
- Scale Out
  - 구성 파일의 내용을 약간 수정함을 통해서 Scale out 할 수 있습니다.
- Modularity
  - Akka를 이용하여 클래스나 객체를 중심으로 설계하는 방식에서 Actor 방식으로 바뀌게 됩니다.
  - Actor는 서로 완벽하게 독립적이며, 메세지를 주고 받는 방식으로만 통신하기 때문에 **코드의 응집성(coherenece), 느슨한 결합(loosely coupled), 캡슐화(encapsulation)**이 보장됩니다.

<br/>

## 마무리

오늘은 Akka의 개념에 대해 정리했습니다. 아직까지 실무에서 동시성이 필요한 로직을 구성할 일은 크게 없으나 이러한 지식을 알고 있다면 매우 좋을 것 같습니다.

---

**출처**

- https://doc.akka.io/docs/akka/2.4/intro/what-is-akka.html
- https://en.wikipedia.org/wiki/Actor_model
- https://elky84.github.io/2018/06/21/akka/
- https://hamait.tistory.com/657
- http://wiki.webnori.com/display/AKKA/Akka-Home
- https://m.blog.naver.com/PostView.nhn?blogId=adaylily&logNo=221614034610&proxyReferer=https:%2F%2Fwww.google.com%2F
