---
layout: post
title: "GCD (최대공약수) 와 LCM (최소공배수) 을 구하는 함수"
updated: 2021-10-07
tags: [coding,math]
---

## gcd (최대공약수), lcm (최소공배수) 구하는 로직

gcd 는 [유클리드 호제법](https://namu.wiki/w/%EC%9C%A0%ED%81%B4%EB%A6%AC%EB%93%9C%20%ED%98%B8%EC%A0%9C%EB%B2%95)으로 구할 수 있다. 요약하면 아래와 같다.

```pseudo
x > y 인 두 자연수 x, y 가 있을 때, gcd(x, y) == g(y, x%y)
어느 한쪽이 0 이라면, gcd(x, 0) == x
```
{:.pseudo}

lcm 은 나무위키의 [최대공약수](https://namu.wiki/w/%EC%B5%9C%EB%8C%80%EA%B3%B5%EC%95%BD%EC%88%98)를 보면 아래와 같은 관계식을 찾을 수 있는데, 이를 이용하면 구할 수 있다.

```pseudo
x * y == gcd(x, y) * lcm(x, y)
```
{:.pseudo}

## gcd, lcm 코드

```python
def gcd(x, y): return gcd(y, x%y) if y else x
def lcm(x, y): return x*y // gcd(x, y)
```
{:.python}

참고로 위에서 호제법을 언급하면서, x > y 라는 단서를 달았지만, 코드 내부에는 이에 대한 판별식이 전혀 없다. 만일 x < y 라면 x%y == x 가 되는데, 첫 재귀호출의 결과는 두 수를 바꾸는 것이 된다. 그래서 곧바로 x > y 가 되기 때문에 굳이 판별식을 넣을 필요가 없다.

## 3 개 이상 수들의 gcd, lcm 코드

예를들어, 자연수 a, b, c, d 의 gcd (혹은 lcm) 을 구한다고 해보자. 먼저, a 와 b 의 gcd (혹은 lcm) 를 구하고, 이 결과와 c 의 gcd (혹은 lcm) 을 구하고, 다시 이 결과와 d 의 gcd (혹은 lcm) 를 구하면 된다.

```python
from functools import reduce

print(reduce(gcd, [36, 16, 120, 80]))    # 4
print(reduce(lcm, [36, 16, 120, 80]))    # 720
```
{:.python}

functools 모듈의 reduce 함수를 사용하여 계산해 보았다.

## 빌트인 함수

Python 3.9 부터는 math 모듈에서 2 개는 물론 3 개 이상 수들의 gcd, lcm 을 지원을 한다. [Python 공식문서](https://docs.python.org/ko/3.9/library/math.html)를 참고해보자.