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
                alert(data);
            });
    });

    $('.site-header__icon__audio').click(function(){
        if($('body').hasClass('is-audio-on')){
            $.get('/api-vlc/pause');
        }else{
            $.get('/api-vlc/play');
        }
    });

    function refresh(){
        $.get('/api-vlc/status')
            .done(function(data){
                var obj = JSON.parse(data);
                var state = obj.state;
                var info = obj.information.category.meta.title.split(' - ');

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
                    } else {
                        $('body').removeClass('is-audio-on').addClass('is-audio-off');
                    }
                }
            })
            .fail(function(data){
                alert(data);
            });
        setTimeout(refresh,960);
    }
    setTimeout(refresh,960);
});