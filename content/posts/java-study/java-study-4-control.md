---
title: '[Java] 자바 제어문'
slug: 04-java-study
date: 2021-01-02
published: true
tags: ['Java', 'Stater', 'Control', 'Statement', 'Type']
series: true
cover_image: ./images/JavaLogo.jpg
canonical_url: false
description: '자바의 제어문에 대해 정리합니다.'
---

# Java Control

최근 백기선님의 자바 스터디를 알게되어서, 한번 자바에 대한 개념을 스터디를 통해서 잡고 가면 좋을 듯해서 글에 대해서 정리해보겠습니다. 아래는 4주차 내용입니다.

공부할 내용

- 선택문
- 반복문
- 과제. JUnit 5
- 과제. live-study dashboad
- 과제. Linked List
- 과제. Stack
- 과제. ListNode Stack
- 과제. Queue

제어문이란 코드의 실행을 제어하는 구문을 나타냅니다. 대표적으로 선택문과 반복문 등이 있습니다.

<br/>

## 선택문

선택문은 일반적으로 if 문과 swtich 문으로 나눠집니다.

### If 문

if 문은 다음과 같은 `if (조건문) {실행조건}`의 형태를 가집니다. 좀 더 자세하게 설명을 하기 위해서는 해당 코드를 보면서 설명하겠습니다.

```java
public static void ifExample(int caseNum){
  if(caseNum == 1){
    System.out.println("One");
  } else if(caseNum == 2){
    System.out.println("Two");
  } else {
    System.out.println("Others");
  }
}
```

다음의 경우, caseNum 가 1인 경우, One을 출력하고, caseNum가 2인 경우 Two, 그 외의 경우는 모두 Others가 출력됩니다. if문에서 `else if` 와 `else` 는 없어도 됩니다.

### Switch 문

이와 비슷한 예제문으로 Switch 문이 있습니다. 아래와 같은 형태를 가집니다.

```java
public static void switchExample(int caseNum){
  switch (caseNum) {
    case 1:
      System.out.println("One");
      break;    // 해당 라인이 없으면, 출력으로 One \n Two 가 나오게 됩니다.
    case 2:
      System.out.println("Two");
      break;
    default:
      System.out.println("Others");
      break;
  }
}
```

위의 if문과 같이 기능은 똑같은 코드입니다. 마찬가지로 `default`는 생략이 가능합니다. `break`문을 사용하지 않으면, 해당 조건에서 끝나지 않고, 아래의 조건까지 계속 실행됩니다.

<br/>

## 반복문

반복문은 일반적으로 `for 문`과 `while 문`으로 나눠집니다.

### for 문

다음 코드는 구구단의 9단을 예시로 만든 코드입니다. for문은 다음과 같이 `for(initialization; 종료 조건; 반복 수행){}`의 형태를 가지고 있습니다. 특히 처음 for문을 배울 때 신경써야하는 부분은 반복 수행은 마지막에 end state가 만족하지 않는 경우 수행됩니댜.

```java
public static void forExample(){
  for(int i=1; i<10; i++){
    System.out.println(i + " * 9 = " + i*9);
  }
}
```

### while 문

while 문도 이전 코드의 기능과 같습니다. while문은 다음과 같이 `while(종료 조건){}`의 형태를 구성해야합니다. 마찬가지로 조심해야하는 부분으로 종료 조건이 끝나지 않으면 무한 루프가 발생하여 끝나지 않게됩니다.

```java
public static void whileExample(){
  int i=1;
  while(i<10){
    System.out.println(i + " * 9 = " + i*9);
    i++;
  }
}
```

이와 비슷하게 `do {} while(종료 조건)`의 형태가 있습니다. while문과 기능은 비슷하지만, 반드시 한번은 수행된다는 점이 다릅니다.

<br/>

## JUnit 5

이에 관련해서는 기존에 Springboot Test 관련으로 공부한 내용이 있어서, 아래의 글을 참고하면 됩니다.

