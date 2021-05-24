---
title: '[Java] Effective Java, Serialization'
slug: 11-java-effective-java
date: 2021-05-24
published: true
tags: ['Java', 'Stater', 'Effective Java', 'Serialization']
series: false
cover_image: ./images/EffectiveJava.jpeg
canonical_url: false
description: 'Effective Java 책 중, ch12. 직렬화에 대해 정리합니다.'
---

# Serialization

아래에서는 자바 직렬화의 위험성과 이를 최소화하는 방법을 중점으로 합니다.

- [자바 직렬화란](https://azderica.github.io/java-serialize/)

## Item 85. 자바 직렬화의 대안을 찾습니다.

최초의 자바에 직렬화가 추가되었을 때는 다소 위험한 것으로 알려졌습니다. 이는 보이지 않는 생성자였고 API와 구현 사이의 경계가 흐려졌습니다. 또한 정확성, 성능, 보안 및 유지 관리 문제가 발생할 가능성이 있어서 입니다.

그러나 근본적인 자바 직렬화의 위험은 아래와 같습니다.

- 공격 범위가 너무 넓습니다.
- 지속적으로도 더 넓어져서 방어하기도 어렵습니다.

이러한 문제들의 원인은 `OutputInputStream`의 `readObject` 메서드가 호출되면서 객체 그래프가 역직렬화(deserialization)가 되기 때문입니다.

바이트 스트림을 역직렬화하는 과정에서 `readObject` 메서드는 그 타입들 안의 모드 코드를 수행할 수 있습니다. (즉, 타입들의 코드 전체가 악의적인 공격 범위에 들어갑니다.)

**역직렬화 과정에서 호출되어 잠재적인 위험한 동작을 수행하는 메서드**를 **가젯(gadget)** 이라고 합니다. 하나의 가젯이 여러개의 가젯이 마음대로 코드를 수행할 수 있기 때문에 아주 신중하게 제작된 바이트 스트림만 역직렬화를 해야합니다.

역직렬화에 시간이 오래걸리는 짧은 스트림을 **역직렬화 폭탄(deserialization bomb)** 이라고 합니다. 아래는 그 예시입니다.

```java
static byte[] bomb() {
  Set<Object> root = new HashSet<>();
  Set<Object> s1 = root;
  Set<Object> s2 = new HashSet<>();

  for (int i = 0; i < 100; i++) {
    Set<Object> t1 = new HashSet<>();
    Set<Object> t2 = new HashSet<>();

    t1.add("foo"); // Make t1 unequal to t2
    s1.add(t1);  s1.add(t2);
    s2.add(t1);  s2.add(t2);

    s1 = t1;
    s2 = t2;
  }
  return serialize(root); // Method omitted for brevity
}
```

이를 호출해버리면, 깊이가 100단계까지 호출됩니다. 이를 역직렬화 하려면 2^100 번 넘게 호출해야합니다.

이 문제를 해결하기 위해서는 자바 직렬화 대신 **크로스-플랫폼 구조화된 데이터 표현 방법** 을 사용하는 것이 좋습니다. 예로는 JSON, protocol buffer 등이 있습니다. 프로토콜 버퍼는 이진 표현이라 효율이 훨씬 더 높으며, JSON은 텍스트 기반이라 사람이 읽을 수 있는 장점이 있습니다.

직렬화를 대체할 수 없다면, 반드시 **신뢰할 수 있는 데이터만 역직렬화** 해야합니다. 직렬화를 피할 수 없고, 역직렬화한 데이터가 안전하지 확실할 수 없다면 객체 역직렬화 필터링을 사용하면 됩니다.

다만, 직렬화는 위험 요소가 많습니다. 시간과 노력을 쓰더라도, JSON 등으로 마이그레이션하는 것을 추천합니다.

<br/>

## Item 86. `Serializable`을 구현할지에 대해 신중히 결정합니다.

직렬화 가능한 클래스는 `Serializable`을 구현하면 됩니다. 이를 구현하는 것은 싶지만, 구현을 했을 때의 대가는 매우 비쌉니다. 구현한 순간부터 많은 위험성을 가지게 되고, 확장성을 잃게 됩니다.

### 직렬화 클래스의 단점

#### 1. 릴리즈가 된 이후, 유연성을 감소합니다.

`Serializable`을 구현하면 직렬화 형태도 하나의 공개 API가 됩니다. 직렬화 형태는 적용 당시 클래스의 내부 구현 방식에 종속적입니다. 또한 클래스의 private과 package 인스턴스 필드마저 API로 공개되기 때문에 캡슐화도 깨집니다.

클래스의 내부 구현을 수정할 시, 원래의 직렬화 형태와 달라집니다. 구버전의 인스턴스를 직렬화한 후 신버전 클래스로 역직렬화를 시도하면 오류가 발생합니다.

한편 수정을 어렵게 만드는 요소로 `SerialVersionUID`를 뽑을 수 있습니다. 모든 직렬화된 클래스는 고유 식별 번호를 부여받으며, 클래스 내부에 직접 명시하지 않는 경우에 시스템이 런타임에 자동으로 생성됩니다. `SUID`를 생성할 때는 클래스의 이름, 구현하도록 선언한 인터페이스 등이 고려됩니다. 따라서 나중에 수정한다면 `SUID` 값도 변하게 됩니다. 이러한 자동으로 생성된 값은 호환성이 쉽게 깨집니다.

#### 2. 버그와 보안에 취약합니다.

자바에서는 객체를 생성자를 통해서 만듭니다. 그러나 직렬화는 이러한 언어의 기본 방식을 우회하면서 객체를 생성합니다. 역직렬화는 일반 생성자의 문제가 발생하는 숨은 생성자입니다. 역직렬화를 사용하면 불변식이 깨질 수 있으며 허가되지 않은 접근에 쉽게 노출될 수 있습니다.

#### 3. 테스트 부담 요소가 증가합니다.

직렬화 가능한 클래스가 수정되면, 새로운 버전의 인스턴스를 직렬화 한후에 구버전으로 역직렬화가 가능한지 테스트해야합니다. 물론 그 반대 경우도 테스트 해야합니다.

### `Serializable` 구현

`Serializable` 구현 여부는 쉽게 결정할 것이 아닙니다. 클래스를 설계할 때마다 따르는 이득과 비용을 잘 고려해야합니다. 에를 들어 `BigInteger`과 `Instant` 같은 값 클래스와 컬렉션 클래스는 `Serializable`을 구현하였으며 스레드 풀처럼 동작하는 객체를 표현한 클래스는 대부분 구현하지 않았습니다.

따라서 아`Serializable`을 구현하면 안되는 경우가 많습니다.

#### 상속 목적으로 설계된 클래스와 대부분의 인터페이스는 `Serializable`을 구현하면 안됩니다.

클래스를 확장하거나 인터페이스를 구현하는 대상에게 위험성을 제공합니다. 하지면 `Serializable`를 구현한 클래스만 지원하는 프레임워크를 사용해야한다면 어쩔 수 없습니다. 이러한 경우처럼 직렬화와 확장이 모두 가능한 클래스를 만들어야한다면 하위 클래스에서 `finalize` 메서드를 재정의를 방지해야합니다. 일반적으로는 재정의하고 `final` 키워드를 붙이면 되며, 인스턴스 필드 중 기본값으로 초기화되어서 위배되는 불변식이 있는 경우에는 아래와 같은 메서드를 추가합니다.

```java
private void readObjectNoData() throws InvalidObjectException {
  throw new InvalidObjectException("Stream data required");
}
```

#### 내부 클래스는 직렬화를 구현하면 안됩니다.

내부 클래스는 바깥 인스턴스의 참조와 유효 범위에 속한 지역변수를 저장하기 위한 필드가 필요합니다. 그렇기에 기본 직렬화 형태가 명확하지 않습니다. 이 필드들은 컴파일러가 자동으로 추가를 하는데, 이 필드들이 어떻게 추가될 지 모릅니다. (정적 멤버 클래스는 다릅니다.)

<br/>

## Item 87. 커스텀 직렬화 형태를 고려합니다.

클래스가 `Serializable` 을 구현하고 기본 직렬화 형태를 사용한다면 현재의 구현에 종속적이게 됩니다. 즉, 기본 직렬화 형태를 버릴 수 없게 됩니다. 따라서 유연성, 성능, 정확성과 같은 측면을 고민한 후에 합당하다고 생각되는 경우에 한해 기본 직렬화 형태를 사용해야합니다.

### 이상적인 직렬화 형태

기본 직렬화 형태는 객체가 포함한 데이터 뿐만 아니라, 그 객체를 시작으로 접근할 수 있는 모든 객체와 객체들의 연결된 정보까지 나타냅니다. 이상적인 직렬화의 형태는 물리적인 모습과 독립된 논리적인 모습만을 표현해야합니다. 객체의 물리적 표현과 논리적 내용이 같다면 기본 직렬화 형태를 선택해도 무방합니다.

```java
public class Name implements Serializable {

  @serial
  private final String lastName;

  @serial
  private final String firstName;

  @serial
  private final String middleName;

  ...
}
```

이름은 논리적으로 성, 이름, 중간 이름으로 3개의 문자열로 구성되는데 위 클래스의 인스턴스 필드들은 논리적인 구성 요소를 정확하게 반영합니다.

기본 직렬화 형태가 적합해도 불변식 보장과 보안을 위해서 `readObject` 메서드를 제공해야하는 경우가 많습니다. 앞에 있는 코드의 경우, lastName과 firstName 필드는 null이 아님을 `readObject` 메서드가 보장해야합니다.

### 부적절한 직렬화 형태

객체의 물리적 표현과 논리적 내용이 같은 경우, 기본 직렬화 형태를 선택해도 됩니다. 그러나 적절하지 않는 경우도 있습니다.

```java
public final class StringList implements Serializable {
  private int size = 0;
  private Entry head = null;

  private static class Entry implements Serializable {
    String data;
    Entry next;
    Entry previous;
  }

  // ... 생략
}
```

위의 클래스 경우에는 여러 문제점이 있습니다. 논리적으로 문자열을 표현했고 물리적으로는 문자열들을 이중 연결 리스트로 표현했습니다. 이 클래스에 기본 직렬화 형태를 사용하면 각 노드에 연결된 노드들까지 모두 표현하기 때문에 다음과 같은 문제가 발생합니다.

- 공개 API가 현재의 내부 표현 방식에 종속적이게 됩니다.
  - 향후 버전에서 연결 리스트를 사용하지 않더라도, 관련 처리가 필요해집니다.
  - 코드를 제거할 수가 없습니다.
- 사이즈가 큽니다
  - 기본 직렬화를 사용할 때 각 노드의 연결 정보까지 모두 포함될 것입니다.
  - 이는 내부 구현이며 직렬화 형태에 가치가 없으며 네트워크 전송 속도를 느리게 합니다.
- 시간이 많이 걸립니다.
  - 직렬화 로직은 객체 그래프의 위상에 관한 정보를 알 수 없으니, 직접 순회할 수 밖에 없습니다.
- 스택 오버플로를 발생시킵니다.
  - 기본 직렬화 형태는 객체 그래프를 재귀 순회하며, 호출 정도가 많아지면 스택이 감당을 하지 못합니다.

### 합리적인 직렬화 형태

이를 수정해서 합리적인 직렬화 형태는 다음과 같습니다. 단순히 리스트가 포함한 문자열의 개수와 문자열만 있는 것이 좋습니다. 위의 부적절한 코드를 개선한 형태입니다.

```java
public final class StringList implements Serializable {
  private transient int size = 0;
  private transient Entry head = null;

  private static class Entry {
    String data;
    Entry next;
    Entry previous;
  }

  public final void add(String s) { ... }

  private void writeObject(ObjectOutputStream stream) throws IOException {
    stream.defaultWriteObject();
    stream.writeInt(size);

    for (Entry e = head; e != null; e = e.next) {
      s.writeObject(e.data);
    }
  }

  private void readObject(ObjectInputStream stream) throws IOException, ClassNotFoundException {
    stream.defaultReadObject();
    int numElements = stream.readInt();

    for (int i = 0; i < numElements; i++) {
      add((String) stream.readObject());
    }
  }

  // ... 생략
}
```

위 코드에서 특별한 키워드인 `transient`를 확인할 수 있습니다. `transient` 키워드가 붙은 필드는 기본 직렬화 형태에 포함되지 않습니다. 클래스의 모든 필드가 `transient`로 선언되어 있더라도 `writeObject` 와 `readObject` 메서드는 `defaultWriteObject`와 `defaultReadObject` 메서드를 호출합니다. 직렬화 명세에서는 이 과정을 무조건 진행할 것을 요구합니다. 이렇게 함으로써 향후 릴리즈에서 `transient`가 아닌 필드가 추가되더라도 상위와 하위 모두 호환이 가능하기 때문입니다.

신버전의 인스턴스를 직렬화하고 구버전으로 역직렬화할시, 새로 추가된 필드는 무시됩니다. 그리고 구버전의 `readObject` 메서드에서 `defaultReadObject`를 호출하지 않는다면 역직렬화 과정에서 `StreamCorruptedException`이 발생합니다.

기본 직렬화 여부에 관계없이 `defaultWriteObject` 메서들 호출하면 `transient`로 선언하지 않은 모든 필드는 직렬화됩니다. 따라서, `transient` 키워드를 선언해도 되는 필드라면 붙이는 것이 좋습니다. 즉, 논리적 상태와 무관한 필드라고 판단될 때 생략하는 것이 좋습니다.

기본 직렬화를 사용한다면, 역직렬화를 할 때는 `transient` 필드는 기본 값으로 초기화됩니다. 기본 값을 변경해야 하는 경우에는 `readObject` 메서드에서 `defaultReadObject` 메서드를 호출한 다음 원하는 값으로 지정하면 됩니다. 아니면 값을 처음 사용할 때 초기화해도 됩니다.

기본 직렬화 사용 여부와 상관없이 직렬화에도 동기화 규칙을 적용해야합니다. 예를 들어 모든 메서드를 `synchronized` 로 선언하여 스레드에 안전하게 만든 객체에 기본 직렬화를 사용한다면 `writeObject` 도 아래처럼 수정해야 합니다.

```java
private synchronized void writeObject(ObjectOutputStream stream) throws IOExceptions {
  stream.defaultWriteObject();
}
```

어떤 직렬화 형태를 선택하더라도, 직렬화가 가능한 클래스에는 `SerialVersionUID(SUID)` 를 명시적으로 선언해야 합니다. 물론 선언하지 않더라도 자동 생성되지만 런타임에 이 값을 생성하느라 복잡한 연산을 수행해야합니다.

```java
// 무작위로 고른 long 값
private static final long serialVersionUID = 0204L;
```

다만, SUID가 꼭 유니크할 필요가 없습니다. 다만 이 값이 변경되면 기존 버전 클래스와의 호환을 끊게 됩니다. 따라서 호환성을 끊는 경우가 아니라면 SUID 값을 변경해서는 안됩니다.

<br/>

## Item 88. `readObject` 메서드는 방어적으로 작성합니다.

지난 Item 50에서는 적시에 방어적 복사본을 만들라는 규칙이 있습니다.

```java
public final class Period {
  private final Date start;
  private final Date end;

  /**
   * @param  start the beginning of the period
   * @param  end the end of the period; must not precede start
   * @throws IllegalArgumentException if start is after end
   * @throws NullPointerException if start or end is null
   */
  public Period(Date start, Date end) {
    this.start = new Date(start.getTime());
    this.end   = new Date(end.getTime());
    if (this.start.compareTo(this.end) > 0) throw new IllegalArgumentException(
      start + " after " + end);
  }

  public Date start () { return new Date(start.getTime()); }

  public Date end () { return new Date(end.getTime()); }

  public String toString() { return start + " - " + end; }

  ... // Remainder omitted
}
```

물리적 표현과 논리적 표현이 같기 때문에 기본 직렬화 형태를 사용해도 된다고 판단됩니다. 따라서 `Serializable`만 구현하면 될 것 같습니다. 하지만 `readObject`가 새로운 public 생성자이기 때문에 불변식을 보장할 수 없습니다.

`readObject` 메서드도 생성자와 같은 수준으로 주의해야합니다. 인수가 유효한지 검사하고, 매개변수를 방어적으로 복사해야합니다. 그렇지 않으면 불변식을 깨뜨리는 공격에 취약합니다.

`readObject` 메서드는 매개변수로 바이트 스트림을 받는 생성자로 볼 수 있습니다. 일반적으로 보통 바이트 스트림은 정상적으로 생성된 인스턴스를 직렬화해서 만들어집니다. 하지만, 불변을 깨트릴 목표로 만들어진 바이트 스트림을 받으면 문제가 발생합니다. 이러한 경우는 정상적으로 만들어 낼 수 없는 객체를 생성합니다.

아래는 그 잘못된 코드입니다.

```java
public class BogusPeriod {

  // Byte stream couldn't have come from a real Period instance!
  private static final byte[] serializedForm = {
    (byte)0xac, (byte)0xed, 0x00, 0x05, 0x73, 0x72, 0x00, 0x06,
    0x50, 0x65, 0x72, 0x69, 0x6f, 0x64, 0x40, 0x7e, (byte)0xf8,
    0x2b, 0x4f, 0x46, (byte)0xc0, (byte)0xf4, 0x02, 0x00, 0x02,
    ...
  };

  public static void main(String[] args) {
    Period p = (Period) deserialize(serializedForm);
    System.out.println(p);
  }

  // 바이트 스트림으로부터 객체를 만들어 변환합니다.
  static Object deserialize(byte[] sf) {
    try {
      return new ObjectInputStream(
        new ByteArrayInputStream(sf)
      ).readObject();
    } catch (IOException | ClassNotFoundException e) {
      throw new IllegalArgumentException(e);
    }
  }
}
```

해당 코드를 실행하면, 불변식이 깨지는 객체가 만들어집니다.

```
Fri Jan 01 12:00:00 PST 1999 - Sun Jan 01 12:00:00 PST 1984
```

이를 방어하기 위해서는 `readObject` 메서드가 `defaultReadObject`를 호출하게 한 후 역직렬화된 객체가 유효한지 검사해야합니다. 여기서 유효성 검사에 실패한다면 `InvalidObjectException`을 던져 잘못된 역직렬화가 발생하는 것을 막아야합니다.

```java
private void readObject(ObjectInputStream s) throws IOException, ClassNotFoundException {
  // 불변식을 만족하는지 검사한다.
  if (start.compareTo(end) > 0) {
    throw new InvalidObjectException(start + "after" + end);
  }
}
```

그러나 이러한 코드에서도 바이트 스트림 끝에 `private Date` 필드로의 참조를 추가하면 가변적인 Period 인스턴스를 만들어 낼 수 있습니다. 공격자가 역직렬화를 통해서 바이트 스트림 끝의 참조 값을 읽으면 Period의 내부 정보를 얻을 수 있습니다. 이 참조를 이용해서 인스턴스를 수정할 수 있기 때문에 불변이 아닙니다.

```java
public class MutablePeriod {
  public final Period period;
  public final Date start;
  public final Date end;

  public MutablePeriod() {
    try {
      ByteArrayOutputStream bos = new ByteArrayOutputStream();
      ObjectOutputStream out = new ObjectOutputStream(bos);

      out.writeObject(new Period(new Date(), new Date()));

      /*
       * 악의적인 '이전 객체 참조', 즉 내부 Date 필드로의 참조를 추가한다.
       * 상세 내용은 자바 객체 직렬화 명세의 6.4절 참조.
       */
      byte[] ref = { 0x71, 0, 0x7e, 0, 5 };
      bos.write(ref); // 시작(start) 필드
      ref[4] = 4; // 참조 #4
      bos.write(ref); // 종료(end) 필드

      ObjectInputStream in = new ObjectInputStream(new ByteArrayInputStream(bos.toByteArray()));
      period = (Period) in.readObject();
      start = (Date) in.readObject();
      end = (Date) in.readObject();
    } catch (IOException | ClassNotFoundException e) {
      throw new AssertionError(e);
    }
  }

  public static void main(String[] args) {
    MutablePeriod mp = new MutablePeriod();
    Period p = mp.period;
    Date pEnd = mp.end;

    // 시간을 되돌린다.
    pEnd.setYear(78);
    System.out.println(p);

    // 60년대로 돌아간다.
    pEnd.setYear(69);
    System.out.println(p);
  }
}
```

```
Wed Nov 22 00:21:29 PST 2017 - Wed Nov 22 00:21:29 PST 1978
Wed Nov 22 00:21:29 PST 2017 - Sat Nov 22 00:21:29 PST 1969
```

해당 원인은 `Period`의 `readObject` 메서드가 방어적 복사를 하지 않음에 있습니다. **역직렬화를 할 때는 클라이언트가 접근해서는 안되는 객체 참조를 갖는 필드는 모두 방어적으로 복사를 해야합니다.**

`Period`를 공격으로부터 보호하기 위해 방어적 복사를 유효성 검사보다 먼저 수행해야합니다. 또한 Date의 `clone` 메서드는 사용되지 않습니다.

```java
private void readObject(ObjectInputStream s) throws IOException, ClassNotFoundException {
  s.defaultReadObject();

  // 가변 요소들을 방어적으로 복사한다.
  start = new Date(start.getTime());
  end = new Date(end.getTime());

  // 불변식을 만족하는지 검사한다.
  if (start.compareto(end) > 0) {
    throw new InvalidObjectException(start + " after " + end);
  }
}
```

```
Fri May 31 01:01:06 KST 2019 - Fri May 31 01:01:06 KST 2019
Fri May 31 01:01:06 KST 2019 - Fri May 31 01:01:06 KST 2019
```

한편 `final` 필드는 방어적 복사가 불가능하니 주의해야합니다. 따라서 start와 end 필드에서 `final` 키워드를 제거해야합니다. 공격을 받는 것보다는 더 나은 방향입니다.

`transient` 필드를 제외한 모든 필드의 값을 매개변수로 받아 유효성 검사를 없이도 필드에 대입하는 public 생성자를 추가해도 괜찮다고 판단되면 기본 `readObject`를 사용해도 됩니다. 아닌 경우에는 직접 `readObject` 메서드를 정의해서 생성자에서 수행했어야 할 모든 유효성 검사와 방어적 복사를 수행해야합니다. 이때 가장 추천되는 것은 `직렬화 프록시 패턴`을 사용하는 것입니다. 이는 역직렬화를 안전하게 만드는데 필요한 노력을 줄여줍니다,

`final`이 아닌 직렬화 가능 클래스라면 생성자처럼 `readObject` 메서드도 재정의(Overriding) 가능한 메서드를 호출해서는 안됩니다. 하위 클래스의 상태가 완전히 직렬화되기 전에 하위 클래스에서 재정의된 메서드가 실행되기 때문입니다.

결론적으로 다음과 같이 요약할 수 있습니다.

- `readObject` 메서드를 작성할 때는 언제나 public 생성자를 작성하는 자세로 임합니다.
- `readObject` 메서드는 어떤 바이트 스트림이 넘어오더라도 유효한 인스턴스를 만들어야합니다.
  - 이 바이트 스트림이 항상 직렬화된 인스턴스라고 믿으면 안됩니다.
- 안전한 `readObject` 메서드를 작성하기 위해서는 아래를 준수합니다.
  - `private` 여야 하는 객체 참조 필드는 각 필드가 가리키는 객체를 방어적으로 복사합니다.
  - 모든 불변식을 검사하고 어긋난다면, `InvalidObjectException`을 던집니다.
  - 역직렬화 이후에 객체 그래프 전체의 유효성을 검사해야 한다면 `ObjectInputValidation`을 던집니다.
  - 오버라이딩이 가능한 메서드는 호출하지 않는 것이 좋습니다.

<br/>

## Item 89. 인스턴스 수를 통제해야한다면 `readResolve`보다는 enum 타입을 사용합니다.

앞에서 싱글톤 패턴의 예저를 보았는데 이 방법은 `public static final` 필드를 사용하는 방식입니다. 생성자는 `private` 접근 지정자로 선언하여 외부로부터 감추고, `INSTANCE`를 초기화할 때 한 번만 호출됩니다.

```java
private class Elvis {
  public static final Elvis INSTANCE = new Elvis();
  private Elvis() { }

  ...
}
```

하지만, 이 클래스는 `Serializable`을 구현하게 되는 순간 싱글턴이 아닙니다. 기본 직렬화를 쓰지 않거나 명시적인 `readObject` 메서드를 제공해도 소용이 없습니다. 어떤 `readObject` 메서드를 사용해도 초기화될 때 만들어진 인스턴스와 다른 인스턴스를 반환하게 됩니다.

이때 `readResolve` 메서드를 사용하면, `readObject` 메서드가 만든 인스턴스를 다른 것으로 대체할 수 있습니다. 이때 `readObject`가 만들어낸 인스턴스는 가비지 컬렉터의 대상이 됩니다.

```java
private Object readResolve() {
  return INSTANCE;
}
```

한편 여기서 나온 `Elvis` 인스턴스의 직렬화 형태는 아무런 실 데이터를 가질 필요가 없으니 모든 인스턴스 필드는 `transient`로 선언해야합니다. 그러므로 `readResolve` 메서드를 인스턴스의 통제 목적으로 이용한다면 모든 필드는 `transient`로 선언하는 것이 좋습니다. 그렇지 않으면 역직렬화 과정에서 역직렬화된 인스턴스를 가져와서 싱글턴이 깨지게 됩니다.

이를 해결하는 방법은 `enum`입니다. 자바가 선언한 상수 외에 다른 객체가 없음을 보장해주기 때문입니다. 물론 `AccessibleObject.setAccessible` 메서드와 같은 리플렉션을 사용하는 경우는 예외입니다.

```java
public enum Elvis {
  INSTANCE;

  ...
}
```

물론 인스턴스 통제를 위해 `readResolve` 메서드를 사용하는 것이 중요할 때도 있습니다. 직렬화 가능 인스턴스 통제 클래스를 작성해야 할 때, 컴파일 타임에는 어떤 인스턴스들이 있는지 모를 수 있습니다. 이때는 `Enum` 타입으로 표현하는 것이 불가능하기 때문에 `readResolve` 메서드를 사용할 수 밖에 없습니다.

<br/>

## Item 90. 직렬화된 인스턴스 대신 직렬화 프록시 사용을 검토합니다.

`Serializable`을 `implements` 하게 되면, 정상적인 인스턴스 생성 방법인 생성자 이외의 방법이 생기게 됩니다. 버그와 보안 문제가 생길 가능성이 커진다는 것입니다. 하지만 **직렬화 프록시 패턴**을 사용하면 이를 크게 줄일 수 있습니다.

### 직렬화 프록시 패턴

바깥 클래스의 논리적 상태를 표현하는 중첩 클래스를 설계해서 `private static`으로 선언합니다. 여기서 중첩 클래스가 **직렬화 프록시** 입니다. 중첩 클래스의 생성자는 단 하나여야하며, 바깥 클래스를 매개변수로 받아야합니다. 단순히 인수로 넘어온 인스턴스의 데이터를 복사해야합니다. 일관성 검사 또는 방어적 복사도 필료가 없습니다. 아만, 바깥 클래스와 직렬화 프록시 모두 `Serializable`을 구현해야합니다.

이러한 직렬화 프록시 패턴의 장점은 아래와 같습니다.

- 멤버 필드를 `final`로 선언할 수 있기 때문에 진정한 불변으로 만들 수 있습니다.
- 역직렬화한 인스턴스와 원래의 직렬화된 클래스가 달라도 정상적으로 동작합니다.

다만 직렬화 프록시 패턴에도 한계가 있습니다.

- 클라이언트가 마음대로 확장할 수 있는 클래스에는 적용할 수 없습니다.
- 객체가 서로 참조하는 경우(순환이 있는 경우)에는 적용할 수 없습니다.
- 방어적 복사보다 상대적으로 속도가 느립니다.
