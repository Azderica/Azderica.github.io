---
title: '[Java] Effective Java, 제네릭'
slug: 04-java-effective-java
date: 2021-04-26
published: true
tags: ['Java', 'Stater', 'Effective Java', 'Generic']
series: false
cover_image: ./images/EffectiveJava.jpeg
canonical_url: false
description: 'Effective Java 책 중, ch5. 제네릭에 대해 정리합니다.'
---

# 제네릭

Java 5이후로, 제네릭은 언어의 일부였습니다. 제네릭을 사용하면 각 컬렉션에서 허용되는 개체 유형을 컴파일러에 알리고, 자동으로 캐스트를 삽입합니다. 대부분 프로그램이 더 안전하고 명확하지만, collections에만 한정적이지 않기 때문에 신경을 써야하는 부분이 있습니다.

## Item 26. Raw 타입을 사용하면 안됩니다.

Raw 타입을 잘못 사용한 코드와 잘된 코드는 다음과 같습니다.

```java
// Raw collection type
private final Collection stamps = ...;

// Parameterized collection type - typesafe
private final Collection<Stamp> stamps = ...;
```

Raw 타입을 사용하면, 제네릭의 안전성과 표현력 이점을 잃게 되므로 사용하면 안됩니다.

```java
// 제한되지 않은 와일드 카드 유형을 사용 - typesafe하고, 유연합니다.
static int numElementsInCommon (Set <?> s1, Set <?> s2) {...}
```

클래스 리터럴에는 원시 유형을 사용할 수 있는데, 대표적으로 `instanceof` 가 있습니다.

```java
// raw type의 합법적 사용 - instanceof 연산자
if (o instanceof Set) { // Raw type
  Set<?> s = (Set<?>) o;    // Wildcard type

  ...
}
```

즉, 정리하면 raw type을 사용하면 런타임에 예외가 발생할 수 있기 때문에 사용하지 않는 것이 중요하며, 제네릭 도입 이전의 레거시 코드와의 호환성 및 상호 운용성을 위해서만 사용해야합니다.

<br/>

## Item 27. 확인되지 않은 경고를 제거합니다.

제네릭으로 프로그래밍할 때 확인되지 않은 캐스트 경고, 확인되지 않은 메서드 호출 경고, 확인되지않은 매개 변수인 vararg 유형 경고 및 다양한 컴파일러 경고가 발생합니다.

이 경우에, **확인되지 않은 모든 경고를 제거해야합니다.**

일부 경고를 제거할 수는 없지만, 경고를 유발한 코드가 typesafe하다는 것을 증명할 수 있는 경우 `@SuppressWarnings("unchecked")` 주석으로 경고를 억제할 수 있습니다. (다만, 이는 가능한 작은 범위에서 사용하는 것이 중요합니다.)

```java
// @SuppressWarnings의 범위를 줄이기 위해 지역 변수를 추가합니다.
public <T> T[] toArray(T[] a) {
  if (a.length < size) {
    // 이 캐스트는 우리가 만들고있는 배열이기 때문에 정확합니다.
    // 전달 된 것과 동일한 유형, 즉 T []입니다.

    @SuppressWarnings("unchecked") T[] result =
      (T[]) Arrays.copyOf(elements, size, a.getClass());
    return result;
  }

  System.arraycopy(elements, 0, a, 0, size);
  if (a.length > size)
    a[size] = null;
  return a;
}
```

추가적으로, `@SuppressWarnings("unchecked")` 주석을 사용할 때마다, 안전한 이유를 설명하는 주석을 추가하는 것이 필요합니다.

<br/>

## Item 28. Arrays 보다는 List를 선호합니다.

Array는 제네릭 유형과 두가지 중요한 측면에서 다릅니다.

- 1. 배열은 covariant(함께 변할 수 있고), 제네릭은 erasure(불변)입니다.

```java
// Runtime에 실패함.
Object[] objectArray = new Long[1];
objectArray[0] = "I don't fit in";  // ArrayStoreException 에러가 발생합니다.

// Compile되지 않습니다.
List<Object> ol = new ArrayList<Long> (); // 호환되지 않음
ol.add("I don't fit in");
```

