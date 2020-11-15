---
layout: post
title: "Javascript 수학 함수를 대체하는 연산자조합들"
updated: 2020-11-10
tags: [algorithm,math]
---

## 함수와 연산자조합

어떤 언어든 수학적 계산을 위해 기본적인 함수들을 제공한다. [MDN 공식문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math)를 보면 Javascript 가 기본으로 제공하는 수학 함수들을 볼 수 있다. 또한 문자열로 표현된 숫자를 실제 숫자로 바꾸기 위한 `parseInt` 같은 함수도 있다.

이런 함수 대신 연산자들을 적절히 조합해서 사용하면, 같은 결과를 보이면서도 더 빠른 속도를 낼 수 있다고 한다. 이 포스팅에서는 이러한 연산자조합을 소개해보고자 한다.

이 포스팅은 새로운 연산자조합을 찾을 때마다 계속 업데이트할 예정이다.

## parseInt 대체

```javascript
console.log(parseInt('234'));        // 234
console.log(parseInt('000234'));     // 234
console.log(parseInt('234text'));    // 234
console.log(parseInt('aa234'));      // NaN
console.log(parseInt('aa234text'));  // NaN

console.log(+'234');                 // 234
console.log(+'000234');              // 234
console.log(+'234text');             // NaN <- parseInt 와 결과 다름
console.log(+'aa234');               // NaN
console.log(+'aa234text');           // NaN
```
{:.javascript}

지극히 간단하므로 편리하기는 하지만, 실제 사용할 땐, 연산자 우선순위를 항상 염두하면서 수식을 작성해야 한다. 연산자 우선순위는 [MDN 공식문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/%EC%97%B0%EC%82%B0%EC%9E%90_%EC%9A%B0%EC%84%A0%EC%88%9C%EC%9C%84)를 참고하자.

## Math.trunc 대체

`Math.trunc` 는 소수점 이하를 잘라서 정수로 변환하는 함수다. 보통 `Math.floor` 와 혼동하기도 하는데, `Math.floor` 는 해당 수를 넘지 않는 최대의 정수를 반환한다. 양수에서는 양자의 결과가 같으나 음수에서는 차이를 보인다.

```javascript
console.log(Math.trunc(3.757));      // 3
console.log(Math.floor(3.757));      // 3
console.log(Math.trunc(-3.757));     // -3
console.log(Math.floor(-3.757));     // -4 <- Math.trunc 와 결과 다름

console.log(~~3.757);                // 3
console.log(3.757|0);                // 3
console.log(3.757<<0);               // 3
console.log(3.757>>0);               // 3
console.log(3.757>>>0);              // 3

console.log(~~-3.757);               // -3
console.log(-3.757|0);               // -3
console.log(-3.757<<0);              // -3
console.log(-3.757>>0);              // -3
console.log(-3.757>>>0);             // 4294967293 <- Math.trunc 와 결과 다름
```
{:.javascript}

소수점 이하를 버릴 땐, `~~`(NOT 비트연산을 두번 적용) 이나 `|0`(0 과 OR 비트연산)을 적용하는 것이 가장 간편할 것 같다.

그러나 주의할 점이 있다. **일정한 범위(-2147483648 초과, 2147483648 미만)를 벗어난 시도는 올바른 결과를 보장하지 못한다.**

```javascript
console.log(Math.trunc(-2147483649.111));    // -2147483649
console.log(Math.trunc(2147483649.111));     // 2147483649

console.log(~~-2147483649.111);              // 2147483647 <- Math.trunc 와 결과 다름
console.log(-2147483649.111|0);              // 2147483647 <- Math.trunc 와 결과 다름
console.log(-2147483649.111<<0);             // 2147483647 <- Math.trunc 와 결과 다름
console.log(-2147483649.111>>0);             // 2147483647 <- Math.trunc 와 결과 다름

console.log(~~2147483649.111);               // -2147483647 <- Math.trunc 와 결과 다름
console.log(2147483649.111|0);               // -2147483647 <- Math.trunc 와 결과 다름
console.log(2147483649.111<<0);              // -2147483647 <- Math.trunc 와 결과 다름
console.log(2147483649.111>>0);              // -2147483647 <- Math.trunc 와 결과 다름
```
{:.javascript}

그 이유는 [Stack Overflow](https://stackoverflow.com/questions/7487977/using-bitwise-or-0-to-floor-a-number#answer-52650645)에서 찾을 수 있었는데, 비트연산은 32비트 크기단위로 이뤄지기 때문이라고 한다. 따라서 32비트 범위를 초과하는 정수에 대한 비트연산은 오류를 내포할 수밖에 없다.

참고로, Javascript 에서 안전하게 사용할 수 있는 정수의 가장 큰값과 작은값을 `Number.MAX_SAFE_INTEGER`, `Number.MIN_SAFE_INTEGER` 변수로 참조할 수 있는데, 32비트 범위보다 훨씬 크다.