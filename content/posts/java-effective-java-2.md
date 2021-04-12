---
title: '[Java] Effective Java, 모든 객체에 공통적인 메소드'
slug: 01-java-effective-java
date: 2021-04-12
published: true
tags: ['Java', 'Stater', 'Effective Java', 'Object']
series: false
cover_image: ./images/JavaLogo.jpg
canonical_url: false
description: 'Effective Java 책 중, ch3 모든 객체에 공통적인 메소드에 대해 정리합니다.'
---

# 모든 객체에 공통적인 메소드

객체는 콘크리트 클래스이지만, 주로 확장을 위해 설계됩니다. (대표적인 예시로, equals, hashCode, toString, clone, finalize 등이 override되도록 설계되어있습니다.)

nonfinal Object 메소드를 재정의하는 시기와 방법에 대해 설명합니다.

## `Equals`를 오버라이딩 할 때, 일반적인 룰을 준수합니다.

equals 메서드를 재정의하는 방법은 여러가지가 있지만, 잘못된 사용은 끔찍한 결과를 만듭니다. 따라서 다음의 룰을 준수해야합니다.

- 클래스의 각 인스턴스는 본질적으로 unique합니다.
- 클래스에 대해 `logical equality(지역적 동일성)` 테스트를 제공할 필요가 없습니다.
- 슈퍼 클래스는 이미 equals를 이미 오버라이딩하였으므로, 슈퍼클래스의 동작은 이미 클래스의 적합합니다.
- 클래스는 private나 package-private이므로, 해당 'equals'는 호출되지 않을것이라고 확신합니다.

### equivalence relation의 조건.

equivalence relation 이란, 요소 집합에서 요소가 서로 동일한 것으로 간주하는 하위 집합으로 분할하는 연산자이며 이를 `equivalence class`라고 합니다. 이를 위해서는 5가지의 요구 사항을 지켜야합니다.

- `Reflexivity(반사성)`

  - 객체가 자신과 동일해야합니다.

- `Symmetry(대칭)`

  - 두 객체가 동일한 지 여부에 대해 동의해야합니다.
  - equals 를 위반한 경우, 해당 객체가 다른 객체를 비교하게 되면 어떻게 동작할지 알 수가 없습니다.

```java
// 대칭을 위반한 케이스
public final class CaseInsensitiveString {
  private final String s;

  public CaseInsensitiveString(String s) {
    this.s = Objects.requireNonNull(s);
  }

  // 대칭을 위반한 경우
  @Override public boolean equals(Object o) {
    if (o instanceof CaseInsensitiveString)
      return (s.equalsIgnoreCase((CaseInsensitiveString) o).s);
    if (o instanceof String)  // 단방향 상호 운용성
      return s.equalsIgnoreCase ((String) o);
    return false;
  }
}
```

```java
// 대칭을 준수한 코드
@Override public boolean equals(Object o) {
  return o instanceof CaseInsensitiveString &&
    ((CaseInsensitiveString) o).s.equalsIgnoreCase (s);
}
```

- `Transitivity`

  - 한 객체가 두번째 객체와 같고, 두번째 객체가 세번째 객체와 같으면 첫번째 객체와 세번째 객체가 같아야합니다.

```java
// equals contract를 위반하지 않는 값 구성 요소
public class ColorPoint {
  private final Point point;
  private final Color color;

  public ColorPoint(int x, int y, Color color) {
    point = new Point(x, y);
    this.color = Objects.requireNonNull(color);
  }

  public Point asPoint() {
    return point;
  }

  @Override public boolean equals(Object o) {
    if(!(o instanceof ColorPoint))
      return false;
    ColorPoint cp = (ColorPoint) o;
    return cp.point.equals(point) && cp.color.equals(color);
  }
}
```

