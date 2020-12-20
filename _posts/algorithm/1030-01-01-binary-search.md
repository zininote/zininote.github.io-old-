---
layout: post
title: "이진 탐색 알고리즘"
updated: 2020-12-20
tags: [algorithm,array]
---

## 리스트 안에서 특정 요소 찾기

연속된 자료구조에서 어떤 데이터요소를 찾는 탐색 방법 중 하나다. Array 뿐만아니라 Python 의 리스트 자료형도 이진 탐색을 사용할 수 있다.

어떤 `a` 리스트가 있다고 할 때, 이 리스트 안에서 어떤 요소 `x` 가 어느 인덱스에 있는지 찾는다고 해보자. 찾는 가장 단순한 방법은 `a` 를 앞에서부터 순회하면서 `x` 를 찾는 것이다. 가장 단순하면서 명확한 방법이지만 리스트 길이가 매우 길면서, `x` 가 뒷부분에 있다면 시간이 매우 오래걸릴 수 있다. 시간복잡도는 O(N) 이다.

하지만 `a` 리스트가 **오름차순으로 정렬** 되어 있다면 굳이 앞에서부터 찾을 필요가 없다. 리스트 중간에 있는값과 `x` 를 비교해보고, 중간값 < `x` 라면, `x` 는 중간값 보다 크므로 큰 값들만으로 이뤄진 범위의 다시 중간값과 비교하고, 이런식으로 진행하면 훨씬 빠른 탐색이 가능하다. 보통 사전에서 단어를 찾을 때 어떻게 찾는지를 생각하면 된다.

