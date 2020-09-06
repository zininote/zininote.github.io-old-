---
layout: post-algorithm
title: "math: 소수를 2 부터 순서대로 yield 하는 제너레이터 구현"
updated: 2020-09-07
cat: algorithm
---

## 소수 찾는 알고리즘

소수는 1 과 자기자신만을 약수로 가지는 수다. 이를 구하는 알고리즘 중 가장 유명한 것은 [에라토스테네스의 체](https://ko.wikipedia.org/wiki/%EC%97%90%EB%9D%BC%ED%86%A0%EC%8A%A4%ED%85%8C%EB%84%A4%EC%8A%A4%EC%9D%98_%EC%B2%B4)이다. 링크 안에 있는 그림을 보면 어떻게 구하는지 감이 올 것이다.

간단히 말하자면 2 부터 시작해서 그 배수를 소수 후보에서 지워나가는 방식이다. 다양한 언어로 구현된 이를 응용한 코드들을 위에서 언급한 위키피디아 링크 안에서도 쉽게 찾을 수 있다.

개인적으로도 프로그래머스의 `n` 까지의 소수 개수를 찾는 문제를 풀어보고는, [이 포스팅](https://tedblog.github.io/posts/finding-prime-number)에 정리했으니 궁금하신 독자들은 한번쯤 들러보길 바란다.

## 소수를 구하는 제너레이터

위 링크들에서 확인할 수 있는 코드들은 사전에 `n` 이라는 숫자가 주어지고 이 이하의 수 중에서 소수를 찾는 코드들이다.

`n` 이라는 숫자에 구애받지 않고 처음부터 2, 3, 5, 7, 11, 13, ... 식으로 소수를 구하는 제너레이터가 없을까 했는데, 구글링해보니 [한 사이트](http://code.activestate.com/recipes/117119-sieve-of-eratosthenes/)에서 찾을 수 있었다. 이 코드를 살짝 바꿔 아래에 나타내봤다.

```py
# 2 부터 소수를 순서대로 yield 하는 제너레이터
def gen_prime_number():
    sieve = {}
    n = 2
    while 1:
        if n not in sieve:
            yield n
            sieve[n*n] = [n]
        else:
            for e in sieve[n]:
                sieve.setdefault(n+e, []).append(e)
            del sieve[n]
        n += 1

# for 반복문으로 제너레이터 10 번 반복
for n, _ in zip(gen_prime_number(), range(10)):
    print(n)        # 2, 3, 5, 7, 11, 13, 17, 19, 23, 29
```

`sieve` 딕셔너리에 없는 수라면 소수이기 때문에 일단 yield 하고, 그 제곱부터 `sieve` 에 넣어서 소수에서 제외시킨다. 그리고 그 소수의 배수들도 소수가 아니므로 `sieve` 에 넣는식이다. 에라토스테네스의 체 방식으로 소수를 찾아내고 있다. 

코드가 잘 이해가 되지 않는다면 2 부터 시작해서 각 변수의 변화를 종이에 끄적여가면서 추적해보면 된다. 
