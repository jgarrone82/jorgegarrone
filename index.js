const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

let initialPath = path.join(__dirname, "public");
let app = express();
const port = process.env.PORT || 3000;

app.use(express.static(initialPath));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(initialPath, "index.html"));
})

app.listen(port, () => {
  console.log('listening.....');
})

app.post('/mail', (req, res) => {
  const { firstname, lastname, email, msg } = req.body;

  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
      }
  })

  const mailOptions = {
      from: `${email}`,
      to: process.env.EMAIL,
      subject: 'Portfolio',
      text: `First name: ${firstname}, \nLast name: ${lastname}, \nEmail: ${email}, \nMessage: ${msg}`
  }
  console.log(mailOptions);
  transporter.sendMail(mailOptions, (err, result) => {
      if (err){
          console.log(err);
          res.json('Opps! it seems like some error occured. Please try again.')
      } else{
          res.json('Thanks for e-mailing me. I will reply to you within 2 working days');
      }
  })
})
