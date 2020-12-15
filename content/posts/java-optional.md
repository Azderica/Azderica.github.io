---
title: "[Java] Java Optional"
slug: 00-java-optional
date: 2020-12-14
published: true
tags: ['Java', 'Optional', 'Backend']
series: false,
cover_image: ./images/JavaLogo.jpg
canonical_url: false
description: "Java Optional 대해 정리합니다."
---

# Java Optional

Java8에서 Optional이 적용이 되었으나 실질적으로 개발에서 잘 사용하지 못한다는 생각을 자주하였습니다. 오늘은 Optional을 공부해보면서 왜 이를 써야할까에 대해서 작성하겠습니다.

## Java Optional이란?

`Java Optional`이란 "**존재할 수도 있지만 안 할수도 있는 객체**"입니다. 이를 좀더 풀어 설명한다면 null이 될 수도 있는 객체를 감싸고 있는 일종의 `Wrapper` 클래스입니다. 따라서 Optional 인스턴스는 모든 타입의 참조 변수를 저장할 수 있습니다.

> Wrapper 클래스 : 8개의 기본타입(type, short, int, ...)의 데이터를 객체로 포장해주는 클래스, 각각의 타입에 해당하는 데이터를 인수로 전달받아, 해당 값을 가지는 객체 

<br/>

## Java Optional의 장점

여러 가지 장점이 있으나 다음과 같이 서술할 수 있습니다.
- `Null Pointer Exception`을 유발할 수 있는 null 을 직접 다루지 않아도 됩니다.
- null 체크를 따로 하지 않아도 됩니다.
- 명시적으로 해당 변수가 null일 수도 있다는 가능성을 표현할 수 있습니다. 따라서, 방어로직을 해결하면서 코드 가독성과 유지 보수성을 높일 수 있습니다.


<br/>

## Java Optional의 사용법

### Optional 변수 선언

Optional 변수는 제네릭을 제공하므로, 변수를 선언할 때 타입 파라미터에 따라 감쌀 수 있는 객체 타입을 결정할 수 있습니다.

```java
// Customer 타입의 객체를 감쌀 수 있는 Optional 타입의 변수
Optional<Customer> storeCustomer;   

// Member 타입의 객체를 감쌀 수 있는 Optional 타입의 변수
Optional<Member> optMebmer;

```

다음과 같이 변수를 선언할 수 있습니다. 코드의 스타일에 따라 "opt"와 같이 접두어를 붙여 Optional 타입의 변수를 표현할 수 있습니다.

### Optional 객체 생성

Optional 객체를 선언하는 방법은 크게 3가지 방법으로 나눠집니다.

#### 1. Optional.empty()

비어 있는(null) Optional 객체를 얻습니다.

```java
Optional<Member> optMember = Optional.empty();
```

#### 2. Optional.of(value)

null이 아닌 value의 값을 가지고 있는 Optional 객체를 생성합니다. null이 넘어오는 경우에는, Null Pointer Exception이 발생하므로, 주의해야합니다.

```java
Optional<Member> optMember = Optional.of(dataMember);
```

#### 3. Optional.ofNullable(value)

null인지 아닌지 확신할 수 없는 객체를 담고 있는 Optional 객체를 생성합니다. 일종의 앞에 두개의 객체 생성법을 합친 방법이라고 이해하면 좋습니다.
- `Optional.ofNullable(value)` = `Optinal.empty()` + `Optional.of(value)`

null이 넘어오는 경우에는 Null Pointer Exception이 발생하지 않고, `Optional.empty()`와 마찬가지로 비어있는 Optional 객체를 가져옵니다. 일반적으로 해당 객체가 null이 아닌지 자신이 없는 상황에서 사용하는 것이 좋습니다.

```java
Optional<Member> optMember = Optional.ofNullable(dataMember);
Optional<Member> optNotMember = Optional.ofNullable(null);
```

### Optional 중간 처리

Optional 객체를 생성하고 바로 사용 가능한 메서드입니다. 아래의 메서드들은 다시 Optional을 반환하므로, 메서드 체이닝을 통해서 원하는 로직을 구성할 수 있습니다.

#### 1. filter()

해당 값이 참이면 해당 `필터`를 통과시키고 거짓이면 통과시키지 않습니다.

```java
Optional.of("true").filter((val) -> "true".equals(val)).orElse("no data"); // return "true"
Optional.of("false").filter((val) -> "true".equals(val)).orElse("no data"); // return "no data"
```

#### 2. map()

mapper 함수를 통해 입력값을 다른 값으로 변환하는 메서드입니다.

```java
Integer test = Optional.of("1").map(Integer::valueOf).orElseThrow(NoSuchElementException::new); // return 1 (number)
```

#### 3. flatMap()

mapper 함수를 통해 입력값을 다른 값으로 변환하는 메서드입니다.

```java
String result = Optional.of("result")
        .flatMap((val) -> Optional.of("good"))
        .get();
System.out.println(result); // print 'good'
```

### Optional 객체 접근

일반적으로 Optional 클래스에 담고 있는 객체를 꺼내오는 여러가지 방법이 있습니다. 자바에서는 이러한 다양한 인스턴스 메소드를 가져오는데, 자주 사용하는 메소드를 주로 설명하겠습니다. (**객체가 존재하는 경우에는 동일하게 값을 가져옵니다.**)

#### 1. get()

- 비어있는 Optional 객체의 경우, `NoSuchElementException`의 예외를 던집니다.

#### 2. orElse(T other)

- 비어있는 Optional 객체의 경우, 넘어온 인자(other)를 반환합니다.

#### 3. orElseGet(Supplier<? extends T> other)

- 비어있는 Optional 객체의 경우, 넘어온 함수형 인자(other)을 통해 생성된 객체를 반환합니다.
- 일종의 `orElse(T other)`의 lazy 버전입니다. 비어있는 경우에만 호출되므로 `orElse(T other)`보다 성능적으로 좋을 것으로 예상할 수 있습니다.

#### 4. orElseThrow(Supplier<? extends X> exceptionSupplier)

- 비어있는 Optional 객체의 경우, 넘어온 함수형 인자를 통해 생성된 예외를 던집니다.

#### 5. ifPresent(Consumer<? super T> consumer);

- 최종적으로 연산을 끝낸 후에 값이 비어있지 않으면 입력값으로 주어집니다.
- 중간 연산 중 비어있는 결과가 있는 경우 ifPresent(consumer)는 수행하지 않습니다.

#### 6. ifPresent()

- 최종 연산 후 객체가 존재하는지 여부를 파악합니다.

<br/>

## 마무리

자바8에서 등장한 Optional 클래스에 대해서 정리해보았습니다. 다음 글에는 자바9와 자바 10에서 추가된 Optional 메서드에 대해 작성하고 이를 이용한 코드를 좀 더 본격적으로 다루어보겠습니다.

---
**출처**
- http://www.tcpschool.com/java/java_api_wrapper
- https://www.daleseo.com/java8-optional-after/
- https://jdm.kr/blog/234
- https://daddyprogrammer.org/post/1988/java-optional/
- http://homoefficio.github.io/2019/10/03/Java-Optional-%EB%B0%94%EB%A5%B4%EA%B2%8C-%EC%93%B0%EA%B8%B0/
- http://www.tcpschool.com/java/java_stream_optional