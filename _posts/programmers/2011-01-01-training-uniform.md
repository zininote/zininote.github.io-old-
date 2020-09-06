---
layout: post
title: "LV1: 체육복"
updated: 2020-09-07
cat: programmers
---

## 문제

[프로그래머스, 체육복](https://programmers.co.kr/learn/courses/30/lessons/42862?language=python3)

체육복 분실을 한 학생들이 여벌이 있는 학생들로부터 체육복을 빌리는 과정을 코딩으로 구현하는 것이 핵심인 문제다.

우선 도난을 당한 자신이 여벌 체육복이 있는 경우를 먼저 해결하고, 이후에 다른 학생으로부터 빌리는 경우를 해결하는 방식으로 문제를 풀 수 있었다.

## 풀이

```python
def solution(n, lost, reserve):
    # 1. lost 이면서 reserve 인 학생 모두 제거
    for e in lost[:]:
        if e in reserve:
            reserve.remove(e)
            lost.remove(e)
    
    # 2. lost 반복, 체육복 빌릴 수 있으면 reserve, lost 리스트에서 제거
    for e in lost[:]:
        if e-1 in reserve:
            reserve.remove(e-1)
            lost.remove(e)
        elif e+1 in reserve:
            reserve.remove(e+1)
            lost.remove(e)
            
    # 3. n 에서 lost 길이 차감 후 리턴
    return n - len(lost)
```

`# 1`, `# 2` 코드 모두 `lost` 를 순회하는 도중에 `lost` 리스트 내용이 변경이 되므로 반복문이 의도치않게 오작동하지 않도록 `lost` 의 복사본을 순회하고 반복문 내부에서 원본을 조작하였다.
