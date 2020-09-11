---
layout: post-algorithm
title: "dynamic programming: 점화식과 재귀함수와 동적계획법 개념 정리"
updated: 2020-09-11
cat: algorithm
---

## 점화식

고등학교 수학 시간때 배웠던 점화식... 이란 것이 있다. 어떤 수열을 표현할 때, 초기값 및 일반항의 관계로 표현하는 방식이다. 잘 알려져 있는 피보나치 수열을 점화식으로 표현하면 아래와 같다.

- 초기값: fib(0) = 0, fib(1) = 1
- 일반항: fib(n) = fib(n-2) + fib(n-1)

그리고 구글링 해보면 점화식은 재귀함수로 쉽게 코딩할 수 있다고 한다.

## 재귀함수로 피보나치 수열 코딩

```py
def fib(n):
    fib.counter += 1

    if n <= 1:
        return n
    else:
        return fib(n-2) + fib(n-1)
```

위 함수에서 `fib.counter += 1` 코드는 함수 호출 횟수를 알아보기 위한 코드다. 그 아래는 위에서 언급한 피보나치 수열의 점화식 초기값과 일반항을 나타낸다. 아래와 같이 실행해보자.

```py
fib.counter = 0                 # 호출횟수 초기화
print(fib(20), fib.counter)     # 6765 21891
```

믿기 어렵지만 21891 번 함수가 호출되었다. 이유는 간단한데, fib(20) 을 구하려면 fib(18) 과 fib(19) 를 알아야 한다. 앞에 있는 fib(18) 을 재귀호출로 신나게 구했다고 하더라도 fib(19) 구할 땐 또 fib(18) 을 알아야한다. 다시 무식하게 재귀호출로 구한다. 즉 전에 했던 계산을 또 해야하니 함수호출이 많을 수밖에 없다.

## 동적계획법과 메모이제이션

이제 동적계획법 (Dynamic Programming) 에 대해 이야기를 해보자. 구글링 등으로 찾아보면 보다 큰 문제를 해결하기 위해, 문제를 보다 작은 문제로 나눠서 해결하는 기법을 의미한다고 한다. 하지만 이 개념은 너무 추상적이라 오히려 이해하기 더 어렵다.

[나무위키](https://namu.wiki/w/%EB%8F%99%EC%A0%81%20%EA%B3%84%ED%9A%8D%EB%B2%95?from=%EB%8F%99%EC%A0%81%EA%B3%84%ED%9A%8D%EB%B2%95)에서 동적계획법을 찾아보면 "개요" 부분에 재밌는 표현이 있다. **동적계획법은 기억하며 풀기**라고 보는 시각이다. 이 표현을 봤을 때 동적계획법의 대략적인 의미가 바로 이해됐다. 오히려 [메모이제이션](https://namu.wiki/w/%EB%A9%94%EB%AA%A8%EC%9D%B4%EC%A0%9C%EC%9D%B4%EC%85%98)에 가까운 것이 동적계획법인 것이다.

기억하며 풀기가 무엇인지 위 피보나치 함수에 적용해보자. 간단히 표현하자면 전에 했던 계산을 별도로 기억해두면서 재귀호출하는 방식이다.

```py
def fib(n, m={}):
    fib.counter += 1

    if n not in m:
        if n <= 1:
            m[n] = n
        else:
            m[n] = fib(n-2, m) + fib(n-1, m)

    return m[n]
```

원코드와 다르게 `m` 이라는 딕셔너리 자료형을 도입하였다. 기억하기 위한 저장소 역할을 한다. 코드를 보면 `m` 안에 이미 계산된 fib(n) 이 없는 경우에만 재귀호출을 하는 구조다.

```py
fib.counter = 0                 # 호출횟수 초기화
print(fib(20), fib.counter)     # 6765 39
```

실행한 결과를 보면, 호출횟수가 상당히 줄어들었음을 알 수 있다.

## functools 모듈의 lru_cache 데코레이터 사용

`lru_cache` 데코레이터를 사용하면 원코드를 수정할 필요없이 메모이제이션을 할 수 있다. 아마 함수의 입력값과 리턴값을 저장하는 듯 하다.

```py
from functools import lru_cache

@lru_cache
def fib(n):
    fib.counter += 1

    if n <= 1:
        return n
    else:
        return fib(n-2) + fib(n-1)
```

`functools` 모듈의 `lru_cache` 를 import 한 뒤, `fib` 함수 위에 데코레이터를 사용하였다.

```py
fib.counter = 0                 # 호출횟수 초기화
print(fib(20), fib.counter)     # 6765 21
```

원코드임에도 함수 호출횟수는 21 번으로 많이 줄었다.

## 반복문으로 해결

재귀호출 코드는 상당부분 반복문으로 해결할 수 있다고 한다. 피보나치 수열도 재귀호출 말고 반복문으로 구현할 수 있다.

```py
def fib(n, m={}):
    fib.counter += 1

    m[0] = 0
    m[1] = 1
    for i in range(2, n+1):
        m[i] = m[i-2] + m[i-1]

    return m[n]
```

```py
fib.counter = 0                 # 호출횟수 초기화
print(fib(20), fib.counter)     # 6765 1
```

당연히 함수호출 횟수는 1 이 된다.

## 참고

참고로 동적계획법이 잘 소개가 되었다고 느낀 [블로그 사이트](https://velog.io/@polynomeer/%EB%8F%99%EC%A0%81-%EA%B3%84%ED%9A%8D%EB%B2%95Dynamic-Programming) 내용을 보면 메모이제이션을 활용한 것이 Top-Down 방식의 동적계획법이고, 반복문만을 사용한 것이 Bottom-Up 방식의 동적계획법이라고 설명하고 있다.

개인적으로는 동적계획법은 그냥 점화식 형태의 재귀호출을 좀 더 효율적으로 구현하기 위한 기억하며 풀기로 느껴졌다.
