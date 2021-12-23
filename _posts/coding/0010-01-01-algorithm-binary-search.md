---
layout: post
title: "이진탐색 (Binary Search)"
updated: 2021-12-23
tags: [coding,algorithm,binary_search]
---

## 이진탐색 (Binary Search)

나무위키의 [이진탐색](https://namu.wiki/w/%EC%9D%B4%EC%A7%84%20%ED%83%90%EC%83%89) 링크에 들어가서 그 안에 있는 그림을 보면, 이진탐색이 무엇인지 쉽게 알 수 있다.

사전에서 단어를 찾는 것과 같이 실생활에서도 이런 탐색 방법은 누구나 한번쯤은 사용해봤을 것이다. 이해하기도 어렵지 않은데, 코드로 작성할 때는 디테일한 부분 구현이 은근히 까다롭게 다가온다.

## 코드 구현

Leetcode 의 [704. Binary Search](https://leetcode.com/problems/binary-search/) 는, 오름차순 정렬된 nums 숫자배열과, target 숫자가 주어지면, nums 안에서 target 숫자의 위치 (인덱스) 를 찾는 문제다. 찾으면 그 위치를, 못 찾으면 -1 을 리턴해야 한다.

그리고 시간복잡도가 O(log n) 이 되도록 구현하라고 했는데, 이는 이진탐색을 사용하라는 의미다.

아래는 그 풀이이다.

```python
def search(self, nums: List[int], target: int) -> int:
    i = 0; j = len(nums)

    while i < j:
        m = i + (j-i)//2

        if nums[m] < target: i = m+1
        else: j = m

    return i if i < len(nums) and nums[i] == target else -1
```
{:.python}

초기값으로 i 는 nums 의 왼쪽 끝 인덱스를, j 는 nums 의 오른쪽 끝 + 1 인덱스를 가리킨다.

while 반복문에 들어서면, i 와 j 의 중간에 위치한 인덱스 m 을 구한다. 그리고 `nums[m] < target` 이라면 m 의 왼쪽에 위치한 인덱스들은 어차피 모두 target 보다 작은 숫자이므로 앞으로 탐색할 필요가 없다. 그래서 왼쪽 한계인 i 를 m 의 다음 위치로 끌어올린다. `i = m+1`

만일 반대라면, m 의 오른쪽에 위치한 인덱스들은 모두 target 보다 모두 큰 숫자가 되므로, 탐색할 필요가 없다. j 를 m 위치까지 끌어내린다. `j = m`

참고로, i 를 끌어올릴 때는 m+1 위치로, j 를 끌어내릴 때는 m 위치로 끌어내리도록 했는데, 그 이유가 있다. i 와 j 의 조정을 계속 이와 같이 하다보면 반드시 i == j 인 순간이 온다. (아래 참고) 그리고 while 반복문이 i < j 인 경우에만 하도록 했기 때문에 i == j 일 때 반복문을 빠져나온다.

```pseudo
# 만일 아래와 같은 상황이라면,
# 중간 인덱스 m 은 계산식에 따라 i 와 같은 위치가 된다.

       i  j
       |  |
       ṿ  ṿ
[...., x, y, ......]
       ^
       |
       m
       
# m 이 가리키는 x 와 target 을 비교하여,
# x < target 일 때, i 는 m+1, 반대일 때, j 는 m 이 되어야만 마지막에 i == j 가 된다.
```
{:.pseudo}

반복문을 빠져나왔다면, i 이든 j 이든 이 인덱스가, target 이 삽입되더라도 계속 오름차순이 유지되는 인덱스가 된다.

마지막에는 이 인덱스가 가리키는 nums 의 값이 target 과 일치하는지만 판단하여 문제가 요구하는 답을 리턴하기만 하면 된다.

하나만 더 참고하자면, `nums[m] < target` 일 때는 i 를 조정하고, 아닐 때는 j 를 조정한다고 했다. 만일 nums 가 [2, 2, 2, 2, 2], target 이 2 와 같이 주어진다면 위 알고리즘은 어떻게 동작할까? (물론 문제에서는 nums 안의 숫자들은 모두 유일하다고 했기 때문에 이런 케이스가 주어지지는 않는다.)

`nums[m] == target` 인 상황이 오면, if 규칙에 따라 j 를 조정한다. 그리고 `i < j` 인 상황이 유지되는한 while 반복문은 계속 실행된다. 즉, i == j 가 될 때까지 j 가 계속 조정되며, i 와 j 는 연속된 2 의 가장 왼쪽 인덱스를 가리키게 된다.

## Python 의 bisect 모듈

Python 에는 이진탐색 알고리즘을 이미 구현한 bisect 모듈을 제공한다. 모듈 안에는 대표적인 2 개 함수가 있는데, bisect_left 와 bisect_right 이다.

두 함수 모두, 위에서 구현한 코드와 같이, 오름차순으로 주어진 리스트 안에서, 특정 target 이 들어갈 수 있는 인덱스를 찾아준다. 다만 차이가 있다면, 동일한 값이 연속으로 있는 구간에서는 bisect_left 는 동일값 연속 구간의 가장 왼쪽 인덱스를, bisect_right 는 동일값 연속 구간의 가장 오른쪽 인덱스 + 1 을 리턴한다는 점이다.

위 문제를 bisect 모듈로도 풀 수 있다.

```python
def search(self, nums: List[int], target: int) -> int:
    from bisect import bisect_left

    i = bisect_left(nums, target)
    return i if i < len(nums) and nums[i] == target else -1
```
{:.python}