---
layout: post
title: "Python 으로 Hit Counter 만들어서, 블로그에 삽입해보기 - 01"
updated: 2020-11-28
tags: [dev,blog]
---

## Hit Counter

깃허브를 이리저리 돌아다니다보니, 아래와 같은 뱃지가 눈에 띄었다.

![그림00](https://zininote.github.io/img/dev/dev-3030-01-01-00.png)

새로고침을 할 때마다 숫자가 증가한다. 이른바 Hit Counter 라는 물건인데, 해당 페이지가 생성된 뒤 얼마나 노출이 되었는가를 나타낸다.

구글에서 "github hit counter" 로 검색 해보면, Hit Counter 배지를 설치할 수 있게 도와주는 여러 사이트를 볼 수 있는데, 대부분은 SVG 파일 형식으로 제공하면서, 전체 카운트 횟수만을 제공하였다.

그 가운데서도 어느 [훌륭한 분](https://medium.com/@gjbae1212/github-repository-%EB%B0%A9%EB%AC%B8%EC%88%98%EB%A5%BC-%ED%8A%B8%EB%9E%98%ED%82%B9-%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-1df4dfc5509c)이 만든 Hit Counter 는 "오늘 카운트 수/전체 카운트 수" 형태로 제공하는데, 아쉽게도 날짜 판별이 GMT 기준이라, 우리나라에서는 오전 9시가 되어야 "오늘 카운트 수"가 초기화 된다.

이런저런 아쉬운 점들이 있어서 그런지 스스로 개발해보고자 하는 욕구가 생겼다. 일단 아래와 같이 만들어보기로 해봤다.

- 특정 페이지 Hit Count 를, 한국시간대를 기준으로, 어제 / 오늘 / 전체 형태로 표시
- CSS 로 자유로운 디자인이 가능하도록, 서버에서 텍스트 형태로 카운트 전달받음
- 서버 부하를 줄이기 위해, GET 요청을 한 곳이 본 블로그일 경우만 처리

실제로 20년 11월 28일 현재, 지금 블로그는 아래와 같이 Hit Counter 가 나타난다. (투박한 형태를 선호하기에 굳이 CSS 스타일링은 하지 않았다.)

![그림01](https://zininote.github.io/img/dev/dev-3030-01-01-01.png)

## 구현 방법

깃허브에 이런저런 Hit Counter 소스가 공개가 되었기에, 어떤 방식으로 구현했는지 살펴보기로 했다. 이 중 Python 으로 구현한 [어느 깃허브 Repo](https://github.com/brentvollebregt/hit-counter) 를 주로 참고했다.

쿼리스트링 형태로 특정 사이트 url 을 넘기면, Python 의 [Flask](https://flask.palletsprojects.com/) 프레임워크로 구현된 서버가 이를 받아서, [SQLite](https://www.sqlite.org/) 데이터베이스에서 url 별로 담겨있는 Count 정보를 갱신하고는, 다시 SVG 형태로 응답하도록 되어있었다.

그리고 서버로는 [PythonAnywhere](https://www.pythonanywhere.com/) 를 사용하고 있었다. 이래저래 구글링도 해보고 실제로 가입도 해보니, 무료로 24시간 서버를 구동하도록 해주는 아주 좋은(👍👍👍) 사이트였다.

본인도 Python 을 사용해서, 비슷한 로직으로 구현, PythonAnywhere 에 올려보기로 했다.

## PythonAnywhere 가입

사이트에 접속하면, 화면에 보이는 "Start running Python online in less than a minute! »" 버튼을 클릭한다.

서비스 플랜에 따른 가격들이 쭉~ 나오는데, "Beginner: Free!" 박스 안의 "Create a Beginner account" 버튼을 클릭한다.

회원가입 창이 나온다. 양식을 작성하되, "username" 부분은 신경써야 한다. 나중에 구현된 서버의 이름이 `https://<username>.pythonanywhere.com` 이 되기 때문이다. 모두 작성했으면, "Register" 버튼을 클릭한다.

대시보드 화면이 나오는데, 상단에 이메일 인증을 해달라는 문구가 보인다. 안정적인 사용을 위해 이메일 인증을 진행해주었다.

아래는 이메일 인증까지 마친 대시보드 화면이다.

![그림02](https://zininote.github.io/img/dev/dev-3030-01-01-02.png)

## PythonAnywhere 세팅

이제 위 그림의 오른쪽 상단에 있는 메뉴 중 "Web" 을 클릭한다. 화면이 전환되면, 왼쪽에 보이는 "Add a new web app" 버튼을 클릭한다.

도메인 이름을 알리는 창이 나타난다. 위에서 언급한 것처럼 `https://<username>.pythonanywhere.com` 으로 표시될 것이다. 그냥 "Next" 버튼을 클릭한다.

프레임워크를 선택하는 창이 나온다. "Flask" 를 선택한 뒤, "Python 3.8" 을 선택했다.

프레임워크가 설치될 경로와 파일이 나온다. 디폴트로 `/home/<username>/mysite/flask_app.py` 가 지정이 되어있는데, 바꾸지 않고 그냥 "Next" 버튼을 클릭했다.

잠시 기다리면 아래와 같은 화면이 나타난다.

![그림03](https://zininote.github.io/img/dev/dev-3030-01-01-03.png)

그리고 웹브라우저 새 탭을 열고, 주소창에 `<username>.pythonanywhere.com` 이라고 쳐보자. "Hello from Flask!" 라는 문장이 나온다. 여기까지 진행됐다면, 무사히 웹페이지가 설치가 된 것이다. 👏👏👏 짝짝짝!!!

다시 위 그림 화면으로 돌아가보자. 필히 알아둬야할 것들이 있다.

우선 "Reload &lt;username&gt;.pythonanywhere.com" 녹색버튼이 보인다. 나중에 Hit Counter 코딩을 하고 파일을 저장할텐데, 이렇게 저장하고나서는 이 버튼을 눌러야 웹페이지에 새로운내용이 반영이 된다. 이 Reload 버튼은 파일 편집화면에도 있으니, 파일 편집화면에서 눌러도 된다. 아래에서 다시 설명한다.

그리고 더 중요한 것이 있는데, "Run until 3 months from today" 노란버튼이다. 영어로 된 설명을 요약해보면 **3개월 안에 이 버튼을 누르지 않으면 서버가 불능이 된다**이다. 친절하게도 예정일이 표시가 되는데, 이 날짜까지 버튼을 누르지 않으면 서버가 먹통이 되는 것 같다. 나중에 실제로 눌러보면, 예정일이 점점 뒤로 밀리는 걸 볼 수 있다.

무료버전이기 때문에 생기는 제약사항인데, 매일도 아지고 3개월이니 큰 문제는 아닐 것 같다.

그리고 반드시 필요한 건 아니지만, 한가지 설정을 변경하기로 했다. 아래쪽으로 내려보면 "Force HTTPS" 가 Disabled 상태인데 Enabled 상태로 바꿨다.

## Hit Counter 코딩 준비

오른쪽 상단 메뉴에서 "Files" 를 선택하자. 아래와 같이 서버 안의 디렉토리와 파일들을 보여준다.

![그림04](https://zininote.github.io/img/dev/dev-3030-01-01-04.png)

전체 디렉토리 구조를 보여주지는 않지만, 사용하기에는 큰 불편은 없었다. 디렉토리를 클릭하면 그 디렉토리 내부로 다시 들어가고, 파일을 클릭하면 파일 편집화면을 열어준다. 그리고 "New directory" 나 "New file" 버튼을 클릭하면 새로운 디렉토리나 파일을 생성할 수 있다.

우선 `mysite` 디렉토리로 들어간다.

여기에서 `counter` 디렉토리를 새로 생성한다. 생성된 다음 자동으로 counter 디렉토리까지 들어간 화면이 나온다. 막 생성된 디렉토리이므로 당연히 하위의 디렉토리나 파일들은 보이지 않는다.

여기에서 이번엔 `__init__.py` 파일을 생성한다. 파일이 생성이 되면서, 자동으로 아래와 같은 파일 편집창이 나타난다.

![그림05](https://zininote.github.io/img/dev/dev-3030-01-01-05.png)

왼쪽 위를 보면, 현재 열려있는 편집창이 어느 파일을 편집중인지를 디렉토리 구조와 알려주고 있다. 디렉토리를 누르면, 해당 디렉토리 내부화면으로 넘어간다.

오른쪽 위에는 편집한 내용을 저장하는 "Save" 버튼도 보이고, 해당 파일을 실행하는 "Run" 버튼도 보인다. 이 "Run" 버튼 오른쪽에는 아이콘으로 표시된 Reload 버튼과 Menu 버튼도 보인다.

파일을 수정하고 저장했으면, 위에서 언급했던 것처럼 Reload 를 해야하는데, 이 편집화면의 Reload 버튼을 눌러도 된다.

여기까지 진행되었으면, 코딩 준비를 마친 것이다. 👌👌👌

Python 을 어느정도 아시는분들은 지금 Counter 모듈을 만들려고 하고 있구나라고 느낄 것이다.

실제 코딩과 이에 대한 설명은 [다음 포스팅](https://zininote.github.io/post/create-hit-counter-02)에서 다루고자 한다.