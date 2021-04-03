---
title: '[Spring] Spring Cloud Zuul 공부'
slug: 00-spring-zuul
date: 2021-02-06
published: true
tags: ['Spring', 'Springboot', 'Cloud', 'Zuul', 'Netflix', 'Backend']
series: false
cover_image: ./images/SpringCloudLogo.png
canonical_url: false
description: 'Spring cloud zuul을 적용하기 위해 공부하는 내용입니다.'
---

# Spring Cloud Zuul

기존 회사 프로젝트에서 사용하는 도메인에 대해 API Gateway 생성에 대한 필요성이 대두되었다. 그래서 그 프로젝트를 진행하기 전에 한번 공부해볼려고 한다.

<br/>

## 먼저 API Gateway에 대해

Microservice Architecture(MSA)에서 언급되는 컴포넌트 중 하나이며, 모든 클라이언트 요청에 대한 end point를 통합하는 서버입니다. 일종의 프록시 서버처럼 동작하며 인증 및 권한, 모니터링, 로깅 등의 추가적인 기능이 있습니다.

MSA는 도메인별 데이터를 저장하고 도메인별로 하나 이상의 서버가 따로 존재합니다. 한 서비스에 한개 이상의 서버가 존재하기 때문에 해당 서버를 사용하는 클라이언트 입장에서는 다수의 end point가 생기므로, 이 end point를 변경했을 때 관리하기가 힘듭니다.그래서 MSA 환경에서 서비스에 대한 도메인인 하나로 통합할 수 있는 API Gateway가 필요합니다.

**API Gateway를 사용하면 통합적으로 end point와 Rest api를 관리할 수 있으며, 모든 클라이언트는 각 서비스의 end point 대신 API Gateway로 요청을 전달**합니다. 이후 API Gateway는 사용자가 설정한 라우팅 설정에 따라 각 end point로 클라이언트를 대리하여 요청하고 응답을 받으면 클라이언트에게 전달하는 프록시 역할을 수행합니다.

<br/>

## Netflix Zuul을 선택한 이유.

