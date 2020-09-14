---
layout: post-programmers
title: "LV2: 타켓 넘버"
updated: 2020-09-14
cat: programmers
---

## 문제:

[프로그래머스, 타겟 넘버](https://programmers.co.kr/learn/courses/30/lessons/43165?language=python3)

연산자를 대입할 수 있는 모든 경우의 수를 어떻게 탐색할 것인가를 해결하면 되는 문제이다.

모든 경우의 수를 탐색하는 방법으로, 전에 [후보키](https://zininote.github.io/posts/candidate-key) 문제를 풀면서 접했던 비트연산 방식을 이 문제에 적용해서 해결해보기로 했다. 주어지는 숫자 개수에 맞춰 비트 자릿수를 확보한 다음, 0 인 경우는 (-)로 1 인 경우는 (+)로 보아서 모든 경우의 수를 탐색한다.

## 풀이

```python
def solution(numbers, target):
    # 1
    cases = 1 << len(numbers)
    
    # 2
    a = 0
    for i in range(cases):
        if target == sum(numbers[j] * (1 if i >> j & 1 else -1) for j in range(len(numbers))):
            a += 1
    
    # 3
    return a
```

`# 1` 코드에선 `numbers` 개수만큼 비트 자릿수를 확보한다. 만일 `numbers` 개수가 4 라면 `1 << 4` 연산의 결과는 16 이 되는데, 이는 이진수로 10000 이다. 제일 왼쪽의 1 을 제외하면 4 개의 자릿수가 확보되는 셈이다.

`# 2` 에선 경우의 수인 `cases` 를 반복하는데, 만일 `numbers` 개수가 4 라면 1 부터 15 까지 반복한다. 이진수로 0001, 0010, 0011, 0100, ... , 1110, 1111 이 되므로 모든 경우의 수를 탐색할 수 있게 된다. 다음으로는 비트 자릿수에 따라 연산을 적용한 리스트를 생성하고, 그 합계가 `target` 과 일치하는지를 따져 `a` 를 증가시킨다.

## 수정

다른풀이를 보다보니 다르게 해결한 풀이도 볼 수 있었다. 이 중 두가지를 가져와봤다. itertools 모듈의 `product` 제너레이터를 사용한 방식과, 재귀호출을 사용한 방식이다.

아래는 `product` 제너레이터를 사용하여 원코드와 비슷하게 꾸며본 코드다.

```python
from itertools import product

def solution(numbers, target):
    n = [[1, -1]]*len(numbers)
    
    a = 0
    for i in product(*n):
        if target == sum(numbers[j]*i[j] for j in range(len(numbers))):
            a += 1
    
    return a
```

`product` 제너레이터는 인수로 넘겨받은 iterable 개체들을 돌면서 각 iterable 개체 안의 요소들을 하나씩 꺼내서 조합한 것을 yield 하는 제너레이터다. `[1, -1]` 리스트를 `numbers` 개수에 맞게 `product` 제너레이터에 넣으면 모든 연산 경우의 수를 순회할 수 있다.

아래는 재귀호출을 사용한 방식이다.

```python
def solution(numbers, target):
        
    def fn(acc=0, d=0):
        if d == len(numbers):
            return 1 if acc == target else 0
            
        return fn(acc+numbers[d], d+1) + fn(acc-numbers[d], d+1)
    
    return fn()
```

문제를 트리구조와 같이 본다면, 마치 재귀호출을 사용한 DFS 탐색을 사용하는 것처럼 구현할 수 있다. 예를들어 주어진 숫자가 [1, 3, 2, 4] 이고 `target` 이 4 일 때 아래 그림처럼 이해할 수 있다.

![그림00](https://zininote.github.io/img/programmers/programmers-2214-01-01-00.svg)
{:.center}

위 그림과 같은 구조를 재귀호출 탐색 방식으로 옮긴 것이 위 코드다.
