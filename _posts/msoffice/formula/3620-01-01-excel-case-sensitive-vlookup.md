---
layout: post
title: "INDEX,MATCH: 대소문자를 구별하는 VLOOKUP 검색 방법"
updated: 2021-05-05
tags: [msoffice,formula]
---

## 대소문자를 구별하지 않는 VLOOKUP

데이터집합에서 특정 값을 검색할 때 자주 사용되는 VLOOKUP 함수는 영문 대소문자를 구별하지 않는다.

![그림00](/img/msoffice/formula/formula-0001.png)

위 그림을 보면 찾고자 하는 `검색값`은 `ABxyYZ` 이기에 결과는 60 이어야하지만, 10 을 결과로 보이고 있다. `검색범위`의 제일 위쪽 값이 대소문자만 다를뿐 같은 문자이기 때문에, 대소문자를 구별하지 않는 VLOOKUP 함수는 이를 검색결과로 보이고 있는 것이다.

## INDEX, MATCH, EXACT 함수조합 + 배열수식으로 대소문자 구별 검색

때에 따라서는 대소문자를 구별하여 검색이 필요할 때가 있다. 아래는 그 예시이다.

![그림01](/img/msoffice/formula/formula-0002.png)

```excel
{= INDEX( 검색대상열, MATCH( TRUE, EXACT( 검색값, 검색기준열 ), 0 ))}
```
{:.excel}

수식 앞뒤로 붙어있는 중괄호 {} 를 제외한 수식을 타이핑하고 Ctrl + Shift + Enter 키를 눌러 **배열수식으로 입력**을 해야 정상작동 한다. 수식 입력셀에 포커싱을 두면, 입력한 수식 앞뒤로 중괄호가 보이는데, 배열수식으로 입력했음을 나타내는 표시다.

대/소문자 구별의 핵심은 EXACT 함수인데, 이 함수를 입력할 때 나오는 도움말 팝업에 "대/소문자를 구분합니다." 라고 나온다. EXACT 함수의 한쪽 인수를 셀 하나로 두고, 다른쪽 인수를 범위로 두어 배열수식으로 입력하면, 일일이 대소문자 하나하나를 비교하여 완전일치 여부를 다시 배열로 반환한다. 이를 INDEX, MATCH 함수가 받아서 처리하는 구조이다.

참고로 INDEX, MATCH 함수는 VLOOKUP 함수의 대안으로 자주 거론되는 함수조합으로, 공식처럼 외워두면 매우 편리하다. [별도포스팅](https://tezblog.github.io/post/excel-index-match-for-vlookup-alternative)에 소개하였으니 참고해보기 바란다.