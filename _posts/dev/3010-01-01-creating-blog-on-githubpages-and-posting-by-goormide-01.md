---
layout: post
title: "깃허브 페이지 블로그 만들고, 구름 IDE 로 포스팅하기 (1)"
updated: 2020-11-12
tags: [dev,blog]
---

## 본 포스팅은...

[깃허브 페이지](https://pages.github.com/)를 금년 7월에 처음 접한뒤, 이런저런 시행착오를 거치고, 11월부터 본격적(?)으로 블로그를 운영하고 있다. 그리고 블로그에 글을 쓰고, 지우고, 수정하는 것 등등을 [구름 IDE](https://ide.goorm.io/)를 사용하여 나름 편리하게 작업도 하고 있다.

몇개 포스팅으로 나눠서 **깃허브 페이지 서비스를 통해 블로그를 만들고, 구름 IDE 에 연결하여, 첫 포스팅을 등록하는 것 까지의 과정**을, 나름 경험한 내용을 바탕으로 적어보고자 한다.

우선은 깃허브에 가입하고, 깃허브 페이지 공간을 생성하는 것에 대해 포스팅한다.

## 깃허브 회원가입

회원가입을 위해, [깃허브](https://github.com/) 홈페이지에 들어간다. 회원가입 란이 아래처럼 보인다.

![그림00](https://zininote.github.io/img/dev/dev-3010-01-01-00.png)

세 항목 모두 작성해야 한다. 특히 Username 항목은 로그인 ID 이기도 하지만, "(username).githup.io" 라는 블로그 주소를 만들어내기에 신중히 결정해야 한다.

필드를 모두 채웠으면 "Sign up for GitHub" 버튼을 클릭하여, 다음 화면으로 넘어가면 아래와 같은 화면이 보인다.

![그림01](https://zininote.github.io/img/dev/dev-3010-01-01-01.png)

"나선은하"를 고르라는 부분은 매크로 등을 통한 가입을 방지하기 위한 것으로 보인다. 이 말고도 다른 방식으로 검증하는 화면이 나올 수 있다. 여기서는 "나선은하"를 골라주는 것으로 쉽게 인증이 되었다.

인증을 받았으면, 아래 "Join a free plan" 버튼을 클릭하여 다음 화면으로 넘어간다.

이런저런 정보를 입력하는 화면이 나오는데, 그냥 밑에 있는 "Complete setup" 버튼을 클릭하여 다음 화면으로 넘어간다.

이번엔 아래처럼 이메일을 인증하라는 화면이 나온다.

![그림01](https://zininote.github.io/img/dev/dev-3010-01-01-02.png)

이제 새 탭을 열고 본인이 입력한 이메일 서비스로 가보자. 깃허브에서 이메일이 와 있을 것이고, 내용을 보면 아래와 같이 보일 것이다.

![그림03](https://zininote.github.io/img/dev/dev-3010-01-01-03.png)

"Verify email address" 버튼을 클릭해주면 이메일인증도 완료된다.

## Repository 생성

Repository(레포지토리) 혹은 줄여서 Repo(레포)라고 하는 단어는, 하나의 독립된 프로젝트를 위한 저장소라고 생각해도 무관하다. 깃허브 페이지를 위한 Repo 를 생성할 차례다.

아까 회원가입 진행했던 화면을 다시보자. 만일 사이트에서 빠져나온 상태라면 깃허브 홈페이지([https://github.com/](https://github.com/))에 접속한다. 로그인도 필요하다면 화면 우측상단에 위치한 "Sign in" 을 클릭하여 로그인을 한다.

로그인 상태의 깃허브 홈페이지 우측상단에는 메뉴가 있는데, 아래 그림과 같이 "New repository" 를 클릭한다.

![그림04](https://zininote.github.io/img/dev/dev-3010-01-01-04.png)

전환된 화면에선, 새로 생성할 Repo 의 이름을 정해야 한다.

![그림05](https://zininote.github.io/img/dev/dev-3010-01-01-05.png)

위 그림에 같은 곳에 username.github.io 라고 입력한다. 여기서 username 은 본인의 username(로그인 ID) 이다. 예를들어 회원가입할 때 username 을 "abcdef" 라고 했다면, 위 화면에는 abcdef.github.io 를 입력해야 한다는 뜻이다.

위처럼 입력하여 Repo 를 생성하면, 깃허브는 이 Repo 를 https://username.github.io 로 접근할 수 있도록 생성해준다. 만일 다른 이름(예를들어, handsome-guy)을 입력한여 Repo 를 생성한다면, https://username.github.io/handome-guy 로 접근하도록 생성해준다.

참고로 아랫쪽에는 이 Repo 를 공개(Public) 아니면 비공개(Private) 으로 할 건지를 묻는데, 디폴드 값인 공개로 두자. [깃허브 공식문서](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/creating-a-github-pages-site)를 보면, 무료로는 공개로만 깃허브 페이지를 만들 수 있다고 되어 있다.

Repo 이름을 기입했으면, 다른 옵션들은 건들지 말고, 제일 아래 "Create repository" 버튼을 클릭한다. 뭔가 복잡하고 잡다한 코드들이 가득한 화면이 나올 것이다. 이들은 굳이 건들필요없다. 일단 아래와 같은 메뉴를 찾자.

![그림06](https://zininote.github.io/img/dev/dev-3010-01-01-06.png)

여기서 가장 오른쪽 "Settings" 를 클릭해준다. 다시 화면이 전환된다.

설정들이 여럿 보이는데, 건들지말고 스크롤를 내려보자. 중간보다 좀 더 아래쪽으로 가다보면 아래와 같이 깃허브 페이지를 설정하는 화면이 나온다.

![그림07](https://zininote.github.io/img/dev/dev-3010-01-01-07.png)

"Choose a theme" 버튼을 눌러준다. 테마를 고르는 것만으로, 깃허브 페이지 운영에 필요한, 정적 홈페이지 제너레이터 툴인 [Jekyll](http://jekyllrb-ko.github.io/) 설치와 이런저런 초기 설정을 자동으로 해주는 것 같다.

아래와 같이 테마를 고르는 화면이 나오는데, 맘에 드는 스타일을 선택하면 된다. 개인적으로는 장식이 별로 없는 수수한 스타일을 선호하기에, "Minimal" 을 선택했다.

![그림08](https://zininote.github.io/img/dev/dev-3010-01-01-08.png)

선택을 했으면, 위 그림의 오른아래쪽에 보이는 "Select theme" 을 선택한다. 뭔가 Welcome Page 같은 곳으로 연결이 된다. (실은 흔히 말하는 대문화면 편집창으로 연결이 된다.)

여기까지 잘 진행됐으면, 실제로 깃허브 페이지를 이용한 블로그가 완성된다. 이제 웹브라우저에 새로운 탭을 열고, username.github.io 로 접속을 해보자. (만일 다른 이름으로 Repo 를 생성했다면, username.github.io/생성한Repo이름 으로 접속해야 한다.

아래와 같은 화면이 나올 것이다.

![그림09](https://zininote.github.io/img/dev/dev-3010-01-01-09.png)

이제 블로그가 완성되었다👏👏👏 이전의 Welcome Page 같다던 내용이 화면에 보일 것이다.

다음 포스팅에선 구름 IDE 를 세팅하여 깃허브 페이지와 연동해보는 걸 설명하고자 한다.