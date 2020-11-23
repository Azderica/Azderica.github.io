---
layout: post
title: "[Elastic Search] Elastic Search란?"
subtitle: "Elastic Search 에 대한 기초 지식 정리"
categories: elasticSearch
tags: elasticSearch backend opensource 
comments: true

---

# Elasticsearch.

## Elasticsearch란?

**Elasticsearch는 Apache Lucene(아파치 루씬)을 기반으로 한 Java 오픈소스 분산 검색 엔진입니다.**

Elasticsearch는 방대한 양의 데이터를 거의 실시간(NRT, Near Real Time)으로 저장, 검색, 분석할 수 있습니다. 이러한 Elasticsearch는 검색을 위해 단독으로 쓰이기도 하며, **ELK** 스택으로 사용되기도 합니다.

먼저 Elasticsearch에 본격적으로 들어가기 앞서서, ELK란 (Elasticsearch, Logstatsh, Kibnana)을 의미합니다.

간단하게 ELK 스택을 설명하면 다음과 같습니다.
- Logstash
  - 다양한 소스(DB, csv파일 등)의 로그나 트랜잭션 데이터를 수집, 집계, 파싱하여 Elasticsearch로 전달합니다.
- Elasticsearch
  - Logstash로 받은 데이터를 검색 및 집계하여 필요한 관심 정보를 받습니다.
- Kibana
  - Elasticsearch의 검색 결과를 통해 데이터를 시각화하고 모니터링합니다.

<br/>

## Elasticsearch 용어 정의

### 논리적 구조

#### 도큐먼트(Document)
  - Elasticsearch 데이터 최소 단위(RDBMS의 Row와 비슷)하고, JSON 오브젝트 중 하나입니다.
  - 하나의 Document는 다양한 필드로 구성되어 있으며, Document 내부에 Document가 들어갈 수도 있습니다.
  
#### 타입(Type)
  - 여러개의 Document가 모여서 한 개의 Type을 이룹니다.(RDBMS의 테이블과 비슷)
  - **Elasticsearch 7.0부터 사라졌습니다.**

#### 필드(Field)
  - Document에 들어가는 데이터 타입(RDBMS의 column)와 비슷합니다. 
  - Elasticsearch의 필드는 RDBMS보다 동적입니다. 즉. 하나의 데이터 타임만 가질 수 있는 RDBMS와 달리, 하나의 필드가 여러개의 타입을 가질 수 있습니다.  

#### 매핑(Mapping)
  - 매핑(Mapping)은 필드와 필드의 속성을 정의합니다.
  - 매핑 정보에 여러가지 데이터 타입 지정이 가능하지만 필드명 자체는 중복이 불가능합니다.

#### 인덱스(Index)
  - 여러개의 Type이 모여 한 개의 Index를 이룹니다.(RDBMS의 Database와 비슷)
  - Elasticsearch 6.1 부터는 **하나의 Index**는 **하나의 Type**만 가집니다.(Database + Table과 비슷)
  - Elasticsearch를 클러스터(분산환경)을 구성하는 경우, Index는 여러 노드에 분산 저장 및 관리가 됩니다.
  - 기본 설정은 5개의 Primary Shard와 1개의 Replica Shard로 생성됩니다. 옵션 값으로 변경 가능합니다.


### 물리적 구조

#### 노드(Node)
  -

#### 샤드(Shard)
  -

#### 세그먼트(Segment)
  -


<br/>

## Elasticsearch의 특징

### 분산, 확장성, 병렬처리

Elasticsearch 구성 시 보통 3개 이상의 노드(Elasticsearch 서버)를 클러스터로 구성하며, 데이터를 샤드(shard)로 저장 시 클러스터 내


### 고가용성

Elasticsearch는 동작 중에 죽은 노드를 감지하고 삭제하

### 멀티 태넌시


### 전문 검색


### 문서 중심


### Schema free


### Restful api





---
**출처**
- https://twofootdog.tistory.com/53
- https://www.elastic.co/kr/what-is/elasticsearch
- https://victorydntmd.tistory.com/308
- https://blog.naver.com/archinitus/80205377502


