var tempelem;
var timeBol;
var MiScroll = '';
var MiGraph = '';
var LoadLocal = false;
var App;

if (window.location.href.indexOf('cherapp.html') > -1) {
    LoadLocal = true;
    MiScroll = 'body';
    MiGraph = 'CherApp/highslide/graphics/';
} else {
    LoadLocal = false;
    MiScroll = 'html';
    MiGraph = 'templates/cherapp/CherApp/highslide/graphics/';
}

function $_GET(key) {
    var p = window.location.search;
    p = p.match(new RegExp(key + '=([^&=]+)'));
    return p ? p[1] : false;
}

var project = '&project='+$_GET('project');

if (!$_GET('app'))
    App = 'cherkizovo';
else {
    App = $_GET('app');
}

var hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
var hex = function(x) {
        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }
    //Function to convert rgb color to hex format
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

jQuery.fn.center = function() {
    this.css("position", "absolute");
    this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
    this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    return this;
}
jQuery.fn.nocenter = function() {
    this.css("position", "");
    this.css("top", '');
    this.css("left", '');
    return this;
}

hs.graphicsDir = MiGraph;
hs.align = 'center';
hs.transitions = ['expand', 'crossfade'];
hs.wrapperClassName = 'dark borderless floating-caption';
hs.outlineType = 'rounded-white';
hs.fadeInOut = false;
hs.transitionDuration = 1000;
hs.numberPosition = 'caption';
hs.expandDuration = 300;
hs.restoreDuration = 300;
hs.showCredits = false;
hs.dimmingOpacity = 0.8;
hs.dimmingDuration = 10;

// Add the controlbar
/*if (hs.addSlideshow) hs.addSlideshow({
    //slideshowGroup: 'group1',
    interval: 3000,
    repeat: false,
    useControls: true,
    fixedControls: 'fit',
    overlayOptions: {
        opacity: .75,
        position: 'bottom center',
        hideOnMouseOut: true
    }
});*/

function SpLoading(act) {
    if (act) {
        $('body').css('background-color', 'blak');
        $('body').append('<img src="cherapp/images/loadingblack.gif" id="idloadingblack">');
    } else {
        $('body').css('background-color', '');
        $('@idloadingblack').remove();
    }
}

function AddTemplate(elem) {
    html = `
    <div class="ButHv">
    <fieldset id="idSablon" class="SaveTemplate">
          <legend>
          Выбрать шаблон...
          </legend>
          <div id="SablTable" style="Display:none">
          </div>
    </fieldset>
    </div>`;
    $('.modal-footer .btn-primary').text('Выбрать');

    $newElem = $(elem).clone();
    tempelem = $(elem);
    $('#right_modal .modal-body').append('<div id="Idcontent"></div>').parent().find('#Idcontent').append($newElem);

    if ($(tempelem).next('UL')[0]) {
        $('#right_modal .modal-body').append('<div id="UlElem"></div><div id="tempUlElem" style="display:none"></div>');
        $temp = $(tempelem).next('UL').clone();
        $temp2 = $temp.find('li').children('UL').remove();
        $temp.appendTo('#tempUlElem');
        $('#UlElem').append('<div class="dd" id="nestable"><ul class="dd-list"></ul></div>');
        $('#tempUlElem li').each(function(index, el) {

            ($(el).find('.bzVop')[0]) ? txt = $(el).find('.bzVop').text(): txt = "";

            if (txt == "") {
                ($(el).find('.table')[0]) ? txt = "Таблица": txt = "";
            }

            if (txt == "") {
                ($(el).find('span')[0]) ? txt = $(el).text(): txt = "";
            }


            $('#UlElem ul').append('<li class="dd-item dd3-item"><div class="dd-handle dd3-handle dd-hide"></div><div class="dd3-content">' + txt + '</div></li>');
        });
        $('#UlElem ul').append('<li class="dd-item dd3-item"><div class="dd-handle dd3-handle"></div><div class="dd3-content dd-New">NEW</div></li>');
        $('#tempUlElem').remove();

    } else {
        $('#right_modal .modal-body').append('<div id="UlElem"></div>');
        $('#UlElem').append('<div class="dd" id="nestable"><ul class="dd-list"><li class="dd-item dd3-item"><div class="dd-handle dd3-handle"></div><div class="dd3-content dd-New">NEW</div></li></ul></div>');
    }
    $('#nestable').nestable({
        maxDepth: 0,
        group: 0
    })

    $('#right_modal .modal-body').append(html);
    TemplateHtml($('#right_modal .modal-body #SablTable'), false);

    $('#right_modal .modal-footer .btn-primary').unbind('click');
    $('#right_modal .modal-footer .btn-primary').on('click', function() {
        if ($('.PokazTempl').css('display') == 'none') {
            Toast.create("Предупреждение", "Шаблон не выбран!", TOAST_STATUS.WARNING, 3000);
        } else {
            if ($('#right_modal .modal-body [data="Save"]')[0]) {
                $('#right_modal .modal-body [data="Save"]').click();
            }
            aps = 0;
            $('#UlElem LI').each(function(index, el) {
                if ($(el).find('.dd-New')[0]) {
                    aps = index;
                    return false;
                }
            })
            if ($(tempelem).closest('LI').find('UL')[0]) {
                if (aps > 0)
                    $(tempelem).closest('LI').find('UL').eq(0).find('LI').eq(aps - 1).after('<li>' + $('.PokazTempl').html() + '</li>')
                else
                    $(tempelem).closest('LI').find('UL').eq(0).prepend('<li>' + $('.PokazTempl').html() + '</li>')
            } else {
                $(tempelem).closest('LI').append('<ul><li>' + $('.PokazTempl').html() + '</ul></li>');
            }
            ProverTempBol();
            ActiveTable();
            SaveTemplate();
        }
    });
}

