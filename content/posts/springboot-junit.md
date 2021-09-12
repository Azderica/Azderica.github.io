---
title: '[SpringBoot] SpringBoot JUnit4를 JUnit5으로 바꾸기'
slug: 00-springboot-junit
date: 2021-08-11
published: true
tags: ['Spring', 'SpringBoot', 'Test', 'JUnit', 'JUnit4', 'JUnit5', 'Rule']
series: true
cover_image: ./images/SpringLogo.png
canonical_url: false
description: ' SpringBoot JUnit에 대해 좀 더 정리하고, JUnit4에서 JUnit5으로 수정하는 방법에 대해 서술합니다.'
---

# SpringBoot JUnit4를 JUnit5으로 바꾸기.

기존에 JUnit에 대해 글을 작성을 했는데, 해당 글은 JUnit4 기준으로 작성을 했었고 현재는 대부분의 테스트 코드를 JUnit5를 쓰는 것이 좋습니다.

이에 따라 어떤식으로 테스트를 고치는 지에 대해 작성합니다.

## JUnit5 특징

`JUnit5 = JUnit Platform + JUnit Jupiter + JUnit Vintage`

![JUnit](https://user-images.githubusercontent.com/42582516/129037234-991b10d3-9fdd-4205-b2e0-824abcdcb2b8.png)

기존 JUnit4는 단일 jar이였으나 JUnit5는 JUnit Platform, JUnit Jupiter, JUnit Vintage 모듈 세가지로 구성됩니다.

### JUnit Platform

- JVM에서 동작하는 테스트 프레임워크입니다.
- 테스트를 발견하고 계획을 생성하고 결과를 보고하는 TestEngine 인터페이스를 정의합니다.

### JUnit Jupiter

- JUnit5 TestEngine의 실제 구현체입니다.
- JUnit5 기반의 테스트를 실행시키기 위한 TestEngine을 Platform에 제공합니다.

### JUnit Vintage

- TestEngine에서 JUnit3, JUnit4 기반 테스트를 실행하기 위한 기능을 제공합니다.
- **아래에서는 이를 줄이는 방법으로 서술합니다.**

<br/>

## JUnit5 변경시, 어노테이션 변경

대표적인 예시로 JUnit4에서 자주 쓰는 어노테이션을 아래에 예시로 둡니다. (개인적으로 많이 쓰는 내용)

### `@Test` -> `@Test`

- 해당 어노테이션을 달아둔 메서드가 테스트 메서드임을 나타냅니다.
- 어노테이션의 이름은 변경되지 않았으나 경로가 변경되었습니다.
  - JUnit4 : `org.junit.Test`
  - JUnit5 : `org.junit.jupiter.api.Test`

### `@Before` -> `@BeforeEach`

- 각각의 `@Test`, `@RepeatTest`, `@ParameterizedTest`,`@TestFactory` 전에 실행됩니다.

### `@After` -> `@AfterEach`

- 각각의 `@Test`, `@RepeatTest`, `@ParameterizedTest`, `@TestFactory` 후에 실행됩니다.

### `@BeforeClass` -> `@BeforeAll`

- 모든 `@Test`, `@RepeatTest`, `@ParameterizedTest`,`@TestFactory` 전에 실행됩니다.
- 해당 어노테이션을 사용하기 위해서는 라이프사이클을 꼭 설정해주어야합니다.
  - `@TestInstance(LifeCycle.PER_CLASS)`
  - `@TestInstance(LifeCycle.PER_METHOD)`

### `@AfterClass` -> `@AfterAll`

- 모든 `@Test`, `@RepeatTest`, `@ParameterizedTest`,`@TestFactory` 후에 실행됩니다.
- 해당 어노테이션을 사용하기 위해서는 라이프사이클을 꼭 설정해주어야합니다.
  - `@TestInstance(LifeCycle.PER_CLASS)`
  - `@TestInstance(LifeCycle.PER_METHOD)`

### `@RunWith` -> `@ExtendWith`

- 확정을 선언적으로 등록하는데 사용합니다. ExtendWith 뒤에 확장할 Extension을 추가해서 사용합니다.

대표적으로 다음과 같이 코드를 구성할 수 있습니다.

```java
// before
@RunWith(MockitoJUnitRunner.class)
public class ServiceTest() {
}

// after
@ExtendWith(MockitoExtension.class)
public class ServiceTest() {
}
```

### `@Ignore` -> `@Disabled`

- 테스트 클래스 또는 테스트 메서드를 비활성화 하는데 사용합니다.
- 특히, **JUnit4와 JUnit5를 혼용해서 사용하면 적용이 안됩니다.**
  - `org.junit.Test` 와 `@Disabled`를 쓰거나 혹은 `org.junit.jupiter.api.Test`와 `@Ignore`을 같이 사용하면 안됩니다.

### x -> `@DisplayName`

- 테스트 클래스 또는 테스트 메서드에 대한 사용자 지정 표시 이름을 정해줄 때 씁니다.

```java

public class ServiceTest() {

  @Test
  @DisplayName("이 테스트는 이제 제겁니다.")
  public class testService() {
    ...
  }
}
```

다음과 같이 코드를 구성하고 테스트를 돌리면 DisplayName으로 테스트가 돌아간게 보이게 됩니다.

<br/>

## Rule의 삭제와 그에 따른 JUnit5

사실 오늘의 핵심 중 하나로, JUnit4 테스트를 JUnit5로 고치다보면 앞에 있던 부분은 쉽게 고칠 수 있으나 `@Rule`이라는 어노테이션이 없어져서 고민인 경우가 있습니다. `@ExtendWith`으로 수정이 되었으나, 아마 체감이 되는 이야기가 아닐 것이라 이를 어떻게 수정하면 좋을 지 공유합니다.

해당 코드는 일부 각색한 코드입니다.

```java
@RunWith(MockitoJUnitRunner.class)
public void UtilsTest {

  @Rule
  public ExpectedException expectedException = ExpectedException.none();

  @Mock
  private Utils utils;

  @Before
  public void setup() {
    given(...).willReturn(...)

    utils = new Utils();
  }

  @Test
  public void 정상적테스트() {
    // given
    String parameter = "normal"

    // when
    Result result = utils.getResult(parameter);

    // then
    assertThat(result.isSuccess()).isTrue();
  }


  @Test
  public void 실패한테스트() {
    expectedException.expect(DomainException.class)
    expectedException.expectMessage("실패한 파라미터 값입니다.")

    // given
    String parameter = "fail"

    // when
    Result result = utils.getResult(parameter);
  }
}
```

다음의 코드를 JUnit5로 수정하면 다음과 같이 고칠 수 있습니다.

```java
@ExtendWith(MockitoExtension.class)
public void UtilsTest {

  @Mock
  private Utils utils;

  @Before
  public void setup() {
    given(...).willReturn(...)

    utils = new Utils();
  }

  @Test
  @DisplayName("정상적 테스트")
  public void isNormalResult() {
    // given
    String parameter = "normal"

    // when
    Result result = utils.getResult(parameter);

    // then
    assertThat(result.isSuccess()).isTrue();
  }


  @Test
  @DisplayName("실패한 테스트")
  public void isFailResult() {
    Throwable e = null;
    try {
      // given
      String parameter = "fail"

      // when
      Result result = utils.getResult(parameter);
    } catch (Throwable ex) {
      e = ex;
    }

    assertThat(e instanceof DomainException).isTrue();
    assertThat(e.getMessage()).isEqualTo("실패한 파라미터 값입니다.");
  }
}
```

다음과 같이 `@Rule` 을 제거하고 JUnit5로 수정할 수 있습니다.

<br/>

## 마무리

해당 코드는 제가 임의로 작성한 부분이고, 좀 더 좋은 방법이 있을 수 있습니다. 참고 정도로만 하시면 좋을 것 같습니다. 잘못된 부분이 있으면 커멘트 주세요.

- [JUnit5 테스트코드 작성하기](https://hirlawldo.tistory.com/39)
- [JUnit5 (JUnit4와 비교)](https://jade314.tistory.com/entry/Junit-5)
- [How to replace rule annotation in junit 5](https://stackoverflow.com/questions/51012335/how-to-replace-rule-annotation-in-junit-5)
