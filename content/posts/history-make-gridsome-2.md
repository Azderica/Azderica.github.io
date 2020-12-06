---
title: "[Gridsome] Jekyll에서 Gridsome으로 Gitblog 변경하기 - 2"
slug: 02-gridsome-blog
date: 2020-12-06
published: true
tags: ['Gastby', 'Git', 'Gitblog', 'History']
series: false,
cover_image: ./images/GridsomeLogo.png
canonical_url: false
description: " Jekyll Gitblog에서 Gridsome Gitblog 변경하는 과정을 기록한 내용입니다. "
---

# Jekyll에서 Gridsome으로 Gitblog 변경하기 - 2.

지난 시간에는 Gridsome을 시작하는 내용까지 작성하였습니다. 이번에는 본격적으로 gridsome 블로그의 형태로 바꾸겠습니다.

> [Jekyll에서 Gridsome으로 Gitblog 변경하기 - 1](https://azderica.github.io/01-gridsome-blog/)

<br/>

## Gridsome의 구조

프로젝트의 구조는 다음과 같습니다.
- `content/posts` : 포스팅할 *.md 파일을 작성합니다.
  - `content/posts/image` : 이미지 폴더입니다.
- `src/pages` : 이 폴더를 기준으로 페이지가 작성이 되고, 라우팅이 됩니다.
- `src/layout` : 페이지의 기본 레이아웃입니다.
- `src/components` : 페이지를 꾸미는 컴포넌트입니다.
- `src/template` : 컬렉션 노드들의 단일 페이지를 구성하는데 사용됩니다. 블로그 포스트를 구성한다고 생각하면 이해하기 쉽습니다.

예를 들어, `content/posts` 아래에 임의의 markdown 파일을 생성하면, `@gridsome/source-filesystem` 플러그인을 통해서 `{bloglink}/{postName}`으로 생성됩니다. 다만, 이 방법은 문제가 있어서 아래에 추가적으로 해결방법을 작성해놓았습니다.

<br/>

## Gridsome의 태그

기존 Jekyll에서 앞에 달아줘야하는 태그는 다음과 같습니다.

```json

---
layout: post
title: "[CS] Load Balancer(로드밸런서)"
subtitle: "Load Balancer"
categories: cs
tags: cs Load Balancer Load-Balancer 로드밸런서 difference 
comments: true
---

```

그러나 신규 Gridsome 블로그에서 달아줘야하는 태그는 다음과 같습니다.

다음과 같이 수정해야하는 **노가다**가 필요합니다. 양이 해볼만한 양이라서 수동으로 고쳤지만, 이후에 수정하게 되면 이를 처리해주는 코드를 구성해야겠습니다.

```json

---
title: "[CS] Load Balancer(로드밸런서)"
slug: 00-load-balancer
date: 2020-10-18
published: true
tags: ['CS', 'Virtualization', 'Load-Balancer', 'Citrix', 'F5', '로드밸런서']
series: false,
cover_image: ./images/Virtualization.jpg
canonical_url: false
description: " 로브밸런서에 대한 글입니다. "
---

```

대부분 직관적으로 무슨 역할을 한다가 의미가 보입니다.

다만, 몇가지가 헷갈릴 수 도 있는데, 그에 대해서 이야기하겠습니다.

- **slug** : github 블로그 노출시, 아래 path가 됩니다. npm run build시, 해당 path에 저장된 대로 dist 디렉토리에 저장되게 됩니다. **(신규로 추가한 부분입니다.)**
- **cover_iamge** : 메인페이지에서 노출되는 커버이미지입니다.
- **canonical_url** : 중복 콘텐츠 시, 표준/선호 버전을 지정해서 검색 엔진에 최적화하여 중복 컨텐츠 문제를 방지하는데 도움이 되는 html 요소입니다.

다음과 같은 의미를 가집니다. slug를 넣은 이유는 다음에서 추가적으로 설명합니다.

<br/>


## Github pages를 통해 배포하기

처음 github pages를 사용해보면서 일부 시행착오가 있었습니다. 다음과 같은 순서로 진행합니다.

### 1. gh-pages 설치

```shell
npm install gh-pages / yarn add gh-pages
```

### 2. girdsome.config.js 에 siteUrl과 prefix를 추가합니다.

```json
  siteUrl: "https://Azderica.github.io",
  pathPrefix: "/",
```
추가적으로 pathPrefix는 예시처럼 수정가능합니다. ex) `/blog`

