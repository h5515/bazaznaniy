// Htm = `
//     <div class="Catparam"><img src="images/setting_2.png"</div>
// `;
// $('.cat_menu').append(Htm);
{
    /* <ul id="editcategor">
    <li>
    <span class="menueditcat k-icon k-i-gears" title="Редактировать категории"></span>
    <ul>
    <li><a href="#" id="idaddcat"><span class="k-icon k-i-plus-outline"></span>Добавить категорию</a></li>
    </ul>
    </li>
    </ul> */
}

$('.logotype').before(`
<button class="tlbutton menueditcat catcledits k-button k-button-md k-rounded-md k-button-solid k-button-solid-info"><span class=" k-icon k-i-gears" title="Редактировать категории"></span></button>

`);

$("#editcategor").kendoMenu();

$("#editcategor .k-menu-expand-arrow").remove();

$("#editcategor").on('click', function() {
    return false;
})

$('.menueditcat').on('click', function() {
    if ($(this).hasClass('menueditcatpn')) {
        $(this).removeClass('menueditcatpn');
        $('.dd3-handle').css('display', 'none');
        $("#idaddcats").remove();
    } else {
        $(this).addClass('menueditcatpn');
        $('.dd3-handle').css('display', '');
        $('.dd3-handle').eq(0).css('display', 'none');
        $('#nestable').prepend('<button id="idaddcats"><span class="k-icon k-i-plus"></span>Добавить категорию</button>');
        $("#idaddcats").kendoButton({
            themeColor: "info",
            click: function() {
                // if (!$(this).closest('.logotype').find('.menueditcat').hasClass('menueditcatpn'))
                //     $('.menueditcat').click();
                $(".addcat2").click();

                if (!isScrolledIntoView("#cat_menu .inputcat"))
                    $('#cat_menu').animate({
                        scrollTop: $("#cat_menu .inputcat").offset().top - 40
                    }, 400);
                $("#cat_menu .inputcat").focus();
            }
        });

    }
    return false;
})


$('.dd3-handle').css('display', 'none');

// $('.Catparam').on('click', function() {
//     if ($('.dd3-handle').css('display') == 'none') {
//         $('.dd3-handle').css('display', '');

//         $('.Catparam IMG').attr('src', 'images/Edit-80.png');
//     } else {
//         $('.dd3-handle').css('display', 'none');
//         $('.Catparam IMG').attr('src', 'images/setting_2.png');
//     }
// })