<?php
session_start();
define('DATALIFEENGINE', true);
define('ROOT_DIR', dirname(__FILE__) . '/../');
define('ENGINE_DIR', ROOT_DIR . 'engine');
include ENGINE_DIR . '/data/config.php';
require_once ENGINE_DIR . '/classes/mysql.php';
require_once ENGINE_DIR . '/data/dbconfig.php';
require_once ENGINE_DIR . '/modules/functions.php';

$arrint = array(
    'news_number', 'search_number', 'search_length_min', 'related_number', 'top_number', 'tags_number', 'news_navigation',
    'rating_type', 'tree_comments_level',
    'comments_minlen', 'comments_maxlen', 'comm_nummers',
    'comments_rating_type', 'outlinetype'
);

$Arrstring = array('timestamp_active', 'timestamp_comment', 'comm_msort', 'image_align', 'medium_image', 'max_image');

$Arrbol = array(
    'show_sub_cats', 'allow_add_tags', 'related_only_cats', 'short_rating', 'allow_comments', 'tree_comments', 'simple_reply', 'allow_subscribe',
    'allow_combine', 'comments_lazyload', 'allow_comments_rating', 'thumb_dimming', 'thumb_gallery', 'last_viewed', 'allow_tags',
);


$idcategory = $_GET['idcat'];
$idproject = $_GET['project'];
$bzcat = $_GET['category'];

if (isset($idproject)&&$idproject!='') {
    $projectname = $db_gl->super_query("SELECT project FROM dle_project WHERE id = $idproject")['project'];
    $bz_category = $projectname;
}else{
    $bz_category = $idcategory;
}

$dopconfigFile = "dopconfig$bz_category.php";


if (empty($_REQUEST['default']))
include ENGINE_DIR . '/data/dopconfig.php';

if (isset($_GET['save'])) {

    foreach ($Arrbol as $key => $value) {
        $newconf[$value] = 'off';
    }
    $newconf = array_merge($newconf, $_POST);

    if ($bzcat == 1) {
        $file = "/dopconfig$idcategory.php";
    } else {
        if (isset($idproject))
            $projectname = $db_gl->super_query("SELECT project FROM dle_project WHERE id = $idproject")['project'];
        $file = "/dopconfig$projectname.php";
    }

    $dir = ENGINE_DIR . '/data/dopconfig'; 
    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }

    $handler = fopen($dir.$file, "w");

    foreach ($newconf as $key => $value) {
        if (in_array($key, $arrint))
            $newconf[$key] = intval($newconf[$key]);
        if (in_array($key, $Arrbol))
            $newconf[$key] = ($newconf[$key] == 'on')? 1: 0;

    }    

    $find = array();
	$replace = array();
	
	$find[] = "'\r'";
	$replace[] = "";
	$find[] = "'\n'";
	$replace[] = "";

    fwrite($handler, "<?PHP \n\n//System Configurations\n\n\$dopconfig = array (\n\n");
    foreach ($newconf as $name => $value) {

        if ($name == "speedbar_separator" or $name == "category_separator" or $name == "tags_separator") {

            $value = htmlspecialchars($value, ENT_QUOTES, $config['charset']);
        } elseif ($name != "offline_reason") {

            $value = trim(strip_tags(stripslashes($value)));
            $value = htmlspecialchars($value, ENT_QUOTES, $config['charset']);

            $name = trim(strip_tags(stripslashes($name)));
            $name = htmlspecialchars($name, ENT_QUOTES, $config['charset']);
        }

        $value = preg_replace($find, $replace, $value);
        $value = str_replace("$", "&#036;", $value);
        $value = str_replace("{", "&#123;", $value);
        $value = str_replace("}", "&#125;", $value);
        $value = str_replace(chr(0), "", $value);
        $value = str_replace(chr(92), "", $value);
        $value = str_ireplace("decode", "dec&#111;de", $value);

        $name = preg_replace($find, $replace, $name);
        $name = str_replace("$", "&#036;", $name);
        $name = str_replace("{", "&#123;", $name);
        $name = str_replace("}", "&#125;", $name);
        $name = str_replace(chr(0), "", $name);
        $name = str_replace(chr(92), "", $name);
        $name = str_replace('(', "", $name);
        $name = str_replace(')', "", $name);
        $name = str_ireplace("decode", "dec&#111;de", $name);

        fwrite($handler, "'{$name}' => '{$value}',\n\n");
    }
    fwrite($handler, ");\n\n?>");
    fclose($handler);
    chmod($dir.$file, 0777);

    clear_all_caches();
    $_SESSION['referrer'] = str_replace("&amp;", "&", $_SESSION['referrer']);
    header("Location: {$_SESSION['referrer']}");
    die();
}

