---
layout: post
title: "VLOOKUP: 두가지 이상 검색기준으로 VLOOKUP 검색 방법"
updated: 2021-08-04
tags: [msoffice,formula]
---

## 두가지 이상 조건으로 검색

보통 VLOOKUP 함수는 아래와 같은 형태로 사용한다.

```excel
= VLOOKUP( 검색값, 검색범위, 열번호, false )
```
{:.excel}

위 함수식에서 `검색값` 은 일반적으로 유일하다. 하지만 경우에 따라서 두가지 이상의 `검색값`, 즉 두가지 이상 조건으로 검색이 필요할 때가 있다.

## Helper 열을 이용한 방법

![그림00](/img/msoffice/formula/formula-0005.png)

```excel
= VLOOKUP( 검색값1&검색값2, 검색범위, 열번호, false )
```
{:.excel}

별도의 Helper 열 (위 그림에서는 B 열) 을 만들어서, Helper 열까지 포함한 `검색범위`를 지정한 뒤, VLOOKUP 검색을 하고 있다. Helper 열이 원하는 조건들을 & 연산자로 묶어둔 만큼, VLOOKUP 함수의 첫번재 인수도 검색값들을 & 연산자로 묶어 검색을 한다.

& 연산자와 동일한 기능을 하는 CONCATENATE 함수를 사용해도 되며, 응용하면 세가지 이상 조건으로도 검색이 가능하다.

## 배열수식을 이용한 방법

![그림01](/img/msoffice/formula/formula-0006.png)

```excel
{= VLOOKUP( 검색값1&검색값2, CHOOSE( {1, 2}, 검색기준열1&검색기준열2, 검색대상열 ), 2, false )}
```

수식 앞뒤로 붙어있는 중괄호 {} 를 제외한 수식을 타이핑하고 Ctrl + Shift + Enter 키를 눌러 **배열수식으로 입력**을 해야 정상작동 한다. 수식 입력셀에 포커싱을 두면, 입력한 수식 앞뒤로 중괄호가 보이는데, 배열수식으로 입력했음을 나타내는 표시다.

이 방식은 Helper 열이 필요가 없다. 대신 수식은 복잡해졌는데, CHOOSE 함수의 첫번째 인수를 {1, 2} 와 같은 형태로 두면, 두번째 인수부터 지정된 범위들을 모아서 가상의 범위를 만드는데, 이 가상의 범위를 대상으로 VLOOKUP 검색을 한다고 생각하면 된다.

Helper 열 방식과 마찬가지로, & 연산자 대신 CONCATENATE 함수를 사용해도 되며, 응용하면 세가지 이상의 조건으로도 검색이 가능하다.

## INDEX, MATCH 함수를 이용한 방법

VLOOKUP 대신 사용할 수 있는 INDEX, MATCH 로도 두가지 이상 조건 검색을 할 수 있다. 이에 대해서는 [별도 포스팅](/post/excel-index-match-for-vlookup-alternative)을 참고하기 바란다. (개인적으로는 이 경우 INDEX, MATCH 사용을 추천한다.)