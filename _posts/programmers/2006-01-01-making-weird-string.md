---
layout: post-programmers
title: "LV1: 이상한 문자 만들기"
updated: 2020-09-06
cat: programmers
---

## 문제

[프로그래머스, 이상한 문자 만들기](https://programmers.co.kr/learn/courses/30/lessons/12930?language=python3)

대/소문자 변환 규칙을 코드로 구현하는 것이 관건인 문제다.

정규식으로 문자만을 매칭하여 변환하는 방식으로 문제를 해결했다.

## 풀이

```python
import re

def solution(s):
    # 1. re.sub 매칭 처리함수, 인덱스가 짝수라면 대문자, 홀수라면 소문자 처리 후 리턴
    def fn(match):
        a = [*match.group(0)]
        for i in range(len(a)):
            a[i] = a[i].lower() if i%2 else a[i].upper()
        return ''.join(a)
    
    # 2. 정규식으로 단어 매칭, fn 함수로 전달, 치환하여 리턴
    return re.sub(r'\w+', fn, s)
```

`re.sub` 함수는 정규식으로 패턴을 매칭, 매칭결과를 다른 문자열로 바꿔주는 함수다. 매칭결과를 함수로 넘겨서 함수 안에서 처리토록 할 수도 있다.

`# 1` 에서는, 매칭 결과를 리스트로 바꾼 뒤, 짝/홀 인덱스에 따라 대/소문자로 변환하여, 다시 문자열로 리턴하고 있다.
