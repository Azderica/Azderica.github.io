---
layout: post
title: "Springboot API - HATEOAS와 Self-Describtive Message 적용"
date: 2020-09-14 06:10:00 -0500


---



# 스프링 HATEOAS 소개

<br/>

## 스프링 HATEOAS 소개

### 스프링 HATEOAS
- https://docs.spring.io/spring-hateoas/docs/current/reference/html/
- 링크 만드는 기능
  - 문자열 가지고 만들기
  - 컨트롤러와 메소드로 만들기
- 리소스 만드는 기능
  - 리소스: 데이터 + 링크
- 링크 찾아주는 기능
  - Traverson
  - LinkDiscoverers
- 링크
  - HREF
  - REL
    - self
    - profile
    - update-event
    - query-events

![image](https://user-images.githubusercontent.com/42582516/93029741-704ef880-f658-11ea-8e27-81d626a05ed8.png)


