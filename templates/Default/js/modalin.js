$(document).ready(function() {
    window.addEventListener("message", function(e) {
            if (e.data === 'closemodal') {
                $('#modalID55798').iziModal('close');
            }
            if (e.data === 'closemodalr') {
                $('#modalID55798').iziModal('close');
                window.location.reload();
            }

            if (e.data === 'loadframestart') {
                $("#modalID55798").iziModal('startLoading');
            }
            if (e.data === 'loadframestop') {
                $("#modalID55798").iziModal('stopLoading');
            }

            if (e.data === 'prochitan') {
                var int = Number.parseInt($("#reades").text());
                int++;
                $("#reades").text(int);
            }

            var ts = e.data.substring(0, 2);
            if (ts === 'st') {

                var tu = e.data.substring(2, 3);
                var ter = e.data.slice(3);
                var int = Number.parseInt($("#readno").text());
                if (tu === '0') {
                    $("#st" + ter).html('<img src="images\\galka.png">Прочитано!');
                    int--;
                    $("#readno").text(int);
                } else {
                    $("#st" + ter).html('<img src="images\\voskl.png"><b>Не прочитано!</b>');
                    int++;
                    $("#readno").text(int);
                }
            }
        },
        false);
});