---
layout: post
title: "[Prometheus] Prometheus란?"
subtitle: "Prometheus에 대한 기초 지식 정리"
categories: backend
tags: prometheus backend
comments: true

---

# Prometheus

Created By: Myeonghun Park
Last Edited: Nov 16, 2020 5:46 AM

# Prometheus.

업무를 진행하다가 모니터링 시스템에 대해서 듣기 시작했다, 그 모니터링 시스템에 대해 듣다보니 공부를 해야겠다는 생각이 들어서 글을 정리한다. 모니터링 툴로 유명한 프로메테우스, Grafana 등이 있는데 오늘은 Prometheus에 대한 글을 작성해볼려고 한다.

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

## Prometheus의 특징

(이후 추가예정)


---
**출처**
- https://medium.com/finda-tech/prometheus%EB%9E%80-cf52c9a8785f



