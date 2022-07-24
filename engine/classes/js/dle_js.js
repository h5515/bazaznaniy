var c_cache = [],
    dle_poll_voted = [],
    tempkey = '',
    tempcat = '',
    tagcheck = true,
    slovcheck = true,
    tempsor = '',
    tempdir = '',
    temptagon = '',
    tempcomand = '';

function reload() {
    var a = (new Date).getTime();
    document.getElementById("dle-captcha").innerHTML = '<img src="' + dle_root + "engine/modules/antibot/antibot.php?rndval=" + a + '" width="160" height="80" alt="" />'
}

function proversvitch() {
    if (kSwitch.check()) {
        //$("#svitcer").trigger('on.switch');
        // $(".storykorotk").show(); 
        // kSwitch.check(true);

        $(".storykorotk").slideDown(300);

        //	$(".imagc1").attr('src', 'images/arrow_up.png');
        $(".imagc1").css({
            '-webkit-transform': 'rotateX(180deg)'
        });
        $.cookie('switch', '1', { expires: 366 });
    } else {
        // kSwitch.check(false);
        $(".storykorotk").slideUp(300);
    }
}

function dle_change_sort(a, b) {
    var c = document.getElementById("news_set_sort");
    c.dlenewssortby.value = a;
    c.dledirection.value = b;
    c.submit();
    return !1
}

function doPoll(a, b) {
    var c = document.getElementById("dlepollform_" + b),
        d = c.status.value,
        e = "";
    if (1 != dle_poll_voted[b]) {
        if ("results" != a && 1 != d) {
            for (var f = 0; f < c.elements.length; f++) {
                var g = c.elements[f];
                if ("radio" == g.type && 1 == g.checked) {
                    e = g.value;
                    break
                }
                "checkbox" == g.type && 1 == g.checked && (e = e + g.value + " ")
            }
            if ("vote" == a && "" == e) return;
            dle_poll_voted[b] = 1
        } else d = 1, c.status.value = 1;
        1 == d && "vote" == a && (d = 0, c.status.value = 0, a = "list");
        ShowLoading("");
        $.post(dle_root + "engine/ajax/controller.php?mod=poll", {
            news_id: b,
            action: a,
            answer: e,
            dle_skin: dle_skin,
            user_hash: dle_login_hash
        }, function(h) {
            HideLoading("");
            $("#dle-poll-list-" + b).fadeOut(500, function() {
                $(this).html(h);
                $(this).fadeIn(500)
            })
        })
    }
}

function IPMenu(a, b, c, d) {
    var e = [];
    e[0] = '<a href="https://www.nic.ru/whois/?searchWord=' + a + '" target="_blank">' + b + "</a>";
    e[1] = '<a href="' + dle_root + dle_admin + "?mod=iptools&ip=" + a + '" target="_blank">' + c + "</a>";
    e[2] = '<a href="' + dle_root + dle_admin + "?mod=blockip&ip=" + a + '" target="_blank">' + d + "</a>";
    return e
}

function ajax_save_for_edit(a, b) {
    var c = {};
    "2" == quick_wysiwyg && tinyMCE.triggerSave();
    $.each($("#ajaxnews" + a).serializeArray(), function(d, e) {
        c[e.name] = e.value
    });
    c.id = a;
    c.field = b;
    c.action = "save";
    c.user_hash = dle_login_hash;
    ShowLoading("");
    $.post(dle_root + "engine/ajax/controller.php?mod=editnews", c, function(d) {
        HideLoading("");
        "ok" != d ? DLEalert(d, dle_info) : ($("#dlepopup-news-edit").dialog("close"), DLEconfirm(dle_save_ok, dle_confirm, function() {
            location.reload(!0)
        }))
    });
    return !1
}


function ajax_prep_for_edit(a, b) {
    for (var c = 0, d = c_cache.length; c < d; c++) c in c_cache && (c_cache[c] || "" != c_cache[c]) && ajax_cancel_comm_edit(c);
    ShowLoading("");
    $.get(dle_root + "engine/ajax/controller.php?mod=editnews", {
        id: a,
        field: b,
        action: "edit"
    }, function(e) {
        HideLoading("");
        var f = "none";
        $("#modal-overlay").remove();
        $("body").prepend('<div id="modal-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #666666; opacity: .40;filter:Alpha(Opacity=40); z-index: 999; display:none;"></div>');
        $("#modal-overlay").css({
            filter: "alpha(opacity=40)"
        }).fadeIn();
        var g = {};
        g[dle_act_lang[3]] = function() {
            $(this).dialog("close")
        };
        g[dle_act_lang[4]] = function() {
            ajax_save_for_edit(a, b)
        };
        $("#dlepopup-news-edit").remove();
        $("body").prepend("<div id='dlepopup-news-edit' class='dlepopupnewsedit' title='" + menu_short + "' style='display:none'></div>");
        $(".dlepopupnewsedit").html("");
        var h = .9 * $(window).height(),
            k = .9 * $(window).width();
        1024 < k && (k = 1024);
        $("#dlepopup-news-edit").dialog({
            autoOpen: !0,
            width: k,
            height: h,
            buttons: g,
            resizable: !1,
            dialogClass: "modalfixed dle-popup-quickedit",
            dragStart: function(l, m) {
                f = $(".modalfixed").css("box-shadow");
                $(".modalfixed").css("box-shadow", "none")
            },
            dragStop: function(l, m) {
                $(".modalfixed").css("box-shadow", f)
            },
            close: function(l, m) {
                $(this).dialog("destroy");
                $("#modal-overlay").fadeOut(function() {
                    $("#modal-overlay").remove()
                })
            }
        });
        830 < $(window).width() && 530 < $(window).height() && ($(".modalfixed.ui-dialog").css({
            position: "fixed"
        }), $("#dlepopup-news-edit").dialog("option", "position", {
            my: "center",
            at: "center",
            of: window
        }));
        $("#dlepopup-news-edit").css({
            overflow: "auto"
        });
        $("#dlepopup-news-edit").css({
            "overflow-x": "hidden"
        });
        $("#dlepopup-news-edit").html(e)
    }, "html");
    return !1
}

function ajax_comm_edit(a, b) {
    for (var c = 0, d = c_cache.length; c < d; c++) c in c_cache && "" != c_cache[c] && ajax_cancel_comm_edit(c);
    c_cache[a] && "" != c_cache[a] || (c_cache[a] = $("#comm-id-" + a).html());
    ShowLoading("");
    $.get(dle_root + "engine/ajax/controller.php?mod=editcomments", {
        id: a,
        area: b,
        action: "edit"
    }, function(e) {
        HideLoading("");
        $("#comm-id-" + a).html(e);
        setTimeout(function() {
            $("html,body").stop().animate({
                scrollTop: $("#comm-id-" + a).offset().top - 100
            }, 700)
        }, 100)
    }, "html");
    return !1
}

function ajax_cancel_comm_edit(a) {
    "" != c_cache[a] && $("#comm-id-" + a).html(c_cache[a]);
    c_cache[a] = "";
    return !1
}

