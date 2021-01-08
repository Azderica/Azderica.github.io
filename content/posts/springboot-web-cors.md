---
title: '[Springboot] CORS 이슈 해결하기'
slug: 00-springboot-cors
date: 2020-12-27
published: true
tags: ['Springboot', 'Web', 'Cors', 'HTTP', 'Backend']
series: false,
cover_image: ./images/SpringLogo.png
canonical_url: false
description: ' Springboot CORS에 대한 해결방법입니다.'
---

# Springboot CORS 이슈 해결하기.

지난 게시글에서는 CORS 이슈에 대해 정리했습니다.

- [CORS란.](https://Azderica.github.io/00-web-cors/)

회사 보안 정책에 따라서, 웹페이지에 허용되는 HTTP 메소드가 제한되는 경우가 있습니다. 저 또한 회사에서 이러한 업무를 해야하는 경우가 있기 때문에 이에 대해 한번 정리합니다.

이러한 CORS 이슈를 스프링 부트에서 해결하는 방법에 대해서 코드를 작성해볼려고합니다.

## Custom Filter 사용.

인터넷에서 CORS 이슈에 대한 해결책을 찾아보면 Spring은 쉽게 확인할 수 있는데, Sprinboot에 대한 글이 별로 없어 이를 작성했습니다.

```yaml
spring:
  mvc:
    dispatch-options-request: true
```

yaml 파일에서는 다음과 같이 추가했습니다.

```java
@Component
public class CustomFilter implements Filter {
  @Override
  public void init(FilterConfig filterConfig) throws ServletException {   }

  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain) throws IOException, ServletException {
    HttpServletRequest request = (HttpServletRequest) servletRequest;
    ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Origin", "*");
    ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Methods","GET, OPTIONS, HEAD, POST");
    ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    HttpServletResponse resp = (HttpServletResponse) servletResponse;
    if (request.getMethod().equals("OPTIONS")) {
      resp.setStatus(HttpServletResponse.SC_OK);
      return;
    }
    chain.doFilter(request, servletResponse);
  }

  @Override
  public void destroy() {  }
}
```

기존의 Filter를 상속받아서 다음과 같이 수정합니다.

이를 메소드 점검해보면 다음과 같습니다.

```sh
curl -v -X OPTIONS {url}
```

![image](https://user-images.githubusercontent.com/42582516/103171817-7cbb3200-4892-11eb-9a4a-d1125fc46506.png)

## 마무리.

다만 의문점 중 하나는 **TRACE를 막는 방법**에 대해서는 아직 확인 중에 있습니다.

특히 `curl -v -X TRACE {url}` 와 `curl -v -X trace {url}` 이 다른 결과 값을 나타내는 것을 확인할 수 있습니다.

이에 대해서는 좀 더 명확한 답을 추가해서 글에 추가를 해놓겠습니다. 혹시라도 답을 아시거나 잘못된 부분이 있으면 이야기주세요. 감사합니다.

---

**출처**

- https://webhack.dynu.net/?idx=20161110.001&print=friendly
