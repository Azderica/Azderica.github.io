---
title: '[Java] Java Generic'
slug: 14-java-study
date: 2021-02-28
published: true
tags: ['Java', 'Stater', 'Generic']
series: false
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

위의 `T`를 **타입 변수(type variable)** 라고 합니다.

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

일반적으로 다음과 같은 타입 매개변수를 주로 사용합니다.

- E(Element), K(Key), N(Number), T(Type), V(Value)

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

### 바운디드 타입

제네릭 타입에서 타입 인자로 사용할 수 있는 타입을 제한하는 경우가 있을 수 있습니다. 이때 **바운디드 타입이 사용**됩나다.

바운디드 타입 파라미터를 사용하기 위해서는 `extends`를 사용합니다.

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

와일드카드는 기호 `?`로 표현을 하며, 와일드 카드는 어떠한 타입도 될 수 있습니다.

다음과 같이 사용할 수 있습니다.

- `<? extends T>` : 와일드 카드의 상한 제한, T와 그 자손들만 가능
- `<? super T>` : 와일드 카드의 하한 제한, T와 그 조상들만 가능
- `<?>` : 제한이 없으며 모든 타입이 가능합니다. `<? extends Object>`와 동일합니다.

#### `<? extends T>`, 와일드 카드의 상한 제한 예제

```java
class Juicer{
  static Juice makeJuice(FruitBox<? extends Fruit> box){
    String temp = "";
    for (Fruit fruit : box.getList()) {
      temp += fruit + " ";
    }
    return new Juice(temp);
  }
}
```

#### `<? super T>` : 와일드 카드의 하한 제한 예제.

```java
class FruitComp implements Comparator<Fruit> {
  public int compare(Fruit t1, Fruit t2) {
   return t1.weight - t2.weight;
  }
}
```

<br/>

## 제네릭 메서드

메서드의 선언부에 제네릭 타입이 선언된 메서드를 제네릭 메서드라고 합니다.

일반적으로 컬렉션 메소드 `Collections.sort()`와 같은 메소드가 대표적인 제네릭 메서드입니다.

```java
static <T> void sort(List<T> list, Comparator<? super T> c)
```

다만, 제네릭 메서드와 제네릭 클래스의 매개변수는 별개의 것을 의미합니다.

```java
class FruitBox<T> { // T-1
  ...
  static <T> void sort(List<T> list, Comparator<? super T> c) {
    ... // T - 2
  }
  // T-1과 T-2는 다릅니다.
}
```

<br/>

## 자바 제네릭 타입의 제거 (Erasure)

컴파일러는 제네릭 타입을 이용해서 소스파일을 체크하고, 필요한 곳에 형변환을 넣어주고 제네릭 타입을 제거합니다.

컴파일된 파일(\*.class)에는 제네릭 타입이 없기 때문에 이를 처리해줄 필요가 있습니다. 따라서 이전의 소스코드와의 호환성을 위해서 만들어졌습니다.

다음의 순으로 진행됩니다.

#### 1. 제네릭 타입의 경계를 제거합니다.

- `<T extends Fruit>` : Fruit로 치환됩니다.
- `<T>` : Object로 치환됩니다.

AS-IS

```java
class Box<T extends Fruit> {
  void add(T t) {
    ...
  }
}
```

TO-Be

```java
class Box {
  void add(Fruit t){
    ...
  }
}
```

#### 2. 제네릭 타입을 제거한 후에 타입이 일치하지 않는 경우, 형변환을 추가합니다.

- 일반적으로 Object 타입으로 변환이 일어나지만, 와일드 카드가 포함시 적절한 타입으로 형변환이 추가됩니다.

AS-IS

```java
T get(int i){
  return list.get(i);
}
```

TO-Be

```java
Fruit get(int i){
  return (Fruit)list.get(i);
}
```

---

**출처**

- https://www.notion.so/4735e9a564e64bceb26a1e5d1c261a3d
- https://rockintuna.tistory.com/102
- https://b-programmer.tistory.com/275
- https://blog.naver.com/hsm622/222251602836
- https://sujl95.tistory.com/73
- https://redbean88.github.io/study/whiteship-study-14week/
