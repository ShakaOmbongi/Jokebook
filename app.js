// app.js
const express           = require('express');
const path              = require('path');
const jokebookRouter    = require('./routes/jokebookRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// mount our API routes
app.use('/', jokebookRouter);

// serve static front‑end from /public
app.use(express.static(path.join(__dirname, 'src')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Listening on http://localhost:${PORT}`));