- `Consistency`

  - 두 객체가 같은 경우에, 둘 중 하나가 변경되지 않는 한 항상 동일하게 유지되어야합니다.
  - 신뢰할 수 없는 리소스에 의존하는 경우, equals를 사용하면 안됩니다.
  - 대표적으로 사용하면 안되는 것이, `java.net.url`에서의 equals이며, 이는 IP를 사용하기 때문에 시간이 바뀌면서 바뀔 수 있습니다.

- `Non-nullity`

  - 모든 객체는 null과 같으면 안됩니다.

```java
// Implicit null check - preferred
@Override public boolean equals(Object o) {
  if (!(o instanceof MyType))
    return false;
  MyType mt = (MyType) o;
  ...s
}
```

### 좋은 equals 사용 방법

- `==`를 사용하여 인수가 이 객체에 대한 참조인지 확인합니다.
- `instanceof`를 사용해서 argument의 유형한 타입인지 확인합니다.
- 올바른 유형으로 캐스트합니다.
- 클래스의 각 중요한 필드에 대해 인수의 해당 필드가, 이 객체의 해당 필드와 일치하는 지 확인합니다.

이러한 방법으로 equals를 작성하고 나서는 세가지를 확인해야합니다.

- `symmetric`, `transitive`, `consistent`

그 외의 주의사항은 다음과 같습니다.

- `equals`를 재정의할 때는, `hashCode`를 재정의합니다.
- 너무 영리하게 할 필요가 없습니다. 복잡하게 구성하면 안됩니다.
- `equals`를 선언할 때는, 객체를 다른 타입으로 대체하면 안됩니다.

<br/>

## `Equals`를 오버라이딩 할때, `Hashcode`를 항상 오버라이딩합니다.

- `equals`를 재정의하는 모든 클래스에서는 반드시 `hashCode`를 재정의해야합니다.
- 동일한 개체에 동일한 해시 코드가 있어야합니다.

```java
// 전형적인 hashCode method
@Override public int hashCode() {
  int result = Short.hashCode(areaCode);
  result = 31 * result + Short.hashCode(prefix);
  result = 31 * result + Short.hashCode(lineNum);
  return result;
}
```

- 성능을 향상시키기 위해 hash code 계산에서 중요한 필드를 제외하면 안됩니다. (품질이 급격하게 떨어짐)
- `hashCode`에서 반환한 값에 대해 자세한 스펙을 제공하면 안됩니다. 이 경우, 클라이언트 값에 합리적으로 의존할 수 없습니다. 따라서, 유연성을 제공해야합니다.

<br/>

## `ToString`을 항상 오버라이딩합니다.

- equals나 hashCode를 준수하는 것만큼의 비중은 아지만, 좋은 `toString`을 제공하면, 클래스를 더 좋게 사용할 수 있고 이후에 디버깅을 하기도 편해집니다.

- 가능한 경우, `toString` 메소드는 객체에서 포함하고 있는 중요한 정보를 반환해야합니다.

- 형식 지정 여부와 관계없이, 의도를 명확하게 문서화해야합니다.

```java
/* 휴대폰 번호를 세 부분으로 나누는 것은 너무 작기때문에,
 * 이러한 필드값을 채우기 위해, 다음과 같이 진행했습니다.
 * Ex. lineNum이 123인 경우, "0123"으로 나타냅니다.
 */
@Override public String toString() {
  return String.format("%03d-%03d-%04d", areaCode, prefix, lineNum);
}
```

- 형식을 지정했든 말든, `toString`로 반환되는 값에 포함된 정보에 대해 프로그램 액세스를 제공해야합니다.

<br/>

## 신중하게 `Clone`을 오버라이딩합니다.

실질적으로 스펙에서 명시되어 있지는 않지만, 실전에서는 `Cloneable`을 구현하는 클래스는 정상적으로 public clone method를 제공하는 것으로 예상됩니다.

즉, 아래의 조건을 만족합니다.

```java
x.clone().getClass() == x.getClass(); // true
```

다만 몇가지 지켜야할 요소가 있습니다. `immutable class`의 경우에는 낭비적인 복사를 사용하기 때문에, `clone` 메소드를 제공하면 안됩니다.

