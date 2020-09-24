---
layout: post
title: "[Springboot API] Springboot REST API : REST API 보안 적용"
subtitle: "Springboot REST API : REST API 보안 적용"
categories: backend
tags: spring springboot api rest backend
comments: true

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

```java
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


<br/>

## 스프링 시큐리티 기본 설정

### 시큐리티 필터를 적용하기 않음...
- /docs/index.html

### 로그인 없이 접근 가능
- GET /api/events
- GET /api/events/{id}

### 로그인 해야 접근 가능
- 나머지 다...
- POST /api/events
- PUT /api/events/{id{
- ...

### 스프링 시큐리티 OAuth 2.0
- AuthorizationServer: OAuth2 토큰 발행(/oauth/token) 및 토큰 인증(/oauth/authorize)
  - Oder 0 (리소스 서버 보다 우선 순위가 높다.)
- ResourceServer: 리소스 요청 인증 처리 (OAuth 2 토큰 검사)
  - Oder 3 (이 값은 현재 고칠 수 없음)

### 스프링 시큐리티 설정
- @EnableWebSecurity
- @EnableGlobalMethodSecurity
- extends WebSecurityConfigurerAdapter
- PasswordEncoder: PasswordEncoderFactories.createDelegatingPassworkEncoder()
- TokenStore: InMemoryTokenStore
- AuthenticationManagerBean
- configure(AuthenticationManagerBuidler auth)
  - userDetailsService
  - passwordEncoder
- configure(HttpSecurity http)
  - /docs/**: permitAll
- configure(WebSecurty web)
  - ignore
    - /docs/**
    - /favicon.ico
- PathRequest.toStaticResources() 사용하기

<br/>

## 스프링 시큐리티 폼 인증 설정

```java
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .anonymous()
                .and()
            .formLogin()
                .and()
            .authorizeRequests()
                .mvcMatchers(HttpMethod.GET, "/api/**").authenticated()
                .anyRequest().authenticated();
    }

```

- 익명 사용자 사용 활성화
- 폼 인증 방식 활성화
  - 스프링 시큐리티가 기본 로그인 페이지 제공
- 요청에 인증 적용
  - /api 이하 모든 GET 요청에 인증이 필요함. (permitAll()을 사용하여 인증이 필요없이 익명으로 접근이 가능케 할 수 있음)
  - 그밖에 모은 요청도 인증이 필요함.

<br/>

## 스프링 시큐리티 OAuth 2 설정 : 인증 서버 설정

```xml
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-test</artifactId>
            <version>${spring-security.version}</version>
            <scope>test</scope>
        </dependency>
```

### 토큰 발행 테스트
- User
- Client
- POST /oauth/token
  - HTTP Basic 인증 헤더 (클라이언트 아이디 + 클라이언트 시크릿)
  - 요청 매개변수 (MultiValuMap<String, String>)
    - grant_type: password
    - username
    - password
  - 응답에 access_token 나오는지 확인

### Grant Type: Password
- Granty Type: 토큰 받아오는 방법
- 서비스 오너가 만든 클라이언트에서 사용하는 Grant Type
- https://developer.okta.com/blog/2018/06/29/what-is-the-oauth2-password-grant

### AuthorizationServer 설정
- @EnableAuthorizationServer
- extends AuthorizationServerConfigurerAdapter
- configure(AuthorizationServerSecurityConfigurer security)
  - PassswordEncode 설정
- configure(ClientDetailsServiceConfigurer clients)
  - 클라이언트 설정
  - grantTypes
    - password
    - refresh_token
  - scopes
  - secret / name
  - accessTokenValiditySeconds
  - refreshTokenValiditySeconds
- AuthorizationServerEndpointsConfigurer
  - tokenStore
  - authenticationMaanger
  - userDetailsService

<br/>

## 스프링 시큐리티 OAuth 2 설정: 리소스 서버 설정

### 테스트 수정
- GET을 제외하고 모두 엑세스 토큰을 가지고 요청 하도록 테스트 수정

### ResourceServer 설정
- @EnableResourceServer
- extends ResourceServerConfigurerAdapter
- configure(ResourceServerSecurityConfigurer resources)
  - 리소스 ID
- configure(HttpSecurity http)
  - anonymous
  - GET /api/** : permit all
  - POST /api/**: authenticated
  - PUT /api/**: authenticated
  - 에러 처리
    - accessDeniedHandler(OAuth2AccessDeniedHandler())

<br/>

## 문자열을 외부 설정으로 빼내기

### 기본 유저 만들기
- ApplicationRunner
  - Admin
  - User

### 외부 설정으로 기본 유저와 클라이언트 정보 빼내기
- @ConfigurationProperties
