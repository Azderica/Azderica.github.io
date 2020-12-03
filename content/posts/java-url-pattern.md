---
title: "[Java] url-pattern이란"
data: 2020-11-03
published: true
tags: ['Java', 'JSP', 'Url-pattern', 'web.xml', 'Spring', 'Backend']
series: false,
cover_image: ./images/javaLogo.png
canonical_url: false
description: "url-pattern에 대해 정리합니다."
---

# Java Servlet : url-pattern 이란

url-pattern은 자바 서블릿 개발을 진행하다보면, 한번은 꼭 보게 되는 것 같다. 그러나, 한번도 제대로 정리해본적이 없어서, 이를 제대로 한 번 알아보고 싶어졌다.

<br/>

## url-pattern의 정의

서블릿을 생성하고 서블릿을 매핑을 시킨다. 서블릿을 사용하면 주소에 경로가 뜨기 때문에 이는 보안에 굉장히 취약하다. 그래서 특정한 단어로 매핑을 시킨다.

**url-patten은 실제 서블릿 매핑 이름을 의미한다. 서블릿 매핑 시 사용되는 가상의 이름이며 클라이언트가 브라우저에게 요청할 때, 사용할 때는 반드시 '/'(슬래시)로 시작한다.**

서블릿 매핑 이름으로 사용되는 URL 패턴의 종류는 정확히 이름까지 일치하는지, 디렉토리까지 일치하는지, 확장자만 일치하는지로 세가지로 구별된다.

<br/>

## url-pattern의 종류

url-pattern의 패턴은 3가지로 구성되지만, 이 자리에서는 디렉토리 패턴과 확장자 패턴에 대해 이야기 해보겠습니다. 정확히 일치하는 패턴의 경우는 말 그대로 `WebServlet('정확한/주소/URL/패턴')`으로 요청할 때만 실행된다.


### 디렉토리 패턴

디렉토리 패턴은 디렉토리 형태로 서버의 해당 컴포넌트를 찾아서 실행하는 구조입니다.

![image](https://user-images.githubusercontent.com/42582516/98429019-98eaf000-20e7-11eb-9f3f-3de334e29015.png)

서블릿 코드는 다음과 같이 작성할 수 있습니다.

```java
@WebServlet("/test/*")
public class TestServlet1 extends HttpServlet {
    // Code...
}

```

- 다음 예시 코드는 /test/ 디렉토리로 시작되는 요청에 대해 실행됩니다.

### 확장자 패턴

확장자 패턴은 확장자 형태로 서버의 해당 컴포넌트를 찾아서 실행하는 구조입니다.

![image](https://user-images.githubusercontent.com/42582516/98429024-9dafa400-20e7-11eb-840a-0166bf5c0236.png)


```java
@WebServlet("*.me")
public class TestServlet2 extends HttpServlet {
    // Code...
}

```

- 다음 예시 코드는 매핑 이름에 상관없이 확장자가 .me 이면 실행됩니다.


> 추가적으로 일반적으로 `/test/example.me`와 같이 요청이 들어온 경우, 앞의 디렉토리 이름을 우선시 하여 **TestServlet1**이 실행되며, `/없는디렉토리/example.me`의 요청의 경우에는 없는 디렉토리이므로 **.me**을 우선시하여 TestServlet2가 실행된다.

<br/>

## 결론.

이후에 서블릿이나, 좀 더 상세하게 정리할 수 있는 기회가 되면 정리하겠다.

최근 업무가 많아져서... 블로그 작성할 시간이 부족해지는 것을 느낀다.

---
**출처**
- https://windorsky.tistory.com/entry/%EC%84%9C%EB%B8%94%EB%A6%BF-URL-pattern
- https://dololak.tistory.com/740
- https://rwd337.tistory.com/34
- https://chrismare.tistory.com/entry/url-pattern-%EB%94%94%EB%A0%89%ED%86%A0%EB%A6%AC-%ED%8C%A8%ED%84%B4-%ED%99%95%EC%9E%A5%EC%9E%90-%ED%8C%A8%ED%84%B4