function ajax_save_comm_edit(a, b) {
    "2" == dle_wysiwyg && tinyMCE.triggerSave();
    var c = $("#dleeditcomments" + a).val();
    ShowLoading("");
    $.post(dle_root + "engine/ajax/controller.php?mod=editcomments", {
        id: a,
        comm_txt: c,
        area: b,
        action: "save",
        user_hash: dle_login_hash
    }, function(d) {
        HideLoading("");
        c_cache[a] = "";
        $("#comm-id-" + a).html(d)
    });
    return !1
}

function DeleteComments(a, b) {
    DLEconfirm(dle_del_agree, dle_confirm, function() {
        ShowLoading("");
        $.get(dle_root + "engine/ajax/controller.php?mod=deletecomments", {
            id: a,
            dle_allow_hash: b
        }, function(c) {
            HideLoading("");
            c = parseInt(c);
            if (!isNaN(c)) {
                var d = null;
                d = "1" == dle_tree_comm ? $("#comments-tree-item-" + c) : $("#comment-id-" + c);
                $("html,body").stop().animate({
                    scrollTop: d.offset().top - 70
                }, 700);
                setTimeout(function() {
                    d.hide("blind", {}, 1400)
                }, 700)
            }
        })
    })
}

function MarkSpam(a, b) {
    DLEconfirm(dle_spam_agree, dle_confirm, function() {
        ShowLoading("");
        $.get(dle_root + "engine/ajax/controller.php?mod=adminfunction", {
            id: a,
            action: "commentsspam",
            user_hash: b
        }, function(c) {
            HideLoading("");
            "error" != c && DLEconfirm(c, dle_confirm, function() {
                location.reload(!0)
            })
        })
    })
}

function doFavorites(a, b, c) {
    ShowLoading("");
    $.get(dle_root + "engine/ajax/controller.php?mod=favorites" + project_url, {
        fav_id: a,
        action: b,
        skin: dle_skin,
        alert: c,
        user_hash: dle_login_hash
    }, function(d) {
        HideLoading("");
        /* DLEalert('Добавлено в закладки', dle_info)*/
        $("#favid" + a).html(d);
        var int = Number.parseInt($("#favorit").text());
        if (d.includes('#icon-star')) {
            $("#fav-id-" + a).attr('onclick', "doFavorites('" + a + "', 'minus', 1); return false;");
            int++;
            $("#favorit").text(int);
        } else {
            $("#fav-id-" + a).attr('onclick', "doFavorites('" + a + "', 'plus', 1); return false;");
            int--;
            $("#favorit").text(int);
        }
    });
    return !1
}

function CheckLogin() {
    var a = document.getElementById("name").value;
    ShowLoading("");
    $.post(dle_root + "engine/ajax/controller.php?mod=registration", {
        name: a,
        user_hash: dle_login_hash
    }, function(b) {
        HideLoading("");
        $("#result-registration").html(b)
    });
    return !1
}

function doCalendar(a, b, c) {
    ShowLoading("");
    $.get(dle_root + "engine/ajax/controller.php?mod=calendar", {
        month: a,
        year: b,
        category: tempcat
    }, function(d) {
        HideLoading("");
        "left" == c ? $("#calendar-layer").hide("slide", {
            direction: "left"
        }, 500, function() {
            $("#calendar-layer").html(d).show("slide", {
                direction: "right"
            }, 500)
        }) : $("#calendar-layer").hide("slide", {
            direction: "right"
        }, 500, function() {
            $("#calendar-layer").html(d).show("slide", {
                direction: "left"
            }, 500)
        })
    })
}

function doRate(a, b) {
    ShowLoading("");
    $.get(dle_root + "engine/ajax/controller.php?mod=rating", {
        go_rate: a,
        news_id: b,
        skin: dle_skin,
        user_hash: dle_login_hash
    }, function(c) {
        HideLoading("");
        if (c.success) {
            var d = c.rating;
            d = d.replace(/&lt;/g, "<");
            d = d.replace(/&gt;/g, ">");
            d = d.replace(/&amp;/g, "&");
            $("#ratig-layer-" + b).html(d);
            $("#vote-num-id-" + b).html(c.votenum);
            $("#likes-id-" + b).html(c.likes);
            $("#dislikes-id-" + b).html(c.dislikes)
        } else c.error && DLEalert(c.errorinfo, dle_info)
    }, "json")
}

function doCommentsRate(a, b) {
    ShowLoading("");
    $.get(dle_root + "engine/ajax/controller.php?mod=ratingcomments", {
        go_rate: a,
        c_id: b,
        skin: dle_skin,
        user_hash: dle_login_hash
    }, function(c) {
        HideLoading("");
        if (c.success) {
            var d = c.rating;
            d = d.replace(/&lt;/g, "<");
            d = d.replace(/&gt;/g, ">");
            d = d.replace(/&amp;/g, "&");
            $("#comments-ratig-layer-" + b).html(d);
            $("#comments-vote-num-id-" + b).html(c.votenum);
            $("#comments-likes-id-" + b).html(c.likes);
            $("#comments-dislikes-id-" + b).html(c.dislikes)
        } else c.error && DLEalert(c.errorinfo, dle_info)
    }, "json")
}

function ajax_cancel_reply() {
    $("#dlefastreplycomments").hide("blind", {}, 1400)
}

function ajax_fast_reply(a, b) {
    var c = $("#comments" + a).val(),
        d = $("#name" + a).val(),
        e = $("#question_answer" + a).val(),
        f = $("#sec_code" + a).val(),
        g = $("#subscribe" + a + ":checked").val(),
        h = $("#postid" + a).val(),
        k = "";
    if ("" == d || "" == c) return DLEalert(dle_req_field, dle_info), !1;
    "1" == dle_captcha_type ? "undefined" != typeof grecaptcha && (k = grecaptcha.getResponse(recaptcha_widget)) : "2" == dle_captcha_type && (k = $("#comments-recaptcha-response" + a).val());
    g || (g = 0);
    f || (f = "");
    e || (e = "");
    ShowLoading("");
    $.post(dle_root + "engine/ajax/controller.php?mod=addcomments", {
        post_id: h,
        parent: a,
        indent: b,
        comments: c,
        name: d,
        mail: "",
        editor_mode: "",
        skin: dle_skin,
        sec_code: f,
        question_answer: e,
        g_recaptcha_response: k,
        allow_subscribe: g,
        user_hash: dle_login_hash
    }, function(l) {
        HideLoading("");
        $("#blind-animation" + a).remove();
        $("#dlefastreplyesponse").html(l);
        "error" != l && document.getElementById("blind-animation" + a) && ($("html,body").stop().animate({
            scrollTop: $("#dlefastreplyesponse").offset().top - 100
        }, 600), setTimeout(function() {
            $("#blind-animation" + a).show("blind", {}, 700);
            $("#dlefastreplycomments").hide("blind", {}, 700)
        }, 600))
    }, "html");
    return !1
}

