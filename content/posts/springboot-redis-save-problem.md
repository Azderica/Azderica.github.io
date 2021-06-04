---
title: '[Springboot Redis] Redis에 커스텀 객체 저장 시 오류'
slug: 00-redis-troubleshooting
date: 2021-06-04
published: true
tags: ['TroubleShooting', 'Error', 'Springboot', 'Redis', 'Serialization']
series: false
cover_image: ./images/SpringLogo.png
canonical_url: false
description: 'Redis에 커스텀 데이터 객체 저장시 발생하는 오류와 그에 따른 해결책'
---

# Redis HashValue 에 커스텀 객체 저장 시 오류 발생점.

스프링으로 개발을 진행하던 중, Redis HashValue에 커스텀 데이터 객체를 저장할 때 발생하는 문제가 발생했다. 이에 대한 해결과정을 정리했습니다.

## 원인.

에러 메세지는 다음과 같다.

```bash
java.lang.ClassCastException: java.util.LinkedHashMap cannot be cast to ...
```

일반적으로 spring 프로젝트에서 redis에 데이터를 저장하는 방법으로는 redisTemplate를 상속받아서 쓰는데, 코드는 다음과 같습니다. (생략해서 변경했습니다.)

```java
@RequiredArgsConstructor
@ToString
public class Data {
  public Integer data1;
  public Long data2;
  public String data3;
}
```

```java
public static void main(String[] args) {
  private String redisKey = "key:study"
  private String redisHashKey = "unique:key";
  private String redisHashValue = new Data(0, 1L, "name");

  @Autowired
  private RedisTemplate<String, Object> redisTemplate

  redisTemplate.opsForHash().put(redisKey, redisHashKey, redisHashValue)

  // 에러 발생 코드, 캐스팅 에러 발생
  Data result = (Data) redisTemplate.opsForHash().get(redisKey, redisHashKey);
}
```

에러 발생으로 인해 생각하는 원인은 다음과 같습니다.

Value로 저장되는 값이 이후에 데이터를 받아와서 캐스팅을 할때, 이를 객체로 보는 것이 아니라 `LinkedHashMap`으로 인식하는 것으로 보입니다.

<br/>

## 생각한 해결책.

1. `JSONObject`을 통해서 데이터를 파싱해서 `Data` 객체에 넣어주는 방법
2. RedisTemplate을 상속받아서 저장을 하는 방법
3. `ToString`을 오버라이딩해서, 특정 형태로 저장 이후 파싱해서 객체에 이후 넣어 주는 방법
4. `LinkedHashMap` 형태로 만들어줘서 넣고 사용하기

이외에도 여러 방법이 있겠지만 저는 이중에서 1번과 4번을 선택했습니다. (1번 방법으로 해봤는데 똑같은 에러가 발생했습니다.)

4번의 경우로 한 이유는 다음과 같습니다.

- 이후에 데이터를 다시 돌리기 편하기 때문에
- 기본적으로 공식적인 객체이기 때문에 없을 것으로 판단했기 때문에
- 코드를 최대한 SRP(단일 책임) 형태로 구성했기 때문에 클래스 하나로만 변경하면 되기 때문에.

<br/>

## 마무리 및 도움이 되는 정보.

이외에도 다른 방법이 있겠지만 해당 방법에 대해 좋은 방법을 찾으면 좋을 것 같습니다. 아래는 관련해서 참고하면 좋은 글입니다.

- [RedisTemplate, serialization](https://deepweller.tistory.com/38)
- [stackoverflow, redis serializer](https://stackoverflow.com/questions/38532754/)
- [Convert String to JSON Object](https://www.javatpoint.com/how-to-convert-string-to-json-object-in-java)
- [stackoverflow, convert linkedHashMap to Custom java object](https://stackoverflow.com/questions/22358872/how-to-convert-linkedhashmap-to-custom-java-object/22359030)
- [Jackson, java.util.LinkedHashMap cannot be cast to X](https://www.baeldung.com/jackson-linkedhashmap-cannot-be-cast)
