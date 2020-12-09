---
title: "[Hadoop] Hadoop이란?"
slug: 00-hadoop
date: 2020-12-08
published: true
tags: ['Hadoop', 'BigData', 'Distributed', 'Backend']
series: false,
cover_image: ./images/HadoopLogo.png
canonical_url: false
description: " Hadoop에 대한 기본 내용을 정리한 글입니다. "
---

# Hadoop이란.

다양한 업무를 하다보면, 특히 데이터에 대해 이야기를 할 때 하둡에 대해 이야기를 들을 수 있습니다. 오늘은 그러한 하둡에 대한 개념을 정리해볼려고합니다.

<br/>

## 하둡의 정의

하둡 소프트웨어 라이브러리는 간단한 프로그래밍 모델을 사용해서 여러대의 컴퓨터 클러스터에서 대규모 데이터 세트를 분산 처리할 수 있게 해주는 프레임워크입니다.

좀 더 간단하게 이야기하자면, **분산 환경에서 빅데이터를 저장하고 처리할 수 있는 자바 기반의 오픈 소스 프레임워크**입니다.

이는 분산 시스템 구조로 설계되어서 단일 서버에서 수천대의 머신으로 확장할 수 있게 처리되어 있습니다.

<br/>

## 하둡의 생태계

![하둡 생태계 (Hadoop Ecosystem)](https://user-images.githubusercontent.com/42582516/101490529-d3c19b80-39a5-11eb-8648-5f66cf52fb84.png)

이 생태계에 있는 것을 크게 구분한다면, 코어 프로젝트와 서브 프로젝트로 나눌 수도 있습니다.

- 하둡 코어 프로젝트 : HDFS(분산 데이터 저장), MapReduce(분산 처리). 하둡이 시작할 때는 이 두개의 프레임워크로 시작되었습니다.
- 하둡 서브 프로젝트 : 나머지의 프로젝트들을 의미합니다. 일반적으로 데이터 마이닝이나 수집, 분석 등을 수행합니다.

<br/>

## 하둡의 구성요소

### 데이터 저장

#### 1. HDFS(Hadoop Distributed File System, 하둡 분산형 파일 시스템)

![image](https://user-images.githubusercontent.com/42582516/101637969-ccb38f80-3a70-11eb-969b-dd808ef2966c.png)

- **분산 파일 데이터를 저장**합니다.
- 애플리케이션 데이터에 대한 높은 처리량의 액세스를 제공하는 분산 파일 시스템입니다.

#### 2. HBase

![image](https://user-images.githubusercontent.com/42582516/101638014-dfc65f80-3a70-11eb-800f-a995851e1d29.png)

- **분산 데이터베이스**
- HBase는 구글의 Bigtable을 기반으로 개발된 비관계형 데이터베이스입니다.
- Hadoop 및 HDFS위에 Bigtbale과 같은 기능을 제공합니다.

#### 3. Kudu

![image](https://user-images.githubusercontent.com/42582516/101638064-f1a80280-3a70-11eb-8608-f6aedbfe3607.png)

- **컬럼기반 스토리지**
- 컬럼기반 스토리지로 하둡 플랫폼에 추가되어 급변하는 데이터에 대한 빠른 분석을 위해 설계되었습니다.

<br/>

### 데이터 수집

#### 1. Chunkwa

- 분산 환경에서 생성되는 데이터를 안정적으로 HDFS에 저장하는 플랫폼

#### 2. Flume

- 많은 양의 데이터를 수집, 집계 및 이동하기 위한 분산형 서비스

#### 3. Sribe

- 페이스북에서 개발한 데이터 수집 플랫폼
- Chunkwa는 다르게 데이터를 중앙서버로 전송

#### 4. Kafka

- 데이터 스트림을 실시간으로 관리하기 위한 분산시스템
- 대용량 이벤트 처리를 위해 개발했습니다.
- [좀 더 자세하게는...](https://azderica.github.io/00-kafka/)

<br/>

### 데이터 처리
#### 1. MapReduce(맴리듀스)

![image](https://user-images.githubusercontent.com/42582516/101638827-ebfeec80-3a71-11eb-9918-7dd18da30761.png)

- 대용량의 데이터 처리를 위한 분산 프로그래밍 모델, 소프트웨어 프레임워크
- 맵리듀스 프레임워크를 이용하면 대규모 분산 컴퓨팅 환경에서, 대량의 데이터를 병렬로 분석 가능합니다.
- 프로그래머가 직접 작성하는 **맵**과 **리듀스** 라는 두 개의 메소드로 구성됩니다.
  - 맵(Map) : 흩어져 있는 데이터를 연관성이 있는 데이터를로 분류합니다. (key-value)
  - 리듀스(Reduce) : Map에서 출련된 데이터ㅇ서 중복 데이터를 제거하고 원하는 데이터를 추출합니다.

#### 2. Pig

- 하둡에 저장된 데이터를 맵리듀스 프로그램을 만들지 않고 SQL과 유사한 스크립트를 이용해 데이터를 처리, 맵리듀스 API를 매우 단순화한 형태로 설계되어 있습니다.

#### 3. Mahout

- 분석 기계학습에 필요한 알고리즘을 구축하기위한 오픈소스 프레임워크
- 클러스터링, 필터링, 마이닝, 회귀분석 등 중요 알고리즘을 지원해 줍니다.

#### 4. Spark

- 대규모 데이터 처리를 위한 빠른 속도로 실행시켜 주는 엔진
- 80개 이상의 고급 연산자를 제공하며 파이썬, R등에서 대화형으로 사용할 수 있습니다.

#### 5. Imaple

- 임팔라는 하둡기반 분산 엔진
- 맵리듀스를 사용하지 않고 C++로 개발한 인메모리 엔진을 사용해 빠른 성능

#### 6. Hive

- 하둡기반 데이터 솔루션
- 페이스북에서 개발한 오픈소스
- 자바를 몰라도 데이터분석을 할수 있게 도와 준다.
- SQL과 유사한 HiveQL이라는 언어를 제공하여 쉽게 데이터 분석 가능합니다.

<br/>

### 분산 코디네이터

#### 1. Zookeeper

![image](https://user-images.githubusercontent.com/42582516/101637445-210a3f80-3a70-11eb-84f2-16c97b894a15.png)

- 분산환경에서 서버간의 상호 조정이 필요한 다양한 서비스를 제공하는 서비스
- 분산 동기화를 제공하며, 그룹 서비스를 제공하는 중앙 집중식 서비스로 알맞은 분산처리 및 분산환경을 구성하는 서버 설정을 통합적으로 관리합니다.

### 분산 리소스 관리

#### 1. YARN

![image](https://user-images.githubusercontent.com/42582516/101637367-059f3480-3a70-11eb-8baa-d22ece4c69b9.png)

- 작업 스케줄링 및 클러스터 리소스 관리를 위한 프레임워크입니다.
- 맵리듀스, 하이브, 임팔라, 스파크 등의 다양한 어플리케이션은 YARN에서 작업을 실행합니다.

#### 2. Meseos

![image](https://user-images.githubusercontent.com/42582516/101637291-ebfded00-3a6f-11eb-9f9d-082a58d0903b.png)

- **클라우드 환경에 대한 리소스 관리**를 처리합니다.
- Mesos는 Linux 커널과 동일한 원칙을 사용하며 컴퓨터에 API(ex. Hadoop, Spark, Kafka, Elasticserach, ...) 등을 제공합니다.
- 이베이(울회사)나 페이스북, 트위터 등 다양한 기업들이 Mesos 클러스터 자원을 관리합니다.


<br/>

## 마무리.

간단하게 하둡에 대해서 조사를 했습니다. 내용적으로 부족한 부분이 많지만 개념만 잡고간다는 개념으로 작성하였습니다.

---
**출처**
- https://butter-shower.tistory.com/71
- http://blog.naver.com/acornedu/220957220179
- https://velog.io/@hsj0511/%EB%B9%85%EB%8D%B0%EC%9D%B4%ED%84%B0-%ED%95%98%EB%91%A1Hadoop%EC%9D%B4%EB%9E%80-
- https://opentutorials.org/course/2908/17055
