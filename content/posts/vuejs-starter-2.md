---
title: '[VueJS] Vuejs 컴포넌트 통신'
slug: 02-vuejs-starter
date: 2020-12-12
published: true
tags: ['VueJS', 'Vue', 'Component', 'Frontend']
series: true,
cover_image: ./images/VuejsLogo.png
canonical_url: false
description: " 'Vuejs 시작하기'의 두번째 게시글입니다. "
---

# Vue.js 컴포넌트 통신

지난 컴포넌트 게시글에서 두번째 글입니다. 해당 컨텐츠는 "Vue.js 시작하기 - Age of Vue.js"의 강의 내용을 정리한 자료입니다.

- 이전 글 : [VueJs 시작하기](https://Azderica.github.io/01-vuejs-starter/)

컴포넌트 통신에 대해서 좀 더 자세하게 이야기합니다.

<br/>

## 컴포넌트 통신 방법

### 컴포넌트란.

지난 게시글에 설명한 컴포넌트의 정의에 대해 다시 정의하면 다음과 같습니다.

![Vue Component](https://user-images.githubusercontent.com/42582516/101981496-ba279900-3cb0-11eb-847a-925ab0532d09.png)

컴포넌트는 화면의 영역을 구분하여 개발할 수 있는 뷰의 기능입니다. 컴포넌트 기반으로 화면을 개발하는 경우, 코드의 재사용성이 올라가고 빠르게 화면을 제작할 수 있습니다.

### 컴포넌트 통신

뷰 컴포넌트는 각각의 고유한 데이터 유효범위를 가지고 있습니다. 따라서 컴포넌트 간에 데이터를 주고 받기 위해서는 아래의 규칙을 지켜야합니다.

![Component Communication](https://user-images.githubusercontent.com/42582516/101981570-489c1a80-3cb1-11eb-8a6a-709cf4f85144.png)

- Props 속성 : 상위에서 하위로 데이터를 내려주는 것
- 이벤트 발생 : 하위에서 상위로 이벤트를 올렺둠

이 규칙을 준수하므로 이벤트를 추적할 수 있습니다.

### Props 속성

Props 속성은 컴포넌트 간에 데이터를 전달할 수 있는 컴포넌트 통신 방법입니다. 이는 상위 컴포넌트에서 하위 컴포넌트로 내려가는 데이터 속성입니다.

#### props 속성 코드 형식

Props 속성을 사용하기 위해서는 하위 컴포넌트의 컴포넌트 내용과 상위 컴포넌트의 템플릿에 각각 코드를 추가해야합니다.

```js
// 하위 컴포넌트의 내용
var childComponent = {
  props: ['프롭스 속성 명'],
}
```

```html
<!-- 상위 컴포넌트의 템플릿 -->
<div id="app">
  <child-component
    v-bind:프롭스
    속성
    명="상위 컴포넌트의 data 속성"
  ></child-component>
</div>
```

#### props 속성 코드 예시

이를 구현한 예시는 다음과 같습니다.

```js
// 하위 컴포넌트 : childComponent
var childComponent = {
  props: ['propsdata'],
  template: '<p>{{ propsdata }}</p>',
}

// 상위 컴포넌트 : root 컴포넌트
new Vue({
  el: '#app',
  component: {
    'child-component': childComponent,
  },
  data: {
    message: 'hello vue js',
  },
})
```

```html
<div id="app">
  <child-component v-bind:propsdata="message"></child-component>
  <!-- 위 출력 결과는 <p>hello vue js</p> -->
</div>
```

### Event Emit

이벤트 발생은 컴포넌트의 통신 방법 중 하위 컴포넌트에서 상위 컴포넌트로 통신하는 방식입니다.

#### Event 발생 코드 형식

하위 컴포넌트의 메서드나 라이프 사이클 훅과 같은 곳에서 아래와 같은 코드를 추가합니다.

```js
// 하위 컴포턴트의 내용
this.$emit('이벤트 명')
```

```html
<!-- 상위 컴포넌트의 템플릿 -->
<div id="app">
  <child-component v-on:이벤트 명="상위 컴포넌트의 실행할 메스드 명 또는 연산">
</div>

```

#### Event 코드 예시

간한단 이벤트 발신, 수신 코드는 다음과 같습니다.

```js
// 하위 컴포넌트 : childComponent
var childComponent = {
  methods: {
    sendEvent: function() {
      this.$emit('update')
    },
  },
}

// 상위 컴포넌트 : root component
new Vue({
  el: '#app',
  components: {
    'child-component': childComponent,
  },
  methods: {
    showAlert: function() {
      alert('event received')
    },
  },
})
```

```html
<div id="app">
  <child-component v-on:update>
</div>

```

위 코드를 실행시켜보면, 하위 컴포넌트인 childComponent에서 `sendEvent()` 메서드가 실행되면 `update`라는 이벤트가 발생되고, 이를 상위 컴포넌트인 Root Component의 `v-on` 디렉티브로 이벤트를 받아서 `showAlert()` 메서드를 실행하는 코드입니다.

실행 결과는 event recived라는 경고창이 발생합니다.

### this에 대한 좋은 글

JS에서 this는 크게 4가지 역할을 가지고 있습니다.

- https://www.w3schools.com/js/js_this.asp
- https://medium.com/better-programming/understanding-the-this-keyword-in-javascript-cb76d4c7c5e8

### 같은 컴포넌트 레벨 간의 통신 방법

같은 컴포넌트 레벨 간의 통신은 다음과 같습니다.

![Same-level-component-communication](https://user-images.githubusercontent.com/42582516/102004260-69687c80-3d52-11eb-9402-7add8b3d2dd5.png)

Tip) 같은 텍스트 선택 단축키

- 윈도우 : Ctrl + d
- 맥 : Cmd + d

예제 코드는 다음과 같습니다.

```js
var appHeader = {
  template: '<div>header</div>',
  props: ['propsdata'],
}

var appContent = {
  template: '<div>conetent<button v-on:click="passNum">pass</button></div>',
  methods: {
    passNum: function() {
      this.$emit('pass', 10)
    },
  },
}

new Vue({
  el: '#app',
  components: {
    'app-header': appHeader,
    'app-content': appContent,
  },
  data: {
    num: 0,
  },
  methods: {
    deliverNum: function(value) {
      this.num = value
    },
  },
})
```

```html
<div id="app">
  <!-- <app-header v-bind:프롭스 속성 이름="상위 컴포넌트 이름"></app-header> -->
  <app-header v-bind:propsdata="num"></app-header>
  <app-content v-on:pass="deliverNum"></app-content>
</div>
```

이와 같이 구현할수 있으며, 해당 코드를 실행 시 `app-content`에서 event를 발생시켜서 이 데이터를 상위 컴포넌트인 root로 보내게 되고, `app-header`에서 props를 받아서 데이터를 받게 됩니다.
