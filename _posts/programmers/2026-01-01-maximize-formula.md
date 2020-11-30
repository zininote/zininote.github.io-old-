---
layout: post
title: "수식 최대화"
updated: 2020-11-30
tags: [programmers, lv2]
---

## 문제

[프로그래머스, 수식 최대화](https://programmers.co.kr/learn/courses/30/lessons/67257?language=python3)

연산자 우선순위별 케이스를 나타내는 순열 생성, 문자열로 표현된 수식구조를 파싱, 해당연산 수행 하는 과정을 거치면 된다.

먼저 문자열 수식을 정규식으로 파싱하여, 각 숫자, 각 연산자별로 구분된 리스트를 생성하였다. 이 리스트에 포함된 연산자만 골라내어 itertools.permutations 함수로 순열을 생성하였다. 이 순열이 생성하는 케이스마다의 연산 결과를 따로 저장하여 절대값이 가장 큰 값을 리턴하도록 풀어보았다.

## 풀이

```python
import re
from itertools import permutations

def solution(expression):
    # expression 파싱, 사용된 연산자 operators 리스트, 연산자별 calculate 딕셔너리 생성
    e = re.split(r'([*+-])', expression)
    operators = [x for x in ['*', '+', '-'] if x in e]
    calculate = {
        '*': lambda x, y: x*y,
        '+': lambda x, y: x+y,
        '-': lambda x, y: x-y,
    }
    
    # 연산자순서 순열 케이스별 루프
    a = []
    for op_order_case in permutations(operators):
        e_copy = e[:]
        
        # 연산자별 루프
        for op in op_order_case:
            while op in e_copy:
                i = e_copy.index(op)
                c = calculate[op](int(e_copy[i-1]), int(e_copy[i+1]))
                e_copy = e_copy[:i-1] + [c] + e_copy[i+2:]
        
        # 연산 결과 a 삽입
        a.extend(e_copy)
    
    # 절대값 가장 큰 값 리턴
    return max(abs(x) for x in a)
```
{:.python}

re.split 함수 안에, 구분자로 사용할 정규식을 괄호로 감싸서 넣으면, 구분자도 포함하여 리스트를 생성해준다.

매 우선순위 케이스마다, `e` 를 직접 계산하여 변형시키기 때문에, `e_copy` 라는 카피본을 사용하도록 했다.