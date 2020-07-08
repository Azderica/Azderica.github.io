---
layout: post
title: "Springboot 시작하기"
date: 2020-07-07 07:30:00 -0500

---

# Springboot 시작하기

## brew download

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

```



## maven download

```shell
brew install maven
```

maven 설치



## java download

```shell
brew cask install java
```

Oracle에 들어갈 필요 없이 mac 유저라면 편하게 사용가능



## 시작하기

```java
Pship;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args){
        SpringApplication.run(Application.class, args);
    }
}
```

위는 Application.java

https://docs.spring.io/spring-boot/docs/2.0.3.RELEASE/reference/htmlsingle/#getting-started-maven-installation



## Springboot Project 만드는 방법

1. Intellij에서 새로운 프로젝트를 생성하는 방법

2. start.spring.io 에서 프로젝트를 만들어서 다운받는 방법 
   https://start.spring.io/



## Springboot Project 구조

document의 위치는 다음과 같다.

https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-structuring-your-code

핵심은 default Package를 사용하자. 메인 프로젝트의 경우에는

메이븐 기본 프로젝트 구조와 동일 

- 소스 코드 (src\main\java)
- 소스 리소스 (src\main\resource) 
- 테스트 코드 (src\test\java) 
- 테스트 리소스 (src\test\resource) 

메인 애플리케이션 위치 

- 기본 패키지



