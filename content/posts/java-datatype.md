---
title: '[Java] 데이터 타입, 변수, 배열'
slug: 00-java-datatype
date: 2020-12-30
published: true
tags: ['Java', 'Data', 'Type', 'Array', 'Var']
series: false,
cover_image: ./images/JavaLogo.jpg
canonical_url: false
description: '자바 데이터 타입, 변수, 배열을 사용하는 방법을 익힙니다.'
---

# Java Package

최근 백기선님의 자바 스터디를 알게되어서, 한번 자바에 대한 개념을 스터디를 통해서 잡고 가면 좋을 듯해서 글에 대해서 정리해보겠습니다. 아래는 2주차 내용입니다.

공부할 내용

- 프리미티브 타입 종류와 값의 범위 그리고 기본 값
- 프리미티브 타입과 레퍼런스 타입
- 리터럴
- 변수 선언 및 초기화하는 방법
- 변수의 스코프와 라이프타임
- 타입 변환, 캐스팅 그리고 타입 프로모션
- 1차 및 2차 배열 선언하기
- 타입 추론, var

<br/>

## 프리미티브 타입 종류와 값의 범위 그리고 기본 값

프리미티브 타입은 **기본 타입**을 의미합니다.

자바의 기본 타입은 8종류입니다.

| 타입 종류 | 메모리 크기 | 값 범위                                                | 기본 값  |
| --------- | ----------- | ------------------------------------------------------ | -------- |
| byte      | 1byte       | -128 ~ 127                                             | 0        |
| short     | 1byte       | -32,768 ~ 32,767                                       | 0        |
| int       | 2byte       | -2,147,483,648 ~ 2,147,483,647                         | 0        |
| long      | 4byte       | -9,223,372,036,854,775,808 ~ 9,223,372,036,854,775,807 | 0L       |
| float     | 8byte       | (3.4 X 10^-38) ~ (3.4 X 10^38)                         | 0.0F     |
| double    | 4byte       | (1.7 X 10^-308) ~ (1.7 X 10^308)                       | 0.0      |
| char      | 8byte       | 0 ~ 65,535                                             | '\u0000' |
| boolean   | 2byte       | true/false                                             | false    |

<br/>

## 프리미티브 타입과 레퍼런스 타입

### Primitive type

- 기본 타입
- byte, short, signed/unsigned int, signed/unsigned long, float, double, boolean, char
- not object
- 값을 저장합니다

### Reference type

- 참조 타입
- class, interface, enum, array, String type
- 주소를 저장합니다.

<br/>

## 리터럴

- **데이터**를 의미합니다.
- 변수의 값이 변하지 않습니다.

<br/>

## 변수 선언 및 초기화하는 방법

일반적으로 초기화하는 방법으로 2가지 방법이 있습니다.

### 1. 변수 선언 후 이후에 초기화

```java
int num;
System.out.println(num);  // error
num = 1;
System.out.println(num);  // output : 1
```

### 2. 변수 선언과 동시에 초기화

```java
int num = 2;
System.out.println(num);  // output : 2
```

<br/>

## 변수의 스코프와 라이프타임

프로그램에서 사용되는 변수들은 사용 가능한 범위를 가집니다. 그 범위를 **변수의 스코프**라고 합니다. 변수가 선언된 블럭이 그 변수의 사용 범위입니다.

```java
public class VarScopeExam {
  int globalValue = 10;

  public void localScope(int value){
    int localValue = 20;

    System.out.println(globalValue);  // 전체 범위
    System.out.println(localValue);   // localScope 범위
    System.out.println(value);        // localScope 범위
  }
}
```

<br/>

## 타입 변환, 캐스팅 그리고 타입 프로모션

타입 변환은 **하나의 타입을 다른 타입으로 바꾸는 것을 의미**합니다.

### Primitive type

- Widening type cast : 더 넓은 타입으로 형을 변환합니다.
  - ex. int to long, byte to short...

```java
int value = 1;
long value2 = value;
```

- Narrow type case : 더 좁은 타입으로의 형을 변환합니다.
  - 값이 손실될 수 있습니다.
  - ex. long to int, short to byte...

```java
long value = 10;
int value2 = value;
```

### Reference type

- Inheritance 관계에서만 가능
- Upcast : subclass -> superclass
  - 모든 subclass는 superclass의 컨텐츠를 가지고 있으므로, superclass 로의 casting이 가능합니다.
- Downcase : superclass -> subclass
  - 모든 superclass는 subclass의 컨텐츠를 가지고 있지 않을 수 도 있습니다. 그래서 오류가 발생할 수 있습니다.

<br/>

## 1차 및 2차 배열 선언하기

<br/>

## 타입 추론, var

**타입 추론**은 **변수 타입을 명시하지 않고 컴파일러가 데이터 타입이 무엇인지 추론한다는 것을 의미**합니다.

var

- 지역 변수에서만 사용 가능합니다.
- 선언과 동시에 반드시 초기화를 해야합니다.
- null 초기화하면 작동하지 않습니다.
- 람다 표현식에는 var을 사용할 수 없습니다.
- 타입이 없어서 배열에 초기값을 넘겨도 작동하지 않습니다.

---

**출처**
