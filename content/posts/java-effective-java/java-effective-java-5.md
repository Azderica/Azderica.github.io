---
title: '[Java] Effective Java, Enums와 Annotation'
slug: 05-java-effective-java
date: 2021-05-03
published: true
tags: ['Java', 'Stater', 'Effective Java', 'Enum', 'Annotation']
series: false
cover_image: ./images/EffectiveJava.jpeg
canonical_url: false
description: 'Effective Java 책 중, ch6. 열거형과 어노테이션에 대해 정리합니다.'
---

# Enums 와 Annotation

Java는 두 가지 특수 목적의 참조 유형 패밀리를 지원합니다.

- enum
- annotation

아래에서는 이를 이용하는 좋은 사례입니다.

## Item 34. 상수형 대신 열겨형을 사용합니다.

Enum 형은 고정 세트로 구성된 유형이며, 이는 형식에 대한 안전성을 제공합니다. Java의 Enum 형의 기본 개념은 `public static final field`를 통해서 각각의 Enum 상수를 하나의 인스턴스로 내보내는 클래스입니다. 특히 이에 대한 액세스가 불가능하기 때문에 수정할 수 없습니다.

아래는 간단한 Enum 형 타입입니다.

```java
public enum Apple {FUJI, PIPPIN, GRANNY_SMITH}
public enum Orange {NAVEL, TEMPLE, BLOOD}
```

아래는 data와 behavior이 있는 열거형 타입입니다.

```java
// Enum type with data and behavior
public enum Planet {
  MERCURY(3.302e+23, 2.439e6),
  VENUS  (4.869e+24, 6.052e6),
  EARTH  (5.975e+24, 6.378e6),
  MARS   (6.419e+23, 3.393e6),
  JUPITER(1.899e+27, 7.149e7),
  SATURN (5.685e+26, 6.027e7),
  URANUS (8.683e+25, 2.556e7),
  NEPTUNE(1.024e+26, 2.477e7);

  private final double mass;           // In kilograms
  private final double radius;         // In meters
  private final double surfaceGravity; // In m / s^2

  // 범용 중력 상수 (m ^ 3 / kg s ^ 2
  private static final double G = 6.67300E-11;

  // Constructor
  Planet(double mass, double radius) {
    this.mass = mass;
    this.radius = radius;
    surfaceGravity = G * mass / (radius * radius);
  }

  public double mass()           { return mass; }
  public double radius()         { return radius; }
  public double surfaceGravity() { return surfaceGravity; }

  public double surfaceWeight(double mass) {
    return mass * surfaceGravity;  // F = ma
  }
}
```

이러한 코드에서 데이터를 Enum 상수와 연결하려면 인스턴스 필드를 선언하고 데이터를 가져와 필드에 저장하는 생성자를 작성해줘야 합니다.

```java
public class WeightTable {
  public static void main (String [] args) {
    double earthWeight = Double.parseDouble (args [0]);
    double mass = earthWeight / Planet.EARTH.surfaceGravity ();

    for (Planet p : Planet.values ​​())
      System.out.printf("Weight on %s is %f %n",
        p, p.surfaceWeight (mass));
  }
}
```

Enum 상수와 메소드를 결합한 코드를 작성할 수도 있습니다.

```java
// 상수 특정 클래스 본문과 데이터가있는 열거 형 유형
public enum Operation {
  PLUS("+") {
    public double apply(double x, double y) { return x + y; }
  },
  MINUS("-") {
    public double apply(double x, double y) { return x - y; }
  },
  TIMES("*") {
    public double apply(double x, double y) { return x * y; }
  },
  DIVIDE("/") {
    public double apply(double x, double y) { return x / y; }
  };

  private final String symbol;

  Operation(String symbol) { this.symbol = symbol; }

  @Override public String toString() { return symbol; }

  public abstract double apply(double x, double y);
}
```

```java
public static void main (String [] args) {
  double x = Double.parseDouble (args [0]);
  double y = Double.parseDouble (args [1]);
  for (Operation op : Operation.values ​​())
    System.out.printf ( "%f %s %f = %f %n", x, op, y, op.apply (x, y));

  // Output
  // 2.000000 + 4.000000 = 6.000000
  // 2.000000 - 4.000000 = -2.000000
  // 2.000000 * 4.000000 = 8.000000
  // 2.000000 / 4.000000 = 0.500000
}
```

전략적으로 사용하는 enum 패턴 코드는 다음과 같습니다. (근로자 근무 급여 계산 메서드)

