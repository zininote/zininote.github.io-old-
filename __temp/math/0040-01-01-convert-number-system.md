---
layout: post
title: "10 진수에서 r 진수로, r 진수에서 10 진수로 변환 함수"
updated: 2021-12-13
tags: [coding,math]
---

## 진수 변환 방법

[위키피디아](https://ko.wikipedia.org/wiki/%EA%B8%B0%EC%88%98%EB%B2%95#%EC%A7%84%EC%88%98) 링크로 들어가 아랫부분을 찾아보면 진수를 변환하는 방법이 나오는데 생각보다 심플하다.

```pseudo
10 진수를 r 진수로 변환: 10 진수를 계속 x 로 나눈 나머지들을 이어붙임
r 진수를 10 진수로 변환: r 진수, 제일 뒷자리 숫자부터, (숫자 * r ** 자릿수) 계산하여 합산
```
{:.pseudo}

## 코드로 구현

각각의 함수를 Number, String 객체의 prototype 에 삽입하였다. 이렇게 하면 함수체이닝으로 나타내기도 편하다.

```javascript
Number.prototype.t = function(r, d='0123456789abcdefghijklmnopqrstuvwxyz', n=this) {
    return n < r ? d[n] : Number.prototype.t(r, d, (n/r)|0) + d[n%r]
}

String.prototype.t = function(r, d='0123456789abcdefghijklmnopqrstuvwxyz', s=this) {
    return s.split('').reverse().reduce((a, x, i) => x === '-' ? -a : (x === '+' ? a : a+d.indexOf(x)*r**i), 0)
}
```
{:.javascript}

숫자에 영문 a ~ z 까지를 digit 으로 사용한다. 총 36 진법까지 표현할 수 있다.

실제 Javascript 는 위 함수들과 동일한 기능을 하는 toString, parseInt 함수가 이미 있다. 이 함수들과 위에서 생성한 함수들을 아래에 비교하였다.

```javascript
var n = 255
console.log(n.toString(32), n.t(32))    // 7v 7v

var s = 'mn'
console.log(parseInt(s, 36), s.t(36))   // 815 815
```
{:.javascript}