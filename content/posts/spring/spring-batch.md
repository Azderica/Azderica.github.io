---
title: '[Spring] Spring Batch 개념 잡기'
slug: 01-spring-batch
date: 2022-02-23
published: true
tags: ['Spring', 'SpringBoot', 'JPA', 'Spring Batch', 'Backend']
series: true
cover_image: ./images/SpringLogo.png
canonical_url: false
description: 'Spring Batch에 대한 기본 개념에 대해 정리합니다.'
---

# Spring Batch 개념 잡기

스프링 배치에 대한 기본 개념을 잘 이해하지 못하고 있음을 느껴 이에 따라 정리합니다. 정확히는 Spring Rest API와의 정확한 차이를 모른다는 생각이 들었습니다.

<br/>

## Spring Batch란.

- 배치 프로세싱은 **일괄처리**라는 뜻을 가지고 있으며, 일괄처리의 의미는 일련의 작업을 정해진 로직으로 수행하는 것입니다.
- 스프링 배치는 **로깅/추적, 트랜잭션 관리, 작업 처리 통계, 작업 재시작, 건너뛰기, 리소스 관리 등 대용량 레코드 처리에 필수적인 기능을 제공**합니다.
- 최적화 및 파티셔닝 기술을 통해 대용량 및 고성능 배치 작업을 가능하게 하는 고급 기술 서비스 및 기능을 제공합니다.
- Spring Batch에서 배치가 실패하여 작업 재시작을 하게 된다면 처음부터가 아닌 실패한 지점부터 실행을 합니다.
- 중복 실행을 막기 위해 성공한 이력이 있는 Batch는 동일한 Parameters로 실행 시 Exception이 발생합니다.

### 일괄처리가 필요한 경우

- 대용량의 비지니스 데이터를 복잡한 작업으로 처리해야하는 경우
- 특정한 시점에 스케줄러를 통해 자동화된 작업이 필요한 경우
- 대용량 데이터의 포맷을 변경, 유효성 검사 등의 작업을 트랜잭션 안에서 처리 후 기록해야하는 경우

### Batch VS Quartz

- Spring Batch는 Scheduler가 아니기에 비교 대상이 아닙니다.
- Spring Batch는 Batch Job을 관리하지만 Job을 구동하거나 실행시키는 기능은 지원하고 있지 않습니다.
- Spring에서 Batch Job을 실행시키기 위해서는 Quartz, Scheduler, Jenkins 등 전용 Scheduler를 사용하여야 합니다.

