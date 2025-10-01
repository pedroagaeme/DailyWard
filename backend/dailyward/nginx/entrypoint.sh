#!/bin/sh
mkdir -p /etc/letsencrypt/live/dailyward.app/
echo "$CERT_PEM_BASE64" | base64 -d > /etc/letsencrypt/live/dailyward.app/fullchain.pem
echo "$CERT_KEY_BASE64" | base64 -d > /etc/letsencrypt/live/dailyward.app/privkey.pem

exec nginx -g 'daemon off;'
