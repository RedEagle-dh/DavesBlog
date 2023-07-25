var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  const blogposts = JSON.parse(fs.readFileSync("./models/blogposts.json", "utf-8"));

  res.render('index', { posts: blogposts });
});



module.exports = router;
