(function($) {

    var _calloutCss;
    var _padding = 8;
    var _color = "#FFFFFF";
    var _bgColor = "#000000";
    var _tooltipOffset = 5;
    var _tooltipOffsetAnimate = 5;
    var _animteSpeed = 100;
    var _fontSize = 12;

    var TOP = "top";
    var BOTTOM = "bottom";
    var LEFT = "left";
    var RIGHT = "right";
    var kolices = '';
    var _borderRadius = 5;

    $.fn.formtoolip = function(param, css) {
        var _this = this;
        //Update Global Style
        _color = typeof(css.color) == 'undefined' ? _color : css.color;
        _padding = typeof(css.padding) == 'undefined' ? _padding : css.padding;
        _bgColor = typeof(css.backgroundColor) == 'undefined' ? _bgColor : css.backgroundColor;
        _fontSize = typeof(css.fontSize) == 'undefined' ? _fontSize : css.fontSize;
        _borderRadius = typeof(css.borderRadius) == 'undefined' ? _borderRadius : css.borderRadius;

        $.each(param, function(a, b) {

            var input = $(_this).find("[name=" + a + "]");

            if (typeof(b.position) === 'undefined') {
                //default to top;
                b.position = TOP;
            }

            if (input.length) {
                $(input).after("<span data-dir='" +
                    b.position + "' style='display:none;'>" + b.tooltip + "</span>");


                var tooltip = $(input).next();

                //Styling
                $(tooltip).css({
                    color: typeof(b.color) == 'undefined' ? _color : b.color,
                    fontSize: typeof(b.fontSize) == 'undefined' ? _fontSize : b.fontSize,
                    backgroundColor: typeof(b.backgroundColor) == 'undefined' ? _bgColor : b.backgroundColor,
                    padding: _padding,
                    borderRadius: _borderRadius
                });


                var fadeInTop, fadeOutTop, fadeInLeft, fadeOutLeft, hoverEleme;
                //alert($(input).text());


                $(input).hover(function() {
                    hoverEleme = this;
                    // if (hoverEleme)
                    //alert($(hoverEleme).html());
                    input = hoverEleme;
                    //});

                    //	$(input).mouseenter(function(){

                    var inputHeight = Number($(input).outerHeight());
                    var inputWidth = Number($(input).outerWidth());
                    var tooltipHeight = Number($(tooltip).outerHeight());
                    var tooltipWidth = Number($(tooltip).outerWidth());
                    var deltaWidth = inputWidth - tooltipWidth;
                    var deltaHeight = inputHeight - tooltipHeight;
                    var position = $(this).position();

                    var t, l;


                    if (b.position == TOP || b.position == BOTTOM) {
                        t = $(this).position().top + inputHeight + _tooltipOffset;
                        l = $(this).position().left + deltaWidth / 2;
                        fadeInTop = "+=" + _tooltipOffsetAnimate;
                        fadeOutTop = "-=" + _tooltipOffsetAnimate;
                    } else if (b.position == LEFT) {
                        t = $(this).position().top + deltaHeight / 2;
                        l = $(this).position().left - tooltipWidth - _tooltipOffset;
                        fadeInLeft = "-=" + _tooltipOffsetAnimate;
                        fadeOutLeft = "+=" + _tooltipOffsetAnimate;
                    } else if (b.position == RIGHT) {
                        t = $(this).position().top + deltaHeight / 2;
                        l = $(this).position().left + inputWidth + _tooltipOffset;
                        fadeInLeft = "+=" + _tooltipOffsetAnimate;
                        fadeOutLeft = "-=" + _tooltipOffsetAnimate;
                    }
                    /*else if (b.position == TOP) {
                               t = $(this).position().top - tooltipHeight - _tooltipOffset;
                               l = $(this).position().left + deltaWidth / 2;
                               fadeInTop = "-=" + _tooltipOffsetAnimate;
                               fadeOutTop = "+=" + _tooltipOffsetAnimate;
                             }*/

                    trun = $(input).next();

                    if (b.position == RIGHT || b.position == LEFT) {
                        $(trun).css({
                            top: t,
                            left: l,
                            position: 'absolute',
                            opacity: 0
                        }).show().stop().animate({
                            opacity: 1,
                            top: fadeInTop
                        }, _animteSpeed);
                    } else if (b.position == TOP || b.position == BOTTOM) {
                        $(trun).css({
                            top: t - 10,
                            left: l + 15,
                            position: 'absolute',
                            'backgroundColor': '#ededed',
                            border: '1px solid #d6d6d6',
                            'z-index': 20,
                            'box-shadow': '0 1px 3px 0 rgba(0,0,0,0.2)',
                            '-webkit-box-shadow': '0 1px 3px 0 rgba(0,0,0,0.2)',
                            opacity: 0
                        }).show().stop().animate({
                            opacity: 1,
                            top: fadeInLeft
                        }, _animteSpeed);
                    }


                }, function() {

                    //$(input).on('mouseleave', function() { 

                    hoverEleme = this; //.focusout(function(){
                    trun = $(hoverEleme).next();

                    $(trun).hover(function() {
                        $(trun).show().stop();

                    }, function() {

                        $(trun).stop().animate({
                            opacity: 0,
                            top: fadeOutTop
                        }, _animteSpeed, function() {
                            $(this).hide();
                        });
                    });

                    if (b.position == RIGHT || b.position == LEFT) {
                        $(trun).stop().animate({
                            opacity: 0,
                            left: fadeOutLeft
                        }, _animteSpeed, function() {
                            $(this).hide();
                        });

                    } else if (b.position == TOP || b.position == BOTTOM) {
                        $(trun).stop().animate({
                            opacity: 0,
                            top: fadeOutTop
                        }, _animteSpeed, function() {
                            $(this).hide();
                        });
                    }


                });


                if (b.position == TOP) elg = '.addcat2';
                else elg = '.addcat';
                $(elg).on('click', function() {

                    $('.dd3-handle').css('display', 'none');
                    $(trun).hide();
                    var elem = $(this).parent().parent();

                    //alert($(elem).text());
                    elol = $(elem).find('ol:first');

                    var litext = "<li data-id='0' class='dd-item dd3-item'><a href='#' style='white-space: nowrap;'><img src='/templates/Default/dleimages/no_icon.png' width='16' height='16' class='imagt'><input type='text' class='inputcat'></input><img src='/images/ok-cat.png' width='16' height='16' class='imagt imgcat catok' title='Применить'><img src='/images/no-cat.png' width='16' height='16' class='imagt imgcat catno' title='Отменить'></a></li>";
                    //console.log($(elol).html());
                    if ($(elol).html() != null) {
                        //alert('1');
                        elol = $(elol).append(litext);

                    } else {
                        $(elem).prepend('<button data-action="collapse" type="button">Collapse</button><button data-action="expand" type="button" style="display: none;">Expand</button>');
                        elol = $(elem).append("<ol class='dd-list'>" + litext);
                    }

                    $('.catno').on('click', function() {
                        var elem = $(this).parent().parent();
                        $(elem).remove();
                        $('.dd3-handle').css('display', '');
                    });

                    $('.catok').on('click', function() {
                        var inputcat = $(this).prev();
                        var glcat = $(input).parent();
                        var idparent = $(glcat).attr('data-id');
                        var elem = $(this).parent().parent();
                        var catname = $(inputcat).val();
                        // alert(catname);
                        ShowLoading('');
                        $.post(dle_root + "engine/ajax/controller.php?mod=catsort" + project_url, {
                            user_hash: dle_login_hash,
                            action: 'addcat',
                            name: catname,
                            id: idparent,
                        }, function(b) {
                            HideLoading('');
                            //	alert(b);
                            var result = b.split('|');
                            if ($.isNumeric(result[0])) {
                                var lielem = $(elem).parent();
                                //$(elem).attr('data-id', result[0]);
                                $(elem).remove();
                                //  alert(project_url);
                                $(lielem).append("<li data-id='" + result[0] + "' class='dd-item dd3-item'><a href='?do=cat&category=" + result[1] + project_url + "' style='white-space: nowrap;'><img src='/templates/Default/dleimages/no_icon.png' width='16' height='16' class='imagt'> " + catname + "<span style='float: right;'>0</span></a><div class='dd3-handle dd-handle' name='cat' style='display: none;'></div></li>");

                                /*$(elem).html("<a href='?do=cat&category=" + result[1] + "' style='white-space: nowrap;'><img src='/templates/Default/dleimages/no_icon.png' width='16' height='16' class='imagt'>&nbsp;" + catname + "<span style='float: right;'>0</span></a><div class='dd3-handle dd-handle' name='cat' style='display: none;'></div>");*/
                            } else {
                                alert('Ошибка: ' + b);
                            }
                            $('.dd3-handle').css('display', '');
                            fields = {
                                cat: {
                                    tooltip: "<img src='images/plus_cat.png' class='catedit addcat' title ='Добавить' /><img src='images/edit_cat.png' class='catedit editcat' title ='Редактировать'/><img src='images/trash_cat.png' class='catedit delcat' title ='Удалить или архивировать'/> ",
                                    position: 'bottom',
                                }
                            };
                            $("#nestable").find('span[data-dir="bottom"]').remove();
                            $("#nestable").formtoolip(fields, {
                                fontSize: 15,
                                padding: 3,
                                borderRadius: 5
                            });

                        });
                        //$('.dd3-handle').css('display', '');
                    });

                });

                $('.editcat').on('click', function() {
                    $('.dd3-handle').css('display', 'none');
                    var elem = $(this).parent().parent();
                    //$(elem).css('white-space', 'nowrap');
                    var catnam = $(elem).children('a').children('span').parent().html();
                    var koltext = $(elem).children('a').children('.catname').text();
                    kolices = $(elem).children('a').children('.CatRig').text();
                    var url = $(elem).children('a').attr('href');
                    var kls = $(elem).children('a').attr('class');
                    var olelem = $(elem).children('ol').html();
                    var buttonest = $(elem).children('button');
                    var buttex = $(elem).children('button').html();
                    if (!!olelem) {
                        olelem = '<ol class="dd-list">' + olelem + '</ol>';
                    } else olelem = '';
                    if (!!buttex) {
                        var butson = $(elem).children("button[data-action='expand']").attr('style');
                        if (butson.indexOf('none') < 0) {
                            buttex = '<button data-action="collapse" type="button" style="display: none;">Collapse</button><button data-action="expand" type="button">Expand</button>';
                        } else {
                            buttex = '<button data-action="collapse" type="button">Collapse</button><button data-action="expand" type="button" style="display: none;">Expand</button>';
                        }
                    } else buttex = '';
                    catnam = catnam.match(/\>(.*?)\<span/)[1];
                    catnam = $.trim(catnam);
                    var parentid = $(elem).attr('data-id');

                    var litext = "<a href='#' style='white-space: nowrap;'><img src='/templates/Default/dleimages/no_icon.png' width='16' height='16' class='imagt leftimg'><input type='text' class='inputcat' value='" + koltext + "'></input><img src='/images/ok-cat.png' width='16' height='16' class='imagt imgcat catok' title='Применить'><img src='/images/no-cat.png' width='16' height='16' class='imagt imgcat catno' title='Отменить'></a>" + olelem;
                    $(elem).html(litext);

                    $('.catno').on('click', function() {
                        var elem = $(this).parent().parent();
                        var litext = " ";
                        if (kls != "") kls = ' class = "' + kls + '"';
                        $(elem).html(buttex + "<a href='" + url + "' style='white-space: nowrap;' " + kls + "><img src='/templates/Default/dleimages/no_icon.png' width='16' height='16' class='imagt leftimg'> <span class='catname'>" + koltext + "</span><span style='float: right;' class='CatRig'>" + kolices + "</span></a><div class='dd3-handle dd-handle' name='cat' style='display: none;'></div>" + olelem);
                        $('.dd3-handle').css('display', '');
                        fields = {
                            cat: {
                                tooltip: "<img src='images/plus_cat.png' class='catedit addcat' title ='Добавить' /><img src='images/edit_cat.png' class='catedit editcat' title ='Редактировать'/><img src='images/trash_cat.png' class='catedit delcat' title ='Удалить или архивировать'/> ",
                                position: 'bottom',
                            }
                        };
                        $("#nestable").find('span[data-dir="bottom"]').remove();
                        $("#nestable").formtoolip(fields, {
                            fontSize: 15,
                            padding: 3,
                            borderRadius: 5
                        });
                    });
                    $('.catok').on('click', function() {
                        var elem = $(this).parent().parent();
                        var parentid = $(elem).attr('data-id');
                        var catnames = $(elem).children('a').children('input').val();

                        var litext = " ";
                        if (kls != "") kls = ' class = "' + kls + '"';
                        ShowLoading('');
                        $.post(dle_root + "engine/ajax/controller.php?mod=catsort", {
                            user_hash: dle_login_hash,
                            action: 'update',
                            id: parentid,
                            name: catnames,
                        }, function(b) {
                            HideLoading('');
                            // if (b != 'ok') alert('Ошибка: '+b);
                            $(elem).html(buttex + "<a href='?do=cat&category=" + b + project_url + "' style='white-space: nowrap;' " + kls + "><img src='/templates/Default/dleimages/no_icon.png' width='16' height='16' class='imagt leftimg'> <span class='catname'>" + catnames + "</span><span style='float: right;' class='CatRig'>" + kolices + "</span></a><div class='dd3-handle dd-handle' name='cat' style='display: none;'></div>" + olelem);
                            $('.dd3-handle').css('display', '');
                            fields = {
                                cat: {
                                    tooltip: "<img src='images/plus_cat.png' class='catedit addcat' title ='Добавить' /><img src='images/edit_cat.png' class='catedit editcat' title ='Редактировать'/><img src='images/trash_cat.png' class='catedit delcat' title ='Удалить или архивировать'/> ",
                                    position: 'bottom',
                                }
                            };
                            $("#nestable").find('span[data-dir="bottom"]').remove();
                            $("#nestable").formtoolip(fields, {
                                fontSize: 15,
                                padding: 3,
                                borderRadius: 5
                            });
                        });
                    });


                });


                $('.delcat').on('click', function() {
                    $('.dd3-handle').css('display', 'none');
                    var elem = $(this).parent().parent();
                    var glelem = $(elem).parent().parent();
                    var catnam = $(elem).children('a').children('span').parent().html();
                    catnam = catnam.match(/\>(.*?)\<span/)[1];

                    var parentid = $(elem).attr('data-id');

                    $('#modaladel').iziModal({
                        headerColor: '#48D438',
                        // width: 600,
                        timeout: 3000,
                        //  pauseOnHover: true,
                        timeoutProgressbar: true,
                        onClosing: function() {
                            // window.location.reload();
                            $('.dd3-handle').css('display', '');
                        }
                    });
                    var arcimg = $(elem).find('img').attr('src');
                    var urlgl = $(glelem).find('a').attr('href');
                    if (arcimg == 'images/archive.png') {
                        valarc = '<option value="vostan">Восстановить</option>';
                        caparch = 'Удалить или восстановить - ';
                    } else {
                        valarc = '<option value="arhiv">Архивировать</option>';
                        caparch = 'Удалить или архивировать - '
                    }

                    var content = '<div align="center" style="padding:15px"><div style="color: red">Внимание: Все дочерние категории также будут затронуты.<br>Все статьи принадлежащие этим категориям будут обработаны в соответствии с выбором.</div><p>Выберите действие:&nbsp;<select id="deistvie">' + valarc + '<option value="del">Удалить</option></select></p><br><a href="#" class="button21 butvipoln">Выполнить</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="$(\'#modaladel\').iziModal(\'close\'); return false;" class="button21">Закрыть</a></div>';

                    $("#modaladel").iziModal('setTitle', caparch + catnam);
                    $("#modaladel").iziModal('setContent', content);
                    $("#modaladel").iziModal('open');
                    $("#modaladel").iziModal('pauseProgress');

                    $('.butvipoln').on('click', function() {
                        var deystv = $(deistvie).val();
                        //alert (parentid+' - '+deystv);
                        ShowLoading('');
                        $('#modaladel').iziModal('close');
                        $.post(dle_root + "engine/ajax/controller.php?mod=catsort", {
                            user_hash: dle_login_hash,
                            action: deystv,
                            id: parentid,
                        }, function(b) {
                            HideLoading('');
                            if (b == 'reload') window.location.reload();
                            if (b == 'reloadparent') document.location.href = urlgl;
                            //alert(b);

                        });

                    });


                });


            } else {
                console.log("ERROR: Cannot find " + a);
            }


        });

    };

}(jQuery));