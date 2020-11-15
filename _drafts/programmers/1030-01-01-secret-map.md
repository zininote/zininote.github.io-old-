---
layout: post
title: "비밀 지도"
updated: 2020-11-14
tags: [programmers,lv1]
---

## 문제

[프로그래머스, 비밀 지도](https://programmers.co.kr/learn/courses/30/lessons/17681)

뭔가 복잡해보이기는 하지만, 원하고자 하는 기능을 담당하는 함수를 순서대로 잘 조합하기만 하면 어렵지 않게 해결할 수 있는 문제였다.

두 배열의 같은 인덱스에 있는 숫자들을 OR 비트연산 한 뒤, 2진수로 변환, 자릿수가 `n` 이 되도록 맞춤, 0 을 공백으로, 1 을 # 기호로 변환을 순서대로 적용하면 된다.

두 배열의 같은 인덱스 숫자들을 끄집어낼 때 `zip` 함수를 사용하였다. 다만, Python 에선 기본 제공되는 함수지만, Javascript 는 그렇지 않다. Lodash 같은 외부 모듈을 사용해야하는데, 프로그래머스에서는 아마도 불가능할 듯 하여 `zip` 함수를 직접 구현해보았다.

`zip` 함수 직접 구현 관련해서는 아래 포스팅을 참고해보기 바란다.

[찌니노트, Javascript 에서 Python 의 zip 함수 구현](https://zininote.github.io/post/creat-zip-generator)

## 풀이

```js
// zip 함수 생성
function* zip(...iterables) {
    var length = Math.min.apply(null, iterables.map(e => e.length));
    for(var i = 0; i < length; i++) {
        yield iterables.map(e => e[i]);
    }
}

function solution(n, arr1, arr2) {
    // zip 함수로 arr1, arr2 각 요소 or비트연산 후,
    // 2진수 변환, 숫자를 공백 및 벽으로 변환하여 리턴
    return [...zip(arr1, arr2)].map(([a, b]) => (a|b).toString(2).padStart(n, '0').replace(/0/g, ' ').replace(/1/g, '#'));
}
```
{:.javascript}

```py
def solution(n, arr1, arr2):
    # zip 함수로 arr1, arr2 각 요소 or 비트연산 후,
    # 2진수 변환, 숫자를 공백 및 벽으로 변환하여 리턴
    return [bin(a|b)[2:].zfill(n).replace('0', ' ').replace('1', '#') for a, b in zip(arr1, arr2)]
```
{:.python}

큰 차이점으로는, Javascript 코드에는 `zip` 함수를 직접 구현하였으며, Python 코드에서는 `map` 함수 대신, 개인적으로 선호하는 리스트 comprehension 표현식을 사용하였다는 점이다.

그 외에는 사용한 함수 이름은 다를지라도, 동일한 로직으로 풀어내고 있다.

## 참고

위 Javscript 풀이는 `zip` 함수를 별도로 구현했으나, 사실 `zip` 함수를 사용하지 않아도 문제를 풀 수 있다.

```js
// zip 함수 삭제

function solution(n, arr1, arr2) {
    // arr1 배열에 직접 map 함수 사용
    return arr1.map((e, i) => (e|arr2[i]).toString(2).padStart(n, '0').replace(/0/g, ' ').replace(/1/g, '#'));
}
```
{:.javascript}

원코드와 차이가 있다면 `arr1` 배열에 직접 `map` 함수를 사용했다는 점이다. `toString` 이후부터는 동일하다. 화살표 함수의 인수와 OR 비트연산 변수가 다소 직관적이지는 않지만 제대로 작동을 한다.

아래는 또 다른 풀이다.

```js
// zip 함수 삭제

function solution(n, arr1, arr2) {
    // 길이가 n 인 더미 배열 생성하여 map 함수 사용
    return Array(n).fill(0).map((_, i) => (arr1[i]|arr2[i]).toString(2).padStart(n, '0').replace(/0/g, ' ').replace(/1/g, '#'));
}
```
{:.javascript}

Array 함수로, 길이가 `n` 인 더미 배열을 생성하여 여기에 `map` 함수를 적용했다. 개인적으로는 OR 비트연산 부분이 좀 더 직관적으로 표현이 된 듯 싶다.
