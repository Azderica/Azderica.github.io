---
layout: post
title: "[Springboot] Springboot 테스트 코드 작성하기"
subtitle: "Springboot test code"
categories: backend
tags: spring springboot backend test testcode
comments: true

---

# Springboot 테스트 코드

대학교 시절, 프론트 위주 개발을 하다가 스프링 개발을 하다보니 가장 어려웠던 점은 테스트 코드를 작성하는 부분이였다.

테스트 코드를 작성할 때, 여러 어노테이션이 등장하고 이 부분에 대한 개념도 없다는 것을 느끼고 있다. (다음 게시물은 아마 스프링 어노테이션에 대해서 작성할 예정이다.)

간략하게라도 글을 통해 정리하고, 이후 점차 추가해가는 방향으로 진행해야겠다.


## JUnit

### Junit의 특징.

- JUnit은 자바용 단위 테스트 작성을 위한 표준 프레임워크다.
- xUnit이라는 단위 테스트 프레임워크의 자바 구현물이다.
- 테스트 도구이며 외부 테스트 프로그램을 작성해 할 필요 없이 이를 관리해줄 수 있따.
- 하나의 jar파일로 되어 있으며 사용법 또한 간단하다
- 테스트 결과를 확인하는 것 뿐만 아니라 최적화된 코드를 유추하는 기능도 있어서 성능향상을 기대할 수 있따.
- Test 클래스를 통해 다른 개발자에게 테스트 방법과 클래스 히스토리를 알려줄 수 있다.

### JUnit에서 테스트를 지원하는 어노테이션(Annotation)

- `@Test`
  - @Test 가 선언된 메서드는 테스트를 수행하는 메소드가 된다.
  - JUnit은 각각의 테스트가 서로 영향을 주지 않고, 독립적으로 실행됨을 원칙으로 하며, @Test마다 객체를 생성한다.
- `@Ignore`
  - @Ignore가 선언된 메서드는 테스트를 실행하지 않는다.
- `@Before`
  - @Before가 선언된 메서드는 @Test 메서드가 실행되기 전에 반드시 실행된다.
  - @Test메서드에서 공통으로 사용하는 코드를 @Before 메서드에 선언하여 사용하면 된다.
- `@After`
  - @After가 선언된 메서드는 @Test 메서드가 실행된 후 실행된다.
- `@BeforeClass`
  - @BeforeClass 어노테이션은 @Test 메서드보다 먼저 한번만 수행되어야 할 경우에 사용된다.
- `@AfterClass`
  - @AfterClass 어노테이션은 @Test 메서드보다 나중에 한번만 수행되어야 할 경우에 사용된다.

> JUnit4와 Junit5는 테스트 어노테이션이 서로 다르다.

> : 해당글 참고 예정 : https://pureainu.tistory.com/190

### 자주 사용하는 JUnit 메서드

| 메서드 | 기능 |
|-------------------|------|
| **assertEquals(a,b)** | 객체 a, b의 값이 일치하는 지 확인 |
| assertArrayEquals(a,b) | 배열 a, b의 값이 일치하는 지 확인|
| assertSame(a,b) | 객체 a, b가 같은 객체인지를 확인 <br/> 두 객체의 레퍼런스가 동일한지 확인|
| assertTrue(a) | 조건 a가 참인가를 확인 |
| **assertNotNull(a)** | 객체 a가 null이 아님을 확인 |

### Springt-Test 어노테이션

(이후 정리 예정)

- @RunWith(SpringJUnit4ClassRunner.class)

- @ContextConfiguration

- @Autowired

- @SpringBootTest

- @WebMvcTest

- @DataJpaTest

- @RestClientTest

- @Json Test



---
**출처**
- https://donghun.dev/Spring-Boot-Test-Keywrod-one
- https://epthffh.tistory.com/entry/Junit을-이용한-단위테스트
- https://shlee0882.tistory.com/202
- https://pureainu.tistory.com/190