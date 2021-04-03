---
title: '[Review] Clean Code 내용정리 - 2'
slug: 02-clean-code
date: 2020-11-06
published: true
tags: ['Review', 'Book', 'CleanCode', 'Clean-code', 'Java']
series: true
cover_image: ./images/CleancodeBook.jpg
canonical_url: false
description: ' Clean code 책 정리 2편입니다. '
---

# Clean Code 내용 정리 - 2

## 4장. 주석

부정확한 주석은 아예 없는 주석보다 나쁘다.

1.  주석은 나쁜 코드를 보완하지 못한다.
    - 코드에 주석을 추가하는 일반적인 이유는 코드 품질이 나쁘기 때문에, 주석보다는 코드를 정리를 해야 한다.
2.  코드로 의도를 표현하기.
    - 많은 경우에서 주석에서 할 수 있는 설명을 함수로 표현해도 충분하다

### 좋은 주석

1.  법적인 주석

    - 회사가 정립한 구현 표준을 지켜야 하는 경우

2.  정보를 제공하는 주석

    - 기본적인 정보를 주석으로 제공

    - Ex)

      ```java
      // kk:mm:ss EEE, MMM dd, yyyy 형식이다.
      Pattern timeMatcher = Pattern.compile(
          "\\d*:\\d*:\\d* \\w*, \\w*, \\d*, \\d*");
      ```

3.  의도를 설명하는 주석

    - 의도를 표현

    - Ex)

      ```java
      public void testConcurrentAddWidgets() throw Exception {
        ...
        // 스레드를 대량 생성하는 방법으로 어떻게든 경쟁 조건을 만들려 시도한다.
        for(int i=0; i<25000; i++){
          WidgetBuilderThread widgetBuilderThread = new WidgetBuilderThread(widgetBuilder, text, parent, failFlag);
          Thread thread = new Thread(widgetBuilderThread);
          thread.start();
        }
        assertEquals(false failFlag.get());
      }
      ```

4)  의미를 명료하게 밝히는 주석

    - 모호한 인수나 반환 값의 의미를 읽기 좋게 표현

    - Ex)

      ```java
      ...

      assertThat(a.compareTo(a) == 0);    // a == a
      assertThat(a.compareTo(b) != 0);    // a != b
      ...
      ```

5.  결과를 경고하는 주석

    - 결과를 경고할 목적

    - Ex)

      ```java
      public static SimpleDateFormat makeStandardHttpDataFormat(){
        // SimpleDateFormat은 스레드에 안전하지 못하다.
        // 따라서 각 인스턴스를 독립적으로 생성해야 한다.
        SimpleDateFormat df = new SimpleDateFormat("EEE, dd MMM. yyyy HH:mm:ss z");
        df.setTimeZone(TimeZone.getTimeZone("GMT"));
        return df;
      }
      ```

6.  TODO 주석

    - 앞으로 할 일을 설명할 때 괜찮다.

    - Ex)

      ```java
      // TODO-MdM 현재 필요하지 않다
      // 체크아웃 모델을 도입하면 함수가 필요 없다.
      protected VersionInfo makeVersion() throws Exception{
        return null;
      }
      ```

7.  중요성을 강조하는 주석

    - 중요성을 강조하기 위해 주석을 사용한다.

    - Ex)

      ```java
      String listItemContent = match.group(3).trim();
      // 여기서 trim은 정말 중요하다. trim 함수는 문자열에서 시작 공백을 제거한다.
      // 문자열에 시작 공백이 있으면 다른 문자열로 인식되기 때문이다.
      new ListItemWidget(this, listItemContent, this.level + 1);
      return buildList(text.substring(match.end()));
      ```

8.  공개 API에서 Javadocs

    - 설명이 잘 된 공개 API를 사용하는 것도 방법.

### 나쁜 주석

1.  주절거리는 주석
2.  같은 이야기를 중복하는 주석
3.  오해할 여지가 있는 주식
4.  의무적으로 다는 주석
5.  이력을 기록하는 주석
6.  있으나 마나 한 주석
7.  무서운 잡음 : 의미 없는 주석
8.  함수나 변수로 표현할 수 있다면 주석을 달지 말기.
9.  위치를 표시하는 주석
    - Ex) `// Action//////////////`
    - 반드시 필요할 때만, 아주 드물게 사용하기
10. 닫는 괄호에 다는 주석
11. 공로를 돌리거나 저자를 표시하는 주석
12. 주석으로 처리한 코드
13. HTML 주석
    - 너무 지저분하다.
14. 전역 정보
15. 너무 많은 정보
16. 모호한 관계
    - 주석과 주석이 설명하는 코드는 둘 사이 관계가 명백해야 한다.
17. 함수 헤더
    - 짧은 함수는 긴 설명이 필요 없다.
18. 비공개 코드에서 Javadocs
    - 공개하지 않을 코드라면 Javadocs는 쓸모가 없음.

## 5장. 형식 맞추기

프로그래머라면 형식을 깔끔하게 맞춰 코드를 짜야하고, 코드 형식을 맞추기 위한 간단한 규칙을 정하고 이를 수행해야 한다.

### 형식을 맞추는 목적

- 코드 형식은 중요하다.
- 오늘 구현한 코드는 다음 버전에서 바뀔 확률이 높으며, 구현한 코드의 가독성은 이후 바뀔 코드의 품질에 지대한 영향을 미친다.

