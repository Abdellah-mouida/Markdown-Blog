let express = require("express");

const Article = require("../module/Article");
let router = express.Router();

router.get("/", async (req, res) => {
  let articles = await Article.find().sort({ createdAt: "desc" });

  res.render("index", { articles: articles });
});
router.get("/new", (req, res) => {
  res.render("new", { article: new Article() });
});
router.get("/edit/:id", async (req, res) => {
  let article = await Article.findById(req.params.id);

  res.render("edit", { article });
});
router.get("/:slug", async (req, res) => {
  let { slug } = req.params;
  let article = await Article.findOne({ slug });
  if (!article) res.redirect("/");

  res.render("show", { article });
});

router.post("/", async (req, res) => {
  let { title, description, markdown } = req.body;
  let newArticle = new Article({ title, description, markdown });

  try {
    let article = await newArticle.save();

    res.redirect("articles/" + article.slug);
  } catch (err) {
    console.log(err);
    res.render("new", { article: newArticle });
  }
});
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/articles");
});
router.put("/:id", async (req, res) => {
  let { id } = req.params;
  let { title, description, markdown } = req.body;
  let newArticle = await Article.findById(id);
  newArticle.title = title;
  newArticle.description = description;
  newArticle.markdown = markdown;

  try {
    let article = await newArticle.save();

    res.redirect("/articles/" + article.slug);
  } catch (err) {
    console.log(err);
    res.render("edit", { article: newArticle });
  }
});

module.exports = router;
