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

![Instant Image](https://user-images.githubusercontent.com/42582516/194757246-bf361279-1d9f-49e6-b9a4-8dcc23983f2e.png)

1970년 1월 1일 UTC의 첫 번째 순간 이후의 현재 시간까지의 나노초를 나타낸 값입니다. 라이브러리를 더 상세하게 보면, epochSecond와 nanos 로 나눠집니다.

일반적으로 순간을 표현할 때 사용하며, Unix Timestamp를 구할 때 사용할 수 있습니다. Unix Timestamp를 사용하는 이유는 숫자 자료형을 가지고 연산을 하기 때문에 `Local/Offset/ZonedDateTime`과 비교했을 때 연산 속도가 훨씬 빠릅니다. 

대부분의 비즈니스 로직, 데이터 저장 및 데이터 저장 및 데이터 변경은 UTC로 이루어져야하므로 자주 사용하기에 편리한 클래스입니다.

```java
Instant cur = Instant.now();
System.out.println(cur);    // 2022-10-09T12:45:11.825755Z
System.out.println(cur.getEpochSecond());   // 1665319511
System.out.println(cur.getNano());  // 825755000
```

Instant의 now에서는 UTC 표준 시간대를 사용합니다.  (`Clock.systemUTC().instant()`)

### LocalDate, LocalTime, LocalDateTime

![LocalDate](https://user-images.githubusercontent.com/42582516/194757952-64597f21-4343-44ef-91d2-5d3d1c1eb728.png)
![LocalTime](https://user-images.githubusercontent.com/42582516/194757965-437143c5-3218-4907-8525-2885741f2382.png)
![LocalDateTime](https://user-images.githubusercontent.com/42582516/194757977-2a98fa74-3ab6-4d7b-ae35-bce256acc625.png)

Java Time에서 `Local` 이 들어가는 것은 시간대(Zone Offset/Zone Region)에 대한 정보가 없다는 것을 의미합니다. 

일반적으로 이런날을 사용하는 것은 그날이 의미하는 것은 즉, 생일이나 기념일이 많이 사용합니다.

```java
LocalDate localDate = LocalDate.now();
System.out.println(localDate);  // 2022-10-09

LocalTime localTime = LocalTime.now();
System.out.println(localTime);  // 21:49:19.858512

LocalDateTime localDateTime = LocalDateTime.now();
System.out.println(localDateTime);  // 2022-10-09T21:49:19.858589
```

위의 라이브러리를 간략하게 이야기하면 `LocalDateTime`은 `LocalDate`와 `LocalTime`으로 구성되어 있고, `LocalDate`는 `year, month, day`로 구성되어 있고 이를 맞춰주기 위한 보정값을 사용하고 있고 `LocalTime`은 `hour, minute, second, nano` 의 값으로 이루어져 있습니다.

LocalDateTime의 now는 default time-zone 의 정보를 사용합니다. 내부적으로는 Instant형으로 바꾼 후, ZoneOffset으로 한번 바꾼뒤 EpochSecond로 바꾼 이후에야 LocalDateTime으로 출력합니다.

### OffsetDateTime

![OffsetDateTime](https://user-images.githubusercontent.com/42582516/194758471-9ed85cc8-6687-4b15-bf1b-422355f8a0f4.png)

`LocalDateTime + ZoneOffset` 의 개념입니다. `OffsetDateTime`는 UTC보다 몇 시간/분/초 앞 또는 뒤의 컨텍스트를 사용하여 순간을 날짜 및 시간으로 나타냅니다.

```java
System.out.println(OffsetDateTime.of(2000, 1, 1, 11, 11, 11, 0, ZoneOffset.UTC);     
// 2000-01-01T11:11:11Z
System.out.println(OffsetDateTime.of(2000, 1, 1, 11, 11, 11, 0, ZoneOffset.of("+9"));    
// 2000-01-01T11:11:11+09:00
// 위 두 값은 다릅니다.
```

### ZonedDateTime

![ZonedDateTime](https://user-images.githubusercontent.com/42582516/194759752-1ecd1bc2-ba39-43c2-801c-174f1723a988.png)

`OffsetDateTime + ZoneRegion` 의 개념입니다. OffsetDateTime 과의 차이점은 DST(Daylight Saving Time)와 같은 Time Transition Rule을 포함하는 ZoneRegion의 유무차이 입니다.

몇개의 나라의 경우, 서머타임을 적용하기 때문에 때로는 겨울, 여름을 다르게 써야하는데, 이를 자바에서는 하나의 Time Zone으로 통일하고, Time Transition Rule을 가지는 ZoneRules을 통해 알아서 내부적으로 계산해줍니다.

```java
ZoneId seoulZoneId = ZoneId.of("Asia/Seoul");
System.out.println(seoulZoneId.getRules()); 
// ZoneRules[currentStandardOffset=+09:00]
System.out.println(seoulZoneId.getId()); 
// Asia/Seoul

System.out.println(ZonedDateTime.of(LocalDateTime.of(2020, 1, 1, 11, 11, 11, 0), ZoneId.of("Asia/Seoul"))); 
// 2020-01-01T11:11:11+09:00[Asia/Seoul]
System.out.println(ZonedDateTime.of(LocalDateTime.of(2020, 1, 1, 11, 11, 11, 0), ZoneId.of("Asia/Tokyo"))); 
// 2020-01-01T11:11:11+09:00[Asia/Tokyo]
// 위 두값은 다른 region이라 다릅니다.

// cet 는 유럽 시간
System.out.println(ZonedDateTime.of(2020, 1, 1, 11, 11, 11, 0, ZoneId.of("CET"))); 
// 2020-01-01T11:11:11+01:00[CET]
System.out.println(ZonedDateTime.of(2020, 6, 1, 11, 11, 11, 0, ZoneId.of("CET")));
// 2020-06-01T11:11:11+02:00[CET]
```

<br/>

## JDBC에서 변경되는 형태

JDBC는 Java와 Database Scheme 사이의 컨버팅을 다음과 같이 자동으로 변경이 됩니다.

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

- [2038년 문제](https://en.wikipedia.org/wiki/Year_2038_problem)
- [OpenJDK](https://openjdk.org/jeps/150)
- [different between Instant and LocalDateTime](https://stackoverflow.com/questions/32437550/whats-the-difference-between-instant-and-localdatetime)
- [날짜와 시간 API](https://perfectacle.github.io/2018/09/26/java8-date-time/)
- [Java 8 - 새로운 Date & Time 정리](https://jaehoney.tistory.com/136)