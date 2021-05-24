---
title: '[Java] Effective Java, Concurrency'
slug: 10-java-effective-java
date: 2021-05-24
published: true
tags: ['Java', 'Stater', 'Effective Java', 'Concurrency']
series: false
cover_image: ./images/EffectiveJava.jpeg
canonical_url: false
description: 'Effective Java 책 중, ch11. 예외에 대해 정리합니다.'
---

# Concurrency (동시성)

동시성은 여러 활동을 동시에 진행할 수 있습니다. 동시 프로그래밍은 단일 스레드 프로그래밍보다 어렵습니다. 더 많은 문제가 발생할 수 있고 실패를 재현하기 어렵기 때문에 동시성을 피할 수 없습니다. 아래에서는 명확하고 정확하며 잘 문서화 된 동시 프로그래밍을 작성하는데 도움이 되는 자료입니다.

## Item 78. 공유된 변경 가능한 데이터는 동기화해서 사용합니다.

`synchronized` 키워드는 하나의 스레드가 한번에 방법 또는 블록을 실행함을 보장합니다. 이를 통해서, 어떤 메서드도 객체의 상태가 일관되게 됩니다.

자바 언어는 long과 double 형을 제외하고는 변수를 읽고 쓰는 것은 원자적입니다. 즉, **동기화 없이 여러 스레드가 같은 변수를 수정하므로 항상 어떤 스레드가 정상적으로 저장한 값을 읽어오는 것을 보장**합니다.

하지만, 스레드가 필드를 읽을 때 항상 수정이 완전히 반영된 값을 얻는다 보장하지만, 한 스레드가 저장된 값이 다른 스레드에서 보이는가는 보장하지 않습니다. 즉, **스레드 간의 안정적인 통신과 상호 배제를 위해서는 동기화가 필요합니다**.

이를 표현한 잘못된 코드는 다음과 같습니다.

```java
public class StopThread {
  private static boolean stopRequested;

  public static void main(String[] args) throws InterruptedException {
    Thread backgroundThread = new Thread(() -> {
      int i = 0;
      while (!stopRequested)
        i++;
    });
    backgroundThread.start();
    TimeUnit.SECONDS.sleep(1);
    stopRequested = true;
  }
}
```

해당 코드의 경우, 스레드가 `start`되고 1초의 sleep후, 루프가 종료될 것으로 예상되지만 종료되지않습니다. 이는 동기화가 되지 않았기 때문입니다. 즉, 동기화가 없어지면 가상 머신이 아래처럼 수정할 수 있습니다.

```java
// 원래 코드
while (!stopRequested)
  i++;

// 최적화한 코드
if (!stopRequested)
  while (true)
    i++;
```

이는 JVM이 적용하는 **끌어올리기(hoisting, 호이스팅)**이라는 최적화 기법이 사용된 경우이며, 이는 종료되지 않습니다. 그렇기 때문에 아래처럼 고쳐서 지속적으로 동작하도록 할 수 있습니다.

```java
public class StopThread {
  private static boolean stopRequested;

  private static synchronized void requestStop() {
    stopRequested = true;
  }

  private static synchronized boolean stopRequested() {
    return stopRequested;
  }

  public static void main(String[] args) throws InterruptedException {
    Thread backgroundThread = new Thread(() -> {
      int i = 0;
      while (!stopRequested())
        i++;
    });
    backgroundThread.start();
    TimeUnit.SECONDS.sleep(1);
    requestStop();
  }
}
```

이와 같이 하면 동기화처리가 되며, 동기화는 읽기와 쓰기 모두 필요합니다. 둘 중 하나만 동기화 하는 경우에는 충준하지 않습니다.

### volatile

volatile(휘발성)은 배타적 수행과는 상관이 없지만 항상 가장 최근에 저장된 값을 읽어온다. 이론적으로는 CPU 캐시가 아닌 컴퓨터의 메인 메모리로부터 값을 읽어옵니다. 그렇기 때문에 읽기/쓰기 모두가 메인 메모리에서 수행됩니다.

```java
public class stopThread {
  private static volatile boolean stopRequested;

  public static void main(String[] args) throws InterruptedException {
    Thread backgroundThread = new Thread(() -> {
      int i = 0;
      while (!stopRequested)
        i++;
    });
    backgroundThread.start();
    TimeUnit.SECONDS.sleep(1);
    stopRequested = true;
  }
}
```

