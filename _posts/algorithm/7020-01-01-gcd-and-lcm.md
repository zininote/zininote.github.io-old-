---
layout: post
title: "최대공약수(gcd)와 최소공배수(lcm) 구하는 함수"
updated: 2020-11-10
tags: [algorithm,function]
---

## gcd 와 lcm

gcd 는 최대공약수를, lcm 은 최소공배수를 각각 영어 약자로 나타낸 단어다. gcd 와 lcm 이 무엇인지는 다들 알고있을 거라 생각하지만, 가물가물한 분들은 정확한 기억의 환기를 위해 나무위키의 [최대공약수](https://namu.wiki/w/%EC%B5%9C%EB%8C%80%EA%B3%B5%EC%95%BD%EC%88%98), [최소공배수](https://namu.wiki/w/%EC%B5%9C%EC%86%8C%EA%B3%B5%EB%B0%B0%EC%88%98) 부분을 참고해보자.

## x, y 의 gcd 함수

어떤 두 자연수 x, y 가 있을 때, 이 두 수의 gcd 를 구하는 가장 유명한 알고리즘은 [유클리드 호제법](https://namu.wiki/w/%EC%9C%A0%ED%81%B4%EB%A6%AC%EB%93%9C%20%ED%98%B8%EC%A0%9C%EB%B2%95)이다. 링크 안에 있는 호제법 내용을 간략하게 요약하면 아래와 같다.

- x, y (단, x > y) 의 gcd 는 y, x%y 의 gcd 와 같다.
- x%y 가 0 일 때, gcd 는 y 가 된다.

호제법의 증명은 링크 내용을 참고하면 되므로, 여기서는 바로 코드로 옮겨보자.

```python
# 재귀호출 방식 gcd 함수
def gcd(x, y):
    return gcd(y, x%y) if x%y else y

# 반복 방식 gcd 함수
def gcd(x, y):
    while(x%y): x, y = y, x%y
    return y

# 사용 예시
print(gcd(16, 24))    # 8
```
{:.python}

재귀호출을 사용한 방식과 단순 반복문을 사용한 방식 두가지로 나타낼 수 있다.

참고할 점이 있는데, 호제법 설명에선 x > y 라는 단서를 달았지만, 코드 내부에서는 이에 대한 고려가 전혀 없다.

이유는 간단하다. 만일 x < y 라면 `x, y = y, x%y` 의 결과는 두 수를 바꾸는 결과가 되기 때문이다. 결국에는 x > y 가 되기에 굳이 고려할 필요가 없는 것이다. (위 코드예시도 16 < 24 이지만 결과를 제대로 출력한다.)

## x, y 의 lcm 함수

위 최소공배수 링크 안 내용을 보면, gcd 를 알고있다는 가정 하에 아래와 같이 구할 수 있다.

- x, y 의 lcm 은 x*y // gcd(x, y)

바로 코드로 옮겨보자. gcd 함수를 사용하기 때문에 사전에 gcd 함수가 정의되어 있어야 한다.

```python
# gcd 함수 생략

# lcm 함수
def lcm(x, y):
    return x*y // gcd(x, y)
    
# 사용 예시
print(lcm(16, 24))    # 48
```
{:.python}

## 3개수 이상의 gcd, lcm 구하는 법

위에서는 2개의 자연수 x, y 의 gcd, lcm 을 구하였다. 때에 따라서는 3개수 이상의 수에 대해 gcd, lcm 구할 필요도 있는데, 어렵지 않다.

예를들어, a, b, c, d 라는 자연수가 있다고 해보다. 먼저 a, b 의 gcd 를 구한다. 그리고 이 결과와 c 의 gcd 를 구한다. 다시 이 결과와 d 의 gcd 를 구하면 된다. `gcd(gcd(gcd(a, b), c), d)` 와 같은 형태다. lcm 또한 이렇게 구하면 된다.

```python
var nums = [12, 60, 42, 18];

var x = nums[0];
for(var y of nums.slice(1,)) {
    x = gcd(x, y);
}
console.log(x);    // 6
```
{:.python}

`x` 에 `nums` 배열의 첫 요소를 할당한 뒤, 2번째 요소부터 반복하면서 계속 gcd 를 계산하는 방식이다.

## Python 의 gcd, lcm

Javascript 는 gcd, lcm 함수를 기본으로 제공하고 있지는 않다. 외부 모듈을 구하거나 구현해서 사용해야 한다.

Python 은 math 모듈에선 gcd 함수를, numpy 모듈에선 gcd, lcm 함수를 모두 제공한다. 개인적으로는 두개 함수 모두 지원하며, 3개수 이상의 경우도 계산이 가능한 numpy 모듈의 함수를 선호한다. 아래는 numpy 모듈 사용 예시이다.

```python
import numpy as np

nums = [12, 60, 42, 18]

print(np.gcd(60, 18))    # 6
print(np.lcm(60, 18))    # 180

print(np.gcd.reduce([12, 60, 42, 18]))    # 6
print(np.lcm.reduce([12, 60, 42, 18]))    # 1200
```
{:.python}

numpy 모듈의 더 자세한 gcd, lcm 함수에 대해서는 [NumPy 공식문서](https://numpy.org/doc/stable/reference/generated/numpy.gcd.html)를 참고하자.