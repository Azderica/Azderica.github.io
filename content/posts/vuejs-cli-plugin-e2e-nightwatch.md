---
title: '[VueJS] Vuejs 시'
slug: 00-vue-cli-plugin-e2e-nightwatch
date: 2022-01-18
published: true
tags: ['VueJS', 'Vue', 'Frontend', 'Jest', 'e2e', 'e2e-nightwatch']
series: true
cover_image: ./images/VuejsLogo.png
canonical_url: false
description: ' @vue/cli-plugin-e2e-nightwatch 에러 해결'
---

# @vue/cli-plugin-e2e-nightwatch 에러 해결

## 모던 웹 애플리케이션 개발.

을 보면서, 해당 책에서 나오는 일부 테스트 코드를 다시 구현해봤는데 옛날과 다른 부분이 많았다

- 책에서 요구하는 npm은 다음과 같습니다.

```json
{
  "name": "front-end",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "test:unit": "vue-cli-service test:unit",
    "test:e2e": "vue-cli-service test:e2e",
    "test": "npm run test:unit && npm run test:e2e"
  },
  "dependencies": {
    "vue": "^2.5.17",
    "vue-router": "^3.0.1",
    "vuex": "^3.0.1"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "^3.0.1",
    "@vue/cli-plugin-e2e-nightwatch": "^3.0.1",
    "@vue/cli-plugin-eslint": "^3.0.1",
    "@vue/cli-plugin-unit-jest": "^3.0.1",
    "@vue/cli-service": "^3.0.1",
    "@vue/eslint-config-standard": "^3.0.1",
    "@vue/test-utils": "^1.0.0-beta.20",
    "babel-core": "7.0.0-bridge.0",
    "babel-jest": "^23.0.1",
    "node-sass": "^4.9.0",
    "sass-loader": "^7.0.1",
    "vue-template-compiler": "^2.5.17"
  }
}
```

- 그러나 해당 코드로 돌릴 때, 다음의 문제가 겹쳐서 버전을 올려야했습니다.
- vscode에서 `prettier`를 default로 설정을 했던 부분과 `eslint`를 같이 쓰기 위해 `eslint-plugin-prettier` 설치해야하는데 `eslint`의 버전을 강제로 올려야 했습니다.
- 해당 로직을 돌리니 기존의 테스트 코드를 구성했던 `test:e2e` 에서 에러가 발생하였습니다.

<br/>

## 따라서.

- `test:e2e` 에 대한 코드를 수정해야 했습니다.
- 그에 따라 알게된 점은 `@vue/cli-plugin-e2e-nightwatch` 는 `npm` 으로 설치하는 것이 아닌 `vue add e2e-nightwatch` 를 사용해야 했습니다.

이에 따른 결과 코드는 다음과 같습니다.

```json
{
  "name": "front-end",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "test:unit": "vue-cli-service test:unit",
    "test:e2e": "vue-cli-service test:e2e",
    "lint": "vue-cli-service lint",
    "test": "npm run test:unit && npm run test:e2e"
  },
  "dependencies": {
    "core-js": "^3.6.5",
    "vue": "^2.6.11",
    "vue-router": "^3.5.3",
    "vuex": "^3.6.2"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-e2e-nightwatch": "~4.5.0",
    "@vue/cli-plugin-eslint": "~4.5.0",
    "@vue/cli-plugin-unit-jest": "^4.5.15",
    "@vue/cli-service": "~4.5.0",
    "babel-core": "^7.0.0-bridge.0",
    "babel-eslint": "^10.1.0",
    "babel-jest": "^24.9.0",
    "chromedriver": "97",
    "eslint": "^6.7.2",
    "eslint-plugin-prettier": "^3.0.0",
    "eslint-plugin-vue": "^6.2.2",
    "prettier": "^2.5.1",
    "vue-template-compiler": "^2.6.11"
  },
  "browserslist": ["> 1%", "last 2 versions", "not dead"]
}
```

<br/>

## 참고 자료

해당 자료에 대해 코드를 보고 싶으면 아래 링크 참조하면 됩니다.

[github](https://github.com/Azderica/Toyproject-TaskAgile/commit/743f42d82dc86d362df344adbe9cf1085996931b)
