---
layout: post-programmers
title: "LV2: 기능 개발"
updated: 2020-09-17
cat: programmers
---

## 문제

[프로그래머스, 기능 개발](https://programmers.co.kr/learn/courses/30/lessons/42586?language=python3)

기능별로 개발까지 남은 일수를 계산하고, 배포일을 파악한 뒤, 배포일이 같은 기능들 개수를 리턴하면 된다.

## 풀이

```python
def solution(progresses, speeds):
    # 1
    ddays = [-(-(100-p)//s) for p, s in zip(progresses, speeds)]
    
    # 2
    rdays = []
    for x in ddays:
        if rdays and rdays[-1] > x:
            rdays.append(rdays[-1])
        else:
            rdays.append(x)
    
    # 3
    return [rdays.count(x) for x in sorted(set(rdays))]
```

`# 1` 에서는 기능마다 개발완료일을 계산하여 `ddays` 리스트에 담는다. `-(-(100-p)//s)` 수식은 `math.ceil((100-p)/s)` 와 같은 결과를 보이는 수식이다.

`# 2` 에서는 기능마다 배포일을 계산하여 `rdays` 리스트에 담는다. 기본적으로 개발완료일이 곧 배포일이 되지만 앞선 기능 배포일을 넘어설 수 없다. 반복문을 돌면서 `rdays` 의 제일 마지막과 `ddays` 반복값을 비교하여 배포일을 파악하여 다시 `ddays` 에 할당한다.

`# 3` 은 `rdays` 안에서 고유한 배포일을 파악한다. comprehension 표현식으로 고유한 배포일을 하나씩 꺼내어 그 개수들을 리스트로 만들어 리턴한다.
