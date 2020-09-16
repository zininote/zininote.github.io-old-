---
layout: post-programmers
title: "LV2: 문자열 압축"
updated: 2020-09-16
cat: programmers
---

## 문제

[프로그래머스, 문자열 압축](https://programmers.co.kr/learn/courses/30/lessons/60057?language=python3)

말 그대로 문자열 압축을 위한 코드를 구현하는 것이 핵심이다.

## 풀이

```python
def solution(s):
    # 1
    n = max(1, len(s)//2)
    a = [None] + ['']*n
    
    # 2
    for i in range(1, n+1):
        tmp = []
        for j in range(0, len(s), i):
            if tmp and tmp[-1][1] == s[j:j+i]:
                tmp[-1][0] += 1
            else:
                tmp.append([1, s[j:j+i]])
        a[i] = ''.join(('' if nth == 1 else str(nth))+split for nth, split in tmp)
        
    # 3
    return len(min(a[1:], key=len))
```

`# 1` 에서는 최대압축단위수 `n` 을 계산한다. 예를들어 문자열 길이가 8 개라면 1 에서부터 4 까지의 압축단위수가 나오며, 최대압축단위수는 `len(s)//2` 으로 구할 수 있다. 다만 `s` 의 길이가 1 이라면 계산결과는 0 이 되는데 최소한 1 은 되어야 하므로 `max` 함수로 보정했다.

그리고 `a` 리스트는 각 압축단위수로 압축한 결과를 담을 리스트다. 이해의 편의를 위해 압축단위수와 동일한 인덱스에 결과를 담을 것이기에 0 번 인덱스는 None 으로 하고, 그 뒤로 `n` 개의 공간을 만들어붙였다.

`# 2` 코드는 실제 압축을 수행하는 부분이다. 1 ~ n 까지 반복한다. `tmp` 를 생성하는데, 이 리스트에는 `[[횟수, 문자열], ... ]` 식으로 담고, 나중에 이를 문자열로 환산, 즉 압축을 하여 `a[i]` 에 담는다. `tmp` 를 완성하는 내부 `for` 루프를 보면, 압축단위수만큼씩 자른 부분문자열과 `tmp` 의 마지막 요소 문자열을 비교하여, 같다면 횟수만을 증가시키고, 다르다면 새로운 부분문자열을 횟수와 함께 `tmp` 에 추가한다.

`# 3` 에서는 모든 압축단위수의 결과가 저장된 `a` 리스트에서 문자열 길이가 가장 짧은 것의 길이를 최종리턴한다.
