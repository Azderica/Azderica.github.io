---
title: '[DB] Redis의 개념과 특징, 아키텍처'
slug: 01-db-nosql-redis
date: 2021-09-15
published: true
tags: ['Database', 'Nosql', 'Redis', 'Architecture', 'Sentinel', 'Cluster']
series: false
cover_image: ./images/RedisLogo.png
canonical_url: false
description: 'Nosql 중 Redis에 대해 좀 더 자세하게 알아봅니다.'
---

# Redis를 좀 더 자세하게.

지난번 게시글에서는 [NoSQL](https://azderica.github.io/00-db-nosql/)에 대한 기본 개념과 종류에 대해서 정리했습니다.

이번에는 더 나아가서 대표적인 NoSQL이 가지는 아키텍처를 정리합니다. 오늘은 Redis에 대해 좀 더 정리하려고합니다.

## Redis란.

- 고 성능의 키-값 데이터 구조 스토어입니다.
- 여러 자료구조를 지원하며 크게 `String, Set, Sorted Set, Hash, List` 등의 데이터 형식을 지원합니다.

<br/>

## Redis 특징

- 영속성을 지원하는 인메모리 데이터 저장소
  - 왜 영속성을 제공하는지는 아래에서 설명합니다.
- 읽기 성능 증대를 위한 서버 측 복제를 지원합니다.
  - 전체 데이터베이스의 초기 복사본을 받는 마스터/슬레이브 복제를 지원합니다.
  - 마스터에서 쓰기가 수행되면 슬레이브 데이터 세트를 실시간으로 업데이터하기 위해 연결된 모든 슬레이브로 전송됩니다.
- 쓰기 성능 증대를 위한 클라이언트 측 샤딩(Sharding)을 지원합니다.
- `String, Set, Sorted Set, Hash, List` 과 같은 다양한 데이터형을 지원합니다.

> 샤딩(Sharding)

파티셔닝과 동일하며, 같은 테이블 스키마를 가진 데이터를 다수의 데이터베이스에 분산하여 저장하는 방법을 의미합니다.

<br/>

## Redis 특징

### Key-Value Store

![Redis-is-map](https://user-images.githubusercontent.com/42582516/133774329-00ddf3c0-a24e-40b0-9dd8-460616ea5400.png)

- Redis는 거대한 맵(Map) 데이터 저장소입니다.
- Redis는 익히기 쉬우며 직관적입니다. 그러나, 데이터를 레디스 자체 내에서는 처리하기 어렵습니다.

### 다양한 데이터 타입

- `String, Set, Sorted Set, Hash, List` 등의 타입을 지원합니다.

### Persistence

![Redis-Persistence](https://user-images.githubusercontent.com/42582516/133775761-c7644499-ae6f-4aa8-bd25-8208780c41e0.png)

- Redis는 영속성을 가집니다.
- Redis는 데이터를 disk에 저장할 수 있습니다. 따라서 Redis는 서버가 강제 종료되고 재시작하더라도 disk에 저장해놓은 데이터를 다시 읽어서 데이터가 유실되지 않습니다.
- redis의 데이터를 disk에 저장하는 방식은 **snapshot, AOF** 방식이 있습니다.
  - `Snapshot` : RDB와 비슷하게 어떤 특정 시점의 데이터를 Disk에 담는 방식을 뜻합니다. **Blocking** 방식의 **SAVE**와 **Non-blocking** 방식의 **[BGSAVE](http://redisgate.kr/redis/server/bgsave.php)** 방식이 있습니다.
  - `AOF` : Redis의 모든 write/update 연산 자체를 모두 log 파일에 기록하는 형태입니다. 서버가 재시작 시 write/update를 순차적으로 재실행하고 데이터를 복구합니다.
  - 가장 좋은 방식은 두 방법을 혼용해서 사용하는 방법으로 주기적으로 snapshot으로 백업을 하고 다음 snapshot까지의 저장을 AOF 방식으로 수행하는 방식입니다.

### ANSI C로 작성

- C언어로 작성되어 Java와 같이 가상머신 위에서 동작하는 언어에서 발생하는 성능 문제에서 자유롭습니다.

### 서버측 복제 및 샤딩 지원

- 읽기 성능 증대를 위해 서버 측 복제를 지원합니다.
- 쓰기 성능 증대를 위해 클라이언트 측 샤딩을 지원합니다.

<br/>

## Redis의 장점

- 리스트, 배열과 같은 데이터를 처리하는데 유용합니다.
- Message Queue, Shared Memory, Remote Dictionary(RDBMS의 캐시 솔루션 / read 속도가 매우 빠릅니다.) 용도로 사용됩니다.
- 메모리를 활용하면서 데이터를 보존합니다.
- Redis Server는 1개의 싱글 쓰레드로 수행되며, 서버 하나에 여러개의 서버를 띄우는 것이 가능합니다.

<br/>

## Redis 아키텍처, 구성

- HA(High Availability) : 무중단 서비스 등

### Standalone : No HA, 마스터

![Redis-Standalone](https://user-images.githubusercontent.com/42582516/133778042-cf59f712-752a-4c61-8a1a-b9ac435726a1.png)

- 레디스 서버 1대로 구성하며 이를 마스터 노드라고 합니다.
- 서버 다운시 AOF 또는 Snapshot 파일을 이용해 재 시작합니다.

### Replication : Half HA, 마스터-슬레이브

![Redis-Replication](https://user-images.githubusercontent.com/42582516/133778753-41bfa929-aa5f-48e5-9509-7e4df1379baa.png)

- 레디스 서버 2대(마스터-슬레이브)로 구성됩니다. 슬레이브는 마스터의 데이터를 실시간으로 전달받아 보관합니다.
- 마스터 다운 시 슬레이브 서버를 통해 서비스를 계속할 수 있습니다. 하지만, 이때는 수동으로 슬레이브 서버를 마스터로 변경해야합니다.
- 한 마스터에 슬레이브를 여러 대 구성할 수 도 있습니다.

### 이중화 + 센티널(Sentinel) : HA, 무중단 서비스 가능

![image](https://user-images.githubusercontent.com/42582516/133779960-5c97207f-75d7-405c-a4ea-730bba593e2d.png)

- 마스터-슬레이브 구성에 **센티널**을 추가해서 각 서버를 감시하도록하며, 센티널은 마스터 서버를 감시하고 있다가 다운되면 슬레이브를 마스터로 승격시킵니다.
- 다운된 마스터가 다시 시작되면 센티널이 슬레이브로 전환시킵니다.
- 레디스 마스터 노드가 모든 데이터를 가지고 있으며 슬레이브는 마스터에 대한 복제본을 유지하고 있으며, 데이터를 분산하지 않습니다.
- 일반적으로 레디스 센티널은 레디스 서버마다 하나씩 설치하며, 레디스 서버와 분리된 프로세스이며 다른 포트를 사용합니다. (데이터를 처리하지 않습니다.)
- 레디스 센티널은 높은 가용성과 자동 fail over 을 해결하지만 **데이터 분산 문제를 해결하지 못합니다.**

[Redis Sentinel Docker](https://hub.docker.com/r/erichsu/redis-sentinel/)

### 레디스 클러스터(Cluster) : HA, 무중단 서비스 가능

![Redis-Cluster-Type-1](https://user-images.githubusercontent.com/42582516/133781464-16c21b85-1ca2-4e0f-8028-5acf9a37a2f8.png)

머신 하나가 죽었을 시 해결이 됩니다. 다만 두개가 죽으면 해결이 안됩니다.

![Redis-Cluster-Type-2](https://user-images.githubusercontent.com/42582516/133782017-fe094509-ed9a-419c-9739-35a766b4e334.png)

위의 문제를 해결하는 방법입니다.

- **샤딩**
  - 클라스터는 **샤딩**(sharding, 대량의 데이터를 처리하기 위해 여러 개의 데이터베이스에 분할하는 기술) 방법을 제공하는 방법입니다.
  - 100개의 데이터를 1번 마스터에 33개, 2번 마스터 33개, 3번 마스터에 나머지 34개가 저장되는 방식입니다.
- **Hash 함수**
  - 데이터를 나누는 방식은 키에 hash 함수를 적용해서 값을 추출하고, 이 값을 각 마스터 서버에 할당합니다.
  - 클러스터 구성시 해쉬 함수를 통해서 1~33까지를 1번 서버, 34~ 66번까지를 2번 서버, 3번 서버는 또 다르게 할당됩니다.
- **해시 슬록(16384 슬롯)**
  - 레디스에서 hash 값의 개수는 16384(0~16383)이고 슬롯(slot)이라고 합니다.
- **해시 태그**
  - 다중 키 작업을 진행하려면 동일 노드에 저장될 모든 키가 필요합니다. 해시 태그는 레디스 클러스터에서 다중키를 사용할 수 있는 유일한 방법입니다.
  - 해시 함수를 적용해 동일한 해시 슬롯에 여러 개의 키 이름을 저장할 수 있도록 사용됩니다.
- **레디스 클라이언트**
  - 클라이언트는 서버와 동일한 hash 함수를 가지고 있으며 마스터 서버에 접속해서 각 서버에 할당된 슬롯 정보를 가지고 있습니다.
  - 키가 입력되면 hash 함수를 적용해서 어느 마스터에 저장할지 판단해서 해당 마스터에 저장합니다.
- **데이터 서버 + 센티널**
  - 각 마스터 서버는 데이터의 처리와 센티널의 역할을 같이수행합니다.
  - 1번 마스터 서버가 다운되면 나머지 살아있는 마스터들 중에서 리더를 선출해서 리더가 1번 마스터의 슬레이브를 마스터로 승격시킵니다.
- 최소 3대
  - 마스터 서버는 최소 3대로 구성하고 각각은 슬레이브를 가질 수 있습니다.
- 마스터를 관리하는 마스터는 없습니다. 이는 또 하나의 장애점입니다.
- 레디스가 사용하는 포트는 2개이며 하나는 클라이언트 하나는 노드 간의 통신을 위한 버스로 사용됩니다.

---

**출처**

- [Redis란 무엇인가](https://jyejye9201.medium.com/%EB%A0%88%EB%94%94%EC%8A%A4-redis-%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80-2b7af75fa818)
- [Redis Concept](https://docs.redis.com/latest/rs/concepts/)
- [Redis Architecture Overview](http://redisgate.kr/redis/configuration/redis_overview.php)
- [Redis 구조](https://cla9.tistory.com/101)
- [레디스 소개 및 아키텍처, 주의할 점](https://engkimbs.tistory.com/869)
- [Redis - Cluster & Sentinel](https://coding-start.tistory.com/128)
- [Redis Command](https://redis.io/commands)
- [Redis Enterprise Cluster Architecture](https://redis.com/redis-enterprise/technology/redis-enterprise-cluster-architecture/)
