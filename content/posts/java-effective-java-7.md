---
title: '[Java] Effective Java, Methods'
slug: 07-java-effective-java
date: 2021-05-16
published: true
tags: ['Java', 'Stater', 'Effective Java', 'Methods']
series: false
cover_image: ./images/EffectiveJava.jpeg
canonical_url: false
description: 'Effective Java 책 중, ch8. 메서드에 대해 정리합니다.'
---

# Methods

이 챔터에서는 메서드 디자인의 여러 측면에 대해 이야기합니다. (어떻게 파라미터를 처리하고, 값을 리턴하는지, 메서드 서명을 어떻게 디자인하는 지, 메서드를 어떻게 문서화하는지) 이러한 대부분의 자료들은 생성자와 메서드에에 적용됩니다. 특히, 유용성, 견고성 및 유연성에 중점을 둡니다.

## Item 49. 매개 변수의 유효성을 확인합니다.

대부분의 메서드와 생성자는 매개 변수에 전달할 수 있는 값에 대한 몇가지 제한이 있습니다. 그렇기 때문에, 특정 실패에 대해 예외처리를 해줘야합니다.

그러나 Java 7에서 추가된 `Object.requireNonNull`처럼, 유연하고 편리한 방법을 통해서 null 검사 등을 수동으로 할 필요가 없게 되었습니다.

```java
// Java의 null 검사 기능 인라인 사용
this.strategy = Objects.requireNonNull (strategy, "strategy");
```

그 이후로, Java 9에서는 범위 검사 기능이 `java.util.Objects`에 추가되었으며, 이러한 방법은 checkFromIndexSize, checkFromToIndex, checkIndex 등을 사용할 수 있습니다.

nonpublic method는 `assertions`을 사용해서 매개변수를 확인할 수 있습니다.

```java
// 재귀 적 정렬을 위한 private helper function
private static void sort(long a[], int offset, int length) {
  assert a != null;
  assert offset >= 0 && offset <= a.length;
  assert length >= 0 && length <= a.length - offset;
  ... // Do the computation
}
```

`assert`의 기본 원리는 패키지가 클라이언트에 의해 사용되는 방식에 관계없이 asserted condition이 true라는 주장으로 진행됩니다. 그렇기 때문에, 일반 유효성 검사와 달리 assertions은 만약 실패할시, `AssertionError`가 발생합니다.

