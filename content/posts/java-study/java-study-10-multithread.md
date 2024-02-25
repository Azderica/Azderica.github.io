---
title: '[Java] Java Multi Thread'
slug: 10-java-study
date: 2021-01-22
published: true
tags: ['Java', 'Stater', 'Multithread']
series: false
cover_image: ./images/JavaLogo.jpg
canonical_url: false
description: 'Java 멀티쓰레드에 대해 정리합니다.'
---

# Java Interface

10 주차 내용은 멀티쓰레드 프로그래밍에 관련된 내용입니다.

공부할 내용

- Thread 클래스와 Runnable zmffotm
- 쓰레드의 상태
- 쓰레드의 우선순위
- Main 쓰레드
- 동기화
- 데드락

<br/>

## 들어가기 앞서.

### Process와 Thread의 차이

**Process란**

- 단순히 실행 중인 프로그램
- 사용자가 작성한 프로그램이 OS에 의해 메모리 공간을 할당 받아 실행 중인 것
- 프로세스는 프로그램에 사용되는 데이터, 메모리, 쓰레드로 구성됩니다.

**Thread란**

- 프로세스 내에서 실제로 작업을 수행하는 주체
- 가장 작은 실행 단위 입니다.
- 모든 프로세스에서는 1개 이상의 쓰레드가 존재하여 작업을 수행합니다.
- 두개 이상의 쓰레드를 가지면 멀티 쓰레드 프로세스라고 합니댜.

이 차이를 그림으로 나타내면 다음과 같습니다.

