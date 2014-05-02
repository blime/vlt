var sqlite3 = require('sqlite3'),
    db = new sqlite3.Database('data/variants.sqlite3');

exports.query = function(req, res){
  var geneQuery = req.param('term')
  if (geneQuery) {
    db.all('SELECT gene FROM variants WHERE gene LIKE "' + geneQuery + '%" GROUP BY gene order by gene', function (err, rows) {
      if (err) {
        debug('lookup error: ' + err);
        res.render('error', {
          message: err.message,
          error: {}
        });
      }
      res.send(rows.map(getGene));
    });
  } else {
    res.send([]);
  }
};

function getGene (variant) {
  return variant.gene;
}