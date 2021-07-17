---
title: '[SpringBoot] SpringBoot 활용하기 - 3'
slug: 03-springboot-utilizing
date: 2020-08-30
published: true
tags: ['Spring', 'SpringBoot', 'Backend', 'SpringStarter']
series: true
cover_image: ./images/SpringLogo.png
canonical_url: false
description: " 'SpringBoot 활용하기'의 세번째 게시글입니다. "
---

# Springboot 활용하기3

<br/>

## 스프링 데이터

### 소개

| **SQL DB**                              | **NoSQL**                            |
| --------------------------------------- | ------------------------------------ |
| - 인메모리 데이터베이스 지원            | - Redis (Key/Value)                  |
| - DataSource 설정                       | - MongoDB (Document)                 |
| - DBCP 설정                             | - Neo4J (Graph)                      |
| - JDBC 사용하기                         | - Gemfire (IMDG)                     |
| - 스프링 데이터 JPA 사용하기            | - Solr (Search)                      |
| - jOOQ 사용하기                         | - Elasticsearch (Search & Analytics) |
| - 데이터베이스 초기화                   | - Cassandra                          |
| - 데이터베이스 마이그레이션 툴 연동하기 | - CouchbaseLDAP                      |
|                                         | - InfluxDB                           |

### 인메모리 데이터베이스

지원하는 인-메모리 데이터베이스

- **H2 (추천, 콘솔 때문에...)**
- HSQL
- Derby

Spring-JDBC가 클래스패스에 있으면 자동 설정이 필요한 빈을 설정 해줍니다.

- - DataSource
  - JdbcTemplate

인-메모리 데이터베이스 기본 연결 정보 확인하는 방법

- URL: “testdb”
- username: “sa”
- password: “”

H2 콘솔 사용하는 방법

- spring-boot-devtools를 추가하거나...
- spring.h2.console.enabled=true 만 추가.
- /h2-console로 접속 (이 path도 바꿀 수 있음)

실습 코드

- CREATE TABLE USER (ID INTEGER NOT NULL, name VARCHAR(255), PRIMARY KEY (id))
- INSERT INTO USER VALUES (1, ‘keesun’)

### MySQL

#### 지원하는 DBCP

