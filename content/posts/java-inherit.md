---
title: '[Java] 자바 상속'
slug: 06-java-study
date: 2021-01-13
published: true
tags: ['Java', 'Stater', 'Inherit']
series: false,
cover_image: ./images/JavaLogo.jpg
canonical_url: false
description: '자바의 상속에 대해 정리합니다.'
---

# Java Inherit

백기선님의 자바 스터디 6주차, 클래스에 대해 정리해보겠습니다.

공부할 내용

- 자바 상속의 특징
- super 키워드
- 메소드 오버라이딩
- 다이나믹 메소드 디스패치 (Dynamic Method Dispatch)
- 추상 클래스
- final 키워드
- Object 클래스

<br/>

## 자바 상속

상속이란, **부모 클래스의 변수와 메소드를 물려 받는 것**으로 이러한 상속은 코드의 재사용성을 통해 코드의 간결성을 확보해줍니다.

일반적으로 `extends`라는 키워드를 통해 이루어집니다.

### 자바 상속의 특징

자바 상속은 다음의 특징을 가집니다.

- Single inheritance
  - 자바는 단일 상속만 가능합니다.
- Object를 제외한 모든 클래스는 암묵적으로 Object의 서브 클래스입니다.
  - 자바 계층 구조 최상위에는 java.lang.Object 클래스가 존재합니다.
- Multi-level inheritance
  - 자바에서는 상속의 횟수에 제한이 없습니다.

<br/>

## super 키워드

suuper 키워드는 자식클래스가 부모클래스로부터 상속받은 멤버를 사용할 때 사용됩니다.

부모 생성자를 호출하는 경우를 `constructor chanining` 이라고 불립니다.

만약에 자식 클래스의 생성자에서 `super()`를 명시적으로 사용하지 않으면, 컴파일러가 부모 클래스의 기본 생성자를 호출하도록 코드를 삽입되며, 만약 부모 클래스에 기본 생성자가 없으면 컴파일 에러가 발생합니다.

<br/>

## 메소드 오버라이딩

**super 클래스가 가지고 있는 메소드를 서브 클래스에서 새롭게 다른 로직으로 정의하고 싶을 때 사용하는 문법**입니다.

**상속관계에 있는 클래스간에 같은 이름의 메서드를 정의하는 문법**을 오버라이딩이라고 합니다. 이러한 오버라이딩 annotation은 생략할 수도 있습니다.

다음과 같은 규칙을 준수합니다.

|                             | 부모 클래스 instance method | 부모 클래스 static method |
| --------------------------- | --------------------------- | ------------------------- |
| 자식 클래스 instance method | overrides                   | compile error             |
| 자식 클래스 static method   | compile error               | hides                     |

- hides : 부모 클래스의 메소드를 부를 수 없습니다.
- overrides : 오버라이딩 된 메소드의 부모 메소드를 직접적으로 호출할 수 없습니다.

<br/>

## 메소드 디스패치(Method Dispatch)

메소드 디스패치는 **어떤 메소드를 호출할 지 결정하여 실제로 실행시키는 과정**을 의미합니다.

메소드 디스패치는 **정적 메소드 디스패치(Static Method Dispatch), 동적 메소드 디스패치(Dynamic Method Dispatch), 더블 디스패치(Double Dispatch)**로 구성됩니다.

### 정적 메소드 디스패치(Static Method Dispatch)

정적 메소드 디스패치는 구현 클래스를 통해 컴파일 시점에서 컴파일러가 어떤 메소드를 호출할지 명확하게 알고 있는 경우, 컴파일 시 생성된 바이트코드에도 정보가 남아있으면 애플리케이션 실행 전에 호출할 메소드를 결정할 수 있습니다.

```java
public class Animal {
    public String bark() {...}
}

public class Test {
    public static void main() {
        // 스태틱 메소드 디스패치
        Animal animal = new Animal();
        System.out.println(animal.method());
    }
}
```

### 동적 메소드 디스패치(Static Method Dispatch)

인터페이스나 추상 클래스에 정의된 추상 메소드를 호출하는 경우이며 호출되는 메소드가 런타임 시 동적으로 결정됩니다.

인터페이스 또는 추상 클래스로 선언하고 구현/상속 받은 하위 클래스이 인스턴스를 생성합니다.

```java
public interface Animal {
  String bark();
}

public class Dog implements Animal {
  @Override
  public String bark() { . . .
}

public class Test {
    public static void main() {
        // 스태틱 메소드 디스패치
        Animal animal = new Dog();
        System.out.println(animal.method());
    }
}
```

