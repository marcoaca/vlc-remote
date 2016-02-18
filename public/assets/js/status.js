/**
 * Created by amaralm on 18/02/2016.
 */
$(document).ready(function () {
    $('a[href="#playlist"]').click(function () {
        $.get('/api-vlc/playlist')
            .done(function (data) {
                var obj = JSON.parse(data);
                var html = '';
                var template = "<li><span class='musica'>%musica%</span><span class='color'>%tempo%</span></li>";

                obj.children[0].children.forEach(function(element, index, array){
                    var time = element.duration;
                    var d = new Date(0,0,0);
                    var time_text = '';
                    if(time > 0){
                        d.setSeconds(time);
                        time_text = '   ' + d.getMinutes() + ':' + d.getSeconds();
                    }
                    html += template.replace('%musica%',element.name).replace('%tempo%',time_text);
                });
                $('#lista').html(html);
            })
            .fail(function (data) {
                alert(data);
            });
    });

    function refresh(){
        $.get('/api-vlc/status')
            .done(function(data){
                var obj = JSON.parse(data);

                temp = obj.information.category.meta.title.split(' - ');
                if (temp.length >1){
                    $('#nome_artista').html(temp[0]);
                    $('#nome_musica').html(temp[1]);
                }

            })
            .fail(function(data){

            });
        setTimeout(refresh,950);
    }
    setTimeout(refresh,950);
});