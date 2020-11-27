---
layout: post
title: "프렌즈4블록"
updated: 2020-11-27
tags: [programmers,lv2]
---

## 문제

[프로그래머스, 프렌즈4블록](https://programmers.co.kr/learn/courses/30/lessons/17679?language=python3)

게임의 로직을 순서대로 구현하면 풀 수 있을 것 같았다.

보드 안에 삭제 대상이 되는 블록이 있는지 검사 -> 삭제 되는 블록이 없다면 이제까지 삭제 된 블록 개수(즉 보드 안 총 공백 개수)를 리턴 -> 블록 삭제 -> 블록 떨어트리기 -> ... 를 계속 반복하는 식으로 풀어보았다.

그리고 개인적으로 [NumPy](https://numpy.org/) 를 학습하고 있기에, 보드 구현에는 numpy.ndarray 자료형을 사용하였다. 생각보다 원하는 로직을 쉽게 구현할 수 있었다.

## 풀이

```python
import numpy as np

def solution(m, n, board):
    # 보드 초기화
    b = np.array([list(x) for x in board])
    
    while True:
        # 헬퍼 초기화
        is_done = True
        h = np.zeros(b.shape, dtype=int)
        
        # 삭제대상 블록 검사
        for (y, x), e in np.ndenumerate(b):
            if y == b.shape[0]-1 or x == b.shape[1]-1 or e == '': continue
            box = np.s_[y:y+2, x:x+2]
            if np.all(b[box] == e):
                h[box] = 1
                is_done = False
                
        # 삭제 대상 없으면, 빈 공간 개수 리턴
        if is_done: return b[b == ''].size
        
        # 블록 삭제
        b[h == 1] = ''
        
        # 블록 떨어트리기
        for col in b.T:
            col[:] = np.hstack((col[col == ''], col[col != '']))
```
{:.python}

먼저 주어지는 보드를 numpy 모듈의 ndarray 자료형으로 변환하여 `b` 에 할당하였다. 그리고 위에서 언급한 것처럼 반복문에 들어간다.

반복문 안에서는, 우선 헬퍼 변수 2개를 생성한다. 하나는 `is_done` 으로 더 이상 삭제할 블록이 없을 때 True 값을 가진다. 우선은 True 값으로 초기화 한뒤, 뒤에 삭제 대상 블록이 발견되면 False 값으로 바뀐다.

다른 하나는 `h` ndarray 자료형인데, `zeros` 함수를 사용하여 0 으로 초기화 한다. 매 반복턴마다 삭제 대상 블록이 발견되면, 블록 위치와 동일한 위치에 1 을 할당하는 식으로 기록한다. 나중에 기록된 값에 따라 블록 삭제를 한다.

삭제대상 블록 검사에서는, `ndenumerate` 함수로 `b` 의 전체 요소를 반복한다. 우선 의미없는 반복순서(범위를 벗어나거나, 이미 블록이 삭제되어 공백인 부분)는 continue 구문으로 건너뛴다.

`s_` 라는 독특한 변수가 등장하는데, numpy 인덱싱을 나타내는 개체라고 이해하면 될 듯 하다. 블록 4개의 좌표를 가리키도록 지정해준 뒤, `box` 변수에 할당했다.

이 `box` 인덱싱에 해당하는 `b` 의 값이 모두 동일하다면, 삭제대상 블록이므로, 헬퍼 `h` 의 동일한 위치를 1 로 바꾸고, `is_done` 변수를 False 로 바꾼다.

`is_done` 이 True 라면, 삭제 대상 블록이 더 이상 없다는 뜻이므로, 반복 종료하고 이때까지의 공백 개수를 리턴한다.

`is_done` 이 False 라면, 블록 삭제와 떨어트리기를 진행하게 된다. 특히 떨어트리기는, `b` 의 열 요소를 순회하면서, 공백 부분과 공백이 아닌 부분을 따로 추려서 `hstack` 함수로 붙이도록 구현해봤다.