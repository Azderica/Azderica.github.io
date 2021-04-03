---
title: '[Java] Java I/O'
slug: 13-java-study
date: 2021-02-21
published: true
tags: ['Java', 'Stater', 'Stream']
series: false
cover_image: ./images/JavaLogo.jpg
canonical_url: false
description: 'Java I/O에 대해 정리합니다.'
---

# JAVA I/O

13주차 내용은 자바의 I/O에 관련된 내용입니다.

- 스트림 (Stream) / 버퍼 (Buffer) / 채널 (Channel) 기반의 I/O
- InputStream 과 OutputStream
- Byte 와 Character 스트림
- 표준 스트림 (System.in, System.out, System.err)
- 파일 읽고 쓰기

<br/>

## 스트림, 버퍼, 채널 기반 I/O

### 자바 NIO(New Input/Output)

자바 1.4버전부터 추가된 API로 Non-blocking 처리가 가능하며, 스트림이 아닌 채널을 사용합니다.

기존의 I/O와는 다음의 차이가 있습니다.

- 기존 IO 방식의 경우에서는 각각의 스트림에서 read()와 write()가 호출이 되면 데이터가 입력 되고, 데이터가 출력되기전까지, 스레드는 멈춤상태가 됩니다. 이 경우에는 작업이 끝날때까지 사용할 수 없으며, 그전에는 해당 IO 스레드는 사용할 수 없고 인터럽트도 할 수 없습니다. (스트림을 닫는 방법이 유일합니다.)
- NIO의 블로킹 상태에서는 Interrupt를 통해서 빠져 나올 수 있습니다.

| --                    | IO                        | NIO                         |
| --------------------- | ------------------------- | --------------------------- |
| 입출력 방식           | 스트림                    | 채널                        |
| 비동기 방식 지원      | X                         | O                           |
| Blocking/Non-Blocking | Blocking Only             | Both                        |
| 사용 경우             | 연결 클라이언트가 적고    | 연결 클라이언트가 많고      |
|                       | I/O처리가 큰 경우(대용량) | I/O처리가 작은 경우(저용량) |

### 스트림(Stream)

