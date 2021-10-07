---
layout: post
title: "VBA: 정규표현식으로 텍스트 안에서 특정 문자열 추출하기"
updated: 2021-08-16
tags: [msoffice,formula]
---

## 정규표현식

프로그래밍 영역에서 말하는 정규표현식 (줄여서 정규식, 영어로는 Regular Expression) 이란 문자열을 특정한 규칙으로 표현한 형식이다. (정규표현식이 무엇인지 잘 모르는 분들은 따로 [위키피디아](https://ko.wikipedia.org/wiki/%EC%A0%95%EA%B7%9C_%ED%91%9C%ED%98%84%EC%8B%9D) 내용을 참고해보기 바란다.) 

정규표현식을 사용하면 장황한 텍스트 속에서 원하는 부분만 추출하거나, 주어진 텍스트가 형식(예를 들어 이메일 형식)에 맞게 제대로 쓰여져 있는지 검사하는데 있어 상당히 편리하다. 이 포스팅에서는 엑셀에서 정규표현식을 사용하여 원하는 특정 문자열을 추출하는 사용자함수를 소개해 보고자 한다.

## VBA 코드

먼저 ALT + F11 키를 눌러 VBA Editor 화면을 열고서는, "삽입" > "모듈" 메뉴를 선택하면 열리는 창에 아래 코드를 복사하여 붙여넣자.

```vb
Function RegexExecute(r As Range, p As String, Optional g As Boolean = False) As Variant
    On Error GoTo ErrHandler
    
    Dim str As String, ptn As String
    str = CStr(r.Cells(1, 1).Value)
    ptn = CStr(p)
    
    Set regex = CreateObject("VBScript.RegExp")
    With regex
        .IgnoreCase = False
        .MultiLine = False
        .Global = g
        .Pattern = ptn
    End With
    
    If regex.Test(str) Then
        Set matches = regex.Execute(str)
        Dim temp As String
        temp = ""
        For Each Match In matches
            temp = temp & Match
        Next
        RegexExecute = temp
        Exit Function
    End If
    
ErrHandler:
    RegexExecute = CVErr(xlErrNA)
End Function
```
{:.vba}

위 코드를 모듈에 넣었다면 바로 사용할 준비가 된다. 엑셀로 돌아가서 바로 사용자함수를 사용할 수 있다.

## 함수식 사용

![그림00](/img/msoffice/formula/formula-0017.png)

```excel
= RegexExecute( 셀, "정규표현식", 전체검사여부 )
```
{:.excel}

위 함수식에서 `셀` 부분에는 정규표현식을 적용하고 싶은 텍스트가 포함된 셀을 지정하면 되고, 따옴표 안의 `정규표현식`은 말 그대로 추출하거나 검사하고 싶은 대상의 정규표현식을 적용하면 된다. 세번째인 전체검사여부는 TRUE 혹은 FALSE 값을 지정하며 (FALSE 의 경우 생략 가능), TRUE 의 경우 셀 에서 정규표현식에 해당하는 부분을 모두 찾아내어 그 결과를 보여주며, FALSE 나 생략의 경우 첫번째로 해당하는 부분만 결과를 보여준다.

만일 셀에 정규표현식에 해당되는 형식이 검출되지 않는다면 #N/A 에러를 발생시킨다.

다시 예시를 보면 B2 셀에 뭔가 모델명과 같은 텍스트가 담겨있는데, `[0-9]+` 라는 정규표현식을 사용하여 숫자만 추출하였다. 세번째 인수를 생략한 수식에는 제일 앞 숫자인 "103" 만 표시가 되었으며, 세번째 인수에 TRUE 값을 준 수식에는 모든 숫자를 붙인 결과가 표시되고 있다.

B9 셀에는 이런저런 글과 이메일 주소가 함께 있다. 구글에서 "email regex" 라고 검색만 해도  이메일 형식을 표현한 정규표현식을 구할 수 있다. 그 중 하나를 적용해보았다. 정규식 규칙을 더 알고싶다면 [MDN 도움말](https://docs.microsoft.com/ko-kr/dotnet/standard/base-types/regular-expression-language-quick-reference)을 참고해보기 바란다.

또한, 주어진 정규표현식에 부합하는 부분이 전혀없는 텍스트는 에러를 반환한다는 점을 이용해서, IFERROR 함수와 같이 사용하면 주어진 이메일주소 (혹은 핸드폰번호, 주민등록번호 등) 가 정확하게 규정에 맞게 쓰여져 있는지도 검사 할 수 있다.