var oks = false;
var tagstemp = 'hide';
var trog = false;
var vipolclear = true;

function HigslideActive() {
    $('.highslide').each(function(index, el) {
        $(el).attr('onClick', 'return hs.expand(this);');
    })

}

function opentegform(categor) {
    if ($("#idtags").css('display') == 'none' || $("#idtags").css("visibility") == "hidden") {

        $("#idtags").slideDown("show", function() {
            var h = $("#idtags").height();
            if (h > 444) {
                h = 444
            }
            $("#idtags").css({
                'min-height': h + 'px'
            });
        });

        $.cookie('idtags', 'true', { expires: 14 });
        $("#idimgtags").css({
            '-webkit-transform': 'rotateX(180deg)',
            '-webkit-transition': 'transform ease .4s'
        });
    } else {
        AllTag(categor, 'clear');
        $("#idtags").css({
            'min-height': '0px'
        });
        $("#idtags").slideUp(300);
        $("#idimgtags").css({
            '-webkit-transform': 'rotateX(0deg)',
            '-webkit-transition': 'transform ease .4s'
        });
        $.cookie('idtags', 'false', { expires: 14 });
    }

}
function openhistory(categor) {
    if ($("#idtags").css('display') == 'none' || $("#idtags").css("visibility") == "hidden") {

        $("#idtags").slideDown("show", function() {
            var h = $("#idtags").height();
            if (h > 444) {
                h = 444
            }
            $("#idtags").css({
                'min-height': h + 'px'
            });
        });
        $("#idimgtags").css({
            '-webkit-transform': 'rotateX(180deg)',
            '-webkit-transition': 'transform ease .4s'
        });
    } else {
        $("#idtags").css({
            'min-height': '0px'
        });
        $("#idtags").slideUp(300);
        $("#idimgtags").css({
            '-webkit-transform': 'rotateX(0deg)',
            '-webkit-transition': 'transform ease .4s'
        });
    }

}
function openhistoryedit() {
    if ($("#idtags2").css('display') == 'none' || $("#idtags2").css("visibility") == "hidden") {

        $("#idtags2").slideDown("show", function() {
            var h = $("#idtags2").height();
            if (h > 444) {
                h = 444
            }
            $("#idtags2").css({
                'min-height': h + 'px'
            });
        });
        $("#idimgtags2").css({
            '-webkit-transform': 'rotateX(180deg)',
            '-webkit-transition': 'transform ease .4s'
        });
    } else {
        $("#idtags2").css({
            'min-height': '0px'
        });
        $("#idtags2").slideUp(300);
        $("#idimgtags2").css({
            '-webkit-transform': 'rotateX(0deg)',
            '-webkit-transition': 'transform ease .4s'
        });
    }

}

function ioscheck(e) {
    Saveparam(e);
    if ($("#" + e).attr("checked") == "checked") {
        $("#" + e).removeAttr("checked");
        $("#" + e).next(".ios-ui-select").removeClass("checked");
    } else {
        $("#" + e).attr("checked", "checked");
        $("#" + e).next(".ios-ui-select").addClass("checked");
    }
}

function openm(id) {
    //alert($(this).text());
    if ($("#" + id).css('display') == 'none' || $("#" + id).css("visibility") == "hidden") {
        $("#" + id).slideDown(300);
        //alert( $("#"+id).parents("span").find("img").attr("src"));	
        $("#" + id).parents("span").find("img").css({
            '-webkit-transform': 'rotateX(180deg)',
            '-webkit-transition': 'transform ease .4s'
        });
        if (id == "idpoavtor") {
            $("#" + id).html("<img src='images/Loading.gif' width='16' height='16' align='center'/>");
            $.post(dle_root + "engine/ajax/controller.php?mod=zapros" + project_url, {
                comand: 'autor',
                categor: tempcat,
            }, function(b) {
                $("#" + id).html(b).slideDown(300);
            })
        }

    } else {
        $("#" + id).slideUp(300);
        $("#" + id).parents("span").find("img").css({
            '-webkit-transform': 'rotateX(0deg)',
            '-webkit-transition': 'transform ease .4s'
        });
        //$("#" + id).html("");
    }
}

