---
title: "[Springboot API] Springboot REST API : 이벤트 생성 API 개발"
date: 2020-09-10
published: true
tags: ['Spring', 'Springboot', 'Springboot API', 'REST API', 'Backend']
series: true,
cover_image: ./images/SpringLogo.png
canonical_url: false
description: " 'Springboot REST API'의 두번째 게시글입니다. "
---


# 이벤트 생성 API 개발


<br/>


## 이벤트 생성 API 구현 : 이벤트 API 테스트 클래스 생성

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


<br/>


## 이벤트 생성 API 구현 : 201 응답 받기

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

<br/>


## 이벤트 생성 API 구현 : EventRepository 구현

### 스프링 데이터 JPA
- JpaRepository 상속 받아 만들기

### Enum을 JPA 맵핑시 주의할 것
- @Enumerated(EnumType.STRING)

### @MockBean
- Mockito를 사용해서 mock 객체를 만들고 빈으로 등록해 줌.
- (주의) 기존 빈을 테스트용 빈이 대체 한다.

### 테스트 할 것
- 입력값들을 전달하면 JSON 응답으로 201이 나오는지 확인.
  - Location 헤더에 생성된 이벤트를 조회할 수 있는 URI 담겨 있는지 확인.
  - id는 DB에 들어갈 때 자동생성된 값으로 나오는지 확인
  
<br/>


## 이벤트 생성 API 구현 : 입력값 제한하기

### 입력값 제한
- id 또는 입력 받은 데이터로 계산해야 하는 값들은 입력을 받지 않아야 한다.
- EventDto 적용

### DTO -> 도메인 객체로 값 복사
- ModelMapper
```xml
<dependency>
            <groupId>org.modelmapper</groupId>
            <artifactId>modelmapper</artifactId>
            <version>2.3.1</version>
</dependency>
```

### 통합 테스트로 전환
- @WebMvcTest 빼고 다음 애노테이션 추가
  - @SpringBootTest
  - @AutoConfigureMockMvc
- Repository @MockBean 코드 제거

### 테스트 할 것
- 입력값으로 누가 id나 eventStatus, offline, free 이런 데이터까지 같이 주면?
  - Bad_Request로 응답 vs 받기로 한 값 이외는 무시  


<br/>


## 이벤트 생성 API 구현 : 입력값 이외에 에러 발생

### ObjectMapper 커스터마이징
- spring.jackson.deserialization.fail-on-unknown-properties=true

### 테스트 할 것
- 입력값으로 누가 id나 eventStatus, offline, free 이런 데이터까지 같이 주면?
  - Bad_Request로 응답 vs 받기로 한 값 이외는 무시


<br/>

## 이벤트 생성 API 구현 : Bad Request 처리하기

### @Valid와 BindingResult (또는 Errors)
- BindingResult는 항상 @Valid 바로 다음 인자로 사용해야 함. (스프링 MVC)
- @NotNull, @NotEmpty, @Min, @Max, ... 사용해서 입력값 바인딩할 때 에러 확인할 수 있음

### 도메인 Validator 만들기
- Validator 인터페이스 없이 만들어도 상관없음

### 테스트 설명 용 애노테이션 만들기
- @Target, @Retention

### 테스트 할 것
- 입력 데이터가 이상한 경우 Bad_Request로 응답
  - 입력값이 이상한 경우 에러
  - 비즈니스 로직으로 검사할 수 있는 에러
  - 에러 응답 메시지에 에러에 대한 정보가 있어야 한다.

<br/>

## 이벤트 생성 API 구현 : Bad Request 응답 본문 만들기

### 커스텀 JSON Serializer 만들기
- extends JsonSerializer<T> (Jackson JSON 제공)
- @JsonComponent (스프링 부트 제공)

### BindingError
- FieldError 와 GlobalError (ObjectError)가 있음
- objectName
- defaultMessage
- code
- field
- rejectedValue

### 테스트 할 것
- 입력 데이터가 이상한 경우 Bad_Request로 응답
  - 입력값이 이상한 경우 에러
  - 비즈니스 로직으로 검사할 수 있는 에러
  - **에러 응답 메시지에 에러에 대한 정보가 있어야 한다.**
  

<br/>


## 이벤트 생성 API 구현 : 비즈니스 로직 적용

### 테스트 할 것
- 비즈니스 로직 적용 됐는지 응답 메시지 확인
  - offline과 free 값 확인


<br/>

## 이벤트 생성 API 구현 : 매개변수를 이용한 테스트

### 테스트 코드 리팩토링
- 테스트에서 중복 코드 제거
- 매개변수만 바꿀 수 있으면 좋겠는데?
- JUnitParams

### JUnitParams
- https://github.com/Pragmatists/JUnitParams

```xml
<!-- https://mvnrepository.com/artifact/pl.pragmatists/JUnitParams -->
<dependency>
    <groupId>pl.pragmatists</groupId>
    <artifactId>JUnitParams</artifactId>
    <version>1.1.1</version>
    <scope>test</scope>
</dependency>
```




