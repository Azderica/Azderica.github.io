---
title: '[Java] Java Interface'
slug: 00-java-interface
date: 2021-01-08
published: true
tags: ['Java', 'Interface', 'Backend']
series: false,
cover_image: ./images/JavaLogo.jpg
canonical_url: false
description: 'Java Interface에 대해 정리합니다.'
---

# Java Interface

백기선님의 자바 스터디를 알게되어서, 한번 자바에 대한 개념을 스터디를 통해서 잡고 가면 좋을 듯해서 글에 대해서 정리해보겠습니다. 아래는 8주차 내용입니다.

공부할 내용

- 인터페이스 정의하는 방법
- 인터페이스 구현하는 방법
- 인터페이스 레퍼런스를 통해 구현체를 사용하는 방법
- 인터페이스 상속
- 인터페이스의 기본 메소드 (Default Method), 자바 8
- 인터페이스의 static 메소드, 자바 8
- 인터페이스의 private 메소드, 자바 9

## 인터페이스의 개념과 역할

가끔 인터페이스와 추상클래스의 차이에 대해 혼란을 가지고 있는 사람이 있는데, 인터페이스의 가장 큰 특징은 **협업을 위한 기능**이라고 생각합니다. 즉, 가이드 라인이나 규격을 제공해주는 **일종의 설계도**로 이해하면 됩니다.

이러한 인터페이스는 구현이 없으며 **추상 메서드**와 **상수**만을 멤버로 가질 수 있습니다. 다만, Java 8 이후에는 `default method`와 `static method`가 추가되었고, Java 9 이후에는 `private method`를 정의할 수 있습니다.

### 인터페이스를 왜 쓰나요?

- 개발 기간의 단축이 가능합니다.
  - 인터페이스를 통해 분업이 가능합니다.
- 클래스간의 결합도를 낮출 수 있습니다.
  - 코드의 종속성을 줄이고 유지보수성을 높일 수 있습니다.
- 표준화가 가능합니다.
  - 클래스의 기본틀을 제공하여, 정형화된 개발이 가능합니다.
  - **자바의 다형성을 극대화하여서 코드의 수정을 줄이고 유지보수성을 높일 수 있습니다.**

<br/>

## 인터페이스 정의하는 방법

인터페이스의 선언은 class 대신 `interface` 를 사용하며, 접근 제어자는 `default` 혹은 `public`을 사용합니다.

형태는 다음과 같습니다.

```java
public interface 인터페이스 명 {
    // 상수 : 해당 값을 함부로 바꾸지 말고 사용합니다.
    // type 상수명 = value;
    int age = 10;

    // 추상 메소드 : 가이드 라인을 통해 오버라이딩을 재구현해서 사용합니다.
    type 메소드명(parameter1, ...);

    // 디폴트 메소드 : 인터페이스에서 기본적인 부분을 제공하지만, 원하지 않으면 오버라이딩에서 재구현해서 사용합니다.
    default type 메소드명(parameter1, ...){
        // 구현
    }

    // 정적 메소드 : 인터페이스에서 제공하는 것으로 무조건 사용합니다.
    static type 메소드명(parameter1, ...){
        // 구현
    }
}
```

이후에 해당 인터페이스를 상속받는 구현체에서는 추상 메소드를 반드시 구현해야합니다.

<br/>

## 인터페이스 구현하는 방법

인터페이스는 `implements` 키워드를 사용해서 구현할 수 있습니다.

아래는 예제 코드입니다.

```java
public interface Animal {
    public void cry();
}

public class Cat implements Animal {
    @Override
    public void cry(){
        System.out.print("야옹");
    }
}
```

<br/>

## 인터페이스 레퍼런스를 통해 구현체를 사용하는 방법