[Quartz Scheduler](https://homoefficio.github.io/2019/09/28/Quartz-%EC%8A%A4%EC%BC%80%EC%A4%84%EB%9F%AC-%EC%A0%81%EC%9A%A9-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98-%EA%B0%9C%EC%84%A0-1/)

<br/>

## Spring Batch 원칙 및 가이드

- **배치와 서비스에 영향**을 최소화할 수 있도록 구조와 환경에 맞게 디자인합니다.
- 배치 어플리케이션 내에서 가능한한 복잡한 로직은 피하고 **단순**하게 설계합니다.
- 데이터 처리하는 곳과 데이터의 저장소는 물리적으로 가능한한 가까운 곳에 위치하게 합니다.
- I/O 등의 **시스템 리소스의 사용을 최소화**하고 최대한 많은 데이터를 메모리 위에서 처리합니다.
- 처리 시간이 많이 걸리는 작업을 시작하기 전에 메모리 재할당에 소모되는 시간을 피하기 위해 충분한 메모리를 할당합니다.
- 데이터 무결성을 위해서 적절한 **검사 및 기록**하는 코드를 추가합니다.

<br/>

## Spring Batch의 3가지 레이어

![Spring-Batch-3가지-레이어](https://user-images.githubusercontent.com/42582516/155138569-34e5e8e7-d474-47a3-b572-e3cffa7be069.png)

- Application : 개발자가 작성한 모든 배치 작업과 사용자 정의 코드 포함
- Batch Core : 배치 작업을 시작하고 제어하는데 필요한 핵심 런타임 클래스 포함
  - JobLauncher, Job, Step
- Batch Infrastructure : 개발자와 어플리케이션에서 사용하는 일반적인 Reader와 Writer 그리고

> 스프링 배치는 계층 구조가 이와 같이 설계되어 있어 Application 계층에서 비지니스 로직을 집중하고 Batch Core에 있는 클래스들을 이용해 제어할 수 있습니다.

<br/>

## Spring Batch Job 구성 및 개념

![spring-job-step](https://user-images.githubusercontent.com/42582516/155139624-20d39950-44c3-4073-acf2-9b0116ee7220.png)

### Job

- 배치처리 과정을 하나의 단위로 만들어놓은
- 배치처리 과정에 있어 전체 계층 최상단에 위치합니다.

### JobInstance

- Job의 실행 단위
- 2/23일, 2/24일 실행 시 각각의 JobInstance가 생성됩니다.
- 앞서 이야기한것 처럼 2/23 실행 실패시 2/23에 대한 데이터만 처리하게 됩니다.

### JobParameters

- JobInstance를 구별할 때 사용합니다.
- String, Double, Long, Date 4가지 형식을 지원합니다,

### JobExecution

- JobInstance에 대한 실행 시도에 대한 객체입니다.
- 실패하여 재실행 시킨 경우 동일한 JobInstance이나 2번 실행에 대한 JobExecution은 개별로 생기게 됩니다.
- JobInstanced 실행에 대한 상태, 시작시간, 종료시간, 생성시간 등의 정보를 담습니다.

### Step

- Job의 배치 처리를 정의하고 순차적인 단계를 캡슐화합니다.
- Job은 최소한 1개 이상의 Step을 가져야 하며 Job의 실제 일괄처리를 제어하는 모든 정보가 들어있습니다.

### StepExecution

- Step 실행 시도에 대한 객체입니다.
- 이전 단계의 Step이 실패하면 StepExecution은 생성되지 않습니다.
- 실제 시작이 될 때만 생성됩니다.
- StepExecution은 JobExecution에 저장되는 정보 외에 read 수, write 수, commit 수, skip 수 등의 정보들이 저장됩니다.

### ExecutionContext

- Job에서 데이터를 공유 할 수 있는 데이터 저장소
- Spring Batch에서 제공하는 ExecutionContext는 JobExecutionContext, StepExecutionContext 2가지 종류가 있으나 이 두가지는 지정되는 범위가 다릅니다.
- JobExecutionContext의 경우 Commit 시점에 저장되는 반면 StepExecutionContext는 실행 사이에 저장이 되게 됩니다.
- ExecutionContext를 통해 Step간 Data 공유가 가능하며 Job 실패시 ExecutionContext를 통한 마지막 실행 값을 재구성할 수 있습니다.

### JobRepository

- 위의 모든 배치 처리 정보를 담고있는 매커니즘
- Job이 실행되게 되면 JobRepository에 JobExecution과 StepExecution을 생성하게 되며 JobRepository에서 Execution 정보들을 저장하고 조죄하며 사용하게 됩니다.

### JobLauncher

- JobLauncher는 Job과 JobParameters를 사용하여 Job을 실행하는 객체입니다.

### ItemReader

- Step에서 Item을 읽어오는 인터페이스
- ItemReader에 대한 다양한 인터페이스가 존재하며 다양한 방법으로 Item을 읽어올 수 있습니다.

### ItemWriter

- 처리된 Data를 Writer할 때 사용합니다.
- 처리 결과물에 따라 Insert, Update, Queue의 Send 등이 될 수 있습니다.
- 기본적으로 Item을 Chunk로 묶어 처리하고 있습니다.

### ItemProcessor

- Reader에서 읽어온 Item을 데이터 처리하는 역할을 합니다.
- Processor는 배치를 처리하는데 필수 요소는 아니며 Reader, Writer, Processor 처리를 분리하여 각각의 역할을 명확하게 구분합니다.

<br/>

## Spring Batch 장점

- 유지보수성
  - 배치는 다른 어플리케이션의 코드들보다 수명이 깁니다.
  - 테스트 용이성, 풍부한 API
- 유연성
  - JVM을 이용한 이식성 (기존의 코볼, C++ 등과 비교했을 때)
  - 코드 공유능력 (POJO 재활용 등)
- 확장성
  - 과거의 메인프레임 방식이나, 커스텀하게 처리하던 방식은 병렬 처리르 하려면 고려할게 많아 확장성과 안정성이 떨어집니다.
  - 자바(or 스프링) 배치는 단일 처리, 병력 처리 등이 모두 가능합니다.
- 개발인력
  - 자바, 스프링 프레임워크를 기반
  - 커뮤니티의 강력한 지원
- 비용
  - 오픈소스

### 배치 프레임워크 중 스프링 배치를 쓰면 얻는 장점은?

- ETL(추출=extract - 변환=transform - 적재=load) 패턴에 적합합니다.
  - 청크 기반 처리
  - 다양한 확장 기능
- 데이터 마이그레이션
  - 보통 1회성으로 대충 만들 가능성이 높으나, 스프링 배치를 사용한다면, 풍부한 지원(커밋수, 롤백 등)
- 병렬 처리
- 워크로드 조정
  - Spring Cloud Data Flow 등을 통해 GUI로 테스크 조정 등

<br/>

## 마무리.

Spring Batch에 대한 예제는 다음 글에서 정리합니다.

---

**출처**

- [Spring Batch Github Repository](https://github.com/spring-projects/spring-batch)
- [Intro - 스프링 배치 기본 개념 익히기](https://www.fwantastic.com/2019/12/spring-batch-intro.html)
- [스프링 배치 강좌 1. 프로그래밍의 꽃. 스프링 배치 Hello World!](https://www.fwantastic.com/2019/12/spring-batch-1-hello-world.html)
- [Spring Batch란? 이해하고 사용하기(예제소스 포함)](https://khj93.tistory.com/entry/Spring-Batch%EB%9E%80-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B3%A0-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
- [Batch 소개와 간단한 예제](https://deeplify.dev/back-end/spring/batch-tutorial)
- [배치 어플리케이션이란?](https://jojoldu.tistory.com/324)
- [1장 배치와 스프링](https://sjh836.tistory.com/187)
- [2장 스프링 배치](https://sjh836.tistory.com/188?category=680970)
