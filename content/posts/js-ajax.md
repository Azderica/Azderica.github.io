---
title: '[JavaScript] Ajax 정리'
slug: 00-javascript-ajax
date: 2021-01-25
published: true
tags: ['Javascript', 'Ajax', 'Frontend']
series: false
cover_image: ./images/JavascriptLogo.jpg
canonical_url: false
description: 'Ajax에 대해 정리합니다.'
---

# Javascript Ajax

웹 개발을 하다보면, Ajax를 안쓸 수 없습니다. 다만 Ajax를 사용해도 정작 Ajax에 대해 공부해 본적은 없어서 글을 정리합니다.

## AJAX란.

- Ajax는 **Asynchronous Javascript and Xml**의 약자입니다.
- 이는 자바스크립트의 라이브러리 중 하나이며, 브라우저가 가지고 있는 **XMLHttpRequest 객체를 이용해서 전체 페이지를 새로 고치지 않고 페이지의 일부만을 로드하는 기법**입니다.
- 이를 정리하자면, 자바스크립트를 사용한 **비동기 통신**이며, **클라이언트와 서버간에 XML 데이터를 주고받는 기술**입니다.

<br/>

## 비동기 방식

![Ajax-vs-](https://user-images.githubusercontent.com/42582516/105646320-ae033e00-5ee2-11eb-989d-9f2342e15742.png)

- 비동기 방식은 웹페이지를 리로드하지 않고 데이터를 불러옵니다. Ajax를 통해 서버에 요청을 하더라도, 멈춰있지 않고 해당 프로그램은 계속 돌아가고 있습니다.
- 이러한 비동기 방식은 시간도 빠르고, 화면을 리로드하는 경우 전체 리소스를 다 가져올 필용벗이 일부 필요한 부분만 가져오기 때문에 장점이 있습니다.

<br/>

## 왜 Ajax를 쓰나요?

- 단순하게 웹에서 무언가를 부르거나 데이터를 조회하고 싶은 경우, 페이지 전체를 새로고침하지 않기 위해 사용한다고 볼 수 잇습니다.
- 일반적으로 HTTP 프로토콜은 단방향 통신입니다. 그렇기 때문에 클라이언트에서 요청을 보내고, 서버쪽에서 응답을 받으면 연결이 끊어집니다. 그래서 화면의 내용을 갱신하기 위해서는 다시 요청을 보내고 응답을 받으며 페이지 전체를 갱신해야합니다. 다만, 이러한 경우에는 엄청난 자원낭비와 시간낭비를 겪게 됩니다.
- Ajax는 Http 페이지 전체가 아닌 일부만 갱신가능하도록, XMLHttpRequest 객체를 통해서 서버에 요청합니다. 이 경우에는 **Json이나 XML형태로 필요한 데이터만 받아 갱신하기 때문에 그만큼의 자원과 시간을 아낄 수 있습니다.**

<br/>

## Ajax의 장단점

### Ajax의 장점

- 웹페이지의 속도 향상
- 서버의 처리가 완료 될때까지 기다리지 않고 처리가 가능합니다.
- 서버에서 Data만 전송하면 되므로 전체적인 코드의 양이 줄어듭ㄴ니다.
- 기존 웹에서는 불가능했던 다양한 UI를 가능하게 해줍니다.

### Ajax의 단점

- 히스토리 관리가 안됩니다.
- 페이지가 이동하지 않는 통신이므로 보안에 신경을 써야합니다.
- 연속으로 데이터를 요청하면 서버 부하가 증가할 수 있습니다.
- XMLHttpRequest를 통해 통신을 하는 경우, 사용자에게 아무런 진행정보를 주지 않기 때문에 사용자가 요청이 완료가 안되었는데 페이지를 떠날 수도 있습니다.
- HTTP 클라이언트의 기능이 한정되어 있습니다.
- 지원하는 Charset이 한정적입니다.
- Script로 작성되므로 디버깅이 어렵습니다.
- Cross-Domain 문제가 발생합니다. (다른 도메인과 통신이 불가능합니다.)

<br/>

## Ajax의 진행과정

1. 요청 : 브라우저는 XMLHttpRequest 객체를 만들어 서버에 정보를 요청합니다.
2. 응답 : 브아우저는 콘텐츠를 처리하여 페이지에 추가합니다.

<br/>

## Ajax 예제

Ajax의 대표적인 에제로 jQuery를 통한 Ajax가 있습니다. 현재는 jQuery를 지양하는 분위기지만, 많은 레거시 코드가 남아있으므로 jQuery 코드를 조금 가져오겠습니다.

```js
$.ajax({
  // URL은 필수 요소이므로 반드시 구현해야 하는 Property입니다.
  url: 'url', // 요청이 전송될 URL 주소
  type: 'GET', // http 요청 방식 (default: ‘GET’)
  async: true // 요청 시 동기화 여부. 기본은 비동기(asynchronous) 요청 (default: true)
  cache: true // 캐시 여부
  timeout: 3000, // 요청 제한 시간 안에 완료되지 않으면 요청을 취소하거나 error 콜백을 호출.(단위: ms)
  data: { key: value }, // 요청 시 포함되어질 데이터
  processData: true // 데이터를 컨텐트 타입에 맞게 변환 여부
  contentType: 'application/json', // 요청 컨텐트 타입
  dataType: 'json', // 응답 데이터 형식 (명시하지 않을 경우 자동으로 추측)
  beforeSend: function() {
    // XHR Header를 포함해서 HTTP Request를 하기전에 호출됩니다.
  },
  success: function(data, status, xhr) {
    // 정상적으로 응답 받았을 경우에는 success 콜백이 호출되게 됩니다.
    // 이 콜백 함수의 파라미터에서는 응답 바디, 응답 코드 그리고 XHR 헤더를 확인할 수 있습니다.
  },
  error: function(xhr, status, error) {
    // 응답을 받지 못하였다거나 정상적인 응답이지만 데이터 형식을 확인할 수 없기 때문에
    // error 콜백이 호출될 수 있습니다.
    // 예를 들어, dataType을 지정해서 응답 받을 데이터 형식을 지정하였지만,
    // 서버에서는 다른 데이터형식으로 응답하면  error 콜백이 호출되게 됩니다.
  },
  complete: function(xhr, status) {
    // success와 error 콜백이 호출된 후에 반드시 호출됩니다.
    // try - catch - finally의 finally 구문과 동일합니다.
  },
})
```

출처 : https://devyj.tistory.com/1

<br/>

## 마무리

오늘은 간단하게 jQuery에 대해 정리했습니다.

---

**출처**

- [AJAX란 무엇인가](https://velog.io/@surim014/AJAX%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80)
- [AJAX란 무엇인가](https://coding-factory.tistory.com/143)
- [Ajax란 무엇이고 jQuery를 이용한 사용법](https://gxnzi.tistory.com/67)
- [Ajax란?](https://devyj.tistory.com/1)
