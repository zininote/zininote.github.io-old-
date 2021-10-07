---
layout: post
title: "동적으로 콤보박스 목록 구현하기"
updated: 2021-08-16
tags: [msoffice,excel]
---

## 엑셀 콤보박스

엑셀에서 문서를 멋드러지게 보이도록 하기 위해 아래처럼 콤보박스를 사용하고 싶을 때가 있다.

![그림00](/img/msoffice/excel/excel-0007.png)

보통 이 기능은 "데이터 유효성 검사" > "목록" 기능을 통해 구현하고는 하지만, 이렇게 만들어진 콤보박스의 경우 해당 셀을 선택하였을 경우만 Dropdown 버튼이 활성화된다는 문제가 있다.

아래처럼 "개발도구" > "양식 컨트롤" 안에 있는 기능으로 콤보박스를 구현해야 항상 Dropdown 버튼이 보인다. (만일 "개발도구" 탭이 보이지 않는다면 "파일" > "옵션" > "리본 사용자 지정" 에서 "개발도구" 가 보이도록 활성화하면 된다.)

![그림01](/img/msoffice/excel/excel-0008.png)

## 동적 콤보박스란?

![그림02](/img/msoffice/excel/excel-0009.png)

- [dynamic-combo-box.xlsx](/resource/msoffice/excel/dynamic-combo-box.xlsx)
{:.file}

위 엑셀 파일을 다운 받아서 열어보면 "동적 콤보박스" 가 무엇을 의미하는지 알 수 있다. "자치구" 선택에 따라 "행정동" 콤보박스에 나오는 목록이 달라지는 것을 확인할 수 있는데, 바로 이와 같이 상황에 따라 목록 형태가 달라지는 콤보박스를 "동적 콤보박스" 라 한다.

## 구현 방법

위 엑셀을 만드는 방식을 순서대로 정리하였다.

*1. 사전준비*

먼저 위 엑셀 그림과 같은 화면을 구성한다. "자치구"와 "행정동"을 선택할 수 있도록 위에서 언급한 양식컨트롤로 콤보박스를 2개 배치하였다.

*2. 이름정의*

"이름 관리자" (CTRL + F3) 기능을 선택하여 아래와 같이 "관악구", "동작구", "영등포구", "자치구" 이름정의를 하였다.

![그림03](/img/msoffice/excel/excel-0010.png)

*3. "자치구" 콤보박스 속성 정의*

"자치구" 콤보박스 위에 마우스 커서를 대고 우측 버튼을 누른 뒤 "컨트롤 서식"을 선택한다. 새로 뜨는 팝업창의 "컨트롤" 탭을 선택한 뒤 아래와 같이 입력하였다.

![그림04](/img/msoffice/excel/excel-0011.png)

"입력 범위" 는 해당 콤보박스를 눌렀을 때 보여줄 항목 내용이 있는 범위를 지정하는 것이다. 미리 "자치구"라는 이름정의를 하였으므로 자치구라고 입력을 하였다.

"셀 연결" 은 콤보박스를 통해 선택한 항목이 저장될 셀을 지정하라는 것이고, 여기서는 콤보박스에 가려져서 보이지 않는 H2 셀을 지정하였다. "셀 연결" 로 지정한 셀에 저장되는 값은 항목들의 index 가 되는데, 예를들어 두번째 항목을 콤보박스에서 선택했다면 연결된 셀에 저장되는 값은 2 이다.

"목록 표시 줄 수" 는 콤보박스를 눌렀을 때 한번에 보여줄 목록 개수를 의미한다. 99 를 지정하였으므로 최대 99개의 항목들이 한번에 보여지게 된다.

*4. "행정동" 이름정의*

아래와 같이 "행정동"이라는 이름정의를 추가하였다. 범위가 아닌 수식으로 지정하였다.

![그림05](/img/msoffice/excel/excel-0012.png)

사전에 "자치구" 콤보박스의 연결 셀을 H2로 지정했었다. 따라서 H2에 들어있는 index 번호를 받아서 INDEX 함수를 통해 선택한 자치구 항목을 복원하고 INDIRECT 함수를 통해 다시 참조범위를 반환하는 형태다. 동적 콤보박스의 핵심에 해당하는 부분으로 선택한 자치구에 따라 반환하는 참조범위가 달라진다.

*5. "행정동" 콤보박스 속성 정의*

두번째 콤보박스의 컨트롤 속성은 아래와 같이 지정하였다.

![그림06](/img/msoffice/excel/excel-0013.png)

여기까지 진행한 뒤 보면 "자치구" 콤보박스에 따라 "행정동" 콤보박스에 표시되는 목록이 달라지는 것을 확인할 수 있다.

하지만, 중요한 문제점이 발견된다. 콤보박스와 셀 내용이 불일치하는 문제다. 무슨 말이냐면, "자치구"에서 "영등포구"를 선택한 뒤 "행정동"을 "영등포동"으로 설정하면 H2 셀은 3 이, H4 셀은 9 가 입력이 된다. 정상적인 경우이다. 이제 이 상태에서 "자치구"를 "관악구"로 바꾸면 "행정동"도 자동으로 "신림동"으로 바뀌는데 H4 셀은 여전히 9가 입력이 되어 있다. 콤보박스에 표시된 항목과 실제 연결된 셀 내용이 불일치하고 있다.

"영등포구"에 속한 "행정동"은 9개이지만 "관악구"에 속한 "행정동"은 3개밖에 없기 때문에 나타나는 오류이다. 반대로 "관악구", "신림동"을 먼저 선택한 뒤 "영등포구"로 바꾸는 경우라면 큰 문제가 되지 않는다.

*6. 문제점 수정*

I4 셀에는 아래 수식을...

```excel
= MIN( H4, ROWS( INDIRECT( INDEX( 자치구, H2 ))))
```
{:.excel}

H11 셀에는 아래 수식을 입력하였다.

```excel
= INDEX( 자치구, H2 ) & " " & INDEX( INDIRECT( INDEX( 자치구, H2 )), I4 )
```
{:.excel}

I4 셀수식은 위에서 지적한 문제를 수정하도록 되어있는데, 예를들어 위와 같이 "영등포구", "영등포동"에서 "관악구"로 바꿨을 때처럼 항목의 수가 적은 것으로 변경되었다면 적은 숫자의 마지막을 가리키도록 "관악구"에 속한 "행정동" 크기를 ROWS 함수와 MIN 함수를 통해서 반환하도록 했다.

그리고 H11 셀에는 "자치구" 콤보박스에서 선택한 항목이 연결된 H2 셀과, "행정동" 콤보박스에서 선택한 항목이 연결된 H4 셀의 문제를 수정한 I4 셀을 참조하여 실제 콤보박스에서 선택한 내용이 나타나도록 하였다.