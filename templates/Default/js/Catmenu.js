Htm = `
    <div class="Catparam"><img src="images/setting_2.png"</div>
`;
$('.cat_menu').append(Htm);
$('.dd3-handle').css('display', 'none');

$('.Catparam').on('click', function() {
    if ($('.dd3-handle').css('display') == 'none') {
        $('.dd3-handle').css('display', '');

        $('.Catparam IMG').attr('src', 'images/Edit-80.png');
    } else {
        $('.dd3-handle').css('display', 'none');
        $('.Catparam IMG').attr('src', 'images/setting_2.png');
    }
})