---
layout: post
title: "35. Search Insert Position"
updated: 2021-12-21
tags: [leetcode,array,binarysearch]
---

## 문제

[https://leetcode.com/problems/search-insert-position/](https://leetcode.com/problems/search-insert-position/)

주어진 nums 배열에서 오름차순 유지한 채 target 이 들어갈 수 있는 인덱스를 찾는 문제다.

문제에서 O(logn) 이내의 시간복잡도로 해결할 것을 요구하고 있어, 앞에서부터 순차적으로 찾는 방식은 사용할 수 없다.

## Binary Search

```python
def searchInsert(self, nums: List[int], target: int) -> int:
    i = 0; j = len(nums)
    
    while i < j:
        m = i + (j-i)//2
        if nums[m] < target: i = m+1
        else: j = m
    
    return i
```
{:.python}

[이진 탐색](https://namu.wiki/w/%EC%9D%B4%EC%A7%84%20%ED%83%90%EC%83%89) (Binary Search) 은 사전에서 단어를 찾을 때 흔히 사용하는 방식이다.

중간값 m 과 양 극단 값 i, j 가 가리키는 값을 매 반복 턴마다 비교하여 해답을 구해간다.

시간은 44 ms 였다.
