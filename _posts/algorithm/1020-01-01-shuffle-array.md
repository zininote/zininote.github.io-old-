---
layout: post
title: "배열 데이터요소 랜덤하게 셔플"
updated: 2020-12-12
tags: [algorithm,array]
---

## 데이터요소 셔플

셔플(Shuffle) 은 어떤 배열이나 리스트의 데이터요소를 무작위로 뒤섞어 재배치하는 것을 의미한다. 이를 구현한 가장 유명한 알고리즘은 [Fisher–Yates 알고리즘](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Fisher_and_Yates'_original_method)으로, 아래에 링크 안에 있는 의사코드를 도식화하여 표현해보았다. 어떤 식으로 셔플을 구현하는지 이해가 될 것이다.

![그림00](https://zininote.github.io/img/algorithm/algorithm-1020-01-01-00.svg)

리스트의 제일 앞 인덱스부터 시작하여, 그보다 뒤에 있는 인덱스를 랜덤으로 선택하여 서로의 요소값을 교환해가는 방식이다. 물론 자기 자신과의 교환도 가능하다.

여기서는 앞에서부터 교환을 하지만, 뒤에서 부터 출발하여 보다 앞 인덱스와 교환하는 식으로도 구현할 수 있다.

## 코드 구현

```py
# random.randrange 함수 import
from random import randrange

# 함수 정의
def shuffle(lst):
    for i in range(len(lst)-1):
        j = randrange(i, len(lst))
        lst[i], lst[j] = lst[j], lst[i]
        
# 실행 예시
a = [1, 2, 3, 4, 5]
shuffle(a)
print(a)    # 결과 다양함...
```

어느 인덱스와 교환할 것인지 랜덤으로 선택해야하기에 `random` 모듈에서 `randrange` 함수를 import 한다. 함수 내부를 보면 앞에서부터 `i` 인덱스를 반복하면서, `randrange` 함수로 `j` 인덱스를 랜덤하게 선택한 뒤, `i` 인덱스 값과 `j` 인덱스 값을 교환한다.

## random 모듈의 shuffle 함수

사실 Python 은 위에서 사용한 `random` 모듈 안에 `shuffle` 함수를 자체 제공하고 있다. 사용방식도 위에서 별도로 구현한 `shuffle` 함수와 동일하다.

`random` 모듈 안에는 다양하고 편리한 함수들이 여러개 있으니, 보다 자세한 사항은 [Python 공식문서](https://docs.python.org/3/library/random.html)를 참고해보자.