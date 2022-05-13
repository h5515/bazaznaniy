var editor;

function Editor(elem) {
    editor = new FroalaEditor(elem, {
        enter: FroalaEditor.ENTER_BR,
        initOnClick: false,
        autosave: false,
        theme: 'dark',
        language: 'ru',
        events: {
            'image.beforeUpload': function(files) {
                const editor = this
                if (files.length) {
                    var reader = new FileReader()
                    reader.onload = function(e) {
                        var result = e.target.result;
                        var formData = new FormData();
                        tnam = $(elem).attr('id').replace('#', '');
                        tnam = $(elem).attr('id').replace('.', '');
                        formData.append('filecontent', files[0], tnam + '.png');

                        $.ajax({
                            url: 'https://bz.fto.com.ru:470/upload.php?file_upload=1',
                            type: 'POST',
                            data: formData,
                            cache: false,
                            dataType: 'text',
                            processData: false, // Не обрабатываем файлы (Don't process the files)
                            contentType: false, // Так jQuery скажет серверу что это строковой запрос
                            success: function(respond, textStatus, jqXHR) {
                                km = respond.substring(0, 2);
                                b = respond.substr(2);
                                editor.image.remove();
                                // Если все ОК
                                console.log(b);
                                if (km == 'Ok') {
                                    editor.html.insert('<a href="' + b + '" class="highslide filkat" ><img src="' + b + '"></a>');
                                } else {
                                    alert(b);
                                }
                                /*if (typeof respond.error === 'undefined') {
                                    // Файлы успешно загружены, делаем что нибудь здесь
                                    
                                    // выведем пути к загруженным файлам в блок '.ajax-respond'
                                } else {
                                    console.log('ОШИБКИ ОТВЕТА сервера: ' + respond.error);
                                }*/

                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                                editor.image.remove();
                                alert('ОШИБКИ ОТВЕТА сервера: ' + respond.error);
                            }
                        });
                        //editor.image.insert(result, null, null, editor.image.get())
                    }
                    reader.readAsDataURL(files[0])
                }
                return false
            }
        }
    })
}