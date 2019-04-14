var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;


var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/reflection", { useNewUrlParser: true });



app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);

app.set("view engine", "handlebars");


require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);




app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });