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

![image](https://user-images.githubusercontent.com/42582516/97575143-a50fe700-1a2f-11eb-8f9d-48158bd5cbb5.png)


이를 정리자면 publisher topic에 대한 정보만 알고 있고, 마찬가지로 subscriber도 topic만 바라본다. 즉, publisher와 subscriber는 서로를 모르는 상태이다. 간단한 예시로는 신문사(publisher)에서는 신문의 종류(topic)에 메세지를 쓰고 우리(subscriber)는 그 해당 신문을 구독한다.

## Kafka의 구성요소

Kafka는 다음과 같은 구성요소를 가진다.
- topic, partition
- Producer, Consumer, Consumer Group
- broker, zookeepr
- replication

하나하나씩 살펴보자.

### Topic, Partition

메세지는 topic으로 분류되고 topic은 여러개의 파티션으로 나눠진다. 파티션 내의 한 칸은 로그라고 불리고, 데이터는 한 칸의 로그에 순차적으로 append가 되며, 메세지의 상대적인 위치를 나타내는 것이 offset이다.

![image](https://user-images.githubusercontent.com/42582516/97575878-befdf980-1a30-11eb-9027-175a07ac474f.png)

다음과 같이 하나의 토픽에 여러개의 파티션을 사용해서 메세지를 쓰는 이유는 다음과 같다.
- 많은 메세지가 하나의 파티션에 쓴다면 쓰는 과정도 시간이 있기 때문에, 처리하는게 버거워진다.
- 이를 방지하기 위해서 여러개의 파티션을 두어 분산저장한다. 결과적으로 병렬처리를 하게되면서 시간이 절약된다.
- 단, 파티션을 늘리게 되면 줄일 수 없기 때문에 파티션을 늘려야하는지에 대해서는 충분히 고려해보아야하는 문제이다.
- 병렬적으로 처리할 때는 Round Robin형식으로 처리되기 때문에, 순차적으로 메세지가 쓰여지지 않기 때문에 순서가 매우 중요한 메세지를 사용한다면 위험해질 수 있다.

### Producer, Consumer, Consumer Group

**Producer**
- 메세지를 생산하는 주체이다.
- 메세지를 만들고 Topic에 메세지를 쓴다.
- Consumer의 존재를 모른다.
- 여러개의 토픽에 여러개의 파티션을 나누려면, 특정 메세지들을 분류해서 특정 파티션에 저장할려면 key값을 통해서 분류할 수 있다.

**Consumer**
- 소비자, 메세지를 소비하는 주체이다.
- Producer의 존재를 모른다.
- 해당 topic을 구독함으로서 스스로 조절해가며 소비를 할 수 있다.
- topic내 존재하는 offset의 위치를 통해서, 혹시 Consumer가 죽더라도 다시 살아나서 마지막 위치부터 읽을 수 있으므로 **fail-over**에 대한 신뢰가 존재한다.

**Consumer Group**
- Consumer들의 묶음
- **반드시 해당 topic의 파티션은 consumer group과 1:n 매칭을 해야한다.**

|partition 수|consumer 수|설명|
|-----|-----|----------------------|
|3|2|consumer 중 하나는 2개의 파티션 소비|
|3|3|consumer 1개와 파티션 1개가 1:1매칭|
|3|4|consumer 1개가 아무것도 하지 않는다|

- 파티션 수를 늘릴 때는, consumer의 개수도 고려해야한다.
- 그룹이 존재하는 이유 : **컨슈머 그룹은 하나의 topic에 대한 책임이 있다.**
  - 즉, 특정 컨슈머에 문제가 생겼을 경우 다른 그룹내 컨슈머가 대신 읽을 수 있게 **리벨런싱**이 되어 장애 상황에서도 문제 없이 대처해야한다.


### Broker, Zookeeper

broker는 카프카의 서버를 의미한다. broker.id=1..n으로 함으로써 동일한 노드내에서 여러개의 broker서버를 띄울 수도 있다. zookeeper는 이러한 분산 메세지 큐의 정보를 관리해 주는 역할을 한다. kafka를 띄우기 위해서는 zookeeper가 반드시 실행되어야 한다.

![image](https://user-images.githubusercontent.com/42582516/97719085-060bed80-1b0a-11eb-9c0e-4c86ad8dbe34.png)


### Replication

Replication은 복제라는 의미이며, 이는 특정 broker에 문제가 생겼을 경우에 해당 broker의 역할을 다른 broker에서 즉각적으로 대신 수행하는 기능을 가진다.

카프카에서는 replication 수를 임의로 지정하여 topic를 만들 수 있다. replication-factor에 지정하는데 만약 3으로 하면 replication 수가 3이 된다.

Ex) Kafka Cluster에 3개의 broker가 있고 3개의 Topic이 있다고 가정한 이후, Topic-1은 replication-factor 1, Topic-2은 replication-factor 2, Topic-3은 replication-factor 3인 경우이다.


![image](https://user-images.githubusercontent.com/42582516/97773365-68a8cc00-1b92-11eb-9f15-75d2c5b0c8fe.png)

좀 더 replication을 자세하게 보면, 복제요소 중 대표는 leader, 그 외의 요소는 follower로 나눠진다. topic으로 통하는 모든 데이터의 read/write는 leader에서만 이뤄지고 follower는 leader와 sync을 유지하며 leader에 문제가 생겻을 경우에 follower 중 하나가 leader 역할을 한다.

![image](https://user-images.githubusercontent.com/42582516/97773513-b245e680-1b93-11eb-9e35-6d10d7695d8d.png)

복제된 데이터가 follower들에게 있으니, 메시지의 유실이 없다는 장점이 있지만, 복제를 하기 위한 시간과 네트워크 비용이 들기 때문에 데이터의 중요도에 따라 ack옵션으로 성능과 데이터의 중요도에 따라 다음과 같이 세부설정이 가능하다.

> ack (default:1)
> - 0 : 프로듀서는 서버로부터 어떠한 ack도 기다리지 않음. 유실율 높으나 높은 처리량
> - 1 : 리더는 데이터를 기록, 모든 팔로워는 확인하지 않음
> - -1(또는 all) : 모든 ISR 확인. 무손실

ack값을 설정하여 데이터의 무손실에 더 중요성을 둘 것인지 또는 유실을 어느정도 감수 하더라고 속도에 중요성을 둘 것인지를 선택할 수 있다.

모든 구성요소를 정리하면 다음과 같다.
![image](https://user-images.githubusercontent.com/42582516/97773623-c3dbbe00-1b94-11eb-8349-dbb6ea14019d.png)




---
**출처**
- https://www.redhat.com/ko/topics/integration/what-is-apache-kafka
- https://kim-daeyong.github.io/2019-08-09-kafka/
- https://medium.com/@umanking/%EC%B9%B4%ED%94%84%EC%B9%B4%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C-%EC%9D%B4%EC%95%BC%EA%B8%B0-%ED%95%98%EA%B8%B0%EC%A0%84%EC%97%90-%EB%A8%BC%EC%A0%80-data%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C-%EC%9D%B4%EC%95%BC%EA%B8%B0%ED%95%B4%EB%B3%B4%EC%9E%90-d2e3ca2f3c2
- https://dbjh.tistory.com/54
- https://team-platform.tistory.com/11
- http://kafka.apache.org/documentation/
