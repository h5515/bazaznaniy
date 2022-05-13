FroalaEditor.DEFAULTS.key = "1C%kZV[IX)_SL}UJHAEFZMUJOYGYQE[\\ZJ]RAe(+%$==";

FroalaEditor.DefineIconTemplate('dleicons', '<i class="icon-[NAME]" aria-hidden="true"></i>');

FroalaEditor.DefineIcon('dleupload', {
    NAME: 'dle dle-i-dleicon icon-up',
    template: 'dleicons'
});
FroalaEditor.RegisterCommand('dleupload', {
    title: 'Загрузить файл',
    focus: true,
    undo: true,
    refreshAfterCallback: true,
    callback: function () {
        active_editor = this;
        active_editor.selection.save();
        media_upload(this.opts.dle_upload_area, this.opts.dle_upload_user, this.opts.dle_upload_news, '1');
    }
});

$.extend(FroalaEditor.POPUP_TEMPLATES, {
    "dleleech.popup": '[_CUSTOM_LAYER_]'
});

FroalaEditor.PLUGINS.dleleech = function (editor) {
    // Create custom popup.
    function initPopup() {

        var template = {
            buttons: '',
            custom_layer: '<div style="width:300px;margin: 10px;"><div class="fr-input-line"><input name="href" type="text" class="fr-link-attr" placeholder="http://" dir="auto"><label>http://</label></div><div class="fr-action-buttons"><button class="fr-command fr-submit" data-cmd="dleleechinsert" href="#" type="button">' + editor.language.translate('Insert') + '</button></div></div>'
        };

        // Create popup.
        var $popup = editor.popups.create('dleleech.popup', template);

        return $popup;
    }

    // Show the popup
    function showPopup() {

        editor.selection.save();

        var $popup = editor.popups.get('dleleech.popup');

        if (!$popup) $popup = initPopup();

        editor.popups.setContainer('dleleech.popup', editor.$tb);

        var $btn = editor.$tb.find('.fr-command[data-cmd="dleleech"]');
        var url = editor.selection.text();

        if (0 !== url.indexOf("http://") && 0 !== url.indexOf("https://")) {
            url = '';
        }

        $popup.find('input.fr-link-attr[type="text"][name="href"]').val(url);

        var left = $btn.offset().left + $btn.outerWidth() / 2;
        var top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);

        // Show the custom popup.
        // The button's outerHeight is required in case the popup needs to be displayed above it.
        editor.popups.show('dleleech.popup', left, top, $btn.outerHeight());
    }

    function insertHTML() {
        var $popup = editor.popups.get('dleleech.popup');
        var url = $popup.find('input.fr-link-attr[type="text"][name="href"]').val();

        editor.popups.hide('dleleech.popup');
        editor.selection.restore();
        var text = editor.selection.text();
        if (url != '') {
            if (text == '') {
                text = url;
            }
            editor.html.insert('[leech=' + url + ']' + text + '[/leech]');
        }

    }

    // Methods visible outside the plugin.
    return {
        showPopup: showPopup,
        insertHTML: insertHTML
    }
}

FroalaEditor.RegisterCommand('dleleechinsert', {
    focus: true,
    undo: true,
    refreshAfterCallback: true,
    callback: function () {
        this.dleleech.insertHTML();
    }
});

FroalaEditor.DefineIcon('dleleech', {
    NAME: 'dle dle-i-dleicon icon-leech',
    template: 'dleicons'
});
FroalaEditor.RegisterCommand('dleleech', {
    title: 'Вставить защищенную ссылку',
    icon: 'dleleech',
    undo: false,
    focus: false,
    plugin: 'dleleech',
    refreshAfterCallback: false,
    callback: function () {
        this.dleleech.showPopup();
        //  alert('111');
    }
});

FroalaEditor.DefineIcon('dlehide', {
    NAME: 'dle dle-i-dleicon icon-hide',
    template: 'dleicons'
});
FroalaEditor.RegisterCommand('dlehide', {
    title: 'Вставка скрытого текста',
    focus: true,
    undo: true,
    refreshAfterCallback: true,
    callback: function() {
        this.html.insert('[hide]' + this.html.getSelected() + '[/hide]');
    }
});

FroalaEditor.DefineIcon('dlespoiler', {
    NAME: 'dle dle-i-dleicon icon-spoiler',
    template: 'dleicons'
});
FroalaEditor.RegisterCommand('dlespoiler', {
    title: 'Вставка спойлера',
    focus: true,
    undo: true,
    refreshAfterCallback: true,
    callback: function() {
        this.html.insert('[spoiler]' + this.html.getSelected() + '[/spoiler]');
    }
});

FroalaEditor.DefineIcon('dlequote', {
    NAME: 'dle dle-i-dleicon icon-quote',
    template: 'dleicons'
});
FroalaEditor.RegisterCommand('dlequote', {
    title: 'Вставка цитаты',
    focus: true,
    undo: true,
    refreshAfterCallback: true,
    callback: function() {
        this.html.insert('<p><div class="quote">' + this.html.getSelected() + '</div></p>');
    }
});

FroalaEditor.DefineIcon('page_dropdown', {
    NAME: 'dle dle-i-dleicon icon-br',
    template: 'dleicons'
});
FroalaEditor.RegisterCommand('page_dropdown', {
    title: 'Вставка навигации по страницам публикации',
    type: 'dropdown',
    focus: true,
    undo: true,
    refreshAfterCallback: true,
    options: {
        'v1': 'Вставить разрыв между страницами',
        'v2': 'Вставить ссылку на страницу'
    },
    callback: function(cmd, val) {
        if (val == 'v1') {
            this.html.insert('{PAGEBREAK}');
        } else {
            this.html.insert('[page=2]' + this.html.getSelected() + '[/page]');
        }

    },

});

FroalaEditor.DefineIcon('url_dropdown', {
    NAME: 'dle dle-i-dleicon icon-typo',
    template: 'dleicons'
});
FroalaEditor.RegisterCommand('url_dropdown', {
    title: 'Вставка перехода внутри страницы',
    type: 'dropdown',
    focus: true,
    undo: true,
    refreshAfterCallback: true,
    options: {
        'v1': 'Вставить метку',
        'v2': 'Вставить ссылку на метку'
    },
    callback: function(cmd, val) {
        if (val == 'v1') {
            this.html.insert('[metka=1]');
        } else {
            this.html.insert('[url_metka=1]' + this.html.getSelected() + '[/url_metka]');
        }

    },

});




