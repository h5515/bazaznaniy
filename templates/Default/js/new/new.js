if ($('.fix_grid')[0]) {
    setTimeout(() => {
        $('.fix_grid').remove()
    }, 20000)
}

$('#addbz').kendoButton({
    icon: 'add',
    themeColor: "primary"
})


$('#addbz').click(function() {
    if (!$('#addbzwindow')[0]) {
        $(this).after('<div id = "addbzwindow" > < /div>')
    }
    addbz = $('#addbzwindow').kendoWindow({
        width: '500px',
        title: 'Создать базу знаний',
        content: '/tpl/add_bz.html',
        visible: false,
        modal: true,
        pinned: false,
        resizable: false,
        open: function(e) {
            $('html, body').css('overflow', 'hidden')
        },
        close: function(e) {
            $('html, body').css('overflow', '')
        }

    }).data('kendoWindow')
    setTimeout(() => {
        addbz.center().open()
    }, 50)
})

function rus_to_latin(str) {
    var ru = {
            'а': 'a',
            'б': 'b',
            'в': 'v',
            'г': 'g',
            'д': 'd',
            'е': 'e',
            'ё': 'e',
            'ж': 'j',
            'з': 'z',
            'и': 'i',
            'к': 'k',
            'л': 'l',
            'м': 'm',
            'н': 'n',
            'о': 'o',
            'п': 'p',
            'р': 'r',
            'с': 's',
            'т': 't',
            'у': 'u',
            'ф': 'f',
            'х': 'h',
            'ц': 'c',
            'ч': 'ch',
            'ш': 'sh',
            'щ': 'shch',
            'ы': 'y',
            'э': 'e',
            'ю': 'u',
            'я': 'ya',
            ' ': '_',
            '-': '_'
        },
        n_str = []

    str = str.replace(/[ъь]+/g, '').replace(/й/g, 'i')

    for (var i = 0; i < str.length; ++i) {
        n_str.push(
            ru[str[i]] ||
            ru[str[i].toLowerCase()] == undefined && str[i] ||
            ru[str[i].toLowerCase()].toUpperCase()
        )
    }
    return n_str.join('')
}

function IsJsonString(str) {
    try {
        JSON.parse(str)
    } catch (e) {
        return false
    }
    return true
}

function merge_options(obj1, obj2) {
    var obj3 = {}
    for (var attrname in obj1) {
        obj3[attrname] = obj1[attrname]
    }
    for (var attrname in obj2) {
        obj3[attrname] = obj2[attrname]
    }
    return obj3
}

function getajax(get, data) {
    ShowLoading('')
    dt = {
        ajax: true,
        user_hash: dle_login_hash
    }
    data = merge_options(dt, data)
    $.ajax({
        type: 'POST',
        url: get,
        data: data,
        // dataType: "json",
        timeout: 300000,
        success: function(b) {
            if (b.toLowerCase().indexOf('error') > -1) {
                $('.midside #content').prepend(`<div class="box berrors fix_grid" id="idblockerror"><b>Ошибка!</b><br>  ` + b + `</div>`)
                $('html, body').scrollTop(0)
                setTimeout(() => {
                    $('#idblockerror').remove()
                }, 20000)
            } else {
                if (b != '')
                    eval(b)
            }
            HideLoading('')
        },
        error: function(request, status, err) {
            alert('Ошибка: Полное описание ошибки в консоле браузера.')
            if (status == 'timeout') {
                console.log('Время ожидания сервера истекло. ' + err)
            } else {
                console.log(status + ' - ' + err)
            }
            HideLoading('')
        }
    })
}

function getajaxhtml(get, data, loadelem) {
    kendo.ui.progress($(loadelem), true)
    dt = {
        ajax_json: true,
        user_hash: dle_login_hash
    }
    data = merge_options(dt, data)
    $.ajax({
        type: 'POST',
        url: get,
        data: data,
        timeout: 300000,
        success: function(b) {
            if (IsJsonString(b)) {
                var bArray = JSON.parse(b)
                if (bArray['script_after'])
                    eval(bArray['script'])
                if (bArray['html'])
                    $(loadelem).html(bArray['html']);
                if (bArray['script'])
                    eval(bArray['script'])
            }
            kendo.ui.progress($(loadelem), false)
        },
        error: function(request, status, err) {
            alert('Ошибка: Полное описание ошибки в консоле браузера.')
            if (status == 'timeout') {
                console.log('Время ожидания сервера истекло. ' + err)
            } else {
                console.log(status + ' - ' + err)
            }

            kendo.ui.progress($(loadelem), false)
        }
    })
}