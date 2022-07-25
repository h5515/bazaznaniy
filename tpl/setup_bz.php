<?php
session_start();
define('DATALIFEENGINE', true);
define('ROOT_DIR', dirname(__FILE__) . '../../');
define('ENGINE_DIR', ROOT_DIR . 'engine');
include ENGINE_DIR . '/data/config.php';
require_once ENGINE_DIR . '/classes/mysql.php';
require_once ENGINE_DIR . '/data/dbconfig.php';
require_once ENGINE_DIR . '/modules/functions.php';

?>
<style>
    .k-form-clear {
        display: none !important;
    }

    select,
    textarea,
    input[type="text"],
    input[type="password"],
    input[type="file"],
    input[type="datetime"],
    input[type="datetime-local"],
    input[type="date"],
    input[type="month"],
    input[type="time"],
    input[type="week"],
    input[type="number"],
    input[type="email"],
    input[type="url"],
    input[type="search"],
    input[type="tel"],
    input[type="color"] {
        height: 26px;
    }

    .k-form-horizontal .k-form-field-wrap {
        max-width: calc(50% - 10px);
    }

    .k-form-horizontal .k-form-field>.k-form-label,
    .k-form-horizontal .k-form-field>.k-label,
    .k-form-horizontal .k-form-field>kendo-label {
        width: 50%;
    }

    .k-form-horizontal .k-form-field {
        margin-right: 20%;
    }
</style>
<div class="">
    <div id="validation-success"></div>
    <form id="setupbzform" action="/php/setup_bz.php" method="post">
        <div id="settabstrip">
            <ul>
                <li class="k-state-active"><span class="fa fa-file-text-o"></span> Статьи</li>
                <li class=""><span class="fa fa-commenting-o"></span> Комментарии</li>
            </ul>
            <div id="fil1"></div>
            <div id="fil2"></div>
        </div>
    </form>
</div>

