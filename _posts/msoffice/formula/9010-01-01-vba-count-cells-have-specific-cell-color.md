---
layout: post
title: "VBA: 특정한 배경색을 지닌 셀 개수 세는 함수"
updated: 2021-08-13
tags: [msoffice,formula]
---

## 특정 배경색을 가진 셀 개수 세는 함수식

"배경색" 과 같이 셀 내용이 아닌 셀의 속성에 따른 함수 계산을 하고 싶은 경우가 있는데, 결론부터 얘기하자면 엑셀 내장 함수만으로는 구현이 불가능하다. 하지만 VBA 사용자정의 함수를 사용하면 셀 속성에 따른 사용자함수식을 만들 수 있다.

특정 배경색을 가진 셀 개수 세는 VBA 함수식을 아래부터 소개하고자 한다. 그리고 이 함수식을 사용할 때의 치명적인 문제점도 같이 언급할 것이다.

## VBA 코드

먼저 ALT + F11 키를 눌러 VBA Editor 화면을 열고서는, "삽입" > "모듈" 메뉴를 선택하면 열리는 창에 아래 코드를 복사하여 붙여넣자.

```vb
Function CountColor(tar As Range, ref As Range)
    Application.Volatile
    
    Dim t As Range
    Dim r As Long
    Set t = Intersect(tar, tar.Parent.UsedRange)
    r = ref.Interior.ColorIndex
    
    For Each i In t
        If i.Interior.ColorIndex = r Then
            CountColor = CountColor + 1
        End If
    Next i
End Function
```
{:.vba}

코드를 다 입력했다면 다시 엑셀로 돌아가기면 하면 된다.

## 함수식 사용

![그림00](/img/msoffice/formula/formula-0015.png)

```excel
= CountColor( 범위, 참고셀 )
```
{:.excel}

지정한 `범위` 안에 `참고셀`과 같은 배경색을 지닌 셀 개수를 반환한다.

사용함에 있어 치명적인 문제점이 있다. 처음 사용해보면 제대로 작동하는 것 같지만 "출근일" 열 셀 배경색을 바꿔봐도 함수의 결과값이 변하지 않는다는 것을 알 수 있다. 자동 재계산 Logic 때문인데, **엑셀은 셀 내용이 바뀌어야 재계산을 하지, 글자색이나 폰트변경과 같은 셀 속성이 바뀌는 것만으로는 재계산을 수행하지 않도록 설계**되어있기 때문이다.

셀 배경색을 바꾼 다음에 수식 강제 계산 키(ALT + CTRL + SHIFT + F9)를 눌러야 제대로 작동한다. 즉, 배경색 바꾸고 나서는 일일이 수동 계산을 해줘야 하기에, 사실상 셀 속성에 따른 사용자함수 구현은 실용성이 극히 떨어진다는 의미이기도 하다.