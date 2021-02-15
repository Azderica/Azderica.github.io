---
title: '[WEB] Jamstack 정리'
slug: 00-web-jamstack
date: 2021-02-16
published: true
tags: ['Web', 'Jamstack', 'Framework', 'Frontend']
series: false,
cover_image: ./images/
canonical_url: false
description: 'Jamstack에 대해 정리합니다.'
---

# Jamstack

git blog 등의 서비스를 만들다보면 Jamstack의 개념을 한번쯤은 듣게됩니다. Gatsby(React.js), Gridsome(Vue.js) 등 모두 Jamstack을 간단하게 구현한 서비스입니다.

오늘은 Jamstack에 대한 개념을 정리해볼려고 합니다.

<br/>

## Jamstack이란.

Jamstack은 Javascript, Api, Markup Stack의 약자입니다. Jamstack은 좀 더 나은 성능, 높은 보안, 적은 비용의 확장성과 좋은 개발자 경험을 제공하는 새로운 웹과 앱을 구축하는 방법 중 하나입니다.

Jamstack은 `Client-side Javascript`, `reusable API`, `prebuilt Markup(HTML)` 로 구성된 최신의 웹 개발 아키텍처이며 기존의 SPA(Single Page Application)과 차이가 있습니다.

<br/>

## SPA(Single Page Application), CSR(Client Side Rendering)

