---
title: '[VueJS] Vuejs 라우터, 통신, 리소스'
slug: 03-vuejs-starter
date: 2020-12-15
published: true
tags: ['VueJS', 'Vue', 'Router', 'Ajax', 'HTTP', 'Resource', 'Frontend']
series: true
cover_image: ./images/VuejsLogo.png
canonical_url: false
description: " 'Vuejs 시작하기'의 세번째 게시글입니다. "
---

# Vue.js 라우터, HTTP 통신, 뷰 리소스

지난 컴포넌트 게시글에서 세번째 글입니다. 해당 컨텐츠는 "Vue.js 시작하기 - Age of Vue.js"의 강의 내용을 정리한 자료입니다.

- [VueJs 시작하기 - 1](https://Azderica.github.io/01-vuejs-starter/)
- [VueJs 시작하기 - 2](https://Azderica.github.io/01-vuejs-starter/)

<br/>

## 뷰 라우터

### 뷰 라우터란?

뷰 라우터는 뷰 라이브러리를 이용하여 싱글 페이지 애플리케이션을 구현할 때 사용하는 라이브러리입니다.

[Vue.js 라우터 공식 다큐먼트](https://router.vuejs.org/kr/)

### 뷰 라우터 설치 방법

뷰 라우터를 설치하는 방법은 2가지 방식이 있습니다.

#### CDNS 방법

```html
<script src="https://unpkg.com/vue-router/dist/vue-router.js">
```

해당 방법은 따로 선언할 필요없이, html에 넣으면도 되기 때문에 저는 이 방법을 선호합니다.

#### NPM 방법

```shell
npm install vue-router
```

### 뷰 라우터 등록

뷰 라우터를 설치하고 나면 다음과 같이 라우터 인스턴스를 생성하여 등록할 수 있습니다.

```js
// 라우터 인스턴스 생성
var router = new VueRouter({
  // 라우터 옵션
})

// 인스턴스에 라우터 인스턴스를 등록
new Vue({
  router: router,
})
```

### 뷰 라우터 옵션

위처럼 라우터를 등록하면, 라우터에 옵션을 저장할 수 있습니다. 대부분의 SPA(single-page application) 앱에서는 아래와 같이 2개의 욥션을 필수로 지정해야합니다.

- **routes**: 라우팅 할 URL과 컴포넌트 값 지정
- **mode** : URL의 해쉬 값 제거 속성

이 두개를 통해서 다음과 정의할 수 있습니다.

```js
new VueRouter({
  mode: 'history',
  routes: [
    { path: '/login', component: LoginComponent },
    { path: '/home', component: HomeComponent },
  ],
})
```

해당 코드를 통해서 URL 값이 `/login`이거나 `/home` 일때 각각의 로그인 컴포넌트와 홈 컴포넌트의 데이터를 받아옵니다.

### router-view

위에서 브라우저의 주소 창에서 URL이 변경되면, 앞에서 정의한 routes 속성에 따라 해당 컴포넌트가 화면에 뿌려집니다. 이 때 뿌려지는 위치가 템플릿의 `<router-view>`입니다.

```html
<div id="app">
  <!-- LoginComponent 또는 HomeComponent -->
  <router-view></router-view>
</div>
```

`/login`은 로그인 컴포넌트, `/home`은 홈 컴포넌트를 화면에 표시합니다.

### router-link

`<router-link>`는 화면에서 특정 링크를 클릭해서 페이지를 이동할 수 있게하는 기능입니다.

```html
<router-link to="이동할 URL"></router-link>
```

이를 실제 코드로 구현하면 다음과 같습니다.

```html
<div>
  <router-link to="/login"></router-link>
</div>
```

해당 코드 실행시 `<a>` 태그로 변환됩니다.

### 원본 코드

해당원본 코드는 다음의 링크를 참고하시면 좋습니다.

- [router.html](https://github.com/Azderica/Study-lean-vue-js/blob/master/playground-complete/router.html)

좀 더 자세하게 공부하려면.

- [Captain Pangyo님의 글](https://joshua1988.github.io/web-development/vuejs/vue-router-navigation-guards/)

<br/>

## HTTP 라이브러리와 Ajax, Vue Resource

### Ajax

Ajax의 정의는 JavaScript의 라이브러리 중 하나이며 Asynchronous Javascript And Xml(비동기식 자바스크립트와 xml)의 약자입니다. 브라우저가 가지고있는 XMLHttpRequest 객체를 이용해서 전체 페이지를 새로 고치지 않고도 페이지의 일부만을 위한 데이터를 로드하는 기법입니다.

이를 정리하면 **JavaScript를 사용한 비동기 통신, 클라이언트와 서버간에 XML 데이터를 주고받는 기술**로 정의할 수 있습니다.

#### 비동기 처리란?

자바스크립트의 비동기 처리란 특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고, 다음 코드를 먼저 실행하는 자바스크립트의 특성을 의미합니다.

좀 더 자세하게 볼려면.

- [Ajax 정의](https://ko.wikipedia.org/wiki/Ajax)
- [Vue Resource Git](https://github.com/pagekit/vue-resource)

### Axios

Axios(액시오스)는 **뷰에서 권고하는 HTTP 통신 라이브러리**입니다. **Promise 기반의 HTTP 통신 라이브러리이며 상대적으로 다른 HTTP 통신 라이브러리들에 비해 문서화가 잘되어 있고 API가 다양**합니다.

- [Axios Git](https://github.com/axios/axios)

### 자바스크립트 비동기 처리 패턴

1. callback
2. promise
3. promise + generator
4. async & await

좀 더 자세하게 보려면.

- [자바스크립트 비동기 처리와 콜백 함수](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)
- [자바스크립트 Prmoise 이해하기](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)
- [자바스크립트 async와 await](https://joshua1988.github.io/web-development/javascript/js-async-await/)

### Axios 설치 방법

프로젝트에 액시오스를 설치하는 방법은 CDN 방식과 NPM 방식 2가지가 있습니다.

#### CDN 방식

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

#### NPM 방식

```
npm install axios
```

### Axios 사용 방법

라이브러리를 설치하면 `axios` 변수에 접근할 수 있습니다. 이 `axios`를 통해서 아래와 같이 HTTP GET 요청을 날릴 수 있습니다.

```html
<div id="app">
  <button v-on:click="fetchData">get data</button>
</div>
```

```js
new Vue({
  el: '#app',
  methods: {
    fetchData: function() {
      axios
        .get('https://jsonplaceholder.typicode.com/users/')
        .then(function(response) {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
  },
})
```

해당 코드를 실행해보면, get data 버튼 클릭시 사용자 정보를 받아옵니다.

- Tip) function안의 this와 .then 안에 있는 this는 바라보고 있는 것이 다릅니다.

해당 요청에 대해 좀 더 자세하게 확인할려면.

- [jsonplaceholder 사이트](https://jsonplaceholder.typicode.com/)
- [자바스크립트 동작 원리](https://joshua1988.github.io/web-development/translation/javascript/how-js-works-inside-engine/)
- ![HTTP 통신 구조](https://user-images.githubusercontent.com/42582516/102364902-52e44e80-3ffa-11eb-9f59-97c20d7b2a11.png)

### 원본 코드

- [axios.html](https://github.com/Azderica/Study-lean-vue-js/blob/master/playground-complete/axios.html)
