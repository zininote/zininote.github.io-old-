---
layout: post
title: "1. Two Sum"
updated: 2021-12-20
tags: [leetcode,array,hashtable]
---

## 문제

[https://leetcode.com/problems/two-sum/](https://leetcode.com/problems/two-sum/)

정수들을 요소로 가진 nums 배열과, target 정수가 주어질 때, 합이 target 이 되는 두 요소의 인덱스를 리턴하는 문제다.

반드시 합이 target 이 되는 유일한 한 쌍이 존재한다고 한다.

## Brute Force

```python
def twoSum(self, nums: List[int], target: int) -> List[int]:
    for i, x in enumerate(nums[:-1]):
        for j, y in enumerate(nums[i+1:], i+1):
            if x+y == target: return [i, j]
```
{:.python}

이중루프를 사용하여 시간복잡도는 O(n^2) 이다. 시간은 3796 ms 였다.

## Hash Table

```python
def twoSum(self, nums: List[int], target: int) -> List[int]:
    h = {}
    for i, x in enumerate(nums):
        y = target-x
        if y in h: return [h[y], i]
        h[x] = i
```
{:.python}

h 딕셔너리를 Hash Table 저장소로 상정하였다. 루프 순회할 때 `{값: 인덱스}` 형태로 저장해두는 용도다.

반드시 합이 target 이 되는 유일한 쌍이 존재하므로, 순회 중에 그 케이스가 나오게 되며 이를 리턴한다.

단일루프이므로 시간복잡도는 O(n) 이다. 시간은 60 ms 였다.
