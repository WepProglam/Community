var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('session = '+req.cookies['session']);
  res.clearCookie('salt');
  res.render('index', { title: 'Express' });
});




module.exports = router;
