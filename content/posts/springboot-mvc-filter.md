---
title: '[Springboot] 스프링부트 MVC - Filter'
slug: 01-springboot-mvc
date: 2020-11-03
published: true
tags: ['Spring', 'Springboot', 'Filter', 'Backend']
series: false
cover_image: ./images/SpringLogo.png
canonical_url: false
description: ' Springboot MVC 중 Filter에 대한 설명입니다. '
---

# Spring Boot MVC - Filter

HTTP Method 취약점을 제거하는 업무를 하는 중에 기존 코드에서 일부분 수정을 해야하는 법을 알았다. 그중 필터에 대해 알게되었고 HTTP 헤더 정보를 설정, Encoding, XSS, CORS 이슈등을 해결할 수 있다는 점을 알았다.

이에 대해서 Filter에 대해 공부해야겠다는 생각이 들었다.

<br/>

## Filter란.

![image](https://user-images.githubusercontent.com/42582516/97983638-ee3dad80-1e18-11eb-95ca-2b249554509b.png)

다음의 사진과 같습니다.

서블릿의 ServletContext 기능으로 사용자에 의해 서블릿이 호출 되기 전/후로 사용자 요청/응답의 헤더 정보 등을 검사 및 설정할 수 있습니다.

<br/>

## Filter와 Interceptor의 차이

- Filter는 DispatcherServlet 앞에서 먼저 동작하고, Intercepter는 DispatcherServlet에서 Controller(Handler) 사이에서 동작합니다.
- Filter
  - `웹 어플리케이션의 Context`의 기능을 가지고 있다.
  - 스프링 기능을 활용하기에 어렵다.
  - 일반적으로 인코딩, CORS, XSS, LOG, 인증, 권한 등을 구현한다..
- Interceptor
  - `스프링의 Spring Context`의 기능이며 일종의 빈이다.
  - 스프링 컨테이너이므로 다른 Bean을 주입해서, 활용성을 높일 수 있다.
  - 다른 Bean을 활용 가능하기에 인증 및 권한 등을 구현할 수 있다.

<br/>

## Springboot에서 Filter를 설정.

> 스프링에서는 웹 어플리케이셔 컨텍스트를 설정할 수 있는 web.xml 파일을 통한 필터를 설정할 수 있다. 그러나 스프링부트는 다르다.

```xml
<filter>
     <filter-name>SomeFilter</filter-name>
    <filter-class>com.somecompany.SomeFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>SomeFilter</filter-name>
    <url-pattern>/url/*</url-pattern>
    <init-param>
       <param-name>paramName</param-name>
       <param-value>paramValue</param-value>
    </init-param>
</filter-mapping>
```

> 스프링 부트는 다음과 같이 설정할 수 있습니다.

```java
@Bean
public FilterRegistrationBean testFilterRegistration() {

    FilterRegistrationBean registration = new FilterRegistrationBean();
    registration.setFilter(testFilter());
    registration.addUrlPatterns("/url/*");
    registration.addInitParameter("paramName", "paramValue");
    registration.setName("testFilter");
    registration.setOrder(1);
    return registration;
}

public Filter testFilter() {
    return new testFilter();
}
```

이처럼 스프링과 스프링 부트의 필터 설정은 다르게 설정됩니다.

좀 더 스프링 부트의 필터에 대해 알아보자면, 다음과 같습니다. 스프링 부트에서 필터를 사용하는 방법은 크게 두가지로 나눠집니다.

### 1. FilterRegistrationBean으로 필터 등록

`org.springframework.boot.web.servlet`의 `FilterRegistrationBeen`을 사용하여, CORSFilter 클래스를 설정파일에서 빈으로 등록하는 방식입니다.

- 예시코드는 다음과 같습니다.

```java
@SpringBootApplication
public class TestApplication1 {

	public static void main(String[] args) {
		SpringApplication.run(TestApplication1.class, args);
	}

	@Bean
	public FilterRegistrationBean setFilterRegistration() {
		FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean(new MyFilter());

        // string 여러개를 가변인자로 받는 메소드
		filterRegistrationBean.addUrlPatterns("/filtered/*");
        return filterRegistrationBean;
	}
}
```

### 2. @WebFilter + @ServletComponentScan

스프링부트에서 지원하는 `@WebFilter` 애너테이션으로 자동 등록 후에 `@ServletComponentScan`을 사용하는 방식이다.

예시코드는 다음과 같습니다.

- `@ServletComonentScan 설정`

```java
@ServletComponentScan
@SpringBootApplication
public class TestApplication2 {
	public static void main(String[] args) {
		SpringApplication.run(TestApplication2.class, args);
	}
}
```

- `@WebFilter 설정`

```java
@Slf4j
@WebFilter(urlPatterns = "/filtered/*")
public class MyFilter implements Filter {
	// 1번과 내용이 같습니다.
}
```

다음과 같이 구성할 수 있습니다. 해당 코드와 같이 Springboot에 필터를 설정할 수 있습니다.

<br/>

## 마무리.

업무 개발 코드를 추가할 수 없어서 간단하게 정리했습니다. 다음에 업무 상에 시간이 조금 있으면, HTTP Method를 제한하는 코드를 추가적으로 구성해서 올리겠습니다.

---

**출처**

- https://linked2ev.github.io/gitlog/2019/09/15/springboot-mvc-13-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8-MVC-Filter-%EC%84%A4%EC%A0%95/
- https://qastack.kr/programming/19825946/how-to-add-a-filter-class-in-spring-boot
- https://luvstudy.tistory.com/79
