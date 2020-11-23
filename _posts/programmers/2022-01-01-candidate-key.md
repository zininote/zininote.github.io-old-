---
layout: post
title: "후보키"
updated: 2020-11-24
tags: [programmers,lv2]
---

## 문제

[프로그래머스, 후보키](https://programmers.co.kr/learn/courses/30/lessons/42890?language=python3)

상당히 생각해야할 것들이 많은 문제였다. `relation` 이차원리스트에서 가능한 열조합을 모두 추출하는 방법이 필요하고, 이 열조합이 최소성과 유일성을 만족시키는지 판단하는 방법도 필요하다.

열조합 추출에는 itertools 모듈의 combinations 함수를 사용했다. 참고로 [별도 포스팅](https://zininote.github.io/post/permutation-and-combination)에 조합을 구하는 함수 코드를 소개하였으니 관심있으신 분들은 참고해보기 바란다.

그리고 후보키들을 담을 set 자료형을 상정한 다음, 어떤 열조합이 set 자료형 안에 있는 어떤 후보키를 부분집합으로 가지고 있으면 최소성 원칙을 위반하는 것으로 봤다.

마지막으로, 어떤 열조합 case 가 가리키는 열들의 값들을 연결할 땐, 편의를 위해 numpy 모듈의 ndArray 자료형을 사용하였다. 그리고 중복값이 있는지 여부는, set 자료형으로 바꿨을 때의 요소 개수와 원래 리스트의 요소 개수를 비교하여 같지 않으면 유일성 원칙을 위반하는 것으로 봤다. set 자료형은 중복값을 허용하지 않는 특징을 활용한 방법이다.

이와 관련하여 [별도 포스팅](https://zininote.github.io/post/let-array-have-unique-elements-while-preserving-order)에 기존 순서를 유지하면서 고유한 요소만 추려내는 방법에 대해 소개하였으니 관심있는 분들은 참고해보기 바란다.

## 풀이

```python
import numpy as np
from itertools import combinations

# 조합 yield 제너레이터
def gen(n):
    for i in range(1, n+1):
        for x in combinations(range(n), i):
            yield x

# 최소성 검사
def is_least(keys, x):
    for key in keys:
        if set(key) <= set(x): return False
    return True

# 유일성 검사
def is_unique(lst):
    return len(set(lst)) == len(lst)
            
def solution(relation):
    # 변수 초기화
    r = np.array(relation, dtype='object')
    keys = set()
    
    # 후보키 찾기
    for x in gen(r.shape[1]):
        if is_least(keys, x):
            lst = np.sum(r[:, x], axis=1)
            if is_unique(lst): keys.add(x)
    
    # 후보키 개수 리턴
    return len(keys)
```
{:.python}

열번호 모든 case 조합을 yield 하기 위한 gen 제너레이터를 생성하였다. 이 안에 combinations 함수를 사용하고 있다.

최소성과 유일성 검사도 별도의 함수를 사용하였으며, 위에서 언급한 방식대로 판단하고 있다.

solution 함수에서는, 먼저 `relation` 리스트를 ndArray 자료형을 변환하였다. 후보키를 찾는 루틴에서 볼 수 있듯 np.sum 함수로 쉽게 열방향 요소끼리 결합이 가능하기 때문이다.

## 참고

다른 풀이를 보니, 조합 대신 비트연산자를 활용한 상당히 기발한 풀이법이 있었다.

예를들어 열이 3 개일 경우, `1 << 3` 와 같은 수식을 사용하면 이는 8 이 되는데, 이진법으로 나타내면 `1000` 이다. 1 부터 7 까지를 이진법으로 보면 `001`, `010`, `011`, `100`, `101`, `110`, `111` 이 되는데, `1` 로 표시된 열만 조합하는 식으로 대하면, 조합처럼 사용할 수 있다.

```python
import numpy as np

# 조합 yield 제너레이터 (삭제)

# 최소성 검사
def is_least(keys, x):
    for key in keys:
        if key|x == x: return False
    return True

# 유일성 검사
def is_unique(lst):
    return len(set(lst)) == len(lst)
            
def solution(relation):
    # 변수 초기화
    r = np.array(relation, dtype='object')
    keys = set()
    
    # 후보키 찾기
    for x in sorted(range(1, 1 << r.shape[1]), key=lambda x: bin(x).count('1')):
        if is_least(keys, x):
            lst = np.sum(r[:, tuple(y for y in range(r.shape[1]) if x>>y&1)], axis=1)
            if is_unique(lst): keys.add(x)
    
    # 후보키 개수 리턴
    return len(keys)
```
{:.python}

원코드와 비교해보면, 조합을 yield 제너레이터가 없고, 최소성 검사와 후보키 찾기 루틴이 조금씩 달라졌다.

1 부터 `1 << r.shape[1]` 미만까지 반복하는데, sorted 함수를 사용하여, 2 진법으로 바꿨을 때 `1` 의 개수가 적은 것부터 후보키 여부를 조사하도록 했다. `1` 의 개수가 많은 것이 후보키에 먼저 삽입되는 것을 방지하기 위함이다.

최소성 검사는 set 자료형 부분집합 대신, OR 비트연산으로 포함 여부를 조사한다.

np.sum 함수 부분에는 `x>>y&1` 연산으로 `x` 의 자릿수를 없애가면서, 마지막 자릿수가 1 이 되는지를 조사하여 이 경우만을 조합해야할 열로 삼아 튜플로 구성되도록 하였다.
