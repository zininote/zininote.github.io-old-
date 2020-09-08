---
layout: post-programmers
title: "LV2: 압축"
updated: 2020-09-07
cat: programmers
---

## 문제

[프로그래머스, 압축](https://programmers.co.kr/learn/courses/30/lessons/17684?language=python3)

문자열이 없어질 때까지, 사전과 문자열 비교를 통해서, 사전도 채워나가고, 해당 색인을 완성해나가는 그런 문제였다.

어떻게 코딩을 할 수 있을까 고민하다가, 우선 단어가 긴 단어가 사전 뒤에 붙으므로 사전을 뒤부터 순환시키면서 문자열과 비교를 하되, 비교도 `startswith` 메서드를 사용하기로 하였다.

## 풀이

```python
def solution(msg):
    # 1. 사전 d 리스트 생성
    d = [None, *'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
    
    # 2. msg 없어질 때까지 반복, 사전 뒤부터 검색, 색인 a 에 삽입, 사전 추가 시행
    a = []
    while msg:
        for i, x in reversed(list(enumerate(d))):
            if msg.startswith(x):
                a.append(i)
                msg = msg[len(x):]
                if msg:
                    d.append(x+msg[0])
                break
                
    # 3. a 색인 리턴
    return a
```

`# 1` 에서 주어진 색인과 인덱스를 맞추기 위해 0 인덱스는 None 으로 지정했다.

`# 2` 에서 `msg` 가 없어질 때까지 반복을 한다. 반복문 안에서 본격적으로 사전과 문자열을 비교하는데, 위에서 언급했던 대로 사전 `d` 를 역순으로 순회한다. 이를 `startswith` 메서드로 문자열과 사전색인 일치여부 조사해서, `a` 에 색인을 삽입하고, `msg` 를 잘라낸 뒤, 그래도 `msg` 가 남아있다면 사전에 색인을 추가한다.
