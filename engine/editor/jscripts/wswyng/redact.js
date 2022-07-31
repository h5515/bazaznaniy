function Activeeditor(elem, upload_area, height_min, sheight = null, autosaves = 0, linc = '') {
    console.log('Activeeditor - ' + upload_area);
    comment = new FroalaEditor(elem, {
        key: "1C%kZV[IX)_SL}UJHAEFZMUJOYGYQE[\\ZJ]RAe(+%$==",
        attribution: false,
        dle_root: dle_root,
        dle_upload_area: upload_area,
        dle_upload_user: p_name,
        dle_upload_news: id,
        width: '100%',
        placeholderText: platetext,
        heightMax: sheight,
        language: 'ru',
        toolbarSticky: true,
        //toolbarContainer: '#dle-content',
        toolbarStickyOffset: toolbarofset,
        //fullPage: true,
        //zIndex: 100000,
        heightMin: height_min,
        wordPasteModal: false,

        saveInterval: autosaves,
        saveMethod: 'POST',
        saveURL: 'engine/ajax/controller.php?mod=draft',
        saveParams: {
            news_id: id,
            author: p_name,
        },

        tableStyles: {
            tablestandart: 'Стандарт',
            tablezebr: 'Зебра',
            tablerrzd: 'Убрать промежуток между колонками',
            tableperenos: 'Перенос текста',
            tabletolst: 'Толстые рамки',
            tabledb: 'Двойные рамки',
            tablezakr: 'Закругленные углы',
            tablepls: 'Таблица полосками',
            tablerazdl: 'Раздельные ячейки',
            tablered: 'Красная таблица',
        },

        toolbarButtons: {
            moreText: {
                // List of buttons used in the  group.
                buttons: ['bold', 'italic', 'underline', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'clearFormatting'],
                // Alignment of the group in the toolbar.
                align: 'left',
                // By default, 3 buttons are shown in the main toolbar. The rest of them are available when using the more button.
                buttonsVisible: 8
            },
            moreParagraph: {
                buttons: ['alignLeft', 'alignCenter', 'formatOL', 'alignRight', 'alignJustify', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
                align: 'left',
                buttonsVisible: 3
            },
            moreRich: {
                buttons: ['insertLink', 'insertTable', 'dleupload', 'dlehide', 'dleleech', 'dlespoiler', 'dlequote', 'page_dropdown', 'url_dropdown', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertHR'],
                align: 'left',
                buttonsVisible: 3
            },
            moreMisc: {
                buttons: [histor, 'undo', 'redo', 'fullscreen', 'spellChecker', 'selectAll', 'html', 'help'],
                align: 'right',
                buttonsVisible: buts
            },
        },

        imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif', 'webp'],
        imageDefaultWidth: 0,
        imageInsertButtons: ['imageBack', '|', 'imageByURL', 'imageUpload'],
        imageUploadURL: 'engine/ajax/controller.php?mod=upload' + linc,
        imageUploadParam: 'qqfile',
        imageUploadParams: { "subaction": "upload", "news_id": id, "area": upload_area, "author": p_name, "mode": "quickload", "user_hash": logincache },
        imageMaxSize: maxsize * 1024,
        events: {
            'image.inserted': function($img, response) {
                //	alert(\$img.attr('src'));
                if (response) {

                    response = JSON.parse(response);

                    $img.removeAttr("data-returnbox").removeAttr("data-success").removeAttr("data-xfvalue").removeAttr("data-flink");

                    if (classimagealign && classimagealign != '')
                        $img.addClass(classimagealign);

                    if (response.flink) {
                        if ($img.parent().hasClass("highslide")) {

                            $img.parent().attr('href', response.flink);

                        } else {

                            $img.wrap('<a href="' + response.flink + '" class="highslide"></a>');

                        }
                    }

                }
            },
            'image.replaced': function($img, response) {
                //alert(\$img.attr('src'));
                if (response) {

                    response = JSON.parse(response);

                    $img.removeAttr("data-returnbox").removeAttr("data-success").removeAttr("data-xfvalue").removeAttr("data-flink");

                    if (classimagealign && classimagealign != '')
                        $img.addClass(classimagealign);

                    if (response.flink) {
                        if ($img.parent().hasClass("highslide")) {

                            $img.parent().attr('href', response.flink);

                        } else {

                            $img.wrap('<a href="' + response.flink + '" class="highslide"></a>');

                        }
                    }

                }
            }
        }
    })
}

function ActiveeditorNew(elem, upload_area, height_min, sheight = null, autosaves = 0, linc = '') {
    console.log('ActiveeditorNew - ' + upload_area);
    comment = new FroalaEditor(elem, {
        key: "1C%kZV[IX)_SL}UJHAEFZMUJOYGYQE[\\ZJ]RAe(+%$==",
        attribution: false,
        dle_root: dle_root,
        dle_upload_area: upload_area,
        dle_upload_user: p_name,
        dle_upload_news: id,
        width: '100%',
        placeholderText: platetext,
        heightMax: sheight,
        language: 'ru',
        //toolbarSticky: true,
        //toolbarContainer: '#dle-content',
        // toolbarStickyOffset: toolbarofset,
        //fullPage: true,
        //zIndex: 100000,
        heightMin: height_min,
        wordPasteModal: false,

        saveInterval: autosaves,
        saveMethod: 'POST',
        saveURL: 'engine/ajax/controller.php?mod=draft',
        saveParams: {
            news_id: id,
            author: p_name,
        },

        toolbarContainer: '#idtoolbar',

        tableStyles: {
            tablestandart: 'Стандарт',
            tablezebr: 'Зебра',
            tablerrzd: 'Убрать промежуток между колонками',
            tableperenos: 'Перенос текста',
            tabletolst: 'Толстые рамки',
            tabledb: 'Двойные рамки',
            tablezakr: 'Закругленные углы',
            tablepls: 'Таблица полосками',
            tablerazdl: 'Раздельные ячейки',
            tablered: 'Красная таблица',
        },

        fontFamilySelection: true,
        fontSizeSelection: true,
        paragraphFormatSelection: true,
        lineHeightSelection: true,

        toolbarButtons: {
            moreText: {
                // List of buttons used in the  group.
                buttons: ['bold', 'italic', 'underline', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'clearFormatting', 'strikeThrough', 'subscript', 'superscript', 'inlineClass', 'inlineStyle'],
                // Alignment of the group in the toolbar.
                align: 'left',
                // By default, 3 buttons are shown in the main toolbar. The rest of them are available when using the more button.
                buttonsVisible: 8
            },
            moreParagraph: {
                buttons: ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
                align: 'left',
                buttonsVisible: 7
            },
            moreRich: {
                buttons: ['insertLink', 'insertTable', 'dleupload', 'dlehide', 'dleleech', 'dlespoiler', 'dlequote', 'page_dropdown', 'url_dropdown', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertHR'],
                align: 'left',
                buttonsVisible: 3
            },
            moreMisc: {
                buttons: [histor, 'undo', 'redo', 'fullscreen', 'spellChecker', 'selectAll', 'html', 'help'],
                align: 'right',
                buttonsVisible: buts
            },
        },

        imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif', 'webp'],
        imageDefaultWidth: 0,
        imageInsertButtons: ['imageBack', '|', 'imageByURL', 'imageUpload'],
        imageUploadURL: 'engine/ajax/controller.php?mod=upload' + linc,
        imageUploadParam: 'qqfile',
        imageUploadParams: { "subaction": "upload", "news_id": id, "area": upload_area, "author": p_name, "mode": "quickload", "user_hash": logincache },
        imageMaxSize: maxsize * 1024,
        events: {
            'image.inserted': function($img, response) {
                //	alert(\$img.attr('src'));
                if (response) {

                    response = JSON.parse(response);

                    $img.removeAttr("data-returnbox").removeAttr("data-success").removeAttr("data-xfvalue").removeAttr("data-flink");

                    if (classimagealign && classimagealign != '')
                        $img.addClass(classimagealign);

                    if (response.flink) {
                        if ($img.parent().hasClass("highslide")) {

                            $img.parent().attr('href', response.flink);

                        } else {

                            $img.wrap('<a href="' + response.flink + '" class="highslide"></a>');

                        }
                    }

                }
            },
            'image.replaced': function($img, response) {
                //alert(\$img.attr('src'));
                if (response) {

                    response = JSON.parse(response);

                    $img.removeAttr("data-returnbox").removeAttr("data-success").removeAttr("data-xfvalue").removeAttr("data-flink");

                    if (classimagealign && classimagealign != '')
                        $img.addClass(classimagealign);

                    if (response.flink) {
                        if ($img.parent().hasClass("highslide")) {

                            $img.parent().attr('href', response.flink);

                        } else {

                            $img.wrap('<a href="' + response.flink + '" class="highslide"></a>');

                        }
                    }

                }
            }
        }
    })
    $('#idtoolbar').append("<button id='closeforms'><span class='k-icon k-i-x'></span>Закрыть</button>");
    $("#closeforms").kendoButton({
        click: function() {
            top.postMessage("closemodal", "*");
            if ($('#modalEdit')[0])
                $('#modalEdit').iziModal('close');
        }
    });
    // setTimeout(() => {

    // }, 400);


}