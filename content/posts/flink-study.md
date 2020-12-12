---
title: "[Flink] Flink이란?"
slug: 00-flink
date: 2020-12-11
published: true
tags: ['Flink', 'Apache', 'Java', 'Backend']
series: false,
cover_image: ./images/FlinkLogo.png
canonical_url: false
description: " Flink에 대한 기본 내용을 정리한 글입니다. "
---

# Flink

업무에 대해 진행하고, 오늘 있었던 쿠팡 레퍼런스에서 Apache Flink로 실시간 스트리밍에 대한 이야기가 있었는데, 이에 대해 Apache Flink가 정확하게 어떤 개념인지를 알지 못해서 이를 알아봐야겠다는 생각이 들었습니다.

## Flink의 개념

Flink의 공식 정의를 보면 `stream processing famework for distributed, high-performing, always-available, and accurate data streaming applications` 으로 정리되어 있습니다.

이를 한글로 정리하고 요약하자면 Apache Flink는 분산형 Big Data 분석을 위한 오픈소스 플랫폼입니다. 비슷한 플랫폼으로 Apache Storm과 Spark Streaming등이 있습니다

Flink는 Streaming model이 batch가 아닌 native 방식으로 스트림 처리를 하기 때문에 low latency 특성을 가집니다. 그리고 Exactly-once를 보장하고 높은 처리량을 보이기 때문에 최근 스트림 처리 분야에서 인기를 끌고 있습니다.

- low latency : 낮은 대기시간
- Exactly-once : 정확하게 한번의 메시지 전송을 보장, 중복와 유실이 없습니다.

<br/>

## Flink과 다른 프레임워크와의 비교

대표적인 프레임워크는 다음과 같습니다.

![Streaming Platforms](https://user-images.githubusercontent.com/42582516/101909427-cfdd8580-3c00-11eb-9fb9-602c73229f5e.png)

간단한 특징은 다음과 같습니다.

- Apache Storem
  - Twitter에 의해 오픈소스화
  - Large Scale Streaming Processing 플랫폼에서 선구자이며 업계 표준임
  - low-level API를 제공하는 native streaming 시스템
- Trident
  - Storm위에 구현될 수 있는 고차원 micro-batching
  - Storm의 Most once 방식과 달리 Exactly once 방식을 제공
- Spark
  - batch processing 플랫폼
  - 인기있는 플랫폼 중 하나입니다.
  - input 데이터가 receiver로 들어오게 되면, micro batch들을 생성해서 기본적인 Spark의 Job을 처리하는 방식입니다.
- Samza
  - Kafka와 함께 LinkedIn에서 개발한 Streaming 처리 플랫폼입니다.
  - Kafka의 로그데이터를 처리한다는 철학으로 두개의 플랫폼이 잘 통합되도록 구성되어 있습니다.
- Flink
  - High-lvel API를 지원하는 native 플랫폼입니다.
  - Spark와 마찬가지로 batch 처리를 위한 API 역시 지원합니다

차이를 구조화 시켜서 본다면 다음과 같습니다.

![Platform Difference](https://user-images.githubusercontent.com/42582516/101910334-1c759080-3c02-11eb-9b48-0fc440c2f304.png)

<br/>

## Flink의 추상화 레벨

Flink의 추상화 레벨은 다음과 같습니다.

![Apache Abstract Level](https://user-images.githubusercontent.com/42582516/101910378-32835100-3c02-11eb-93be-d73a1b52547f.png)

가장 아래부터 위로 설명드리겠습니다.
- Stateful Stream Processing : 사용자가 직접 state, time 등을 관리할 수 있는 low-level 이 위치합니다.
- DataStream / DataSet API : 핵심적으로 가장 많이 사용하는 Core API 가 위치합니다.
- Table API : Library로 제공되는 Table API가 제공됩니다.
- SQL : select, join, aggregate 등의 고차원 함수를 사용할 수 있으며 이러한 SQL를 사용할 수 있는 High-level Language를 지원합니다.

<br/>

## Flink의 동작

쉽게 설명하면 Flink 프로그램은 다음과 같이 돌아갑니다.

![image](https://user-images.githubusercontent.com/42582516/101910900-f7cde880-3c02-11eb-95ac-2cacc8435593.png)

- Data Source : Flink에서 처리하는 수신 데이터입니다.
- Transformations : 데이터 처리 단계, Flink가 들어오는 데이터를 수정합니다.
- Data Sink : Flink가 처리 후 데이터를 보내는 곳입니다.

Source나 Sink는 로컬 / HDFS(Hadoop Distributed File System, 하둡 분산형 파일 시스템), 데이터베이스, 메시지 대기열 등이 될 수 있습니다. 이는 직접 구현할 수도 있고 다른 것을 사용할 수도 있습니다.

이를 코드로 보면 다음과 같이 볼수 있습니다.

```java

// Source
DataStream<String> lines = env.addSource(new FlinkKafkaConsumer<>(...));

// Transformation
DataStream<Event> events = lines.map((line) -> parse(line));

// Transformation
DataStream<Statistics> stats = events
          .keyBy("id")
          .timeWindow(Time.seconds(10))
          .apply(new MyWindowAggregationFunction());

// Sink
stat.addSink(new RollingSink(path));

```

다음과 같이 위에서 설명한 flow 대로 진행됩니다.

<br/>

## 마무리.

Flink에 대한 개념은 한번에 정리하기에는 너무 어렵고, 내용자체도 어려운 부분이 많아서 먼저 간단하게 내용을 잡는다는 개념으로 글을 정리했습니다. 개념을 정리한 부분에서 잘못된 이야기가 있으면 이야기주시면 감사합니다.


---
**출처**
- https://ci.apache.org/projects/flink/flink-docs-stable/
- https://gyrfalcon.tistory.com/entry/Flink-1-%EC%86%8C%EA%B0%9C-Basic-Concept
- https://riptutorial.com/ko/apache-flink
- https://www.popit.kr/%EC%95%84%ED%8C%8C%EC%B9%98-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EC%B2%98%EB%A6%AC-%ED%94%84%EB%A0%88%EC%9E%84%EC%9B%8C%ED%81%AC-%EB%B9%84%EA%B5%90%EB%B6%84%EC%84%9D-1/
- https://www.popit.kr/%EC%95%84%ED%8C%8C%EC%B9%98-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EC%B2%98%EB%A6%AC-%ED%94%84%EB%A0%88%EC%9E%84%EC%9B%8C%ED%81%AC-%EB%B9%84%EA%B5%90%EB%B6%84%EC%84%9D-2/