![image](https://user-images.githubusercontent.com/42582516/108591789-ccf3d380-73ad-11eb-9cd6-625d393cf111.png)

- FIFO(First In First Out)
- 단방향이기 때문에 입력 스트림과 출력 스트림을 별도로 사용합니다.
- 연속된 데이터의 흐름으로 입출력 진행시 다른 작업을 할 수 없는 블로킹(Blocking) 상태가 됩니다.
- 입출력 대상을 변경하기 편하며 동일한 프로그램 구조를 유지할 수 있습니다.

### 버퍼(Buffer)

![image](https://user-images.githubusercontent.com/42582516/108591844-21974e80-73ae-11eb-90af-b3353a464654.png)

- byte, char, int 등의 기본 데이터 타입을 저장할 수 있는 저장소로서, 배열과 마찬가지로 제한된 크기(capacity)에 순서대로 데이터를 저장합니다.
- 버퍼는 데이터를 저장하기 위한 것이며, 실제로 버퍼가 사용되는 것은 채널을 통해서데이터를 주고 받을 때 사용됩니다.
- **채널을 통해서 소켓, 파일 등에서 데이터를 전송할 때나 읽어올 때 버퍼를 사용하게 됨으로써 가비지량을 최소화 시키며 이는 가비지 콜렉션의 회수를 줄임으로써 서버의 전체 처리량을 증가시킵니다.**

### 채널(Channel) 기반 I/O

채널은 서버와 클라인트간의 통신 수단을 나타냅니다. 일종의 데이터가 다니는 통로라는 점에서 비슷하지만 **양방향**이기 때문에 읽기와 쓰기가 동시에 가능합니다.

대표적으로 다음과 같이 있습니다.

- SocketChannel (소켓과 연결)
- FileChannel (파일 채널)
- Pipe.SinkChannel (파이프와 연결)
- Pipe.SourceChannel (파이프와 연결)
- ServerSocketChannel (서버소켓과 연결)

<br/>

## InputStream, OutputStream

### InputStream

- 바이트 기반의 **입력 스트림의 최상위 추상 클래스**입니다.
- 모든 바이트 기반 입력 스트림은 해당 클래스 상속 받아서 만들어집니다.
- 버퍼, 파일, 네트워크 단에서 입력되는 데이터를 읽어오는 기능을 수행합니다.

| 메서드                           | 설명                                                                                                        |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| read()                           | 입력 스트림으로부터 1바이트를 읽어서 바이트를 리턴                                                          |
| read(byte[] b)                   | 입력 스트림으로부터 읽은 바이트들을 매개값으로 주어진 바이트 배열 b에 저장하고 실제로 읽은 바이트 수를 리턴 |
| read(byte[] b, int off, int len) | 입력 스트림으로부터 len 개의 바이트만큼 읽고 매개값으로 주어진 바이트 배열 b[off]부터 len 개까지 저장       |
| close()                          | 사용한 시스템 자원을 반납하고 입력 스트림 닫기                                                              |

### OutputStream

- 바이트 기반의 **출력 스트림의 최상위 추상 클래스**입니다.
- 모든 바이트 기반 출력 스트림은 해당 클래스를 상속 받아서 만들어집니다.
- 버퍼, 파일, 네트워크 단으로 데이터를 내보내는 기능을 수행합니다.

| 메서드                            | 설명                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------ |
| write(int b)                      | 출력 스트림으로부터 1바이트를 보냅니다.                                        |
| write(byte[] b                    | 출력 스트림으로부터 주어진 바이트 배열 b의 모든 바이트를 보낸다                |
| write(byte[] b, int off, int len) | 출력 스트림으로 주어진 바이트 배열 b[off]부터 len 개까지의 바이트를 보내야한다 |
| flush()                           | 버퍼에 잔류하는 모든 바이트를 출력한다.                                        |
| close()                           | 사용한 시스템 자원을 반납하고 입력 스트림 닫기                                 |

<br/>

## Byte와 Character 스트림

스트림의 객체도는 다음과 같습니다.

![image](https://user-images.githubusercontent.com/42582516/108600189-14438980-73d9-11eb-82cb-75b83bb27abf.png)

### Byte Stream

![image](https://user-images.githubusercontent.com/42582516/108600070-325cba00-73d8-11eb-8538-8f81084f99c7.png)

- binary 데이터를 입출력하는 스트림
- 데이터는 **1바이트** 단위로 처리합니다.
- 이미지, 동영상 등을 송수신할 때 주로 사용합니다.

### Character Stream

![image](https://user-images.githubusercontent.com/42582516/108600068-2d980600-73d8-11eb-9e03-79e0abf2700f.png)

- text 데이터를 입출력하는 스트림
- 데이터는 **2바이트** 단위로 처리합니다.
- 일반적인 테스트 및 JSON, HTML 등을 송수신할 때 주로 사용합니다.

### 보조 Stream

- FilterInputStream과 FilterOutputStream을 상속받는 클래스들로 기본 스트림과 결합하여 특정 상황에서 편하게 사용할 수 있습니다.
- BufferedInputStream/BufferedOutputStream
  - 버퍼를 사용하여 입출력 효율과 편의를 위해 사용할 수 있습니다.
- BufferedReader/BufferedWriter
  - 라인단위의 입출력이 편리합니다.
- InputStreamReader/OutputStreamReader
  - 바이트 스트림을 문자 스트림처러 쓸 수 있도록하며 문자 인코딩 변환을 지원합니다.
- DataInputStream/DataOutputStream
  - 자바 원시 자료형 데이터 처리에 적합합니다.

<br/>

## 표준 스트림 (System.in, System.out, System.err)

표준 스트림은 콘솔(console,도스창)을 통한 데이터 입력과 콘솔로의 데이터 출력을 의미합니다. 자바에서는 표준 스트림을 3가지 제공을 합니다.(System.in, System.out, System.err)

해당 표준 스트림은 `java.lang` 패키지의 System 클래스 내부에 선언되어 있습니다. 또한 이 표준 스트림들은 자바 어플리케이션의 실행과 동시에 사용할 수 있도록 자동적으로 생성이 됩니다. 그렇기 때문에 개발자가 별도로 스트림을 생성하는 코드를 작성하지 않고도 사용이 가능합니다.

이를 확인해보면 다음과 같이 구성되어 있습니다.

```java
public final class System {
  public static final InputStream in;
  public static final PrintStream out;
  public static final PrintStream err;
}
```

다음과 같은 의미를 가집니다,

- `System.out` 은 콘솔 화면에 문자열을 출력하기 위한 용도로 사용되는 출력 스트림입니다.
- `System.in` 은 키보드의 입력을 받아들이기 위해 사용되는 입력 스트림입니다.
- `System.out` 와 `System.err`
  - 둘다 출력 스트림입니다.
  - `System.err` 는 좀 더 정확하고 빠르게 출력해야하기 때문에 버퍼링을 지원하지 않습니다. (버퍼링 도중 프로그램이 멈추면 버퍼링 내용이 출력이 되지않기 때문에.)

<br/>

## 파일 읽고 쓰기

텍스트 파일의 경우에는 문자 스트림 클래스를 사용하고, 바이너리 파일의 경우에는 바이트 스트림을 기본적으로 사용합니다.

- 입출력 효율을 위해 Buffered 계열의 보조 스트림을 사용하는 것이 좋습니다.

**텍스트 파일** 의 경우

```java
BufferedReader br = new BufferedReader(new FileReader("a.txt"));
BufferedWriter bw = new BufferedWriter(new FileReader("b.txt"));
String s;

while((s = br.readLind()) != null){
  br.write(s + "\n");
}
```

**이진 파일** 의 경우

```java
BufferedInputStream is = new BufferedInputStream(new FileInputStream("a.jpg"));
BufferedOutputStream os = new BufferedOutputStream(new FileOutputStream("b.jpg"));
byte[] buffer = new byte[100000];
while (is.read(buffer) != -1) {
  os.write(buffer)
}
```

---

**출처**

- https://bingbingpa.github.io/java/whiteship-live-study-week13/
- https://github.com/LeeWoooo/Java_LiveStudy/tree/master/week13
- https://github.com/JJongSue/javastudy/tree/master/src/main/java/week13
