const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// mongoose.connect("mongodb+srv://lakshaychawla:ieeecusbcs@1234@cluster0.nsjby.mongodb.net/cs-website-database?retryWrites=true&w=majority", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect(
  "mongodb+srv://module1:lakshay.UIMS2022@cluster0.ri7ea.mongodb.net/professionalSocieties?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const { Schema } = mongoose;

const messageSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Phone: String,
  Message: String,
});

const messages = new mongoose.model("messages", messageSchema);

const newsletterSchema = new mongoose.Schema({
  Email: String,
});

const newsletterSubscription = new mongoose.model(
  "newsletterSubscription",
  newsletterSchema
);

app.get("/", (req, res) => {
  res.render("index", {
    site: "index",
  });
});

app.get("/officers", (req, res) => {
  res.render("officers", {
    site: "officers",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    site: "contact",
  });
});

app.post("/contact", (req, res) => {
  const newMsg = new messages({
    Name: req.body.name,
    Email: req.body.email,
    Phone: req.body.phonenum,
    Message: req.body.msg,
  });

  newMsg.save();
  res.render("done");
});

app.post("/newsletter-signup", (req, res) => {
  const newsub = new newsletterSubscription({
    Email: req.body.email,
  });

  newsub.save();
  res.render("done");
});

app.get("/blog", (req, res) => {
  res.render("index", {
    site: "blogs",
  });
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running");
});
