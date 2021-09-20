---
title: '[DB] Couchbase의 개념과 특징, 아키텍처'
slug: 02-db-nosql-couchbase
date: 2021-09-20
published: true
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

### 뷰(View)

<br/>

## Couchbase 특징

### Memcached 기반의 Level 2 캐쉬를 내장하여 빠릅니다.

### 모바일 디바이스와 Sync

### 데이터 센터간 복제 기간

### Indexing, Grouping, Ordering, Join 가능

### 확장이 쉬움

### Built in 관리 도구 제공

### Memcached 프로토콜 지원

### 스키마가 없는 유연한 저장 구조(Scheme-less)

<br/>

## Couchbase Architecture

<br/>

## Couchbase Cluster

<br/>

## Couchbase VS MongoDB

---

- [couchbase 개념](https://bcho.tistory.com/925)
- [couchbase view](https://bcho.tistory.com/928?category=534534)
- [couchbase architecture](https://bcho.tistory.com/934)
- [couchbase architecture detail](https://docs.couchbase.com/server/5.0/architecture/architecture-intro.html)
- [couchbase cluster](https://docs.couchbase.com/server/current/learn/clusters-and-availability/clusters-and-availability.html)
- [couchbase vs mongodb](https://dzone.com/articles/introduction-to-couchbase-for-mongodb-developers-a-1)
