---
title: "[Flink] Flink이란?"
slug: 00-flink
date: 2020-12-11
published: true
tags: ['Flink', 'Apache', 'Java', 'Backend']
series: false,
cover_image: ./images/Flink.png
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
- Exactly-once : 정확하게 한번의 메시지 전송을 보장, 중복와 유실이 있습니다.

## Flink의 추상화


---
**출처**
- https://ci.apache.org/projects/flink/flink-docs-stable/
- https://gyrfalcon.tistory.com/entry/Flink-1-%EC%86%8C%EA%B0%9C-Basic-Concept
- https://riptutorial.com/ko/apache-flink
- https://www.popit.kr/%EC%95%84%ED%8C%8C%EC%B9%98-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EC%B2%98%EB%A6%AC-%ED%94%84%EB%A0%88%EC%9E%84%EC%9B%8C%ED%81%AC-%EB%B9%84%EA%B5%90%EB%B6%84%EC%84%9D-1/
- https://www.popit.kr/%EC%95%84%ED%8C%8C%EC%B9%98-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EC%B2%98%EB%A6%AC-%ED%94%84%EB%A0%88%EC%9E%84%EC%9B%8C%ED%81%AC-%EB%B9%84%EA%B5%90%EB%B6%84%EC%84%9D-2/
