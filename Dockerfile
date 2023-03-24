FROM node:lts-alpine AS node
ENV BART_PORT 8031

WORKDIR /usr/src/www
# Copy the server code
COPY /server ./

# Copy the site
COPY /css ./public_html/css
COPY /img ./public_html/img
COPY /js ./public_html/js
COPY /favicon ./public_html/favicon
COPY /index.html ./public_html/index.html

EXPOSE $BART_PORT

CMD ["node", "./index.js"]
