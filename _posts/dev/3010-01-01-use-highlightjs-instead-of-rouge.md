---
layout: post
title: "깃허브 페이지 하이라이터, Rouge 대신 Highlight.js 사용하기"
updated: 2020-11-19
tags: [dev,blog]
---

## Jekyll Rouge 하이라이터

[깃허브 페이지](https://pages.github.com/)에서 기본으로 가장 많이 사용되는, 정적 웹페이지 제너레이터인 [Jekyll](https://pages.github.com/) 의 기본 코드 하이라이터는 [Rouge](http://rouge.jneen.net/) 이다.

하지만 아쉬운 점이 있엇는데, Rouge 는 MS 오피스의 Excel 문법을 지원하지 않는다. 본인의 Wordpress 블로그에 있는 Excel 관련 자료를 옮겨야하는데 다소 아쉬웠다. 그래서 Excel 하이라이팅을 지원하는 [Highlight.js](https://highlightjs.org/) 로 바꾸기로 마음 먹었다.

## Rouge 작동 끄기

먼저 Rouge 작동을 꺼야한다. 구글 등에서 검색하면 여기저기서 쉽게 찾아볼 수 있다. 아래 코드를 _config.yml 파일에 추가로 삽입한다.

```yaml
markdown: kramdown
kramdown:
    syntax_highlighter_opts:
        disable: true
```
{:.yaml}

## Highlight.js 코드 삽입

[Highlight.js](https://highlightjs.org/) 홈페이지 방문해서 둘러보면 사용법이 나온다. js 파일과 css 는 CDN 을 이용하면 된다. 본 찌니노트 블로그에서는 아래와 같이 사용했다.

```html
<head>
    <!-- 생략 -->
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.17.1/styles/github.min.css"/>
</head>
<body>
    <!-- 생략 -->
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.17.1/highlight.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.17.1/languages/excel.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.17.1/languages/vbnet.min.js"></script>
    <script>
        hljs.initHighlightingOnLoad();
    </script>
</body>
```
{:.html}

사실 가장 최신 버전은 10 이다. 하지만 이 **10 버전부터는 공식적으로 IE11 을 지원하지 않는다.** 아직 우리나라는 IE 비중이 좀 있기에 9.17.1 버전을 사용하였다.

&lt;head&gt; 태그 안에는 하이라이팅 디자인 css 파일을 삽입한다. [Highlight.js 데모](https://highlightjs.org/static/demo/) 사이트에 가면, 각종 디자인 샘플을 확인할 수 있다.

&lt;body&gt; 태그 제일 아래쪽에 js 파일들을 삽입한다. highlight.min.js 만 삽입해도 웬만한 언어는 지원하지만, Excel, VBA 는 지원하지 않는다. 따라서 별도의 랭귀지팩을 삽입했다. highlight.min.js 아래에 삽입되어있는 두 js 파일이 그것이다.

## 사용법

Highlight.js 를 사용한다고 해서 마크다운 작성이 특별히 달라지거나 하는 건 없다. 기존 Rouge 를 적용하듯이 작성하면 되며, 브라우저에 띄울 때, 단지 하이라이팅을 Highlight.js 가 해줄 뿐이다.
