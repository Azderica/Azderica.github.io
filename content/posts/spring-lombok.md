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

## ToString 메서드

<br/>

## equals, hashCode 자동 생성

<br/>

## Data

---

**출처**
