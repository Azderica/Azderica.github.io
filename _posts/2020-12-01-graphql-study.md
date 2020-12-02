---
layout: post
title: "[GraphQL] GraphQL 개념잡기"
subtitle: "GraphQL이란"
categories: frontend
tags: graphql frontend query
comments: true

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

- 쿼리문

```graphql
query{
    user{
        id,
        name,
        likes {
            title
        }
    }
}

```

- 응답 데이터 형식

```json
{
    "data": {
        "user" : {
            "id" : 1,
            "name" : "user1",
            "likes" : [
                {
                    "title" : "content13"
                },
                {
                    "title" : "content56"
                }
            ]
        }
    }
}

```

서버사이드 GraphQL 어플리케이션은 gql로 작성된 쿼리를 입력으로 받아 쿼리를 처리한 결과를 다시 클라이언트로 돌려줍니다. HTTP API가 특정 DB나 플랫폼에 종속적이지 않은 것처럼 마찬가지로 gql도 역시 어떠한 특정 DB나 플랫폼에 종속적이지 않습니다.

좀 더 자세하게 구조를 보면 다음과 같습니다. gql은 **쿼리**와 **뮤테이션**으로 구분됩니다. 쿼리는 데이터를 읽는데 사용되고, 뮤테이션은 데이터를 변조(CUD) 하는데 사용됩니다.








---
**출처**
- https://tech.kakao.com/2019/08/01/graphql-basic/
- https://www.redhat.com/ko/topics/api/what-is-graphql
- https://medium.com/@yeon22/graphql-graphql%EC%9D%B4%EB%9E%80-8468571ea96a


