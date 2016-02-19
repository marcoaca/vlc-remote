
$(document).ready(function () {
    $('a[href="#playlist"]').click(function () {
        $.get('/api-vlc/playlist')
            .done(function (data) {
                var obj = JSON.parse(data);
                var html = '';
                var template = "<li><span>%music%</span><span class='color'>%time%</span></li>";

                obj.children[0].children.forEach(function(element, index, array){
                    var time = element.duration;
                    var time_text = '';
                    if(time > 0){
                        var date = new Date(0,0,0);
                        date.setSeconds(time);
                        time_text = '   ' + date.getMinutes() + ':' + date.getSeconds();
                    }
                    html += template.replace('%music%',element.name).replace('%time%',time_text);
                });
                $('#lista').html(html);
            })
            .fail(function (data) {

            });
    });

    $('.site-header__icon__audio').click(function(){
        $.get('/api-vlc/pause');
    });

    function refresh(statusInfo){
        var state = statusInfo.state;
        var info = statusInfo.information.category.meta.title.split(' - ');
        var time = statusInfo['length'];
        var currentPos = statusInfo['position'];
        var d = new Date(0,0,0);
        d.setSeconds(time*currentPos);
        $('#minutes_digit').html((d.getMinutes()<10?'0':'') + d.getMinutes());
        $('#seconds_digit').html((d.getSeconds()<10?'0':'') + d.getSeconds());

        if (info.length > 1){
            $('#nome_artista').html(info[0]);
            $('#nome_musica').html(info[1]);
        } else if(info.length == 1) {
            $('#nome_artista').html(info[0]);
        } else {
            $('#nome_artista').html("No Music On");
            $('#nome_musica').html("Playlist");
        }

        if(state){
            if(state == 'playing'){
                $('body').removeClass('is-audio-off').addClass('is-audio-on');
            }else{
                $('body').removeClass('is-audio-on').addClass('is-audio-off');
            }
        }
    }

    function getStatus(){
        $.get('/api-vlc/status')
            .done(function(data){
                refresh(JSON.parse(data));
            })
            .fail(function(data){
            });
        setTimeout(getStatus,960);
    }
    getStatus();
});