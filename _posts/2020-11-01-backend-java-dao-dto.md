---
layout: post
title: "[Java] DAO, DTO, Repository, Entity을 이해하자"
subtitle: "dao, dto, repository, entity 이해하기"
categories: backend
tags: java backend dao dto repository entity
comments: true

---

# DAO, DTO, Repository, Entity Class를 이해하기

일반적으로 스프링 프로젝트 파일에 이름을 정할때, DTO, Repository, Entity 등의 이름이 들어가는 것을 알 수 있는데, 좀 더 자세하게 이 정의에 대해서 알고 싶어졌다.

스프링을 사용한 웹앱의 경우 DAO, DTO, Repository, Entity를 사용하여 데이터를 다루며 스프링부트의 경우 내장 톰캣을 통해 서블릿을 관리하고 이를 컨트롤러에서 각 어노테이션을 통해 매핑한다.

![image](https://user-images.githubusercontent.com/42582516/97795536-b5e87480-1c4a-11eb-9439-89d9558150da.png)


## Repository
- MVC 패턴에서 모델에 해당하는 부분으로 POJO로는 접근불가능하다.
- Persistence Layer와 1:1 매칭이 가능하다.
- Java Persistenc API 구현체를 통해서 자바 객체에 접근할 수 있다.

```java
@Repository
@RequiredArgsConstructor
public class MemberRepository {

  private final EntityManager em;

  public void save(Member member) {
    em.persist(member);
  }
}

```

해당 코드는 JPA 구현체가 Entity Model 객체를 사용해서 DB에 접근한다.


> POJO란.
> - 간단하게 설명하자면, "getter / setter를 가진 단순한 자바 오프젝트"이며 의존성이 없고, 테스트도 용이하며 추후 수정이 편리한 오프젝트라고 설명할 수 있을 것 같다/
> - 좀 더 자세하게 설명하면 더 복잡해서 POJO에 대한 글은 다음에 따로 정리하겠다.

## DAO(Data Access Object)

- 실제로 DB에 접근하는 객체이다.
  - Persistence Layer(DB에 data를 CRUD하는 계층)이다.
- Service와 DB를 연결하는 역할을 한다.
- SQL를 사용(개발자가 직접 코딩)하여 DB에 접근한 후 적절한 CRUD API를 제공한다.
  - JPA 대부분의 기본적인 CRUD method를 제공하고 있다.
  - `extends JpaRepository<User, Long>`
- 예시(JPA 사용 시)
  - 
  ```java
  public interface QuestionRepository extends CrudRepository<Question, Long> {}
  ```


## DTO



## Entity


---

**출처**
- https://gmlwjd9405.github.io/2018/12/25/difference-dao-dto-entity.html
