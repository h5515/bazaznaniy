var tempVop, tempOtv;
var hv_root = 'https://bz.fto.com.ru:470/';
var ActiveApp = false;
var TempBol = false;
var grupp = '';
var TableEdit = false;
var TempComand = '';
var TempHover = '';
var Tempajaxind;
var Test = false;


Test = false;
if (Test) {
    hv_root = 'http://localhost:81/';
}

Toast.configure(maxToasts = null, placement = TOAST_PLACEMENT.BOTTOM_LEFT, theme = null, enableTimers = true);

function ExpandedSpan() {
    jQuery("span.expand").unbind();
    jQuery("span.expand").click(function() {
        if ((TempBol) || ($('#right_modal .modal-title').text() == 'Параметры:') || ($('#right_modal .modal-title').text() == 'Шаблоны:')) return;
        var $a = $(this).find('.ImgFolder');
        dopen = $a.attr('data-open');
        dclose = $a.attr('data-close');
        if ((dopen) && (dopen != "")) {
            if ($(this).next().css('display') == 'none') {
                $a.attr('src', 'CherApp/images/set/' + dopen);
            } else {
                if (dclose != "") {
                    $a.attr('src', 'CherApp/images/set/' + dclose);
                }
            }
        }
        var e = jQuery(this).next();
        e.slideToggle("fast", function() {
            SaveStorag();
        }); //Сворачиваем/разворачиваем

    });
}

function Load() {
    $('.text').html('');
    $('.loading').center();
    $('.loading').slideToggle("fast");
    // SpLoading(true);
    tex = $('.text').html();
    $.post(hv_root + "engine/ajax/controller.php?mod=cherapp"+project, {
            comand: 'open',
            app: App
        }, function(b) {
            $('.text').html(b);
            setTimeout(() => {
                // $('.loading').slideToggle("fast");
                //   $('.text img').attr('style', '');
                //   $('.text DIV').attr('style', '');
                //    $('.text LI').attr('style', '');
                //  $('UL').attr('style', '');
                //  $('.text LI SPAN').attr('style', '');
                ExpandedSpan();

                OnLoad();
            }, 500);
        }).done(function() {
            //alert("second success");
        })
        .fail(function(b) {
            Errors('Ошибка при получении данных!');
        })
        .always(function() {

        });
}

TempBol = true;

if (LoadLocal) {
    Load();
} else {
    OnLoad();
}
//ExpandedSpan();

function FullLoadAjax() {
    Tempajaxind = $('[ajax=true]').length;

    $('[ajax=true]').each(function(index, el) {
        $(el).attr('ajax-temp', index);
        LoadAjax(el, index);
    });
    // TempBol = false;
    if (Tempajaxind < 1) {
        LoadStorag();
        TempBol = false;
    }
}

function ProverImgOpen() {
    $("span.expand").each(function(index, el) {
        var $a = $(el).find('.ImgFolder');
        dopen = $a.attr('data-open');
        dclose = $a.attr('data-close');
        if ((dopen) && (dopen != "")) {
            if (!$(el).parent().find('UL')[0] || $(el).next().css('display') == 'none') {
                $a.attr('src', 'CherApp/images/set/' + dclose);
            } else {
                if (dclose != "") {
                    $a.attr('src', 'CherApp/images/set/' + dopen);
                }
            }
        }
    });
};


function ProverActive() {
    $('[data="OpenDir"]').css('display', 'none');
    $('[data="RunExe"]').css('display', 'none');

    if (ActiveApp) {
        $('[data="OpenDir"]:not([app=false])').css('display', '');
        $('[data="RunExe"]:not([app=false])').css('display', '');
    };
};

function GrupDostup(dostup) {
    bol = false;
    if (dostup == 'Admin') {
        grupp = 'Edit,Delete,Add,Param,UpDown';
        bol = true;
        TableEdit = true;
    };
    if (dostup == 'Moderator') {
        grupp = 'Edit,Delete,Add,UpDown';
        bol = true;
        TableEdit = true;
    };
    if (dostup == 'UserA') {
        grupp = 'Edit,Add,UpDown';
        bol = true;
        TableEdit = true;
    };
    if (dostup == 'UserE') {
        grupp = 'Edit';
        bol = true;
        TableEdit = true;
    };
    if (dostup == 'UserS') {
        bol = true;
    };
    return bol;
}

