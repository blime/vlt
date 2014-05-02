var config = require('../../config'),
    should = require('should'),
    supertest = require('supertest'),
    request = supertest('http://localhost:' + config.port);

describe('lookup genes', function () {
  it('should find gene names that begin with query string', function (done) {
    request
      .get('/api/lookup/genes?term=GNA1')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) { return done(err); }
        var genes = res.body;
        genes.length.should.equal(3);
        genes[0].should.equal('GNA11');
        genes[1].should.equal('GNA12');
        genes[2].should.equal('GNA15');
        done();
      });
  });
});