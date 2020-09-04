---
layout: post
title: "Springboot 활용하기4"
date: 2020-09-04 07:30:00 -0500


---

# Springboot 활용하기4

## 스프링 시큐리티

### Starter-Security

#### 스프링 시큐리티

Tip)
```java
@Override
    public void addViewControllers(ViewControllerRegistry registry){
        // 기능없이 뷰로만 보내면, 이렇게 하면된다.
        registry.addViewController("/hello").setViewName("hello");
    }
```

- 웹 시큐리티
- 메소드 시큐리티
- 다양한 인증 방법 지원
  - LDAP, 폼 인증, Basic 인증, OAuth, ...

#### 스프링 부트 시큐리티 자동 설정

- SecurityAutoConfiguration
- UserDetailsServiceAutoConfiguration
- spring-boot-starter-security
  - 스프링 시큐리티 5.* 의존성 추가
- 모든 요청에 인증이 필요함.
- 기본 사용자 생성
  - Username: user
  - Password: 애플리케이션을 실행할 때 마다 랜덤 값 생성 (콘솔에 출력 됨.)
  - spring.security.user.name
  - spring.security.user.password
- 인증 관련 각종 이벤트 발생
  - DefaultAuthenticationEventPublisher 빈 등록
  - 다양한 인증 에러 핸들러 등록 가능

#### 스프링 부트 시큐리티 테스트

- https://docs.spring.io/spring-security/site/docs/current/reference/html/test-method.html

### 시큐리티 설정 커스터마이징

#### 웹 시큐리티 설정
```java
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
   @Override
   protected void configure(HttpSecurity http) throws Exception {
       http.authorizeRequests()
               .antMatchers("/", "/hello").permitAll()
               .anyRequest().authenticated()
               .and()
           .formLogin()
               .and()
           .httpBasic();
   }
}
```

UserDetailsServie 구현
- https://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#jc-authentication-userdetailsservice


PasswordEncoder 설정 및 사용
- https://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#core-services-password-encoding
