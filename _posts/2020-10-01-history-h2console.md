---
layout: post
title: "[Springboot H2] H2 Console 접속 에러"
subtitle: "H2 Console 접속 에러"
categories: history
tags: history springboot h2 h2console mem:testdb
comments: true

---

# H2 Console 접속 에러

## 문제점.

h2 console 접속시 관련 문제.

링크 http://localhost:8080/h2-console/



## h2-console 404 not found

### 원인

- properties 설정에 h2-console 사용 여부를 설정하지 않는 경우


### 해결책

- `application.properties` 에 아래와 같이 작성

```xml
spring.h2.console.enable = true
```

## Database "mem:testdb" not found

### 원인

- properties 설정에 datasource url을 설정하지 않았을 때 발생하는 에러

### 해결책

- `application.properties` 에 아래와 같이 작성

```xml
spring.datasource.url=jdbc:h2:mem:testdb
```

