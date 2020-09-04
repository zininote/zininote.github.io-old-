---
layout: post-programmers
title: "LV1: 비밀 지도"
updated: 2020-09-04
cat: programmers
---

## 문제

[프로그래머스, 비밀 지도](https://programmers.co.kr/learn/courses/30/lessons/17681?language=python3)

문제에서 주어지는 `arr1`, `arr2` 각 리스트의 같은 인덱스 요소끼리 OR 비트연산을 하고, 이를 2 진법으로 변환시키는 과정이 핵심인 문제다.

풀다보니 python 에는 원하는 기능들을 쉽게 구현해주는 내장함수들이 모두 있어, 이들을 적당히 조합하는 것만으로 간단히 해결할 수 있었다. 한줄만으로 결과를 리턴할 수 있다.

## 풀이

```py
def solution(n, arr1, arr2):
    # 1. 두 리스트 같은 인덱스 요소들을 OR 연산, 2 진법 변환, 자릿수에 맞게 0 으로 채움, 0 을 공백, 1 을 벽으로 치환 후 리턴
    return ['{:b}'.format(x|y).zfill(n).replace('0', ' ').replace('1', '#') for x, y in zip(arr1, arr2)]
    def solution(n, arr1, arr2):
```

위 코드에서 2 진법 변환을 위해 `format` 메서드를 사용하였다. 진법 변환 알고리즘과 그 코드를 소개한 [별도의 포스팅](https://zininote.github.io/posts/convert-number-system)도 있으니 관심있다면 참고해보기 바란다.
