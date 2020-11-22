---
layout: post
title: "방금그곡"
updated: 2020-11-22
tags: [programmers,lv2]
---

## 문제

[프로그래머스, 방금그곡](https://programmers.co.kr/learn/courses/30/lessons/17683?language=python3)

주어지는 'musicinfos' 파일을 파싱하여, 필요한 정보를 추출한 뒤, 요구하는대로 리턴을 하면 된다.

까다로운 부분이 있는데, # 이 붙어있는 코드는 두글자라 플레이시간을 계산할 때 어려워질 수가 있다. 아예 # 이 붙어있는 코드를, 정규식을 사용하여, 소문자 한글자로 치환하였다.

나머지는 플레이시간을 계산, 플레이시간동안 연주된 곡 추출, 주어지는 `m` 이 연주된 곡의 일부분인지만 검사하면 된다.

## 풀이

```python
import re
from itertools import cycle

# 음악 코드 변환 함수
def conv(code):
    return re.sub(r'[CDFGA]#', lambda x: x[0][0].lower(), code)

def solution(m, musicinfos):
    # musicinfos 파싱
    parsed_musicinfos = []
    for s, e, t, c in (x.split(',') for x in musicinfos):
        p = int(e[:2])*60+int(e[3:])-int(s[:2])*60-int(s[3:])
        c = ''.join(x for x, _ in zip(cycle(conv(c)), range(p)))
        parsed_musicinfos.append({'t': t, 'p': p, 'c': c})
        
    # 들은 연주곡 찾아서, 플레이 시간 제일 긴 곡 타이틀 리턴
    a = sorted((x for x in parsed_musicinfos if conv(m) in x['c']), key=lambda x: -x['p'])
    return a[0]['t'] if a else '(None)'
```
{:.python}

conv 함수를 먼저 정의하였다. 음악코드를 인수로 받아서, # 이 포함된 코드를 re.sub 함수를 사용하여, 소문자 글자 하나로 치환한 뒤 리턴한다.

solution 함수에서는 먼저 musicinfos 리스트를 파싱한다. 플레이시간 `p` 를 먼저 계산하고, 음악코드를 cycle 함수와 zip 함수로 연주된 코드 `c` 를 찾아낸 뒤, 다시 `{'t': 타이틀, 'p': 플레이시간, 'c': 연주된된 코드}` 딕셔너리를 생성하여 리스트 안에 삽입한다.

마지막엔 파싱한 음악정보를 담은 리스트를 comprehension 표현식으로 순회하면서, 들은 코드 `m` 이 연주된 코드 `c` 안에 포함된 노래만 골라, 정렬을 하고, 리턴을 한다.

사실 가장 플레이시간이 긴 곡을 찾는데는 max 함수를 쓰는게 더 일반적일 것이나, 비어있는 리스트를 max 함수로 전달하면 에러가 발생하므로, sort 함수를 사용하였다.
