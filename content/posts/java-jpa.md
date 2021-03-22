---
title: '[Java] JPA에 대해 정리하기'
slug: 00-java-jpa
date: 2021-03-22
published: true
tags: ['Spring', 'JPA', 'ORM', 'DB', 'Hibernate']
series: false,
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

<br/>

## JPA를 사용해야하는 이유?

<br/>

## JPA 사용 방법

---

- [Spring Data JPA Doc](https://spring.io/projects/spring-data-jpa)
- [JPA 기본 개념](https://tinkerbellbass.tistory.com/24)
- [JPA 기본 개념 2](https://doublesprogramming.tistory.com/257)
- [JPA란 무엇인가](https://blog.woniper.net/255)
- [JPA 코드 없이 적는 기본 개념](http://okminseok.blogspot.com/2019/09/jpa.html)
- [ORM의 장단점](https://geonlee.tistory.com/207)
- [JPA란](https://gmlwjd9405.github.io/2019/08/04/what-is-jpa.html)
