// app.js
const express = require('express');
const app = express();

module.exports = app;

const port = 3000;

// Import and configure metrics
require('./metrics');

// Basic endpoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