$urlget = "idcat=$idcategory&project=$idproject&category=$bzcat";

$formData = '';
foreach ($config as $key => $value) {
    if (in_array($key, $arrint))
        $formData .= $key . ': "' . $value . '",';
    if (in_array($key, $Arrstring))
        $formData .= $key . ': "' . $value . '",';
    if (in_array($key, $Arrbol))
        $formData .= $key . ': ' . ((bool)$value ? 'true' : 'false') . ',';
}



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

    #settabstrip {
        height: 95%;
    }

    #setupbzform {
        height: 100%;
    }

    .k-form-buttons {
        margin-right: 20%;
        margin-top: 10px;
    }
</style>
<div class="">
    <div id="validation-success"></div>
    <form id="setupbzform" action="/tpl/setup_bz.php?save=true&<?php echo $urlget; ?>" method="post">
        <div id="settabstrip">
            <ul>
                <li class="k-state-active"><span class="fa fa-file-text-o"></span> Публикации</li>
                <li class=""><span class="fa fa-commenting-o"></span> Комментарии</li>
                <li class=""><span class="fa fa-picture-o"></span> Изображения</li>
            </ul>
            <div id="fil1"></div>
            <div id="fil2"></div>
            <div id="fil3"></div>
        </div>
    </form>
</div>

