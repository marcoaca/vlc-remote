/**
 * Created by Marco on 27-02-2016.
 */
var vlc = require('./vlc');


var handleClient = function (socket) {
    console.log('new client connection');

    socket.on('pause', function(data){
        var resp = vlc.pause();
        console.log(resp);

    });
    socket.on('add', function(data){

    });
    socket.on('volume', function(data){
        vlc.volume(data.volume);
    });
}

module.exports = handleClient;