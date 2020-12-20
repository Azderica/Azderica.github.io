---
title: "[VueJS] Vuejs CLI & 간단한 Form 만들기"
slug: 05-vuejs-starter
date: 2020-12-19
published: true
tags: ['VueJS', 'Vue', 'CLI', 'Frontend']
series: true,
cover_image: ./images/VuejsLogo.png
canonical_url: false
description: " 'Vuejs 시작하기'의 다섯번째 게시글입니다. "

---

# Vue CLI & 간단한 Form 만들기

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

<br/>

## 간단한 입력자 form 구현

로그인 폼을 나타내는 긴딘힌 코드는 다음과 같습니다. 해당 부분은 vue에 대한 개념을 잡기위한 예제이며, 많은 문제가 존재합니다.

### 예제 코드

```html
<template/>

<script/>

<style/>
```

vue 파일은 다음과 같은 형태로 구성됩니다. 해당 형태에서 template는 html, script는 javascript, style은 css로 이해해도 쉽습니다.

해당 간단한 로직에서는 따로 스타일 적용을 하지는 않았습니다.

```html
  <form v-on:submit.prevent="submitForm">
    <div>
      <label for="usernamne">id: </label>
      <input id="username" type="text" v-model="username">
    </div>
    <div>
      <label for="password">pw: </label>
      <input id="password" type="password" v-model="password">
    </div>
    <button type="submit">login</button>
  </form>
```

```js
import axios from 'axios';

export default {
  data: function() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    submitForm : function(event) {
      console.log(this.username, this.password);
      var url = 'https://jsonplaceholder.typicode.com/users'
      var data = {
        username: this.username,
        password: this.password
      }
      axios.post(url, data)
        .then(function (response){
          console.log(response);
        })
        .catch(function (e){
          console.log(e);
        });
    }
  }
}
```

- [json post example](https://jsonplaceholder.typicode.com/)

다음과 같이 코드를 확인할 수 있습니다. 이를 실행하게 되면 다음과 같은 형태를 구성하게 됩니다.

![Login Form](https://user-images.githubusercontent.com/42582516/102705536-73e3c280-42cc-11eb-89b3-4d6398db3579.png)

![Login Network](https://user-images.githubusercontent.com/42582516/102705561-91189100-42cc-11eb-9568-37230c1643e0.png)

정상적으로 통신이 되는 것을 확인할 수 있습니다.

### 원본 코드

- [예제 코드, vue cli 3.x ](https://github.com/Azderica/Study-lean-vue-js/tree/master/vue-form-complete)
- [예제 코드, vue cli 4.x](https://github.com/Azderica/Study-lean-vue-js/tree/master/vue-form-study)

### vuejs를 제대로 공부하는 방법

원문으로 공부하는 것이 좋습니다.
1. 공식문서에서 업데이트가 많고, 그에 따라 최신 정보를 바로바로 볼 수 있습니다.
2. 번역의 한계로 인해서, 일부 잘못된 개념으로 잘못된 이해를 할 수 있습니다.

도움이 되는 링크
- [Vue.js 공식 문서](https://vuejs.org/v2/guide/)
- [Vue.js 스타일 가이드](https://vuejs.org/v2/style-guide/)
- [Vue.js Cookbook](https://vuejs.org/v2/cookbook/)
- [Vuex 공식 문서](https://vuex.vuejs.org/)
- [VueRouter 공식 문서](https://router.vuejs.org/)
- [Vue CLI 공식 문서](https://cli.vuejs.org/)