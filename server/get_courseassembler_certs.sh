#!/bin/bash
cd ~
./certbot-auto certonly --manual -d preprod.courseassembler.com -d www.courseassembler.com --preferred-challenges dns-01 --server https://acme-v02.api.letsencrypt.org/directory --email tim@coursesuite.com.au --agree-tos --no-eff-email