function ModalCreate(elem, comand = "") {
    cls = $(elem).attr('class');
    $el = $(elem);
    /* if (cls == 'expand') {
         
     } else {
         $el = $(elem);
     }*/
    Dhtml = '';
    Vhtml = '';
    if ($el.closest('LI').find('UL')[0]) {
        Vhtml = Vhtml + `<div class="clCheckDerev"><label><input type="checkbox" id="IdShowDerev" /> Показать всё дерево</label></div>`;
    }

    ($el.attr('id')) ? ID = $el.attr('id'): ID = "";
    ($el.attr('Class')) ? Class = $el.attr('Class'): Class = "";


    if ((comand == "") && (cls == 'bzBlock')) {
        ($el.find('[data="RunExe"]').attr('data-pzap')) ? pzap = $el.find('[data="RunExe"]').attr('data-pzap'): pzap = "";
        Dhtml = Dhtml + `
        <div class="clCheck">
        <label><input type="checkbox" id="IdCopyBuf" dataOn="copy"/> Копировать в буффер</label>
        <label><input type="checkbox" id="IdOpenDir" dataOn="OpenDir"/> Открыть каталог</label>
        <label><input type="checkbox" id="IdRun" dataOn="RunExe"/> Запустить файл</label>
        </div>
        <div class="modForm" style="display:none" id="IdParamRun"><span>Параметры запуска:</span><input type="text" value="` + pzap + `" /></div>
        `;
    }

    html = `
    <div class="ButHv">
    <fieldset id="idSablon" class="SaveTemplate">
          <legend>
          Сохранить шаблон...
          </legend>
          <div id="SablTable" style="Display:none">
          </div>
    </fieldset>
    </div>
        <div class="modParam">
            <div class="modForm"><span>ID:</span><input id="valId" type="text" value="` + ID + `" /></div>
            <div class="modForm"><span>Class:</span><input id="valClass" type="text" value="` + Class + `" /></div>
            ` + Dhtml + `
        </div>
        
    `;

    html = Vhtml + html;

    tempelem = $el;
    TempComand = comand;
    $newElem = $el.clone();
    $('#right_modal .modal-body').append('<div id="Idcontent"></div>').parent().find('#Idcontent').append($newElem);
    if ($('#right_modal .modal-body #Idcontent .bzBlock')[0])
        $('#right_modal .modal-body #Idcontent .bzBlock').css('min-height', '');
    $('#right_modal .modal-body').append(html);
    $('#right_modal .modal-body [app="true"]').css('display', '');
    TempBol = false;
    //TempComand = 'edit';

    if (comand == "tables") {
        ($el.find('.table').css('max-width') != 'none') ? mWidth = $el.find('.table').css('max-width'): mWidth = "";
        colonk = '';
        $("#right_modal .modal-body .table th").each(function(index, el) {
            colonk = colonk + $(el).text() + "\n";
        })
        if (colonk.length > 1)
            colonk = colonk.substring(0, colonk.length - 1);
        $('#right_modal .modal-body #Idcontent .table tr').css('display', '');
        $('#right_modal .modal-body').append(`
            <div class="modForm"><span>Max-width:</span><input id="mwidth" type="text" value="` + mWidth + `" /></div>
            <div class="modForm"><span>Колонки:</span><textarea style="height:120px" id="colonk">` + colonk + `</textarea></div>
            <div class="clCheck">
            <label><input type="checkbox" id="IdTablSearch" dataOn="data-search"/> Включить поиск</label>
            <label><input type="checkbox" id="IdTablSort" dataOn="data-sort"/> Включить сортировку</label>
            <label><input type="checkbox" id="IdEditTab" dataOn="data-edittd"/> Редактор в ячейках</label>
            <div class="CheckInt">
                <label><input type="checkbox" id="IdPagination" dataOn="data-pagin"/> Максимум на страницу</label> 
                <input style="display:none" name="state" step="1" type="number" id="IdMaxTabl" value="1" min="1" dataOn="data-maxpage"/></div>
            </div>
        `);

        $('#IdTablSearch').prop('checked', $('#right_modal .modal-body .table').attr('data-search') == 'true');
        $('#IdTablSort').prop('checked', $('#right_modal .modal-body .table').attr('data-sort') == 'true');
        $('#IdPagination').prop('checked', $('#right_modal .modal-body .table').attr('data-pagin') == 'true');
        $('#IdEditTab').prop('checked', $('#right_modal .modal-body .table').attr('data-edittd') == 'true');
        $('#IdMaxTabl').val($('#right_modal .modal-body .table').attr('data-maxpage'));

        $("#IdPagination:checkbox").on("change", function() {
            if ($(this).is(':checked')) {
                $(this).closest('.CheckInt').find('#IdMaxTabl').css('display', '');
            } else {
                $(this).closest('.CheckInt').find('#IdMaxTabl').css('display', 'none');
            }
        });

        $('#IdMaxTabl').on('change', function() {
            $('#right_modal .modal-body [' + $(this).attr('dataOn') + ']').attr($(this).attr('dataOn'), $(this).val());
        })

        $(".clCheck INPUT:checkbox").on("change", function() {
            $('#right_modal .modal-body [' + $(this).attr('dataOn') + ']').attr($(this).attr('dataOn'), $(this).is(':checked'));
        });
        $('.clCheck INPUT:checkbox').change();
    }

    if (comand == "EditBlock") {
        dhtml = `<div class="modParam"><div class="clCheck">
        <label><input type="checkbox" id="IdBlockRam"/> Блок в рамке</label>
        <span style="display:none">Закруглить края:<input id="IdRamRadius" step="1" type="number" value="0" min="0" style="width:50px" /></span>
        <span style="display:none">Отступ:<input id="IdPadding" step="1" type="number" value="0" min="0" style="width:50px" /></span>
        <span style="display:none">Цвет рамки:<input id="IdColor" type="color"/></span>
        <span> Ширина:<input type="text" id="IdWidth" style="width:120px"/></span>
        </div></div>`;

        dhtml = dhtml + `
        <div class="ButHv">
        <fieldset id="idAjax" class="SaveTemplate">
              <legend>
              Подключить AJAX...
              </legend>
              <div id="IdMessaTempal" style="display:none"></div>
              <div id="idAjaxForm" style="display:none">
              </div>
        </fieldset>
        </div>`

        $('#right_modal .modal-body').append(dhtml);

        $('#IdBlockRam').prop('checked', $('#right_modal .modal-body #Idcontent DIV:first').css('border').split(' ')[1] == 'solid');
        $('#IdRamRadius').val($('#right_modal .modal-body #Idcontent DIV:first').css('border-radius').replace('px', ''));
        $('#IdPadding').val($('#right_modal .modal-body #Idcontent DIV:first').css('padding').replace('px', ''));
        // alert(rgb2hex($('#right_modal .modal-body #Idcontent DIV:first')[0].style.borderColor));
        $('#IdWidth').val($('#right_modal .modal-body #Idcontent DIV:first').css('width'));
        $('#IdColor').val(rgb2hex($('#right_modal .modal-body #Idcontent DIV:first')[0].style.borderColor));

        if ($('#Idcontent DIV:first').attr('ajax') == 'true')
            FormAjx($('#idAjaxForm')[0]);

        $("#IdWidth:checkbox").on("change", function() {
            ($(this).is(':checked')) ? wit = '100%': wit = 'auto';
            $('.modal-right #Idcontent #Idedit').css('width', wit);
        })

        $("#IdBlockRam:checkbox").on("change", function() {
            ($(this).is(':checked')) ? hid = '': hid = 'none';
            $('#IdRamRadius').closest('SPAN').css('display', hid);
            $('#IdColor').closest('SPAN').css('display', hid);
            $('#IdPadding').closest('SPAN').css('display', hid);
            (hid == '') ? $('.modal-right #Idcontent #Idedit').css('border', '1px solid'): $('.modal-right #Idcontent #Idedit').css('border', '');
            $('.modal-right #Idcontent #Idedit').css('border-color', $('#IdColor').val());
        });
        $('#IdBlockRam:checkbox').change();
        $("#IdRamRadius").on("change", function() {
            $('.modal-right #Idcontent #Idedit').css('border-radius', $(this).val() + 'px');
        })
        $("#IdPadding").on("change", function() {
            $('.modal-right #Idcontent #Idedit').css('padding', $(this).val() + 'px');
        })
        $("#IdColor").on("input", function() {
            $('.modal-right #Idcontent #Idedit').css('border-color', $(this).val());
        })
        $("#IdWidth").on("input", function() {
            $('.modal-right #Idcontent #Idedit').css('width', $(this).val());
        })
    }

    if (comand != 'tables') {
        ActHover('edit');
    } else {
        $("#right_modal .modal-body .table th, .modal-body .table td", event.delegateTarget).remove(":nth-last-child(1)");
        $('#right_modal .modal-body .table .fancySearchRow').remove();
    }

    $("#IdShowDerev:checkbox").on("change", function() {
        if ($(this).is(':checked')) {
            // alert($(TempElem).closest('LI').find('ul').eq(0).html());
            $newElem.after($(tempelem).closest('LI').find('ul').eq(0).clone());
            if ($newElem.parent().find('ul').find('.table')[0])
                $newElem.parent().find('ul').find(".table th, .table td", event.delegateTarget).remove(":nth-last-child(1)");
            $newElem.parent().find('ul').css('display', '');
            ActHover('edit');
        } else {
            $newElem.parent().find('ul').remove();
        }
    });


    if ((comand == "") && (cls == 'bzBlock')) {

        if ($('#right_modal .modal-body [data="copy"]').attr('app') != 'false') {
            $('#right_modal .modal-body #IdCopyBuf').attr('checked', 'checked');
        } else {
            $('#right_modal .modal-body #IdCopyBuf').removeAttr('checked');
        }

        if ($('#right_modal .modal-body [data="OpenDir"]').attr('app') != 'false') {
            $('#right_modal .modal-body #IdOpenDir').attr('checked', 'checked');
        } else {
            $('#right_modal .modal-body #IdOpenDir').removeAttr('checked');
        }
        if ($('#right_modal .modal-body [data="RunExe"]').attr('app') != 'false') {
            $('#right_modal .modal-body #IdRun').attr('checked', 'checked');
            $('#right_modal .modal-body .modParam').find('#IdParamRun').css('display', '');
        } else {
            $('#right_modal .modal-body #IdRun').removeAttr('checked');
        }


        $("#IdRun:checkbox").on("change", function() {
            if ($(this).is(':checked')) {
                $(this).closest('.modParam').find('#IdParamRun').css('display', '');
            } else {
                $(this).closest('.modParam').find('#IdParamRun').css('display', 'none');
            }
        });

        $(".clCheck INPUT:checkbox").on("change", function() {
            if ($(this).is(':checked')) {
                $('#right_modal .modal-body [data="' + $(this).attr('dataOn') + '"]').css('display', '');
                $('#right_modal .modal-body [data="' + $(this).attr('dataOn') + '"]').attr('app', 'true');
            } else {
                $('#right_modal .modal-body [data="' + $(this).attr('dataOn') + '"]').css('display', 'none');
                $('#right_modal .modal-body [data="' + $(this).attr('dataOn') + '"]').attr('app', 'false');
            }
        });
    }




    $('#right_modal .modal-footer .btn-primary').unbind('click');
    $('#right_modal .modal-footer .btn-primary').on('click', function() {
        if ($('#right_modal .modal-body [data="Save"]')[0]) {
            $('#right_modal .modal-body [data="Save"]').click();
        }
        ID = $('#valId').val();
        Class = $('#valClass').val();
        $newElem.attr('id', ID);
        $newElem.attr('Class', Class);

        if (TempComand == "tables") {
            if ($.trim($('#colonk').val()) == '') {
                Errors('Заполните колонки!');
                ProverTempBol();
                return;
            }
            $(tempelem).attr('id', ID);
            $(tempelem).attr('Class', Class);
            mWidth = $('#mwidth').val();

            $tabl = $(tempelem).find('.table');
            $newTabl = $newElem.find('.table');

            $tabl.attr('data-search', $newTabl.attr('data-search'));
            $tabl.attr('data-sort', $newTabl.attr('data-sort'));
            $tabl.attr('data-pagin', $newTabl.attr('data-pagin'));
            $tabl.attr('data-maxpage', $newTabl.attr('data-maxpage'));
            $tabl.attr('data-edittd', $newTabl.attr('data-edittd'));

            if ($newTabl.attr('data-edittd') == 'true') {
                $tabl.find('tbody td').each(function(index, el) {
                    if (!$(this).find('#Idedit')[0])
                        $(this).html('<div class="bzBlock" id="Idedit">' + $(this).html() + '</div>')

                })
            } else {
                $tabl.find('tbody td').each(function(index, el) {
                    $(this).text($.trim($(this).text()));
                })
            }

            if (mWidth != "")
                $tabl.css('max-width', mWidth);
            tempArr = $.trim($('#colonk').val());
            massArr = tempArr.split('\n');
            //alert(massArr.length);
            for (let i = 0; i < massArr.length; i++) {
                if ($tabl.find('th').eq(i + 1)[0]) {
                    $tabl.find('th').eq(i).text(massArr[i]);
                } else {
                    $tabl.find('tr').each(function() {
                        $(this).find('th').eq(i - 1).after('<th>' + massArr[i] + '</th>');
                        $(this).find('td').eq(i - 1).after('<td></td>');
                    });
                }
            }
            if ($tabl.find('th').length > massArr.length) {
                for (let i = $tabl.find('th').length - 1; i > massArr.length; i--) {
                    a = i;
                    $tabl.find('th', event.delegateTarget).remove(":nth-child(" + a + ")");
                    $tabl.find('td', event.delegateTarget).remove(":nth-child(" + a + ")");
                }
                $tabl.find('[name="bstable-actions"]').attr('name','');
                ActiveTable();
            }

        }
        if ((TempComand == "") || (TempComand == "EditBlock")) {
            $('#right_modal .modal-title').text('');
            $elcop = $('#right_modal .modal-body #Idcontent');
            if ((cls == 'bzBlock') && (TempComand == ""))
                $elcop.find('[data="RunExe"]').attr('data-pzap', $('.modal-body #IdParamRun input').val());
            $(tempelem).after($elcop.html());
            $(tempelem).remove();
        }

        //  $('#right_modal').hide();
        //   $('.modal-backdrop').hide();
        //$('data-dismiss="modal"').click();
        ProverTempBol();
        ProverActive();
        SaveTemplate();
        //  ActHover();


    })
    $('.SaveTemplate legend').unbind();
    $('.SaveTemplate legend').on('click', function() {
        if ($(this).parent().attr('id') == "idSablon") {
            TemplateHtml($(this).parent().find('#SablTable'));
        }
        if ($(this).parent().attr('id') == "idAjax") {
            FormAjx($(this).parent().find('#idAjaxForm'));
        }
    })

    HigslideDeActive();
}

