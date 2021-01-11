---
title: '[Network] GSLB란?'
slug: 00-network-gslb
date: 2020-12-28
published: true
tags: ['Network', 'Devops', 'GSLB', 'DNS', 'Server', 'Backend']
series: false,
cover_image:
canonical_url: false
description: 'GSLB에 대해 작성합니다.'
---

# GSLB란?

로드밸런서 관련 이야기를 하면서 어쩌면 한번 쯤 GSLB에 대해 들어봤을 수 있다. 회사에서는 F5나, Citrix와 같이 여러 GSLB를 사용하고 있는데 오늘은 이에 대해 한번 정리해봅니다.

## GSLB의 정의

GLSB는 Global Service Load Balancing의 약자로, **비지니스 연속성 및 재해 복구에 사용되는 기술들의 집합**입니다,

이러한 GLSB는 다음과 같은 기능을 제공하여, 지능적 DNS 서비스라고도 불리기도 합니다.

- 재난 복구 (disaster recovery)
  - 실패에 대해 대체할 수 있는 서버를 제공합니다.
- 부하 분산 (load sharing)
  - 많은 트래픽을 여러 서버로 분산합니다.
- 성능 (performance)
  - client의 위치나 네트워크를 기반으로 최적의 성능을 낼 서버를 선택합니다.

<br/>

## GLSB의 동작

다음과 같은 순서로 진행됩니다.

![GLSB-logic](https://user-images.githubusercontent.com/42582516/104177144-adcb6300-544b-11eb-8ce7-4cbeef9c7480.png)

각 서버마다 Health Check를 하고 운영가능한 서버의 IP를 반환합니다.

<br/>

## GLSB vs DNS

GLSB와 DNS를 비교하면 다음과 같습니다.

![GLSB-vs-DNS](https://user-images.githubusercontent.com/42582516/104177295-e53a0f80-544b-11eb-8cb4-71d51475305d.png)

이를 표로 표현하면 다음과 같습니다.

|                 | GLSB                                                                   | DNS                                                              |
| --------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 재해복구        | 모니터링(Health Check) 실패한 IP는 응답에서 제외합니다.                | 서버의 상황을 알 수 없습니다.                                    |
| 로드밸런싱      | 서버를 모니터링 해서 로드가 적은 서버의 IP를 반환합니다.               | Round Robin 방식을 사용합니다. 정교한 로드밸런싱이 되지않습니다. |
| 레이턴시 기반   | 유저에게 더 적은 latency를 가지는 서버로 연결합니다.                   | 네트워크상 멀리 떨어진 위치의 서버에 연결가능합니다.             |
| 위치기반 서비스 | 유저의 지역 정보에 기반하여, 해당 지역을 서버스하는 서버로 연결합니다. | Round Robin                                                      |

<br/>

## GSLB 주요 기술

### Health Check

- 등록된 호스트들에 대해 주기적으로 health check를 수행합니다.
- 호스트가 실패하는 경우, DNS 응답에서 해당 호스트를 제거합니다.
- 실패한 호스트로의 접근을 막아서 서버의 가용성을 높입니다.

### TTL(Time to Live)

- DNS에서 권한을 가진 네임 서버는 특정 레코드에 대해 TTL를 설정할 수 있습니다.
- 캐시 네임서버는 TTL 동안 캐시에 저장하고, Client로부터 요청이 오면 캐시에 저장된 값을 반환합니다.
- TTL값이 너무 크면, GLSB의 상태 정보가 제때 동기화되지 못합니다.
- TTL값이 너무 짧으면, 네임서버에 오는 부담감이 커집니다.

### 네트워크 거리와 지역

- 주기적으로 성능을 측정하고 결과를 저장합니다.
- DNS 질의에 대해 지리적으로 가까운 서버를 반환하거나 네트워크 거리가 가까운 서버를 반환합니다.
- 지리적으로 가까운 서버는 RTT(Round Trip Time)도 짧기 때문에 동일한 결과를 반환하는 경우가 많습니다.

<br/>

## 대표적인 서비스

- AWS : Route53
- Google Cloud : Cloud Load Balancing
- Azure : Traffic Manager
- Naver : Global Route Manager
- F5
- Citrix

## 마무리.

간단하게 GSLB에 대해 정리했습니다. 잘못된 부분 있으면 편하게 알려주세요.

---

**출처**

- https://ckddn9496.tistory.com/33
- https://nesoy.github.io/articles/2020-01/GSLB
- https://blog.naver.com/n_cloudplatform/221206343859
- https://www.joinc.co.kr/w/man/12/GSLB
- https://cloud.kt.com/portal/ktcloudportal.epc.productintro.gslb.html
- https://cwiki.apache.org/confluence/display/CLOUDSTACK/GSLB+%28Global+Server+Load+Balancing%29+Functional+specification+and+Design+Document
- https://www.netmanias.com/ko/post/blog/5620/dns-data-center-gslb-network-protocol/global-server-load-balancing-for-enterprise-part-1-concept-workflow
- https://cloud.kt.com/portal/ktcloudportal.epc.productintro.gslb.html
