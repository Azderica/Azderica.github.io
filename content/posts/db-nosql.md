---
title: '[DB] NoSQL 데이터베이스 정리'
slug: 00-db-nosql
date: 2021-04-01
published: true
tags: ['Database', 'NoSQL']
series: false
cover_image: ./images/NoSqlLogo.png
canonical_url: false
description: 'NoSQL에 대해 소개하고 특징에 대해 정리합니다.'
---

# NoSQL

해당 게시글은 NoSQL에 대한 내용을 간략하게 정리하고, 여러가지 NoSQL Database를 특징별로 정리합니다.

<br/>

## RDB와의 차이

대부분 RDB와 NoSQL의 차이를 인지하고 있는데 이를 표로 간략하게 정리하면 다음과 같습니다.

| -             | RDB                              | NoSQL                                        |
| ------------- | -------------------------------- | -------------------------------------------- |
| 데이터모델    | 고정 행과 열이 있는 테이블       | document-Json, key value, ...                |
| 예시          | Oracle, MySQL, MSSQL, PostgreSQL | MongoDB, Redis, Hbase, Neo4j                 |
| 목적          | 범용                             | 범용, 대량의 데이터 추출, 관계 분석, 탐색 등 |
| 스키마        | 엄격                             | 유연                                         |
| 확장성        | 수직                             | 수형성                                       |
| ACID 트랜잭션 | 지원                             | 대부분 지원하지 않음                         |
| ORM           | ORM 필요                         | 대부분 ORM이 필요없음                        |

<br/>

## NoSQL의 장단점

### NoSQL의 장점

NoSQL은 다음의 장점을 가집니다.

- 유연한 데이터 모델
  - 유연한 스키마를 가지므로, 요구 사항이 변경되었을 때 데이터베이스를 쉽게 변경할 수 있습니다.
- 수평적 확장
  - 일반적으로 RDB의 경우에는 용량 초과시 **수직적 확장**(크고 비싼 서버)가 필요하지만, NoSQL의 경우는 수평적 확장이 가능합니다. (제한은 존재함)
- 빠른 쿼리
  - 일반적으로 RDB의 경우, 여러 테이블을 Join해서 쿼리를 사용하지만, NoSQL의 경우는 쿼리에 최적화되어 저장합니다.
- 개발자에 친화적
  - NoSQL은 데이터 구조를 일반적인 프로그래밍 언어의 데이터 구조에 매핑합니다.
  - 적은 코드를 작성하면서, 개발 시간을 단축하고 버그를 줄일 수 있습니다.

### NoSQL의 단점

NoSQL에서 이야기되는 가장 큰 단점으로는 ACID 트랜잭션을 지원하지 않는 것입니다. 물론 적절한 스키마 디자인을 제공하면 단일 레코드의 원자화는 가능합니다.

> ACID

- A : atomicity, 원자성
- C : consistency, 일관성
- I : isolation, 고립성
- D : durability, 지속성

<br/>

## NoSQL 데이터베이스 별 특징

NoSQL 데이터베이스의 특성을 크게 다음과 같이 4가지로 나눌 수 있습니다.

- Key-Value Database
- Document Database
- Column Family Database
- Graph Database

### Key-Value Database

Key와 Value로 이루어졌으며, **저장과 조회**이란 원칙에 가장 충실합니다.

Key-Value Database는 다음의 특징을 가집니다.

- Key 값은 unique한 고유값으로 유지되어야합니다.
- 테이블간 join을 고려하지 않으므로 RDB의 외부키 등이 필요없습니다.
- Value에 모든 데이터 타입을 허용하며 이에 따라 검증 로직을 잘 구성하는 것이 중요합니다.

Key-Value Database는 다음과 같은 종류들이 있습니다.

- **Redis**
- **AWS DynamoDB**
- Oracle Berkely
- Riak

Key-Value Database는 일반적으로 아래의 경우에서 많이 사용합니다.

- **성능 향상을 위해 데이터베이스 데이터 캐싱**
- 웰 어플리케이션에서 일시적인 속성 추적
- 모바일 애플리케이션용 사용자 데이터 정보와 구성 정보 저장
  - 다만 개인정보 등은 NoSQL에 저장하는 것은 지양해야함.
- 이미지나 오디오 파일 같은 대용량 객체 저장
  - 일반적으로 NAS를 사용하기는 함.

### Document Database

Key-Value Database와 마찬가지로 데이터 저장시에는 Key-Value Type을 사용하지만, 가장 큰 차이는 **Document 타입으로 저장**됩니다. (Ex. JSON, XML)

Document Database는 다음의 특징을 가집니다.

- 값을 문서(semi-structured entity)로 저장합니다. (일반적으로 JSON, XML)
- 값을 저장하기 전에 schema를 별도로 정의하지 않으며, document가 schema가 됩니다.
- 각 문서별로 다른 필드를 가질 수 있기 때문에 개발자는 입력시 **컬럼과 필드에 대한 관리**를 제대로 해야합니다.
  - 필도 속성에 대한 관리가 필요합니다.