- 2. 배열은 reified

```java
// 배열 생성이 불가능하며 컴파일되지 않습니다.
List<String>[] stringLists = new List<String>[1];
List<Integer> intList = List.of(42);
Object[] objects = stringLists;
objects[0] = intList;
String s = stringLists[0].get(0);
```

<br/>

## Item 29. Generic types을 선호합니다.

일반적으로 선언을 매개 변수화하고 JDK에서 제공하는 제네릭 유형 및 메소드를 사용하는 것은 어렵지 않으며, 그만한 가치가 있습니다.

```java
// 객체 기반 컬렉션-제네릭의 주요 후보
public class Stack {
  private E[] elements;
  private int size = 0;
  private static final int DEFAULT_INITIAL_CAPACITY = 16;

  // 요소 배열에는 push (E)의 E 인스턴스 만 포함됩니다.
  // 이것은 타입 안전성을 보장하기에 충분하지만
  // 배열 의 런타임 타입은 E []가 아닙니다; 항상 Object []입니다!
  @SuppressWarnings ( "unchecked")
  public Stack() {
    elements = (E[]) new Object[DEFAULT_INITIAL_CAPACITY];
  }

  public void push(E e) {
    ensureCapacity();
    elements[size++] = e;
  }

  public E pop() {
    if (size == 0)
      throw new EmptyStackException();

    // 일반 스택을 실행하는 작은 프로그램
    @SuppressWarnings("unchecked")
    E result = elements[--size];
    elements[size] = null; // Eliminate obsolete reference
    return result;
  }

  public boolean isEmpty() {
    return size == 0;
  }

  private void ensureCapacity() {
    if (elements.length == size)
      elements = Arrays.copyOf(elements, 2 * size + 1);
  }
}
```

다음과 같이 경고 창을 제거할 수 있습니다.

<br/>

## Item 30. Generic methods를 선호합니다.

클래스가 제네릭일 수 있는 것처럼 메소드도 가능합니다.

```java
// Uses raw types - 허용되지 않습니다.
public static Set union(Set s1, Set s2) {
  Set result = new HashSet(s1);
  result.addAll(s2);
  return result;
}

// Generic method
public static <E> Set<E> union(Set<E> s1, Set<E> s2) {
  Set<E> result = new HashSet<>(s1);
  result.addAll(s2);
  return result;
}
```

이러한 generic method를 사용하는 간단한 코드는 다음과 같습니다.

```java
public static void main(String[] args) {
  Set<String> guys = Set.of("Tom", "Dick", "Harry");
  Set<String> stooges = Set.of("Larry", "Moe", "Curly");
  Set<String> aflCio = union(guys, stooges);
  System.out.println(aflCio);
}
```

식별함 후 디스펜서를 작성하면 다음과 같습니다.

```java
// 일반 싱글 톤 팩토리 패턴
private static UnaryOperator <Object> IDENTITY_FN = (t)-> t;

@SuppressWarnings ( "unchecked")
public static <T> UnaryOperator <T> identityFunction () {
  return (UnaryOperator <T>) IDENTITY_FN;
}
```

컬렉션의 최대 값을 계산하는 코드입니다.

```java
// 컬렉션에서 최대 값을 반환합니다. 재귀 유형 바인딩을 사용합니다.
public static <E extends Comparable<E>> E max(Collection<E> c) {
  if (c.isEmpty())
    throw new IllegalArgumentException("Empty collection");

  E result = null;
  for (E e : c)
    if (result == null || e.compareTo(result) > 0)
      result = Objects.requireNonNull(e);
  return result;
}
```

위의 내용을 요약하면 다음과 같습니다.

generic type과 같은 generic methods는 클라이언트가 입력 매개 변수에 명시적 캐스트를 입력하고 값을 반환해야하는 메서드보다 안전하고 사용하기 쉽습니다. 이를 위해 캐스트 없이 메소드를 사용할 수 있게 해야합니다. (generic)

<br/>

## Item 31. API 유연성을 향상시키기 위해서, 제한된 Wildcards를 사용합니다.