![process-thread-diff](https://user-images.githubusercontent.com/42582516/105566319-d9651c00-5d6e-11eb-92a9-fe7cd625276a.png)

<br/>

## Thread 클래스와 Runnable 인터페이스

자바에서 쓰레드를 생성하는 방법은 크게 두가지로 구성됩니다.

- `Thread` 클래스를 사용
- `Runnable` 인터페이스를 사용

다만, Thread 클래스 Runnable 인터페이스와 차이가 있는 것이 아닌 구현한 클래스이므로, 어떤 것을 적용하는 지의 차이로 볼 수 있습니다. 둘 모두 `java.lang` 패키지에 포함되어 있습니다..

### Thread 클래스

쓰레드의 클래스는 다음과 같이 구성됩니다.

```java
package java.lang;

class Thread implements Runnbale {
    private static native void registerNatives();
    ...
}
```

이를 사용한 예제 코드는 다음과 같습니다.

```java
public class Example1 extends Thread{
    @Override
    public void run() {
        for (int i = 0; i < 10; i++){
            System.out.println(i);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```

### Runnable 인터페이스

Runnable Interface는 다음과 같이 구성됩니다.

```java
@FunctionalInterface
public interface Runnable {
    public abstract void run();
}
```

이를 구현하면 다음과 같습니다.

```java
public class RunnableExample implements Runnable{
    @Override
    public void run() {
        for (int i = 0; i < 10; i++){
            System.out.println(Thread.currentThread().getName() + ":" + i);
            try{
                Thread.sleep(1000);
            } catch (InterruptedException e){
                e.printStackTrace();
            }
        }
    }
}
```

### 예제 코드를 통한 쓰레드 구현

코드를 구현해보면 다음과 같이 동작하는 것을 알 수 있습니다.

해당 코드와 결과를 보면, 순차적으로 일어나고 있지 않음을 알수 있습니다.

![start-example](https://user-images.githubusercontent.com/42582516/105505206-046a5400-5d0c-11eb-8e38-bb01725cf329.png)

`run()` 호출 시에는 그저 메소드 호출의 의미를 가지기 때문에 아래와 같은 결과가 나옵니다.

![run-example](https://user-images.githubusercontent.com/42582516/105505781-b73ab200-5d0c-11eb-9975-18e75f3bdec6.png)

`start()`를 함으로써 쓰레드를 생성하고 각 쓰레드는 각각의 호출스택을 가지게 됩니다.

<br/>

## 쓰레드의 상태

Thread의 상태는 크게 6가지로 구성됩니다.

![image](https://user-images.githubusercontent.com/42582516/105506399-59f33080-5d0d-11eb-9e0f-acae0353ec69.png)

이를 하나씩 설명하면 다음과 같습니다.

- `NEW` : 쓰레드 인스턴스가 생성은 되었으나 아직 start 하지 않은 상태입니다.
- `RUNNABLE` : 쓰레드가 start 한 상태, 동작 가능한 상태임을 의미합니다. (동작 중일 수도 dlT고 아닐 수 도 있습니다.)
- `BLOCKED` : Monitor lock을 획득하기 위해 다른 스레드가 락을 풀기를 기다리는 상태입니다.
- `WAITING` : 대기상태에 들어간 쓰레드입니다.
- `TIME_WAITING` : WAITING과 비슷하지만, 정해진 시간동안 대기시간에 들어갑니다.
- `TERMINATED` : 쓰레드가 동작을 완료한 상태입니다.

이를 사용하는 Thread method로는 아래와 같은 함수 들이 있습니다.

- `static void sleep(long millis)`, `static void sleep(long millis, int nanos)`
  - 지정된 시간동안 쓰레드를 일시정지시켜 그 시간이 지나면 자동적으로 다시 실행대기상태가 된다.
- `void join()`, `void join(long millis)`, `void join(long millis, int nanos)`
  - 지정된 시간동안 쓰레드가 실행되도록 한다.
- `void interrupt()`
  - sleep()이나 join()에 의해 일시정지상태인 쓰레드를 깨워서 실행대기 상태로 만든다.
  - 해당 쓰레드에서는 InterruptedException이 발생함으로써 일시정지상태를 벗어나게 된다.
- `void stop()`
  - 쓰레드를 즉시 종료 시킨다.
- `void suspend()`
  - 쓰레드를 일시정지시킨다. resume()을 호출하면 다시 실행대기상태가 된다.
- `void resume()`
  - suspend()에 의해 일시정지상태에 있는 쓰레드를 실행대기상태로 만든다.
- `static void yield()`
  - 실행 중에 자신에게 주어진 실행시간을 다른 쓰레드에게 양보하고 자신은 실행대기상태가 된다.

<br/>

## 쓰레드의 우선순위

다중작업을 진행할 때는 멀티쓰레드 방식을 하는데 이 경우는 크게 **동시성(Concurrency)** 와 **병렬성(Parallelism)** 으로 나눠집니다.

![java-concurrency-parallelism](https://user-images.githubusercontent.com/42582516/105507187-3da3c380-5d0e-11eb-91c3-3e1fb63c091d.png)

**동시성**의 경우는 싱글코어에 멀티 스레드를 번갈아가면서 실행합니다. **병렬성**의 경우에는 멀티코어에 개별 스레드를 동시에 실행시킵니다.

### 우선순위 할당 방식

Java에서는 각 쓰레드는 우선순위에 관한 필드값을 가지고 있고 우선순위에 따라 특정 쓰레드가 더 많은 시간동안 작업을 할 수 있습니다.

쓰레드의 우선 순위는 다음과 같습니다.

- `static int MAX_PROPERTY` : 쓰레드가 가질 수 있는 최대 우선순위
- `static int MIN_PROPERTY` : 쓰레드가 가질 수 있는 최소 우선순위
- `static int NORM_PROPERTY` : 쓰레드가 생성될 때 가지는 기본 우선순위

`setPriority()` 을 통해서 쓰레드의 우선순위를 변경할 수 있으며, 범위는 1~10 입니다. 번호가 높아질 수록 우선순위가 높으나, 상대적인 순위입니다. (기본은 5로 정의되어 있습니다)

아래의 코드처럼 사용할 수 있으며, 이 결과로 우선순위가 높은 쓰레드가 좀 더 많이 실행됩니다.

```java
public static void main(String[] args){
        Thread threadExample = new ThreadExample();
        Thread runnableExample = new Thread(new RunnableExample());

        runnableExample.setPriority(10);
        threadExample.start();
        runnableExample.start();
    }
```

### 순환 할당 방식

할당량(Time Slice)을 정해서 하나의 스레드를 정해진 시간만큼 실행하고 다른 스레드를 실행하는 방식입니다. 이는 `JVM`에 의해 결정됨으로 임의로 수정이 불가능합니다.

<br/>

## Main 쓰레드

Java에서 main() 메소드는 프로그램의 시작점입니다. 이 main() 메소드 또한 쓰레드에 의해 실행되기 때문에 main 쓰레드라고 하기도 합니다.

해당 코드처럼 로직이 돌아갑니다.

```java
public static void main(String[] args) {    // main thread tart
    ...
}   // main thread end
```

다만 Main 쓰레드는 **싱글 쓰레드**인지, 혹은 **멀티 쓰레드**인지에 따라서도 동작이 다릅니다.

![Thread-Diff](https://user-images.githubusercontent.com/42582516/105510514-12bb6e80-5d12-11eb-912d-10ef0e099dc1.png)

싱글 쓰레드 어플리케이션의 경우에는 main thread가 종료되면 프로세스도 종료되지만, **멀티 쓰레드 어플리케이션의 경우에는 main Thread가 종료되더라도 실행중인 thread가 하나라도 있으면 프로세스는 종료되지 않습니다.**

### Daemon Thread

- Main 쓰레드의 작업을 돕습니다.
- Main 쓰레드가 종료되면 보조역할을 하는 Daemon Thread은 강제적으로 종료됩니다.
- **Daemon 쓰레드**는 Daemon 쓰레드가 될 쓰레드에 `setDaemon(true)`를 호출하면 됩니다.
- 일반적으로 부가적인 작업을 수행할 때, Main 쓰레드가 종료되면 같이 종료되게 하기 위해서 사용합니다.

<br/>

## 동기화

멀티 쓰레드의 경우에는 여러 쓰레드가 같은 프로세스 내의 자원을 공유하기 때문에 서로의 작업에 영향을 줄 수 있습니다. 이를 방지하기 위해 한 쓰레드가 특정 작업을 끝마치기 전까지 다른 쓰레드에 방해받지 않도록 하는 개념이 필요하여 `critical section(입계 영역)` 과 `lock(잠금)` 입니다.

공유데이터로 사용하는 코드 영역을 `critical section`으로 지정하여, lock을 획득한 하나의 쓰레드만 이 영역 내에서 코드를 수행할 수 있게 합니다. 해당 쓰레드가 임계 영역 내에서 모든 코드를 수행하고 나서 lock 을 반납하고 나가야, 다른 쓰레드가 반납된 lock을 얻어 임계 영역의 코드를 수행할 수 있습니다.

이 때 한 쓰레드가 진행중인 작업을 다른 쓰레드가 간섭하지 못하도록 막는 것을 **쓰레드의 동기화**라고 합니다.

자바에서 동기화하는 방법은 크게 3가지로 분류됩니다.

- `Synchronized`
- `Atomic` 클래스
- `Volatile` 클래스

### Synchronized

Java의 예약어 중 하나입니다. 크게 두 가지 방법으로 사용됩니다.

- synchronized methods : 메소드 자체를 `synchronized` 키워드로 선언한는 방법
- synchronized statements ; 메소드 내의 특정 문장을 `synchronized`로 감싸는 방법

다음과 같이 코드를 짤 수 있습니다. 해당 코드는 결과값을 2개의 쓰레드에서 10000번 더하는 코드입니다.

```java
public class SyncCalculator {
    private int res;

    public SyncCalculator() {
        res = 0;
    }

    public synchronized void plus(int num){
        res += num;
    }

    public synchronized void minus(int num){
        res -= num;
    }

    public int getRes(){
        return res;
    }
}
```

```java
public class CalcThread extends Thread {
    private SyncCalculator calc;

    public CalcThread(SyncCalculator calc){
        this.calc = calc;
    }

    public void run() {
        for(int i = 0; i<10000; i++)
            calc.plus(1);
    }
}
```

해당 코드를 실행시키면 결과는 다음과 같습니다.

- Synchronized 사용시.

![image](https://user-images.githubusercontent.com/42582516/105567926-1209f300-5d79-11eb-9e2d-56561fb2e8a8.png)

- Synchronized 미사용시

![image](https://user-images.githubusercontent.com/42582516/105567911-f7377e80-5d78-11eb-9c2a-c025778292ad.png)

다음과 같이 Synchronized을 사용하면 동기화가 되는 것을 확인할 수 있습니다.

### Atomic 클래스

`Atomicity(원자성)`의 개념은 **쪼갤 수 없는 가장 작은 단위**를 의미합니다. 자바의 Atomic Type은 Wrapping 클래스의 일종으로서 CAS(Compare-And-Swap) 알고리즘을 사용해 lock 없이 동기화 처리를 할 수 있습니다.

`AtomicBoolean`, `AtomicInteger` 등의 클래스가 있으며 `java.util.concurrent.atomic` 패키지에 정의된 클래스입니다.

#### Atomic Method

- `get()`, `set()`
  - 기존 기능과 동일합니다.
- `getAndSet(newValue)`
  - atomic하게 값을 업데이트 하고, 원래의 값을 반환합니다.
- `compareAndSet(expect, update)`
  - 현재 값이 예상되는 값과 동일하다면, update하고 true을 반환합니다.
  - 현재 값이 예상되는 값이 다르다면, update를 하지않고 false를 반환합니다.
- 그외에도 여러가지 mehtod가 있습니다.

**Compae And Swap(CAS)**

- 현재 주어진 값(현재 쓰레드에서의 데이터)와 실제 데이터가 저장된 데이터를 비교하여 두 개가 일치할 때만 값을 업데이트합니다. 이 역활을 수행하는 method는 `compareAndSet` 입니다.

### Volatile 클래스

#### Volatile 이란.

- `volatile` keyword는 Java 변수를 Main Memory에 저장하겠다는 것을 명시합니다.
- 변수의 값을 읽을 때, CPU cache에 저장된 것이 아닌 Main Memory에서 읽습니다.
- 변수의 값을 쓸 때, Main Memory에 작성을 합니다.

#### Volatile 사용 이유.

`volatile` 변수를 사용하지 않는 MultiThread 애플리케이션은 작업을 수행하는 동안 성능 향상을 위해서 아래 그림과 같이 Main Memory에서 읽은 변수를 CPU Cache에 저장하게 됩니다.

![why-volatile](https://user-images.githubusercontent.com/42582516/105566601-593fb600-5d70-11eb-8804-a267a7970c67.png)

다만 Multi Thread 환경에서 Thread가 변수 값을 읽어올 때 각각의 CPU Cache에 저장된 값이 달라 변수 값이 다른 수도 있습니다. 이를 가시성 문제라고 합니다.

![why-volatile-2](https://user-images.githubusercontent.com/42582516/105566665-c05d6a80-5d70-11eb-85ed-32b695af397a.png)

이를 해결하기 위해서 `volatile` 키워드를 추가하여 해당 문제를 해결합니다. `volatile` 키워드를 통해 변수의 read/write 를 Main Memory에서 진행하게 됩니다.

```java
public volatile int counter = 0;
```

**다만**, CPU Cache보다 Main Memory에서 비용이 더 크기 때문에 **변수 값 일치를 보장**해야 하는 경우에만 이를 사용합니다.

<br/>

## 데드락(Deadlock)

### Deadlock 이란.

![deadlock](https://user-images.githubusercontent.com/42582516/105568052-e9cec400-5d79-11eb-98d8-2e806812fcf8.png)

Deadlock이란 둘 이상의 쓰레드가 lock을 획득하기 위해 대기를 하는데, 이 lock을 잡고 있는 쓰레드들 또한 다른 lock을 기다리면서 서로 block 상태에 놓이는 것을 의미합니다.

이러한 Deadlock 상태가 되기 위해서는 4가지 조건을 만족해야합니다.

- **Mutual exclusion(상호배제)** : 프로세스들이 필요로 하는 자원에 대해 배타적인 통제권을 요청합니다.
- **Hold and wait(점유대기)** : 프로세스가 할당된 자원을 가진 상태에서 다른 자원을 기다립니다.
- **No preemption(비선점)** : 프로세스가 어떤 자원의 사용을 끝날 때까지 그 자원을 뺏을 수 없습니다.
- **Circular wait(순환대기)** : 각 프로세스는 순환적으로 다음 프로세스가 요구하는 자원을 가지고 있습니다.

### Deadlock 해결

이를 해결하는 방법은 크게 3가지(예방, 회피, 무시)로 구성됩니다.

#### 데드락 예방

앞서 이야기한 4가지 조건 중 하나를 제거합니다. 다만 이러한 방법들은 자원 사용의 효율성이 떨어집니다.

#### 데드락 회피

자원이 어떻게 요청될지에 대한 추가정보를 제공하도록 요구하는 것이며, 이를 검사하는 알고리즘을 사용합니다.

- Resource Allocation Graph Algorithm
- Banker's Algorithm

#### 데드락 무시

일반적으로 예방과 회피를 사용하면 자연적으로 성능적으로 낮아집니다. 일반적으로 데드락 발생이 드물게 일어나고 그에 대한 코스트가 적다면 무시하는 방법을 선택할 수도 있습니다.

---

**출처**

- https://sujl95.tistory.com/63
- https://www.notion.so/Thread-5fdb5d603a6a473186bf2738f482cedc
- https://www.notion.so/ac23f351403741959ec248b00ea6870e
- https://www.notion.so/10-4a588c3795c3455fb8c498a040696ce8
- https://velog.io/@jaden_94/10%EC%A3%BC%EC%B0%A8-%ED%95%AD%ED%95%B4%EC%9D%BC%EC%A7%80-Multi-Thread-Programming
