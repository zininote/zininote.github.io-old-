---
layout: post_algorithm
title: "특정한 조건일 때, List Comprehension 순회 중간에 break 하기"
updated: 2021-09-07
tags: [algorithm,python]
---

## Comprehension 표현식과 break

Comprehension 표현식은, 어떤 Iterable 개체를 처음부터 끝까지 순회하면서 이런저런 처리를 손쉽게 할 수 있도록 해주는 Python 의 강력한 기능이다.

어떤 특정한 상황에서는 순회 중간에 끊어버리고 싶을 때가 있는데, for 나 while 반복문에서 사용하는 break 를 사용하면 에러가 발생한다. break 는 Comprehension 표현식이 요구하는 Expression 이 아닌 Statement 이기 때문이다.

```python
arr = [1, 2, 3, 4, 5, 4, 3, 2, 1]

print([x for x in arr if x < 4])             # [1, 2, 3, 3, 2, 1]
print([x for x in arr if x < 4 or break])    # 에러 발생
```
{:.python}

`x < 4` 가 더 이상 True 가 아닐 때 바로 순회를 종료해버리고 싶다면, itertools 모듈의 takeWhile 함수를 사용하면 된다.

```python
from itertools import takewhile

arr = [1, 2, 3, 4, 5, 4, 3, 2, 1]

print(list(takewhile(lambda x: x < 4, arr)))    # [1, 2, 3]
```
{:.python}

## Comprehension 순회 중간에 순회 대상의 모든 요소를 없애기

하지만 어떻게든 List Comprehension 형태를 유지하면서 순회 중간에 종료를 하고 싶다하면, 아예 방법이 없는 것은 아니다. 먼저 순회 중간에 순회 대상을 없애버리는 방법을 생각할 수 있다.

```python
arr = [1, 2, 3, 4, 5, 4, 3, 2, 1]

print([x for x in arr if x < 4 or arr.clear()])    # [1, 2, 3]

print(arr)    # [] <-- 순회하던 리스트가 빈 리스트가 됨
```
{:.python}

`x < 4` 가 더 이상 True 가 아닐 때, `arr.clear()` 구문이 실행된다. 함수호출은 Expression 이기 때문에 사용할 수가 있고, clear 함수는 리스트 모든 요소를 없애버린다. 없어졌기 때문에 더 이상 순회를 못하는 점을 이용한 것이다.

참고로 이 방식은 튜플, 딕셔너리, set 자료형에는 적용할 수 없다. 에러가 발생하기 때문이다.

## 순회 대상을 제너레이터로 감싸기

순회 대상은 그대로 두고, 이를 제너레이터로 감싼 뒤, 특정 상황에서 제너레이터 동작을 멈추도록 하는 방식을 생각할 수 있다.

```python
arr = [1, 2, 3, 4, 5, 4, 3, 2, 1]
g = (x for x in arr)

print([x for x in g if x < 4 or g.close()])    # [1, 2, 3]

print(arr)    # [1, 2, 3, 4, 5, 4, 3, 2, 1]
```
{:.python}

먼저 알아둬야 할 것이, Comprehension 표현식을 단독으로 사용고 괄호로 감싸면 제너레이터를 리턴한다는 점이다. arr 리스트를 제너레이터로 감싼 뒤, g 에 대입하였다. (물론 직접 def 구문으로 제너레이터를 생성해도 된다.)

`x < 4` 가 더 이상 True 가 아닐 때, `g.close()` 구문이 실행된다. close 함수는 GeneratorExit 예외를 발생시키며 제너레이터 동작을 중단시킨다. 순회 대상 자체를 변형하는 것이 아니기 때문에, Comprehension 순회 도중 끊어도 원래의 arr 리스트는 유지가 된다.

그리고 제너레이터로 감싸기만 하면 되기 때문에, 튜플, 딕셔너리, set 자료형에도 얼마든지 적용할 수 있다.

추가로 아래처럼 사용하면, arr 리스트를 g 제너레이터로 감싸는 구문 자체도 List Comprehension 에 포함시켜 버릴 수 있다.

```python
arr = [1, 2, 3, 4, 5, 4, 3, 2, 1]

print([x for x in (g := (x for x in arr), g)[-1] if x < 4 or g.close()])    # [1, 2, 3]
```
{:.python}

이 코드는 := 연산자가 사용되었기 때문에, Python 3.8 버전 이상에서만 사용할 수 있다. `(g := (x for x in arr), g)[-1]` 구문이 이해가 잘 안된다면, [별도 포스팅](/post/python-use-statement-alternative-in-lambda-function)을 참고해보기 바란다.