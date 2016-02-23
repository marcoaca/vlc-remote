var express = require('express');
var router = express.Router();
var r = require("request");
var parseString = require('xml2js').parseString;

var vlcPassword = 'password';

var authHeader = 'Basic ' + (new Buffer(':' + vlcPassword, 'utf8')).toString('base64');

var request = r.defaults({
    headers: {
        'Authorization': authHeader
    }
});

router.all('/volume', function (req, res, next) {
    var volume = req.body.volume || req.query.volume;
    if (volume) {
        request.get('http://127.0.0.1:8080/requests/playlist.json?command=volume&val=' + volume, function (error, response, body) {
            if (!error) {
                res.status(200).end();
            } else {
                res.status(500).end('An error has occurred while changing the sound.');
            }
        });
    }
});

router.all('/playlist', function (req, res, next) {
    request.get('http://127.0.0.1:8080/requests/playlist.json', function (error, response, body) {
        if (error) {
            res.status(500).json({error: error});
            return;
        }
        res.status(200).json(body);
    });
});

router.all('/status', function (req, res, next) {
    request.get('http://127.0.0.1:8080/requests/status.json', function (error, response, body) {
        if (!error) {
            res.status(200).send(body);
            return;
        }
        res.status(500).json({error: error});
    });
});

router.all('/add', function (req, res, next) {
    var m = req.query.music ? encodeURIComponent(req.query.music) : req.body.music ? encodeURIComponent(req.body.music) : null;
    if (!m) {
        res.status(500).json({error: 'Missing song link argument.'});
        return;
    }
    request.get('http://127.0.0.1:8080/requests/status.json',
        function (error, response, body) {
            if (error) {
                console.log(error);
                res.send(error);
                return;
            }
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                if (result.currentplid > -1) {
                    request.get('http://127.0.0.1:8080/requests/status.xml?command=in_enqueue&input=' + m,
                        function (error, response, body) {
                            res.status(200).json({code: "0", message: "Music inserted with success."});
                            return;
                        }
                    );
                } else {
                    request.get('http://127.0.0.1:8080/requests/status.xml?command=in_play&input=' + m,
                        function (error, response, body) {
                            res.status(200).json({code: "0", message: "Music inserted with success."});
                            return;
                        }
                    );
                }
            } else {
                res.status(500).send(error);
                return;
            }
        }
    );
});

router.all('/play', function (req, res, next) {
    request.get('http://127.0.0.1:8080/requests/status.xml?command=pl_play', function (error, response, body) {
        res.status(200).end();
    });
});

router.all('/pause', function (req, res, next) {
    request.get('http://127.0.0.1:8080/requests/status.xml?command=pl_pause', function (error, response, body) {
        res.status(200).end();
    });
});

router.all('/stop', function (req, res, next) {
    request.get('http://127.0.0.1:8080/requests/status.xml?command=pl_stop', function (error, response, body) {
        res.status(200).end();
    });
});


module.exports = router;