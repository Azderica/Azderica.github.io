---
title: '[Java] 자바 제어문'
slug: 00-java-statement
date: 2021-01-02
published: true
tags: ['Java', 'Control', 'Statement', 'Type']
series: false,
cover_image: ./images/JavaLogo.jpg
canonical_url: false
description: '자바의 제어문에 대해 정리합니다.'
---

# Java Operatore

최근 백기선님의 자바 스터디를 알게되어서, 한번 자바에 대한 개념을 스터디를 통해서 잡고 가면 좋을 듯해서 글에 대해서 정리해보겠습니다. 아래는 4주차 내용입니다.

공부할 내용

- 선택문
- 반복문
- JUnit 5
- live-study dashboad
- Linked List
- Stack
- ListNode Stack
- Queue

제어문이란 코드의 실행을 제어하는 구문을 나타냅니다. 대표적으로 선택문과 반복문 등이 있습니다.

<br/>

## 선택문

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

<br/>

## JUnit 5

<br/>

## live-study dashboad

<br/>

## Linked List

<br/>

## Stack

<br/>

## ListNode Stack

<br/>

## Queue

<br/>