위의 코드처럼 `volatile`을 사용하면 동기화를 생략할 수 있습니다. 그러나 아래의 경우 처럼 문제가 발생할 수 있기에 조심히 사용해야합니다.

```java
private static volatile int nextSerialNumber = 0;

public static int generateSerialNumber() {
  return nextSerialNumber++;
}
```

코드 상으로 증가 연산자(++)는 하나지만 실제로는 volatile 필드에 두 번 접근합니다. 먼저 값을 읽고 그 다음에 1을 증가한 값과 동일한 새로운 값을을 다시 작성합니다. 따라서 두 번째 스레드가 첫 번째 스레드의 연산 사이에 들어와 공유 필드를 읽게되며, 첫번째 스레드와 같은 값을 보게될 것입니다.

이처럼 잘못된 결과를 계산해내는 오류를 안전 실패(safety failure)라고 합니다. 이 문제는 메서드에 `synchronized`를 붙이고 `violate` 키워드를 공유 필드에서 제거하면 해결됩니다.

### atomic 패키지

위의 volatile 보다 더 좋은 방법 중 하나는 `java.util.concurrent.atomic`을 사용하는 것입니다. `java.util.concurrent.atomic`의 패키지에는 락 없이도 thread-safe한 클래스를 제공합니다. `volatile`은 동기화 효과 중 통신쪽만 지원하지만, **패키지는 원자성까지 지원**하며 성능도 다른 동기화 버전에 비해 우수합니다.

```java
private static final AtomicLong nextSerialNum = new AtomicLong();

public static long generateSerialNumber() {
  return nextSerialNum.getAndIncrement();
}
```

### 결론적으로.

가변 데이터를 공유하지 않는 것이 동기화 문제를 피하는 가장 좋은 방법입니다. 즉, **가변 데이터는 단일 스레드에서만 사용하는 것이 좋습니다.** 그리고 이에 대한 문서화를 하는 것이 중요합니다.

한 스레드가 데이터를 수정한 후에 다른 스레드에 공유할 때는 해당 객체에 공유하는 부분만 동기화해도 됩니다. 다른 스레드에 이런 객체를 건네는 행위를 `안전 발행(safe publication)`이라고 합니다. 클래스 초기화 과정에서 객체를 정적 필드, volatile 필드, final 필드 혹은 보통의 락을 통해 접근하는 필드 그리고 동시성 컬렉션에 저장하면 안전하게 발생할 수 있습니다.

여러 스레드가 변경 가능한 데이터를 공유할 때 데이터를 읽거나 쓰는 각 스레드는 동기화를 수행하는 것이 중요합니다.

<br/>

## Item 79. 과도한 동기화는 피합니다.

동기화를 하지 않으면 문제가 발생합니다. 하지만 과도한 동기화는 성능 저하, 데드락, 비결정적 동작을 유발할 수 있습니다.

### 외계인 메서드 (alien method)

이러한 응답 불가 및 안전 문제를 줄이기 위해서는, **동기화된 메서드 또는 블록 내에서 클라이언트에게 제어권을 넘기면 안됩니다.** 즉, 동기화된 영액 내에서 재정의되도록 설계된 메서드 또는 클라이언트가 함수 개체의 형태로 제공하는 메서드를 호출하면 안됩니다. 이러한 **메서드는 무슨 일을 할지 모르기 때문에 예외를 발생시키거나, 교착상태를 만들거나 데이터를 훼손 할 수 있으며 이러한 메서드를 외계인 메서드(`alien method`)라고 합니다.**

```java
// Broken - 동기화 된 블록에서 외계인 메서드를 호출한 경우.
public class ObservableSet<E> extends ForwardingSet<E> {
  public ObservableSet(Set<E> set) { super(set); }

  private final List<SetObserver<E>> observers = new ArrayList<>();

  public void addObserver(SetObserver<E> observer) {
    synchronized(observers) {
      observers.add(observer);
    }
  }

  public boolean removeObserver(SetObserver<E> observer) {
    synchronized(observers) {
      return observers.remove(observer);
    }
  }

  private void notifyElementAdded(E element) {
    synchronized(observers) {
      for (SetObserver<E> observer : observers)
        observer.added(this, element);
    }
  }

  @Override
  public boolean add(E element) {
    boolean added = super.add(element);
    if (added)
      notifyElementAdded(element);
    return added;
  }

  @Override
  public boolean addAll(Collection<? extends E> c) {
    boolean result = false;
    for (E element : c)
      result |= add(element);  // Calls notifyElementAdded
    return result;
  }
}
```

