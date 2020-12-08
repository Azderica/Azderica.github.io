---
title: "[Hadoop] Hadoop이란?"
slug: 00-hadoop
date: 2020-11-18
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

(추후 작성예정)

### 데이터 저장

#### 1. HDFS(Hadoop Distributed File System, 하둡 분산형 파일 시스템)

#### 2. HBase

#### 3. Kudu

### 데이터 처리

#### 1. MapReduce(맴리듀스)

#### 2. Pig

#### 3. Mahout

#### 4. Spark

#### 5. Imaple

#### 6. Hive

### 분산 코디네이터

#### 1. Zookeeper

### 분산 리소스 관리

#### 1. YARN

#### 2. Meseos

---
**출처**
- https://butter-shower.tistory.com/71
- http://blog.naver.com/acornedu/220957220179
- https://velog.io/@hsj0511/%EB%B9%85%EB%8D%B0%EC%9D%B4%ED%84%B0-%ED%95%98%EB%91%A1Hadoop%EC%9D%B4%EB%9E%80-
- https://opentutorials.org/course/2908/17055
