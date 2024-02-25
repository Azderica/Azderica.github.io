---
title: '[Test] Mock 테스트와 Stub 테스트 차이'
slug: 00-test-mock-and-stub
date: 2022-02-27
published: true
tags: ['SpringBoot', 'Test', 'Mock', 'Stub', 'Spy', 'Backend']
series: false
cover_image: ./images/SpringLogo.png
canonical_url: false
description: 'Mock 테스트와 Stub 테스트, Spy 테스트 차이를 서술합니다.'
---

# Mock 테스트, Stub 테스트

최근 Mock 테스트와 Stub 테스트 차이에 대해 질문을 받았는데 부끄럽지만 차이를 몰라 이에 대해서 정리합니다.

## 개념에 대해

[원문 참고](https://martinfowler.com/articles/mocksArentStubs.html)

- `Dummy` 객체는 전달되지만 사용되지 않고 일반적으로 매개변수 목록을 채우는 목적으로만 사용됩니다.
- `Fake` 객체는 실제로 작동하는 구현을 가지고 있지만 일반적으로 프로덕션에 적합하지 않는 몇가지 지름길을 사용합니다.
  - 대표적인 예시로 메모리 데이터베이스가 있습니다.
- `Stub`은 테스트 중에 만들어진 호출에 미리 준비된 답변을 제공하며 일반적으로 테스트를 위해 프로그래밍된 것 외에는 전혀 응답하지 않습니다.
- `Spy`는 어떻게 호출받았는지에 따라 일부 정보를 기록하는 Stub 입니다.
  - 예시로 전송된 메시지 수를 기록하는 이메일 서비스 일 수 있습니다.
- `Mock` 은 예상되는 기대값으로 미리 프로그래밍 객체입니다.

무슨 말인지 와닿지 않아 이에 대해 조금 더 찾아봤습니다.

### 테스트 대역(Test Double)

- 위의 개념에 대해 이해하기전 우선 테스트 대역(Test Double) 이라는 개념을 이해해야 합니다.

![테스트 대역](https://user-images.githubusercontent.com/42582516/155876237-36a220bd-8e0f-4f1c-b0be-6a4a012fb3d2.png)

- 테스트 대역이란 테스트하려는 객체가 다른 객체들이 여러 관계가 엮여있어 사용하기 힘들 때, **대체할 수 있는 객체를 의미**합니다.
- 테스트 대역은 Dummy, Stub, Spy, Mock, Fake로 나눠집니다. (이에 대한 설명이 위에 있습니다.)

<br/>

## Mock과 Stub을 좀 더 자세히.

일반적으로 많이 사용하는 두 개념에 대해서 정리를 하면 다음과 같습니다.

> Test의 원칙에 따르면 하나의 테스트에는 여러 개의 스텁이 있을 수 있지만 일반적으로 모의는 하나만 있습니다.

### Stub

- 인스턴스화하여 구현한 가짜 객체(Dummy, 기능 구현이 없음)을 이용해 실제로 동작하는 것처럼 보이게 만드는 객체입니다.
- 해당 인터페이스나 클래스를 최소한으로 구현합니다.
- 테스트에서 호출된 요청에 대해 미리 준비해둔답변을 응답합니다.
- 테스트시에 프로그래밍된 것 외에는 응답하지 않습니다.
- 협력 객체의 특정 부분이 테스트가 어려운 경우, stub을 사용하여 수월하게 테스트할 수 있습니다.

#### Stub's Lifecycle

- Setup, 테스트 준비
- Exercise, 테스트
- Verify state, 상태 검증
- Teardown, 리소스 정리

### Mock

- 호출에 대한 기대를 명세하고, 내용에 따라 동작하도록 프로그래밍 된 객체입니다.
- 테스트 작성을 위한 환경 구축이 어려울 때, 테스트하고자 하는 코드와 엮인 객ㅊ들을 대신하기 위해 만들어진 객체입니다.
- 행위 검증을 진행합니다.

#### Mock's Lifecycle

- Setup data, 데이터 준비
- Setup expectations, 예상되는 결과 준비
- Exercise, 테스트
- Verify expectations, 예상 검증
- Verify state, 상태 검증
- Teardown, 리소스 정리

### Stub과 Mock의 차이

- **stub**을 포함한 다른 대역들은 **상태 검증(state verification)** 을 사용하고 **Mock** 오브젝트는 **행위 검증(behavior verification)** 을 사용합니다.
  - `상태 검증`이란 메소드가 수행된 후, 객체의 상태를 확인하여 올바르게 동작했는지를 확인하는 검증법입니다.
  - `행위 검증`이란 메소드의 리턴 값으로 판단할 수 없는 경우, 특정 동작을 수행하는지 확인하는 검증법입니다.
- 검증의 대상이 다르다는 것이 중요한 체크 요소입니다.

#### 상태 검증 예시.

```java
StateClass stateClass = new StateClass();
stateClass.doSomething();

assertThat(stateClass.getStatus()).isEqualTo(true);
```

#### 행위 검증 예시

```java
BehaviorClass behaviorClass = new BehaviorClass();

verify(behaviorClass).doBehavior();
```

<br/>

## 조금 더 상세한 예제

### Stub 예제

- 사용하기 쉬우며 추가 종속성이 없습니다.

```java
public class SimpleService implements Service {

  private Collaborator collaborator;
  public void setCollaborator(Collaborator collaborator) {
    this.collaborator = collaborator;
  }

  // part of Service interface
  public boolean isActive() {
    return collaborator.isActive();
  }
}
```

```java

public void testActiveWhenCollaboratorIsActive() throws Exception {

  service.setCollaborator(new Collaborator() {
    public boolean isActive() {
      return true;
    }
  });
  assertTrue(service.isActive());
}
```

### Mock 예제

- 아래는 EasyMock 코드 예시

```java
Collaborator collaborator = EasyMock.createMock(Collaborator.class);
EasyMock.expect(collaborator.isActive()).andReturn(true);
EasyMock.replay(collaborator);

service.setCollaborator(collaborator);
assertTrue(service.isActive());

EasyMock.verify(collaborator);
```

## 언제 Stub, Mock 을 사용하나요?

- 기본적으로 적합하다고 판단될 때 선택해야 합니다.
- 행위 검증(Mock)의 경우, `특정 메서드의 호출` 등을 검증하기 때문에 구현에 의존적입니다.
- 상태 검증(Stub)의 경우, 상태를 노출하는 메서드가 많이 추가될 수 있습니다.
- 많은 경우 상태 검증이 좋은 경우가 많습니다.
- 그러나 상태 검증이 어려운 경우가 있어서 이때는 행위 검증 혹은 전체 테스트를 진행하는 것도 좋은 방법이 됩니다.

## 마무리.

다음 공부할 내용은 아래와 같습니다.

- Spock
- TDD

---

**출처**

- [Mocks Aren't Stub 원문](https://martinfowler.com/articles/mocksArentStubs.html)
- [Mocks Aren't Stub! Mock과 Stub에 대해서](https://ducktyping.tistory.com/17)
- [테스트 스텁과 목 오브젝트의 차이점](https://github.com/team-tancheon/book-lounge/issues/16)
- [상태검증과-행위검증-stub과-mock-차이](https://joont92.github.io/tdd/%EC%83%81%ED%83%9C%EA%B2%80%EC%A6%9D%EA%B3%BC-%ED%96%89%EC%9C%84%EA%B2%80%EC%A6%9D-stub%EA%B3%BC-mock-%EC%B0%A8%EC%9D%B4/)
- [Unit Testing with Stubs and Mocks](https://spring.io/blog/2007/01/15/unit-testing-with-stubs-and-mocks)
- [whats-the-difference-between-a-mock-stub](https://stackoverflow.com/questions/3459287/whats-the-difference-between-a-mock-stub)
