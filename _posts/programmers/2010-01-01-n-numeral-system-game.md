---
layout: post
title: "n진수 게임"
updated: 2020-11-22
tags: [programmers,lv2]
---

## 문제

[프로그래머스, n진수 게임](https://programmers.co.kr/learn/courses/30/lessons/17687?language=python3)

n 진수로 변환하는 방법과, 이를 숫자 하나하나로 풀어서 게임을 진행해가는 방법을 해결해야 하는 문제다.

진법 변환에 대해서는 [별도 포스팅](https://zininote.github.io/post/convert-number-system)에 따로 소개하였다. 이 포스팅에서 언급한 numpy.base_repr 함수를 사용하여 n 진법 변환을 하였다.

게임을 진행하기 위해, 진법 변환된 숫자를 인원수 `m` 개씩 묶어서 yield 하는 제너레이터를 사용했다.

## 풀이

```python
import numpy as np

# n 진법으로 변환된 숫자를 m 개씩 yield 하는 함수
def gen(n, m):
    i, a = 0, ''
    while True:
        if len(a)>m:
            yield a[:m]
            a = a[m:]
        else:
            a += np.base_repr(i, n)
            i += 1

def solution(n, t, m, p):
    # t 번 반복, yield 한 문자열 p-1 번째만 모아서 리턴
    return ''.join(x[p-1] for x, _ in zip(gen(n, m), range(t)))
```

gen 함수 내부를 보면, `i` 를 0 부터 증가시켜가면서, 진법 변환된 숫자를 계속 `a` 에 이어붙여 간다. `a` 의 길이가 `m` 을 초과할 때마다, `m` 개씩 잘라서 yield 한다.

solution 함수에서는 생성된 문자열의 `p-1` 위치를 `t` 개만큼만 받아붙여서 리턴하는 구조다.
