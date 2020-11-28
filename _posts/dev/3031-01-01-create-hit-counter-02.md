---
layout: post
title: "Python 으로 Hit Counter 만들어서, 블로그에 삽입해보기 - 02"
updated: 2020-11-28
tags: [dev,blog]
---

[전 포스팅](https://zininote.github.io/post/create-hit-counter-01)에서 이어지는 내용이다.

## counter 모듈 코딩

`/home/zinitest/mysite/counter/__init__.py` 파일을 클릭하여 열린 편집창에 아래와 같은 코드를 입력한다.

```python
from flask import request, make_response
import sqlite3
import datetime as dt

USER = 'username'
JS_TEMPLATE = ';var counter = "{:,} / {:,} / {:,}";'

def render():
    # HTTP 리퍼러가 USER 가 아니거나, url 쿼리가 없으면 -1, -1, -1 리턴
    domain = request.referrer or ''
    url = request.args.get('url') or ''
    if USER not in domain or not url:
        res = make_response(JS_TEMPLATE.format(-1, -1, -1), 200)
        res.headers["Content-Type"] = 'text/javascript'
        return res

    # 데이터베이스가 없다면 CREATE
    conn = sqlite3.connect('./data.db')
    conn.execute('PRAGMA journal_mode=WAL')
    c = conn.cursor()
    c.execute('CREATE TABLE IF NOT EXISTS counter (url VARCHAR(256) PRIMARY KEY, ycount INTEGER, tcount INTEGER, totalcount INTEGER, udate INTEGER);')

    # 해당 url 데이터베이스 정보 SELECT
    today = dt.datetime.now(tz=dt.timezone(dt.timedelta(hours=9))).toordinal()
    ycount, tcount, totalcount, udate = 0, 0, 0, 0
    c.execute('SELECT * FROM counter WHERE url=?', (url,))
    data = c.fetchone()

    # 추출된 정보가 없다면, url 생성하여 INSERT INTO
    if not data:
        ycount, tcount, totalcount, udate = 0, 1, 1, today
        c.execute('INSERT INTO counter(url, ycount, tcount, totalcount, udate) VALUES(?, ?, ?, ?, ?)', (url, ycount, tcount, totalcount, udate))

    # counts 계산하여 UPDATE
    else:
        _, ycount, tcount, totalcount, udate = tuple(data)
        if today-udate == 1:
            ycount, tcount, udate = tcount, 0, today
        elif today-udate > 1:
            ycount, tcount, udate = 0, 0, today
        tcount += 1
        totalcount += 1
        c.execute('UPDATE counter SET ycount=?, tcount=?, totalcount=?, udate=? WHERE url=?', (ycount, tcount, totalcount, udate, url))

    # 데이터베이스 CLOSE
    conn.commit()
    conn.close()

    # 어제, 오늘, 총 카운터 횟수 리턴
    res = make_response(JS_TEMPLATE.format(ycount, tcount, totalcount), 200)
    res.headers["Content-Type"] = 'text/javascript'
    return res
```
{:.python}

자세한 코드의 구조는 보다 아래에 설명한다. 하지만 그 전에 5번째 줄의 `USER = 'username'` 부분만 미리 수정을 해야 한다.

Hit Counter 를 요청한 홈페이지의 도메인안에 `USERNAME` 문구가 포함되어있을 때만 제대로 된 카운트 정보를 구하여 응답한다.

이는 전 블로그에서 정했던 "서버 부하를 줄이기 위해, GET 요청을 한 곳이 본 블로그일 경우만 처리"를 하기 위함이다. 실제로 본인은 `USERNAME = 'zininote'` 로 사용하고 있다. 본 블로그의 도메인인 `zininote.github.io` 에 포함되어 있는 문구이기에 정상적인 응답을 해온다.

## flask_app.py

이젠 `/home/zinitest/mysite/flask_app.py` 를 연다. 이미 초기화 된 코드가 있지만 모두 지우고, 전체 내용을 아래처럼 수정한다.

```python
from flask import Flask
import counter

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello from Flask!'

@app.route('/counter')
def route_counter():
    return counter.render()
```
{:.python}

사실 초기화 코드에, `import counter` 구문과 제일 아래 라우트 분기문이 추가됐을 뿐이다.

여기까지 진행했으면 저장을 하고, Reload 버튼을 클릭하자.

## 중간 테스트

웹브라우저에서 새 탭을 열고, 주소에 `<username>.pythonanywhere.com/counter` 라고 입력을 해보자. 아래 그림과 같이 나왔다면 성공적이다.

![그림00](https://zininote.github.io/img/dev/dev-3031-01-01-00.png)

내 블로그를 통해서 서버에 접근을 한 것이 아니기에, 제대로 되지 않은 Hit Count 정보 -1, -1, -1 을 보내온다. 일단은 👏👏👏 짝짝짝!

## 내 블로그 설정

이제 포스팅이든 페이지든 Hit Counter 가 필요한 웹페이지 HTML 코드에 삽입하면 된다. 쿼리스트링을 붙여서 GET 요청을 하면 된다.

```html
<script src="https://<username>.pythonanywhere.com/counter?url=<Counter를붙이기원하는사이트의URL>"></script>
```
{:.html}

보통은 어떤 포스트를 열었을 때, 그 포스트의 Counter 가 보여야하므로, 위 `<Counter를붙이기원하는사이트의URL>` 부분에는 위 코드를 붙인 사이트의 주소를 기입해주면 된다. Jekyll 을 사용하는 깃허브 페이지에서는 `{% raw %}{{ site.url }}{{ page.url }}{% endraw %}` 이라는 템플릿을 붙이면 된다.

실제로 본인은 아래와 같이 사용하고 있다.

```html
<!-- 생략 -->
<span id="counter"><span id="counter-title">Hits (Yesterday / Today / Total): </span><span id="counter-hits"></span></span>

<!-- 생략 -->
<script src="https://<username>.pythonanywhere.com/counter?url={% raw %}{{ site.url }}{{ page.url }}{% endraw %}"></script>
<script>
  document.getElementById('counter-hits').innerHTML = counter;
</script>
```
{:.html}

PythonAnywhere 서버로부터 받는 텍스트는, 눈치챈 분들도 있겠지만, Javascript 코드다. 처음에는 그냥 텍스트를 받으려고 하였으나, Same-Origin Policy 에 따른 계속된 에러로 그냥 편법을 써서 Javascript 처럼 받도록 했다.

넘겨받는 정보를 보면 `;var counter = "어제 / 오늘 / 전체";` 식으로 아예 `count` 라는 변수가 Hit Counter 문자열을 받도록 되어있으므로, 이를 특정 ID를 가진 태그 내부에 `innerHTML` 속성으로 껴넣도록 구성했다. 스타일링이 필요하다면 CSS 문법으로 span 태그를 조작하면 될 것이다.

## 코드 구조 이해

Flask 모듈에 대한 설명은 이 블로그가 설명하고자하는 범위를 넘어선다. 이에 대해서는 무료로 공개되어 있는 [점프 투 플라스크](https://wikidocs.net/book/4542) 를 참고해보자. 여기서는 Hit Counter 를 구성한 로직 정도만 간단히 설명한다.

가장 위의 `__init__.py` 파일이 Hit Counter 코딩이다. `<username>.pythonanywhere.com` 서버에 Counter 를 호출한 도메인의 이름을 알아내고, Hit Counter 를 Javascript 로 구성하여 응답하기 위해 Flask 모듈의 `request`, `make_response` 를 import 하였다.

그리고 데이터베이트로는 SQLite 를 사용하였다. 필드는 url, ycount, tcount, totalcount, udate 인데, url 은 KEY 역할을, 그리고 순서대로, 어제 카운트, 오늘 카운트, 전체 카운트, 가장최근에 업데이트 된 날짜를 나타낸다.

가장 이해가 필요한 부분은 Hit Count 를 늘려가는 부분일 것이다. 아래와 같다.

Python 의 datetime 모듈 안에있는 now 함수로 오늘의 날짜를 구하고, GMT+9 처리하고, toordinal 함수로 정수 시리얼번호로 만들어 `today` 에 할당한다. 그리고 데이터베이스에 저장되어 있는 해당 url 의 `udate` 와 비교한다.

차이가 1 이라면, 날짜가 바뀐 다음 새롭게 서버에 Hit Counter 요청이 된 것이므로, 기존 `tcount` 정보를 `ycount` 에 두고, `tcount`, `udate` 는 초기화한다. 차이가 1 을 넘는다면 날짜가 두번이상 바뀐 다음에 새롭게 서버에 요청이 된 것이므로, `ycount`, `tcount`, `udate` 모두 초기화를 한다. 그리고 모든 경우에 대해 `tcount` 와 `totalcount` 를 늘리고 데이터베이스를 업데이트 해준다.
