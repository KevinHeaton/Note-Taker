const express = require('express');
const app = express();


// parse incoming string or aray data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());