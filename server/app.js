const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');

const router = require('./router.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;


const app = express();
app.use(compression());

app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));

// this will set up the body process, get request??
//google line, extended true

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));

router(app);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});

