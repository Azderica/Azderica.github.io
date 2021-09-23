---
title: '[Spring] Spring Data JPA와 QueryDSL'
slug: 01-spring-jpa
date: 2021-09-23
published: false
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
public interface UserRepository extends JpaRepository<User, Long> {
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

### 쿼리 메서드

- 메서드 이름으로 쿼리를 생성합니다. `@Query` 어노테이션으로 쿼리를 직접 정의할 수도 있습니다.
- 메서드 이름만으로 JPQL 쿼리를 생성합니다.
- 선언된 메서드에 대해서는 로딩 시점에 쿼리를 만들기 때문에 에러를 미리 잡을 수 있습니다.

### 예시

```java
public class User {
  private Long id;
  private int age;
  private String name;
}
```

- 이름으로 검색

```java
public interface UserRepository extends JpaRepository<User, Long> {
  public List<User> findByName(String name);
}

List<User> userResult = userRepository.findByName('hello');
```

```sql
# 실행된 SQL
SELECT * FROM MEMBER M WHERE M.NAME = 'hello'
```

- 이름으로 검색 및 정렬

```java
public interface UserRepository extends JpaRepository<User, Long> {
  public List<User> findByName(String name, Sort sort);
}

// ...
// sort is order by age.
List<User> userResult = userRepository.findByName('hello', sort);
```

```sql
# 실행된 SQL
SELECT * FROM MEMBER M WHERE M.NAME = 'hello' ORDER BY AGE DESC
```

- 이름으로 검색, 정렬, 페이징

```java
public interface UserRepository extends JpaRepository<User, Long> {
  public List<User> findByName(String name, Pageable pageable);
}

Pageable page = new PageRequest(1, 10, new Sort...);
List<User> userResult = userRepository.findByName('hello', page);
```

```sql
# 실행된 SQL
SELECT *
FROM
    ( SELECT ROW_.*, ROWNUM ROWNUM_
      FROM
          ( SELECT M.*
            FROM MEMBER M WHERE M.NAME = 'hello'
            OEDER BY M.NAME
          ) ROW_
     WHERE ROWNUM <= ?
    )
WHERE ROWNUM_>?
```

### `@Query`, JPQL 정의

- `@Query` 어노테이션을 사용해서 직접 JPQL을 지정할 수 있습니다.
- 이도 로딩 시점에 파싱을 함으로 런타임 에러를 내지 않을 수 있습니다.

```java
public interface UserRepository extends JpaRepository<User, Long> {
  @Query("select u from User u where m.name = ?1")
  List<User> findByName(String name, Pageable pageable);
}
```

### Web 페이징과 정렬 기능

- 컨트롤러에서 페이징 처리 객체를 바로 인젝션 받을 수도 있습니다.

| parameter | description                    |
| --------- | ------------------------------ |
| page      | 현재 페이지                    |
| size      | 한 페이지에 노출할 데이터 건수 |
| sort      | 정렬 조건                      |

- ex) `/user?page=0&size=20&sort=name,dsec`

```java
@RequestMapping(value = "/users", method = RequestMethod.GET)
List<User> list(Pageable pageable, User user){}
```

<br/>

## QueryDSL

- SQL, JPQL을 코드로 작성할 수 있도록 도와주는 빌더 API
- JPA에 비해 편리하고 실용적입니다.
- 오픈소스입니다.

### SQL, JPQL의 문제점

- SQL, JPQL은 문자열입니다.
- 컴파일 시점에 알 수 있는 방법이 없습니다. (로딩 시점에 알 수 있습니다.)
- 해당 로직 실행전까지 작동여부 확인을 할 수 없습니다.
- 해당 쿼리 실행 시점에 오류를 발견합니다.

### QueryDSL 장점

- 문자가 아닌 코드로 작성합니다.
- 컴파일 시점에 문법 오류를 발견합니다.
- 코드 자동완성이 가능합니다. (IDE 도움)
- 단순하고 쉽습니다.
- **동적 쿼리**입니다.

### QueryDSL, 예시

#### 동작원리 커리타입 생성

- `@Entity`를 통해서 `QMember`라는 `QueryDSL` 전용 객체를 만듭니다.
- `Entity Manager`를 `JPAQueryFactory`에 넣고, `QMberber` 객체를 가지고 쿼리를 코드로 구성가능합니다.

```sql
# JPQL
select m from Member m where m.age > 18
```

```java
JPAFactoryQuery query = new JPAQueryFactory(em);
QMember m = QMember.member;

List<Member> list = query.selectFrom(m)
    .where(m.age.gt(18))
    .orderBy(m.name.desc())
    .fetch();
```

#### join

```java
JPAFactoryQuery query = new JPAQueryFactory(em);
QMember m = QMember.member
QTeam t = QTeam.team

List<Member> list = query.selectFrom(m)
    .join(m.team, t)
    .where(t.name.eq("teamA"))
    .fetch();
```

#### 페이징 API

```java
JPAFactoryQuery query = new JPAQueryFactory(em);
QMember m = QMember.member

List<Member> list = query.selectFrom(m)
    .where(m.age.gt(18))
    .orderBy(m.name.desc())
    .limit(10)
    .offset(10)
    .fetch();
```

#### 동적 쿼리

- QueryDSL을 쓰는 진짜 이유
- JPQL은 정적 쿼리이고, 문자열을 더해주는것이 헬입니다.
- QueryDSL은 코드를 더하는 것이기에 수월하게 처리가 가능합니다.
- `BooleanBuilder`에 조건을 넣고 쿼리를 실행시키면 된다.
- 원하는 필드만 뽑아서 DTO로 뽑아내는 기능도 QueryDSL이 다 지원합니다.

```java
String name = "member";
int age = 9;

QMember m = QMember.member;

BooleanBuilder builder = new BooleanBuilder();
if(name != null) {
  builder.and(m.name.contains(name));
}
if(age != 0) {
  builder.and(m.age.gt(age));
}

List<Member> list = query.selectFrom(m)
    .where(builder)
    .fetch();
```

#### 자바

- 객체지향적인 관점에서 가장 중요합니다.
- 제약조건을 조립할 수 있습니다.

```java
// 쿠폰의 상태와 마케팅 뷰 카운트를 체크하는 서비스의 경우
return query.selectFrom(coupon)
    .where(
      coupon.type.eq(typeParam),
      coupon.status.wq("LIVE"),
      marketing.viewCount.lt(markting.maxCount)
    )
    .fetch();
```

```java
// 아래 코드처럼 재조립이 가능합니다.
return query.selectFrom(coupon)
    .where(
      coupon.type.eq(typeParma),
      isServiceable()
    )
    .fetch();

private BooleanExpression isServiceable(){
  return coupon.status.wq("LIVE")
    .and(marketing.viewCount.lt(markting.maxCount));
}
```
