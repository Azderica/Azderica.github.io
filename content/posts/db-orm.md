---
title: '[DB] ORM에 대해 정리하기'
slug: 00-db-orm
date: 2021-04-03
published: true
tags: ['Orm', 'Database', 'Hibernate']
series: false
cover_image: ./images/OrmText.png
canonical_url: false
description: 'ORM에 대해 정리합니다. '
---

# ORM에 대해

지난 게시글에서는 jpa에 대해서 정리하면서 ORM에 대한 개념을 언급했는데 오늘은 ORM에 대한 상세 내용을 정리합니다.

- [JPA 정리글](https://azderica.github.io/00-java-jpa/)

<br/>

## 영속성(Persistence)

먼저 ORM에 들어가기전에 영속성에 대한 개념을 정리합니다.

영속성은 다음을 의미합니다.

- 데이터를 생성한 프로그램이 종료되더라도 사라지지 않는 데이터 특성
- 영속성이 없는 데이터는 단지 메모리에서만 존재하므로, 프로그램 종료 시 모두 잃어버립니다.
- **Object Persistence(영구적인 객체)**

  - 메모리 상의 데이터를 File이나 DB를 활용해서 영속성을 부여합니다.

자바에서 데이터를 저장하는 방법은 다음과 같습니다.

- JDBC
- Spring JDBC
- **Persistence Framework**(Hibernate, Mybatis...)

> Persistence Framework

Persistence Layer

- 데이터베이스에서 데이터를 읽어(Read) 객체화하거나, 데이터 베이스에 데이터를 저장(Create), 수정(Update), 삭제(Delete)하는 역할

**Persistence Framework**

- JDBC 프로그래밍의 복잡함이나 번거로움 없이 간단한 작업만으로 데이터베이스와연동되는 시스템을 빠르게 개발할 수 있습니다.
- 일반적으로 SQL Mapper와 ORM으로 나눠집니다.

  - `SQL Mapper`

    - SQL <-> SQL Mapper <-> Object 필드
    - SQL 문장으로 직접 데이터베이스 데이터를 다룬다.
    - SQL을 직접 작성합니다.
    - **Mybatis, JdbcTemplates(Spring)**

  - `ORM`

    - Database data <-> ORM <-> Object 필드
    - 객체를 통해서 간접적으로 데이터베이스 데이터를 다룹니다.
    - 객체와 관계형 데이터베이스의 데이터를 자동으로 맵핑시켜줍니다.
    - **JPA, Hibernate** 등이 있습니다.

<br/>

## ORM의 정의

ORM(Object-relational mapping)은 **객체(클래스)와 관계(RDB, Relational Database)와의 설정**을 의미합니다.

객체 지향 프로그래밍은 클래스를 사용하고 관계형 데이터 베이스는 테이블을 사용합니다. 여기서 객체 모델과 관계형 모델간에 불일치가 발생하게 되는데, ORM은 이러한 **불일치를 객체간의 관계를 바탕으로 SQL을 자동으로 생성하여 불일치를 해결**합니다.

![ORM](https://user-images.githubusercontent.com/42582516/111995242-0ca00d80-8b5c-11eb-9662-7f60f1dfc0c7.png)

해당 그림처럼, Object와 DB 데이터 사이에서 매핑을 합니다.

<br/>

## ORM의 장단점

### ORM 장점

- 객체 지향적 코드를 사용함으로서 직관적이보 비지니스 로직에 집중할 수 있도록 도와줍니다.

  - CRUD를 위한 SQL문을 작성할 필요는 없습니다. (쿼리 작성은 필요)
  - 각 객체(Model) 별로 코드를 작성하므로 가독성이 높아집니다.

- 재사용 및 유지 보수의 편리성이 증가합니다.

  - ORM은 독립적으로 작성이 되어 있고 해당 객체들은 재사용이 가능합니다.

- DBMS에 대한 종속성이 줄어듭니다.

  - 대부분의 ORM은 DB에 비종속적입니다.

### ORM 단점

- 완벽한 ORM만으로는 구현하기가 어렵습니다.

  - 사용하기는 편하지만 설계는 신중해야합니다.
  - 프로젝트의 복잡성이 높아질 경우, 난이도가 높아집니다.
  - 잘못 구현하는 경우 속도 저하 및 심한 경우, 일관성이 무너질 수도 있습니다.

- 프로시저가 많은 시스템에서는 ORM의 객체 지향적인 장점을 활용하기가 어렵습니다.

<br/>

## ORM의 종류

앞서 이야기한 것외에도 다양한 ORM이 존재합니다.

- Flask : SQLAlchemy
- Django : 내장 ORM
- **Node.js : Sequalize**
- **Java : Hybernate, JPA**
- GraphQL : Prisma

해당 ORM에 대해서는 직접 사용해보면서 차이를 느껴보고 개념을 이해하는 것을 추천합니다. (개인적으로 사용해본 것은 Sequalize와 Hybernate, JPA이지만, 실무에서는 따로 환경이 안나와서 써보지 못했습니다...)

<br/>

## 마무리.

핵심적인 내용은 정리르 했으나, 개인적으로 알고 싶은 내용인 queryDsl과 Jooq에 대해서는 따로 정리를 하지 못했습니다. 해당 글은 좀 더 개념을 잡아 정리하겠습니다.

---

**출처**

- [ORM이란?](https://velog.io/@alskt0419/ORM%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C...-iek4f0o3fg)
- [ORM](https://changrea.io/jpa/orm/)
- [ORM에 대해서](https://velog.io/@alskt0419/ORM%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C...-iek4f0o3fg)
- [DB, ORM이란](https://gmlwjd9405.github.io/2019/02/01/orm.html)