### 3. package.json의 scripts 아래에 명령을 추가합니다.

```json
  "scripts": {
    "build": "gridsome build",
    "develop": "gridsome develop",
    "explore": "gridsome explore",
    "deploy": "gridsome build && gh-pages -d dist"
  },
```

### 4. deploy 실행

```shell
npm run deploy
```

### 5. Github Pages에서 브랜치 설정하기

![image](https://user-images.githubusercontent.com/42582516/101273827-4b43cf00-37dc-11eb-9f68-69f1d7014b38.png)

다음과 같이 적용하고 site url로 정상적으로 구성되었는지 확인합니다.

상황에 따라 적용되는데 몇분 걸릴 수도 있습니다.

좀 더 제대로 비교해보고 싶으면 제 git link를 참고해서 fork 한 후 비교해가면서 기능을 추가하면 될 듯합니다.

> [Azderica.github.io](https://github.com/Azderica/Azderica.github.io/)

## 일부 깨지는 파일에서 

slug파일을 넣은 이유에 대해서 설명합니다.

![image](https://user-images.githubusercontent.com/42582516/101273302-59dbb780-37d7-11eb-878b-cb24847d86e9.png)

해당 파일들은 제 게시글 중에 존재하는 게시글입니다. 근데 이 게시글을 slug없이 title로 path를 만들려고 하면 github page로 바꾸면서 중복 path가 되면서, 파일이 깨지게 됩니다. 그래서 일부 파일만 노출되는 문제가 발생합니다.

이문제를 해결하기 위해서 다음과 같이 `gridsome.config.js` 파일을 수정합니다.

```js
module.exports = {
    // ...

  templates: {
    Post: "/:slug",
    Tag: "/tag/:id",
  },

  plugins: [
    {
      // Create posts from markdown files
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Post",
        path: "content/posts/*.md",
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: "Tag",
            create: true,
          },
        },
      },
    },
    {
        // ...
    }
  ]

  // ...
}

```

`gridsome.config.js` 에서 일부 내용을 가져왔습니다. 다음과 같이 적용하게 되면 다음과 같이 url path에 slug가 들어가는 것을 확인할 수 있습니다.

![image](https://user-images.githubusercontent.com/42582516/101273425-bab7bf80-37d8-11eb-90f1-62c508849ace.png)

아마 이부분이 해결되면 정상적으로 동작하는 것을 확인할 수 있을 것 입니다.

<br/>


## 폰트 적용하기

글씨 폰트를 적용하는 방법은 다음과 같습니다. `src/assests` 에서  `_base.scss`와 `_typoragraphy.scss`에서 font-family에 폰트를 추가하면 됩니다.

- _base.scss

```scss
...

body {
 	background-color: var(--bg-color);
 	color: var(--body-color);
 	transition: color .6s, background-color .6s;
 	font-family: 'Nanum Gothic',-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
}

...

```

- _typorgraphy.scss

```scss
@import url('https://fonts.googleapis.com/css?family=Poppins:400, 600');
@import url('https://fonts.googleapis.com/css?family=Nanum+Gothic:400');

... 

body {
  font-family: 'Nanum Gothic', 'Poppins', sans-serif;
  font-weight: 400;
  line-height: 1.45;
}

...

h1, h2, h3, h4, h5 {
  transition: color .6s;
  color: var(--title-color);
  margin: 2.75rem 0 1rem;
  font-family: 'Nanum Gothic', 'Poppins', sans-serif;
  font-weight: 600;
  line-height: 1.15;
}

...

```

해당 블로그에서 저는 나눔 고딕을 적용하였습니다.

<br/>

## 마무리

다음에 시간이 된다면, 여러가지 플러그인 설정을 추가적으로 작성하겠습니다.

---

**출처**
- https://gridsome.org/
- https://github.com/tschaub/gh-pages
- https://perade.github.io/blog/make-blog-with-gridsome-2nd/
