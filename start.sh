#!/bin/bash
cd ./web/ && pnpm dev 
cd ./task_api && python manage.py runserver 