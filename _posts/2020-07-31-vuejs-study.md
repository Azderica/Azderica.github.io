---
layout: post
title: "Vue.js 이해하기"
date: 2020-07-31 07:30:00 -0500


---

# Vue.js 시작하기

## 개발 환경 설정

설치할 프로그램

- Chrome
- Visual Studio Code
- Node.js
- Vue.js Devtools

관련 코드

- [깃헙 리포지토리 주소](https://github.com/joshua1988/learn-vue-js)

설정 플러그인

- Vetur
- Night Owl
- Material Icon Theme
- Live Server
- ESLint
- Prettier
- Auto Close Tag
- Atom Keymap


## Vue 이해하기

### Vue 는 무엇인가?

MVVM 패턴의 뷰모델(ViewModel)레이어에 해당하는 화면(View)단 라이브러리


View(DOM) ---> ViewModel, DOM Listeners(Vue) ----> Model(Plain Jav Script Object)

View(DOM) <--- ViewModel, DOM Bindings(Vue) <---- Model(Plain Jav Script Object)


단축키

1. `! + tab` 을 누르게 되면, head, body 등을 다 만들어준다.

2. `div#{id이름}` 을 작성하게 되면 자동완성해준다.

3. `script + tab` 을 누르게 되면 script을 자동완성해준다.

4. `log + tab` 을 누르게 되면, console.log 를 완성해준다.

5. `tab` 은 자동완성이 된다.

등등 편한 테크가 많다.

### reactivity

데이터의 변화를 인지하여 화면에 그려주는 것.

[Object.defineProperty() API 문서 링크](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

```html
// Object.defineProperty('대상 객체', '객체_속성', {
//    // 정의할 내용
// })

Object.defineProperty(viewModel, 'str', {
  // 속성에 접근했을 때의 동작을 정의
  get: function() {
    console.log('접근');
  },
  // 속성에 값을 할당했을 때의 동작을 정의
  set: function(newValue) {
    console.log('할당', newValue);
    render(newValue);
  }
});

```

reacitivity의 핵심은 데이터의 변화를 라이브러리에서 감지해서, 알아서 화면을 자동으로 그려주는 것.

라이브러리화?

> 아래처럼 할 수 있음

```javascript

(function() {
  function init() {
    Object.defineProperty(viewModel, 'str', {
    // 속성에 접근했을 때의 동작을 정의
      get: function() {
        console.log('접근');
      },
      // 속성에 값을 할당했을 때의 동작을 정의
      set: function(newValue) {
        console.log('할당', newValue);
        render(newValue);
      }
    });
  }

  function render(value) {
    div.innerHTML = value;
  }

  init();
})();  

```


## 인스턴스 

인스턴스는 뷰로 개발할 때 필수로 생성해야 하는 코드

```vue
var vm = new Vue({}); // 이런식으로 하면 인스턴스를 생성한것.


```

### 생성자 함수


약속 중 하나는 생성자 함수의 맨앞은 대문자로 시작

[MDN 생성자 함수 설명 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Obsolete_Pages/Core_JavaScript_1.5_Guide/Creating_New_Objects/Using_a_Constructor_Function)

[MDN Prototype 설명 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)



### 인스턴스 옵션 속성

일반적으로 객체를 선언할 때, 리터럴 방법이 더 좋을 때가 많다.(변수 선언하지말고.)

```vue
new Vue({
  el: ,
  template: ,
  data: ,
  methods: ,
  created: ,
  watch: ,
});

```

인스턴스에서 사용할 수 있는 속성과 API는 다음과 같다.

- el : 인스턴스가 그려지는 화면의 시작점(특정 HTML 태그)
- template : 화면에 표시할 요소 (HTML, CSS 등)
- data : 뷰의 반응성(Reactivity)가 반영된 데이터 속성
- methods : 화면의 동작과 이벤트 로지ㅡㄹ 제어하는 메서드
- created : 뷰의 라이프 사이클과 관련된 속성
- watch : data에서 정의한 속서이 변화했을 때 추가 동작을 수행할 수 있게 정으히ㅏ는 속성
- 이외에도 많은 속성들이 있음...



