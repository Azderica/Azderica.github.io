---
title: '[Database] Couchbase XDCR'
slug: 00-db-couchbase-xdcr
date: 2021-04-02
published: true
tags: ['Database', 'NoSql', 'Couchbase', 'Xdcr']
series: false
cover_image: ./images/CouchbaseLogo.png
canonical_url: false
description: 'Couchbase XDCR에 대해 정리합니다.'
---

# Couchbase XDCR

- 최근 진행해야하는 작업 중 하나가, 기존 Couchbase 서버가 있는 데이터 센터에서 서버 부하 해결 및 안정성을 위해 다른 데이터 센터에 데이터를 복제를 해야할 필요성이 존재합니다.
- 회사에서 작업하는 주 목적은 데이터 서버에 있는 Couchbase 서버가 모두 죽었을 때, 정상적으로 작동하도록 구성하는 것이 목표입니다.
- 이를 위해서 Cross Data Center Replication (약어, XDCR)에 대해 정리합니다.

## XDCR이란.

- XDCR(Cross Data Center Replication)은 클러스터 간의 데이터를 복제하며, 데이터 센터 장애에 대한 보호 기능과 고성능 데이터 액세스 기능을 제공합니다.
- XDCR은 source 클러스터의 특정 버킷에서 대상 클러스터의 특정 버킷으로 데이터를 복제합니다. XDCR agent를 통해 Database Change Protocol을 사용하여 버킷에서 다른 타켓 버킷으로 데이터를 넘길 수 있습니다.

<br/>

## XDCR과 클러스터 내부 복제와의 차이

- 클러스터 내부 복제의 경우, 클로스터 노드 전체에 데이터를 복제하나 XDCR의 경우 다른 데이터센터에 있는 여러 클러스터에 데이터를 복제합니다.
- 클러스터 내부 복제의 경우, 단일 버킷에 대해 수행되지만 XDCR은 복제를 위해 두 개의 버킷이 필요합니다. (하나는 복제 데이터 제공 소스 클러스터 버킷, 다른 하나는 수신 받을 대상의 클러스터)
- 클러스터 내 복제는 버킷 생성에서 구성되지만, XDCR은 소스 버킷과 대상 버킷을 모두 생성 후에 구성됩니다.

> 클러스터(cluster)

- 여러 대의 컴퓨터들이 연결되어 하나의 시스템처럼 동작하는 컴퓨터들의 집합, 해당 위에서는 서버들의 집합

> 버킷(bucket)

- 일반적으로 데이터가 영역으로 분할되는 document 유형입니다.

<br/>

## XDCR 절차

사전 작업

- XDCR의 대상이 될 원격 클러스터에 대한 References를 정의합니다.
  - [Document](https://docs.couchbase.com/server/current/manage/manage-xdcr/create-xdcr-reference.html)
- 소스 버킷에서 지장된 대상 버킷으로 변경내용을 전송하는 복제를 정의하고 시작합니다.
  - [Document](https://docs.couchbase.com/server/current/learn/clusters-and-availability/xdcr-overview.html#manage:manage-xdcr/create-xdcr-replication)
- 복제를 모니터링합니다.

다음의 옵션을 사용할 수 있습니다.

- Couchbase Web Console
- CLI
- REST API(Web Console, CLI)

<br/>

## XDCR Direction, Topology

- 크게 전략은 단방향(Unidirectionally)와 양방향(Bidirectionally)로 구성됩니다.
- 향후 진행할 작업은 양방향 XDCR을 구성할 방향이다.

### Unidirectionally

![Unidirectionally](https://user-images.githubusercontent.com/42582516/113409137-a2089080-93eb-11eb-9fdc-15f325939633.png)

- 지정된 소스 버킷에 포함된 데이터가 지정된 대상 버킷에 복제되며, 일반적으로 **백업 용도로 사용**됩니다.

### Bidirectionally

![Bidirectionally](https://user-images.githubusercontent.com/42582516/113409142-a5038100-93eb-11eb-8e01-c23ce981dfd5.png)

- 지정된 소스 버킷에 포함된 데이터는 대상 버킷에 복제되고, 반대의 방향의 경우에도 적용됩니다. 해당 두 버킷을 모두 데이터 서비스용으로 사용할 수 있으며, **사용자에 좀 더 빠른 데이터 액세스를 제공**할 수 있습니다.
- 이러한 양방향 XDCR은 두 데이터 센터 이상으로도 작업할 수 있습니다.

![image](https://user-images.githubusercontent.com/42582516/113409371-1d6a4200-93ec-11eb-8ff6-0a2205b62be6.png)

<br/>

## 마무리.

간략하게, XDCR에 대해 작성했습니다. 향후, 해당 작업 완료 후 추가적인 게시글을 작성할 예정입니다.

---

**출처**

- [Couchbase XDCR Doc](https://docs.couchbase.com/server/current/learn/clusters-and-availability/xdcr-overview.html)
