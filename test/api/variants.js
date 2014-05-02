var config = require('../../config'),
    should = require('should'),
    supertest = require('supertest'),
    request = supertest('http://localhost:' + config.port);

describe('lookup variants', function () {
  it('should find variants for a gene', function (done) {
    var gene = 'GNAL';
    request
      .get('/api/variants?gene=' + gene)
      .set('Accpet', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) { return done(err); }
        var variants = res.body;
        variants.length.should.equal(6);
        for (var i in variants) {
          should.exist(variants[i].gene);
          variants[i].gene.should.equal(gene);
        }
        done();
      });
  });
});