---
layout: post
title: "70. Climbing Stairs"
updated: 2021-12-22
tags: [leetcode,design,dynamic_programming,memoization]
---

## 문제

[https://leetcode.com/problems/climbing-stairs/](https://leetcode.com/problems/climbing-stairs/)

1 또는 2 계단씩 오르기를 할 때, n 계단을 오를 수 있은 방법의 가짓수를 구하는 문제다.

## Recursive

```python
def climbStairs(self, n: int) -> int:
        
    def fn(n):
        return n if n <= 2 else fn(n-2)+fn(n-1)
        
    return fn(n)
```
{:.python}

n 개의 계단이 있다고 하면, n-2 개의 계단까지 오른 뒤 2 계단을 오르는 방법과, n-1 개의 계단을 오른 뒤 1 계단을 오르는 방법이 있다.

아래와 같은 점화식으로 나타낼 수 있는데, [피보나치 수열](https://namu.wiki/w/%ED%94%BC%EB%B3%B4%EB%82%98%EC%B9%98%20%EC%88%98%EC%97%B4)과 유사하다.

```pseudo
# n 계단을 오르는 가짓수 fn(n)

fn(1) = 1, fn(2) = 2         # Initial Values
fn(n) = fn(n-2) + fn(n-1)    # Recurrence Equation
```

이를 내부의 fn 재귀함수로 구현하였다.

이 방식은 n 이 커질수록 기하급수적으로 재귀호출 횟수가 증가하기에 시간초과로 문제를 통과할 수 없었다.

## Memoization

```python
def climbStairs(self, n: int) -> int:
        
    def memoize(f):
        h = {}
        def wrapper(n):
            if n not in h: h[n] = f(n)
            return h[n]
        return wrapper
        
    @memoize
    def fn(n):
        return n if n <= 2 else fn(n-2)+fn(n-1)
        
    return fn(n)
```
{:.python}

Python 의 데코레이션 문법을 사용하여 Memoization 을 구현했다.

h 딕셔너리를 fn 함수의 결과 저장소로 활용하여, 이미 구한 fn(n) 이 있으면 그 깂을 사용하기에, 과도한 재귀호출을 방지할 수 있다.

시간은 28 ms 였다.

## Dynamic Programming

```python
def climbStairs(self, n: int) -> int:
    a = [None, 1, 2]
        
    for i in range(3, n+1):
        a += [a[i-2]+a[i-1]]
            
    return a[n]
```
{:.python}

위에서 언급한대로 이 문제는 점화식으로 나타낼 수 있기에, Dynamic Programming 으로 풀어낼 수 있다. (사실 위 Recursive 방식도 Dynamic Programming 이기는 하다.)

시간은 28 ms 였다.
