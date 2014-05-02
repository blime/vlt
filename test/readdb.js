var should = require('should');
    sqlite3 = require('sqlite3');

describe('read database', function() {
  var db;

  before(function () {
    db = new sqlite3.Database('data/variants.sqlite3')
  });

  describe('read variant', function () {
    it('should return a variant', function (done) {
      db.get('SELECT * FROM variants', function (err, row) {
        if (err) { return done(err); }
        should.exist(row);
        done();
      });    
    });
  });

  describe('query variant', function () {
    var gene = 'GNAL';
    it('should find variants for a gene', function (done) {
      db.all('SELECT * FROM variants where gene=?', gene, function (err, rows) {
        if (err) { return done(err); }
        rows.length.should.equal(6);
        for (var i in rows) {
          should.exist(rows[i].gene);
          rows[i].gene.should.equal(gene);
        }
        done();
      })
    });
  });

  describe('query gene names', function () {
    it('should find gene names that begin with query string', function (done) {
      db.all('SELECT gene FROM variants WHERE gene LIKE "GNA1%" GROUP BY gene order by gene', function (err, rows) {
        if (err) { return done(err); }
        rows.length.should.equal(3);
        rows[0].gene.should.equal('GNA11');
        rows[1].gene.should.equal('GNA12');
        rows[2].gene.should.equal('GNA15');
        done();
      });
    });
  });

  after(function () {
    db.close();
  });

});