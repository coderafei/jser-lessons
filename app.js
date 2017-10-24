var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());

var moments = [];
var users = [];

app.get('/cookie', function (req, res) {
  console.log(req.cookies);

  res.cookie('name', 'jser');

  res.end('ok');
});

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

  if (req.cookies.name === username) {
    res.json({message: '你已经登录了'});
    return;
  }

  var isPasswrodCorrect = false;

  users.forEach(function (user) {
    if (user.username === username && user.password === password) {
      isPasswrodCorrect = true;
    }
  });

  if (isPasswrodCorrect) {
    res.cookie('name', username);
    res.json({message: '登录成功'});
  } else {
    res.json({message: '登录失败'});
  }
});

app.post('/createMoment', function (req, res) {
  var name = req.cookies.name;
  var content = req.body.content;

  moments.push({
    name: name,
    content: content
  });

  res.json({message: 'ok'});
});

app.get('/moments', function (req, res) {
  console.log(req.cookies);
  res.json(moments);
});

app.listen(3000, function() {
  console.log('App listening on port 3000!');
});
