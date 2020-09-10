---
layout: post-programmers
title: "LV2: 수식 최대화"
updated: 2020-09-10
cat: programmers
---

## 문제

[프로그래머스, 수식 최대화](https://programmers.co.kr/learn/courses/30/lessons/67257?language=python3)

연산자 우선순위 별로 결과를 계산할 반복문, 문자열을 해석하여 실제 계산을 수행하는 코드를 구현하는 것이 핵심인 문제였다.

문자열 안에 어떤 연산자가 사용되었는지를 보고, 사용된 연산자들 우선순위로 순열을 만들어서 반복문을 생성하고, 정규식으로 문자열을 숫자와 연산자로 구분, 연산자별로 계산을 수행하는 식으로 코드를 구현해보았다.

## 풀이

```py
from itertools import permutations
import re

def solution(expression):
    # 1. expression 에 있는 연산자 추출, expression 파싱, 연산자별 계산식 구현한 calc 생성
    operators = [x for x in ['+', '-', '*'] if x in expression]
    expression = re.split(r'([\+\-\*])', expression)
    calc = {
        '+': lambda x, y: int(x)+int(y),
        '-': lambda x, y: int(x)-int(y),
        '*': lambda x, y: int(x)*int(y),
    }
    
    # 2. 연산자 우선순위 경우의 수 반복, 경우의 수 계산 결과 담을 a 리스트 생성
    a = []
    for ops in permutations(operators):
        
        # 2-1. 계산 수행, 계산 위해 expression 의 복사본 ex 사용, 계산결과의 절대값 a 삽입
        ex = expression[:]
        for op in ops:
            while op in ex:
                i = ex.index(op)
                val = calc[op](ex[i-1], ex[i+1])
                ex = ex[:i-1] + [val] + ex[i+2:]
        a.extend(ex)
        
    # 3. a 중에서 절대값이 가장 큰 수의 절대값을 리턴
    return max(abs(x) for x in a)
```

`# 1` 코드에서 `re.split` 함수를 위와 같이 사용하면, 숫자와 연산자를 분리하여 리스트로 반환해준다. 나중에 이 리스트에서 연산자를 찾아 그 앞과 뒤에 있는 숫자들을 연산할 것인데, 뒷 코드에서 연산자에 따라 `calc` 딕셔너리에 있는 함수식이 적용되도록 하였다.

`# 2` 코드에서 우선 연산자들로 우선순위의 모든 경우의 수를 `itertools.permutations` 함수로 만들어낸다. 이 경우의 수가 가장 외부 루프를 구성하며, 여기서 구해진 계산결과를 `a` 리스트에 담게 된다.

`# 2-1` 코드에서 실제 계산을 수행하는데, `expression` 리스트는 다른 연산자 우선순위에서 재사용되어야하므로 그 복사본인 `ex` 를 가지고 계산을 수행한다. 연산자별로 해당 연산자의 위치를 `index` 함수로 찾은다음, `calc` 딕셔너리에 따라 앞/뒤 숫자를 가지고 계산, 계산결과를 다시 `ex` 에 붙여넣는 작업을 반복한다. 그리고 더이상 연산자가 없을 경우, `ex` 안에는 숫자 하나만 남게되는데, 이를 `a` 에 삽입한다.