```java
public class Stack {
  private Object[] elements;
  private int size = 0;
  private static final int DEFAULT_INITIAL_CAPACITY = 16;

  public Stack() {
    this.elements = new Object[DEFAULT_INITIAL_CAPACITY];
  }

  public void push(Object e) {
    ensureCapacity();
    elements[size++] = e;
  }

  public Object pop() {
    if(size == 0) throw new EmptyStackException();
    Object result = elements[--size];
    elements[size] = null;  // 사용하지 않는 참조
    return result;
  }

  public void ensureCapacity() {
    if(elements.length == size)
      elements = Arrays.copyOf(elements, 2 * size + 1);
  }
}
```

해당 위의 스택 클래스를 clone을 하는 경우, 복제된 Stack 클래스의 경우 동일한 elements 주소를 참조하기 때문에, 복제본의 불변성이 파괴됩니다.

즉, clone 메서드는 생성자 역할을 수행하기 때문에, 원본 객체에 해를 끼치지 않고 복제본에 불변을 수행하는 지 확인해야합니다.

따라서 다음과 같이 clone()을 사용해야합니다.

```java
@Override public Stack clone() {
  try {
    Stack result = (Stack) super.clone();
    result.elements = elements.clone();
    return result;
  } catch (CloneNotSupportedException e) {
    throw new AssertionError();
  }
}
```

`Cloneable` 아키텍처는 변경가능한 객체을 참조하는 final 필드의 일반적인 사용과 호환되지 않습니다.

따라서 아래와 같은 복사를 사용할 수 있습니다.

```java
// 반복적인 복사, 깨끗하지만 맹목적으로 복사본을 덮어씁니다.
Entry deepCopy() {
  Entry result = new Entry(key, value, next);
  for(Entry p = result; p.next != null; p = p.next)
    p.next = new Entry(p.next.key, p.next.value, p.next.next);
  return result;
}
```

그러나 이러한 방법보다, 가장 좋은 방법 중 하나는 **복사 생성자 또는 복사 팩토리를 제공하는 것**입니다.

```java
// Copy constructor
public Yum(Yum yum) { ... }

// Copy factory
public static Yum newInstance(Yum yum) { ... };
```

<br/>

## `Comparable`을 개발할때 고려합니다.

`compareTo` 메서드는 `Comparable` 인터페이스의 유일한 방법입니다. 이는 Comparable 객체의 컬렉션 유지 관리에도 편하는 장점이 있습니다.

sgn에 대한 여러가지 수학적 조건이 있으나 여기서는 너무 수학적으로 설명되기에 이를 생략합니다.

```java
// 개체 참조 필드와 비교 가능한 단일 필드
public final class CaseInsensitiveString implements Comparable<CaseInsensitiveString> {
  public int compareTo(CaseInsensitiveString cis) {
    return String.CASE_INSENSITIVE_ORDER.compare(s, cis.s);
  }
}
```

`compareTo` 메소드에서 관계 연산자인 `<and>`를 사용하는 것은 오류가 발생하기 때문에 더이상 권장되지 않습니다.

```java
// Comparable with comparator construction methods
private static final Comparator<PhoneNumber> COMPARATOR =
  comparingInt((PhoneNumber pn) -> pn.areaCode)
  .thenComparingInt(pn -> pn.prefix)
  .thenComparingInt(pn -> pn.lineNum);

public int compareTo(PhoneNumber pn) {
  return COMPARATOR.compare(this, pn);
}

```

```java
// static compare 메소드에 기반을 둔 Comparator
static Comparator <Object> hashCodeOrder = new Comparator <> () {
  public int compare(Object o1, Object o2) {
    return Integer.compare (o1.hashCode (), o2.hashCode())
  }
}

// Comparator construction 메소드에 기반을 둔 Comparator
static Comparator <Object> hashCodeOrder =
  Comparator.comparingInt (o-> o.hashCode ());
```

다음과 같이 비교를 하는 것이 권장됩니다.
