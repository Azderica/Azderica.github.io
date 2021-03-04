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

사실 자바 람다에 대해서는 따로 개인적으로 공부한 적이 있다. 다만 오늘은 스터디와 함께 더불어서 더 자세하게 공부해보려고 한다.

지난 게시글은 아래의 링크를 참고해주세요.

[Java Lambda](https://azderica.github.io/00-java-lambda/)

해당 게시글에서는 다음의 내용을 소개합니다.

- 람다식이란.
- 람다식 사용 방법
- 람다식 예제
- 람다식의 장단점

<br/>

## 자바 람다식 사용법

<br/>

## 함수형 인터페이스

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
