---
layout: post
title: "크레인 인형뽑기 게임"
updated: 2020-11-21
tags: [programmers,lv1]
---

## 문제

[프로그래머스, 크레인 인형뽑기 게임](https://programmers.co.kr/learn/courses/30/lessons/64061?language=python3)

인형뽑기 게임을 나타내는 자료구조 및 바구니 변수를 상정한 뒤, 실제로 크레인 동작을 순서대로 구현하는 식으로 풀어보았다.

개인적으로 Python 을 활용한 데이터 사이언스 분야에도 관심이 있기에, NumPy 모듈을 사용하여 인형뽑기 게임 자료구조를 나타내보기로 했다.

## 풀이

```python
import numpy as np

def solution(board, moves):
    # 보드, 바스켓, 제거된 인형수 초기화
    board = np.array(board)
    basket = []
    count = 0
    
    # moves 순회, 인형 꺼내기, 바스켓 인형과 일치하면 인형 제거
    for m in moves:
        b = board[:, m-1]
        if np.any(b>0):
            idx = np.argmax(b>0)
            tmp, b[idx] = b[idx], 0
            if basket and basket[-1] == tmp:
                basket.pop()
                count += 2
            else: basket.append(tmp)
    
    # count 리턴
    return count
```
{:.python}

주어지는 `board` 이차원리스트를 NumPy.ndArray 자료형으로 변환하였다. 이렇게 하면 열방향으로의 순회도 상당히 편해진다.

`moves` 리스트를 `m` 으로 순회하면서, 크레인이 내려오는 열의 인형들만 `board[:, m-1]` 로 추려낸다. 만약 이 열에 인형이 하나라도 있다면(0 보다 큰 수가 있다면), 이를 찾아서 바구니를 나타내는 `basket` 리스트의 가장 마지막 인형과 비교하여 삭제하는 식으로 진행하고 있다.

## 참고

NumPy 모듈을 사용하지 않고 풀어보았다.

그리고 `board` 리스트를 변형하였는데, 열을 뒤집어서 행과 열 방향을 바꿨다. 이렇게 하면 크레인이 위에서 아래가 아닌, 오른쪽에서 왼쪽으로 작동하는 것으로 볼 수 있다.

더 나아가 0 을 제거하였는데, 이렇게하면 0 이 아닌 인덱스를 검사할 필요 없이 pop 함수만으로 인형을 꺼내올 수 있게 된다.

```python
def solution(board, moves):
    # 보드, 바스켓, 제거된 인형수 초기화
    board = [[y for y in x[::-1] if y] for x in zip(*board)]
    basket = []
    count = 0
    
    # moves 순회, 인형 꺼내기, 바스켓 인형과 일치하면 인형 제거
    for m in moves:
        b = board[m-1]
        if b:
            tmp = b.pop()
            if basket and basket[-1] == tmp:
                basket.pop()
                count += 2
            else: basket.append(tmp)
                
    # count 리턴
    return count
```

`board` 리스트에 적용한 comprehension 표현식이 위에서 언급한 변형 방식이다. zip 함수로 행과 열을 바꾼 뒤, 뒤집은 채로 0 이 아닌 경우만 담도록 하고 있다.
