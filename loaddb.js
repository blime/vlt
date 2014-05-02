var reader = require('line-reader'),
    sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('data/variants.sqlite3'),
    stmt,
    firstLine = true;

db.serialize(function () {
  db.run('DROP TABLE variants', function (err) { });
  db.run('CREATE TABLE variants (gene, nucleotide_change, protein_change, other_mappings, alias, transcripts, region, reported_classification, inferred_classification, source, last_evaluated, last_updated, url)');
  db.run('CREATE INDEX gene_index on variants (gene)');
  stmt = db.prepare('INSERT INTO variants VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)');
});

reader.eachLine('data/variant_results.tsv', function (line, last) {
  var values, valuesObject;
  if (firstLine) {
    // consider: parse this to create table
    firstLine = false;
  } else if (line) {
    stmt.run(line.split('\t'));
  }
  if (last) {
    stmt.finalize();
    db.close();
  }
});

// better:
// is db available? if not
//  download clinvitae zip
//  unzip
//  load
