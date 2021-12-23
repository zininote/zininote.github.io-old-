---
layout: post
title: "시간복잡도 O(n), 공간복잡도 O(1) 으로 배열 로테이션"
updated: 2021-12-24
tags: [coding,algorithm]
---

## 배열 로테이션

어떤 배열을 k 만큼 로테이션한다고 하면, k 만큼 회전하여 아래와 같은 결과를 보이도록 변환되는 것을 뜻한다.

```pseudo
# k 가 2 라면,

[1, 2, 3, 4, 5, 6, 7]
                +--+
                  |
  +---------------+
  |
  ṿ
 +--+
[6, 7, 1, 2, 3, 4, 5]
```
{:.pseudo}

Leetcode 의 [189. Rotate Array](https://leetcode.com/problems/rotate-array/) 는 이 로테이션을 구현하는 문제인데, 가장 효율적인 시간복잡도 O(n), 공간복잡도 O(1) 로 구현할 수 있는 알고리즘이 있어 이를 소개하고자 한다.

## 일반적인 방법

위와 같이 로테이션을 한다고 하면, 편리한 리스트 슬라이싱 문법을 지원하는 Python 은 쉽게 해결할 수 있다.

```python
def rotate(self, nums: List[int], k: int) -> None:
    k = k % len(nums)
    nums[:] = nums[-k:] + nums[:-k]
```
{:.python}

간단하게 나타낼 수 있다. 시간복잡도도 O(n) 이다. 그러나 슬라이싱이 새로운 저장공간을 만들어 내기 때문에, 공간복잡도는 O(n) 이 된다.

다른 방식으로 무식하게 k 번 로테이션을 강행하는 방법도 있다.

```python
  def rotate(self, nums: List[int], k: int) -> None:
      k = k % len(nums)

      for _ in range(k):
          tmp = nums[-1]
          for i in range(-1, -len(nums), -1):
              nums[i] = nums[i-1]
          nums[0] = tmp
```
{:.python}

이중루프를 사용했다. 이는 공간복잡도는 O(1) 이지만, 시간복잡도가 O(n^2) 이 된다. 실제로 이 풀이는 시간초과 때문에 문제를 통과할 수 없었다.

## 세 번 뒤집는 방법

이제 시간복잡도 O(n), 공간복잡도 O(1) 로 구현되는 코드를 소개한다. 세 번을 뒤집는 방법이다.

```python
def rotate(self, nums: List[int], k: int) -> None:

    def reverse(A, i, j):
        while i < j:
            A[i], A[j] = A[j], A[i]
            i, j = i+1, j-1

    n = len(nums)
    k = k % n
    
    reverse(nums, 0, n-k-1)
    reverse(nums, n-k, n-1)
    reverse(nums, 0, n-1)
```
{:.python}

내부에 reverse 함수를 정의했다. A 리스트와 특정 인덱스 i, j 를 인수로 넘기면, i ~ j 인덱스의 값들 순서를 뒤집는다.

그리고 아래와 같은 규칙으로 뒤집으면 로테이션 효과를 볼 수 있다.

```pseudo
# 오른쪽에서부터 k 개수 만큼의 요소들 순서를 뒤집고,
# 나머지 요소들 순서를 뒤집고,
# 마지막으로 전체 요소 순서를 다시 뒤집으면 된다.

# 예를들어 k = 4 라면,

[1, 2, 3, 4, 5, 6, 7, 8, 9]
                +--------+
                    ||
                    \/
                +--------+
[1, 2, 3, 4, 5, 9, 8, 7, 6]
 +-----------+
       ||
       \/
 +-----------+
[5, 4, 3, 2, 1, 9, 8, 7, 6]
 +-----------------------+
             ||
             \/
 +-----------------------+
[6, 7, 8, 9, 1, 2, 3, 4, 5]
```
{:.python}
