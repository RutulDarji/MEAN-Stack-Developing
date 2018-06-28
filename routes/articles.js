const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.get('/', (req, res, next) => {

    Article.getArticles((err, articles) => {
        if(err) {
            res.json({
                success: false,
                msg: 'Failed to Get Article'
            });
        } else {
            res.json({
                articles: articles,
                success: true,
                msg: 'Got All Articles'
            });
        }
    });
});

router.post('/add', (req, res, next) => {
    
    let newArticle = new Article( {
        title: req.body.title,
        author: req.body.author,
        body: req.body.body
    });
    
    Article.addArticle(newArticle , (err, article) => {
        if(err) {
            res.json({
                success: false,
                msg: 'Failed to Register'
            });
        } else {
            res.json({
                success: true,
                msg: 'User Registered'
            });
        }
    });

});


router.get('/:id', (req, res, next) => {

    Article.getArticleById(req.params.id, (err, article) => {
        if(err) {
            res.json({
                success: false,
                msg: 'Failed to Get Article'
            });
        } else {
            res.json({
                article : article,
                success: true,
                msg: 'Got Article'
            });
        }
    }); 
});

router.delete('/:id', (req, res, next) => {

    let query = { _id: req.params.id };
    
    Article.getArticleById(req.params.id, (err, article) => {
        if(err) {
            res.json({
                success: false,
                msg: 'No Such Article Article'
            });
        } else {

            Article.deleteArticle(query, (err) => {
                if(err) {
                    res.json({
                        success: false,
                        msg: 'Failed to Delete Article'
                    });
                } else {
                    res.json({
                        success: true,
                        msg: 'Article Deleted'
                    });
                }
            });

        }
    });

});


router.put('/edit/:id', (req, res, next) => {
    let article = {};
  
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
  
    let query = {_id: req.params.id }
  
    /*
    we are not creating new data to work with the model
    and takes 3 param
    1) query
    2) data
    3) callback function
    */

   Article.editArticle(query, article, (err) => {
        if(err) {
            res.json({
                success: false,
                msg: 'Failed to Update Article'
            });
        } else {
            res.json({
                success: true,
                msg: 'Article Updated'
            });
        }
   });

});

// export router only then u can use this route
module.exports  = router;