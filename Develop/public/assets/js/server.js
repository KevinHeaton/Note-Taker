const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// parse incoming string or aray data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});