![Netflix-zuul-usage](https://user-images.githubusercontent.com/42582516/107103975-2236cd80-6863-11eb-9494-07470230b9c0.png)

앞서 API Gateway에 대해 개념을 인지하고, 이를 사용하기 제일 좋은 오픈소스 프로젝트는 Netflix zuul로 볼 수 있습니다.

```
Zuul is the front door for all requests from devices and web sites to the backend of the Netflix streaming application. As an edge service application, Zuul is built to enable dynamic routing, monitoring, resiliency and security. It also has the ability to route requests to multiple Amazon Auto Scaling Groups as appropriate.
```

- [출처 : Netflix zuul wiki](https://github.com/Netflix/zuul/wiki)

Zuul에 대한 공식 설명글입니다. 목적을 보면, 라우팅과 모니터링, 복원 및 보안을 지원하도록 설계되어 있습니다.

<br/>

## Netflix Zuul에 대해 좀 더 자세하게.

클라이언트 요청은 많은 트래픽과 다양한 요청이 들어오기 때문에 운영에서 다양한 이슈와 문제가 발생합니다. zuul은 이러한 상황에 신속하게 대응합니다. groovy 언어로 작성된 다양한 형태의 Filter를 제공하고, Filter에 기능을 정의해이슈 발생시 적절한 Filter을 추가함으로서 이슈를 해결할 수 있습니다.

### Netflix Filter 기능

- Authentication and Security
  - 클라이언트 요청 시, 각 리소스에 대한 인증 확인하고 만족시키지 않으면 거부합니다,
- Insights and Monitoring
  - 의미있는 데이터 및 통계를 제공합니다.
- Dynamic Routing
  - 필요에 따라 요청을 다른 클러스터로 동적 라우팅합니다.
- Stress Testing
  - 성능 측정을 위해 점차적으로 클러스터 트래픽을 증가시킵니다.
- Load Shedding
  - 각 유형의 요청에 대해 용량을 할당하고, 초과 요청을 제한합니다.
- Static Response handling -클러스테엇 오는 응답을 대신하여 API Gateway에서 응답을 처리합니다.

### Netflix Core Architecture

![Zuul-Core-Architecture](https://user-images.githubusercontent.com/42582516/107103592-940e1780-6861-11eb-9a76-6f86651c1a47.png)

요청은 크게 4가지의 필터로 구성됩니다.

- Pre filter
  - Origin으로 라우팅되기전에 실행됩니다.
  - 요청 인증, Origin 서버 선택, 디버그 정보 로깅 등이 있습니다.
- Routing filter
  - 요청을 Origin으로 Routing하는 작업을 수행합니다.
  - Apache HttpClient나 Netflix Ribbon을 사용해서 HTTP 요청을 작성하고 전송합니다.
- Post filter
  - 요청이 Origin으로 라우팅된 후 실행됩니다.
  - 응답에 표준 HTTP 헤더를 추가하고 통계 및 메트릭을 수집합니다.
- Error filter
  - 다른 단계에서 오류 발생시 실행됩니다.

이를 그림으로 나타내면 다음과 같습니다.

![zuul-filter](https://user-images.githubusercontent.com/42582516/107104961-61671d80-6867-11eb-8eb0-f1e2ae87cf14.png)

### Zuul Components

zuul은 다음과 같은 component로 구성됩니다.

Zuul 1.x 컴포넌트는 크게 4가지의 components로 구성됩니다.

- `zuul-core`
  - 필터를 컴파일하고 실행하는 핵심 기능을 가진 라이브러리
- `zuul-simple-webapp`
  - `zuul-core`로 애플리케이션 구축한 예제.
- `zuul-netflix`
  - 다른 Netflix OSS 구성 요소를 Zuul에 추가합니다.
  - Ex) Ribbon
- `zuul-netflix-webapp`
  - `zuul-core`와 `zuul-netflix`를 함계 사용하기 쉬운 패키지로 만드는 웹

Zuul 2.x 컴포넌트는 zuul-core와 zuul-sample로만 구성됩니다.

- `zuul-core` : zuul 2.0의 기능
- `zuul-sample` : zuul 2.0용 샘플 driver application

<br/>

## Spring Cloud Zuul

Spring boot에 Netflix OSS를 통합적으로 제공합니다. annotation과 yml 설정으로 쉽게 시작할 수 있습니다.

![spring-cloud-zuul](https://user-images.githubusercontent.com/42582516/107106129-64fda300-686d-11eb-8afd-d3b618d314eb.png)

- `RouteLocator`
  - url path에 대한 라우팅을 지정
  - 요청이 들어오면 어떻게 라우팅할 것인지를 정의합니다.
- `ZuulHandlerMapping`
  - RouteLocator에 정의된 url path에 zuulController를 매핑합니다.
- `ZuulController`
  - ZuulServlet을 주입합니다.
  - 들어오는 모든 요청을 ZuulServlet으로 처리합니다.
- `ZuulFilterInitializer`
  - filter Map에 정의된 filter를 FilterRegistry에 등록하고 FilterLoader로 로딩합니다.

### 시작하기.

먼저 아래와 같이 `build.gradle`에 의존성을 추가합니다.

```gradle
implementation("org.springframework.cloud:spring-cloud-starter-netflix-zuul:2.1.2.RELEASE")
```

application.yml 파일에 zuul 설정을 추가합니다.

```yml
spring:
  application:
    name: api-gateway-way

server:
  port: 8080

ribbon:
  eureka:
    enabled: false

zuul:
  sensitive-headers:
  host:
    connect-timeout-millis: 600000
    socket-timeout-millis: 600000
  routes:
    foo-api:
      path: /foos/**
      url: http://localhost:8081
      stripPrefix: false
    bar-api:
      path: /bars/**
      url: http://localhost:8082
      stripPrefix: false
```

그리고 Zuul을 사용하기 위해 다음과 같이 Annotation을 사용합니다.

```java
@EnableZuulProxy
@SpringBootApplication
public class ZuulApplication {
    public static void main(String[] args) {
        SpringApplication.run(ZuulApplication.class, args);
    }
}
```

Spring Cloud Zuul은 `@EnableZuulProxy`와 `@EnableZuulServer` 두 종류의 annotation으로 zuul을 구동시킵니다. 다만`@EnableZuulProxy`은 `@EnableZuulServer`에서 `PreDecorationFilter, RibbonRoutingFilter, SimpleHostRoutingFilter`을 추가 시킨 개념입니다.

### Custom Filter 적용

다음은 ZuulFilter를 상속받아 Filter를 추가합니다..

```java
public class RouteFilter extends ZuulFilter {

    @Override
    public String filterType() {
        return "route";
    }

    @Override
    public int filterOrder() {
        return 1;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public Object run() {
        System.out.println("Inside Route Filter");
        return null;
    }
}
```

- `filterType()` : filter의 type으로 "pre", "route", "post", "error", "static"을 용도에 따라 return합니다.
- `filterOrder()` : type안에서 해당 필터가 실행되는 순서입니다.
- `shouldFilter()` : run method를 실행시 true 실행하지 않아도 되면 false를 반환합니다.
- `run()` : 실제 filter의 로직을 담당합니다.

### 예외 처리

`Netflix Zuul`의 프록시는 Filter 레벨에서 실행됩니다. 필터는 서블릿의 영역으로 Spring MVC의 영역의 여러 레벨에서 발생하는 예외를 처리할 수 있는 `@ControllerAdvice`를 사용할 수 없습니다.

따라서 `Whitelabel Error Page` 페이지 생성 로직에서 처리할 수 있습니다

```java
@RestController
public class ErrorHandlerController implements ErrorController {

    private static final String ERROR_MAPPING = "/error";

    @RequestMapping(value = ERROR_MAPPING)
    public ResponseEntity<String> error() {

        RequestContext ctx = RequestContext.getCurrentContext();
        Object error = ExceptionUtils.getRootCause((Exception) ctx.get("throwable"));

        // zuul.routes.{proxy}.path 에 정의되지 않은 요청일 경우 응답 처리
        if (error == null) {

            return new ResponseEntity<String>("NOT_FOUND", HttpStatus.NOT_FOUND);
        }

        if (error instanceof Exception) {

            return new ResponseEntity<String>("SERVICE_UNAVAILABLE", HttpStatus.SERVICE_UNAVAILABLE);
        }

        // 예상되지 않은 오류일 경우 응답 처리
        return new ResponseEntity<String>("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public String getErrorPath() {

        return ERROR_MAPPING;
    }
}
```

- 라우팅할 프록시가 존재하지 않는 경우 ErrorController로 요청을 처리합니다.
- 라우팅할 프록시가 존재하고, 애플리케이션 오류(라우팅 타임아웃 등) 발생 시 `pre filter > ErrorController > post filter` 순서로 요청을 처리합니다.
- 라우팅할 프록시가 존재하고, 라우팅이 성공할 시 `pre filter -> post filter` 순으로 요청을 처리합니다.

<br/>

## 마무리

간단하게나마 spring cloud zuul에 대해 정리했습니다.

---

**출처**

- https://netflixtechblog.com/announcing-zuul-edge-service-in-the-cloud-ab3af5be08ee
- https://github.com/Netflix/zuul/wiki
- https://jsonobject.tistory.com/464
- https://sabarada.tistory.com/56
- https://lion-king.tistory.com/entry/Spring-Boot-Spring-Cloud-MSA-4-Zuul%EC%9D%B4%EB%9E%80-%EC%A0%81%EC%9A%A9%EB%B0%A9%EB%B2%95
- https://cloud.spring.io/spring-cloud-netflix/multi/multi__router_and_filter_zuul.html
- https://blog.neonkid.xyz/208