고정된 유형보다는 더 많은 유연성을 제공하는 것이 필요합니다. 아래의 코드는 이러한 유연성을 표현한 public API입니다.

```java
public class Stack<E> {
  public Stack();
  public void push(E e);
  public E pop();
  public boolean isEmpty();
}
```

이를 사용하는 와일드 카드 유형은 다음과 같습니다.

```java
// E producer 역할을 수행하는 매개 변수의 와일드 카드 유형
public void pushAll(Iterable<? extends E> src) {
  for (E e : src)
    push(e);
}

// E consumer 역할을하는 매개 변수의 와일드 카드 유형
public void popAll(Collection<? super E> dst) {
  while (!isEmpty())
    dst.add(pop());
}
```

이러한 코드처럼, 유연성을 최대화려면 Producer와 Consumer를 나타내는 입력 매개 변수에 와일드 카드 유형을 사용하면 됩니다.

PECS(Producer extends and Consumer super)

- Get 과 Put 원칙이며, structure에서 값을 얻을 때 `extends` 와일드 카드를 사용하고, structure에서 값을 넣을때 `super` 와일드 카드를 사용합니다.

그러나, 클래스 사용자가 와일드 카드 유형에 대해 생각하고 개발해야한다면, API에 문제가 발생할 수 있습니다. 즉, 아래의 코드는 문제가 발생하는 코드입니다.

```java
public static <E> Set<E> union(Set<? extends E> s1, Set<? extends E> s2)
```

```java
Set <Integer> 정수 = Set.of (1, 3, 5);
Set <Double> doubles = Set.of (2.0, 4.0, 6.0);

// 에러 발생, #1과 #2가 교차 유형이므로
Set <Number> numbers = union (integers, doubles);

// 이를 해결하는 코드는 아래와 같습니다.
Set <Number> numbers = Union.<Number>union(integers, doubles);
```

아래의 swap 메서드는 컴파일 구현에 깔끔하며, 와일드 카드 기반 선언을 잘 표현한 코드입니다.

```java
public static void swap(List<?> list, int i, int j) {
  swapHelper(list, i, j);
}

// 와일드 카드 캡처를위한 private 도우미 메서드
private static <E> void swapHelper(List<E> list, int i, int j) {
  list.set(i, list.set(j, list.get(i)));
}
```

이와 같이, API에서 와일드카드 유형을 사용하는 것은 일부 까다롭지만 API를 훨씬 더 유연하게 만듭니다. 특히, **자주 사용되는 라이브러리를 작성하는 경우에는 와일드 카드 유형의 사용은 필수적**이며 기본 규칙인 **PECS**를 기억하는 것이 중요합니다. 추가적으로 모든 비교 대상들은 consumer입니다.

<br/>

## Item 32. 제네릭과 가변인수를 신중하게 합칩니다.

가변인수 메소드와 제네릭은 Java 5에서 생겼기 때문에 같이 사용할 수 있다고 생각되지만 이는 그렇지 않습니다.

**가변 인수의 목적**은 클라이언트가 파라미터 인수를 메서드에 전달할 수 있도록 하는 것입니다.

아래의 코드는 가변인수 배열의 매개 변수에 값을 저장하는 것이 안전하지 않음을 보여줍니다.

```java
// 제네릭과 가변 인수를 혼합하면 유형 안전성을 위반할 수 있습니다!
static void dangerous(List<String>... stringLists) {
  List<Integer> intList = List.of(42);
  Object[] objects = stringLists;
  objects[0] = intList;             // Heap pollution
  String s = stringLists[0].get(0); // ClassCastException
}
```

`SafeVarargs` annotation은 typesafe 된것의 method를 보장합니다. 다만, 컴파일러가 하는 호출 경고가 사용자에게 가지 않기 때문에 이를 사용할 때는 annotation이 필요합니다.

아래는 일반적인 가변인수 메서드를 사용할 때 중요한 부분입니다.

- 가변인수 매개 변수 배열에 아무것도 저장하지 않습니다.
- 신뢰할 수 없는 배열을 만들면 안됩니다. 이를 위반하면 수정해야합니다.

아래는 좋은 코드입니다.