function ProverRole() {
    if (grupp.indexOf('Delete') < 0) {
        $('[data=Delete]').css('display', 'none');
        $('.onDelete').css('display', 'none');
    }
    if (grupp.indexOf('Param') < 0)
        $('.onParam').css('display', 'none');
    if (grupp.indexOf('Add') < 0)
        $('.onAdd').css('display', 'none');
    if (grupp.indexOf('Edit') < 0) {
        $('.onEdit').css('display', 'none');
        $('[data=Edit]').css('display', 'none');
        $('.btn-primary').css('display', 'none');
    }
    if (grupp.indexOf('UpDown') < 0) {
        $('.onDown').css('display', 'none');
        $('.onUp').css('display', 'none');
    }
    // alert(grupp.indexOf('Edit'));
}

function ActiveOnDelete() {
    $('[data-toggle="confirmDel"]').jConfirm({
        question: 'Точно удалить?',
        confirm_text: 'Да',
        deny_text: 'Нет',
        theme: 'white'
    }).on('confirm', function(e) {
        TempBol = false;
        $gel = $elKnop.closest('LI');
        $gul = $gel.parent();
        $gel.remove();
        if ($gul.get(0).tagName == 'UL') {
            $gels = $gul.find('LI');
            if (!$gels[0]) {
                $gul.remove();
                ProverImgOpen();
            }
        }
        SaveTemplate();
    }).on('deny', function(e) {
        //  console.log("deny");
    }).on('jc-show', function(e, value) {
        //  console.log('js-show');
    }).on('jc-hide', function(e) {
        TempBol = false;
        $elKnop.remove();
    });

    $('[data=Delete]').on('click', function() {
        $elKnop = $(this).closest('.paramKnop');
        TempBol = true;
        event.stopPropagation();
    })
}

function AvtiveEdit() {
    $('[data=Edit]').unbind('click');
    $('[data=Edit]').on('click', function() {
        if (TempBol) return;
        TempBol = true;
        $bzBlock = $(this).parent().parent().parent();
        $vop = $bzBlock.find('.bzVop');
        tVop = $vop.text();
        tempVop = tVop;
        $vop.text('');
        $vop.append('<input type="text">');
        $vop.find('input').val(tVop);

        $bzOtv = $bzBlock.find('.bzOtv');
        $bzOpen = $bzOtv.find('.bzkopyOpen');
        $bzOpen.find('IMG').css('display', 'none');
        $bzOpen.append('<img src="CherApp/images/save.png" data="Save" title="Сохранить" class="delt">');
        $bzOpen.append('<img src="CherApp/images/Cancel.png" data="Cancel" title="Отмена" class="delt">');
        tBzOtv = $bzOtv.find('span').text();
        $bzOtv.find('span').text('');
        $bzOtv.find('span').css('display', 'none');
        tempOtv = tBzOtv;
        $bzOtv.append('<input type="text">');
        $bzOtv.find('input').val(tBzOtv);

        $('[data=Save]').unbind('click');
        $('[data=Cancel]').unbind('click');

        $('[data=Save]').on('click', function() {
            TempBol = false;
            $('.delt').remove();
            $bzOpen.find('IMG').css('display', '');
            ProverActive();
            tempOtv = $bzOtv.find('input').val();
            tempVop = $vop.find('input').val();
            $vop.find('input').remove();
            $bzOtv.find('input').remove();
            $bzOtv.find('span').text(tempOtv);
            $bzOtv.find('span').css('display', '');
            $vop.text(tempVop);
            if (($('#right_modal .modal-title').text() == 'Параметры:') || ($('#right_modal .modal-title').text() == 'Шаблоны:')) {
                a = 0;
            } else {
                SaveTemplate();
            }
        })

        $('[data=Cancel]').on('click', function() {
            TempBol = false;
            $('.delt').remove();
            $bzOpen.find('IMG').css('display', '');
            ProverActive();
            $vop.find('input').remove();
            $bzOtv.find('input').remove();
            $bzOtv.find('span').text(tempOtv);
            $bzOtv.find('span').css('display', '');
            $vop.text(tempVop);
        })
        event.stopPropagation();
    });

    ActiveOnDelete();
    ActiveParam();

    ActiveUpDownElem();

};

