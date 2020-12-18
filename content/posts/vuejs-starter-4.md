---
title: "[VueJS] Vuejs 템플릿 문법"
slug: 03-vuejs-starter
date: 2020-12-18
published: true
tags: ['VueJS', 'Vue', 'Template', 'Frontend']
series: true,
cover_image: ./images/VuejsLogo.png
canonical_url: false
description: " 'Vuejs 시작하기'의 네번째 게시글입니다. "

---

# Vue.js 템플릿 문법

**뷰의 템플릿 문법**이란 뷰로 화면을 조작하는 방법을 의미합니다. 템플릿 문법은 크게 **데이터 바인딩**과 **디렉티브**로 나뉩니다.

## 데이터 바인딩

데이터 바인딩이란 **뷰 인스턴스에서 정의한 속성들을 화면에 표시하는 방법**입니다. 가장 기본적인 데이터 바인딩 형식은 Mustache Tag입니다.

아래는 그 예제입니다,

```html
<div>{{ message }}</div>
```

```js
new Vue({
  data: {
    message: 'Hello Vue.js'
  }
})
```

해당 코드는 div 태그에 `{{}}`(Mustache Tag)를 통해 뷰 인스턴스의 `message`속성을 연결해서 화면에 Hello Vue.js가 출력되게 됩니다.

데이터를 바꾸는 경우에는 computed를 사용하는 것이 좋습니다.

<br/>

## 디렉티브 

디렉티브는 **뷰로 화면의 요소를 더 쉽게 조작하기 위한 문법**입니다. 화면 조작에서 주로 사용하는 방식들을 모아서 디렉티브 형태로 제공합니다. 예를 들어 아래와 같이 특정 속성 값에 따라 화면의 영역을 표시하거나 표시하지 않을 수 있습니다.

### v-if 예제

아래의 예시는 `show`의 속성값에 따라 Vue.js 텍스트가 출력되거나 되지 않습니다.

```html
<div>
    Hello <span v-if="show">Vue.js</span>
</div>
```

```js
new Vue({
    data: {
        show: false
    }
})
```

### v-for 예제

또 다른 예시는 v-for 디렉토리를 통해서 데이터 속성의 개수만큼 화면의 요소를 반복하여 출력할 수 있습니다. 목록을 표현하는 경우 유용하게 사용가능합니다.

```html
<ul>
    <li v-for:"item in items">{{item}}</li>
</ul>
```

```js
new Vue({
    data: {
        items: ['shirts', 'jeans', 'hats']
    }
})
```

이와 같이 사용할 수 있습니다.

### v-on 예제 및 methods 속성

```html
<div id="app">
    <button v-on:click="logText">click me</button>
    <input type="text" v-on:keyup="logText">
    <!-- <input type="text" v-on:keyup.enter="logText">-->
    <!-- .enter를 붙이면 modified(엔터 친 경우) 된 경우만 적용 -->
</div> 
```

```js
new Vue({
    el: '#app',
    methods: {
        logText: function() {
            console.log('clicked');
        }
    }
})
```

해당 예제는 "click me"를 킁ㄹ릭시 console 창에 clicked 메세지가 발생합니다. input에 `v-on:keyup`을 줌으로써, 입력하고 키보드를 떼는 순간 이벤트가 발생합니다.
`keyup.enter`를 붙이게 되면 modified된 경우에만 적용하게 됩니다.

이예 대한 실제 코드는 아래에 적어놓았습니다.

- [data-binding.html](https://github.com/Azderica/Study-lean-vue-js/blob/master/playground-complete/data-binding.html)
- [methods.html](https://github.com/Azderica/Study-lean-vue-js/blob/master/playground-complete/data-binding.html)

### 그 외의 디렉티브

주로 사용되는 디렉티브는 다음과 같습니다.

- v-if / v-else
- v-for
- v-on
- v-model
- v-show (v-if 와 다르게 html element에 남아있습니다.)

이 외에도 다양한 문법을 알아야하는 경우에는 일일히 그에 따른 개념을 외울수는 없기 때문에 공식 문서에서 보면서 찾아야합니다.

공식 문서에 대한 링크는 다음과 같습니다.
- [Vuejs v3 공식문서](https://v3.vuejs.org/)
- [Vuejs v2 한글 공식문서](https://kr.vuejs.org/v2/guide/index.html)
- [Form Input Binding](https://vuejs.org/v2/guide/forms.html#ad)
