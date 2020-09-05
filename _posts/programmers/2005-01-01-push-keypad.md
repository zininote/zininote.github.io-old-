---
layout: post-programmers
title: "LV1: 키패드 누르기"
updated: 2020-09-02
cat: programmers
---

## 문제

[프로그래머스, 키패드 누르기](https://programmers.co.kr/learn/courses/30/lessons/67256?language=python3)

키패드의 위치에 따라 어느 손으로 누를지를 결정하되, 특히 가운데 2, 5, 8, 0 키패드를 누를 때 상대적 거리를 어떻게 구할 것인가가 관건인 문제다.

키패드마다 상대좌표를 미리 설정해둔 다음, 현재 왼손/오른손이 위치한 키패드와, 다음에 눌러야 할 키패드 간의 상대좌표를 이용하여 어느 손으로 눌러야할지 판단하는 로직으로 구현했다. `if`, `elif`, `else` 구문이 많이 사용되었다.

## 풀이

```python
def solution(numbers, hand):
    # 1. {키패드: (y 좌표, x 좌표), ...} 를 나타내는 keypad 딕셔너리 생성
    keypad = {
        '1': (0, 0), '2': (0, 1), '3': (0, 2),
        '4': (1, 0), '5': (1, 1), '6': (1, 2),
        '7': (2, 0), '8': (2, 1), '9': (2, 2),
        '*': (3, 0), '0': (3, 1), '#': (3, 2),
    }
    
    # 2. 양손이 위치한 키패드를 나타내는 lh, rh, 누른 손을 누적기록할 a 초기화
    lh, rh, a = '*', '#', ''
    
    # 3. numbers 반복, 키패드에 따라 누를 손 결정, a 에 합산
    for n in numbers:
        n = str(n)
        
        # 3-1. 제일 왼 또는 오른쪽 키패드라면 왼 또는 오른손 사용
        if n in ['1', '4', '7']:
            a += 'L'
            lh = n
        elif n in ['3', '6', '9']:
            a += 'R'
            rh = n
            
        # 3-2. 가운데 키패드라면 상대거리 c 에 따름, c 도 같다면 hand 에 따름
        else:
            (y, x), (ly, lx), (ry, rx) = keypad[n], keypad[lh], keypad[rh]
            c = ( abs(y-ly)+abs(x-lx) ) - ( abs(y-ry)+abs(x-rx) )
            if c < 0:
                a += 'L'
                lh = n
            elif c > 0:
                a += 'R'
                rh = n
            else:
                if hand == 'left':
                    a += 'L'
                    lh = n
                else:
                    a += 'R'
                    rh = n
        
    # 4. a 리턴
    return a
```
