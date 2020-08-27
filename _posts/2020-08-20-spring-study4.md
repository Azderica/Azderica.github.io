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

### 웹 JAR

웹JAR 맵핑 “ /webjars/**”

- 버전 생략하고 사용하려면
  - webjars-locator-core 의존성 추가
  
```java
<script src="/webjars/jquery/dist/jquery.min.js"></script>
<script>
   $(function() {
       console.log("ready!");
   });
</script>
```

### index 페이지와 파비콘

웰컴 페이지
- index.html 찾아 보고 있으면 제공.
- index.템플릿 찾아 보고 있으면 제공.
- 둘 다 없으면 에러 페이지.

파비콘
- favicon.ico
- 파이콘 만들기 https://favicon.io/
- 파비콘이 안 바뀔 때?
  - https://stackoverflow.com/questions/2208933/how-do-i-force-a-favicon-refresh

### Thymeleaf

스프링 부트가 자동 설정을 지원하는 템플릿 엔진
- FreeMarker
- Groovy
- Thymeleaf
- Mustache

**JSP를 권장하지 않는 이유**
- JAR 패키징 할 때는 동작하지 않고, WAR 패키징 해야 함.
- Undertow는 JSP를 지원하지 않음.
- https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-jsp-limitations


Thymeleaf 사용하기
- https://www.thymeleaf.org/
- https://www.thymeleaf.org/doc/articles/standarddialect5minutes.html
- 의존성 추가: spring-boot-starter-thymeleaf
- 템플릿 파일 위치: /src/main/resources/template/
- 예제: https://github.com/thymeleaf/thymeleafexamples-stsm/blob/3.0-master/src/main/webapp/WEB-INF/templates/seedstartermng.html

### HtmlUnit

HTML 템플릿 뷰 테스트를 보다 전문적으로 하자.
- http://htmlunit.sourceforge.net/
- http://htmlunit.sourceforge.net/gettingStarted.html
  - 코드를 가져올 수 있고 폼을 받아올 수 있고, 브라우저인척도 되고, 비교할 수 있음
  - 다양한 예시가 있음.
- 의존성 추가

```java
<dependency>
   <groupId>org.seleniumhq.selenium</groupId>
   <artifactId>htmlunit-driver</artifactId>
   <scope>test</scope>
</dependency>
<dependency>
   <groupId>net.sourceforge.htmlunit</groupId>
   <artifactId>htmlunit</artifactId>
   <scope>test</scope>
</dependency>
```

   - 단. 해당 코드로는 안되서 dependency 버전을 새로 선언해주었다.
```java
<dependency>
   <groupId>org.seleniumhq.selenium</groupId>
   <artifactId>htmlunit-driver</artifactId>
   <scope>2.52.0</scope>
</dependency>
<dependency>
   <groupId>net.sourceforge.htmlunit</groupId>
   <artifactId>htmlunit</artifactId>
   <version>2.43.0</version>
</dependency>
```

- @Autowire WebClient

### ExceptionHandler

스프링 @MVC 예외 처리 방법
- @ControllerAdvice
- @ExceptionHandler
```bash
curl http://localhost:8080/

```

스프링 부트가 제공하는 기본 예외 처리기
- BasicErrorController
  - HTML과 JSON 응답 지원
- 커스터마이징 방법
  - ErrorController 구현

커스텀 에러 페이지
- 상태 코드 값에 따라 에러 페이지 보여주기
- src/main/resources/static|template/error/
- 404.html
- 5xx.html
- ErrorViewResolver 구현
