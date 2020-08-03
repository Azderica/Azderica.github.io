---
layout: post
title: "Springboot 활용하기"
date: 2020-08-03 07:30:00 -0500


---

# Springboot 활용하기

| 스프링 부트 핵심 기능 | 각종 기술 연동 |
|------------------|-------------|
| SpringApplication | 스프링 웹 MVC |
| 외부설정 | 스프링 웹 MVC |
| 프로파일 | 스프링 데이터 |
| 로깅 | 스프링 시큐리티 |
| 테스트 | REST API 클라이언트 |
| Spring-Dev-Tools | 다루지 않은 내용들 |

## SpringApplication

https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-spring-application.html#boot-features-spring-application

Tip) 자동 설정이 되지않을때나 궁금할때는 디버그를 보면 확인할 수 있다.

- 기본 로그 레벨 INFO
  - 뒤에로깅수업때자세히살펴볼예정
- FailureAnalyzer
- 배너
  - banner.txt | gif | jpg | png
  - classpath 또는 spring.banner.location
  - ${spring-boot.version} 등의 변수를 사용할 수 있음.
  - Banner 클래스 구현하고 SpringApplication.setBanner()로 설정 가능.
  ```java
  SpringApplication app = new SpringApplication(SpringinitApplication.class);
  app.setBanner((environment, sourceClass, out) -> {
    out.println("===========");
    out.println("Spring Boot");
    out.println("===========");
  });
  
  ```
  
- 배너끄는방법 
  - SpringApplicationBuilder로 빌더 패턴 사용 가능
  ```java
  new SprintApplicationBuilder()
      .sources(SpringinitApplication.class)
      .run(args);
  
  ```
