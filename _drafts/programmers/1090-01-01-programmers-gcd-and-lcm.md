---
layout: post
title: "최대공약수와 최소공배수"
updated: 2020-11-15
tags: [programmers,lv1]
---

## 문제

[프로그래머스, 최대공약수와 최소공배수](https://programmers.co.kr/learn/courses/30/lessons/12940)

말 그대로 최대공약수와 최소공배수를 구하면 된다. Python 에는 이를 구해주는 자체함수를 내장하고 있으나, Javascript 는 별도로 구현해줘야 한다.

아래 별도 포스팅으로 이들을 구현한 함수를 소개하였으니 참고하기 바란다.

[찌니노트, 최대공약수(gcd)와 최소공배수(lcm) 구하는 함수](https://zininote.github.io/post/gcd-and-lcm)

위 포스팅에서 소개한 방법으로 문제를 풀어보았다.

## 풀이

```js
// gcd, lcm 함수
var gcd = (x, y) => x%y ? gcd(y, x%y) : y;
var lcm = (x, y) => x*y / gcd(x, y);

function solution(n, m) {
    // 결과 리턴
    return [gcd(n, m), lcm(n, m)];
}
```
{:.javascript}

```py
# gcd, lcm 함수
gcd = lambda x, y: gcd(y, x%y) if x%y else y
lcm = lambda x, y: x*y // gcd(x, y)

def solution(n, m):
    # 결과 리턴
    return [gcd(n, m), lcm(n, m)]
```
{:.python}

익명함수를 사용하여 변수에 직접 할당하는 식으로 함수를 구현해봤다. Javascript, Python 모두 적용이 가능하다. 익명함수이지만 변수에 할당했기 때문에 재귀호출도 가능하다.