런타임 전에는 컴파일러가 `Dog`가 생성됨을 모름므로 `Animal`이 정의한 `bark()` 메소드만 접근 가능합니다.

### 더블 디스패치(Double Dispatch)

다이나믹 메소드 디스패치가 2번 발생하는 것입니다. 디자인 패턴 중 **방문자 패턴(Visitor Pattern)**과 밀접한 관계를 가지고 있습니다.

- 방문자 패턴 : 여러 객체에 대해 각 객체의 동작들을 지정하는 패턴

```java
public class Dispatch{
    interface Post{
        void postOn(SNS sns);
    }

    static class Text implements Post{
        public void postOn(SNS sns){
            System.out.println(sns.getClass().getSimpleName());
        }
    }

    static class Picture implements Post{
        public void postOn(SNS sns){
            System.out.println(sns.getClass().getSimpleName());
        }
    }

    interface SNS{}
    static class Facebook implements SNS{}
    static class Twitter implements SNS{}

    public static void main(String[] args){
        List<Post> posts = Arrays.asList(new Text(), new Picture());
        List<SNS> sns = Arrays.asList(new Facebook(), new Twitter());
        posts.forEach(p->sns.forEach(s.postOn(s)));
    }
}
```

<br/>

## 추상 클래스

츠상클래스는 클래스를 만들기 위한 일종의 설계도로 인스턴스를 생성할 수 없는 클래스입니다. 이를 사용하기 위해서는 반드시 자식 클래스에서 상속을 받아 클래스를 모두 구현해야합니다.

다음의 형태를 가집니다.

```java
abstract class 클래스이름 {
    ...
}
```

추상 클래스는 반드시 하나 이상의 추상 메서드를 포함하고 있으며, 생성자와 멤버변수, 일반 메서드를 가질 수 있습니다.

다음의 특징을 가집니다.

- 자체 인스턴스 생성이 불가능합니다.
- 생성자와 멤버 변수, 일반 메서드를 모두 가질 수 있습니다.
- 하나 이상의 추상 메서드를 포함합니다.

<br/>

## final 키워드

final 키워드는 엔티티를 한 번만 할당하겠다는 의미로 자바에서는 3가지의 의미로 사용됩니다.

### final 변수

일반적으로 알고 있는 상수를 의미합니다. 생성자나 대입연산자를 통해 단 한번만 초기화 가능한 변수입니다.

### final 메소드

오버라이드하거나 숨길 수 없는 메서드 입니다.

### final 클래스

해당 클래스를 상속할 수 없음을 의미합니다. 상속을 할 수 없기 때문에 상속 계층에서 마지막 클래스라는 의미를 지닙니다.

<br/>

## Object 클래스

`java.lang.Object` 클래스는 모든 클래스의 최상위 클래스입니다.

- `boolean equals(Object obj)`
  - 두 객체가 같은 지 비교합니다.(같으면 true, 틀리면 false)
- `String toString()`
  - 객체의 문자열을 반환합니다
- `protected Object clone()`
  - 객체를 복사합니다.
- `protected void finalize()`
  - 가비지 컬렉션 직전에 객체의 리소스를 정리할때 호출합니다.
- `Class getClass()`
  - 객체의 클레스형을 반환합니다.
- `int hashCode()`
  - 객체의 코드값을 반환합니다.
- `void notify()`
  - wait된 스레드 실행을 재개할 때 호출합니다.
- `void notifyAll()`
  - wait된 모든 스레드 실행을 재개할 때 호출합니다.
- `void wait()`
  - 스레드를 일시적으로 중지할 때 호출합니다.
- `void wait(long timeout)`, `void wait(long timeout, int nanos)`
  - 주어진 시간만큼 스레드를 일시적으로 중지할 때 호출합니다.

모든 클래스는 정의할 때부터 명시적으로 java.lang.Object 클래스를 상속 받게 됩니다. 따라서 위의 함수들은 어떤 클래스에서도 호출이 가능합니다.

---

**출처**

- https://docs.oracle.com/javase/tutorial/java/
- https://velog.io/@roeniss/%EC%9E%90%EB%B0%94-%EA%B8%B0%EC%B4%88%EC%A7%80%EC%8B%9D-%EC%A0%95%EB%A6%AC#6%EC%A3%BC%EC%B0%A8--%EC%83%81%EC%86%8D
- https://blog.naver.com/swoh1227/222181505425
- https://leemoono.tistory.com/20
- https://github.com/mongzza/java-study/blob/main/study/6%EC%A3%BC%EC%B0%A8.md
- https://roeldowney.tistory.com/486