function DLESendPM(a) {
    var b = {};
    $("#dlesendpmpopup").remove();
    $("#dleprofilepopup").remove();
    b[dle_act_lang[3]] = function() {
        $(this).dialog("close")
    };
    b[dle_p_send] = function() {
        "2" == dle_wysiwyg && tinyMCE.triggerSave();
        var c = $("#pm_subj").val(),
            d = $("#pm_text").val(),
            e = $("#pm_name").val(),
            f = $("#pm_question_answer").val(),
            g = $("#sec_code_pm").val(),
            h = $("#outboxcopy:checked").val(),
            k = "";
        if ("" == e || "" == d || "" == c) return DLEalert(dle_req_field, dle_info), !1;
        "1" == dle_captcha_type ? "undefined" != typeof grecaptcha && (k = grecaptcha.getResponse(recaptcha_widget)) : "2" == dle_captcha_type && (k = $("#pm-recaptcha-response").val());
        h || (h = 0);
        g || (g = "");
        f || (f = "");
        ShowLoading("");
        $.post(dle_root + "engine/ajax/controller.php?mod=pm", {
            action: "send_pm",
            subj: c,
            comments: d,
            name: e,
            skin: dle_skin,
            sec_code: g,
            question_answer: f,
            g_recaptcha_response: k,
            outboxcopy: h,
            user_hash: dle_login_hash
        }, function(l) {
            HideLoading("");
            if (l.success) $("#dlesendpmpopup").remove(), DLEalert(l.success, dle_info);
            else if (l.error) {
                if ("2" == dle_captcha_type && "undefined" != typeof grecaptcha) {
                    var m = $("#pm-recaptcha-response").data("key");
                    grecaptcha.execute(m, {
                        action: "pm"
                    }).then(function(p) {
                        $("#pm-recaptcha-response").val(p)
                    })
                }
                DLEalert(l.error, dle_info)
            }
        }, "json");
        return !1
    };
    ShowLoading("");
    $.get(dle_root + "engine/ajax/controller.php?mod=pm", {
        name: a,
        action: "show_send",
        skin: dle_skin,
        user_hash: dle_login_hash
    }, function(c) {
        HideLoading("");
        $("body").append(c);
        $("#dlesendpmpopup").dialog({
            autoOpen: !0,
            width: 800,
            resizable: !1,
            dialogClass: "modalfixed dle-popup-sendpm",
            buttons: b
        });
        $(".modalfixed.ui-dialog").css({
            position: "fixed"
        });
        $("#dlesendpmpopup").dialog("option", "position", {
            my: "center",
            at: "center",
            of: window
        })
    }, "html");
    return !1
}

function dle_reply(a, b, c) {
    var d = {},
        e = "";
    $("#dlereplypopup").remove();
    "1" == c && ($("#dlefastreplycomments").remove(), $("#dlefastreplyesponse").remove());
    d[dle_act_lang[3]] = function() {
        $(this).dialog("close")
    };
    d[dle_p_send] = function() {
        if ("1" == dle_wysiwyg || "2" == dle_wysiwyg) "2" == dle_wysiwyg && tinyMCE.triggerSave(), e = "wysiwyg";
        var f = $("#comments" + a).val(),
            g = $("#name" + a).val(),
            h = $("#mail" + a).val(),
            k = $("#question_answer" + a).val(),
            l = $("#sec_code" + a).val(),
            m = $("#subscribe" + a + ":checked").val(),
            p = $("#postid" + a).val(),
            q = "";
        if ("" == g || "" == f) return DLEalert(dle_req_field, dle_info), !1;
        "1" == dle_captcha_type ? "undefined" != typeof grecaptcha && (q = grecaptcha.getResponse(recaptcha_widget)) : "2" == dle_captcha_type && (q = $("#comments-recaptcha-response" + a).val());
        m || (m = 0);
        l || (l = "");
        k || (k = "");
        ShowLoading("");
        $.post(dle_root + "engine/ajax/controller.php?mod=addcomments", {
                post_id: p,
                parent: a,
                indent: b,
                comments: f,
                name: g,
                mail: h,
                editor_mode: e,
                skin: dle_skin,
                sec_code: l,
                question_answer: k,
                g_recaptcha_response: q,
                allow_subscribe: m,
                user_hash: dle_login_hash
            },
            function(n) {
                HideLoading("");
                $("#blind-animation" + a).remove();
                $("#comments-tree-item-" + a).length ? ($("#comments-tree-item-" + a).append(n), "error" != n && document.getElementById("blind-animation" + a) && ($("#dlereplypopup").remove(), $("html,body").stop().animate({
                    scrollTop: $("#comments-tree-item-" + a).offset().top + $("#comments-tree-item-" + a).height() - 100
                }, 600), setTimeout(function() {
                    $("#blind-animation" + a).show("blind", {}, 700)
                }, 600))) : $("#comment-id-" + a).length && ($("#comment-id-" + a).append(n), "error" != n && document.getElementById("blind-animation" + a) && ($("#dlereplypopup").remove(), $("html,body").stop().animate({
                    scrollTop: $("#comment-id-" + a).offset().top + $("#comment-id-" + a).height() - 100
                }, 600), setTimeout(function() {
                    $("#blind-animation" + a).show("blind", {}, 700)
                }, 600)))
            }, "html");
        return !1
    };
    ShowLoading("");
    $.get(dle_root + "engine/ajax/controller.php?mod=replycomments", {
        id: a,
        indent: b,
        skin: dle_skin,
        user_hash: dle_login_hash
    }, function(f) {
        HideLoading("");
        "1" == c ? ($("#comment-id-" + a).append("<div id='dlefastreplyesponse'></div><div id='dlefastreplycomments' style='display:none'></div>"), $("#dlefastreplycomments").html(f), $("html,body").stop().animate({
            scrollTop: $("#comment-id-" + a).offset().top + $("#comment-id-" + a).height() - 100
        }, 600), setTimeout(function() {
            $("#dlefastreplycomments").show("blind", {}, 700)
        }, 600)) : ($("body").append("<div id='dlereplypopup' title='" + dle_reply_title + "' style='display:none'></div>"), $("#dlereplypopup").html(f), $("#dlereplypopup").dialog({
            autoOpen: !0,
            width: 800,
            resizable: !1,
            dialogClass: "modalfixed dle-popup-replycomments",
            buttons: d
        }), $(".modalfixed.ui-dialog").css({
            position: "fixed",
        }), $("#dlereplypopup").dialog("option", "position", {
            my: "center",
            at: "center",
            of: window
        }))
        $('.ui-dialog').css('max-height', '');
        $('#dlereplypopup').css('height', '250px');
    }, "html");
    return !1
}

