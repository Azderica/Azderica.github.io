---
title: "[Architecture] MSA 개념 잡기"
slug: 00-architecture-msa
date: 2020-12-21
published: true
tags: ['Architecture', 'MSA', 'micro service architecture', 'MSA']
series: true,
cover_image: 
canonical_url: false
description: " 마이크로 서비스 아키텍처에 대한 개념을 정리합니다 "

---

# Microservice Architecture

크게 아키텍처는 Monolithic Architecture과 Microservice Architecture 등으로 구성됩니다. 그러나 많은 회사들이 Monolithic 아키텍처의 단점으로 인해 MSA 아키텍처로 넘어가기 위해 노력하려고 합니다. 오늘은 그 차이에 대해 정리하고, 그 개념에 대해 정리해볼려고 합니다.

<br/>

## MSA의 등장

MSA는 microservice architecture의 약자로서, **하나의 큰 어플리케이션을 여러개의 작은 어플리케이션으로 쪼개어 변경과 조합이 가능하도록 만든 아키텍처** 입니다.

### 기존 Monolithic의 한계

> 왜 필요할까요?

기존의 서비스는 Monolithic Architecture의 구조를 가지고 있었습니다. 

![monolithic-vs-msa](https://user-images.githubusercontent.com/42582516/102787038-cebc0d80-43e3-11eb-9a67-829adb6ebe51.png)

Monolithic Architecture은 소프트웨어의 모든 구성요소가 한 프로젝트에 통합되어 있는 서비스입니다. 현재 많은 회사들의 소프트웨어가 **레거시** 또는 필요로 인해서 Monolithic 형태로 구현되어 있습니다.

소규모의 프로젝트에서는 Monolithic 형태는 간단하며, 유지보수가 편하기 때문에 선호됩니다.

그러나 일정 규모 이상을 넘어가면 Monolithic은 많은 한계점에 봉착합니다.

- 전체 시스템 구조 파악의 문제
- 빌드 시간 및 테스트, 배포 시간의 급증
- 서비스의 특정 부분만 scale-out을 하기 어렵습니다.
- **부분의 장애가 전체 서비스의 장애로 이어질 수도 있습니다.**

이러한 이유로 인해서, MSA가 등장하게 되었습니다.

<br/>

## MSA의 정의

MSA의 핵심은 **small services, each running in its own process** + **independently deployable** 으로 표현할 수 있습니다.

이를 번역한다면, **스스로 돌아갈 수 있는 서비스**와 **독립적인 배포 기능**입니다.

![architecture-diff](https://user-images.githubusercontent.com/42582516/102787740-e8118980-43e4-11eb-8760-c52424630810.png)

soa를 추가해서 좀 더 자세하게 보자면.

![architecture-diff-2](https://user-images.githubusercontent.com/42582516/102787984-4474a900-43e5-11eb-8a27-4e60f3aecfca.png)

다음과 같이 구성됩니다.

<br/>

## MSA의 장단점

### MSA의 장점

#### 1. 배포

- 서비스 별 개별 배포가 가능합니다. (배포 시 전체 서비스의 중단이 없습니다.)

- 요구사항을 반영하여 빠르게 배포 가능합니다.

#### 2. 확장

- 특정 서비스에 대한 확장성이 유리합니다. (scale-out)

- 클라우드 사용 시 적합합니다.

#### 3. 장애 해결(Error Handling)

- 일부 장애가 전체 서비스로 확장될 가능성이 적습니다.

- 부분적으로 발생하는 장애에 대해 격리가 수월합니다.

#### 4. 그 외

- 새로운 기술을 적용하기 유연합니다.

- 서비스를 polyglot(여러 언어를 사용하여)하게 개발 및 운영할 수 있습니다.

### MSA의 단점

#### 1. 성능 이슈

- 서비스 간 호출 시 API를 사용하므로, 통신 비용이나 Latency에 대해 이슈가 존재합니다. 다만 일반적으로 Monolithic에서 MSA로 넘어오는 이유가 Monolithic으로 더이상 성능적인 한계에 봉착했을 때 넘어오는 느낌이 있습니다...

- 최근 우아한 테크 컨퍼런스에서는 이벤트 발행을 통해서 해당 부분을 해결했다고 했는데 이부분은 한번 참고해서 보면 좋을 듯 합니다.

#### 2. 테스트 / 트랜잭션

- 서비스가 분리되어 있어 테스트와 트랜잭션의 복잡도가 증가합니다.

- 많은 자원이 필요합니다.

#### 3. 데이터 관리

- 데이터가 여러서비스에 분산되어 조회하기 어렵습니다.

- 데이터를 관리하기 어렵습니다.

<br/>

## 마무리.

간단하게 MSA에 대해 개념을 잡았습니다. 다음에는 이 MSA에 대한 개념을 바탕으로 SAGA 패턴과 CQRS 패턴에 대해 작성하겠습니다.

---

**출처**
- https://velog.io/@tedigom/MSA-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-1-MSA%EC%9D%98-%EA%B8%B0%EB%B3%B8-%EA%B0%9C%EB%85%90-3sk28yrv0e
- https://www.samsungsds.com/kr/insights/msa.html