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