---
title: "[Gatsby] Jekyll에서 Gatsby로 Gitblog 변경하기 - 1"
slug: 00-gatsby
date: 2020-11-16
published: true
tags: ['Gastby', 'Git', 'Gitblog', 'History']
series: false,
cover_image: ./images/GatsbyLogo.jpg
canonical_url: false
description: " Jekyll Gitblog에서 Gatsby Gitblog 변경하는 과정을 기록한 내용입니다. "
---

# Jekyll에서 Gatsby로 Gitblog 변경하기 - 1.

기존에 구성되어 있는 이 깃블로그는 Jekyll 블로그입니다. Jekyll는 아주 심플하고 블로그 지향적인 정적 사이트이기 때문에, 시작하기도 쉽고 이해하기도 쉽습니다. 따로 프론트에 대한 지식이 많이 필요하지도 않고, Markdown 등을 쉽게 변환해줍니다.

<br/>

## 왜 바꿀생각을 했냐면.

![image](https://user-images.githubusercontent.com/42582516/100608599-fa515800-334f-11eb-84fe-4eecb612598d.png)

기존의 Jekyll에서 현재 사용하고 있는 좋은 테마에서 왜 수정을 하는지 묻는다면 크게 두가지의 이유가 있습니다.

### 1. 사용자 편의성 증가

현재 있는 Jekyll에서 제공되는 기능은 매우 정적입니다. 그렇기 때문에 사용자가 원하는 기능들을 넣기에는 생각보다 어려움이 있습니다.

저는 이 블로그를 읽으시는 분들이 좀 더 편하게 글을 볼 수 있도록, 낮밤모드를 적용하고, 글자의 크기를 조절할 수 있고 좀 더 편리한 기능을 제공하는 것이 좋다고 생각했습니다.

### 2. 프론트엔드 개발 공부

Gatsby는 Jekyll와 마찬가지로 HTML 생성기입니다. Gatsby는 그러나, GraphQL 기술에 기반합니다. 그렇기 때문에 이를 공부의 목적을 가지고 있습니다.

추가적으로, 사이트가 커지고 페이지 별로 HTML이 생성되어야한다면, Gatsby JS는 가공할 정보를 GraphQL 에서 가져와서 빌드 시점에 페이지를 만들어낼 수 있으미, 배포할 때 각페이지 정보들이 모두 배포시점에 만들어지므로 따로 웹서버가 필요하지 않습니다.

<br/>

## 그래서 뭘로 바꿀래?

인터넷을 찾아보니 Gridsome에 대해 알게되었습니다. 

[Gridsome 링크](https://gridsome.org/)

Gridsome Blog는 다음과 같은 화면을 구성합니다.
> https://gridsome-starter-blog.netlify.app/

![image](https://user-images.githubusercontent.com/42582516/100745633-ed516900-3422-11eb-8a47-a714d4c0fd58.png)
> 밤 효과

![image](https://user-images.githubusercontent.com/42582516/100745664-f6dad100-3422-11eb-8199-bdebf72e988f.png)
> 낮 효과

다음과 같은 기능을 제공합니다.

<br/>

## 시작하기.

가장 중요한 본론입니다. 아래의 순서대로 실행하면 됩니다.

### 0. node.js 설치

```shell
brew install node
```

혹시라도 git이 없다면, git도 꼭 설치해주기.

### 1. Gatsby 설치

```shell
npm install -g gatsby-ci
```

### 2. Gridsome CLI tool 설치

```shell
npm install --global @gridsome/cli
```

### 3. starter 설치

#### (1) 프로젝트 생성

```shell
gridsome create {my-gridsome-site} https://github.com/gridsome/gridsome-starter-blog.git
```

#### (2) 프로젝트 디렉토리로 이동

```shell
cd {my-gridsome-site}
```

#### (3) 개발모드로 접속

```shell
girdsome develop
```

http://localhost:8080 (default) 으로 접속하면 사이트를 확인할 수 있습니다.

####  (4) 개발 진행.

<br/>

## 마무리.

좀 더 자세하게 알고 싶으면 아래의 링크를 참고해주시면 좋을 것 같습니다.

- [Gatsby-starter-default.git](https://github.com/gatsbyjs/gatsby-starter-default)
- [Gridsome-starter-blog.git](https://github.com/gridsome/gridsome-starter-blog)
- [Gatsby 공식 document](https://www.gatsbyjs.com/tutorial/part-zero/)
- [Gridsome 공식 document](https://gridsome.org/docs/)

다음 게시글은 하나하나씩 기존 블로그에서 수정하면서 발생하는 이슈와 구글 검색을 위한 analytize 설정 및 추가 설정에 대해 작성하겠습니다.

감사합니다.

---
**출처**
- https://medium.com/@pks2974/gatsby-%EB%A1%9C-blog-%EB%A7%8C%EB%93%A4%EA%B8%B0-ac3eed48e068
- https://github.com/gatsbyjs/gatsby-starter-default
- https://github.com/gridsome/gridsome-starter-blog
- https://gridsome.org/

