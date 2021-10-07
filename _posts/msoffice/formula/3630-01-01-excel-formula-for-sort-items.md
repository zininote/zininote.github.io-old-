---
layout: post
title: "INDEX,MATCH: 원본 목록을 정렬하여 재나열하는 함수식"
updated: 2021-08-16
tags: [msoffice,formula]
---

## 정렬 함수식

어떤 범위의 목록들을 정렬하여 나시 나열해주는 일반적인 방법은 "데이터" > "정렬" 기능을 사용하는 것이다. 그러나 이 기능은 일회성으로 목록을 수정하면 다시 기능을 수동적으로 작동시켜야 한다.

하지만 함수식으로도 정렬을 할 수 있는 방법이 있다. 함수식을 사용하면 목록이 변경될 때마다 알아서 다시 정렬이 수행된다.

![그림00](/img/msoffice/formula/formula-0020.png)

```excel
{= INDEX( 원본목록, MATCH( SMALL( COUNTIFS( 원본목록, "<"&원본목록 ), ROW(원본목록첫째항목상대참조) - ROW(원본목록첫째항목절대참조) + 1 ), COUNTIFS( 원본목록, "<"&원본목록 ), 0 ))}
```
{:.excel}

수식 앞뒤로 붙어있는 중괄호 {} 를 제외한 수식을 타이핑하고 Ctrl + Shift + Enter 키를 눌러 **배열수식으로 입력**을 해야 정상작동 한다. 배열수식으로 입력된 수식은, 셀에 포커싱을 두면 수식 앞뒤로 중괄호가 보이는데, 배열수식으로 입력했음을 나타내는 표시다.

그리고 위 수식은 수식을 넣고자 하는 범위를 전부 지정하고 배열수식을 입력하는 것이 아니라, 한 개의 셀만 배열수식으로 입력하고, 그 셀을 아래로 복사해서 붙여야 한다. 위 그림으로 보자면 D9 셀에 배열수식을 입력한 뒤, D9 셀을 복사하여 아래쪽 셀들 (D10 ~ D19) 에 붙여넣기 하는 식이다.

`원본목록`은 정렬하기 원하는 목록 원본을 지정하면 된다. 모두 5 군데인데 모두 동일하게 지정하면 된다. ROW 함수는 모두 `원본목록`의 첫째항목이 위치한 셀을 지정하면 되나 하나는 상대참조, 다른 하나는 절대참조라는 것에 주의하자.

그리고 위 함수식은 오름차순 정렬로, 부등호 방향을 바꾸거나 SMALL 함수를 LARGE 함수로 바꾸면, 내림차순 정렬이 된다.

사용할 때 주의할 점이 있는데, 정렬을 원하는 **`원본목록`에 Blank 가 있거나 텍스트와 숫자가 혼재되어 있으면 오작동**하게 된다.

## 함수식 이해

이해하기가 상당히 난해한 함수다. 차근차근 살펴보자.

먼저 COUNTIFS 함수에 입력한 인수의 형태가 일반적이지 않다. 보통 두번째 인수에는 특정값과 같은 조건이 들어가는데 여기서는 다시 범위를 지정하였다.

이렇게 지정하면 COUNTIFS 함수는 두번째 인수로 지정한 범위 안에 있는 내용들의 만족여부를 모두 검사하여 다시 배열로 반환한다. 여기서는 범위안에 있는 각각의 내용들보다 작은 값 ('<' 기호가 사용되었으므로) 의 개수를 다시 배열로 만들어 반환하게 되는 셈이다.

그리고 `ROW - ROW + 1` 함수 형태는 순서대로 1, 2, 3, ... 과 같은 숫자를 반환한다. COUNTIFS 의 결과인 배열과 차례대로의 숫자 1, 2, 3, ... 을 SMALL 함수가 받는 형태이다. 사실상 이 부분이 정렬의 핵심 기능이다.

그리고는 최종적으로 INDEX, MATCH 함수 조합이 해당 순서에 맞는 항목을 가져오는 것이다.