const mongoose = require('mongoose');
const config = require('../config/database');

// article schema
let articleSchema =  mongoose.Schema({
    title : {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  });

  // export schema
  let Article = module.exports = mongoose.model('Article' , articleSchema);

module.exports.getArticles = function(callback) {
    Article.find( {} , callback);
}

module.exports.addArticle =  function(newArticle, callback) {
    newArticle.save(callback);
}

module.exports.getArticleById = function(id, callback) {
    Article.findById(id, callback);
}


module.exports.deleteArticle = function(id, callback) {
    Article.remove(id, callback);
}

module.exports.editArticle = function(id, article, callback) {
    Article.update(id, article, callback);
}