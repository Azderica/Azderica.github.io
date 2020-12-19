---
title: "[VueJS] Vuejs 템플릿 문법"
slug: 04-vuejs-starter
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

<br/>

## Method

뷰 메서드는 **특정 기능 별로 묶을 수 있는 자바스크립트 함수**를 의미합니다. 메서드는 뷰 템플릿의 버튼 이벤트 처리부터 HTTP 통신까지 다양한 성격의 코드로 구성됩니다.

### Method 코드 형식

일반적인 메서드 코드의 형식은 아래와 같습니다.

```js
new Vue({
    methods: {
        // ...
    }
})
```

### Method 예시 - 1

기본적인 버튼 클릭 메서드입니다.

```html
<button v-bind:click="clickButton">click me</button>
```

```js
new Vue({
  methods: {
    clickButton() {
      alert('clicked');
    }
  }
})
```

해당 예시 코드는 click me를 클릭하면 경고창이 뜨고 알람이 발생합니다.

### Method 예시 - 2

화면 조작 외에도 특정 로직을 담을 수도 있습니다.

```html
<button v-bind:click="displayProducts">Refresh</button>
```

```js
new Vue({
  data: {
    products: []
  },
  methods: {
    displayProducts() {
      this.fetchData();
      // ..
    },
    fetchData() {
      axios.get('/products').then(function(response) {
        this.products = response.data;
      }).catch(function(error) {
        alert(error);
      });
    }
  }
})
```

해당 코드에서 `Refresh` 버튼 클릭 시, `displayProducts()` 메서드가 실행되고, 이 메서드가 `fetchData()`를 호출합니다. 이런식으로 연결하게 되면, 특정 기능 별로 메서드를 분리할 수 있고 코드를 중복없이 사용할 수 있게 됩니다.

<br/>

## Computed

Computed 속성은 **템플릿의 데이터 표현을 더 직관적이고 간결하게 도와주는 속성**입니다.

코드의 예시는 다음과 같습니다.

```html
<div>{{ reverseMessage }}</div>
```

```js
computed: {
    reverseMessage() {
        return this.messgae.split(' ').reverse().join(' ');
    }
}
```

### computed 장점

Computed 속성은 두가지의 장점이 있습니다,.
- 코드의 가독성을 높여줍니다.
- Computed 속성의 대상으로 정한 data 속성이 변했을 때 이를 감지하고 자동으로 다시 연산해줍니다.

### computed 주의사항 1 - computed 속성은 인자를 받지않습니다. 

아래는 잘못된 코드이며 정상적으로 동작하지 않습니다.

```html
<div>{{ reverseMessage(false) }}</div>
```

```js
computed: {
  reverseMessage(isReversed) {
    return isReversed ? this.message.split('').reverse().join('') : this.message;
  }
}
```

### computed 주의사항 2 - HTTP 통신과 같이 컴퓨팅 리소스가 많이 필요한 로직은 정의하지 않습니다.

비싼 비용의 로직은 작성하지 않습니다. 이는 watch나 method에 넣는 것이 적합합니다. 아래는 잘못된 코드입니다.

```js
data: {
  message: ''
},
computed: {
  reverseMessage() {
    var vm = this;
    axios.get('/message').then(function(response) {
      vm.message = response.data;
    });
    return this.message.split('').reverse().join('');
  }
}
```

<br/>

## Watch

watch 속성은 **특정 데이터의 변화를 감지해서 자동으로 특정 로직을 수행해주는 속성**입니다.

코드 구현 형식은 다음과 같습니다.

```js
new Vue({
    data() {
        return {
            message: 'Hello'
        }
    },
    watch: {
        message: function(value, oldValue) {
            console.log(value); 
        }
    }
})
```

watch의 실용 문법은 아래와 같습니다.

### watch 사용 방식 1 - watch 속성에 메서드 함수 연결

watch 대상 속상에 함수 대신에 메소드를 연결하는 예시입니다.

```js
new Vue({
    data() {
        return {
            message: 'Hello'
        }
    },
    methods: {
        logMessage() {
            console.log(this.message);
        }
    },
    watch: {
        'message': 'logMessage' // 대상 속성과 메서드 함수를 매칭합니다.
    }
})
```

