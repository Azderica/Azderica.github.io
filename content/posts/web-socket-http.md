---
title: '[WEB] Socket 통신 vs Http 통신'
slug: 00-web-socket
date: 2021-01-04
published: true
tags: ['Web', 'Socket', 'HTTP']
series: false,
cover_image: ./images/SocketVsHttp.png
canonical_url: false
description: 'Socket 통신과 HTTP 통신의 차이에 대해 서술합니다.'
---

# Socket 통신 VS HTTP 통신

오늘은 웹에서 통신하는 대표적인 방식인 두 방식의 차이에 대해 서술하겠습니다.

## Socket 통신

Socket 통신을 한마지로 표현하자면, **Server와 Client가 특정 Port를 통해 실시간으로 양방향 통신을 하는 방식**입니다.

### Socket 통신의 구조

![Socket통신](https://user-images.githubusercontent.com/42582516/103532675-042a2600-4ecf-11eb-815c-b73529445021.png)
출처 : https://mangkyu.tistory.com/48

특정 포트를 통해 연결하여 실시간 양방향 통신을 합니다. 서버 또한 요청을 보낼 수 있고, 실시간으로 요청을 보낼 수 있기 때문에 양방향 정보 교환에서 유리한 점을 가집니다. 만약에 동영상 스트리밍이나 게임 서비스를 socket통신을 하지 않고 하는 경우에는 계속적인 연결요청이 가므로, 과부하가 걸리게 됩니다.

### Socket 통신의 특징

- Server와 Client가 계속 연결을 유지하는 **양방향 통신**입니다.
- Server와 Client가 실시간으로 데이터를 주고 받는 상황이 필요한 경우에 주로 사용됩니다.
- 실시간 동영상 Streaming이나 온라인 게임 등과 같은 경우에 자주 사용됩니다.

<br/>

## HTTP 통신

### HTTP 통신의 구조.

![HTTP통신](https://user-images.githubusercontent.com/42582516/103532658-feccdb80-4ece-11eb-8085-2cb7d7f83d8d.png)
출처 : https://mangkyu.tistory.com/48

client의 요청(Request)이 있을 때만 서버가 응답(response)하여 해당 정보를 전송하고 곧바로 연결을 종료하는 방식입니다. 일반적으로 request를 보냈을 때, 내용을 기다리는시간과 연결하는 시간이 필요하기 때문에 해당 통신은 콘텐츠 위주의 데이터를 사용할 때 유용합니다.

### HTTP 통신의 특징

- Client가 요청을 보내는 경우에만 Server가 응답하는 **단방향 통신**입니다.
- Server로부터 응답을 받은 후에는 연결이 바로 종료가 됩니다.
- 실시간 연결이 아니고, 필요한 경우에만 Server로 요청을 보내는 상황에 유용합니다.
- 요청을 보내 Server의 응답을 기다리는 어플리케이션 개발에 주로 사용됩니다.

<br/>

## 마무리.

HTTP 통신과 Socket 통신에 대해 알아보았습니다. 가장 큰 차이 중 하나는 단방향 통신과 양방향 통신의 차이입니다.

---

**출처**

- https://velog.io/@ejchaid/http
- https://mangkyu.tistory.com/48