function Showsetting() {
    //$('.setting').slideToggle(1000);
    $("#story").css('border-radius', '0 0 18px 18px');

    $(".setting").slideToggle({ // ????????????????????, ?????? ???????????????? ???????????????? <div> ?? ??????????????????
        duration: 300, // ?????????????????????????????????? ????????????????
        easing: "linear", // ???????????????? ????????????????
        complete: function() { // callback
            if ($(".setting").is(":hidden")) {
                $("#story").css('border-radius', '18px');
            }
        },
        queue: false // ???? ???????????? ?? ??????????????
    });

}

function proverload(e) {
    var first = getUrlVars()["stroka"];
    if (first != '' && e == 'start') {
        top.postMessage("loadframestart", "*");
    }
    if (first != '' && e == 'stop') {
        top.postMessage("loadframestop", "*");
    }

}

function Setboxon() {
    $(".setting").css('background-color', '#96E9BC');
}

function Setboxout() {
    $(".setting").css('background-color', '#dfdfdf');
}

function onFoc() {
    $("#story").focus();
}


function getUrlVars() {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function smenautor(autors) {
    Tagifyautor.removeAllTags();
    Tagifyautor.addTags(autors);
}

function filtered(b, comand) {
    $(".tagifyoff2").removeClass("hide");
    var a = -1;
    a = comand.indexOf('??????????');
    if (a > -1) e = comand;
    else
        var e = $(b).find('td:eq(0)').text();

    a = comand.indexOf('??????????');
    if (a > -1) e = $(b).attr('title');

    tagify2.addTags(e);
    $("#searchsuggestions3").fadeOut(100);
    tcomand = tagres(tagify2);
    if (tcomand.indexOf(",") + 1 < 1) {
        tagon = tagres(tagify);
        AllTag(tempcat, tagstemp);
        dle_do_search(tempkey, tempcat, tempsort, tempdir, tagon, '', comand);
    } else if (tcomand.substr(0, tcomand.indexOf(",")) != e) {
        tagify2.removeAllTags();
        tagify2.addTags(e);
        $("#searchsuggestions3").fadeOut(100);
        tagon = tagres(tagify);
        AllTag(tempcat, tagstemp);
        dle_do_search(tempkey, tempcat, tempsort, tempdir, tagon, '', comand);
    }
}


function tagres(tagval) {
    const tags = tagval.getTagElms();
    let result = '';
    if (tags.length > 0) {
        result = tags.map(function(tag) {
            return tag.textContent;
        }).join(',');
    };
    return result;
};

function tagsclick(nam, elem, category) {
    // alert (nam);
    // alert ($(elem).parent().text());
    //  $(elem).parent().hide();
    tagify.addTags(nam);

    //if (tagstemp=='hide'){
    AllTag(category, 'search')


}

function AllTag(Category, Comand) {
    var Search = "";

    var tagon = tagres(tagify);

    if (Comand == '') {
        Comand = tagstemp;
    }

    if (Comand == "clear") {
        $("#sertags").val('');
        Comand = tagstemp;
    }
    Search = $("#sertags").val();
    // alert (Search+' - '+Comand);
    if (Comand == 'search') {
        if (Search == "") {
            Comand = tagstemp;
        }
    }
    if (Comand == 'all' || Comand == 'hide') {
        tagstemp = Comand;
    }

    var tagc = true;

    var check = $('#tagcheck').attr('checked');

    if (check == "checked") {
        tagc = true;
    } else {
        tagc = false;
    }
    var comand = '';
    tcomand = tagres(tagify2);

    var a = -1;
    a = tcomand.indexOf('??????????');
    if (a > -1) {
        comand = tcomand;
    }
    a = -1;

    a = tcomand.indexOf('???????????????????? ????');
    if (a > -1) {
        comand = tcomand;
    }

    if (tcomand == '????????????????') {
        comand = 'favorit';
    }
    if (tcomand == '?????????????????????????? ????????????') {
        comand = 'noread';
    }
    if (tcomand == '?????? ????????????') {
        comand = 'myst';
    }
    if (tcomand == '?????????????? ????????????????????') {
        comand = 'noapp';
    }
    if (tcomand == '??????????') {
        comand = 'arhiv';
    }


    $.post(dle_root + "engine/ajax/controller.php?mod=tagsall" + project_url, {
        category: Category,
        comand: Comand,
        search: "" + Search,
        tagson: tagon,
        tagcheck: tagc,
        command: comand,
    }, function(b) {
        $(".tag_list").html(b);
        HigslideActive();


    })

}

function procitano(id, e) {
    var img = e.childNodes[0];
    s = $(img).attr('src');
    var bol = 'false';

    if (s == 'images\\voskl.png') {
        bol = 'true';
    } else {
        bol = 'false';
    }
    var first = getUrlVars()["stroka"];
    if (first) {
        if (first != '') {
            var bols = true;
        } else {
            var bols = false;
        }
    } else {
        var bols = false;
    }

    $(e).html('<img src="images\\Loading.gif" width="24" height="24">');
    var int = Number.parseInt($("#readno").text());
    $.post(dle_root + "engine/ajax/controller.php?mod=readbz" + project_url, {
        id: id,
        ustl: bol,
    }, function(b) {
        if (bol == 'true') {
            // $(img).attr('src','images\\galka.png');
            $(e).html('<img src="images\\galka.png">??????????????????!');
            int--;
            $("#readno").text(int);
            $(".prs" + id).html('<img src="images\\galka.png">??????????????????!');
            if (bols) {
                $(e).attr('onclick', 'procitano(' + id + ',this);top.postMessage(\'st1' + id + '\', \'*\');return false;');
            }
        } else {
            // $(img).attr('src','images\\voskl.png');
            $(e).html('<img src="images\\voskl.png"><b>???? ??????????????????!</b>');
            int++;
            $("#readno").text(int);
            $(".prs" + id).html('<img src="images\\voskl.png"><b>???? ??????????????????!</b>');
            if (bols) {
                $(e).attr('onclick', 'procitano(' + id + ',this);top.postMessage(\'st0' + id + '\', \'*\');return false;');
            }
        }
    })

}


function Clearsearch() {
    if ($(".setting").is(":visible")) {
        Showsetting();
    }
    tempkey = '';
    tagify.removeAllTags();
    AllTag(tempcat, 'search');
    document.getElementById("story").value = "";
    tcomand = tagres(tagify2);

    if (tcomand == "") {
        if (!vipolclear) {
            $("#searchsuggestions3").fadeIn(100);
            $("#searchsuggestions2").fadeOut(100);
            $("#searchsuggestions2").html('');
            $(".storykorotk2").attr('class', 'storykorotk');
            $("#idkolich").hide();
            vipolclear = true;
            proversvitch();
            HigslideActive();
        }
    } else {
        tagon = tagres(tagify);
        dle_do_search(tempkey, tempcat, tempsort, tempdir, tagon, '', tempcomand);

    }

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Hidekp() {
    if ($(".storykorotk").css('display') == 'none' || $(".storykorotk").css("visibility") == "hidden") {
        $(".storykorotk").show();
    } else {
        $(".storykorotk").hide();
    }
}

function SendMails(id, edit, fir) {
    // IzimodalClose('sendform');
    $('#sendform').iziModal({
        headerColor: '#006d86c4',
        width: 300,
        timeout: 3000,
        pauseOnHover: false,
        timeoutProgressbar: true,
        onClosing: function() {
            // window.location.reload();
            //  $("#modalalert").iziModal('resumeProgress');
            if (!fir) {
                $("#mailadd").html("?????????????????? ???? ?????????? ?????????????? ????????????????????!");
            } else
                $("#" + fir).html("?????????????????? ???? ?????????? ?????????????? ????????????????????!");
        }
    });


    if (edit == "edit") {
        var iedit = "ok";
        $("#sendform").iziModal('setTitle', '??????????????????!');
    } else {
        var iedit = "no";
        $("#sendform").iziModal('setTitle', '??????????????????!');
    }
    $("#sendform").iziModal('setContent', '<div align="center"><img src="images/Loading.gif"/ width="32px" height="32px"></div>');

    $("#sendform").iziModal('open');
    $("#sendform").iziModal('pauseProgress');

    $.post(dle_root + "engine/ajax/controller.php?mod=sentbz" + project_url, {
            ids: id,
            edit: iedit,
        }, function(b) {
            $("#sendform").iziModal('setTitle', '?????????????????? ?????????????? ????????????????????.');
            $("#sendform").iziModal('resumeProgress');
            //$('#sendform').iziModal('setTimeout',3000);

            // $("#sendform").iziModal('startProgress');  
            $("#sendform").iziModal('resetContent');
            // $("#sendform").iziModal('setContent', b);

            //    $('#sendform').iziModal('recalculateLayout');
            //    $('#sendform').iziModal('toggle');


            // $('#sendform').iziModal('stopLoading');
        })
        // $("#sendform").iziModal('startLoading');
}


function ShowNews(ids) {
    var c = document.getElementById("storyid" + ids)
    var b = document.getElementById("imagid" + ids)
    var t = document.getElementById("imagid2" + ids)
    if ($(c).css('display') == 'none' || $(c).css("visibility") == "hidden") {
        $(c).slideToggle(300);
        //$(b).attr('src', 'images/arrow_up.png');
        $(t).css({
            '-webkit-transform': 'rotateX(180deg)'
        });
    } else {
        $(c).slideToggle(300);
        $(t).css({
            '-webkit-transform': 'rotateX(0deg)'
        });
        //$(b).attr('src', 'images/arrow_down.png');
    }

}


function IzimodalClose(modal) {
    $("#" + modal).iziModal('close');

}

function showalert(title, subtitl, id, app) {
    IzimodalClose('modalEdit');
    $('#modalalert').iziModal({
        headerColor: '#006d86c4',
        // width: 600,
        timeout: 3000,
        //  pauseOnHover: true,
        timeoutProgressbar: true,
        onClosing: function() {
            // window.location.reload();
        }
    });
    var emsend = "";
    if (app == 'app') {
        emsend = "<div id='mailadd' align='center' class='boxmail2'><br>?????????????????? ???????????????? ?? ???????????????????? ?????????????<br><br><a href='#' onclick='IzimodalClose(\"modalEdit\");SendMails(" + id + "); return false;'><b>??????????????????</b></a><br>&nbsp;</div>";

        emsend = emsend + "<div id='mailadd2' align='center' class='boxmail2'><br>?????????????????? ???????????????? ?? ???????????????????????????? ?????????????<br><br><a href='#' onclick='IzimodalClose(\"modalEdit\");SendMails(" + id + ",\"edit\",\"mailadd2\"); return false;'><b>??????????????????</b></a></div>";

    }
    emsend = emsend + "&nbsp;<br>&nbsp;<br><div align='center'><a href='#' onclick='IzimodalClose(\"modalalert\"); return false;' class='button21'>??????????????.</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' onclick='IzimodalClose(\"modalalert\"); window.location.reload(); return false;' class='button21'>?????????????? ?? ????????????????.</a></div><br>&nbsp;"

    $("#modalalert").iziModal('setTitle', title);
    $("#modalalert").iziModal('setContent', "<div align='center'>" + subtitl + emsend + "<div>");
    $("#modalalert").iziModal('open');
    $("#modalalert").iziModal('pauseProgress');
}

function formsendsort(sort, desk, obj) {
    var c = document.getElementById("news_set_sort");
    c.dlenewssortby.value = sort;
    c.dledirection.value = desk;

    tempsort = sort;
    tempdir = desk;

    let elements = document.querySelectorAll('ul.sort > li');

    for (let elem of elements) {
        $(elem).removeClass('asc');
        $(elem).removeClass('desc');
    }

    var $ob = $(obj).closest("li");

    if (desk == 'asc') {
        $ob.addClass('desc');
        $(obj).attr('onclick', "formsendsort('" + sort + "','desc',this); return false;");
        // desk='desc'; 
    } else {
        $ob.addClass('asc');
        $(obj).attr('onclick', "formsendsort('" + sort + "','asc',this); return false;");
        //desk='asc';
    }
    var b = '0';
    if ((tagify && tagres(tagify) == "") && (tagify2 && tagres(tagify2) == "") && ($("#story").val() == "")) {
        b = '1';
    }

    $("#indload").show();
    var form = $(c);
    var msg = form.serialize();
    url = window.location.href.replace('#', '');
    if (b == '1')
        $("#searchsuggestions3").fadeOut(400);
    if (b == '0') {
        $("#searchsuggestions3").hide();
    }
    $.ajax({
        type: 'POST',
        url: url + '&content=ok' + project_url, // ???????????????????? ????????????????????'index.php?do=editbz&id=' + ids + "&stroka=ok"
        data: msg,
        success: function(data) {
            // ???????????????????? ?????? ???????????????? ???????????????????? ?????????????? ?? ?? data ?????????? ?????????? ??????????????
            if (b == '0') {
                data = data.replaceAll("storykorotk", "storykorotk2");
                data = data.replaceAll(" kolichestvo", "");
            }

            $("#searchsuggestions3").html(data);
            if (b == '1') {
                $("#searchsuggestions3").fadeIn(400);
                $("#indload").hide();
                proversvitch();
                proverimag();
            }

        },
        error: function() {
            alert('????????????!');
        }
    });
    if (b == '0') {
        dle_do_search(tempkey, tempcat, sort, desk, temptagon, '', tempcomand);
    }
}

function send_form(form_id, ids, viv) {
    //alert ('#'+form_id);
    //$("#modalEdit").iziModal('resetContent');
    $('#modalEdit').iziModal('startLoading');
    var form = $('#' + form_id);
    var msg = form.serialize();
    //alert (msg);
    var vivid = '';
    if (viv == '1')
        vivid = '&vivid=ok';


    $.ajax({
        type: 'POST',
        url: 'index.php?do=editbz&id=' + ids + "&stroka=ok" + vivid + project_url, // ???????????????????? ????????????????????
        data: msg,
        success: function(data) {
            // ???????????????????? ?????? ???????????????? ???????????????????? ?????????????? ?? ?? data ?????????? ?????????? ??????????????
            $("#modalEdit").iziModal({
                fullscreen: true,
                openFullscreen: false
            });

            $('#modalEdit').iziModal('stopLoading');
            $("#modalEdit").iziModal('resetContent');
            $("#modalEdit").iziModal('setContent', data);


            //	alert(data);
        },
        error: function() {
            alert('????????????!');
        }
    });

}


function ShowEdit(Idnews, bur) {
    editbol = true;
    document.body.style.overflow = 'hidden';
    $('#modalEdit').iziModal('startLoading');
    $("#modalEdit").iziModal({
        overlayColor: 'rgba(2,2,2,0.54)',
        radius: 15,
        headerColor: '#006d86c4',
        borderBottom: false,
        focusInput: false,
        closeOnEscape: false,
        loop: true,
        width: '90%',
        height: '90%',
        transitionIn: 'fadeInUp',
        transitionOut: 'fadeOutDown',
        fullscreen: false,
        openFullscreen: true,
        onClosing: function() {
            $("#layer2").attr("id", "layer");
            document.body.style.overflow = 'visible';
            editbol = false;
            if (oks) {
                //window.location.reload();
            }
            //$("#modalEdit"+Idnews).iziModal('destroy');	
        }

    });
    var htm = '';
    //$("#modalEdit" + Idnews).iziModal('startLoading');
    $("#layer").attr("id", "layer2");
    var viv = "";
    if (bur == '1') {
        viv = "&vivid=ok";
    }

    $.post(dle_root + "index.php?do=editbz&id=" + Idnews + "&stroka=ok&cluck=" + Idnews + viv + project_url, {
        idnews: Idnews,
    }, function(b) {
        //  alert(b);
        //$("#modalEdit" + Idnews).iziModal('stopLoading');
        $('#modalEdit').iziModal('stopLoading');
        $("#modalEdit").iziModal('resetContent');
        $("#modalEdit").iziModal('setContent', b);

    })
    $("#modalEdit").iziModal('setTitle', '?????????????????????????? ????????????');
    $("#modalEdit").iziModal('open');

}

function Perenosarhiv(ids, a) {
    // alert(id);
    var b = {};

    b[dle_act_lang[1]] = function() {
        $(this).dialog("close")
    };

    b[dle_act_lang[0]] = function() {
        $(this).dialog("close");
        // alert(dle_root);
        $.post(dle_root + "engine/ajax/controller.php?mod=arhivbz", {
                id: ids,
                arh: a,
            }, function(b) {
                showalert('??????????', b, '', '');
                //$("#modalalert").iziModal('resumeProgress');
            })
            //document.location = dle_root + "index.php?do=deletenews&id=" + a + "&hash=" + dle_login_hash
    };
    var tex = '';
    if (a == '1') {
        tex = '???? ?????????????????????????? ???????????? ?????????????????? ???????????? ?? ???????????';
    } else {
        tex = '???????????????????????? ???????????? ???? ?????????????';
    }
    $("#dlepopup").remove(); // + dle_del_agree
    $("body").append("<div id='dlepopup' class='dle-promt' title='" + dle_confirm + "' style='display:none'><div id='dlepopupmessage'>" + tex + "</div></div>");
    $("#dlepopup").dialog({
        autoOpen: !0,
        width: 500,
        resizable: !1,
        dialogClass: "modalfixed dle-popup-newsdelete",
        buttons: b
    });
    $(".modalfixed.ui-dialog").css({
        position: "fixed"
    });
    $("#dlepopup").dialog("option", "position", {
        my: "center",
        at: "center",
        of: window
    })

}

function ShowModal(Title, URL, ID, Group, Comand, Full) {
    if (!Group) {
        Group = "Group1"
    }
    if (!Full) {
        if (!$.cookie('isFullscreen')) {
            Full = false;
        } else {
            if ($.cookie('isFullscreen') == '0') {
                Full = false;
            } else {
                Full = true;
            }
        }
    } else {
        if (Full = 'true') {
            Full = true
        } else {
            Full = false
        }
    }

    document.body.style.overflow = 'hidden';

    var a = getRandomInt(1, 8);
    if (a == 1) {
        tIn = "comingIn";
        tOut = "comingOut";
    }
    if (a == 2) {
        tIn = "bounceInDown";
        tOut = "bounceOutDown";
    }
    if (a == 3) {
        tIn = "bounceInUp";
        tOut = "bounceOutUp";
    }
    if (a == 4) {
        tIn = "fadeInDown";
        tOut = "fadeOutDown";
    }
    if (a == 5) {
        tIn = "fadeInUp";
        tOut = "fadeOutUp";
    }
    if (a == 6) {
        tIn = "fadeInLeft";
        tOut = "fadeOutLeft";
    }
    if (a == 7) {
        tIn = "fadeInRight";
        tOut = "fadeOutRight";
    }
    if (a == 8) {
        tIn = "flipInX";
        tOut = "flipOutX";
    }
    var first = URL.indexOf("vivid=ok");
    if (first > -1) {
        var str = String(ID) + "viv";
    } else {
        var str = String(ID);
    }
    //event.preventDefault();
    $("#modalID" + str).iziModal({
        iframeURL: URL,
        overlayColor: 'rgba(2,2,2,0.54)',
        radius: 15,
        headerColor: '#006d86c4',
        borderBottom: false,
        group: Group,
        focusInput: false,
        loop: true,
        width: '90%',
        height: '90%',
        closeOnEscape: true,
        transitionIn: tIn,
        transitionOut: tOut,
        fullscreen: true,
        openFullscreen: Full,
        iframe: true,
        iframeWidth: '90%',
        iframeHeight: document.documentElement.clientHeight - 80,
        onClosing: function() {
            document.body.style.overflow = 'visible';
            if (Comand == 'reload') {
                window.location.reload();
            }
        },
        onFullscreen: function() {
            $(document).on('fullscreen', '#modalID' + str, function(e, modal) {
                if (modal.isFullscreen) {
                    $.cookie('isFullscreen', '1', { expires: 14 });
                } else {
                    $.cookie('isFullscreen', '0', { expires: 14 });
                    // Disabled
                }
            });

        }
    });

    $("#modalID" + str).iziModal('setTitle', Title);
    /*$("#modal").iziModal('setSubtitle',"SubTitle : " + Title);*/
    $('#modalID' + str).iziModal('open');

}

function proverimag() {
    $('.highslide').attr('onclick', 'return hs.expand(this);');
    var check = $('#tagscheck').attr('checked');
    if (check != "checked") {
        $(".tagshides").hide();
    } else {
        $(".tagshides").removeClass('hide');
        $(".tagshides").show();
    }
}