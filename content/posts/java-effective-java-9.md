---
title: '[Java] Effective Java, Exceptions'
slug: 09-java-effective-java
date: 2021-05-24
published: true
tags: ['Java', 'Stater', 'Effective Java', 'Exceptions']
series: false
cover_image: ./images/EffectiveJava.jpeg
canonical_url: false
description: 'Effective Java 책 중, ch10. 예외에 대해 정리합니다.'
---

# Exceptions

## Item 69. 예외는 진짜 예외 상황에서만 사용합니다.

예외는 꼭 필요한 경우에만 사용해야합니다.아래는 잘못 사용한 케이스입니다.

```java
try {
  int i = 0;
  while(true)
    range[i++].climb();
} catch (Exception e) {
  ...
}
```

예외를 사용할 때는 몇가지 준수사항이 있습니다.

- 예외는 예외적인 상황을위해 설계되었기 때문에, JVM 구현자가 명시적으로 빠르게 할 필요가 없습니다.
- `try-catch` 블록 내에 코드를 배치하면 JVM 구현이 수행할 수 있는 특정 최적화가 금지됩니다.
- 배열을 반복하는 표준 관용구가 반드시 중복 검사를 발생시키는 것이 아닙니다.

따라서, 예외는 반드시 예외 상황에서만 사용해야하며 일반적인 제어 흐름에서는 절대로 사용하면 안됩니다. 이를 위해 상태 검사 메서드 등을 제공하거나, Optional, 또는 특정 값을 반환하면 안됩니다.

이는 API 설계에도 적용되는 규칙입니다. 잘 설계된 API는 클라이언트가 일반 제어 흐름에 예외를 사용하도록 강요하면 안됩니다.

아래와 같은 코드는 매우 잘못된 코드입니다.

```java
// 컬렉션 반복에 이런 코드는 최악입니다.
try {
  Iterator <Foo> i = collection.iterator ();
  while (true) {
    Foo foo = i.next ();
    ...
  }
} catch (NoSuchElementException e) { ... }
```

위와 같은 코드는 매우 잘못된 코드입니다. 따라서, 예외는 예외적인 조건을 위해 설계되었습니다. 일반적으로 사용하는 제어문에 사용하면 안되며, 다른 사람들이 그렇게 하도록 강요하는 API를 작성하면 안됩니다.

<br/>

## Item 70. 복구 가능한 조건에는 체크된 예외를 사용하고, 프로그래밍 오류에는 런타임 예외를 사용합니다.

자바는 `checked exception`, `runtime exception`, `errors`의 3가지 종류의 throwable을 제공합니다. 각 종류의 throwable을 사용하는 것이 적절한 시기에 대해 프로그래머 간에 약간의 혼동이 있습니다.

검사 예외(`checked exception`)와 비검사 예외(`unchecked exception`)를 구분하는 기본 규칙은 간단합니다.

호출하는 쪽에서 복수할 수 있다고 생각된다면 `checked exception`를 사용합니다. `checked exception`를 던지면, `try-catch`로 처리하거나 `throw`를 이용해서 더 바깥쪽으로 전파하도록 강제합니다

`unchecked exception`은 `runtime exception`와 `errors`가 있습니다. 이 이러한 경우는 프로그램에서 잡을 필요가 없거나 잡아도 득보다 실이 많은 경우입니다. 또한 `throwable`의 경우 직접 구현이 가능한데, `Exception`, `RuntimeException`, `Error` 클래스를 상속하지 않는 구현은 좋지 않습니다.