### 적절한 행 길이를 유지하기 (세로 형식)

사실 200줄 정도인 파일로도 커다란 시스템을 구축할 수 있다.

1.  신문 기사처럼 작성하기

    - 좋은 신문 기사는 최상단에서 기사를 몇 마디로 요약하는 표제가 있다.
    - 소스파일도 이름은 간단하면서 설명이 가능하게 짓는다.
    - 신문이 다양한 기사로 이뤄지는 것처럼, 소스 코드도 그렇게 구성한다.

2.  개념은 빈 행으로 분리하기

    - ```java
      // 좋은 케이스
      private String function1(){
        ...
      };

      private String function2(){
        ...
      };

      // 나쁜 케이스
      private String function1(){
        ...
      };
      private String function2(){
        ...
      };
      ```

3.  세로 밀집도

    - 줄 바꿈이 개념을 분리한다면, 세로 밀집도는 연관성을 의미

4.  수직거리

    - 서로 밀집한 개념은 세로로 가까이 둔다. 단, 다른 파일에 속한다면 규칙은 통하지 않는다.

    - 타당한 근거가 없다면 서로 밀접한 개념은 한 파일에 속해야 한다.

    - **변수 선언**

      - 변수는 사용하는 위치에 최대한 가까이 선언

    - **인스턴스 변수**

      - 인스턴스 변수는 클래스 맨 처음에 선언

    - **종속 함수**

      - 한 함수가 다른 함수를 호출한다면, 두 함수는 세로로 가까이 배치한다.

    - **개념적 유사성**

      - 개념적인 친화도가 높을수록 코드를 가까이 배치한다.

5.  세로 순서

    - 일반적으로 함수 호출 종속성은 아래 방향으로 유지

### 가로 형식 맞추기

일반적으로는 가로길이는 45자 근처이다. (가급적으로는 120자 정도를 제한)

1.  가로 공백과 밀집도

    - 가로 공백을 사용해 밀집한 개념과 느슨한 개념을 표현

    - Ex)

      ```java
      private void measureLine(String line){
        lineCount++;
        int lineSize = line.length();    // 느슨한 개념
        totalhars += lineSize;
        lineWidthHistogram.addLine(lineSize, lineCount);
        recordWidestLine(lineSize);        // 밀집한 개념
      }
      ```

2.  가로 정렬

    - 코드처럼 선언부가 길다면 클래스를 쪼개야 한다는 의미

3.  들여 쓰기

    - scope로 이뤄진 계층을 보여준다.
    - **"들여 쓰기 무시하기"를** 피하기

4.  가짜 범위

    - 세미콜론은 새 행에다 제대로 들여 써서 넣어준다.

### 팀 규칙

좋은 소프트웨어 시스템은 읽기 쉬운 문서로 이뤄 저 야한다.

## 6장. 객체와 자료 구조

### 자료 추상화

- 자료를 세세하게 공개하기보다는 추성적인 개념으로 표현하는 편이 좋다.
- 아무 생각 없이 GET/SET을 추가하는 방법은 좋지 않다.

### 자료/객체 비대칭

- 모든 것이 객체가 좋은 것은 아니고, 단순한 자료 구조와 절차적인 코드가 좋을 때도 있음
- 객체 지향 코드에서 어려운 변경은 절차적인 코드에서 쉽고, 절차적인 코드에서 어려운 변경은 객체 지향 코드에서 쉬움.

### 디미터 법칙

> 모듈은 자신이 조작하는 객체의 속사정을 몰라야 한다는 법칙  
> 즉, 객체의 내부를 몰라야 한다는 법칙

1.  기차 충돌

    - ```java
      // 기차 충돌 코드
      final String outputDir = ctxt.getOptions().getScratchDir().getAbsolutePath();

      // 이를 방지하는 코드
      Options opts = ctxt.getOptions();
      File scratchDir = opts.getScratchDir();
      final String outputDir = scratchDir.getAbsolutePath();

      // 단, 아래의 코드는 디미터 법칙과 상관 없음.
      final String outputDir = ctxt.options.scratchDir.absolutePath;
      ```

    - 자료 구조는 무조건 함수 없이 공개 변수만 포함한다면, 문제는 간단하겠지만  
      그럴 수 없기 때문에 요구하는 프레임워크와 표준(ex. 빈)이 존재한다.

2.  잡종 구조

    - 잡종 구조는 절차적과 객체적의 단점만 모아놓은 구조이기 때문에, 피하는 편이 좋다.

3.  구조체 감추기

### 자료 전달 객체

DTO나 빈 구조 등을 사용한다

- 활성 레코드
  - DTO의 특수한 형태, 자료 구조로 취급하기
  - 비즈니스 규칙은 넣는 것이 아니고, 비즈니스 규칙을 넣고 싶으면 내부 자료를 숨기는 객체를 따로 생성한다.

### 결론

- 객체는 동작을 공개하고 자료를 숨긴다. 그러나, 자료 구조는 별다른 도작 없이 자료를 노출한다.
- 어떤 시스템을 구현할 때
  - 새로운 자료 타입을 추가하는 유연성이 필요하면 객체를 선택.
  - 새로운 동작을 추가하는 유연성이 필요하면 자료 구조와 절차적인 코드가 더 적합하다.
