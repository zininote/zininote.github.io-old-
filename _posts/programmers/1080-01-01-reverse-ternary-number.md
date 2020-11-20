---
layout: post
title: "3진법 뒤집기"
updated: 2020-11-20
tags: [programmers,lv1]
---

## 문제

[프로그래머스, 3진법 뒤집기](https://programmers.co.kr/learn/courses/30/lessons/68935?language=python3)

숫자 진법 체계에 관한 문제다. 10진수를 다른 진법 수로 바꾸고, 다시 10진수로 환원을 해주는 코드를 구현하면 된다.

진법 변환 코드에 대해서는 [별도 포스팅](https://zininote.github.io/post/convert-number-system)에 소개하였다. 여기에서 구현한 코드를 그대로 가져와 응용하였다.

## 풀이

```python
# 10->3진법 변환 함수
def to_base3(n, d='012'):
    return d[n%3] if n<3 else to_base3(n//3)+d[n%3]

# 3->10진법 환원 함수
def from_base3(n):
    return sum(int(x)*3**i for i, x in enumerate(n[::-1]))

def solution(n):
    # 3진법 변환, 뒤집기, 10진법 환원 후 리턴
    return from_base3(to_base3(n)[::-1])
```
{:.python}

Python 에서는 진법 변환을 쉽게 할 수있도록 기본 함수를 제공하고 있다. 위 별도 포스팅에서도 언급한 base.repr 과 int 함수인데, 알고리즘을 학슴하는 목적상 별도로 코드를 구현하였다.

진법 변환의 원리를 알아야 코드가 이해가 될 것이다. 검색해보거나 [위키피디아](https://ko.wikipedia.org/wiki/%EA%B8%B0%EC%88%98%EB%B2%95#%EC%A7%84%EC%88%98) 내용을 참고해보기 바란다.
