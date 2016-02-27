/**
 * Created by Marco on 27-02-2016.
 */
var vlc = require()


var handleClient = function (socket) {
    console.log('new client connection');

    socket.on('pause', function(data){

    });
    socket.on('add', function(data){

    });
    socket.on('volume', function(data){

    });
}

module.exports = handleClient;