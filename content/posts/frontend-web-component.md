---
title: '[Frontend] Web Component'
slug: 00-frontend-webcomponent
date: 2020-01-11
published: true
tags: ['Frontend', 'Web', 'Webcomponent']
series: false,
cover_image:
canonical_url: false
description: 'Web Component에 대해 정리합니다.'
---

# Web Component

웹 기술에 대해서 듣다보면, 코드를 재 사용을 해야할 경우가 필요합니다. 그에 대한 핵심 기술인 웹 컴포넌트에 대해 정리합니다.

## Web Component의 개념

웹 컴포넌트는 기능을 나머지 코드로부터 캡슐화하여 재사용 가능한 커스텀 엘리먼트를 생성하고 웹 앱에서 활용할 수 있도록 해주는 다양한 기술들의 모음입니다.

<br/>

## Web Component의 기술

3가지의 기술들로 구성됩니다. 재사용을 운하는 어느 곳이든 코드 충돌에 대한 걱정이 없는 캡슐화된 기능을 갖춘 다용도의 **커스텀 엘리먼트를 생성**하기 위해 함께 사용할 수 있습니다.

### Custom elements

사용자 인터페이스에서 원하는 대로 사용할 수 있는 사용자 정의 요소 및 해당 동작을 정의할 수 있는 JavaScript API 세트입니다.

#### 간단한 예제.

간단한 에시로, `window.customElements`의 `define()` 메서드를 이용합니다. 해당 메서드는 아래 3개의 arguments를 받아 custom element를 사용합니다.

- `DOMString` : custom element의 이름입니다.
- `class extends HTMLElment` : element의 행동을 정의한 class입니다.
- `{ extends }` : inherits할 node name입니다. (optional)

```js
customElements.define(
  'text-sample',
  class extends HTMLElement {
    constructor() {
      super() // always call

      // element functionality
    }
  }
)
```

### Shadow DOM

캡슐화된 shadow DOM 트리를 element(메인 다큐먼트 DOM으로부터 독집적으로 렌더링 되는)를 추가하고 연관된 기능을 제어하기 위한 JavaScript API 집합입니다. 이 방법을 통해서 엘리먼트의 기능을 private하게 유지할 수 있어서 다큐먼트의 다른 부분과 출돌없이 스크립트와 스타일을 작성할 수 있습니다.

다음의 HTML 파일이 있을 때,

```html
<!DOCTYPE html>

<html>
  <head>
    <meta charste="utf-8" />
    <title>Simple DOM</title>
  </head>

  <body>
    <section>
      <img src="dinosaur.png" alt="T-Rex" />
      <p>
        Here we will add a link to the
        <a href="https://www.mozilla.org/">Mozilla</a>
      </p>
    </section>
  </body>
</html>
```

DOM은 아래와 같은 구성을 가지고 있습니다.

![image](https://user-images.githubusercontent.com/42582516/104188740-12db8480-545d-11eb-8bab-1655175db87f.png)

이를 시각화하면 다음과 같이 표현할 수 있습니다.

![image](https://user-images.githubusercontent.com/42582516/104189398-f3912700-545d-11eb-8b69-9d74a0dc71af.png)

다음에서 하나씩 설명하면 다음과 같습니다.

- `shadow host` : 일반적인 DOM 노드처럼 보이는 Shadow DOM 연결 지점을 의미합니다.
- `shadow tree` : Shadow DOM 내부의 DOM Tree
- `shadow boundary` : Shadow DOM의 시작 노드부터 끝 노드까지의 공간입니다.
- `shadow root` : Shadow tree의 root 노드

다음과 같이 의미합니다.

#### 간단한 예제.

```js
customElements.define(
  'open-shadow',
  class extends HTMLElement {
    constructor() {
      super()

      const pElem = document.createElement('p')
      pElem.textContent = this.getAttribute('text')

      const shadowRoot = this.attachShadow({ mode: 'open' })
      shadowRoot.appendChild(pElem)
    }
  }
)
```

### HTML 템플릿

`<template>`와 `<slot>` 엘리먼트는 렌더링 페이지에 나타나지 않는 마크업 템플릿을 작성할 수 있습니다. 커스텀 엘리먼트의 구조를 기반으로 여러번 재사용할 수 있습니다.

#### 간단한 예제.

```js
customElements.define(
  'my-paragraph',
  class extends HTMLElement {
    constructor() {
      super()

      const template = document.getElementById('my-paragraph')
      const templateContent = template.content

      this.attachShadow({ mode: 'open' }).appendChild(
        templateContent.cloneNode(true)
      )
    }
  }
)

const slottedSpan = document.querySelector('my-paragraph span')

console.log(slottedSpan.assignedSlot)
console.log(slottedSpan.slot)
```

<br/>

## 마무리.

좀 더 자세한 코드를 보고 싶으면 아래의 예제를 참고하면 좋습니다.

- [MDN Examples](https://github.com/mdn/web-components-examples/blob/master/composed-composed-path/main.js)

잚못된 부분이 있으면 편하게 이야기주세요.

---

**마무리**

- https://developer.mozilla.org/ko/docs/Web/Web_Components
