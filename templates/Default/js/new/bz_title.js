$el = $('#categorid').find('ol li').eq(0);

cat_id = $el.attr('data-id');
// $el.find('a').eq(0).css('transition', 'none').css('opacity', 0);
// $el.find('span').eq(0).css('opacity', 0);
tex = $el.find('span').eq(0).text();
cols = $el.find('.CatRig').eq(0).text();
//$('.logo_title').text(tex).closest('a').attr('href', $el.find('a').eq(0).attr('href'));
href = $el.find('a').eq(0).attr('href');
img = $el.find('img').eq(0).attr('src');
$('.logo_icon').remove();
$('.logo_title').remove();
$('.logotype').append(`
<ul class="menubz">
<li><a href="` + href + `"><span class="cover titavatar menuicons" style="background-image: url(` + img + `);background-size: contain;"></span><span
    class="logo_title">` + tex + `</span></a>
  <ul id="samomenu">

  </ul>
</li>
</ul>
<span class="titlecat" onclick='return false;'>` + cols + `</span>
`).css('margin-left', '-11px').attr('href', '#');
$(".menubz").kendoMenu();

category = getUrlParameter('category');
project = getUrlParameter('project');
id_news = getUrlParameter('newsid');

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

if (!isScrolledIntoView("#cat_menu .activ"))
    $('#cat_menu').animate({
        scrollTop: $("#cat_menu .activ").offset().top - 40
    }, 400);

dt = {
    user_hash: "dle_login_hash",
}
getajaxhtml('/php/menu_bz.php?category=' + category + '&project=' + project + "&id_news=" + id_news + '&name_bz=' + tex + '&cat_id=' + cat_id, dt, '#samomenu');

// setTimeout(() => {
//     $('.menubz ul').append('<li><span class="k-icon k-i-user"></span>Мой профиль</li>');
//     $(".menubz").kendoMenu();
// }, 2000);