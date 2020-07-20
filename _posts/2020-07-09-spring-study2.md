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



## 자동 설정 만들기. Starter와 AutoConfigure

유용한 단축키 :

- `command + N` : get, set, toString() 등을 제공
- `command + opt + L` : 줄 정렬

AutoConfigure은 흠.. 현재 Process terminated 상태. => 나중에 하기

문제는  Bean을 등록할려고 하는데 두가지 페이스. component scan 이 먼저다. 
두번째 페이스가 auto configuration인데 첫번째를 두번째 애가 덮어쓴거다.

이거를 해결하는 방법이 아래의 것이다.

## 자동 설정 만들기. @ConfigurationProperties

**덮어쓰기 방지하기** 

- @ConditionalOnMissingBean : 이 타입의 Bean이 없는 경우만 이 Bean을 등록해라

**빈 재정의 수고덜기**

- @ConfigurationProperties(“holoman”)
- @EnableConfigurationProperties(HolomanProperties)
- 프로퍼티 키값 자동 완성

src\main\resource\application.properties 파일 만들어서
holoman.name = {쓰고 싶은 글, ex name}
holoman.how-long = {쓰고 싶은 숫자. ex 10}

이후에 src\main\java\me.whiteship\HolomanProperties.class를 만들어서

name이랑 how-long에 대해 Get 이랑 set 다 정의하고 HolomanConfiguration에서 

@EnableConfigurationProperties(HolomanProperties)와 같이 선언해서 하기

```xml
 <dependency>
 <groupId>​org.springframework.boot​</groupId>
 <artifactId>​spring-boot-configuration-processor​</artifactId>
 <optional>​true​</optional>
```



## 내장 서블릿 컨테이너

- 스프링 부트는 서버가 아니다. 그저 툴이라고 생각하자
  - 톰캣 객체 생성
  - 포트 선정
  - 톰캣에 컨텍스트 추가
  - 서블릿 만들기
  - 톰캣에 서블릿 추가
  - 컨텍스트에 서블릿 맵핑
  - 톰캣 실행 및 대기

```java
public static void main(String[] args) throws LifecycleException {
		Tomcat tomcat = new Tomcat();
		tomcat.setPort(8080);

		Context context = tomcat.addContext("/", "/");

		HttpServlet servlet = new HttpServlet() {
			@Override
			protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
				PrintWriter writer = resp.getWriter();
				writer.println("<html><head><title>");
				writer.println("Hey, Tomcat");
				writer.println("</title></head>");
				writer.println("<body><h1>Hello Tomcat</h1></body>");
				writer.println("</html>");
			}
		};

		String servletName = "helloServlet";
		tomcat.addServlet("/", servletName, servlet);
		context.addServletMappingDecoded("/", servletName);

		tomcat.start();
		tomcat.getServer().await();
	}
```

다음은 예제 코드. 이게 다 Spring boot에서 해주는거구나로 이해하기

- 이 모든 과정을 보다 상세히 또 유연하고 설정하고 실행해주는게 바로 스프링 부트의 자동 설정
  - ServletWebServerFactoryAutoConfiguration (서블릿 웹 서버 생성)
    - TomcatServletWebServerFactoryCustomizer(서버 커스터마이징)
  - DispatcherServletAutoConfiguration
    - 서블릿 만들고 등록



## 내장 웹 서버 응용 1부 : 컨테이너와 포트

다음과 같이 자동으로 쓰는 tomcat 대신 jetty를 쓸 수도 있다.

```xml
<properties>
    <servlet-api.version>3.1.0</servlet-api.version>
</properties>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <!-- Exclude the Tomcat dependency -->
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<!-- Use Jetty instead -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
```

해당 글에서 <dependencies></dependencies>를 안주면 에러가 나서. 에러 처리해주었음.

- 다른 서블릿 컨테이너로 변경
- 웹서버사용하지않기
- 포트
  - server.port
  - 랜덤포트
  - ApplicationListner<ServletWebServerInitializedEvent>

