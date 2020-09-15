---
layout: post
title: "Springboot API - HATEOAS와 Self-Describtive Message 적용"
date: 2020-09-14 06:10:00 -0500


---



# HATEOAS와 Self-Describtive Message 

<br/>

## 스프링 HATEOAS 소개

### 스프링 HATEOAS
- https://docs.spring.io/spring-hateoas/docs/current/reference/html/
- 링크 만드는 기능
  - 문자열 가지고 만들기
  - 컨트롤러와 메소드로 만들기
- 리소스 만드는 기능
  - 리소스: 데이터 + 링크
- 링크 찾아주는 기능
  - Traverson
  - LinkDiscoverers
- 링크
  - HREF
  - REL
    - self
    - profile
    - update-event
    - query-events

<img src="https://user-images.githubusercontent.com/42582516/93029741-704ef880-f658-11ea-8e27-81d626a05ed8.png" alt="image" style="zoom:30%;" />


<br/>

## 스프링 HATEOAS 적용

### EvnetResource 만들기
- extends ResourceSupport의 문제
  - @JsonUnwrapped로 해결
  - extends Resource<T>로 해결

### 테스트 할 것
- 응답에 HATEOA와 profile 관련 링크가 있는지 확인.
  - self (view)
  - update (만든 사람은 수정할 수 있으니까)
  - events (목록으로 가는 링크)


<br/>

## 스프링 REST Docs 소개
https://docs.spring.io/spring-restdocs/docs/2.0.2.RELEASE/reference/html5/

### REST Docs 코딩
- andDo(document(“doc-name”, snippets))
- snippets
  - links()
  - requestParameters() + parameterWithName()
  - pathParameters() + parametersWithName()
  - requestParts() + partWithname()
  - requestPartBody()
  - requestPartFields()
  - requestHeaders() + headerWithName()
  - requestFields() + fieldWithPath()
  - responseHeaders() + headerWithName()
  - responseFields() + fieldWithPath()
  - ...
- Relaxed*
- Processor
  - preprocessRequest(prettyPrint())
  - preprocessResponse(prettyPrint())
  - ...

### Constraint
https://github.com/spring-projects/spring-restdocs/blob/v2.0.2.RELEASE/samples/rest-notes-spring-hateoas/src/test/java/com/example/notes/ApiDocumentation.java


<br/>

## 스프링 REST Docs 적용

### REST Docs 자동 설정
- @AutoConfigureRestDocs

### RestDocMockMvc 커스터마이징
- RestDocsMockMvcConfigurationCustomizer 구현한 빈 등록
- @TestConfiguration

### 테스트 할 것
- API 문서 만들기
  - 요청 본문 문서화
  - 응답 본문 문서화
  - 링크 문서화
    - profile 링크 추가
  - 응답 헤더 문서화

