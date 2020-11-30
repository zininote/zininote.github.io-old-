---
layout: post
title: "배열 데이터요소 로테이션"
updated: 2020-12-01
tags: [algorithm,array]
---

## 데이터요소 로테이션

배열 자료형이 있을 때, n 만큼 왼쪽 혹은 오른쪽으로 로테이션을 시킬 때가 있다. 로테이션은 일종의 자리이동과 같은 것으로, 범위 밖으로 밀려난 데이터요소는 다시 반대쪽 앞부터 채워가는 형태가 된다. 마치 데이터요소들이 회전하는 것과 같이 보이기도 한다.

예를들어 아래 그림을 보면, 왼쪽은 `rotate(arr, -2)`, 오른쪽은 `rotate(arr, 2)` 와 같은 명령을 수행한 결과이다.

![그림00](https://zininote.github.io/img/algorithm/algorithm-1010-01-01-00.svg)

왼쪽 그림은 왼쪽 방향으로 2 칸 이동을, 오른쪽 그림은 오른쪽 방향으로 2 칸 이동을 했다. 방향대로 이동할 수 있는 부분(하얀 부분)과, 배열 범위를 벗어나서 반대쪽 앞으로 채워지는 부분(붉은 부분)이 구분되어있다.

로테이션에는 재밌는 특징이 있다. **`n` 만큼의 로테이션은, 반대방향으로 `배열길이 - n` 만큼 로테이션한 결과와 동일**하다. 위 그림을 보면, 왼쪽(오른쪽)으로 2 칸 이동의 결과는 오른쪽(왼쪽)으로 6 칸 이동의 결과와 같다. 이는 곧 한쪽 방향만 고려해서 알고리즘을 구현해도 된다는 뜻이다.

또 다른 특징으로는, 로테이션은 일정한 길이의 배열을 계속 회전하는 것과 같기 때문에 **배열길이 이상으로 로테이션한 결과는 `n % 배열길이` 만큼 로테이션한 결과와 동일**하다.

## 일반적인 로테이션 구현 알고리즘

Python 의 대표적인 연속 자료형인 리스트로 로테이션 코딩을 해보기로 하자. (엄밀한 의미에서 배열과 Python 의 리스트는 다르지만 여기서는 거의 동일한 것으로 이해해도 된다.)

사실 가장 먼저 떠올릴 수 있는 일반적인 방법은, 로테이션할 때 리스트 범위를 벗어나는 부분을 잘라서, 반대쪽 앞에다 가져다 붙여 다시 리스트를 생성하면 된다.

```py
def rotate(arr, n):
    if len(arr) == 0: return arr
        
    n = n%len(arr)
    if n == 0: return arr
        
    return arr[-n:]+arr[:-n]

arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

print(arr)                # ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
print(rotate(arr, -2))    # ['C', 'D', 'E', 'F', 'G', 'H', 'A', 'B']
print(rotate(arr, 2))     # ['G', 'H', 'A', 'B', 'C', 'D', 'E', 'F']
```
{:.python}

`len(arr)` 과 `n%len(arr)` 이 0 일 때는 굳이 로테이션을 하지 않는다. 그리고 `n%len(arr)` 의 결과에 따라 리스트를 잘라붙인 뒤 리턴한다.

반드시 알아야 할 중요한 포인트가 있다. **Python 의 % 연산자는 음수가 있으면 다른 언어들과는 다르게 동작**을 한다. [stackoverflow](https://stackoverflow.com/questions/3883004/the-modulo-operation-on-negative-numbers-in-python) 사이트 중간에 보면 % 연산자는 아래 수식과 같다고 한다.

- Python: x%y = x - math.floor(x/y)*y
- Others: x%y = x - math.trunc(x/y)*y

보통 floor 함수는 *그 숫자를 넘지 않는 가장 큰 정수* 를, trunc 함수는 *그 숫자에서 소수점 이하를 제외한 정수* 를 리턴하는 함수다.

양수에 적용하면 두 함수는 동일한 결과를 보인다. 하지만 음수는 그 결과가 다르다.

예를들어 x 는 2, y 는 8 이라고 한다면, x/y 는 0.25 이므로, `floor(x/y) == 0`, `trunc(x/y) == 0` 이 된다. 하지만 x 가 -2, y 가 8 이라면, x/y 는 -0.25 이고, `floor(x/y) == -1`, `trunc(x/y) == 0` 이 된다. -0.25 를 넘지않는 가장 큰 정수는 -1 이기 때문이다.

다시 % 연산자로 돌아오면, 위 rotate 함수 내부에서 계산되는 `-2%8` 의 결과는 6 이 된다. 재밌는 점은, % 연산자가 `배열길이 - n` 을 구해준다는 점이다. 음수 `n` 은 본래 왼쪽 로테이션을 상정했었으므로, 자동으로 동일한 결과를 가져오는 오른쪽 로테이션으로 바뀌게 된다.

즉 오른쪽으로의 로테이션 로직만 신경쓰면 된다. 제일 마지막 `arr[-n:]+arr[:-n]` 표현식이 그것이다. (그러나 이는 왼쪽 로테이션의 경우에도 들어맞는 표현식이기는 하다.)

## Reversal 알고리즘

이 알고리즘 부분은 [geeksforgeeks](https://www.geeksforgeeks.org/program-for-array-rotation-continued-reversal-algorithm/) 사이트 내용을 참고하였다.

이 알고리즘을 이용하여 `rotate(arr, 2)` 를 수행한다고 하면 아래처럼 도식화할 수 있다.

![그림01](https://zininote.github.io/img/algorithm/algorithm-1010-01-01-01.svg)

먼저, 오른쪽으로 로테이션이 되는 부분(하얀부분)과, Array 범위를 벗어나서 다시 왼쪽으로 붙게되는 부분(붉은부분)을 구분한다.

그리고 하얀부분끼리, 붉은부분끼리 데이터요소 순서를 뒤집는다.

그리고 다시 한번 전체 데이터요소 순서를 뒤집는다.

Python 코드로 구현하면 아래와 같다.

```py
def rotate(arr, n):
    if len(arr) == 0: return arr
    
    n = n%len(arr)
    if n == 0: return arr
    
    return (arr[:-n][::-1]+arr[-n:][::-1])[::-1]


arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

print(arr)                # ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
print(rotate(arr, -2))    # ['C', 'D', 'E', 'F', 'G', 'H', 'A', 'B']
print(rotate(arr, 2))     # ['G', 'H', 'A', 'B', 'C', 'D', 'E', 'F']
```
{:.python}

달라진 부분은 rotate 함수의 마지막 return 구문이다.

## deque 클래스의 rotate 함수

Python 의 collections 모듈은 deque 클래스를 제공한다. 양방향 Queue 를 나타내는 자료형으로 구체적인 사항은 [Python 공식문서](https://docs.python.org/ko/3.9/library/collections.html#collections.deque)를 참고하자. rotate 함수를 내장하고 있다.

```py
from collections import deque

arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
dq1 = deque(arr)
dq2 = deque(arr)

print(arr)        # ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

dq1.rotate(-2)
print(dq1)        # deque(['C', 'D', 'E', 'F', 'G', 'H', 'A', 'B'])

dq2.rotate(2)
print(dq2)        # deque(['G', 'H', 'A', 'B', 'C', 'D', 'E', 'F'])
```
{:.python}

위에서 직접 구현했던 rotate 함수는 원본 조작없이 복사본을 리턴하지만, deque.rotate 함수는 원본을 직접 조작하는 식으로 설계되어있다.
