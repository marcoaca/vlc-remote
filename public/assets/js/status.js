/**
 * Created by amaralm on 18/02/2016.
 */
$(document).ready(function () {
    $('#lista').click(function () {
        $.get('/api-vlc/playlist')
            .done(function (data) {
                var obj = JSON.parse(data);
                var html = '';
                var template_ini = "<li><span class='musica'>";
                var template_fim = "</span></li>";

                obj.children.children.forEach(function(element, index, array){
                    html += template_ini + element.nome + template_fim;
                })
                console.log(data);


            })
            .fail(function (data) {
                alert(data);
            });
    });
});