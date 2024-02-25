---
title: '[Java] 자바 POJO란'
slug: 00-java-pojo
date: 2021-02-15
published: true
tags: ['Java', 'Pojo', 'Spring']
series: false
cover_image: ./images/JavaLogo.jpg
canonical_url: false
description: '자바 POJO개념에 대해 정리합니다.'
---

# POJO(Plain Object Java Object)

오늘은 자바나 스프링 프레임워크에서 주로 사용하는 POJO에 대한 개념을 정리합니다.

<br/>

## POJO 란?

- POJO란 **Plain Old Java Object**의 약자로서, 오래된 방식의 간단한 자바 오브젝트라는 말로 해석할 수 있습니다. 이를 다른 말로 표현하자면, Java EE 등의 무거운 프레임워크 들을 사용하게 되면서 해당 프레임워크에 종속된 "무거운" 객체를 사용함에 대해 이를 반발해서 사용되게 된 용어입니다.
- 2009년에 마틴 파울러, 레베카 파슨스, 조시 맥켄지에 의해 만들어졌습니다. 아래는 POJO에 대한 기원입니다.

```
"We wondered why people were so against using regular objects in their systems and concluded that it was because simple objects lacked a fancy name. So we gave them one, and it's caught on very nicely."

우리는 왜 사람들이 자기들 시스템에 일반적인 오브젝트를 사용하는 것에 반대하는지 궁금했고, 그 이유는 단순한 오브젝트에 멋진 이름이 없기 때문이라고 결론을 지었습니다. 그래서 우리는 멋진 이름을 지었고, 매우 인기를 얻었습니다.
```

- "POJO"라는 용어는 주요 Java 오브젝트 모델, 컨벤션 또는 **프레임워크를 따르지 않는 Java 오브젝트**를 의미합니다.
- 예를 들자면, 다음과 같습니다. ORM 기술을 적용하기 위해 ORM 프레임 워크인 Hibernate을 사용하기 위해 이를 직접 의존하는 경우 POJO가 아니게됩니다. 이를 사용하기 위해서는 **JPA라는 특정 표준 인터페이스를 통해서 사용해야합니다. (스프링의 PSA로 이야기할 수 있습니다.)**

<br/>

## POJO의 정의

앞서 설명한 POJO를 좀 더 자세하게 설명하면 다음과 같이 설명할 수 있습니다.

이상적인 POJO는 Java 언어 규약에 의해 강제된 것 이외의 제한에 구속되지 않는 Java 오브젝트입니다.

따라서 POJO는 다음과 같은 것을 하면 안됩니다.

- 미리 지정된 클래스를 extends하면 안됩니다.

```java
public class Foo extends javax.servlet.http.HttpServlet { ... }
```

- 미리 정의된 인터페이스를 implement하면 안됩니다.

```java
public class Bar implements javax.ejb.EntityBean { ... }
```

- 미리 정의된 Annotation을 포함하면 안됩니다.

```java
@javax.persistence.Entity public class Baz { ... }
```

그러나 기술적인 어려움과 다른 이유로 인해서 POJO-compliant은 기술된 많은 소프트웨어 제품이나 프레임워크들은 실제로 미리 정의된 Annotation을 제대로 동작하는 기능을 구현하기 위해 필요합니다.

이와 같은 것들의 특징은 Annotation을 추가하기 전에는 POJO이고 Annotation이 제거된다면 POJO 상태로 되돌아간다면, 이를 POJO로 간주할 수 있습니다.

<br/>

## POJO에 대한 다양한 이야기.

### JavaBeans

- JavaBean은 특별한 POJO의 변형으로 이야기 할 수 있습니다. JavaBean은 `Serializable` 인터페이스를 상속받고, 인수가 없는 생성자를 가지며 `getter/setter` 메소드를 사용하여서 속성에 액세스할 수 있습니다. 이러한 규칙을 통해서 JavaBeans에 대해 간단한 참조를 사용할 수 있습니다.
- 이러한 방법을 통해서 프레임워크에서는 Bean의 정확한 유형을 알 필요없이 사용할 수 있습니다. 다만 JavaBeans가 완전히 구현되는 경우에는 `Serializable`를 구현해야기 때문에 POJO 모델을 약간 깨트릴 수도 있습니다. 하지만 이는 큰 부담이 되지는 않습니다.

POJO를 구현한 코드는 다음과 같습니다.

```java
public class MyBean {

    private String someProperty;

    public String getSomeProperty() {
         return someProperty;
    }

    public void setSomeProperty(String someProperty) {
        this.someProperty = someProperty;
    }
}
```

### EJB(Enterprise JavaBeans)

기업의 IT 시스템의 요구사항이 늘어나고 기초적인 JDK로는 한계가 있어서 EJB 기술이 등장하였습니다. EJB의 경우에 아래의 문제를을 해결하기 위해 등장했습니다.

- 기업의 업무 복잡도가 증가함에 따라 비지니스 로직이 복잡해졌습니다.
- 사용자의 처리의 요구를 빠르고 안정이고 확장 가능한 형태로 유지하기 위해 필요한 로우레벨의 기술적인 처리요구가 필요합니다. (트랜잭션 처리, 상태 관리, 멀티스레딩, 리소스 풀링, 보안 등)

