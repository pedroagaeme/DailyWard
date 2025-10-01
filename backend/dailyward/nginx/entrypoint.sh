echo "$CERT_PEM" > /etc/letsencrypt/fullchain.pem
echo "$CERT_KEY" > /etc/letsencrypt/privkey.pem

exec nginx -g 'daemon off;'