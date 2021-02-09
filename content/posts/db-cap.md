---
title: '[Database] CAP 정리'
slug: 00-db-cap
date: 2021-02-09
published: true
tags: ['Database', 'CAP', 'PACELC', 'Architecture', 'Server']
series: false,
cover_image: ./images/CapImage.png
canonical_url: false
description: 'CAP 이론에 대해 정리합니다.'
---

# CAP 정리

DB에 대해 공부하다 보면, CAP 이론에 대해 듣게 됩니다. 비록 이야기가 조금 있기는 하지만 그래도 CAP에 대해 개념을 정리합니다.

<br/>

## CAP 란.

CAP이론(Brewer's theorem)은 Network로 연결된 분산된 데이터베이스 시스템은 일관성(Consistency), 가용성(Availability), 분할 내구성(Partition Tolerance)의 3가지 특성 중 2가지 특성만을 충족할 수 있고 3가지를 모두 충족할 수는 없다는 이론입니다.

### C(**일관성**, Consistency)

- 일관성을 가진다는 것은 모든 데이터를 요청할 때 응답으로 가장 최신의 변경된 데이터를 리턴 또는 실패를 리턴합니다.
- 모든 읽기에 대해서 DB노드가 항상 동일한 데이터를 가지고 있어야한다는 의미입니다.

### A(**가용성**, Availability)

- 가용성은 모든 요청에 대해서 정상적인 응답을 합니다.
- 클러스터의 노드 일부에서 장애가 발생해도 READ나 WRITE 등의 동작은 항상 성공적으로 리턴되어야합니다.

### P(**분할내성**, Partition tolerance)

- 메시지 전달이 실패하는 시스템 일부가 망가져도 시스템이 계속 동작할 수 있습니다.
- 분할 내구성이란 Node간의 통신 장애가 발생하더라도 동작해야합니다.

![image](https://user-images.githubusercontent.com/42582516/107368608-19285380-6b24-11eb-95b2-846fea107c43.png)

다만, 현재의 DB와는 문제가 있다는 이야기는 있습니다.

![image](https://user-images.githubusercontent.com/42582516/107371626-d1a3c680-6b27-11eb-9d32-1edebb653aed.png)

<br/>

## 일반적으로

### CP(Consistency & Partition Tolerance)

- 어떤 상황에서도 안정적으로 시스템은 운영되지만 Consistency가 보장되지 않는다면 Error를 반환합니다.
- **매 순간 Read / Write 에 따른 정합성이 일치할 필요가 있는 경우 적합한 형태입니다.**

### AP(Availability & Partition Tolerance)

- 어떤 상황에서도 안정적으로 시스템은 운영됩니다.
- 데이터와 상관없이 안정적인 응답을 받을 수 있습니다.
- 다만 데이터의 정합성에 대한 보장은 불가능합니다.
- **결과적으로 일관성이 보장되는 Eventual Consistency를 보장할 수 있는 시스템에 알맞는 형태입니다.**

### 대부분은...

- 사실 대부분 CP, AP 시스템은 없고 대부분 CP와 AP의 어느 중간 쯤에 존재합니다.
- 예제에 봤듯이 configuration에 따라 변하기도 하고, 이론 자체에서 한계점도 존재합니다.
- 가장 큰 문제는 P에 대한 명확한 정의가 부족합니다.
- 기존의 문제를 해결하기 위해 PACELC 이론이 등장하였습니다.

<br/>

## PACELC 이론

다음과 같은 요소로 표현됩니다.

![pacelc](https://user-images.githubusercontent.com/42582516/107372209-7faf7080-6b28-11eb-897d-461cc4b64a86.png)

### PACELC 구성

PACELC는 크게 4가지로 구성됩니다.

| 구분      | 구성         | 설명      |
| --------- | ------------ | --------- |
| Partition | Availability | 가용성    |
|           | Consistency  | 일관성    |
| Else      | Latency      | 시간 지연 |
|           | Consistency  | 일관성    |

### PACELC 대입

이를 기존의 DB에 대입시키면 다음과 같이 볼 수 있습니다.

![pacelc-db](https://user-images.githubusercontent.com/42582516/107372699-0bc19800-6b29-11eb-96f0-957e59da40b8.png)

<br/>

## 마무리.

CAP 이론과 PACELC 이론에 대한 개념을 잡았습니다.

---

**출처**

- https://jins-dev.tistory.com/entry/%EB%B6%84%EC%82%B0-%EC%8B%9C%EC%8A%A4%ED%85%9C-%ED%99%98%EA%B2%BD-Distributed-System-%EC%97%90%EC%84%9C-BASE-%EC%9B%90%EC%B9%99%EA%B3%BC-CAP-%EC%A0%95%EB%A6%AC
- https://sabarada.tistory.com/91
- https://m.blog.naver.com/PostView.nhn?blogId=windfalcon1&logNo=220402574806&proxyReferer=https:%2F%2Fwww.google.com%2F
