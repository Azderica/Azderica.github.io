---
title: '[Java] 자바 연산자'
slug: 00-java-operation
date: 2021-01-01
published: true
tags: ['Java', 'Data', 'Type']
series: false,
cover_image: ./images/JavaLogo.jpg
canonical_url: false
description: '자바가 제공하는 다양한 연산자에 대해 정리합니다.'
---

# Java Operatore

최근 백기선님의 자바 스터디를 알게되어서, 한번 자바에 대한 개념을 스터디를 통해서 잡고 가면 좋을 듯해서 글에 대해서 정리해보겠습니다. 아래는 3주차 내용입니다.

공부할 내용

- 산술 연산자
- 비트 연산자
- 관계 연산자
- 논리 연산자
- instanceof
- assignment(=) operator
- 화살표(->) 연산자
- 3항 연산자
- 연산자 우선 순위
- (optional) Java 13. switch 연산자

<br/>

## 산술 연산자

산술 연산자는 크게 4가지로 구성됩니다. 덧셈 연산자, 뺄셈 연산자, 곱셈 연산자, 나머지 연산자로 이루어지며, 이는 일반적인 수학 수식처럼 이해하면 됩니다.

### 코드 예시.

```java
public void calcOperation() {
  int num1 = 5;
  int num2 = 3;

  System.out.println(num1 + num2);  // 8
  System.out.println(num1 - num2);  // 2
  System.out.println(num1 * num2);  // 15
  System.out.println(num1 / num2);  // 1 (실수형이라면 1.666 이지만 정수형이므로 내림으로 1이 나온다.)
}
```

<br/>

## 비트 연산자

비트 연산은 일반적으로 1과 0으로 이루어지며 0은 거짓, 그 외의 값은 참을 의미합니다. 대표적인 비트 연산자로는 `~(not), &(and), |(or), ^(xor)` 이 있습니다.

### NOT, ~

| 입력 | 결과 |
| ---- | ---- |
| 1    | 0    |
| 0    | 1    |

### AND, &

| 입력1 | 입력2 | 결과 |
| ----- | ----- | ---- |
| 1     | 1     | 1    |
| 1     | 0     | 0    |
| 0     | 1     | 0    |
| 0     | 0     | 0    |

### OR,

| 입력1 | 입력2 | 결과 |
| ----- | ----- | ---- |
| 1     | 1     | 1    |
| 1     | 0     | 1    |
| 0     | 1     | 1    |
| 0     | 0     | 0    |

### XOR, ^

| 입력1 | 입력2 | 결과 |
| ----- | ----- | ---- |
| 1     | 1     | 0    |
| 1     | 0     | 1    |
| 0     | 1     | 1    |
| 0     | 0     | 0    |

### 코드 예시.

```java
public void bitOperation() {
  int num1 = 10;  // 00000000 00000000 00000000 00001010
  int num2 = 15;  // 00000000 00000000 00000000 00001111

  System.out.println(~num1) // -11
  // 11111111 11111111 11111111 11110101

  System.out.println(num1 & num2) // 10
  // 00000000 00000000 00000000 00001010

  System.out.println(num | num2)  // 15
  // 00000000 00000000 00000000 00001111

  System.out.println(num ^ num2)  // 5
  // 00000000 00000000 00000000 00000101
}

```

다음과 같이 비트 연산을 사용할 수 있습니다. 일반적으로 자주 사용하지는 않으나, 종종 알고리즘을 풀 때 사용할 수 있습니다.

<br/>

## 관계 연산자

연산자를 중심으로 양쪽의 값이 어떤 관계를 갖는지 확인하는 연산입니다. 관계 연산자로는 `==, !=, >, >=, <, <=, instance of` 가 있습니다.

| 연산자 | 이름             | 설명                                 |
| ------ | ---------------- | ------------------------------------ |
| ==     | 같음             | 양쪽이 같으면 참, 아니면 거짓        |
| !=     | 다름             | 양쪽이 다르면 참, 같으면 거짓        |
| >      | 보다 큼          | 왼쪽이 크면 참, 아니면 거짓          |
| >=     | 보다 크거나 같음 | 왼쪽이 크거나 같으면 참, 아니면 거짓 |
| <      | 보다 작음        | 왼쪽이 작으면 참, 아니면 거짓        |
| <=     | 보다 작거나 같음 | 왼쪽이 작거나 같으면 참, 아니면 거짓 |

### 코드 예시.

```java
public void relationOperation() {
  System.out.println(10 > 5); // true
  System.out.println(10 < 5); // false
  System.out.println(9 >= 8); // true
  System.out.println(9 >= 9); // true
  System.out.println(8 >= 9); // false
  System.out.println(8 == 8); // true
  System.out.println(8 != 9); // true
}
```

<br/>

## 논리 연산자

비트 연산과 비슷하지만, 대상이 boolean 타입의 논리 값입니다. `!`은 논리적인 부정을 의미하고, `&&(and)`와 `||(or)` 연산은 비트 연산자와 비슷한 개념을 가집니다.

### 코드 예시.

```java
public void relativeOperation() {
  boolean boo_true = true;
  boolean boo_false = false;

  System.out.println(!boo_true);  // false;
  System.out.println(!boo_false);  // true;
  System.out.println(boo_true && boo_false);  // false;
  System.out.println(boo_true || boo_false);  // true;
  System.out.println(boo_true && boo_true);  // true;
}
```

다만 신경써야하는 부분은, &와 &&, |과 ||은 **두번째 조건**의 확인이 다릅니다.

