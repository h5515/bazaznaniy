HigslideActive();
setTimeout(() => {
    HigslideActive();
}, 5000);

window.onresize = function(event) {
    $nav = $('.rightside2');
    $window = $(window);
    $h = $window.height();
    $w = $window.width();
    $nav.css('margin-top', $h - 80);
    $nav.css('margin-left', $w - 200);
};


$(function() {
    $nav = $('.rightside2');
    $window = $(window);
    $h = $window.height();
    $w = $window.width();
    $nav.css('margin-top', $h - 80);
    $nav.css('margin-left', $w - 200);
});

var tour = '1';

$('.switch-btn').click(function() {
    $(this).toggleClass('switch-on');
    if ($(this).hasClass('switch-on')) {
        $(this).trigger('on.switch');
        // $(".storykorotk").show(); 
        $(".storykorotk").slideToggle(300);
        //	$(".imagc1").attr('src', 'images/arrow_up.png');
        $(".imagc").css({
            '-webkit-transform': 'rotateX(180deg)'
        });
        $.cookie('switch', '1', { expires: 14 });
    } else {
        $(this).trigger('off.switch');


        if (tour !== '1') {
            $(".storykorotk").slideToggle(300);
        } else {
            $(".storykorotk").hide();
            tour = '2';
        }

        //	$(".imagc1").attr('src', 'images/arrow_down.png');
        $(".imagc").css({
            '-webkit-transform': 'rotateX(0deg)'
        });
        $.cookie('switch', '0', { expires: 14 });
    }
});


$(function() {
    if (!$.cookie('switch')) {
        $(".storykorotk").show();
    } else {

        if ($.cookie('switch') == '0') {
            //$(".storykorotk").hide(); 
            //$(".imagc1").attr('src', 'images/arrow_down.png');
            //$(".imagc").css({'-webkit-transform':'rotateX(0deg)'});
            $('.switch-btn').triggerHandler('click', false);
        } else {
            $(".storykorotk").slideToggle(300);
            //$(".imagc1").attr('src', 'images/arrow_up.png');
            $(".imagc").css({
                '-webkit-transform': 'rotateX(180deg)'
            });
        }
    }
});

function transformTag(tagData) {
    tagData.style = "--tag-bg: #4158ff;--tag-remove-btn-color: white;--tag-text-color: #f5f3f3;--tag-remove-btn-bg--hover: #c74a4a;--tag-text-color: #f5f3f3;--tag-remove-bg: rgb(121 87 87 / 61%);";
}


if (document.querySelector('input[name=tags-outside]')) {
    var input = document.querySelector('input[name=tags-outside]')
        // init Tagify script on the above inputs
    var tagify = new Tagify(input, {
        editTags: false,

    })
}
if (document.querySelector('input[name=tags-outside2]')) {
    var input = document.querySelector('input[name=tags-outside2]')
        // init Tagify script on the above inputs
    var tagify2 = new Tagify(input, {
        editTags: false,
        maxTags: 1,
        transformTag: transformTag,
    })

    tagify2.on('add', function(e) {
        $(".tagifyoff2").removeClass("hide");
    });
    tagify2.on('remove', function(e) {
        $(".tagifyoff2").addClass("hide");
        tempcomand = '';
        tagon = tagres(tagify);
        if (tagon == '' && tempkey == '') {
            $("#searchsuggestions3").fadeIn(100);
            $("#searchsuggestions2").fadeOut(100);
            $("#searchsuggestions2").html('');
            $(".storykorotk2").attr('class', 'storykorotk');
            $("#idkolich").hide();
            proversvitch();
        }
        //alert (temptagon);
        if (tempkey != '' || tagon != '') {
            dle_do_search(tempkey, tempcat, tempsort, tempdir, tagon, '', '');
        } else
            AllTag(tempcat, tagstemp);
    })
}


function Loadparam() {
    slovcheck = '';
    tempcomand = '';
    if ($('#tagcheck')) {
        if ($.cookie('tagcheck')) {
            if ($.cookie('tagcheck') == 'false') {
                $("#tagcheck").removeAttr("checked");
            } else {
                $("#tagcheck").attr("checked", "checked");
            }
        }
    }
    if ($('#slovcheck')) {
        if ($.cookie('slovcheck')) {
            if ($.cookie('slovcheck') == 'false') {
                $("#slovcheck").removeAttr("checked");
            } else {
                $("#slovcheck").attr("checked", "checked");
            }
        }
    }
    if ($('#tagscheck')) {
        if ($.cookie('tagscheck')) {
            if ($.cookie('tagscheck') == 'false') {
                $("#tagscheck").removeAttr("checked");
                $(".tagshides").hide();
            } else {
                $("#tagscheck").attr("checked", "checked");
                $(".tagshides").removeClass('hide');
                $(".tagshides").show();
            }
        }
    }
    $(".kolichestvo").removeClass('kolichestvo');
    if ($("#idtags")) {
        if ($.cookie('idtags')) {
            if ($.cookie('idtags') == 'true') {
                $("#idtags").show();
                $("#idimgtags").css({
                    '-webkit-transform': 'rotateX(180deg)'
                });
                var h = $("#idtags").height();
                if (h > 444) { h = 444 }
                $("#idtags").css({
                    'min-height': h + 'px'
                });
            }
        }

    }
}

function Saveparam(e) {
    var chek = 'false';
    if ($('#' + e)) {
        var check = $('#' + e).attr('checked');
        if (check != "checked") {
            if (e == 'slovcheck')
                chek = 'true';
            $.cookie(e, 'true', { expires: 14 });
        } else {
            if (e == 'slovcheck')
                chek = 'false';
            $.cookie(e, 'false', { expires: 14 });
        }
    }
    if (e == 'slovcheck')
        if (tempkey != "") {
            dle_do_search(tempkey, tempcat, tempsort, tempdir, temptagon, chek, tempcomand);
        }
    if (e == 'tagscheck') {
        var check = $('#tagscheck').attr('checked');
        if (check == "checked") {
            $(".tagshides").hide();
        } else {
            $(".tagshides").removeClass('hide');
            $(".tagshides").show();
        }

    }
}

$(function() {
    $("#tagcheck").iosCheckbox();
    $("#slovcheck").iosCheckbox();
    $("#tagscheck").iosCheckbox();
    // $("#slovcheck").iosCheckbox();
});