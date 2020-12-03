---
layout: post
title: "가장 큰 정사각형 찾기"
updated: 2020-12-03
tags: [programmers,lv2]
---

## 문제

[프로그래머스, 가장 큰 정사각형 찾기](https://programmers.co.kr/learn/courses/30/lessons/12905?language=python3)

이런저런 방법을 동원해서 정확성 평가는 통과할 수 있었는데, 효율성 평가를 도저히 통과할 수 없었던 문제였다.

결국은 구글링을 해서 같은 문제에 대한 해법을 소개한 [geeksforgeeks](https://www.geeksforgeeks.org/maximum-size-sub-matrix-with-all-1s-in-a-binary-matrix/) 사이트 내용을 참고하여 문제를 통과했다.

해법의 가장 핵심적만 보면 아래 의사코드와 같다.

```plaintext
보드 b 안의 모든 데이터요소를 e 로 순회
    만일 인덱스 y,x 에 속한 e == 1 이라면
        b[y][x] <- min(b[y-1][x], b[y-1][x-1], b[y][x-1]) + 1
보드 b 안에서 가장 큰값의 제곱 리턴
```
{:.pseudo}

실제로 손으로 끄적여보면서 따라해보면, 순회 1번만으로 가장 큰 정사각현의 한 변의 길이를 구할 수 있는 아주 기발한 방법이었다.

## 풀이

```python
import numpy as np

def solution(board):
    # numpy.ndarray 자료형 변환
    b = np.array(board)
    
    # 가장 큰 정사각형 찾기
    for (y,x),e in np.ndenumerate(b):
        if y==0 or x==0 or e==0: continue
        b[y,x] = min(b[y-1,x],b[y-1,x-1],b[y,x-1])+1
    
    # 넓이 리턴
    return int(np.max(b))**2
```

NumPy 모듈의 ndArray 자료형을 사용했다. ndenumerate 로 모든 데이터요소를 순회하는데, 불필요한 부분은 continue 구문으로 건너뛴다.