function ActiveParam(funct = '') {
    $('.onParam').on('click', function() {
        TempBol = true;
        $el = $(this).closest('.bzBlock');
        $('.paramKnop').remove();
        $('#right_modal .modal-title').html('Параметры:');
        $('#right_modal .modal-body').html('');
        //$('.modal-body').append('<div id="#Idcontent">' + $el.parent().clone() + '</div>');
        ModalCreate($el[0], funct);

    });
    // $('[data-dismiss=modal]').unbind('change');
    $('[data-dismiss=modal]').on('click', function() {
        ProverTempBol();
    });
}

function ActiveUpDownElem() {
    $('.onUp').unbind();
    $('.onUp').on('click', function() {
        $elem = $(this).closest('LI');
        $elem.insertBefore($elem.prev());
        $(this).parent().remove();
        SaveTemplate();
        event.stopPropagation();
    })
    $('.onDown').unbind();
    $('.onDown').on('click', function() {
        $elem = $(this).closest('LI');
        $elem.insertAfter($elem.next());
        $(this).parent().remove();
        SaveTemplate();
        event.stopPropagation();
    })
}


function Errors(Text, time = 0) {
    /*$('.error SPAN').text(Text);
    $('.error').slideToggle("fast");
    setTimeout(function() {
        $('.error').slideToggle("fast");
    }, 10000);*/
    if (time == 0) time = 5000;
    Toast.create("Ошибка", Text, TOAST_STATUS.DANGER, time);
    //$('#toastContainer').css('width', '-webkit-fill-available');
}

function YesOk(text) {
    /* $('.Yess SPAN').text(text);
     $('.Yess').slideToggle("fast");
     setTimeout(function() {
         $('.Yess').slideToggle("fast");
     }, 3000);*/
    Toast.create("Успешно", text, TOAST_STATUS.SUCCESS, 5000);
}

function SaveTemplate() {
    if ($.trim($('#right_modal .modal-title').text()) == 'Параметры:') {
        return;
    }
    if ($('.imagEdit')[0])
        $('.imagEdit').remove();
    
    $('[data-f-id="pbf"]').remove();

    $('.loading').slideToggle("fast");
    $('#IdSaveTemplate').html($('.text').html());

    $('#IdSaveTemplate .table').each(function(index, el) {
        bsact = $(el).find("th:nth-last-child(1)").attr('name');
        if (bsact == 'bstable-actions') {
            $(el).find("th, td", event.delegateTarget).remove(":nth-last-child(1)");
        }
    })
    $('#IdSaveTemplate .fancySearchRow').remove();
    $('#IdSaveTemplate .title').remove();

    $('#IdSaveTemplate [ajax=true]').html('');

    tex = $('#IdSaveTemplate').html();
    $.post(hv_root + "engine/ajax/controller.php?mod=cherapp"+project, {
            comand: 'edit',
            app: App,
            template: tex,
        }, function(b) {
            if (b == "Ok") {
                YesOk('Cохранено!');
            } else {
                Errors('Ошибка при сохранении данных!<br>' + b);
            }
        }).done(function() {
            //alert("second success");
        })
        .fail(function(b) {
            Errors('Ошибка при сохранении данных!');
        })
        .always(function() {
            $('.loading').slideToggle("fast");
            $('#IdSaveTemplate').html('');
        });
}

function deleteimg(elem) {
    el = $(elem).parent().parent().find('IMG')[0];
    $(el).attr('src', 'CherApp/images/vopros.png');
    $(elem).css('display', 'none');
}

function ProverTempBol() {
    ActHover();

    if (($('#bottom_modal .modal-title').attr('dtemp')) && ($('#bottom_modal .modal-title').attr('dtemp') == 'off')) {
        TempBol = true;
        /*if ($('#upload-4-queue')[0]) {
            $('#upload-4-queue').remove();
        }*/
        //  $('#bottom_modal .modal-title').removeAttr('dtemp');
    } else {
        setTimeout(() => {
            $('.modal-footer').css('display', '');
        }, 500);
        $('.modal-footer').css('display', '');
        $('.modal-title').text('');
        $('#bottom_modal .modal-title').removeAttr('dtemp');
        $('.modal-footer .btn-primary').text('Сохранить');
        TempBol = false;
    }


}

function CloseBlock(elem) {
    $('#bottom_modal .modal-title').removeAttr('dtemp');
    $(elem).css('display', 'none');
    $bock = $(elem).closest('#idblock');
    $bock.slideToggle("fast", function() {
        $(this).remove();
    });

}

