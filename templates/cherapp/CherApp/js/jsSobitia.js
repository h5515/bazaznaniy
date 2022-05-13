filupload = hv_root+'upload.php?file_upload=1';
$.fileup({
        url: filupload,
        inputID: 'upload-4',
        queueID: 'upload-4-queue',
        dropzoneID: 'upload-4-dropzone',
        fieldName: 'fileup',
        autostart: false
    })
    .select(function(file) {
        $('#dropzone .control-button').show();
    })
    .remove(function(file, total) {
        if (file === '*' || total === 1) {
            $('#dropzone .control-button').hide();
        }
    })
    .success(function(response, file_number, file) {
        $.growl.notice({ title: "Upload success!", message: file.name });
    })
    .error(function(event, file, file_number) {
        $.growl.error({ message: "Upload error!" });
    })
    .dragEnter(function(event) {
        $(event.target).addClass('over');
    })
    .dragLeave(function(event) {
        $(event.target).removeClass('over');
    })
    .dragEnd(function(event) {
        $(event.target).removeClass('over');
    });

$('body').on('click', function(e) {
    Elem = e.target;
    $el = $(Elem);
    /*if (($('#right_modal').css('display') != 'none') && ($('#bottom_modal').css('display') == 'none')) {
        if (!$($el).closest('#right_modal')[0])
            $('#bottom_modal .modal-title').attr('dtemp', 'on');
    }*/
    if ($('.imagEdit')[0]) {
        if (($el.attr('class') != 'imagEdit') && (!$el.closest('.imagEdit')[0])) {
            if ($('#bottom_modal .modal-title').attr('dtemp') != 'off') {
                CloseBlock($('.imClose')[0]);
            } else {
                if (!$($el).closest('#FileUpload')[0])
                    $('#bottom_modal .modal-title').attr('dtemp', 'on');
            }
        }
    }

    if (($el.attr('class')) && ($el.attr('class').indexOf(' ') > -1) && ($el.attr('class').split(' ')[1] == 'btn-light')) {
        $('.paramKnopDop').remove();
    }

});

function HigslideActive() {
    $('.highslide').each(function(index, el) {
        $(el).attr('onClick', 'return hs.expand(this);');
    })

}

function HigslideDeActive() {
    $('#Idcontent .highslide').each(function(index, el) {
        $(el).attr('onClick', 'return false;');
    })
}

$(window).scroll(function() {
    if (TempBol) return;
    var scrol = $(MiScroll).scrollTop();
    localStorage.setItem('HvScroll', scrol);
});