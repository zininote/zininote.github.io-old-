---
layout: post
title: "콜라츠 추측"
updated: 2020-11-14
tags: [programmers,lv1]
---

## 문제

[프로그래머스, 콜라츠 추측](﻿https://programmers.co.kr/learn/courses/30/lessons/12943)

콜라츠 추측을 위한 기계적인 단순작업(짝수면 2로 나누고, 홀수면 3을 곱한뒤 1을 더하고)을 코딩을 하고 작업한 카운트만 세면 되기에 처음에는 그리 어렵지 않게 느껴졌다.

하지만 반복문 설계에는 다소 궁리가 필요했다. 주어지는 숫자가 1 일 경우 작업이 필요치 않아 이 때의 리턴값은 0 이 되어야 하며, 500 번 반복 이후에도 1 이 되지 않는다면 이 때의 리턴값은 -1 이어야 한다. 양쪽의 극단값까지 정확한 결과값이 나오도록 하려니, 생각보다 까다로운 부분이 있었다.

또한 Javascript 와 Python 의 기본적인 반복문의 동작에 다소 차이가 나는 점이 있었기에, 이에 대한 내용도 포함해서 포스팅하고자 한다.

## 풀이

```js
function solution(num) {
    // 500번 콜라츠 작업 반복, 횟수 리턴
    for(var i = 0; i < 500; i++) {
        if(num == 1) break;
        num = num%2 ? 3*num+1 : num/2;
    }
    return num != 1 ? -1 : i;
}
```
{:.javascript}

```py
def solution(num):
    # 500번 콜라츠 작업 반복, 횟수 리턴
    for i in range(500):
        if num == 1: break
        num = 3*num+1 if num%2 else num//2
    else: i += 1
    return -1 if num != 1 else i
```
{:.python}

500번이라는 반복횟수가 고정이 되어있기에 for 반복문을 사용하였다. 반복문 내에서 1 인지 검사와 콜라츠 작업을 행한다. 그리고 반복이 종료가 되면, 순회에 사용된 변수 `i` 를 직접 리턴하는 구조다.

Python 은 다른 일반적인 프로그램 언어와는 다르게 for 문에도 else 구문을 사용할 수 있다. for 가 break 구문을 만나지 않고 종료가 됐을 때 실행되는 구문이다. (참고로 while 문에도 else 를 사용할 수 있다.)

여기서는 `i` 에 1 을 더하는 구문을 추가하였다. 그 이유는 Javascript 의 for 구문과 같은 동작을 하도록 해주기 위함이다.

위 Javascript 의 for 구문이 break 를 만나지 않고 종료됐을 때의 `i` 값은 500 이 된다. 500이 되어야 `i < 500` 이 false 가 되기 때문에 그 시점에서 for 반복이 종료된다. 하지만 위 Python 의 for 구문은 `range` 함수가 더 이상 숫자를 yield 하지 못할 때 종료가 된다. `range(500)` 과 같이 쓰였으므로 499 에서 끝이 난다. 이 차이를 보정하기 위해 else 구문을 사용한 것이다.

참고로, Javascript 의 for 문 일반식은 [MDN 공식문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for)에 의하면 아래와 같다.

```js
for ([initialization]; [condition]; [final-expression]) {
    statement;
}
```
{:.javascript}

initialization -> condition -> statement -> final-expression 순으로 실행되며, 이후에는 initialization 을 제외한 condition -> statement -> final-expression 부분만 condition 이 false 가 될 때까지 반복한다.