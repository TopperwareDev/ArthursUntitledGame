var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Arthurs Untitiled Game', username: req.session.username});
});

module.exports = router;
