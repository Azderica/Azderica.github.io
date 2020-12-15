---
title: "[Java] Java Lambda"
slug: 00-java-lambda
date: 2020-12-15
published: true
tags: ['Java', 'Java8', 'Lambda', 'Backend']
series: false,
cover_image: ./images/JavaLogo.jpg
canonical_url: false
description: "Java Lambda 대해 정리합니다."
---

# Java Lambda

Java8의 핵심 기능 중 하나는 Lambda입니다. 이 Lambda에 대해서 정리해보고 왜 쓰는지, 장점은 어떤 부분이 있는지를 정리합니다.

<br/>

## Java Lambda 정의

자바의 `Lambda`는 **메소드를 하나의 식(Expression)으로 표현한 것**입니다. 익명메소드(함수) 생성 문법이라고도 이야기 할 수 있습니다.

다만 주의해야하는 부분 중 하나는 **자바의 메소드는 메소드 자체로 혼자 선언하여 선언하여 쓰일 수 없습니다.** 반드시 클래스 구성 멤버로 선언되어 있어야합니다. 즉, 람다식을 통해서 생성되는 것은 메소드가 아닌 해당 메소드를 가지는 객체입니다. **람다식은 일반적인 객체가 아닌 인터페이스를 구현한 익명구현객체**입니다.


함수적 프로그래밍을 지원하기 위해서 자바 8부터 람다식을 지원하게 되었는데, 이를 통해서 기존의 코드 패턴이 많이 달라지기도 하며, 문법이 간결한 만큼 가독성면에서 큰 장점을 가집니다. 

> 조금 다른 이야기로 안드로이드 개발에서 요즘은 함수형 프로그래밍인 Kotlin이 각광을 받는데, 자바에서도 람다식을 통해 이러한 함수형 프로그래밍을 지원하는 느낌을 받을 수 있습니다.ㄴ

람다식의 사용법은 다음과 같습니다.

```java
(매개변수, ...) -> { 실행문 ... }
```

`(매개변수, ...)` 는 오른쪽 중괄호 `{ 실행문 ... }` 을 실행하기 위해 필요한 값을 제공하는 역할을 합니다. 매개 변수의 이름은 자유롭게 지정이 되어 있으며 인자타입을 따로 명시하지 않아도 됩니다. `->` 기호는 매개 변수를 이용해서 해당 실행문을 실행한다고 이해하면 됩니다.

<br/>

## Java Lambda 예제

코드의 예제는 다음과 같습니다.

### 함수형 인터페이스(functional interface)

람다 표현식을 사용할 때는 람다 표현식을 저장하기 위한 참조 변수의 타입을 결정해야합니다.

일반적으로 다음과 같은 어노테이션을 사용해서 함수형 인터페이스를 명시할 수 있습니다.

```java
@FunctionalInterface
```

이를 사용한 코드는 다음과 같습니다.

```java
@FunctionalInterface
interface Calc {        // 함수형 인터페이스 선언
        public int min(int x, int y);                   // 추상 메소드

        public int calc(int n);                    // 추상 메소드
}

public class Test {
        public static void main(String[] args) {
                Calc minNum = (x, y) -> {x < y ? x : y;};     // 추상 메소드 구현
                System.out.println(minNum.min(3, 4));    // output : 3

                Calc calcNum = n -> n + 1; // 추상 메소드 구현
                System.out.println(calcNum.calc(3));     // output : 4
        }      
}

```

해당 예시에서 로직이 한줄이기 때문에 구현 로직에서 `{ x < y ? x : y }` 대신에 `x < y ? x : y` 로 {}를 뺄수도 있고 return도 없앨 수 있습니다.

추가적으로 매개변수가 하나 일때는 () 또한 삭제가 가능합니다.

<br/>

## Java Lambda 장단점

### 장점

- 코드를 간결하게 만들 수 있습니다.
- 가독성이 좋아집니다.
- 함수를 만드는 과정 없이 한번에 처리할 수 있으므로 코딩하는 시간이 줄어듭니다.
- 병렬 프로그래밍에 유리합니다.

### 단점

- 재사용이 불가능합니다.
- 일부 디버깅이 까다롭습니다.
- 너무 남발하면 코드가 지저분해집니다.
- 재귀로 만드는 경우에는 성능적 이슈가 있을 수 있습니다.

<br/>

## 마무리.

오늘은 간단하게 Lambda에 대해 정리해보았습니다. 다음에는 자바의 stream에 대해서 알아보겠습니다.

--- 
**출처**
- https://coding-factory.tistory.com/265
- http://www.tcpschool.com/java/java_lambda_concept
- https://sehun-kim.github.io/sehun/java-lambda-stream/
- https://medium.com/@logishudson0218/understanding-for-java-1-8-lambda-%EB%9E%8C%EB%8B%A4%EC%8B%9D-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-43bcc491519a
