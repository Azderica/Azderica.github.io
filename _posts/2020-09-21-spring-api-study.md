---
layout: post
title: "Springboot API - REST API 보안 적용"
date: 2020-09-21 06:10:00 -0500


---



# REST API 보안 적용

<br/>

## Account 도메인 추가

### OAuth2로 인증을 하려면 일단 Account 부터
- id
- email
- password
- roels

### AccountRoles
- ADMIN, USER

### JPA 맵핑
- @Table(“Users”)

### JPA enumeration collection mapping

```java
    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private Set<AccountRole> roles;
```

### Event에 owner 추가

```
    @ManyToOne
    Account manager;
```

