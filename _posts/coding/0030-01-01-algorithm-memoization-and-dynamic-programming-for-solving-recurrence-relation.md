---
layout: post
title: "점화식 문제를 해결하는 메모이제이션과 다이나믹 프로그래밍"
updated: 2021-01-03
tags: [coding,algorithm]
---

## 점화식

고등학교 수학에서 다루는 [점화식](https://namu.wiki/w/%EC%A0%90%ED%99%94%EC%8B%9D) (Rcurrence Relation) 은 수열과 같은 관계를 초기값 (Initial Value) 와 일반항 (Recurrence Equation) 으로 나타내어 문제를 해결하는 방식이다.

어떤 문제를 점화식으로 나타낼 수 있을 때, 프로그래밍에서는 메모이제이션 또는 다이나믹 프로그래밍 방법으로 해결하고는 한다.

## 피보나치 수열

Leetcode 의 [509. Fibonacci Number](https://leetcode.com/problems/fibonacci-number/) 문제는 점화식으로 표현할 수 있는 가장 대표적인 문제다.

[피보나치 수열](https://namu.wiki/w/%ED%94%BC%EB%B3%B4%EB%82%98%EC%B9%98%20%EC%88%98%EC%97%B4)을 구하는 f 함수의 초기값과 일반항은 아래와 같다.

```pseudo
f(0) = 0, f(1) = 1        # Initial Value
f(n) = f(n-2) + f(n-1)    # Recurrence Equation
```
{:.pseudo}

어떤 숫자 n 에 대해 f(n) 을 구하는 위 문제는 아래와 같이 풀 수 있다.

```python
def fib(self, n: int) -> int:
    def f(n):
        return n if n < 2 else f(n-2) + f(n-1)
    return f(n)
```
{:.python}

재귀함수로 구현하였다. f 함수 안의 return 구문은 위 점화식을 글자 그대로 옮겨놓은 형태다.

## 메모이제이션

하지만 위 함수는 매우 비효율적이다. 예를들어 f(20) 을 구한다고 한다면, f(18) + f(19) 를 구해야 한다. 앞에 있는 f(18) 을 구했더라도, f(19) 를 구할 땐, f(19) = f(17) + f(18) 이므로, f(18) 을 또 구해야 한다.

즉 이미 한번 계산했던 것을 또 계산해야하므로 n 이 커질수록 기하급수적으로 계산횟수가 증가하게 된다.

이와 같은 비효율을 보완하기 위한 것이 [메모이제이션](https://namu.wiki/w/%EB%A9%94%EB%AA%A8%EC%9D%B4%EC%A0%9C%EC%9D%B4%EC%85%98)이다. 한번 구한 계산은 기억해두고 있다가, 다시 사용하는 방식이다.

```python
def fib(self, n: int) -> int:
    def f(n, h=None):
        if h is None: h = {}
        
        if n not in h:
            h[n] = n if n < 2 else f(n-2, h) + f(n-1, h)
        return h[n]
    
    return f(n)
```
{:.python}

h 딕셔너리를 일종의 기억장소로 사용하여, 한번 계산한 f(n) 값을 저장해 둔다. 실제로 Leetcode 의 풀이 시간을 원래 풀이와 비교하면 10 배 이상 빠른 것을 볼 수 있었다.

## 다이나믹 프로그래밍

사실 위 메모이제이션도 넓은 의미에서는 다이나믹 프로그래밍에 해당된다. 여기서는 f(n) 을 구하기 위해, 낮은 숫자로부터 차곡차곡 결과를 쌓아하가는 다이나믹 프로그래밍을 구현해볼 것이다.

```python
def fib(self, n: int) -> int:
    if n < 2: return n

    f = [0]*(n+1); f[1] = 1

    for i in range(2, n+1):
        f[i] = f[i-2] + f[i-1]

    return f[n]
```
{:.python}

f 를 함수 대신 리스트로 나타냈다. for 반복문으로 낮은 단계부터 차곡차곡 계산해 나간다.

## Python 과 메모이제이션

Python 의 functools 모듈에는 lru_cache 함수가 있는데, 이를 사용하면 메모이제이션을 편리하게 구현할 수 있다.

```python
def fib(self, n: int) -> int:
    from functools import lru_cache

    @lru_cache
    def f(n):
        return n if n < 2 else f(n-2) + f(n-1)

    return f(n)
```
{:.python}

Python 의 데코레이션 문법을 사용하도록 고안되어있다.
