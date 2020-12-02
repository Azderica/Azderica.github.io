---
title: "[ASP.NET] ASP.NET 시작하기"
data: 2020-08-15
published: true
tags: ['.NET', 'Dotnet', 'ASP.NET', 'Backend']
series: false,
cover_image: ./images/ASPNETLogo.jpeg
canonical_url: false
description: " ASP.NET 개발에 대한 시작글입니다. "
---

# ASP.NET 시작하기

<br/>

## ASP.NET MVC의 이해

### 과거. ASP.NET Web Forms

| 계층적 구조       | 단계                                                         |
| ----------------- | ------------------------------------------------------------ |
| ASP.NET Web Forms | UI 구성요소들의 모음(페이지, 버튼 등) 및  상태가 존재하는 개체-지향 GUI 프로그래밍 모델 |
| ASP.NET           | .NET 응용 프로그램을 IIS상에서 호스트하는 방식, HTTP 요청 및 응답을 통해서 상호작용 가능 |
| .NET              | 다중 언어를 지원하는 관리되는 코드 플랫폼                    |

문제점.

- ViewState로 인한 부하
- 페이지 수명주기
- 취약한 관심사의 분리
- 제한적인 HTML 제어
- 빈약한 추상화
- 테스트의 어려움

### 오늘날의 웹 개발.

1. 웹 표준과 REST의 등장
   - 웹 표준 기술 : HTML, CSS, JS
   - REST(Representational State Transfer)

2. 애자일과 테스트 주도 개발
   - 애자일 개발 방법론 
   - 테스트 주도 개발(Test-Driven Developmnet, TDD)
     - 관련있는 개발론 : 행위 주도 개발(Behavior-Driven Development, BDD)
     - 단위 테스트 도구
     - UI 자동화 도구

3. 루비 온 레일즈(레일즈)
   - MVC 아키텍처를 채용
   - HTTP 프로토콜과 어우러짐
   - 규약(Convention)을 권장
   - 개체-관계 매퍼(Object Relational Mapping, ORM) 도구를 통합

4. Node.js
   - JavaScript를 사용
   - 철저하게 비동기적

### ASP.NET MVC의 주요 장점

1. MVC 아키텍쳐
   - 사용자는 MVC 프로그램과 자연스러운 상호작용
   - 웹 응용프로그램은 서로 다른 기술들의 결합으로 구성
2. 확장성
   - 프레임워크가 제공하는 기본 구현된 구성요소 사용
   - 기본 구현을 상속받은 다음, 하위 클래스(subclass)를 구현
   - 인터페이스나 추상 기본 클래스를 새롭게 구현해서 구성요소 전체를 교체
3. HTML과 HTTP에 대해 강력한 제어
   - 표준을 준수하는 깔끔한 마크업
   - HTTP와 잘 어울러져 동작
4. 테스트 용이성
   - 독립적으로 나눠지도록 만들어서 텟그트 하기 용이
   - NUnit같은 오픈 소스 단위 테스트 도구 사용 가능
   - 여러 테스트 기법과 Mocking 기법 활용
5. 강력한 라우팅 시스템
   - URL 라우팅 기능을 통해 깔끔한 URL 제공
6. ASP.NET 플랫폼의 장점들을 기반으로 만들어진 ASP.NET MVC
   - 구성요소들 및 장치들을 제공
   - 인증, 멤버십, 프로필, 국제화 등 기존 ASP.NET 플랫폼의 내장된 기능으로 코드를 줄여줌
7. 현대적인 API
   - 최신 언어 및 런타임 타임 제공
8. 오픈소스인 ASP.NET MVC
   - 원본 코드를 다운 받을 수 있음
   - 원본 소스에 접근하기 편함



예제 코드 : www.apress.com/9781430265290

책 : 프로 ASP.NET MVC 5 프레임 워크

개발 환경 : Visual Studio 2013





