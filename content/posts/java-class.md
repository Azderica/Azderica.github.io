---
title: '[Java] 자바 클래스'
slug: 05-java-study
date: 2021-01-12
published: true
tags: ['Java', 'Stater', 'Class', 'Object', 'Method']
series: true,
cover_image: ./images/JavaLogo.jpg
canonical_url: false
description: '자바의 클래스에 대해 정리합니다.'
---

# Java Operatore

백기선님의 자바 스터디 5주차, 클래스에 대해 정리해보겠습니다.

공부할 내용

- 클래스 정의하는 방법
- 객체 만드는 방법 (new 키워드 이해하기)
- 메소드 정의하는 방법
- 생성자 정의하는 방법
- this 키워드 이해하기

과제

- int 값을 가지고 있는 이진 트리를 나타내는 Node 라는 클래스를 정의하세요.
- int value, Node left, right를 가지고 있어야 합니다.
- BinrayTree라는 클래스를 정의하고 주어진 노드를 기준으로 출력하는 bfs(Node node)와 dfs(Node node) 메소드를 구현하세요.
- DFS는 왼쪽, 루트, 오른쪽 순으로 순회하세요.

<br/>

## 객체 지향이란.

먼저 자바의 클래스 개념에 대해 알기 전에 **객체지향 프로그램**에 대해서 정확하게 인지를 하고 넘어가야합니다.

객체지향 프로그래밍이란 실제 세계에 존재하는 모든 것을 **객체**로 취급하여 프로그래밍 하는 방법입니다. 이러한 객체 지향은 실제 세계의 모습을 표현하기 위해 나온 것이며 아래의 특징을 가집니다.

- **캡슐화(Encapsulation)**
  - 데이터(속성)와 데이터를 처리하는 함수를 하나로 묶는 것
  - 캡슐화된 객체의 세부 내용이 외부에 은폐(정보 은닉)되어, 변경이 발생할 때 오류의 파급효과가 적고 재사용에 편리합니다.
- **정보은닉(Information Hiding)**
  - 다른 객체에게 자신의 정보를 숨기고 자신의 연산만을 통하여 접근을 허용하는 것입니다.
- **추상화(Abstarction)**
  - 불필요한 부분을 생략하고 객체의 속성 중 가장 중요한 것에만 중점을 두어 개략화하는 것, 즉 모델화 하는 것입니다.
- **상속성(Inheritance)**
  - 이미 정의된 상위 클래스(부모 클래스)의 모든 속성솨 연산을 하위 클래스가 물려받는 것
  - 상속성을 이용하면 하위 클래스는 상위 클래스의 모든 속성과 연산을 자신의 클래스 내에서 다시 정의하지 않고서도 즉시 자신의 속성으로 사용할 수 있습니다.
  - ex) `extends`
- **다형성(Polymorphism)**
  - 메시지에 의해 개체(클래스)가 연산을 수행하게 될 때 하나의 메시지에 대해 각 객체(클래스)가 가지고 있는 고유한 방법(특성)으로 응답할 수 있는 능력
  - 객체(클래스)들은 동일한 메소드명을 사용하며 같은 의미의 응답을 합니다.
  - ex) `1+2=3 / A+B=AB`

<br/>

## 클래스.

클래스란 객체를 생성하기 위해 **상태(state)와 행동(behavior)을 정의하는 일종의 설계도**라고 볼 수 있습니다.

이를 표현하는 용어로 일반적으로 붕어빵 틀로 묘사하고는 합니다. 붕어빵은 일종의 객체로서 여러 개를 만들 수 있고, 붕어빵 틀은 이러한 객체를 만들 수 있는 클래스입니다.

클래스는 다음과 같이 선언할 수 있습니다.

```java
class ClassName{
    // attribute
    private int num;

    // method
    public int getNum(){
        return num;
    }
}
```

<br/>

## 객체 만들기

객체는 클래스를 인스턴스화 시킨 것으로 표현할 수 있습니다. 일반적으로 `new` 키워드를 통해서 생성할 수 있으며, 이러한 `new` 키워드는 객체에 메모리를 할당하는 과정으로 볼 수 있습니다.

다음과 같이 사용할 수 있습니다.

```java
public class ClassTest {    // 객체 1
    private int num;

    public int getNum(){
        return num;
    }
}

public class Main {
    public static void main(String[] args){
        ClassTest object1 = new ClassTest();    // object 1
        ClassTest object2 = new ClassTest();    // object 2
    }
}
```

