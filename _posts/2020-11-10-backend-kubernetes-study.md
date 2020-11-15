---
layout: post
title: "[Kubernetes] Kubernetes란?"
subtitle: "Kubernetes에 대한 기본 정리"
categories: backend
tags: kubernetes backend
comments: true

---

# Kubernetes란.

쿠버네티스는 컨테이너화된 워크로드와 서비스를 관리하기 위한 오픈소스 플랫폼이이며 **이식성, 확장가능성**의 특징을 가집니다. 이 플랫폼은 컨테이너화된 애플리케이션을 배포하고 확장하는데 수동 프로세스가 필요하지 않습니다.

이를 통해서 컨테이너를 실행하는 host 그룹을 함께 클러스팅이 가능하며, 클러스토를 쉽고 효율적으로 관리할 수 있다.

> 용어에 대한 간단한 정리.
> - 컨테이너 : 호스트  OS상에 논리적인 구획(컨테이너)를 만들고, 어플리케이션을 작동시키기 위해 필요한 라이브러리나 어플리케이션 등을 하나로 모아서 마치 별도의 서버인 것처럼 사용할 수 있게 만든 것.
> - 클러스터 : 여러 대의 컴퓨터를 네트워크를 통해 하나의 단일 컴퓨터처럼 동작하도록 제작한 컴퓨터
>
> 나중에 docker에 대해서도 추가적으로 설명하면서 더 자세하게 설명하겠습니다.


쿠버네티스는 클라우드 전체로 호스트를 확장할 수 있고, 이러한 기능이 Apache Kafka 스트리밍과 같이 신속한 확장을 요구하는 클라우드 환경에서 큰 장점을 가집니다.

<br/>

## 쿠버네티스의 기본 용어

