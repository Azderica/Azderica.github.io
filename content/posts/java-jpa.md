---
title: '[Java] JPA에 대해 정리하기'
slug: 00-java-jpa
date: 2021-03-22
published: true
tags: ['Spring', 'JPA', 'ORM', 'DB', 'Hibernate']
series: false
cover_image: ./images/JpaText.png
canonical_url: false
description: 'JPA에 대해 정리합니다. '
---

# JPA

오늘은 앞으로 공부할 QueryDsl, Jooq 등의 개념을 공부하기 위해서 앞서 가장 기본적인 내용을 정리합니다.

## JPA 개념

JPA는 **Java Persistence API** 의 약자로서, RDBMS와 OOP 객체 사이의 불일치에서 오는 패러다임을 해결하기 위해서 만들어졌습니다. 이러한 JPA는 ORM(Object-Relational Mapping) 기술입니다.

### ORM?

ORM이란 Object Relational Mapping, 객체-관계 매핑의 줄임말입니다.

좀 더 풀어 설명하자면 OOP의 객체 구현 클래스와 RDBMS에서 사용하는 테이블을 자동으로 매핑하는 것을 의미합니다. 이 때, 클래스와 테이블은 서로 기존부터 호환 가능성을 두고 만들어진 것이 아니므로 불일치가 발생하는데 이를 ORM을 통해서 객체 간의 관계를 바탕으로 SQL문을 자동으로 생성하여 불일치를 해결합니다. 이 방법을 통해서 SQL문을 짤 필요없이 객체를 통해 간접적으로 데이터베이스를 조작할 수 있습니다.

이를 이미지로 나타내면 다음과 같습니다.

![image](https://user-images.githubusercontent.com/42582516/111995242-0ca00d80-8b5c-11eb-9662-7f60f1dfc0c7.png)

좀 더 자세한 ORM은 다른 글에서 따로 정리하겠습니다.

### 그래서 JPA를 좀 더 설명하자면.

앞서 이야기 나온 ORM 기술을 구현하기 위해 나온 프레임워크가 Hibernate이고, 그 외에도 다른 프레임워크(CoCobase, TopLink) 등이 등장했습니다. 이러한 ORM 구현 프레임워크에 대한 **표준화**가 필요하게 되었는데 이가 바로 JPA입니다.

JPA는 어플리케이션과 DBMS 사이의 인터페이스 역할을 해주기 때문에. 개발자는 JPA 인터페이스에 맞춰우 구현되어 있는 기능을 사용하면 됩니다.

이를 잘 표현한 이미지는 다음과 같습니다.

![image](https://user-images.githubusercontent.com/42582516/111996259-2b52d400-8b5d-11eb-8fdb-1f6a91096d4c.png)

다음과 같이, 개발자는 SQL를 직접 사용할 필요없이 사용할 수 있습니다.

<br/>

## JPA 동작 과정

JPA는 다음과 같이 동작합니다.

![image](https://user-images.githubusercontent.com/42582516/112302631-a394d300-8cde-11eb-8c1e-3693ae32a978.png)

JPA는 애플리케이션과 JDBC 사이에서 동작합니다.

- 개발자가 JPA 사용시, JPA 내부에서 JDBC API를 사용하여 SQL을 호출하고 DB와 통신합니다.

<br/>

## JPA를 사용해야하는 이유?

### 1. SQL 중심 개발 -> 객체 중심 개발

SQL 중심의 개발 문제를 해결합니다.

SQL 중심의 개발 문제는 다음과 같습니다.

- 지루한 코드가 반복됩니다.
- 객체 지향과 RDB 간의 패러다임이 불일치됩니다.
- 객체 지향은 상속 관계를 지원합니다.
- 모델링 과정에서의 문제를 해결합니다.
- 객체 그래프 탐색에서의 문제를 해결합니다.
  - SQL 중심 개발은 객체 그래프를 탐색할 수 없습니다.

### 2. 생산성

- JPA을 사용함으로서 `java.collection`처럼 편하게 사용가능합니다.
- 간단한 CRUD를 제공합니다.
  - `jpa.persist`, `find`, `set~`, `jpa.remove`
- 수정이 간단합니다.

### 3. 유지보수

- 기존처럼 모든 SQL을 수정할 필요가 없습니다.
- JPA에서는 필드만 추가하고, SQL은 JPA가 처리합니다.

### 4. 패러다임 불일치의 해결

- 상속, 연관관계, 객체 그래프 탐색, 비교와 같은 패러다임의 불일치 문제를 해결해줍니다.

### 5. 성능적 이슈

- JPA는 애플리케이션과 데이터베이스 사이에서 다양한 성능 최적화 기능을 제공합니다.
- Ex. 동일 데이터 find로 2번 접근하는 경우, 재사용을 통해서 사용합니다.

### 6. 데이터 접근 추상화와 벤더 독립성

- 애플리케이션은 처음 선택한 데이터베이스 기술에 종속되고 다른 데이터베이스로 변경하기 어렵습니다.

<br/>

## JPA 사용 방법

다음과 같은 메소드 들이 있습니다.

- `flush()`

  - Persistence Context의 변경 내용을 데이터베이스에 반영합니다.
  - 일반적으로는 직접 사용하지는 않고, 자바 애플리케이션에서 커밋 명령이 들어왔을 때 자동으로 실행됩니다.

- `detach()`
  - 특정 Entity를 준영속 상태(영속 컨텍스트의 관리를 받지않음)로 바꿉니다.
- `clear()`
  - Persistence Context를 초기화합니다.
- `close()`
  - Persistence Context를 종료합니다.
- `merge()`
  - 준영속 상태의 엔티티 특징
- `find()`
  - 식별자 값을 통해 Entity를 찾습니다.
- `persist()`
  - 생성도니 Entity를 Persistence Context와 DB에 저장합니다.
- `remove()`
  - 식별자 값을 통해 Entity를 삭제합니다.

---

- [Spring Data JPA Doc](https://spring.io/projects/spring-data-jpa)
- [JPA 기본 개념](https://tinkerbellbass.tistory.com/24)
- [JPA 기본 개념 2](https://doublesprogramming.tistory.com/257)
- [JPA란 무엇인가](https://blog.woniper.net/255)
- [JPA 코드 없이 적는 기본 개념](http://okminseok.blogspot.com/2019/09/jpa.html)
- [ORM의 장단점](https://geonlee.tistory.com/207)
- [JPA란](https://gmlwjd9405.github.io/2019/08/04/what-is-jpa.html)
