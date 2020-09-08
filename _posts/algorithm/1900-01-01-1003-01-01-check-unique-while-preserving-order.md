---
layout: post-algorithm
title: "etc: 배열 내부 기존 순서를 유지하면서 고유한 요소만 남기는 코드"
updated: 2020-09-08
cat: algorithm
---

## 고유한 요소 관련 코드들

보통 python 에서는, 어떤 배열 요소들이 중복되지 않도록 고유한 요소만을 남기고 싶을 때, 아래처럼 set 자료형 변환 후 다시 배열로 바꾸는 코드를 주로 사용한다.

```py
unique_list = list(set(my_list))
```

위와 같이 코드를 사용하면 `unique_list` 안에는 `my_list` 요소들 중 고유한 요소만 남게 된다. set 자료형의 특성상 중복값을 허용하지 않기 때문이다.

그리고 어떤 리스트가 고유한 값으로만 이뤄졌는지를 검사할 때는, 아래처럼 길이를 비교하면 된다.

```py
len(unique_list) == len(list(set(my_list)))
```

중복값이 있어서 삭제가 되었다면, 길이가 달라졌을 것이라는 점에 착안한 코드다.

## 기존 요소 순서를 보장하는 고유요소 배열 생성

set 자료형 변환을 이용한 방식은 편리하기는 하지만, 수학에서의 "집합" 은 본래 요소들의 순서를 보장하지는 않는다. python 의 set 자료형 또한 자료의 입력순서 유지를 보장하지 않는다.

하지만 기존 요소의 순서가 중요할 땐 다른 방식으로 고유요소만 추출할 수도 있다. 아래부터 그 방법을 소개해본다.

```py
unique_list = []
for e in my_list:
    if e not in unique_list:
        unique_list.append(e)
```

위 코드를 보면 `unique_list` 안에 남게 될 고유요소들은 기존 `my_list` 안에 있던 순서를 유지한다. 그럴 수밖에 없는 것이 `my_list` 를 순서대로 순회하면서, 이미 고유요소에 요소로 들어가 있는지 아닌지를 파악해서 새로운 고유요소라면 뒤쪽에 추가하기 때문이다.

다른 방식의 코드도 있다.

```py
unique_list = [e for i, e in enumerate(my_list) if my_list.index(e) == i]
```

위 코드 역시 순서를 보장하면서 고유한 요소만 추출한다. `my_list`를 comprehension 표현식으로 순회하면서, `index(e)` 값과 인덱스 `i` 값이 같은 경우만 `unique_list` 에 담는다. `e` 가 이미 앞에서 등장한 적이 있는 중복값이라면, `index(e)` 의 결과는 보다 앞쪽에 있는 값을 나타낼 것이므로, `i` 와 달라지게 된다는 점에 착안한 코드다.
