// Index.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'https://dev-promise.onrender.com',
  AccessControlAllowOrigin: "*", // Replace this with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Change this to your email service
  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.PASSWORD, // Your email password or app password
  },
});

// Endpoint to handle form submission
app.post('/send-email', (req, res) => {
  console.log('Request Body:', req.body); 
    const { firstName, lastName, email, subject, message } = req.body;
  
    const mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: subject,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error); // Log the error
        return res.status(500).send('Error sending email: ' + error.toString());
      }
      res.status(200).send('Email sent: ' + info.response);
    });
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
