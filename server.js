const fs = require('fs');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const {v4 : uuidv4} = require('uuid')

// parse incoming string or aray data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'))
const { notes } = require('./Develop/db/db.json');


function findById(id, notesArray) {
  const result = notesArray.filter(notes => notes.id === id)[0];
  return result;
}

function createNewNote(body, notesArray) {
  const note = body;
  note.id = uuidv4();
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, './Develop/db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );


  return note;
}

// gets results of api/notes
app.get('/api/notes', (req, res) => {
  const results = notes
  if (results) {
    res.json(results);
  } else {
    res.sendStatus(404);
  }
});

// gets a note by id
app.get('/api/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
})

// allow notes to be sent to api/notes
app.post('/api/notes', (req, res) => {
  const newNote = createNewNote(req.body, notes);
  res.json(newNote);

  // if (!validateNote(req.body)) {
  //   res.status(400).send('The note is not properly formatted.');
  // } else {
  //   res.json(req.body);
  // }
});

// function validateNote(note) {
//   if (!note.title || typeof note.title !== 'string') {
//     return false;
//   }
//   if (!note.text || typeof note.text !== 'string') {
//     return false;
//   }
// };


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

// creates path to notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

// creates path to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});


