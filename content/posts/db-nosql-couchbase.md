---
title: '[DB] Couchbase의 개념과 특징, 아키텍처'
slug: 02-db-nosql-couchbase
date: 2021-09-20
published: false
tags: ['Database', 'Nosql', 'Redis', 'Architecture', 'Sentinel', 'Cluster']
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

카우치 베이스의 강력한 능력이며, 이 뷰를 통해서 `Indexing, grouping, sorting` 등이 가능합니다.

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

### Memcached 프로토콜 지원

- 캐쉬 솔루션으로 유명한 Memcached 르포토콜을 지원하기 때문에 Memcached 인프라를 사용할 수 있습니다.

### 스키마가 없는 유연한 저장 구조(Scheme-less)

- 스키마가 없으므로 하나의 테이블에 컬럼 형식이 다른 데이터를 넣을 수 있습니다.
- 하나의 데이터 버켐ㅅ에 데이타 구조가 다른 JSON 문서들을 넣을 수 있습니다.
- 데이터 타입이 다름에도 불구하고 공통되는 필드에 대해 Indexing, grouping 등을 제공할 수 있으며 JSON 도큐먼트에 country 라는 앨리먼트가 있는 도큐먼트등을 대상으로 grouping등을 할수 있습니다.

<br/>

## Couchbase Architecture

<br/>

## Couchbase Cluster

<br/>

## Couchbase VS MongoDB

---

- [couchbase 소개](https://bcho.tistory.com/924)
- [couchbase 개념](https://bcho.tistory.com/925)
- [couchbase view](https://bcho.tistory.com/928)
- [couchbase architecture](https://bcho.tistory.com/934)
- [couchbase architecture detail](https://docs.couchbase.com/server/5.0/architecture/architecture-intro.html)
- [couchbase cluster](https://docs.couchbase.com/server/current/learn/clusters-and-availability/clusters-and-availability.html)
- [couchbase vs mongodb](https://dzone.com/articles/introduction-to-couchbase-for-mongodb-developers-a-1)
- [왜 Couchbase을 선택하게 되었는가 - 1](https://zepinos.tistory.com/60?category=797689)
- [왜 Couchbase을 선택하게 되었는가 - 2](https://zepinos.tistory.com/61)
