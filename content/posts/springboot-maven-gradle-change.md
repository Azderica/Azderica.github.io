---
title: "[Springboot] Maven과 Gradle로 바꾸기"
date: 2020-10-23
published: true
tags: ['Springboot', 'Maven', 'Gradle', 'Change', 'Backend']
series: true,
cover_image: ./images/SpringLogo.png
canonical_url: false
description: " 지난 글에 이어Maven을 Gradle로 바꾸는 내용을 설명합니다. "
---


# Maven에서 Gradle로 변경하기.

이전글 : [Maven과 Gradle의 차이](https://azderica.github.io/backend/2020/10/14/backend-spring-maven-gradle-diff/)


바꿔야하는 지에 대해서는 각자 다양한 이유(성능 문제, 업무 요청, 등등) 다양한 이유가 있을 것으로 판단된다.

그렇다면 실질적으로 어떻게 Maven 프로젝트를 Gradle로 바꿀 수 있을까?

<br/>

## 순서

macOS를 대상으로 진행합니다. (windows는 다른 좋은글이 많아서...)

### 1. gradle 설치

gradle 자동 설치 (수동 설치는 [https://gradle.org/gradle-download/](https://gradle.org/gradle-download/))

```bash
brew install gradle
```

### 2. pom.xml을 build.gradle로 변환

프로젝트 폴더에 있는 pom.xml을 build.gradle로 변환한다.

 ```bash
gradle init --type pom
 ```

### 3. build.gradle를 프로젝트에 맞춰 수정

프로젝트 요구사항에 맞춰서 build.gradle 파일을 수정한다.

mvnrepostiroy : [https://mvnrepository.com/](https://mvnrepository.com/)

위 링크에서 필요한 파일을 받아서 수정하면 좋을 듯하다.

<br/>

## 마무리.

만약에 회사 업무가 아닌 오픈소스로 구성된 프로젝트라면 잘 진행될 것이다.

회사 프로젝트의 경우에는 회사에서 사용하는 라이브러리나 플러그인이 다를 것이기 때문에 약간의 삽질이 필요한 듯하다.

다음 글에서는 `build.gradle`에서 `compile`과 `implementation`의 차이에 대해서, 또한 다른 요소에 대한 분석 글을 작성해야겠다. 



---

**출처**
- https://kimpaper.github.io/2016/07/14/gradle/
- https://dynaticy.tistory.com/entry/Maven-Gradle-%EB%B3%80%ED%99%98-pomxml%EB%A1%9C-buildscript-%EB%A7%8C%EB%93%A4%EA%B8%B0
- https://thecodinglog.github.io/gradle/2019/09/11/install-gradle-in-windows.html