```java
// 제네릭 가변 인수 매개 변수가 있는 안전한 메서드
static <T> List<T> flatten(List<List<? extends T>> lists) {
  List<T> result = new ArrayList<>();
  for (List<? extends T> list : lists)
    result.addAll(list);
  return result;
}
```

이를 사용한 코드는 아래와 같습니다.

```java
audience = flatten(List.of(friends, romans, countrymen));
```

이를 정리하면, 가변 인수 기능은 배열 위의 생성된 leaky abstraction이므로, 가변 인수와 제네릭은 제대로 상호작용하지 않으며, 배열에는 generics와 다른 유형의 규칙이 있습니다. 일반 가변 인수의 매개변수는 형식이 안전하지 않습니다.

즉, 정적 팩토리 메서드를 통해서 개발하는 방법이 `@SafeVarargs` annotation을 신경쓸 필요가 없습니다.

<br/>

## Item 33. Typesafe한 혼성 컨테이너를 고려합니다.

아래 코드는, 혼성 컨테이너를 보여주는 대표적인 코드 예시입니다.

```java
// Typesafe 혼성 컨테이너 패턴 - implementation
public class Favorites {
  private Map<Class<?>, Object> favorites = new HashMap<>();
  public <T> void putFavorite(Class<T> type, T instance) {
    favorites.put(Objects.requireNonNull(type), instance);
  }

  public <T> T getFavorite(Class<T> type) {
    return type.cast(favorites.get(type));
  }
}
```

위의 Favorities 객체를 읽거나, 추가 하는 경우에는 Key에 해당하는 Class 객체를 전달해야합니다.

```java
// Typesafe 혼성 컨테이너 패턴 - client
public static void main(String[] args) {
  Favorites f = new Favorites();
  f.putFavorite(String.class, "Java");
  f.putFavorite(Integer.class, 0xcafebabe);
  f.putFavorite(Class.class, Favorites.class);

  String favoriteString = f.getFavorite(String.class);
  int favoriteInteger = f.getFavorite(Integer.class);
  Class<?> favoriteClass = f.getFavorite(Class.class);

  System.out.printf("%s %x %s%n", favoriteString, favoriteInteger, favoriteClass.getName());
}
```

위의 코드 대신에 Map을 통해서 구현할 수는 있지만, 이 경우에는 데이터를 가져오는 과정에 `ClassCastException` 런타임 에러가 발생할 수 있기 때문에 타입 안전이 보장되는 혼성 컨테이너에 비해 위험합니다.

앞서 나온 Favorites의 클래스에는 2가지 문제가 존재합니다.

- 악의적인 client가 Favorites의 원시 형식 Class 객체를 사용해서 인스턴스의 안전성을 손상시킬 수 있습니다.
- 수정 불가능한 유형에서 사용할 수 없습니다.

이러한 문제를 해결하기 위해, asSubClass를 사용할 수 있으며 컴파일 타임에 type을 알 수 없는 annotation을 읽을 수 있습니다.

```java
// asSubclass를 사용하여 제한된 유형 토큰으로 안전하게 캐스트
static Annotation getAnnotation(AnnotatedElement element, String annotationTypeName) {
  Class<?> annotationType = null; // Unbounded type token

  try {
    annotationType = Class.forName(annotationTypeName)s;
  } catch (Exception ex) {
    throw new IllegalArgumentException(ex);
  }

  return element.getAnnotation(annotationType.asSubclass(Annotation.class));
}
```

요약하면, 컬렉션 API의 예시가 된 제네릭 사용은 컨테이너당 고정된 수의 유형 매개 변수로 제한입니다. **컨테이너가 아닌 키에 type매개 변수를 배치하여 이 제한을 피할 수 있습니다.** 이러한 방법로 혼성 컨테이너의 키로 안전한 Class 객체를 사용할 수 있습니다.

> Heterogeneous Container (혼성 컨테이너)

만약 컨테이너 자체가 아닌, 요소의 키에 타입 매개변수를 두면 서로 다른 타입의 요소가 저장될 수 있는 컨테이너이며, 이를 혼성 컨테이너라고 합니다.
