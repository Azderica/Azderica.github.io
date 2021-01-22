---
title: '[Java] Java Multi Thread'
slug: 10-java-study
date: 2021-01-22
published: true
tags: ['Java', 'Stater', 'Multithread']
series: false,
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
public static void main(String[] args) {    // smain thread tart
    ...
}   // main thread end
```

다만 Main 쓰레드는 **싱글 쓰레드**인지, 혹은 **멀티 쓰레드**인지에 따라서도 다릅니다.

![Thread-Diff](https://user-images.githubusercontent.com/42582516/105510514-12bb6e80-5d12-11eb-912d-10ef0e099dc1.png)

싱글 쓰레드 어플리케이션의 경우에는 main thread가 종료되면 프로세스도 종료되지만, **멀티 쓰레드 어플리케이션의 경우에는 main Thread가 종료되더라도 실행중인 thread가 하나라도 있으면 프로세스는 종료되지 않습니다.**

### Daemon Thread

- Main 쓰레드의 작업을 돕습니다.
- Main 쓰레드가 종료되면 보조역할을 하는 Daemon Thread은 강제적으로 종료됩니다.
- **Daemon 쓰레드**는 Daemon 쓰레드가 될 쓰레드에 `setDaemon(true)`를 호출하면 됩니다.
- 일반적으로 부가적인 작업을 수행할 때, Main 쓰레드가 종료되면 같이 종료되게 하기 위해서 사용합니다.

<br/>

## 동기화(Synchronize)

<br/>

## 데드락

---

**출처**
