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



## Springboot Project 만드는 방법

1. Intellij에서 새로운 프로젝트를 생성하는 방법



2. start.spring.io 에서 프로젝트를 만들어서 다운받는 방법 



