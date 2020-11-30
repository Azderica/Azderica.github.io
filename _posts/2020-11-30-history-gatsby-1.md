---
layout: post
title: "[Gatsby] Jekyll에서 Gatsby로 Gitblog 변경하기 - 1"
subtitle: "Jekyll에서 Gastby로 변경하기 - 1"
categories: history
tags: gastby git gitblog
comments: true

---

# Jekyll에서 Gatsby로 Gitblog 변경하기 - 1.

기존에 구성되어 있는 이 깃블로그는 Jekyll 블로그입니다. Jekyll는 아주 심플하고 블로그 지향적인 정적 사이트이기 때문에, 시작하기도 쉽고 이해하기도 쉽습니다. 따로 프론트에 대한 지식이 많이 필요하지도 않고, Markdown 등을 쉽게 변환해줍니다.

## 왜 바꿀생각을 했냐면.

![image](https://user-images.githubusercontent.com/42582516/100608599-fa515800-334f-11eb-84fe-4eecb612598d.png)

기존의 Jekyll에서 현재 사용하고 있는 좋은 테마에서 왜 수정을 하는지 묻는다면 크게 두가지의 이유가 있습니다.

### 1. 사용자 편의성 증가

현재 있는 Jekyll에서 제공되는 기능은 매우 정적입니다. 그렇기 때문에 사용자가 원하는 기능들을 넣기에는 생각보다 어려움이 있습니다.

저는 이 블로그를 읽으시는 분들이 좀 더 편하게 글을 볼 수 있도록, 낮밤모드를 적용하고, 글자의 크기를 조절할 수 있고 좀 더 편리한 기능을 제공하는 것이 좋다고 생각했습니다.

### 2. 프론트엔드 개발 공부

Gatsby는 Jekyll와 마찬가지로 HTML 생성기입니다. Gatsby는 그러나, React와 GraphQL에 기술에 기반합니다.

이후에 사이트가 커지고 페이지 별로 HTML이 생성되어야한다면, Gatsby JS는 가공할 정보를 GraphQL 에서 가져와서 빌드 시점에 페이지를 만들어낼 수 있으미, 배포할 때 각페이지 정보들이 모두 배포시점에 만들어지므로 따로 웹서버가 필요하지 않습니다.

(추가 작서예정)

---
**출처**
- https://medium.com/@pks2974/gatsby-%EB%A1%9C-blog-%EB%A7%8C%EB%93%A4%EA%B8%B0-ac3eed48e068

