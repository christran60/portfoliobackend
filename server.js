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
if (process.env.NODE_ENV === "production"){
app.use(express.static(__dirname + '/'));
}
// if (process.env.NODE_ENV === "production"){
//   app.use(express.static("build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname,  "build"));
//   });
// }
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

  router.post("https://christophertran.netlify.app/ContactPage", (req, res) => {
    // router.post("https://myportfoliocontactform.herokuapp.com/", (req, res) => {
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
        res.json({ status: "ERROR" });
      } else {
        res.json({ status: "Message Sent!" });

      }
    });
  });
