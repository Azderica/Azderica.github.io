---
title: '[GraphQL] GraphQL 개념잡기'
slug: 00-graphql
date: 2020-12-01
published: true
tags: ['GraphQL', 'Query', 'Web']
series: false
cover_image: ./images/GraphqlLogo.png
canonical_url: false
description: ' GraphQL에 대한 기본적인 내용을 정리합니다. '
---

# GraphQL이란

gatsby로 블로그를 이전하게 되면서 GraphQL에 대해서 반드시 알아야하는 상황이 왔다. 기존에도 공부를 했어야한다고 꾸준하게 생각을 했는데, 드디어 한번 공부하게 되었다.

<br/>

## GraphQL 정의

페이스북에서 만든 퀴리 언어입니다. 다만 SQL은 **데이터베이스에 저장된 데이터를 효율적으로 가져오는 것을 목적**으로 하지만, GraphQL은 **웹 클라이언트가 데이터를 서버로부터 효율적으로 가져오는 것을 목적**으로 합니다.

![image](https://user-images.githubusercontent.com/42582516/100871453-a9726880-34e3-11eb-9211-ef08e50163bf.png)

> 발전하고 있는 GraphQL의 관심도.

GraphQL은 위에 이야기했듯이 기존의 쿼리언어인 sql과 많은 구조적 차이가 있습니다.

<br/>

## GraphQL vs HTTP API

![image](https://user-images.githubusercontent.com/42582516/100874660-40d9ba80-34e8-11eb-8670-75e1c8ff0309.png)

> HTTP API와 GQL의 기술 스택 비교

![image](https://user-images.githubusercontent.com/42582516/100874777-6bc40e80-34e8-11eb-8bde-b938ffea55f9.png)

> REST API와 GraphQL API의 차이

GraphQL API를 사용하면 여러번 네트워크 호출을 할 필요 없이, 한번의 네트워크 호출로 처리 할 수 있습니다.

<br/>

## GraphQL 구조

### SQL문 예시.

ex) 유저가 좋아하는 게시글을 가져오는 글이 필요하다.

```sql
select user.id, user.name, board.likes
from user
    left join board on user.id = board.user_id
```

다음과 같은 쿼리를 구성할 수 있습니다. 그러나, 만약에 웹에서 이를 호출할려고 하는데, 여러 테이블을 join을 해야하는 경우가 발생할 수 있습니다. 이러한 경우에는 endpoint가 많아지는 문제가 발생할 수 있습니다.

### GraphQL문 예시.

다음과 같은 경우 graphql은 아래와 같이 표현할 수 있습니다.

- 쿼리문(query)

```graphql
query {
  user {
    id
    name
    likes {
      title
    }
  }
}
```

- 응답 데이터 형식(mutation)

```json
{
  "data": {
    "user": {
      "id": 1,
      "name": "user1",
      "likes": [
        {
          "title": "content13"
        },
        {
          "title": "content56"
        }
      ]
    }
  }
}
```

서버사이드 GraphQL 어플리케이션은 gql로 작성된 쿼리를 입력으로 받아 쿼리를 처리한 결과를 다시 클라이언트로 돌려줍니다. HTTP API가 특정 DB나 플랫폼에 종속적이지 않은 것처럼 마찬가지로 gql도 역시 어떠한 특정 DB나 플랫폼에 종속적이지 않습니다.

좀 더 자세하게 구조를 보면 다음과 같습니다. gql은 **쿼리**와 **뮤테이션**으로 구분됩니다. 쿼리는 데이터를 읽는데 사용되고, 뮤테이션은 데이터를 변조(CUD) 하는데 사용됩니다. 그러나 내부적으로는 큰 차이가 없고, 개념상의 차이라고 이해하면 됩니다.

gql에서 쿼리에 변수라는 개념이 있습니다. 이 변수를 통해서 함수 인터페이스를 구현할 수 있습니다.

```graphql
query getStudentInformation($studentId: ID){
    personalInfo(studentId: $studentId) {
        name
        address1
        address2
        major
    }
    classInfo(yead: 2018, studentId: $studentId) {
        classCode
        className
        teacher {
            name
            major
        }
        classRoom {
            id
            maintainer {
                name
            }
        }
    }
    SATInfo(schoolCode: 0412, studentId: $studentId) {
        totalScore
        dueDate
    }
}

```

이 **오퍼레이션** 네임 쿼리(쿼리용 함수)는 RDBMS의 프로시져와 비슷한 개념입니다. 이 개념을 통해 REST API 호출과 다르게, 한번의 호출로 모든 데이터를 가져올 수 있습니다. 더 나아가서 gql 오퍼레이션 네임 쿼리는 클라이언트 프로그래머가 작성하고 관리합니다.

이 기능 덕분에 gql은 백엔드와 프론트 개발자의 협업에 많은 영향을 주었습니다. gql을 사용하면 백엔드 개발자가 개발하는 API의 request/response의 형식에 의존도가 낮아집니다. 다만, 데이터 schema에 대한 협업은 필요합니다.

![image](https://user-images.githubusercontent.com/42582516/101355449-ec647f80-38d9-11eb-8709-0cd0f98dc9f0.png)

<br/>

## 스키마/타입(schema/type)

**스키마**란 서버 구현내에서 API를 정의하는데 사용되는 유형의 시스템입니다. 모든 기능은 스키마 내에서 정의됩니다.

### 오브젝트 타입과 필드

gql은 다음과 같이 작성합니다.

```js

type Charater {
    name: String!
    item: [Episode!]!
}

```

- 오브젝트 타입 : Character
- 필드 : name, item
- 스칼라 타입 : String, ID, Int ...
- 느낌표(!) : 필수값을 의미
- 대괄호([, ]) : 배열을 의미

<br/>

## 리졸버(resolver)

![image](https://user-images.githubusercontent.com/42582516/101355996-c68baa80-38da-11eb-93a1-e0238e95ed2a.png)

`GraphQL 파이프라인`을 보면, GraphQL 쿼리는 파싱되어 `리졸버`로 들어가게 됩니다. 즉, `리졸버`는 GraphQL에서 실제로 데이터 처리를 담당하는 개념으로 이해하면 됩니다.

<br/>

## 인트로스펙션(introspection)

API를 만드는 경우에는 프론트와 백엔드가 협업하여 API 인터페이스를 작성하고 작업에 들어갑니다.

그러나, **GraphQL의 인트로스펙션 기능을 사용하면 현재 서버에 저장된 스키마를 실시간으로 확인할 수 있습니다.** 이는 문서를 다로 만들 필요 없이 백엔드 개발자가 스키마를 정의해주면 프론트엔드 개발자는 실시간으로 확인해서 개발하면 됩니다.

<br/>

## 마무리.

graphql에 대한 기본적인 내용을 정리했습니다. 정확한 개념을 잡는데 이해가 되었으면 좋겠습니다. 다음에는 이를 직접 사용해보면서 내용을 구체화 시키겠습니다.

---

**출처**

- https://tech.kakao.com/2019/08/01/graphql-basic/
- https://www.redhat.com/ko/topics/api/what-is-graphql
- https://medium.com/@yeon22/graphql-graphql%EC%9D%B4%EB%9E%80-8468571ea96a
- https://simsimjae.medium.com/graphql%EA%B0%9C%EB%A1%A0-8d61b1952191
