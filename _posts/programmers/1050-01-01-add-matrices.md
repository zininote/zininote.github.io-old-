---
layout: post
title: "행렬의 덧셈"
updated: 2020-11-14
tags: [programmers,lv1]
---

## 문제

[프로그래머스, 행렬의 덧셈](https://programmers.co.kr/learn/courses/30/lessons/12950)

두 배열의 같은 위치에 있는 숫자들을 더하면 된다. 이중 루프를 사용하면 그리 어려운 문제는 아니나, 한줄로 표현해보는 연습을 해보고 싶어서 이래저래 궁리를 많이 하였다.

Javascript 로는 `map` 함수를, Python 으로는 리스트 comprehension 을 사용하여 풀었다. 본래 이중 루프를 사용해야 했으므로 `map` 함수도 두번, comprehension 표현식도 두번 사용하였다.

## 풀이

```js
function solution(arr1, arr2) {
    // 두 배열의 동일 위치 요소 합산, 결과 리턴    
    return [...Array(arr1.length)].map((_, i) => [...Array(arr1[0].length)].map((_, j) => arr1[i][j]+arr2[i][j]));
}
```
{:.javascript}

```py
def solution(arr1, arr2):
    # 두 리스트의 동일 위치 요소 합산, 결과 리턴    
    return [[arr1[i][j]+arr2[i][j] for j in range(len(arr1[0]))] for i in range(len(arr1))]
```
{:.python}

다른풀이를 보면, 한줄로 표현한 풀이들이 높은 관심을 받고 있다. 다양한 한줄풀이들이 존재하는데 한번쯤은 살펴볼 필요도 있을 것 같다.

예를들면, Javascript 풀이에는 위코드 처럼 새로운 배열로 출발하지 않고, 이미 주어진 `arr1` 에 `map` 함수를 사용하는 것에서 출발하는 방식도 있으며, Python 풀이에는 `zip` 함수를 이용하는 방법도 있었다.

## 참고

Python 은 최근 데이터분석이나, 선형대수와 같은 수리/통계학에도 많이 사용되는 언어라, 행렬의 덧셈은 더욱 간단히 구할 수 있는 방법이 있다. 바로 [NumPy](https://numpy.org/) 모듈의 [ndArray](https://numpy.org/doc/stable/reference/generated/numpy.ndarray.html) 자료형을 사용하면 된다.

아래는 이를 사용하여 풀어본 코드다.

```py
import numpy as np

def solution(arr1, arr2):
    # ndArray 자료형 변환, 덧셈 후 리턴
    return (np.array(arr1) + np.array(arr2)).tolist()
```
{:.python}

리스트에 덧셈을 더하면, 두 리스트를 연결하나, NumPy.ndArray 자료형은 동일 위치의 요소끼리 더해준다. 원코드보다 더욱 직관적으로 이해가 된다.
