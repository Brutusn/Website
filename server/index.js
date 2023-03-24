// @ts-check
const port = process.env.BART_PORT ?? 8027;
const host = '0.0.0.0';
const days_30 = 2592000000;

const express = require('express');
const app = express();
app.set('x-powered-by', false);

app.use(express.static('./public_html', {
    etag: true,
    cacheControl: true,
    maxAge: days_30,
    immutable: true,
    setHeaders: (res, path, stat) => {
        res.set('X-Bart', 'I am awesome!');
    },
}));

app.listen(port, host, () => {
    console.log('Running static files!');
});