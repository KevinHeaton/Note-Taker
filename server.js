const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// parse incoming string or aray data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// creates path to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/assets/index.html'));
});

// creates path to notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/assets/notes.html'));
});