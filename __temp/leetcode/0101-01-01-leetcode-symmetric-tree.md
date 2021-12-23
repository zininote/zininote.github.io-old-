---
layout: post
title: "101. Symmetric Tree"
updated: 2021-12-22
tags: [leetcode,graph,binary_tree,depth_first_search,breadth_first_search]
---

## 문제

[https://leetcode.com/problems/symmetric-tree/](https://leetcode.com/problems/symmetric-tree/)

이진 트리가 좌우 대칭인지를 판별하는 문제다.

## Depth First Search Recursive

```python
def isSymmetric(self, root: Optional[TreeNode]) -> bool:

    def fn(L, R):
        if L and R:
            if L.val == R.val:
                return fn(L.left, R.right) and fn(L.right, R.left)
            else:
                return False
        elif L or R:
            return False
        else:
            return True

    return fn(root.left, root.right)
```
{:.python}

내부에 재귀호출 방식의 fn 함수가 있다. L, R 두 노드를 받아서, 대칭 여부를 조사하여, 비대칭이 발견될 때면 즉시 False 를 리턴하는 구조다.

시간은 32 ms 였다.

## Depth First Search Iterative

```python
def isSymmetric(self, root: Optional[TreeNode]) -> bool:
    stack = [(root.left, root.right)]

    while stack:
        L, R = stack.pop()

        if L and R:
            if L.val == R.val:
                stack.append((L.left, R.right))
                stack.append((L.right, R.left))
            else:
                return False
        elif L or R:
            return False

    return True
```
{:.python}

재귀호출 대신 Stack 을 사용한 반복문으로 구현했다.

시간은 36ms 였다.

## Breadth First Search

위 Depth First Search Iterative 의 while 반복문에서, `L, R = stack.pop()` 구문을 `L, R = stack.pop(0)` 으로 바꾸기만 하면 된다. (물론 이 때는 관행적으로 stack 이라는 변수명 대신 queue 를 사용한다.)

시간은 32ms 였다.