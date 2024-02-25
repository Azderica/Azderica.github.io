---
title: '[Java] 자바 직렬화'
slug: java-serialize
date: 2021-05-12
published: true
tags: ['Java', 'Object', 'Serialize', 'Serialization', 'Deserialization']
series: false
cover_image: ./images/JavaSerialize.png
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

```
rO0ABXNyAAxzdHVkeS5QZXJzb25ntzRTK7/dGgIAA0kAA2FnZUwAAmlkdAASTGphdmEvbGFuZy9TdHJpbmc7TAAEbmFtZXEAfgABeHAAAAAadAAHWFhYLVhYWHQACeuwleuqqOyUqA==
```

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

## 직렬화 사용시 주의할 부분.

- 자바 직렬화 사용할 때는 최대하게 신중하게 사용합니다.
- `Serializable`을 구현할때는 신중히 결정합니다,
- 커스텀 직렬화 형태를 고려해서 개발합니다.
- `readObject` 메서드는 방어적으로 작성합니다.
- 인스턴스 수를 통제해야한다면 `readObject` 보다는 `Enum` 타입을 사용합니다.
- 직렬화된 인스턴스보다는 `직렬화 프록시 사용`을 검토합니다.

[좀 더 자세하게](https://github.com/Azderica/Book-Record/tree/master/Effective%20Java/ch12)

<br/>

## 직렬화의 사용 이유.

자바 직렬화 외에 다른 데이터 직렬화 종류는 아래와 같습니다.

### 문자열 형태의 직렬화 방법

일반적으로 직접 데이터를 문자열 형태로 확인 가능한 직렬화 방법입니다. 범용적인 API나 데이터를 변환하여 추출할 때 많이 사용합니다.

- CSV
- XML
- JSON

### 이진 직렬화 방법

데이터 변환 및 전송 속도에 최적화하여 별도의 직렬화 방법을 제시하는 구조입니다.

- Protocol Buffer
- Apache Avro

### 자바 직렬화의 필요성

앞서 여러 직렬화 방법이 있지만 자바의 직렬화를 쓰는 이유는 자바 직렬화가 가지는 장점이 있기 때문입니다.

- 자바 시스템에서 개발에 최적화가 되어 있습니다.
- 복잡한 데이터 구조의 클래스의 객체라도 직렬화의 기본 조건만 지키게 되면, 큰 작업없이 바로 직렬화나 역직렬화가 됩니다.
- 역직렬화하면 기존 객체처럼 바로 사용할 수 있습니다.

다만 직렬화가 가지는 단점 또한 있습니다.

- 보안에 신경을 써야합니다. (직렬화 공격)
- 예외 처리에 신경을 써야합니다.
- 용량이 큽니다.
- 역직렬화 또한 일종의 생성자이기 때문에, 신경을 써야하는 부분이 많습니다.

<br/>

## 직렬화를 사용하는 경우

JVM의 메모리에서만 상주되어있는 객체 데이터를 그대로 영석화(Persistence)가 필요할 때 사용됩니다. 또한 시스템이 종료되더라도 없어지지 않는 장점을 가지며 영속화된 데이터이기 때문에 네트워크 전송도 가능합니다. 그리고 필요할 때 직렬화된 객체 데이터를 가져와서 역직렬화 해서 객체를 바로 사용할 수 있게됩니다.

주로 아래의 경우에서 쉽게 사용됩니다.

- 서블릿 세션(Servlet Session)
  - 서블릿 기반의 WAS(톰캣, 웹로직 등)는 대부분 세션의 자바 직렬화를 지원합니다.
  - 파일로 저장, 세션 클러스터링, DB 저장 등을 할 때 직렬화되어서 저장됩니다.
- 캐시(Cache)
  - 시스템에서는 퍼포먼스를 위해서 캐시를 사용하는데, 이때 자바 직렬화된 데이터를 저장해서 사용합니다.
- 자바 RMI(Remote Method Invocation)
  - 원격 시스템 간의 메시지 교환을 위해 사용하는 자바에서 지원하는 기술입니다.
  - RMI는 시스템과의 통신에서 필요한 IP, 포트를 통해서 소켓통신을 하는데 이를 추상화하여 로컬 시스템 메서드인 것처럼 호출할 수 있습니다.

---

**출처**

- https://docs.oracle.com/javase/8/docs/platform/serialization/spec/serial-arch.html
- https://woowabros.github.io/experience/2017/10/17/java-serialize.html
- https://ryan-han.com/post/java/serialization/
- https://ryan-han.com/post/java/java-serialization/
