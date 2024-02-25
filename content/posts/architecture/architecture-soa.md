---
title: '[Architecture] SOA 패턴이란'
slug: 01-architecture-soa
date: 2021-01-01
published: true
tags: ['Soa', 'Sao pattern', 'Architecture', 'Pattern']
series: true
cover_image: ../images/SoaText.png
canonical_url: false
description: ' SOA 패턴에 대해 정리합니다.'
---

# SOA 패턴을 알아보자.

대용량의 분산 시스템에서 SOA라는 개념에 대해 많이 듣습니다. 서버사이드의 근간이 되는 SOA(Service Oriented Architecture)에 대해 알아보겠습니다.

<br/>

## SOA이란?

SOA란 Service Oriented Architecture의 약자로서, 이를 해석하면 서비스 지향 아키텍쳐를 의미합니다.

기존의 애플리케이션의 기능들을 **비지니스적인 의미를 가지는 기능 단위**로 묶어서 표준화된 호출 인터페이스를 통해 서비스로 구현하고, 이 서비스들을 기업의 업무에 따라 어플리케이션을 구성하는 소프트웨어 개발 아키텍처를 의미합니다.

![SoaModel](https://user-images.githubusercontent.com/42582516/103477346-5f8de280-4e01-11eb-9500-25672abe187f.png)
: https://songii00.github.io/2019/11/17/2019-11-17-CleanArchitecture%20Item%2027/

### 왜 SOA가 주목 받나요?

- 웹 서비스의 등장으로 인해 다양한 기술적 복합도를 낮출 수 있게되어, 기술적인 대안이 등장하였습니다.
- 점점 확장되는 독립된 업무 시스템으로 인해 통합에 대한 필요가 생겼습니다.
- 기업의 비지니스 속도가 빨라져서 민첩한 대응이 필요해졌습니다.

<br/>

## SOA의 기본적인 개념

### 서비스란?

서비스란 플랫폼에 종속되지 않는 표준 인터페이스를 통해 비지니스적인 의미를 가지는 기능들을 모아놓은 **소프트웨어 컴포넌트**를 의미합니다.

ex. 임직원 정보 서비스, 계좌이체 서비스, 상품 주문 서비스

일반적으로 SOA에서 정의하는 서비스는 **비지니스 서비스**를 의미합니다.

그 외의 서비스로는 Intermediary 서비스나 Process Centrix 서비스, Application 서비스, Public Enterprise 서비스 등이 있습니다.

![ServiceImage](https://user-images.githubusercontent.com/42582516/103477324-1e95ce00-4e01-11eb-8332-46a5dd17f6fb.png)
: https://www.slideshare.net/Byungwook/soa-61487404

<br/>

## SOA의 단계적 발전 구조.

SOA는 시스템의 규모와 업무적 요구 사항에 따라 3단계 순서로 발전됩니다.

### Fundamental SOA

기존 시스템들을 서비스화하여, 각 시스템들을 통합하는 단계입니다.

- 서비스화와 통합이 중점 전체를 한 시스템화합니다.
- 서비스에 대한 조합은, Front End에서 담당합니다.
- 비지니스 서비스와 Application서비스로만 구성됩니다.

![FundamentalSOA](https://user-images.githubusercontent.com/42582516/103477424-230eb680-4e02-11eb-96d1-3d5efa11bd40.png)

### Networked SOA

Fundamental SOA의 문제점

- 시스템의 크기가 증가됨에 따라 서비스와 Front-End 사이에 연결이 복잡해집니다.
- 시스템의 유연성이 떨어집니다.
- 관리 및 중앙 통제가 어렵습니다.

이러한 단점을 해결하기 위해 Networked SOA는 아래의 특징을 가지고 있습니다.

- SOA 시스템의 가운데 서비스 허브를 둬서 서비스의 중앙 통제력 및 유연성을 강화합니다.
- Intermediary 서비스가 ESB(라우팅, 변환, 로깅, 서비스 통제 등)에 위치합니다.

![NetworkedSOA](https://user-images.githubusercontent.com/42582516/103477468-8d275b80-4e02-11eb-9fc0-d2a37057ac5b.png)

### Process Oriented SOA

기존에 Networked SOA에서 발전한 단계입니다.

- 비지니스 플로우(Business Flow)가 있을 경우에만 적용됩니다.
- 서비스의 조합을 통한 업무의 구현을 BPM을 이용합니다.
- 업무 변화에 민첩하게 반응합니다,. (Agile 가능)
- 기술조직과 비지니스 조직간의 의사 소통이 원할합니다.

<br/>

## 다른 아키텍처와 비교

### Monolithic 보다 나은점

- 출시 일정 단축 및 유연성이 향상됩니다.
- 신규 시장에서 레거시 인프라를 활용가능합니다.
- 더 효율적인 애자일 개발 방식으로 비용을 아낄 수 있습니다.
- 손쉽게 유지관리합니다.
- 확정성을 가지고 있습니다.
- 안정성이 강화됩니다.
- 편리한 이용이 가능합니다.

### MSA와 비교

MSA와 SOA는 유사한 개념 때문에 혼동하기 쉽습니다. 다만 둘의 **근본적인 차이점은 범위**입니다. **SOA는 전사적인 아키텍처 접근 방식이며, MSA는 어플리케이션 개발 팀 내의 구현 전략**입니다.

또한 각각의 구성 요소와 통신하는 방법에서 차이가 있습니다. **SOA는 ESB를 사용**하는 반면에 **마이크로서비스끼리는 언어의 제약이 없는 API**를 통해 stateless 방식으로 통신합니다. 마이크로서비스의 API에는 언어의 제약이 없기 때문에 개발팀에서 사용하고 싶은 툴을 선택할 수 있습니다. 따라서, 마이크로서비스의 내결합성과 유연성이 더 유연합니다.

<br/>

## 마무리.

오늘은 간단하게 SOA개념에 대해 정리해보았습니다. MSA와 혼란스러운 부분이 있었으나 큰 차이를 이해할 수 있었습니다. 해당 게시글의 잘못된 부분을 알려주시면 감사합니다.

---

**출처**

- https://sarc.io/index.php/miscellaneous/742-soa-service-oriented-architecture
- https://www.slideshare.net/Byungwook/soa-61487404
- https://www.redhat.com/ko/topics/cloud-native-apps/what-is-service-oriented-architecture
