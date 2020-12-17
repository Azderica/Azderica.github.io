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

### or


### ifPresentOrElse


### .stream


## Java 10의 Optional 메소드

### orElseThrow

---
**출처**
- https://www.daleseo.com/java8-optional-effective/