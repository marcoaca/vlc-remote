var r = require("request");

var vlcPassword = 'password';
var request = r.defaults({
    headers : {
        'Authorization' : 'Basic ' + (new Buffer(':' + vlcPassword, 'utf8')).toString('base64')
    }
});

var vlc={};

vlc.pause = function(){
    request.get('http://127.0.0.1:8080/requests/status.json?command=pl_pause', function (error, response, body) {
        if (!error){
            var state = JSON.parse(body).state;
            if(state){
                return JSON.parse(body).state;
            }
        } else {
            return error;
        }
    });
}

vlc.add = function(resource){
    
}

vlc.volume = function(amount){
    request.get('http://127.0.0.1:8080/requests/playlist.json?command=volume&val=' + amount, function (error, response, body) {
        if (!error){
            return body;
        } else {
            return error;
        }
    });
}


module.exports = vlc;