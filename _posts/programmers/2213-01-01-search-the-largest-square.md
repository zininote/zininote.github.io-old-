---
layout: post-programmers
title: "LV2: 가장 큰 정사각형 찾기"
updated: 2020-09-14
cat: programmers
---

## 문제

[프로그래머스, 가장 큰 정사각형 찾기](https://programmers.co.kr/learn/courses/30/lessons/12905?language=python3)

1 로 이뤄진 최대 크기의 정사각형을 효율적으로 찾아내면 되는 문제다.

이 문제는 아무리해도 효율성 테스트를 통과할 수 없어서, 구글링으로 같은 문제에 대한 해법을 소개한 [geeksforgeeks](https://www.geeksforgeeks.org/maximum-size-sub-matrix-with-all-1s-in-a-binary-matrix/) 사이트 내용을 참고하여 문제를 통과했다.

helper 리스트를 이용한 방법이다. 문제에서 주어지는 `board` 리스트와 똑같은 크기의 helper 리스트를 생성한 뒤, 0 번째 행과 0 번째 열은 `board` 리스트와 같은 값으로 채운다. 그리고 1 번째 행과 열부터 순회하면서 아래 공식에 따라 helper 를 계산한다. (y, x 는 각 행, 열 값을 나타냄)

```python
if board[y][x] == 1:
    helper[y][x] = min(helper[y-1][x], helper[y-1][x-1], helper[y][x-1]) + 1
```

반복을 마친 뒤, helper 리스트에서 가장 큰 값을 고르면 된다. 그 값이 가장 큰 정사각형의 한 변의 size 가 된다. 누가 이런 기막힌 원리를 생각했는지는 모르겠지만 정말 존경스러웠다.

## 풀이

```python
import numpy as np

def solution(board):
    # 1
    b = np.array(board)
    h = np.zeros(b.shape, dtype=int)
    h[0, :] = b[0, :]
    h[:, 0] = b[:, 0]
    
    # 2
    for (y, x), e in np.ndenumerate(b):
        if y == 0 or x == 0:
            continue
        if e:
            h[y, x] = min(h[y-1, x], h[y-1, x-1], h[y, x-1]) + 1
            
    # 3
    return int(np.max(h)**2)
```

`numpy` 모듈의 `array` 자료형을 사용해봤다. 이를 사용하면 `[y, x]` 형태로 각 요소에 접근이 가능하고, 일반 리스트로는 구현이 어려운 열 방향으로의 요소 처리가 쉽기 때문이다.

`# 1` 코드에서는 위에서 언급한 helper 에 해당하는 `h` 를 생성하고, 0 번째 행과 열은 `b` 와 동일한 수치를 삽입한다.

`# 2` 코드가 주된 계산 코드다. `b` 전체를 반복하면서, 0 번째 행과 열이 아니라면, 위에서 말한 계산을 수행한다.

`# 3` 에서는 가장 큰 값을 찾아, 제곱한 뒤 리턴한다. 마치 정수의 계산처럼 보이지만 `numpy.int` 자료형이기 때문에 `int` 형변환을 해주면 된다.
