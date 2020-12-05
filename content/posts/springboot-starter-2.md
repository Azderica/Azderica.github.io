---
title: "[Springboot] Springboot 이해하기"
slug: 02-springboot-starter
date: 2020-07-09
published: true
tags: ['Spring', 'Springboot', 'Backend', 'SpringStarter']
series: true,
cover_image: ./images/SpringLogo.png
canonical_url: false
description: " 'Springboot 시작하기'의 두 번째 게시글입니다. "
---

# Springboot 이해하기

<br/>

## 의존성 관리 이해

https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-dependency-management

의존성으로 다 정의가 되어있어서 적게 신경을 써도 된다는 것은 큰 장점입니다.

또한 parent를 바꿔서 dependency를 줄 수 있습니다. 만약에 parent를 못바꾸는 상항이면 dependencyManagement에 dependency를 주는 방법이 있습니다.

일반적으로는 **parent를 설정**하여 **dependency를 주는 것이 중요**합니다. 

의존성 관리 기능을 최대한 사용하는 것이 좋습니다.


<br/>

## 의존성 관리 응용

- 버전을 관리해주는 의존성을 추가 (자동으로 버전 관리)

- 버전 관리 안해주는 의존성 추가 (추가적으로 버전을 체크해줘야 함)

- 기존 의존성 버전 변경하기

  ```xml
  <properties>
      <spring.version>5.0.6.RELEASE</spring.version>
  </properties>
  ```

- https://mvnrepository.com/

버전을 관리해주는 version이 있으면 자동으로 spring boot 가 처리를 해주지만, 
version이 없으면 따로 버전을 관리해줘야합니다.(다른 버전으로 처리가 안되는 경우가 발생할 수 있음. )



## 자동 설정 이해

- `@EnableAutoConfiguration` (`@SpringBootApplication` 안에 숨어 있음) 
- 빈(Bean)은 두단계로 나눠서읽혀집니다.
  - 1단계: `@ComponentScan`
  - 2단계: `@EnableAutoConfiguration `
- `@ComponentScan`
  -` @Component`
  - `@Configuration @Repository @Service @Controller @RestController`
- `@EnableAutoConfiguration`
  - spring.factories
    - org.springframework.boot.autoconfigure.EnableAutoConfigu ration
  - `@Configuration`
  - `@ConditionalOnXxxYyyZzz`



```java
@SpringBootApplication
public class Application {

    public static void main(String[] args){
        SpringApplication.run(Application.class, args);
    }
}
```

대부분 이 방법으로 진행하는 것이 좋습니다.

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

위와 같이 돌릴 수도 있습니다. 그러나 다음과 같이 하게된다면 Web 처리는 못하는 단점이 있습니다.

### @ComponentScan

자기 밑에 있는 모든 Component를 찾아서 Bin으로 등록시킵니다. (자기 자신 포함, 다른 패키지는 안됩니다.)

###  @EnableAutoConfiguration

`: Maven: org.springframework.boot:spring-boot-autoconfiguration:2.3.1.REALSE\spring-boot-autoconfigure-2.3.1.RELEASE.jar\META-INF\spring.factories`

자기 밑에 있는 모든 메타파일을 찾아준다. 위의 링크에서 EnableAutoConfiguration이 있는데 아래에 있는 모든 링크를 다 추가해준다.

###  Configuration

Bean을 등록하는 java 설정파일입니다.

`Maven: org.springframework.boot:spring-boot-autoconfiguration:2.3.1.REALSE\spring-boot-autoconfigure-2.3.1.RELEASE.jar\org.springframework.boot.autoconfigure\web\servlet\WebMvcAutoConfiguration`

에 들어가보면 Bean이 있을 때와 없을때를 구분해줍니다.

`autoConfiguartion` 를 설정하면 수많은 bean이 생성이 되고 적용이 됩니다.


<br/>

## 자동 설정 만들기. Starter와 AutoConfigure

유용한 단축키 :

- `command + N` : get, set, toString() 등을 제공
- `command + opt + L` : 줄 정렬

AutoConfigure은 흠.. 현재 Process terminated 상태. => 나중에 하기

문제는  Bean을 등록할려고 하는데 두가지 페이스. component scan 이 먼저 적용됩니다. 
두번째 페이스가 auto configuration인데 첫번째를 두번째 애가 덮어쓴거다.

이거를 해결하는 방법은 아래와 같습니다.

<br/>

## 자동 설정 만들기. @ConfigurationProperties

**덮어쓰기 방지하기** 

- @ConditionalOnMissingBean : 이 타입의 Bean이 없는 경우만 이 Bean을 등록하는 의미입니다.

