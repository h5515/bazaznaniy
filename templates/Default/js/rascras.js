function getRandom(min, max) {
    min = Math.ceil(min); // вычисляет и возвращает наименьшее целое число, которое больше или равно переданному числу (округляет число вверх)
    max = Math.floor(max); // вычисляет и возвращает наибольшее целое число, которое меньше или равно переданному числу (округляет число вниз)
    return Math.floor(Math.random() * (max - min)) + min;
}


$('.link-preview_table').each(function(index, element) {

    num = getRandom(1, 6);

    tx = $(element).parent().find('.newtitle').text().substring(0, 2).toUpperCase();

    $(element).find('.link-preview__text').text(tx);
    if (num == 1) {
        //Желтый
        $(element).css('background-color', '#fbe2d6');
        $(element).css('border-color', 'rgb(245 166 129)');
        $(element).find('.link-preview__text').css('color', '#e86d31');
    }
    if (num == 2) {
        //Зеленый
        $(element).css('background-color', '#D8F4EF');
        $(element).css('border-color', '#7DD9C8');
        $(element).find('.link-preview__text').css('color', '#3BC7AB');
    }
    if (num == 3) {
        //Синий
        $(element).css('background-color', 'rgb(180 212 236)');
        $(element).css('border-color', 'rgb(107 151 232)');
        $(element).find('.link-preview__text').css('color', 'rgb(59 121 199)');
    }
    if (num == 4) {
        //Фиалетовый
        $(element).css('background-color', 'rgb(246 214 251)');
        $(element).css('border-color', 'rgb(192 119 204)');
        $(element).find('.link-preview__text').css('color', 'rgb(192 119 204)');
    }
    if (num == 5) {
        //Желтотемный
        $(element).css('background-color', 'rgb(236 255 35)');
        $(element).css('border-color', 'rgb(127 138 7)');
        $(element).find('.link-preview__text').css('color', 'rgb(127 138 7)');
    }
})