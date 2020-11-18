---
layout: post
title: "소수 찾기"
updated: 2020-11-19
tags: [programmers, lv1]
---

## 문제

[프로그래머스, 소수 찾기](https://programmers.co.kr/learn/courses/30/lessons/12921?language=python3)

소수는 1 과 자기자신만을 약수로 가지는 자연수이다. 소수를 찾는 가장 유명한 알고리즘은 [에라토스테네스의 체](https://ko.wikipedia.org/wiki/%EC%97%90%EB%9D%BC%ED%86%A0%EC%8A%A4%ED%85%8C%EB%84%A4%EC%8A%A4%EC%9D%98_%EC%B2%B4)이다. 링크 내용을 참고하면 어떤 방식인지 감이 올 것이다.

이 방식으로 문제를 풀어보았다.

## 풀이

```py
def solution(n):
    # n 이하 소수 생성, prime 삽입
    prime, sieve = set(), set()
    for i in range(2, n+1):
        if i not in sieve:
            prime.add(i)
            for j in range(i*i, n+1, i): sieve.add(j)        
    
    # 소수 개수 리턴
    return len(prime)
```

`prime` 과 `sieve` set 자료형을 먼저 준비한 뒤, `prime` 에는 소수를, `sieve` 에는 소수가 아닌 수를 넣는다.

2 부터 n 까지 수를 `i` 로 순회하면서, `i` 가 `sieve` 에 없는 수라면, 소수라는 의미이므로 `prime` 에 삽입하고, `i` 의 제곱부터 `i` 의 배수들을 `sieve` 에 삽입하는 식이다.

## 참고

다른풀이들을 보면, 형태는 다를지라도 다들 에라토스테네스의 체 방식으로 문제를 풀고 있다. 그러나 `n` 이라는 숫자가 주어졌을 때나 가능한데, `n` 이라는 숫자가 주어지지않아도 2 부터 계속 소수를 만들어낼 수 있는 방법이 있는지 궁금했다.

결국은 찾을 수 있었는데, [별도 포스팅](https://zininote.github.io/post/generate-prime-numbers)에 소개했으니 참고해보기 바란다.