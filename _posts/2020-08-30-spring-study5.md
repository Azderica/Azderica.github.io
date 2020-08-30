---
layout: post
title: "Springboot 활용하기3"
date: 2020-08-30 07:30:00 -0500


---

# Springboot 활용하기3

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
- spring.datasource.tomcat.*
- spring.datasource.dbcp2.*

#### MySQL 커넥터 의존성 추가

```java
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

MySQL 5.* 최신 버전 사용할 때

| 문제 | Sat Jul 21 11:17:59 PDT 2018 WARN: Establishing SSL connection without server's identity verification is not recommended. **According to MySQL 5.5.45+, 5.6.26+ and 5.7.6+ requirements SSL connection must be established by default if explicit option isn't set.** For compliance with existing applications not using SSL the **verifyServerCertificate property is set to 'false'**. You need either to explicitly disable SSL by setting **useSSL=false**, or set **useSSL=true and provide truststore** for server certificate verification. |
| ---- | ------------------------------------------------------------ |
| 해결 | jdbc:mysql:/localhost:3306/springboot?**useSSL=false**       |

MySQL 8.* 최신 버전 사용할 때

| 문제 | com.mysql.jdbc.exceptions.jdbc4.MySQLNonTransientConnectionException: Public Key Retrieval is not allowed |
| ---- | ------------------------------------------------------------ |
| 해결 | jdbc:mysql:/localhost:3306/springboot?useSSL=false&**allowPublicKeyRetrieval=true** |

MySQL 라이센스 (GPL) 주의

- MySQL 대신 MariaDB 사용 검토
- 소스 코드 공개 의무 여부 확인
