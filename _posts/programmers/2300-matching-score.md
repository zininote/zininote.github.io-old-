---
layout: post-programmers
title: "LV3: 매칭 점수"
updated: 2020-09-17
cat: programmers
---

## 문제

[프로그래머스, 매칭 점수](https://programmers.co.kr/learn/courses/30/lessons/42893?language=python3)

문제 지문이 길고 이해하기 난해했다. 여러번 읽어보니 어떻게든 필요한 정보를 찾아서 필요한 계산을 하면 되는 문제다.

일단 주어지는 `pages` 에서 추출해야 하는 정보는 사이트 url, 외부링크, 기본점수다. 나머지는 이들을 가지고 매칭점수 계산을 하면 된다. 정보 추출을 위해 정규식을 사용했는데 뭔가 잘 안되는 것 같아 상당히 고생했다. 하지만 덕분에 정규식에 대한 경험치를 더 쌓을 수 있었다.

## 풀이

```python
import re

def solution(word, pages):
    # 1
    infos = {}
    for i, x in enumerate(pages):
        url = re.findall(r'<meta property="og:url" content="(https://.+?)"/>', x)[0]
        b_score = re.findall(r'(?<=[^a-zA-Z]){}(?=[^a-zA-Z])'.format(word), x, re.IGNORECASE).__len__()
        links = re.findall(r'<a href="(https://.+?)">', x)
        infos[url] = {'index': i, 'links': links, 'b_score': b_score, 'l_score': 0, 'm_score': 0}
        
    # 2
    for v in infos.values():
        for url in v['links']:
            if url in infos:
                infos[url]['l_score'] += v['b_score']/len(v['links'])
    
    # 3
    for v in infos.values():
        v['m_score'] = v['b_score'] + v['l_score']
        
    # 4
    return sorted(infos.values(), key=lambda x: (-x['m_score'], x['index']))[0]['index']
```

`# 1` 에서 필요한 정보를 정규식을 추출하여 `infos` 딕셔너리에 `url: {인덱스, 외부링크, 기본점수, 링크점수, 매칭점수}` 형태로 담는다. 다만 링크점수와 매칭점수는 나중에 계산할 것이므로, 일단 0 으로 두었다.

`# 2` 에서 링크점수를 계산한다. 외부링크를 반복하면서 만일 그 주소에 해당하는 사이트가 `infos` 에 있다면, 그 주소의 링크점수를 가산하도록 구성했다.

`# 3` 에서는 매칭점수를 계산한다.

`# 4` 에서는 문제에서 요구하는대로, 매칭점수 내림차순 인덱스 오름차순으로 정렬 후, 제일 앞 요소의 인덱스를 최종리턴한다.

## 참고

만일 실무였다면 정규식 대신 HTML 문서를 파싱하라는 주문을 받았을 것이다. 파싱을 직접 구현하기에는 너무 실력부족이라 외부 모듈을 사용해보기로 했다.

구글링 해보니 Python 에서 HTML 구문을 파싱하는데는 [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/) 모듈이 가장 유명한 것 같다. 하지만 프로그래머스에서는 BeautifulSoup 를 import 할 수 없다. 대신 [html.parser](https://docs.python.org/3/library/html.parser.html) 모듈을 import 할 수 있는데, 아래는 이 모듈을 사용하여 풀어 본 코드다.

```python
# 0
from html.parser import HTMLParser

class MyParser(HTMLParser):
    def __init__(self, word, p):
        self.word = word
        self.url = ''
        self.links = []
        self.b_score = 0
        super().__init__()
        self.feed(p)
        
    def handle_starttag(self, tag, attrs):
        if tag == 'meta':
            tmp = dict((x, y) for x, y in attrs)
            if 'property' in tmp and tmp['property'] == 'og:url':
                self.url = tmp['content']
        if tag == 'a':
            tmp = dict((x, y) for x, y in attrs)
            self.links.append(tmp['href'])
    
    def handle_data(self, data):
        data = ' ' + data.lower() + ' '
        tmp = data.find(self.word.lower(), 1)
        while tmp != -1:
            if not (data[tmp-1].isalpha() or data[tmp+len(self.word)].isalpha()):
                self.b_score += 1
            tmp = data.find(self.word.lower(), tmp+1)

def solution(word, pages):
    #1
    infos = {}
    for i, p in enumerate(pages):
        parser = MyParser(word, p)
        infos[parser.url] = {'index': i, 'links': parser.links, 'b_score': parser.b_score, 'l_score': 0, 'm_score': 0}
        
    # ... 이하 생략
```

먼저 위에 링크를 건 `html.parser` 모듈 설명을 훑어보면, 서브 클래스를 생성하여 일부 함수를 오버라이딩 해서 사용해야 한다고 한다. 예시도 있으니 그렇게 어렵지는 않다.

`# 0` 코드가 서브 클래스이며, 내부에서 url, 외부링크, 기본점수를 구하고 있다. `# 1` 코드는 정규식 대신 이 클래스가 계산한 값들을 가져오는 형태로 바꼈다.

`#2`, `#3`, `#4` 부분은 원코드와 같다.