function doAddComments() {
    var a = document.getElementById("dle-comments-form"),
        b = "",
        c = "",
        d = "",
        e = "",
        f = "0",
        g = "";
    if ("1" == dle_wysiwyg || "2" == dle_wysiwyg) "2" == dle_wysiwyg && tinyMCE.triggerSave(), b = "wysiwyg";
    if ("" == a.comments.value || "" == a.name.value) return DLEalert(dle_req_field, dle_info), !1;
    a.question_answer && (c = a.question_answer.value);
    a.sec_code && (d = a.sec_code.value);
    "1" == dle_captcha_type ? "undefined" != typeof grecaptcha && (e = grecaptcha.getResponse()) : "2" == dle_captcha_type && (e = $("#g-recaptcha-response").val());
    a.allow_subscribe && 1 == a.allow_subscribe.checked && (f = "1");
    a.mail && (g = a.mail.value);
    ShowLoading("");
    $("#addcomment .box_in").slideUp(100);
    $("#otmencomment").hide();
    $("#btaddcomment").show();
    $.post(dle_root + "engine/ajax/controller.php?mod=addcomments", {
        post_id: a.post_id.value,
        comments: a.comments.value,
        name: a.name.value,
        mail: g,
        editor_mode: b,
        skin: dle_skin,
        sec_code: d,
        question_answer: c,
        g_recaptcha_response: e,
        allow_subscribe: f,
        user_hash: dle_login_hash
    }, function(h) {
        $('.comments .box:last').css('display', '');
        HideLoading("");
        $("#dle-ajax-comments").html(h);
        "error" != h && document.getElementById("blind-animation") && ($("html,body").stop().animate({
            scrollTop: $("#dle-ajax-comments").offset().top - 100
        }, 600), setTimeout(function() {
            $("#blind-animation").show("blind", {}, 700)
        }, 600), a.sec_code && (a.sec_code.value = "", reload()), "1" == dle_captcha_type ? "undefined" != typeof grecaptcha && grecaptcha.reset() : "2" == dle_captcha_type && "undefined" != typeof grecaptcha && (h = $("#g-recaptcha-response").data("key"), grecaptcha.execute(h, {
            action: "comments"
        }).then(function(k) {
            $("#g-recaptcha-response").val(k)
        })))
    }, "html");
    return !1
}

function isHistoryApiAvailable() {
    return !(!window.history || !history.pushState)
}

function CommentsPage(a, b, c) {
    ShowLoading("");
    $.get(dle_root + "engine/ajax/controller.php?mod=comments", {
        cstart: a,
        news_id: b,
        skin: dle_skin
    }, function(d) {
        HideLoading("");
        isNaN(a) || isNaN(b) || ($("#dle-comm-link").off("click"), $("#dle-comm-link").on("click", function() {
            CommentsPage(a, b);
            return !1
        }));
        scroll(0, $("#dle-comments-list").offset().top - 100);
        $("#dle-comments-list").html(d.comments);
        $(".dle-comments-navigation").html(d.navigation);
        isHistoryApiAvailable() && window.history.pushState(null, null, c)
    }, "json");
    return !1
}

function dle_copy_quote(a) {
    dle_txt = "";
    window.getSelection ? dle_txt = window.getSelection() : document.selection && (dle_txt = document.selection.createRange().text);
    "" != dle_txt && (dle_txt = "[quote=" + a + "]" + dle_txt + "[/quote]")
}

function dle_fastreply(a) {
    if (!document.getElementById("dle-comments-form")) return !1;
    var b = document.getElementById("dle-comments-form").comments,
        c = "";
    "0" == dle_wysiwyg || "-1" == dle_wysiwyg ? (b.value = "0" == dle_wysiwyg ? b.value + ("[b]" + a + "[/b],\n") : b.value + (a + ",\n"), b.focus()) : (c = "<b>" + a + "</b>,<br />", "1" == dle_wysiwyg ? ($("#comments").froalaEditor("events.focus"), $("#comments").froalaEditor("html.insert", c, !0)) : tinyMCE.execCommand("mceInsertContent", !1, c));
    setTimeout(function() {
        $("html,body").stop().animate({
            scrollTop: $("#dle-comments-form").offset().top - 100
        }, 700)
    }, 100);
    return !1
}