```java
@FunctionalInterface
public interface SetObserver <E> {
  // 관찰 가능한 집합에 요소가 추가 될 때 호출됩니다.
  void added (ObservableSet <E> set, E element);
}
```

위 코드는 집합에 원소가 추가되면 알림을 받는 관찰자 패턴을 사용한 예제 코드입니다. 해당 코드는 `addObserver` 메서드를 호출해서 알림을 구독하고, `removeObserver` 메서드를 호출해서 구독을 취소합니다.

이를 통한 잘못된 코드는 아래와 같습니다.

```java
set.addObserver (new SetObserver <> () {
  public void added (ObservableSet <Integer> s, Integer e) {
    System.out.println(e);
      if (e == 23)
        s.removeObserver (this);
  }
});
```

위 코드는 `ConcurrentModificationException`가 발생합니다. 해당 경우, 0부터 23까지 출력한 후 자신을 remove하고 종료할 것 같으나, 실제로 실행해보면 0~23까지 출력 후 예외가 발생합니다. 이유는 added 메서드 호출이 일어난 시점이 `notifyElementAdded`가 `Observer`들의 리스트를 순회하는 도중이기 때문입니다.

added 메서드에서 `ObservableSet.removeObserver` 메서드를 호출하고, 또 여기서 observers.remove 메서드를 호출하는데 여기서 문제가 발생합니다. 즉, 순회하고 있는 리스트에서 원소를 제거하려고하기 때문에 `notifyElementAdded` 메서드에서 수행하는 순회는 동기화 블록 안에 있어 동시 수정이 일어나지는 않지만, 자신이 콜백을 거쳐 되돌아와 수정하는 것은 막을 수 없습니다.

또 다른 예시로 쓸데없는 백그라운드 스레드를 사용한 케이스를 볼 수 있습니다.

```java
// 백그라운드 스레드를 불필요하게 사용하는 옵저버
set.addObserver (new SetObserver <> () {
  public void added (ObservableSet <Integer> s, Integer e) {
    System.out.println (e);
    if (e == 23) {
      ExecutorService exec = Executors.newSingleThreadExecutor ();
      try {
        exec.submit (()-> s.removeObserver (this)). get ();
      } catch (ExecutionException | InterruptedException ex) {
        throw new AssertionError (ex);
      } finally {
        exec.shutdown ();
      }
    }
  }
});
```

해당 코드는 예외는 발생하지 않지만, deadlock에 빠집니다. 백그라운드 스레드가 `s.removeObserver` 메서드를 호출하면, 메인 스레드가 이미 락을 가지고 있기 때문에 `Observer`을 잠그려 시도하지만 락을 얻을 수 없습니다.

이러한 외계인 메서드 예제를 정의한 코드를 보면 `removerObserver` 메서드에는 `synchronized` 키워드가 있기 때문에 실행 시 락이 걸립니다. 동시에 메인 스레드는 백그라운드 스레드가 `Observer`를 제거하기만 기다리기 때문에 deadlock에 빠집니다.

이를 해결하는 방법은 다음과 같습니다.

- 외계인 메서드 호출을 동기화 블럭 바깥으로 옮깁니다.

```java
private void notifyElementAdded(E element) {
  List<SetObserver<E>> snapshot = null;
  synchronized(observers) {
    snapshot = new ArrayList<>(observers);
  }
  for (SetObserver<E> observer : snapshot)
    observer.added(this, element);
}
```

- 더 나은 방법으로는 자바의 `concurrent collection`을 사용하는 방법도 있습니다.

```java
private final List<SetObserver<E>> observers = new CopyOnWriteArrayList<>();

public void addObserver(SetObserver<E> observer) {
  observers.add(observer);
}

public boolean removeObserver(SetObserver<E> observer) {
  return observers.remove(observer);
}

private void notifyElementAdded(E element) {
  for (SetObserver<E> observer : observers)
    observer.added(this, element);
}
```