다만 **EJB의 경우에는 현실적이지 않고 과도한 엔지니어링으로 실패**했습니다. EJB는 필요한 것이 많고, 복잡하며 컨테이너 밖에서는 정상적으로 동작하지 않았습니다.

특히, **EJB 스펙을 따르는 비지니스 오브젝트들은 객체지향적인 특징과 장점을 포기해야합니다.** EJB는 상속과 다형성 등을 사용할 수 없고, 간단한 기능 하나를 위해서 많은 인터페이스와 EJB 의존적인 상속을 해야했습니다.

EJB는 **형편없는 생산성과 느린 성능, 불필요한 기술적인 복잡도, 과도한 스펙 등의 문제**로 인해 POJO 방식으로 돌아가게 됩니다.

<br/>

## POJO 프레임워크

- POJO를 사용하는 장점과 EJB의 문제를 해결하고, 엔터프라이즈 서비스와 기술을 사용할 수 있게 하는 프레임워크입니다. 많은 POJO 프레임워크가 있지만 그중에 손에 꼽히는 것은 Hibernate와 Spring입니다.
- Hibernate는 Persistence 기술과 오브젝트-관계형 DB 매핑을 순수한 POJO를 이용해서 사용할 수 있게 만드는 POJO 기반의 **퍼스스턴스 프레임워크(Persistence Framework)** 입니다.
- 스프링은 앤터프라이즈 서비스들을 POJO 기반으로 만든 비지니스 오브젝트로 사용할 수 있게 합니다.
- 대표적인 기술로 선언적인 트랜잭션과 보안이 있습니다. 또한 오브젝트 컨테이너를 제공해서 인스턴스들의 라이프사이클을 관리하고, OOP를 더 OOP답게 쓸수 있게 해주는 AOP 기술을 적용하여 POJO 개발을 더 쉽게 만들어줍니다.

> Persistence Framework

- 데이터의 저장, 조회, 변경, 삭제를 다루는 클래스 및 설정 파일들의 집합
- 퍼시스턴스 프레임워크를 사용하면 JDBC 프로그래밍의 복잡함이나 번거로움 없이 간단한 작업만으로 데이터베이스와 연동되는 시스템을 빠르게 개발할 수 있으며 안정적인 구동도 보장합니다.

<br/>

## POJO를 지향해야하는 이유

POJO 프로그래밍의 목적은 **자바의 객체지향적인 특징을 살려 비지니스 로직에 충실한 개발이 가능하도록 하는 것입니다.**

또한 복잡한 요구조건을 가진 엔터프라이즈 개발의 필요조건을 충족시킬 수 있도록 POJO 기반의 프레임워크를 적절히 이용하는 것이 요구됩니다.

단순히 POJO 프레임워크를 사용하는 것이 아니라 그에 대한 여러 기준을 준수해야합니다.

- 객체지향적인 설계원칙에 충실하도록 개발
  - POJO의 자바 오브젝트는 객체지향언어로서 자바 오브젝트의 특징을 가져야합니다.
  - 반복적인 템플릿 구조와 테스트하기 힘든 구조, 확장이나 재활용이 어려움이 있으면 안됩니다.
- 테스트 코드를 잘 작성했는지
  - **수정-빌드-배포-테스트**의 사이클을 유지하는 것은 EJB와 같은 문제를 가지고 있습니다.
  - 잘 만들어진 POJO는 자동화된 테스트 코드 작성이 편리합니다,
  - 반복적으로 테스트를 실행할 수 있으므로 코드 검증과 품질 향상에 유리합니다.

### Rich Domain Model

- POJO의 자바 오브젝트가 가진 기본적인 특징은 하나의 오브젝트 안에 상태(State)와 행위(Behavior)을 모두 가지고 있습니다. 즉, **인스턴스 변수**와 **로직을 가진 메소드**가 있습니다.
- 객체지향 원리에 충실하게 도메인 모델을 만드는 것을 풍성한 도메인 모델(Rich Domain Model)이라고 이야기합니다.

### 올바른 POJO 프로그래밍

앞서 이야기했듯이 POJO를 잘 사용하면 최소한의 코드와 좋은 코드를 만들 수 있습니다. 특히 가장 중요한 내용은 반드시 **자동화된 테스트 코드를 개발하는 것입니다. 이를 통해 만들어진 테스트 코드는 지속적인 변화에 유현하게 대응할 수 있습니다.**

---

**출처**

- https://en.wikipedia.org/wiki/Plain_old_Java_object
- https://en.wikipedia.org/wiki/Jakarta_Enterprise_Beans
- http://bywoong.com/post/832
- https://ko.wikipedia.org/wiki/%ED%8D%BC%EC%8B%9C%EC%8A%A4%ED%84%B4%EC%8A%A4_%ED%94%84%EB%A0%88%EC%9E%84%EC%9B%8C%ED%81%AC
- https://velog.io/@dion/what-is-POJO
- https://siyoon210.tistory.com/120
- https://happyer16.tistory.com/entry/POJOplain-old-java-object%EB%9E%80
- https://jobc.tistory.com/121
