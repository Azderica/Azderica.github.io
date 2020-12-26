---
title: '[WEB] CORS'
slug: 00-web-cors
date: 2020-12-26
published: true
tags: ['Web', 'Cors', 'HTTP']
series: false,
cover_image: ./images/CorsText.png
canonical_url: false
description: " 'CORS에 대한 개념을 잡습니다. "
---

# CORS(Cross-Origin Resource Sharing)

웹 개발을 하게 되면, 반드시 보게되는 이슈입니다. 그러나 이에 대한 개념에 대해 정확하게 모른다는 생각이 들어 정리합니다.

<br/>

## CORS의 정의

CORS(Cross-Origin Resource Sharing)은 **추가 HTTP 헤더를 사용**하여, **하나의 출처(origin)에서 실행 중인 웹 애플리케이션이 다른 출처의 선택한 자원에 권한을 부여하도록 브라우저에 알려주는 체제**입니다.

**하나의 출처**란? URL의 프로토콜, 호스트, 포트가 동일한 경우를 의미합니다.

일반적으로는 다른 출처(origin)에서 내 자원(resource)에 함부로 접근하지 못하게 하기 위해 사용됩니다.

일반적으로 **요청 헤더 목록**은 다음과 같습니다.

- Origin

  - fetch가 시작되는 위치.
  - 경로 정보는 포함이 되지않고 서버 이름만 포함됨.

- Access-Control-Request-Method

  - `preflight request` 을 할 때, 실제 요청에서 어떤 메소드를 사용할지 서버에 알려줍니다.

- Access-Control-Request-Headers

  - `preflight request` 을 할 때, 실제 요청에서 어떤 header를 사용할 것인지 서버에서 알리기 위해 사용됩니다.

**응답 헤더 목록**은 다음과 같습니다.

- Access-Control-Allow-Origin

  - 브라우저가 해당 origin이 자원에 접근할 수 있도록 허용합니다.
  - `*` 은 credentials이 없는 요청에 한해서 모든 origin에서 접근이 가능하도록 허용합니다.

- Access-Control-Expose-Headers

  - 브라우저가 액세스할 수 있는 서버의 화이트리스트 헤더를 허용합니다.

- Access-Control-Max-Age

  - 얼마나 오랫동안 `preflight request`가 캐싱될 수 있는지를 나타냅니다.

- Access-Control-Allow-Credential

  - `Credentials`가 true일 때 요청에 대한 응답이 노출될 수 있는지를 나타냅니다.
  - `preflight request` 에 대한 응답의 일부로 사용되는 경우, 실제 자격 증명을 사용하여 실제 요청을 수행 할 수 있는지를 나타냅니다.
  - 간단한 GET 요청의 경우에는 `preflight` 되지 않으므로 자격 증명이 필요한 리소스를 요청하면 헤더가 리소스와 함께 반환되지 않으며 브라우저에서 응답을 무시하고 웹 콘텐츠로 반환하지 않습니다.

- Access-Control-Allow-Methods

  - `preflight request` 에 대한 응답으로 허용되는 메서드들을 나타냅니다.
  - 일반적으로 회사에서 보안 상의 이유로 http 메소드를 제한하는 경우, 이 헤더를 많이 사용합니다.

- Access-Control-Allow-Headers

  - `preflight` 요청에 대한 응답으로 실제 요청 시 사용할 수 있는 HTTP 헤더를 나타냅니다.

**preflight request**란? **미리 전송(사전요청)**을 의미합니다. 이는 본격적인 교차 HTTP 요청 전에 서버 측에서 그 요청의 메서드와 헤더에 대한 인식을 진행하는 지 확인합니다.

이는 위에 있는 HTTPHeader의 "Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers" 의 3가지 HTTP request headers를 사용하는 HTTPMethod("OPTIONS") 요청입니다.

<br/>

## CORS가 없으면?

만약 어떤 사이트에서 CORS 제한이 없으면 어떻게 될까요. 다른 출처의 어플리케이션이 서로 통신하는 것에 아무런 제한이 없게된다면 악의를 가진 사용자가 소스 코드를 볼 수도 있고, 세션정보를 가져갈 수도 있습니다.

또한 [CSRF(Cross-Site Request Forgery)](https://ko.wikipedia.org/wiki/%EC%82%AC%EC%9D%B4%ED%8A%B8_%EA%B0%84_%EC%9A%94%EC%B2%AD_%EC%9C%84%EC%A1%B0)나 [XSS(Cross-Site Scripting)](https://ko.wikipedia.org/wiki/%EC%82%AC%EC%9D%B4%ED%8A%B8_%EA%B0%84_%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8C%85)와 같은 방법을 사용해서 어플리케이션에서 코드가 실행된 것처럼 꾸며서 사용자의 정보를 탈취하기 너무 쉬워집니다.

이러한 경우에 개발자들이 투자해야하는 리소스들은 더 많아지기 때문에 이에 대한 제한은 꼭 필요합니다.

<br/>

## CORS는 어떻게 동작하나요?

이러한 CORS의 정의와 왜 필요한지에 대해서 알게 되었기 때문에 좀 더 자세하게 이야기를 해볼려고 합니다.

(추가 작성 중.)

<br/>

## CORS 에러와 해결

<br/>

## 마무리.

---

**출처**

- https://developer.mozilla.org/ko/docs/Glossary/Preflight_request
- https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Origin
- https://hannut91.github.io/blogs/infra/cors
