$el = $('#categorid').find('ol li').eq(0);

cat_id = $el.attr('data-id');
// $el.find('a').eq(0).css('transition', 'none').css('opacity', 0);
// $el.find('span').eq(0).css('opacity', 0);
tex = $el.find('span').eq(0).text();
cols = $el.find('.CatRig').eq(0).text();
//$('.logo_title').text(tex).closest('a').attr('href', $el.find('a').eq(0).attr('href'));
href = $el.find('a').eq(0).attr('href');
img = $el.find('img').eq(0).attr('src');

$el.find('a').eq(0).attr('href', '#').attr('onClick', 'return false;').attr('style', 'opacity:0; cursor:default');
$('.logo_icon').remove();
$('.logo_title').remove();
$('.logotype').append(`
<button class="tlbutton k-button k-button-md k-rounded-md k-button-solid k-button-solid-info" title="На главную" onclick="window.location.href = '/'" style="margin-right: 3px;"><span class="k-icon k-i-undo"></span></button>
<button class="tlbutton rigs k-button k-button-md k-rounded-md k-button-solid k-button-solid-info"><a href="` + href + `" id="titlebzgl"><span class="cover titavatar menuicons" style="background-image: url(` + img + `);background-size: contain;"></span><span
    class="logo_title">` + tex + `</span></a></button>
<ul class="menubz">
    <li><button class="tlbutton ligs k-button k-button-md k-rounded-md k-button-solid k-button-solid-info"><span class="k-menu-expand-arrow"><span class="k-menu-expand-arrow-icon k-icon k-i-arrow-s"></span></span></button>
  <ul id="samomenu">

  </ul>
</li>
</ul>
<span class="titlecat" onclick='return false;'>` + cols + `</span>
`).css('margin-left', '-11px').attr('href', '#').css('cursor', 'default');
$(".menubz").kendoMenu({
    openOnClick: true,
});

category = getUrlParameter('category');
project = getUrlParameter('project');
id_news = getUrlParameter('newsid');



if (!isScrolledIntoView("#cat_menu .activ"))
    $('#cat_menu').animate({
        scrollTop: $("#cat_menu .activ").offset().top - 40
    }, 400);

$('.headeruz').append('<span class="aflogo"></span>');

$('.aflogo').click(function() {
    window.location.href = '/';
})

dt = {
    user_hash: "dle_login_hash",
}
getajaxhtml('/php/menu_bz.php?category=' + category + '&project=' + project + "&id_news=" + id_news + '&name_bz=' + tex + '&cat_id=' + cat_id, dt, '#samomenu');