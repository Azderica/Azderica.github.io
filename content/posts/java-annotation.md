---
title: '[Java] Java Annotation'
slug: 12-java-study
date: 2021-02-05
published: true
tags: ['Java', 'Stater', 'Annotation']
series: false,
cover_image: ./images/JavaLogo.jpg
canonical_url: false
description: 'Java Annotation에 대해 정리합니다.'
---

# Java Annotation

12주차 내용은 자바의 Annotation 에 대한 내용입니다.

공부할 내용

- 애노테이션 정의하는 방법
- `@retention`
- `@target`
- `@documented`
- 애노테이션 프로세서

<br/>

## 어노테이션(Annotation) 이란

일반적으로 Annotation 을 해석하면 주석이라는 의미를 가집니다.

다만, 자바에서의 Annotation은 `//` 나 `/* */` 등의 주석과는 차이가 있습니다.

자바의 어노테이션은 Java 5부터 등장하였으며 어노테이션이 붙은 코드는 어노테이션에 구현된 정보에 따라 연결되는 방향이 결정됩니다. 즉, **비지니스 로직에는 영향이 없지만 해당 타켓의 연결방법이나 소스코드의 구조를 변경할 수 있습니다.**

이를 좀 더 간단하게 설명하자면, 일종의 라벨의 개념으로 **역할은 주석과 비슷하지만 코드를 작성할 수 있습니다.**. 이러한 목적은 **소스 코드에 메타데이터를 표현하는 것**입니다.

<br/>

## 어노테이션(Annotation) 정의 방법

어노테이션은 다음과 같은 구조를 가집니다.

```java
public @interface AnnotationEx {
  // content
}
```

Annotation은 `java.lang.annotation.Annotation` 을 상속받습니다.

좀 더 자세하게 어노테이션을 선언한다면 다음과 같이 선언할 수 있습니다.

```java
package week12;

import java.lang.annotation.*;

@Inherited  // 자식이 상속 받을 수 있음
@Documented // 문서에도 어노테이션 정보가 표현됨
@Retention(RetentionPolicy.RUNTIME) // 컴파일 이후 JVM에 의해 접근 가능
//@Retention(RetentionPolicy.CLASS) // 컴파일러가 클래스를 참조할 때 까지 유효
//@Retention(RetentionPolicy.SOURCE) // 어노테이션 정보는 컴파일 이후 사라짐
@Target({
        ElementType.PACKAGE, // 패키지 선언시
        ElementType.TYPE, // 타입 선언시
        ElementType.CONSTRUCTOR, // 생성자 선언시
        ElementType.FIELD, // 멤버 변수 선언시
        ElementType.METHOD, // 메소드 선언시
        ElementType.ANNOTATION_TYPE, // 어노테이션 타입 선언시
        ElementType.LOCAL_VARIABLE, // 지역 변수 선언시
        ElementType.PARAMETER, // 매개 변수 선언시
        ElementType.TYPE_PARAMETER, // 매개 변수 타입 선언시
        ElementType.TYPE_USE // 타입 사용시
})
public @interface CustomAnnotation {
    /* enum 타입을 선언 */
    public enum Quality {BAD, GOOD, VERYGOOD}
    /* String은 기본 자료형은 아니지만 사용 가능합니다. */
    String value();
    /* 배열 형태로도 사용할 수 있습니다. */
    int[] values();
    /* enum 형태를 사용하는 방법입니다. */
    CustomAnnotation.Quality quality() default CustomAnnotation.Quality.GOOD;
}
```

[출처](https://jdm.kr/blog/216)

<br/>

## 어노테이션(Annotation) 규칙

어노테이션은 다음의 규칙이 적용됩니다.

- 요소의 타입은 기본, String, enum, Annotation, Class만 허용됩니다.
- 매개변수는 선언할 수 없습니다.
- 예외를 선언할 수는 없습니다.
- 요소를 타입 매개변수로 정의할 수 없습니다.

<br/>

## 표준 어노테이션(Annotation)

자바에서 제공되는 어노테이션은 크게 2가지로 구성되며, 하나는 자바 코드를 사용할 때 사용되는 어노테이션이고 다른 하나는 어노테이션의 정의를 위해 필요한 것입니다.

<br/>

> 기본적으로 제공하는 어노테이션

### `@Override`

- 메소드가 오버라이드 됐는지 검증합니다
- 부모 클래스나 구현할 인터페이스에서 해당 메소드를 찾지못하면 컴파일 오류가 발생합니다.

### `@Deprecated`

- 메소드를 사용하지 않도록 유도합니다.
- 사용시 컴파일 경고를 일으킵니다.

### `@SuppressWarnings`

- 컴파일 경고를 무시하도록 합니다.

### `@SafeVarargs`

- 제네릭 같은 가변인자 매개변수를 사용시 경고를 무시합니다.
- 자바 7이상에서 적용됩니다.

### `@FunctionalInterface`

- 람다 함수등을 위한 인터페이스를 지정합니다.
- 메소드가 없거나 두개 이상이 되면 컴파일 오류가 납니다.
- 자바 8이상에서 적용됩니다.

<br/>

> Meta Annotations(메타 어노테이션)

### `@Retention`

- 어노테이션의 범위입니다.
- 어떤 시점까지 어노테이션의 영향이 미치는지를 결정합니다.

### `@Documented`

- 문서에도 어노테이션의 정보가 표현됩니다.

### `@Target`

- 어노테이션이 적용할 위치를 결정합니다.

| 요소 타입      | 대상                                 |
| -------------- | ------------------------------------ |
| CONSTRUCTOR    | 생성자 선언시                        |
| FIELD          | 필드 값 선언시                       |
| LOCAL_VARIABLE | 지역 변수 선언시                     |
| METHOD         | 메소드 선언시                        |
| PACKAGE        | 패키지 선언시                        |
| PARAMETER      | 매개 변수 선언시                     |
| TYPE           | 클래스, 인터페이스, enum 등의 선언시 |

### `@Inherited`

- 자식 클래스가 어노테이션을 상속받을 수 있습니다.

### `@Repeatable`

- 반복적으로 어노테이션을 선언할 수 있습니다.

| 요소 타입 | 대상                                    |
| --------- | --------------------------------------- |
| SOURCE    | 어노테이션 정보는 컴파일 이후 사라짐    |
| CLASS     | 컴파일러가 클래스를 참조할 때 까지 유효 |
| RUNTIME   | 컴파일 이후 JVM에 의해 접근 가능        |

<br/>

## 어노테이션(Annotation) 프로세서

자바 컴파일러의 컴파일 단계에서 유저가 정의한 어노테이션의 소스코드를 분석하고 처리하기 위해 사용되는 훅입니다. 컴파일 에러나 컴파일 경고를 만들기도 하고 소스코드와 바이트 코드를 내보내기도 합니다.

대표적인 예제로 **롬복(Lombok)** 라이브러리가 있습니다. 이 롬복 라이브러리를 사용하면 `@Getter`, `@Setter` 등을 사용하면 get이나 set, toString() 등을 선언할 필요없이 컴파일 시에 미리 생성되어 편리하게 사용할 수 있습니다.

---

**출처**

- https://www.nextree.co.kr/p5864/
- https://jdm.kr/blog/216
- https://sujl95.tistory.com/67
- https://gowoonsori.site/java/annotation/
- https://b-programmer.tistory.com/264
- https://sujl95.tistory.com/67
