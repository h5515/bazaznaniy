kendo.init(".clmacategory");
$('.clmacategory button').on('click', function() {
    if (!$('.mainzagal')[0])
        $('.container').prepend('<h1 class="mainzagal"></h1>')
    cat = $(this).attr('categor');
    $('.clmacategory button').removeClass('k-button-solid-warning');

    but = localStorage.getItem('catbut');
    if (but == cat) {
        $(this).removeClass('k-button-solid-warning');
        $('.container [cat="1"]').css('display', '');
        $('.container [cat="2"]').css('display', '');
        localStorage.removeItem('catbut');
        $('.mainzagal').remove();
        return;
    }
    $(this).addClass('k-button-solid-warning');

    if (cat == '1') {
        $('.container [cat="2"]').css('display', 'none');
        $('.container [cat="1"]').css('display', '');
        $('.mainzagal').text('Внутренние инструкции');
    } else {
        $('.container [cat="1"]').css('display', 'none');
        $('.container [cat="2"]').css('display', '');
        $('.mainzagal').text('Инструкции заказчика');
    }
    localStorage.setItem('catbut', cat);
})
$(function() {
    if (!$('.container [cat="1"]')[0] || !$('.container [cat="2"]')[0]) {
        $('.clmacategory').css('display', 'none');
    }

    if (!$('.container [cat="1"]')[0] && !$('.container [cat="2"]')[0]) {

        if (getUrlVars()["catarhiv"] && getUrlVars()["catarhiv"] != "") {
            $('.container .dle-center').append('<span class="clacces" style="font-size: 24px;">Список архивированных баз отсутствует.</span>');
        } else
            $('.container .dle-center').append('<span class="clacces" style="font-size: 24px;">Отсутствует доступ к базам.</span>');

    }
})