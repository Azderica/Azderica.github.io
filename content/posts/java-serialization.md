---
title: '[Java] Java Serialization'
slug: java-serialize
date: 2021-05-12
published: true
tags: ['Java', 'Object', 'Serialize', 'Serialization', 'Deserialization']
series: false
cover_image: ./images/JavaLogo.jpg
canonical_url: false
description: 'Java 직렬화와 역직렬화에 대해 정리합니다.'
---

# Java Serialize

이펙티브 자바를 공부하던 중, 마지막 단원을 공부하다보면 자바 직렬화(Serialize)에 대한 개념이 나옵니다. 다만, 이 부분에 대해 지식이 너무 부족해 이를 따로 정리합니다.

## 자바 직렬화란

일반적으로 자바의 직렬화와, 역직렬화를 아울러서 직렬화라고 합니다.

### 직렬화(Serialize)

- 자바 시스템 내부에서 사용되는 객체 또는 데이터를 외부의 자바 시스템에서도 사용할 수 있도록 바이트 형태로 데이터를 변환하는 기술입니다.
- JVM의 메모리에서 상주되어 있는 객체 데이터를 바이트 형태로 변환하는 기술입니다.
- 일반적으로 객체들을 통째로 저장하거나 전송하고 싶을 때 주로 사용합니다.

### 역직렬화(Deserialize)

- 바이트로 변환된 데이터를 원래대로 객체나 데이터로 변환하는 기술을 역직렬화라고 합니다.
- 직렬화된 바이트 형태의 데이터를 개체로 변환해서 JVM으로 상주시키는 형태입니다.
- 저장된 파일을 읽거나 전송된 스트림 데이터를 읽어서 원래 객체의 형태로 복원합니다.

<br/>

## 자바 직렬화를 사용하기

### 자바 직렬화 방법

자바의 기본(primitive) 타입과 `java.io.Serializable` 인터페이스를 상송받은 객체는 직렬화 할 수 있는 **기본 조건**을 가집니다.

```java
package myepark.study;

public class Person implements Serializable {
  private String id;
  private String name;
  private int age;

  public Person(String id, String name, int age) {
    this.id = id;
    this.name = name;
    this.age = age;
  }

  @Override
  public String toString() {
    return String.format("Person{id='%s', email='%s', age='%s'}", id, name, age);
  }
}
```

다음처럼, 코드 작성시 직렬화 조건을 만족한 상태입니다.

이를 직렬화하는 방법은 `java.io.ObjectOutputStream` 객체를 이용하는 것입니다.

```java
public class SerializableTest {

  public static void main(String[] args) {
    Person person = new Person("박모씨", "XXX-XXX", 26);
    byte[] serializedPerson = null;
    try(ByteArrayOutputStream baos = new ByteArrayOutputStream()){
      try(ObjectOutputStream oos = new ObjectOutputStream(baos)) {
        oos.writeObject(person);

        // 직렬화된 Person 객체
        serializedPerson = baos.toByteArray();
      }
    } catch (IOException e) {
      e.printStackTrace();
    }

    System.out.println(Base64.getEncoder().encodeToString(serializedPerson));
  }
}
```

해당 코드를 실행시키면, 이에 대한 결과를 확인할 수 있습니다.

`rO0ABXNyAAxzdHVkeS5QZXJzb25ntzRTK7/dGgIAA0kAA2FnZUwAAmlkdAASTGphdmEvbGFuZy9TdHJpbmc7TAAEbmFtZXEAfgABeHAAAAAadAAHWFhYLVhYWHQACeuwleuqqOyUqA==`

이는 바이트 배열 형태이기 때문에 사용자가 봤을때는 확인할 수 없습니다.

### 자바 역직렬화 방법

자바 역직렬화를 사용하기 위해서는 아래의 조건을 만족해야합니다.

- 직렬화 대상이 된 객체의 클래스가 클래스 패스에 존재해야하며 `import` 되어야 합니다.
  - 중요한 점 중 하나는 직력화와 역직렬화를 진행하는 시스템이 서로 다를 수 있기 때문에 이를 **반드시 고려**해야합니다.
- 자바 직렬화 대상 객체는 동일한 `serialVersionUID` 를 가지고 있어야합니다.

```java
private static final long serialVersionUID = 1L;
```

이를 통해서 위의 바이트 코드를 다음과 같이 수정할 수 있습니다.

```java
public class DeserializableTest {

  public static void main(String[] args) {
    String base64Memeber = "rO0ABXNyAAxzdHVkeS5QZXJzb25ntzRTK7/dGgIAA0kAA2FnZUwAAmlkdAASTGphdmEvbGFuZy9TdHJpbmc7TAAEbmFtZXEAfgABeHAAAAAadAAHWFhYLVhYWHQACeuwleuqqOyUqA==";

    byte[] serializedPerson = Base64.getDecoder().decode(base64Memeber);
    try (ByteArrayInputStream bais = new ByteArrayInputStream(serializedPerson)) {
      try (ObjectInputStream ois = new ObjectInputStream(bais)) {
        // 역직렬화된 Person 객체를 읽어옵니다.
        Object objectPerson = ois.readObject();
        Person person = (Person) objectPerson;
        System.out.println(person);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```

위 코드를 실행하면 아래처럼 결과가 나옵니다.

`Person{name='박모씨', id='XXX-XXX', age='26'}`

이처럼 직렬화와 역직렬화를 사용할 수 있습니다.

<br/>

## 왜 직렬화를 사용하나요?

(작성 예정.)

<br/>

## 언제, 어디서 직렬화를 사용해야하나요?

(작성 예정.)

---

**출처**

- https://woowabros.github.io/experience/2017/10/17/java-serialize.html
- https://ryan-han.com/post/java/serialization/
- https://ryan-han.com/post/java/java-serialization/
