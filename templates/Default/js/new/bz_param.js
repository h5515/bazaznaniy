$("#idparambz li").on('click', function() {
    $el = $(this);
    namebz = $el.closest('.logotype').find('.logo_title').text();
    $elem = $el.find('.popmenu');
    poper = $elem.attr('elem');

    $els = $el.closest('#idparambz');
    catid = $els.attr('cat')
    idcategory = $els.attr('idcat')
    project = '';
    project_id = '';
    if (catid == 2) {
        project = $els.attr('project');
        project_id = $els.attr('project_id');
    }
    if (poper == 'clearcash') {
        dt = {
            rezim: 'clearcash',
        }
        getajax('/php/add_bz.php', dt)
    }
    if (poper == 'edit_name') {
        kendo.prompt('Новое имя:', namebz).then(function(data) {
            dt = {
                rezim: 'izmenname',
                category: catid,
                idcategory: idcategory,
                namebaza: data,
                project: project,
                namebd: rus_to_latin($.trim(data))
            }
            getajax('/php/add_bz.php', dt)
        })
        $('.k-prompt .k-window-title').text('Изменить имя базы знаний: ' + namebz)
        $('.k-prompt').css('width', '450px')
    }
    if (poper == 'dostup') {
        if (!$('#iddostup')[0]) {
            $('#addbz').after('<div id="iddostup"></div>')
        }
        windostup = $('#iddostup').kendoWindow({
            width: '600px',
            title: 'Настройки доступа для ' + namebz,
            content: '/tpl/dostup_bz.php?idcat=' + idcategory + '&project=' + project_id + '&category=' + catid,
            visible: false,
            modal: true,
            pinned: false,
            resizable: false,
            autoFocus: true,
            open: function(e) {
                $('html, body').css('overflow', 'hidden')
                this.center()
            },
            close: function(e) {
                $(document).off('click', '.dostupitems .remove');
                $(document).off('click', '.clspis');
                setTimeout(() => {
                    $('#iddostup').remove();
                    $('.k-window').remove();
                    $('.combobox-options').remove();
                    $('html, body').css('overflow', '');
                }, 400);
            }
        }).data('kendoWindow')
        setTimeout(() => {
            windostup.open()
        }, 50);

    }
    if (poper == 'edit_obl') {
        if (!$('#ideditobloz')[0]) {
            $('body').after('<div id = "ideditobloz" > < /div>')
        }
        editobloz = $('#ideditobloz').kendoWindow({
            width: '500px',
            title: 'Редактировать обложку',
            content: '/tpl/edit_bz_obloz.html',
            visible: false,
            modal: true,
            pinned: false,
            resizable: false,
            autoFocus: true,
            // position: {
            //     top: 120,
            //     left: "35%",
            // },
            open: function(e) {
                $('html, body').css('overflow', 'hidden')
                if (catid == 2) {
                    prog = "project='" + project + "' project_id='" + project_id + "'";
                } else
                    prog = '';
                $('#id_edit_obloz .dle-center').append("<ol sid='" + idcategory + "' cat='" + catid + "' idcat='" + idcategory + "' " + prog + " id='gbobloz'><button class='tlbutton'></button></ol>")
                $els = $('#titlebzgl').clone().appendTo('#id_edit_obloz .dle-center .tlbutton');
                //$els.find('img').css('transform', 'scale(1.5)').css('margin-right', '7px');
                //$els.attr('id', 'ideditcategor').attr('data-cat', idcategory);
                // $els.find('img').width(28).height(28);
                $('#id_edit_obloz .dle-center a').attr('href', '#').attr('onclick', 'return false;');
                this.center()
            },
            close: function(e) {
                $('html, body').css('overflow', '')
                setTimeout(() => {
                    $('#id_edit_obloz .dle-center').html('')
                }, 400)
            }
        }).data('kendoWindow')
        setTimeout(() => {
            editobloz.open()
        }, 50)
    }
    if (poper == 'arhive') {
        kendo.confirm('Архивировать базу знаний: <b>' + namebz + '?</b>').then(function() {
            dt = {
                rezim: 'arhive',
                category: catid,
                idcategory: idcategory,
                project: project
            }
            getajax('/php/add_bz.php', dt)
        })
        $('.k-window-title').text('Архивировать?')
    }
    if (poper == 'noarhive') {
        kendo.confirm('Восстановить базу знаний: <b>' + namebz + '?</b>').then(function() {
            dt = {
                rezim: 'noarhive',
                category: catid,
                idcategory: idcategory,
                project: project
            }
            getajax('/php/add_bz.php', dt)
        })
        $('.k-window-title').text('Архивировать?')
    }
    if (poper == 'delete') {
        kendo.confirm('Точно удалить базу знаний: <b>' + namebz + '?</b> Все статьи будут удалены.').then(function() {
            kendo.confirm('Действительно удалить базу знаний: <b>' + namebz + '?</b> будет удалено всё что с ней связано.').then(function() {
                dt = {
                    rezim: 'delete',
                    user_hash: dle_login_hash,
                    category: catid,
                    idcategory: idcategory,
                    project: project
                }
                getajax('/php/add_bz.php', dt)
            })
        })
        $('.k-window-title').text('Удалить?')
    }
})