---
layout: post
title: "타겟 넘버"
updated: 2020-12-20
tags: [programmers,lv2]
---

## 문제

[프로그래머스, 타겟 넘버](https://programmers.co.kr/learn/courses/30/lessons/43165?language=python3)

여러가지 방식으로 풀 수 있는 문제였다. 크게 세가지 방식으로 풀어보았는데, 아래와 같다.

- [1, -1] 리스트를 itertools 모듈의 product 함수에 적용하여, 모든 case 를 산출하여 풀기
- 이진수를 활용, 이진수의 각 자릿수가 1 일 때 1, 0 일 때 -1 을 적용하여 풀기
- 재귀함수를 사용, -1 일 때와 1 일 때를 각각 재귀호출 하여 풀기

## 풀이

```python
import numpy as np
from itertools import product

def solution(numbers, target):
    # 변수 초기화
    numbers = np.array(numbers)
    count = 0
    
    # 덧셈뺄셈 case 순회, 계산결과 == target 인 경우 count 증가
    for case in product([1,-1],repeat=len(numbers)):
        if np.sum(np.array(case) * numbers) == target: count += 1
    return count
```
{:.python}

itertools 모듈의 product 함수를 사용하였다. product 함수를 위 코드와 같이 적용하면 `[1, -1]` 함수 안의 데이터요소를 `numbers` 길이 만큼 사용한 모든 case 를 생성한다. 이를 순회하면서 `numbers` 와 요소 곱셈을 시행하여 `target` 과 같은지 여부를 검사한다. 개인적으로 numpy 를 학습하고있어 이를 사용해봤다.

```python
def solution(numbers, target):
    # 변수 초기화
    count = 0
    
    # 덧셈뺄셈 case 순회, 계산결과 == target 인 경우 count 증가
    for case in range(1, 1 << len(numbers)):
        if sum(numbers[x]*(1 if case >> x & 1 else -1) for x in range(len(numbers))) == target: count += 1
    return count
```
{:.python}

예를들어 `numbers` 의 길이가 4 라고 해보면 `1 << 4` 의 결과는 16 이 된다. 16 보다 작은 자연수인 1 ~ 15 를 이진수로 나타내면, 0000, 0001, 0010, 0011, ... , 1101, 1110, 1111 이 되는데, 1 인 부분을 +1, 0 인 부분을 -1 이라보고 `numbers` 의 해당 자리와 매칭시킬 수 있다. 이를 활용한 코드다.

```python
def solution(numbers, target):
    # 재귀함수 설정
    def fn(ops=[]):
        if len(ops) == len(numbers): return 1 if sum(x*y for x,y in zip(ops,numbers)) == target else 0
        return fn(ops+[1]) + fn(ops+[-1])
    
    # 재귀함수 결과 리턴
    return fn()
```
{:.python}

재귀함수 fn 을 설정하였다. 재귀함수는 1 또는 -1 을 가지고 모든 case 를 생성해낸다. 일종의 DFS 방식으로 풀이를 한다.
