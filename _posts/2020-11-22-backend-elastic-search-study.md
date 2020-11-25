---
layout: post
title: "[Elastic Search] Elastic Search란?"
subtitle: "Elastic Search 에 대한 기초 지식 정리"
categories: backend
tags: elasticsearch backend opensource 
comments: true

---

# Elasticsearch.

오늘은 Elasticsearch에 대한 기본적인 내용을 정리합니다.

## Elasticsearch란?

**Elasticsearch는 Apache Lucene(아파치 루씬)을 기반으로 한 Java 오픈소스 분산 검색 엔진입니다.**

Elasticsearch는 방대한 양의 데이터를 거의 실시간(NRT, Near Real Time)으로 저장, 검색, 분석할 수 있습니다. 이러한 Elasticsearch는 검색을 위해 단독으로 쓰이기도 하며, **ELK** 스택으로 사용되기도 합니다.

먼저 Elasticsearch에 본격적으로 들어가기 앞서서, ELK란 (Elasticsearch, Logstatsh, Kibnana)을 의미합니다.

간단하게 ELK 스택을 설명하면 다음과 같습니다.

![image](https://user-images.githubusercontent.com/42582516/99964448-9e7a5280-2dd6-11eb-9bdc-1ae7cf9f2498.png)


- Logstash
  - 다양한 소스(DB, csv파일 등)의 로그나 트랜잭션 데이터를 수집, 집계, 파싱하여 Elasticsearch로 전달합니다.
- Elasticsearch
  - Logstash로 받은 데이터를 검색 및 집계하여 필요한 관심 정보를 받습니다.
- Kibana
  - Elasticsearch의 검색 결과를 통해 데이터를 시각화하고 모니터링합니다.

<br/>

## Elasticsearch 용어 정의

### 논리적 구조

![image](https://user-images.githubusercontent.com/42582516/99964489-b05bf580-2dd6-11eb-9962-78eae078e84b.png)

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

![image](https://user-images.githubusercontent.com/42582516/99964072-15fbb200-2dd6-11eb-9485-1887247ebdb4.png)

#### 노드(Node)
  - 노드는 Elasticsearch 클러스터에 포함된 **단일 서버**로서 데이터를 저장하고 클러스터의 색인화 및 검색 기능에 참여합니다. 노드는 클러스터처럼 이름으로 식별됩니다.
  - 일반적으로 노드의 종류는 다음과 같습니다.
    - 마스터 노드(Master node)
      - **클러스터 관리 노드**
      - 노드 추가/제거, 인덱스 생성/삭제 등 클러스터의 전반적 관리를 담당합니다.
      - 여러개의 마스터 노드를 설정하면 하나의 마스터 노드로 작동됩니다.
      - `elasticsearch.yml` 에서 `node.master:true`로 설정합니다.
    - 데이터 노드(Data node)
      - **데이터(Document)가 저장되는 노드**
      - 물리적인 공간인 샤드가 배치되는 노드
      - 색인/검색/통계 등 데이터 작업 수행(리소스가 소모가 심해 모니터링이 필요합니다.)
      - 마스터와는 분리할 필요가 있습니다.
      - `elasticsearch.yml`의 `node.data : true`로 설정합니다.
    - 코디네이팅 노드(Coordinating Node)
      - **사용자의 요청을 받고 Round Robin 방식으로 분산시켜주는 노드**
      - 클러스터에 관련된 것은 마스터노드로, 데이터와 관련된 것은 데이터 노드로 넘깁니다.
      - `elasticsearch.yml` 내부의 노드 종류 관련 옵션을 전부 `false`로 설정합니다.
    - 인제스트 노드(Ingest node) : 
      - **문서 전처리 작업을 수행**
      - 인덱스 생성 전 문서의 형식을 변경할 수 있습니다.
      - `elasticsearch.yml`의 `node.ingest:true`로 설정합니다.

#### 샤드(Shard)
  - **인덱스 내부에는 색인된 데이터**들이 존재하며, 이 데이터들은 하나로 뭉쳐서 존재하지 않으며 물리적인 공간에 여러개의 부분들로 나눠 존재하는데 이 부분을 샤드라고 합니다.
  - Elasticsearch는 인덱스를 여러 샤드로 나누어 저장하기 때문에, 콘텐츠 볼륨의 수평 분할/확장이 가능하고 병렬화를 통해 성능 및 처리량을 늘릴 수 있습니다.
  - 샤드는 프라이머리와 레플리카로 구분됩니다.
    - Prmiary Shard
      - **데이터의 원본**
      - 엘러스틱서치에서 데이터 업데이트 요청을 날리면 반드시 Primary Shard로 요청이 가고, 해당 내용은 Replica로 복제됩니다.
      - 검색 성능 향샹을 위해 클러스터의 샤드 갯수를 조절합니다.
    - Replica Shard
      - **Primary Shard의 복제품**
      - 기존 원본 데이터가 무너졌을 때, 그 대신 쓰면서 장애 극복 역할은 수행
      - 기본적으로 Primary Shard와 동일한 노드에 배정되지 않습니다.

#### 세그먼트(Segment)
  - **세그먼트는 Elasticsearch에서 문서의 빠른 검색을 위해 설계된 자료구조**
  - 각 샤드는 다수의 세그먼트로 구성되어 있습니다.
  - Elasticsearch에서 데이터(Document)를 저장하면, 엘라스틱서치는 이것을 메모리에 모아두고 새로운 세그먼트를 디스크에 기록하여 검색을 refresh합니다. 이를 통해 새로운 검색 가능한 세그먼트가 만들어집니다.
  - 샤드에서 검색 시, 각 세그먼트에서 검색하여 결과를 조합한 후 최종 결과를 해당 샤드의 결과로 리턴합니다.
  - 세그먼트는 불변의 성질을 가지고 있어서 데이터가 업데이트되면, 삭제되었다는 마크만 하고 새로운 데이터를 가르킵니다. 삭제되었다고 마크된 데이터는 디스크에 남아있다가, 이후에 성능에 영향을 미치지 않는 선에서 삭제됩니다.


<br/>

## Elasticsearch의 특징

### 분산, 확장성, 병렬처리
- Elasticsearch는 규모가 수평적으로 늘어나도록 설계하기 때문에, 더 많은 용량이 필요하면 그저 노드를 추가해서 클러스터가 인식할 수 있게 하여 추가적인 하드웨어로 이용할 수 있도록 하면 됩니다.
- 따라서 확장성 등에서 큰 이점을 가집니다. (같은 클러스터 내이고 초기설정이 그대로라면 노드끼리 연결되지만, 다른 클러스터에 있다면 설정을 해줘야합니다.)

### 고가용성
- 동작중에 죽은 노드를 감지하고 삭제하며 사용자의 데이터가 안전하고 접근가능하도록 유지합니다.
- 동작 중에 일부 노드에 문제가 생기더라도 문제없이 서비스를 제공합니다.

### 멀티 태넌시
- 클러스터는 여러개의 인덱스를 관리할 수 있습니다.
- 클러스터는 독립된 하나의 쿼리 또는 그룹 쿼리로 여러 인덱스의 데이터를 검색할 수 있습니다.

### 전문(Full text) 검색
- Elasticsearch는 강력한 전문 검색을 지원합니다.

### 문서 중심
- Elasticsearch는 복잡한 요소들을 구조화된 JSON 문서 형식으로 지원합니다.
- 모든 필드는 기본적으로 인덱싱되며, 모든 인덱스들은 단일 쿼리로 빠르게 사용할 수 있습니다.

### Schema free
- JSON 문서 구조를 통해서 데이터를 인덱싱하고 검색할 수 있습니다.
- 사용자의 데이터가 어떻게 인덱싱 될 것인지를 커스터마이징할 수 있습니다.

### Restful api
- HTTP를 통한 JSON형식의 간단한 RESTful API를 제공하여 여러 다른 API도 제공합니다.
  - ex) Java, JS, Groovy, PHP, Perl, Python, Ruby 등등

<br/>

## 마무리.

간단하게 내용적으로 Elasticsearch에 대해 정리했습니다. 다음에는 Elasticsearch를 직접 구현해보고, 또한 Kibana와 Logstatsh 등 ELK 스택에 대한 내용을 보충하여 정리하였습니다.


---
**출처**
- https://twofootdog.tistory.com/53
- https://www.elastic.co/kr/what-is/elasticsearch
- https://victorydntmd.tistory.com/308
- https://blog.naver.com/archinitus/80205377502
- https://velog.io/@lsmin0703/ElasticSearch-1-%EA%B0%9C%EB%85%90
- https://victorydntmd.tistory.com/308


