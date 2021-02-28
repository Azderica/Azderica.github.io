---
title: '[Java] Java Generic'
slug: 14-java-study
date: 2021-02-28
published: true
tags: ['Java', 'Stater', 'Generic']
series: false,
cover_image: ./images/JavaLogo.jpg
canonical_url: false
description: 'Java Generic에 대해 정리합니다.'
---

# Java Generic

백기선님의 자바 스터디 14주차 내용입니다.

공부할 내용

- 제네릭 사용법
- 제네릭 주요 개념 (바운디드 타입, 와일드 카드)
- 제네릭 메소드 만들기
- Erasure

<br/>

## 자바 제네릭

자바 제네릭스는 JDK 1.5에서 처음 도입되었습니다.

자바의 제네릭은 다양한 타입의 객체를 다루는 메소드나 컬렉션 클래스에 **컴파일 시의 타입 체크(compile-time type check)를 해주는 기능**입니다.

그래서 다음과 같은 **장점**이 있었습니다.

- 객체의 타입을 컴파일 시에 체크하기 때문에 **객체의 타입 안정성을 높이고 형변환의 번거로움이 줄어듭니다.**
  - 타입의 안정성이 높다는 것은 의도하지 않은 타입의 객체가 저장되는 것을 막고, 저장된 객체를 꺼내올 때 원래의 타입과 다른 타입으로 잘못 형변환되어 발생할 수 있는 오류를 줄여줍니다.

따라서 **제네릭의 장점**은 다음과 같습니다.

- **타입의 안정성을 제공합니다.**
  - 컴파일 타임에 타입 체크를 하기 때문에 런타임에서 ClassCastException과 같은 UncheckedException을 보장합니다.
- 타입체크와 형변환을 생략할 수 있으므로 **코드가 간결**해집니다.

### 제네릭 클래스 선언

다음과 같이 클래스가 있을 때,

```java
class Data {
    Object data;

    public Object getData() { return data; }

    public void setData(Object data) {
        this.data = data;
    }
}
```

아래처럼 제네릭 클래스로 변경할 수 있습니다.

```java
class Data<T> {
    T data;

    public T getData() { return data; }

    public void setData(T data) {
        this.data = data;
    }
}
```

위의 `T`를 **타입 변수(type variable)**라고 합니다.

이를 사용하면 다음과 같이 사용가능합니다.

```java
public class Main {
    public static void main(String[] args) {
        Data<String> data = new Data<>();
        data.setData("New String data");
        System.out.println(data.getData());
        // output : New String data
    }
}
```

일반적으로 Type이라는 단어의 첫 스펠링을 따서 T라고 하며, T가 아닌 다른 것을 사용해도 됩니다.

일반적으로 상황에 맞는 경우의 약자를 사용합니다. 다음과 같은 예제가 있습니다.

- `ArrayList<E>`
  - E 는 Element의 약자입니다.
- `Map<K, V>`
  - 타입 변수가 여러개인 경우는 콤마로 구분해서 나열합니다.
  - K는 Key, V는 Value를 의미합니다.

<br/>

## 자바 제네릭의 주요 개념

### 자바 제네릭 용어

```java
class Data<T>
```

- `Data<T>` : 제네릭 클래스
- `T` : 타입 변수
- `Data` : 원시 타입(raw type)

### 자바 제네릭의 제한

자바 제네릭은 인스턴스별로 다르게 동작하도록 만들었기 때문에 여러 기능을 제공합니다.

다만 다음의 특징을 가지고 있습니다.

- static 멤버에 타입 변수 T를 사용할 수 없습니다.
  - `static T staticItem` : 불가능
- 제네릭 타입의 배열을 생성하는 것은 허용하지 않습니다.
  - `T[] itemArray` : 불가능
- 참조 변수와 생성자 대입된 타입이 일치해야합니다.
  - `Box<Apple> appleBox = new Box<Grape>()` : 불가능
  - `Box<Apple> appleBox = new Box<Apple>()` : 가능
  - `Box<Apple> appleBox = new FruitBox<Apple>()` : 가능
    - `FruitBox<T> extends Box` : 상속인 경우에 한해서 가능합니다.

자바 제네릭 타입에 `extends`를 사용하면, 특정 타입의 자손들만 대입할 수 있습니다.

```java
public class FruitBox<T extends Fruit> extends Box {}
```

인터페이스를 구현하는 경우에도 `implements`를 사용하지 않으며, `extends`를 사용합니다.

```java
public class FruitBox<T extends Eatable> extends Box {}
```

자식이면서 인터페이스를 같이 구현하는 경우에는 다음과 같이 사용할 수 있습니다.

```java
public class FruitBox<T extends Fruit & Eatable> extends Box {}
```

### 와일드 카드

### 자바 제네릭 타입의 제거
