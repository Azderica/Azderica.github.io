---
title: 'Couchbase야 안녕.'
slug: nosql-couchbase-to-mongodb
date: 2023-03-16
published: false
tags: ['Developer', 'Couchbase', 'MongoDB', 'MSDB', 'Migration']
series: false
cover_image: 
canonical_url: false
description: 'Couchbase야 안녕.'
---

# Couchbase야 안녕.

최근에 큰 프로젝트에 들어가기 전에 조금 시간이 있어 직접 기안한 프로젝트를 거의 완료 중에 있습니다. 기존의 Couchbase를 사용하던 로직에서 여러 문제가 있고, 관리적인 이유로 인해 MongoDB와 MSSQL로 전환을 진행하고 있습니다.

## 서비스 소개.

- 해당 서비스란.
- 인증 Gateway 서비스

## 기존 서비스의 문제.

- Couchbase 서버에만 구성된 계정 정보 (유실 시 해결책이 없음, 수동 백업 데이터와 난잡힌 히스토리 document)
  - 수동으로 주기적 물리 백업 처리.
- 유저 입장에서 설계된 시스템, 관리자 입장에서는 최악.
  - 유저는 하나의 document 만 조회하면 되지만. O(1)
  - 관리자 입장에서는 특정 조건을 검색할 경우, 모든 document를 조회해야한다 O(n)
  - 조회 조건이 많으므로 indexing 처리가 애매함. 잘 쓰면 되는데 잘 쓸 사람이 없음…!
- 너무 오픈소스가 없음.
- 인프라에서 관리가 안되는 NoSQL. → 장애 발생시 팀에서 직접 해결해야 함.
  - 많은 회사에서 그렇겠지만, 비인기 시스템은 알기가 쉽지 않다.
- Couchbase를 잘 못 사용하고 있다.