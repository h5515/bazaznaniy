/**
 * AJAX long-polling
 *
 * 1. sends a request to the server (without a timestamp parameter)
 * 2. waits for an answer from server.php (which can take forever)
 * 3. if server.php responds (whenever), put data_from_file into #response
 * 4. and call the function again
 *
 * @param timestamp
 */
var tim = 60;
var clichek;
var addreg = [];
var noreg = []



$(".audio").mb_miniPlayer({
    width: 300,
    inLine: false,
    id3: true,
    addShadow: false,
    pauseOnWindowBlur: false,
    volume: 1,
    loop: false
});

var pervzap = true;

function getContent(timestamp) {
    var queryString = { 'timestamp': timestamp };

    $.ajax({
        type: 'GET',
        url: 'server/server.php',
        data: queryString,
        success: function(data) {
            // put result data into "obj"
            var obj = jQuery.parseJSON(data);
            // put the data_from_file into #response
            $('#mytabl tbody').html(obj.data_from_file);
            // alert(obj.ubdatetim);
            /*stimer = Number.parseInt(obj.stimer) - 1;
            alert(stimer);
            if (stimer > 1)
                tims = stimer;
            else*/
            stimer = obj.stimer;

            tims = Number.parseInt(obj.ubdatetim) - 1;

            //alert(stimer);
            if ((stimer == 'true') || $('.bloktimer span') == '')
                $('.bloktimer span').text(tims);

            if (tim)
                clearInterval(tim);
            if (!obj.nerab) {
                tim = setInterval(() => {
                    t = Number.parseInt($('.bloktimer SPAN').text());
                    t = t - 1;
                    if ((t < -5) || (t == 'NaN')) {
                        $('.bloktimer').html('Сервер не работает((<span style="display:none">-7</span>');
                        $('#mytabl tbody').html('');
                    } else
                        $('.bloktimer').html('Обновление через <span>' + t + '</span> сек.');
                }, 1000);

                ProverCheck();
            } else {
                $('.bloktimer').html('Сервер не работает((<span style="display:none">-7</span>');
                $('#mytabl tbody').html('');
            }
            // call the function again, this time with the timestamp we just got from server.php
            getContent(obj.timestamp);
        }
    });
}

// initialize jQuery
$(function() {
    getContent();
});

function containsdel(arr, elem) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].trim() === elem.trim()) {
            arr.splice(i, 1);
            return true;
        }
    }
    return false;
}

function ProverCheck() {
    $('#mytabl [data-check="true"]').each(function(index, el) {
        $(el).find('input').prop('checked', true);
    });
    AddColumn();

    $(".nReag:checkbox").not('.nmy').on("change", function() {
        if ($(this).prop("checked")) {
            $(this).closest('tr').find('td').css('color', '#CAD4D6');
            nom = $(this).closest('tr').find('[data-hv="kod"]').text();
            addreg.push(nom);
            containsdel(noreg, nom);
        } else {
            $(this).closest('tr').find('td').css('color', '');
            nom = $(this).closest('tr').find('[data-hv="kod"]').text();
            noreg.push(nom);
            containsdel(addreg, nom);
        }
        if (clichek)
            clearTimeout(clichek);
        clichek = setTimeout(() => {
            sendclient();
        }, 3000);
    })

    $(".nmy:checkbox").unbind();
    $(".nmy:checkbox").on("change", function() {
        if ($(this).prop("checked")) {
            $(this).closest('tr').find('td').css('color', '#CAD4D6');
            $(this).closest('td').attr('data-check', 'true');
        } else {
            $(this).closest('tr').find('td').css('color', '');
            $(this).closest('td').attr('data-check', '');
        }
        NotReag();
    })
    SravnSpisok();
}

function AddColumn() {
    if (!$('#notregmy')[0])
        $('#mytabl').find('th').eq(0).before('<th id="notregmy">Не реагировать у меня</th>');
    $('#mytabl').find('tr').each(function() {
        $(this).find('td').eq(0).before('<td align="center" data-hv="check"><input type="checkbox" class="nReag nmy"/></td>');
    });
}

function sendclient() {
    html = $('#mytabl tbody').html();
    add = addreg.join(',');
    not = noreg.join(',');
    $.post('server/server.php', {
            comand: 'sendclient',
            nomeradd: add,
            nomerclear: not,
            user: $('.userlogin').text()
        }, function(b) {
            addreg = [];
            noreg = [];
        }).done(function() {
            //alert("second success");
        })
        .fail(function(b) {

        })
        .always(function() {

        });
}

function NotReag() {
    if (!$('#mybox')[0]) { return; }
    if (!$('.nereagir')[0]) {
        htm = `
            <div class="nereagir">
            <table colspan="2" class="table_dark" id="noreag">
                <thead>
                    <th>Код</th>
                    <th>Обновлено</th>
                </thead>
                <tbody>
                </tbody>
            </table>
            </div>
        `;
        $('#mybox').append(htm);
    }

    htm = '';
    $('#mytabl tbody TR').each(function(index, el) {
        if ($(el).find('.nmy').prop("checked")) {
            htm = htm + '<tr>';
            htm = htm + '<td data-nr="kod">' + $(el).find('[data-hv="kod"]').text() + '</td>';
            htm = htm + '<td data-nr="Obnovleno">' + $(el).find('[data-hv="Obnovleno"]').text() + '</td>';
            htm = htm + '</tr>';
        }
    })
    $('#noreag tbody').html(htm);

}

function SravnSpisok() {
    $('#noreag tbody TR').each(function(index, el) {
        kod = $(el).find('[data-nr="kod"]').text();
        if ($('#mytabl td:contains("' + kod + '")')[0]) {
            $('#mytabl td:contains("' + kod + '")').closest('tr').find('.nmy').prop('checked', true);
            $('#mytabl td:contains("' + kod + '")').closest('tr').find('.nmy').closest('td').attr('data-check', 'true');
            $('#mytabl td:contains("' + kod + '")').closest('tr').find('td').css('color', '#CAD4D6');
        } else {
            $(el).remove();
        }
    });
    Opovesenie();
}

function Opovesenie() {
    if (pervzap) {
        pervzap = false;

    } else {
        var boools = false;
        $('#mytabl tbody TR').each(function(index, el) {
            if (!boools)
                if (!$(el).find('.nmy').prop("checked")) {
                    // alert('1');
                    bools = true;
                    $('#m1').mb_miniPlayer_play();
                    //$('.map_play').click();
                    return;
                }
        });
    }
}

function allcheck() {
    alert('11');
    $('.nmy').each(function(index, el) {
        $(el).prop("checked", true);
    });

}