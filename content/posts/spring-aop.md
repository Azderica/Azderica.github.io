---
title: '[Spring] 스프링 AOP 개념 이해햐기'
slug: 00-spring-api
date: 2021-02-13
published: true
tags: ['Spring', 'Aop', 'Module', 'Backend']
series: false,
cover_image: ./images/SpringLogo.png
canonical_url: false
description: ' Spring AOP에 대한 정리입니다.'
---

# AOP

스프링에 대해서 공부를 하면, 꼭 알게되는 프로그래밍 기법으로 AOP 개념이
있습니다. 오늘은 이 AOP에 대해 정리합니다.

AOP는 Spring의 핵심 개념 중 하나로서, DI가 애플리케이션 모듈간의 결합도를 낮춰준다면, AOP는 애플리케이션 전체에 걸쳐 사용되는 기능을 재사용하도록 지원합니다.

<br/>

## AOP란.

AOP는 Aspect-Oriented Programming의 약자로서, 번역하면 **관점 지향 프로그래밍**입니다.

관점 지향은 **어떤 로직을 기준으로 핵심적인 관점, 부가적인 관점으로 나누어서 보고 그 관점을 기준으로 각각 모듈화하는 것**입니다. 모듈화란 어떤 공통된 로직이나 기능을 하나의 단위로 묶는 것을 설명합니다.

이를 좀 더 정리하자면 다음과 같이 표현할 수 있습니다. **핵심적인 관점은 적용하려고 하는 핵심 비지니스 로직**이 되며 부가적인 관점은 핵심 로직을 실행하기 위해 행해지는 데이터베이스 연결, 로깅, 파일 입출력 등이 있습니다.

AOP에서는 **각 관점을 기준으로 로직을 모듈화**합니다. 이는 코드를 부분적으로 나누어서 모듈화하겠다는 의미를 가집니다. 이때 소스 코드에서 다른 부분에 계속 반복되는 코드를 발견할 수 있는데 이를 Crosscutting Concerns(흩어진 관심사)라고 합니다.

![what-is-aop](https://user-images.githubusercontent.com/42582516/107846114-999ccc00-6e24-11eb-8ed9-f0690267b6a9.png)

다음 그림처럼 **흩어진 관심사를 Aspect로 모듈화하고 핵심적인 비지니스 로직에서 분리해서 재사용 하는 것이 AOP의 목적**입니다.

<br/>

## AOP의 주요 개념

![aop-component](https://user-images.githubusercontent.com/42582516/107846262-a1a93b80-6e25-11eb-824a-b91953e9ffda.png)

- **Aspect**
  - 흩어진 관심사(Crosscutting Concerns)를 모듈화 한 것
  - 주로 부가기능을 모듈화합니다.
- **Target**
  - Aspect를 적용하는 곳
  - Ex) 클래스, 메소드 등
- **Advice**
  - 실질적으로 어떤 일을 해야할지에 대한 것
  - 실질적인 부가기능을 담은 구현체입니다.
- **JointPoint**
  - Advice가 적용될 위치나 끼어들 수 있는 지점입니다.
  - 메서드 진입 시점이나, 생성사 호출 시점, 필드에서 값을 꺼내올 때 등의 다양한 시점에서 적용가능합니다.
- **PointCut**
  - JointPoint의 상세한 스펙을 정의했습니다.
  - 구체적으로 Advice가 실행될 지점을 정할 수 있습니다.
- **Proxy**
  - 타켓을 감싸서 타켓의 요청을 대신 받아주는 랩핑(Wrapping) 오프젝트입니다.
  - 호출자에서 타켓 호출시 타켓이 아닌 타켓을 감싸는 프록시가 호출되며 타켓 메소드 실행전에 선처리, 실행후, 후처리를 실행시키도록 구성되어 있습니다.
  - ![proxy](https://user-images.githubusercontent.com/42582516/107846340-5c393e00-6e26-11eb-8778-9ca7eeae3abc.png)
- **Introduction**
  - 타켓 클래스에 코드 변경없이 신규 메소드나 멤버 변수를 추가하는 기능입니다.
- **Weaving**
  - 지정된 객체에 애스팩트를 적용해서 새로운 프록시 객체를 생성하는 과정을 의미합니다.

<br/>

## AOP의 특징

- 접근 제어 및 부가기능을 추가하기 위해서 프록시 패턴 기반의 AOP 구현체, 프록시 객체를 사용합니다.
- 스프링 빈에만 AOP를 적용 가능합니다.
- 모든 AOP 기능을 제공하는 것이 아닌 스프링 IoC와 연동하여 엔터프라이즈 애플리케이션에서 가장 흔한 문제에 대한 해결책을 지원하는 것이 목적입니다.
  - Ex) 중복코드, 프록시 클래스 작성의 번거로움, 객체들 간 관계 복잡도의 증가 등의 문제.

## 코드에서 AOP 적용

코드에서 `@AOP`를 사용하기 위해서는 다음과 같은 의존성을 추가해야합니다.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

해당 의존성을 추가하고 코드에 다음과 같이 사용할 수 있습니다.

### 경로 사용

다음과 같이 `@Aspect` 어노테이션을 붙여 클래스가 Aspect를 나타내는 클래스임을 명시하고 `@Component`를 붙여 스프링의 빈으로 등록합니다.

```java
@Component
@Aspect
public class PerfAspect {

  @Around("execution(* com.myepark..*.EventService.*(..))")
  public Object logPerf(ProceedingJoinPoint pjp) throws Throwable{
    long begin = System.currentTimeMillis();
    Object retVal = pjp.proceed(); // 메서드 호출 자체를 감쌈
    System.out.println(System.currentTimeMillis() - begin);
    return retVal;
  }
}
```

`@Around` 어노테이션은 타멧 메서드를 감싸서 특정 Advice를 실행한다는 의미를 가집니다. `execution(* com.myepark..*.EventService.*(..))`는 아래의 패키지 경로의 `EventService` 객체의 모든 메서드에 Aspect를 적용한다는 의미를 가집니다.

```java
public interface EventService {
  void createEvent();
  void publishEvent();
  void deleteEvent();
}
```

해당 인터페이스를 구현한 코드입니다.

```java
@Component
public class SimpleEventService implements EventService {

    @Override
    public void createEvent() {
        try {
            Thread.sleep(1000);
        } catch(InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Created an event");
    }

    @Override
    public void publishEvent() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e){
            e.printStackTrace();;
        }
        System.out.println("Published an event");
    }

    @Override
    public void deleteEvent() {
        System.out.println("Delete an event");
    }
}
```

```java
@Service
public class AppRunner implements ApplicationRunner {

    @Autowired
    EventService eventService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        eventService.createEvent();
        eventService.publishEvent();
        eventService.deleteEvent();
    }
}
```

출력 결과는 다음과 같습니다.

```java
Created an event
1003
Published an event
1000
Delete an event
0
```

### 특정 어노테이션 사용

특정 어노테이션을 통해서 다음과 같이 표현할 수 있습니다.

```java
@Component
@Aspect
public class PerfAspect {

  @Around("@annotation(PerLogging)")
  public Object logPerf(ProceedingJoinPoint pjp) throws Throwable{
    long begin = System.currentTimeMillis();
    Object retVal = pjp.proceed(); // 메서드 호출 자체를 감쌈
    System.out.println(System.currentTimeMillis() - begin);
    return retVal;
  }
}
```

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.CLASS)
public @interface PerLogging {
}
```

이를 사용해서 앞의 서비스를 구현한다면.

```java
@Component
public class SimpleEventService implements EventService {

