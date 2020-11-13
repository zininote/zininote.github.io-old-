---
layout: post
title: "배열에서 기존 순서를 유지하면서 고유한 요소만 남기는 함수"
updated: 2020-11-11
tags: [algorithm,function]
---

## 중복없는 고유한 요소만 남기기

어떤 배열이나 리스트가 있을 때, 중복되는 요소들을 제거하고 고유한 요소만 남기고 싶을 때가 있다.

이 때는 보통 Set(집합) 자료형으로 변환하였다가, 다시 배열(혹은 리스트)로 변환해주는 방식을 많이 사용한다. 집합의 특성상 중복요소를 허용하지 않기 때문이다.

```javascript
// 고유 요소만 남기는 함수
function unique(arr) {
    return [...new Set(arr)];
}

// 사용 예시
var arr = [4, 3, 3, 5, 1, 9, 1, 5, 1, 6];
console.log(unique(arr));    // [4, 3, 5, 1, 9, 6]
```

```python
# 고유 요소만 남기는 함수
def unique(arr):
    return [*set(arr)]

# 사용 예시
arr = [4, 3, 3, 5, 1, 9, 1, 5, 1, 6]
print(unique(arr))    # [1, 3, 4, 5, 6, 9]
```

결과를 보면 확실히 중복없이 고유한 요소들만 추려졌다. 하지만 중대한 차이가 있는데, Javascript 의 결과는 기존 배열에 입력되어있는 순서를 유지하지만, Python 의 결과는 그렇지가 않다.

먼저 [MDN 공식문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set)에서 Set 자료형을 살펴보면, 중간쯤에 삽입된 순서대로 요소를 순회할 수 있다고 되어있다. 즉 기존 배열의 요소순서를 그대로 간직하고 있다는 뜻이다.

하지만 [Python 공식문서](https://docs.python.org/ko/3.8/library/stdtypes.html#set-types-set-frozenset)에서 set 자료형을 보면, **원소의 위치나 삽입 순서를 기록하지 않는다고 되어있다.** 하드웨어나 기타 여러 상황에 따라 순서는 얼마든지 달라질 수 있다.

물론 고유한 요소의 개수를 세는 것과 같이 기존 순서의 유지가 그리 중요하지 않을 때도 있지만, 경우에 따라 기존 순서의 유지가 필요할 때가 있다.

## 기존 순서를 유지하면서 고유한 요소만 남기기

아래와 같은 코드를 사용하면, 기존 순서를 유지하면서도 고유한 요소만 추려낼 수 있다.

```javascript
// 기존 순서 유지하면서 고유 요소만 남기는 함수
function unique(arr) {
    return arr.filter((e, i) => i === arr.indexOf(e));
}

// 사용 예시
var arr = [4, 3, 3, 5, 1, 9, 1, 5, 1, 6];
console.log(unique(arr));    // [4, 3, 5, 1, 9, 6]
```

```python
# 기존 순서 유지하면서 고유 요소만 남기는 함수
def unique(arr):
    return [e for i, e in enumerate(arr) if i == arr.index(e)]

# 사용 예시
arr = [4, 3, 3, 5, 1, 9, 1, 5, 1, 6]
print(unique(arr))    # [4, 3, 5, 1, 9, 6]
```

Javascript 에서는 filter 함수를, Python 에서는 리스트 comprehension 방식을 사용하였으나, 고유 요소 추출하는 로직은 동일하다.

배열의 앞부분부터 순회하면서, 해당 요소의 인덱스인 `i` 가 indexOf(혹은 index) 함수로 해당값을 찾았을 때의 인덱스와 일치하는지 여부를 묻는다. 일치하지 않다면, 해당 요소값은 보다 앞쪽에 이미 같은값이 위치하고 있다는 뜻이므로 중복값이 된다.

앞부분부터 순회하면서 고유 요소를 찾아 다시 배열로 조립하는 방식이기 때문에, 기존 요소의 순서가 보장이 된다.