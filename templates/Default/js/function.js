var notifi;

function IsJsonString(str) {
    try {
        JSON.parse(str)
    } catch (e) {
        return false
    }
    return true
}

function notification(message, rezim, time = 3000) {
    if (!$('#idmessage')[0]) {
        $('body').append('<span id="idmessage" style="display:none;"></span>')
        notifi = $('#idmessage').kendoNotification({
            autoHideAfter: time,
            hide: function() {
                $('#idmessage').remove();
            },
            position: {
                top: 10,
                right: 20,
            },
            stacking: "down"

        }).data('kendoNotification')
    }

    notifi.setOptions({
            autoHideAfter: time,
        })
        //"info", "success", "warning", and "error"
    notifi.show(message, rezim)
}