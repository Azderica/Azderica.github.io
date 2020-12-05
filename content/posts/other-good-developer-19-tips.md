---
title: "[Others] 좋은 개발자가 되기 위한 19가지"
slug: 00-good-developer
date: 2020-10-21
published: true
tags: ['Others', 'Developer']
series: false,
cover_image: ./images/DeveloperImage.jpeg
canonical_url: false
description: " 좋은 개발자가 되기 위한 19가지의 방법입니다."

---

# 좋은 개발자가 되기 위한 19 가지 방법

<br/>

## 1. 3개의 룰을 지켜라
> Rule of 3.

코드 리팩터링을 진행할 때, 중복된 코드를 새로운 코드(new code), 절차(procedure), 방법(methods)으로 교체한다.

이러한 리팩토링을 통해 코드와 절차, 방법 등을 일반화해서 여러곳에서 재사용할 수 있게 하는 것이 주 개념이다.


<br/>

## 2. 지속성을 유지해라
> Consistency is king

코드를 짜고, 구조를 짜는 것에 일관성을 가져라. 이는 애플리케이션의 가독성과 유지관리에 도움이 된다.

코딩의 표준을 만들어서 일관성을 유지하는 것이 좋다. 이는 대신 변수의 명명 규칙만큼 작아야한다. 

애플리케이션의 구조는 개발자가 변경할 부분이나 새로운 것을 추가해야하는 부분에 대해 명확해야한다.


<br/>

## 3. 중복을 피해라
> Reduce nesting

If 문안에 있는 If 문은 매우 빨리 지저분해지고 읽기가 매우 어렵다.

마찬가지로 이러한 중복은 최대한 피해야한다. 

이를 해결하는 방법으로 **guard clause** 을 지키는 것도 방법입니다.

- guard clause가 없을 경우.

```java
if (account != null)
{
    if (order != null)
    {
        if (order.term == Term.Annually)
        {
            // term annually
        }
        else if (order.term == Term.Monthly)
        {
            // term monthly
        }
        else
        {
            throw new InvalidEnumArgumentException(nameof(term));
        }
    }
    else
    {
        throw new ArgumentNullException(nameof(subscription));
    }
}
```

- guard clause가 있는 경우

```java
if (account == null)
{
        throw new ArgumentNullException(nameof(account));
}
if (order == null)
{
    throw new ArgumentNullException(nameof(order));
}
if (order.term == Term.Annually)
{
    // term annually (return here)
}
if (order.term == Term.Monthly)
{
    // term monthly (return here)
}
throw new InvalidEnumArgumentException(nameof(order.term));

```

<br/>


## 4. 더 큰 그림을 생각해라
> Think of the bigger picture

큰 그림을 이해하면 작은 세부 사항들을 더 쉽게 따라가고 이해할 수 있다. 


<br/>

## 5. 이름 설정에 시간을 투자해라
> Spend time thinking of naming things

클래스, 메소드, 변수에 대한 이름을 정하는 것은 어렵다. 그러나 좋은 이름은 가독성에 큰 도움이 된다.


<br/>

## 6. 기술적인 빚은 나쁘다
> Technical debt is bad

기술적인 빚은 소프트웨어 개발에서 나오는 개념이며, 시간이 더 오래걸린다고 더 나은 접근법을 사용하지 않고 현재 쉬운 방법을 선택하면 이후에 발생하는 묵시적인 비용이 발생할 수 있다.


<br/>

## 7. 과대평가를 피해라
> Overestimate

많은 일들이 보통 기대하는 것보다 더 오래 걸린다. 이를 과대평가하면 이후에 문제가 발생할 수 있다.

따라서 시간적 여유를 가지고 개발을 진행하는 것이 좋다.


<br/>

## 8. 문서화와 주석을 달아라
> Document and code comments

문서화와 주석은 지식을 공유하는데 도움이 된다. 이러한 기록들을 통해서 이후에 개발에 큰 도움이 된다.


<br/>

## 9. 나쁜 코드는 자신감있게 없애라
> Be confident about deleting bad code

잘못된 코드를 언급하고 남겨놓은 경우가 발생한다. 이보다는 버전관리를 하는 것이 더 좋다. 사용하지 않는 많은 코드들은 나쁜 코드이며 삭제를 해야한다.


<br/>

## 10. 코드 리뷰에 시간을 투자해라
> Spend time on code Reviews

코드 리뷰는 다음과 같은 이점이 있다.
- 버그를 찾기 쉽게 도와준다.
- 개발 기술의 향상과 팀원에게 좋은 실전을 제공한다.
- 지식을 공유할 수 있다.
- 일관성있는 디자인과 개발이 가능하다.

