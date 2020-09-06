---
layout: post-programmers
title: "LV1: 소수 찾기"
updated: 2020-09-07
cat: programmers
---

## 문제

[프로그래머스, 소수 찾기](https://programmers.co.kr/learn/courses/30/lessons/12921?language=python3)

소수를 찾는 가장 유명한 알고리즘은 [에라토스테네스의 체](https://ko.wikipedia.org/wiki/%EC%97%90%EB%9D%BC%ED%86%A0%EC%8A%A4%ED%85%8C%EB%84%A4%EC%8A%A4%EC%9D%98_%EC%B2%B4)이다. 이 알고리즘을 이해하고 적용하면 문제를 해결할 수 있다.

## 풀이

```py
def solution(n):
    # 1. 인덱스가 소수인지 판단할 prime 리스트 생성, 2 ~ n 까지 True 초기화
    prime = [True]*(n+1)
    prime[0] = prime[1] = False
    
    # 2. n 의 제곱근까지 반복, 소수라면 그 제곱부터 시작하여 배수들을 제외
    for x in range(2, int(n**0.5)+1):
        if prime[x]:
            for y in range(x*x, n+1, x):
                prime[y] = False
                
    # 3. prime 리스트의 True 개수 리턴
    return prime.count(True)
```

`# 2` 코드에서 본격적으로 소수를 찾는다. `n` 까지 반복할 필요없이 `n` 의 제곱근까지만 반복하면 된다. 그리고 소수라면 그 배수를 알고리즘에 따라 지워가면 되는데, 해당 소수의 제곱부터 지워나가면 된다.

수학적인 이해가 필요한 부분인데, 만일 이해가 잘 안된다면 위 에라토스테네스의 체 링크로 들어가서, 움직이는 그림을 보면서 직접 손으로도 끄적여보자.

## 참고

위 코드는 `n` 이라는 숫자가 주어졌을 때, 그 이하의 수 중에서 소수를 찾아내는 방식이다. 개인적으로 `n` 이라는 숫자에 구애받지 않고 2 부터 시작해서 계속 소수를 구하는 방법은 없을까 궁금해했다. 이런 코드를 구글링으로 찾아서 [별도 포스팅](https://tedblog.github.io/posts/prime-number-generator)에 정리하였으니 궁금하신 독자들은 한번 들러주길 바란다.