function FormAjx(elem) {
    $glem = $('#Idcontent div:first');
    if ($(elem).css('display') != "none") {
        $(elem).slideToggle("fast");
        $(elem).closest('fieldset').find('.ButHv').remove();
        $(elem).closest('fieldset').css('min-height', '');
        $(elem).closest('fieldset').css('width', '');
        $(elem).closest('.ButHv').css('width', '');
        $(elem).closest('.ButHv').css('float', 'right');
        $(elem).prevAll('legend').html('Подключить AJAX...');
        $glem.attr('ajax', 'false');
        $glem.find('.clAjax').remove();
        return;
    }
    $(elem).html('');
    html = `
    <div id="idFAjax">
    <div class="modForm" id="IdaBaza"><span>База:</span><input dataOn="ajax-baza" type="text" value="" /></div>
    <div class="modForm" id="IdaTabl"><span>Таблица:</span><input dataOn="ajax-tabl" type="text" value="" /></div>
    <div class="modForm" id="IdaId"><span>Id:</span><input dataOn="ajax-id" type="number" step="1" min="0" value="" style="width:auto"/><a href="#" onClick="return false;">Создать</a></div>
    <div class="modForm" id="IdaColumn"><span>Колонка:</span><input dataOn="ajax-column" type="text" value="" /></div>
    </div>
    <div class="modForm"><span></span><a href="#" id="idUpdateAjax" onClick="LoadAjax($('#Idcontent div:first'));return false;">Обновить данные</a></div>
    <div class="clCheck" style="float:right">
        <label><input type="checkbox" id="IdaHistory"/> Вести историю изменений</label>
    </div>
    `;
    $(elem).append(html);
    $glem.attr('ajax', 'true');
    if (!$glem.find('.clAjax')[0])
        $glem.prepend('<div class="clAjax"><img src="CherApp/images/ajax.png"></div>');
    $('#IdaHistory').prop('checked', $('#Idcontent div:first').attr('ajax-history') == 'true');
    $('#IdaBaza input').val($('#Idcontent div:first').attr('ajax-baza'));
    $('#IdaTabl input').val($('#Idcontent div:first').attr('ajax-tabl'));
    $('#IdaId input').val($('#Idcontent div:first').attr('ajax-id'));
    $('#IdaColumn input').val($('#Idcontent div:first').attr('ajax-column'));
    $(elem).prevAll('legend').html('<b>AJAX Подключён...</b>');
    $(elem).closest('.ButHv').css('width', '100%');
    $(elem).slideToggle("fast");
    $('#idFAjax input').on('input', function() {
        $('#Idcontent div:first').attr($(this).attr('dataOn'), $(this).val());
    })
    $("#IdaHistory:checkbox").on("change", function() {
        ($(this).is(':checked')) ? atr = 'true': atr = 'false';
        $('#Idcontent div:first').attr('ajax-history', atr);
    })

    $('#IdaId A').on('click', function() {
        $glem = $('#Idcontent div:first');
        if (timeBol)
            clearTimeout(timeBol);
        $.post(hv_root + "engine/ajax/controller.php?mod=cherapp", {
            comand: 'CreateAjax',
            baza: $glem.attr('ajax-baza'),
            tabl: $glem.attr('ajax-tabl'),
            column: $glem.attr('ajax-column'),
        }, function(b) {
            $('#idAjax #IdMessaTempal').css('display', 'none');
            km = b.substring(0, 2);
            b = b.substr(2);
            $('#idAjax #IdMessaTempal').html('');
            if (km == 'Ok') {
                $('#idAjax #IdMessaTempal').html('<span class="Ok">Успешно создан ID - ' + b + '</span>');
                $('#idAjax #IdMessaTempal').slideToggle('fast');
                $('#IdaId input').val(b);
                $('#Idcontent div:first').attr('ajax-id', b);
                timeBol = setTimeout(() => {
                    $('#idAjax #IdMessaTempal').slideToggle('fast')
                }, 5000);
            } else {
                $('#idAjax #IdMessaTempal').html(b);
                ObrabotErr($('#idAjax #IdMessaTempal'));
                $('#idAjax #IdMessaTempal').slideToggle('fast');
                timeBol = setTimeout(() => {
                    $('#idAjax #IdMessaTempal').slideToggle('fast', function() {
                        $(this).html('');
                    })
                }, 15000);
            }

        })
    })
}

