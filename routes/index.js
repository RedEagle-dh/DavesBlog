var express = require('express');
var router = express.Router();
const fs = require('fs');
const blogController = require("../controller/blogController");
/* GET home page. */
router.route("/")
  .get(blogController.createIndex)



module.exports = router;
