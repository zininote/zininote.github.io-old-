---
layout: post
title: "셀 서식이 너무 많습니다. 메시지 해결하기"
updated: 2021-08-16
tags: [msoffice,excel]
---

## 셀 서식이 너무 많습니다. 메시지

엑셀 작업을 하다보면 종종 아래와 같은 짜증나는 팝업 창을 만나는 경우가 있다. 이 메시지가 뜨면 글꼴 변경과 같은 서식 지정이 먹통이 된다.

![그림00](/img/msoffice/excel/excel-0005.png)

잘 사용하지는 않지만 엑셀에도 "스타일" 기능이 있는데 위 메시지가 뜨는 경우에는 스타일 안에 뭔가 쓰레기 값이 넘쳐나는 경우가 많다. 구글링을 해보면 이 스타일이 엑셀이 허용하는 한계치(약 6만4천개)를 초과하는 경우 발생하는 에러 메시지로 보인다.

## 문제 해결

먼저 엑셀 파일의 복사본을 미리 만들어둔다. **VBA 매크로의 실행은 되돌리기가 불가능**하기에, 만에하나 있을지 모를 사고를 예방하기 위해서다.

복사본을 열고, ALT + F11 키를 눌러 VBA Editor 를 연 뒤, "삽입" > "모듈" 메뉴를 선택하면 나오는 창에 아래 VBA 코드 (매크로) 를 입력하자. 아래 코드는 매크로를 실행하면 기본으로 내장된 스타일을 제외하고 쓰레기 스타일 값들을 지우는 기능을 한다.

```vb
Sub RemoveStyles()
    Dim li As Long
    On Error Resume Next
    
    With ActiveWorkbook
        For li = .Styles.Count To 1 Step -1
            If Not .Styles(li).BuiltIn Then
                .Styles(li).Delete
            End If
        Next
    End With
End Sub
```
{:.vba}

이제 코드 안에 커서를 두고, F5 키를 눌러 실행을 한다. 매크로를 실행하는데 좀 오래 걸리는데 1~2분 정도 기다리면 된다. 실행이 완료된 후 다시 엑셀로 돌아가면 글꼴이나 색상 변경이 자유로이 되는 것을 확인할 수 있을 것이다.