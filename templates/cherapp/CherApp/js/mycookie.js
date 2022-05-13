//alert(localStorage.getItem('test'));
/*$.cookie('test', '111', { expires: 7, path: '/' });*/
//localStorage.setItem('test', '111');

function SaveStorag() {
    var mas = [];
    $('.expand').each(function(indexInArray, Element) {
        if ($(this).closest('LI').find('UL:first').css('display') != 'none') {
            mas.push(indexInArray);
        }
    });
    //var serialObj = JSON.stringify(mas);
    localStorage.setItem('HvOpen', mas);
    var scrol = $(MiScroll).scrollTop();
    localStorage.setItem('HvScroll', scrol);
}

function LoadStorag() {

    $('.expand').closest('LI').find('UL:first').css('display', 'none');
    mac = localStorage.getItem('HvOpen');

    if (mac != null) {
        mas = mac.split(',');
        for (let i = 0; i < mas.length; i++) {
            $('.expand').eq(mas[i]).closest('LI').find('UL:first').css('display', '');
        };
    }


    scrol = localStorage.getItem('HvScroll');
    setTimeout(() => {
     if ($('.loading').css('displa')!='none')
        $('.loading').css('display','none');

        $('.loading').nocenter();
        if ($('#dle-content')[0])
        $('#dle-content').css('display','');
        else
        $('.text').css('display', '');

        if (scrol != null) {
            $(MiScroll).scrollTop(scrol);
        }
        HigslideActive();
    }, 100);

}