---
layout: post-programmers
title: "LV1: 같은 숫자는 싫어"
updated: 2020-09-07
cat: programmers
---

## 문제

[프로그래머스, 같은 숫자는 싫어](https://programmers.co.kr/learn/courses/30/lessons/12906?language=python3)

`arr` 리스트를 순회하면서, 동시에 앞/뒤 인덱스 요소를 비교하는 코드를 구현하면 해결할 수 있는 문제다.

## 풀이

```py
def solution(arr):
    # 1. a 리스트 생성, arr 첫번째 요소 삽입, arr 두번째 요소부터 반복, a 의 마지막과 비교해가며 요소를 채움
    a = [arr[0]]
    for e in arr[1:]:
        if a[-1] != e:
            a.append(e)

    # 2. a 리스트 리턴
    return a
```

## 수정

다른풀이를 보다가 재밌는 코드를 하나 발견했다. python 은 리스트가 허용하는 인덱스를 벗어난 참조에는 에러를 내보내는데, 슬라이싱 구문으로 인덱스를 벗어난 참조에는 에러를 반환하지 않고 해당하는 범위까지만 반환을 한다. 이를 이용한 코드로 한줄로도 표현이 가능한데 아래와 같다.

```py
def solution(arr):
    return [e for i, e in enumerate(arr) if arr[i-1:i] != [e]]
```

`if` 문에 슬라이싱 구문을 사용하였다. 만일 `i` 가 0 이라면 슬라이싱 범위에 오류가 생기지만 에러를 내보내기 보다는 그냥 빈 리스트를 반환한다.

좀 더 생각해보니, 원코드도 한 줄로 표현할 수 있는 방법이 있었다.

```py
def solution(arr):
    return [arr[0]] + [e for i, e in enumerate(arr[1:], 1) if arr[i-1] != e]
```
