---
title: '[Spring] 자주 사용하는 Lombok 어노테이션'
slug: 00-spring-lombok
date: 2021-07-18
published: true
tags: ['Spring', 'SpringBoot', 'Lombok', 'Backend']
series: true
cover_image: ./images/SpringLogo.png
canonical_url: false
description: '자주 사용하는 Lombok 어노테이션에 대해 정리합니다.'
---

# 자주 사용하는 Lombok 어노테이션

자주 사용하는 Lombok 어노테이션에 대해 정리합니다.

## 접근자/설정자 자동 생성

- `@Getter`
- `@Setter`

다음과 같이 코드를 예시로 들 수 있습니다.

```java
@Getter @Setter
public Class Item {
  private Integer itemId;
  private String itemName;
}
```

`@Getter`과 `@Setter` 모두 클래스나 메서드에서 사용할 수 있으며, 이를 통해서 여러 경우에 사용할 수 있습니다.

```java
private Item item = new Item();

// set
item.setItemId(1);
item.setItemName("Item");

// get
System.out.println(item.getItemId());   // output : 1
System.out.println(item.getItemName()); // output : Item
```

다음과 같이 사용할 수 있습니다.

<br/>

## 생성자 자동 생성

Lombok 어노테이션을 통해서 생성자를 자동으로 생성할 수 있습니다.

- `@NoArgsConstructor` : 파라미터가 없는 기본 생성자
- `@AllArgsConstructor` : 모든 필드 값을 파라미터로 받는 생성자
- `@RequiredArgsConstructor` : `final`, `@NonNull`인 필드 값만 파라미터로 받는 생성자

다음과 같이 사용합니다.

```java
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class Member {
  @NonNull
  private Integer id;
  @NonNull
  private String name;
  private String email;
}
```

이를 여러 생성자로 생성할 수 있습니다.

```java
// NoArgsConstructor
Member member1 = new Member();

// AllArgsConstructor
Member member2 = new Member(1, "A");

// RequiredArgsConstructor
Member member3 = new Member(2, "B", "B@naver.com");
```

<br/>

## ToString 어노테이션

- `@ToString`

`@ToString` 어노테이션 클래스에 붙여주면 자동으로 생성해줍니다. 이와 추가적으로 `exclude` 속성을 사용하면, 특정 필드를 `toString()`에서 결과를 제거할 수 있습니다.

이를 다음과 같이 생성할 수 있습니다.

```java
@AllArgsConstructor
@ToString(exclude = "id")
public class Member {
  private Integer id;
  private String name;
  private String email;
}
```

```java
Member member = new Member(1, "test", "test@naver.com");
System.out.println(member);
// Output : Member(name=test, email=test@naver.com)
```

다만, 멤버 변수 중 객체 타입이 존재하고 순환 참조가 있다면 무한 루프가 발생합니다. 이 경우에도 꼭 `exclude`를 사용하는 것이 중요합니다.

<br/>

## EqualsAndHashCode 어노테이션

자바 빈을 만들때 사용하는 `equals`와 `hashCode` 메서드를 자주 오버라이딩하는데, `@EqualsAndHashCode` 어노테이션을 사용하면 자동으로 이 메서드를 생성할 수 있습니다.

```java
public class User {
  private Integer Id;
}

@EqualsAndHashCode(callSuper = true)
public class Member extends User{
  private String name;
  private String email;
}
```

`callSuper` 속성을 통해서 `equals`와 `hashCode` 메소드 자동 생성 시 부모 클래스의 필드까지 감안할 수도 있습니다.

```java
Member member1 = new Member();
member1.setId(1);
member1.setName("A");
member1.setEmail("A@naver.com");

Member member2 = new Member();
member2.setId(2);
member2.setName("A");
member2.setEmail("A@naver.com");

member1.equals(member2);
// callSuper = true, false
// callSuper = false, true
```

<br/>

## Data

`@ToString`, `@EqualsAndHashCode`, `@Getter`, `@Setter`, `@RequiredArgsConstructor` 를 합친 어노테이션입니다.

다만 `JPA`와 같은 `ORM`을 사용한다면 조심하게 사용해야합니다. 위에서 `@ToString`과 마찬가지로 순환참조가 발생하는 경우, 문제가 발생합니다. 이 경우에는 `exclude`를 사용할 수 없기 때문에 코드가 길어져도 `@Data` 어노테이션을 피하는 것이 좋습니다.

<br>

## 그 외에도.

- `@Value` : 불변 클래스를 생성할 때 사용합니다.
- `@Builder` : 빌더 패턴을 사용할 수 있도록 코드를 생성합니다.

---

**출처**

- [Lombok Document](https://projectlombok.org/features/all)
- [자주 사용되는 Lombok 어노테이션](https://www.daleseo.com/lombok-popular-annotations/)
- [Lombok 자주 쓰는 어노테이션 정리](https://gardeny.tistory.com/4)
- [자주 사용하는 Lombok 어노테이션](https://velog.io/@jayjay28/%EC%9E%90%EC%A3%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-Lombok-%EC%96%B4%EB%85%B8%ED%85%8C%EC%9D%B4%EC%85%98)
