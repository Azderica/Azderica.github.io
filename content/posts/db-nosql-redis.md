---
title: '[DB] NoSQL 데이터베이스 아키텍쳐 구조'
slug: 01-db-nosql-redis
date: 2021-09-15
published: true
tags: ['Db', 'Nosql', 'Redis', 'Architecture', 'Cluster']
series: false
cover_image: ./images/RedisLogo.png
canonical_url: false
description: 'Nosql 중 Redis에 대해 좀 더 자세하게 알아봅니다.'
---

# Redis를 좀 더 자세하게.

지난번 게시글에서는 [NoSQL](https://azderica.github.io/00-db-nosql/)에 대한 기본 개념과 종류에 대해서 정리했습니다.

이번에는 더 나아가서 대표적인 NoSQL이 가지는 아키텍처를 정리합니다. 오늘은 Redis에 대해 좀 더 정리하려고합니다.

## Redis의 장점

- 고성능의 Key-value 저장소이며 여러 자료구조를 지원하는 NoSQL입니다.
- RDBMS의 캐시 솔루션으로 주로 사용됩니다.
- Message Queue, Shared Memory, Remote Dictionary(RDBMS의 캐시 솔루션 / read 속도가 매우 빠릅니다.) 용도로 사용됩니다.

<br/>

## Redis 특징

### Key-Value Store

### 다양한 데이터 타입

### Persistence

### ANSI C로 작성

### 서버측 복제 및 샤딩 지원

<br/>

## Redis 아키텍처

<br/>

## Redis 클러스터

---

**출처**

- [Redis Concept](https://docs.redis.com/latest/rs/concepts/)
- [Redis Architecture Overview](http://redisgate.kr/redis/configuration/redis_overview.php)
- [Redis 구조](https://cla9.tistory.com/101)
- [레디스 소개 및 아키텍처, 주의할 점](https://cla9.tistory.com/101)