- [Springboog Test](https://Azderica.github.io/01-springboot-test/)

<br/>

## live-study dashboad

요구사항

- 깃헙 이슈 1번부터 18번까지 댓글을 순회하며 댓글을 남긴 사용자를 체크 할 것.
- 참여율을 계산하세요. 총 18회에 중에 몇 %를 참여했는지 소숫점 두자리가지 보여줄 것.
- Github 자바 라이브러리를 사용하면 편리합니다.
- 깃헙 API를 익명으로 호출하는데 제한이 있기 때문에 본인의 깃헙 프로젝트에 이슈를 만들고 테스트를 하시면 더 자주 테스트할 수 있습니다.

코드는 아래의 링크에 있습니다.

- [예제 코드](https://github.com/Azderica/Study-Java-With-WhiteShip/tree/master/src/main/java/week4)

<br/>

## Linked List

요구사항

- LinkedList에 대해 공부하세요.
- 정수를 저장하는 ListNode 클래스를 구현하세요.
- ListNode add(ListNode head, ListNode nodeToAdd, int position)를 구현하세요.
- ListNode remove(ListNode head, int positionToRemove)를 구현하세요.
- boolean contains(ListNode head, ListNode nodeTocheck)를 구현하세요.

해당 요구사항을 충족시키는 코드입니다.

```java
public class ListNode {
  int data;
  ListNode next;

  public ListNode() {}

  public ListNode(int data) {
    this.data = data;
  }

  static ListNode add(ListNode head, ListNode nodeToAdd, int position) {
    ListNode target = head;
    for (int i = 0; i < position - 1; i++) {
      target = target.next;
    }
    nodeToAdd.next = target.next;
    target.next = nodeToAdd;
    return nodeToAdd;
  }

  static ListNode remove(ListNode head, int positionToRemove) {
    ListNode target = head.next, before = head;
    for (int i = 0; i < positionToRemove - 1; i++) {
      before = target;
      target = target.next;
    }
    before.next = target.next;
    return target;
  }

  static boolean contains(ListNode head, ListNode nodeTocheck) {
    while (head != null) {
      if (head.equals(nodeTocheck)) return true;
        head = head.next;
      }
      return false;
    }
  }
}

```

<br/>

## Stack

요구사항

- int 배열을 사용해서 정수를 저장하는 Stack을 구현하세요.
- void push(int data)를 구현하세요.
- int pop()을 구현하세요.

해당 요구사항을 충족시키는 코드입니다.

```java
public class Stack {
  List<Integer> stack;

  public Stack() {
    this.stack = new ArrayList<>();
  }

  public void push(int data) {
    this.stack.add(data);
  }

  public int pop() {
    int value = this.stack.get(this.stack.size() - 1);
    this.stack.remove(this.stack.size() - 1);
    return value;
  }
}
```

<br/>

## ListNode Stack

요구사항

- ListNode head를 가지고 있는 ListNodeStack 클래스를 구현하세요.
- void push(int data)를 구현하세요.
- int pop()을 구현하세요.

해당 요구사항을 충족시키는 코드입니다.

```java
public class ListNodeStack {
  ListNode head;

  public ListNodeStack() {
    this.head = new ListNode();
  }

  public void push(int data) {
    ListNode node = new ListNode(data);
    ListNode curNode = this.head;
    while (curNode.next != null) curNode = curNode.next;

    curNode.next = node;
  }

  public int pop() {
    if (this.head.next == null) throw new IndexOutOfBoundsException();

    ListNode curNode = this.head.next, before = this.head;
    while (curNode.next != null) {
      before = curNode;
      curNode = curNode.next;
    }

    before.next = null;
    return curNode.data;
  }
}
```

<br/>

## Queue

요구사항

- 배열을 사용해서 한번
- ListNode를 사용해서 한번.

해당 요구사항을 충족시키는 코드입니다.

- 배열을 사용한 코드

```java
public class ArrayQueue {
  int[] queue;
  int head, tail;

  public ArrayQueue(int capacity) {
    this.queue = new int[capacity];
    this.head = -1;
    this.tail = 0;
  }

  public void push(int data) {
    this.queue[++this.head] = data;
  }

  public int pop() {
    if (this.tail > this.head) throw new IndexOutOfBoundsException();
    return this.queue[this.tail++];
  }
}
```

- ListNode를 사용한 코드

```java
public class ListNodeQueue {
  ListNode head;

  public ListNodeQueue() {
    this.head = new ListNode();
  }

  public void push(int data) {
    ListNode node = new ListNode(data);
    ListNode cur = this.head;
    while (cur.next != null) cur = cur.next;
      cur.next = node;
  }

  public int pop() {
    int data = this.head.next.data;
    this.head = this.head.next;
    return data;
  }
}


```

<br/>
