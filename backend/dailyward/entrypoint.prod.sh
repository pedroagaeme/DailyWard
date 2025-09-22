#!/bin/bash

# Run migrations
python manage.py migrate --noinput


# Start Gunicorn
exec gunicorn dailyward.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3 \