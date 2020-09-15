---
layout: post-programmers
title: "LV2: 소수 찾기"
updated: 2020-09-15
cat: programmers
---

## 문제

[프로그래머스, 소수 찾기](https://programmers.co.kr/learn/courses/30/lessons/42839?language=python3)

소수를 찾는 것 뿐만 아니라, 주어진 숫자들을 가지고 나올 수 있는 모든 수를 순회하는 것도 고려해야 하는 문제다.

조합 가능한 모든 수를 찾은 다음, 그 수들 중에서 가장 큰 수까지의 소수를 모두 구하고, 조합된 수들이 소수인지 아닌지 판별하여 리턴하는 구조로 코딩해봤다. 그리고 [다른 포스팅](https://zininote.github.io/posts/prime-number-generator)에 소개한 소수를 2 부터 계속 yield 하는 코드를 살짝 변형해서 사용해보기로 했다.

## 풀이

```python
from itertools import permutations

def solution(numbers):
    # 1
    def gen_prime_number(limit):
        sieve = {}
        n = 2
        while n <= limit:
            if n not in sieve:
                yield n
                sieve[n*n] = [n]
            else:
                for e in sieve[n]:
                    sieve.setdefault(n+e, []).append(e)
                del sieve[n]
            n += 1
            
    # 2
    nums = set(int(''.join(y)) for x in range(1, len(numbers)+1) for y in permutations(numbers, x))
    
    # 3
    prime = [x for x in gen_prime_number(max(nums))]
    
    # 4
    return sum(1 for x in nums if x in prime)
```

`# 1` 코드는 위 링크에서 소개한 소수 생성하는 제너레이터를 변형하여 `limit` 까지만 생성하도록 한 코드다. [에라토스테네스의 체](https://ko.wikipedia.org/wiki/%EC%97%90%EB%9D%BC%ED%86%A0%EC%8A%A4%ED%85%8C%EB%84%A4%EC%8A%A4%EC%9D%98_%EC%B2%B4) 방식으로 작동한다.

`# 2` 에서는 `itertools.permutations` 함수를 사용하여 주어진 `numbers` 로 생성가능한 숫자들을 `nums` set 자료형에 담는다.

`# 3` 에서는 `# 1` 의 제너레이터를 사용하여 `num` 안에서 가장 큰값까지의 소수를 생성하여 `prime` 리스트에 담는다.

`# 4` 에서는 `nums` 를 반복하면서 요소들이 `prime` 안에 있는지 여부를 판단, 그 개수를 리턴한다.