다음처럼 `new` 키워드를 통해 여러개의 객체를 선언할 수 있습니다.

### new 연산자

new 연산자는 클래스 타입의 인스턴스를 생성해주는 역할을 하는 연산자이며, 메모리(Heap 영역)에 공간을 할당 받고 그 공간의 참조값을 객체에게 반환해주는 역할을 합니다.

<br/>

## 메서드 정의

메서드는 다음과 같은 형태로 구성됩니다. 일반적으로 어떠한 기능을 수행한다고 이해하면 됩니다.

![method](https://user-images.githubusercontent.com/42582516/104312556-1e40b580-551a-11eb-820c-4a6d4041d314.png)

메서드의 접근 제어자는 여러 게시물에서 소개했지만, 한번 더 정리하자면 다음과 같습니다.

![image](https://user-images.githubusercontent.com/42582516/104312777-6e1f7c80-551a-11eb-9892-329bd9312921.png)

이는 일종의 범위로 이해하면 됩니다.

<br/>

## 생성자 정의

생성자는 객체가 생성된 직후에 클래스의 객체를 초기화하는데 사용됩니다. 생성자를 명시하지 않으면 컴파일러가 자동으로 기본 생성자를 생성합니다. 하지만 다른 생성자를 명시했다면 기본 생성자는 컴파일 시 생성되지 않습니다.

```java
Point() {}  // 기본 생성자

Point(int x, int y) {
    this.x = x;
    this.y = y;
}
```

<br/>

## this 키워드 이해하기

`this` 키워드는 인스턴스의 자기 자신을 의미합니다. `this` 키워드를 사용해서 지역변수와 구별도 가능합니다. 다만, 클래스 메서드에서는 인스턴스가 생성되지 않을 수도 있기 때문에 `this`를 사용할 수 없습니다.

```java
public class Point {
    int x;  // 1
    int y;

    Point(){
        this.x = 0;
        this.y = 0;
    }

    Point(int x, int y){    // 2
        this.x = x;     // 1 <- 2
        this.y = y;     // 1 <- 2
    }
}

```

<br/>

## 과제.

다음의 요구사항을 가지는 클래스를 만듭니다.

- int 값을 가지고 있는 이진 트리를 나타내는 Node 라는 클래스를 정의하세요.
- int value, Node left, right를 가지고 있어야 합니다.
- BinrayTree라는 클래스를 정의하고 주어진 노드를 기준으로 출력하는 bfs(Node node)와 dfs(Node node) 메소드를 구현하세요.
- DFS는 왼쪽, 루트, 오른쪽 순으로 순회하세요.

### Node Class

```java
public class Node {
    int value;
    Node left;
    Node right;

    Node(int value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    public Node addLeftNode(int value){
        Node node = new Node(value);
        this.left = node;
        return node;
    }

    public Node addRightNode(int value){
        Node node = new Node(value);
        this.right = node;
        return node;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public Node getLeft() {
        return left;
    }

    public void setLeft(Node left) {
        this.left = left;
    }

    public Node getRight() {
        return right;
    }

    public void setRight(Node right) {
        this.right = right;
    }
}
```

### Binary Tree Class

```java
public class BinaryTree {
    public List<Integer> bfsList = new ArrayList<>();
    public List<Integer> dfsList = new ArrayList<>();

    public void bfs(Node node){
        Queue<Node> queue = new LinkedList<>();
        queue.offer(node);
        while(!queue.isEmpty()){
            Node n = queue.poll();
            bfsList.add(n.getValue());
            if(n.getLeft() != null){
                queue.offer(n.getLeft());
            }
            if(n.getRight() != null){
                queue.offer(n.getRight());
            }
        }
    }

    public void dfs(Node node){
        if(node == null) return;
        if(node.getLeft() != null){
            dfs(node.getLeft());
        }
        dfsList.add(node.getValue());
        if(node.getRight() != null){
            dfs(node.getRight());
        }
    }
}
```

좀 더 상세한 코드는 아래에 적어놓았습니다.

- [코드 예제](https://github.com/Azderica/Study-Java-With-WhiteShip/tree/master/src/main/java/week5)

이상입니다.

---

**출처**

- https://blog.naver.com/swoh1227/222174170682
- https://jeeneee.dev/java-live-study/week5-class/
- https://leemoono.tistory.com/17
