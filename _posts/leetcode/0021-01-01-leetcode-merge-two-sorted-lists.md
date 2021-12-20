---
layout: post
title: "21. Merge Two Sorted Lists"
updated: 2021-12-21
tags: [leetcode,graph,linkedlist]
---

## 문제

[https://leetcode.com/problems/merge-two-sorted-lists/](https://leetcode.com/problems/merge-two-sorted-lists/)

각각 오름차순으로 정렬된 연결리스트 두개가 주어지면, 오름차순을 유지한 채 하나의 연결리스트로 만들어 리턴하는 문제다.

## Recursive

```python
def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    if list1 and list2:
        if list1.val < list2.val:
            list1.next = self.mergeTwoLists(list1.next, list2)
            return list1
        else:
            list2.next = self.mergeTwoLists(list1, list2.next)
            return list2
    else:
        return list1 or list2
```
{:.python}

두 리스크가 끝이 아니라면 값을 비교해서 보다 작은 노드 쪽을 재귀호출로 연결하고 리턴하는 구조다.

시간은 36 ms 였다.

## Iterative

```python
def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    head = n = ListNode()

    while list1 and list2:
        if list1.val < list2.val:
            n.next, n, list1 = list1, list1, list1.next
        else:
            n.next, n, list2 = list2, list2, list2.next

    n.next = list1 or list2

    return head.next
```
{:.python}

재귀호출이 아닌 반복문 방식의 풀이다. 노드를 가리키는 n 을 계속 전진시키면서 보다 작은 노드를 계속 연결해간다.

시간은 36 ms 였다.