### watch 사용 방식 2 - 핸들러와 초기 실행 옵션

watch 대상 속성에 아래와 같이 `handler()`와 `immediate` 속성을 정의할 수 있습니다.

```js
new Vue({
    data() {
        return {
            message: 'Hello'
        }
    },
    watch: {
        'message': {
            handler(value, oldValue){
                console.log(value);
            },
            immediate: true // 컴포넌트가 생성되자마자 즉시 실행됩니다.
        }
    }
})
```

### 실제 코드

- [watch.html](https://github.com/Azderica/Study-lean-vue-js/blob/master/playground-complete/watch.html)

## Computed vs Watch

공식 document를 보면 `computed`와 `watch property`에 대한 이야기가 있습니다.

- [공식 document : computed vs watch](https://kr.vuejs.org/v2/guide/computed.html)

Vue는 Vue 인스턴스의 데이터 변경을 관찰하고 반응하는 `watch 속성`을 제공합니다. 다만, 다른 데이터 기반으로 변경할 필요가 있는 데이터의 경우에는 `watch 속성` 보다는 `computed 속성`이 좋습니다.

아래는 두 속성의 차이를 보여주는 코드입니다.

```html
<div id="demo"> {{ fullName }} </div>
```

```js
var vm = new Vue({
    el: '#demo',
    data: {
        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar'
    },
    watch: {
        firstName: function (val) {
            this.fullName = val + ' ' + this.lastName;
        },
        lastName: fucntion (val) {
            this.fullName = this.firstName +  ' ' + val;
        }
    }
})
```

위는 watch 속성을 이용한 코드입니다. 명령형이며 코드를 반복합니다.

아래는 computed를 이용한 코드입니다.

```js
var vm = new Vue({
    el: '#demo',
    data: {
        firstName: 'Foo',
        lastName: 'Bar',
    },
    computed; {
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        }
    }
})
```

<br>

## Filter

뷰 필터는 **화면에 표시되는 텍스트의 형식을 쉽게 변환해주는 기능**입니다. 간단하게 단어의 대문자화부터 다국어, 국제 통화 표시 드으로 다양하게 사용할 수 있습니다.

### 필터 사용 방법

```html
<div id="app">
  {{ message | capitalize }}
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    message: 'hello'
  },
  filters: {
    capitalize: function(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})
```

위 코드를 실행시키면 hello가 아닌 Hello 텍스트가 화면에 나오게됩니다.

### 필터 등록 패턴

`filter` 속성을 각 컴포넌트에 등록하는 방법도 있지만, 읿반적으로는 filter.js 파일을 별도로 분리해서 사용합니다.

```js
// filters.js
export function capitalize() {
  // ..
}

export function translate() {
  // ..
}
```

```js
// main.js
import Vue from 'vue';
import * as filters from 'filters.js';

Object.keys(filters).forEach(function(key) {
  Vue.filter(key, filters[key]);
});

new Vue({
  // ..
})
```

다음과 같은 구조를 가지게 됩니다.

<br>

## Form handling

폼(Form)은 웹 어플리케이션에서 가장 많이 사용되는 코드 형식입니다. 로그인이나 상품 결제 등 모든 곳에 사용자의 **입력을 처리**하는 폼이 필요합니다.

### 간단한 로그인 Form 에시

다음의 순서를 따라 구성할 수 있습니다.

예제 코드는 다음과 같습니다.

```html
<form v-on:submit.prevent="loginUser">
  <div>
    <label for="email">Email</label>
    <input id="email" type="text" ref="email">
  </div>
  <div>
    <label for="password">Password</label>
    <input id="password" type="password" ref="password">
  </div>
  <div>
    <button type="submit">Login</button>
  </div>
</form>
```

```js
new Vue({
  methods: {
    loginUser() {
      var email = this.$refs.email.value;
      var password = this.$refs.password.value;
      axios.post('/login', {
        email: email,
        password: password
      });
    }
  }
})
```

이에 따른 설명은 아래의 원본 링크에서 더 자세히 볼 수 있습니다.

- [원본 링크](https://joshua1988.github.io/vue-camp/syntax/form.html#form-%EC%A0%9C%EC%9E%91%ED%95%98%EA%B8%B0)