# reflection
*A webpage that scrapes huffington post and brings up new articles for the user to read and leave notes on.*

Deployed Page: https://sleepy-savannah-15776.herokuapp.com/

### Technologies Used: 
* MongoDB
* Heroku
* Express js
* Cheerio js
* Handlebars
* Bootstrap
* ORM
* routes
* jQuery

Scraping is done via Cheerio js and the data is persisted via MongoDB. The user bring up new articles via a button. Each card gives the user a title, summary, link to article, and a link to a notes section should they want to leave their thoughts. The articles are unique in the database so that they won't be overwritten should the user hit the new articles button multiple times in a row. This allows the notes section to stay with each article forever. 
