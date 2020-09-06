---
layout: post-programmers
title: "LV1: 시저 암호"
updated: 2020-09-02
cat: programmers
---

## 문제

[프로그래머스, 시저 암호](https://programmers.co.kr/learn/courses/30/lessons/12926?language=python3)

문제에서 주어진 대로 알파벳을 밀어내는 처리를 구현하는 것이 핵심이다.

정규식을 사용, 알파벳 글자만 골라 바꾸는 방식을 사용했다.

## 풀이

```py
import re

def solution(s, n):
    # 1. re.sub 매칭 처리함수, 대/소문자별로 밀어내기 처리
    def fn(match):
        c = match.group(0)
        o = ord('a') if c.islower() else ord('A')
        return chr((ord(c)-o+n)%26 + o)
    
    # 2. 정규식으로 알파벳 매칭, fn 함수로 전달, 밀어내기 치환 후 리턴
    return re.sub(r'[a-zA-Z]', fn, s)
```

`# 1` 함수 내부를 보면, 대/소문자 여부에 따라 원점을 `o` 변수로 기억한 뒤, 상대적 거리를 계산하는 식으로 "밀어내기" 처리를 하고 있다.
