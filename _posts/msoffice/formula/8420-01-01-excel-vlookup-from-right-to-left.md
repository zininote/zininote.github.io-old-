---
layout: post
title: "VLOOKUP,CHOOSE: 오른쪽열 기준으로 보다 왼쪽열 내용 VLOOKUP 검색"
updated: 2021-05-03
tags: [msoffice,formula]
---

## VLOOKUP 검색범위의 문제

VLOOKUP 함수의 일반적인 사용법은 아래와 같다.

```excel
= VLOOKUP( 검색값, 검색범위, 열번호, 작동방식 )
```
{:.excel}

`검색범위`를 지정하면, 그 범위의 가장 왼쪽열을 "검색기준열" 로 강제하고, `열번호`만큼 떨어진 지점을 "검색대상열" 로 삼기에, 항상 보다 오른쪽열 내용으로만 검색할 수밖에는 없다.

하지만 오른쪽열 기준으로 보다 왼쪽열 내용을 검색할 수 있는 방법이 아예 없는 것은 아니다. 아래에 몇개 방법을 소개하였는데, 공통점은 "검색기준열" 과 "검색대상열" 을 독립적으로 설정을 한다는 점이다.

## CHOOSE 함수로 가상범위 생성

![그림01](/img/msoffice/formula/formula-0003.png)

```excel
= VLOOKUP( 검색값, CHOOSE( {1, 2}, 검색기준열, 검색대상열 ), 2, FALSE )
```
{:.excel}

CHOOSE 는 본래 첫번째 인수에 번호 n 을 지정하면, 뒤 이어진 인수들 중에서 n 번째 인수를 반환하는 함수다. 그러나 위 함수식처럼 `{1, 2}` 라는 표현이 들어가면, 뒤이어진 인수들(여기서는 `검색기준열`과 `검색대상열`)로 가상의 범위를 만들어낸다. 이 가상의 범위를 바탕으로 VLOOKUP 함수를 사용한다고 보면 된다.

## INDEX, MATCH 함수조합 사용

INDEX, MATCH 함수조합을 사용하면 보다 손쉽게 왼쪽열 검색을 할 수 있다. 이에 대해서는 [별도 포스팅](/post/excel-index-match-for-vlookup-alternative)을 참고하기 바란다. (개인적으로는 VLOOKUP, CHOOSE 보다 INDEX, MATCH 를 추천한다.)