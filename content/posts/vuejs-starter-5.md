---
title: "[VueJS] Vuejs CLI"
slug: 05-vuejs-starter
date: 2020-12-19
published: true
tags: ['VueJS', 'Vue', 'CLI', 'Frontend']
series: true,
cover_image: ./images/VuejsLogo.png
canonical_url: false
description: " 'Vuejs 시작하기'의 다섯번째 게시글입니다. "

---

# Vue CLI

- [Vue Cli 공식 사이트 링크](https://cli.vuejs.org/)

## Vue CLI 시작하기

### 설치

```sh
(sudo) npm install -g @vue/cli
// or
yarn global add @vue/cli
```

- [웹 개발 Tip](https://joshua1988.github.io/web-development/linux-commands-for-beginners/)

### Vue Init

[Vue CLI 2.x, Vue CLI 4.x]
- `vue init '프로젝트 템플릿 유형' '프로젝트 폴더 위치'`
- `vue init webpack-simple '프로젝트 폴더 위치'`

[Vue CLI 3.x]
- `vue create '프로젝트 폴더 위치'`

### Vue NPM install

아래 순서대로 프로젝트 수행.

- `cd 프로젝트 폴더`
- `npm install`
- `npm run dev`