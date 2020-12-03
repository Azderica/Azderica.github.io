---
title: "[Springboot API] Springboot REST API : HATEOAS와 Self-Describtive Message 적용"
date: 2020-09-14
published: true
tags: ['Spring', 'Springboot', 'Springboot API', 'REST API', 'Backend']
series: true,
cover_image: ./images/SpringLogo.png
canonical_url: false
description: " 'Springboot REST API'의 세번째 게시글입니다. "
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
  

<br/>

## 스프링 REST Docs: 링크, (Req, Res) 필드와 헤더 문서화

### 요청 필드 문서화
- requestFields() + fieldWithPath()
- responseFields() + fieldWithPath()
- requestHeaders() + headerWithName()
- responseHedaers() + headerWithName()
- links() + linkWithRel()

### 테스트 할 것
- API 문서 만들기
  - 요청 본문 문서화
  - 응답 본문 문서화
  - 링크 문서화
    - self
    - query-events
    - update-event
    - profile 링크 추가
  - 요청 헤더 문서화
  - 요청 필드 문서화
  - 응답 헤더 문서화
  - 응답 필드 문서화

### Relaxed 접두어
- 장점: 문서 일부분만 테스트 할 수 있다.
- 단점: 정확한 문서를 생성하지 못한다.

<br/>

## 스프링 REST Docs 문서 빌드

### 스프링 REST Docs
- https://docs.spring.io/spring-restdocs/docs/2.0.2.RELEASE/reference/html5/
- pom.xml에 메이븐 플러그인 설정

```xml
            <plugin>
                <groupId>org.asciidoctor</groupId>
                <artifactId>asciidoctor-maven-plugin</artifactId>
                <version>1.5.3</version>
                <executions>
                    <execution>
                        <id>generate-docs</id>
                        <phase>prepare-package</phase>
                        <goals>
                            <goal>process-asciidoc</goal>
                        </goals>
                        <configuration>
                            <backend>html</backend>
                            <doctype>book</doctype>
                        </configuration>
                    </execution>
                </executions>
                <dependencies>
                    <dependency>
                        <groupId>org.springframework.restdocs</groupId>
                        <artifactId>spring-restdocs-asciidoctor</artifactId>
                        <version>2.0.2.RELEASE</version>
                    </dependency>
                </dependencies>
            </plugin>
            <plugin>
                <artifactId>maven-resources-plugin</artifactId>
                <version>2.7</version>
                <executions>
                    <execution>
                        <id>copy-resources</id>
                        <phase>prepare-package</phase>
                        <goals>
                            <goal>copy-resources</goal>
                        </goals>
                        <configuration>
                            <outputDirectory>
                                ${project.build.outputDirectory}/static/docs
                            </outputDirectory>
                            <resources>
                                <resource>
                                    <directory>
                                        ${project.build.directory}/generated-docs
                                    </directory>
                                </resource>
                            </resources>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
```


- 템플릿 파일 추가
  - src/main/asciidoc/index.adoc

### 문서 생성하기
- mvn package
  - test
  - prepare-package :: process-asciidoc
  - prepare-package :: copy-resources
- 문서 확인
  - /docs/index.html

### 테스트 할 것
- API 문서 만들기
  - 요청 본문 문서화
  - 응답 본문 문서화
  - 링크 문서화
    - self
    - query-events
    - update-event
    - profile 링크 추가
  - 요청 헤더 문서화
  - 요청 필드 문서화
  - 응답 헤더 문서화
  - 응답 필드 문서화

<br/>

## PostgreSQL 적용

테스트 할 때는 계속 H2를 사용해도 좋지만 애플리케이션 서버를 실행할 때 PostgreSQL을 사용하도록 변경하자.

/scripts.md 참고

1. PostgreSQL 드라이버 의존성 추가

```xml
<dependency>
	<groupId>org.postgresql</groupId>
	<artifactId>postgresql</artifactId>
</dependency>
```

2. 도커로 PostgreSQL 컨테이너 실행

```bash
docker run --name ndb -p 5432:5432 -e POSTGRES_PASSWORD=pass -d postgres
```

3. 도커 컨테이너에 들어가보기


```bash
docker exec -i -t ndb bash
su - postgres
psql -d postgres -U postgres
\l
\dt
```

4. 데이터소스 설정

```xml
application.properties
spring.datasource.username=postgres
spring.datasource.password=pass
spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
spring.datasource.driver-class-name=org.postgresql.Driver
```

5. 하이버네이트 설정

**application.properties**
```xml
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true
spring.jpa.properties.hibernate.format_sql=true
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
```

### 애플리케이션 설정과 테스트 설정 중복 어떻게 줄일 것인가?
- 프로파일과 @ActiveProfiles 활용

**application-test.properties**
```xml
spring.datasource.username=sa
spring.datasource.password=
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver

spring.datasource.hikari.jdbc-url=jdbc:h2:mem:testdb

spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect
```

<br/>

## 인덱스 핸들러 만들기

### 인덱스 핸들러
- 다른 리소스에 대한 링크 제공
- 문서화

```java
@GetMapping("/api")
    public ResourceSupport root() {
        ResourceSupport index = new ResourceSupport();
        index.add(linkTo(EventController.class).withRel("events"));
        return index;
    }
```

### 테스트 컨트롤러 리팩토링
- 중복 코드 제거

### 에러 리소스
- 인덱스로 가는 링크 제공