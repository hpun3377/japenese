var express = require('express');
var router = express.Router();
var wordDB = require('../worddb');
var request = require('request');
var qs = require('querystring');
var https = require('https');


/* DEFAULT_API_PROXY */
//router.use('/api', function (req, res) {
//  var options = {
//    method : req.method,
//    url : 'https://glosbe.com/gapi/translate?' + qs.stringify(req.query),
//    json : req.body,
//    pool: {maxSockets: 100}
//  };
//  req.pipe(request(options)).pipe(res);
//});

router.use('/api', function (req, res) {
  var host = 'glosbe.com';
  var port = 443;
  var uri = 'https://glosbe.com/gapi/translate?from=jpn&dest=kor&format=json&pretty=true&phrase=%E6%84%9B';
  var options = {
    host: host,
    port: port,
    url: uri,
    method: 'POST',
  };
  var req = https.request(options, function(res) {
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });
  console.log(req);
  socket.emit('toclient',{msg:req});
});



/* GET home page. */
router.get('/', function(req, res, next) {
  wordDB.seletTable({},res);
});

router.get('/word', function (req, res) {
  console.log("!!");
});

router.post('/wordAdd', function (req, res) {
  //console.log(req.body);
  wordDB.addWord(req.body,res);
});

router.post('/wordDelete', function (req, res) {
  console.log(req.body);
  wordDB.deleteWord(req.body,res);
});

router.get('/words',function(req,res){


});
module.exports = router;
