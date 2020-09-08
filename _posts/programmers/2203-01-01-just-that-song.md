---
layout: post-programmers
title: "LV2: 방금그곡"
updated: 2020-09-08
cat: programmers
---

## 문제

[프로그래머스, 방금그곡](https://programmers.co.kr/learn/courses/30/lessons/17683?language=python3)

주어진 음악정보 문자열을 정보별로 구분한 뒤, 필요한 정보를 계산해내고, 기억하는 멜로디에 맞는 노래제목을 추려내는 과정을 해결해야하는 게 핵심인 문제다.

가장 고민이었던 부분은 두글자로 된 음악코드를 분석하는 부분과, 플레이 시간동안의 재생음악과 기억하는 멜로디를 비교하는 부분이었다. 음악코드는 정규식 문자치환을 통해 # 코드를 소문자로 변환하여 한글자로 만들고, 비교부분은 재생시간 동안 재생된 음악코드를 먼저 만든 다음 기억하는 멜로디가 포함되어있는지 여부를 파악하는 방식으로 해결했다.

## 풀이

```py
import re
from itertools import cycle

def solution(m, musicinfos):
    # 1. 두글자 # 음악코드를 한글자 소문자로 변환하는 conv 함수
    def conv(code):
        def fn(match):
            m = match.group(0)
            return m[0].lower()
        return re.sub(r'[CDFGA]#', fn, code)
    
    # 2. musicinfos 파싱, [{'t': 음악제목, 'p': 재생시간, 'i': 인덱스, 'c': 재생된음악코드}, ... ] 형태로 minfos 할당
    minfos = []
    for i, x in enumerate(musicinfos):
        s, e, t, c = x.split(',')
        p = int(e[:2])*60 + int(e[3:]) - int(s[:2])*60 - int(s[3:])
        c = ''.join(x for x, _ in zip(cycle(conv(c)), range(p)))
        minfos.append({'t': t, 'p': p, 'i': i, 'c': c})
    
    # 3. minfos 에서 기억멜로디 m 을 포함하는 요소만 간추림
    minfos = [x for x in minfos if conv(m) in x['c']]
    
    # 4. 조건대로 음악제목 리턴
    if minfos:
        return max(minfos, key=lambda x: (x['p'], -x['i']))['t']
    else:
        return '(None)'
```

`# 1` 코드는 # 이 붙어있는 두글자 코드를 한글자 소문자로 바꿔주는 함수다. 정규식의 `re.sub` 함수를 사용하여 # 이 붙어있는 글자들을 매칭하여, `fn` 내부함수로 보내 치환한다.

`# 2` 코드는 전체코드의 핵심이 되는 부분이다. 특히 실제 재생된 음악코드를 얻기 위해, 재생시간 `p` 를 먼저 계산하고, `join` 함수 내부 comprehension 표현식 방식으로 재생된 코드 `c` 를 구하였다.
