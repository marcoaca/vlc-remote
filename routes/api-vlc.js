var express = require('express');
var router = express.Router();
var r = require("request");
var parseString = require('xml2js').parseString;

var pass = 'password';
var authHeader = 'Basic ' +  (new Buffer(':' + pass, 'utf8')).toString('base64') ;

var request = r.defaults({
    headers:{
        'Authorization':authHeader
    }
});

router.all('/playlist', function(req, res, next){
    request.get('http://127.0.0.1:8080/playlist.xml' );
});

router.all('/status', function(req, res, next){
    request.get('http://127.0.0.1:8080/status.xml');
});

router.all('/add', function (req, res, next) {
    var m = req.query.music ? encodeURIComponent(req.query.music): null;
    if(!m){
        res.send('erro: nenhuma musica');
        return;
    }
    request.get('http://127.0.0.1:8080/requests/status.xml',
        function (error, response, body) {
            if(error){
                console.log(error);
                res.send(error);
                return;
            }

            if (!error && response.statusCode == 200) {
                parseString(body, function (err, result) {
                    if (result.root.currentplid[0] >-1) {
                        request.get('http://127.0.0.1:8080/requests/status.xml?command=in_enqueue&input=' + m,
                            function (error, response, body) {
                                res.status(200).send('');
                            }
                        );
                    } else {
                        request.get('http://127.0.0.1:8080/requests/status.xml?command=in_play&input=' + m,
                            function (error, response, body) {
                                res.status(200).send('');
                            }
                        );
                    }
                });
            } else {
                res.status(500).send(error);
            }
        }
    );
});

router.all('/play', function(req, res, next){
    request.get('http://127.0.0.1:8080/requests/status.xml?command=pl_pause');
});

router.all('/pause', function(req, res, next){
    request.get('http://127.0.0.1:8080/requests/status.xml?command=pl_pause');
});

router.all('/stop', function(req, res, next){
    request.get('http://127.0.0.1:8080/requests/status.xml?command=pl_stop');
});


module.exports = router;