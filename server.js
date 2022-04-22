const fs = require('fs');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');

// parse incoming string or aray data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'))
const { notes } = require('./Develop/db/db.json');


function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, './Develop/db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );

  return note;
}

// gets results of api/notes
app.get('/api/notes', (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

// allow notes to be sent to api/notes
app.post('/api/notes', (req, res) => {
  req.body.id = notes.length.toString();

  if (!validateNote(req.body)) {
    res.status(400).send('The note is not properly formatted.');
  } else {
    const note = createNewNote(req.body, notes);

    res.json(req.body);
  }
});

function validateNote(note) {
  if (!note.title || typeof note.title !== 'string') {
    return false;
  }
  if (!note.text || typeof note.text !== 'string') {
    return false;
  }
};


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

// creates path to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/assets/index.html'));
});

// creates path to notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/assets/notes.html'));
});
