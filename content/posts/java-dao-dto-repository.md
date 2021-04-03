---
title: '[Java] DAO, DTO, Repository을 이해하자'
slug: 00-java-repositorys
date: 2020-11-01
published: true
tags: ['Java', 'DAO', 'DTO', 'Repository', 'Spring', 'Backend']
series: false
cover_image: ./images/JavaLogo.jpg
canonical_url: false
description: ' dao, dto, repository에 대한 기본적인 내용을 정리합니다. '
---

# DAO, DTO, Repository, Entity Class를 이해하기

일반적으로 스프링 프로젝트 파일에 이름을 정할때, DTO, Repository, Entity 등의 이름이 들어가는 것을 알 수 있는데, 좀 더 자세하게 이 정의에 대해서 알고 싶어졌다.

스프링을 사용한 웹앱의 경우 DAO, DTO, Repository, Entity를 사용하여 데이터를 다루며 스프링부트의 경우 내장 톰캣을 통해 서블릿을 관리하고 이를 컨트롤러에서 각 어노테이션을 통해 매핑한다.

![image](https://user-images.githubusercontent.com/42582516/97795536-b5e87480-1c4a-11eb-9439-89d9558150da.png)

<br/>

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
>
> - 간단하게 설명하자면, "getter / setter를 가진 단순한 자바 오프젝트"이며 의존성이 없고, 테스트도 용이하며 추후 수정이 편리한 오프젝트라고 설명할 수 있을 것 같다/
> - 좀 더 자세하게 설명하면 더 복잡해서 POJO에 대한 글은 다음에 따로 정리하겠다.

<br/>

## DAO(Data Access Object)

- 원래 DB의 데이터(필드)와 프로그래밍 언어는 패러다임의 불일치로 인해 사용할 수 없다. 이를 원래 사용할려면 별도의 SQL을 작성해서 SQL을 객체의 필드에 하나씩 매핑하거나 순수한 SQL을 작성하여 사용해야 한다.

### Entity

- 하지만 별도의 Entity Class를 사용해서 클래스를 테이블과 1:1 매칭할 수 있다. 이러한 Entity Class를 **도메인**이라고 하며 가장 DB와 가까운 클래스이다.

```java
@Entity
@Getter
public class Member {
    @Id @GeneratedValue
    @Column(name = "member_id")
    private Long id; // PK

    @NotEmpty
    @NotNull
    private String name;

    @Embedded // 내장 타입 임베딩
    private Address address;

    @JsonIgnore
    @OneToMany (mappedBy = "member")
    private List<Order> orders = new ArrayList<>();
}
```

다음은 예시 코드이다.

- Entity의 각 필드는 DB 테이블과 1:1매칭되며 PK를 가진다.
- Entity는 순수한 도메인 로직과 비지니스 로직만 가지고 있어야한다.
- Entity는 DB의 데이터를 전달해주고 Service에서 사용할 비즈니스 로직만을 가져야한다.

```java
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
```

다음 코드는 서비스 계층의 Repository를 사용한 코드이다.

<br/>

## DTO(Data Transfer Object)

- Entity를 통해 DB에서 데이터를 꺼내왔지만 데이터를 접근해야하는 경우 문제가 있다.
- Controller와 Presentation Layer는 클라이언트와 직접 만나며, Entity는 프레젠테이션 계층과 완전히 분리되어야 한다.
- 이러한 경우에 DTO를 사용한다.

```java
@Data
@AllArgsConstructor
static class MemberDto {
  private String name;
  private Address address;
}
```

이러한 경우 다음과 같이 DTO를 사용한다.

특징은 다음과 같다.

- Getter/Setter가 없다.
- Wrapping 된 순수한 데이터 객체
- Entity에 직접 접근하지 않으므로, Entity 변경시, DTO만 변경하면 된다.

<br/>

## 결론.

정리하자면 스프링 프로젝트는 다음과 같은 구조를 가진다.

![image](https://user-images.githubusercontent.com/42582516/97795536-b5e87480-1c4a-11eb-9439-89d9558150da.png)

구성은 다음 4개와 같다.

### Domain(Entity)

-

```java
@Entity
@Getter @Setter
public class Member {
    @Id @GeneratedValue
    @Column(name = "member_id")
    private Long id;

```

- DB 테이블과 1:1 매칭된다.

### Repository(DAO)

```java
@Repository
@RequiredArgsConstructor
public class MemberRepository{

    private final EntityManager em;
```

- Entity를 통해 데이터를 DB에 저장된다.
- 엔티티는 DB의 데이터와 매칭되는 것
- 실제 DB에 데이터를 저장하는 건 Repository 클래스의 Entity Manager를 통해 이루어진다

### Service

```java
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
```

- 프레젠테이션(뷰)에서 엔티티에 직접 접근하지않고 비즈니스 로직을 처리할 수 있도록하는 계층이다.
- Repository에 정의된 비즈니스 로직을 처리하거나 엔티티에 접근한다.

### Controller

```java
@RestController // Response + Request
@RequiredArgsConstructor
public class MemberApiController {
    private final MemberService memberService;

    @GetMapping("api/v1/members")
    public Result<List<MemberDto>> memberV2() {
```

- 프레젠테이션 계층으로 클라이언트의 요청을 처리한다.
- 엔티티는 서비스에 의해 추상화되어 직접 접근 불가능하다.
- 서비스에 정의된 비즈니스 로직을 호출한다.
- ResponseBody에 데이터를 담아 반환해준다

---

**출처**

- https://gmlwjd9405.github.io/2018/12/25/difference-dao-dto-entity.html
- https://velog.io/@agugu95/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%8C%A8%ED%84%B4%EA%B3%BC-DAO-DTO-Repository
- https://shinsunyoung.tistory.com/42