function dle_ins(a) {
    if (!document.getElementById("dle-comments-form")) return !1;
    var b = document.getElementById("dle-comments-form").comments,
        c = "";
    "" != dle_txt ? ("0" == dle_wysiwyg || "-1" == dle_wysiwyg ? (b.value += dle_txt + "\n", b.focus()) : (c = dle_txt + "<br />", "1" == dle_wysiwyg ? ($("#comments").froalaEditor("events.focus"), $("#comments").froalaEditor("html.insert", c, !0)) : tinyMCE.execCommand("mceInsertContent", !1, c)), setTimeout(function() {
        $("html,body").stop().animate({
            scrollTop: $("#dle-comments-form").offset().top - 100
        }, 700)
    }, 100)) : (ShowLoading(""), $.get(dle_root + "engine/ajax/controller.php?mod=quote", {
        id: a,
        user_hash: dle_login_hash
    }, function(d) {
        HideLoading("");
        d = d.replace(/&lt;/g, "<");
        d = d.replace(/&gt;/g, ">");
        d = d.replace(/&amp;/g, "&");
        d = d.replace(/&quot;/g, '"');
        d = d.replace(/&#039;/g, "'");
        d = d.replace(/&#039;/g, "'");
        d = d.replace(/&#34;/g, '"');
        "0" == dle_wysiwyg || "-1" == dle_wysiwyg ? (b.value += d + "\n", b.focus()) : (c = d + "<br />", "1" == dle_wysiwyg ? ($("#comments").froalaEditor("events.focus"), $("#comments").froalaEditor("html.insert", c, !0)) : tinyMCE.execCommand("mceInsertContent", !1, c));
        setTimeout(function() {
            $("html,body").stop().animate({
                scrollTop: $("#dle-comments-form").offset().top - 100
            }, 700)
        }, 100)
    }));
    return !1
}

function ShowOrHide(a) {
    var b = $("#" + a),
        c = null;
    document.getElementById("image-" + a) && (c = document.getElementById("image-" + a));
    a = b.height() / 200 * 1E3;
    3E3 < a && (a = 3E3);
    250 > a && (a = 250);
    "none" == b.css("display") ? (b.show("blind", {}, a), c && (c.src = dle_root + "templates/" + dle_skin + "/dleimages/spoiler-minus.gif")) : (2E3 < a && (a = 2E3), b.hide("blind", {}, a), c && (c.src = dle_root + "templates/" + dle_skin + "/dleimages/spoiler-plus.gif"))
}

function ckeck_uncheck_all() {
    for (var a = document.pmlist, b = 0; b < a.elements.length; b++) {
        var c = a.elements[b];
        "checkbox" == c.type && (c.checked = 1 == a.master_box.checked ? !1 : !0)
    }
    a.master_box.checked = 1 == a.master_box.checked ? !1 : !0
}

function confirmDelete(a) {
    DLEconfirm(dle_del_agree, dle_confirm, function() {
        document.location = a
    })
}

function setNewField(a, b) {
    a != selField && (fombj = b, selField = a)
}

function dle_news_delete(a, vivid) {
    var b = {};
    b[dle_act_lang[1]] = function() {
        $(this).dialog("close")
    };
    allow_dle_delete_news && (b[dle_del_msg] = function() {
        $(this).dialog("close");
        var c = {};
        c[dle_act_lang[3]] = function() {
            $(this).dialog("close")
        };
        c[dle_p_send] = function() {
            if (1 > $("#dle-promt-text").val().length) $("#dle-promt-text").addClass("ui-state-error");
            else {
                var d = $("#dle-promt-text").val();
                $(this).dialog("close");
                $("#dlepopup").remove();
                $.post(dle_root + "engine/ajax/controller.php?mod=message", {
                    id: a,
                    user_hash: dle_login_hash,
                    text: d
                }, function(e) {
                    var viv = "";
                    if (vivid && vivid == '1') {
                        viv = "&vivid=ok";
                    }

                    "ok" == e ? document.location = dle_root + "index.php?do=deletenews&id=" + a + "&hash=" + dle_login_hash : DLEalert("Send Error", dle_info) + viv + project_url;
                })
            }
        };
        $("#dlepopup").remove();
        $("body").append("<div id='dlepopup' class='dle-promt' title='" + dle_notice + "' style='display:none'>" + dle_p_text + "<br /><br /><textarea name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:97%;height:100px;'></textarea></div>");
        $("#dlepopup").dialog({
            autoOpen: !0,
            width: 500,
            resizable: !1,
            dialogClass: "modalfixed dle-popup-newsdelete",
            buttons: c
        });
        $(".modalfixed.ui-dialog").css({
            position: "fixed"
        });
        $("#dlepopup").dialog("option", "position", {
            my: "center",
            at: "center",
            of: window
        })
    });
    var viv = '';
    if (vivid && vivid == '1') viv = '&vivid=ok';
    b[dle_act_lang[0]] = function() {
        $(this).dialog("close");
        document.location = dle_root + "index.php?do=deletenews&id=" + a + "&hash=" + dle_login_hash + viv + project_url;
    };
    $("#dlepopup").remove();
    $("body").append("<div id='dlepopup' class='dle-promt' title='" + dle_confirm + "' style='display:none'><div id='dlepopupmessage'>" + dle_del_agree + "</div></div>");
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
//c[0] = "<a onclick=\"ShowEdit('"+a+"'); return false;\" href=\"#\">" + menu_short + "</a>";
//c[0] = "<a onclick=\"ajax_prep_for_edit('" + a + "', '" + b + '\'); return false;" href="#">' + menu_short + "</a>";
function MenuNewsBuild(a, b, arch, approve, vivid) {
    var c = [];
    var trun = '';
    if (vivid && vivid == 1)
        trun = ",'1'";

    c[0] = "<a onclick=\"ShowEdit('" + a + "'" + trun + "); return false;\" href=\"#\">Редактировать</a>"; //sendNotice (
    // "" != dle_admin && !vivid && (c[1] = '<a href="' + dle_root + dle_admin + "?mod=editnews&action=editnews&id=" + a + '" target="_blank">' + menu_full + "</a>");
    allow_dle_delete_news && arch == '0' && approve == '1' && (c[2] = "<a onclick=\"Perenosarhiv ('" + a + '\',\'1\'); return false;" href="#">Перенести в Архив' + "</a>", c[3] = "<a onclick=\"dle_news_delete ('" + a + '\'); return false;" href="#">' + dle_del_news + "</a>");
    allow_dle_delete_news && arch == "1" && approve == '1' && (c[2] = "<a onclick=\"Perenosarhiv ('" + a + '\',\'0\'); return false;" href="#">Восстановить из Архив' + "</a>", c[3] = "<a onclick=\"dle_news_delete ('" + a + '\'); return false;" href="#">' + dle_del_news + "</a>");
    approve == 0 && (c[2] = "<a onclick=\"dle_news_delete ('" + a + '\'' + trun + ' ); return false;" href="#">' + dle_del_news + "</a>");
    return c
}

function sendNotice(a) {
    var b = {};
    b[dle_act_lang[3]] = function() {
        $(this).dialog("close")
    };
    b[dle_p_send] = function() {
        if (1 > $("#dle-promt-text").val().length) $("#dle-promt-text").addClass("ui-state-error");
        else {
            var c = $("#dle-promt-text").val();
            $(this).dialog("close");
            $("#dlepopup").remove();
            $.post(dle_root + "engine/ajax/controller.php?mod=message", {
                id: a,
                user_hash: dle_login_hash,
                text: c,
                allowdelete: "no"
            }, function(d) {
                "ok" == d && DLEalert(dle_p_send_ok, dle_info)
            })
        }
    };
    $("#dlepopup").remove();
    $("body").append("<div id='dlepopup' title='" + dle_notice + "' style='display:none'>" + dle_p_text + "<br /><br /><textarea name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:97%;height:100px;'></textarea></div>");
    $("#dlepopup").dialog({
        autoOpen: !0,
        width: 500,
        resizable: !1,
        dialogClass: "modalfixed dle-popup-sendmessage",
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

function AddComplaint(a, b) {
    var c = {},
        d = "";
    c[dle_act_lang[3]] = function() {
        $(this).dialog("close")
    };
    c[dle_p_send] = function() {
        if (1 > $("#dle-promt-text").val().length) $("#dle-promt-text").addClass("ui-state-error");
        else {
            var e = $("#dle-promt-text").val(),
                f = "";
            $("#dle-promt-mail").val() && (f = $("#dle-promt-mail").val());
            $(this).dialog("close");
            $("#dlepopup").remove();
            $.post(dle_root + "engine/ajax/controller.php?mod=complaint", {
                id: a,
                text: e,
                action: b,
                mail: f,
                user_hash: dle_login_hash
            }, function(g) {
                "ok" == g ? DLEalert(dle_p_send_ok, dle_info) : DLEalert(g, dle_info)
            })
        }
    };
    $("#dlepopup").remove();
    5 == dle_group && (d = dle_mail + '<br><input type="text" name="dle-promt-mail" id="dle-promt-mail" class="ui-widget-content ui-corner-all" style="width:100%;" value="">');
    $("body").append("<div id='dlepopup' title='" + dle_c_title + "' style='display:none'>" + dle_complaint + "<br><textarea name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:100%;height:100px;'></textarea>" + d + "</div>");
    $("#dlepopup").dialog({
        autoOpen: !0,
        width: 600,
        resizable: !1,
        dialogClass: "modalfixed dle-popup-complaint",
        buttons: c
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

function DLEalert(a, b) {
    $("#dlepopup").remove();
    $("body").append("<div id='dlepopup' class='dle-alert' title='" + b + "' style='display:none'>" + a + "</div>");
    $("#dlepopup").dialog({
        autoOpen: !0,
        width: 470,
        resizable: !1,
        dialogClass: "modalfixed dle-popup-alert",
        buttons: {
            Ok: function() {
                $(this).dialog("close");
                $("#dlepopup").remove()
            }
        }
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

function DLEconfirm(a, b, c) {
    var d = {};
    d[dle_act_lang[1]] = function() {
        $(this).dialog("close");
        $("#dlepopup").remove()
    };
    d[dle_act_lang[0]] = function() {
        $(this).dialog("close");
        $("#dlepopup").remove();
        c && c()
    };
    $("#dlepopup").remove();
    $("body").append("<div id='dlepopup' class='dle-confirm' title='" + b + "' style='display:none'>" + a + "</div>");
    $("#dlepopup").dialog({
        autoOpen: !0,
        width: 500,
        resizable: !1,
        dialogClass: "modalfixed dle-popup-confirm",
        buttons: d
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

function DLEprompt(a, b, c, d, e) {
    var f = {};
    f[dle_act_lang[3]] = function() {
        $(this).dialog("close")
    };
    f[dle_act_lang[2]] = function() {
        if (!e && 1 > $("#dle-promt-text").val().length) $("#dle-promt-text").addClass("ui-state-error");
        else {
            var g = $("#dle-promt-text").val();
            $(this).dialog("close");
            $("#dlepopup").remove();
            d && d(g)
        }
    };
    $("#dlepopup").remove();
    $("body").append("<div id='dlepopup' class='dle-promt' title='" + c + "' style='display:none'>" + a + "<br /><br /><input type='text' name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:97%;' value='" + b + "'/></div>");
    $("#dlepopup").dialog({
        autoOpen: !0,
        width: 500,
        resizable: !1,
        dialogClass: "modalfixed dle-popup-promt",
        buttons: f
    });
    $(".modalfixed.ui-dialog").css({
        position: "fixed"
    });
    $("#dlepopup").dialog("option", "position", {
        my: "center",
        at: "center",
        of: window
    });
    0 < b.length ? $("#dle-promt-text").select().focus() : $("#dle-promt-text").focus()
}
var dle_user_profile = "",
    dle_user_profile_link = "";

function ShowPopupProfile(a, b) {
    var c = {};
    c[menu_profile] = function() {
        document.location = dle_user_profile_link
    };
    5 != dle_group && (c[menu_send] = function() {
        DLESendPM(dle_user_profile)
    });
    1 == b && (c[menu_uedit] = function() {
        $(this).dialog("close");
        var d = {};
        $("body").append('<div id="modal-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #666666; opacity: .40;filter:Alpha(Opacity=40); z-index: 999; display:none;"></div>');
        $("#modal-overlay").css({
            filter: "alpha(opacity=40)"
        }).fadeIn("slow");
        $("#dleuserpopup").remove();
        $("body").append("<div id='dleuserpopup' title='" + menu_uedit + "' style='display:none'></div>");
        d[dle_act_lang[3]] = function() {
            $(this).dialog("close");
            $("#dleuserpopup").remove()
        };
        d[dle_act_lang[5]] = function() {
            window.frames.edituserframe.confirmDelete(dle_login_hash)
        };
        d[dle_act_lang[4]] = function() {
            document.getElementById("edituserframe").contentWindow.document.getElementById("saveuserform").submit()
        };
        $("#dleuserpopup").dialog({
            autoOpen: !0,
            width: 700,
            resizable: !1,
            dialogClass: "modalfixed dle-popup-userprofileadmin",
            buttons: d,
            open: function(e, f) {
                $("#dleuserpopup").html("<iframe name='edituserframe' id='edituserframe' width='100%' height='400' src='" + dle_root + dle_admin + "?mod=editusers&action=edituser&user=" + dle_user_profile + "&skin=" + dle_skin + "' frameborder='0' marginwidth='0' marginheight='0' allowtransparency='true'></iframe>")
            },
            beforeClose: function(e, f) {
                $("#dleuserpopup").html("")
            },
            close: function(e, f) {
                $("#modal-overlay").fadeOut("slow", function() {
                    $("#modal-overlay").remove()
                })
            }
        });
        830 < $(window).width() && 530 < $(window).height() && ($(".modalfixed.ui-dialog").css({
            position: "fixed"
        }), $("#dleuserpopup").dialog("option", "position", {
            my: "center",
            at: "center",
            of: window
        }));
        return !1
    });
    $("#dleprofilepopup").remove();
    $("body").append(a);
    $("#dleprofilepopup").dialog({
        autoOpen: !0,
        resizable: !1,
        dialogClass: "dle-popup-userprofile",
        buttons: c,
        width: 550
    });
    return !1
}

function ShowProfile(a, b, c) {
    if (dle_user_profile == a && document.getElementById("dleprofilepopup")) return $("#dleprofilepopup").dialog("open"), !1;
    dle_user_profile = a;
    dle_user_profile_link = b;
    ShowLoading("");
    $.get(dle_root + "engine/ajax/controller.php?mod=profile", {
        name: a,
        skin: dle_skin,
        user_hash: dle_login_hash
    }, function(d) {
        HideLoading("");
        ShowPopupProfile(d, c)
    });
    return !1
}

function FastSearch(cat, sor, dir) {
    $("#story").attr("autocomplete", "off");
    $("#story").blur(function() {
        /*$("#searchsuggestions").fadeOut()*/
    });
    var tagon = '';


    tempcat = cat;
    tempsort = sor;
    tempdir = dir;
    if (document.querySelector('input[name=tags-outside]')) {
        tagify.on('add', function(e) {
            $(".tagifyoff").removeClass("hide");
            tagon = tagres(tagify);
            temptagon = tagon;
            dle_do_search(tempkey, cat, sor, dir, tagon, '', tempcomand);
        })
        tagify.on('remove', function(e) {
            tagon = tagres(tagify);

            temptagon = tagon;
            AllTag(cat, 'search');
            //  alert('1 - '+tcomand);
            tcomand = tagres(tagify2);
            if (tcomand == 'Закладки') { tempcomand = 'favorit' }
            if (tcomand == 'Непрочитанные статьи') { tempcomand = 'noread' }
            if (tagon == "") {
                $(".tagifyoff").addClass("hide");
                if (tempkey == "" && tcomand == "") {
                    //alert('1 - '+tcomand)
                    $("#searchsuggestions3").fadeIn(100);
                    $("#searchsuggestions2").fadeOut(100);
                    $("#searchsuggestions2").html('');
                    $(".storykorotk2").attr('class', 'storykorotk');
                    $("#idkolich").hide();
                    proversvitch();
                } else {
                    // alert('1 - '+tempcomand+slovcheck);		 
                    dle_do_search(tempkey, cat, tempsort, tempdir, tagon, '', tempcomand);
                }
            } else {
                dle_do_search(tempkey, cat, tempsort, tempdir, tagon, '', tempcomand);
            }
            //  alert (e.detail.tag.title);
        })
    }

    $("#story").keyup(function() {
        tagon = tagres(tagify);
        tcomand = tagres(tagify2);
        temptagon = tagon;
        var a = $(this).val();
        tempkey = a;
        if (0 == a.length) {
            if (tagon == "" && tcomand == "") {
                // alert('1'+tcomand);
                $("#searchsuggestions3").fadeIn(100);
                $("#searchsuggestions2").fadeOut(100);
                $("#searchsuggestions2").html('');
                $(".storykorotk2").attr('class', 'storykorotk');
                $("#idkolich").hide();
                AllTag(tempcat, 'search');
                proversvitch();
            } else {
                dle_do_search('', cat, tempsort, tempdir, tagon, '', tempcomand);
            }
        } else {
            dle_search_value != a && a.length >= dle_min_search && (clearInterval(dle_search_delay), dle_search_delay = setInterval(function() {
                dle_do_search(a, cat, tempsort, tempdir, tagon, '', tempcomand)
            }, 400))
        }
    })

}


function dle_do_search(a, cat, sor, dir, tagon, slovch, comand) {
    $("#idkolich").hide();
    $("#indload").show();
    clearInterval(dle_search_delay);
    /* $("#searchsuggestions").remove();
     $("body").append("<div id='searchsuggestions' style='display:none'></div>");*/
    tempcomand = comand;
    var check = $('#tagcheck').attr('checked');
    if (check == "checked") {
        tagcheck = true;
    } else {
        tagcheck = false;
    }
    vipolclear = false;
    if (slovch && slovch != "") {
        if (slovch == "true") slovcheck = true;
        else slovcheck = false;
    } else {
        var scheck = $('#slovcheck').attr('checked');
        if (scheck == "checked") {
            slovcheck = true;
        } else {
            slovcheck = false;
        }
    }
    $(".storykorotk").attr('class', 'storykorotk2');
    $("#searchsuggestions3").fadeOut(400);
    $.post(dle_root + "engine/ajax/controller.php?mod=search" + project_url, {
        query: "" + a,
        user_hash: dle_login_hash,
        categoris: cat,
        sorted: sor,
        directory: dir,
        tagson: tagon,
        tagcheck: tagcheck,
        slovcheck: slovcheck,
        command: comand,
    }, function(b) {
        $("#searchsuggestions2").html(b).fadeIn(400).css({
            /*position: "absolute",
            top: 0,
            left: 0*/
        }).position({
            /*my: "left top",
            at: "left bottom",
            of: "#story",
            collision: "fit flip"*/
        });
        AllTag(tempcat, 'search');
        $("#idkolich").text($(".kolichestvo").length);
        $("#idkolich").show();
        $("#indload").hide();
        var check = $('#tagscheck').attr('checked');
        if (check != "checked") {
            $(".tagshides").hide();
        } else {
            $(".tagshides").removeClass('hide');
            $(".tagshides").show();
        }
        if (a == "") { proversvitch(); }
        HigslideActive();
    });
    dle_search_value = a
}

function ShowLoading(a) {
    $("#loading-layer").remove();
    $("body").append("<div id='loading-layer' style='display:none'></div>");
    a ? $("#loading-layer").html(a) : $("#loading-layer").html(dle_act_lang[6]);
    a = ($(window).width() - $("#loading-layer").width()) / 2;
    var b = ($(window).height() - $("#loading-layer").height()) / 2;
    $("#loading-layer").css({
        left: a + "px",
        top: b + "px",
        position: "fixed",
        zIndex: "99"
    });
    $("#loading-layer").fadeTo("slow", .6)
}

function HideLoading(a) {
    $("#loading-layer").fadeOut("slow", function() {
        $("#loading-layer").remove()
    })
}

function ShowAllVotes() {
    if (document.getElementById("dlevotespopup")) return $("#dlevotespopup").dialog("open"), !1;
    $.ajaxSetup({
        cache: !1
    });
    ShowLoading("");
    $.get(dle_root + "engine/ajax/controller.php?mod=allvotes&dle_skin=" + dle_skin, function(a) {
        HideLoading("");
        $("#dlevotespopup").remove();
        $("body").append(a);
        $(".dlevotebutton").button();
        $("#dlevotespopup").dialog({
            autoOpen: !0,
            resizable: !1,
            dialogClass: "dle-popup-allvotes",
            width: 600
        });
        400 < $("#dlevotespopupcontent").height() && $("#dlevotespopupcontent").height(400);
        $("#dlevotespopup").dialog("option", "height", $("#dlevotespopupcontent").height() + 60);
        $("#dlevotespopup").dialog("option", "position", "center")
    });
    return !1
}

function fast_vote(a) {
    var b = $("#vote_" + a + " input:radio[name=vote_check]:checked").val();
    if ("undefined" == typeof b) return !1;
    ShowLoading("");
    $.get(dle_root + "engine/ajax/controller.php?mod=vote", {
        vote_id: a,
        vote_action: "vote",
        vote_mode: "fast_vote",
        vote_check: b,
        dle_skin: dle_skin,
        user_hash: dle_login_hash
    }, function(c) {
        HideLoading("");
        $("#dle-vote_list-" + a).fadeOut(500, function() {
            $(this).html(c);
            $(this).fadeIn(500)
        })
    });
    return !1
}

function AddIgnorePM(a, b) {
    DLEconfirm(b, dle_confirm, function() {
        ShowLoading("");
        $.get(dle_root + "engine/ajax/controller.php?mod=pm", {
            id: a,
            action: "add_ignore",
            skin: dle_skin,
            user_hash: dle_login_hash
        }, function(c) {
            HideLoading("");
            DLEalert(c, dle_info);
            return !1
        })
    })
}

function DelIgnorePM(a, b) {
    DLEconfirm(b, dle_confirm, function() {
        ShowLoading("");
        $.get(dle_root + "engine/ajax/controller.php?mod=pm", {
            id: a,
            action: "del_ignore",
            skin: dle_skin,
            user_hash: dle_login_hash
        }, function(c) {
            HideLoading("");
            $("#dle-ignore-list-" + a).html("");
            DLEalert(c, dle_info);
            return !1
        })
    });
    return !1
}

function DelSocial(a, b) {
    DLEconfirm(b, dle_confirm, function() {
        ShowLoading("");
        $.get(dle_root + "engine/ajax/controller.php?mod=adminfunction", {
            id: a,
            action: "del_social",
            user_hash: dle_login_hash
        }, function(c) {
            HideLoading("");
            $("#dle-social-list-" + a).html("");
            DLEalert(c, dle_info);
            return !1
        })
    });
    return !1
}

function subscribe(a) {
    DLEconfirm(dle_sub_agree, dle_confirm, function() {
        ShowLoading("");
        $.get(dle_root + "engine/ajax/controller.php?mod=commentssubscribe", {
            news_id: a,
            skin: dle_skin,
            user_hash: dle_login_hash
        }, function(b) {
            HideLoading("");
            b.success ? DLEalert(b.info, dle_info) : b.error && DLEalert(b.errorinfo, dle_info)
        }, "json")
    });
    return !1
}

function media_upload(a, b, c, d) {
    var e = (new Date).getTime(),
        f = "none";
    $("#mediaupload").remove();
    $("body").append("<div id='mediaupload' title='" + text_upload + "' style='display:none'></div>");
    $("#mediaupload").dialog({
        autoOpen: !0,
        width: 710,
        resizable: !1,
        dialogClass: "modalfixed dle-popup-upload",
        open: function(g, h) {
            $("#mediaupload").html("<iframe name='mediauploadframe' id='mediauploadframe' width='100%' height='580' src='" + dle_root + "engine/ajax/controller.php?mod=upload&area=" + a + "&author=" + b + "&news_id=" + c + "&wysiwyg=" + d + "&skin=" + dle_skin + "&rndval=" + e + project_url + "' frameborder='0' marginwidth='0' marginheight='0' allowtransparency='true'></iframe>");
            $(".ui-dialog").draggable("option", "containment", "")
        },
        dragStart: function(g, h) {
            f = $(".modalfixed").css("box-shadow");
            $(".modalfixed").fadeTo(0, .6).css("box-shadow", "none");
            $("#mediaupload").css("visibility", "hidden")
        },
        dragStop: function(g, h) {
            $(".modalfixed").fadeTo(0, 1).css("box-shadow", f);
            $("#mediaupload").css("visibility", "visible")
        },
        beforeClose: function(g, h) {
            $("#mediaupload").html("")
        }
    });
    830 < $(window).width() && 530 < $(window).height() && ($(".modalfixed.ui-dialog").css({
        position: "fixed"
    }), $("#mediaupload").dialog("option", "position", {
        my: "center",
        at: "center",
        of: window
    }));
    return !1
}

function dropdownmenu(a, b, c, d) {
    window.event ? event.cancelBubble = !0 : b.stopPropagation && b.stopPropagation();
    b = $("#dropmenudiv");
    if (b.is(":visible")) return clearhidemenu(), b.fadeOut("fast"), !1;
    b.remove();
    $("body").append('<div id="dropmenudiv" style="display:none;position:absolute;z-index:100;width:165px;"></div>');
    b = $("#dropmenudiv");
    b.html(c.join(""));
    d && b.width(d);
    c = $(document).width() - 30;
    d = $(a).offset();
    c - d.left < b.width() && (d.left -= b.width() - $(a).width());
    b.css({
        left: d.left + "px",
        top: d.top + $(a).height() + "px"
    });
    b.fadeTo("fast", .9);
    b.mouseenter(function() {
        clearhidemenu()
    }).mouseleave(function() {
        delayhidemenu()
    });
    $(document).one("click", function() {
        hidemenu()
    });
    return !1
}

function setcookie(a, b) {
    var c = new Date;
    c.setTime(c.getTime() + 26784E5);
    c = "expires=" + c.toUTCString();
    document.cookie = a + "=" + b + ";" + c + ";path=/"
}

function get_local_storage(a) {
    try {
        return localStorage.getItem(a) ? JSON.parse(localStorage.getItem(a)) : null
    } catch (b) {
        return null
    }
}

function set_local_storage(a, b) {
    try {
        localStorage.setItem(a, JSON.stringify(b))
    } catch (c) {}
}

function del_local_storage(a, b) {
    try {
        localStorage.removeItem(a)
    } catch (c) {}
}

function save_last_viewed(a) {
    a = parseInt(a);
    if (isNaN(a)) return null;
    var b = get_local_storage("viewed_ids");
    $.isArray(b) ? -1 == $.inArray(a, b) && (19 < b.length && b.pop(), b.unshift(a)) : (b = [], b.push(a));
    set_local_storage("viewed_ids", b);
    setcookie("viewed_ids", b.join());
    return !0
}

function hidemenu(a) {
    $("#dropmenudiv").fadeOut("fast")
}

function delayhidemenu() {
    delayhide = setTimeout("hidemenu()", 1E3)
}

function clearhidemenu() {
    "undefined" != typeof delayhide && clearTimeout(delayhide)
}
jQuery(function(a) {
    var b = !1,
        c = [],
        d = "";
    a(document).keydown(function(e) {
        if (13 == e.which && e.ctrlKey) {
            e.preventDefault();
            if (window.getSelection) var f = window.getSelection();
            else document.getSelection ? f = document.getSelection() : document.selection && (f = document.selection.createRange().text);
            if ("" == f) return !1;
            if (255 < f.toString().length) return DLEalert(dle_big_text, dle_info), !1;
            e = {};
            e[dle_act_lang[3]] = function() {
                a(this).dialog("close")
            };
            e[dle_p_send] = function() {
                if (1 > a("#dle-promt-text").val().length) a("#dle-promt-text").addClass("ui-state-error");
                else {
                    var g = a("#dle-promt-text").val(),
                        h = a("#orfom").text(),
                        k = "";
                    a("#dle-promt-mail").val() && (k = a("#dle-promt-mail").val());
                    a(this).dialog("close");
                    a("#dlepopup").remove();
                    a.post(dle_root + "engine/ajax/controller.php?mod=complaint", {
                        seltext: h,
                        text: g,
                        mail: k,
                        user_hash: dle_login_hash,
                        action: "orfo",
                        url: window.location.href
                    }, function(l) {
                        "ok" == l ? DLEalert(dle_p_send_ok, dle_info) : DLEalert(l, dle_info)
                    })
                }
            };
            a("#dlepopup").remove();
            5 == dle_group && (d = dle_mail + '<br><input type="text" name="dle-promt-mail" id="dle-promt-mail" class="ui-widget-content ui-corner-all" style="width:100%;" value="">');
            a("body").append("<div id='dlepopup' class='dle-promt' title='" + dle_c_title + "' style='display:none'>" + dle_orfo_title + "<br><textarea name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:100%;height:80px;'></textarea>" + d + "<div id='orfom' style='display:none'>" + f + "</div></div>");
            a("#dlepopup").dialog({
                autoOpen: !0,
                width: 600,
                resizable: !1,
                dialogClass: "modalfixed dle-popup-complaint",
                buttons: e
            });
            a(".modalfixed.ui-dialog").css({
                position: "fixed"
            });
            a("#dlepopup").dialog("option", "position", {
                my: "center",
                at: "center",
                of: window
            })
        }
    });
    setTimeout(function() {
        a("img[data-maxwidth]").each(function() {
            var e = a(this).width(),
                f = a(this).data("maxwidth");
            a(this)[0].naturalWidth && (e = a(this)[0].naturalWidth);
            e > f && (a(this).width(f), a(this).wrap('<a href="' + a(this).attr("src") + '" onclick="return hs.expand(this)"></a>'), "undefined" == typeof hs && 0 == b && (b = !0, a.getScript(dle_root + "engine/classes/highslide/highslide.js", function() {
                hs.graphicsDir = dle_root + "engine/classes/highslide/graphics/";
                hs.numberOfImagesToPreload = 0;
                hs.captionEval = "this.thumb.alt";
                hs.showCredits = !1;
                hs.align = "center";
                hs.transitions = ["expand", "crossfade"]
            })))
        })
    }, 300);
    setTimeout(function() {
        a("div[data-dlebclicks]").each(function() {
            var e = a(this).data("dlebid");
            a(this).find("a").on("click", function() {
                a.post(dle_root + "engine/ajax/controller.php?mod=adminfunction", {
                    id: e,
                    action: "bannersclick",
                    user_hash: dle_login_hash
                })
            })
        })
    }, 400);
    a("div[data-dlebviews]").each(function() {
        c.push(a(this).data("dlebid"))
    });
    c.length && setTimeout(function() {
        a.post(dle_root + "engine/ajax/controller.php?mod=adminfunction", {
            "ids[]": c,
            action: "bannersviews",
            user_hash: dle_login_hash
        })
    }, 1E3)
});