<script>
    function default_setting(){
            $.post(dle_root + "tpl/setup_bz.php?default=true&<?php echo $urlget; ?>", {

            }, function(b) {
                $("#idsetup").html(b);
                notification('Настройки базы сброшены по умолчанию<br>Не забудьте сохранить.','info',5000);
            })
        }
    $(document).ready(function() {
        var validationSuccess = $("#validation-success");


        $("#settabstrip").kendoForm({
            orientation: "horizontal",
            formData: {
                // Username: "johny",
                // Email: "john.doe@email.com",
                // Password: "pass123",
                // Birth: new Date(),
                // Agree: false
                <?php echo $formData; ?>
            },
            messages: {
                submit: "Сохранить"
            },
            items: [{ //-------------------------Публикации-----------------------------------
                    type: "group",
                    items: [{
                            field: "news_number",
                            label: "Количество публикаций на страницу:",
                            validation: {
                                required: {
                                    message: "Поле обязательно для заполнения."
                                },
                                pattern: {
                                    value: "[0-9]+",
                                    message: "Разрешено только число."
                                }
                            },
                            hint: "Количество кратких публикаций, которое будет выводиться на страницу"
                        },
                        {
                            field: "search_number",
                            label: "Количество публикаций на страницу в результатах поиска:",
                            validation: {
                                required: {
                                    message: "Поле обязательно для заполнения."
                                },
                                pattern: {
                                    value: "[0-9]+",
                                    message: "Разрешено только число."
                                }
                            },
                            hint: "Количество найденных публикаций при поиске, которое будет выводиться на одну страницу в результатах поиска."
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
                            label: "Количество похожих публикаций:",
                            validation: {
                                required: {
                                    message: "Поле обязательно для заполнения."
                                },
                                pattern: {
                                    value: "[0-9]+",
                                    message: "Разрешено только число."
                                }
                            },
                            hint: "Введите количество похожих публикаций, которые будут выводится при просмотре публикаций.<br> 0 - отключить блок."
                        },
                        {
                            field: "top_number",
                            label: "Количество публикаций в блоке Популярные:",
                            validation: {
                                required: {
                                    message: "Поле обязательно для заполнения."
                                },
                                pattern: {
                                    value: "[0-9]+",
                                    message: "Разрешено только число."
                                }
                            },
                            hint: "Количество публикаций, которое будет выводиться в блоке популярных."
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
                                text: "Формат времени для публикации:<br><a onclick=\"Help('date'); return false;\" href='#'>помощь по работе функции</a>:",
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
                            label: "Вывод навигации по страницам публикаций:",
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
                            hint: "Выберите критерий вывода навигации по страницам публикаций. Вы можете отключить вывод навигации, либо выводить навигацию вверху или внизу публикаций, либо одновременно и вверху и внизу."
                        },
                        {
                            field: "show_sub_cats",
                            label: "Выводить публикации опубликованные в субкатегориях:",
                            editor: "Switch",
                            hint: "Eсли 'Включено', то публикации опубликованные в субкатегориях будут показываться также при просмотре основной категории. В противном случае вам необходимо будет указывать несколько категорий при публикации."
                        },
                        {
                            field: "allow_tags",
                            label: "Включить поддержку модуля \"Облако тегов\":",
                            editor: "Switch",
                            hint: "Если вы не используете в своей базе \"Облако тегов\", то данный модуль рекомендуется отключить."
                        },
                        {
                            field: "allow_add_tags",
                            label: "Разрешить добавление ключевых слов в облако тегов при добавлении публикации:",
                            editor: "Switch",
                            hint: "Eсли 'Включено', то при добавлении публикации с сайта будет разрешено добавление ключевых слов в облако тегов для группы 'Запись'. Eсли 'Отключено', то только Владелец и Модератор смогут добавлять теги."
                        },
                        {
                            field: "related_only_cats",
                            label: "Искать похожие публикации только в тех же категориях, что и сама публикация:",
                            editor: "Switch",
                            hint: "Eсли 'Включено', то при поиске похожих публикаций, будет учитываться категория к которой принадлежит публикация. И будут выводится только публикация из такой же категории, или субкатегорий (если разрешен вывод публикаций из субкатегорий). Eсли 'Отключено', то будут искаться похожие публикации из всех категорий."
                        },
                        {
                            field: "short_rating",
                            label: "Разрешить выставление рейтинга в списке публикаций:",
                            editor: "Switch",
                            hint: "Вы можете разрешить или запретить пользователям выставлять рейтинг для публикации при просмотре списка публикаций. Eсли 'Отключено', то выставить рейтинг для публикации, можно будет только при просмотре полной публикации."
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
                            <b>Оценка</b> - при данном типе используется пятизвездочный рейтинг публикации. Посетители могут выставлять оценку публикации от 1 до 5 и рейтинг выводится в виде усредненной оценки.<br>
                            <b>Только 'Нравится'</b> - при данном типе, пользователь может выставить что ему нравится данная публикация (система лайков) и выводится количество пользователей которым понравилась ваша публикация.<br>
                            <b>'Нравится' или 'Не нравится'</b> - при данном типе посетители отмечают нравится ли им публикация или не нравится. В данном случае выводится общее значение рейтинга, например, +20 или -10<br>
                            <b>'Нравится' и 'Не нравится'</b> - при данном типе посетители отмечают нравится ли им публикация или не нравится. И выводятся отдельные значения количества лайков и дизлайков, например, +20 и -10<br>
                            `
                        },
                        {
                            field: "last_viewed",
                            label: "Вести учет последних просмотренных публикаций:",
                            editor: "Switch",
                            hint: "При включении данной настройки будет происходит запись последних просмотренных публикаций посетителем."
                        },
                    ]
                },
                { //-------------------------Комментарии-----------------------------------
                    type: "group",
                    items: [{
                            field: "allow_comments",
                            label: "Разрешить комментировать публикации:",
                            editor: "Switch",
                            hint: "Включение или отключение комментариев для всех публикаций."
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
                            label: "Разрешить пользователям подписываться на комментарии публикации:",
                            editor: "Switch",
                            hint: "Включение или отключение подписки на комментарии. В случае если данная опция включена, то пользователь при добавлении комментария сможет подписываться на комментарии к этой публикации, и в случае появления новых комментариев к данной публикации, он будет уведомлен на E-mail об этом."
                        },
                        {
                            field: "allow_combine",
                            label: "Разрешить объединение комментариев:",
                            editor: "Switch",
                            hint: "Включение или отключение объединения комментариев, добавляемых друг за другом от одного посетителя. Если данная настройка включена, то все комментарии, которые добавляет пользователь в течении суток к одной публикации, будут объединены в один комментарий, при условии что комментарии добавляются подряд и между ними нет комментариев других пользователей."
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
                                        id: "DESC"
                                    },
                                    {
                                        Name: "По возрастанию",
                                        id: "ASC"
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
                            Укажите тип рейтинга для комментариев, которые могут выставляться посетителями сайта. Могут использоваться следующие типы:<br>
                            <b>Оценка</b> - при данном типе используется пятизвездочный рейтинг комментария. Посетители могут выставлять оценку комментария от 1 до 5 и рейтинг выводится в виде усредненной оценки.<br>
                            <b>Только 'Нравится'</b> - при данном типе, пользователь может выставить что ему нравится данный комментарий (система лайков) и выводится количество пользователей которым понравился комментарий.<br>
                            <b>'Нравится' или 'Не нравится'</b> - при данном типе посетители отмечают нравится ли им комментарий или не нравится. В данном случае выводится общее значение рейтинга, например, +20 или -10<br>
                            <b>'Нравится' и 'Не нравится'</b> - при данном типе посетители отмечают нравится ли им публикация или не нравится. И выводятся отдельные значения количества лайков и дизлайков, например, +20 и -10<br>
                            `
                        },

                    ],
                },
                { //-------------------------Изображения-----------------------------------
                    type: "group",
                    items: [{
                            field: "max_image",
                            label: "Размер маленькой превью копии загруженного изображения:",
                            validation: {
                                required: {
                                    message: "Поле обязательно для заполнения."
                                },
                            },
                            hint: `Существует две возможности использования данной настройки:<br>
                            <b>Первая:</b> Вы задаете максимальный размер в пикселях любой из сторон загружаемой картинки при превышении которого будет создаваться уменьшенная копия. Например: <b>400</b><br>
                            <b>Вторая:</b> Вы задаете ширину и высоту уменьшенной копии изображения в формате ширина x высота. Например: <b>100x100.</b><br>
                            Вы можете указать 0, если не хотите создавать превью копии загружаемых картинок на сервер.`
                        },
                        {
                            field: "medium_image",
                            label: "Размер средней копии загруженного изображения:",
                            validation: {
                                required: {
                                    message: "Поле обязательно для заполнения."
                                },
                            },
                            hint: `Существует две возможности использования данной настройки:<br>
                            <b>Первая:</b> Вы задаете максимальный размер в пикселях любой из сторон загружаемой картинки при превышении которого будет создаваться уменьшенная копия. Например: <b>400</b><br>
                            <b>Вторая:</b> Вы задаете ширину и высоту уменьшенной копии изображения в формате ширина x высота. Например: <b>100x100.</b><br>
                            Вы можете указать 0, если не хотите создавать превью копии загружаемых картинок на сервер.`
                        },
                        {
                            field: "image_align",
                            editor: "DropDownList",
                            label: "Выравнивание картинок по умолчанию:",
                            editorOptions: {
                                dataTextField: "Name",
                                dataValueField: "id",
                                dataSource: [{
                                        Name: "Без выравнивания",
                                        id: ""
                                    },
                                    {
                                        Name: "По левому краю",
                                        id: "left"
                                    },
                                    {
                                        Name: "По центру",
                                        id: "center"
                                    },
                                    {
                                        Name: "По правому краю",
                                        id: "right"
                                    },
                                ]
                            },
                            hint: "Выберите тип выравнивания добавляемых в публикацию картинок. Данный тип будет предлагаться по умолчанию в выпадающих меню."
                        },
                        {
                            field: "thumb_dimming",
                            label: "Автоматическое затемнение сайта при показе оригинального изображения:",
                            editor: "Switch",
                            hint: "Eсли 'Включено', то при увеличении уменьшенного изображения до оригинального, общий фон сайта будет затемняться."
                        },
                        {
                            field: "thumb_gallery",
                            label: "Режим галереи при просмотре уменьшенных изображений:",
                            editor: "Switch",
                            hint: "Eсли 'Включено', то при просмотре оригинальных изображений из уменьшенных копий, на изображениях будет выводится навигация для показа следующей картинки, запуска слайдшоу и т.д. Данный режим включается для картинок только при просмотре полных публикаций или статических страниц."
                        },
                        {
                            field: "outlinetype",
                            editor: "DropDownList",
                            label: "Вид оригинального изображения при увеличении из уменьшенной копии:",
                            validation: {
                                required: {
                                    message: "Поле обязательно для заполнения."
                                },
                            },
                            editorOptions: {
                                dataTextField: "Name",
                                dataValueField: "id",
                                dataSource: [{
                                        Name: "С закругленными краями и тенью",
                                        id: 0
                                    },
                                    {
                                        Name: "С прямыми краями и тенью",
                                        id: 1
                                    },
                                    {
                                        Name: "Только тень",
                                        id: 1
                                    },
                                    {
                                        Name: "Только рамка без тени",
                                        id: 1
                                    },
                                ]
                            },
                            hint: "Укажите тип вида оригинального изображения, при увеличении его из уменьшенной копии данного изображения."
                        },
                    ]
                }

            ],
            formatLabel: function(field) {
                return field + ":";
            },
            validateField: function(e) {
                e.preventDefault();
                validationSuccess.html("<div class='k-messagebox k-messagebox-error'>Form data is valid!</div>");
            },
            submit: function(e) {

            },

        });

        // $('#setupbzform fieldset').replaceWith(function() {
        //     return $("<div />", {
        //         html: $(this).html()
        //     });
        // });
        // $('#setupbzform fieldset').eq(0).outerHtml('<div><fieldset class="k-form-fieldset ">'+$('#setupbzform fieldset').eq(0).html()+'</fieldset></div>');
        // $('#setupbzform fieldset').eq(1).outerHtml('<div><fieldset class="k-form-fieldset ">'+$('#setupbzform fieldset').eq(1).html()+'</fieldset></div>');

        $('#idsetup').find('div').eq(0).css('height', '100%');
        $('#setupbzform .k-form-legend').remove();
        $('#setupbzform fieldset').eq(0).appendTo('#fil1');
        $('#setupbzform fieldset').eq(1).appendTo('#fil2');
        $('#setupbzform fieldset').eq(2).appendTo('#fil3');

        $('#setupbzform .k-form-buttons').appendTo('#setupbzform');
        $('#setupbzform .k-form-buttons').prepend("<button id='iddefaultder' onclick='default_setting();' style='position: absolute; left: 81px;'><span class='k-icon k-i-invert-colors'></span>Сбросить по умолчанию</button>");
        $('#setupbzform .k-form-buttons').append("<button id='setcloseform' onclick='winsetup.close(); return false;'><span class='k-icon k-i-x-outline'></span>Отмена</button>");
        $("#setcloseform, #iddefaultder").kendoButton({

        });

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