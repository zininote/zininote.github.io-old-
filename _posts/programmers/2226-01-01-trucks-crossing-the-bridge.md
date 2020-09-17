---
layout: post-programmers
title: "LV2: 다리를 지나는 트럭"
updated: 2020-09-17
cat: programmers
---

## 문제

[프로그래머스, 다리를 지나는 트럭](https://programmers.co.kr/learn/courses/30/lessons/42583?language=python3)

우선 다리 위를 지나는 트럭들을 나타내기 위해 어떠한 자료구조를 상정할 것인가, 다음으로 모두 건너는 데 얼마나 걸리는지를 어떤 코드로 구할 수 있을까를 찾아내는 것이 핵심인 문제다.

문제를 읽자마자 제일 먼저 `collections` 모듈의 `deque` 자료형이 생각났다. maxlen 인자를 넣어서 생성하면, 트럭들이 지나는 다리를 표현하기에 가장 간편할 것 같았다.

## 풀이

```python
from collections import deque

def solution(bridge_length, weight, truck_weights):
    # 1
    b = deque([0]*bridge_length, maxlen=bridge_length)
    t = truck_weights
    
    # 2
    a, s = 0, 0
    while t:
        a += 1
        if (s := s - b[0] + t[0]) > weight:
            b.append(0)
            s -= t[0]
        else:
            b.append(t.pop(0))
            
    # 3
    return a + len(b)
```

`# 1` 에서 다리를 나타내는 `b` deque 자료형을 생성한다. 다리 길이만큼 maxlen 인자를 주었다.

`# 2` 코드는 실제 트럭이 움직이는 시뮬레이션을 한다. `a` 는 시간이고, `s` 는 현재 다리 위의 무게 합을 나타내는 변수다. 매 턴마다 다음 트럭을 다리에 올릴 수 있는지 여부를 검사한다. python 3.8 에서 새로 소개된 `:=` 연산자를 사용하였다. `s` 에 값을 할당한 다음, 비교 구문을 적용할 수 있도록 해준다.

참고로 처음에는 다리 위 무게를 판단할 때 `sum` 함수를 사용했었다. 하지만 이 경우 시간초과로 문제를 통과할 수 없는 케이스가 나온다. 따라서 별도 `s` 변수를 상정하여 계산하는 식으로 해결했다.

`# 3` 에서는 `a` 에 다리 길이를 더하여 리턴한다. `a` 는 마지막 트럭이 다리에 올라섰을 때까지만의 시간을 의미하므로, 여기에 마지막 트럭이 다리를 통과해야 하는 시간인 `len(b)` 를 더해야 한다.
