---
title: '[Grafana] Grafana란?'
slug: 00-grafana
date: 2020-11-18
published: true
tags: ['Grafana', 'Monitoring', 'Infra', 'Backend']
series: false
cover_image: ./images/GrafanaLogo.png
canonical_url: false
description: ' 그라파나에 대한 기본 내용을 정리한 글입니다. '
---

# Grafana란.

지난 Prometheus에 이어, 모니터링에 필요한 Grafana에 대해서 한 번 공부해보겠다.

<br/>

## Grafana 이해하기.

![image](https://user-images.githubusercontent.com/42582516/99534507-da827180-29ea-11eb-9c4b-8ebb2c3f440d.png)

> 마치 하스스톤의 로고가 생각난다.

Grafana란 메트릭/로그를 시각화하는 대시보드입니다.

> 매트릭 : 로그와 달리 주기적으로 발생하는 타임스탬프와 보통 한두가지 숫자 값을 포함하는 이벤트.

이를 좀더 자세하게 설명하면 다음과 같이 내용을 이야기할 수 있습니다. **매트릭 데이터**를 **시각화**하는데 가장 최적화된 대시보드를 제공해주는 오픈소스 툴킷입니다.

특히 다양한 DB를 연결하여 DB의 데이터를 가져와 손쉽게 시각화할 수 있습니다.

아래는 Grafana의 예시 화면입니다.

![image](https://user-images.githubusercontent.com/42582516/99536438-b4aa9c00-29ed-11eb-84cc-68b2380c5c9c.png)

[Grafana 링크](https://play.grafana.org/d/000000012/grafana-play-home?orgId=1)

해당 링크에 들어가보면, Grafana가 제공하는 시각화를 간단하게 확인할 수 있습니다.

Grafana는 시계열 매트릭 데이터 수집에 강점을 보이며, 이 강점덕분에 서버 리소스의 매트릭 정보나 로그 같은 데이터를 시각화하는데 많이 사용됩니다.

추가적으로 시각화한 그래프에서 특정 수치 이상으로 값이 올라갈때, 알림을 받는 기능을 제공합니다. 이러한 강점은 인프라 운영 관점에서 굉장히 중요한 기능을 차지합니다.

오픈소스 툴킷이므로 커뮤니티도 활성화 되어있으며, 일반 사용자들이 만들어놓은 대시보드를 import하고 더 나아가 커스터 마이징을 할 수 있습니다.

[Grafana Comunity](https://community.grafana.com/)

또한 다양한 플러그인을 제공하기 때문에 Grafana 내부적으로 기능 확장에 도움이 됩니다.

추가적으로 GrafanaCon 등 다양한 행사를 열면서, 해당 컨퍼런스에는 프로메테우스나 로키 등의 주제에 대해 이야기 합니다.

[GrafanaCon](https://grafana.com/about/events/grafanacon/2020/)

## Grafana vs Datadog

Grafana와 마찬가지로 Datadog도 클라우드 모니터링 서비스를 제공합니다.

공통점

- 메트릭 데이터를 시각화
- 대시보드 구성 가능
- 외부 통합 기능을 통해 모니터링의 영역을 확장할 수 있음.

차이점

- **Datadog**의 경우, 데이터를 직접 저장하고 있으나. **Grafana**의 경우에는 외부 데이터 소스를 정의하고 해당 데이터 소스에 쿼리를 통해서 데이터를 동적으로 가져와 시각화합니다.
- **Datadog**은 모니터링 서비스를 제공하는 상용 서비스이며, **Grafana**는 오픈소스 프로젝트입니다.

<br/>

## Grafana 설치 (다음에)

다음에 직접 구현해보면서 글을 한번 더 다루겠습니다.

<br/>

## 마무리.

간단하게 모니터링 시 사용되는 Prometheus, Grafana에 대해 정의나 특징으로 정리하였습니다. 이후에는 다른 방향의 글을 작성할 예정입니다.

추가적으로 직접 구현해보면서, 이후의 글을 추가하겠습니다.

---

**출처**

- https://medium.com/finda-tech/grafana%EB%9E%80-f3c7c1551c38
- https://www.44bits.io/ko/keyword/grafana
- https://blog.dalso.org/home-server/monitoring-server/3744
