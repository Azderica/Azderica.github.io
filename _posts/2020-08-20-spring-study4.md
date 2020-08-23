---
layout: post
title: "Springboot 활용하기2"
date: 2020-08-20 07:30:00 -0500


---

# Springboot 활용하기2

## 스프링 웹 MVC 

### 소개

스프링 웹 MVC
- https://docs.spring.io/spring/docs/5.0.7.RELEASE/spring-framework-reference/web.html#spring-web
스프링 부트 MVC
- 자동 설정으로 제공하는 여러 기본 기능 (앞으로 살펴볼 예정)
스프링 MVC 확장
- @Configuration + WebMvcConfigurer
스프링 MVC 재정의
- @Configuration + @EnableWebMvc

### HttpMessageConverters

https://docs.spring.io/spring/docs/5.0.7.RELEASE/spring-framework-reference/web.html#mvc-config-message-converters HTTP 요청 본문을 객체로 변경하거나, 객체를 HTTP 응답 본문으로 변경할 때 사용 {“username”:”keesun”, “password”:”123”} <-> User
- @ReuqestBody
- @ResponseBody

### ViewResolve 

스프링 부트
- 뷰 리졸버 설정 제공
- HttpMessageConvertersAutoConfiguration

XML 메시지 컨버터 추가하기

```java
<dependency>
   <groupId>com.fasterxml.jackson.dataformat</groupId>
   <artifactId>jackson-dataformat-xml</artifactId>
   <version>2.9.6</version>
</dependency>
```

### 정적 리소스 지원

정적 리소스 맵핑 “ /**”

- 기본 리소스 위치
  - classpath:/static
  - classpath:/public
  - classpath:/resources/
  - classpath:/META-INF/resources
  - 예) “/hello.html” => /static/hello.html
  - spring.mvc.static-path-pattern: 맵핑 설정 변경 가능
  - spring.mvc.static-locations: 리소스 찾을 위치 변경 가능
- Last-Modified 헤더를 보고 304 응답을 보냄.
- ResourceHttpRequestHandler가 처리함.
  - WebMvcConfigurer의 addRersourceHandlers로 커스터마이징 할 수 있음

```java
@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
  registry.addResourceHandler("/m/**")
    .addResourceLocations("classpath:/m/")
    .setCachePeriod(20);
```
