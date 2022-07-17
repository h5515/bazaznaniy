htmlm = `
<ul id='menu' style='display:none;'>
  <li><span class='popmenu polosniz' elem='menu_del'></span></li>
  <li><span class='k-icon k-i-lock'></span><span class='popmenu' elem='dostup'> Доступ </span></li>
  <li><span class='k-icon k-i-edit-tools'></span><span class='popmenu' elem='edit_name'> Редактировать имя </span></li>
  <li><span class='k-icon k-i-image-edit'></span><span class='popmenu' elem='edit_obl'> Изменить обложку </span></li>
  <li><span class='k-icon k-i-file-zip'></span><span class='popmenu' elem='arhive'> Архивировать </span></li>
  <li><span class='k-icon k-i-delete'></span><span class='popmenu' elem='delete'> Удалить </span></li>
</ul>
`;


but = localStorage.getItem('catbut');
if (but) {
    localStorage.removeItem('catbut');
    $('.clmacategory [categor="' + but + '"]').click();
}


$('#dle-content .dle-center').append(htmlm)
var menus
menus = $('#menu').kendoContextMenu({
    target: '.edit_btn a',
    // filter: ".product",
    animation: {
        open: { effects: 'fadeIn' },
        duration: 200
    },
    showOn: 'click',
    open: openmenu,
    select: selectmenu,
    close: function(e) {
        menus.element.find('[elem=noarhive]').text(' Архивировать ').attr('elem', 'arhive')
    }
}).data('kendoContextMenu')

function openmenu(e) {
    $elem = $(e.target)
    namebz = $elem.closest('ol').find('.shottitle').text()
        // menus.enable(e.items[0], $(e.items[0]).hasClass("k-disabled"))
    var bg = $elem.closest('ol').find('.circleimg').css('background-image')
    bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, '')
    urls = $elem.closest('ol').find('.menuurl').attr('href')
    menus.remove(menus.element.children('li:first'))
    menus.insertBefore({
        text: namebz,
        imageUrl: bg,
        url: urls
    }, menus.element.children('li:first'))
    if ($elem.closest('ol').find('.bzarhive')[0]) {
        menus.element.find('[elem=arhive]').text(' Восстановить ').attr('elem', 'noarhive')
    }
}

function selectmenu(e) {
    $elem = $(e.target)
    namebz = $elem.closest('ol').find('.shottitle').text()
    poper = $(e.item).find('.popmenu').attr('elem')
    catid = $elem.closest('ol').attr('cat')
    idcategory = $elem.closest('ol').attr('idcat')
    project = '';
    project_id = '';
    if (catid == 2) {
        project = $elem.closest('ol').attr('project');
        project_id = $elem.closest('ol').attr('project_id');
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
            $('#addbz').after('<div id = "ideditobloz" > < /div>')
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

                if (project != '') {
                    project = '[project=' + project + ']'
                }

                $('[cat=' + catid + '][idcat=' + idcategory + ']' + project).clone().appendTo('#id_edit_obloz .dle-center')
                $('#id_edit_obloz .dle-center .edit_btn').remove()
                $('#id_edit_obloz .dle-center a').attr('href', '#').attr('onclick', 'return false;')
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
            kendo.confirm('Действительно удалить базу знаний: <b>' + namebz + '?</b> будет удалено всё что связано с ней.').then(function() {
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
}