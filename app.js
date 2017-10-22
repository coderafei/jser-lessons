var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

var moments = [];

app.post('/createMoment', function (req, res) {
  var name = req.body.name;
  var content = req.body.content;

  moments.push({
    name: name,
    content: content
  });

  res.json({message: 'ok'});
});

app.get('/moments', function (req, res) {
  res.json(moments);
});

app.listen(3000, function() {
  console.log('App listening on port 3000!');
});
