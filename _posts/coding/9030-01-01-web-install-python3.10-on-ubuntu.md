---
layout: post
title: "Ubuntu 에 Python 최신 버전 설치하기"
updated: 2022-01-09
tags: [coding,web]
---

## Ubuntu 와 Python

Ubuntu 를 설치하면 기본으로 Python 이 설치되어 있다. [구름 IDE](https://ide.goorm.io/) 에서 Python 연습을 위해 Black 로 Ubuntu 18.04 컨테이너를 생성했는데, 기본으로 설치되어있는 Python 3 의 버전이 3.6.8 이었다. 업그레이드가 필요했다.

## Python 3.10 설치

구글링을 통해 아래와 같이 설치할 수 있었다. 위에서부터 순서대로 입력하면 된다.

```bash
sudo apt update
sudo apt install software-properties-common -y
sudo add-apt-repository ppa:deadsnakes/ppa -y
sudo apt install python3.10
sudo apt install python3.10-distutils
wget https://bootstrap.pypa.io/get-pip.py
python3.10 get-pip.py
```
{:.bash}

여기까지 했으면 아래 명령어를 통해 원하는 모듈을 설치할 수 있다.

```bash
python3.10 -m pip install [원하는모듈이름]
```
{:.bash}

## 가상환경 설치

가상환경을 위해서 아래와 같이 순서대로 입력하면 된다.

```bash
python3.10 -m pip install virtualenv
```
{:.bash}

이제 원하는 디렉토리로 이동한다. 예시로 `mysite` 란 이름의 가상환경을 설정해보자.

```bash
virtualenv mysite
cd mysite
source bin/activate
```
{:.bash}

가상환경이 설정되면, 터미널 프롬프트 앞에 `(mysite)` 라고 표시가 된다.

가상환경을 나가고 싶다면 아래와 같이 입력하면 된다.

```bash
deactivate
```
{:.bash}
