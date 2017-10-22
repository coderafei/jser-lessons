var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

var moments = [];
var users = [];

app.post('/signup', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var isExists = false;
  users.forEach(function (user) {
    if (user.username === username) {
      isExists = true;
    }
  });

  if (isExists) {
    res.json({message: '用户名已经存在'});
    return;
  }

  users.push({username: username, password: password});

  res.json({message: '用户创建成功'});
});

app.post('/signin', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var isPasswrodCorrect = false;

  users.forEach(function (user) {
    if (user.username === username && user.password === password) {
      isPasswrodCorrect = true;
    }
  });

  if (isPasswrodCorrect) {
    res.json({message: '登录成功'});
  } else {
    res.json({message: '登录失败'});
  }
});

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
