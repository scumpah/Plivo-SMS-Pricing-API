// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

const {
countries,
numbertypes,
pricing,
} = require('../services');

module.exports = (app) => {
  app.use('/api/country', countries);
  app.use('/api/numbertype', numbertypes);
  app.use('/api/pricing', pricing);
};
