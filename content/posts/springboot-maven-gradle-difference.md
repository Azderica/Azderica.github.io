---
title: "[Springboot] Maven과 Gradle의 차이"
date: 2020-10-14
published: true
tags: ['Springboot', 'Maven', 'Gradle', 'Difference', 'Backend']
series: true,
cover_image: ./images/SpringLogo.png
canonical_url: false
description: " Maven과 Gradle에 대한 차이에 대한 글입니다. "

---

# Maven과 Gradle.

최근 회사 업무를 진행하면서 Spring boot 프로젝트 중 하나를 maven에서 gradle로 수정해야하는 일이 발생했다.

생각해보니, 둘이 다른 것은 알고 있었지만 어떻게 다른가에 대해서는 생각해본적이 없다.

해당 프로젝트를 진행하면서 둘의 차이를 인지해볼려고 한다. 그리고 왜 바꿔야하는지를 알려고 한다.

<br/>

## Maven과 Gradle의 차이

### Maven
> 자바용 프로젝트 관리 도구, 아파치 Ant의 대안으로 만들어졌다.

특징
- 빌드를 쉽게할 수 있다.
- `pom.xml`을 이용한 정형화된 빌드 시스템을 사용할 수 있다.
- 뛰어난 프로젝트 정보를 제공한다
- 개발 가이드 라인을 제공한다
- 새로운 기능을 쉽게 설치할 수 있고 업데이트할 수 있다.

### Gradle
> Groovy를 이용한 빌드 자동화 시스템이다. Maven 이후에 나왔다.

> Android의 OS 공식 빌드 도구로 사용됩니다.

특징
- Ant처럼 유연한 범용 빌드 도구를 사용한다.
- Maven을 사용할 수 있는 변환 가능 컨벤션 프레임 워크입니다.
- 멀티 프로젝트에 사용하기 좋습니다.
- Apache Ivy에 기반을 두어 강력한 의존성 관리를 제공합니다.
- Mavenrhk Ivy 레파지토리를 완전 지원합니다
- 원격 저장소나 pom, ivy 파일 없이 연결되는 의존성을 관리하고 지원합니다,
- 그루비 문법을 사용합니다.
- 빌드를 설명하는 풍부한 도메인 모델을 사용합니다.

### Maven보다는 Gradle을 선택하자.

Gradle이 시기적으로 늦게 나오게 되면서 사용성, 성능 등 뛰어난 스펙을 사용합니다.

좋은 점을 나열한다면.
- Maven처럼 Build라는 동적 요소를 XML을 사용하기에는 어려운 부분이 있습니다.
  - 설정 내용이 길어지고 가독성이 떨어집니다.
  - 의존관계가 복잡한 프로젝트 설정에는 부적절합니다.
  - 상속구조를 이용해 멀티 모듈을 구성해야합니다.
  - 특정 설정을 소수의 모듈에서 공유하기 위해서는 부모 프로젝트를 생성하여 상속해야합니다.
- Gradle은 Groovy를 사용하기 때문에, 동적인 빌드는 Groovy 스크립트로 플러그인을 호출하고 직점 코드를 구성할 수 있습니다.
  - Configruation Injection(의존성 주입) 방식을 사용해서 공통 모듈을 상속해서 사용하는 단점을 해결합니다.
  - 설정 주입 시 프로젝트의 조건을 체크할 수 있어서 프로젝트별로 주입되는 설정을 다르게 할 수 있습니다.
- **가장 중요한 것은 규모가 커질수록 속도가 월등하게 빠릅니다.**
  - 일반적인 경우
    - ![image](https://user-images.githubusercontent.com/42582516/95992954-7a3b6580-0e69-11eb-9ebe-4b057e33bd17.png)
  - 큰 멀티 프로젝트
    - ![image](https://user-images.githubusercontent.com/42582516/95992968-7f001980-0e69-11eb-99cd-24a17dd14570.png)
  - 어떤 방법으로 이러한 차이를 내나면.
    - Gradle Daemon은 "hot"이라는 정보를 메모리에 저장하여 프로세스에 길게 유지시킵니다.
    - 다양한 tasks의 타입의 증가하는 input과 output에 새로 실행할 필요가 없습니다.
    - incremental compilation을 통해 소스와 클래스의 종속성을 분석하여 변경되는 부분만 다시 컴파일 시킵니다.
    - 이미 생성된 캐시를 새로 생성하지 않고, 가져옵니다.
    - Gradle의 smart class 경로 분석기는 라이브러리가 변경되지않은 경우, 불필요한 컴파일을 방지합니다.
    - Java Library 플러그인을 사용해서 종속성을 더 잘 모델링하고 컴파일 클래스 경로를 줄여서 성능을 향상시킵니다.

이러한 부분에서 Gradle이 Maven보다 좋은 점을 알 수 있었습니다.

원래 포스터의 내용은 Gradle에서 Maven으로 수정하는 부분을 작성하는 것이였는데 너무 길어져서 다음 포스팅에 작성할 예정입니다.

---

**출처**
- https://gradle.org/
- https://maven.apache.org/
- http://egloos.zum.com/kwon37xi/v/4747016
- https://bkim.tistory.com/13
- https://okky.tistory.com/179