중간값을 기준으로 중간값보다 작은 범위, 큰 범위를 나룰 수 있고, `x` 가 어디 속해있을지 유추하고 작거나 큰 범위만으로 다시 탐색하고... 식으로 진행되기 때문에 [이진 탐색](https://namu.wiki/w/%EC%9D%B4%EC%A7%84%20%ED%83%90%EC%83%89)이라 한다. 링크 안에 있는 설명과 그림을 보면 확실한 개념이 이해가 될 것이다. 시간복잡도는 O(logN) 이다.

## 이진 탐색 로직

예를들어, 아래와 같이 오름차순으로 정렬이 된 `a` 리스트가 있다고 해보자. 여기에서 찾고자 하는 `x` 값은 41 이라 해보자. 이 값이 어느 위치에 있는지를 알고자 한다.

![그림00](https://zininote.github.io/img/algorithm/algorithm-1030-01-01-00.svg)

리스트 범위의 앞을 `lo`, 가장 뒤를 `hi` 라 해보자. python 의 일반적인 범위 원칙에 따라 `lo` 는 0 을 `hi` 는 `len(a)` 를 가리킨다.

이제 중간인덱스를 `mid` 라 해보자. `(lo+hi)//2` 로 계산할 수 있다.

![그림01](https://zininote.github.io/img/algorithm/algorithm-1030-01-01-01.svg)

`x` 와 중간값 `a[mid]` 를 비교해보자. `a[mid] < x` 이므로 `mid` 를 중심으로 앞의 범위는 지운다. 코드상으로는 `lo` 위치를 `mid` 의 다음 번호로 땡겨오는 작업을 하면 된다.

![그림02](https://zininote.github.io/img/algorithm/algorithm-0020-01-01-02.svg)

이제 다시 중간값을 찾는다. 이제는 `x < a[mid]` 이므로, 뒤의 범위를 지운다. 코드상으로는 `hi` 위치를 `mid` 로 땡겨오는 작업을 하면 된다.

![그림03](https://zininote.github.io/img/algorithm/algorithm-1030-01-01-03.svg)
![그림04](https://zininote.github.io/img/algorithm/algorithm-1030-01-01-04.svg)

다시 중간값을 찾는다. `x < a[mid]` 이므로, 뒤의 범위를 지운다. 다시 `hi` 위치를 `mid` 로 땡겨오는 작업을 하면 된다.

![그림05](https://zininote.github.io/img/algorithm/algorithm-1030-01-01-05.svg)
![그림06](https://zininote.github.io/img/algorithm/algorithm-1030-01-01-06.svg)

다시 중간값을 찾는다. `x == a[mid]` 가 되므로, 인덱스인 `mid` 를 리턴하면 된다.

![그림07](https://zininote.github.io/img/algorithm/algorithm-1030-01-01-07.svg)

만일 여기서도 `x` 를 못찾았다면, 다시 찾는 방법을 반복하는데, 해보면 `lo` 와 `hi` 가 같은 인덱스를 가리키게 된다. 이 때는 찾는 값이 결국 없었다는 의미가 된다.

## 이진 탐색 코드 구현

위 로직을 함수로 구현하면 아래와 같다.

```py
# 이진 탐색 코드
def bisearch(a, x, lo=0, hi=None):
    if hi is None: hi = len(a)
    while lo < hi:
        mid = (lo+hi)//2
        if x == a[mid]: return mid
        else:
            if x < a[mid]: hi = mid
            else: lo = mid+1
    else: return -1
```
{:.python}

`lo` < `hi` 인 경우 계속 반복하면서, 중간값 비교에 따라 `hi`, `lo` 를 `mid` 위치로 옮겨오는 작업을 계속한다. 찾는값이 있다면 그 인덱스를, 없다면 -1 을 리턴하도록 되어있다.

## Python 의 bisect 모듈

python 에는 이진 탐색을 굳이 코드를 직접구현하지 않도록 `bisect` 모듈을 제공을 한다. 이 모듈 안에는 `bisect` 함수가 있는데, 아래는 사용 예시이다.

```py
from bisect import *

a = [0, 2, 4, 6, 8]

print(bisect(a, 5))    # 3
```
{:.python}

`bisect` 함수는 이진 탐색 로직으로 **주어진 리스트의 오름차순을 해치지 않고 어느 인덱스에 `x` 값을 넣을 수 있는지를 탐색**한다. 위 결과를 보면 숫자 5 를 넣을 수 있는 위치는 3 번째 인덱스가 된다.

이 외에 `bisect_left`, `bisect_right` 함수도 있는데 아래와 같다.

```py
from bisect import *

a = [0, 2, 4, 6, 8]

print(bisect_left(a, 5))       # 3
print(bisect_right(a, 5))      # 3
print(bisect(a, 5))            # 3

b = [0, 2, 4, 5, 5, 5, 6, 8]

print(bisect_left(b, 5))       # 3
print(bisect_right(b, 5))      # 6
print(bisect(b, 5))            # 6
```
{:.python}

`a` 리스트에서 5 를 넣을 수 있는 위치를 탐색할 땐 세 함수 모두 결과가 같다. 하지만 이미 리스트에 5 가 여러개 들어있는 `b` 리스트에서 5 를 넣는 위치를 찾고자 하면 함수들의 결과가 다르다.

`bisect_left` 함수는 동일한 값이 있을 경우 그 동일한 값의 가장 왼쪽 인덱스를, `bisect`, `bisect_right` 함수는 동일한 값의 가장 오른쪽 인덱스의 다음 인덱스를 반환한다.

`bisect` 모듈에 대한 자세한 사항은 [python 공식문서](https://docs.python.org/3.8/library/bisect.html)를 참고하기 바란다. 공식문서 안에는 위 함수들의 소스코드도 공개한 [인터넷 주소](https://github.com/python/cpython/blob/3.8/Lib/bisect.py)도 안내하고 있으니 한번쯤은 들러보기 바란다. (여기 소스코드를 참고하여 위 `bisearch` 함수도 만들었다.)

## bisect 를 bisearch 처럼 사용하기

python `bisect` 함수는 찾고자 하는 값 `x` 의 위치를 찾아주는 것이 아니라, 오름차순을 해치지 않고 삽입 가능한 위치를 찾아주는 함수다. 이를 `bisearch` 함수처럼 사용하는 방법은 python 공식문서 안에 소개하고 있으니 참고하기 바란다.