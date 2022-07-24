
<?php session_start();?>
<div class="bzform">
    <div id="validation-success"></div>
    <form id="addbzform" action="/php/add_bz.php" method="post"></form>
</div>

<script>
    function imagesbuild(el) {
        var file = $(el).get(0);
        var file64 = el.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            $("#imgbz").val(reader.result)
        }
        reader.readAsDataURL(file64);
        var preview = window.URL.createObjectURL(file.files[0]);
        if ($('.apnd-img')[0])
            $('.apnd-img').remove();
        $(el).closest('.k-form-field-wrap').find('span').append("<div class='apnd-img'><img src='" + preview + "' id='imgobloz' class='img-responsive'><i class='fa fa-close delfile'></i></div>");

    }
    $(document).ready(function() {
        var validationSuccess = $("#validation-success");
        $("#addbzform").kendoForm({
            orientation: "vertical",
            formData: {
                category: 1,
            },
            items: [{
                    field: "imgbz",
                    editor: "hidden"
                }, {
                    field: "namebaza",
                    label: "Наименование базы знаний:",
                    validation: {
                        required: {
                            message: "Поле обязательно для заполнения"
                        }
                    },
                    editor: "TextBox",
                }, {
                    field: "namebd",
                    label: "Имя базы данных:",
                    validation: {
                        required: {
                            message: "Поле обязательно для заполнения"
                        }
                    },
                    editor: "TextBox",
                }, {
                    field: "imagebz",
                    label: "Обложка:",
                    editor: function(container, options) {
                        $('<input name="obloz" id="oblozfile" type="file" onchange="imagesbuild(this)" accept=".jpg,.png"/><div class="k-form-hint"><span>Вы можете загружать только: JPG, PNG</span></div>')
                            .appendTo(container);
                    },
                },
                <?php if ((isset($_SESSION['super_admin'])&&$_SESSION['super_admin']) || in_array('Создавать инструкции заказчика', $_SESSION["roly"])):?> 
                {   field: "category",
                    editor: "DropDownList",
                    label: "Категория:",
                    validation: {
                        required: true
                    },
                    editorOptions: {
                        dataTextField: "text",
                        dataValueField: "value",
                        dataSource: [{
                            text: "Внутренние инструкции",
                            value: "1"
                        }, {
                            text: "Инструкции заказчика",
                            value: "2"
                        }, ],
                    }
                } 
                <?php else: ?>
                { field: "category",
                  value: "1",
                  editor: "hidden"
                }
                <?php endif; ?>

            ],
            messages: {
                submit: "Создать",
                clear: "Отмена",
            },
            clear: function(ev) {
                $("#oblozfile").val(null);
                $('.apnd-img').remove();
                addbz.close();
            }

        });

        $("#namebaza").on('input', function() {
            $('#namebd').val(rus_to_latin($(this).val()));
        })

    });
</script>

<style>
    .apnd-img {
        position: absolute;
        right: 0;
        margin-top: -96px;
        margin-right: 19px;
        border: 1px dashed #CCC;
        padding: 5px;
    }
    
    .apnd-img img {
        height: 95px;
    }
</style>