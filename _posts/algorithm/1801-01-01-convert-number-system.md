---
layout: post-algorithm
title: "math: 10 진법을 다른 진법으로 변환 함수 코드"
updated: 2020-09-04
cat: algorithm
---

## 진법

우리가 보통 사용하는 수 체계인 10 진법의 수를 다른 진법 체계로 전환하는 알고리즘을 포스팅 하고자 한다.

사실 python 에는 이런 기능을 하는 함수를 이미 제공하고 있다. `bin`, `oct`, `hex` 내장함수는 각각 2, 8, 16 진법으로 변환해준다. `numpy` 모듈의 `base_repr` 함수를 사용하면 2 ~ 36 진법으로 변환도 가능하다. 자세한 사항은 [numpy 문서](https://numpy.org/doc/stable/reference/generated/numpy.base_repr.html)를 확인해보기 바란다.

그래도 스터디 차원에서, 변환 함수를 직접 구현해보고자 한다.

## 진법 변환 알고리즘

[나무위키](https://namu.wiki/w/%EC%A7%84%EB%B2%95)를 찾아보면 변환 방법이 나오는데 생각보다 심플하다. 변환하고자하는 진법 수로 계속 나눠주면서 그 나머지를 모으면 된다.

구글링을 해보면 이 로직을 기본으로한 코드들을 쉽게 찾아볼 수 있는데, [stackoverflow 사이트](https://stackoverflow.com/questions/2267362/how-to-convert-an-integer-to-a-string-in-any-base#answer-53675480)에서 누군가가 구현한 재귀함수 코드를 살짝 바꿔서 아래에 나타냈다.

```py
# 진법 변환 함수
def to_base(n, b, d='01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'):
    return d[n%b] if n < b else to_base(n//b, b, d) + d[n%b]

print(to_base(255, 2))          # 11111111
print(to_base(255, 5))          # 2010
print(to_base(255, 8))          # 377
print(to_base(255, 16))         # FF
print(to_base(255, 25))         # A5
print(to_base(255, 32))         # 7V
print(to_base(255, 36))         # 73

# base_repr 함수 사용
import numpy as np
print(np.base_repr(255, 16))    # FF
print(np.base_repr(255, 32))    # 7V
```

0 ~ 9 는 물론 알파벳 A ~ Z 까지도 숫자로 취급하기 때문에 최대 36 진법까지 변환이 가능하다. `base_repr` 메서드와도 비교해보기 바란다.
