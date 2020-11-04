---
layout: post
title: "[Springboot] 스프링부트 MVC - Filter"
subtitle: "Spring Boot MVC - Filter"
categories: backend
tags: spring backend springboot filter
comments: true

---

# Spring Boot MVC - Filter

HTTP Method 취약점을 제거하는 업무를 하는 중에 기존 코드에서 일부분 수정을 해야하는 법을 알았다. 그중 필터에 대해 알게되었고 HTTP 헤더 정보를 설정, Encoding, XSS, CORS 이슈등을 해결할 수 있다는 점을 알았다.

이에 대해서 Filter에 대해 공부해야겠다는 생각이 들었다.

## Filter란.

![image](https://user-images.githubusercontent.com/42582516/97983638-ee3dad80-1e18-11eb-95ca-2b249554509b.png)

다음의 사진과 같다.

서블릿의 ServletContext 기능으로 사용자에 의해 서블릿이 호출 되기 전/후로 사용자 요청/응답의 헤더 정보 등을 검사 및 설정할 수 있다.

(이후 추가예정...)

---
**출처**
- https://linked2ev.github.io/gitlog/2019/09/15/springboot-mvc-13-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8-MVC-Filter-%EC%84%A4%EC%A0%95/
