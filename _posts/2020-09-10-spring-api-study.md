---
layout: post
title: "Springboot API 개발하기"
date: 2020-09-10 06:10:00 -0500


---



# 이벤트 생성 API 개발



## 이벤트 API 테스트 클래스 생성

### 스프링 부트 슬라이스 테스트

- @WebMvcTest
  - MockMvc 빈을 자동 설정 해준다. 따라서 그냥 가져와서 쓰면 됨.
  - 웹 관련 빈만 등록해 준다. (슬라이스)



### MockMvc스프링

- MVC 테스트 핵심 클래스
- 웹 서버를 띄우지 않고도 스프링 MVC (DispatcherServlet)가 요청을 처리하는 과정을 확인할 수 있기 때문에 컨트롤러 테스트용으로 자주 쓰임.



### 테스트 할 것입력

- 값들을 전달하면 JSON 응답으로 201이 나오는지 확인.
  - Location 헤더에 생성된 이벤트를 조회할 수 있는 URI 담겨 있는지 확인.
  - id는 DB에 들어갈 때 자동생성된 값으로 나오는지 확인
- 입력값으로 누가 id나 eventStatus, offline, free 이런 데이터까지 같이 주면?
  - Bad_Request로 응답 vs **받기로 한 값 이외는 무시**
- 입력 데이터가 이상한 경우 Bad_Request로 응답
  - 입력값이 이상한 경우 에러
  - 비즈니스 로직으로 검사할 수 있는 에러
  - 에러 응답 메시지에 에러에 대한 정보가 있어야 한다.
- 비즈니스 로직 적용 됐는지 응답 메시지 확인
  - offline과 free 값 확인
- 응답에 HATEOA와 profile 관련 링크가 있는지 확인.
  - self (view)
  - update (만든 사람은 수정할 수 있으니까)
  - events (목록으로 가는 링크)
- API 문서 만들기
  - 요청 문서화
  - 응답 문서화
  - 링크 문서화
  - profile 링크 추가


## 201 응답 받기

### @RestController
- @ResponseBody를 모든 메소드에 적용한 것과 동일하다.

### ResponseEntity를 사용하는 이유
- 응답 코드, 헤더, 본문 모두 다루기 편한 API

### Location URI 만들기
- HATEOS가 제공하는 linkTo(), methodOn() 사용

### 객체를 JSON으로 변환
- ObjectMapper 사용

### 테스트 할 것
- 입력값들을 전달하면 JSON 응답으로 201이 나오는지 확인.
  - Location 헤더에 생성된 이벤트를 조회할 수 있는 URI 담겨 있는지 확인.
  - id는 DB에 들어갈 때 자동생성된 값으로 나오는지 확인

