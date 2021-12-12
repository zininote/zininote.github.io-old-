---
layout: post
title: "순열과 조합 케이스를 생성하는 제너레이터"
updated: 2021-12-11
tags: [coding,math]
---

## 순열을 구하는 코드

[TBD]

## 조합을 구하는 코드

보통 백트래킹 알고리즘을 사용하여 구한다. 아래는 재귀함수로 이를 구현한 제너레이터다.

[TBD]

안쪽에 있는 fn 제너레이터가 재귀방식으로 케이스를 생성해낸다.

아래는 Stack 자료구조를 사용하여 재귀가 아닌 반복문으로 백트래킹을 구현한 코드다.

```python
def gen_combis(A, r):
    S = [[]]
    
    while S:
        V = S.pop()
        if len(V) == r: yield [A[x] for x in V]
        else:
            for i in range(len(A)-1, (V[-1] if V else -1), -1):
                S += [*V, i],
```
{:.python}

재귀호출 방식과 동일한 결과가 나오도록, for 반복문 순서를 재귀호출 방식과는 반대로 했다.
