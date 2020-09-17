---
layout: post-programmers
title: "LV3: 길 찾기 게임"
updated: 2020-09-17
cat: programmers
---

## 문제

[프로그래머스, 길 찾기 게임](https://programmers.co.kr/learn/courses/30/lessons/42892?language=python3)

해결해야 할 것은 크게 두가지로 보인다. 첫째는 주어지는 좌표대로 binary tree 구조를 만들어내는 것이고, 둘째는 binary tree 를 preorder 와 postorder 순으로 탐색을 하는 것이다.

tree 를 만들기 위해 재귀함수를 사용하기로 했다. 간단히 말하자면, 가장 높은 정점에 있는 좌표를 tree 의 루트로 삼은 뒤, 재귀함수에 남은 좌표들과 tree 를 인수로 넘겨서 호출한다. 그리고 tree 의 x 좌표보다 작은 것을 좌측으로 큰 것들을 우측으로 구분한 다음, 이 들중에서 가장 높은 정점에 있는 좌표를 왼/오른쪽 노드로 삼아서 다시 재귀호출하는 구조다. 남은 좌표가 없어질 때까지 계속 한다.

그리고 binary tree 탐색하는 방법에 대해서는 [다른 포스팅](https://zininote.github.io/posts/binary-tree-traversals)에 소개했으니 참고해보기 바란다.

## 풀이

```py
import sys
sys.setrecursionlimit(10000)

# 1
class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

def solution(nodeinfo):
    # 2
    info = sorted(({'i': i, 'x': x, 'y': y} for i, (x, y) in enumerate(nodeinfo, 1)), key=lambda e: -e['y'])
    
    # 3
    def fn(node, info):
        # 3-1
        l_info, r_info = [], []
        for e in info:
            l_info.append(e) if e['x'] < node.data['x'] else r_info.append(e)
            
        # 3-2
        if l_info:
            node.left = Node(l_info.pop(0))
            fn(node.left, l_info)           
        if r_info:
            node.right = Node(r_info.pop(0))
            fn(node.right, r_info)
    
    # 3-3
    g = Node(info.pop(0))
    fn(g, info)
    
    # 4
    a = []
    def preorder(node):
        a.append(node.data['i'])
        if node.left:
            preorder(node.left)
        if node.right:
            preorder(node.right)
    preorder(g)
    
    # 5
    b = []
    def postorder(node):
        if node.left:
            postorder(node.left)
        if node.right:
            postorder(node.right)
        b.append(node.data['i'])
    postorder(g)
    
    # 6
    return [a, b]
```

`# 1` 은 노드를 나타내는 `Node` 클래스다. 위에서 언급한 다른 포스팅에 있는 코드를 그대로 사용하였다.

`# 2` 에서는 `nodeinfo` 를 가공하여 [{'i': 인덱스, 'x': X좌표, 'y': Y좌표}, ... ] 형태의 리스트를 생성한 뒤, 이를 Y좌표 대로 내림차순 정렬을 한다. 이렇게 정렬을 해두면 자연스럽게 가장 앞에 있는 요소가 다음에 이러붙일 노드가 된다.

`# 3` 음 재귀호출을 사용하여 binary tree 구조를 생성해주는 함수다. 먼저 재귀함수가 다소 사용되기에 미리 `sys.setrecursionlimit` 함수로 재귀호출허용범위를 크게 늘려두었다.

먼저 `# 3-3` 코드를 보면 루트 노드를 생성하여 `g` 에 담아두었다. 또한 미리 `infos` 를 Y좌표 내림차순으로 정렬해뒀기에 가장 앞에 있는 요소를 pop 하기만 하면 된다.

`# 3-1` 은 넘겨받은 `info` 리스트를 X좌표를 기준으로 좌/우 분리한다.

`# 3-2` 는 좌/우 분리된 리스트가 있다면 그 중 제일 앞요소를 left 혹은 right 에 새로운 노드를 생성한다. 이 역시 제일 앞 요소가 Y좌표가 가장 큰 수가 되므로, 제일 앞 요소를 pop 하여 생성한다.

`# 4`, `# 5` 코드는 각각 위 다른 포스팅 링크의 `preorder`, `postorder` 함수를 이 문제에 맞도록 변형한 것들이다.

`# 6` 에서는 각 방식대로 `g` 를 탐색한 값들을 문제에서 요구하는 형식대로 최종리턴한다.
