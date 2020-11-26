---
layout: post
title: "[Architeture] 서버리스 아키텍처에 대한 기초 지식"
subtitle: "Serverless Architecture"
categories: backend
tags: architecture serverless backend servelress sever 
comments: true

---

# 서버리스 아키텍처에 대하여

회사에서 개발과 관련해서 이야기를 하는데, CaaS, FaaS, BaaS 등에 대한 이야기를 듣게 되었다. 생각해보니 이름만 들어보고 한 번도 제대로 알아본적이 없어서 이번기회에 정리합니다.

서버리스(Serverless)란 말 그대로 서버가 없다는 의미는 아닙니다. 다만, 특정 작업을 수행하기 위해서 컴퓨터 혹은 가상머신에 서버를 설정할 필요없이 다른 서비스(BaaS, FaaS) 등에 의존해서 작업을 처리합니다.

![image](https://user-images.githubusercontent.com/42582516/100229273-5474a680-2f67-11eb-8a3a-467c9f409a72.png)

> 들어가기에 앞서서 간단한 발전 과정은 다음과 같습니다.

## 기존 애플리케이션

### 1. 자체 설계

시스템에서 필요한 모든 인프라를 직접 관리합니다. 기존의 **전산실**로 이해하면 됩니다.

- 필요한 모든 인프라를 직접 관리. 예를 들어 기업 전산실에서 서버 및 하드웨어, 네트워크, 운영체제 등을 갖추어 모두 직접 처리해야합니다.

- 시스템이 커질 수록 유지할 관리자가 필요하고, 이에 따른 비용이 발생합니다.

### 2. IaaS(Infrastructure as a Service)

AWS, Azure 등의 서비스에서 제공하는 서비스입니다. 서버자원, 네트워크, 전력 등의 인프라를 직접 구축할 필요없이 이러한 **인프라를 가상화**하여 관리하기 쉽게 해주는 서비스를 제공합니다.

사용자는 해당 서비스를 통해서 관리자패널에서 인프라를 구성하면 됩니다. 사용자는 가상머신을 만들고 네트워크를 설정하고, 하드웨어를 설정하고, 운영체제를 설치해서 애플리케이션을 구동합니다.

### 3. PaaS(Platform as a Service)

IaaS에서 좀 더 추상화된 모델입니다. 네트워크, OS, 런타임을 제공합니다. 사용자는 애플리케이션만 배포하면 바로 구동할 수 있습니다. 또한 Auto Scaling 및 Load Balacing도 손쉽게 적용가능합니다.

예시로는 다음과 같습니다.
- AWS Elastic Beanstalk, Azure App Servies 등등

## Servless

- 서버리스는 애플리케이션 개발자가 서버를 프로비저닝하거나 애플리케이션의 확장을 관리할 필요가 없습니다.

> 프로비저닝(Provisioning) : 사용자의 요구에 맞게 시스템을 할당하고 배치, 배포한 이후 필요시에 시스템을 즉시 사용할 수 있는 상태로 미리 준비해놓는 것입니다.

- 서버가 없다는 뜻은 아니며, 작업을 처리하는 서버는 있지만 서버를 관리할 필요가 없습니다.

- 대표적으로 **BaaS** 와 **FaaS**로 나눠집니다.

### 1. BaaS(Backend as a Service)

![image](https://user-images.githubusercontent.com/42582516/100353200-82beb880-3031-11eb-89d9-5a361d5f88c4.png)


- 애플리케이션에서 일반 사용자가 보는 영역은 프론트엔드, 관리자가 보는 영역은 백엔드로 불립니다. **이때 BaaS는 백엔드인 관리자 영역을 모듈화하여 서비스**로 제공합니다.

- 백엔드 개발(데이터 저장, 다른 기기로 접근, 파일 공유 등)이 필요한 경우, 개발자가 이러한 모든 서비스를 구축하기 어려워서, BaaS를 통해서 개발 시간을 단축합니다.

- IaaS, PaaS가 서버 인프라를 대체하는 정도였다면, **BaaS와 FaaS는 서버 운영까지 맡기는 서비스**입니다.

- 대표적인 서비스로는 **Firebase**가 있습니다.

**장점**
- 개발 시간의 단축
- 서버 확장의 불필요함
- 백엔드에 대한 지식이 부족하더라도 빠른 속도로 개발이 가능
- 토이 프로젝트, 소규모 프로젝트에서는 백엔드로 유용하게 사용가능

**단점**
- 클라이언트 위주의 코드
  - 백엔드 로직이 클라이언트 쪽에 구현됨 (보안 등의 큰 이슈)
  - Firebase SDK를 통해 서버쪽에서 개발할 수 있지만, 이보다는 직접 구현이 좋습니다.
  - 데이터단의 로직이 변경되면 클라이언트 코드 수정이 이루어집니다.
- 가격
  - Firebase의 경우 초반에는 무료이지만, 앱의 규모가 커지면 비싸집니다.
  - 서비스 규모가 늘어날 수록 직접 구현의 장점이 가능합니다.
- 복잡한 쿼리가 불가능함
  - Firebase는 데이터 베이스가 하나의 큰 Json 형식으로 구조화 되어 있습니다. 

### 2. FaaS(Function as a Service)


## 그 외.

### 1. CaaS(Container as as Service)

(작성중...)

---
**출처**
- https://velopert.com/3543
- https://stonesteel1023.github.io/TIL181109/
- https://m.blog.naver.com/PostView.nhn?blogId=shakey7&logNo=221739057486&proxyReferer=https:%2F%2Fwww.google.com%2F

