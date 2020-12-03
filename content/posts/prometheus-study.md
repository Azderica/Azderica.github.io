---
title: "[Prometheus] Prometheus란?"
data: 2020-11-16
published: true
tags: ['Prometheus', 'Monitoring', 'Infra', 'Backend']
series: false,
cover_image: ./images/PrometeusLogo.png
canonical_url: false
description: " 프로메테우스에 대한 기본 내용을 정리한 글입니다. "
---

# Prometheus란.

업무를 진행하다가 모니터링 시스템에 대해서 듣기 시작했다, 그 모니터링 시스템에 대해 듣다보니 공부를 해야겠다는 생각이 들어서 글을 정리한다. 모니터링 툴로 유명한 프로메테우스, Grafana 등이 있는데 오늘은 Prometheus에 대한 글을 작성해볼려고 한다.

<br/>

## Prometheus란

오픈소스 시스템 모니터링 및 경고 툴킷이다. 많은 회사들이 사용하고 있으며 Kubernetes에서도 Prometheus를 사용하여 매트릭 수집 및 대시보드 구축하는 방식을 사용하고 있습니다.

기능을 간략하게 보자면 다음과 같습니다.


![Prometheus 기능](https://user-images.githubusercontent.com/42582516/99261592-4389ae00-2860-11eb-8d93-ce2817cdc70e.png)


다음은 Promethheus의 아키텍처 구조입니다.

![Prometheus 구성](https://user-images.githubusercontent.com/42582516/99261600-46849e80-2860-11eb-87ba-7d573b45dba8.png)


간단하게 설명하면 다음과 같습니다

- `Jobs/exporters` : 실제 매트릭을 수집하는 프로세스
- `exporter`` : 매트릭을 수집하고 HTTP 통신을 통해 매트릭 데이터를 가져갈 수 있게 `/metrics`라는 HTTP 엔드포인틀 제공
- `Prometheus server` : 이 `exporter`의 엔드포인트로 HTTP GET 요청을 날려 내트릭 정보를 수집(Pull)한다.

- 매트릭이란?

> 매트릭이란 타임스탬프와 보통 한두가지 숫자 값을 포함하는 이벤트. 

> 로그와 달리 메트릭은 주기적으로 보냅니다. 로그는 보통 무언가가 발생했을 때, 로그 파일에 추가되며 메트릭은 종종 리소스 사용 모니터링, 데이터베이스 실행 메트릭 모니터링 등에서 사용됩니다.

<br/>

## Prometheus의 특징

### 장점

- pull 방식의 구조를 채택함으로써 모든 메트릭에 대한 데이터를 중앙 서버로 보내지않아도 됩니다.
- Prometheus의 특성 상, 모든 데이터를 수집하지 않고 일정 주기(default 15s)로 발생하는 메트릭을 수집하여 추이나 모니터링을 어플리케이션에 무리 없이 하기 때문에 이러한 부분에서 매력적인 솔루션입니다.
- Prometheus를 사용하고 있는 Vendor와 open-source들이 상당히 많다. 구조가 복잡하지 않고 간단하기 때문에 특정 솔루션에 대한 export를 하는 것이 어렵지 않습니다. 특히 Kubernetes와 Docker환경에서의 서비스의 메트릭을 수집하고 분석하는 대에 집중적으로 많이 사용됩니다.

### 단점

- Scale-out이 안됩니다.(억지로는 할 수 있으나 이는 clusting보다는 Prometheus에 Prometheus를 연결에 Hieracrchy 구조를 만들어서 사용해야 한다.)
- 모든 메트릭을 전송하지 않기 때문에 "추이"를 보는데는 좋지 않아서, 모든 로그를 추적하고 문제를 발생했을 때 이를 검색하여 어떤 일이 있었는지 원인을 밝히고자 할때는 사용하기 힘든 솔루션입니다.

<br/>

## 마무리

간단하게 내용에 대해서 조사했습니다. 좀 더 구현하는 방식에 대해서는 직접 Prometheus를 만들어보면서 추가하겠습니다.

---
**출처**
- https://medium.com/finda-tech/prometheus%EB%9E%80-cf52c9a8785f
- https://gompangs.tistory.com/entry/Prometheus-%EB%A5%BC-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90