&&는 첫번째 조건이 참이 아니면 두번째 조건을 보지않지만, &는 두번째 조건을 봅니다. 마찬가지로 ||은 첫번째 조건이 참이면 두번째 조건을 확인하지않지만, |은 두번째 조건을 확인합니다.

<br/>

## instanceof

**레퍼런스 타입 변수가 레퍼런스 타입의 데이터 티입인지 확인해 보는 연산**입니다. 일반적으로 레퍼런스 타입 변수가 레퍼런스 타입으로 타입 변환이 가능한지 확인하기 위해서 사용합니다.

`(레퍼런스 타입 변수) instance of (레퍼런스 데이터 타입)`의 형태를 가집니다.

### 코드 예시.

```java
interface interType{}
class type1 {}
class type2 extends type1 {}
class type3 implements interType {}

public class Week3 {
  public void instanceOfExample() {
    type1 myType1 = new type1();
    type2 myType2 = new type2();
    type3 myType3 = new type3();

    System.out.println(myType1 instanceof interType); // false
    System.out.println(myType2 instanceof interType); // false
    System.out.println(myType3 instanceof interType); // true
    System.out.println(myType2 instanceof type2);     // true
  }
}
```

<br/>

## assignment(=) operator

일반적으로 대입 연산자 혹은 할당 연산자라고 부릅니다. 오른쪽의 피연산자를 왼쪽의 피연산자의 값으로 할당합니다. 따라서, 왼쪽에는 변수, 오른쪽에는 리터럴이나 리터럴이 담긴 변수가 있습니다.

```java
public void assignmentOperator() {
  int num1 = 10;
}
```

다음과 같이 `variable = literal`의 형태를 가집니다.

이외에도 시프트 연산이 존재합니다. 다음과 같은 `>>, <<, >>>`와 같은 시프트 연산이 있습니다.

```java
public void shiftOperator() {
  int num1 = 10;  // 00000000 00000000 00000000 00001010

  System.out.println(num1 << 3) // 80
  // 00000000 00000000 00000000 01010000

  System.out.println(num1 >> 1); // 5
  // 00000000 00000000 00000000 00000101

  System.out.println(num1 >>> 1); // 5
  // 00000000 00000000 00000000 00000101
}
```

다음과 같이 작동합니다. `>>`와 `>>>`의 차이는 오른쪽으로 비트 이동시, 왼쪽에 추가로 넣는 값에 MSB값으로 채우는지 0으로 채우는지의 차이입니다.

`>>`의 경우는 MSB로 부족한 비트값을 채우고, `>>>`은 0으로 부족한 값을 채웁니다.

<br/>

## 화살표(->) 연산자

자바에 람다가 도입하면서 등장하였습니다. 자바 람다에 대해서는 [java lambda](https://../00-java-lambda/) 글을 참고하면 됩니다.

해당 글을 간략하게 정리하자면 화살표 연산자는 `() -> {}` 의 형태를 가지고 있으며, 매개변수를 받아, 메소드(함수)를 실행합니다.

<br/>

## 3항 연산자

다음과 같은 형태를 지니고 있습니다.이 연산자를 통해서 코드를 짧게 할 수 있습니다.

`(조건) ? (조건이 참일 시, 실행) : (조건이 거짓일 시, 실행)`

```java
public static void binomialOperator() {
  int num1 = 10;

  System.out.println((num1 > 5) ? "okay" : "no"); // okay
  System.out.println((num1 < 5) ? "okay" : "no"); // no
}
```

다음과 같이 나타낼 수 있습니다.

<br/>

## 연산자 우선 순위

연산자의 우선 순위는 다음과 같습니다. 해당 우선순위가 앞에 있을수록 먼저 실행됩니다.

| 우선순위 | 연산자                                    |
| -------- | ----------------------------------------- |
| 1        | `(), []`                                  |
| 2        | `!, ~, ++, --`                            |
| 3        | `*, /, %`                                 |
| 4        | `+, -`                                    |
| 5        | `<<, >>, >>>`                             |
| 6        | `<, <=, >, >=`                            |
| 7        | `=, !=`                                   |
| 8        | `&`                                       |
| 9        | `^`                                       |
| 10       | `|`                                       |
| 11       | `&&`                                      |
| 12       | `||`                                      |
| 13       | `?:`                                      |
| 14       | `=, +=, -=, *=, /=, <<=, >>=, &=, ^=, ~=` |

다음과 같은 우선순위를 가지며, 일반적으로 괄호를 잘 쓰는 것이 중요합니다.

<br/>

## Java 13. switch 연산자

switch 문법의 가독성과 실행 속도를 향상 시키기 위해 있는 문법입니다. 자바 13에서의 switch 는 statement가 아닌 operator에 더 가깝고, 이미 처리된 결과를 통해서 해당 연산을 수행합니다.

```java
  public static void switchOperator() {
    System.out.println(swtichExample("a")); // 1
    System.out.println(swtichExample("b")); // 2
    System.out.println(swtichExample("c")); // 3
    System.out.println(swtichExample("d")); // -1
  }

  public static int swtichExample(String s){
    switch (s){
      case "a":
        return 1;
      case "b":
        return 2;
      case "c":
        return 3;
      default:
        return -1;
    }
  }

```

---

**출처**

- https://docs.oracle.com/javase/8/docs/api/org/w3c/dom/Document.html
- https://blog.naver.com/hsm622/222150928707
- https://nipafx.dev/java-13-switch-expressions/