- [Assertions 공식 문서](https://docs.oracle.com/javase/8/docs/technotes/guides/language/assert.html)

이외에도 여러 조건에 따라 확인할 수 있는 부분이 있고, 확인할 수 없는 부분이 있습니다.

결론적으로는 **메소드나 생성자를 작성할 때마다, 매개 변수에 어떤 제한이 있는지를 생각**해야합니다. 이러한 제한 사항을 문서화하여야하며, method body의 시작 부분에 명시적인 검사를 적용해야하며, 이러한 습관을 가지고 있어야합니다.

<br/>

## Item 50. 필요할 때, 방어적 사본을 생성합니다.

Java의 장점 중 하나는, safe language입니다. 이는 메모리 손상 오류에 영향을 받지않음을 의미하며, 이를 통해서 어떤 일이 일어나도 불변성이 유지될 것이라 확신하고 진행할 수 있습니다.

다만, 이 경우에도 코드를 개판... 으로 짜면 문제가 발생할 수 있습니다. 따라서 **클래스의 클라이언트가 위험하게 구성될 수 있다는 가정하에, 방어적으로 프로그래밍해야합니다.**

```java
// Broken "immutable" time period class
public final class Period {
  private final Date start;
  private final Date end;

  public Period(Date start, Date end) {
    if (start.compareTo(end) > 0)
      throw new IllegalArgumentException(
    start + " after " + end);
    this.start = start;
    this.end   = end;
  }

  public Date start() { return start; }

  public Date end() {   return end;   }

  ...    // Remainder omitted
}

public static void main() {
  // Period 인스턴스의 내부를 공격한 경우.
  Date start = new Date();
  Date end = new Date();
  Period p = new Period(start, end);
  end.setYear(78); // p 내부가 수정됩니다.
}
```

이러한 경우처럼, Date가 더이상 사용되지 않으면 이를 새로운 코드에서 사용하면 안됩니다. 따라서 이러한 문제에서 인스턴스 내부를 보호하려면, **생성자에 대한 각 변경 가능한 매개 변수의 방어적 복사본을 만드는 것이 중요합니다.**

```java
// 변경된 생성자, 매개 변수의 방어적 복사본을 만듭니다.
public Period (Date start, Date end) {
  this.start = new Date (start.getTime ());
  this.end = new Date (end.getTime ());

  if (this.start.compareTo (this.end)> 0)
    throw new IllegalArgumentException (
  this.start + "after"+ this.end);
}
```

이렇게 사용하면 위의 문제를 해결할 수 있습니다. 그러나 아래처럼, 데이터를 바꿀 수 도 있습니다.

```java
Date start = new Date ();
Date end = new Date ();
Period p = new Period(start, end);
p.end().setYear(78); // p의 내부를 수정합니다!
```

이를 해결할려면 다음처럼 또 할 수 있습니다.

```java
// 수리 된 접근 자-내부 필드의 방어용 복사본 만들기
public Date start () {
  return new Date (start.getTime ());
}

public Date end () {
  return new Date (end.getTime ());
}
```

이와 같이 새로운 생성자와 새로운 접근자를 사용함을 통해서 방어적 코딩을 할 수 있습니다.

**클라이언트에서 클래스를 가져오거나, 반환하는 경우에 변경 가능한 요소가 있는 경우에는 클래스는 구성 요소를 방어적으로 복사해야합니다. 복사를 할 수 없는 환경이면, 사용하는 클라이언트를 신뢰하는 구조로 가야하면서, 이를 수정하지 않도록 문서화시켜야합니다.**

<br/>

## Item 51. 메서드 이름을 신중하게 설계합니다.

아래의 규칙을 지켜야합니다.

### 메서드 이름을 신중하게 선택해야합니다.

- 이해하기 동일한 패키지의 다른 이름과 일치하는 이름을 선택합니다.
- 광범위한 합의와 일치하는 이름을 선택하는 것이 좋습니다.

### 편리한 방법을 제공하는데 너무 과하게 사용하면 안됩니다.

- 너무 많아지면 이를 사용하고 문서화하고 테스트, 유지하는데 어려워집니다.

### 너무 긴 매개변수는 피합니다.

- 4개 이하의 매개변수를 사용하는 것이 좋습니다.
- 동일한 형식의 매개 변수 시퀀스가 길면 안좋습니다.

이를 해결하는 방법은 다음과 같습니다.

- 메서드를 여러 메서드로 나눕니다.
- 매개 변수 그룹을 보유하는 `helper class`를 만듭니다.
- 메서도 호출까지 Builder 패턴을 적용합니다.

### 매개변수 유형의 경우, 클래스보다 인터페이스를 선호합니다.

매개 변수를 정의하는데 적합한 인터페이스가 있는 경우, 인터페이스를 구현하는 클래스를 대신 사용하는 것이 좋습니다.

### boolean의 의미가 메서드 이름에서 명확하지 않으면,boolean 매개 변수 보다는 요소가 두개인 Enum 형을 쓰는 것이 중요합니다.

열거형을 통해서 코드를 더 쉽게 읽고 쓸 수 있습니다.

<br/>

## Item 52. 오버로딩을 신중하게 사용합니다.

아래는 집합, 목록, 또는 다른 종류의 컬렉션인지에 따라 컬렉션을 분류하는 의도로 된 목적으로 된 코드입니다. 그러나 잘못된 코드입니다.

```java
public class CollectionClassifier {
  public static String classify(Set<?> s) {
    return "Set";
  }

  public static String classify(List<?> lst) {
    return "List";
  }

  public static String classify(Collection<?> c) {
    return "Unknown Collection";
  }

  public static void main(String[] args) {
    Collection<?>[] collections = {
      new HashSet<String>(),
      new ArrayList<BigInteger>(),
      new HashMap<String, String>().values()
    };

    for (Collection<?> c : collections)
      System.out.println(classify(c));
  }
}

/* Output
 * : Unknown Collection
 * : Unknown Collection
 * : Unknown Collection
 */
```

다음과 같이 발생하는 원인은, `classify` 메서드가 overload되고 호출할 overload가 컴파일 타임에 선택되기 때문입니다.

오버로드된 메서드 중에서 선택이 static이고, 재정의된 메서드 중에서 선택이 `dynamic`이기 때문에 직관적이지 않습니다. 즉, 오버로딩된 메서드의 올바른 버전은 런타임에 선택되고, 메서드가 호출되는 개체의 런타임 유형을 기반으로 합니다.

즉, 상위 클래스의 메서드 선언과 동일한 시그니처가 있는 메서드 선언이 하위 클래스에 포함되어 있으면 메서드가 재정의 됩니다. 이를 잘표현 코드는 다음과 같습니다.

```java
class Wine {
  String name() { return "wine"; }
}

class SparklingWine extends Wine {
  @Override String name() { return "sparkling wine"; }
}

class Champagne extends SparklingWine {
  @Override String name() { return "champagne"; }
}

public class Overriding {
  public static void main(String[] args) {
    List<Wine> wineList = List.of(
      new Wine(), new SparklingWine(), new Champagne());

    for (Wine wine : wineList)
      System.out.println(wine.name());
  }
}

/* Output
 * : wine
 * : sparkling wine
 * : champagne
 */
```

또 다른 방법으로 아래처럼 `instanceof`를 사용할 수도 있습니다.

```java
public static String classify(Collection<?> c) {
  return c instanceof Set ? "Set" :
    c instanceof List ? "List" : "Unknown Collection";
}
```

오버라이딩(overriding)은 표준이고, 오버로딩(overloading)이기 때문에, 오버라이딩(overriding, 재정의)는 메서드 호출의 동작에 대해 사람들의 예상을 설정할 수 있습니다. 그러나 오버로딩(overloading)은 여러 expectations에 혼란을 줄 수 있습니다.

이러한 잘못된 오버로딩의 사용은, 어떠한 것이 호출되는지 모르기 때문에 어려움을 겪을 수 있습니다. 따라서 **혼란스러운 오버로딩 사용을 피해야합니다.**

여러 오버로딩을 잘사용하는 방법은 이야기가 많지만, **안전하고 보수적인 정책은 동일한 수의 매개 변수로 두 개의 오버로딩을 내보내지 않는 것입니다.** 이러한 제한을 통해서 메서드를 오버로드하는 대신 항상 다른 이름을 지정할 수 있습니다.

예를 들면, write 메서드 대신에, writeBoolean, writeInt, writeLong 등이 있으며 이를 통해서 대응하는 메서드를 바로 확인할 수 있다는 점입니다.

오버로딩을 애매하게 사용하는 부분은 Java 5 이전부터 존재했으며, Java 8에서 람다가 나오고 나서 더 헷갈리게 되었습니다. 또한 동일한 인수 위치에서 서로 다른 기능적 인터페이스를 사용하는 메서드 또는 생성자를 오버로딩하면 혼란을 만듭니다. **동일한 인수 위치에서 다른 기능 인터페이스를 사용하기 위해 메서드를 오버로드하면 안됩니다.**

결론적으로는, 메서드를 오버로드할 수 있다고 꼭 할 필요가 없습니다. 일반적으로 동일한 수의 매개 변수를 가진 여러 시그니처가 있는 메서드를 오버로드하지 않는 곳이 좋습니다. 일부 생성자와 관련되어 이가 힘들 수도 있지만, 캐스트를 통해서 동일한 매개 변수가 다른 오버로딩에 전달되는 것은 막아야합니다.

<br/>

## Item 53. Varargs를 신중하게 사용합니다.

`variable arity` 메서드로 알려진 Varargs 메서드는 지정된 유형의 0개 이상의 이상의 인수를 허용합니다. varargs 기능은 먼저 arguments 배열을 만들고, 다음 argument 값을 배열에 넣고, 마지막으로 배열을 메서드에 전달하는 방식으로 작동합니다.

아래는 대표적인 예시입니다.

```java
// 간단한 varargs 사용
static int sum(int... args) {
  int sum = 0;
  for(int arg : args)
    sum += arg;
  return sume;
}
```

그러나 때로는 0 개 이상의 인수가 아닌 특정 유형의 하나 이상의 인수 가 필요한 메서드를 작성하는 것이 적절합니다

아래는 잘못된 코드입니다.

```java
static int min(int... args) {
  if (args.length == 0)
    throw new IllegalArgumentException("Too few arguments");

  int min = args[0];
  for (int i = 1; i < args.length; i++)
    if (args[i] < min)
      min = args[i];
  return min;
}
```

위의 문제는 클라이언트가 인수없이 메서드를 호출하면 컴파일 에러가 아닌 런타임 에러가 발생합니다. 이를 해결하기 위해서는 두개의 매개 변수를 사용할 수 있습니다.

```java
// The right way to use varargs to pass one or more arguments
static int min(int firstArg, int... remainingArgs) {
  int min = firstArg;
  for (int arg : remainingArgs)
    if (arg < min)  min = arg;
  return min;
}
```

성능이 중요한 상황에서 varargs를 사용할 때는 주의해서 사용해야합니다. varargs 메서드를 호출할 때 마다 배열 할당 및 초기화가 발생합니다. 이러한 경우 성능적인 이슈를 해결하기 위해서는 다음과 같은 패턴을 사용할 수도 있습니다.

```java
public void foo() { }
public void foo(int a1) { }
public void foo(int a1, int a2) { }
public void foo(int a1, int a2, int a3) { }
public void foo(int a1, int a2, int a3, int... rest) { }
```

이는 일반적으로 적절하지않지만, 일부 경우에서 적용될 수 있습니다.

즉, varargs는 가변 개수의 인수로 메서드를 정의해야할 때 매우 유용합니다. varargs 매개 변수 앞에 필수 매개 변수를 추가하고 varargs 의 성능에 대해 유의해야합니다.

<br/>

## Item 54. Null이 아닌 빈 컬렉션이나 배열을 반환합니다.

```java
// 빈 컬렉션을 나타 내기 위해 null을 반환합니다. -> 좋지 않습니다.
private final List<Cheese> cheesesInStock = ...;

public List<Cheese> getCheeses() {
  return cheesesInStock.isEmpty() ? null
    : new ArrayList<>(cheesesInStock);
}
```

이러한 경우, 클라이언트 측에서는 null을 처리하기 위해서 추가 코드가 필요합니다.

```java
List<Cheese> cheeses = shop.getCheeses();
if (cheeses != null && cheeses.contains(Cheese.STILTON))
  System.out.println("Jolly good, just the thing.");
```

이런 처리가 필요없게 하기 위해서는 다음과 같이 작성하는 것이 좋습니다.

```java
List<Cheese> cheeses = shop.getCheeses();
if (cheeses != null && cheeses.contains(Cheese.STILTON))
  System.out.println("Jolly good, just the thing.");
```

이를 더 최적화하면 아래처럼 표현할 수 있습니다.

```java
// 최적화-빈 컬렉션 할당 방지
public List <Cheese> getCheeses () {
  return cheesesInStock.isEmpty ()? Collections.emptyList ()
    : new ArrayList <> (cheesesInStock);
}
```

배열도 비슷한 방식으로 처리할 수 있으며, 최적화할 수 있습니다.

```java
// 최적화-빈 배열 할당 방지
private static final Cheese [] EMPTY_CHEESE_ARRAY = new Cheese [0];

public Cheese [] getCheeses () {
  return cheesesInStock.toArray (EMPTY_CHEESE_ARRAY);
}
```

이를 요약하면, **빈 배열이나 컬렉션 대신에 null을 반환하면 안됩니다.**

<br/>

## Item 55. Optionals를 신중하게 반환합니다.

Java 8 이전에는 특정 상황에서 값을 반환 할 수 없는 메서드를 작성할 때, 취할 수 있는 두 가지 접근 방식이 있습니다. 보통 예외를 throw 하거나 반환할 수 있습니다. 하지만 디 두 접근 방식 모두 완벽하지는 않습니다.

Java 8에는 값을 반환 할 수 없는 메서드를 작성하는 세번 째 접근 방식이 있습니다. (`Optional<T>`)

`Optional<T>`는 개념적으로 T를 반환하지만 그렇게 할 수 없는 경우에는 대신에 Optional<T>를 반환합니다. `Optional`의 반환 값은 예외를 던지거나, null을 던지는 거보다 유연하고 쉽습니다.

```java
// 컬렉션에서 최대 밧 반환, 비어있는 경우 예외 발생
public static <E extends Comparable<E>> E max(Collection<E> c) {
  if (c.isEmpty())
    throw new IllegalArgumentException("Empty collection");

  E  9result = null;
  for (E e : c)
    if (result == null || e.compareTo(result) > 0)
      result = Objects.requireNonNull(e);

  return result;
}
```

이를 `Optional`릍 통해서 수정할 수 있습니다.

```java
public static <E extends Comparable<E>> Optional<E> max(Collection<E> c) {
  if (c.isEmpty())
    return Optional.empty();

  E result = null;
  for (E e : c)
    if (result == null || e.compareTo(result) > 0)
      result = Objects.requireNonNull(e);

  return Optional.of(result);
}
```

다만, `Optional-returning` 메서드에서 null 값을 반환하면 안됩니다. 이는 `Optional`의 목적을 무시하는 것입니다. 또한 `Optional`을 통해서 다른 메서드에서도 사용할 수 있습니다.

```java
// 컬렉션의 최대 값을 Optional <E>로 반환-스트림을 사용
public static <E extends Comparable <E >> Optional <E> max (Collection <E> c) {
  return c.stream().max(Comparator.naturalOrder());
}
```

```java
// 선택 사항을 사용하여 선택한 기본값 제공
String lastWordInLexicon = max(words).orElse( "No words ...");
```

```java
// 선택 사항을 사용하여 선택한 예외 발생
Toy myToy = max (toys).orElseThrow(TemperTantrumException::new);
```

```java
// 반환 값이 있다는 것을 알고있을 때 선택 사항 사용
Element lastNobleGas = max(Elements.NOBLE_GASES).get() ;
```

위의 이러한 방법들을 통해서 적절한 해결책을 찾지 못한 경우에는 `Optional`의 `isPresent().true`를 사용하는 것도 나쁘지 않습니다. 또한 snippset을 사용하는 것도 좋습니다.

```java
// snippset 코드
Optional<ProcessHandle> parentProcess = ph.parent();
System.out.println("Parent PID: " + (parentProcess.isPresent() ?
  String.valueOf(parentProcess.get().pid()) : "N/A"));

// Optional의 map 기능을 사용한 코드
System.out.println("Parent PID: " +
  ph.parent().map(h -> String.valueOf(h.pid())).orElse("N/A"));
```

자바의 Stream을 사용하는 경우, 아래처럼 `Optional`을 적용할 수 있습니다. (Java9에서는 스트림에 `Optional`이 추가되었습니다.)

```java
// Java 8
streamOfOptionals
  .filter(Optional::isPresent)
  .map(Optional::get)

// Java 9
streamOfOptionals
  .flatMap(Optional::stream)
```

그러나 모든 반환 유형에서 적용되는 것은 아닙니다. `Collections`, `Maps`, `Streams`, `Arrays`, `Optionals` 을 포함하는 컨테이너 유형은 옵션으로 래핑해서는 안됩니다. 이 경우에는 `Optional<List<T>>`를 반환하는 것 보다는 `List<T>`를 반환하는 것이 좋습니다.

결과를 반환 할 수 없는 경우, `Optional<T>`를 반환하는 메서드를 선언해야하며, 결과가 반환되지 않으면 클라이언트가 특별한 처리를 수행해야합니다.

boxed primitive type을 포함하는 옵셔널을 반환하는 것은, 비용이 매우 큽니다. 따라서 `Boolean`, `Byte`, `Character`, `Short`, `Float` 형을 제외하고는 `boxed primitive type`을 Optional로 반환하면 안됩니다.

앞서 Optional 을 반환하고, 치를 처리하는 방법에 대해 설명했습니다. 이를 다른 가능한 사용에 대해 이야기 하지 않은 이유는, 이를 잘 못 사용하면, 불필요한 복잡성을 만들기 때문입니다. Collection이나 array의 key, value, element 로 Optional을 사용하는 것은 적절하지 않습니다.

이를 정리하면, **항상 값을 반환할 수 없는 메서드를 작성하고 메서드 사용자가 호출 할 때마다, 이 가능성을 고려하는 것을 중요하다고 생각하면 `Optional`을 사용하는 것이 좋습니다.** 그러나, 이 경우 성능에 대한 부분을 고려해야합니다. 성능이 중요한 메서드의 경우에는 null을 반환하거나, throw하는 것이 더 좋을 수 있습니다.

<br/>

## Item 56. 노출된 모든 API 요소에 대한 문서 주석을 작성합니다.

API를 사용할 수 있으려면 문서화해야합니다. 전통적으로 API 문서는 수동으로 생성되었으며 코드와 동기화를 유지하는 어려운 일입니다.

문서 주석 규칙은 공식적으로 언어의 일부는 아니지만 모든 Java 프로그래머가 알아야하는 사실상의 API를 구성합니다. 대표적인 문서 태그로 Java 9의 `{@index}`, Java 8의 `{@implSpec}`, Java 5의 `{@literal}`, `{@code}` 등이 있습니다.

API를 올바르게 문서화하려면 내보낸 모든 클래스, 인터페이스, 생성자, 메소드 및 필드 선언 앞에 주석을 붙여야합니다. 또한 메서드에 대한 문서 주석은 메서드와 클라이언트 간의 계약을 간결하게 설명해야합니다.

이를 표현한 코드는 다음과 같습니다.

```java
// ({@code index < 0 || index >= this.size()})
E get(int index);
```

```java
 /* 이 컬렉션이 비어 있으면 true를 반환합니다.
  * @implSpec
  * 이 구현은 {@code this.size () == 0}을 반환합니다.
  * @return true if this collection is empty
  */
public boolean isEmpty () {...}
```

**문서 주석은 소스 코드와 생성된 문서 모두에서 읽을 수 있어야합니다.** 또한, 클래스 또는 인터페이스의 두 멤버 또는 생성자는 동일한 요약 설명을 가져서는 안됩니다.

이를 사용한 예제 코드는 아래와 같습니다.

```java
/**
 * A suspect, such as Colonel Mustard or {@literal Mrs. Peacock}.
 */
public enum Suspect { ... }
```

```java
* This method complies with the {@index IEEE 754} standard.
```

```java
 /** 키를 값에 매핑하는 객체. 맵은 중복 키를 포함 할 수 없습니다
  * 각 키는 최대 하나의 값에 매핑 할 수 있습니다. (나머지는 생략 됨)
  * @param <K>이 맵에서 관리하는 키 유형
  * @param <V> 매핑 된 값 유형
  */
public interface Map<K, V> { ... }
```

Enum 형을 문서화할 때는 상수와, 유형 및 공용 메서드를 문서화해야합니다.

```java
 /**
  * 심포니 오케스트라의 악기 섹션.
  */
public enum OrchestraSection {
  /** 플루트, 클라리넷, 오보에와 같은 목 관악기. */
  WOODWIND,

  /** 프렌치 호른 및 트럼펫과 같은 금관 악기. */
  BRASS,

  /** 팀파니 및 심벌즈와 같은 타악기. */
  PERCUSSION,

  /** 바이올린과 첼로와 같은 현악기. */
  STRING;
}
```

```java
 /**
  * 주석이 달린 메서드가 통과하려면 지정된 예외를 throw해야하는 테스트 메서드임을 나타냅니다.
  */
@Retention (RetentionPolicy.RUNTIME)
@Target (ElementType.METHOD)
public @interface ExceptionTest {
 /**
  * 통과하기 위해 주석이 달린 테스트 메서드가 throw해야하는 예외입니다 .
  * (테스트는 이 클래스 객체가 설명하는 유형의 하위 유형을 던질 수 있습니다.)
  */
  Class <? Throwable> value ();를 확장합니다.
}
```

또한 API의 두가지 측면은 스레드 안전성고 직렬화 가능성입니다. 또한 **클래스 또는 정적 메서드가 스레드로부터 안전한지 여부에 관계없이, 스레드 안전성을 문서화**해야합니다. 이를 문서화 해야지, 이후에 관리를 하기 편합니다.

이를 요약하면 문서 주석은 API를 문서화하는 가장 효과적인 방법입니다. **내보낸 모든 API 요소에 대한 사용은 필수로 간주해야합니다. 따라서 표준 규칙을 준수하는 일관된 스타일을 채택해야합니다.**
