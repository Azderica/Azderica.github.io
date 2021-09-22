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

- 기본적으로 CRUD를 구현하지 않아도 되며, 인터페이스를 호출해서 쓸 수 있습니다.
- 스프링 로딩 시점에 UserRepository의 구현체를 만듭니다.

### 공통 인터페이스

![image](https://user-images.githubusercontent.com/42582516/134432747-fdf6a1a2-ab04-4190-971e-25dfee64a4d4.png)

- JpaRepository 인터페이스는 공통 CRUD을 제공합니다.
- 제네릭은 <Entity, 식별자>로 설정합니다.
- 스프링에 스프링 데이터 프로젝트와 스프링 데이터 JPA 프로젝트가 따로 존재합니다.
- 스프링 데이터에서 공통적인 기능을 가지고 있고, JPA 기능은 스프링 데이터 JPA 프로젝트에서 가지고 있습니다.

<br/>

## QueryDSL
