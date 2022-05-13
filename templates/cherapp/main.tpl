<!DOCTYPE html>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>HvScript</title>

<link href="{THEME}/CherApp/css/Style.css" type="text/css" rel="stylesheet">

    <!--Быстрое редактирование, если что удалю
    <link href="{THEME}/CherApp/css/jquery.notebook.css" type="text/css" rel="stylesheet">-->

    <link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">

    <link rel="stylesheet" href="{THEME}/CherApp/css/bootstrap.min.css">
    <link rel="stylesheet" href="{THEME}/CherApp/css/bootstrap-side-modals.css">
    <!--Диалог вопрос-->
    <link href="{THEME}/CherApp/css/jConfirm.min.css" type="text/css" rel="stylesheet">
    <!--Динамическая таблица-->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">

    <!--Alert-->
    <link href="{THEME}/CherApp/css/bootstrap-toaster.min.css" type="text/css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" integrity="sha256-MsxKR7Nw4ngHKmRAJJhy5oHvodmSYAQgwDqWMdqIXXA=" crossorigin="anonymous">
    <!--Загрузка файла на сервер-->
    <link href="{THEME}/CherApp/css/fileup.css" type="text/css" rel="stylesheet">

    <!--Alert2-->
    <link href="{THEME}/CherApp/css/jquery.growl.css" rel="stylesheet" type="text/css">

    <!--Editor-->
    <link rel="stylesheet" href="{THEME}/CherApp/Editor/css/froala_editor.css">
    <link rel="stylesheet" href="{THEME}/CherApp/Editor/css/froala_style.css">
    <link rel="stylesheet" href="{THEME}/CherApp/Editor/css/plugins/code_view.css">
    <link rel="stylesheet" href="{THEME}/CherApp/Editor/css/plugins/colors.css">
    <link rel="stylesheet" href="{THEME}/CherApp/Editor/css/plugins/emoticons.css">
    <link rel="stylesheet" href="{THEME}/CherApp/Editor/css/plugins/image_manager.css">
    <link rel="stylesheet" href="{THEME}/CherApp/Editor/css/plugins/image.css">
    <link rel="stylesheet" href="{THEME}/CherApp/Editor/css/plugins/line_breaker.css">
    <link rel="stylesheet" href="{THEME}/CherApp/Editor/css/plugins/table.css">
    <link rel="stylesheet" href="{THEME}/CherApp/Editor/css/plugins/char_counter.css">
    <link rel="stylesheet" href="{THEME}/CherApp/Editor/css/plugins/video.css">
    <!--Галерея-->
    <link href="{THEME}/CherApp/highslide/highslide.css" rel="stylesheet">

    <!--/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="{THEME}/CherApp/js/jquery-3.5.1.min.js"></script>
    <!--Копировать в буфер-->
    <script src="{THEME}/CherApp/js/jquery.copy-to-clipboard.js"></script>
    <!--Диалог вопрос-->
    <script src="{THEME}/CherApp/js/jConfirm.min.js"></script>
    <!--Динамическая таблица-->
    <script src="{THEME}/CherApp/js/bstable.js"></script>
    <!--таблица с поиском-->
    <script src="{THEME}/CherApp/js/fancyTable.min.js"></script>
    <!--Загрузка файла на сервер-->
    <script src="{THEME}/CherApp/js/fileup.js"></script>

    <!--Alert2-->
    <script src="{THEME}/CherApp/js/jquery.growl.js"></script>
    <!--Перемещение LI-->
    <script src="{THEME}/CherApp/js/jquery.nestable.js"></script>
    <!--Сохранение в cookie-->
    <script src="{THEME}/CherApp/js/jquery.cookie.js"></script>

    <!--Editor-->
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/froala_editor.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/align.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/code_beautifier.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/code_view.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/colors.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/draggable.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/emoticons.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/font_size.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/font_family.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/image.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/file.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/image_manager.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/line_breaker.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/link.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/lists.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/paragraph_format.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/paragraph_style.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/video.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/table.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/url.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/entities.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/char_counter.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/inline_style.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/save.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/plugins/fullscreen.min.js"></script>
    <script type="text/javascript" src="{THEME}/CherApp/Editor/js/languages/ru.js"></script>
    <!--Заводим редактор-->
    <script src="{THEME}/CherApp/js/myedit.js"></script>
    <!--Галерея-->
    <script src="{THEME}/CherApp/highslide/highslide-full.js"></script>

    <script src="{THEME}/CherApp/js/jsFunction.js"></script>

</head>

<body>

     {content}

     
     
     <div class="loading"><img src="CherApp/images/loading.gif"></div>
     <div class="error"><img src="CherApp/images/error.png"><span>Ошибка!</span> </div>
     <div class="Yess"><img src="CherApp/images/Yess.png"><span>Ок!</span> </div>

     <script>
     $('#dle-content').css('display','none');
     $('.loading').center();
    $('.loading').slideToggle("fast");
     </script>
 
     <div class="modal modal-right fade" id="right_modal" tabindex="-1" role="dialog" aria-labelledby="right_modal">
         <div class="modal-dialog" role="document">
             <div class="modal-content">
                 <div class="modal-header">
                     <h5 class="modal-title"> </h5>
                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
                 </div>
                 <div class="modal-body">
 
                 </div>
                 <div class="modal-footer modal-footer-fixed">
                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                     <button type="button" class="btn btn-primary" data-dismiss="modal">Сохранить</button>
                 </div>
             </div>
         </div>
     </div>
 
     <div class="modal modal-bottom" id="bottom_modal" tabindex="-1" role="dialog" aria-labelledby="bottom_modal">
         <div class="modal-dialog" role="document" id="FileUpload">
             <div class="modal-content">
                 <div class="modal-header">
                     <h5 class="modal-title"> </h5>
                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
                 </div>
                 <div class="modal-body">
 
                 </div>
                 <form id="dropzone">
                     <button type="button" class="btn btn-success fileup-btn">
                         Загрузить файл
                         <input type="file" id="upload-4" multiple accept="image/*">
                     </button>
 
                     <div id="upload-4-dropzone" class="dropzone">
                         Переместите сюда файл
                     </div>
 
                     <div id="upload-4-queue" class="queue"></div>
                 </form>
 
                 <div class="modal-footer modal-footer-fixed">
                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                     <button type="button" class="btn btn-primary" data-dismiss="modal">Сохранить</button>
                 </div>
             </div>
         </div>
     </div>
 
     <div style="display:none" id="IdSaveTemplate"> </div>
     <div style="display:none" id="IdTempEditor"> </div>
 
     <script src="{THEME}/CherApp/js/bootstrap.bundle.min.js"></script>
     <!--Alert-->
     <script src="{THEME}/CherApp/js/bootstrap-toaster.js"></script>
     <script src="{THEME}/CherApp/js/mycookie.js"></script>
     <script src="{THEME}/CherApp/js/jsEdit.js"></script>
     <script src="{THEME}/CherApp/js/jsSobitia.js"></script>
</body>

</html>