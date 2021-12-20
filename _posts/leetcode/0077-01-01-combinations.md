---
layout: post
title: "77. Combinations"
updated: 2021-12-20
tags: [leetcode,math,backtracking]
---

## 문제

[https://leetcode.com/problems/combinations/](https://leetcode.com/problems/combinations/)

1 ~ n 개의 숫자집단에서 k 개를 골라 만들 수 있는 모든 조합 (Combinations) 케이스를 리턴하는 문제다.

## Backtracking Recursive

```python
def combine(self, n: int, k: int) -> List[List[int]]:
    return [x for x in combinations(range(1, n+1), k)]
    
def combinations(A, r, *, P=None):
    if P is None: P = []
        
    if len(P) == r:
        yield [A[x] for x in P]
    else:
        for i in range(P[-1]+1 if P else 0, len(A)):
            yield from combinations(A, r, P=P+[i])
```
{:.python}

재귀호출 방식의 제너레이터로 구현하였다.

시간은 708 ms 였다.

## Backtracking Iterative

```python
def combine(self, n: int, k: int) -> List[List[int]]:
    return [x for x in combinations(range(1, n+1), k)]
    
def combinations(A, r):
    S = [[]]
    
    while S:
        P = S.pop()
        if len(P) == r:
            yield [A[x] for x in P]
        else:
            for i in range(len(A)-1, P[-1] if P else -1, -1):
                S += [P+[i]]
```
{:.python}

재귀호출 대신 Stack 을 나타내는 S 리스트를 사용하였다. 동일한 결과를 내기 위해서는 for 반복문의 흐름이 재귀호출과 반대 (내림차순) 여야 한다.

시간은 596 ms 였다.

## Iterative

```python
def combine(self, n: int, k: int) -> List[List[int]]:
    return [x for x in combinations(range(1, n+1), k)]
    
def combinations(A, r):
    P = [0]*r
    
    i = 0
    while 0 <= i:
        
        if P[i] == len(A):
            i -= 1
        elif i == r-1:
            yield [A[x] for x in P]
        else:
            i += 1
            P[i] = P[i-1]
            
        P[i] += 1
```
{:.python}

처음부터 P 배열을 만들어놓고, 인덱스를 가리키는 i 를 이리저리 옮기면서 조합 케이스를 만들어가는 형태다. 위 두 방식에비해 메모리가 매우 절약된다.

시간은 508 ms 였다.