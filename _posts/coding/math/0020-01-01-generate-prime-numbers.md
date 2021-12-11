---
layout: post
title: "소수 (Prime Number) 를 구하는 함수"
updated: 2021-12-11
tags: [coding,math]
---

## 소수 구하는 로직

가장 유명한 방법은 [에라토스테네스의 체](https://namu.wiki/w/%EC%97%90%EB%9D%BC%ED%86%A0%EC%8A%A4%ED%85%8C%EB%84%A4%EC%8A%A4%EC%9D%98%20%EC%B2%B4) 알고리즘이다. 아래와 같은 방식으로 구하면 된다.

```pseudo
2 는 소수이므로, 2의 배수를 모두 지운다.
다음 소수 (즉 3) 를 찾고, 그 배수를 모두 지운다.
다음 소수 (즉 5) 를 찾고, 그 배수를 모두 지운다.
...
```
{:.pseudo}

## 코드로 구현

n 까지의 수 중에서 소수를 찾는다고 해보자.

```javascript
var P = Array(n+1).fill(1)
P[0] = P[1] = 0

for (var i = 2; i < n/2+1; i++) {
    if (P[i]) for (var j = i*i; j <= n; j += i) P[j] = 0
}
```
{:.javascript}

P 배열은 해당 인덱스가 소수인지 아닌지를 나타낼 변수다. 0 ~ n 까지의 인덱스를 가진 배열 생성하여, 일단 모두 1 (즉 해당 인덱스가 모두 소수) 로 초기화한다. 0 과 1 은 정의상 소수가 아니므로 즉시 P[0] 과 P[1] 은 0 으로 바꾼다.

for 반복문이 핵심인데, 2 부터 n/2 까지의 수를 i 로 반복한다. (n/2 넘어서는 수는 n/2 이하의 소수의 배수를 지우는 과정에서 이미 소수인지 아닌지가 구해지므로 반복할 필요가 없다.) 만일 P[i] 가 소수라면 i*i 부터 i 의 배수들을 차례로 소수에서 제외한다.

## 2 부터 소수를 무한히 생성하는 제너레이터

위와 같은 방식은 소수를 구하려면 어디까지 구할지 n 을 상정해야 한다. 아래 코드는 n 이 주어지지 않더라도 2 부터 연속으로 계속 소수를 생성한다. 어느 [사이트](https://code.activestate.com/recipes/117119-sieve-of-eratosthenes/)에서 Python 으로 구현한 코드를 Javascript 로 옮겨보았다.

```javascript
var gen_primes = function*() {
    for (var h = new Map(), i = 2; ; i++) {
        if (h.has(i)) {
            for (var x of h.get(i)) {
                h.set(i+x, [...(h.get(i+x)||[]), x])
            }
            h.delete(i)
        } else {
            yield i
            h.set(i*i, [i])
        }
    }
}
```
{:.javascript}

이해하기에는 다소 어렵지만, 이 또한 에라토스테네스의 체 알고리즘을 사용한 방식이다. 소수가 아닌 수를 걸러내는 체로써 h 맵 자료형을 사용했다.