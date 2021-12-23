---
layout: post
title: "94. Binary Tree Inorder Traversal"
updated: 2021-02-22
tags: [leetcode,graph,binary_tree,depth_first_search]
---

## 문제

[https://leetcode.com/problems/binary-tree-inorder-traversal/](https://leetcode.com/problems/binary-tree-inorder-traversal/)

이진트리 노드를 탐색하는 일반적인 세가지 방법 (전위 Preorder, 중위 Inorder, 후위 Postorder) 중 중위 방식으로 탐색한 노드 순서를 리턴하는 문제다.

## Recursive

```python
def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
    path = []

    def inorder(n):
        if n:
            inorder(n.left)
            path.append(n.val)
            inorder(n.right)

    inorder(root)

    return path
```
{:.python}

재귀호출 방식으로 구현한 inorder 함수가 중위 탐색의 핵심 코드다.

시간은 32 ms 였다.

## Recursive 2

```python
def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
    return [*self.inorderTraversal(root.left), root.val, *self.inorderTraversal(root.right)] if root else []
```
{:.python}

Python 의 문법을 사용하여 매우 단순화 시킨 풀이다.

시간은 28 ms 였다.

## Iterative

```python
def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
    path = []
    stack = [(False, root)]

    while stack:
        b, n = stack.pop()

        if n:
            if b:
                path.append(n.val)
            else:
                stack.append((False, n.right))
                stack.append((True, n))
                stack.append((False, n.left))

    return path
```
{:.python}

재귀호출은 함수 Stack 을 활용하기에, Stack 을 도입하면 반복문으로도 유사하게 구현할 수 있다.

참고로 Recursive 와는 다른 차이가 있는데, 예를들어 Recursive 에서 left 를 right 보다 먼저 탐색한다면, Iterative 에서는 right 를 먼너 Stack 에 넣어야 한다. 그래야 나중에 넣어진 left 가 먼저 탐색되기 때문이다.

시간은 24 ms 였다.