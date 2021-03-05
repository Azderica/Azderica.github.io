---
title: '[Java] Java Lambda Detail'
slug: 15-java-study
date: 2021-03-04
published: true
tags: ['Java', 'Stater', 'Lambda']
series: false,
cover_image: ./images/JavaLogo.jpg
canonical_url: false
description: 'Java Lambda에 대해 좀 더 자세하게 정리합니다.'
---

# Java Lambda

백기선님의 자바 스터디 15주차(마지막) 내용입니다.

공부할 내용

- 람다식 사용법
- 함수형 인터페이스
- Variable Capture
- 메소드, 생성자 레퍼런스

<br/>

## Java Lambda

사실 자바 람다에 대해서는 따로 개인적으로 공부한 적이 있습니다. 다만 오늘은 스터디와 함께 더불어서 더 자세하게 공부해보려고 합니다.

지난 게시글은 아래의 링크를 참고해주세요.

[Java Lambda](https://azderica.github.io/00-java-lambda/)

해당 게시글에서는 다음의 내용을 소개합니다.

- 람다식이란.
- 람다식 사용 방법
- 람다식 예제
- 람다식의 장단점

<br/>

## 자바 람다식 사용법

### 람다식이란

[Java Lambda](https://azderica.github.io/00-java-lambda/)

해당 게시글을 내용이며 한번 더 이야기 하면 다음과 같이 사용합니다.

```java
(매개변수, ...) -> { 실행문 ... }
```

자바의 Lambda는 **메소드를 하나의 식(Expression)**으로 표현한 것입니다. 익명메소드(함수) 생성 문법이라고도 이야기 할 수 있습니다.

다만 주의해야하는 부분 중 하나는 자바의 메소드는 메소드 자체로 혼자 선언하여 선언하여 쓰일 수 없습니다. 반드시 클래스 구성 멤버로 선언되어 있어야합니다. 즉, 람다식을 통해서 생성되는 것은 메소드가 아닌 해당 메소드를 가지는 객체입니다. 람다식은 일반적인 객체가 아닌 **인터페이스를 구현한 익명구현객체**입니다.

함수적 프로그래밍을 지원하기 위해서 자바 8부터 람다식을 지원하게 되었는데, 이를 통해서 기존의 코드 패턴이 많이 달라지기도 하며, 문법이 간결한 만큼 가독성면에서 큰 장점을 가집니다.

### 람다식 예제.

다음과 같이 예시를 작성합니다.

```java
@FunctionalInterface
interface Calc { // 함수형 인터페이스 선언
  public int min(int x, int y); // 추상 메소드

  public int calc(int n);          // 추상 메소드
}

public class Test {
  public static void main(String[] args) {
    alc minNum = (x, y) -> {x < y ? x : y;}; // 추상 메소드 구현
    System.out.println(minNum.min(3, 4)); // output : 3

    Calc calcNum = n -> n + 1; // 추상 메소드 구현
    System.out.println(calcNum.calc(3));     // output : 4
  }
}
```

해당 예시에서 로직이 한줄이기 때문에 구현 로직에서 { x < y ? x : y } 대신에 x < y ? x : y 로 {}를 뺄수도 있고 return도 없앨 수 있습니다.

추가적으로 매개변수가 하나 일때는 () 또한 삭제가 가능합니다.

### 자바 람다식의 장단점

장점

- 코드를 간결하게 만들 수 있습니다.
- 가독성이 좋아집니다.
- 함수를 만드는 과정 없이 한번에 처리할 수 있으므로 코딩하는 시간이 줄어듭니다.
- 병렬 프로그래밍에 유리합니다.

단점

- 재사용이 불가능합니다.
- 일부 디버깅이 까다롭습니다.
- 너무 남발하면 코드가 지저분해집니다.
- 재귀로 만드는 경우에는 성능적 이슈가 있을 수 있습니다.

<br/>

## 함수형 인터페이스

함수형 인터페이스(Functional Interface) 는 **추상 메소드를 딱 하나만 가지고 있는 인터페이스**입니다.

자바 8부터 Functional Interface 기반의 `java.util.function` 패키지를 지원합니다.

대표적인 예시는 아래와 같습니다.

### 1. Predicate

`Predicate` 인터페이스는 T타입의 값을 받아서 boolean을 반환하는 함수 인터페이스입니다.

```java
@FunctionalInterface
interface Predicate<T> {
  boolean test(T t);
}
```

다음과 같이 사용할 수 있습니다.

```java
public static void main(String[] args) {
  Predicate<String> predicate = a -> a.startsWith("t");

  // Predicate Sample
  System.out.println(predicate.test("test")); // true

  // Predicate - and
  Predicate<String> predicateAnd = predicate.and(a -> a.endsWith("i"));
  System.out.println(predicateAnd.test("test"));  // false

  // Predicate - negate
  Predicate<String> predicateNegate = predicate.negate();
  System.out.println(predicateNegate.test("test"));   // false

  // Predicate - or
  Predicate<String> predicateOr = predicate.or(a -> a.endsWith("i"));
  System.out.println(predicateOr.test("test"));   // true
}
```

- `and(Predicate<? super T> other)`
  - Predicate를 인수로 받아서 기존 Predicate와 and 조건으로 결합된 Predicate를 반환합니다.
- `negate()`
  - Predicate를 인수로 받아서 부정을 반환합니다.
- `or(Predicate<? super T> other)`
  - Predicate를 인수로 받아서 기존 Predicate와 or 조건으로 결합된 Predicate를 반환합니다.

### 2. Consumer

`Consumer` 인터페이스는 제너릭 형식의 T 객체를 받아, void를 반환하는 accept 추상메소드를 정의합니다.

```java
@FunctionalInterface
public interface Consumer<T> {
  void accept(T t);
}
```

다음과 같이 사용할 수 있습니다.

```java
public static void main(String[] args) {
  Consumer<String> firstConsumer = a -> System.out.println("first: " + a);
  Consumer<String> secondConsumer = b -> System.out.println("second: " + b);
  Consumer<String> combineConsumer = firstConsumer.andThen(secondConsumer);

  combineConsumer.accept("test"); // first: test \n second : test
}
```

- `andThen(Consumer<? super T> after)`
  - Consumer의 default 메소드로서, accept 메소드를 실행하고, 인수로 받은 Consumer의 accept 메소드를 호출하도록 정의합니다.

### 3. Function

`Function<T, R>` 인터페이스는 제너릭 형식의 T 객체를 받아, R 객체를 반환하는 apply 추상메소드를 정의합니다.

```java
@FunctionalInterface
public interface Function<T, R> {
  R apply(T t);
}
```

다음과 같이 사용할 수 있습니다.

```java
public static void main(String[] args) {
  // function
  Function<Integer, Integer> function = a -> a * 100;
  System.out.println(function.apply(3));  // 300

  // function - andThen
  Function<Integer, Integer> function1 = function.andThen(b -> b / 2);
  System.out.println(function1.apply(3)); // 150
  // 3 -> 300 -> 150

  // function - compose
  Function<Integer, Integer> function2 = function.compose(b -> b / 2);
  System.out.println(function2.apply(3)); // 100
  // 3 -> 1 -> 100
}
```

- `andThen(Function<? super R, ? extends T> after)`
  - Function의 default 메소드로서, apply 메소드를 실행후 반환 값을 인수로 받은 Function의 apply 메소드의 인수로 전달하고 결과를 반환합니다.
- `compose(Function<? super V, ? extends T> after)`
  - Function의 default 메소드로서, 인수로 받은 Function의 apply 메소드를 먼저 실행 및 반환 후 apply 메소드를 실행하여 결과를 반환합니다.
  - `andThen` 메소드와 반대로 동작합니다.

### 4. Supplier

Supplier 인터페이스는 매개변수는 없으며 T 객체를 반환하는 get 추상메소드를 정의합니다.

```java
@FunctionalInterface
public interface Supplier<T> {
  T get();
}
```

다음과 같이 사용할 수 있습니다.

```java
public static void main(String[] args) {
  // supplier
  Supplier<String> supplier = () -> "test";
  String s = supplier.get(); // test
}
```

### 5. Operator

`Operator` 인터페이스는 특정한 정수나 실수형 데이터를 처리하는데 사용되는 인터페이스입니다.

<br/>

## Variable Capture

Lambda의 body에서 인자로 넘어온 것 이외의 변수를 접근하는 것을 **Variable Capture**라고 합니다.

Lambda는 인스턴스, 정적 변수와 final로 선언된 혹은 final처럼 사용되고 있는 **지역 변수를 참조**할 수 있습니다.

지역변수를 사용할 때에는 해당 변수에게 값의 재할당이 일어나면 안됩니다.

즉, 다음의 경우와 같이 새로운 scope를 통해서 **로컬변수로 재정의**하여 사용할 수 있습니다.

```java
package week15;

import java.util.function.Consumer;

public class VariableCapture {

    public static void main(String[] args) {
        int val = 100;  // val - 1

        Consumer<Integer> anonymosClass = new Consumer<Integer>() {
            @Override
            public void accept(Integer integer) {
                int val = 10; // val - 2
                System.out.println(integer * val); // 10
            }
        };

        anonymosClass.accept(100);
    }
}
```

다만 이를 람다식처럼 재정의 할려고 하면 에러가 발생합니다. (같은 scope이므로.)

```java
public class VariableCapture {

    public static void main(String[] args) {
        int val = 100;

        Consumer<Integer> lambdaExpression = (integer) -> {
            int val = 10; // Error. Variable 'val' is already defined in the scope
            System.out.println(integer * val);
        };

        lambdaExpression.accept(100);
    }
}
```

람다는 이를 새도윙(shadowing)하지 않습니다.

- **새도윙?** 변수, 메소드, 클래스, 인터페이스의 이름을 같은 영역에서 동일하게 사용하는 것

### final/effective final

람다식에서는 scope를 공유하기 때문에 `final` 또는 `effective final` 만 사용가능합니다.

람다식에서 사용되는 외부 지역 변수는 복사본이고 해당 stack에서만 생성되고, 해당 블럭이 끝나면 stack에서 접근되는 구조이기 때문에 이후에 참조할 수 없습니다.

따라서 지역 변수를 관리하는 쓰레드와 람다식이 실행되는 쓰레드는 다를 수도 있기 때문에 어떤 데이터가 최신일지 모른다는 문제가 있습니다. 그렇기 때문에 이러한 값을 보장하기 위해서 `final`이나 `effective final`만 사용가능합니다.

```java
public static void main(String[] args) {
  int val = 100;

  Consumer<Integer> lambdaExpression = (integer) -> {
    System.out.println(integer * val);
    // error: local variables referenced from a lambda expression must be final or effectively final
  };

  val++;

  lambdaExpression.accept(100);
}
```

<br/>

## 메소드, 생성자 레퍼런스

### 메소드 레퍼런스

메소드 레퍼런스는 람다식을 더 간단하게 만드는 표현식입니다.

전달하는 인수와 사용하는 메소드의 인수 형태가 같을시 메소드 레퍼런스를 통해서 간결하게 표현가능합니다.

종류는 다음과 같습니다.

#### 1. Static Method Reference

다음의 형태를 가집니다.

`{타입}::(Static Method}`

예시 코드는 다음과 같습니다.

```java
Consumer<Integer> consumer = a -> System.out.println(a);
Consumer<Integer> refConsumer = System.out::println;
```

#### 2. Instance Method Reference

다음의 형태를 가집니다.

`{Object Reference}::(Instance Method}`

예시 코드는 다음과 같습니다.

```java
UnaryOperator<String> operator = str -> str.toLowerCase();
UnaryOperator<String> refOperator = String::toLowerCase;
```

#### 3. Constructor Method Reference

다음의 형태를 가집니다.

`{타입}::(Static Method}`

예시 코드는 다음과 같습니다.

```java
UnaryOperator<String> stringOperator = str -> new String(str);
UnaryOperator<String> refStringOperator = String::new;
```

---

**출처**

- https://azderica.github.io/00-java-lambda/
- https://giyeon95.github.io/whiteship/whiteship_study_week15/
- https://www.notion.so/758e363f9fb04872a604999f8af6a1ae
- https://soy.me/2014/04/05/name_reuse/
-
