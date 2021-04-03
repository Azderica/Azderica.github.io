---
title: '[Springboot] Gradle을 좀 더 자세하게 알아보기'
slug: 03-springboot-gradle
date: 2020-10-25
published: true
tags: ['Springboot', 'Groovy', 'Gradle', 'Backend']
series: true
cover_image: ./images/SpringLogo.png
canonical_url: false
description: ' Build.Gradle에 대한 차이에 대한 글입니다. '
---

# Gradle을 좀 더 파헤쳐보자.

이전글

- [Maven과 Gradle의 차이](./springboot-maven-gradle-difference)
- [Maven과 Gradle로 바꾸기](./springboot-maven-gradle-change)

이전글에서 maven과 gradle에 대해 설명하고, maven에서 gradle로 바꾸는 방법에 대해서 글을 작성하였다.

그러나 `build.gradle`을 구성하면서 groovy 문법에 대해서, 더 나아가서 gradle에 대해서 좀 더 상세하게 알아봐야함을 느꼈다.

<br/>

## Gradle 정의

자난번에 간략하게 설명했지만, 간략하게 설명하자면 다음과 같다.

- maven을 대체할 빌드 도구(build tool)이다.
- Groovy 기반의 DSL(Domain Specific Language)를 사용한다.
- 스프링 오픈소스 프로젝트이며, 안드로이드 스튜디오에서도 사용하고 있다.