```java
// 전략 enum 패턴
enum PayrollDay {
  MONDAY (WEEKDAY), TUESDAY (WEEKDAY), WEDNESDAY (WEEKDAY),
  THURSDAY (WEEKDAY), FRIDAY (WEEKDAY),
  SATURDAY (WEEKEND), SUNDAY (WEEKEND);

  private final PayType payType;

  PayrollDay (PayType payType) {this.payType = payType; }

  int pay (int minutesWorked, int payRate) {
    return payType.pay (minutesWorked, payRate);
  }

  // 전략 enum 유형
  private enum PayType {
    WEEKDAY {
      int overtimePay (int minsWorked, int payRate) {
        return minsWorked <= MINS_PER_SHIFT? 0 :
          (minsWorked-MINS_PER_SHIFT) * payRate / 2;
      }
    },
    WEEKEND {
      int overtimePay (int minsWorked, int payRate) {
        return minsWorked * payRate / 2;
      }
    };

    abstract int overtimePay (int mins, int payRate);
    private static final int MINS_PER_SHIFT = 8 * 60;

    int pay (int minsWorked, int payRate) {
      int basePay = minsWorked * payRate;
      return basePay + overtimePay (minsWorked, payRate);
    }
  }
}
```

열거형의 Switch는 상수 특정 behavior을 enum types을 늘리는데 유용합니다.

컴파일 타임에 멤버가 알려진 상수 집합이 필요할 때마다, Enum 형을 사용하는 것이 좋습니다. 다만, 열거형 유형의 상수 집합이 항상 고정되어 있을 필요는 없습니다.

이를 정리하면 다음과 같습니다. int 상수에 비해 Enum 형은 더 **읽기 쉽고 안전하며, 강력**합니다.

<br/>

## Item 35. Ordinals 대신에 인스턴스 필드를 사용합니다.

많은 Enum 형은 Int와 관련되어 있으며, ordinal 등을 통해서 위치를 반환할 수 있습니다. 그러나 이를 남용하면 유지보수 및 관리에서 문제가 생길 수 있습니다.

```java
// 문제가 되는 코드, 순서를 바꾸면 망함.
public enum Ensemble {
  SOLO,   DUET,   TRIO, QUARTET, QUINTET,
  SEXTET, SEPTET, OCTET, NONET,  DECTET;

  public int numberOfMusicians() { return ordinal() + 1; }
}
```

이러한 코드를 해결하는 방법은, 파생하지 않고 **인스턴스 필드에 저장**하는 것입니다.

```java
public enum Ensemble {
  SOLO (1), DUET (2), TRIO (3), QUARTET (4), QUINTET (5),
  SEXTET (6), SEPTET (7), OCTET (8), DOUBLE_QUARTET (8),
  NONET (9), DECTET (10), TRIPLE_QUARTET (12);

  private final int numberOfMusicians;
  Ensemble (int size) {this.numberOfMusicians = size; }
  public int numberOfMusicians () {return numberOfMusicians; }
}
```

<br/>

## Item 36. 비트 필드 대신에 `EnumSet`을 사용합니다.

비트 필드 표현을 통하면 비트 연산을 통해서 합집합이나 교차 집합 연산을 효율적으로 계산할 수 있습니다. 그러나 이러한 방법들은 int형 상수이 가지고 있는 단점이 있기 때문에, `java.util` 패키지의 `EnumSet`을 사용하는 것이 중요합니다.

이를 사용한 코드는 다음과 같습니다.

```java
public class Text {
  public enum Style {BOLD, ITALIC, UNDERLINE, STRIKETHROUGH}

  // 모든 세트를 전달할 수 있지만 EnumSet은 분명히 가장 좋습니다
  public void applyStyles (Set <Style> styles) {...}
}
```

```java
text.applyStyles (EnumSet.of ( Style.BOLD, Style.ITALIC) );
```

즉, 이를 요약하면, Enum 형이 집합에서 사용되기 때문에 비트 필드로 표현할 이유가 없습니다.

<br/>

## Item 37. `Ordinals Indexing` 대신 `EnumMap`을 사용합니다.

때때로 ordinal 메서드를 사용해서 배열로 인덱싱 하는 코드를 볼 수 있습니다.

이는 그러한 경우의 예시입니다.

```java
class Plant {
  enum LifeCycle { ANNUAL, PERENNIAL, BIENNIAL }

  final String name;
  final LifeCycle lifeCycle;

  Plant(String name, LifeCycle lifeCycle) {
    this.name = name;
    this.lifeCycle = lifeCycle;
  }

  @Override public String toString() {
    return name;
  }
}
```

이러한 코드를 배열로 인덱싱한 코드입니다. (잘못된 코드)

