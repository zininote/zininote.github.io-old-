---
layout: post-algorithm
title: "graph: BFS (너비우선검색) 과 DFS (깊이우선검색) 구현 코드"
updated: 2020-09-19
cat: algorithm
---

## 그래프 탐색

이 포스팅에선 그래프 구조를 탐색할 때 주로 사용하는 알고리즘인 BFS (Breadth First Search, 너비우선탐색) 와 DFS (Depth First Search, 깊이우선탐색) 의 기본코드를 올리고자 한다. 언제든지 재활용하기 위함이다. 참고로 어떤 그래프가 있을 때 BSF 와 DFS 의 탐색 순서는 [나무위키](https://namu.wiki/w/BFS) 사이트 안에 있는 그림을 참고하면 이해가 될 것이다.

이 포스팅에 있는 코드들은 주로 [이 pdf 문서](http://web.cs.unlv.edu/larmore/Courses/CSC477/bfsDfs.pdf) 와 [geeksforgeeks](https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/) 사이트를 주로 참고하였으며, 이런저런 구글링한 내용들을 바탕으로 나름대로 수정도 했다.

여기에 있는 코드들은 모두 아래 그래프를 탐색하고 있다. 0 번부터 8 번까지 모든 노드들을 일정한 규칙대로 순회한다.

![그래프](https://zininote.github.io/img/algorithm/algorithm-1201-01-01-00.svg)
{:.center}

그리고 위 그래프에 대한 자료구조는 아래 딕셔너리로 나타내기로 한다. `노드: [연결된 노드, 연결된 노드, 연결된 노드, ...]` 형식으로 되어 있다.

```python
g = {
    0: [1, 3, 7],
    1: [0, 2],
    2: [1],
    3: [0, 4, 6],
    4: [3, 5],
    5: [4],
    6: [3],
    7: [0, 8],
    8: [7],
}
```

## BFS 코드

```python
def BFS(v, g):

    # 1. 초기화
    visited = {k: False for k in g.keys()}
    queue = []
    visited[v] = True
    queue.append(v)
    while queue:
        
        # 2. 탐색한 노드 작업
        v = queue.pop(0)
        print(v)
        
        # 3. 다음 노드 탐색
        for adj in g[v]:
            if not visited[adj]:
                visited[adj] = True
                queue.append(adj)

BFS(0, g)       # 0 1 3 7 2 4 6 8 5
```

`BFS` 함수의 인수로 시작노드 와 그래프를 지정한다.

`# 1` 에서는 먼저 `visited` 와 `queue`를 생성한다. `visited` 는 노드가 탐색을 거쳤는지 여부를 `노드번호: True 혹은 False` 형태로 저장하는 딕셔너리다. 그리고 `queue` 는 queue 형태의 자료구조를 담는 리스트다. 인수로 받은 시작노드를 queue 에 담고 `visited` 에 등록 후, queue 가 빌 때까지 (즉 모든 노드 탐색을 마칠 때까지) 반복을 시작한다.

`# 2` 에서는 queue 에서 노드를 하나씩 꺼내서 하고싶은 처리를 하면 된다. 위 코드에서는 `print` 함수로 탐색한 노드번호를 화면에 출력만 했다.

`# 3` 에서는 다음으로 탐색할 노드를 queue 에 삽입한다. 현재 노드와 연결된 노드를 순회하면서 아직 방문 이력이 없다면 `visited` 에 노드를 방문했다고 표시를 하고 queue 에 삽입한다.

출력결과를 보면 이 코드가 왜 너비우선탐색인지 알 수 있다. 그리고 이는 queue 라는 자료구조의 특색때문이기도 하다.

## DFS_iterative

DFS 방식은 크게 두가지가 있다. 하나는 반복문을 사용한 iterative 방식이고, 다른 하나는 재귀호출을 사용한 recursive 방식이다. iterative 방식을 먼저 소개한다.

```python
def DFS_iterative(v, g):

    # 1. 초기화
    visited = {k: False for k in g.keys()}
    stack = []
    visited[v] = True
    stack.append(v)
    while stack:
        
        # 2. 탐색한 노드 작업
        v = stack.pop()
        print(v)
        
        # 3. 다음 노드 탐색
        for adj in g[v]:
            if not visited[adj]:
                visited[adj] = True
                stack.append(adj)

DFS_iterative(0, g)     # 0 7 8 3 6 4 5 1 2
```

위 `BFS` 함수와 비교해서 바뀐 건 사실상 한가지 뿐이다. `#2` 에서 `pop` 메서드로 노드를 추출하는 방식이 다르며, 이 때문에 탐색 순서가 달라진다. (물론 이외에도 `queue` 라는 변수명 대신 `stack` 을 사용하긴 했지만 이름을 변경한 것만으로는 코드 작동에 영향을 주지는 않는다.)

다만, 익히 DFS 를 아는 독자들은 탐색 순서가 좀 다르다고 느낄 수 있는데, 이 땐 `for adj in g[v]:` 구문을 `for adj in reversed(g[v]):` 로 바꿔보자. 그럼 출력이 0 1 2 3 4 5 6 7 8 로 나오게 된다. 어쨌든 둘 다 깊이우선탐색임에 틀림없다.

## DFS_recursive

```python
def DFS_recursive(v, g):
    def fn(v, visited):
        # 2. 탐색한 노드 작업
        print(v)
        
        # 3. 다음 노드 탐색
        for adj in g[v]:
            if not visited[adj]:
                visited[adj] = True
                fn(adj, visited)

    # 1. 초기화
    visited = {k: False for k in g.keys()}
    visited[v] = True
    fn(v, visited)

DFS_recursive(0, g)     # 0 1 2 3 4 5 6 7 8
```

`DFS_recursive` 함수 안에 재귀호출을 위한 함수가 하나 더 들어있다. 모양은 좀 달라보이지만 `# 1`, `# 2`, `# 3` 부분이 코딩되어있는 것은 같다.

재귀호출이 함수스택을 사용하는 것이기에, 스택 자료구조를 사용하는 DFS 와 같게되는 원리다.
