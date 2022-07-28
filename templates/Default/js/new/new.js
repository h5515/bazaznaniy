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
            $('html, body').css('overflow', 'auto')
        }

    }).data('kendoWindow')
    setTimeout(() => {
        addbz.center().open()
    }, 50)
})

function Help(section) {

    if (section == "social") {

        var w = 800;

    } else {

        var w = 570;
    }

    ShowLoading('');

    $.post("engine/ajax/controller.php?mod=help&section=", {
        section: section
    }, function(data) {

        HideLoading('');

        $("#panel-help-section").remove();

        $("body").append(data);

        $('#panel-help-section').dialog({
            autoOpen: true,
            width: w,
            height: 550,
            resizable: false,
            buttons: {
                "OK": function() {
                    $(this).dialog("close");
                    $("#panel-help-section").remove();
                }
            }
        });

    });

    return false;


}