![image](https://user-images.githubusercontent.com/42582516/99147045-cffd6a80-26c0-11eb-846e-dee35301857c.png)


- 마스터(Master) : 노드를 제어하고 전체 클러스터를 관리해주는 컨트롤러, 전체적인 제어/관리를 하기 위한 관리 서버
- 노드(Nod) : 컨테이너가 배포될 물리 서버 또는 가상 머신이며 워커 노드(Worker Node)라고 불린다.
- 파드(Pod) : 단일 노드에 배포된 하나 이상의 컨테이너 그룹이며, Pod라는 단위로 여러개의 컨테이너를 묶어서 파드 단위로 관리가 가능하다.

<br/>

## 쿠버네티스의 특징

### 1. 여러회사들의 참여로 인한 큰 스케일과 커뮤니티, 생태계

![image](https://user-images.githubusercontent.com/42582516/99147075-1fdc3180-26c1-11eb-88af-4702b0d1236e.png)

> 우리가 아는 많은 회사가 보인다.


여러 회사의 노하우와 경험이 녹아있어서 다양한 커뮤니티와 좋은 생태계가 구성되어 있습니다. 대부분의 문제점이나 원하는 서비스를 만들려고 찾아보면 있는 것을 확인할 수 있습니다. CI(Continuous Integration), 컨테이너 서버리스, 머신러닝 등이 쿠버네티스 환경에서 잘 돌아갑니다.

> Kubernetes Community : [https://kubernetes.io/ko/community/](https://kubernetes.io/ko/community/)

### 2. 다양한 배포 방식 지원

쿠버네티스는 다양한 배포 방식을 지원합니다.

![image](https://user-images.githubusercontent.com/42582516/98945299-ae23ac80-2535-11eb-9fb2-f48b09e63f2c.png)

다음과 같이 Daemon Set, Deployment, stateful sets, Job등이 있으며, 각기 다른 특징을 가집니다.

- `Daemont Set` : 디플로이먼트와 유사하게 파드를 생성하고 관리합니다. 디플로이먼트는 롤링 업데이트나 배포 일시 중지, 재개 등 배포 작업을 좀 더 세분화하여 조작하였다면, 데몬셋은 특정 노드 또는 모든 노드에 항상 실행되어야 할 특정 파드를 관리합니다.
- `Replicaset` : 실행되는 파드 개수에 대한 가용성을 보증 하며 지정한 파드 개수만큼 항상 실행될 수 있도록 관리합니다.
- `Deployment` : 레플리카셋의 상위 개념으로 볼 수도 있습니다. 레플리카셋을 생성하는 디플로이먼트를 정의할 수 있고, 배포 작업을 좀 더 세분화(롤링 업데이트 등) 하여 조작할 수 있는 기능을 제공합니다.
- `Stateful Set` : 디플로이먼트와 유사하며 동일한 컨테이너 스펙을 기반으로 둔 파드들을 관리한다. 다만, 스테이트풀셋은 각 파드의 독자성을 유지하는 지속적인 식별자를 가집니다. (교체 불가)
- `CronJob` : 크론잡은 지정한 일정에 특정 파드를 실행하는 잡을 실행할 수 있습니다.
- `Job` : 잡은 하나 이상의 파드를 지정하고 지정된 수의 파드를 성공적으로 실행하도록 하는 설정, 노드의 H/W 장애나 재부팅 등으로 인해 파드가 정상 실행이 되지 않았을 경우 job은 새로운 파드를 시작하도록 할 수 있습니다.
- `Replication Controller` : 레플리케이션컨트롤러 는 언제든지 지정된 수의 파드 레플리카가 실행 중임을 보장합니다. 즉, 레플리케이션 컨트롤러는 파드 또는 동일 종류의 파드의 셋이 항상 기동되고 사용 가능한지 확인할 수 있습니다.

> 상세 설명은 해당 [여기](https://kubernetes.io/ko/docs/concepts/workloads/controllers/statefulset/) 에서...

### 3. Ingress 기능 제공

**인그레스**는 클러스터 외부에서 클러스터 내부 서비스로 HTTP와 HTTPS 경로를 노출합니다. 트래픽 라우팅은 인그레스 리소스에 정의된 규칙에 의해 컨트롤이 가능합니다.

다음은 인스레스가 모든 트래픽을 하나의 서비스로 보내는 간단한 예시입니다.

![image](https://user-images.githubusercontent.com/42582516/99082398-738a4480-2607-11eb-9741-c038299efc71.png)

인그레스는 외부에서 서비스로 접속이 가능한 URL, 로드 밸런스 트래픽, SSL / TLS 종료 그리고 이름-기반의 가상 호스팅을 제공하도록 구성할 수 있습니다. **인그레스 컨트롤러**는 일반적으로 로드 밸런서를 사용해서 인그레스를 수행할 책임이 있으며, 트래픽을 처리하는데 도움이 되도록 에지 라우터 또는 추가 프런트 엔드를 구성할 수도 있습니다.


### 4. 클라우드 지원 기능

쿠버네티스는 부하에 따라 자동으로 서버를 늘리는 기능인 AutoScaling이 있고, IP를 할당받아 로드밸런서로 사용할 수 있습니다.

쿠버네티스는 Cloud Controller를 이용하여 클라우드 연동을 손쉽게 확장할 수 있습니다. 그 덕분에 AWS, Google Cloud, MS Azure 등을 쉽게 사용할 수 있습니다.


### 5. Namespcae & Label을 통한 구분

![image](https://user-images.githubusercontent.com/42582516/99147381-ed800380-26c3-11eb-8353-23f58c65b722.png)

하나의 클러스터를 논리적으로 구분해서 사용할 수 있습니다. 하나의 클러스터에 다양한 프레임워크와 애플리케이션을 설치하기 때문에 기본 (system, default)외에 여러 개의 네임스페이스를 사용하는 것이 일반적입니다.

### 6. RBAC(Role-based access control)

![image](https://user-images.githubusercontent.com/42582516/99147431-3fc12480-26c4-11eb-9e76-50b1b9d780c6.png)

RBAC는 접근 권한 시스텝입니다. 각각의 리소스에 대해 유저별로 CRUD스러운 권한을 손쉽게 지정할 수 있으며, 클러스터 전체에 적용하거나 특정 네임스페이스에 적용할 수 있습니다.

### 7. CRD(Custom Resource Definitation)

쿠버네티스가 제공하지 않는 기능을 기본 기능과 동일한 빙식으로 적용하고 사용할 수 있는 기능입니다. 

- Ex) Knative 등등

### 8. Auto Scaling

CPU, memory 사용량, 접속자 수 등을 조절할 수 있습니다. 다음과 같은 종류가 있습니다.

- HPA(Horizontal Pod Autoscaler) : 컨테이너 개수 조정
- VPA(Vertical Pod Autoscaler) : 컨테이너 리소스 할당량 조절
- CA(Cluster Autoscaler) : 서버 개수 조정

### 9. Federation, Multi Cluster

클라우드에 설치된 쿠버네티스 클러스와 자체 서버에 설치한 쿠버네티스를 묶어서 하나로 사용할 수 있습니다. 구글에서 발표한 Anthos를 사용하면 한 곳에서 여러 클라우드의 클러스터를 관리할 수 있습니다.

### 10. IT 보안

![image](https://user-images.githubusercontent.com/42582516/99147877-a98efd80-26c7-11eb-973f-58fae551a5d6.png)

컨테이너 보안은 멀티레이어 구조이므로 이는 복잡합니다. 쿠버네티스는 워크로드를 위해 규모에 맞는 컨테이너를 배포하는데 필요한 자원 및 관리 기능을 제공합니다. 이를 통해서 애플리케이션 서비스를 구축하고, 일정을 계획하고, 컨테이너를 확장해서 컨테이너 상태를 지속적으로 관리할 수 있습니다.
 
 <br/>

## 쿠버네티스의 개념







---

**출처**
- https://kubernetes.io/ko/docs/concepts/overview/what-is-kubernetes/
- https://subicura.com/2019/05/19/kubernetes-basic-1.html
- https://www.redhat.com/ko/topics/containers/what-is-kubernetes
- https://nirsa.tistory.com/
- https://nirsa.tistory.com/129?category=871751
- https://arisu1000.tistory.com/27862