1. [HikariCP](https://github.com/brettwooldridge/HikariCP) (기본)
   1. https://github.com/brettwooldridge/HikariCP#frequently-used
2. [Tomcat CP](https://tomcat.apache.org/tomcat-7.0-doc/jdbc-pool.html)
3. [Commons DBCP2](https://commons.apache.org/proper/commons-dbcp/)

#### DBCP 설정

- **spring.datasource.hikari.\***
- spring.datasource.tomcat.\*
- spring.datasource.dbcp2.\*

#### MySQL 커넥터 의존성 추가

```xml
<dependency>
   <groupId>mysql</groupId>
   <artifactId>mysql-connector-java</artifactId>
</dependency>
```

#### MySQL 추가 (도커 사용)

- docker run -p 3306:3306 --name **mysql_boot** -e MYSQL_ROOT_PASSWORD=**1** -e MYSQL_DATABASE=**springboot** -e MYSQL_USER=**keesun** -e MYSQL_PASSWORD=**pass** -d mysql
- docker exec -i -t mysql_boot bash
- mysql -u root -p

#### MySQL용 Datasource 설정

- spring.datasource.url=jdbc:mysql://localhost:3306/springboot?useSSL=false
- spring.datasource.username=keesun
- spring.datasource.password=pass

#### MySQL 접속시 에러

MySQL 5.\* 최신 버전 사용할 때

| 문제 | Sat Jul 21 11:17:59 PDT 2018 WARN: Establishing SSL connection without server's identity verification is not recommended. **According to MySQL 5.5.45+, 5.6.26+ and 5.7.6+ requirements SSL connection must be established by default if explicit option isn't set.** For compliance with existing applications not using SSL the **verifyServerCertificate property is set to 'false'**. You need either to explicitly disable SSL by setting **useSSL=false**, or set **useSSL=true and provide truststore** for server certificate verification. |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 해결 | jdbc:mysql:/localhost:3306/springboot?**useSSL=false**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

MySQL 8.\* 최신 버전 사용할 때

| 문제 | com.mysql.jdbc.exceptions.jdbc4.MySQLNonTransientConnectionException: Public Key Retrieval is not allowed |
| ---- | --------------------------------------------------------------------------------------------------------- |
| 해결 | jdbc:mysql:/localhost:3306/springboot?useSSL=false&**allowPublicKeyRetrieval=true**                       |

MySQL 라이센스 (GPL) 주의

- MySQL 대신 MariaDB 사용 검토
- 소스 코드 공개 의무 여부 확인

### PostgreSQL

#### 의존성 추가

```xml
<dependency>
   <groupId>org.postgresql</groupId>
   <artifactId>postgresql</artifactId>
</dependency>
```

#### PostgreSQL 설치 및 서버 실행 (docker)

```bash
docker run -p 5432:5432 -e POSTGRES_PASSWORD=pass -e POSTGRES_USER=keesun -e POSTGRES_DB=springboot --name postgres_boot -d postgres

docker exec -i -t postgres_boot bash

su - postgres

psql springboot

데이터베이스 조회
\list

테이블 조회
\dt

쿼리
SELECT * FROM account;
```

#### PostgreSQL 경고 메시지

경고 : `org.postgresql.jdbc.PgConnection.createClob() is not yet implemented` 해결 : `spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true`

### Spring-Data-JPA 소개

#### ORM(Object-Relational Mapping)과 JPA(Java Persistence API)

- ORM: 객체와 릴레이션을 맵핑할 때 발생하는 개념적 불일치를 해결하는 프레임워크
- http://hibernate.org/orm/what-is-an-orm/
- JPA: ORM을 위한 자바 (EE) 표현

스프링 데이터 JPA

- Repository 빈 자동 생성
- 쿼리 메소드 자동 구현
- @EnableJpaRepositories(스프링 부트가 자동으로 설정 해줌.)
- SDJ -> JPA -> Hibernate -> Datasource

### Spring-Data-JPA 연동

스프링 데이터 JPA 의존성 추가

```xml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

스프링 데이터 JPA 사용하기

- @Entity 클래스 만들기
- Repository 만들기

스프링 데이터 리파지토리 테스트 만들기

- H2 DB를 테스트 의존성에 추가하기
- @DataJpaTest (슬라이스 테스트) 작성

### 데이터베이스 초기화

JPA를 사용한 데이터베이스 초기화

- spring.jpa.hibernate.ddl-auto
- spring.jpa.generate-dll=true로 설정 해줘야 동작함.

SQL 스크립트를 사용한 데이터베이스 초기화

- schema.sql 또는 schema-\${platform}.sql
- data.sql 또는 data-\${platform}.sql
- \${platform} 값은 spring.datasource.platform 으로 설정 가능.

### 데이터베이스 마이그레이션

> Flyway와 Liquibase가 대표적인데, 지금은 Flyway를 사용하겠습니다.

https://docs.spring.io/spring-boot/docs/2.0.3.RELEASE/reference/htmlsingle/#howto-execute-flyway-database-migrations-on-startup

의존성 추가

- org.flywaydb:flyway-core

```xml
<dependency>
   <groupId>org.flywaydb</groupId>
   <artifactId>flyway-core</artifactId>
</dependency>

```

마이그레이션 디렉토리

- db/migration 또는 db/migration/{vendor}
- spring.flyway.locations로 변경 가능

마이그레이션 파일 이름

- V숫자\_\_이름.sql
- V는 꼭 대문자로.
- 숫자는 순차적으로 (타임스탬프 권장)
- 숫자와 이름 사이에 언더바 두 개.
- 이름은 가능한 서술적으로.

### Redis

캐시, 메시지 브로커, 키/밸류 스토어 등으로 사용 가능.

- 의존성 추가
  - spring-boot-starter-data-redis
- Redis 설치 및 실행 (도커)
  - docker run -p 6379:6379 --name redis_boot -d redis
    - 6379는 기본설정이라, 따로 설정안해도 잘돌아간다.
  - docker exec -i -t redis_boot redis-cli
- 스프링 데이터 Redis
  - https://projects.spring.io/spring-data-redis/
  - StringRedisTemplate 또는 RedisTemplate
  - extends CrudRepository(JPA 레퍼지토리 처럼 사용)
- Redis 주요 커맨드
  - https://redis.io/commands
  - keys \*
  - get {key}
  - hgetall {key}
  - hget {key} {column}
- 커스터마이징

  - spring.redis.\*

### MongoDB

MongoDB는 JSON 기반의 도큐먼트 데이터베이스입니다.

- 의존성 추가
  - spring-boot-starter-data-mongodb
- MongoDB 설치 및 실행 (도커)
  - docker run -p 27017:27017 --name mongo_boot -d mongo
  - docker exec -i -t mongo_boot bash
  - mongo
- 스프링 데이터 몽고DB
  - MongoTemplate
  - MongoRepository
  - 내장형 MongoDB (테스트용)
    - de.flapdoodle.embed:de.flapdoodle.embed.mongo
  - @DataMongoTest

### Neo4j

Neo4j는 노드간의 연관 관계를 영속화하는데 유리한 그래프 데이터베이스 입니다.

- 의존성 추가
  - spring-boot-starter-data-neo4j

```xml
<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
```

- Neo4j 설치 및 실행 (도커)
  - docker run -p 7474:7474 -p 7687:7687 -d --name noe4j_boot neo4j
  - http://localhost:7474/browser
- 스프링 데이터 Neo4J
  - Neo4jTemplate (Deprecated)
  - SessionFactory
  - Neo4jRepository
- 에러 발생하는 데, 참고할 링크 : https://www.inflearn.com/questions/6023

### 정리

https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#boot-features-sql