function ActiveTable() {
    if (TableEdit) {
        $(".text .table").each(function(index, el) {
            $(el).parent().find('#row_add').unbind();
            if (!$(el).find('[name="bstable-actions"]')[0]) {
                var Tabl = new BSTable(el, {
                    //editableColumns: "1,2",
                    $addButton: $(el).parent().find('#row_add'),
                    onEdit: function() {
                        $('.paramKnop').remove();
                        SaveTemplate();
                    },
                    onDelete: function() {
                        $('.paramKnop').remove();
                        SaveTemplate();
                    },
                    advanced: {
                        columnLabel: ''
                    }
                });
                Tabl.init();

                if ($(el).attr('data-edittd') == 'true') {
                    bsact = $(el).find("th:nth-last-child(1)").attr('name');
                    if (bsact == 'bstable-actions') {
                        $(el).find("th, td").remove(":nth-last-child(1)");
                    }
                }

                $(el).parent().find('#row_add').on('click', function() {

                    if ($(this).parent().find('.fancySearchRow')[0]) {
                        $(this).parent().find('.fancySearchRow input').val('');
                        $(this).parent().find('.fancySearchRow input').change();
                    }
                    if ($(this).parent().find('.pag')[0]) {
                        $(this).parent().find('.pag').find('A:last').click();
                    }
                    Proverfoot($(this).parent());
                    $tabl = $(this).parent().find('.table');
                    if ($tabl.attr('data-edittd') != 'true') {
                        $(this).parent().find('.fa-edit:last').click();
                        $(this).parent().find('.input-sm:first').focus();
                    } else {
                        $tabl.find('tbody tr:nth-last-child(1)').find('td').each(function(index, el) {
                            $(this).html('<div class="bzBlock" id="Idedit"></div>');
                            ActHover();
                        });
                    }
                    $del = $(this).parent().closest('div');
                    heg = $del.height();
                    $del.css('min-height', heg + 'px');

                })

            }
        })
    }
    $(".text .table-search").each(function(index, el) {
        if ($(el).find('.fancySearchRow')[0]) {
            $(el).find('.fancySearchRow').remove();
        }
        $(el).find('TR').css('display', '');
        if ($(el).find('.pag')[0]) {
            $(el).find('.pag').closest('tfoot').remove();
        }
        var sort = $(el).attr('data-sort') == 'true';
        var searc = $(el).attr('data-search') == 'true';
        var page = $(el).attr('data-pagin') == 'true';
        $(el).fancyTable({
            // sortColumn:3,// column number for initial sorting
            sortOrder: 'descending', // 'desc', 'descending', 'asc', 'ascending', -1 (descending) and 1 (ascending)
            sortable: sort,
            // pagination:[pagbol],// default: false
            searchable: searc,
            globalSearch: true,
            pagination: page,
            inputPlaceholder: "",
            perPage: $(el).attr('data-maxpage')
                // paginationClass:"btn-light",
                //  paginationClassActive:"btactive",
                // globalSearchExcludeColumns: [2,5]// exclude column 2 & 5
        });

        Proverfoot(el);
        $del = $(el).closest('div');
        $del.css('min-height', '');
        heg = $del.height();
        $del.css('min-height', heg + 'px');

        $(el).find('th').css('min-width', '');
        $(el).find('th').each(function(index, el) {
                wit = $(el).width();
                $(el).css('min-width', wit + 'px');
            })
            /* hei = $(el).height();
             $(el).css('min-height', hei + 'px');*/
    })
}

function Proverfoot(tables) {
    if ($(tables).find('.pag')[0]) {
        le = $(tables).find('.pag A').length;
        if (le < 2)
            $(tables).find('tfoot').css('display', 'none')
        else
            $(tables).find('tfoot').css('display', '')
    }
}

function OnLoad() {

    /*$('.text').nestable({
        listNodeName: 'ul',
        expandBtnHTML: '',
        collapseBtnHTML: '',
        group: 1
    })*/
    // LoadStorag();
    //SaveStorag();

    ProverImgOpen();

    $('[data=copy]').on('click', function() {
        el = $(this).parent().parent().find('SPAN');
        $(el).CopyToClipboard();
    });

    MyDostup = 'Admin';

    if (!GrupDostup(MyDostup)) {
        $('body').html('<br><br><h1 align="center">Отсутствует доступ. Обратитесь к Администратору!</h1>');
    }


    ActiveTable();

    ProverActive();

    setTimeout(() => {
        ProverRole();
    }, 200);

    AvtiveEdit();

    ActHover();

    FullLoadAjax();
};

