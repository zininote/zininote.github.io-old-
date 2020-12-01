---
layout: post
title: "땅따먹기"
updated: 2020-12-02
tags: [programmers,lv2]
---

## 문제

[프로그래머스, 땅따먹기](https://programmers.co.kr/learn/courses/30/lessons/12913?language=python3)

이 문제의 일반적인 풀이법은 동적계획법(Dynamic Programming) 이다. 이를 모른다면 풀이 자체가 잘 안될 것이다. [다른 포스팅](https://zininote.github.io/post/recurrence-recursive-and-dynamic-programming)에 동적계획법을 소개하였으니 먼저 참고해보기 바란다.

땅따먹기 n 번째값을 fn(n) 이라할 때, 아래처럼 초기값과 일반항으로 이뤄진 점화식으로 나타낼 수 있다.

- 초기값: fn(0) = land[0]
- 일반항: fn(n) = land[n] + 열번호가 다른 fn(n-1) 값 중 가장 큰 값

말로만 표현하니 어려운데, 아래 코드를 보면 어떤 수식인지 이해가 될 것이라 본다. 위 링크를 건 포스팅에서 소개한 functools 모듈의 lru_cache 데코레이터를 사용하여 풀어보았다.

## 풀이

```python
from functools import lru_cache
import sys
sys.setrecursionlimit(1000000)

def solution(land):
    # lru_cache 메모이제이션 사용, 재귀함수 결과 리턴
    @lru_cache
    def fn(n):
        if n == 0: 
            return land[0]
        else:
            return [
                land[n][0] + max(fn(n-1)[1], fn(n-1)[2], fn(n-1)[3]),
                land[n][1] + max(fn(n-1)[0], fn(n-1)[2], fn(n-1)[3]),
                land[n][2] + max(fn(n-1)[0], fn(n-1)[1], fn(n-1)[3]),
                land[n][3] + max(fn(n-1)[0], fn(n-1)[1], fn(n-1)[2]),
            ]
    return max(fn(len(land)-1))
```
{:.python}

lru_cache 데코레이터를 사용하면, 메모이제이션(일단 한번 계산된 fn(n)의 값을 기억하여 재사용)을 자동으로 해주기에, 데코레이션이 없을 때보다 수행속도가 월등히 빠르다.

## 참고

아래는 Top-Down 방식의 동적계획법으로 풀어본 코드다. 원코드는 일반적인 재귀함수에 메모이제이션을 위한 데코레이터를 사용하였는데, 아래 코드는 함수 내부에 명시적으로 `cache` 딕셔너리를 사용하여 메모이제이션을 구현하였다.

```python
import sys
sys.setrecursionlimit(1000000)

def solution(land):
    # 재귀함수 결과 리턴
    def fn(n, cache={}):
        if n not in cache:
            if n == 0:
                cache[n] = land[0]
            else:
                cache[n] = [
                    land[n][0] + max(fn(n-1, cache)[1], fn(n-1, cache)[2], fn(n-1, cache)[3]),
                    land[n][1] + max(fn(n-1, cache)[0], fn(n-1, cache)[2], fn(n-1, cache)[3]),
                    land[n][2] + max(fn(n-1, cache)[0], fn(n-1, cache)[1], fn(n-1, cache)[3]),
                    land[n][3] + max(fn(n-1, cache)[0], fn(n-1, cache)[1], fn(n-1, cache)[2]),
                ]
        return cache[n]
    return max(fn(len(land)-1))
```
{:.python}

그리고 아래는 Bottom-Up 방식의 동적계획법이다. 재귀함수 대신 단순 반복문을 사용하였다.

```python
def solution(land):
    # 함수 결과 리턴
    def fn(n, cache={}):
        cache[0] = land[0]
        for n in range(1, n+1):
            cache[n] = [
                land[n][0] + max(cache[n-1][1], cache[n-1][2], cache[n-1][3]),
                land[n][1] + max(cache[n-1][0], cache[n-1][2], cache[n-1][3]),
                land[n][2] + max(cache[n-1][0], cache[n-1][1], cache[n-1][3]),
                land[n][3] + max(cache[n-1][0], cache[n-1][1], cache[n-1][2]),
            ]
        return cache[n]
    return max(fn(len(land)-1))
```
{:.python}
