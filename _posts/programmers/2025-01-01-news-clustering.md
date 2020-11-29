---
layout: post
title: "뉴스 클러스터링"
updated: 2020-11-29
tags: [programmers,lv2]
---

## 문제

[프로그래머스, 뉴스 클러스터링](https://programmers.co.kr/learn/courses/30/lessons/17677?language=python3)

두 문자열을 문제에서 요구한대로 분해하여, 복수를 허용하는 집합을 만들고, [자카드 지수](https://ko.wikipedia.org/wiki/%EC%9E%90%EC%B9%B4%EB%93%9C_%EC%A7%80%EC%88%98)를 사용하여 요구하는 계산을 수행하면 된다.

보통 생각할 수 있는 집합 자료형으로는 이처럼 복수 요소를 다룰 수가 없는데, Python 에는 이를 위한 자료형을 별도로 제공한다. collections 모듈의 Counter 자료형이다. 자세한 건 [Python 공식문서](https://docs.python.org/3.9/library/collections.html#collections.Counter)를 참고하기 바란다.

## 풀이

```python
from collections import Counter

def solution(str1, str2):
    # Counter 자료형 생성
    s1 = Counter((x+y).lower() for x, y in zip(str1, str1[1:]) if x.isalpha() and y.isalpha())
    s2 = Counter((x+y).lower() for x, y in zip(str2, str2[1:]) if x.isalpha() and y.isalpha())

    # Jaccard Index 계산, 결과 리턴
    j = sum((s1&s2).values()) / sum((s1|s2).values()) if s1|s2 else 1
    return int(j*65536)
```
{:.python}

`str1`, `str2` 문자열을 요구한대로 두글자씩 끊었다. 문자열 슬라이싱 문법에 `zip` 함수를 사용하면 쉽게 두글자씩 붙일 수 있었다.

Counter 자료형은 집합의 요소와 그 개수를 Key: Value 형태로 가지고 있는 자료형이다. & 연산과 | 연산은 각각 교집합과 합집합을 구해주는데, 문제에서 요구한 대로 만들어준다.