function ActHover(comand = '') {
    $(".expand").unbind();
    ExpandedSpan();
    $(".expand").hover(function() {
            if (TempBol) return;
            $elem = $(this);
            $nelem = $elem.parent().next('LI');
            onDown = '';
            if ($nelem[0])
                onDown = '<img src="CherApp/images/Arrow_Down.png" class="onDown" title="Вниз">';
            $pelem = $elem.parent().prev('LI');
            onUp = '';
            if ($pelem[0])
                onUp = '<img src="CherApp/images/Arrow_Up.png" class="onUp" title="Вверх">';
            (comand == "edit") ? edit = 'style="display:none"': edit = "";
            $(this).find('span').append('<div class="paramKnop"><img src="CherApp/images/Edit.png" class="onEdit" title="Редактировать"><img src="CherApp/images/param.png" class="onParam" ' + edit + ' title="Параметры" data-toggle="modal" data-target="#right_modal"><img src="CherApp/images/add.png" class="onAdd" ' + edit + ' data-toggle="modal" data-target="#right_modal" title="Добавить"><img src="CherApp/images/delete.png" class="onDelete" data-toggle="confirmDel" ' + edit + ' title="Удалить">' + onUp + onDown + '</div>');
            ProverRole();
            $('.onDelete').unbind();
            $('.onDelete').on('click', function() {
                $elKnop = $(this).closest('.paramKnop');
                TempBol = true;
            })

            $('[data-toggle="confirmDel"]').jConfirm({
                question: 'Точно удалить?',
                confirm_text: 'Да',
                deny_text: 'Нет',
                theme: 'white'
            }).on('confirm', function(e) {
                TempBol = false;
                $gel = $elKnop.closest('LI');
                $gul = $gel.parent();
                $gel.remove();
                if ($gul.get(0).tagName == 'UL') {
                    $gels = $gul.find('LI');
                    if (!$gels[0]) {
                        $gul.remove();
                        ProverImgOpen();
                    }
                }
                SaveTemplate();
            }).on('deny', function(e) {
                //  console.log("deny");
            }).on('jc-show', function(e, value) {
                //  console.log('js-show');
            }).on('jc-hide', function(e) {
                TempBol = false;
                $elKnop.remove();
            });
            $('.onEdit').unbind();
            $('.onEdit').on('click', function() {
                TempBol = true;
                $(this).parent().remove();
                htm = $elem.find('SPAN').text();
                $elem.find('SPAN').text('');
                tempVop = htm;
                $elem.prepend('<div class="bzkopyOpen shaps"><img src="CherApp/images/save.png" data="Save" title="Сохранить" class="delt"><img src="CherApp/images/Cancel.png" data="Cancel" title="Отмена" class="delt"></div>')
                $elem.append(`<input type="text" value="` + htm + `">`);

                $('[data=Save]').unbind();
                $('[data=Cancel]').unbind();

                $('[data=Save]').on('click', function() {
                    TempBol = false;
                    $elem.find('.bzkopyOpen').remove();
                    temptext = $elem.find('input').val();
                    $elem.find('input').remove();
                    $elem.find('span').text(temptext);
                    $('.ImgFolder').unbind();
                    if ($('.imagEdit')[0]) CloseBlock($('.imClose')[0]);

                    if (($('#right_modal .modal-title').text() == 'Параметры:') || ($('#right_modal .modal-title').text() == 'Шаблоны:')) {

                    } else {
                        SaveTemplate();
                        event.stopPropagation();
                    }
                })

                $('[data=Cancel]').on('click', function() {
                    TempBol = false;
                    $elem.find('.bzkopyOpen').remove();
                    $elem.find('input').remove();
                    $elem.find('span').text(tempVop);
                    $('.ImgFolder').unbind();
                    if ($('.imagEdit')[0]) CloseBlock($('.imClose')[0]);

                    event.stopPropagation();
                })

                $elem.find('.ImgFolder').unbind();
                $elem.find('.ImgFolder').on('click', function() {
                    $elemImg = $(this);
                    imOpen = $(this).attr('data-close');
                    imclose = $(this).attr('data-open');
                    if ((!imOpen) || (imOpen == "")) {
                        imOpen = $(this).attr('src');
                        imclose = 'CherApp/images/vopros.png';
                        hid = "hide"
                    } else {
                        imOpen = 'CherApp/images/set/' + imOpen;
                        imclose = 'CherApp/images/set/' + imclose;
                        hid = "";
                    }
                    a1 = '<a href="#" data-id="img01" class="vibimg" data-toggle="modal" data-target="#bottom_modal" onClick="return false;">Основная</a>';
                    a2 = '<a href="#" data-id="img02" class="vibimg" data-toggle="modal" data-target="#bottom_modal" onClick="return false;">При открытие</a>';
                    $elem.append('<div class="imagEdit" id="idblock"><div><img id="img01" src="' + imOpen + '"><span>' + a1 + '</span></div><div><img id="img02" src="' + imclose + '"><span><img class="delImg ' + hid + '" title="Удалить изображение" onClick="deleteimg(this)" src="CherApp/images/delete.png">' + a2 + '</span></div><img src="CherApp/images/close.png" onClick="CloseBlock(this);" class="imClose"><div class="butImgOp"><button type="button" id="saveImgBut" class="btn btn-primary">Сохранить</button></div></div>');
                    $('.imagEdit').slideToggle("fast");

                    $('#saveImgBut').on('click', function() {
                        src2 = $('#img02').attr('src');
                        src1 = $('#img01').attr('src');
                        if (src2 == "CherApp/images/vopros.png") {
                            $elemImg.removeAttr("data-close");
                            $elemImg.removeAttr("data-open");
                            $elemImg.attr('src', src1);
                        } else {
                            filename1 = src1.split('\\').pop().split('/').pop();
                            filename2 = src2.split('\\').pop().split('/').pop();
                            $elemImg.attr('data-close', filename1);
                            $elemImg.attr('data-open', filename2);
                            $elemImg.attr('src', src1);
                            ProverImgOpen();
                        }
                        CloseBlock($('.imClose'));
                    })
                    $('.vibImg').on('click', function() {
                        tex = $(this).text();
                        dataid = $(this).attr('data-id');
                        $('#bottom_modal .modal-title').text(tex);
                        $('#bottom_modal .modal-title').attr('dtemp', 'off');
                        $('#bottom_modal .modal-body').html('');
                        $('#bottom_modal .modal-footer').css('display', 'none');
                        $('#bottom_modal .modal-body').attr('data-id', dataid);
                        $.post(hv_root + "engine/ajax/controller.php?mod=cherapp"+project, {
                            comand: 'imagesdir',
                        }, function(b) {
                            $('#bottom_modal .modal-body').html('<div class="imagDir">' + b + '</dir>');
                            $('#bottom_modal .imagDir IMG').attr('data-dismiss', 'modal');

                            $('#bottom_modal [data-dismiss="modal"]').unbind();
                            $('#bottom_modal [data-dismiss="modal"]').on('click', function() {
                                im = $(this).attr('src');
                                $('#' + dataid).attr('src', im);
                                ProverTempBol();
                            });
                        }).fail(function(b) {
                            Errors('Ошибка при получении изображений с сервера!');
                        })
                    });
                    event.stopPropagation();
                })

                event.stopPropagation();
            });
            $('.onParam').unbind();
            $('.onParam').on('click', function() {
                TempBol = true;
                $el = $(this).parent().parent();
                $(this).parent().remove();
                $('#right_modal .modal-title').html('Параметры:');
                $('#right_modal .modal-body').html('');
                ModalCreate($el.parent());
            });

            // $('[data-dismiss=modal]').unbind();
            $('[data-dismiss=modal]').on('click', function() {
                ProverTempBol();
            });
            $('.onUp').unbind();
            $('.onUp').on('click', function() {
                $elem = $(this).closest('LI');
                $elem.insertBefore($elem.prev());
                $(this).parent().remove();
                if (!$(this).closest('.modal-body')[0]) {
                    SaveTemplate();
                }
                //SaveTemplate();
                event.stopPropagation();
            })
            $('.onDown').unbind();
            $('.onDown').on('click', function() {
                $elem = $(this).closest('LI');
                $elem.insertAfter($elem.next());
                $(this).parent().remove();
                SaveTemplate();
                event.stopPropagation();
            })

            $('.onAdd').unbind();
            $('.onAdd').on('click', function() {
                $el = $(this).parent().parent();
                $(this).parent().remove();
                $('#right_modal .modal-title').html('Шаблоны:');
                $('#right_modal .modal-body').html('');
                AddTemplate($el.parent());
                //  event.stopPropagation();
            })


        },
        function() {
            if (TempBol) return;
            $(this).find('.paramKnop').remove();
        });
    $(".bzBlock").unbind();
    $(".bzBlock").hover(function() {
            if (TempBol) return;
            $elem = $(this);
            myelem = this;
            //if ($elem.closest('LI')[0]) {
            $nelem = $elem.parent().next('LI');
            // }
            onDown = '';
            if ($nelem[0])
                onDown = '<img src="CherApp/images/Arrow_Down.png" class="onDown" title="Вниз">';
            // if ($elem.closest('LI')[0]) {
            $pelem = $elem.parent().prev('LI');
            //  }
            onUp = '';
            if ($pelem[0])
                onUp = '<img src="CherApp/images/Arrow_Up.png" class="onUp" title="Вверх">';

            (comand == "edit") ? edit = 'style="display:none"': edit = "";
            if ($(this).find('.bzVop')[0]) {
                $(this).find('.bzVop').append('<div class="paramKnop paramKnopDop"><img src="CherApp/images/Edit.png" data="Edit" title="Редактировать"><img src="CherApp/images/param.png" class="onParam" title="Параметры" data-toggle="modal" ' + edit + 'data-target="#right_modal"><img src="CherApp/images/delete.png" data="Delete" data-toggle="confirmDel" ' + edit + ' title="Удалить">' + onUp + onDown + '</div>');
                AvtiveEdit();
            }
            if ($(this).attr('id') == 'Idedit') {
                ($(this).parent()[0].tagName == 'TD') ? dels = 'style="display:none"': dels = edit;

                $(this).prepend('<div class="paramKnop paramKnopDop paramfix"><img src="CherApp/images/Edit.png" data="Edit" title="Редактировать"><img src="CherApp/images/param.png" class="onParam" title="Параметры" data-toggle="modal" ' + edit + 'data-target="#right_modal"><img src="CherApp/images/delete.png" data="Delete" data-toggle="confirmDel" ' + dels + ' title="Удалить">' + onUp + onDown + '</div>');
                $('[data=Edit').on('click', function() {
                    TempBol = true;
                    $('.paramKnop').remove();
                    $elem.before('<div class="bzkopyOpen"><img src="CherApp/images/save.png" data="Save" title="Сохранить" class="delt"><img src="CherApp/images/Cancel.png" data="Cancel" title="Отмена" class="delt"></div>')
                    $elem.css('display', 'block');
                    $('#IdTempEditor').html($elem.html());
                    Editor(myelem);

                    $('[data=Save]').on('click', function() {
                        $(this).closest('.bzkopyOpen').remove();
                        editor.destroy();
                        $elem.css('display', '');

                        if ($elem.attr('ajax') == 'true') {
                            if ($.trim($('#right_modal .modal-title').text()) != 'Параметры:')
                                SaveAjax($elem);
                        } else
                            SaveTemplate();
                        TempBol = false;
                    })
                    $('[data=Cancel]').on('click', function() {
                        $(this).closest('.bzkopyOpen').remove();
                        editor.destroy();
                        $elem.html($('#IdTempEditor').html());
                        $elem.css('display', '');
                        TempBol = false;
                    })
                })

                ActiveOnDelete();
                ActiveUpDownElem();
                ActiveParam('EditBlock');
            }

            ProverRole();

        },
        function() {
            if (TempBol) return;
            $(this).find('.paramKnop').remove();
        });
    $(".title").unbind();
    $(".title").hover(function() {
        if (TempBol) return;
        $elem = $(this);
        $elem.append('<div class="paramKnop paramKnopDop"><img src="CherApp/images/Edit.png" data="Edit" title="Редактировать"><img src="CherApp/images/add.png" class="onAdd" data-toggle="modal" data-target="#right_modal" title="Добавить"></div>');
        ProverRole();
        $('[data=Edit]').unbind();
        $('[data=Edit]').on('click', function() {
            TempBol = true;
            $elem.find('.paramKnop').remove();
            htm = $elem.text();
            $elem.text('');
            tempVop = htm;
            $elem.prepend('<div class="bzkopyOpen shaps"><img src="CherApp/images/save.png" data="Save" title="Сохранить" class="delt"><img src="CherApp/images/Cancel.png" data="Cancel" title="Отмена" class="delt"></div>')
            $elem.append(`<input type="text" value="` + htm + `">`);

            $('[data=Save]').unbind();
            $('[data=Cancel]').unbind();

            $('[data=Save]').on('click', function() {
                TempBol = false;
                $elem.find('.bzkopyOpen').remove();
                temptext = $elem.find('input').val();
                $elem.find('input').remove();
                $elem.text(temptext);
                $('.loading').slideToggle("fast");
                $.post(hv_root + "engine/ajax/controller.php?mod=cherapp"+project, {
                        comand: 'titleedit',
                        app: App,
                        title: temptext,
                    }, function(b) {
                        if (b == "Ok") {
                            YesOk('Заголовок успешно сохранён!');
                        } else {
                            Errors('Ошибка при сохранении заголовка!' + b);
                        }
                    }).done(function() {
                        //alert("second success");
                    })
                    .fail(function(b) {
                        Errors('Ошибка при сохранении заголовка!');
                    })
                    .always(function() {
                        $('.loading').slideToggle("fast");
                        $('#IdSaveTemplate').html('');
                    });

            })

            $('[data=Cancel]').on('click', function() {
                TempBol = false;
                $elem.find('.bzkopyOpen').remove();
                $elem.find('input').remove();
                $elem.text(tempVop);
                $('.ImgFolder').unbind();
            })
        })
        $('.onAdd').unbind();
        $('.onAdd').on('click', function() {
            $(this).parent().remove();
            $('#right_modal .modal-title').html('Шаблоны:');
            $('#right_modal .modal-body').html('');
            AddTemplate($('.title'));
            //  event.stopPropagation();
        })
    }, function() {
        $(this).find('.paramKnop').remove();
    });
    $(".table").unbind();
    $(".table").not('.modal-body .table').hover(function() {
            if (TempBol) return;
            $elem = $(this);
            $nelem = $elem.parent().next();
            onDown = '';
            if ($nelem[0])
                onDown = '<img src="CherApp/images/Arrow_Down.png" class="onDown" title="Вниз">';
            $pelem = $elem.parent().prev();
            onUp = '';
            if ($pelem[0])
                onUp = '<img src="CherApp/images/Arrow_Up.png" class="onUp" title="Вверх">';
            (comand == "edit") ? edit = 'style="display:none"': edit = "";
            if ($(this).attr('data-edittd') != 'true') {
                $(this).find('tr:first [name="bstable-actions"]').append('<div class="paramKnop paramKnopDop"><img src="CherApp/images/param.png" class="onParamTab" title="Параметры" ' + edit + ' data-toggle="modal" data-target="#right_modal"><img src="CherApp/images/delete.png" data="Delete" data-toggle="confirmDel" title="Удалить">' + onUp + onDown + '</div>');
            } else {
                $(this).before('<div class="paramKnop paramKnopDop paramfix"><img src="CherApp/images/param.png" class="onParamTab" title="Параметры" ' + edit + ' data-toggle="modal" data-target="#right_modal"><img src="CherApp/images/delete.png" data="Delete" data-toggle="confirmDel" title="Удалить">' + onUp + onDown + '</div>');
            }
            ProverRole();
            ActiveOnDelete();

            $('.onParamTab').unbind();
            $('.onParamTab').on('click', function() {
                TempBol = true;

                $el = $(this).parent().parent().closest('div');
                $('.paramKnop').remove();
                $('#right_modal .modal-title').html('<img src="CherApp/images/Table.png" class="ImgFolder"><span>Таблица</span>');
                $('#right_modal .modal-body').html('');
                // $('.modal-body').append($el.clone());

                ModalCreate($el, 'tables');

            });
            // $('[data-dismiss=modal]').unbind('change');
            $('thead [data-dismiss=modal]').on('click', function() {
                ProverTempBol();
            });
        },
        function() {
            if (TempBol) return;
            $(this).find('tr:first [name="bstable-actions"]').find('.paramKnop').remove();
        });
}