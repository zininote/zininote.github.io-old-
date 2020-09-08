---
layout: post
title: "LV2: 파일명 정렬"
updated: 2020-09-07
cat: programmers
---

## 문제

[프로그래머스, 파일명 정렬](https://programmers.co.kr/learn/courses/30/lessons/17686?language=python3)

파일명에서 정렬에 필요한 정보를 추출해 내고, 이를 바탕으로 실제로 정렬을 하도록 구현하는 것이 핵심인 문제다.

정규식을 사용해서 문제를 해결했다.

## 풀이

```python
import re

def solution(files):
    # 1. files 에서 [{'f': 파일명, 'h': 헤드, 'n': 넘버, 'i': 인덱스}, ... ] 형태의 fs 리스트 생성
    fs = []
    for i, f in enumerate(files):
        h, n = re.match(r'(\D+)(\d{1,5})', f).groups()
        fs.append({'f': f, 'h': h.lower(), 'n': int(n), 'i': i})
    
    # 2. fs 정렬 후, 파일명만 추려 리턴
    fs.sort(key=lambda x: (x['h'], x['n'], x['i']))
    return [x['f'] for x in fs]
```

`# 1` 에서 문제의 요구사항에 맞도록, 헤드 정보는 모두 소문자로 치환, 넘버는 실제 숫자로 변환하여 처리하였다.
