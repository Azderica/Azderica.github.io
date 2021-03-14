---
title: '[Programming] 프로그래밍 표기법(네이밍 컨벤션)'
slug: 00-programming-nameConvention
date: 2021-03-15
published: false
tags: ['TIP', 'Name', 'Convention']
series: false,
cover_image: ./images/.png
canonical_url: false
description: '프로그래밍 표기법에 대해 이야기합니다.'
---

# 프로그래밍 표기법

크게 다음과 같이 나눠지며, 주로 사용하는 것은 `Camel case`와 `Snake case`, `Kebab Case`입니다.

여러가지 컨벤션 룰이 있지만, 가장 중요한 것은 프로젝트 코드 스타일에 맞춰서 작성하는 것입니다.

## Camel case (카멜케이스)

> testMessage

### 설명

여러 단어를 합칠 때, 첫번째 단어를 제외하고 나머지 단어들의 첫 글자를 대문자로 바꿔줍니다.

### 사용 경우

- 자바를 예시로 든다면 클래스, 인터페이스, 메소드, 변수 등의 이름을 지을 때 주로 사용합니다.

<br/>

## Snake case (스네이크 케이스)

> test_message

### 설명

두 단어 이상을 합칠때 언더바(`_`, 언더스코어)로 구분합니다.

### 사용 경우

- 주로 파이썬이나 php, rust 등에서 변수나 메소드 등을 만들 때 사용합니다.

<br/>

## Kebab case (케밥 케이스)

> test-message

### 설명

두 단어 이상을 합칠때 바(`-`, 대시)로 구분합니다.

### 사용 경우

- html 태그의 id, class 속성으로 주로 사용합니다.

<br/>

## Pascal case (파스칼 케이스)

> TestMessage

### 설명

카멜 케이스와 비슷하지만, 첫번째 단어도 대문자로 바꿔줍니다.

<br/>

## Upper case

> TEST_MESSAGE

### 설명

대문자에 `snake case`로 단어들을 합칩니다.

### 사용 경우

- 일반적으로 상수 중에서 여러 단어가 합친 경우, 주로 사용합니다.

<br/>

## 헝가리언 표기법

> strName
> bVisit

### 설명

접두어를 통해서 사용하는 표기법입니다. (str은 string, b는 boolean 등을 의미합니다.)

### 사용 경우

- 현재는 대부분 사용하지 않는 것으로 알고 있습니다.