```java
Set<Plant>[] plantsByLifeCycle =
  (Set<Plant>[]) new Set[Plant.LifeCycle.values().length];

for (int i = 0; i < plantsByLifeCycle.length; i++)
  plantsByLifeCycle[i] = new HashSet<>();

for (Plant p : garden)
  plantsByLifeCycle[p.lifeCycle.ordinal()].add(p);

for (int i = 0; i < plantsByLifeCycle.length; i++) {
  System.out.printf("%s: %s%n",
    Plant.LifeCycle.values()[i], plantsByLifeCycle[i]);
}
```

이러한 코드는 문제가 있습니다. 배열은 제네릭과 호환되지 않기 때문에 깔끔하게 컴파일되지 않습니다.그리고, 사용자가 인덱싱 배열을 사용할 때 신경을 써야하는 부분이 많습니다.

짧은 코드를 통해서 이보다 좀 더 좋은 코드를 구성하는 것은 `EnumMap`을 사용하는 것입니다.

```java
// EnumMap을 사용하여 데이터를 열거 형과 연결
Map <Plant.LifeCycle, Set <Plant>> plantsByLifeCycle
  = new EnumMap <> (Plant.LifeCycle.class);

for (Plant.LifeCycle lc : Plant.LifeCycle.values ​​())
  plantsByLifeCycle.put (lc, new HashSet <> ());

for (Plant p : garden)
  plantsByLifeCycle.get (p.lifeCycle) .add (p);

System.out.println (plantsByLifeCycle);
```

```java
// Stream과 EnumMap을 사용하여 데이터를 열거 형과 연결
System.out.println (Arrays.stream (garden)
  .collect (groupingBy (p-> p.lifeCycle,
    ()-> new EnumMap <> (LifeCycle.class ) , toSet ())));
```

두 개의 Enum 형을 사용하는 경우에도 EnumMap을 사용하는 것이 좀 더 안전성이 높습니다.

```java
// 중첩 된 EnumMap을 사용하여 데이터를 열거 형 쌍과 연결
public enum Phase {
  SOLID, LIQUID, GAS;

  public enum Transition {
    MELT(SOLID, LIQUID), FREEZE(LIQUID, SOLID),
    BOIL(LIQUID, GAS),   CONDENSE(GAS, LIQUID),
    SUBLIME(SOLID, GAS), DEPOSIT(GAS, SOLID);

    private final Phase from;
    private final Phase to;

    Transition(Phase from, Phase to) {
      this.from = from;
      this.to = to;
    }

    // the phase transition map 초기화
    private static final Map<Phase, Map<Phase, Transition>>
      m = Stream.of(values()).collect(groupingBy(t -> t.from,
        () -> new EnumMap<>(Phase.class),
        toMap(t -> t.to, t -> t,
          (x, y) -> y, () -> new EnumMap<>(Phase.class))));

    public static Transition from(Phase from, Phase to) {
      return m.get(from).get(to);
    }
  }
}
```

위으 코드의 경우에는 오류가 발생할 가능성이 거의 없으며, 명확성과 안전성 및 유지 관리성을 높이며 공간/시간 비용이 지불되지 않습니다.

따라서, **ordinal을 사용해서 배열로 인덱싱하는 것은 적절하지 않으며 대신에 EnumMap을 사용하는 것이 중요합니다.**

<br/>

## Item 38. 인터페이스로 확장 가능한 Enum을 모방합니다.

표준 enum을 정의해서 임의의 인터페이스를 구현할 수 있습니다. 이를 표현한 코드는 다음과 같습니다.

```java
// 인터페이스를 사용하여 확장 가능한 열거 형 에뮬레이션
public interface Operation {
  double apply(double x, double y);
}

public enum BasicOperation implements Operation {
  PLUS("+")  { public double apply(double x, double y) { return x + y; }},
  MINUS("-") { public double apply(double x, double y) { return x - y; }},
  TIMES("*") { public double apply(double x, double y) { return x * y; }},
  DIVIDE("/"){ public double apply(double x, double y) { return x / y; }};

  private final String symbol;

  BasicOperation(String symbol) { this.symbol = symbol; }

  @Override public String toString() { return symbol; }
}
```

이를 확장한 enum입니다.

```java
// Emulated extension enum
public enum ExtendedOperation implements Operation {
  EXP("^") {
    public double apply(double x, double y) {
      return Math.pow(x, y);
    }
  },

  REMAINDER("%") {
    public double apply(double x, double y) {
      return x % y;
    }
  };

  private final String symbol;

  ExtendedOperation(String symbol) { this.symbol = symbol; }

  @Override public String toString() { return symbol; }
}
```

