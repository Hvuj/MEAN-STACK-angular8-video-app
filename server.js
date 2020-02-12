var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(cors());

require('dotenv/config');

var api = require('./server/routes/api');

var port = 3000;

app.use(express.static(__dirname + '/dist/VideoApp/'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/api', api);
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/VideoApp/index.html'))
});


app.listen(port, () => {
  console.log("Server running on port:" + port);
});
