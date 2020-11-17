---
layout: post
title: "10진법을 다른 진법으로 변환, 다른 진법을 10진법으로 환원하는 함수"
updated: 2020-11-17
tags: [algorithm,function]
---

## 진법 변환

우리가 보통 사용하는 수 체계는 10진법 체계로, 이 체계에서 쓰이는 숫자를 10진수라고도 한다. 하지만 PC 는 보통 2진법 체계를 사용한다. 상황에따라 상호간 변환이 필요할 때가 있다.

[위키피디아](https://ko.wikipedia.org/wiki/%EA%B8%B0%EC%88%98%EB%B2%95#%EC%A7%84%EC%88%98) 링크로 들어가 아랫부분을 찾아보면 변환하는 방법이 나오는데 생각보다 심플하다.

- x 진법으로 변환: 10진수를 계속 x 로 나눠서, 나머지들을 이어붙임
- 10진법으로 환원: x 진수, 제일 뒷자리 숫자부터, (숫자*x^자릿수) 계산하여 합산

## 10진법 -> 다른 진법 변환 함수

구글링을 해보면 진볍 변환 코드 조각들을 쉽게 찾아볼 수 있는데, [stackoverflow 사이트](https://stackoverflow.com/questions/2267362/how-to-convert-an-integer-to-a-string-in-any-base#answer-53675480)에서 누군가가 구현한 재귀함수 코드를 살짝 바꿔서 아래에 나타냈다.

```py
# 진법 변환 함수
def to_base(n, b, d='01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'):
    return d[n%b] if n<b else to_base(n//b, b, d)+d[n%b]

# 사용 예시
print(to_base(255, 2))     # 11111111
print(to_base(255, 5))     # 2010
print(to_base(255, 10))    # 255
print(to_base(255, 16))    # FF
print(to_base(255, 29))    # 8N
print(to_base(255, 32))    # 7V
print(to_base(255, 36))    # 73
```
{:.python}

0 ~ 9 는 물론 알파벳 A ~ Z 까지도 숫자로 취급하기 때문에, 최대 36 진법까지 변환이 가능하다.

## 다른 진법 -> 10진법 환원 함수

```py
# 10진수 환원 함수
def from_base(n, r, d='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'):
    return sum(int(d.index(x))*r**i for i, x in enumerate(n[::-1]))

# 사용 예시
print(from_base('11111111', 2))    # 255
print(from_base('513', 7))         # 255
print(from_base('255', 10))        # 255
print(from_base('FF', 16))         # 255
print(from_base('8N', 29))         # 255
print(from_base('7V', 32))         # 255
print(from_base('73', 36))         # 255
```

문자열로 표현된 `r` 진법의 숫자 `n` 을 받아서, comprehension 표현식으로 계산을 수행, sum 함수로 합치는 방식이다.

## Python 제공 진법 변환 함수

사실 Python 에는 이런 기능을 하는 함수를 이미 제공하고 있다. bin, oct, hex 내장함수는 각각 2, 8, 16 진법으로 변환해준다. numpy 모듈의 base_repr 함수를 사용하면 위처럼 2 ~ 36 진법으로 자유로운 변환도 가능하다.

그리고 10진법으로 환원하는 함수는 내장함수인 int 를 사용하면 된다. int 의 두번째 인수에 현재의 숫자가 어느진법 수인지만 알려주면 된다.

아래는 이들의 사용 예시이다.

```py
import numpy as np

print(np.base_repr(255, 29))    # 8N
print(np.base_repr(15, 2))      # 1111

print(int('8N', 29))            # 255
print(int('1111', 2))           # 15
```
{:.python}

base_repr 함수의 자세한 사항은 [numpy 공식문서](https://numpy.org/doc/stable/reference/generated/numpy.base_repr.html)를, int 함수는 [Python 공식문서](https://docs.python.org/ko/3/library/functions.html#int)를 참고하기 바란다.