이를 테스트하는 코드는 다음과 같습니다.

```java
public static void main (String [] args) {
  double x = Double.parseDouble (args [0]);
  double y = Double.parseDouble (args [1]);
  test ( ExtendedOperation.class , x, y);
}

private static <T extends Enum <T> & Operation> void test (
    Class <T> opEnumType , double x, double y) {
  for (Operation op : opEnumType.getEnumConstants ())
    System.out.printf ( "%f %s %f = %f %n ", x, op, y, op.apply (x, y));
}
```

이 방법이 아니더라도, 아래처럼 `Collection<? extends Operation> Class T`를 사용할 수 있습니다. 이는 덜 복잡하고 유연합니다. (다만, EnumSet이나 EnumMap을 사용할 수 없는 코드입니다.)

```java
public static void main (String [] args) {
  double x = Double.parseDouble (args [0]);
  double y = Double.parseDouble (args [1]);
  test ( Arrays.asList (ExtendedOperation.values ​​()) , x, y);
}

private static void test ( Collection <? extends Operation> opSet, double x, double y) {
  for (Operation op : opSet)
    System.out.printf ( "%f %s %f = %f %n", x, op, y, op.apply (x, y));
}
```

두 코드 모두 결과값은 이와 같습니다.

```
4.000000 ^ 2.000000 = 16.000000
4.000000 % 2.000000 = 0.000000
```

결론적으로 확장 가능한 Enum 유형을 작성할 수는 없지만, 인터페이스를 구현하는 Enum 타입과 함께 제공되는 인터페이스를 작성해서 동작시킬 수 있습니다.

<br/>

## Item 39. `Naming Patterns` 보다 `Annotation`을 선호합니다.

기존의 Naming Patterns의 문제는 다음과 같습니다.

- 기존의 JUnit3의 경우, 메서드 명이 test로 시작하지 않으면 실패합니다.
- 적절한 프로그램 요소에서만 사용되도록 할 수 없습니다.
- 매개 변수 값을 프로그램 요소와 연관시키는 좋은 방법을 제공하지 않습니다.

JUnit4부터는 annotation을 통해서 테스트 프레임 워크를 구성할 수 있게 되었습니다.

```java
// Marker annotation type declaration
import java.lang.annotation.*;

/**
 *  - 주석이 달린 메서드가 테스트 메서드임을 나타냅니다.
 *  - 매개 변수가없는 정적 메서드에만 사용합니다.
 */

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Test { }
```

이를 사용하는 코드가 아래와 같이 있을 때, 되는 코드와 안되는 코드를 보면 그 차이를 확인할 수 있습니다.

```java
// marker 어노테이션이 포함된 프로그램
public class Sample {
  @Test public static void m1() { }  // Test should pass

  public static void m2() { }

  @Test public static void m3() {     // Test should fail
    throw new RuntimeException("Boom");
  }

  public static void m4() { }

  @Test public void m5() { } // INVALID USE: nonstatic method

  public static void m6() { }

  @Test public static void m7() {    // Test should fail
    throw new RuntimeException("Crash");
  }

  public static void m8() { }
}
```

이 위의 Sample 클래스에서 Test 어노테이션이 포함된 테스트 메서드는 4가지이나, m5은 static을 붙이지 않았기 때문에 유효하지 않습니다. m1만 성공을 하고, m3과 m7은 실패하게 됩니다.

이를 아래의 코드로 실행할 수 있습니다.

```java
// Program to process marker annotations
import java.lang.reflect.*;

public class RunTests {
  public static void main(String[] args) throws Exception {
    int tests = 0;
    int passed = 0;
    Class<?> testClass = Class.forName(args[0]);

    for (Method m : testClass.getDeclaredMethods()) {
      if (m.isAnnotationPresent(Test.class)) {
        tests++;
        try {
          m.invoke(null);
          passed++;
        } catch (InvocationTargetException wrappedExc) {
          Throwable exc = wrappedExc.getCause();
          System.out.println(m + " failed: " + exc);
        } catch (Exception exc) {
          System.out.println("Invalid @Test: " + m);
        }
      }
    }

    System.out.printf("Passed: %d, Failed: %d%n",
        passed, tests - passed);
  }
}

// output
// public static void Sample.m3() failed: RuntimeException: Boom
// Invalid @Test: public void Sample.m5()
// public static void Sample.m7() failed: RuntimeException: Crash
// Passed: 1, Failed: 3
```

이외에도 여러 테스트 코드 및 어노테이션을 사용하는 방법이 있습니다. 다중 어노테이션이나, 특정 에러만 동작하게 하는 어노테이션을 구성할 수도 있습니다. 이를 다 작성하기에는 내용이 많아서 작성하지는 않겠습니다.

