---
title: '[SpringBoot] 스프링부트 Couchbase Repository'
slug: 00-springboot-couchbase-issue
date: 2021-09-22
published: true
tags: ['Spring', 'SpringBoot', 'Couchbase', 'Repository', 'Backend']
series: false
cover_image: ./images/SpringLogo.png
canonical_url: false
description: 'Couchbase Repository 이슈와 해결'
---

# Springboot Couchbase Repository 이슈

회사에서 Spring 코드에서 Couchbase 관련 서비스를 개발하는 도중에 발생한 문제에 대해 정리합니다.

## 최초 개발 코드

다음은 예시 코드입니다.

- Java SDK version : 14
- `AccountDoc` 클래스

```java
@Document
@ToString
public class AccountDoc {

  @Id
  private String id;

  @Field
  @NotNull
  private String userId;

  @Field
  @NotNull
  private String userType;

  @Field
  @NotNull
  private String userName;
}
```

- `AccountRepository` 클래스

```java
@Repository
public interface AccountRepository extends CouchbaseRepository<AccountDoc, String> {
  AccountDoc findByUserId(String userId);
}
```

- `CouchbaseRepository` 코드

```java
public interface CouchbaseRepository<T, ID extends Serializable> extends CrudRepository<T, ID> {
  CouchbaseOperation getCouchbaseOperations();
}
```

최초 코드 구성시는 해당 document를 참고했습니다.

- [Spring Data Couchbase Reference Documentation](https://docs.spring.io/spring-data/couchbase/docs/current/reference/html/#reference)
- [Couchbase Server Quickstart - Java with Spring Data Couchbase](https://docs.couchbase.com/tutorials/quick-start/quickstart-java27-springdata32-intellij-firstquery-cb65.html#prerequisite-run-couchbase-server)

<br/>

## 문제점.

다음 코드에서 문제가 발생한 부분은 `AccountRepository`의 `findByUserId(String userId)` 코드였습니다.

- 원인은 직접 선언한 **메서드(파생 쿼리, Derived Query)** 을 인식하지 못하고 문제가 발생하는 문제였습니다.

<br/>

## 해결책.

해당 경우에서는 큰 요구사항이 필요하지 않았기 때문에 해당 파생 쿼리를 사용하지 않고 코드를 구성했습니다.

- `AccountRepository` 클래스

```java
@Repository
public interface AccountRepository extends CouchbaseRepository<AccountDoc, String> {

}
```

- `AccountService` 서비스 클래스

```java
private String id;
private AccountService accountService;

// ...

AccountDoc doc = accountService.findById(id);
// Service Logic ...
```

즉, 해당 경우에는 `CrudRepository` 인터페이스에서 제공되는 메소드만 지원이 가능했습니다.

```java
public interface CrudRepository<T, ID> extends Repository<T, ID> {
  <S extends T> S save(S entity);
  Optional<T> findById(ID primaryKey);
  Iterable<T> findAll();
  long count();
  void delete(T entity);
  boolean existsById(ID primaryKey);
  // ...
}
```

### 좀 더 자세하게 보기

- [쿼리 방법 정의](https://docs.spring.io/spring-data/couchbase/docs/current/reference/html/#repositories.query-methods.details)
- [Repository 인터페이스 정의](https://docs.spring.io/spring-data/couchbase/docs/current/reference/html/#repositories.definition)
- [Repository 인스턴스 생성](https://docs.spring.io/spring-data/couchbase/docs/current/reference/html/#repositories.create-instances)

---

**출처**

- [Spring Data Couchbase Reference Documentation](https://docs.spring.io/spring-data/couchbase/docs/current/reference/html/#reference)
- [Couchbase Server Quickstart - Java with Spring Data Couchbase](https://docs.couchbase.com/tutorials/quick-start/quickstart-java27-springdata32-intellij-firstquery-cb65.html#prerequisite-run-couchbase-server)
- [Spring Data Couchbase](https://spring.io/projects/spring-data-couchbase#overview)
- [Error during reconnect couchbase](https://forums.couchbase.com/t/error-during-reconnect-com-couchbase-client-deps-io-netty-channel-connecttimeoutexception-connect-callback-did-not-return-hit-safeguarding-timeout/23911)
