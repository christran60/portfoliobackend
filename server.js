require('dotenv').config();
const path = require('path');
const express = require("express");
const router = express.Router();
const cors = require("cors");
const port = process.env.PORT || 3000

// console.log("the email is:",process.env.REACT_APP_EMAIL);
// console.log("The pw is:",process.env.REACT_APP_PASS);

const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(port, () => console.log("Server Running"));
console.log('Our app is running on http://localhost:' + port);
const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.REACT_APP_EMAIL,
      pass: process.env.REACT_APP_PASS
    },
  });
  
  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
  });
  router.post("/", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message; 
    const mail = {
      from: name,
      to: process.env.REACT_APP_EMAIL,
      subject: "Contact Form Submission",
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "Sorry there's an error with using gmail with nodemailer, go ahead and email me directly instead! My email is ctran209@outlook.com." });
      } else {
        res.json({ status: "Message Sent!" });

      }
    });
  });
