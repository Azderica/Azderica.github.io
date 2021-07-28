---
title: '[WEB] PWA 정리'
slug: 00-web-pwa
date: 2021-02-17
published: true
tags: ['Web', 'App', 'Pwa']
series: false
cover_image: ./images/PwaLogoImage.png
canonical_url: false
description: 'PWA에 대해 정리합니다.'
---

# PWA

웹앱에 대한 개념을 잡다보면 PWA라는 기술에 대해 들어보게 됩니다. Google I/O 2016에서 구글은 PWA라는 신기술을 소개했으며, 이는 여러가지 기능과 이론을 조합해 앱과 웹의 장점을 살린 것으로 볼 수 있습니다.

오늘은 PWA에 대한 내용을 정리하겠습니다.

<br/>

## PWA가 무엇인가?

PWA는 Progressive Web App(프로그래시브 웹앱)의 약자로서, **모바일 앱**과 **웹 기술**의 장점을 결합한 것으로 확인할 수 있습니다.

구글의 PWA 소개는 다음과 같습니다.

- PWA는 웹과 앱을 결합한 경험을 제공합니다.
- 브라우저를 통해 처음 방문한 사용자에게 유용하고 설치가 필요없습니다
- 사용자가 PWA와의 관계를 점진적으로 형성할수록 성능이 좋아집니다.
- 느린 네트워크에서도 빠르게 로드되고 관련된 푸시알림을 제공합니다.
- 모바일 앱처럼 전체 화면으로 로드되고, 홈 화면에 아이콘이 있습니다.

<br/>

## 왜 PWA가 필요할까?

먼저 모바일과 데스크톱 사용자를 확인하면 다음과 같습니다.

