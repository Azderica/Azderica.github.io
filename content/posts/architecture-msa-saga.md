---
title: "[Architecture] MSA : SAGA 패턴이란"
slug: 01-architecture-msa
date: 2020-12-22
published: true
tags: ['Saga', 'Saga pattern', 'Architecture', 'MSA', 'micro service architecture', 'MSA']
series: true,
cover_image: 
canonical_url: false
description: " SAGA 패턴에 대해 정리합니다."

---


# MSA : SAGA 패턴의 정의과 개념, 종류

이전에 MSA 개념에 대해 잡아보았습니다. 오늘은 MSA를 듣다보면 꼭 듣게 되는 SAGA 패턴에 대해 공부해보겠습니다.

- [MSA 개념 잡기](https://azderica.github.io/00-architecture-msa/)

## 들어가기 앞서서.

기존의 Monolithic와 MSA 아키텍처에 대해서는 이전 게시글에서 정리했습니다. 오늘은 좀 더 MSA에 대해 이야기할려고 합니다. MSA 아키텍처를 구성하기 어려운 이유 중 하나는 **트랜적션** 의 문제입니다.

기존의 Monolithic 환경에서는 DBMS가 기본적으로 제공해주는 트랜잭선 기능을 통해서 데이터 commit이나 rollback을 통해서 일관성있게 관리하였습니다. 그러나 Applcation 과 DB가 분산되면서 해당 트랜잭션 처리를 단일 DBMS에서 제공하는 기능으로는 해결할 수 없습니다.

### 대안 : Two-Phase Commit?

여러 서비스 간에 데이터 일관성을 유지하기 위해서 전통적인 방법인 Two-Phase commit 과 같은 방법을 사용했습니다.



다만 이 방법은 하나의 서비스가 장애가 있는 경우나 각각의 서비스에 동시에 Rocking이 걸리게 되면 성능의 문제가 발생하기 때문에 비효율적입니다. 더나아가 각각의 서비스가 다른 instance에 있기 때문에 이를 통제하는데 어려움이 있습니다.


> 트랜잭션이란?

트랜잭션이란 데이터베이스의 상태를 변화시키기 위해서 수행하는 작업의 단위를 의미합니다. 트랜잭션은 4가지의 특성(원자성, 일관성, 독립성, 지속성)을 지켜야합니다. 이에 대해 상세하게 다루기에는 주제에 너무 벗어난 주제이기 때문에 다른 게시글로 정리하겠습니다.


## SAGA 패턴의 정의


## SAGA 패턴의 개념


## SAGA 패턴의 종류

## 마무리

---
**출처**
- https://jjeongil.tistory.com/1100
- https://cla9.tistory.com/22
- https://velog.io/@dvmflstm/SAGA-pattern%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EB%B6%84%EC%82%B0-%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
- https://ichi.pro/ko/maikeulo-seobiseu-akitegcheo-saga-paeteon-ilan-mueos-imyeo-eolmana-jung-yohabnikka-94512583990635
