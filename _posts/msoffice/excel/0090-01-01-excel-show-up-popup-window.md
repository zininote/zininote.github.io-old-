---
layout: post
title: "마우스 우클릭 팝업창이 제대로 나오지 않을 때 해결방법"
updated: 2021-08-17
tags: [msoffice,excel]
---

## 마우스 우클릭 팝업창

엑셀에서 셀을 선택한 다음, 마우스 우클릭을 하면 아래처럼 팝업창이 뜬다.

![그림00](/img/msoffice/excel/excel-0017.png)

그러나 어떤 이유에서든 이 팝업창 메뉴가 제대로 보이지 않을 때가 있는데, 아래와 같이 해결해보자.

## VBA 코드로 해결

엑셀 화면에서 ALT + F11 키를 눌러 VBA Editor 를 연다. VBA Editor 에서 CTRL + G 키를 누르면 "직접실행" 창이 나오는데, 그 창에 아래 코드를 넣는다.

```vb
Application.CommandBars("Cell").Reset
Application.CommandBars("Cell").enabled=true
```
{:.vba}

한줄한줄 입력할 때마다 정확히 Enter 키를 눌러준다. 아무런 일도 안일어나는 것 같은데, 일단 엑셀화면으로 돌아가서 팝업창이 제대로 뜨는지 확인을 하자.

참고로, 위 코드들은 셀을 선택 후 우클릭 눌렀을 때 나오는 팝업창을 다시 리셋하고, 사용 가능토록 엑셀에 지시하는 명령문이다.