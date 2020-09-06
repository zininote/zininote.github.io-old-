---
layout: post-programmers
title: "LV1: 하샤드 수"
updated: 2020-09-06
cat: programmers
---

## 문제

[프로그래머스, 하샤드 수](https://programmers.co.kr/learn/courses/30/lessons/12947?language=python3)

주어진 숫자에서 각 자릿수에 해당하는 숫자를 어떻게 뽑아낼 수 있을지가 가장 관건인 문제다. 하다보니 한줄로 간단히 풀어낼 수 있었다.

## 풀이

```py
def solution(x):
    # 1. 문자열로 변환한 x 각 자릿수 반복, 합계 구하고, 하샤드 수 여부 판단
    return x % sum(int(n) for n in str(x)) == 0
```

## 참고

다른 방식으로 풀어낸 코드도 소개한다. [진법 변환 코드](https://zininote.github.io/posts/convert-number-system) 포스팅에서 사용했던 나머지 결합하는 알고리즘의 응용이다. 10 의 나머지를 계속 구한다는 것은 곧 숫자의 각 자릿수를 추출하는 것과 다름없다.

이를 활용하여 아래처럼 코드를 수정해보았다.

```py
def solution(x):
    def sum_of_digits(x):
        return x%10 if x < 10 else sum_of_digits(x//10) + x%10
    
    return x % sum_of_digits(x) == 0
```

`sum_of_digits` 함수는 재귀호출을 사용해서, 몫이 10 보다 작아져서 더이상 나눗셈이 필요없을 때까지, 주어진 숫자를 계속 10 으로 나눈 나머지를 더하는 방식으로 각 자릿수 합계를 구해준다.
