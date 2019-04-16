var db = require('../models');
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {

  
  app.get("/scrape", function (req, res) {
    
    axios.get("https://www.huffpost.com/").then(function (response) {
    
      var $ = cheerio.load(response.data);

     
      $(".card__content").each(function (i, element) {
       
        var result = {};

       
        result.title = $(this)
          .find('.card__headline__text')
          .text();
        result.link = $(this)

          .find('a')
          .attr("href");
        result.summary = $(this)
          .find('.card__description')
          .children('a')
          .text();

          result.image = $(this)
          .find('img')
          .attr('src')
                      
    
        db.Article.create(result)
          .then(function (dbArticle) {

            console.log(dbArticle);
          })
          .catch(function (err) {

            console.log(err);
          });
      });


      res.send("Scrape Complete");
    });
  });

  app.get("/articles", function (req, res) {
    db.Article.find({}).then(function (dbArticle) {
      res.json(dbArticle)
    })
      .catch(function (err) {
        res.json(err)
      })
  });

  app.get("/articles/:id", function (req, res) {

    db.Article.findById(req.params.id)
      .populate('note')
      .then(function (dbArticle) {
        res.json(dbArticle)
      })
      .catch(function (err) {
        res.json(err)
      })

  });


  app.post("/articles/:id", function (req, res) {

    db.Note.create(req.body)
      .then(note => db.Article.findByIdAndUpdate(req.params.id, { note }, { new: true }))
      .then(article => {
        res.json(article)
      })
      .catch(function(err) {
        res.json(err)
      })
  });

  app.delete('/articles', function(req, res) {
    db.Article.deleteMany({forDelete: true}).then(function(response){
      console.log(response)
    })
  })


}