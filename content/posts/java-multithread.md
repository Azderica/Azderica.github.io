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

- `NEW`
- `RUNNABLE`
- `BLOCKED`
- `WAITING`
- `TIME_WAITING`
- `TERMINATED`

<br/>

## 쓰레드의 우선순위

<br/>

## Main 쓰레드

<br/>

## 동기화

<br/>

## 데드락

---

**출처**