function ObrabotErr(elem) {
    $gelem = $(elem);
    if ($gelem.find('style')[0]) {
        $gelem.find('style').text($('#idAjax #IdMessaTempal style').text().replace('body', 'body2'));
        $gelem.find('div:first').css('width', '100%');
        $gelem.find('div:first').css('margin', '');
    }

}

ax = 0;
axtem = 0;

function LoadAjax(elem, full = -1) {
    $glem = $(elem);
    $.post(hv_root + "engine/ajax/controller.php?mod=cherapp", {
            comand: 'LoadAjax',
            baza: $glem.attr('ajax-baza'),
            tabl: $glem.attr('ajax-tabl'),
            column: $glem.attr('ajax-column'),
            id: $glem.attr('ajax-id'),
            index: full
        }, function(b) {
            km = b.substring(0, 2);
            b = b.substr(2);
            if (km == 'Ok') {
                if (full == -1) {
                    $glem.html(b);
                    if (!$glem.find('.clAjax')[0])
                        $glem.prepend('<div class="clAjax"><img src="CherApp/images/ajax.png"></div>');
                } else {
                    a = b.split('|')[0];
                    b = b.substr(a.length + 1);
                    ax = parseInt(a);
                    $('[ajax-temp=' + a + ']').html(b);
                    if (!$('[ajax-temp=' + a + ']').find('.clAjax')[0])
                        $('[ajax-temp=' + a + ']').prepend('<div class="clAjax"><img src="CherApp/images/ajax.png"></div>');
                    if (Tempajaxind == ax + 1 + axtem) {
                        LoadStorag();
                        TempBol = false;
                    }
                }
            } else {
                ax = ax +1;
                axtem = ax;
                Errors(b, 15000);
                ObrabotErr($('.toast-body'));
               // if (Tempajaxind == ax - 1) {
                    LoadStorag();
                    TempBol = false; 
               // }
            }

        }).done(function() {
            //alert("second success");
        })
        .fail(function(b) {
            Errors('Ошибка при получении блока Ajax!<br>'+b);
            ax = ax +1;
            if (Tempajaxind == ax ) {
                LoadStorag();
                TempBol = false;
            }
        })
        .always(function() {

        });
}

