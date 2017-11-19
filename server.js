var express = require('express');
var fs = require('fs');
var app     = express();
var port = process.env.PORT || 5000;

// APIs requests ===============================================================
require('./api/apis/stockQuotes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
