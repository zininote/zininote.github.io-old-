---
layout: post-programmers
title: "LV2: 땅따먹기"
updated: 2020-09-11
cat: programmers
---

## 문제

[프로그래머스, 땅따먹기](https://programmers.co.kr/learn/courses/30/lessons/12913?language=python3)

최대값이 되는 궤적을 어떻게 추적할 수 있는가를 생각해내는 것이 핵심인 문제다.

이는 점화식으로 나타낼 수 있는데, 점화식은 보통 동적계획법으로 풀 수 있는 문제다. 동적계획법이 무엇인지는 [다른 포스팅](https://zininote.github.io/posts/recurrence-relation-and-recursion-and-dynamic-programming)에 소개하였으니 궁금한 독자들은 한번 살펴보거나 포털에서 검색해보길 권한다.

이 문제를 점화식으로 나타내면 아래와 같다.

- 초기값: land[0] 의 각 열값
- 일반항: land[n] 의 각 열값 + land[n-1] 에서 n 번째 열이랑 겹치지 않는 열들 중 최고값

잘 이해가 안되면 아래 풀이를 바로 보자. 초기값과 일반항을 어떻게 설정했는지 금방 알 수 있을 것이다.

## 풀이

```py
import sys
sys.setrecursionlimit(1000000)

from functools import lru_cache

def solution(land):
    # 1
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
        
    # 2
    return max(fn(len(land)-1))
```

`# 1` 에 있는 `fn` 함수 내부를 보면, `if` 조건에 따라서 초기값과 일반항을 구분하고 있다. 그리고 재귀호출로 땅따먹기 결과를 구한다. 다만 재귀호출을 과하게 사용하기 때문에 미리 `sys.setrecursionlimit` 함수로 재귀호출 제한을 크게 확대했다.

또하나 눈여겨볼 것은 `functools` 모듈의 `lru_cache` 데코레이터를 사용하였다는 것이다. 이 데코레이션을 통해 [메모이제이션](https://zininote.github.io/posts/recurrence-relation-and-recursion-and-dynamic-programming)이 가능한데, 이 데코레이터에 대해선 위 링크 안에도 설명하였으니 참고해보기 바란다. 데코레이터가 없어도 로직에는 문제없으나 시간초과로 문제를 해결할 수 없다. 과도한 재귀호출이 발생하기 때문이다.

## 참고

데코레이터에 의존하지 않고 직접 메모이제이션을 사용할 수 있다. (Top-down 방식의 동적계획법)

```py
import sys
sys.setrecursionlimit(1000000)

def solution(land):
    # 1
    def fn(n, m={}):
        if n not in m:
            if n == 0:
                m[n] = land[0]
            else:
                m[n] = [
                    land[n][0] + max(fn(n-1, m)[1], fn(n-1, m)[2], fn(n-1, m)[3]),
                    land[n][1] + max(fn(n-1, m)[0], fn(n-1, m)[2], fn(n-1, m)[3]),
                    land[n][2] + max(fn(n-1, m)[0], fn(n-1, m)[1], fn(n-1, m)[3]),
                    land[n][3] + max(fn(n-1, m)[0], fn(n-1, m)[1], fn(n-1, m)[2]),
                ]
        return m[n]

    # 2
    return max(fn(len(land)-1))
 ```
 
 `# 1` 을 보면 `fn` 함수에 인수가 하나 추가되었다. `m` 딕셔너리인데 값을 기억할 일종의 캐시공간이다. 실제로 `n` 번째 값을 구할 때 `m` 안에 값이 없으면 재귀호출을 하는 구조로 되어있다.
 
 재귀함수가 아닌 단순 반복문으로도 해결할 수 있다. (Bottom-up 방식의 동적계획법)
 
 ```py
 def solution(land):
    # 1
    m = {}
    m[0] = land[0]
    
    # 2
    for n in range(1, len(land)):
        m[n] = [
            land[n][0] + max(m[n-1][1], m[n-1][2], m[n-1][3]),
            land[n][1] + max(m[n-1][0], m[n-1][2], m[n-1][3]),
            land[n][2] + max(m[n-1][0], m[n-1][1], m[n-1][3]),
            land[n][3] + max(m[n-1][0], m[n-1][1], m[n-1][2]),
        ]
        
    # 3
    return max(m[len(land)-1])
```