```java
public interface Animal {
    public void cry();
}

public class Cat implements Animal {
    @Override
    public void cry(){
        System.out.print("야옹");
    }

    public void eat(){
        System.out.print("고등어");
    }
}

public class Dog implements Animal {
    @Override
    public void cry(){
        System.out.print("멍멍");
    }

    public void eat(){
        System.out.print("개사료");
    }
}

public class Main(){
    public static void main(String[] args) {
        Animal cat = new Cat();
        Animal dog = new Dog();

        cat.cry();  // 야옹
        dog.cry();  // 멍멍

        // 캐스팅
        ((Cat) cat).eat();  // 고등어
        ((Dog) dog).eat();  // 개사료

        // 불가능.
        cat.eat();  // error
        dog.eat();  // error
    }
}
```

Animal 클래스로 선언되었기 때문에, 이를 상속받은 메소드를 바로 사용할 수는 없습니다. 다만, 캐스팅을 통해서 호출이 가능합니다.

<br/>

## 인터페이스 상속

인터페이스는 앞서 이야기 했듯이 상속을 받아 사용합니다. 추가적으로 자바에는 다중 상속이 불가능 하지만 인터페이스는 가능합니다.

```java
public interface Tv {
    void turnOn();
}

public interface Internet {
    void internet();
}

public class SmartTv implements Tv, Internet {
    @Override
    public void turnOn() {
        // 구현...
    }

    @Override
    public void internet() {
        // 구현...
    }
}
```

다음과 같이 인터페이스 다중 상속이 가능합니다.

<br/>

## 인터페이스의 기본 메소드 (Default Method), 자바 8

- 인터페이스에서 메소드 선언이 아니라 **구현체**를 제공하는 방법입니다.
- 해당 인터페이스를 구현한 클래스의 어떠한 영향 없이 새로운 기능을 추가하는 방법입니다.
- `default method`는 해당 인터페이스에서 **구현체가 모르는 기능을 구현했기 때문에 리스크가 존재**합니다.
  - 컴파일 에러는 발생하지는 않지만, 특정 구현의 로직에 런타임 에러가 발생가능합니다.

다음과 같은 예제 코드가 있습니다.

```java
public interface Calc {
    public int plus(int i, int j);
    default int exec(int i, int j) {
        return i + j;   // default로 선언함으로 메소드를 구현합니다.
    }
}

public class MyCalc implements Calc {
    @Override
    public int plus(int i, int j){
        return i+j;
    }
}

public class MyCaclExam {
    public static void main(String[] args){
        Calc cal = new MyCalc();
        System.out.println(calc.exec(1, 2));    // output:3
    }
}
```

<br/>

## 인터페이스의 static 메소드, 자바 8

`static method`이므로 상속이 불가능합니다. 인스턴스 없이 수행할 수 있는 작업을 정의할 수 있습니다.

다음은 예제 코드입니다.

```java
public interface Calc {
    static int sum(int i, int j){
        return i + j;
    }
}
```

<br/>

## 인터페이스의 private 메소드, 자바 9

`default method`와 `static method` 모두 내부 method이나, 외부에 공개되는 `public method`이기 때문에 이에 대한 문제가 존재했습니다. 이러한 interface가 다른 곳에서 상속을 하거나 접근하는 것을 막기 위해 `private`이 등장했습니다.

java 9에서는 `private method`와 `private static method`가 새롭게 등장했습니다. 이 방법을 통해서 interface에 대한 캡슐화를 유지할 수 있습니다.

다음은 예제 코드입니다.

```java
public interface Calc {
    private void start(){
        System.out.println("연산 시작")
    }

    static int multiple(int i, int j){
        startMultiple();
        return i * j;
    }

    private static void startMultiple() {
        System.out.println("곱셈 시작");
    }
}
```

default 메소드는 static, instance를 호출할 수 있고, static 메서드에서는 static 메서드만 호출 가능합니다.

---

**출처**

- https://docs.oracle.com/javase/9/language/toc.htm#JSLAN-GUID-E409CC44-9A8F-4043-82C8-6B95CD939296
- https://www.notion.so/4b0cf3f6ff7549adb2951e27519fc0e6
- https://blog.baesangwoo.dev/posts/java-livestudy-8week/
- https://limkydev.tistory.com/197
- https://enjoyplaying.tistory.com/33
- https://wonyong-jang.github.io/java/2021/01/04/Java-Interface.html