좋은 개발자가 좋은 코드 검토 프로세스는 다음과 같다.
- **리스크가 적은 작은 업무**는 개발자 한명이 진행한다.
- **중형이나 대형 변경, 위험한 변경**은 3명의 개발자가 진행하며 그 중 한명은 시니어 개발자가 진행하는 것이 좋다.
- **극도로 위험한 변경이나, 개발중인 애플리케이션의 새로운 부분**은 미팅을 진행하고 3명의 개발자가 각 라인을 함께 거치며 포인트를 만드는 리드 개발자가 있어야한다.


<br/>

## 11. 좋은 테스트를 작성해라
> Write good tests

좋은 개발자는 좋은 테스트를 만드는데 시간을 투자한다.

이 테스트가 잘 수행되면 응용프로그램을 더욱 자신있게 확장할 수 있으며 생산 버그를 줄일 수 있다.


<br/>

## 12. 디자인에 시간을 투자해라
> Spend time designing

코드를 짜기전에는 먼저 생각을 하고, 이를 작은 덩어리로 분리해야한다. 이는 좀더 조화를 이루게 할 수 있고 더 깨끗한 코드를 만들 수 있게 도와준다.


<br/>

## 13. 구문보다는 기본에 충실해라
> Focus on the fundamentals and not on the syntax

기본적인 부분에 집중을 해야한다. 이는 문제를 더 효과적으로 찾을 수 있고 많은 이해를 바탕으로 구글링하기 편해진다.


<br/>

## 14. 구글을 좋은 친구로 사용해라.
> Make Google your best friend

구글리을 통하면 많은 문제를 해결할 수 있다. 이때 특히, 기본적인 부분이 검색에서 많은 도움이 된다. 구글은 어떤 용어를 검색해야 하는지 알고 있는 부분에 초점을 맞추었기 때문에 이를 잘 이용해야한다.


<br/>

## 15. 일단 작동하게하고, 그 다음에 아름답게 만들어라.
> Make sure it works first, then make it pretty later

초보 개발자의 실수는 처음에 예쁘게 만들려고 너무 많은 시간을 할애한다. 이는 나중에 동작이 작동하지 않게되는 결과를 얻게된다.

좋은 개발자는 일찍부터 작동하도록 구성한다. 코드를 아름답게 짜기전에 어떤 문제든 일찍 확인할 수 있게 구성해놓습니다. 이는 이후에 좀 더 프로젝트가 훨씬 더 원활하게 진행됩니다.

<br/>

## 16. 위험 관리와 문제 해결에 신경을 써라
> Risk management and problem resultion

좋은 개발자는 위험을 정의하고 디자인 패턴을 적용해서 복잡한 문제를 해결할 수 있습니다. 더 나아가 과거의 경험을 통해서 다양한 문제를 독립적으로 해결합니다.


<br/>

## 17. 질문을 해라.
> Ask questions

좋은 개발자는 극히 간단한 질문이라도 개의치않으며 모든 것을 알려고 한다. 이유는 비지니스와 관련된 질문일 수도 있기 때문이다.

비지니스 요구를 이해하면 좋은 코드를 만들 수 있다. 좋은 개발자는 자신의 능력에 자신이 있으므로 질문을 두려워하지 않는다.


<br/>

## 18. 가능한 논리를 데이터베이스에서 제외시켜라
> Keep logic out of the database whenever possible

이 조건은 구축중인 애플리케이션의 유형 중, 성능에 영향을 미치지 않는 경우에만 해당한다.

좋은 개발자들은 간단한 CRUD 작업에 대한 데이터베이스 쿼리를 유지한다.
> CRUD : Create, Read, Update, Delete


다음과 같이 진행할려면 비즈니스 논리 계층을 하나로 묶는 작업이 필요하다. 이렇게 진행하면 개발자들이 비지니스 논리를 쉽게 찾을 수 있으며, 데이터베이스 쿼리와 코드에 논리가 있으면 지저분해 진다.


<br/>

## 19. KISS
> Keep It simple Stupid

코드를 단순하게 유지하는 것이 최선의 방법이다. 때로는 이 부분이 많은 코드라인을 생성하더라도 이는 반드시 필요하다

- 잘못된 케이스는 다음과 같다. 이는 읽기 매우 어렵다.

```java
return dir.Keys.Any(k => k >= limit) ? dir.First(x => x.Key >= limit).Value : dir[dir.Keys.Max()];
```

## 결론.

이러한 부분은 좋은 개발자들이 매일 사용하는 방법이고, 실제 코딩보다도 어떠하게 작업에 접근을 해야하는지를 알려줍니다.

---

**출처**
- https://medium.com/javascript-in-plain-english/19-things-i-stole-from-great-developers-85511ff56570