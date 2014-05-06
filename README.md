Variant Lookup Thing
====================
Variants you can look up by gene.
Genes you can sort of look up by name.

0) Got Node?
------------
If not, download the Node.js installer [here](http://nodejs.org/download/).

1) Install Packages
-------------------
_npm install_

2) Start the Server
-------------------
_npm start_

3) Test It!
-----------
_npm test_

4) Work It.
-----------
- [Application](http://localhost:3000)<br/>
- [Variant API](http://localhost:3000/api/variants?gene=ZEB1)
- [Gene Lookup API](http://localhost:3000/api/lookup/genes?term=VI)

Default port is 3000. Edit config.js if you need a different port.

What Is This?
-------------
- Client: Jade template + jQuery UI Autocomplete + DataTables plugin
- Server: Node.js + Express.js
- Database: SQLite, for zero-install.

Where's My Code?
----------------
The not-little stuff:

- public/js/thing.js - client JavaScript
- public/css/style.css - custom stylesheet
- views/index.jade - Jade template
- routes/api/*.js - api
- test/... - tests
- loaddb.js - (re)load database (requires variant_results.tsv, not included)

Questions?
----------
Let's talk!
