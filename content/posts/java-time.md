---
title: '[Java Time] Java Tiem에 대해 정리'
slug: 00-java-time
date: 2022-10-08
published: false
tags: ['Spring', 'JPA', 'Time', 'Instant', 'JodaTime']
series: false
cover_image: ./images/.
canonical_url: false
description: 'Java Time 에 대해 정리합니다.'
---

# Java의 날짜, 시간에 대한 기본적인 정책

## 기존 Java의 날짜 API의 문제.

Java 8 이전에 사용하던 Date 관련 클래스는 Date, Calander, SimpleDateFormat 등이 있었으나, 많은 문제가 있어 자바 8 버전 이후 부터는 새로운 날짜 관련 API를 제공합니다.

기존 클래스들의 문제는 다음과 같습니다.

- 부적절한 클래스, 메소드 이름
  - Date 클래스의 경우, TimeStamp 방식으로 동작하고 시간을 내재하고 있으나, ClassName은 Date입니다.
- Thread saftety 하지 않음
  - Date 클래스의 경우 mutable 하기 때문에 다른 Thread에서 값을 참조하고 변경할 수 있습니다. -> 즉, thread safe 하지 않습니다.
- 버그가 발생할 여지가 많음
  - Calander 클래스의 경우 입력값의 month가 0이 1월로 처리됩니다. 그래서 Calander.SETEMBER 같은 상수를 사용해야하며, DB 데이터랑 연결하면서 서로 다르게 해석됩니다.

### Joda Time

위의 여러한 문제 들이 있어 Java8 이전에서는 Joda-Time이라는 라이브러리를 사용했습니다. 그러나, Java 8 부터는 Joda-Time이 자바 표준 라이브러리로 들어왔습니다.

<br/>

## 현재의 Java의 날짜/시간 정책.

Java SE8 버전부터 JEP(JDK Enhancement Proposal, JDK 개선 제안) 150, JSR-310(Java Specificiation Requests)의 310번째 Requests인 `Date & Time API` 으로 들어왔습니다.

Date & Time API의 목표를 읽어보면 다음과 같습니다.

- date, time, instant, time-zone을 포함하는 공식 시간 개념 지원
- immutable 구현
- 개발자의 사용성에 중점을 둔 JDK에 적절하고 효과적인 API 제공
- 기존의 JDK API와의 통합
- 제한된 calendar 시스템 세트를 제공하고 다른 것들로 확장 가능
- ISO-8601, CLDR 및 BCP47을 포함한 관련 표준 사용
- UTC에 연결하여 명시적 시간 척도를 기반

현재 이 API는 표준이 되었으며, 위의 나온 Joda-Time의 창시자 분 또한 API를 만드는 데 동참했습니다.

위의 문제점인 부적절한 클래스나 메서드 명들도 정리가 되었고, Thread safe하며, 여러 편의기능이 많고, Zoned 관련된 기능도 있어 여러 글로벌 서비스에서 적합합니다.

### Instant

- 1970년 1월 1일 UTC의 첫 번째 순간 이후의 현재 시간까지의 나노초를 나타낸 값입니다.
- 현재 시간을 UTC 기준으로 반환합니다.
- 대부분의 비즈니스 로직, 데이터 저장 및 데이터 변경은 UTC로 이루어져야하므로 자주 사용하기에 편리한 클래스입니다.

### LocalDate, LocalTime, LocalDateTime

- Java Time에서 `Local` 이 들어가는 것은 시간대(Zone Offset/Zone Region)에 대한 정보가 없다는 것을 의미합니다.

### OffsetDateTime

- LocalDateTime + ZoneOffset 의 개념입니다.

### ZonedDateTime

- OffsetDateTime + ZoneRegion 의 개념입니다.
- OffsetDateTime 과의 차이점은 DST(Daylight Saving Time)와 같은 Time Transition Rule을 포함하는 ZoneRegion의 유무차이 입니다.


<br/>

## JDBC에서 변경되는 형태

- JDBC는 Java와 Database Scheme 사이의 컨버팅을 다음과 같이 자동으로 변경이 됩니다.

|Date-time types in Java & SQL|Legacy class|Modern class|SQL standard data type|
|-|-|-|-|
|Moment|Java.util.Date<br/>Java.sql.Timestamp|Java.time.Instant|TIMESTAMP WITH TIME ZONE|
|Moment with offset-from-UTC|(lacking)|java.time.OffsetDateTime|TIMESTAMP WITH TIME ZONE|
|Moment with time zone|java.util.GregorianCalendar<br/>javax.xml.datatype.XMLGregorianCalendar|java.time.ZonedDateTime|TIMESTAMP WITH TIME ZONE|
|Date & Time-of-day|(lacking)|java.time.LocalDateTime|TIMESTAMP WITHOUT TIME ZONE|
|Date only|java.sql.Date|java.time.LocalDate|DATE|
|Time-of-day only|java.sql.Time|java.time.LocalTime|TIMESTAMP WITHOUT TIME ZONE|
|Time-of-day with offset|(lacking)|java.time.OffsetTime|TIME WITH TIME ZONE|


---

**출처**

- [OpenJDK](https://openjdk.org/jeps/150)