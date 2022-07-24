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
        content: '/tpl/add_bz.php',
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