    @PerLogging
    @Override
    public void createEvent() {
        try {
            Thread.sleep(1000);
        } catch(InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Created an event");
    }

    @PerLogging
    @Override
    public void publishEvent() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e){
            e.printStackTrace();;
        }
        System.out.println("Published an event");
    }

    @PerLogging
    @Override
    public void deleteEvent() {
        System.out.println("Delete an event");
    }
}
```

`@PerLogging` 어노테이션이 붙은 메서드가 똑같이 Aspect가 적용된 것을 확인할 수 있습니다.

```java
Created an event
1003
Published an event
1000
Delete an event
0
```

### 스프링 빈의 모든 메소드에 적용

```java
@Component
@Aspect
public class PerfAspect {

  @Around("bean(simpleEventService)")
  public Object logPerf(ProceedingJoinPoint pjp) throws Throwable{
    long begin = System.currentTimeMillis();
    Object retVal = pjp.proceed(); // 메서드 호출 자체를 감쌈
    System.out.println(System.currentTimeMillis() - begin);
    return retVal;
  }
}
```

다음과 같이 선언하면 SimpleEventService의 모든 메소드에 적용이 가능합니다.

### `@Around` 이외의 Aspect 실행 시점

- `@Before` : 이전
  - Advice 타켓 메소드가 호출되기 전에 어드바이스 기능을 수행합니다.
- `@After` : 이후
  - 타켓 메스드의 결과에 관계없이 타켓 메소드가 완료되면 Advice 기능을 수행합니다.
  - 성공이나 예외 등 관계없이 동작합니다.
- `@AfterReturning` : 정상적인 반환 이후
  - 타켓 메소드가 성공적으로 결과값을 반환 후에 Advice 기능을 수행합니다.
- `@AfterThrowing` : 예외 발생 이후
  - 타켓 메소드가 수행 중 예외를 던지게 되면 Advice 기능을 수행합니다.
- `@Around` : 메소드 실행 전후
  - Advice가 타켓 메소드를 감싸서 타켓 메소드 호출전과 후에 어드바이스 기능을 수행합니다.

<br/>

## 마무리.

AOP에 대한 정리입니다. 감사합니다.

---

**출처**

- **https://engkimbs.tistory.com/746**
- https://velog.io/@max9106/Spring-AOP%EB%9E%80-93k5zjsm95
- https://hongku.tistory.com/114
- https://jojoldu.tistory.com/71
