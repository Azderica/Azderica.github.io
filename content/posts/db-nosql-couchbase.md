---
title: '[DB] Couchbase의 개념과 특징, 아키텍처'
slug: 02-db-nosql-couchbase
date: 2021-09-20
published: true
tags: ['Database', 'NoSQL', 'Redis', 'Architecture', 'Sentinel', 'Cluster']
series: false
cover_image: ./images/CouchbaseLogo.png
canonical_url: false
description: 'Nosql 중 Couchbase에 대해 좀 더 자세하게 알아봅니다.'
---

# Couchbase를 좀 더 자세하게

지난 게시글은 다음과 같습니다.

- [NoSQL](https://azderica.github.io/00-db-nosql/)
- [Redis](https://azderica.github.io/01-db-nosql-redis/)

오늘은 Couchbase 개념입니다.

## Couchbase 개념

- 카우치 베이스는 Document 기반의 Key-Value 스토어입니다.
- 하나의 유니크(Unique)한 키에 값을 저장하는 방식이며, 저장되는 값은 JSON 도큐먼트가 저장됩니다.
- 키(key)는 최대 **250 바이트**, 밸류(Value)는 카우치베이스 버킷은 20BMB, Memcached 방식의 버킷의 경우 1MB까지 저장이 됩니다.

저장할 때, 키와 값 뿐만 아니라 메타데이터도 같이 저장되며 메타 데이터는 `CAS, TTL, Flag` 값 3가지가 저장됩니다.

- `CAS` : 데이터에 대한 일종의 타임 스탬프와 같은 개념으로, 여러 클라이언트가 같이 데이터를 접근했을 때 일관성(Consistent) 문제를 해결해줍니다.
- `TTL` : `Time To Live`, 데이터의 유효 시간을 정의합니다.
- `FLAG` : 카우치베이스 클라이언트에서 사용하는 메타데이터입니다.

이러한 메타데이터는 하나의 메타데이터(CAS, TTL, Flag)는 60바이트의 메모리를 차지하며, 카우치베이스 서버는 모든 키와 메타데이터를 유지하기 위해 용량을 설계할때, RAM의 사이즈를 결정합니다.

### 버킷(Bucket)

- 일종의 RDBMS의 데이터베이스 같은 공간이며 JSON document 들은 이 버킷에 저장됩니다.
- 각각의 버킷은 고유의 속성 값을 가지고 있습니다. 버킷별로 사용할 수 있는 메모리 양, 옵션으로 버킷별로 접근할 수 있는 TCP 포트, 접근 비밀번호, 버킷에 들어가는 데이터에 대한 복제본의 수 등을 정할 수 있습니다.

### 뷰(View)

- 카우치 베이스의 강력한 능력이며, 이 뷰를 통해서 `Indexing, grouping, sorting` 등이 가능합니다.
- 뷰는 데이터베이스 뷰와 유사한 개념을 가지며 카우치베이스의 뷰는 incremental view라는 컨셉을 가집니다.

다음의 예시를 보면 뷰의 기능의 동작을 예상할 수 있습니다. Json document 안에 주민번호있고, 80년생 이하만 저장하는 뷰를 만든다고 가정하면 데이터가 버킷에 저장될 때마다 생성된 뷰에 같이 저장됩니다.

![couchbase-view-sample](https://user-images.githubusercontent.com/42582516/133991552-ccead205-7fc2-4ed3-bc6a-7832eee5e241.png)

이와 같은 결과로 데이터를 저장하거나 업데이트시 뷰 코드가 매번 수행되고, 뷰코드에 저장된 알고리즘에 따라 뷰에 데이터를 업데이트합니다.

이를 더 자세하게 보면 다음과 같습니다.

![Map & Reduce](https://user-images.githubusercontent.com/42582516/133992279-e17df7a9-9369-459f-9b27-9a840b9edb14.png)

[출처 및 뷰에 대한 상세 개념](https://bcho.tistory.com/928?category=534534)

`Map Function(Map & Reduce)` 함수를 통해서 View를 만듭니다.

- 맵함수는 두 개의 인자를 전달받으며 index(id, key, value)를 만들고 리듀스를 통해서 grouping이나 여러 처리를 할 수 있습니다.
- 즉, **뷰에는 각 버킷내의 개별 데이터를 반환하는 맵함수와 변환된 개별 데이터를 그룹별로 모아서 처리할 수 있는 리듀스 함수를 가집니다.**

<br/>

## Couchbase 특징

### Memcached 기반의 Level 2 캐쉬를 내장하여 빠릅니다.

- memcached를 자체적으로 Level 2 캐쉬로 사용합니다.
- 자체적으로 메모리 캐쉬 기능을 가지고 있기 때문에 성능이 빠릅니다.

(다만, 키의 유연성이나 클러스터에서 단점을 가집니다.)

### 모바일 디바이스와 Sync

- 카우치디비 계열 DB들은 모바일 디바이스에 탑재할 수 있으며, 서버에 설치된 카우치베이스 계열과 Sync가 됩니다.

### 데이터 센터간 복제 기간

- XDCR(Cross Data Center Replication)의 기능을 이용해서 물리적으로 떨어진 데이터 센터간에 복제가 가능합니다.
- [XDCR의 상세 내용](https://azderica.github.io/00-db-couchbase-xdcr/)

### Indexing, Grouping, Ordering, Join 가능

- 대부분의 NoSQL은 Key/Value Store 형식으로, 개별 필드에 대한 Indexing이나 필드별로 group by를 통한 sum,count 등의 기능, 특정 필드별로의 Sorting이 불가능합니다.
- Indexing을 지원하는 경우도 있기는 하지만, 내부적으로 성능상 문제가 있는 경우가 많으나 카우치베이스는 그러한 문제가 없습니다.

### 확장이 쉬움

- 분산 구조의 NoSQL의 경우 노드확장이 어렵거나 장애처리가 어려운 경우가 많으나 카우치베이스는 손쉽게 확장을 하고 장애 처리를 합니다.
- 이러한 장점은 운영에서 큰 이점이 됩니다.

### Built in 관리 도구 제공

- 카우치베이스는 웹 기반의 GUI 관리 도구를 기본으로 제공합니다.

> Couchbase Web Console

![couchbase-web-console](https://user-images.githubusercontent.com/42582516/133992009-871775fb-ac8f-4453-ad35-5ba7ba349d31.png)

[출처](https://soccerda.tistory.com/124)

### Memcached 프로토콜 지원

- 캐쉬 솔루션으로 유명한 Memcached 르포토콜을 지원하기 때문에 Memcached 인프라를 사용할 수 있습니다.

### 스키마가 없는 유연한 저장 구조(Scheme-less)

- 스키마가 없으므로 하나의 테이블에 컬럼 형식이 다른 데이터를 넣을 수 있습니다.
- 하나의 데이터 버킷에 데이타 구조가 다른 JSON 문서들을 넣을 수 있습니다.
- 데이터 타입이 다름에도 불구하고 공통되는 필드에 대해 Indexing, grouping 등을 제공할 수 있으며 JSON 도큐먼트에 country 라는 앨리먼트가 있는 도큐먼트등을 대상으로 grouping등을 할수 있습니다.

<br/>

## Couchbase Architecture

Couchbase Server는 모든 노드에 설치된 단일 패키지로 구성됩니다.

### 노드와 클러스터(Node & Cluster)

- 노드는 물리적인 서버에서 기동하는 하나의 카우치베이스 인스턴스
- 카우치베이스는 여러 개의 노드로 이루어진 클러스터로 구성됩니다.

### 클라이언트 SDK(Client SDK)

- 프로그래밍 언어별로 카우치베이스에 접근하기 위한 API(SDK)를 제공합니다.
- SDK를 사용해서 선택한 언어(Java, node.js, .NET 등)으로 애플리케이션을 작성할 수 있습니다.

### vBucket

- 카우치베이스는 실제 데이터와 물리서버간의 맵핑을 `vBucket`을 통해 관리합니다.
- 카우치베이스는 키-밸류 스토어이며, 각 키가 어디있는지는 vBucket이라는 단위로 관리하고, 키에 대한 해쉬값을 계산한 후에 각 해쉬값에 따라서 저장되는 vBucket을 맵핑한다음 각 vBucket을 노드에 맵핑합니다.
- **Rebalancing** : 노드가 추가되거나 삭제되었을 때, 물리적으로 데이터가 다른 노드로 다시 분산배치되고 새롭게 배치된 데이터에 따라 vBucket이 노드간에 데이터 맵핑 정보도 업데이트됩니다.

![vBucket](https://user-images.githubusercontent.com/42582516/133996020-9ffb4d3d-9091-4e47-bb22-fdcf93baf961.png)

### 노드의 구조

![couchbase-node-detail](https://user-images.githubusercontent.com/42582516/133996334-1d0c59e5-c7d7-48d9-a8a8-ea87bc0fed64.png)

- Couchbase의 노드는 Data Manage과 Cluster Manager로 나눠집니다.

#### Data Manager

- 직접 데이터에 접근하는 부분이며, set/get 메서드를 통한 데이터 저장이나 뷰에 대한 쿼리를 수행할 때 접근합니다.
- `Multi Thread Persistence Engine` : 디스크에 데이터를 저장하거나 읽을 때 사용하는 컴포넌트입니다.

#### Cluster Manager

- 노드에 대한 상태와 클러스터에 대한 상태, 설정 등을 관리하는 부분이며 `Erlang/OTP`로 구성되어 있습니다.
- 카우치베이스 클라이언트 SDK는 8091포트의 REST API를 통해서 vBucket 정보를 가져옵니다.
- 다수의 포트 등을 사용합니다. (사용전에 열어야하는 포트들이 있습니다.)

### 데이터 쓰기와 복제

![couchbase-data-read/write](https://user-images.githubusercontent.com/42582516/133997054-0f325983-d6b6-4a10-b1e7-634de4a7e50b.png)

- 클라이언트에서 Client SDK를 통해서 쓰기 요청을 하면, Client SDK는 해쉬 알고리즘에 따라 데이터의 키 값에 맵핑되는 vBucket을 찾아내고 그 해당하는 노드를 찾아 쓰기 요청을 합니다.
- 쓰기 요청은 해당 노드의 Listener로 전달되고, 이 Listener는 들어온 데이터를 로컬의 캐쉬에 쓰고 클러스터의 다른 노드로 복제 요청을 보냅니다. 그리고 데이터는 노드의 디스크에 저장됩니다.

<br/>

## Couchbase Cluster

- Couchbase 클러스터는 각각 독립 노드에서 실행되는 하나 이상의 Couchbase Server 인스턴스로 구성됩니다.
- Couchbase Server를 실행하는 각 노드, 클러스터에 여러 노드가 있는 경우 Couchbase 클러스터 관리자는 각 노드에서 실행됩니다.
- 클러스터의 전체 또는 일부 노드에서 실행되도록 서비스를 구성할 수 있습니다.

### 유혀성

- 데이터는 Couchbase Server에 의해 클러스터 전체에 자동으로 배포됩니다.
- Couchbase Server는 노드 추가 및 제거, 노드 장애를 자동으로 처리합니다.

<br/>

## Couchbase VS MongoDB

공통점은 다음과 같습니다.

- Document 기반의 NoSQL입니다.

그러나 차이점이 있습니다.

| 이름                   | Couchbase                                                                     | MongoDB                                                                                              |
| ---------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 설명                   | Memcached 호환 인터페이스를 사용하여 CouchDB에서 파생된 JSON 기반 문서 저장소 | 완전 관리형 클라우드 서비스와 자체 관리형, 인프라에 배포할 수 있는 가장 인기있는 문서 저장소 입니다. |
| 기본 데이터베이스 모델 | 문서 저장소                                                                   | 문서 저장소                                                                                          |
| 보조 데이터베이스 모델 | 키-값 저장 공간 DBMS                                                          | 공간 DBMS                                                                                            |
| 스키마                 | X                                                                             | X                                                                                                    |
| 파티셔닝               | 샤딩                                                                          | 샤딩                                                                                                 |

좀 더 자세한 차이를 알기 위해서는 다음 링크를 참고합니다.

[Couchbase VS MongoDB](https://db-engines.com/en/system/Couchbase%3BMongoDB)

---

**출처**

- [couchbase 소개](https://bcho.tistory.com/924)
- [couchbase 개념](https://bcho.tistory.com/925)
- [couchbase view](https://bcho.tistory.com/928)
- [couchbase architecture](https://bcho.tistory.com/934)
- [couchbase architecture detail](https://docs.couchbase.com/server/5.0/architecture/architecture-intro.html)
- [couchbase cluster](https://docs.couchbase.com/server/current/learn/clusters-and-availability/clusters-and-availability.html)
- [couchbase vs mongodb](https://dzone.com/articles/introduction-to-couchbase-for-mongodb-developers-a-1)
- [왜 Couchbase을 선택하게 되었는가 - 1](https://zepinos.tistory.com/60?category=797689)
- [왜 Couchbase을 선택하게 되었는가 - 2](https://zepinos.tistory.com/61)
- [Couchbase Docs](https://docs.couchbase.com/couchbase-manual-2.5/cb-admin/#faqs)
