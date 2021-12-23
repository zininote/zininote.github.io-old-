---
layout: post
title: "104. Maximum Depth of Binary Tree"
updated: 2021-12-22
tags: [leetcode,graph,binary_tree,depth_first_search,breadth_first_search]
---

## 문제

[https://leetcode.com/problems/maximum-depth-of-binary-tree/](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

주어지는 이진트리의 최대 깊이를 찾아서 리턴하는 문제다.

## Depth First Search Recursive

```python
def maxDepth(self, root: Optional[TreeNode]) -> int:
    return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right)) if root else 0
```
{:.python}

매우 간단한 형태로 축약되어 있다. 노드가 살아있다면 1 에 자식 노들들의 최대깊이를 더하는 재귀호출로 구현하였다.

시간은 40 ms 였다.

## Depth First Search Iterative

```python
def maxDepth(self, root: Optional[TreeNode]) -> int:
    if not root: return 0

    stack = [(root, 1)]
    maxd = 0

    while stack:
        n, d = stack.pop()
        maxd = max(maxd, d)

        if n:
            if n.left: stack.append((n.left, d+1))
            if n.right: stack.append((n.right, d+1))

    return maxd
```
{:.python}

재귀호출 대신 반복문으로 Depth First Search 를 구현하였다.

시간은 44 ms 였다.

## Breadth First Search

Depth First Search Iterative 풀이에서 `n, d = stack.pop()` 을 `n, d = stack.pop(0)` 으로 바꾸기만 하면 된다. (물론 LIFO 가 아닌 FIFO 가 되기에 관행적으로 stack 대신 queue 라는 이름을 사용한다.)

시간은 44 ms 였다.