위와 같은 `CopyOnWriteArrayList`는 ArrayList를 구현한 클래스로 내부를 변경하는 작업은 항상 깨끗한 복사본을 만들어서 수행하도록 구현되어 있습니다. 내부의 배열은 수정되지 않아, 순회할 때 락이 필요없이 매우 빠릅니다. 다른 용도로 사용되는 경우에는 복사를 매번 해야하기에는 느리지만 수정할 일이 적고 순회만 자주 일어나는 경우, Observer 리스트 용도로는 최적입니다.

이처럼 과도한 동기화는 병렬로 실행할 기회를 읽고, 모든 코어가 메모리를 일관되게 보기 위한 지연시간이 지연 비용입니다. 또한 JVM으 코드 최적화를 제한하는 것도 고려해야합니다.

즉, 가변 클래스를 작성할 때는 두가지 선택을 할 수 있습니다.

- 동기화를 하지 않고 그 클래스를 사용해야하는 클래스가 외부에서 동기화 하는 것
  - `java.util` 패키지 (vector와 hashtable 제외)
- 동기화를 내부에서 수행해 `thread-safe`한 클래스를 만드는 것
  - `java.concurrent`패키지

결론적으로 **동기화 영역에서는 작업을 최소한으로 줄이는 것이 중요**합니다. 오래 걸리는 작업이라면 동기화 영역 밖으로 옮기는 방법을 찾아보는 것이 중요합니다. 여러 스레드가 호출할 가능성이 있는 메서드가 정적 필드를 수정한다면 그 필드를 사용하기 전에 반드시 동기화해야합니다.

가변 클래스를 설계할 때는 스스로 동기화해야할지를 고민해야합니다. 과도한 동기화를 피하는 것이 중요하며 합당한 이유가 있는 경우에만 내부에서 동기화하고 동기화 여부를 문서화합니다.

<br/>

## Item 80. 스레드보다는 executors, task, stream을 선호합니다.

스레드를 직접 다룰 수 있지만, `concurrent` 패키지를 이용하면 간단하게 코드를 작성할 수 있습니다.

### Executor Framework

`java.util.concurrent` 패키지에는 인터페이스 기반의 유연한 태스크 실행 기능을 담은 실행자 프레임워크(Executor Framework)가 있습니다. 예를 들어 옛날에는 작업 큐를 작성하기 위해서 많은 코드를 작성했다면 현재는 간단하게 생성가능합니다.

```java
// 작업 큐 생성
ExecutorService exec = Executors.newSingleThreadExecutor ();

// 작업 큐 실행
exec.execute(runnable);

// 작업 큐 삭제
exec.shutdown();
```

실행자 프레임워크는 여러 기능을 가지고 있습니다.

| `method`                      | 설명                                        |
| ----------------------------- | ------------------------------------------- |
| `get`                         | 특정 태스크가 완료되기 까지를 기다림        |
| `invokeAny`                   | 태스크 중 하나가 완료되는 것을 기다림       |
| `invokeAll`                   | 모든 테스크가 종료되는 것을 기다림          |
| `awaitTermination`            | 실행자 서비스가 종료하기를 기다림           |
| `ExecutorCompletionService`   | 완료된 태스크들의 결과를 차례로 받음        |
| `ScheduledThreadPoolExecutor` | 태스크를 특정 시간에 혹은 주기적으로 실행함 |