<script>
    $(document).ready(function() {
        var validationSuccess = $("#validation-success");


        $("#settabstrip").kendoForm({
            orientation: "horizontal",
            formData: {
                Username: "johny",
                Email: "john.doe@email.com",
                Password: "pass123",
                Birth: new Date(),
                Agree: false
            },
            messages: {
                submit: "Сохранить"
            },
            items: [{
                    type: "group",
                    items: [{
                            field: "news_number",
                            label: "Количество статей на страницу:",
                            validation: {
                                required: {
                                    message: "Поле обязательно для заполнения."
                                },
                                pattern: {
                                    value: "[0-9]+",
                                    message: "Разрешено только число."
                                }
                            },
                            hint: "Количество кратких статей, которое будет выводиться на страницу"
                        },
                        {
                            field: "search_number",
                            label: "Количество статей на страницу в результатах поиска:",
                            validation: {
                                required: {
                                    message: "Поле обязательно для заполнения."
                                },
                                pattern: {
                                    value: "[0-9]+",
                                    message: "Разрешено только число."
                                }
                            },
                            hint: "Количество найденных статей при поиске, которое будет выводиться на одну страницу в результатах поиска."
                        },
                        {
                            field: "search_length_min",
                            label: "Минимальное количество символов для поиска:",
                            validation: {
                                required: {
                                    message: "Поле обязательно для заполнения."
                                },
                                pattern: {
                                    value: "[0-9]+",
                                    message: "Разрешено только число."
                                }
                            },
                            hint: "Укажите минимальное количество символов в слове при котором будет осуществляться поиск. Слишком маленькое значение увеличивает нагрузку на сервер при поиске. Рекомендуется ставить не менее четырех символов."
                        },
                        {
                            field: "related_number",
                            label: "Количество похожих статей:",
                            validation: {
                                required: {
                                    message: "Поле обязательно для заполнения."
                                },
                                pattern: {
                                    value: "[0-9]+",
                                    message: "Разрешено только число."
                                }
                            },
                            hint: "Введите количество похожих статей, которые будут выводится при просмотре полных статей."
                        },
                        {
                            field: "top_number",
                            label: "Количество статей в блоке популярных статьей:",
                            validation: {
                                required: {
                                    message: "Поле обязательно для заполнения."
                                },
                                pattern: {
                                    value: "[0-9]+",
                                    message: "Разрешено только число."
                                }
                            },
                            hint: "Количество статей, которое будет выводиться в блоке популярных статей."
                        },
                        {
                            field: "tags_number",
                            label: "Количество ключевых слов в блоке вывода облака тегов на сайте:",
                            validation: {
                                required: {
                                    message: "Поле обязательно для заполнения."
                                },
                                pattern: {
                                    value: "[0-9]+",
                                    message: "Разрешено только число."
                                }
                            },
                            hint: "Количество ключевых слов, которое будет выводиться в блоке вывода облака тегов на сайте."
                        },
                        {
                            field: "timestamp_active",
                            label: {
                                text: "Формат времени для статей:<br><a onclick=\"Help('date'); return false;\" href='#'>помощь по работе функции</a>:",
                                encoded: false
                            },
                            validation: {
                                required: {
                                    message: "Поле обязательно для заполнения."
                                },
                            },
                        },
                        {
                            field: "news_navigation",
                            editor: "DropDownList",
                            label: "Вывод навигации по страницам статей:",
                            validation: {
                                required: {
                                    message: "Поле обязательно для заполнения."
                                },
                            },
                            editorOptions: {
                                dataTextField: "Name",
                                dataValueField: "id",
                                dataSource: [{
                                        Name: "Отключить",
                                        id: 0
                                    },
                                    {
                                        Name: "Внизу",
                                        id: 1
                                    },
                                    {
                                        Name: "Наверху",
                                        id: 2
                                    },
                                    {
                                        Name: "Внизу и Наверху",
                                        id: 3
                                    }
                                ]
                            },
                            hint: "Выберите критерий вывода навигации по страницам статей. Вы можете отключить вывод навигации, либо выводить навигацию вверху или внизу статей, либо одновременно и вверху и внизу."
                        },
                        {
                            field: "show_sub_cats",
                            label: "Выводить статьи опубликованные в субкатегориях:",
                            editor: "Switch",
                            hint: "Eсли 'Включено', то статьи опубликованные в субкатегориях будут показываться также при просмотре основной категории. В противном случае вам необходимо будет указывать несколько категорий при публикации статьи."
                        },
                        {
                            field: "allow_add_tags",
                            label: "Разрешить добавление ключевых слов в облако тегов при добавлении статей:",
                            editor: "Switch",
                            hint: "Eсли 'Включено', то при добавлении статей с сайта будет разрешено добавление ключевых слов в облако тегов."
                        },
                        {
                            field: "related_only_cats",
                            label: "Искать похожие публикации только в тех же категориях, что и сама статья:",
                            editor: "Switch",
                            hint: "Eсли 'Включено', то при поиске похожих статей, будет учитываться категория к которой принадлежит публикация. И будут выводится только статьи из такой же категории, или субкатегорий (если разрешен вывод статей из субкатегорий). Eсли 'Отключено', то будут искаться похожие публикации из всех категорий."
                        },
                        {
                            field: "short_rating",
                            label: "Разрешить выставление рейтинга в списке статей:",
                            editor: "Switch",
                            hint: "Вы можете разрешить или запретить пользователям выставлять рейтинг для статьи при просмотре кратких статей. Eсли 'Отключено', то выставить рейтинг для статьи, можно будет только при просмотре полной статьи."
                        },
                        {
                            field: "rating_type",
                            label: "Тип рейтинга публикаций:",
                            editor: "DropDownList",
                            validation: {
                                required: {
                                    message: "Поле обязательно для заполнения."
                                },
                            },
                            editorOptions: {
                                dataTextField: "Name",
                                dataValueField: "id",
                                dataSource: [{
                                        Name: "Оценка",
                                        id: 0
                                    },
                                    {
                                        Name: "Только 'Нравится'",
                                        id: 1
                                    },
                                    {
                                        Name: "'Нравится' или 'Не нравится'",
                                        id: 2
                                    },
                                    {
                                        Name: "'Нравится' и 'Не нравится'",
                                        id: 3
                                    }
                                ]
                            },
                            hint: `
                            Укажите тип рейтинга для публикаций, которые могут выставляться посетителями сайта. Могут использоваться следующие типы:<br>
                            <b>Оценка</b> - при данном типе используется пятизвездочный рейтинг публикации. Посетители могут выставлять оценку статьи от 1 до 5 и рейтинг выводится в виде усредненной оценки.<br>
                            <b>Только 'Нравится'</b> - при данном типе, пользователь может выставить что ему нравится данная публикация (система лайков) и выводится количество пользователей которым понравилась ваша публикация.<br>
                            <b>'Нравится' или 'Не нравится'</b> - при данном типе посетители отмечают нравится ли им публикация или не нравится. В данном случае выводится общее значение рейтинга, например, +20 или -10<br>
                            <b>'Нравится' и 'Не нравится'</b> - при данном типе посетители отмечают нравится ли им публикация или не нравится. И выводятся отдельные значения количества лайков и дизлайков, например, +20 и -10<br>
                            `
                        },
                    ]
                },
                {
                    type: "group",
                    items: [
                        {
                            field: "allow_comments",
                            label: "Разрешить комментировать статьи:",
                            editor: "Switch",
                            hint: "Включение или отключение комментариев для всех статей."
                        },  
                        {
                            field: "tree_comments",
                            label: "Использование древовидных комментариев:",
                            editor: "Switch",
                            hint: "Вы можете разрешить или запретить использование древовидных (вложенных) комментариев. В случае включения данной настройки, пользователи смогут отвечать на комментарии, и они будут выводиться в виде дерева. В случае отключения данной настройки, комментарии будут выводиться как обычно друг по выставленному порядку сортировки."
                        }, 
                        {
                            field: "tree_comments_level",
                            label: "Максимальная глубина вложенных комментариев:",
                            validation: {
                                required: {
                                    message: "Поле обязательно для заполнения."
                                },
                                pattern: {
                                    value: "[0-9]+",
                                    message: "Разрешено только число."
                                }
                            },
                            hint: "Укажите максимальный уровень глубины вложения комментариев. По достижении данной глубины, на комментарии нельзя будет уже отвечать."
                        },   
                        {
                            field: "simple_reply",
                            label: "Упрощенная форма ответа на комментарии:",
                            editor: "Switch",
                            hint: "При включении данной настройки, при ответе на комментарий, пользователям будет выводиться форма ответа на комментарии чуть ниже основного комментария."
                        },   
                        {
                            field: "allow_subscribe",
                            label: "Разрешить пользователям подписываться на комментарии статьи:",
                            editor: "Switch",
                            hint: "Включение или отключение подписки на комментарии. В случае если данная опция включена, то пользователь при добавлении комментария сможет подписываться на комментарии к этой статьи, и в случае появления новых комментариев к данной статьи, он будет уведомлен на E-mail об этом."
                        }, 
                        {
                            field: "allow_combine",
                            label: "Разрешить объединение комментариев:",
                            editor: "Switch",
                            hint: "Включение или отключение объединения комментариев, добавляемых друг за другом от одного посетителя. Если данная настройка включена, то все комментарии, которые добавляет пользователь в течении суток к одной статьи, будут объединены в один комментарий, при условии что комментарии добавляются подряд и между ними нет комментариев других пользователей."
                        },  
                        {
                            field: "comments_minlen",
                            label: "Минимальное количество символов в комментариях:",
                            validation: {
                                required: {
                                    message: "Поле обязательно для заполнения."
                                },
                                pattern: {
                                    value: "[0-9]+",
                                    message: "Разрешено только число."
                                }
                            },
                            hint: "Укажите минимальное количество символов, которое должно присутствовать в комментарии для того чтобы комментарий мог быть добавлен на сайт. Если вы не хотите вводить ограничение на минимальное количество символов, установите 0."
                        }, 
                        {
                            field: "comments_maxlen",
                            label: "Максимальное количество символов в комментариях:",
                            validation: {
                                required: {
                                    message: "Поле обязательно для заполнения."
                                },
                                pattern: {
                                    value: "[0-9]+",
                                    message: "Разрешено только число."
                                }
                            },
                            hint: "Укажите максимальное количество символов, которое может использовать пользователь при написании комментариев на сайте."
                        },   
                        {
                            field: "comm_nummers",
                            label: "Количество комментариев на страницу:",
                            validation: {
                                required: {
                                    message: "Поле обязательно для заполнения."
                                },
                                pattern: {
                                    value: "[0-9]+",
                                    message: "Разрешено только число."
                                }
                            },
                            hint: "Укажите сколько комментариев выводить на одну страницу. В случае использования древовидных комментариев, указывается количество комментариев верхнего уровня."
                        },    
                        {
                            field: "comments_lazyload",
                            label: "Включить динамическую загрузку комментариев по мере просмотра:",
                            editor: "Switch",
                            hint: "При включении данной настройки, комментарии не будут разбиваться на страницы, при их показе, а будут динамически загружаться на страницу по мере их чтения посетителем при помощи технологии AJAX. При отключении данной настройки, комментарии будут разбиты на страницы, и посетителю будет показана навигация по страницам комментариев."
                        }, 
                        {
                            field: "comm_msort",
                            editor: "DropDownList",
                            label: "Порядок сортировки комментариев:",
                            validation: {
                                required: {
                                    message: "Поле обязательно для заполнения."
                                },
                            },
                            editorOptions: {
                                dataTextField: "Name",
                                dataValueField: "id",
                                dataSource: [{
                                        Name: "По убыванию",
                                        id: 0
                                    },
                                    {
                                        Name: "По возрастанию",
                                        id: 1
                                    },
                                ]
                            },
                            hint: "Выберите порядок сортировки комментариев."
                        },
                        {
                            field: "timestamp_comment",
                            label: {
                                text: "Формат времени для комментариев:<br><a onclick=\"Help('date'); return false;\" href='#'>помощь по работе функции</a>:",
                                encoded: false
                            },
                            validation: {
                                required: {
                                    message: "Поле обязательно для заполнения."
                                },
                            },
                        },
                        {
                            field: "allow_comments_rating",
                            label: "Разрешить выставление рейтинга для комментариев:",
                            editor: "Switch",
                            hint: "Вы можете разрешить или запретить пользователям выставлять рейтинг для комментариев на сайте."
                        }, 
                        {
                            field: "comments_rating_type",
                            label: "Тип рейтинга комментариев:",
                            editor: "DropDownList",
                            validation: {
                                required: {
                                    message: "Поле обязательно для заполнения."
                                },
                            },
                            editorOptions: {
                                dataTextField: "Name",
                                dataValueField: "id",
                                dataSource: [{
                                        Name: "Оценка",
                                        id: 0
                                    },
                                    {
                                        Name: "Только 'Нравится'",
                                        id: 1
                                    },
                                    {
                                        Name: "'Нравится' или 'Не нравится'",
                                        id: 2
                                    },
                                    {
                                        Name: "'Нравится' и 'Не нравится'",
                                        id: 3
                                    }
                                ]
                            },
                            hint: `
                            Укажите тип рейтинга для публикаций, которые могут выставляться посетителями сайта. Могут использоваться следующие типы:<br>
                            <b>Оценка</b> - при данном типе используется пятизвездочный рейтинг публикации. Посетители могут выставлять оценку статьи от 1 до 5 и рейтинг выводится в виде усредненной оценки.<br>
                            <b>Только 'Нравится'</b> - при данном типе, пользователь может выставить что ему нравится данная публикация (система лайков) и выводится количество пользователей которым понравилась ваша публикация.<br>
                            <b>'Нравится' или 'Не нравится'</b> - при данном типе посетители отмечают нравится ли им публикация или не нравится. В данном случае выводится общее значение рейтинга, например, +20 или -10<br>
                            <b>'Нравится' и 'Не нравится'</b> - при данном типе посетители отмечают нравится ли им публикация или не нравится. И выводятся отдельные значения количества лайков и дизлайков, например, +20 и -10<br>
                            `
                        },
                                 
                    ],
                }

            ],
            formatLabel: function(field) {
                return field + ":";
            },
            validateField: function(e) {
                validationSuccess.html("");
            },
            submit: function(e) {
                e.preventDefault();
                validationSuccess.html("<div class='k-messagebox k-messagebox-success'>Form data is valid!</div>");
            },

        });

        // $('#setupbzform fieldset').replaceWith(function() {
        //     return $("<div />", {
        //         html: $(this).html()
        //     });
        // });
        // $('#setupbzform fieldset').eq(0).outerHtml('<div><fieldset class="k-form-fieldset ">'+$('#setupbzform fieldset').eq(0).html()+'</fieldset></div>');
        // $('#setupbzform fieldset').eq(1).outerHtml('<div><fieldset class="k-form-fieldset ">'+$('#setupbzform fieldset').eq(1).html()+'</fieldset></div>');

        $('#setupbzform .k-form-legend').remove();
        $('#setupbzform fieldset').eq(0).appendTo('#fil1');
        $('#setupbzform fieldset').eq(1).appendTo('#fil2');

        $('#setupbzform .k-form-buttons').appendTo('#setupbzform');
        $("#settabstrip").kendoTabStrip({
            animation: {
                open: {
                    effects: "fadeIn"
                }
            }
        });
        winsetup.center().maximize();
    });
</script>