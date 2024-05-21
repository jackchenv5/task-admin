#!/bin/bash
#pip install djangorestframework
[ -n "$(pip list  |grep Django)" ] || pip install django
[ -n "$(pip list  |grep djangorestframework)" ] || pip install djangorestframework
[ -n "$(pip list  |grep django_filter)" ] || pip install django_filter
cd ./task_api && python3 manage.py runserver 