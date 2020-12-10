---
layout: post
title: "쿼드압축 후 개수 세기"
updated: 2020-12-10
tags: [programmers,lv2]
---

## 문제

[프로그래머스, 쿼드압축 후 개수 세기](https://programmers.co.kr/learn/courses/30/lessons/68936?language=python3)

주어진 보드를 4분할 하는데, 분할된 새끼보드 안의 숫자가 모두 1 또는 0 이 될 때까지 계속 분할해간다. 왠지 재귀함수를 써야할 것처럼 느껴졌다.

NumPy 모듈의 ndArray 자료형을 사용하면, 해당 자료형끼리의 덧셈은 같은 위치에 있는 데이터요소간의 덧셈을 하여 반환한다. 코딩이 보다 간편해질 것 같아 이를 사용하여 문제를 풀어보았다.

## 풀이

```python
import numpy as np

def solution(arr):
    # 재귀함수로 쿼드압축 진행
    def fn(arr):
        if np.all(arr==arr[0,0]):
            if arr[0,0]==0: return np.array([1,0])
            else: return np.array([0,1])
        n = arr.shape[0]//2
        return fn(arr[:n,:n])+fn(arr[n:,:n])+fn(arr[:n,n:])+fn(arr[n:,n:])
    
    # 결과 리턴
    return fn(np.array(arr)).tolist()
```
{:.python}

재귀함수 자기를 다시 호출하기 때문에, 함수 내부에 종료 조건이 반드시 있어야 무한 호출을 하지 않는다. 여기서는 인수로 넘겨받은 보드의 데이터요소가 모두 1 또는 0 일 때이다.

종료조건이 아니라면 4분할을 하여 다시 재귀호출을 하는 식으로 구현하였다.