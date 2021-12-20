---
layout: post
title: "204. Count Primes"
updated: 2021-12-20
tags: [leetcode,math]
---

## 문제

[https://leetcode.com/problems/count-primes/](https://leetcode.com/problems/count-primes/)

주어진 n 미만의 수들 중 소수 (Prime Number) 의 개수를 리턴하는 문제다.

## Sieve of Eratosthenes

```python
def countPrimes(self, n: int) -> int:
    Primes = [0, 0] + [1]*(n-2)
    for i in range(2, n//2+1):
        if Primes[i]:
            Primes[i*i:n:i] = list(0 for _ in range(i*i, n, i))

    return Primes.count(1)
```
{:.python}

소수를 구하는 가장 유명한 알고리즘인 [에라토스테네스의 체](https://namu.wiki/w/%EC%97%90%EB%9D%BC%ED%86%A0%EC%8A%A4%ED%85%8C%EB%84%A4%EC%8A%A4%EC%9D%98%20%EC%B2%B4) (Sieve of Eratosthenes) 를 사용했다.

시간은 4664 ms 였다.

## 제너레이터로 생성

```python
def countPrimes(self, n: int) -> int:
    g = primes()
    return len(list(x for x in g if x < n or g.close()))
    
def primes():
    i = 2; h = {}
    
    while 1:
        if i in h:
            for x in h[i]:
                h[i+x] = h[i+x]+[x] if (i+x) in h else [x]
            h.pop(i)
        else:
            yield i
            h[i*i] = [i]
        i += 1
```
{:.python}

제너레이터를 사용하면, n 에 관계없이 2 부터 순서대로 무한히 소수를 생성하도록 구현할 수 있다. h 딕셔너리가 소수가 아닌 수를 저장하는 역할을 한다. 이 역시 에라토스테네스의 체 알고리즘을 사용하였다.

아쉽게도 시간초과로 문제를 통과할 수 없었다.