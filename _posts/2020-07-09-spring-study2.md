---
layout: post
title: "Springboot 이해하기"
date: 2020-07-07 07:30:00 -0500


---

# Springboot 이해하기

## 의존성 관리 이해

https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-dependency -management

의존성으로 다 정의가 되어있어서 적게 신경을 써도 된다는 것은 큰 장점이다.

parent를 바꿔서 dependency를 줄 수 있다.
parent를 못바꾸는 상항이면 dependencyManagement에 dependency를 주는 방법이 있다. 단점은 여기는 다른 것이 많다. 이런경우는 plugin을 사용할 수 없다.

그래서 일반적으로는 **parent를 설정**하여 **dependency를 주는 것이 중요**하다. 

의존성 관리 기능을 최대한 사용하쟈



## 의존성 관리 응용

- 버전관리해주는의존성추가 (자동으로 버전 관리)

- 버전 관리 안해주는 의존성 추가 (추가적으로 버전을 체크해줘야 함)

- 기존 의존성 버전 변경하기

  ```xml
  <properties>
      <spring.version>5.0.6.RELEASE</spring.version>
  </properties>
  ```

- https://mvnrepository.com/

버전을 관리해주는 version이 있으면 자동으로 spring boot 가 처리를 해주지만, 
version이 없으면 따로 버전을 관리해줘야한다.(다른 버전으로 처리가 안되는 경우가 발생할 수 있음. )



## 자동 설정 이해

- @EnableAutoConfiguration (@SpringBootApplication 안에 숨어 있음) 
- 빈은사실두단계로나눠서읽힘
  - 1단계: @ComponentScan
  - 2단계: @EnableAutoConfiguration 
- @ComponentScan
  - @Component
  - @Configuration @Repository @Service @Controller @RestController
- @EnableAutoConfiguration
  - spring.factories
    - org.springframework.boot.autoconfigure.EnableAutoConfigu ration
  - @Configuration
  - @ConditionalOnXxxYyyZzz



```java
@SpringBootApplication
public class Application {

    public static void main(String[] args){
        SpringApplication.run(Application.class, args);
    }
}
```

대부분 이 방법으로 진행하는 것이 좋다.

```java
@SpringBootConfiguration
@ComponentScan
// @EnableAutoConfiguration
public class Application {

    public static void main(String[] args){
        SpringApplication application = new SpringApplication(Application.class);
        application.setWebApplicationType(WebApplicationType.NONE);
        application.run(args);

        // SpringApplication.run(Application.class, args);
    }
}
```

이렇게 돌릴 수도 있다. 그러나 Web 처리는 못한다.



**@ComponentScan**

자기 밑에 있는 모든 Component를 찾아서 Bin으로 등록시켜버린다. (자기 자신 포함, 다른 패키지는 안됨)



**@EnableAutoConfiguration**

: Maven: org.springframework.boot:spring-boot-autoconfiguration:2.3.1.REALSE\spring-boot-autoconfigure-2.3.1.RELEASE.jar\META-INF\spring.factories

자기 밑에 있는 모든 메타파일을 찾아준다. 위의 링크에서 EnableAutoConfiguration이 있는데 아래에 있는 모든 링크를 다 추가해준다.



**Configuration** 이란? Bean을 등록하는 java 설정파일



Maven: org.springframework.boot:spring-boot-autoconfiguration:2.3.1.REALSE\spring-boot-autoconfigure-2.3.1.RELEASE.jar\org.springframework.boot.autoconfigure\web\servlet\WebMvcAutoConfiguration

에 들어가보면 Bean이 있을 때와 없을때를 구분해준다.



autoConfiguartion 하나로. 수많은 bean이 생성이 되고 적용이 된다.

