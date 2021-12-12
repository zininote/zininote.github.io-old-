---
layout: post
title: "순열과 조합 케이스를 생성하는 제너레이터"
updated: 2021-12-11
tags: [coding,math]
---

## 순열을 구하는 코드

[TBD]

## 조합을 구하는 코드

보통 백트래킹 알고리즘을 사용하여 구한다. 아래는 재귀함수로 이를 구현한 제너레이터다.

```javascript
var gen_combis = function*(A, r) {
    var fn = function*(v) {
        if (v.length === r) {
            yield v.map(x => A[x])
        } else {
            for (var i = (v.length ? v[v.length-1]+1 : 0); i < A.length; i++) {
                yield* fn([...v,i])
            }
        }
    }
    
    for (var x of fn([])) yield x
}
```
{:.javascript}

안쪽에 있는 fn 제너레이터가 재귀방식으로 케이스를 생성해낸다.

아래는 Stack 자료형을 사용하여 재귀가 아닌 반복문으로 백트래킹을 구현하였다.

```javascript
var gen_combis = function*(A, r) {
    var stack = [[]]
    
    while (stack.length) {
        var v = stack.pop()
        if (v.length === r) {
            yield v.map(x => A[x])
        } else {
            for (var i = A.length-1; (v.length ? v[v.length-1] : -1) < i; i--) {
                stack.push([...v, i])
            }
        }
    }
}
```
{:.javascript}

재귀호출 방식과 동일한 결과가 나오도록, for 반복문을 재귀호출 방식의 것과는 반대로 반복하도록 했다.
