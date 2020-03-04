var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({"message": "Welcome to Express Product app"});
});

module.exports = router;
