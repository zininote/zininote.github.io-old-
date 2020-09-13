---
layout: post-programmers
title: "LV2: 다음 큰 숫자"
updated: 2020-09-13
cat: programmers
---

## 문제

[프로그래머스, 다음 큰 숫자](https://programmers.co.kr/learn/courses/30/lessons/12911?language=python3)

숫자를 이진수로 바꿔서, 숫자들 간에 포함된 1 의 개수를 비교하는 코드를 구현하는 것이 핵심인 문제다.

## 풀이

```py
def solution(n):
    # 1
    i = n
    while 1:
        i += 1
        if bin(i).count('1') == bin(n).count('1'):
            return i
```

`# 1` 부분을 보면 반복문으로 `i` 를 계속 증가시켜나가며, `n` 과 `i` 를 비교한다. `bin` 함수를 사용, 2 진법 변환을 하여 1 의 개수가 같을 때 그 수를 리턴하는 구조다.
