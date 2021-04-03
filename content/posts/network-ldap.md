---
title: '[Network] LDAP이란?'
slug: 00-network-ldap
date: 2021-01-19
published: true
tags: ['Network', 'LDAP', 'Web', 'Protocol']
series: false
cover_image: ./images/LdapText.png
canonical_url: false
description: 'LDAP에 대해 작성합니다.'
---

# LDAP

LDAP의 개념은 들어본 사람도 있을 것이고 들어보지 못한 사람도 있을 것입니다. 업무에 대해 진행을 하다가 LDAP에 대해 들어보게 되었고 처음 듣는 개념이라 한 번 정리가 필요하다는 생각이 필요했습니다.

<br/>

## LDAP의 개념

LDAP이란 `Lightweight Directory Access Protocol`의 약자로 이를 해석하면 경량 디렉터리 액세스 프로토콜로 해석됩니다. 간단하게 이야기하면 TCP/IP 위에서 **디렉터리 서비스를 조회하고 수정하는 응용 프로토콜**입니다.

- 디렉토리 : 논리, 계급 방식 속에서 조직화된 비슷한 특성을 가진 객체들의 모임

일반적으로 LDAP은 인증을 위한 다른 서비스에서 자주 사용됩니다. 또한 LDAP의 배치는 최상위 수준의 계급을 구조화하기 위해 도메인 이름을 사용하는데 디렉토리가 깊어질수록 이를 대표하는 항목이 나타납니다.

LDAP의 개념을 이해하기 위해서는 DAP에 대해서 알면 좋습니다. X.500의 DAP은 OSI 7 계층의 전체 프로토콜 스택을 지원하는데 너무 무거운 프로토콜입니다. 그래서 **DAP의 복잡성을 줄이고 TCP/IP 레이어에서 가볍게 조작할 수 있는 프로토콜, 저장소로서 특정화된 데이터베이스이며 write 작업보다는 read 작업에 적합**한 것으로 탄생한 것이 LDAP입니다.

> X.500

X.500은 전자 디렉토리 서비스를 전달하는 컴퓨터 네트워크 표준입니다. 좀 더 자세하게 알기위해서는 `Directory Service`의 개념에 대해서 이해해야하는데, 이는 **OSI 7 Layer의 응용계층에 속하는 프로토콜로서 정보통신 서비스에 필요한 정보를 데이터베이스화하여 효율적으로 관리하고 사용자가 편리하게 접근하는 기능을 제공하는 서비스**입니다.

![Directory-service](https://user-images.githubusercontent.com/42582516/104970027-836e3c80-5a2d-11eb-8a53-ebf697fe300d.png)

Dircetory Service는 다음과 같은 형태를 가지고 있습니다.

- `DUA` : Directory User Agent, 사용자와 디렉토리 간의 인터페이스 역할 수행 프로세스
- `DSA` : Directory System Agent, 디렉토리 내 사용자의 요구 프로세스

<br/>

## LDAP의 구성

![ldap-component](https://user-images.githubusercontent.com/42582516/104970321-5f5f2b00-5a2e-11eb-8e6d-b064167a8c52.png)

LDAP의 요청은 사용자나 응용프로그램에서 요청시 LDAP을 통해서 LDAP서버에 전달됩니다. 서버는 요청을 처리 후 다시 LDAP을 통해서 요청자에게 결과를 전송합니다. 기존의 DAP과 다르게 TCP/IP 상에서 운영됩니다.

<br/>

## LDAP의 구조

LDAP의 구조는 크게 4가지로 구분됩니다.

너무 깊게 들어가면 내용적으로 이해하기 힘들 것 같아 개념만 정리하겠습니다.

### Information 모델

![ldap-hierarchical](https://user-images.githubusercontent.com/42582516/104970313-58d0b380-5a2e-11eb-9115-a9c1a527bc38.png)

**정의** : LDAP의 데이터에 대한 종류와 디렉토리에 저장되는 정보에 대한 기본 단위를 정의합니다. 기본적으로 Entries, Attributes, Values 3가지로 정의됩니다.

- Entry : 디렉토리 정보에 대한 기본단위
- Attribute : Entry를 구성하는 단위
- Value : Attribute의 실질적인 데이터

### Naming 모델

**정의** : 데이터를 어떻게 구성하고 참조할 것인지에 대해 정의합니다.

### Functional 모델

**정의** : 디렉토리 트리의 데이터에 접근하는 방법에 대해 정의합니다. 크게 3가지 그룹으로 구성합니다.

- Interrogation(질문) 작업 : 디렉토리 Entry를 검색 및 비교하는 기능
- Update(갱신) 작업 : 디렉토리 Entry의 추가, 삭제, 변경 등의 기능
- Authentication(인증) 및 Control(제어) 작업 : 클라이언트의 확인 및 제어 기능(Bind, Unbind, Abandon)

### Secruity 모델

인증된 접근만 디렉토리 내 정보를 제공합니다.

<br/>

## LDAP Version

현재 version 3까지 나왔습니다.

### LDAPv1 vs LDAP v2

- LDAPv2는 인증과정없이 LDAP 서버에 Bind 되는 것이 허용됩니다.
- READ, List Operation이 삭제되었습니다.
- 클라이언트는 오직 하나의 서버에만 연결가능하도록 바뀌었습니다.(DAP의 Referral 기능을 제공하지않습니다.)

### LDAPv2 vs LDAP v3

- Referral을 통해서 분산 기능이 생겼습니다.
- 사용자 정의 Attribute와 Object 생성이 가능합니다.
- UTF-8 Encoding을 이용해서 언어를 표현하는 제약이 완화되었고 다양한 언어 사용이 가능합니다.
- 사용자 정의 Matching Rule이 생성 가능합니다.
- 보안성이 올라갔습니다.

<br/>

## 마무리.

간략하게 개념을 잡는다고 생각하고 내용을 정리했습니다.

---

**출처**

- https://ldap.or.kr/ldap-%EC%9D%B4%EB%9E%80/
- https://velog.io/@kante/LDAP-%EC%9D%B4%EB%9E%80
- https://medium.com/@hmj2088/ldap-dc771e2704a9
