---
layout: post
title: "Springboot API - REST API 보안 적용"
date: 2020-09-21 06:10:00 -0500


---



# REST API 보안 적용

<br/>

## Account 도메인 추가

### OAuth2로 인증을 하려면 일단 Account 부터
- id
- email
- password
- roels

### AccountRoles
- ADMIN, USER

### JPA 맵핑
- @Table(“Users”)

### JPA enumeration collection mapping

```java
    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private Set<AccountRole> roles;
```

### Event에 owner 추가

```
    @ManyToOne
    Account manager;
```

<br/>

## 스프링 시큐리티

### 스프링 시큐리티
- 웹 시큐리티 (Filter 기반 시큐리티)
- 메소드 시큐리티 
- 이 둘 다 Security Interceptor를 사용합니다.
  - 리소스에 접근을 허용할 것이냐 말것이냐를 결정하는 로직이 들어있음.

![image](https://user-images.githubusercontent.com/42582516/93766241-19958000-fc51-11ea-82da-7b4f7b41a230.png)


### 의존성 추가
```xml
        <dependency>
            <groupId>org.springframework.security.oauth.boot</groupId>
            <artifactId>spring-security-oauth2-autoconfigure</artifactId>
            <version>2.1.0.RELEASE</version>
        </dependency>
```
- 테스트 다 깨짐 (401 Unauthorized)
  - 깨지는 이유는 스프링 부트가 제공하는 스프링 시큐리티 기본 설정 때문.

<br/>

## 예외 테스트

1. @Test(expected)

예외 타입만 확인 가능

2. try-catch

예외 타입과 메시지 확인 가능.
하지만 코드가 다소 복잡.

3. @Rule ExpectedException

코드는 간결하면서 예외 타입과 메시지 모두 확인 가능

