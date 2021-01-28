---
title: '[Network] NAT 개념잡기?'
slug: 00-network-nat
date: 2021-01-26
published: true
tags: ['Network', 'Nat', 'Web', 'Ip']
series: false,
cover_image: ./images/NatText.jpg
canonical_url: false
description: 'NAT의 개념을 잡습니다.'
---

# NAT

## NAT의 개념

NAT는 Network Address Translate의 약자로서, 네트워크 주소를 변환하는 역할을 합니다. 좀 더 자세하게 이야기 하자면 IP패킷의 TCP/UDP 포트 숫자 및 목적지의 IP 주로를 재기록 하면서 라우터를 통해서 네트워크 트래픽을 주고 받는 기술입니다.

일반적으올 border router의 기능을 수행하는 데, 이는 **내부 망에서는 사설 IP 주소를 사용하여 통신을 하고 외부와의 통신에는 NAT를 거쳐 공인 IP 주소로 자동 변환하는 역할**을 수행합니다.

<br/>

## NAT 사용 이유

NAT를 이용하는 이유는 사설 네트워크에 속한 여러 개의 호스트가 하나의 공인 IP 주소를 통해서 사용하여 인터넷에 접속하기 위함입니다.

NAT는 IPv4의 주소 부족 문제를 해결하기 위해서 고려했으며, 사설 네트워크 주소를 사용하는 망(private)에서 외부의 공인망(public)과의 통신을 위해서 네트워크 주소를 변환하는 것입니다.

<br/>

## NAT 동작 원리

NAT는 1:1의 주소 매핑을 수행하기 때문에 NAT 라우터로 들어온 inside -> outside 패킷만이 주소 전환의 대상이 됩니다. IP의 헤더부분을 체크하여, NAT 테이블에 의해 해당 주소로 바꾼다음 checksum을 다시 계산하여 IP의 헤더를 바꾸는 방법으로 동작합니다.

Application Layer까지 NAT 주소 전환이 반영이 되어야하므로, NAT는 IP 주소의 참조내용을 담고 있는 Application data 부분을 새로운 주소로 변환하여 수행합니다.

<br/>

## NAT의 변환 방식

### Full-cone NAT(one-to-one NAT)

![Full-cone NAT(one-to-one NAT)](https://user-images.githubusercontent.com/42582516/105776816-9b553b80-5fac-11eb-9bca-3a04d0cacd06.png)

### (Address)-restricted-cone NAT

![(Address)-restricted-cone NAT](https://user-images.githubusercontent.com/42582516/105776803-95f7f100-5fac-11eb-8223-59f548991746.png)

### Port-restricted cone NAT

![Port-restricted cone NAT](https://user-images.githubusercontent.com/42582516/105776834-a0b28600-5fac-11eb-822a-6a628272c2e1.png)

### Symmetric NAT

![Symmetric NAT](https://user-images.githubusercontent.com/42582516/105776840-a5773a00-5fac-11eb-81d5-26e2d2c58443.png)

<br/>

## NAT의 장단점

### NAT의 장점

- 인터넷의 공인 IP주소를 절약할 수 있습니다.
  - 공인 IP를 다수가 함께 사용할 수 있으므로 이를 절약할 수 있습니다.
- 공공망고 연결되는 사용자들의 고유한 사설망을 침입자들로 부터 보호할 수 있습니다.
  - 공개된 인터넷과 사설망 사이에 방화벽을 설치하여 외부공격으로부터 사용자의 통신망을 보호할 수 있습니다.
  - NAT 설정 시, 라우터는 자신에게 할당된 공인 IP주소만 외부로 알려지고 내부에서는 사설 IP를 사용하기 때문에 외부침입자는 사설 IP를 몰라 공격이 힘들어집니다.

### NAT의 단점

- Ent-to-End간의 추적(IP Trace)가 어려워집니다. 여러 개의 NAT 라우터에 의해 multiple NAT 가 적용되면 추적이 더 어려워집니다. (보안측에서는 장점입니다)
- NAT 라우터를 거치는 모든 패킷을 scan해야해서 switching path delay 가 길어집니다.

<br/>

## 마무리.

간단하게 NAT에 대해서 정리했습니다.

---

**출처**

- https://ko.wikipedia.org/wiki/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC_%EC%A3%BC%EC%86%8C_%EB%B3%80%ED%99%98
- https://m.blog.naver.com/PostView.nhn?blogId=ssdyka&logNo=221376674886&proxyReferer=https:%2F%2Fwww.google.com%2F
- https://jwprogramming.tistory.com/30
