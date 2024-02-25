---
title: '[DB] 객체지향 쿼리, JPQL'
slug: 00-jpa-jpql
date: 2021-07-15
published: true
tags: ['JPA', 'QUERY', 'JPQL', 'Spring']
series: false
cover_image: ./images/JpqlText.png
canonical_url: false
description: 'JPQL의 기본 개념에 대해 정리합니다.'
---

# JPQL(Java Persistence Query Language)

## JPQL란?

- 테이블이 아닌 엔티티 객체를 대상으로 검색하는 객체지향 쿼리입니다.
- SQL을 추상화해서 특정 데이터베이스 SQL에 의존하지 않습니다.
- JPA는 JPQL을 분석한 후 적절한 SQL을 만들어 데이터베이스를 조회합니다.
- 방언(Dialect)만 변경하면 JPQL을 수정하지 않고 자연스럽게 DB를 변경합니다.
- 엔티티 객체를 중심으로 개발합니다.

<br/>

## JPQL 사용법

다음과 같이 사용합니다.

```java
String jpql= "select m From Member m where m.name like '%hello%'";

List<Member> result = em.createQuery(jpql, Member.class).getResultList();
```

해당 코드를 보면 다음을 알 수 있습니다.

- 테이블이 아닌 객체를 대상으로 검색하는 객체지향 쿼리로 이해하면 됩니다.
- SQL을 추상화하해서 특정 데이터베이스 SQL에 의존하지 않습니다.
- JPQL을 한마디로 정의하면 객체 지향 SQL입니다.

### 예시 문법

```sql
select _
from _
[where _]
[groupby _]
[having _]
[orderby _]
```

### 신경쓸 요소

- `from`에는 객체가 들어갑니다.
- 엔티티와 속성은 대문자를 구분합니다.
- JPQL 키워드는 대소문자를 구분하지 않습니다.
- 엔티티 이름을 사용하며 테이블 이름이 아닙니다.
- 별칭은 필수 입니다.

### 결과 조회 API

- `query.getResultList()` : 결과가 하나 이상인 경우, 리스트를 반환합니다.
- `query.getSingleResult()` : 결과가 정확히 하나, 단일 객체를 반환합니다. (하나가 아니면 예외가 발생합니다.)

---

**출처**

- [JPA, JPQL Query 정리](https://data-make.tistory.com/614)
- [JPA, 객체지향 쿼리, JPQL](https://ict-nroo.tistory.com/116)
- [Spring JPA, JPQL](https://victorydntmd.tistory.com/205)
