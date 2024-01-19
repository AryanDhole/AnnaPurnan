const express = require("express");
const ejs = require("ejs");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/blogwebDB", { useNewUrlParser: true });
const alert = require("alert");
var user;

const signupSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cpassword: String
});

const signup = mongoose.model("signupdetail", signupSchema);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("login");
});

app.post("/", function (req, res) {
  const email = req.body.email;
  const lpassword = req.body.password;
  signup.find({ email: email })
    .then(info => {
      if (info.length == 0) {
        alert("You are not registered! Sign up first.");
        res.redirect("signup");
      } else {
        const spassword = info[0].password;
        if (lpassword == spassword) {
          user = info[0].name;
          res.redirect("soldiers");
        } else {
          alert("Invalid password.");
          res.redirect("/");
        }
      }
    })
    .catch(err => {
      console.log("Error in reading: ", err);
      res.redirect("/");
    });

});