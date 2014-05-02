var sqlite3 = require('sqlite3'),
    db = new sqlite3.Database('data/variants.sqlite3');

exports.query = function(req, res){
  var gene = req.param('gene')
  if (gene) {
    db.all('SELECT * FROM variants where gene=?', gene, function (err, rows) {
      if (err) {
        debug('variant query error: ' + err);
        res.render('error', {
          message: err.message,
          error: {}
        });
      }
      res.send(rows);
    });
  } else {
    res.send([]);
  }
};
