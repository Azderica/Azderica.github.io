---
title: '[Java] Java Stream'
slug: 00-java-stream
date: 2020-12-16
published: true
tags: ['Java', 'Java8', 'Stream', 'Backend']
series: false,
cover_image: ./images/JavaLogo.jpg
canonical_url: false
description: 'Java Stream에 대해 정리합니다.'
---

# Java Stream

지난번에 이야기한 Java8의 핵심 기능, [자바 Optional](https://Azderica.github.io/00-java-lambda/)에 이어서, 오늘은 Stream에 대해서 정리합니다.

<br/>

## Java Stream 정의

Java Stream은 **배열이나 컬렉션의 저장 요소를 하나씩 참조해서 람다식으로 처리할 수 있게 해주는 반복자**입니다. 이전에는 Java Stream이 없었을 때는 Iterator이라는 반복자를 사용하였습니다.

- Java Iterator

```java
ArrayList<Integer> list = new ArrayList<>(Array.asList(1, 2, 3));
Iterator<Integer> it = list.iterator();

while(it.hasNext()){
        int num = it.next();
        System.out.print(num + " ");
}
// output : 1, 2, 3
```

- Java Stream

```java
ArrayList<Integer> list = new ArrayList<>(Array.asList(1, 2, 3));
Stream<Integer> stream = list.stream();

stream.forEach(num -> System.out.print(num + " "));
// output : 1, 2, 3
```

<br/>

## Java Stream 특징

- 배열 또는 컬렉션 인스턴스에 함수 여러 개를 조합해서 원하는 결과를 필터링할 수 있으며 가공된 결과를 얻을 수 있습니다.
- 람다를 통해 코드를 간결하게 표현할 수 있습니다.
- 배열과 컬렉션을 통해 함수형으로 처리할 수 있습니다.
- 병렬처리가 가능합니다.

<br/>

## Java Stream 구조 및 사용법

스트림은 다음과 같은 절차로 사용할 수 있습니다.

- 스트림 생성 : 스트림 인스턴스 생성
- 중개 연산 : 필터링(filtering) 및 맵핑(mapping) 등으로 원하는 결과를 만들어가는 중간 과정
- 최종 연산 : 최종적으로 결과를 만드는 작업

### 스트림 생성

- **배열 스트림** : `Arrays.stream()` 을 사용합니다.

```java
int[] array = {1, 2, 3};

IntStream intStream = Arrays.stream(array);
```

- **컬렉션 스트림** : 인터페이스의 default method를 사용합니다.

```java
List<Integer> list = Arrays.asList(1, 2, 3);

Stream<Integer> stream = list.streams();
Stream<Integer> parallelStream = list.parallelStream();
```

### 중개 연산

- Filter: 스트림 내 요소 중 조건에 맞는 것을 고릅니다.

```java
List<String> arrary = Arrays.asList("apple", "banana", "melon");
Stream<String> stream = arrary.stream().filter(x -> x.contains("a"));
// output : ['apple', 'banana']
```

- Map : 스트림 내 요소들이 특정 로직 수행 후 새로운 스트림을 반환합니다.

```java
List<Integer> list = Arrays.asList(1, 2, 3);
Stream<Integer> stream = list.stream().map(x -> x + 1);
// output : [2, 3, 4]
```

- flatMap : 여러 스트림을 하나의 스트림으로 합칩니다.

```java
String[][] array = new String[][]{{"a1", "a2"}, {"b1", "b2"}, {"c1", "c2"}};
Stream<String> stream = Arrays.stream(arr).flatMap(s -> Arrays.stream(s));
// output : ["a1", "a2", "b1", "b2", "c1", "c2"]
```

- sorted : 정렬합니다.

```java
List<Integer> list = Arrays.asList(1, 4, 3);
List<Integer> sortedList = list.stream().sorted().collect(Collectors.toList()); // 오름차순
// output : [1, 3, 4]

List<Integer> sortedList = list.stream().sorted(Comparator.reverseOrder()).collect(Collectors.toList()); // 내림차순
// output : [4, 3, 1]
```

### 최종 연산

- count, min, max, sum : 갯수, 최소, 최대, 합

- forEach : 요소를 돌면서 실행합니다.

- collect : 스트림의 값들을 모을 수 있습니다. ex) `toMap()`, `toSet()`, `toList()`

```java
List<Integer> arr = Arrays.asList(1, 2, 3, 3, 4, 5, 5);

Set<Integer> set = arr.stream().collect(Collectors.toSet());
set.forEach(x -> System.out.print(x + " " ));
// output : 1 2 3 4 5
```

- reduce : 누적된 값을 계산합니다.

```java
OptionalInt reduced =
    IntStream.range(1, 4) // [1, 2, 3]
    .reduce((a, b) -> {
        return Integer.sum(a, b);
    });
    // output : 6 (1 + 2 + 3)

    int reducedTwoParams =
    IntStream.range(1, 4) // [1, 2, 3]
    .reduce(10, Integer::sum);
    // output : 16 (10 + 1 + 2 + 3)
}
```

<br/>

## 마무리.

오늘은 간단하게 stream에 대해 알아보고 이를 사용한 예시를 사용하였습니다. 현업에서 stream과 optional, lambda식을 잘 쓰는 것은 클린 코드를 만드는데 좋은 스킬 중 하나임을 개발하면서 자주 느낍니다. 오늘 사용한 예제말고도 다른 예제는 찾아보면서 좋은 개발할 수 있으면 좋겠습니다.

감사합니다.

---

**출처**

- https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html
- https://www.baeldung.com/java-8-streams-introduction
- https://futurecreator.github.io/2018/08/26/java-8-streams/
