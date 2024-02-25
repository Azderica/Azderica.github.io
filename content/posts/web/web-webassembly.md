---
title: '[WEB] Webassembly 정리'
slug: 00-web-webassembly
date: 2021-02-18
published: true
tags: ['Web', 'Webassembly']
series: false
cover_image: ./images/WebassemblyText.png
canonical_url: false
description: '웹 어셈블리에 대해 정리합니다.'
---

# WebAssembly

오늘은 웹어셈블리에 대해 간단하게 정리합니다.

<br/>

## WebAssembly란?

웹 어셈블리는 C나 C++와 같은 프로그래밍 언어를 컴파일해서 어느 브라우저에서나 빠르게 실행되는 바이너리 형식(0과 1로 이루어진 이진 형식)으로 **바꿔주는 기술**을 의미합니다.

일반적으로 웹 어플리케이션을 개발할때 사용하는 언어는 HTML/CSS/JavaScript이며, 그 중 JavaScript는 동적인 부분을 개발합니다. 최근에는 JavaScript의 속도가 빨라졌지만 아직 C나 C++과 같은 언어들에 비해 느립니다.

![image](https://user-images.githubusercontent.com/42582516/108269631-9c474a80-71b1-11eb-967d-830b9f05986d.png)

기존의 개발은 JavaScript로 개발을 하다보니 게임이나 동영상 편집기 등과 같은 고성능의 애플리케이션은 브라우저에서 동작하는데 어려움이 있었습니다.

웹 어셈블리는 웹 플랫폼에서 이전에 불가능 했던 클라이언트 응용 프로그램을 사용해서 웹에서 여러 언어로 작성된 코드를 네이티브에 가까운 속도로 실행되는 길을 제공합니다.

웹 어셈블리 모듈을 웹앱으로 가져와서 JavaScript를 통해 사용할 수 있게 할 수 있습니다. JavaScript 프레임 워크는 웹 어셈블리를 사용해서 대규모 성능 이점과 새로운 기능을 제공하면서 웹 개발자가 쉽게 기능을 사용할 수 있도록 할 수 있습니다.

<br/>

## 웹 어셈블리의 목표

웹 어셈블리는 다음의 목표를 가집니다.

- 빠르고, 효과적이고, 이식성이 좋을 것
  - 일반적인 하드웨어들이 제공하는 기능을 활용해 여러 종류의 플랫폼 위에서 네이티브에 가까운 속도로 실행됩니다.
- 읽기 쉽고 디버깅이 가능할 것
  - 웹어셈블리는 저수준의 어셈블리 언어지만 손으로 작성하고 보고 디버깅할 수 있도록 사람이 읽을 수 있는 수준의 텍스트 포멧을 유지합니다.
  - 스펙이 다음어 지고 있습니다.
- 안전함을 유지할 것
  - 샌드박싱된 실행환경에서 안전하게 돌아갈 수 있도록 설계합니다.
  - 웹 상의 다른 코드와 마찬가지로 same-origin 권한 정책을 강제합니다.
- 웹을 망가뜨리지 말 것
  - 다른 웹 기술과 마찰없이 사용되면서 하위호환성을 관리할 수 있도록 설계됩니다.

웹 어셈블리는 웹과 자바스크립트 환경 밖에서도 사용될 수 있습니다.

- [Non-web embeddings](https://webassembly.org/docs/non-web/)

<br/>

## 웹 어셈블리의 핵심 컨셉

웹 어셈블리가 브라우저에서 돌아가는 지 알기위해서는 필요한 여러 핵심 개념이 있습니다.

- **모듈**
  - 실행 가능한 컴퓨터 코드로 브라우저에서 컴파일된 WebAssembly 바이너리입니다.
  - stateless이며, Windows와 worker 간에 `postMessage()`를 통해 명시적으로 공유할 수 있습니다.
  - ES2015 모듈과 마찬가지로 가져오기 및 내보내기를 선언합니다.
- **메모리**
  - 웹어셈블리의 저수준 메모리 접근 명령어에 의해 읽고 쓰여지는 바이트들의 선형 배열인 사이즈 조절이 가능한 어레이버퍼(ArrayBuffer)입니다.
- **테이블**
  - raw 바이트로 메모리에 저장될 수 없는 레퍼런스의 사이즈 조절 가능한 형식이 지정된 배열입니다.
- **인스턴스**
  - 모듈과 그 모듈이 사용하는 모든 상태의 쌍입니다.
  - 모듈 상태로는 메모리, 테이블, 임포트된 값의 집합 등이 있습니다.

**자바스크립트 API는 모듈, 메모리, 테이블, 인스턴스를 생성하는 방법을 제공**합니다. 자바스크립트 코드에서는 웹어셈블리 인스턴스에서 일반 자바스크립트 함수의 형태로 노출한 익스포트를 동기적으로 호출할 수 있습니다. 웹어셈블리 코드 또한 임의의 자바스크립트 함수를 동기적으로 호출할 수 있습니다.

웹 어셈블리 코드를 다운로드하고, 컴파일하고, 돌리는 일련의 모든 과정은 자바스크립트를 제어할 수 있습니다. 따라서 **웹어셈블리를 효율적으로 고성능의 함수를 생성하기 위한 자바스크립트의 기능**이라고 생각할 수도 있습니다.

<br/>

## 웹 어셈블리의 활용 사례

웹 어셈블리의 활용 사례는 다음과 같습니다.

- Microsoft의 Blazor
- GoLang
- AssemblyScript
- AutoCAD

좀 더 자세한 사항을 알기위해서는 다음을 참고하면 좋을 듯합니다.

- [Naver D2 - WebAssembly](https://d2.naver.com/helloworld/8786166)

---

**출처**

- **https://developer.mozilla.org/ko/docs/WebAssembly/Concepts**
- **https://d2.naver.com/helloworld/8786166**
- https://medium.com/@yeon22/technology-webassembly%EB%9E%80-b8ce77b06165
- https://steemit.com/kr-dev/@heejin/webassembly
- https://engineering.huiseoul.com/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%91%EB%8F%99%ED%95%98%EB%8A%94%EA%B0%80-%EC%9B%B9%EC%96%B4%EC%85%88%EB%B8%94%EB%A6%AC%EC%99%80%EC%9D%98-%EB%B9%84%EA%B5%90-%EC%96%B8%EC%A0%9C-%EC%9B%B9%EC%96%B4%EC%85%88%EB%B8%94%EB%A6%AC%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EA%B2%8C-%EC%A2%8B%EC%9D%80%EA%B0%80-cf48a576ca3