Document Database는 다음과 같은 종류가 있습니다.

- **MongoDB**
- CouchDB
- Couchbase

Document Database는 일반적으로 아래의 경우에서 많이 사용합니다.

- 대용량 데이터를 읽고 쓰는 웹사이트 백엔드 지원
- 제품처럼 다양한 속성이 있는 데이터 관리
- 다양한 유형의 메타데이터 추적
- Json 데이터 구조를 사용하는 어플리케이션
- 비정규화된 중첩 구조의 데이터를 사용하는 애플리케이션

> CouchDB와 Couchbase의 차이.

- Couchbase는 JSON용 SQL과 같은 쿼리 언어 N1QL이 있으나, CouchDB는 없습니다.
- Couchbase는 기업용이 있으나, CouchDB는 오픈소스만 있습니다.
- Couchbase는 pessimistic lock이 있으나, CouchDB는 MVCC 개념을 사용하므로 없습니다.
- Couchbase의 topology는 분산되어 있으나, CouchDB는 master-master 복제 개념입니다.

### Column Family Database

Column Family Database는 대용량 데이터, 읽기와 쓰기 성능, 고가용성을 위해 설계되었습니다. (Ex. 구글의 Big Table, 페이스북의 Cassandra)

Column Family Database는 다음의 특징을 가집니다.

- RDB와 같이 Column과 Row를 사용해서 스키마를 정의합니다.
  - 컬럼 수가 많으면 관련된 컬럼들을 컬렉션으로 묶을 수 있습니다. (이를 **Column Family**라고 합니다.)
- Document Database와 같이 미리 정의된 스키마를 사용하지 않으므로 원하는 시점에 컬럼을 추가가능합니다.
- 테이블간 조인을 지원하지 않습니다.

즉, 다음과 같은 모습으로 구성되어 있습니다.

![Hbase Column Families](https://user-images.githubusercontent.com/42582516/113298137-76779e80-9336-11eb-9ed1-cb287417ad04.png)

Column Family Database는 다음과 같은 종류가 있습니다.

- **Hbase**
- **Cassandra**
- GCP(Google Cloud Platform) BigTable
- MS Azure Cosmos DB

Column Family Database는 일반적으로 아래의 경우에서 많이 사용합니다.

- 데이터베이스에 쓰기 작업이 많은 애플리케이션
- 지리적으로 여러 데이터 센터에 분산되어 있는 애플리케이션
- 복제본 데이터가 단기적으로 불일치해도 큰 문제가 없는 애플리케이션
- 동적 필드를 처리하는 애플리케이션
- 수백만 테라바이트 정도의 대용량 데이터를 처리할 수 있는 애플리케이션

다음은 Column Family Database의 성능 표입니다.

![Column Family Database Trend Chart](https://user-images.githubusercontent.com/42582516/113298465-d40beb00-9336-11eb-8c64-8752cb98d1eb.png)

일반적으로 Hbase와 Cassandra가 많이 쓰입니다. 다만, Hbase는 성능이 높으나 시스켐 복잡도와 Learning Curve의 문제로 인해 Cassandra가 더 보편적으로 선호됩니다.

### Graph Database

Graph Database는 Graph 이론을 활용한 것이며, Node(노드)들과 Relationship(관계)로 구성된 개념입니다. 노드는 Key-Value 값을 가지고 있고 노드는 하나 이상의 레이블을 구성할 수 있습니다.

Graph Database는 다음의 특징을 가집니다.

- 간단하고 직관적인 데이터 모델을 가집니다.

![image](https://user-images.githubusercontent.com/42582516/113299571-fb16ec80-9337-11eb-9b17-b42ce16c51d0.png)

Graph Database는 다음과 같은 종류가 있습니다.

- **Neo4j**
- Titan
- AllegroGraph

Graph Database는 일반적으로 아래의 경우에서 많이 사용합니다.

- 지식 그래프나 소셜 그래프
- 자격 증명 그래프
- 사기 탐지 및 추천 엔진
- 생명 과학 분야

---

**출처**

- [NoSQL 데이터베이스별 특징](https://jaemunbro.medium.com/nosql-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-%ED%8A%B9%EC%84%B1-%EB%B9%84%EA%B5%90-c9abe1b2838c)
- [NoSQL vs Relational Database](https://velog.io/@hanblueblue/%EB%B2%88%EC%97%AD-NoSQL-vs-Relational-Databases)
- [DB, RDBMS VS NoSQL](https://velog.io/@hanblueblue/%EB%B2%88%EC%97%AD-NoSQL-vs-Relational-Databases)
- [Couchbase VS CouchDB](https://blogs.perficient.com/2017/07/18/to-know-more-about-nosql-counchdb-vs-couchbase/)
- [GraphDB](https://couplewith.tistory.com/entry/Graph-DB-%EC%99%80-RDBMS-%ED%8A%B8%EB%9E%9C%EB%93%9C-3%EB%B6%80-%EA%B7%B8%EB%9E%98%ED%94%84-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4%EC%9D%98-%EC%A2%85%EB%A5%98)
