var express = require('express');
var router = express.Router();
var r = require("request");
var Map = require("collections/map");
var List = require("collections/list");
var moment = require('moment');

var keyY = "AIzaSyBhsWbkizSzKJ0HPhRYmkdjkO6FdG6zl3A";
var vlcPassword = 'password';
var playlist = new Map();
var queue = new List();

var authHeader = 'Basic ' + (new Buffer(':' + vlcPassword, 'utf8')).toString('base64');

var request = r.defaults({
    headers: {
        'Authorization': authHeader
    }
});

var requestYoutube = require("request");

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

function removeMusic(music_id){    
    request.get('http://127.0.0.1:8080/requests/playlist.json?command=pl_delete&id=' + music_id, function (error, response, body) {    
        if (error) {    
            res.status(500).json({error: error});    
            return;    
        }    
    });    
}

router.all('/playlist', function (req, res, next) {
    request.get('http://127.0.0.1:8080/requests/playlist.json', function (error, response, body) {
        if (error) {
            res.status(500).json({error: error});
            return;
        }
        playlist = JSON.parse(body); 
        for (var i = 0; i < playlist.children[0].children.length; i++) {    
            if (!playlist.children[0].children[i].current) {    
                removeMusic(playlist.children[0].children[i].id);    
            } else {    
                break;    
            }    
        }    
        request.get('http://127.0.0.1:8080/requests/playlist.json', function (error, response, body) {    
            res.status(200).json(body);    
        }); 
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
    var m = encodeURIComponent( req.body.music || req.query.music );
    if (!m) {
        res.status(500).json({error: 'Missing song link argument.'});
        return;
    }
    var pattern = /v\%3D[a-zA-Z0-9_-]{11}/;
    var musicID = pattern.exec(m);
    var b = musicID.toString();
    var id = b.substring(4);
    var youtube = 'https://www.googleapis.com/youtube/v3/videos?id=' + id + '&part=contentDetails,snippet&fields=items(snippet(title),contentDetails(duration))&key=' + keyY;
    console.info(youtube);

    requestYoutube.get(youtube,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {

                var result = JSON.parse(body);
                if (result.items[0] != null && result.items[0]["contentDetails"] != null && result.items[0]["contentDetails"].duration != null) {
                    var duration = moment.duration(result.items[0]["contentDetails"].duration).asMilliseconds();
                    var title = result.items[0]["snippet"].title;
                    console.info(title);
                    console.info(duration);
                    var music = {id: id, title: title, duration: duration};
                    queue.unshift(music);
                    playlist.set(id, duration);
                    var entries = playlist.entries();
                    console.info(entries);
                } else {
                    console.error("Could not find music details");
                }
            } else {
                console.log(error);
                res.status(500).send(error);
                return;
            }
            callVLC(music);
        }
    );
    /*while(queue.length > 0){
     var music = queue.pop();*/
    //setTimeout(callVLC(music.id), music.duration);
    /*}*/

    function callVLC(music) {
        request.get('http://127.0.0.1:8080/requests/status.json',
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var result = JSON.parse(body);
                    var command = result.currentplid > -1 ? "in_enqueue&input=" + escape("https://www.youtube.com/watch?v=" + music.id) : "in_play&input=" + escape("https://www.youtube.com/watch?v=" + music.id);
                    console.log('http://127.0.0.1:8080/requests/status.json?command=' + command);
                    request.get('http://127.0.0.1:8080/requests/status.json?command=' + command,
                        function (error, response, body) {
                            res.status(200).json({code: "0", message: "Music inserted with success."});
                            return;
                        }
                    );
                } else {
                    console.log(error);
                    res.status(500).send(error);
                    return;
                }
            }
        );
    }
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
