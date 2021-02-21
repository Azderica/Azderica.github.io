---
title: '[DesignPattern] 사이드카 패턴이란'
slug: 00-design-pattern-sidecar
date: 2021-02-21
published: true
tags: ['DesignPattern', 'Sidecar', 'Pattern']
series: false,
cover_image: ./images/SidecarPatternText.png
canonical_url: false
description: '사이드카 패턴에 대해 정리합니다.'
---

# Sidecar Pattern

## Sidecar Pattern이란

사이드카 패컨은 **어플리케이션 컨테이너와 독립적으로 동작하는 별도의 컨테이너를 붙이는 패턴**입니다. 어플리케이션 컨테이너의 변경이나 수정없이 독립적으로 동작하는 컨테이너를 붙였다 뗐다할 수 있습니다.

![image](https://user-images.githubusercontent.com/42582516/108616441-bb173c80-7450-11eb-9cde-4820ad6f2117.png)

이 패턴은 오토바이에 연결된 사이드카와 유사하기 때문에 사이드카라고 이야기를 합니다. 사이드카 패넡은 상위 애플리케이션에 대해 지원 기능을 제공합니다. 또한 사이드카는 상위 애플리케이션과 동일한 수명 주기를 공유하므로 상위 애플리케이션과 함께 만들어지고 사용 중지됩니다.

![image](https://user-images.githubusercontent.com/42582516/108616806-4f36d300-7454-11eb-8d58-ceadd4f438ac.png)

일반적으로 사이드카 패턴은 다음과 같이 구성됩니다. 사이드카 서비스는 어플리케이션의 일부일 필요는 없으며 애플리케이션에 연결되어 있습니다. 사이드카는 기본 어플리케이션을 사용해서 배포되는 프로세스 또는 서비스를 지원합니다.

<br/>

## 장단점

### 장점

- 상호 의존성을 줄일 수 있습니다.
- 사이드카 장애 시 애플리케이션이 영향을 받지않습니다.
- 사이드카 적용/변경/제거 등의 경우에 애플리케이션은 수정이 필요가 없습니다.
- 애플리케이션과 사이드카를 다른 언어로 만들 수 있습니다.
- 대부분 같은 스토리지를 공유할 수 있기 때문에 공유에 대한 고민이 적습니다.

### 단점

- 어플리케이션이 너무 작은 경우, 배보다 배꼽이 커질 수 있습니다.
- 프로세스간 통신이 너무 많고 최적화해야한다면ㅋ 어플리케이션에서 함께 처리하는 것이 좋습니다.

<br/>

## 예시

다음의 경우에 사용할 수 있습니다.

- Infra API, 인프라 개발 팀은 인프라에 액세스할 언어별 클라이언트 라이브러리 대신 각 애플리케이션과 함께 배포되는 서비스를 만듭니다. 서비스는 사이드카로 로드되고 로깅, 환경 데이터, 저장소, 검색, 상태 검사 등의 서비스를 비롯한 인프라 서비스에 대한 공통 계층을 제공합니다. 또한 사이드카는 상위 어플리케이션의 호스트 환경 및 프로세스를 모니터링하고 중앙 집중식 서비스에 정보를 기록합니다.
- NGINX/HAProxy 관리합니다. 환경 상태를 모니터링한 다음 NGINX 구성 파일을 업데이트하고 상태 변경이 필요한 경우 프로세스를 재활용하는 사이드카 서비스를 사용해서 NGINX를 배포합니다.
- Offload Proxy, 서비스에 대한 사용중인 정적 파일 콘텐츠를 처리하도록 NGINX 프록시를 node.js 서비스 인스턴스 앞에 배치합니다.

---

**출처**

- https://docs.microsoft.com/ko-kr/azure/architecture/patterns/sidecar
- https://blog.leocat.kr/notes/2019/02/16/cloud-sidecar-pattern
- https://blog.davemdavis.net/2018/03/13/the-sidecar-pattern/
