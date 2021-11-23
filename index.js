const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

let initialPath = path.join(__dirname, "public");
let app = express();

app.use(express.static(initialPath));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(initialPath, "index.html"));
})

app.listen(3000, () => {
  console.log('listening.....');
})