이러한 어노테이션에서의 핵심은 다음과 같습니다.

- 어노테이션을 사용할 수 있는 경우에는, Naming Patterns 을 사용할 필요가 없습니다.
- 모든 프로그래머는 Java가 제공하는 사전 정의된 어노테이션을 사용하는 것이 중요합니다.
- 또한 IDE나 분석 툴에서 제공하는 어노테이션을 사용하는 것이 중요합니다.

<br/>

## Item 40. `Override` 어노테이션을 일관되게 사용해야합니다.

Java 라이브러리에서는 여러 어노테이션이 포함되어 있는데, 그중에서 중요한 어노테이션으로 `@Override`를 고를 수 있습니다. `@Override`는 메서드 선언에서만 사용할 수 있으며, 어노테이션이 달린 메서드 선언이 상위 유형을 재정의 함을 나타냅니다. 이를 지속적으로 사용하면 많은 종류의 버그를 예방할 수 있습니다.

이를 보여주는 코드는 다음과 같습니다.

```java
public class Bigram {
  private final char first;
  private final char second;

  public Bigram(char first, char second) {
    this.first  = first;
    this.second = second;
  }

  public boolean equals(Bigram b) {
    return b.first == first && b.second == second;
  }

  public int hashCode() {
    return 31 * first + second;
  }

  public static void main(String[] args) {
    Set<Bigram> s = new HashSet<>();
    for (int i = 0; i < 10; i++)
      for (char ch = 'a'; ch <= 'z'; ch++)
        s.add(new Bigram(ch, ch));
    System.out.println(s.size());
  }
}
```

위 코드는 그냥 보면, 문제를 인지할 수 없습니다. 위 코드는 2개의 동일한 소문자로 이루어진 26개의 Bigram을 Set에 반복적으로 추가합니다. (Set은 집합이므로) 26세트가 나와야한다고 생각하지만, 위의 코드는 260세트가 나오게 됩니다.

위의 코드에서의 문제는 equals를 오버로딩하지 않아 그렇습니다.

```java
@Override public boolean equals(Object o) {
  if (!(o instanceof Bigram))
    return false;
  Bigram b = (Bigram) o;
  return b.first == first && b.second == second;
}
```

이와 같이 구성할 때, 생각했던 26세트가 나오게 됩니다.

즉, **super class를 재정의하는 경우 생각하는 모든 메서드 선언에 `Override` 어노테이션을 사용해야합니다.** `Override`어노테이션을 통해서 많은 오류로 부터 사용자를 보호할 수 있습니다.

<br/>

## Item 41. 타입을 정의하기 위해 `Marker Interface`를 사용합니다.

`Marker Interface`는 메서드를 포함하지 않고 일부 구현 속성을 가지는 인터페이스입니다. (Ex. `Serializable` 인터페이스)

`Marker Interface`는 `Marker Annotation`보다 2가지의 장점이 있습니다.

- `marker interface`는 표시된 클래스의 인스턴스에 의해 구현되는 유형을 정의합니다.
  - 이를 통해서 런타임까지 잡을 수 없는 에러를 컴파일 타임에 잡을 수 있습니다.
- `marker interface`는 `marker interface` 보다 더 정확하게 타겟팅할 수 있습니다.
  - `market annotation`은 타겟으로 적용해야하는 반면에, `marker interface`는 인터페이스를 확장하여, 적용할 수 있습니다.

이에 반해 `Marker Annotation`의 장점은 어노테이션의 일부라는 것입니다. 그렇기 때문에 `Marker Annotation`은 어노테이션 기반 프레임 워크의 일관성을 위해 사용할 때 좋습니다.

### Marker Interface와 Marker Annotation의 사용 경우.

`Marker Interface`

- 새로운 메서드가 연결되지 않은 유형과 정의하는 경우
- 클래스와 인터페이스에서 적용되는 경우, 하나 이상의 메서드에서 필요하다고 판단되는 경우

`Marker Annotation`

- 클래스 및 인터페이스 이외의 프로그램 요소를 표시하는 경우
- 어노테이션을 많이 사용하는 프레임 워커에 마커를 맞추려는 경우

> Marker Interface (마커 인터페이스, 태그 인터페이스)

내부에 메서드나 상수가 없는 인터페이스

Ex) `Serializable` 인터페이스, `Clonable` 인터페이스

> Marker Annotation (마커 어노테이션)

멤버를 포함하지 않으며 데이터로 구성되지 않으며, 그저 어노테이션 선언을 표시하기 위해 존재합니다.

Ex) `@Override`
