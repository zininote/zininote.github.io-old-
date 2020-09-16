---
layout: post-algorithm
title: "heap: 바이너리 힙(Heap) 자료구조"
updated: 2020-09-16
cat: algorithm
---

## 바이너리 힙 자료구조

[영문 위키피디아](https://en.wikipedia.org/wiki/Binary_heap)와 [이 블로그](https://gmlwjd9405.github.io/2018/05/10/data-structure-heap.html)에 있는 내용을 주로 보면서, 구글링을 통해 덧붙인 내용들을 이 포스팅에 정리해 보았다.

힙 정렬, 우선순위 큐 등 구현에 사용되는 자료구조로, 아래와 같은 이진 트리 형태를 띄고 있다.

![그림00](https://zininote.github.io/img/algorithm/algorithm-1061-01-01-00.svg)
{:.center}

부모 노드 아래에 최대 두개의 자식 노드가 달려있다. 위쪽과 같이 노드의 값이 부모 < 자식 이라면 "최소 힙(Min Heap), 아래쪽과 같이 부모 > 자식 이라면 "최대 힙(Max Heap)이라 한다. 가장 위에 위치한 Root 노드는, 최소 힙이라면 트리에서 가장 작은 값을, 최대 힙이라면 가장 큰 값을 가지게 된다.

그리고 보면 알겠지만 중복값이 포함될 수도 있다. 또한 부모-자식 간에는 정렬이 되어 있지만, 그 외 노드 간에는 정렬이 되어있음을 보장하지는 않는다.

## 힙과 리스트

힙의 각 노드를 아래 그림처럼 순서대로 인덱스화 했을 때, 어떤 노드 `v` 의 부모, 자식의 인덱스 관계는 아래와 같다.

![그림01](https://zininote.github.io/img/algorithm/algorithm-1061-01-01-01.svg)
{:.center}

- v 노드의 부모 인덱스는 (v-1)//2
- v 노드의 왼쪽 자식 인덱스는 v*2+1
- v 노드의 오른쪽 자식 인덱스는 v*2+2

부모, 자식 간 인덱스 관계를 수식으로 명확하게 구할 수 있기 때문에 힙 자료구조는 보통 리스트(배열)로 구현한다.

## 삽입과 삭제

우선순위 큐에 데이터를 삽입한다고 해보자. 이는 곧 힙 자료구조에 데이터를 넣는 것인데, 아래처럼 작동한다. (최소 힙을 가정한다.)

- 제일 마지막 노드(리스트의 제일 마지막 인덱스) 바로 뒤에 신규 데이터를 삽입
- 신규 값과 부모 값 비교, 신규값 < 부모값이라면 둘을 스왑한다.
- 계속 상위의 부모값과 비교하며 더 이상 스왑이 불가능할 때까지 진행한다.

그림으로 표현하면 아래와 같다.

![그림02](https://zininote.github.io/img/algorithm/algorithm-1061-01-01-02.svg)
{:.center}

이번에는 우선순위 큐에서 삭제한다고 해보자. 힙 자료구조에서 Root 노드의 값을 가져오면서 삭제를 하게 되는데, 아래처럼 작동한다. (최소 힙을 가정한다.)

- Root 노드(리스트의 0 인덱스) 삭제 (이 값을 리턴), 제일 마지막 노드 값을 Root 노드로 옮기고 제일 마지막 노드도 삭제
- Root 값과 자식 값 비교, min(왼쪽 자식값, 오른쪽 자식값) < Root 값이면, 더작은 값을 가지는 자식값과 Root 값을 스왑한다.
- 계속 하위의 자식값과 비교하며 더 이상 스왑이 불가능할 때까지 진행한다.

그림으로 표현하면 아래와 같다.

![그림03](https://zininote.github.io/img/algorithm/algorithm-1061-01-01-03.svg)
{:.center}

## python 코드로 구현

실제로 python 에는 최소 힙 자료구조를 구현해주는 모듈이 존재한다. `heapq` 모듈인데 아래 코드들은 `heapq` 모듈에 있는 함수와 동일하게 작동하도록 흉내내봤다. 물론 python 에서 제공하는 함수가 더 효율적이고 정교할 것이다. 아래 코드 대신 python 의 정식코드가 궁금하신 독자들은 [여기](https://github.com/python/cpython/blob/master/Lib/heapq.py)를 참고해보자.

```python
# heap 구조에 데이터 삽입
def heappush(it, item):
    it.append(item)
    v = len(it)-1
    while 1:
        p = (v-1)//2
        if 0 < v and it[v] < it[p]:
            it[v], it[p] = it[p], it[v]
            v = p
        else:
            break

# heap 구조에서 데이터 추출
def heappop(it):
    item = it[0]
    it[0] = it[-1]
    del it[-1]
    v = 0
    while 1:
        lc = v*2+1
        rc = v*2+2
        if rc < len(it) and it[rc] < it[lc] and it[rc] < it[v]:
            it[v], it[rc] = it[rc], it[v]
            v = rc
        elif lc < len(it) and it[lc] < it[v]:
            it[v], it[lc] = it[lc], it[v]
            v = lc
        else:
            break
    return item

# 리스트를 heap 자료구조에 맞게 변형
def heapify(it):
    tmp = []
    for x in it:
        heappush(tmp, x)
    for i in range(len(it)):
        it[i] = tmp[i]
```

`heappush` 는 삽입을, `heappop` 은 삭제를 담당하는 함수이며, `heapify` 는 기존의 리스트 내용을 힙 자료구조에 맞게 변경하는 역할을 한다. 세 함수 모두 인수로 받는 `it` 은 리스트이며, `heappush` 함수는 추가적으로 삽입할 내용 `item` 을 인수로 받는다.

`heappush` 함수를 먼저 보면, `item` 을 인수로 받아 `it` 의 제일 마지막에 삽입한다. 그리고 반복문으로 부모 노드와 계속 비교를 하며, 부모 노드가 없거나 부모 노드값이 더 작은 경우에 반복을 멈춘다.

`heappop` 함수는 `it` 의 제일 앞 요소를 리턴한다. 리턴하기 전에 다시 힙 자료구조를 정리하는데, 제일 마지막 요소를 Root 로 가져온 다음 반복문으로 자식 노드와 계속 비료를 한다. 먼저 오른쪽 자식이 존재하면서, 오른쪽 자식이 왼쪽 자식 및 자신보다 더 작으면 오른쪽 자식과 스왑을 하고, 아니라면 왼쪽 자식과 비교하여 스왑여부 결정하고, 이것도 아니라면 반복을 멈추는 구조로 되어 있다.

`heapify` 함수는 전달받은 `it` 내용으로 힙 자료구조를 만든다음 `it` 의 각 요소가 그 값을 가지도록 되어 있다. 결과적으로는 함수에 대입한 `it` 이 최소 힙이 되도록 만들어준다.
