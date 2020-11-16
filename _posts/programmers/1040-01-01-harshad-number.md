---
layout: post
title: "하샤드 수"
updated: 2020-11-17
tags: [programmers,lv1]
---

## 문제

[프로그래머스, 하샤드 수](https://programmers.co.kr/learn/courses/30/lessons/12947)

어떤 수 x 와, x 의 각 자릿수의 합계인 y 가 있을 때, x%y == 0 이면, x 를 하샤드 수라고 한다. y 를 어떻게 구할 수 있을까를 찾는 것이 핵심인 문제다.

어떤 수 x 의 각 자릿수 합계를 구하기 위해, x 를 문자열로 변환, 각 자릿수를 순회, 다시 숫자로 바꿔 합산 하는 식으로 해결하기로 했다. 마지막엔 하샤드 수인지만 판단하면 된다.

## 풀이

```py
def solution(x):
    # 하샤드 수 여부 리턴
    sum_of_digits = sum(int(e) for e in str(x))
    return x % sum_of_digits == 0
```
{:.python}

Python 은 빌트인으로 sum 함수를 기본 제공하며, 반복이 가능한 개체라면 무엇이든 인수에 넣을 수 있으므로, comprehension 표현식을 사용하여 문자열화된 `x` 를 순회하도록 했다.

## 참고

다른풀이를 보다보니 위 코드와 다르게 접근한 방식도 찾을 수 있었다.

어떤 숫자 x 를 10으로 나누고 나머지를 구하면, 그 나머지는 마지막 자리의 숫자가 된다. 그리고 몫을 다시 10으로 나누고 나머지를 구한다. 더 이상 나눗셈이 불가능할 때, 그 때까지 구한 나머지들의 합계는, x 의 각 자릿수의 합계와 같다. 이 방식에 착안하여 코드를 수정해보았다.

```py
def solution(x):
    # 하샤드 수 여부 리턴
    sum_of_digits = lambda n: n if n<10 else sum_of_digits(n//10)+n%10
    return x % sum_of_digits(x) == 0
```
{:.python}

먼저 본인이 풀었던 원코드에서는 `sum_of_digit` 이 변수였지만, 이번에는 함수가 되었다. lambda 익명함수를 사용하여 `sum_of_digit` 에 할당하였다. 할당된 이름으로 재귀호출이 가능하다.

주어지는 `n` 이 10 보다 작으면 `n` 을 그대로 리턴하고, 그렇지 않다면 몫만을 추려서 다시 재귀호출하고 나머지를 더하는 식으로 구하고 있다.
