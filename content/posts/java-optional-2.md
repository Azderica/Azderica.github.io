---
title: "[Java] Java Optional 2"
slug: 01-java-optional
date: 2020-12-14
published: true
tags: ['Java', 'Optional', 'Stream', 'Backend']
series: false,
cover_image: ./images/JavaLogo.jpg
canonical_url: false
description: "Java Optional 을 좀 더 잘 사용하기"
---

# Java Optional 활용 편

지난 시간에 자바 Optional에 대해 작성했습니다. 또한 자바 Stream이나 Lambda에 대해서도 이야기를 하였습니다.

- [Java Optional](https://azderica.github.io/00-java-optional/)
- [Java Lambda](https://azderica.github.io/00-java-lambda/)
- [Java Stream](https://azderica.github.io/00-java-stream/)

이를 기반으로 좀 더 Optional을 더 잘 쓰는 방법에 대해 이야기해볼려고합니다.

<br/>

## Optional과 Stream

Optional을 제대로 사용하기 위해서는 Stream을 빼놓을 수는 없습니다. 일부 다른 표현으로는 **Optional**을 **최대 1개의 원소를 가진 특별한 Stream**이라고 표현하기도 합니다. 

Optional 클래스와 Stream 클래스 간에 직접적인 상관관계는 없지만 크게 유사한 부분을 가지고 있습니다. 지난시간에 이야기한 Stream이 가지고 있는 `map()`, `flatMap()`, `filter()` 모두 Optional도 가지고 있습니다.

### map() 사용하기

해당 코드는 **"주문을 한 회원이 살고 있는 도시를 반환한다"** 라는 예제입니다.

```java
public String getCityOfMemberFromOrder(Order order){
        return Optional.ofNullable(order)
                .map(Order::getMember)
                .map(Member::getAddress)
                .map(Address::getCity)
                .orElse("Seoul");
}
```

다음 코드는 기존의 NPE(Null Pointer Exception) 방어 패턴에 비해 훨씬 간결하고 명확한 코드를 확인할 수 있습니다.

이를 좀 더 상세하게 설명한다면 다음과 같은 의미를 가집니다.
- `ofNullable` 을 통해 Order 객체를 Optional로 감쌌으며 객체가 null인 경우를 위해 `of()` 대신에 `ofNullabe`을 사용하였습니다.
- `map()` 메소드를 3번 호출하면서 Optional 객체는 `Optional<Order>` 에서 `Optional<Member>`, `Optional<Address>`, `Optional<String>`으로 객체가 3번 변화하였습니다.
- `orElse()`를 통해 `Optional`이 비어있는 경우, 디폴트 값으로 "Seoul"을 설정하였습니다.

해당 코드는 `null-safe`한 아름다운 코드입니다.

### filter() 사용하기

**주어진 시간내에 생성된 주문을 한 경우, 회원 정보를 얻는 기능**을 구현한 코드가 예시로 있습니다.

기존의 코드는 다음과 같습니다.

```java
public Member getMemberIfOrderWithin(Order order, int min){
        if(order != null && order.getDate().getTime() > System.currentTimeMills() - min * 1000){
                return order.getMember();
        }
}
```

이를 `filter()`을 통해 읽기 편하고 아름다운 코드를 만들 수 있습니다.

```java
public Optional<Member> getMemberIdOrderWithin(Order order, int min){
        return Optional.ofNullabe(order)
                .filter(o -> o.getDate().getTime() > System.currentTimeMills() - min * 1000)
                .map(Order::getMember);        
}

```

이와 같이 코드를 수정할 수 있습니다.

다만 `filter()` 의 경우, `Opional`과 `Stream`은 약간의 차이가 있습니다. 동작 방식은 동일하지만 `Optional`의 경우에는 원소가 하나이기 때문에, `filter()` 로 넘어온 함수형 인자값이 false 인 경우에는 그 이후의 메소드는 의미없어집니다.

<br/>

## Optional 활용 예시

### null 반환

다음과 같은 데이터가 있는 경우.

```java
Map<Integer, String> cities = ...;
// {1, "Seoul"}, {2, "Busan"}, {3, "Daegu"}
```

`map` 인터페이스에서 `get()` 메소드 사용시 인덱스에 해당하는 값이 없으면 null을 반환합니다. 따라서 기존의 코드는 다음과 같습니다.

```java
String city = cities.get(4);    // return null
int length = city == null ? 0 : city.length();  // null check
```

다만 `Optional`을 통해 `get()`을 감싸주면 null-safe한 코드가 됩니다.

```java
Optional<String> maybeCity = Optional.ofNullable(cities.get(4)); // Optional
int length = maybeCity.map(String::length).orElse(0);   // null-safe
```

이와 같이 아름다운 코드가 됩니다.

### 예외 발생

마찬가지로 null 반환을 하지 않고 예외를 던지는 경우에도 `Optional`은 효과적입니다.

```java
List<String> cities = Arrays.asList("Seoul", "Busan", "Daegu");
```

이와 같은 데이터가 있을 때, 기존의 코드는 다음과 같습니다.

```java
String city = null;
try {
	city = cities.get(3); // throws exception
} catch (ArrayIndexOutOfBoundsException e) {
	// ignore
}
int length = city == null ? 0 : city.length(); // null check
```

이를 Optional을 통해서 수정가능합니다.

```java
public static <T> Optional<T> getAsOptional(List<T> list, int index) {
	try {
		return Optional.of(list.get(index));
	} catch (ArrayIndexOutOfBoundsException e) {
		return Optional.empty();
	}
}
```

정적 메소드를 사용하여 null-safe하게 간단하게 코딩할 수 있습니다.

```java
Optional<String> maybeCity = getAsOptional(cities, 3); // Optional
int length = maybeCity.map(String::length).orElse(0); // null-safe

```

<br/>

## Java 9의 Optional 메소드

자바 9에서도 추가된 옵셔널 메소드가 있습니다.

### or

기존의 `.orElseGet()`과 유사하지만 체이닝을 통해서 우선 순위를 결정할 수 있습니다. `.or()` 연산 중 비어있으면 순차적으로 진행합니다.

예제 코드는 다음과 같습니다.
```java

// public Optional<T> or(Supplier<? extends Optional<? extends T>> 
String result = Optional.ofNullable("test")
        .filter(value -> "filter".equals(value))
        .or(Optional::empty)
        .or(() -> Optional.of("second"))
        .orElse("final");
System.out.println(result);
// output : 'second'
```

### ifPresentOrElse

기존의 `.ifPresent` 메소드와 비슷하지만 매개변수를 하나 더 받을 수 있습니다. `emptyAction`을 추가로 받아서 유효한 객체가 있는 경우 `action`을 실행하고 그렇지 못한 경우에는 `emptyAction`을 실행합니다.

```java
// public void ifPresentOrElse(Consumer<? super T> action, Runnable emptyAction);

Optional.ofNullable("test")
    .ifPresentOrElse(value -> System.out.println(value), () -> System.out.println("null")); 
// output : 'test'

Optional.ofNullable(null)
    .ifPresentOrElse(value -> System.out.println(value), () -> System.out.println("null"));
// output : 'null'
```

### .stream

`.stream()` 메서드는 Optional 객체가 바로 스트림 객체로 전환되는 기능을 가지고 있습니다.

```java
// public Stream<T> stream();

List<String> result = List.of(1, 2, 3, 4)
    .stream()
    .map(val -> val % 2 == 0 ? Optional.of(val) : Optional.empty())
    .flatMap(Optional::stream)
    .map(String::valueOf)
    .collect(Collectors.toList());
// output : [2, 4]

```

<br/>


## Java 10의 Optional 메소드

자바 10에서도 하나의 메서드가 추가되었습니다.

### orElseThrow

매개변수가 필요없는 예외 메서드입니다.

```java
// Java 8
Optional.ofNullable(something).orElseThrow(NoSuchElementException::new);

// Java 10
Optional.ofNullable(something).orElseThrow();
```

<br/>

## 마무리.

이상으로 길고 길었던 Java의 Optinal, lambda, Stream에 대해 한번 정리했습니다. 스프링 개발을 하면서 좋은 코드에 대해 많은 고민이 들었습니다. 클린 코드에서 추가하는 아름다운 코드를 구성하기 위해서는 어떤식으로 코드를 구성해야할까라는 생각이 많이 들었습니다.

함께 일하기 좋은 개발자 중 한명으로 코드를 보기 쉽게 짜는 사람이 있다는 이야기를 들은적이 있습니다. 저 또한 이부분을 잘 살려서 아름답고 사용자가 보기 쉬운 코드를 구성하는데 목표를 세워야겠다는 생각이 드는 시간이였습니다.

부족한 점이나 잘못된 부분이 있으면 편하게 이야기주세요. 감사합니다.

---
**출처**
- https://www.daleseo.com/java8-optional-after/
- https://www.daleseo.com/java8-optional-effective/
- https://jdm.kr/blog/234
