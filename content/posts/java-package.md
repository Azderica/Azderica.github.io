---
title: '[Java] Package.'
slug: 07-java-study
date: 2020-12-30
published: true
tags: ['Java', 'Stater', 'Package', 'Import', 'Classpath']
series: false
cover_image: ./images/JavaLogo.jpg
canonical_url: false
description: 'Package에 대해 정리합니다.'
---

# Java Package

최근 백기선님의 자바 스터디를 알게되어서, 한번 자바에 대한 개념을 스터디를 통해서 잡고 가면 좋을 듯해서 글에 대해서 정리해보겠습니다. 아래는 7주차 내용입니다.

공부할 내용

- package 키워드
- import 키워드
- 클래스패스
- CLASSPATH 환경변수
- -classpath 옵션
- 접근지시자

<br/>

## Package란.

### Java Package란?

자바의 패키지란 **비슷한 성격의 클래스를 모아서 만든 자바의 디렉토리**입니다.

자바에서는 다수의 클래스를 정의하기 때문에 애플리케이션에서 클래스를 정리할 필요가 있습니다. 그래서 이를 정리하기 위해 **패키지**를 사용합니다.

패키지는 다음과 같은 특성을 가집니다.

- 자바는 패키의 가장 상위 디렉토리에서 실행한다는 약속이 있습니다.
- 소스 코드 맨 첫 줄에 있어야하고, 패키지 선언은 소스 코드에 단 하나만 있어야합니다.
- 패키지 이름과 위치한 폴더는 동일 해야합니다.
- 패키지 이름은 'java'로 시작하면 안됩니다.

```java
package week7;

public class PackageExample {

 public void printPackage(){
  System.out.println("This is Package");
  System.out.println("package name : package week7");
 }

}
```

위의 코드에서 package week7이 자바의 패키지입니다.

### Package 이름 규칙

- java 패키지 이름은 모두 소문자로 구성되어 있습니다.
- 자바의 예약어를 사용하면 안됩니다.
- 다음과 같은 시작 패키지 규칙이 있습니다.
  - `java` : 자바 기본 패키지 개발
  - `javax` : 자바 확장 패키지 개발
  - `org` : 오픈소스 패키지
  - `com` : 회사 패키지

> FQCN

**FQCN**이란, Fully Qualified Class Name의 약자입니다.

즉, String의 클래스 패키지는 `java.lang`이고 FQCN은 `java.lang`이며 FQCN은 `java.lang.String`이 됩니다.

<br/>

## Import란.

다음과 같은 구성을 가지고 있습니다.

아래는 예제 코드입니다. (아시아 현재 시간을 가져오는 예제 코드)

```java
package week7;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class ImportExample {

    public static void printCurrentTime() {
        TimeZone time;
        Date date = new Date();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        // 현재 아시아 시간 가져오기
        time = TimeZone.getTimeZone("Asia/Seoul");
        df.setTimeZone(time);
        System.out.format("%s %n %s %n", time.getDisplayName(), df.format(date));
    }

}
```

해당 코드에서 확인할 수 있듯이, `import`는 `import 패키지명.클래스명`의 구조를 가집니다. 일반적으로 다른 패키지명에 있는 클래스를 찾지 못할 때 사용합니다.

여러가지 팁을 가지는데.

- `import 패키지명.*` 을 사용한다면 해당 패키지의 다수 클래스를 `import` 할 수도 있습니다.
- `command(mac)/alt(window) + Enter`시, 바로 import 기능을 사용할 수 있습니다. (Intelij 기능)
- `import static`을 사용하는 경우, static한 변수나 메소드를 사용할 때 용이합니다.
- `java.lang` 패키지나 같은 패키지의 경우에는 `import`를 하지 않아도 됩니다.

<br/>

## CLASSPATH에 대해서.

**클래스를 찾기 위한 경로**를 의미합니다.

JVM이 프로그램을 실행할 때, 클래스 파일을 찾기 위해서 클래스 패스를 이용합니다. 이를 다르게 말하자면 JVM은 클래스 패스의 경로를 확인해서 라이브러리의 위치를 참조합니다.

이를 좀 더 자세하게 설명하기 위해서는 자바 프로그램의 실행과정을 아는 것이 중요한데, 이를 간단하게 순서를 정리하자면.

1. 프로그램이 실행시, JVM은 프로그램이 필요로 하는 메모리를 할당받습니다.
2. 자바 컴파일러가 자바 코드를 바이트 코드로 변환합니다.
3. 클래스 로더를 통해 클래스 파일을 JVM에 올려놓습니다.
4. 올려진 클래스 파일을 Execution Engine을 통해 해석합니다.
5. 해석된 바이트 코드는 Runtime Data Area에서 수행됩니다.

좀 더 자세하게 알고 싶으면 [해당 게시글](https://Azderica.github.io/00-java-jvm/)을 참고하면 좋습니다.

다음 자바 프로그래밍 과정 중에서 2번이 끝나고, 소스 코드가 바이트 코드가 되었을 때, java runtime으로 .class 파일에 있는 명령을 하기 위해서는 클래스 패스로 파일을 찾을 수 있어야합니다.

일반적으로 이 클래스 패스를 찾는 방법은 크게 2가지 방법이 있습니다.

### CLASSPATH 환경 변수.

이 방법은 컴퓨터 시스템 변수 설정을 통해서 지정합니다.

`CLASSPATH=.;C:\Program Files\Java\jdk-10.0.1\lib\tools.jar`

일반적으로 윈도우에서 자바를 설정할 때, 아래의 사진을 많이 보게됩니다.

![class-path-1](https://user-images.githubusercontent.com/42582516/103354435-dfa90500-4aee-11eb-8bc4-eb0794fc146b.png)

### -classpath 옵션.

`javac <options> <source files>`와 같은 형식을 가집니다. 이 방법은 자바 컴파일러가 컴파일 시, 필요로 하는 참조 클래스 파일을 찾기 위해 경로를 지정해주는 옵션입니다.

예를 들자면 다음과 같은 명령어로 진행합니다. (`;` 으로 구분 가능합니다.)

```sh
javac -classpath .;C:\Java\Example;C:\Java\Test.java
```

<br/>

## 접근 지시자.

크게 4가지로 구성됩니다. (public, protected, default, private)

| 접근 지시자 | 클래스 내부 | 동일 패키지 | 상속받은 클래스 | import한 클래스 |
| ----------- | ----------- | ----------- | --------------- | --------------- |
| public      | o           | o           | o               | o               |
| protected   | o           | o           | o               | x               |
| default     | o           | o           | x               | x               |
| private     | o           | x           | x               | x               |

다음과 같은 특징을 가집니다.

---

**출처**

- https://kils-log-of-develop.tistory.com/430
- https://blog.opid.kr/62
- https://effectivesquid.tistory.com/entry/자바-클래스패스classpath란
- http://blog.naver.com/PostView.nhn?blogId=minsuk0123&logNo=44865799
- https://hyoje420.tistory.com/7
