---
layout: post
title: "메모이제이션을 위핸 래퍼 함수"
updated: 2021-12-11
tags: [coding,javascript]
---

## 메모이제이션

예를들어, 아래와 같이 피보나치 수열을 구하는 재귀함수가 있다고 하자.

```javascript
var fib = function(n) {
    fib.count++
    return n < 2 ? n : fib(n-2) + fib(n-1)
}

fib.count = 0
console.log(fib(20), fib.count)    // 6765 21891
```
{:.javascript}

fib(20) 을 구하기 위해 함수가 21891 번 호출이 되었다. 이를 구하기 위해서는 fib(18) 과 fib(19) 를 알아야 하는데, fib(18) 을 구했다 하더라도, fib(19) 를 구할 땐 다시 fib(18) 을 구한다. 따라서 n 이 커질수록 기하급수적으로 함수 호출 횟수가 늘어날 수밖에 없다.

만일 한번 구한 fib(n) 을 어딘가에 저장하고 재활용한다면 함수 호출 횟수가 획기적으로 줄어들 것이다. [메모이제이션](https://namu.wiki/w/%EB%A9%94%EB%AA%A8%EC%9D%B4%EC%A0%9C%EC%9D%B4%EC%85%98)이란 바로 이를 기능적으로 구축한 기법이다.

## 메모이제이션을 위한 래퍼 함수

메모이제이션을 구현할 때, fib 함수를 새롭게 구축하는 것도 가능하지만, 별도의 함수로 감싸는 방법을 택할 수도 있다. 아래와 같다.

```javascript
var memoize = function(f) {
    var cache = new Map()
    
    return function(...args) {
        var h = args.toString()
        if (!cache.has(h)) cache.set(h, f(...args))
        return cache.get(h)
    }
}

var fib = function(n) {
    fib.count++
    return n < 2 ? n : fib(n-2) + fib(n-1)
}
fib = memoize(fib)

fib.count = 0
console.log(fib(20), fib.count)    // 6765 21
```
{:.javascript}

함수 호출 횟수가 21 번으로 확연히 줄었다.