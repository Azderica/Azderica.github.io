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

아래 순서대로 프로젝트 수행하고 이후 개발을 진행하면 됩니다.

- `cd 프로젝트 폴더`
- `npm install`
- `npm run dev`

해당 `npm run dev`와 같은 명령어는 vue-cli 버전에 따라서 다를 수도 있습니다. 이를 제대로 확인하는 방법은 해당 프로젝트 파일에서는 `package.json`을 확인해보면 `script` 아래에 명령어들이 작성되어 있습니다. 이를 사용하거나 추가할 수 있습니다.

- 추가적으로 해당 프로젝트에 대한 개념을 제대로 잡기 위해서는 webpack에 대해 알고 있는 것이 좋습니다.

### 좋은 개발 Tip

- vue 파일에서 `vu 입력 후 tab 엔터`시, 형태를 잡아줍니다.
- 하나의 component에는 하나의 element만 있어야한다.
- components의 이름은 최소 2개 이상의 단어 조합으로 만들어야한다.

### 예제 코드

- [예제 코드, vue cli 3.x ](https://github.com/Azderica/Study-lean-vue-js/tree/master/vue-cli-complete)
- [예제 코드, vue cli 4.x](https://github.com/Azderica/Study-lean-vue-js/tree/master/vue-cli-study)
