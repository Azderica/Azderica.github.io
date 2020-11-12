---
layout: post
title: "[Kubernetes] Kubernetes란?"
subtitle: "Kubernetes에 대한 기본 정리"
categories: backend
tags: kubernetes backend
comments: true

---

# Kubernetes란.

쿠버네티스는 컨테이너화된 워크로드와 서비스를 관리하기 위한 오픈소스 플랫폼이이며 **이식성, 확장가능성**의 특징을 가집니다. 이 플랫폼은 컨테이너화된 애플리케이션을 배포하고 확장하는데 수동 프로세스가 필요하지 않씁니다.

이를 통해서 컨테이너를 실행하는 host 그룹을 함께 클러스팅이 가능하며, 클러스토를 쉽고 효율적으로 관리할 수 있다.

> 용어에 대한 간단한 정리.
> - 컨테이너 : 호스트  OS상에 논리적인 구획(컨테이너)를 만들고, 어플리케이션을 작동시키기 위해 필요한 라이브러리나 어플리케이션 등을 하나로 모아서 마치 별도의 서버인 것처럼 사용할 수 있게 만든 것.
> - 클러스터 : 여러 대의 컴퓨터를 네트워크를 통해 하나의 단일 컴퓨터처럼 동작하도록 제작한 컴퓨터
>
> 나중에 docker에 대해서도 추가적으로 설명하면서 더 자세하게 설명하겠습니다.


쿠버네티스는 클라우드 전체로 호스트를 확장할 수 있고, 이러한 기능이 Apache Kafka 스트리밍과 같이 신속한 확장을 요구하는 클라우드 환경에서 큰 장점을 가집니다.

## 쿠버네티스의 특징

### 1. 여러회사들의 참여로 인한 큰 스케일과 커뮤니티, 생태계

![image](https://user-images.githubusercontent.com/42582516/98944509-7ff19d00-2534-11eb-946b-18a309fe1399.png)

여러 회사의 노하우와 경험이 녹아있어서 다양한 커뮤니티와 좋은 생태계가 구성되어 있습니다. 대부분의 문제점이나 원하는 서비스를 만들려고 찾아보면 있는 것을 확인할 수 있습니다. CI(Continuous Integration), 컨테이너 서버리스, 머신러닝 등이 쿠버네티스 환경에서 잘 돌아갑니다.

> Kubernetes Community : [https://kubernetes.io/ko/community/](https://kubernetes.io/ko/community/)

### 2. 다양한 배포 방식 지원

쿠버네티스는 다양한 배포 방식을 지원합니다.

![image](https://user-images.githubusercontent.com/42582516/98945299-ae23ac80-2535-11eb-9fb2-f48b09e63f2c.png)

다음과 같이 Daemon Set, Deployment, stateful sets, Job등이 있으며, 각기 다른 특징을 가집니다.

- `Daemont Set` : 디플로이먼트와 유사하게 파드를 생성하고 관리 합니다. 디플로이먼트는 롤링 업데이트나 배포 일시 중지, 재개 등 배포 작업을 좀 더 세분화하여 조작하였다면, 데몬셋은 특정 노드 또는 모든 노드에 항상 실행되어야 할 특정 파드를 관리
- `Replicaset` : 실행되는 파드 개수에 대한 가용성을 보증 하며 지정한 파드 개수만큼 항상 실행될 수 있도록 관리
- `Deployment` : 레플리카셋의 상위 개념으로 볼 수도 있습니다. 레플리카셋을 생성하는 디플로이먼트를 정의할 수 있고, 배포 작업을 좀 더 세분화(롤링 업데이트 등) 하여 조작할 수 있는 기능
- `Stateful Set` : 디플로이먼트와 유사하며 동일한 컨테이너 스펙을 기반으로 둔 파드들을 관리한다. 다만, 스테이트풀셋은 각 파드의 독자성을 유지하는 지속적인 식별자를 가짐 (교체 불가)
- `CronJob` : 크론잡은 지정한 일정에 특정 파드를 실행하는 잡을 실행할 수 있음
- `Job` : 잡은 하나 이상의 파드를 지정하고 지정된 수의 파드를 성공적으로 실행하도록 하는 설정, 노드의 H/W 장애나 재부팅 등으로 인해 파드가 정상 실행이 되지 않았을 경우 job은 새로운 파드를 시작하도록 할 수 있음
- `Replication Controller` : 레플리케이션컨트롤러 는 언제든지 지정된 수의 파드 레플리카가 실행 중임을 보장한다. 다시 말하면, 레플리케이션 컨트롤러는 파드 또는 동일 종류의 파드의 셋이 항상 기동되고 사용 가능한지 확인할 수 있음

> 상세 설명은 해당 [링크](https://kubernetes.io/ko/docs/concepts/workloads/controllers/statefulset/) 에서...

### 3. Ingress 기능 제공


### 4. 클라우드 지원 기능


### 5. Namespcae & Label을 통한 구분


### 6. RBAC(Role-based access control)


### 7. CRD(Custom Resource Definitation)


### 8. Auto Scaling


### 9. Federation, Multi Cluster


### 10. 서비스 디스커버리와 로드 밸런싱


### 11. 스토리지 오케스레이션


### 12. 자동화된 롤아웃과 롤백


### 13. 자동화된 롤아웃과 롤백


### 14. 시크릿과 구성 관리
 



---

**출처**
- https://kubernetes.io/ko/docs/concepts/overview/what-is-kubernetes/
- https://subicura.com/2019/05/19/kubernetes-basic-1.html
- https://www.redhat.com/ko/topics/containers/what-is-kubernetes
- https://nirsa.tistory.com/