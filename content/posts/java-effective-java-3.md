---
title: '[Java] Effective Java, 클래스와 인터페이스'
slug: 03-java-effective-java
date: 2021-04-21
published: true
tags: ['Java', 'Stater', 'Effective Java', 'Class', 'Interface']
series: false
cover_image: ./images/EffectiveJava.jpeg
canonical_url: false
description: 'Effective Java 책 중, ch4. 클래스와 인터페이스에 대해 정리합니다.'
---

# 클래스와 인터페이스

Class와 Interface는 추상화의 기본 단위이며, 이를 위해 여러 요소 등을 사용할 수 있습니다.

- [클래스 란](https://azderica.github.io/05-java-study/)
- [인터페이스 란](https://azderica.github.io/08-java-study/)

## Item 15. 클래스 및 멤버의 접근성을 최소화합니다.

- 정보 은닉은 개발, 테스트, 최적화, 사용, 이해 및 수정에서 큰 용이성을 가집니다.
- **각 클래스 또는 멤버를 가능한 한 액세스 할 수 없게 처리합니다.**

액세스 수준은 다음과 같이 4가지로 구성됩니다.

- private : 선언된 최상위 클래스에서만 액세스 가능
- package-private(default) : 선언된 패키지의 모든 클래스에서 액세스 가능
- protected : 선언된 클래스의 하위 클래스 및 선언된 패키지의 모든 클래스에서 액세스 가능
- public : 어디서나 액세스 가능

추가적으로 지켜야하는 룰은 다음과 같습니다.

- public 클래스의 인스턴스 필드는 public이면 안됩니다.
- **변경가능한 public 필드가 있는 class는 일반적으로 스레드로부터 안전하지 않습니다.**
- 클래스에 public static final array field 또는 이러한 필드를 반환하는 접근자가 있으면 안됩니다.
  - 해결책은 2개가 있습니다.
  - public array를 비공개로 바꾸고, public static 목록에 추가합니다.
  - array를 private로 만들고, public method를 추가합니다.

```java
// 잠재적인 보안 구멍
public static final Thing[] VALUES = {...};
```

**결론적으로, 프로그램 요소의 접근성을 최대한 줄여야합니다.**

> 고민 점.

- 모든 메서드에 테스트 코드를 작성하는 것이 중요하다고 생각하는데, private으로 선언해버리면 테스트 코드에서 쓸 수가 없어서 어떤식으로 해야할지.

<br/>

## Item 16. public class에서는 public field가 아닌, 접근자 메소드를 사용합니다.

```java
class Point {
  // 이런식으로 짜면, 캡슐화의 이점이 없습니다.
  public double x;
  public double y;
}
```

- 클래스가 패키지 외부에서 액세스 가능한 경우, 접근자 메소드를 제공합니다.
- 그러나, 클래스가 `package-private 클래스`이거나 `private 중첩 클래스`인 경우, 데이터 필드를 노출하는데 본질적인 문제는 없습니다.

<br/>

## Item 17. 변경 가능성을 최소화합니다.

분변 클래스는 단순히 인스턴스를 수정할 수 없는 클래스이며 이는 설계, 구현 및 사용하기에 더 쉬우며 오류 가능성이 적고 더 안전합니다.

클래스를 불변으로 만들려면 `5가지 규칙`을 지켜야합니다.

- 객체의 상태(state)를 수정하는 메소드를 제공하면 안됩니다.
- 클래스를 확장할 수 없는지 확인합니다.
- 모든 필드를 final으로 만듭니다.
- 모든 필드를 private로 설정합니다.
- 변경 가능한 구성 요소에 대한 독점적인 액세스를 보장합니다.

변경 불가능한 객체는 이러한 장점을 가지고 있습니다.

- 단순합니다.
- 생성된 시점의 상태를 파괴될 때까지 그대로 간직합니다.
- 스레드로부터 안전하며 동기화가 필요하지 않습니다. 그렇기에 이러한 객체는 자유롭게 공유할 수 있습니다.
- 다른 개체를 위해서 좋은 **building block**을 만듭니다.
- 상태는 변경되지 않기 때문에, 일시적인 불일치 가능성이 없습니다.

다만 이러한 단점을 가지고 있습니다.

- 값이 다르면 반드시 독립된 객체로 만들어야합니다.
- `getter`가 있다고 반드시 `setter`가 필요한 것은 아닙니다.
- 대부분이 장점이며, 단점은 단시 일정 상황에서 잠재석인 성능 저하가 발생할 수 있습니다. 다만 모든 클래스를 불변으로 만들 수 없습니다.
- 대부분의 클래스를 변경할 수 있는 부분으로 최소화해야합니다.
- 그리고 다른 이유가 없으면, 모든 필드를 private final로 선언해야합니다.
- 생성자는 모든 불변성을 설정하여, 완전히 초기화된 객체를 만들어야합니다.

<br/>

## Item 18. Inheritance(상속)보다 Composition(구성)을 선호합니다.

상속은 코드 재사용을 달성하는 방법이지만 좋은 방법은 아닙니다.

- 메서드 호출과 달리 상속은 캡슐화를 위반합니다.
- 즉, 상속의 취약점을 피하기 위해서는 상속 대신 컴포지션과 전달을 사용하는 것이 좋습니다.

특히 래퍼 클래스로 구현할 적당한 인터페이스가 있다면 더 사용하는 것이 좋습니다. 아래는 그러한 좋은 케이스입니다.

```java
// Wrapper Class - 상속 대신 합성을 사용하는 경우.
public class InstrumentedSet <E> extends ForwardingSet <E> {
  private int addCount = 0;

  public InstrumentedSet (Set <E> s) { super(s) }

  @Override public boolean add(E e) {
    addCount++;
    return super.add(e);
  }

  @Override public boolean addAll(Collection<? extends E> c) {
    addCount += c.size();
    return super.addAll(c);
  }

  public int getAddCount() {
    return addCount;
  }
}

// Reusable forwarding class
public class ForwardingSet<E> implements Set<E> {
  private final Set<E> s;
  public ForwardingSet(Set<E> s) { this.s = s; }
  public void clear() { s.clear(); }

  public boolean contains(Object o) { return s.contains(o); }
  public boolean isEmpty()          { return s.isEmpty();   }
  public int size()                 { return s.size();      }
  public Iterator<E> iterator()     { return s.iterator();  }
  public boolean add(E e)           { return s.add(e);      }
  public boolean remove(Object o)   { return s.remove(o);   }
  public boolean containsAll(Collection<?> c) { return s.containsAll(c); }
  public boolean addAll(Collection<? extends E> c) { return s.addAll(c);      }
  public boolean removeAll(Collection<?> c) { return s.removeAll(c);   }
  public boolean retainAll(Collection<?> c) { return s.retainAll(c);   }
  public Object[] toArray()          { return s.toArray();  }
  public <T> T[] toArray(T[] a)      { return s.toArray(a); }
  @Override public boolean equals(Object o) { return s.equals(o);  }
  @Override public int hashCode()    { return s.hashCode(); }
  @Override public String toString() { return s.toString(); }
}
```

위와 같은 코드는 인터페이스를 통해서 **클래스의 디자인이 가능하며 매우 유연**합니다.

상속은 하위 클래스가 실제로 수퍼 클래스의 하위 유형인 상황에서만 적절합니다. 즉, `is-a` 관계인 경우에만 주로 사용하는 것이 좋습니다.

<br/>

## Item 19. 상속을 고려해 설계하고 문서화합니다. 그렇지 않으면 상속을 사용하지 않습니다.

상속을 위해 클래스를 설계하고 문서화하는 것은 아래를 의미합니다.

- 클래스는 메서드 재정의의 효과를 정확하게 문서화해야합니다. 즉, **클래스는 재정의 가능한 메서드의 자체 사용을 문서화해야합니다.**
- 클래스 내부 동작 과정 중간에 끼어들 수 잇는 훅을 잘 선별해서 `protected` 메서드 형태로 수정해야할 수도 있습니다.
- 상속용으로 설계한 클래스는 배포전에 하위 클래스를 작성하여 클래스를 테스트해야합니다.
- 상속용 클래스의 생성자는 재정의 가능한 메서드를 직접 혹은 간접으로 호출하면 안됩니다.
- clone이나 readObject 모두 직접적이나 간접적으로든 재정의 가능 메서드를 호출하면 안됩니다.

즉, 클래스를 상속용으로 설계하려면 매우 까다로우며 제약사항이 있습니다. 이를 해결하는 좋은 방법은 상속용으로 설계하지 않는 클래스는 상속을 금지합니다. (`final`이나 외부접근이 불가능하도록 클래스를 구성합니다./)

<br/>

## Item 20. 추상 클래스보다는 인터페이스를 선호합니다.

자바에서는 type을 구현하는 두가지 방법은 인터페이스와 추상클래스가 있습니다.

- 기존클래스를 쉽게 개조하여 새 인터페이스를 구현할 수 있습니다.
- 인터페이스는 `믹스인(mixin)`를 정의하는 것에 이상적입니다.
  - mixin : 클래스가 기본유형에 추가하여 구현할 수 있는 유형이며 선택적 동작을 제공함
- 인터페이스는 계층구조가 없는 타입 프레임워크를 만들 수 있습니다.

```java
public interface Singer {
  AudioClip sing(Song s);
}

public interface Songwriter {
  Song compose (int chartPosition);
}

public interface SingerSongwriter extends Singer, Songwriter {
  AudioClip strum();
  void actSensitive();
}
```

- 인터페이스는 wrapper 클래스를 통해 안전하고 강력한 기능 향상을 가능하게합니다.

### Template Method Pattern

인터페이스와 함께, abstract skeletal 구현 클래스를 제공해서 장점을 결합한 패턴입니다. 인터페이스는 유형을 정의하고, 기본 메소드를 제공하며 skeletal 구현하며 클래스는 나머지 non-primitive 인터페이스를 구현합니다.

인터페이스 자체에 있는 기본 메소드의 이점을 사용할 수 있고 skeletal 구현 클래스는 구현의 작업을 지원할 수 있습니다,.

```java
// Skeletal implementation class
public abstract class AbstractMapEntry<K,V> implements Map.Entry<K,V> {
  // Entries in a modifiable map must override this method
  @Override public V setValue(V value) {
    throw new UnsupportedOperationException();
  }

  // Implements the general contract of Map.Entry.equals
  @Override public boolean equals(Object o) {
    if (o == this)
      return true;
    if (!(o instanceof Map.Entry))
      return false;
    Map.Entry<?,?> e = (Map.Entry) o;

    return Objects.equals(e.getKey(), getKey())
      && Objects.equals(e.getValue(), getValue());
  }

  // Implements the general contract of Map.Entry.hashCode
  @Override public int hashCode() {
    return Objects.hashCode(getKey())
      ^ Objects.hashCode(getValue());
  }

  @Override public String toString() {
    return getKey() + "=" + getValue();
  }
}
```

- skeletal 구현은 상속을 위해 설계되었으므로 skeletal 구현에서는 좋은 문서가 절대적으로 필요합니다.

<br/>

## Item 21. 인터페이스는 구현하는 쪽을 생각해 설계합니다.

Java 8 이후로, default method 구성이 추가되었습니다. 또한 주로 람다 사용을 용이하기 위해서 Java 8의 핵심 Collection Interface에 많은 기본 메서드가 추가됩니다. Java의 라이브러리의 기본 메소드는 잘 구현되어 있으며, 대부분 제대로 작동합니다.

그러나 **모든 가능한 구현의 모든 불변을 유지하는 default 메서드를 작성하는 것은 어렵습니다.**

```java
// Java 8의 Collection 인터페이스에 추가 된 기본 메소드
default boolean removeIf (Predicate <? super E> filter) {
  Objects.requireNonNull(filter);
  boolean result = false;
  for (Iterator<E> it = iterator(); it.hasNext(); ) {
    if (filter.test(it.next())) {
      it.remove();
      result = true;
    }
  }
  return result;
}
```

해당 코드가 removeIf 메소드에 대해 작성할 수 있는 코드이지만, 실제 Collection 구현에서는 실패합니다.

기본 메서드가 있는 경우, 인터페이스의 기존 구현이 오류나 경고없이 컴파일 될 수 있지만 런타임에는 실패합니다.

기본 메소드가 Java 플랫폼의 일부이지만, **인터페이스를 신중하게 디자인하는 것이 여전히 가장 중요합니다**.

인터페이스 출시 이후에, 몇 가지 인터페이스 결함을 수정하는 것이 가능하지만 이를 믿을 수 없습니다. 따라서 release 하기 전에는 새 인터페이스를 테스트하는 것이 중요합니다.

<br/>

## Item 22. 인터페이스는 타입을 정의하는 용도로만 사용합니다.

클래스가 인터페이스를 구현할 때, 인터페이스는 클래스의 인스턴스를 참조하는데 사용할 수 있는 type으로 사용됩니다.

상수 인터페이스 패턴은 인터페이스를 제대로 사용하지 못하는 것입니다. 상수 유틸리티 클래스로 다음과 같이 선언할 수 있습니다.

```java
// 상수 유틸리티 클래스
public class PhysicalConstants {
  private PhysicalConstants() {}  // 인스턴스화 방지

  public static final double AVOGADROS_NUMBER = 6.022_140_857e23;
  public static final double BOLTZMANN_CONST = 1.380_648_52e-23;
  public static final double ELECTRON_MASS = 9.109_383_56e-31;
}
```

즉, 인터페이스는 type을 정의하는데만 사용해야합니다. 상수를 내보낼 때는 사용해서는 안됩니다.

<br/>

## Item 23. 태그가 있는 클래스보다 클래스 계층 구조를 활용합니다.

경우에 따라 인스턴스가 둘 이상의 특징으로 제공되는 인스턴스의 특징을 나타내는 tag field를 포함하는 클래스를 실행할 수 있습니다.

```java
// Tagged class - 클래스 계층보다 안좋습니다.
class Figure {
  enum Shape {RECTANGLE, CIRCLE};

  // Tag field : the shape of this figure
  final Shape shape;

  // These fields are used only if shape is RECTANGLE
  double length;
  double width;

  // This field is used only if shape is CIRCLE
  double radius;

  // Constructor for circle
  Figure(double radius) {
    shape = Shape.CIRCLE;
    this.radius = radius;
  }

  // Constructor for rectangle
  Figure(double length, double width) {
    shape = Shape.RECTANGLE;
    this.length = length;
    this.width = width;
  }

  double area() {
    switch(shape) {
      case RECTANGLE:
        return length * width;
      case CIRCLE:
        return Math.PI * (radius * radius);
      default:
        throw new AssertionError(shape);
    }
  }
}
```

이러한 코드는 매우 지저분합니다. 즉, **태그가 지정된 클래스는 장황하고 오류가 발생하기 쉬우며 비효율적입니다.** 이러한 클래스는 클래스 계층 구조를 모방한 것입니다.

이를 클래스 계층으로 나타내면 다음과 같습니다.

```java
// Class hierarchy replacement for a tagged class
abstract class Figure {
  abstract double area();
}

class Circle extends Figure {
  final double radius;

  Circle(double radius) { this.radius = radius; }

  @Override double area() { return Math.PI * (radius * radius); }
}

class Rectangle extends Figure {
  final double length;
  final double width;

  Rectangle(double length, double width) {
    this.length = length;
    this.width  = width;
  }

  @Override double area() { return length * width; }
}
```

이와 같은 클래스 계층은 태그 지정된 클래스의 모든 단점을 해결하고, 자연스러운 계층 관계를 반영하여 유연성을 높이고 컴파일시 유형 검사를 향상 시킬수 있습니다.

<br/>

## Item 24. 멤버 클래스는 되도록 static으로 만듭니다.

nested(중첩된) class는 다른 클래스내에 정의된 클래스입니다. nested class가 다른 컨텍스트에서 유용하다면 최상위 클래스여야지 의미가 있습니다.

중첩 클래스는 다음으로 나눠집니다.

- static member class
- non-static member class
- anonymous class
- local class

### static member class

static member class (정적 멤버 클래스)은 public helper class로, 외부 클래스와 함께 사용하는 경우 유용합니다.

### non-static member class

정적 멤버 클래스와 비정적 멤버 클래스의 유일한 차이점은 static 선언에 수정자가 있다는 점입니다.

일반적으로 nonstatic member class의 일반적인 용도 중 하나 는 외부 클래스의 인스턴스를 관련없는 일부 클래스의 인스턴스로 볼 수 있도록 허용하는 Adapter이며, 다음과 같이 구현됩니다.

```java
// nonstatic member class의 일반적인 사용
public class MySet<E> extends AbstractSet<E> {
  ... // Bulk of the class omitted

  @Override public Iterator<E> iterator() {
    return new MyIterator();
  }

  private class MyIterator implements Iterator<E> { ... }
}
```

둘러싸는 인스턴스에 액세스할 필요가 없는 멤버 클래스를 선언하는 경우, 항상 해당 선언에 static modifier을 넣습니다.

### anonymous class

익명 클래스는 이름이 없고, 적용 가능성에는 많은 제한이 있습니다. 선언된 시점을 제외하고는 인스턴스화할 수 없습니다. 또한 길어지면 가독성이 떨어지기 때문에 짧게 유지해야합니다.

### local class

가장 자주 사용되지 않으며, 지역 변수가 선언될 수 있고 동일한 scope 내에 지정 규칙을 지킵니다.

<br/>

## Item 25. 단일 최상 클래스는 한 파일에 하나만 담습니다.

Java 컴파일러를 사용하면 단일 소스 파일에 여러 최상위 클래스를 정의할 수 있지만, 이에 대한 이점이 없으며 위험이 있습니다.

즉, 아래의 코드는 매우 위험합니다.

```java
// 하나의 파일에 정의 된 두 개의 클래스
class Utensil {
  static final String NAME = "pan";
}

class Dessert {
  static final String NAME = "cake";
}
```

위의 코드보다 나은 케이스입니다.

```java
// 여러 최상위 클래스 대신 정적 멤버 클래스
public class Test {
  public static void main (String [] args) {
    System.out.println (Utensil.NAME + Dessert.NAME);
  }

  private static class Utensil {
    static final String NAME = "pan";
  }

  private static class Dessert {
    static final String NAME = "cake";
  }
}
```

다음과 같이, **단일 소스에는 여러 최상이 클래스 또는 인터페이스를 넣으면 안됩니다.**
