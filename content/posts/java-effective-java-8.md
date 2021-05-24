---
title: '[Java] Effective Java, Methods'
slug: 08-java-effective-java
date: 2021-05-16
published: true
tags: ['Java', 'Stater', 'Effective Java', 'General']
series: false
cover_image: ./images/EffectiveJava.jpeg
canonical_url: false
description: 'Effective Java 책 중, ch9. 일반화에 대해 정리합니다.'
---

# General Programming

이번 챕터는 언어의 이론이나 관념이 아닌 실제적인 사실들에 대해 정리합니다. 지역 변수, 제어 구조, 라이브러리, 데이터 유형 및 두가지의 언어 외 기능(`reflection`와 `native method`)에 대해 설명합니다. 그리고 최적화 및 명명 규칙에 대해 정리합니다.

## Item 57. 지역 변수의 범위를 최소화합니다.

[클래스 및 멤버의 접근성 최소화](https://github.com/Azderica/Book-Record/tree/master/Effective%20Java/ch4#item-15-%ED%81%B4%EB%9E%98%EC%8A%A4-%EB%B0%8F-%EB%A9%A4%EB%B2%84%EC%9D%98-%EC%A0%91%EA%B7%BC%EC%84%B1%EC%9D%84-%EC%B5%9C%EC%86%8C%ED%99%94%ED%95%A9%EB%8B%88%EB%8B%A4)의 내용과 비슷하며, 지역 변수의 점위를 최소화함으로써 **코드의 가독성과 유지 관리성을 높이고 오류 가능성을 줄일 수 있습니다.**

지역 변수의 범위를 최소화하는 가장 강력한 기술은 처음 사용되는 위치에 선언하는 것입니다. 변수를 사용하기 전에 선언하면 프로그램이 무엇을 하려는지 어려워집니다.

거의 모든 지역 변수 선언에는 이니셜라이저가 필요합니다. 이가 없다면, 선언할 때까지 선언을 연기해야합니다.

대표적으로 루프는 변수의 범위를 최소화할 수 있는 기능을 제공합니다. 또한 while 루프 보다는 for 루프를 사용하는 것이 좋습니다.

```java
// 컬렉션 또는 배열을 반복하는 데 선호되는 관용구
for (Element e : c) {
  ... // Do Something with e
}

// 반복자가 필요한 경우
for (Iterator <Element> i = c.iterator (); i.hasNext ();) {
  Element e = i.next ();
  ... // Do something with e and i
}
```

일반적으로 for 루프를 선호하는 이유는 while 루프를 잘 못 사용하면 버그가 발생하기 쉽기 때문입니다.

```java
// 잘못된 결과를 만들기 쉬움
Iterator<Element> i = c.iterator();
while (i.hasNext()) {
  doSomething(i.next());
}
...

Iterator<Element> i2 = c2.iterator();
while (i.hasNext()) { // BUG!
  doSomethingElse(i2.next());
}
```

```java
// 컴파일시, 에러가 바로 나오게 됩니다.
for (Iterator<Element> i = c.iterator(); i.hasNext(); ) {
  Element e = i.next();
  ... // Do something with e and i
}
...

// Compile-time error - cannot find symbol i
for (Iterator<Element> i2 = c2.iterator(); i.hasNext(); ) {
  Element e2 = i2.next();
  ... // Do something with e2 and i2
}
```

이렇기 때문에 for loop를 좀 더 선호하는 것이 좋습니다.

또는, 아채처럼 지역 변수의 범위를 최소화할 수 있습니다.

```java
for (int i = 0, n = expensiveComputation(); i < n; i++) {
  ... // Do something with i;
}
```

이는, i와 n 모두가 loop 내에서만 범위를 가지고 있습니다.

마지막 기술은, 지역변수의 범위를 최소화하는 마지막 기술은 메서드를 작고 집중적으로 유지하는 것이 좋습니다. 동일한 방법으로 여러 동작을 수행하면 지역변수가 다른 코드 범위에 있을 수 있기 때문에 이러한 일이 발생하지 않도록 하는 것이 좋습니다.

<br/>

## Item 58. 전통적인 `FOR` 루프 보다는 `FOR-EACH` 루프를 더 선호합니다.

```java
// 컬렉션을 반복하는 것이 가장 좋은 방법은 아닙니다.
for (Iterator<Element> i = c.iterator(); i.hasNext(); ) {
  Element e = i.next();
  ... // Do something with e
}
```

기존의 for loop 문도, while 문 보다는 낫지만 완벽하지 않습니다. 요소만 필요한 경우, 이는 복잡할 뿐입니다.

for-each 루프는 이러한 문제를 해결합니다.

```java
// 컬렉션 및 배열을 반복하는 데 선호되는 관용구
for (Element e : elements) {
  ... // Do something with e
}
```

이러한 for-each 문은 중첩된 반복문에서 좀 더 도움이 됩니다. 아래는 for문에서 발생하기 쉬운 버그입니다.

```java
enum Face {ONE, TWO, THREE, FOUR, FIVE, SIX}
...
Collection <Face> faces = EnumSet.allOf (Face.class);

for (Iterator <Face> i = faces.iterator (); i.hasNext ();)
  for (Iterator <Face> j = faces.iterator (); j.hasNext ();)
    System.out.println (i. next () + ""+ j.next ());

// Expected Output : {ONE, ONE}, {ONE, TWO}, ..., {SIX, SIX}
// Real Output : {ONE, ONE}, {TWO, TWO}, ..., {SIX, SIX}
```

이를 생각하는 값을 나오게 하기 위해서는 아래처럼 구성하면 됩니다.

```java
// 컬렉션 및 배열에 중첩 된 반복에 대한 기본 관용구
for (Suit suit : suits)
  for (Rank rank : ranks)
    deck.add(new Card(suit, rank));
```

다만 for-each 문을 사용할 수 없는 경우는 세가지 상황이 있습니다.

- Destructive filtering(파괴적 필터링)
  - 선택한 요소를 제거하는 컬렉션을 탐색해야하는 경우, `remove` 메서드를 호출할 수 잇도록 명시적 반복자를 사용해야합니다.
  - Java 8에 추가된 Collection의 removeIf 메서드를 사용하여 명시적 순회를 피할 수 있습니다.
- Transforming(변형)
  - 목록 또는 배열을 탐색하고 해당 요소 값의 일부 또는 전체를 교체해야하는 경우, 요소 값을 바꾸기 위해서 list iterator 또는 array index가 필요합니다.
- Parallel iteration(병렬 반복)
  - 여러 컬렉션을 병렬로 트래버스해야하는 경우, 모든 반보기 또는 인덱스 변수를 잠금 단계로 진행할 수 있도록 iterator 또는 인덱스 변수를 명시적으로 제어해야합니다.

for-each 루프를 사용하면, 컬렉션과 배열을 반복할 수 있을 뿐만 아니라, 단일 메서드로 구성된 Iterable 인터페이스를 구현하는 모든 개체를 발복할 수 있습니다. 인터페이스의 모습은 다음과 같습니다.

```java
public interface Iterable <E> {
  //이 반복 가능한 요소에 대한 iterator를 반환합니다.
  Iterator <E> iterator ();
}
```

이렇게 하면, 사용자가 for-each 루프를 사용해서 type을 iterator할 수 있습니다. 즉, **for-each 루프는 for 성능 저하없이 명확성, 유연성 및 버그 방지 측면에서 기존 루프에 비해 강력한 이점을 제공합니다.** 또한 최대한 for-each 루프를 사용할 수 있습니다.

<br/>

## Item 59. 라이브러리를 알고 사용해야합니다.

예를 들어, random 을 사용해야할 때 random을 쓰려면 여러 버그가 발생할 수 있습니다. 이러한 경우, 여러 결점이 존재하기 때문에 이를 해결해야합니다.

대표적인 예시로 자바 7의, ThreadLocalRandom이 있습니다. 이를 사용하면, 높은 품질의 난수를 빠르게 생성할 수 있습니다.

표준 라이브러리 사용은 다음의 장점을 가집니다.

- **표준 라이브러리를 사용하면, 이를 작성한 전문가의 지식과 이전에 사용했던 경험을 활용할 수 있습니다.**
- 업무와 관련 없는 부분에 시간을 낭비할 필요가 없습니다.
- 시간이 지남에 따라 성능이 향상되는 경향이 있습니다.
- 시간이 지남에 따라 얻는 경향이 있습니다. (누락된 기능이 후속 추가될 수 있습니다.)

예를 들어 다음과 같이 보여줄 수 있습니다.

```java
// Java 9에 추가 된 transferTo를 사용하여 URL의 내용을 인쇄합니다.
public static void main (String [] args) throws IOException {
  try (InputStream in = new URL (args [0]). openStream ()) {
    in. transferTo (System.out);
  }
}
```

이러한 라이브러리는 문서들을 공부하기에는 너무 많습니다. 그러나, 모든 프로그래머들은 `java.lang`, `java.util`, `java.io`와 서브패키지의 기본 사항에 대해 잘 알고 있어야합니다.

이를 요약하면 다음과 같습니다. **라이브러리가 있는 경우 사용해야하고 모르는 경우에는 라이브러리가 있는지 확인해야합니다.** 일반적으로 라이브러리 코드는 사용자가 직접 작성하는 코드보다 좋으며 시간이 지남에 따라 개선 될 가능성이 높습니다.

<br/>

## Item 60. 정확한 답변이 필요한 경우, `FLOAT`와 `DOUBLE`을 피합니다.

`float`와 `double` 유형은 과학 및 공학 계산을 위해서 설게되었습니다. 그렇기 때문에 정확한 근사치를 신속하게 제공하기 위해서 설계된 구조입니다. 따라서, 정확한 결과에 제공하면 안되며 정확한 결과가 필요한 곳에서는 사용하면 안됩니다. (Ex. 금전 계산 등)

```java
// Broken - 화폐 계산에 부동 소수점을 사용합니다!
// 사용하면 안됩니다.
public static void main(String[] args) {
  double funds = 1.00;
  int itemsBought = 0;
  for (double price = 0.10; funds >= price; price += 0.10) {
    funds -= price;
    itemsBought++;
  }

  System.out.println(itemsBought + " items bought.");
  System.out.println("Change: $" + funds);
}
// output : 0.3999999... (잘못된 값)
```

따라서, 아래처럼 수정해야합니다.

```java
public static void main(String[] args) {
  final BigDecimal TEN_CENTS = new BigDecimal(".10");
  int itemsBought = 0;
  BigDecimal funds = new BigDecimal("1.00");
  for (BigDecimal price = TEN_CENTS;
        funds.compareTo(price) >= 0;
        price = price.add(TEN_CENTS)) {
    funds = funds.subtract(price);
    itemsBought++;
  }
  System.out.println(itemsBought + " items bought.");
  System.out.println("Money left over: $" + funds);
}
```

이 경우, BigDecimal을 사용하게 되면 정확한 결과를 만들 수 있습니다. (다만, 원시적인 값에 비해 조금 더 느려집니다.)

<br/>

## Item 61. Boxed Primitive 보다 Primitive type을 선호합니다.

자바는 `int`, `double`, `boolean과` 같은 기본(Primitive) 요소와 `String`이나 `List`와 같은 참조(Reference) 유형으로 구성되어 있습니다. 또한 모든 기본 유형(Primitive Type)에는 Boxed Primitive라고 하는 참조 유형이 있습니다. 이것이 바로, `int`, `double`, `boolean`에 해당하는 `Integer`, `Double`, `Boolean` 입니다.

Primitive와 Boxed Primitive 사이에는 세 가지 주요 차이점이 있습니다.

- Primitive는 값만 가지고 있는 반면에, Boxed Primitive는 값과 구별되는 ID를 가지고 있습니다.
- Primitive는 기본 값만 존재하는 반면에, Boxed Primitive는 null과 같이 비 기능적 값이 있습니다.
- Primitive는 Boxed Primitive보다 시간과 공간 효율적입니다.

이러한 차이를 참고해서 만들어야 합니다.

즉, 아래의 코드는 잘못된 코드입니다.

```java
Comparator <Integer> naturalOrder = (i, j)-> (i <j)? -1 : (i == j? 0 : 1);

naturalOrder.compare(new Integer(42), new Integer(42))
// output : 1 -> error
```

이와 같은 문제로, boxed primitives에는 `==` 연산자를 적용하는 것은 거의 대부분 잘못된 것입니다. 따라서 비교를 할때는 primitive를 사용하는 것이 더 좋습니다.

```java
public class Unbelievable {
  static Integer i;

  public static void main (String [] args) {
    if (i == 42)
      System.out.println ( "Unbelievable");
  }
}
```

다만, 위의 코드처럼 사용하는 것도 좋지 않습니다. primitive와 boxed primitive를 혼합해서 사용하는 경우, boxed primitive 타입이 박스 해제가 되는 문제가 있습니다.

```java
// 매우 느린 코드
public static void main (String [] args) {
  Long sum = 0L;
  for (long i = 0; i <Integer.MAX_VALUE; i ++) {
    sum + = i;
  }
  System.out.println (sum);
}
```

위 코드는 지역 변수 sum을 기본(Primitive) 타입이 아닌, Boxed Primitive 타입을 사용했기 때문에 반복적으로 boxing되고 unboxed 되는 문제가 존재합니다.

요약하자면, 선택권이 있는 경우에는 Boxed primitive 보다는 primitive를 사용하는 것이 좋습니다. Boxed Primitive를 사용해야하는 상황이면 조심히 사용해야합니다. **Auto boxing은 boxed primitives를 사용하는 위험은 아니지만, 자세한 정도를 줄입니다.**

프로그램이 boxed 및 unboxed primitive 를 포함하는 혼합 계산을 할때는 unboxing을 수행되고, 프로그램이 unboxing을 수행할 때는 `NullPointerException`을 throw할 필요가 있습니다. 프로그램이 Primitive 타입을 Boxed Primitive에 넣으면 비용이 많이 들고 불필요한 개체 생성이 발생할 수 있습니다.

<br/>

## Item 62. 다른 유형이 적합한 문자열은 피합니다.

문자열은 텍스트를 위해 설계되었습니다. 따라서 문자열로 몇가지를 하면 안되는 경우가 있습니다.

### 문자열은 다른 값 타입을 대체하지 못합니다.

- 입력에서 문자열로 받는 경우가 있지만, 숫자인 경우에는 int, float, BigInteger로 변환해야하고 참/거짓의 경우에는 Enum 또는 boolean으로 처리해야합니다.

### 문자열은 Enum 형을 대체하지 못합니다.

- Enum은 문자열보다, Enum형 상수를 사용하는 것이 중요합니다.

### 문자열은 aggregate 타입을 대체하지 못합니다.

- Entity에 여러 구성이 있는 경우, 사용하지 않는 것이 좋습니다.

### 문자열은 capabilities를 대체하지 못합니다.

- 때때로 문자열은 일부 기능에 대한 액세스 권한을 부여하기위해 사용하는데, 스레드 로컬 변수를 사용할 때 문제가 생길 수 있습니다.

```java
// Broken - 문자열을 기능으로 부적절하게 사용했습니다!
// 두 클라이언트가 독립적으로 스레드 로컬을 사용하기로 결정하면 의도하지않게 변수를 공유하므로 여러 문제가 발생가능합니다.
public class ThreadLocal {
  private ThreadLocal() { } // Noninstantiable

  // 명명 된 변수에 대한 현재 스레드의 값을 설정합니다.
  public static void set(String key, Object value);

  // 명명 된 변수에 대한 현재 스레드의 값을 반환합니다.
  public static Object get(String key);
}
```

이를 해결하는 코드는 아래와 같습니다.

```java
public final class ThreadLocal<T> {
  public ThreadLocal();
  public void set(T value);
  public T get();
}
```

이를 요약하면, 더 나인 데이터 유형이 존재하거나 쓸 수 있을 때 객체를 문자열로 나타내는 자연스러운 경향을 피해야합니다. 부적절하게 사용되는 문자열은 다른 유형보다 번거롭고 유연성이 떨어지며 느리고, 오류가 발생하기 쉽습니다.

<br/>

## Item 63. 문자열 연결의 성능에 주의합니다.

문자열 연결 연산자, `+`는 몇개의 문자열을 하나로 결합하는 편리하고 좋은 방법입니다. 작은 범위에서는 좋을 수 있지만, 문자열 연결 연산자를 사용해서 n개의 문자열을 연결하는 경우, n 타임이 걸리게 됩니다.

즉, 아래는 잘못된 사용 코드입니다.

```java
// 부적절한 문자열 연결 사용-성능이 좋지 않습니다!
public String statement() {
  String result = "";
  for (int i = 0; i < numItems(); i++)
    result += lineForItem(i);  // String concatenation
  return result;
}
```

이를 해결하기 위해서는 `StringBuilder`를 사용하는 것이 좋습니다.

```java
public String statement () {
  StringBuilder b = new StringBuilder (numItems () * LINE_WIDTH);
  for (int i = 0; i <numItems (); i ++)
    b.append (lineForItem (i));
  return b.toString ();
}
```

자바 6이후로, 문자열 연결 속도를 높였으나 아직까지는 `StringBuilder`를 사용하는 것이 좋습니다.

즉, 성능이 관련이 없는 경우가 아니면, 문자열 연결 연산자(`+`)를 사용해서 몇개의 문자열을 결합하지 않는 것이 중요합니다.

<br/>

## Item 64. 인터페이스로 객체를 참조합니다.

객체를 참조하려면 클래스보다 인터페이스를 사용을 선호해야합니다. **적절한 인터페이스 유형이 있는 경우, 매개 변수, 반환 값, 변수 및 필드는 모두 인터페이스 유형을 사용하여 선언해야합니다.**

즉, 아래처럼 작성하는 것이 중요합니다.

```java
// Good Case - 인터페이스를 유형으로 사용
Set<Son> sonSet = new LinkedHashSet<>();

// Bad Case - 클래스를 유형으로 사용한 것
LinkedHashSet<Son> sonSet = new LinkedHashSet<>();
```

인터페이스를 유형으로 사용하게 되면 프로그램이 좀 더 **유연**해집니다. 다만, 적절한 인터페이스가 없는 경우에는 인터페이스가 아닌 클래스에서 객체를 참조하는 것이 전적으로 중요합니다.

따라서, 인터페이스를 사용할 수 있다면 인터페이스를 사용해서 객체를 참조시켜 프로그램이 더 유연하고 세련되게 구성합니다. 적절한 인터페이스가 없으면 필요한 기능을 제공하는 클래스 계층 구조에서 가장 덜 구체적인 클래스를 사용하는 것이 중요합니다.

<br/>

## Item 65. 리플렉션보다 인터페이스를 선호합니다.

- [Reflection ?](https://velog.io/@ptm0304/Java-%EC%9E%90%EB%B0%94-%EB%A6%AC%ED%94%8C%EB%A0%89%EC%85%98)

핵심 리플렉션 기능인 `java.lang.reflect`는 임의의 클래스에 대한 프로그래밍 방식 액세스를 제공합니다. Class 객체가 주어지면, Class 인스턴스가 나타내는 생성자, 메서드 및 필드를 나타내는 Constructor, Method, Field 인스턴스를 얻을 수 있습니다.

그러나 리플렉션을 사용하게 되면, 아래의 단점을 가지게 됩니다.

- 예외 검사를 포함하여 컴파일 타임 유형 검사의 모든 이점을 잃게됩니다.
- 반사 액세스를 수행하는 데 필요한 코든느 서투르고 장황합니다.
- 성능이 저하됩니다.

일반적으로는 리플렉션을 사용하는 것은 거의 안좋습니다.

리플렉션은 매우 제한된 형태로만 사용함으로써 비용을 거의 발생시키지 않으면서 리플렉션의 많은 이점을 얻을 수 있습니다. 컴파일 타임에 사용할 수 없는 클래스를 사용해야하는 많은 프로그램의 경우, 컴파일 타임에 클래스를 참조할 적절한 인터페이스 또는 수퍼 클래스가 있습니다. 이 경우, Reflective 인스턴스로 생성하고 해당 interface나 super 클래스를 통해서 정상적으로 액세스 가능합니다.

```java
// 인터페이스 액세스를 통한 Reflective instantiation
public static void main(String[] args) {
  // 클래스 이름을 클래스 객체로 변환
  Class<? extends Set<String>> cl = null;
  try {
    cl = (Class<? extends Set<String>>)  // Unchecked cast!
      Class.forName(args[0]);
  } catch (ClassNotFoundException e) {
    fatalError("Class not found.");
  }

  // Get the constructor
  Constructor<? extends Set<String>> cons = null;
  try {
    cons = cl.getDeclaredConstructor();
  } catch (NoSuchMethodException e) {
    fatalError("No parameterless constructor");
  }

  // Instantiate the set
  Set<String> s = null;
  try {
    s = cons.newInstance();
  } catch (IllegalAccessException e) {
    fatalError("Constructor not accessible");
  } catch (InstantiationException e) {
    fatalError("Class not instantiable.");
  } catch (InvocationTargetException e) {
    fatalError("Constructor threw " + e.getCause());
  } catch (ClassCastException e) {
    fatalError("Class doesn't implement Set");
  }

  // Exercise the set
  s.addAll(Arrays.asList(args).subList(1, args.length));
  System.out.println(s);
}

private static void fatalError(String msg) {
  System.err.println(msg);
  System.exit(1);
}
```

위의 코드처럼 피를레션은 강력함을 가지고 있습니다. `<? extends Set<String>>`을 통해서, `service provider framework`등을 구현하는데 도움이 됩니다.

그러나, reflection의 단점 또한 잘 보입니다.

- 런타임에 여러 에러가 발생할 수 있는 가능성이 있습니다.
- 클래스에서 인스턴스를 생성하기 위해서는 긴 코드가 필요합니다.

또한 위 프로그램을 컴파일하면 확인되지 않은 캐스트 경고가 발생합니다.

드물지만, 합법적인 리플렉션 사용법 중 하나는 런타임에 없을 수 있는 다른 클래스, 메서드, 필드에 대한 클래스의 종속성을 관리하는 것입니다.

이를 정리하자면, **리플렉션은 정교한 특정 시스템 프로그래밍 작업에는 필요한 기능이지만 많은 단점이 있습니다.** 컴파일 타입에 알려지지 않은 클래스로 작업해야하는 프로그램을 작성하는 경우, 가능하면 리플렉션을 사용해서 개체를 인스턴스화하고 컴파일 타임에 알려진 일부 인터페이서 또는 슈퍼클래스를 사용해서 개체에 액세스 하는 것이 중요합니다.

<br/>

## Item 66. 네이티브 메서드를 신중하게 사용합니다.

JNI(Java Native Interface)를 사용하면, Java Program이 C. C++와 같은 `native programming language`로 작성된 메소드인 `native method`를 호출할 수 있습니다. 일반적으로 `native method`의 용도는 3가지입니다.

- 레지스토리와 같은 플랫폼 별 기능에 대한 액세스를 제공합니다.
- 레거시 데이터에 대한 액세스를 제공하는 레거시 라이브러리를 포함하여 네이티브 코드의 기존 라이브러리에 대한 액세스를 제공하비낟.
- 네이티브 메서드는 성능 향상을 위해 애플리케이션의 성능에 중요한 부분을 네이티브 언어로 작성하는데 사용합니다.

그러나 현재 시점에서는 거의 사용하지 않는 것이 좋습니다. 기본 메서드를 통해서 레지스토리와 같은 플랫폼에 액세스하는 것도 거의 필요하지 않고, **성능향상을 위해 native method를 사용하는 것도 거의 권장하지 않습니다.**

또한 native method를 사용하는 것은 심각한 단점이 있습니다. native method의 경우, 안전하기 않기 때문에 메모리 손상 등 여러 문제가 발생하기 쉽습니다. 그리고 이식성이 떨어지며, 디버그하기 어렵습니다. 가비지컬렉터도 추적하기 힘들며, 성능을 저하시킬 수 있습니다. 그리고 가독성이 매우 부족합니다.

즉, 네이티브 메서드를 사용할 수 있는 경우는 하위 수준 리소스나 native library에 액세스하는 경우에 한하며, 이 경우에도 최대한 버그를 피하도록 노력해야합니다.

<br/>

## Item 67. 신중하게 최적화합니다.

최적화에 대한 세가지 격언이 있습니다.

- 어리석음을 포함해서 다른 단일 이유보다 효율성이라는 이름으로 잘못된 문제를 일으키면 안됩니다.
- 97% 정도의 작은 효율성은 잊어야합니다. 조기 최적화는 모든 문제의 근원입니다.
- 최적화에 대해 두가지 규칙을 지켜야합니다.
  - 최적화하지 마세요.
  - 완벽하고 최적화되지 않은 solution을 확보할때까지는 수행하지 않습니다.

이처럼, 최적하는 조심히해야하며 특히 조기 최적화는 문제가 생기기 쉽습니다.

성능을 위해 건전한 아키텍처 원칙을 희생하면 안됩니다. **빠른 프로그램 보다는 좋은 프로그램을 작성하는 것이 중요합니다.** 좋은프로그램이 빠르지 않는 경우에는 아키텍처를 통해서 최적화할 수 있습니다.

따라서 아래 사항을 고려해야합니다.

- 설계 과정에서 성능을 고려하며, 개발도중에 변경에는 시스템이 잘못구성될 수 있습니다.
- 성능을 제한하는 설계 결정을 피하기 위해서 노력해야합니다.
- API 설계 결정의 성능 결과를 고려해야합니다. 다만, 좋은 성능을 얻기 위해서 API를 왜곡하는 것은 매우 나쁩니다.
- Java는 성능 모델이 약하기 때문에, C나 C++에 비해 최적화를 좀 더 잘할 필요가 있습니다.

즉, 빠른 프로그램 보다는 좋은 프로그램을 작성하는 것이 중요합니다. 그렇게 되면 속도가 따라올 것입니다. 다만, 시스템을 설계하는 동안 성능에 대해 생각해야합니다. 그리고, 시스템을 개발 완료 후 에는 성능을 측정하고, 빠른지 확인하고 그렇지 않은 경우에는 프로파일러를 통해서 원인을 찾고 최적화하는 작업을 수행합니다.

<br/>

## Item 68. 일반적으로 허용되는 명명 규칙을 준수합니다.

자바 플랫폼에서는 잘 정립된 naming conventions이 있으며, 대부분은 The Java Language Specification에 포함되어 있습니다.

패키지, 클래스, 인터페이스, 메서드, 필드 및 형식 변수를 포함하는 여러 naming conventions가 있으며, 이를 위반하면 안됩니다. 이러한 규칙을 위반하면 이후에 사용하기 어려울 수 있습니다.

- 패키지 및 모듈은 마침표로 구분된 구성요소와 함께 계층적이며 소문자 알파벳 문자(가끔 숫자)로 구성되어야합니다.
- 열거 형 및 주석 유형 이름을 포함한 클래스느 및 인터페이스 이름은 하나 이상의 단어로 구성되어야하며, 각 단어의 앞은 대문자로 표시해야합니다.
- 메서드 및 필드 이름은 클래스나 인터페이스와 동일한 방식으로 naming conventions를 사용하지만, 첫 글자는 소문자로 구성해야합니다.
- 상수 필드의 경우 하나이상의 대문자와 밑줄 문자로 구성합니다. (EX. `COIN_VALUE`)
- 약어의 경우는, 좀 더 신중하게 선정해야합니다.

이를 예시로 하면 다음과 같습니다.

| 식별자 유형      | 예                                                 |
| ---------------- | -------------------------------------------------- |
| Package, module  | `org.junit.jupiter.api, com.google.common.collect` |
| Class, Interface | `Stream, FutureTask, LinkedHashMap, HttpClient`    |
| Method, Field    | `remove, groupingBy, getCrc`                       |
| Constant Field   | `MIN_VALUE, NEGATIVE_INFINITY`                     |
| Local Variable   | `i, denom, houseNum`                               |
| Type Parameter   | `T, E, K, V, X, R, U, V, T1, T2`                   |

위와 같은 standard naming conventions를 내재회 하고, 그 다음 특성을을 사용하는 방법을 인지하는 것이 좋습니다. 일반적으로 grammatical conventions는 더 복잡하고 느슨합니다. `The Java Language Specification`에서 인용한 글은 "오래 유지된 관습적 사용이 달라지는 경우, 이러한 관습을 과도하게 따라하면 안됩니다."라는 글입니다. 즉, 상식에 한해서 개발하는 것이 필요합니다.
