---
layout: post
title: "시저 암호"
updated: 2020-11-19
tags: [programmers,lv1]
---

## 문제

[프로그래머스, 시저 암호](https://programmers.co.kr/learn/courses/30/lessons/12926?language=python3)

고대 로마에서 시저(카이사르)가 많이 사용했다고 하는 암호다. [나무위키](https://namu.wiki/w/%EC%95%94%ED%98%B8#s-2.1.2)를 참고해보자.

알파벳 문자를, `n` 만큼 로테이션을 하듯 밀어내기를 하면 된다. 정규식을 사용하여, 알파벳일 경우 밀어내기를 하여, 해당 문자를 교체하는 식으로 풀어보았다.

## 풀이

```py
import re

def solution(s, n):
    # 정규식으로 알파벳 n 만큼 밀어서 암호문 완성
    def conv(m):
        o = ord('a') if m[0].islower() else ord('A')
        return chr((ord(m[0])-o+n)%26 + o)
    return re.sub(r'[a-zA-Z]', conv, s)
```
{:.python}

re.sub 함수를 사용하였다. 정규식에 매치되는 문자열을 찾아서 다른 문자열로 바꿔주는데, 함수를 인수로 넣을 수 있다.

실제로 시저 암호 처리를 하는 부분은 conv 함수다. re.sub 으로부터 매칭의 결과 `m` 이 넘겨지면, 대/소문자에 맞춰 `n` 만큼 밀어내기 처리를 하고 리턴한다.