**빈 재정의 수고덜기**

- @ConfigurationProperties(“holoman”)
- @EnableConfigurationProperties(HolomanProperties)
- 프로퍼티 키값 자동 완성

`src\main\resource\application.properties` 파일을 만들어서 해당 파일에 다음과 같이 선언하면 이후에 사용하기 편해집니다.
- holoman.name = {쓰고 싶은 글, ex name}
- holoman.how-long = {쓰고 싶은 숫자. ex 10}

또한 src\main\java\me.whiteship\HolomanProperties.class를 만들어서 name이랑 how-long에 대해 Get 이랑 set 다 정의하고 HolomanConfiguration에서 

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



## 내장 웹 서버 응용 : 컨테이너와 포트

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





## 내장 웹 서버 응용 : HTTPS, HTTP2

추가 공부 자료
https://opentutorials.org/course/228/4894
https://gist.github.com/keesun/f93f0b83d7232137283450e08a53c4fd

application.properties

```xml
server.ssl.key-store: keystore.p12
server.ssl.key-store-password: 123456
server.ssl.keyStoreType: PKCS12
server.ssl.keyAlias: tomcat
```

generate-keystore.sh

```bash
keytool -genkey 
  -alias tomcat 
  -storetype PKCS12 
  -keyalg RSA 
  -keysize 2048 
  -keystore keystore.p12 
  -validity 4000
```

- HTTPS 설정하기
  - 키스토어 만들기
  - HTTP는 못쓰네?

- HTTP 커넥터는 코딩으로 설정하기
  - https://github.com/spring-projects/spring-boot/tree/v2.0.3.RELEASE/spring-boot-samples/spring-boot-sample-tomcat-multi-connectors

- HTTP2 설정
  - server.http2.enable
  - 사용하는 서블릿 컨테이너 마다 다름

pom.xml


```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <exclusions>
            <exclusion>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-tomcatb</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
	
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-undertow</artifactId>
    </dependency>
</dependencies>
```

application.properties


```xml
server.ssl.key-store: keystore.p12
server.ssl.key-store-password: 123456
server.ssl.keyStoreType: PKCS12
server.ssl.keyAlias: spring
server.port=8443
server.http2.enabled=true
```

http2를 사용할려면 꼭 `server.http2.enabled` 을 true로 해주어야한다.

<br/>

## 톰캣 HTTP2


pom.xml

```xml
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <project.reporting.outputEncoding>UT-8</project.reporting.outputEncoding>
    <java.version>9</java.version>
    <tomcat.version>9.0.18</tomcat.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

여기에  추가적으로 Project Setting에 Project에 version과, module을 맞춰줘야한다.
그렇게 진행하면. 문제없이 http2로 돌아가는 것을 확인할 수 있다.

- JDK9와 Tomcat 9+ 추천

- 그이하는아래링크참고
  - https://docs.spring.io/spring-boot/docs/current/reference/html/howto-embedded-web-servers.html#howto-configure-http2-tomcat
  

<br/>

## 독립적으로 실행 가능한 JAR

- https://docs.spring.io/spring-boot/docs/current/reference/html/executable-jar.html 
  - JAR 파일 하나로 실행 가능, 이걸로 앱이 돌아간다.  - mvn package를 하면 실행 가능한 JAR 파일 “하나가" 생성 됨.
  - spring-maven-plugin이 해주는 일 (패키징)
  - 과거 “uber” jar 를 사용
    - 모든 클래스 (의존성 및 애플리케이션)를 하나로 압축하는 방법
    - 뭐가 어디에서 온건지 알 수가 없음
      - 무슨 라이브러리를 쓰는건지..
    - 내용은 다르지만 이름이 같은 파일은 또 어떻게?
  - 스프링 부트의 전략
    - **내장 JAR** : 기본적으로 자바에는 내장 JAR를 로딩하는 표준적인 방법이 없음.
    - 애플리케이션 클래스와 라이브러리 위치 구분
    - org.springframework.boot.loader.jar.JarFile을 사용해서 내장 JAR를 읽는다.
    - org.springframework.boot.loader.Launcher를 사용해서 실행한다.

<br/>

## 스프링 부트 원리 정리

- 의존성 관리
  - 이것만 넣어도 이만큼이나 다 알아서 가져오네?
- **자동 설정**
  - @EnableAutoConfiguration이 뭘 해주는지 알겠어.
- 내장 웹 서버
  - 아 스프링 부트가 서버가 아니라 내장 서버를 실행하는 거군.
- 독립적으로 실행 가능한 JAR
  - spring-boot-maven 플러그인이 이런걸 해주는구나..
