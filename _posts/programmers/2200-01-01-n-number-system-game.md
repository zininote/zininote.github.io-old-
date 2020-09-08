---
layout: post-programmers
title: "LV2: N진수 게임"
updated: 2020-09-07
cat: programmers
---

## 문제

[프로그래머스, N진수 게임](https://programmers.co.kr/learn/courses/30/lessons/17687?language=python3)

숫자 진법을 변환하는 부분, 그리고 이를 묶어서 필요한 부분만 추출해 내는 부분에 대한 코딩을 구현하는 것이 핵심인 문제다.

진법변환된 숫자를 사람 수에 맞게 잘라서 yield 하는 제너레이터를 구현하고, 제너레이터를 `for` 구문으로 순회하면서 yield 결과의 필요한 부분만 추출하여 묶은 다음 최종리턴하는 방식으로 문젤를 해결했다.

## 풀이

```python
import numpy as np

def solution(n, t, m, p):
    # 1. n 진수 변환된 숫자를 사람수 m 에 맞춰 계속 yield 하는 함수
    def gen(n, m):
        a, i = '', 0
        while 1:
            if len(a) < m:
                a += np.base_repr(i, n)
                i += 1
            else:
                yield a[:m]
                a = a[m:]
    
    # 2. t 번 반복, yield 된 문자열에서 p-1 인덱스만 따로 모아 리턴
    a = ''
    for x, _ in zip(gen(n, m), range(t)):
        a += x[p-1]
    return a
```

`# 1` 코드를 보면 진법변환을 위해 `numpy` 모듈의 `base_repr` 함수를 사용했다. 숫자의 진법변환과 관련해서는 [다른 포스팅](https://tedblog.github.io/posts/convert-number-system)에 올려두었으니 이 부분을 참고하기 바란다.
