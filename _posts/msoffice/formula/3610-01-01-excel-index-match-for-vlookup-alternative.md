---
layout: post
title: "INDEX,MATCH: VLOOKUP 검색 단점없이 대신 사용할 수 있는 보완 함수"
updated: 2021-08-05
tags: [msoffice,formula]
---

## VLOOKUP 함수의 단점

VLOOKUP 함수는 엑셀에선 없어서는 안될 요긴한 함수지만 사용하다보면 아래와 같은 불편한 점들을 느낄 때가 있다.

- 검색기준열은 검색범위의 가장 왼쪽열로 항상 고정
- 두가지 이상 검색조건으로 검색 어려움
- 검색은 항상 세로열 방향으로만 가능하여 면으로 검색 (마치 VLOOKUP 과 HLOOKUP 을 혼합해놓은 검색)은 불가능
- 넓은 검색범위로 인해 검색범위 안에 열삽입/삭제 하게되면 VLOOKUP 의 결과가 틀어질 가능성 높음
- 영문 대/소문자 구별 검색 불가능
{:.information}

하지만 VLOOKUP 대신 INDEX, MATCH 함수를 사용하면 VLOOKUP 과 같은 결과를 보이면서도, 위 단점들을 최소화하여 보다 유연하게 사용할 수 있다.

## INDEX, MATCH 기본 사용

아래는 VLOOK 과, INDEX, MATCH 조합을 비교해서 보이고 있다.

![그림00](/img/msoffice/formula/formula-0007.png)

```excel
= VLOOKUP( 검색값, 검색범위, 열번호, false)
= INDEX( 검색대상열, MATCH( 검색값, 검색기준열, 0 ))
```
{:.excel}

VLOOKUP 함수는 `검색범위`를 넓게 지정하여, 가장 왼쪽열을 `검색기준열`로 삼고, `열번호`만큼 오른쪽으로 떨어진 열을 `검색대상열`로 삼지만, INDEX, MATCH 함수는 `검색기준열`과 `검색대상열`을 독립적으로 각각 지정한다. 따라서, INDEX, MATCH 조합은 오른쪽으로부터의 검색도 쉽고, `검색범위`의 열삽입/삭제에 영향을 받지 않는다.

아래는 오른쪽열 기준으로 보다 왼쪽열을 검색한 예시다.

![그림01](/img/msoffice/formula/formula-0008.png)

사실 오른쪽 기준으로 보다 왼쪽을 검색하는 것은 다른 함수의 도움을 받아 VLOOKUP 함수로도 구현할 수는 있다. [별도 포스팅](/post/excel-vlookup-from-right-to-left)을 참고해보자.

## 함수조합 응용

*1. 두가지 이상 조건으로 검색*

![그림02](/img/msoffice/formula/formula-0009.png)

```excel
{= INDEX( 검색대상열, MATCH( 1, (검색기준열1=검색값1)*(검색기준열2=검색값2), 0 ))}
```
{:.excel}

수식 앞뒤로 붙어있는 중괄호 {} 를 제외한 수식을 타이핑하고 Ctrl + Shift + Enter 키를 눌러 **배열수식으로 입력**을 해야 정상작동 한다. 수식 입력셀에 포커싱을 두면, 입력한 수식 앞뒤로 중괄호가 보이는데, 배열수식으로 입력했음을 나타내는 표시다.

MATCH 함수의 두번째 인수를 보면 `(조건식)*(조건식)` 형태로 되어 있는데, 각 조건식의 결과는 true 혹은 false 이다. 엑셀은 이 값에 사칙연산을 가하면 true 는 1 로, false 는 0 으로 치환하여 계산을 한다. 모든 조건식이 true 가 되어야만 곱셈의 결과가 1 이 되는데, 이런 경우의 값을 찾도록 함수식이 구성되어 있다.

사실 VLOOKUP 함수로도 두가지 이상 조검 검색이 가능하다. [별도 포스팅](/post/excel-multiple-criteria-vlookup)을 참고하기 바란다.

*2. 면으로 검색 (VLOOKUP 과 HLOOKUP 의 혼합)*

![그림03](/img/msoffice/formula/formula-0010.png)

```excel
= INDEX( 검색대상범위, MATCH( 검색값, 검색기준열, 0 ), MATCH( 검색값, 검색기준행, 0 ))
```
{:.excel}

INDEX 함수 안에 MATCH 함수가 두번 나오는데, 첫번째 MATCH 함수는 열방향(세로방향)으로 검색을, 두번째는 행방향(가로방향)으로 검색을 한다고 이해하면 된다.

*3. 대/소문자 구별 검색*

이는 [별도 포스팅](/post/excel-case-sensitive-vlookup)을 참고하기 바란다.