![image](https://user-images.githubusercontent.com/42582516/108124737-e1547980-70ea-11eb-80f2-762bb0ecdc3b.png)

모바일 사용자는 2014년 이후로 데스크톱 사용자보다 많아졌으며, 따라서 모바일 환경에 맞는 개발환경을 제공해야합니다.

![image](https://user-images.githubusercontent.com/42582516/108124948-1791f900-70eb-11eb-814d-32ba1f10ba1c.png)

그리고 이러한 모바일 사용자들은 모바일 App에서 대부분의 시간을 보냅니다.

모바일 앱은 모바일 웹에 비해 주로 2가지의 장점을 가지고 있습니다.

- 홈 스크린에 아이콘을 찾기 편합니다.
- 관련된 푸시 알림을 보내줍니다.

**그렇다면 앱만 만들어도 되지않을까라는 생각을 할 수 있습니다. 그러나 모바일 사용자의 앱 다운로드 통계를 보면, 50% 이상의 사용자는 앱을 전혀 다운로드 하지 않습니다.**

![image](https://user-images.githubusercontent.com/42582516/108125198-7ce5ea00-70eb-11eb-9f2a-437ba7bec76e.png)

그리고 모바일 사용자들의 대부분은 특정 앱에서 대부분의 시간을 보내게 됩니다.

![image](https://user-images.githubusercontent.com/42582516/108125289-9850f500-70eb-11eb-9294-01faf6f4a15d.png)

따라서 **모바일 사용자는 새로운 앱을 다운로드에 굉장히 냉소적이며, 사용하던 앱을 계속해서 사용하는 경향이 있습니다.**

이와는 반대로 **모바일 사용자는 한 달에 평균 100개 이상의 웹 사이트를 방문**합니다. 이를 통해 다음과 같은 결론을 얻을 수 있습니다.

**결론**

- 웹은 설치가 필요없이, URL을 통해 접근이 간단합니다.
- 웹은 한 번 사용에는 편리하지만 반복하여 사용할 시 매번 URL을 기억하고 입력해야함으로, 수고가 듭니다.
- 네이티브 앱은 한 번 설치하게 되면 반복적인 접근이 수월합니다
- 네이티브 앱은 플랫폼에 종속되지만 웹은 플랫폼에 종속되지 않습니다

> 따라서 PWA는 다음과 같은 의미를 가집니다.

![image](https://user-images.githubusercontent.com/42582516/108125805-583e4200-70ec-11eb-9db1-be980686494c.png)

네이티브 앱

- 느린 네트워크에서 작동
- 백그라운드에서 푸시 알림 가능
- 다양한 기능을 수행 가능
- Capability(능력)이 높음

웹

- URL을 통해 접근이 간편합니다
- 설치가 필요가 없습니다
- Reach(범위)가 넓습니다.

PWA

- 앱과 웹의 장점을 결합하였습니다.

<br/>

## PWA의 특징

앞서 설명한 PWA의 특징을 정리하면 다음과 같습니다.

### APP스럽습니다.

PWA의 특징 중 하나는 앱스럽습니다. 마치 앱 처럼 홈스크린에 아이콘을 설치하여 APP처럼 쉽게 바로가기를 실현할 수 있습니다.

### Push 메시지 기능이 가능합니다.

앱의 중요 특징 중 하나는 Push 기능입니다. 웹은 클라이언트에서 서버로 요청이 있어야 결과물을 보내주는 형태로 구현이 되는데 Push는 반대로 클라이언트의 요청이 없더라고 서버의 필요에 의해 클라이언트에게 데이터를 보낼 수 있는 기능입니다.

일반적으로 쪽지나 Notice 형태로 제공됩니다.

### Offline 접속이 가능합니다

PWA는 캐싱이 되기 때문에 오프라인이거나 속도가 느린 상태에서도 미리 다운로드 되어 있는 정보를 계속 볼 수 있습니다.

### 보안

PWA는 HTTPS에서만 사용이 가능하고 일반 인터넷 데이터에 비해 보안이 강화된 상태라고 볼 수 있습니다.

<br/>

## PWA을 만들려면.

PWA를 구현하기 위해서는 크게 `manifest.json`와 `Service Worker`라는 2가지의 기술이 필요합니다.

### manifest.json

`manifest.json`은 설치할 때 아이콘은 무엇을 사용하고 아이콘을 눌렀을 때 접속할 페이지는 무엇인지, 배경은 무슨색으로 할 것인 등에 대한 일종의 설정파일로 볼수있습니다.

### Service Worker

`Service Worker`은 PWA의 핵심으로서 캐싱을 어떻게 할지를 정하는 기술입니다. 요청시 캐시를 먼저 보여줄지 웹 서버를 통해서 먼저 보여줄지, push 등에 대한 프로그래밍을 하는 기술이며 PWA에서 굉장히 중요한 기술로 볼 수 있습니다.

> 그리고.

PWA는 HTTPS가 필수입니다. PWA는 운영체제의 여러 특별한 권한을 받아야함으로 웹 서버와의 보안 연결은 필수 입니다. 이와 관련해서 [Let's Encrypt](https://letsencrypt.org/getting-started/)와 같은 무료 SSL 서비스를 사용할 수도 있습니다.

<br/>

## PWA 참고사이트

- [PWA Builder](https://www.pwabuilder.com/)

<br/>

## 마무리

PWA가 어떤 서비스에 적합한지에 대해서는 아래 게시글을 참고하면 좋을 듯합니다.

[PWA는 어떤 경우에 필요한가요.](https://webactually.com/2017/09/28/%EC%9B%B9-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EB%8A%94-pwa%EC%9D%B4%EC%96%B4%EC%95%BC-%ED%95%9C%EB%8B%A41/)

다음에는 PWA를 직접 만들어보며 내용을 정리하겠습니다.

---

**출처**

- https://altenull.github.io/2018/02/25/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%A0%88%EC%8B%9C%EB%B8%8C-%EC%9B%B9-%EC%95%B1-Progressive-Web-Apps-%EB%9E%80/
- https://uxgjs.tistory.com/224
- https://webactually.com/2017/09/28/%EC%9B%B9-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EB%8A%94-pwa%EC%9D%B4%EC%96%B4%EC%95%BC-%ED%95%9C%EB%8B%A41/
- https://developer.mozilla.org/ko/docs/Web/Progressive_web_apps/%EC%86%8C%EA%B0%9C