참고 사이트 : [Gradle 공식 사이트](https://gradle.org/)

<br/>

## Gradle 프로젝트에 대해

gradle의 구성은 다음과 같다. Spring gradle 에서 자주 볼수 있는 세팅이다.

```
.
├── build.gradle
├── gradle
│   └── wrapper
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradlew
├── gradlew.bat
├── settings.gradle
└── src
    ├── main
    │   └── java
    │       └── App.java
    └── test
        └── java
            └── AppTest.java
```

하나씩 설명해보자면, 다음과 같다.

- .gradle 폴더
  - Gradle이 사용하는 폴더
  - 작업(task)로 생성된 파일이며 수정할일은 거의 없다.
- gralde 폴더
  - Gradle이 필요한 경우 사용할 폴더
  - Gradle 환경을 정리한 **"wrapper 파일"** 이라는 파일들이 저장되어 있다.
- src 폴더
  - 프로젝트에서 만든 프로그램 관련 폴더
  - 소스 코드 파일이나 각종 리소스 파일 등과 같이 프롲젝트에서 사용하는 파일이 있다.
  - Maven의 구조와 비슷하다.
- build.gradle
  - Gradle 기본 빌드 설정 파일
  - 프로젝트의 빌드 처리에 대해서 내용이 작성되어 있음
- gradlew, gradlew.bat
  - Gradle의 명령어
  - bat가 붙어있는 것이 window용이고, 안붙은게 macOS나 Linux용이다.
- settings.gradle
  - 프로젝트에 대한 설정 정보를 작성한 파일이다.

여기서 가장 중요한 파일은 `src파일`과 `build.gradle` 파일이다.

<br/>

## Gradle의 init 명령과 type 종류

해당 게시글은 아래의 링크에서 참고하면 좋을 듯하다.

: [http://devkuma.com/books/pages/1069](http://devkuma.com/books/pages/1069)

<br/>

## Gradle Wrapper란.

Ant로 구성된 프로젝트는 git으로 받아서 빌드를 할려면 Ant를 설치해야한다. 그러나 이 경우, 설치와 버전이 다른 부분때문에 어려운 부분이 많다. Gradle은 이 문제를 해결하기 위해 Gradle이 실행하는 스크립트를 소스 트리 안에 포함시킨 Gradle Wrapper을 제공한다.

Gradle Wrapper은 이전에 말한 gradlew/gradlew.bat으로 실행하며, 처음 실행하면 지정된 버전의 Gradle과 플러그인을 다운받아 설치해버리기 때문에 편의성을 가진다.

`gradle init`을 하면 자동으로 gradle wrapper가 생성되지만 `gradle wrapper`로 따로 만들 수도 있다.

<br/>

## build.gradle을 좀 더 자세하게 보면.

다음과 같은 build.gradle이 있을 때.

```gradle
// Apply the java plugin to add support for Java
apply plugin: 'java'

// Apply the application plugin to add support for building an application
apply plugin: 'application'

// In this section you declare where to find the dependencies of your project
repositories {
    // Use jcenter for resolving your dependencies.
    // You can declare any Maven/Ivy/file repository here.
    jcenter()
}

dependencies {
    // This dependency is found on compile classpath of this component and consumers.
    compile 'com.google.guava:guava:22.0'

    // Use JUnit test framework
    testCompile 'junit:junit:4.12'
}

// Define the main class for the application
mainClassName = 'App'
```

하나씩 설명하면 다음과 같다.

### 플러그인 추가

```gradle
apply plugin: 'java'
```

- `apply plugin:`
  - Gradle 플러그인을 사용하기 위한 것
- `apply plugin: 'java'`
  - Java 프로그램을 위한 기능을 제공하는 플러그인
  - compileJava이라는 테스크는 이 java 플러그인에서 제공한다.
- `apply plugin: 'application'`
  - 응용 프로그램에 대한 기능을 제공하는 플러그인
  - application 플로그인을 통해 run 응용 프로그램을 실행할 수 있다.

### 메인 클래스 이름

- `mainClassName = 'App'`
  - application 플러그인으로 사용되는 것, 메인 클래스를 지정
  - ruin으로 응용프로그램을 실행할 수 있는 이유가 이 mainClassName 메인 클래스가 지정되어 있기 때문이다.

### 저장소(repositories)

저장소(repositories)는 각종 프로그램들이 저장되는 위치이다. 이 저장소는 "어떤 저장소를 사용하는지"를 빌드 파일에 작성하여 설정할 수 있다.

- `mavenCentral()`
  - Apache Maven 중앙 저장소를 이용하기 위한 것.
  - Gradle은 중앙 저장소를 그대로 사용할 수 있다.
- `jcenter()`
  - Maven과 Gradle 등 각종 빌드 도구에서 사용할 수 있는 공개 저장소

mavenCentral()와 jcenter()는 Gradle 메소드이며 이러한 repositories 안에서 호출하여 지정된 저장소를 사용할 수 있다.

### 의존 라이브러리(dependencies)

저장소에서 필요한 라이브러리를 사용하는데 사용할 수 있는 것이 dependencies이다.

- `compile 'com.google.guava:guava:22.0'`
  - **컴파일시 의존 라이브러리**
  - 라이브러리가 컴파일 시에 참조된다.
- `testCompile 'junit:junit:4.12'`
  - **테스트 컴파일시 의존 라이브러리**
- `calsspath '... 라이브러리 ...'
  - 지정된 라이브러리를 클래스 경로에 추가할 수 있다
  - 컴파일ㅅ에서 실행시까지 의존하는 라이브러리 지정에 사용한다.

#### implementation과 compile의 차이

가끔 다른 프로젝트를 보면 implementation과 compile로 되어 있는 것을 볼 수 있다. 이는 무슨 차이일까?

간단하게 설명하면 다음과 같다.

- Compile의 경우.
  - A라는 모듈을 수정하게 되면 A를 간접 의존하는 B와 직접 의존하는 C가 있을 때, 둘다 재빌드한다.
- Implementation의 경우
  - A라는 모듈의 경우, A를 직접 의존하는 C만 재빌드한다.

##### Implementation의 장점

1. compile보다 빠르다
   - 적은 recompile을 하므로
2. API 노출이 적다.
   - Design Pattern 중 Transparency(투명도)의 장점이 드러난다.
   - compile을 사용하게되면 연결된 모든 모듈의 API가 노출된다.
   - 그러나 Implementation은 그렇지 않다.

Gradle 3.0부터는 compile을 비추천하고 있다.

참고하면 좋은 글 : [https://hack-jam.tistory.com/13]()

---

**출처**

- [http://devkuma.com/books/pages/1064](http://devkuma.com/books/pages/1064)
- [http://devkuma.com/books/pages/1068](http://devkuma.com/books/pages/1068)
- [https://ddmix.blogspot.com/2019/10/get-used-to-gradle.html?m=1](https://ddmix.blogspot.com/2019/10/get-used-to-gradle.html?m=1)
- [https://hack-jam.tistory.com/13]()
