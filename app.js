const express = require('express');
const router = express();
const controller = require('./controllers/controller');
const rp = require('request-promise');
const path = require('path');
router.set('view engine', 'ejs');

router.use(express.static(__dirname + '/views/'));

router.get('/', (req, res) => {
  res.render('index.ejs');
});

router.get('/homepage', controller.homepage);

router.listen(3000);

module.exports = router;
