---
layout: post
title: "주어진 문자들로 문자열을 사전순 순서대로 생성하는 제너레이터"
updated: 2021-12-16
tags: [coding,math]
---

## 사전 순서 코드 구현

흔히 사전에서 사용하는 순서 (Lexical Order) 를 의미한다.

```python
def lexicalstrings(s, *, maxlen=0):
    yield ''
    if maxlen == 0: return
    for a in s:
        for b in lexicalstrings(s, maxlen=maxlen-1):
            yield a+b
```
{:.python}

s 는 문자열 조합이다. 최대 몇글자까지 조합하는지를 maxlen 으로 넘기면 사전순서대로 주어진 문자들을 조합하여 생성한다.

아래는 실제 사용 예시다.

```python
for x in lexicalstrings('ABC', maxlen=2):
    print(x)

# 출력 결과
#
# A
# AA
# AB
# AC
# B
# BA
# BB
# BC
# C
# CA
# CB
# CC
```
{:.python}