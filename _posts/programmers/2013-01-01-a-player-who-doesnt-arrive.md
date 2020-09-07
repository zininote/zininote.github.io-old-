---
layout: post
title: "LV1: 완주하지 못한 선수"
updated: 2020-09-07
cat: programmers
---

## 문제

[프로그래머스, 완주하지 못한 선수](https://programmers.co.kr/learn/courses/30/lessons/42576?language=python3)

완주하지 못한 한명을 어떻게 찾아낼 수 있을까를 고민해야 하는 문제다. 회사 업무에서 엑셀로 자료간 차이를 찾아낼 때 사용했던 방법을 응용하여 문제를 풀었다.

두 리스트를 정렬한 뒤 앞에서부터 요소 일치여부를 판단하면 된다. 불일치 경우가 나타나면 그 때의 참가자가 완주하지 못한 선수이며, 완주자의 마지막까지 순회했음에도 불일치 경우가 나타나지 않았다면 참가자의 제일 마지막 선수가 완주하지 못한 선수가 된다.

## 풀이

```python
def solution(participant, completion):
    # 1. 참가자와 완주자 각각 오름차순 정렬
    participant.sort()
    completion.sort()
   
    # 2. zip 함수로 반복, 달라질 때 p 리턴, 반복종료 했다면 참가자 제일 마지막 요소 리턴
    for p, c in zip(participant, completion):
        if p != c:
            return p
    else:
        return participant[-1]
 ```
 
 python 은 `for` 반복문에도 `else` 구문을 지원하는데, 반복이 끝까지 실행된 후 종료되었을 때 실행된다.
 
## 수정
 
 다른풀이를 보다가 더 기발한 방법으로 문제를 해결한 풀이를 찾았다. collections 모듈의 Counter 클래스를 활용한 풀이인데 아래 코드를 참고하자.
 
 ```python
from collections import Counter

def solution(participant, completion):
    p = Counter(participant)
    c = Counter(completion)
    return list((p-c).keys())[0]
```

Counter 클래스는 딕셔너리의 응용 클래스로 요소가 몇개가 있는가를 key, value 형태로 저장을 한다. 단순히 빼는 것만으로 완주하지 못한 자를 찾아낼 수 있다.

Counter 클래스의 상세내용은 [python 공식문서](https://docs.python.org/ko/3/library/collections.html#collections.Counter) 등에서 확인해보기 바란다.
