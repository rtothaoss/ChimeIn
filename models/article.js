var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date, 
    default: Date.now
  },
  link: {
    type: String,
    required: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  },
  summary: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  forDelete: {
    type: Boolean,
    default: true
  }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
