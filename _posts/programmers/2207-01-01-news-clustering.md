---
layout: post-programmers
title: "LV2: 뉴스 클러스터링"
updated: 2020-09-10
cat: programmers
---

## 문제

[프로그래머스, 뉴스 클러스터링](https://programmers.co.kr/learn/courses/30/lessons/17677?language=python3)

주어지는 두 문자열을 두글자씩 결합하는 것과 문제에서 설명하고 있는 자카드 유사도를 구현하는 것이 이 문제의 핵심이다.

python 에는 자카드 유사도를 쉽게 구할 수 있는 라이브러리를 제공하고 있다. `collections` 모듈에 있는 `Counter` 클래스가 그것인데, `Counter` 클래스에 대한 자세한 설명은 [python 공식문서](https://docs.python.org/3/library/collections.html#collections.Counter)나 포털검색 등에서 찾아보길 권한다.

## 풀이

```py
from collections import Counter

def solution(str1, str2):
    # 1. 다중집합 구하기
    s1 = [(x+y).lower() for x, y in zip(str1[:-1], str1[1:]) if x.isalpha() and y.isalpha()]
    s2 = [(x+y).lower() for x, y in zip(str2[:-1], str2[1:]) if x.isalpha() and y.isalpha()]
    
    # 2. Counter 로 Jaccard 유사도 구하여 리턴
    s1, s2 = Counter(s1), Counter(s2)
    x = sum((s1 & s2).values())
    y = sum((s1 | s2).values())
    jaccard = x/y if y else 1
    return int(jaccard*65536)
```

`# 2` 코드를 보면  Counter 개체 `s1`, `s2` 에 & 및 | 연산자를 적용하는데, 이는 정확하게 문제가 의도하는 교집합, 합집합 연산을 수행한다. 이들 값을 바탕으로 자카드 유사도를 구하면 된다.

## 참고

python 의 Counter 클래스 덕분에 쉽게 해결하였는데, 문제의 의도는 아마 직접 구현해보라는 의미일 것이다. 그래서 Counter 클래스를 필요한 부분만 직접 구현도 해봤다. 아래는 그 코드다.

```py
class Counter:
    def __init__(self, it):
        self.d = {}
        self._setvalue(it)

    def _setvalue(self, it):
        for x in it:
            if x in self.d:
                self.d[x] += 1
            else:
                self.d[x] = 1
                
    def values(self):
        return list(self.d.values())
    
    def __and__(self, other):
        inter = set(self.d.keys()) & set(other.d.keys())
        
        a = []
        for k in inter:
            a.extend([k]*min(self.d[k], other.d[k]))

        return Counter(a)

    def __or__(self, other):
        union = set(self.d.keys()) | set(other.d.keys())

        a = []
        for k in union:
            a.extend([k]*max(self.d[k] if k in self.d else 0, other.d[k] if k in other.d else 0))

        return Counter(a)
```

원코드의 `from collections import Counter` 구문을 없애고 위 코드를 넣어도 문제 통과가 가능했다.

직접 구현해보니 연산자에 대응하는 매직 메서드도 만들어 볼 기회가 있어서 좋긴 했지만, 확실히 라이브러리를 사용하는 것이 코드 안정성도 높이고 시간 절약도 될 듯 싶다.
