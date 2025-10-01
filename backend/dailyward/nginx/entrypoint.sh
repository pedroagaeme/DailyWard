echo "$CERT_PEM" > /etc/letsencrypt/live/dailyward.app/fullchain.pem
echo "$CERT_KEY" > /etc/letsencrypt/live/dailyward.app/privkey.pem

exec nginx -g 'daemon off;'