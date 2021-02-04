---
title: '[Java] Java Enum'
slug: 11-java-study
date: 2021-02-01
published: true
tags: ['Java', 'Stater', 'Enum']
series: false,
cover_image: ./images/JavaLogo.jpg
canonical_url: false
description: 'Java Enum에 대해 정리합니다.'
---

# Java Enum

11주차 내용은 자바의 Enum에 관련된 내용입니다.

공부할 내용

- enum 정의하는 방법
- enum이 제공하는 메소드 (values()와 valueOf())
- java.lang.Enum
- EnumSet

## Enum 정의

**enum**은 열겨형이라 불리며, 관련된 상수를 편리하게 선언하기 위해 상수를 여러개 정의할 때 사용됩니다.

간단하게 다음과 같이 선언할 수 있습니다.

```java
public enum Language {
    JAVASCRIPT, JAVA, PYTHON, TYPESCRIPT
}
```

이를 사용할려면 다음과 같이 사용할 수 있습니다.

```java
public static void printEnumOrdinal() {
    System.out.println(Language.JAVASCRIPT.ordinal());
    System.out.println(Language.JAVA.ordinal());
    System.out.println(Language.PYTHON.ordinal());
    System.out.println(Language.TYPESCRIPT.ordinal());
}
```

**output**

![output-1](https://user-images.githubusercontent.com/42582516/106461852-ae9a6680-64d8-11eb-9431-d97516e46b24.png)

다음과 같기 때문에 순서를 조심히 해야합니다.

### 상수 데이터 추가

다음처럼 상수 데이터를 넣어줄 수도 있습니다.

```java
public enum ItCompany {
    GOOGLE(100),
    APPLE(200),
    NAVER(300),
    KAKAO(400);

    private int value;

    ItCompany(int value) {
        this.value = value;
    }

    public int value() {
        return this.value;
    }
}
```

<br/>

## Enum 값 사용

Enum에서 값을 꺼내는 방법은 다음과 같습니다.

- `Language.JAVASCRIPT`
- `Language.valueOf("JAVA")`
- `Enum.valueOf(Language.class, "PYTHON")`
- `Language.TYPESCRIPT.name()`

해당 코드의 결과는 다음과 같이 나옵니다.

![output-2](https://user-images.githubusercontent.com/42582516/106462114-fde09700-64d8-11eb-80bf-fdd498b1c92f.png)

<br/>

## Enum 메소드

enum에서 제공되는 메소드는 다음과 같습니다.

- `ordinal()` : enum의 순서
- `name()` : 각 요소들의 이름
- `valeOf()` : 문자열로 enum 요소의 이름을 찾아서 이름을 리턴
- `values()` : 모든 enum의 요소들을 배열로 만들어줍니다.
  - `Language[] values = Language.values();`
  - output : JAVASCRIPT, JAVA, PYTHON, TYPESCRIPT
- `compareTo()` : 비교를 할 수 있습니다.
  - A.compareTo(B) : 같으면 0, A > B인 경우 1, A < B 인 경우는 -1 입니다.

<br/>

## java.lang.Enum

Enum클래스를 보면 다음과 같습니다.

```java
public abstract class Enum<E extends Enum<E>>
    implements Constable, Comparable<E>, Serializable {

    private final String name;

    private final int ordinal;

    // method
}

```

이 해당 `java.lang.enum`은 모든 열겨형의 조상으로서, 여러 메소드 등을 사용할 수 있습니다.

그 중에서 여러 눈에 뛰는 메소드로는 아래와 같습니다.

| Method                                      | Description                                        |
| ------------------------------------------- | -------------------------------------------------- |
| `Class<E> getDeclaringClass()`              | 열거형의 Class 객체 반환                           |
| `String name()`                             | 열거형 상수의 이름을 문자열로 반환                 |
| `int ordinal()`                             | 열거형 상수가 정의된 순서 반환                     |
| `T valueOf(Class<T> enumType, String name)` | 지정된 열거형에서 name과 일치하는 열거형 상수 반환 |

<br/>

## Enum 멤버 추가

열거형을 구분할 때나 확인하는 경우에는 ordinal() 보다는 멤버를 추가하는 방식이 일반적으로는 좋습니다. 특히 불연속적인 경우가 필요할 경우에는 다음과 같이 사용하는 방식이 중요합니다.

```java

```

<br/>

## EnumSet

Enum을 사용하여서 Set 자료구조를 만들 수 있습니다.

- `allOf` : enum에서 정의된 정보를 모두 추가할 수 있습니다.
  - `EnumSet.allOf(Language.class)`
- `noneOf` : 아무것도 추가하지 않습니다.
- `of` : 요소를 넣을 수 있습니다.
  - `EnumSet<Language> languageSet = EnumSet.of(Language.JAVA);`

그 외에도 다양한 메소드가 있습니다.

---

**출처**

- https://b-programmer.tistory.com/262
- https://wisdom-and-record.tistory.com/52
- https://www.notion.so/Enum-6ffa87530c424d8ab7a1b585bfb26fa2
- https://parkadd.tistory.com/50
