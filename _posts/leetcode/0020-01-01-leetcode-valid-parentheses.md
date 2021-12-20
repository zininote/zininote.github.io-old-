---
layout: post
title: "20. Valid Parentheses"
updated: 2021-12-20
tags: [leetcode,string,stack]
---

## 문제

[https://leetcode.com/problems/valid-parentheses/](https://leetcode.com/problems/valid-parentheses/)

소/중/대 괄호만으로 이뤄진 s 문자열이 있을 때, 여는괄호 닫힌괄호가 올바르게 쌍을 이뤄 표현되어있는지 여부를 리턴하는 문제다.

## Regular Expression

```python
import re

def isValid(self, s: str) -> bool:
    p = ''
    while s != p:
        p = s
        s = re.sub(r'\(\)|\{\}|\[\]', '', s)
  
    return False if s else True
```
{:.python}

정규식으로 s 에서 열린/닫힌 괄호 쌍을 계속 지워나간다. 더 이상 지워지지않을 때, 빈 문자열이라면 True 가 된다.

시간은 144 ms 였다.

## Stack

```python
def isValid(self, s: str) -> bool:
    stack = []
    d = {')': '(', '}': '{', ']': '['}

    for x in s:
        if x in d:
            if not(stack and stack.pop() == d[x]): return False
        else:
            stack += [x]

    return False if stack else True
```
{:.python}

stack 을 상정하고, 여는 괄호일때는 stack 을 채우고, 닫힌 괄호일때는 stack 의 가장 후미와 비교하여 올바른 괄호 쌍일 때 지워나간다. 올바르지않은 괄호쌍이라면 즉시 False 를 리턴한다.

s 문자열 루프가 종료됐을 때, stack 이 비어있다면 True 를 리턴한다.

시간은 32 ms 였다.
