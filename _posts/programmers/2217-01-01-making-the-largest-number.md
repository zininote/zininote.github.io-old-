---
layout: post-programmers
title: "LV2: 큰 수 만들기"
updated: 2020-09-15
cat: programmers
---

## 문제

[프로그래머스, 큰 수 만들기](https://programmers.co.kr/learn/courses/30/lessons/42883?language=python3)

큰 수를 만들 수 있는 로직을 찾아내는 것이 핵심인 문제다.

상당히 까다로운 문제로, 아래와 같은 방식으로 해결할 수 있다.

- 별도의 빈 리스트 `a` 생성
- 숫자의 제일 앞부터 `a` 리스트에 하나씩 채워넣음
- 단, 채울 때 채우려는 숫자보다 더 작은숫자가 있다면 작은숫자들을 `k` 번까지 계속 지워나감
- `k` 가 0 이 되거나 `a` 에 더 채워넣을 숫자가 없다면 종료
- 종료 시점에 `k` 가 0 초과라면 그만큼 더 잘라서 리턴

## 풀이

```py
from collections import deque

def solution(number, k):
    # 1
    n = deque([*number])
    a = []
    
    # 2
    while k and n:
        tmp = n.popleft()
        while k and a:
            if a[-1] < tmp:
                a.pop()
                k -= 1
            else:
                break
        a.append(tmp)
    
    # 3
    if k:
        return ''.join(a[:-k])
    else:
        return ''.join(a+list(n))
```

`# 1` 코드를 보면 주어지는 `number` 를 `collections` 모듈의 `deque` 자료형으로 변환하였다. 처음에는 리스트를 사용하였으나, 테스트 중 하나를 시간초과로 통과할 수 없어서 `deque` 를 사용하였다. 구글링을 해보면 일반 리스트보다 앞부분에서의 pop (리스트라면 `pop(0)` `deque` 라면 `popleft()`) 이 훨씬 빠르다고 한다. 그리고 `a` 리스트는 위에서 언급한 빈 리스트다.

`# 2` 에서는 `n` 에서 제일 앞부분 요소를 pop 한 뒤, `a` 리스트의 마지막과 계속 비교하여 `k` 가 허용하는 한도까지 자신보다 작은 숫자를 지워나가는 로직으로 되어있다.

`# 3` 에서 최종리턴 하기 전에 `k` 가 남아있다면 남은 만큼을 더 잘라내서 리턴한다. 그렇지 않다면 `a` 와 `n` 을 합쳐서 리턴한다.
