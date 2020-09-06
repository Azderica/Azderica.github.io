---
layout: post
title: "Springboot API 시작하기"
date: 2020-09-07 06:10:00 -0500


---

# Springboot API 시작하기.

[강의 자료](https://drive.google.com/file/d/0B-4fgYvMaU-zYVlVUzB2ZnpuRU8ySFVpV2h3ZjRmd096azFN/view)

[수업 자료](https://docs.google.com/document/d/1GFo3W6XxqhxDVVqxiSEtqkuVCX93Tdb3xzINRtTIx10/edit)

## REST API

### API
- **A**pplication **P**rogramming **I**nterface

### REST
- **RE**presentational **S**tate **T**ransfer
- 인터넷 상의 시스템 간의 상호 운용성(interoperability)을 제공하는 방법중 하나
- 시스템 제각각의 독립적인 진화를 보장하기 위한 방법
- REST API: REST 아키텍처 스타일을 따르는 API

### REST 아키텍처 스타일 ([발표 영상](https://www.youtube.com/watch?v=RP_f5dMoHFc) 11분)
- Client-Server
- Stateless
- Cache
- **Uniform Interface**
- Layered System
- Code-On-Demand (optional)

### Uniform Interface (발표 영상 11분 40초)

<details>
<summary>상세</summary>
<div markdown="1">

Uniform Interface(일관된 인터페이스)란, Resource(URI)에 대한 요청을 통일되고, 한정적으로 수행하는 아키텍처 스타일을 의미합니다. 이것은 요청을 하는 Client가 플랫폼(Android, Ios, Jsp 등) 에 무관하며, 특정 언어나 기술에 종속받지 않는 특징을 의미합니다. 이러한 특징 덕분에 Rest API는 HTTP를 사용하는 모든 플랫폼에서 요청가능하며, Loosely Coupling(느슨한 결함) 형태를 갖게 되었습니다.

</div>
</details>

- Identification of resources
  - 리소스가 URI로 식별되면 된다.
- manipulation of resources through represenations
  - 리소스를 요청할 때 서버는 리소스를 표현하여 응답한다.
  - 대표적인 API 예로는 HTML, JSON, XML이 있다. 
  - 콘텐츠 협상
    - 클라이언트가 클라이언트의 요구에 맞는 특정 표현을 요청할 수 있다. 
    - 예를 들어 클라이언트는 리소스의 JSON 표현 또는 리소스의 XML 표현을 요청할 수 있다. 
    - 서버는 그렇게 할 수 있는 경우 이 표현을 제공할 수 있다.
  - API에서 콘텐츠 협상을 사용하여 여러 클라이언트가 동일한 URL에서 다른 리소스 표현에 액세스할 수 있도록 할 수 있다.
- **self-descrive messages**
  - 클라이언트가 resource를 가지고 어떤 일을 수행할때 필요한 모든 데이터가 응답되어야함.
  - 보통 안에 profile(docs) 링크를 명시하는식으로 구현.
- **hypermedia as the engine of appliaction state (HATEOAS)**
  - 거의 모든 rest api에서 지키지못함. 
  - 어플리케이션의 상태가 하이퍼링크를 통해서 항상 전이가 되어야함. 
  - 스프링에서는 spring-boot-hateoas 패키지로 좀 편하게 구현 가능.

<details>
<summary>좋은 API 예시(github API)</summary>
<div markdown="1">

```xml
{
  "timeline_url": "https://github.com/timeline",
  "user_url": "https://github.com/{user}",
  "current_user_public_url": "https://github.com/octocat",
  "current_user_url": "https://github.com/octocat.private?token=abc123",
  "current_user_actor_url": "https://github.com/octocat.private.actor?token=abc123",
  "current_user_organization_url": "",
  "current_user_organization_urls": [
    "https://github.com/organizations/github/octocat.private.atom?token=abc123"
  ],
  "security_advisories_url": "https://github.com/security-advisories",
  "_links": {
    "timeline": {
      "href": "https://github.com/timeline",
      "type": "application/atom+xml"
    },
    "user": {
      "href": "https://github.com/{user}",
      "type": "application/atom+xml"
    },
    "current_user_public": {
      "href": "https://github.com/octocat",
      "type": "application/atom+xml"
    },
    "current_user": {
      "href": "https://github.com/octocat.private?token=abc123",
      "type": "application/atom+xml"
    },
    "current_user_actor": {
      "href": "https://github.com/octocat.private.actor?token=abc123",
      "type": "application/atom+xml"
    },
    "current_user_organization": {
      "href": "",
      "type": ""
    },
    "current_user_organizations": [
      {
        "href": "https://github.com/organizations/github/octocat.private.atom?token=abc123",
        "type": "application/atom+xml"
      }
    ],
    "security_advisories": {
      "href": "https://github.com/security-advisories",
      "type": "application/atom+xml"
    }
  }
}

```

</div>
</details>

### 두 문제를 좀 더 자세히 살펴보자. (발표 영상 37분 50초)
- Self-descriptive message
  - 메시지 스스로 메시지에 대한 설명이 가능해야 한다.
  - 서버가 변해서 메시지가 변해도 클라이언트는 그 메시지를 보고 해석이 가능하다.
  - 확장 가능한 커뮤니케이션
- HATEOAS
  - 하이퍼미디어(링크)를 통해 애플리케이션 상태 변화가 가능해야 한다.
  - 링크 정보를 동적으로 바꿀 수 있다. (Versioning 할 필요 없이!)

### Self-descriptive message 해결 방법 
- 방법 1: 미디어 타입을 정의하고 IANA에 등록하고 그 미디어 타입을 리소스 리턴할 때 Content-Type으로 사용한다.
- 방법 2: profile 링크 헤더를 추가한다. (발표 영상 41분 50초)
  - [브라우저들이 아직 스팩 지원을 잘 안해](http://test.greenbytes.de/tech/tc/httplink/)
  - 대안으로 [HAL](http://stateless.co/hal_specification.html)의 링크 데이터에 [profile 링크](https://tools.ietf.org/html/draft-wilde-profile-link-04) 추가

### HATEOAS 해결 방법 
- 방법1: 데이터에 링크 제공
  - 링크를 어떻게 정의할 것인가? HAL
- 방법2: 링크 헤더나 Location을 제공


## “Event” REST API

> [참고 자료](https://gitlab.com/whiteship/natural)

이벤트 등록, 조회 및 수정 API

### GET /api/events

#### 이벤트 목록 조회 REST API (로그인 안 한 상태)

- 응답에 보여줘야 할 데이터
  - 이벤트 목록
  - 링크
    - self
    - profile: 이벤트 목록 조회 API 문서로 링크
    - get-an-event: 이벤트 하나 조회하는 API 링크
    - next: 다음 페이지 (optional)
    - prev: 이전 페이지 (optional)
  - 문서?
    - 스프링 REST Docs로 만들 예정

#### 이벤트 목록 조회 REST API (로그인 한 상태)

- 응답에 보여줘야 할 데이터
  - 이벤트 목록
  - 링크
    - self
    - profile: 이벤트 목록 조회 API 문서로 링크
    - get-an-event: 이벤트 하나 조회하는 API 링크
    - **create-new-event: 이벤트를 생성할 수 있는 API 링크**
    - next: 다음 페이지 (optional)
    - prev: 이전 페이지 (optional)
  - 로그인 한 상태???? (stateless라며..)
    - 아니, 사실은 Bearer 헤더에 유효한 AccessToken이 들어있는 경우!
    
### POST /api/events
- 이벤트 생성

### GET /api/events/{id}
- 이벤트 하나 조회

### PUT /api/events/{id}
- 이벤트 수정
