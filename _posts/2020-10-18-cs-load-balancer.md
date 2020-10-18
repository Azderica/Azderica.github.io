---
layout: post
title: "[CS] Load Balancer(로드밸런서)"
subtitle: "Load Balancer"
categories: cs
tags: cs Load Balancer Load-Balancer 로드밸런서 difference 
comments: true

---

# Load Balancer(로드밸런서)

## Load Balancer의 정의

![image](https://user-images.githubusercontent.com/42582516/96366790-ea592c80-1184-11eb-9110-838bc94fcd5b.png)

로드 밸런싱(load balancing)는 컴퓨터 네트워크 기술의 일종으로 둘 혹은 셋이상의 중앙처리장치 혹은 저장장치와 같은 컴퓨터 자원들에게 작업을 나누는 것을 의미한다.

이 로드밸런서가 없으면 하나의 서버는 모든 사람들의 응답을 해주려고 노력하지만 클라이언트가 많아질수록 성능이 안나오게 된다.

이를 해결하기 위해서는 2가지 방안, `scale-up` 과 `scale-out`을 제시할 수 있다. 
- `scale up` : 서버의 하드웨어 성능을 올려서 더 빠르게 동작시킨다.
- `scale out` : 하나의 서버보다는 여러대의 서버가 나눠서 일을 한다.

여기서 Scale-out을 통해서 얻는 장점은 **하드웨어 향상하는 비용보다 서버 한대 추가 비용이 적은 부분**과 **여러 대의 Server 덕분에 무중단 서비스를 제공**할 수 있다.

## Load Balancer의 기술

- NAT(Network Address Translation)
  - 사설 ip주소를 공인 IP주소로 변경, 주소변경의 역할
- DSR(Dynamic Source Routing protocol)
  - 서버에서 클라이언트로 되돌아가는 경우 목적지 주소를 스위치의 IP주소가 아닌 클라리언트의 IP 주소로 전달해서 네트워크 스위치를 거치지 않고 바로 클라이언트를 찾아가는 개념
- Tunneling
  - 인터넷상에서 눈에 보이지 않는 통로를 만들어 통신할 수 있게 하는 개념
  - 데이터를 캡슐화해서 연결된 상호 간에만 캡슐화된 패킷을 구별해 캡슐화를 해제

## Load Balancer의 종류

- 운영체제 로드밸런서
  - 물리적 프로세서 간에 작업을 스케줄링
- 네트워크 로드밸런서
  - 사용 가능한 백엔드에서 네트워크 작업을 스케줄링

## 네트워크 로드밸런서의 종류

- L2(Data Link Layer)
  - Mac주소를 바탕으로 Load Balancing한다.
  - 장점 : 구조가 간단, 신뢰성이 높음, 가격저렴, 성능이 좋음
  - 단점 : Broadcast 패킷에 의해 성능저하 발생, 라우팅 등 상위레이어 프로토콜 기반 스위칭 불가
- L3(Network Layer)
  - IP주소를 바탕으로 Load Balancing한다.
  - 장점 : Broadcast 트래픽으로 전체 성능 저하 방지, 트레픽 체크
  - 단점 : 특정 프로토콜을 이용해야 스위칭 가능
- L4(Transport Layer)
- L7(Application Layer)

---

**출처**

- https://nesoy.github.io/articles/2018-06/Load-Balancer
- https://pakss328.medium.com/%EB%A1%9C%EB%93%9C%EB%B0%B8%EB%9F%B0%EC%84%9C%EB%9E%80-l4-l7-501fd904cf05
- https://medium.com/harrythegreat/aws-%EB%A1%9C%EB%93%9C%EB%B0%B8%EB%9F%B0%EC%8B%B1-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0-9fd0955f859e
