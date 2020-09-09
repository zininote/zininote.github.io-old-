---
layout: post-programmers
title: "LV2: 프렌즈4블록"
updated: 2020-09-09
cat: programmers
---

## 문제

[프로그래머스, 프렌즈4블록](https://programmers.co.kr/learn/courses/30/lessons/17679?language=python3)

보드에서 일치하는 블록들을 찾아서, 블록들을 제거하고, 남은 블록들을 밑으로 떨어트리는 작업을 제거가 더 이상 불가능할 때까지 반복한 뒤, 그때까지 제거한 총 블록 개수를 세는 문제다. 이해하기는 쉬운데 코드로 구현이 다소 난해하다.

전에 [크레인 인형 뽑기](https://tedblog.github.io/posts/claw-crane-game) 문제에서도 그랬지만 보드를 회전시켜서 위에서 아래가 아닌 오른쪽에서 왼쪽으로 떨어지는 형태로 만드는 게 코딩이 훨씬 쉬웠다. 그래서 일단 보드를 회전시켜 위에서 아래가 아닌 오른쪽에서 왼쪽으로 블록들이 떨어질 수 있도록 하였다.

그 다음에는 일치하는 블록 파악 -> 일치하는 블록 없다면 이제까지 지워진 블록 개수 리턴 -> 일치하는 블록 지우기 -> 빈 공간으로 다른 블록 떨어트리기 를 반복한다.

## 풀이

```py
def solution(m, n, board):
    # 1. board 행/열 전환, 열은 역순으로 변환하여 b 할당
    b = [list(x[::-1]) for x in zip(*board)]
    
    # 2. 프렌즈4블록 게임 진행
    while 1:
        # 2-1. 삭제대상 표시할 _b, 삭제대상이 더 없는지 여부 판단 done 초기화
        _b = [x[:] for x in [[0]*m]*n]
        done = True
        
        # 2-2. 블록일치 조사, 일치하는 블록있다면 _b 갱신, done = False
        for y, x in ((y, x) for y in range(n-1) for x in range(m-1)):
            if b[y][x] and b[y][x] == b[y][x+1] == b[y+1][x] == b[y+1][x+1]:
                _b[y][x] = _b[y][x+1] = _b[y+1][x] = _b[y+1][x+1] = 1
                done = False
                
        # 2-3. done = True 이면 board 공백 개수 리턴
        if done:
            return [e for inner in b for e in inner].count('')
        
        # 2-4. 제거대상 블록 제거
        for y, x in ((y, x) for y in range(n) for x in range(m)):
            if _b[y][x]:
                b[y][x] = ''

        # 2-5. 블록 떨어트리기 처리
        b = [([e for e in inner if e != '']+['']*m)[:m] for inner in b]
```

`# 2-1` 에서 반복문 초기에 `_b`, `done` 변수를 생성하는데, 우선 `_b` 는 일종의 helper 변수다. `b` 와 행/열 크기가 동일한 이차원리스트로 되어 있으며, `b` 에서 삭제 대상이 되는 블록들의 위치를 `_b` 에 표시하고, 나중에 한번에 삭제 처리를 한다. `done` 은 블록 삭제가 종료되었는지를 판단하기 위한 변수다. (또한 `while` 반목문 탈출조건이기도 하다.) 실제로 더 이상 블록삭제가 될 수 없다면 True 값을 유지하고, 삭제가 일어나게 된다면 False 로 바꿔 계속 반복을 하도록 만든다.

`# 2-2` 에서는 실제로 블록들 일치여부를 판단한다. 일치하는 블록, 즉 삭제대상이 되는 블록들은 `_b` 에 1 이라고 기록을 해두고, `done` 을 False 값으로 바꾼다. 삭제 작업이 필요하기 때문이다.

`# 2-3` 에서 `done` 을 검사하여 True 라면, `# 2-2` 에서 블록 일치가 없었다는 뜻이므로 현재 보드의 공백 개수, 즉 과거 반복으로 인해 사라진 블록들 개수를 최종리턴한다.

`# 2-4` 에서 `_b` 리스트에 기록한 내용을 바탕으로, 동일 인덱스에 있는 `b` 리스트 블록을 없앤다.

`# 2-5` 에서 블록 떨어트리기를 한다. 언급한대로 보드를 회전시켰기에 오른쪽에서 왼쪽으로 떨어지는 것으로 보면 된다. 공백이 있는 요소만을 추린뒤, 뒤쪽에 공백을 충분히 붙이고, 원래 길이만큼 잘라주는 방식으로 떨어트리기의 결과를 구현했다.

## 참고

문득 `numpy` 모듈의 `array` 자료형을 사용하면 어떨지 궁금해졌다. 위 내용과 유사하게 수정했고 아래는 그 코드이다.

```py
import numpy as np

def solution(m, n, board):
    # 1. 이차원 numpy.array 자료형으로 변환하여 b 할당
    b = np.array([[*x] for x in board])
    
    # 2. 프렌즈4블록 게임 진행
    while 1:
        # 2-1. 삭제대상 표시할 _b, 삭제대상이 더 없는지 여부 판단 done 초기화
        _b = np.zeros(b.shape, dtype=int)
        done = True
        
        # 2-2. 블록일치 조사, 일치하는 블록있다면 _b 갱신, done = False
        for (y, x), e in np.ndenumerate(b[:-1, :-1]):
            if b[y, x] and np.all(b[y:y+2, x:x+2] == b[y, x]):
                _b[y:y+2, x:x+2] = 1
                done = False
        
        # 2-3. done = True 이면 board 공백 개수 리턴
        if done:
            return np.count_nonzero(b == '')
        
        # 2-4. 제거대상 블록 제거
        b[_b == 1] = ''
        
        # 2-5. 블록 떨어트리기 처리
        for col in b.T:
            tmp = np.concatenate((col[col == ''], col[col != '']))
            np.copyto(col, tmp)
```

[numpy 공식문서](https://numpy.org/doc/stable/index.html)를 통해서 원하는 기능을 최대한 찾아가며 구현해봤다. 생각보다 코드구현이 상당히 수월했다. 고정된 이차원배열 자료형을 써야하는 경우 자주 이용해야겠다.
