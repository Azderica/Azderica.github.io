---
title: '[Spring] Autowired 와 private final의 차이'
slug: 00-spring-autowired
date: 2021-07-17
published: true
tags: ['Spring', 'SpringBoot', 'DI', 'Backend']
series: false
cover_image: ./images/SpringLogo.png
canonical_url: false
description: '의존성 주입을 사용하기 위해 Autowired 어노테이션과, private final 사용의 차이점에 대해 정리합니다.'
---

# Autowired 와 private final의 차이

스프링을 개발하다보면, Autowired와 private final을 사용해서 의존성을 주입합니다. 다만, 이에 대한 차이점에 대해 의문이 존재했습니다.

## 필드 주입과 생성자 주입

### Field Injection (필드 주입)

필드에 `@Autowired` 어노테이션을 붙여주면 자동으로 의존성이 주입됩니다.

```java
@Service
public class TestService {
  @Autowired
  private TestRepository testRepository;
}
```

### Constructor Based DI (생성자 기반 DI)

```java
@Service
public class TestService {
  private final TestRepository testRepository;

  // 생략하고 @AllArgsConstructor 어노테이션 사용해도 됩니다.
  public TestService(TestRepository testRepository) {
    this.testRepository = testRepository;
  }
}
```

<br/>

## 생성자 주입 방법이 더 좋은 이유

- 순환 참조를 방지할 수 있습니다.
  - 순환 참조 발생 시, 애플리케이션이 구동되지 않습니다.
- 테스트에 용이합니다.
  - 단순 POJO를 이용한 테스트 코드를 만들 수 있습니다.
- 코드의 품질을 높일 수 있습니다.
- 불변성을 얻을 수 있습니다.
  - `final`을 사용할 수 있습니다.
  - 실행 중에 객체가 변하는 것을 막을 수 있습니다.
- 오류를 방지할 수 있습니다.

---

**출처**

- [Autowired VS private final](https://stackoverflow.com/questions/63259116/what-is-the-difference-between-using-autowired-annotation-and-private-final)
- [Dependency Injection in Java](https://deinum.biz/2020-07-28-Dependency-Injection/)
- [Autowired 와 DI](https://life-with-coding.tistory.com/433)
- [생성자 주입이 Autowired 보다 권장하는 이유](https://madplay.github.io/post/why-constructor-injection-is-better-than-field-injection)