function SaveAjax(elem) {
    $glem = $(elem);
    html = $glem.html();
    $.post(hv_root + "engine/ajax/controller.php?mod=cherapp", {
        comand: 'SaveAjax',
        baza: $glem.attr('ajax-baza'),
        tabl: $glem.attr('ajax-tabl'),
        column: $glem.attr('ajax-column'),
        id: $glem.attr('ajax-id'),
        template: html
    }, function(b) {
        km = b.substring(0, 2);
        b = b.substr(2);
        if (km == 'Ok') {
            YesOk('Блок AJAX сохранён!');
            HigslideActive();
        } else {
            Errors(b, 15000);
            ObrabotErr($('.toast-body')[0]);
        }
    })
}

function TemplateHtml(elem, pokazsave = true) {
    if ($(elem).css('display') != "none") {
        $(elem).slideToggle("fast");
        $(elem).closest('fieldset').find('.ButHv').remove();
        $(elem).closest('fieldset').css('min-height', '');
        $(elem).closest('fieldset').css('width', '');
        $(elem).closest('.ButHv').css('width', '');
        $(elem).closest('.ButHv').css('float', 'right');

        return;
    }
    $(elem).html('');
    $(elem).append('<img src="CherApp/images/Loading2.gif" class="LoadGif"/>');
    $(elem).slideToggle("fast");
    $TempElem = $(elem);
    $.post(hv_root + "engine/ajax/controller.php?mod=cherapp", {
            comand: 'LoadTemplate',
        }, function(b) {
            $TempElem.append(`<div id="IdMessaTempal"></div><table class="TabSablon" style="Display:none;">` + b + `</table>`);
            pok = '';
            if (!pokazsave)
                pok = 'style="display:none"';
            $TempElem.closest('fieldset').find('legend').append(`<div class="ButHv" ` + pok + `>
            <div class="Knop" style="display:none"><img src="CherApp/images/save.png"/><span>Сохранить</span></div>
            </div>`);
            $TempElem.append('<div class="PokazTempl"></div>');

            $(".TabSablon").fancyTable({
                // sortColumn:3,// column number for initial sorting
                sortOrder: 'descending', // 'desc', 'descending', 'asc', 'ascending', -1 (descending) and 1 (ascending)
                sortable: false,
                // pagination:[pagbol],// default: false
                searchable: true,
                globalSearch: true,
                pagination: false,
                inputPlaceholder: ""
                    // perPage: 5,
                    // paginationClass:"btn-light",
                    //  paginationClassActive:"btactive",
                    // globalSearchExcludeColumns: [2,5]// exclude column 2 & 5
            });

            $(".TabSablon TD").on('click', function() {
                if (TempBol) return;
                $('.TabSablon .fancySearchRow input').val($(this).text());
                $('.TdClick').removeClass('TdClick');
                $(this).addClass('TdClick');
                poluchtempl($('.TabSablon .fancySearchRow input').val());

                // $('.fancySearchRow input').change();

            })

            $(".TabSablon TD").hover(function() {
                if (TempBol) return;
                $(this).append('<div class="TablButRem"><img src="CherApp/images/edit.png" data="sblEdit"><img src="CherApp/images/delete.png" data="sblDelete" data-toggle="SablonDel"></div>');
                $TempElem = $(this);
                $('[data-toggle="SablonDel"]').jConfirm({
                    question: 'Точно удалить?',
                    confirm_text: 'Да',
                    deny_text: 'Нет',
                    theme: 'white'
                }).on('confirm', function(e) {
                    Name = $.trim($TempElem.text());
                    $.post(hv_root + "engine/ajax/controller.php?mod=cherapp", {
                        comand: 'DeleteTemplate',
                        Name: Name
                    }, function(b) {
                        km = b.substring(0, 2);
                        b = b.substr(2);
                        if (km == 'Ok') {
                            $TempElem.parent().remove();
                            $('.TabSablon .fancySearchRow input').val('');
                            $('.PokazTempl').css('display', 'none');
                            $('#IdMessaTempal').html('<span class="Ok">' + b + '</span>');
                            setTimeout(() => {
                                $('#IdMessaTempal').slideToggle('fast', function() {
                                    $(this).find('span').remove();
                                })
                            }, 3000);
                        } else {
                            $('#IdMessaTempal').html(b);
                        }

                    })
                }).on('deny', function(e) {
                    //  console.log("deny");
                }).on('jc-show', function(e, value) {
                    //  console.log('js-show');
                }).on('jc-hide', function(e) {
                    TempBol = false;
                    $('.TablButRem').remove();
                });

                $('[data="sblDelete"]').on('click', function() {
                    $(this).parent().parent().click();
                    TempBol = true;
                    // event.stopPropagation();
                })

                $('[data="sblEdit"]').on('click', function() {
                    $TempElem.click();
                    TempBol = true;
                    $(this).closest('.TablButRem').remove();
                    texName = $TempElem.text();
                    $TempElem.attr('data-temp', texName);
                    $TempElem.text('');
                    $TempElem.prepend('<input type="text" value="' + texName + '"/>');
                    $TempElem.append('<div class="TablButRem"><img src="CherApp/images/save.png" data="sblSave"><img src="CherApp/images/Cancel.png" data="sblCancel"></div>');
                    $TempElem.find('INPUT').focus();
                    $('[data="sblCancel"]').on('click', function() {
                        $TempElem.text('');
                        texName = $TempElem.attr('data-temp');
                        $TempElem.removeAttr('data-temp');
                        $TempElem.text(texName);
                        TempBol = false;
                        event.stopPropagation();
                    })
                    $('[data="sblSave"]').on('click', function() {
                        texName = $TempElem.find('INPUT').val();
                        Name = $TempElem.attr('data-temp');
                        $TempElem.removeAttr('data-temp');
                        $TempElem.text(texName);
                        TempBol = false;
                        $.post(hv_root + "engine/ajax/controller.php?mod=cherapp", {
                            comand: 'EditTemplate',
                            Name: Name,
                            NameNew: texName
                        }, function(b) {
                            km = b.substring(0, 2);
                            b = b.substr(2);
                            if (km == 'Ok') {
                                $('#IdMessaTempal').html('<span class="Ok">' + b + '</span>');
                                setTimeout(() => {
                                    $('#IdMessaTempal').slideToggle('fast', function() {
                                        $(this).find('span').remove();
                                    })
                                }, 3000);
                            } else {
                                $('#IdMessaTempal').html(b);
                            }

                        })
                        event.stopPropagation();
                    })
                })

            }, function() {
                if (TempBol) return;
                $(this).find('.TablButRem').remove();
            })

            $('.TabSablon .fancySearchRow input').on('keydown', function() {
                $('.PokazTempl').css('display', 'none');
                $('.TdClick').removeClass('TdClick');
            })

            $('.LoadGif').slideToggle("fast", function() {
                $(this).remove();
            })

            $('.TabSablon').slideToggle("fast", function() {
                heig = $(elem).closest('fieldset').height();
                $(elem).closest('fieldset').css('min-height', heig + 'px');
                $(elem).closest('.ButHv').css('width', '100%');
                $TempElem.closest('fieldset').find('.Knop').slideToggle("fast");
                $('.TabSablon .fancySearchRow input').focus();
            });
            // $TempElem.closest('.ButHv').css('width', '100%');
            $TempElem.closest('fieldset').css('width', '92%');
            $TempElem.closest('.ButHv').css('float', 'left');
            ButClick()
        }).done(function() {
            //alert("second success");
        })
        .fail(function(b) {
            Errors('Ошибка при получение шаблонов!');
        })
        .always(function() {

        });
}

