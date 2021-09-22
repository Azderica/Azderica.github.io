---
title: '[Spring] Spring Data JPA와 QueryDSL'
slug: 01-spring-jpa
date: 2021-09-23
published: true
tags: ['Spring', 'SpringBoot', 'JPA', 'Spring Data', 'QueryDSL', 'Backend']
series: true
cover_image: ./images/SpringLogo.png
canonical_url: false
description: 'Spring JAP와 QueryDSL에 대해 정리합니다.'
---

# Spring JPA와 QueryDSL에 대해

지난 시간에는 이번에 정리할 Spring JPA와 QueryDSL을 위해 ORM과 JPA에 대해 정리했습니다.

- [ORM](https://azderica.github.io/00-db-orm/)
- [JPA](https://azderica.github.io/00-java-jpa/)

오늘은 이를 바탕으로 Spring JPA을 더 자세하게 정리합니다.

## Spring Data JPA

- CRUD 문제를 인터페이스 선언만으로 작성합니다.
- 스프링 데이터 JPA가 구현 객체를 동적으로 생성해서 주입합니다.

```java
public class User {
  private Long id;
  private String username;
  // ....
}
```

### 스프링 JPA 적용 전

```java
// before JPA
public class UserRepository {
  public void save(User user){...}
  // ...

  public User findByUsername(String userName){...}
}
```

### 스프링 JPA 적용 후

- 스프링 데이터 JPA에서는 JpaRepository 인터페이스를 제공합니다.
- 인터페이스가 인터페이스를 상속받을 때는 extends를 사용합니다.

```java
// after JPA
public class UserRepository extends JpaRepository<User, Long> {
  public User findByUsername(String userName);
}
```

### 스프링 데이터 JPA 적용 후 클래스 다이어그램

![image](https://user-images.githubusercontent.com/42582516/134428743-a9727ffa-3cf1-47ad-bc6d-55e42338ca1d.png)

<br/>

## QueryDSL
