---
layout: post-programmers
title: "LV2: 124 나라의 숫자"
updated: 2020-09-17
cat: programmers
---

## 문제

[프로그래머스, 124 나라의 숫자](https://programmers.co.kr/learn/courses/30/lessons/12899?language=python3)

10 진수를 124 나라의 숫자 체계로 변형하는 코드를 구현하는 것이 핵심인 문제다.

처음에는 상당히 헷갈려서 124 를 abc 로 바꿔서 생각했었다. [별도 포스팅](https://zininote.github.io/posts/convert-number-system)에 진법 체계 변환 코드에 대해 다룬 적이 있는데, 이 포스팅의 코드를 응용하여 해결하였다.

## 풀이

```python
def solution(n):
    # 1
    def to_124(n, d='124'):
        return d[(n-1)%3] if n-1 < 3 else to_124((n-1)//3, d) + d[(n-1)%3]
    
    # 2
    return to_124(n)
```

`# 1` 코드는 숫자 체계를 바꿔주는 `to_124` 함수다. 재귀함수로 구현하였고, 10 진수 `n` 을 넣으면 124 체계로 바꿔서 리턴한다. 위 링크에서 소개한 진법 변환 함수를 124 체계에 맞게 변경하였다.