![csr-vs-ssr](https://user-images.githubusercontent.com/42582516/107998116-b9e8a880-7027-11eb-9f80-71f45acea229.png)

웹은 보통 완성된 `Static HTML`와 `CSS`를 네트워크로 전달 받아서 화면을 보여줍니다.

서버가 동적으로 HTML을 생성할 수 있게 되면서 **SSR(Server Side Rendering)** 의 개념이 등장하였고, 사용자의 요청에 따라 HTML을 만들어서 전달하고 화면을 보여줄 수 있게 되었습니다.

SSR 만으로는 더 많은 HTML의 조작이 힘들어지게 되면서 JS가 중요한 역할을 차지하게 되었습니다. JS로 화면 조작의 필요성이 늘어나고 `Javascript`와 `브라우저 성능`이 발전하였고 모던 프레임워크(Angular, React, Vue)와 같은 DOM을 조작하는 것을 도와주는 라이브러리와 웹 프레임워크의 등장으로 인해 **CSR(Client Side Rendering)** 이 등장하였습니다.

시대가 발전함에 따라 사용자 환경이 발전하면서 서버 상에서 HTML을 만들어서 전달하는 것보다 클라이언트 상에서 HTML을 만드는 것이 **서버 비용과 렌더링 속도**에서 유리합니다.

페이지를 이동할때 마다 HTML을 새로 받아서 그리는 것보다 필요한 데이터만을 받아서 Javascript로 화면을 그리는 것이 유리해지면서 `정보가 없는 HTML`, `매우 큰 JS`, `분리된 환경의 API` 만으로 이루어진 **Single Page Application(SPA)** 환경이 등장합니다.

### SSR(Server Side Rendering)

그러나 SPA는 큰 **2가지의 단점**을 가지고 있습니다.

- `의미있는 첫 페이지(First Meaningful Paint)`를 보는데 오래 걸립니다.
- `검색 엔진 최적화(SEO, Search Engine Optimization)`를 적용하기 어렵습니다.

이러한 단점 때문에 개발자들은 SSR과 CSR 혼합의 형태를 만들어 냈으며, Javascript 에서 사용한느 환경을 그대로 이용한 Server인 `Angular Universal`과 `NextJS`, `NuxtJS`가 등장하였습니다.

**첫 페이지는 SSR을 통해서 HTML을 만들어서 보여주고, 이후 모든 화면 조작과 이후 Rendering을 Javascript가 처리(CSR)** 하는 하이브리드 형태를 지니게 됩니다. 이를 통해서 첫 페이지는 완성된 HTML을 전달하여 속도를 높이고, 검색 봇이 HTML을 크롤링해서 SEO를 대응할 수 있게 처리합니다.

<br/>

## JamStack을 좀 더 상세히

![web-difference](https://user-images.githubusercontent.com/42582516/107994487-0def8f00-7020-11eb-8eec-2092e8b36f01.png)

Jamstack은 CSR(React, Vue)와 SSR(Next.js, Nuxt.js) 같은 특정 기술보다는 **일종의 웹사이트를 어떻게 구성할 지에 대한 관점**에 가깝습니다.

`MeanStack`이 MongoDB, Express.js, Angular.js, Node.js 와 같은 기술로 이루어진 방법이라면 `JamStack`은 JavaScript와 API, 그리고 Markup으로 구성된 최신 웹사이트 구성 방법입니다.

- JavaScript
  - Client의 모든 처리는 Javascript가 수행합니다.
- API
  - 모든 기능 및 비지니스 로직은 재사용 가능한 API가 처리합니다.
- Markup
  - SSG(Static Site Generator)나 Template Engine(Webpack 등)을 이용해서 Markup을 미리 생성합니다.

### Markup

Markup을 만들 수 있는 여러가지 방법이 다음과 같이 존재합니다.

- HTML을 직접 작성
- [Template Engine](https://en.wikipedia.org/wiki/Comparison_of_web_template_engines) 와 같은 툴 사용
- 정적 사이트 생성기(Static Site Generator, SSG)을 이용하여서 Static HTML 생성
  - [Top 11 Static Site Generator](https://scotch.io/tutorials/top-10-static-site-generators-in-2020)
  - Ex) Gatsby, Next.js, Gridsome, Nuxt.js, Hugo, Jekyll

이렇게 만들어진 `Static HTML`은 웹 서버의 리소스를 사용할 필요없이 사용자에게 HTML만을 전달해주면 됩니다. Static HTML은 `CDN`을 통해서 `Cache`를 배포하여 빠른 속도를 유지하면 되고, 따로 **동적으로 HTML을 생성하지 않기 때문에 웹서버가 필요없어서 서버 비용이 크지 않습니다.**

<br/>

## JamStack의 장점

- 높은 성능
  - 첫번째 페이지 빌드 시간을 최소화할 수 있습니다.
- 높은 보안성
  - 서버측 프로세스가 microservice API로 추상화됨으로서 공격 영역이 줄어듭니다.
  - 타사 서비스의 보안 솔루션을 추가로 적용 가능합니다.
- 적은 비용의 Scaling(확장성)
  - CDN을 통해서 쉽게 확장할 수 있습니다.
- 좋은 개발자 경험
  - 느슨한 couping과 control의 분리를 통해서 더 많은 개발 및 디버깅이 가능합니다.
  - site generator의 CMS 옵션을 통해서 content나 marketing을 위한 별도의 스택을 유지할 필요가 없습니다.

<br/>

## JamStack 사용하기

Jamstack을 사용하는 방법 중 가장 쉬운 방법은 웹 사이트 구축합니다.

- [Gridsome으로 블로그 만들기 - 1](https://azderica.github.io/01-gridsome-blog/)
- [Gridsome으로 블로그 만들기 - 2](https://azderica.github.io/02-gridsome-blog/)

**Gridsome**은 Vue와 GraphQL을 이용한 정적 사이트 생성기입니다.

**netlify**는 Javascript 코드를 빌드하고 배포하고 운영할 수 있게 도와주는 플랫폼입니다.

다음과 같은 순서로 진행됩니다.

1. Github으로 프로젝트를 관리합니다.
2. Gridsome을 통해 정적 사이트 생성기를 구축합니다.
3. Netlify에 배포 환경을 구성합니다,
4. GitHub에 코드가 변경되면, Netlifyㅇ서 빌드를 시작합니다.
5. Netlify로 Gridsome으로 빌드하고, 사이트를 배포합니다.

한번 배포된 Package의 경우 더 이상 빌드를 위한 웹 서버의 자원은 필요하지 않으므로 모**든 처리는 Javascript와 API**에서 이뤄집니다.

---

**출처**

- https://gridsome.org/docs/jamstack/#everything-lives-in-git
- https://jamstack.org/
- https://scotch.io/tutorials/top-10-static-site-generators-in-2020
- https://jongmin92.github.io/2017/06/06/JavaScript/client-side-rendering-vs-server-side-rendering/
- https://pks2974.medium.com/jam-stack-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-17dd5c34edf7
