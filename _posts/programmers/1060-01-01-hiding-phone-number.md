---
layout: post
title: "다트 게임"
updated: 2020-11-14
tags: [programmers,lv1]
---

## 문제

[프로그래머스, 핸드폰 번호 가리기](https://programmers.co.kr/learn/courses/30/lessons/12948)

그렇게 어려운 문제는 아니다. 가장 간단히 생각할 수 있는 방법은, 주어지는 `phone_number` 에서 뒷 4자리만 잘라낸 다음, 자릿수에 맞춰 * 기호를 채운 문자열과 다시 합치면 된다.

그러나 정규식을 사용할 수 있는 문제이며, 정규식 학습은 늘 해야 안 잊어버리기 때문에, 한참을 궁리한 끝에 정규식을 사용해서 풀었고 이렇게 포스팅도 해 두는 바이다.

## 풀이

```js
function solution(phone_number) {
    // 정규식으로 폰번호 치환
    return phone_number.replace(/\d(?=\d{4})/g, '*');
}
```
{:.javascript}

```py
def solution(phone_number):
    # 정규식으로 폰번호 치환
    return re.sub(r'\d(?=\d{4})', '*', phone_number)
```
{:.python}

두 코드 모두 정규식 모양은 비슷하다. 숫자를 찾되, 그 뒤로 최소한 4개의 숫자가 뒤따라야 한다는 조건이다. 정규식에 대한 자세한 설명은 [MDN 공식문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/%EC%A0%95%EA%B7%9C%EC%8B%9D) 또는 [Python 공식문서](https://docs.python.org/ko/3.9/library/re.html)를 찾아보면 된다.

그리고 온라인에서 정규식을 테스트해볼 수 있는 사이트 들이 몇개 있다. 그 중 하나인 [regular expresions 101](https://regex101.com/) 사이트를 소개하니 관심있으신 분들은 참고해보기 바란다.

참고로, Javascript 와 Python 은 정규식 사용 방식이 약간 다르다. Javascript 는 정규식 표현식(/.../) 이 별도로 있으며, 문자열의 메소드 형태로 관련 함수를 제공하지만, Python 은 정규식을 사용하기 위한 별도의 개체 `re` 를 제공하고, 이 개체에서 관련 함수를 제공하고 있다.