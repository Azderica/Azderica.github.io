---
title: '[Spring] Spring Batch 개념 잡기'
slug: 01-spring-batch
date: 2022-02-22
published: false
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

- 스프링 배치는 **로깅/추적, 트랜잭션 관리, 작업 처리 통계, 작업 재시작, 건너뛰기, 리소스 관리 등 대용량 레코드 처리에 필수적인 기능을 제공**합니다.
- 최적화 및 파티셔닝 기술을 통해 대용량 및 고성능 배치 작업을 가능하게 하는 고급 기술 서비스 및 기능을 제공합니다.
- Spring Batch에서 배치가 실패하여 작업 재시작을 하게 된다면 처음부터가 아닌 실패한 지점부터 실행을 합니다.
- 중복 실행을 막기 위해 성공한 이력이 있는 Batch는 동일한 Parameters로 실행 시 Exception이 발생합니다/

### Batch VS Quartz

- Spring Batch는 Scheduler가 아니기에 비교 대상이 아닙니다.
- Spring Batch는 Batch Job을 관리하지만 Job을 구동하거나 실행시키는 기능은 지원하고 있지 않습니다.
- Spring에서 Batch Job을 실행시키기 위해서는 Quartz, Scheduler, Jenkins 등 전용 Scheduler를 사용하여야 합니다.

<br/>

## Spring Batch의 3가지 레이어

![Spring-Batch-3가지-레이어](https://user-images.githubusercontent.com/42582516/155138569-34e5e8e7-d474-47a3-b572-e3cffa7be069.png)

- 애플리케이션 : 개발자가 작성한 비즈니스 로직
- 코어 : 배치 도메인을 정의하는 모든 부분
  - Job, Step 등
- 인프라스트럭처 : 각종 reader, writer, 템플릿, 헬퍼
  - IO 다루기
  - Job 실패 시 정책
- 배치 프레임워크 내에는 스케줄링 기능이 없습니다.

<br/>

## Spring Batch Job 구성 및 개념

![spring-job-step](https://user-images.githubusercontent.com/42582516/155139624-20d39950-44c3-4073-acf2-9b0116ee7220.png)

<br/>

## Spring Batch 장점

- 유지보수성
  - 배치는 다른 어플리케이션의 코드들보다 수명이 길다.
  - 테스트 용이성, 풍부한 API
- 유연성
  - JVM을 이용한 이식성 (기존의 코볼, C++ 등과 비교했을 때)
  - 코드 공유능력 (POJO 재활용 등)
- 확장성
  - 과거의 메인프레임 방식이나, 커스텀하게 처리하던 방식은 병렬 처리르 하려면 고려할게 많음, 확장성과 안정성이 떨어짐
  - 자바(or 스프링) 배치는 단일 처리, 병력 처리 등이 모두 가능함.
- 개발인력
  - 자바, 스프링 프레임워크를 기반
  - 커뮤니티의 강력한 지원
- 비용
  - 오픈소스

### 배치 프레임워크 중 스프링 배치를 쓰면 얻는 장점은?

- ETL(추출=extract - 변환=transform - 적재=load) 패턴에 적합
  - 청크 기반 처리
  - 다양한 확장 기능
- 데이터 마이그레이션
  - 보통 1회성으로 대충 만들 가능성이 높으나, 스프링 배치를 사용한다면, 풍부한 지원(커밋수, 롤백 등)
- 병렬 처리
- 워크로드 조정
  - Spring Cloud Data Flow 등을 통해 GUI로 테스크 조정 등

<br/>

## Spring Batch 예제

- 일매출 집계
- ERP 연동

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
