---
layout: post
title: "[Kafka] Kafka에 대한 기본"
subtitle: "Kafka에 대해 알아보기"
categories: backend
tags: kafka backend
comments: true

---

# Kafka에 대해 알아보자

업무를 하는데 이게 왠걸, 카프카를 써야한다니... 이야기만 몇번 들어보면서 한번도 공부해본적이 없었는데 이번 기회에 한 번 공부해보기로 했다.

## Kafka란?

Apache Kafka는 실시간으로 기록 스트림을 게시, 구독, 저장 및 처리할 수 있는 분산 데이터 스트리밍 플랫폼이다. 

> 뭔가 거창하다. 좀 더 쉬운 설명을 보자.

Apacke Kafka는 LinkedIn에서 개발된 분산 메시징 시스템이다. **대용량의 실시간 로그처리에 특화된 아키텍처 설계를 통해서 기존 메시징 시스템보다 우수한 TPS**을 보여준다.

* TPS(Transaction per Second) : 초당 트랜잭션 수

이러한 Kafka는 다음과 같은 특징을 가진다.
- 분산 스트리밍 플랫폼
- 데이터 파이프 라인 구성시, 주로 사용되는 오픈소스
- 대용량의 실시간 로그처리에 특화되어 있는 솔루션
- 데이터를 유실없이 안전하게 전달하는 것이 주목적인 메시지 시스템
- 클러스터링이 가능하여, Falut-Tolerant한 안정적인 아키텍처와 빠른 퍼포먼스와 데이터 처리를 가진다.
- 수평적으로 서버의 Scale-Out이 가능하다
- **pub-sub모델**의 메세지 큐

> Tip)
> * 클리스트링 : 여러대의 컴퓨터를 한대로 묶어서 한개의 컴퓨터처럼 구현하는 것을 의미
>   * 로드밸런싱, 빠른처리능력, 장애 허용성 등의 장점을 가진다.
> * Fault-Tolerant :  시스템내 장애가 발생하더라도 시스템에 지장을 주지 않도록 설계된 컴퓨터 시스템
> * Scale-Out : 서버의 대수를 늘려서 성능을 향상시키는 방법


## Pub-Sub 모델
이야기를 본격적으로 들어가기 전에 먼저 Pub-Sub 모델에 대해 알아야한다.

카프카는 pub-sub(발행/구독) 모델을 사용하는데 이는 메세지를 특정 수신자에게 직접 보내주는 시스템이 아니다. publisher는 메세지를 topic을 통해서 카테고리화 한다. 분류된 메세지를 받기 원하는 receiver는 그 해당 topic 을 구독함으로서 메세지를 읽어올 수 있다.

이를 정리자면 publisher topic에 대한 정보만 알고 있고, 마찬가지로 subscriber도 topic만 바라본다. 즉, publisher와 subscriber는 서로를 모르는 상태이다. 간단한 예시로는 신문사(publisher)에서는 신문의 종류(topic)에 메세지를 쓰고 우리(subscriber)는 그 해당 신문을 구독한다.



---
**출처**
- https://www.redhat.com/ko/topics/integration/what-is-apache-kafka
- https://kim-daeyong.github.io/2019-08-09-kafka/
- https://medium.com/@umanking/%EC%B9%B4%ED%94%84%EC%B9%B4%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C-%EC%9D%B4%EC%95%BC%EA%B8%B0-%ED%95%98%EA%B8%B0%EC%A0%84%EC%97%90-%EB%A8%BC%EC%A0%80-data%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C-%EC%9D%B4%EC%95%BC%EA%B8%B0%ED%95%B4%EB%B3%B4%EC%9E%90-d2e3ca2f3c2
- https://dbjh.tistory.com/54
