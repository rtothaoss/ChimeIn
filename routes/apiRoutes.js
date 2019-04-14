var db = require('../models');
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {

  // A GET route for scraping the echoJS website
  app.get("/scrape", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.huffpost.com/").then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // Now, we grab every h2 within an article tag, and do the following:
      $(".card__content").each(function (i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .find('.card__headline__text')
          .text();
        result.link = $(this)
          // .parents('a')
          .find('a')
          .attr("href");
        result.summary = $(this)
          .find('.card__description')
          .children('a')
          .text();

          result.image = $(this)
          .find('img')
          .attr('src')
          
          console.log(result.image)
          
          
          
          

       

        // Create a new Article using the `result` object built from scraping
        db.article.create(result)
          .then(function (dbArticle) {
            // View the added result in the console
            // console.log(dbArticle);
          })
          .catch(function (err) {
            // If an error occurred, log it
            // console.log(err);
          });
      });

      // Send a message to the client
      res.send("Scrape Complete");
    });
  });

  app.get("/articles", function (req, res) {
    db.article.find({}).then(function (dbArticle) {
      res.json(dbArticle)
    })
      .catch(function (err) {
        res.json(err)
      })
  });

  app.get("/articles/:id", function (req, res) {

    db.article.findById(req.params.id)
      .populate('note')
      .then(function (dbArticle) {
        res.json(dbArticle)
      })
      .catch(function (err) {
        res.json(err)
      })

  });

  // Route for saving/updating an Article's associated Note
  app.post("/articles/:id", function (req, res) {
    // TODO
    // ====
    // save the new note that gets posted to the Notes collection
    // then find an article from the req.params.id
    // and update it's "note" property with the _id of the new note
    db.note.create(req.body)
      .then(note => db.Article.findByIdAndUpdate(req.params.id, { note }, { new: true }))
      .then(article => {
        res.json(article)
      })
  });


}