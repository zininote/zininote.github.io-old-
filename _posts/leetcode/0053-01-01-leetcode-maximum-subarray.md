---
layout: post
title: "53. Maximum Subarray"
updated: 2021-12-21
tags: [leetcode,design,dynamic_programming,divide_and_conquer]
---

## 문제

[https://leetcode.com/problems/maximum-subarray/description/](https://leetcode.com/problems/maximum-subarray/description/)

주어지는 nums 배열에서, 연속된 수들로 부분합을 구했을 때, 가장 큰 값을 리턴하는 문제다.

## Brute Force

```python
def maxSubArray(self, nums: List[int]) -> int:
    subs = []
    for i in range(len(nums)):
        tmp = []
        for x in nums[i:]:
            tmp += [(tmp[-1] if tmp else 0) + x]
        subs += [max(tmp)]
    
    return max(subs)
```
{:.python}

이중루프로 구현했다. 첫번째 루프에서 부분합을 구할 시작인덱스 i 를 정하면, 두번째 루프에서 i 인덱스 이후를 순회하면서 나올 수 있는 부분합을 모두 구한 뒤, 가장 큰 값을 저장해둔다.

마지막에는 각 i 인덱스로부터의 부분합들 중 가장 큰 값을 리턴하는 구조다.

이 방식은 시간초과로 문제를 통과할 수 없었다.

## Dynamic Programming (Kadane's Algorithm)

```python
def maxSubArray(self, nums: List[int]) -> int:
    subs = []

    for i, x in enumerate(nums):
        if i == 0:
            subs += [nums[0]]
        else:
            subs += [max(nums[i], subs[i-1]+nums[i])]

    return max(subs)
```
{:.python}

점화식으로 나타낼 수 있는 풀이는 Dynamic Programming 알고리즘을 적용하기가 쉽다. 이 문제의 점화식은 아래와 같다.

```pseudo
# subs[i] 는 nums 배열의 인덱스 i 까지의 최대부분합

subs[0] = nums[0]                            # Initial Value
subs[i] = max(nums[i], subs[i-1]+nums[i])    # Recurrence Equation
```
{:.pseudo}

Brute Force 풀이에서는 i 부터의 최대값을 구하는 것에 반해, Kadane's Algorithm 에서는 i 까지의 부분합을 구하는 방식이다.

i 의 부분합이 최대가 되려면, i-1 까지의 최대값에 nums[i] 를 더한것이 최대가 되는지 아닌지만 알면 되기에 위와 같은 점화식이 구현된다.

시간은 792 ms 였다.

## Divide and Conquer

```python
def maxSubArray(self, nums: List[int]) -> int:

    def fn(A):
        if len(A) == 1: return A[0], A[0], A[0], A[0]

        m = len(A)//2
        ll, lm, lr, lt = fn(A[:m])
        rl, rm, rr, rt = fn(A[m:])

        return max(ll, lt+rl), max(lm, lr+rl, rm), max(lr+rt, rr), lt+rt

    return fn(nums)[1]
```
{:.python}

nums 를 계속 둘로 쪼개고 난 뒤, 쪼개진 부분배열들을 다시 조립할 때 최대부분합을 계속 갱신해가는 구조다. 아래와 같이 이해할 수 있다.

```pseudo
# 두 배열 L, R 이 있을 때, 두 배열을 이은 상태에서 부분합의 최대 (maxsub) 는
# 아래와 같이 기존 L 의 maxsub (lm), 기존 R 의 maxsub (rm), L 과 R 을 이어붙였을 때의 maxsub (lr+rl) 중 최대값이 됨

L                       R
|                       |
ṿ                       ṿ
[x1, x2, x3, ... , xm], [y1, y2, y3, ... , yn]
   |                |    |              |
   V        lr <----+    +----> rl      ṿ
   lm        \                   \      rm - # R 배열의 maxsub
    \         \                   \
     \         \                   # R 배열의 가장 왼쪽에서부터의 maxsub
      \         \
       \         # L 배열의 가장 오른쪽에서부터의 maxsub
        \        
         # L 배열의 maxsub (lm)
         
# L+R maxsub 은 L 의 가장 오른쪽 값 (xm) 이 포함된 상태에서의 maxsub 인 lr 과,
# R 의 가장 왼쪽 값인 y1 이 포함된 상태에서의 maxsub 인 rl 의 값을 알아야 함
```
{:.pseudo}

```pseudo
# 두 배열이 있을 때, 가장 오른쪽 값이 포함된 상태에서의 maxsub 은
# 아래와 같이 기존 R 의 오른쪽으로부터의 maxsub (rr), L 과 R 을 이어붙였을 때의 오른쪽으로부터의 maxsub (lr+rt) 중 최대값이 됨

L                       R
|                       |
ṿ                       ṿ
[x1, x2, x3, ... , xm], [y1, y2, y3, ... , yn]
                    |    |                  |
                    |    |          rr <----+
                    |    |           \
                    |    |            # R 배열의 가장 오른쪽에서부터의 maxsub
                    |    |            
                    |    |                  |
            lr <----+    +------- rt -------+
                                   \
                                    # R 배열의 전체합

# L+R 의 오른쪽에서부터의 maxsub 은 R 의 전체합인 rt 와 R 의 오른쪽에서부터의 maxsub 인 rr 을 추가로 알아야 함
```
{:.pseudo}

```pseudo
# 두 배열이 있을 때, 가장 왼쪽 값이 포함된 상태에서의 maxsub 은
# 아래와 같이 기존 L 의 왼쪽으로부터의 maxsub (ll), L 과 R 을 이어붙였을 때의 왼쪽으로부터의 maxsub (lt+rl) 중 최대값이 됨

L                       R
|                       |
ṿ                       ṿ
[x1, x2, x3, ... , xm], [y1, y2, y3, ... , yn]
 |                  |    |
 +----> ll          |    |
         \
 |        # L 배열의 가장 왼쪽에서부터의 maxsub
 |                              
 |                  |    |                  
 +------- lt -------+    +----> rl
           \
            # L 배열의 전체합

# L+R 의 왼쪽에서부터의 maxsub 은 L 의 전체합인 lt 와 L 의 왼쪽에서부터의 maxsub 인 ll 을 추가로 알아야 함
```
{:.pseudo}

위 사항들을 종합하면, 알아야 하는 정보는 어떤 배열의 `왼쪽으로부터의 maxsub, 그 배열 자체의 maxsub, 오른쪽으로부터의 maxsub, 전체합` 이 된다. 이를 Divide and Conquer 방식으로 조립해 가고, 마지막에는 최종 조립한 배열의 자체 maxsub 만을 리턴하는 구조다.

시간은 1212 ms 였다.