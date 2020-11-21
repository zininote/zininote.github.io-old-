---
layout: post
title: "파일명 정렬"
updated: 2020-11-22
tags: [programmers,lv2]
---

## 문제

[프로그래머스, 파일명 정렬](https://programmers.co.kr/learn/courses/30/lessons/17686?language=python3)

파일명에서 필요한 정보를 추출한 뒤, 이 정보를 바탕으로 정렬을 하면 되는 문제였다.

정렬에 필요한 정보는 세가지다. 헤드, 넘버, 그리고 원래 순서(즉, 인덱스 오름차순)가 그것인데, 헤드와 넘버 추출을 위해 정규식을 사용하기로 하였다.

## 풀이

```python
import re

def solution(files):
    # files 파싱
    fs = [{'f': file, 'h': h, 'n': n, 'i': i} for file in files for i, (h, n) in enumerate(re.findall(r'(^\D+)(\d{1,5})', file))]
    
    # 정렬 후 리턴
    return [x['f'] for x in sorted(fs, key=lambda x: (x['h'].lower(), int(x['n']), x['i']))]
```
{:.python}

풀다보니 comprehension 표현식을 최대한 응용하여, 두 줄로 표시할 수 있었다.

파싱 부분에서, 정규식으로 헤드와 넘버를 찾아서 순회한다. 이를 바탕으로 `{'f': 파일명, 'h': 헤드, 'n': 넘버, 'i': 인덱스}` 딕셔너리가 모인 `fs` 리스트를 생성한다.

`fs` 리스트를 주어진 순대로 정렬한 뒤, 파일명만 리턴한다.

## 참고

다른풀이를 보다보니 독특한 방식으로 풀어낸 코드가 보였다. 본인이 푼 코드는, sort 함수 안에 튜플로 정렬 순서를 지정하여 한번에 적용하였는데, 다른코드는 마지막 정렬 순서부터 하나씩 정렬하는 방식으로 해결하고 있었다.

제일 마지막 정렬 조건인 원 순서 유지는 이미 되어 있는 상태이므로 건들필요없이 그냥 넘어가도 되며, 넘버로 정렬한번 한 뒤, 마지막에 헤드로 다시 정렬하면 된다.

아래는 다른풀이 방식으로 풀어본 코드다.

```python
import re

def solution(files):
    # files, 넘버로 정렬
    files.sort(key=lambda file: int(re.findall(r'\d{1,5}', file)[0]))
    
    # files, 헤드로 정렬
    files.sort(key=lambda file: re.findall(r'^\D+', file)[0].lower())
    
    # files 리턴
    return files
```
{:.python}

개인적으로는 훨씬 가독성이 있어보이는 코드였다.