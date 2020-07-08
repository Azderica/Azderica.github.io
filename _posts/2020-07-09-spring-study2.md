---
layout: post
title: "Springboot 시작하기"
date: 2020-07-07 07:30:00 -0500


---

# Springboot 이해하기

## 의존성 관리 이해

https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-dependency -management

의존성으로 다 정의가 되어있어서 적게 신경을 써도 된다는 것은 큰 장점이다.

parent를 바꿔서 dependency를 줄 수 있다.
parent를 못바꾸는 상항이면 dependencyManagement에 dependency를 주는 방법이 있다. 단점은 여기는 다른 것이 많다. 이런경우는 plugin을 사용할 수 없다.

그래서 일반적으로는 **parent를 설정**하여 **dependency를 주는 것이 중요**하다. 

의존성 관리 기능을 최대한 사용하쟈