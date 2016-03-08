var express = require('express');
var router = express.Router();
var wordDB = require('../worddb');
var request = require('request');
var qs = require('querystring');
var https = require('https');


router.use('/api', function (req, res) {
  var host = 'glosbe.com';
  var port = 443;
  //var url = 'https://glosbe.com/gapi/translate?' + qs.stringify(req.query);
  var url = 'https://glosbe.com/gapi/translate?from=jpn&dest=kor&format=json&pretty=true&phrase=愛';
  var options = {
    host: host,
    port: port,
    url: url,
    method: 'GET',
  };
    var req = https.request(options, function(res) {
        res.on('data', function(data) {
          console.log( ab2str(data));
          io.sockets.emit('searchWordApi',{msg : ab2str(data)});
        });
    });
    req.end();

    req.on('error', function(e){
      console.error(e);
    });
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

router.post('/updateMean', function (req, res) {
  console.log(req.body);
  wordDB.updateMean(req.body,res);
});

router.post('/levelWordViews', function (req, res) {
  console.log(req.body);
  wordDB.levelWordViews(req.body,res);
});

router.post('/changeWordLevelUp', function (req, res) {
  console.log(req.body);
  wordDB.changeWordLevelUp(req.body,res);
});

router.post('/changeWordLevelDown', function (req, res) {
  console.log(req.body);
  wordDB.changeWordLevelDown(req.body,res);
});

module.exports = router;
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i=0, strLen=str.length; i<strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}