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
  
## 외부 설정

https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-external-config

### 사용할 수 있는 외부 설정

- properties
- YAML
- 환경변수
- 커맨드 라인 아규먼트

### 프로퍼티 우선 순위

위에 있을수록 높음.

1. 유저 홈 디렉토리에 있는 spring-boot-dev-tools.properties
2. 테스트에 있는 @TestPropertySource
3. @SpringBootTest 애노테이션의 properties 애트리뷰트
4. 커맨드 라인 아규먼트
5. SPRING_APPLICATION_JSON (환경 변수 또는 시스템 프로티) 에 들어있는 프로퍼티
6. ServletConfig 파라미터
7. ServletContext 파라미터
8. java:comp/env JNDI 애트리뷰트
9. System.getProperties() 자바 시스템 프로퍼티
10. OS 환경 변수
11. RandomValuePropertySource
12. JAR 밖에 있는 특정 프로파일용 application properties
13. JAR 안에 있는 특정 프로파일용 application properties
14. JAR 밖에 있는 application properties
15. JAR 안에 있는 application properties
16. @PropertySource
17. 기본 프로퍼티 (SpringApplication.setDefaultProperties)

application.properties 우선 순위 (높은게 낮은걸 덮어 씁니다.)

> 위에 있는게 이김.

1. file:./config/
2. file:./
3. classpath:/config/
4. classpath:/

랜덤값 설정하기

- ${random.*}

플레이스 홀더

> 인풋텍스트나 아레아 등에서 안내 문구를 삽입해 주는 기능 + 클릭하면 사라지는 아주 좋은 기능

- name = keesun
- fullName = ${name} baik

### 타입-세이프 프로퍼티 

타입-세이프 프로퍼티 `@ConfigurationProperties`

- 여러 프로퍼티를 묶어서 읽어올 수 있음
- 빈으로등록해서다른빈에주입할수있음
  - @EnableConfigurationProperties
  - @Component
  - @Bean
- 융통성 있는 바인딩
  - context-path (케밥)
  - context_path (언드스코어)
  - contextPath (캐멀)
  - CONTEXTPATH
- 프로퍼티 타입 컨버전
  - @DurationUnit
- 프로퍼티 값 검증
  - @Validated
  - JSR-303 (@NotNull, ...)
- 메타정보생성
- @Value
  - SpEL 을 사용할 수 있지만...
  - 위에 있는 기능들은 전부 사용 못합니다.

### 프로파일

- @Profile 애노테이션은 어디에?
  - @Configuration
  - @Component
- 어떤 프로파일을 활성화 할 것인가?
  - spring.profiles.active
- 어떤 프로파일을 추가할 것인가?
  - spring.profiles.include
- 프로파일용 프로퍼티
  - application-{profile}.properties


## 로깅

로깅 퍼사드 VS 로거

> 로깅 퍼사드의 장점은 로거를 자신들이 원하는 거를 사용할 수 있는 점

- **Commons Logging**, SLF4j
- JUL, Log4J2, **Logback** (최종적으로는 Logback으로 왔다.)

스프링 5에 로거 관련 변경 사항

- https://docs.spring.io/spring/docs/5.0.0.RC3/spring-framework-reference/overview.html#overview-logging
- Spring-JCL
  - Commons Logging -> SLF4j or Log4j2
  - pom.xml에 exclusion 안해도 됨.


스프링 부트 로깅

- 기본 포맷
- --debug (일부 핵심 라이브러리만 디버깅 모드로)
- --trace (전부 다 디버깅 모드로)
- 컬러 출력: spring.output.ansi.enabled
- 파일 출력: logging.file 또는 logging.path
- 로그 레벨 조정: logging.level.패지키 = 로그 레벨

### 커스터마이징

https://docs.spring.io/spring-boot/docs/current/reference/html/howto-logging.html : 커스텀 로그 설정 파일 사용하기

Logback: logback-spring.xml - 기본적으로는 이거 사용을 추천

Log4J2: log4j2-spring.xml

JUL (비추): logging.properties

Logback extension
- 프로파일 <springProfile name=”프로파일”>
- Environment 프로퍼티 <springProperty>
	
	
로거를 Log4j2로 변경하기

https://docs.spring.io/spring-boot/docs/current/reference/html/howto-logging.html#howto-configure-log4j-for-logging

## 테스트

https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-testing

시작은 일단 spring-boot-starter-test를 추가하는 것 부터
- test 스콥으로 추가.

@SpringBootTest
- @RunWith(SpringRunner.class)랑 같이 써야 함.
- 빈 설정 파일은 설정을 안해주나? 알아서 찾습니다. (@SpringBootApplication)
- webEnvironment
  - MOCK: mock servlet environment. 내장 톰캣 구동 안 함.
  - RANDON_PORT, DEFINED_PORT: 내장 톰캣 사용 함.
  - NONE: 서블릿 환경 제공 안 함.

```java
// TEST Code
package myepark.ebaykorea.springtestdemo;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
class SpringtestdemoApplicationTests {

    @Autowired
    MockMvc mockMvc;

    @Test
    void contextLoads() throws Exception {
        mockMvc.perform(get("/hello"))
                .andExpect(status().isOk())
                .andExpect(content().string("hello myepark"))
                .andDo(print());
    }

}

```


@MockBean
- ApplicationContext에 들어있는 빈을 Mock으로 만든 객체로 교체 함.
- 모든 @Test 마다 자동으로 리셋.

슬라이스 테스트
- 레이어 별로 잘라서 테스트하고 싶을 때 (빈을 다 체크하고 싶지 않을때)
- @JsonTest
- @WebMvcTest
- @WebFluxTest
- @DataJpaTest
- ...
