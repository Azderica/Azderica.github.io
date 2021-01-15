---
title: '[Java] Java Exception'
slug: 09-java-study
date: 2021-01-15
published: true
tags: ['Java', 'Stater', 'Exception']
series: false,
cover_image: ./images/JavaLogo.jpg
canonical_url: false
description: '자바의 예외에 대해 정리합니다.'
---

# Java Exception

백기선님의 자바 스터디 9주차, 클래스에 대해 정리해보겠습니다.

공부할 내용

- 자바가 제공하는 예외 계층 구조
- 자바에서 예외 처리 방법 (try, catch, throw, throws, finally)
- Exception과 Error의 차이는?
- RuntimeException과 RE가 아닌 것의 차이는?
- 커스텀한 예외 만드는 방법

<br/>

## 자바가 제공하는 예외 계층 구조

자바에서는 예외를 이야기 할 때는 `오류(Error)` 와 `예외(Exception)` 의 개념이 있습니다.

![java-error-exception](https://user-images.githubusercontent.com/42582516/104693052-58919900-574c-11eb-8a77-cd7568ed23e7.png)

자바의 예외 클래스의 구조는 다음과 같이 구성되어 있습니다.

### 오류(Error)

시스템의 비정상적인 상황이 생겼을 때 발생하는 것을 `오류` 라고 합니다. 이는 시스템 레벨에서 발생하므로 시스템 자체에 영향을 줄 수도 있기 때문에 심각한 오류로 볼 수 있습니다. 다만 개발자는 이를 예측하여 처리하는 것은 어렵기 때문에 크게 신경을 쓰지 않아도 됩니다.

아래와 같은 예시가 있습니다.

- VirtualMachineError
- OutOfMemoryError
- StackOverflowError

### 예외(Exception)

개발자의 잘못된 코딩으로 인해 구현한 로직에서 발생합니다. 따라서 이는 미리 예측하여 처리할 수 있고, 일반적으로 try-catch 문을 사용하여 해결합니다.

<br/>

## 자바에서 예외 처리 방법 (try, catch, throw, thorws, finally)

### try-catch-finally

예외 처리를 위해 try-catch-finally 문을 사용합니다.

```java
try {
        // 예외가 발생할 수 있는 가능성이 있는 코드
} catch (Exception1 e1) {
        // Exception1이 발생시, 이를 처리하는 코드
} catch (Exception2 e2) {
        // 생략 가능
        // 만약 Exception1에서 에러 발생시, 해당 로직에는 작동을 하지 않음
        // Exception2이 발생시, 이를 처리하는 코드
} finally {
        // 생략 가능
        // 예외가 발생해도 마지막에 실행됩니다.
}
```

try 블럭에는 여러 catch 블록이 올 수 있으며, 이 중에서 발생한 에외의 종류와 일치하는 단 한 개의 catch 블록만 수행됩니다.

### multi catch

다음과 같이, 자바 7이후 여러 catch 블럭을 '|' 기호를 통해 나의 catch 블럭으로 합칠 수 있습니다.

```java
try {
	...
} catch (ExceptionA | ExceptionB e) {
	e.printStackTrace();
}
```

### try-with-resources

- 회수를 해야하는 자원을 다룰 때, 도움이 됩니다.
- 코드를 더 간결하고 예외정보도 유리하게 사용할 수 있습니다.

```java
static String getFirstLineInFile(String path, String defaultVal) {
	try (BufferReader br = new BufferReader(new FileReader(path))) {
		return br.readLine();
	} catch (IOException e) {
		return defaultVal;
	}
}
```

### throw

throw 키워드를 통해서 고의로 예외를 발생할 수 있습니다.

```java
public void exceptionThrow() throws Exception {
        Exception e = new Exception("고의로 발생한 예외");
        throw e;
}

```

### throws

메서드 선언부에서 throws 키워드를 통해서 해당 메서드를 호출한 메서드로 예외를 던집니다. 예외를 선언함으로서 메서드를 사용할 때 발생할 수 잇는 에러를 명시적으로 알 수 있습니다. 이 때 예외는 해당 메서드를 호출하는 곳에서 한 번은 `try-catch` 로 처리해주어야합니다.

```java
public class CustomException extends Exception {
        CustomException(String msg){
                super(msg);
        }
}

public class Main{
        public static void main(String[] args) {
                try {
                        CustomException e = new CustomException("내가 만든 예외");
                        throw e;
                } catch (CustomException e) {
                        System.out.println("Custome Exception" + e.getMessage());
                } catch (Exception e){
                        System.out.println("Exception!");
                }
        }
}
```

> 좀 더 Clean Code로 짜는 방법

- try 블럭에서 무슨 일이 생기든지 catch 블록은 프로그램 상태를 일관성있게 유지합니다.
- 예외에 의미를 제공합니다.
  - 오류가 발생한 윈언과 위치를 찾기 쉽도록 오류메세지에 정보를 담고, 실패한 연산 이름과 실패 유형을 언급합니다.
- 호출자를 고려해서 예외 클래스를 구성합니다.
  - 아래는 그 예시입니다.

```java
ACMEPort port = new ACMEPort(12);

 try {
     port.open();
 } catch (DeviceResponseException e) {
     reportPortError(e);
     logger.log("Device response exception", e);
 } catch (ATM1212UnlockedException e) {
     reportPortError(e);
     logger.log("Unlock exception", e);
 } catch (GMXError e) {
     reportPortError(e);
     logger.log("Device response exception");
 } finally {
     ...
 }
```

- 정상 흐름을 정의합니다.
- null을 반환하거나 전달하는 습관은 좋지 않습니다.

<br/>

## RuntimeException과 RE가 아닌 것의 차이는?

자바의 `RuntimeException`은 **Unchecked Exception**으로 `RuntimeExcption이 아닌 것`은 **Checked Exception**으로 분류됩니다.

둘의 차이는 다음과 같습니다.

| 구분                     | Check Exception | Unckecked Exception           |
| ------------------------ | --------------- | ----------------------------- |
| **처리여부**             | 반드시 필요     | 강제성이 없음                 |
| 확인시점                 | 컴파일 시점     | 실행 시점                     |
| **예외 발생시 트랜잭션** | Roll-back X     | Roll-back                     |
| 대표적인 예시            | - IO Exception  | - NullPointerException        |
|                          | - SQL Exception | - IllegalArgumentException    |
|                          | - ...           | - IndexOutOfBoundException... |

<br/>

## 커스텀한 예외 만드는 방법

Custom한 예외 클래스를 만드는 조건은 다음과 같습니다. 해당 조건 중 하나가 필요하다면 예외 클래스를 적용합니다.

1. Java 플랫폼에 없는 예외 유형이 필요합니까?
2. 다른 벤더가 작성한 클래스에서 제공한 예외 사항과 차별화할 수 있다면 어떻겠습니까?
3. 코드가 하나 이상의 관련 예외를 발생합니까?
4. 다른 사용자의 예외를 사용할 경우 해당 예외에 대한 액세스 권한이 사용자에게 부여됩니까?

### Custom Checked Exception

FileNotFoundException 의 경우는 정확한 예외 원인을 정확하게 알지 못합니다. 파일 이름이 없을 수도 있고 파일이 존재하지 않을 수도 있습니다.

```java
public class IncorrectFileNameException extends Exception {
    public IncorrectFileNameException(String errorMessage) {
        super(errorMessage);
    }

    public IncorrectFileNameException(String errorMessage, Throwable err) {
    	super(errorMessage, err);
    }
}
```

```java
try (Scanner file = new Scanner(new File(fileName))) {
    if (file.hasNextLine()) {
        return file.nextLine();
    }
} catch (FileNotFoundException e) {
    if (!isCorrectFileName(fileName)) {
        throw new IncorrectFileNameException(
          "filename is incorrect : " + fileName , e);
    }
    // ...
}
```

다음과 같이 커스텀 예외를 사용하여 정확한 원인을 확인할 수 있습니다.

### Custom Unchecked Exception

확장자가 없는 경우, 런타임 시 문제가 발생하는데 이를 커스텀 예외로 확인할 수 있습니다.

```java
public class IncorrectFileExtensionException
  extends RuntimeException {
    public IncorrectFileExtensionException(String errorMessage, Throwable e) {
        super(errorMessage, e);
    }
}
```

```java
try (Scanner file = new Scanner(new File(fileName))) {
    if (file.hasNextLine()) {
        return file.nextLine();
    }
} catch (FileNotFoundException e) {
    if (!isCorrectFileName(fileName)) {
        throw new IncorrectFileNameException(
          "filename is incorrect : " + fileName , e);
    }
    // ...
} catch (IncorrectFileExtensionException e) {
    if(!containsExtension(fileName)) {
        throw new IncorrectFileExtensionException(
          "Filename does not contain extension : " + fileName, e);
    }
    //...
}
```

다음과 같이 구성할 수 있습니다.

---

**출처**

- https://velog.io/@youngerjesus/%EC%9E%90%EB%B0%94-%EC%98%88%EC%99%B8-%EC%B2%98%EB%A6%AC
- https://i-am-clap.tistory.com/12
- https://rebeccacho.gitbooks.io/java-study-group/content/chapter8.html
- https://sujl95.tistory.com/62
- https://wisdom-and-record.tistory.com/46
- https://www.notion.so/3565a9689f714638af34125cbb8abbe8
- https://github.com/kongduboo/whiteship-java-study/blob/main/week9.md
- http://amazingguni.github.io/blog/2016/05/Clean-Code-7-%EC%98%A4%EB%A5%98-%EC%B2%98%EB%A6%AC