- [출처](https://madplay.github.io/post/prefer-executors-tasks-and-streams-to-threads)

둘 이상의 스레드가 대기열의 요청을 처리하도록 하려면 `ThreadPool`을 쓰면 됩니다.

`Executors.newCachedThreadPool`은 가벼운 프로그램을 실행하는 서버에 적합합니다. 요청받은 task를 큐에 쌓지 않고 바로 처리하며, 사용 가능한 스레드가 없다면 즉시 스레드를 생성하여 처리합니다. 그러나 서버가 무겁다면 새로운 task가 도착할 때마다 다른스레드를 생성하기 때문에 최악입니다. 따라서, 무거운 프로덕션 서버에서는 `Executors.newFixedThreadPool`을 선택해서 스레드 개수를 고정하거나 `ThreadPoolExecutor`를 사용하는 것이 좋습니다.

스레드를 직접 다루는 것은 항상 자제해야합니다. **일반적으로는 스레드를 직접 다루기 보다는 실행자와 프레임워크를 사용하는 것이 중요**합니다. 이렇게 사용하게 되면 작업 단위와 실행 매커니즘을 분리할 수 있습니다. (`Runnable`와 `Callable`)

자바 7부터는 실행자 프레임워크는 `fork-join` task를 지원합니다. `ForkJoinTask`의 인스턴스는 작은 하위 task로 나눌 수 있고, `ForkJoinPool`을 구성하는 스레드들이 이 task들을 처리하며 일을 먼저 끝낸 스레드가 다른 스레드의 남은 task를 가져와서 대신 처리할 수도 있습니다. 이를 통해서 최대한의 CPU를 사용해서, 높은 처리량과 낮은 지연시간을 달성합니다.

<br/>

## Item 81. `wait`와 `notify`보다는 동시성 유틸리티를 선호합니다.

이제는 `wait`와 `notify`보다 더 고수준이며 편리한 동시성 유틸리티를 사용하는 것이 좋습니다. `java.util.concurrent` 패키지의 고수준 유틸리티는 크게 실행자 프레임워크, 동시성 컬렉션, 동기화 장치로 나눌 수 있습니다.

`java.util.concurrent` 패키지는 고수준의 동시성 유틸리티를 제공합니다. 크게 세가지로 분류하면, `Executor Framework`, `Concurrent Collections`, `Synchronizers`로 나눌 수 있습니다.

앞에서 `Executor Framework`를 설명했으므로, `Concurrent Collections`과 `Synchronizers`에 대해 설명할 수 있습니다.

`Concurrent Collections(동시 컬렉션)`와 같은 컬렉션 표준 인터페이스는 고성능의 동시성이 구현되어, `List`, `Queue`, `Map`등을 제공합니다. 이러한 구현은 내부적으로 동기화를 관리합니다. 그렇기 때문에 동시성 컬렉션에서 동시성을 제외하는 것은 불가능합니다. (외부에서 Lock을 사용하면 속도가 느려집니다.)

동시성 컬렉션에서 동시 활동을 제외할 수 없기 때문에 이를 원자적으로 구성할 수 없습니다. 또한 이를 위해 여러 메서드등이 등장했습니다.

예를 들어 `Map`의 `putIfAbsent(key, value)` 메서드가 대표적인 에시로 키가 없는 경우 매핑을 삽입합니다. 기존 값이 있으면 그 값을 반환하고 없는 경우에는 null을 반환하며, String의 `intern` 메서드를 아래처럼 흉내낼 수 있습니다.

```java
private static final ConcurrentMap<String, String> map =
  new ConcurrentHashMap<>();

public static String intern(String s) {
  String result = map.get(s);
  if (result == null) {
    result = map.putIfAbsent(s, s);
    if (result == null)
      result = s;
  }
  return result;
}
```

동기화된 컬렉션보다는 동시성 켈력션을 사용하는 것이 성능에 좋습니다. (Collections의 `synchronizedMap` 보다는 `ConcurrentHashMap`을 사용하는 것이 중요합니다.)

`Synchronizers`를 통하면, 스레드가 다른 스레드를 기다릴 수 있게 해서 서로의 task를 조율할 수 있도록 해줍니다. 대표적으로는 `CountDownLatch`와 `Semaphore`, `CyclicBarrier`, `Exchanger`등이 있습니다. 그외에도 강력한 `Phaser`가 있습니다.

`CountDownLatch`는 하나 이상의 스레드가 또 다른 하나 이상의 스레드 작업이 끝날때까지 기다립니다.

```java
// 동시 실행을 위한 간단한 프레임 워크
public static long time(Executor executor, int concurrency,
    Runnable action) throws InterruptedException {
  CountDownLatch ready = new CountDownLatch(concurrency);
  CountDownLatch start = new CountDownLatch(1);
  CountDownLatch done  = new CountDownLatch(concurrency);

  for (int i = 0; i < concurrency; i++) {
    executor.execute(() -> {
      ready.countDown(); // Tell timer we're ready
      try {
        start.await(); // Wait till peers are ready
        action.run();
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
      } finally {
        done.countDown();  // Tell timer we're done
      }
    });
  }

  ready.await();     // Wait for all workers to be ready
  long startNanos = System.nanoTime();
  start.countDown(); // And they're off!
  done.await();      // Wait for all workers to finish
  return System.nanoTime() - startNanos;
}
```

위 코드에서 실행자는 concurrency로 지정한 값 만큼 스레드를 생성할 수 있어야합니다. 그렇지 않으면 메스드 수행이 끝나지 않는데 이를 스레드 기아 교착 상태라고 합니다. 또, 시간을 잴 때는 `System.currentTimeMillis`보다는 시스템 시간과 무관한 `System.nanoTime`을 사용하는 것이 좋습니다.

새로운 코드라면 `wait`, `notify`가 아닌 동시성 유틸리티를 사용해야합니다. 하지만, 이를 사용해야하는 상황이면 반드시 **동기화 영역 안에서만 사용해야하며, 항상 반복문 안에서 사용해야합니다.**

```java
synchronized (obj) {
  while ({조건이 충족되지 않은 경우})
    obj.wait(); // (락 넣어놓고, 깨어나면 잡습니다.)
  ... // 조건이 충족됐을 때의 동작을 수행합니다.
}
```

이러한 반복문은 `wait` 호출 전후로 조건이 만족하는 지를 검사하는 역할을 합니다. 대기전에 조건을 검사하여, 조건이 충족되었다면 `wait`를 건너뛰게 하는 것은 **응답 불가** 상태를 예방하는 것입니다. 조건이 충족되었는데 스레드가 `notify`나 `notifyAll` 메서드로 먼저 호출한 경우 대기 상태로 빠지면 그 스레드를 다시 깨우지 못합니다.

한편 대기 후에 조건을 검사하여 조건을 충족하지 않았을 때 다시 대기하게 하는 것은 잘못된 값을 계산하는 **안전 실패**를 막기 위한 조치입니다. 그런데 조건이 만족되지 않아도 스레드가 깨어날수 있는 상황이 있습니다.

- `notify`를 호출하여 대기 중인 스레드가 깨어나는 사이에 다른 스레드가 락을 거는 경우
- 조건이 만족되지 않았으나 실수 혹은 악의적으로 `notify`를 호출하는 경우
- 대기 중인 스레드 중 일부만 조건을 충족해도 `notifyAll`로 모든 스레드를 깨우는 경우
- 대기 중인 스레드가 드물게 `notify` 없이 깨어나는 경우, 허위 각성(spurious wakeup)이라고 합니다.

일반적으로는 `notify`보다는 `notifyAll`을 사용하는 것이 안전하며, `wait`는 `while`문 내부에서 호출하는 것이 중요합니다.

<br/>

## Item 82. 스레드 안전성 수준을 문서화합니다.

문서에서 synchronized 수정자를 찾아서, 메서드가 스레드로부터 안전한지 알 수 있다는 말을 들을 수 있는데 이는 꼭 맞는 말은 아닙니다. 스레드 안전성에서도 어느 정도의 수준인지 나뉘므로 멀티스레드 환경에서도 안전하게 사용하려면 지원하는 스레드 안전성 수준을 명시해야합니다.

스레드의 안전성 수준을 높은 순서대로 보면 아래와 같습니다.

- Immutable (변경 불가능)
  - 해당 클래스의 인스턴스는 마치 상수와 비슷하기에 외부 동기화가 필요없습니다.
  - `String`, `Long`, `BigInteger`
- Unconditionally thread-safe (무조건적인 스레드 안전)
  - 해당 클래스의 인스턴스는 수정될 수 있지만 내부에서도 동기화되어 있어, 별도의 외부 동기화 없이 사용해도 안전합니다.
  - `AtomicLong`, `ConcurrentHashMap`
- Conditionally thread-safe (조건부 스레드 안전)
  - 무조건적인 스레드 안전성과 비슷하지만 일부 메서드는 동시에 사용하려면 외부 동기화가 필요합니다.
  - `Collection.synchronized` 래퍼 메서드가 반환한 컬렉션
- Not thread-safe (스레드로부터 안전하지 않음)
  - 해당 클래스의 인스턴스는 수정될 수 있으며 동시에 사용하려면 각각의 메서드 호출을 클라이언트가 선택한 외부 동기화 로직으로 감싸야합니다.
  - `ArrayList`, `HashMap`
- Thread-hostile (스레드와 적대적)
  - 외부 동기화를 사용하더라도, 멀티스레드 환경에서 안전하지 않습니다.
  - 일반저긍로 동시성을 고려하지 않는 클래스입니다.

따라서 동기화에 대한 문서화는 필요합니다. 조건부 스레드에 안전한 클래스는 주의해서 문서화해야합니다. 어떠한 순서로 호출할 때, 외부 동기화 로직이 필요한지 그리고 그 순서대로 호출시 어떤 락을 얻어야하는지를 작성해야합니다.

`Collections.synchronizedMap`의 API 문서는 아래와 같습니다.

```java
Map <K, V> m = Collections.synchronizedMap (new HashMap <> ());
Set <K> s = m.keySet (); // 동기화 된 블록에있을 필요가 없습니다.

...

synchronous (m) {// s가 아닌 m에서 동기화 중입니다!
  for (K key : s)
    key.f ();
}
```

반환 타입만으로 알수 없는 경우, 객체에 대한 스레드 안전성을 문서화해야합니다.

외부에 공개된 락(Lock)을 사용하는 경우, 유연한 코드를 만들 수 있지만 그만한 대가가 따릅니다. 클라이언트가 공개된 락을 통해 서비스 거부 공격(denial-of-service attack)을 수행할 수 있습니다. 이를 방지하려면 비공게 락 객체를 사용해야합니다.

```java
// Private lock 객체 관용구-서비스 거부 공격을 막습니다.
private final Object lock = new Object ();

public void foo() {
  synchronized(lock) {
    ...
  }
}
```

여기서 lock 멤버를 final로 선언한 이유 중 하나는 우연히 락 객체가 교체되는 상황을 방지합니다. 일반적인 락이나 `java.util.concurrent.locks` 패키지에서 가져온 락이 동일합니다. 이와 같이 구성하면서 하위 클래스에서 동끼화 로직을 깨는 것을 예방할 수 있습니다.

모든 클래스는 신중하게 표현된 설명이나 스레ㄷ 안전성 어노테이션을 통해서 스레드의 안전성을 명확하게 문서화해야합니다. 조건부 스레드나, 스레드에 안전한 케이스 모두 lock을 문서화해야하고, `private final lock`을 사용하는 것이 좋습니다.

<br/>

## Item 83. 지연 초기화는 신중히 사용합니다.

`Lazy initialization(지연 초기화)`는 값이 필요할 때까지 필드 초기화를 지연하는 행동입니다. 지연 초기화는 주로 최적화이지만, 클래스 및 인스턴스 초기화에서 유해한 순환성을 깨는데 사용할 수도 있습니다.

지연 초기화는 일종의 양날의 검이기 때문에 필요하지 않으면 수행하지 않는 것이 중요합니다. 지연 초기화된 필드에 액세스하는 비용을 증가시키면서 클래스 초기화 또는 인스턴스 생성 비용을 줄입니다. 따라서 초기화된 필드에 자주 액세스하는지에 따라 성능을 저하시킬 수 있습니다.

대부분의 경우에 지연 초기화보다는 정상적인 초기화가 좋습니다. 특히, 여러 스레드가 있는 경우에는 지연 초기화가 까다롭습니다.

```java
// 인스턴스 필드의 일반 초기화
private final FieldType field = computeFieldValue();
```

지연 초기화가 초기화의 순환성을 깰 것 같으면 `synchronized`를 단 접근자를 이용하는 것이 중요합니다.

```java
// Lazy initialization of instance field - synchronized accessor
private FieldType field;

private synchronized FieldType getField() {
  if (field == null)
    field = computeFieldValue();
  return field;
}
```

성능 때문에 정적 필드를 초기화해야 한다면, **지연 초기화 홀더 클래스**를 사용하는 것이 좋습니다.

```java
private static class FieldHolder {
  static final FieldType field = computeFieldValue();
}

private static FieldType getField() {
  return FieldHolder.field;
}
```

성능을 위해 인스턴스 필드를 지연 초기화해야하는 경우, **double-check(이중검사)** 관용구를 사용하는 것이 좋습니다.

```java
// 반드시 volatile 로 선언
private volatile FieldType field;

private FieldType getField() {
  FieldType result = field;
  if (result != null) // 첫 번째 검사(락 사용 안함)
    return result;

  synchronized(This) {
    if (field == null) // 두 번째 검사(락 사용)
      field = computeFieldValue();
    return field;
  }
}
```

반복해서 초기화해도 상관 없는 인스턴스 필드를 지연 초기화할 때가 있는데 이를 때는 두 번째 검사를 생략해도 됩니다.

```java
// 반드시 volatile 로 선언
private volatile FieldType field;

private FieldType getField() {
  FieldType result = field;
  if (result == null)
    field = result = computeFieldValue();
  return result;
}
```

만역 field 타입이 `long`이나 `double`이 아닌 다른 기본 타입이면 단일 검사의 필드 선언에서 `volatile`을 없앨 수도 있습니다.

이를 요약하면 **대부분의 필드를 지연이 아니라 정상적으로 초기화해야합니다**. 성능을 위하거나 유해한 초기화 순환성을 깨기 위해 필드를 느리게 초기화해야하는 경우, 지연 초기화 기술을 사용해야합니다.

<br/>

## Item 84. 프로그램의 동작을 스레드 스케줄러에 의존하지 않습니다.

### 스레드 스케줄러에 의존하면 안됩니다.

많은 스레드가 실행 가능할 때 스레드 스케줄러는 실행할 스레드와 시간을 결정합니다. 합리적인 운영 체제라면 결정을 공정하게 할려고 하지만 정책은 다를 수 있습니다. 따라서 잘 작성된 프로그램은 이 정책의 세부 사항에 의존하면 안됩니다. 즉, **정확성이나 성능을 위해 스레드 스퀘줄러에 의존하는 프로그램은 이식할 수 없습니다.**

### 성능과 이식성이 좋은 프로그램을 작성합니다.

실행 가능한 스레드의 평균적인 수가 프로세스의 수보다 과도하게 많아서는 안됩니다. 그래야 스케줄러의 고민이 줄어듭니다. 실행 준비가 된 스레드들은 맡은 작업이 끝낼 때까지계속 실행되도록 만들어야합니다.

실행 가능한 스레드 수를 적게 유지하려면 각 스레드가 작업을 완료한 후 다음 작업이 생길 때까지 대기하도록 하는 것입니다. 스레드는 당장 처리해야 할 작업이 없다면 실행되서는 안됩니다.

예를 들어 실행자 프레임워크의 경우, 스레드 풀의 크기를 적절히 설정하고 작업을 짧게 유지하면 됩니다. 다만 너무 작으면 성능이 저하됩니다.

### 스레드는 절대 busy-wait 상태가 되면 안됩니다.

고유 객체의 상태가 바뀔 때까지 쉬지 않고 검사해서는 안됩니다. 바쁜 대기(busy waiting) 상태는 스레드 스케줄러의 변덕에 취약하며 프로세서에 큰 부하를 줘서 다른 유용한 작업의 양이 줄어듭니다.

```java
// 끔찍한 CountDownLatch 구현 - busy-waits incessantly!
public class SlowCountDownLatch {
  private int count;

  public SlowCountDownLatch(int count) {
    if (count < 0)
      throw new IllegalArgumentException(count + " < 0");
    this.count = count;
  }

  public void await() {
    while (true) {
      synchronized(this) {
        if (count == 0)
          return;
      }
    }
  }

  public synchronized void countDown() {
    if (count != 0)
      count--;
  }
}
```

위의 예제 코드를 수행하다 보면, `concurrent` 패키징 있는 `CountDownLatch`보다 훨씬 더 느린 속도를 볼 수 있습니다. 이와 같이 하나 이상의 스레드가 필요도 없이 실행 가능한 상태인 경우 성능과 이식성이 저하됩니다.

`Thread.yield`는 동작하지 않는 스레드가 대기 상태가 되는 등 다른 스레드에게 실행을 양보하는 것을 의미합니다. 하지만 이 경우 특정 스레드가 cpu를 할당받지 못해 느려질 수 있으므로 `yield` 메서드를 쓰는 것은 피해야합니다.

이러한 경우는 테스트할 수단도 없으며 성능이 좋아지더라도 이식성은 나빠질 수 있습니다. 차라리 애플리케이션 구조를 바꿔 동시에 실행 가능한 스레드의 개수를 적게 만드는 것이 좋습니다. 스레드 우선 순위를 조절하는 것도 위험합니다. (이는 이식성에서 가장 나쁜 특성입니다.)
