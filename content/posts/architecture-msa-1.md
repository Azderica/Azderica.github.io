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

MSA의 핵심은 **small services, each running in its own process** + **independently deployable**로 표현할 수 있습니다.

이를 번역한다면, **스스로 돌아갈 수 있는 서비스**와 **독립적인 배포 기능**입니다.

![architecture-diff](https://user-images.githubusercontent.com/42582516/102787740-e8118980-43e4-11eb-8760-c52424630810.png)

