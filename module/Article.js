let mongoose = require("mongoose");
let slugify = require("slugify");
let marked = require("marked");
let createDompurify = require("dompurify");
let { JSDOM } = require("jsdom");

let dompurify = createDompurify(new JSDOM().window);

let articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizedHTML: {
    type: String,
    required: true,
  },
});

articleSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.markdown) {
    this.sanitizedHTML = dompurify.sanitize(marked.parse(this.markdown));
  }

  next();
});

module.exports = mongoose.model("Article", articleSchema);
