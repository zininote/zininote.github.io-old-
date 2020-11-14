---
layout: post
title: "깃허브 페이지, rouge 하이라이터 대신 highlight.js 사용"
updated: 2020-11-14
tags: [dev,blog]
---

## Jekyll Rouge 하이라이터

[깃허브 페이지](https://pages.github.com/)에서 기본으로 가장 많이 사용되는, 정적 웹페이지 제너레이터인 [Jekyll](https://pages.github.com/) 의 기본 코드 하이라이터는 [Rouge](http://rouge.jneen.net/) 이다.

하지만 아쉬운 점이 있엇는데, Rouge 는 MS오피스의 Excel 문법을 지원하지 않는다. Wordpress 로 만든 블로그에 있는 Excel 관련 자료를 옮겨야하는데 다소 아쉬웠다. 그래서 Excel 하이라이팅을 지원하는 [Highlight.js](https://highlightjs.org/) 로 바꾸기로 마음 먹었다.

## Rouge 작동 끄기

먼저 Rouge 작동을 꺼야한다. 구글 등에서 검색하면 여기저기서 쉽게 찾아볼 수 있다. 아래 코드를 _config.yml 파일에 추가로 삽입한다.

```yaml
markdown: kramdown
kramdown:
    syntax_highlighter_opts:
        disable: true
```
{:.yaml}

## highlight.js 삽입

아래와 같이 사용하는 것이 가장 간단한 것 같다. jekyll 이 렌더링하는 가장 기본 뼈대(?)인 default.html 의 <head> 태그와 <body> 태그에 아래와 같이 코드를 켜 넣는다.

```html
<head>
  <!-- 생략 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.3.2/styles/github.min.css"/>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.3.2/highlight.min.js"</script>
</head>
<body>
  <!-- 생략 -->
  <script>hljs.initHighlightingOnLoad();</script>
</body>
```
{:.html}

하지만 CDN 등에서 js 파일을 가져오면, 기본적으로 많이 쓰는 언어만 지원할 뿐, Excel 은 지원하지 않는다. 그래서 직접 js 파일을 다운받아서 사용하기로 했다.

Highlight.js 의 [다운로드 페이지](https://highlightjs.org/download/)에 가면 하이라이팅을 원하는 언어를 선택하여 다운로드가 가능하다. 중간에 보면 본인이 원하는 Excel fomulae 도 있다.

zip 파일로 다운이 되는데, 여기에 보면 highlight.pack.js 파일이 있다. 이를 깃허브 페이지에 올리고, default.html 파일에 붙이면 된다. (나머지 코드는 위와 똑같이 두면 된다.)

## 사용법

Highlight.js 를 사용한다고 해서 특별히 달라지는 건 없다. 기존 Rouge 를 적용하듯이 마크다운을 작성하면 되며, 브라우저에 띄울 때, 단지 하이라이팅을 Highlight.js 가 해줄 뿐이다.
