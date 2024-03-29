var express = require('express');
var router = express.Router();

/* GET grid page. */
router.get('/', function(req, res, next) {
  // Retrieve the query parameters from the request object
  let query = req.query;

  // Log the query parameters for debugging
  console.log(`rows ${query.rows}`);
  console.log(`cols ${query.cols}`);

  // Render the grid.pug template and pass the title and query object to it
  res.render('grid', { title: 'Grid Display', query: query });
});

module.exports = router;