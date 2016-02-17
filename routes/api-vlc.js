var express = require('express');
var router = express.Router();
var http = require ('http');

router.all('/api-vlc/status', function(req, res, next){
    http.get('http://127.0.0.1/' );
});

router.all('/api-vlc/play', function(req, res, next){
    http.get();
})