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




