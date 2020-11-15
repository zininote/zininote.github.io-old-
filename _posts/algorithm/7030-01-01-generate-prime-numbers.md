---
layout: post
title: "소수를 계속 yield 하는 제너레이터 함수"
updated: 2020-11-16
tags: [algorithm,function]
---

## 소수 구하는 알고리즘

소수는 1 과 자기자신만을 약수로 가지는 수다. 이를 구하는 알고리즘 중 가장 유명한 것은 [에라토스테네스의 체](https://ko.wikipedia.org/wiki/%EC%97%90%EB%9D%BC%ED%86%A0%EC%8A%A4%ED%85%8C%EB%84%A4%EC%8A%A4%EC%9D%98_%EC%B2%B4)이다.

요약하자면, 2 부터 시작해서 그 배수를 소수 후보에서 지워나가는 방식이다. 다양한 언어로 구현된 코드들을 위 링크 안에서도 쉽게 찾을 수 있다.

## 소수를 구하는 제너레이터

위 링크들에서 확인할 수 있는 코드들은 사전에 `n` 이라는 숫자가 주어지고 이 이하의 수 중에서 소수를 찾는 코드들이다.

`n` 이라는 숫자에 구애받지 않고 처음부터 2, 3, 5, 7, 11, 13, ... 식으로 소수를 구하는 제너레이터가 없을까 했는데, 구글링해보니 [한 사이트](http://code.activestate.com/recipes/117119-sieve-of-eratosthenes/)에서 찾을 수 있었다. 변수명 정도만 살짝 바꿔 아래에 나타내봤다.

```py
# 소수를 2부터 순서대로 yield 하는 제너레이터
def gen_prime_number():
    i, sieve = 2, {}
    while True:
        if i in sieve:
            for x in sieve[i]:
                sieve.setdefault(i+x, []).append(x)
            del sieve[i]
        else:
            yield i
            sieve[i*i] = [i]
        i += 1

# 사용 예시
for n, _ in zip(gen_prime_number(), range(10)):
    print(n)        # 2, 3, 5, 7, 11, 13, 17, 19, 23, 29
```
{:.python}

`sieve` 딕셔너리에 없는 수라면 소수이기 때문에 일단 yield 하고, 그 제곱부터 `sieve` 에 넣어서 소수에서 제외시킨다. 그리고 그 소수의 배수들도 소수가 아니므로 `sieve` 에 넣는식이다. 에라토스테네스의 체 방식으로 소수를 찾아내고 있다. 

코드가 잘 이해가 되지 않는다면 2부터 시작해서 각 변수의 변화를 종이에 끄적여가면서 추적해보면 된다.