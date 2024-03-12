let express = require("express");
let app = express();
let mongoose = require("mongoose");
let methodOverride = require("method-override");

mongoose.connect("mongodb://127.0.0.1:27017/Markdown-Blog");

let articlesRouter = require("./routes/articles");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use("/articles", articlesRouter);

app.listen(5000);
