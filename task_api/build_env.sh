#!/bin/bash
[ -n "$(pip3 list  |grep virtualenv)" ] || pip3 install virtualenv -i http://mirrors.maipu.com/pypi/Packages/simple  virtualenv --trusted-host mirrors.maipu.com 
source env/bin/activate
# 安装依赖软件
[ -n "$(pip3 list  |grep Django)" ] || pip3 install django -i http://mirrors.maipu.com/pypi/Packages/simple  virtualenv --trusted-host mirrors.maipu.com 
[ -n "$(pip3 list  |grep djangorestframework)" ] || pip3 install djangorestframework -i http://mirrors.maipu.com/pypi/Packages/simple  virtualenv --trusted-host mirrors.maipu.com 
[ -n "$(pip3 list  |grep jango-filter )" ] || pip3 install django_filter -i http://mirrors.maipu.com/pypi/Packages/simple  virtualenv --trusted-host mirrors.maipu.com 