> [Exception에 대한 글](https://madplay.github.io/post/java-checked-unchecked-exceptions)

즉, 복구 가능한 조건에 대해서는 `checked exception`를 써야하고, 프로그래밍 오류에 대해서는 `runtime exception`를 던져야합니다. 확실하지 않는 경우에서는 `unchecked exceptions`를 throw 합니다. `checked exception`이나 `runtime exception`가 아닌 경우, `throwable`을 정의하면 안됩니다.

<br/>

## Item 71. `checked exceptions`의 불필요한 사용을 피합니다.

많은 Java 프로그래머는 `checked exceptions`를 싫어하지만, 제대로 사용하게 되면 API와 프로그램을 향상시킬 수 있습니다. 하지만 이를 과하게 사용하거나 잘못 사용하면 불편한 API가 될 수 있습니다.

메서드가 `checked exceptions`를 던질 수 있는 경우에는, 이를 호출하는 곳에서 예외를 확인하고 `throw`해야합니다. 다만, `stream`에서는 사용할 수 없습니다.

일반적으로 `checked exceptions`와 `unchecked exceptions` 중 어떤 것을 선택해야할 지 고민되는 경우가 있는데, 이에 대해 조치를 할 수 있는 부분이라면 `checked exceptions`를 사용하고 그렇지 않으면 대부분은 `unchecked exceptions`를 사용하는 것이 중요합니다.

### checked exceptions를 피하는 방법

대표적인 예시로, 예외 대신 빈 Optional을 사용하는 방법이 있습니다. (다만, 부가 정보를 담을 수 없습니다.)

```java
// 변경 전
try {
  obj.action(args);
} catch (TheCheckedException e) {
  // 예외 핸들링
}
```

```java
// 변경 후
if (obj.actionPermitted(args)) {
  obj.action(args);
} else {
  // 예외 조건 처리
}
```

다만 위 코드의 경우 예외에 대해 유연하게 처리할 수는 있지만, 객체 상태가 변할 수 있기 때문에 thread safe하지는 않습니다.

<br/>

## Item 72. 표준 예외를 사용합니다.

자바 라이브러리에서는 대부분의 API의 예외 발생 요구 사항을 대부분 처리하는데 도움이 되는 예외를 제공합니다. 따라서 예외도 재사용하는 것이 좋습니다. 예외 클래스의 수가 적을수록 메모리의 사용량이 줄며, 클래스 적재 시간도 적게 걸리며 사용자 입장에서도 읽기 쉽고 익숙합니다.

하지만, `Exception`, `RuntimeException`, `Throwable`를 재사용하거나 `Error`를 직접적으로 사용하는 경우는 매우 좋지 않습니다.

주로 사용하는 예외목록은 다음과 같습니다.

- `IllegalArgumentException`
  - 허용하지 않는 값이 인수로 건네진 경우
  - null의 경우는 `NullPointerException`이 처리
- `IllegalStateException`
  - 객체가 메서드를 수행하기에 적절하지 않은 상태인 경우
- `NullPointerException`
  - null을 허용하지 않는 메서드에 null을 건낸 경우
- `IndexOutOfBoundsException`
  - 인덱스가 범위를 넘은 경우
- `ConcurrentModificationException`
  - 허용하지 않는 동시 수정이 발생된 경우
- `UnsupportedOperationException`
  - 호출된 메서드를 지원하지 않는 경우

이 외에도 더 필요한 경우에는 표준 예외를 확장하는 것이 좋습니다. 하지만, 예외는 직렬화할 수 있으며 이 경우네는 다만 부담이 크므로 사용하지 않는 것이 좋습니다.

<br/>

## Item 73. 추상화에 수준에 맞는 예외를 던집니다.

어떤 예외가 발생했을 때, 다른 예외가 발생하면 당황스럽습니다. 이런 경우는 메서드가 저수준 예외를 처리하지 않고, 상위로 전파했을 때 종종 발생합니다. 이를 피할려면 `exception translation` 기법을 사용하면 됩니다. 상위 계층에서 저수준의 예외를 잡아서 추상화 수준에 맞는 예외로 던지는 것입니다.

```java
try {
  // 저수준 추상화를 이용한다.
} catch (LowerLevelException e) {
  // 추상화 수준에 맞게 번역한다.
  throw new HigherLevelException(...);
}
```

다만, 무턱대고 예외를 전파하는 것보다는 `exception translation`가 더 좋지만, 이를 남용하는 것은 좋지않습니다. 가능하다면, 저수준 메서드가 반드시 성공해야합니다. 따라서 저수준에서 오류가 발생하지 않도록 상위에서 매개변수 값을 미리 검사하는 것도 방법입니다. 이를 통해서 사용자에게는 문제를 전파하지 않으면서도 개발자가 로그 분석이 가능합니다.

<br/>

## Item 74. 각 메소드가 던진 모든 예외를 문서화합니다.

메서드가 던지는 예외는 그 메서드를 올바르게 사용하게 하는 중요한 정보입니다. 따라서 문서화하는데 충분한 시간을 써야합니다.

개발자가 볼 수 있는 오류인 오류(Error)와 예외(Exception)에 대해 구분이 필요합니다. 오류의 경우는 시스템 적으로 정상적이지 않는 상황을 의미하며, 이는 low level에서 발생하기 때문에 개발자가 미리 처리하기 어렵습니다.

반면에 예외(Exception)의 경우는 개발자가 구현한 로직의 코드에서 발생합니다. 그렇기 때문에 이를 예방하고 대응할 수 있습니다. 따라서 이를 구분하고 이에따른 처리방법을 정리해놓는 것이 중요합니다.

### 문서화를 하는 방법

`checked exception`의 경우는 항상 따로 하나씩 선언하고, 각 예외가 발생하는 상황을 `@throws` 태그를 통해서 정확하게 문서화해야합니다. 또한 확인되지 않은 예외에 대해서는 키워드를 사용하지 않는 것이 중요합니다.

```java
/*
 * ...
 *
 * @param fileName
 * @throws IOException
 */
public void someMethod(String fileName) {
  try(Buffered br = new BufferedReader(new FileReader(filename))){
  } catch (IOException){
    // exception handling
  }
}
```

다만, `checked exception`의 경우에 공통적인 상위 클래스로 하나를 선언하는 것은 좋지 않습니다. 즉, `Exception`이라고 던지게 되면, 코드를 사용하는 입장에서 대처해야하는 예외에 대한 힌트를 제공하지 않는 것과 동일합니다. 다만, `main` 메서드에서는 괜찮습니다.

`unchecked exception`의 경우도 문서화를 진행하면 좋습니다. 일반적으로 프로그래밍 오류를 뜻하는데 발생할 수 있는 오류를 명시하면 자엽스럽게 해당 오류가 발생하지 않도록 개발할 수 있습니다.

```java
/**
 * ...
 * @param divisor
 * @throws ArithmeticException
 *     Exception may occur when divisor is zero
 */
public int someMethod(int divisor) {
  try {
    // 피제수(dividend)
    int dividend = 2_147_483_647;

    // 몫(quotient)
    int quotient = dividend / divisor;
    return quotient;
  } catch (ArithmeticException e) {
    // divisor(제수)가 0인 경우
  }
}
```

그러나 `unchecked exceptions`는 메서드의 `throw` 선언에는 넣지 않는 것이 좋습니다. 즉 아래처럼 하는 것이 좋습니다. (시각적으로 구분할 수 있습니다.)

```java
/**
 * ...
 * @param divisor
 * @throws ArithmeticException
 *     Exception may occur when divisor is zero
 */
public int someMethod(int divisor) throws ArithmeticException {
  // throws 선언에는 제외하는 것을 권장한다.
}
```

특정 클래스에 대부분의 메서드가 같은 이유로 모두 동일한 예외를 던지면 이를 클래스에 추가될 수도 있습니다.

```java
/**
 * ...
 * @throws NullPointerException
 *     All methods throw an exception if the argument is null.
 */
public class TestClass {
  /**
   * @param paramObj
   */
  public void someMethod1(Object paramObj) {
    if(paramObj == null) {
      throw new NullPointerException();
    }
    // ...
  }

  /**
   * @param paramObj
   */
  public void someMethod2(Object paramObj) {
    if(paramObj == null) {
      throw new NullPointerException();
    }
    // ...
  }
}
```

[추가 출처](https://madplay.github.io/post/document-all-exceptions-thrown-by-each-method)

<br/>

## Item 75. 예외 세부 메시지에 실패 관련 정보를 담습니다.

예외를 잡지 못하여 프로그램이 실패하면 시스템에서 자동으로 스택 추적(stack trace) 정보를 출력해줍니다. 이때 출력되는 문자열은 `Throwable` 클래스의 `toString` 메서드에서 반환하는 클래스 이름과 상세 메세지입니다.

```java
public String toString() {
  String s = getClass().getName();
  String message = getLocalizedMessage();
  return (message != null) ? (s + ": " + message) : s;
}
```

실패 순간을 적절하게 포착할려면 **발생한 예외에 관련된 모든 매개변수와 필드의 값을 실패 메세지에 담아야합니다.** 예를 들어 IndexOutOfBoundsException 이라면 범위의 최솟값, 최댓값 그리고 범위를 벗어난 인덱스의 값을 담아야합니다.

하지만 주의할 점도 있습니다. 관련된 데이터를 모두 담아야하지만 **실패 원인을 분석할 때 도움이 되는 정보만을 담아야합니다.** 또한 보안과 관련된 정보는 포함하면 안됩니다. 상세 메세지에 비밀번호나 암호화 키 같은 정보는 필요없습니다.

아래 코드는 그 예시를 보여주는 코드입니다.

```java
/**
 * Constructs an IndexOutOfBoundsException.
 *
 * @param lowerBound the lowest legal index value
 * @param upperBound the highest legal index value plus one
 * @param index      the actual index value
 */
public IndexOutOfBoundsException(int lowerBound, int upperBound, int index) {
  // Generate a detail message that captures the failure
  super(String.format(
    "Lower bound: %d, Upper bound: %d, Index: %d",
    lowerBound, upperBound, index));

  // Save failure information for programmatic access
  this.lowerBound = lowerBound;
  this.upperBound = upperBound;
  this.index = index;
}
```

<br/>

## Item 76. 가능한 한 `failure atomicity`으로 만듭니다.

`failure atomicity`란, **호출한 메서드가 실패해도 호출 전 상태를 유지하는 것을 의미**합니다. 또한 이를 지키는 것이 중요합니다.

### `failure atomicity`

호출된 메서드가 실패하더라도, 해당 객체는 메서드 호출 전 상태를 유지하려는 특성을 의미합니다.

### 메서드를 `failure atomicity`로 만드는 방법

#### 불변 객체로 설계앟ㅂ니다.

- 불변 객체는 생성 시점에 고정되어 절대 변하지 않기 때문에 기존 객체가 불안정한 상태가 될 일은 없습니다.

#### 로직을 수행하기 전에 매개변수의 유효성을 검사합니다.

- 객체의 내부 상태를 변경하기 전에 잠재적 예외 가능성의 대부분을 걸러냅니다.

```java
public Object pop() {
  if (size == 0)
    throw new EmptyStackException();
  Object result = elements[--size];
  elements[size] = null; // 다 쓴 참조 해제
  return result;
}
```

#### 실패한 가능성이 있는 모든 코드를, 객체의 상태를 바꾸는 코드 앞에 배치합니다.

- 로직을 수행하기 전에 인수의 유효성을 검사하기 어려울 때 사용할 수 있습니다.
- 예를 들어, `TreeMap`의 경우 잘못된 타입의 원소를 추가하는 경우, `ClassCastException` 에러가 발생합니다.

#### 객체의 임시 복사본에서 작업을 수행한 후에 성공적으로 완료되면 원래 객체와 교체합니다.

- 데이터를 임시 자료 구조에 저장해 작업하는 것이 더 빠를 때 적용하기 좋은 방법입니다.
- `List` 클래스의 `compare` aptjemrk rmfjgtmqslek.

```java
default void sort(Comparator<? super E> c) {
  Object[] a = this.toArray();
  Arrays.sort(a, (Comparator) c);
  ListIterator<E> i = this.listIterator();
  for (Object e : a) {
    i.next();
    i.set((E) e);
  }
}
```

#### 작업 도중에 발생하는 실패를 가로채는 복구 코드를 작성해서 작업 전 상태로 되돌립니다.

주로 디스크 기반의 내구성(durability)를 보장해야하는 자료구조에 쓰이는데 자주 사용되는 방법은 아닙니다.

### `failure atomicity`을 항상 지킬 수 있나요...

예를 들어 `ConcurrentModificationException`을 잡아내도 그 객체를 여전히 사용할 수 있는 상태라고 가정하면 안됩니다. 이런 경우의 오류는 복구할 수 없기 때문에 이를 보존할려고 시도할 필요가 없습니다. 따라서 권장되는 부분이지만, 항상 `failure atomicity`를 지킬 수 없습니다.

`failure atomicity`으로 만들 수 있도록, 항상 그래야하는 것도 아닙니다. 이를 달성하기 위한 비용이 크거나 복잡도가 아주 큰 연산이 있을 수 있기 때문입니다. 이 규칙을 지키지 못하면 실패시의 객체 상태를 API 설명에 명시해야합니다.

따라서 Error는 복구할 수 없으므로 `AssertionError`에 대해서는 실패 원자적으로는 만들려는 시도가 필요가 없습니다.

<br/>

## Item 77. 예외를 무시하면 안됩니다.

예외가 선언된 API는 그 메서드를 사용할 때 적절한 조치를 해야합니다. 따라서 catch 블랙을 비워두면 이는 존재할 이유가 없습니다.

```java
// 의미 없는 코드
try {
  ...
} catch (SomeException e) {}
```

물론 예외를 무시해야하는 경우가 있습니다. 예를 들어 `FileInputStream`을 닫을 때 그렇습니다. 파일의 상태를 변경하지 않으니 복구할 것이 없고 스트림을 닫는 경우는 필요한 내용을 모두 다 읽어야한다는 뜻입니다.

그래도 예외를 무시하기로 했다면 `catch`블록 안에서 그렇게 결정한 이유를 주석으로 남기고 예외의 이름도 변경해야합니다.
