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

**단점**
- 공간, 하드웨어, 네트워크, OS 등을 모두 관리해야함
- 시스템이 커질 수록 유지할 관리자가 필요하고, 이에 따른 비용이 발생합니다.

### 2. IaaS(Infrastructure as a Service)

AWS, Azure 등의 서비스에서 제공하는 서비스입니다. 서버자원, 네트워크, 전력 등의 인프라를 직접 구축할 필요없이 이러한 인프라를 가상화하여 관리하기 쉽게 해주는 서비스를 제공합니다.

사용자는 해당 서비스를 통해서 관리자패널에서 인프라를 구성하면 됩니다. 사용자는 가상머신을 만들고 네트워크를 설정하고, 하드웨어를 설정하고, 운영체제를 설치해서 애플리케이션을 구동합니다.

### 3. PaaS(Platform as a Service)

IaaS에서 좀 더 추상화된 모델입니다. 네트워크, OS, 런타임을 제공합니다. 사용자는 애플리케이션만 배포하면 바로 구동할 수 있습니다. 또한 Auto Scaling 및 Load Balacing도 손쉽게 적용가능합니다.

예시로는 다음과 같습니다.
- AWS Elastic Beanstalk, Azure App Servies 등등

## Servless

(작성중...)

---
**출처**
- https://velopert.com/3543
- https://stonesteel1023.github.io/TIL181109/
- https://m.blog.naver.com/PostView.nhn?blogId=shakey7&logNo=221739057486&proxyReferer=https:%2F%2Fwww.google.com%2F