function ButClick() {
    $('.ButHv .Knop').unbind();
    $('.ButHv .Knop').on('click', function() {
        SaveSablon();
    })
};

function SaveSablon(da = 'no') {
    Name = $('.TabSablon .fancySearchRow INPUT').val();
    if ($.trim(Name) == "") {
        Toast.create("Предупреждение", "Введите имя файла!", TOAST_STATUS.WARNING, 3000);
        $('.TabSablon .fancySearchRow INPUT').focus();
        event.stopPropagation();
        return;
    }
    templ = $('.modal-body #idContent').html();
    $.post(hv_root + "engine/ajax/controller.php?mod=cherapp", {
            comand: 'SaveTemplate',
            Name: Name,
            Replac: da,
            Template: templ
        }, function(b) {

            km = b.substring(0, 2);
            b = b.substr(2);
            if (km == 'es') {
                $('#IdMessaTempal').html(b);
            } else
            if (km == 'Ok') {
                TemplateHtml($('.modal-body').find('#SablTable'));
            } else {
                $('#IdMessaTempal').html(b);
            }

        }).done(function() {
            //alert("second success");
        })
        .fail(function(b) {
            $('#IdMessaTempal').html('<span>Ошибка при получение шаблона!</span>' + b);
        })
        .always(function() {
            $('.LoadGif').slideToggle("fast", function() {
                $(this).remove();
            })
        });
    event.stopPropagation();
}

function poluchtempl(Name) {
    $('.PokazTempl').html('');
    $('.PokazTempl').css('display', 'block');
    $('.PokazTempl').append('<img src="CherApp/images/Loading2.gif" class="LoadGif"/>');
    $.post(hv_root + "engine/ajax/controller.php?mod=cherapp", {
            comand: 'PoluchTemplate',
            Name: Name
        }, function(b) {
            $('.PokazTempl').html(b);
            ActHover('edit');
            if (b == "") {
                $('#IdMessaTempal').css('display', 'block');
                $('#IdMessaTempal').html('<span>Шаблон не найден!</span>' + b);
                $('.PokazTempl').css('display', 'none');
                setTimeout(() => {
                    $('#IdMessaTempal span').slideToggle('fast', function() {
                        $(this).remove();
                    })
                }, 3000);
            }

        }).done(function() {
            //alert("second success");
        })
        .fail(function(b) {
            $('#IdMessaTempal').html('<span>Ошибка при получение шаблона!</span>' + b);
            $('.PokazTempl').css('display', 'none');
        })
        .always(function() {
            $('.LoadGif').slideToggle("fast", function() {
                $(this).remove();
            })
        });
}