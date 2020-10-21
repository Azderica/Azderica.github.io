---
layout: post
title: "[Others] 좋은 개발자가 되기 위한 19가지"
subtitle: "19 things I stole from great developers"
categories: others
tags: others developer
comments: true

---

# 좋은 개발자가 되기 위한 19 가지 방법

## 1. 3개의 룰을 지켜라
> Rule of 3.

코드 리팩터링을 진행할 때, 중복된 코드를 새로운 코드(new code), 절차(procedure), 방법(methods)으로 교체한다.

이러한 리팩토링을 통해 코드와 절차, 방법 등을 일반화해서 여러곳에서 재사용할 수 있게 하는 것이 주 개념이다.


## 2. 지속성을 유지해라
> Consistency is king

코드를 짜고, 구조를 짜는 것에 일관성을 가져라. 이는 애플리케이션의 가독성과 유지관리에 도움이 된다.

코딩의 표준을 만들어서 일관성을 유지하는 것이 좋다. 이는 대신 변수의 명명 규칙만큼 작아야한다. 

애플리케이션의 구조는 개발자가 변경할 부분이나 새로운 것을 추가해야하는 부분에 대해 명확해야한다.


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


## 4. 더 큰 그림을 생각해라
> Think of the bigger picture

큰 그림을 이해하면 작은 세부 사항들을 더 쉽게 따라가고 이해할 수 있다. 


## 5. 이름 설정에 시간을 투자해라
> Spend time thinking of naming things

클래스, 메소드, 변수에 대한 이름을 정하는 것은 어렵다. 그러나 좋은 이름은 가독성에 큰 도움이 된다.


## 6. 기술적인 빚은 나쁘다
> Technical debt is bad

기술적인 빚은 소프트웨어 개발에서 나오는 개념이며, 시간이 더 오래걸린다고 더 나은 접근법을 사용하지 않고 현재 쉬운 방법을 선택하면 이후에 발생하는 묵시적인 비용이 발생할 수 있다.


## 7. 과대평가를 피해라
> Overestimate

많은 일들이 보통 기대하는 것보다 더 오래 걸린다. 이를 과대평가하면 이후에 문제가 발생할 수 있다.

따라서 시간적 여유를 가지고 개발을 진행하는 것이 좋다.


## 8. 문서화와 주석을 달아라
> Document and code comments

문서화와 주석은 지식을 공유하는데 도움이 된다. 이러한 기록들을 통해서 이후에 개발에 큰 도움이 된다.


## 9. 나쁜 코드는 자신감있게 없애라
> Be confident about deleting bad code

잘못된 코드를 언급하고 남겨놓은 경우가 발생한다. 이보다는 버전관리를 하는 것이 더 좋다. 사용하지 않는 많은 코드들은 나쁜 코드이며 삭제를 해야한다.


## 10. 코드 리뷰에 시간을 투자해라
> Spend time on code Reviews


## 11. 좋은 테스트를 작성해라
> Write good tests


## 12. 디자인에 시간을 투자해라
> Spend time designing


## 13. 구문보다는 기본에 충실해라
> Focus on the fundamentals and not on the syntax


## 14. 구글을 좋은 친구로 사용해라.
> Make Google your best friend


## 15. 일단 작동하게하고, 그 다음에 아름답게 만들어라.
> Make sure it works first, then make it pretty later


## 16. 위험 관리와 문제 해결에 신경을 써라
> Risk management and problem resultion


## 17. 질문을 해라.
> Ask questions


## 18. 가능한 논리를 데이터베이스에서 제외시켜라
> Keep logic out of the database whenever possible


## 19. KISS
> Keep It simple Stupid

---

**출처**
- https://medium.com/javascript-in-plain-english/19-things-i-stole-from-great-developers-85511ff56570