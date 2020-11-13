---
layout: post
title: "Javascript 에서 Python 의 zip 함수 구현"
updated: 2020-11-09
tags: [algorithm,function]
---

## zip 함수

Python 의 기본 빌트인 함수들 중에는 `zip` 함수가 있다. 정확하게는 제너레이터로, 리스트 등과 같은 iterable 개체를 여러개 넘기면, 그 개체들에서 요소들을 하나씩 추출, 추출한 요소들을 하나로 묶어 yield 하는 함수다.

예를들어, `zip([0, 1, 2], ['a', 'b', 'c'], ['가', '나', '다'])` 와 같이 사용했다면, `[0, 'a', '가']`, `[1, 'b', '나']`, `[2, 'c', '다']` 와 같은 결과를 순서대로 yield 한다. (정확히는 튜플 형식으로 yield 한다.)

때에 따라서는 요긴하게 사용할 수 있는 함수지만, 아쉽게도 Javascript 에서는 지원하지 않는다. 물론 [Lodash](https://lodash.com/)와 같은 훌륭한 외부 모듈이 있기 때문에, 이 모듈 안의 `zip` 함수를 가져다가 사용하면 된다.

하지만 코딩을 스터디하는 입장에서, 한번쯤은 `zip` 함수를 구현해보는 것도 좋을 것 같았다.

## Javascript 코드로 구현

아래는 `zip` 함수를 구현한 코드다. [Lodash 소스코드](https://github.com/lodash/lodash)의 구현 로직을 참고하여, 잘못된 형식의 인수 전달 탐색과 같은 기능은 제외하고 핵심적인 부분만 살려보았다. 그리고 Python 과 같이 제너레이터로 만들었다.

```javascript
// zip 함수 코드
function* zip(...iterables) {
    var length = Math.min.apply(null, iterables.map(e => e.length));
    for(var i = 0; i < length; i++) {
        yield iterables.map(e => e[i]);
    }
}

// 사용 예시
var a = [0, 1, 2, 3, 4];
var b = ['a', 'b', 'c'];
var c = ['가', '나', '다', '라'];
for(var x of zip(a, b, c)) {
    console.log(x);
}

// [ 0, "a", "가" ]
// [ 1, "b", "나" ]
// [ 2, "c", "다" ]
```

여러 배열들을 인수로 전달하면, 가장 길이가 작은 배열의 길이를 `length` 에 할당한다. Python 의 `zip` 함수 처럼, 가장 길이가 작은 배열의 길이까지만 yield 하기 위함이다.

그리고 for 구문으로 `i` 를 순회하면서, 인수로 전달된 배열들의 `i` 번째 인덱스 요소들을 `map` 함수로 묶어 yield 하는 구조다.

만일 `length` 계산할 때 사용한 `min` 함수 대신 `max` 함수를 사용하면, 가장 길이가 긴 배열의 길이까지 순회하는데, Javascript 특성 상 인덱스를 넘어서는 범위를 참조하게 되면 undefined 값을 가지므로, 아래처럼 결과가 나타난다.

```javascript
// zip 함수 안에 min 대신 max 함수를 사용했을 경우

// [ 0, "a", "가" ]
// [ 1, "b", "나" ]
// [ 2, "c", "다" ]
// [ 3, undefined, "라" ]
// [ 4, undefined, undefined ]
```

이는 마치 Python 의 `itertools.zip_longest` 함수와 비슷하다. 만일 undefined 를 적절히 처리하는 구문만 추가하면, 이 함수의 흉내도 만들어 낼 수 있을 것이다.