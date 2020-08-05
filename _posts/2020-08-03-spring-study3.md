---
layout: post
title: "Springboot 활용하기"
date: 2020-08-03 07:30:00 -0500


---

# Springboot 활용하기

| 스프링 부트 핵심 기능 | 각종 기술 연동 |
|------------------|-------------|
| SpringApplication | 스프링 웹 MVC |
| 외부설정 | 스프링 웹 MVC |
| 프로파일 | 스프링 데이터 |
| 로깅 | 스프링 시큐리티 |
| 테스트 | REST API 클라이언트 |
| Spring-Dev-Tools | 다루지 않은 내용들 |

## SpringApplication

https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-spring-application.html#boot-features-spring-application

Tip) 자동 설정이 되지않을때나 궁금할때는 디버그를 보면 확인할 수 있다.

- 기본 로그 레벨 INFO
  - 뒤에로깅수업때자세히살펴볼예정
- FailureAnalyzer
- 배너
  - banner.txt | gif | jpg | png
  - classpath 또는 spring.banner.location
  - ${spring-boot.version} 등의 변수를 사용할 수 있음.
  - Banner 클래스 구현하고 SpringApplication.setBanner()로 설정 가능.
  ```java
  SpringApplication app = new SpringApplication(SpringinitApplication.class);
  app.setBanner((environment, sourceClass, out) -> {
    out.println("===========");
    out.println("Spring Boot");
    out.println("===========");
  });
  
  ```
  
- 배너끄는방법 
  - SpringApplicationBuilder로 빌더 패턴 사용 가능
  ```java
  new SprintApplicationBuilder()
      .sources(SpringinitApplication.class)
      .run(args);
  
  ```

https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-spring-applicatio n.html#boot-features-application-events-and-listeners

- ApplicationEvent 등록
  - ApplicationContext를 만들기 전에 사용하는 리스너는 @Bean으로 등록할 수 없다.
    - SpringApplication.addListners()
    ```java
    // SampleListner
    public class SampleListner implements ApplicationListener<ApplicationStartedEvent> {

      @Override
        public void onApplicationEvent(ApplicationStartedEvent applicationStartedEvent){
          System.out.println("=======================");
          System.out.println("Application is starting");
          System.out.println("=======================");
      }
    }
    
    // Application
    @SpringBootApplication
    public class Application {

	    public static void main(String[] args){
		    SpringApplication app = new SpringApplication(Application.class);
		    app.addListeners(new SampleListner());
		    app.run(args);
	    }
    }
    ```
    다음과 같이 작성시. Spring 이 빌드될 때 찍히는 거 볼 수 있다.
- WebApplicationType 설정

  WebApplicationType은 Servlet, Reactive, None 등이 있는데 이걸로 돌아간다.
  
  둘 다 없으면 None으로 돌려야하고, 두개다 있으면 Servlet으로 돌아간다. Reactive로 하고 싶으면 따로 작성해야한다.

- 애플리케이션 아규먼트 사용하기
  - ApplicationArguments를 빈으로 등록해 주니까 가져다 쓰면 됨. 
  
  argument에 생성자가 하나면 Bean을 생성할 때 자동으로 해준다.
  
- 애플리케이션 실행한 뒤 뭔가 실행하고 싶을 때
  - ApplicationRunner (추천) 또는 CommandLineRunner
  - 순서 지정 가능 @Order
    
    숫자가 높을수록 우선순위가 높은 것.
  
