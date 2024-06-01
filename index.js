const express = require("express");
const { engine } = require("express-handlebars");
const fs = require("fs");
const app = express();
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  let obj = JSON.parse(fs.readFileSync("views-views.json"));
  let counterHomepage = obj["/"];
  let counterAboutPage = obj["/about"];
  counterHomepage++;
  res.render("homepage", { title: "Homepage", counterHomepage });
  obj["/"] = counterHomepage;
  obj["/about"] = counterAboutPage;
  fs.writeFileSync("views-views.json", JSON.stringify(obj, null, 2));
});

app.get("/about", (req, res) => {
  let obj = JSON.parse(fs.readFileSync("views-views.json"));
  let counterHomepage = obj["/"];
  let counterAboutPage = obj["/about"];
  counterAboutPage++;
  res.render("about", { title: "About", counterAboutPage });
  obj["/"] = counterHomepage;
  obj["/about"] = counterAboutPage;
  fs.writeFileSync("views-views.json", JSON.stringify(obj, null, 2));
});

app.listen(3000);
