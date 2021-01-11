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

### Shadow DOM

캡슐화된 shadow DOM 트리를 element(메인 다큐먼트 DOM으로부터 독집적으로 렌더링 되는)를 추가하고 연관된 기능을 제어하기 위한 JavaScript API 집합입니다. 이 방법을 통해서 엘리먼트의 기능을 private하게 유지할 수 있어서 다큐먼트의 다른 부분과 출돌없이 스크립트와 스타일을 작성할 수 있습니다.

### HTML 템플릿

`<template>`와 `<slot>` 엘리먼트는 렌더링 페이지에 나타나지 않는 마크업 템플릿을 작성할 수 있습니다. 커스텀 엘리먼트의 구조를 기반으로 여러번 재사용할 수 있습니다.
