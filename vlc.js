var request = require("request")

var vlcPassword = 'password';
var vlcRequest = request.defaults({
    headers : {
        'Authorization' : 'Basic ' + (new Buffer(':' + vlcPassword, 'utf8')).toString('base64')
    }
});




var vlc;

vlc.pause = function(){
    request.get('http://127.0.0.1:8080/requests/status.xml?command=pl_pause', function (error, response, body) {
        return response;
    });
}

vlc.add = function(resource){
    
}

vlc.raiseVolume = function(amount){
    
}

vlc.lowerVolume = function(amount){
    
}


module.exports = vlc;