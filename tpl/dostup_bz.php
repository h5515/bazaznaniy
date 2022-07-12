<?php
session_start();
define('DATALIFEENGINE', true);
define('ROOT_DIR', dirname(__FILE__) . '../../');
define('ENGINE_DIR', ROOT_DIR . 'engine');
include ENGINE_DIR . '/data/config.php';
require_once ENGINE_DIR . '/classes/mysql.php';
require_once ENGINE_DIR . '/data/dbconfig.php';
require_once ENGINE_DIR . '/modules/functions.php';
require_once ENGINE_DIR . '/modules/sitelogin.php';

function compile_menu()
{
    global $db_gl;
    $rows = $db_gl->query("SELECT * FROM dle_cat_roly_right ORDER BY id");
    $html = "";
    foreach ($rows as $key => $value) {
        $html .= "<li class='option-item' data-value='{$value['id']}'>{$value['name']}</li>";
    }
    echo $html;
}



if ($_GET['category'] == '1')
    $prj = $_GET['idcat'];
if ($_GET['category'] == '2')
    $prj = $_GET['project'];

if (!check_dostup($_GET['category'], $prj, 1)) {
    die("<h1>Доступ запрещён.</h1>");
}
?>

<div id="buttonadduser">
    <p>
        <button type="button" data-role="button" data-icon="add" data="user" onclick="spisoc_on(this)">Добавить
            пользователей</button>
        <button type="button" data-role="button" data-icon="add" data="grup" onclick="spisoc_on(this)">Добавить
            группы</button>
    </p>
</div>
<div class="dostupitems">


</div>

<div class="dostupbutend">
    <button type="button" data-role="button" data-icon="close" onclick="windostup.close();">Закрыть</button>
    <button type="button" data-role="button" data-icon="save" class="k-button-solid-primary" style="display: none;" onclick="">Сохранить</button>
    <button type="button" data-role="button" data-icon="close-outline" style="display: none;" onclick="windostup.close();">Отмена</button>
</div>

<!-- <div class="combobox-wrapper">
    <div class="combobox-container"> -->
<div id="menuclone">

</div>
<div id="smmenu">
    <ul class="combobox-options" style="display: none;">
        <?php compile_menu(); ?>
    </ul>
</div>
<!-- </div>
</div> -->
<div id="dopidspisok" style="display: none;">

</div>

<script>
    idcat = "<?php echo $_GET['idcat'] ?>";
    project = "<?php echo $_GET['project'] ?>";
    category = "<?php echo $_GET['category'] ?>";
    dt = {
        user_hash: dle_login_hash,
        idcategory: idcat,
        project: project,
        category: category,
    }
    getajaxhtml('/php/dostup.php', dt, '.dostupitems');
    windostup.center();
    kendo.init("#buttonadduser");
    kendo.init(".dostupbutend");

    function dostupknop() {
        $('[data-icon="close"]').css('display', 'none');
        $('[data-icon="save"]').css('display', '');
        $('[data-icon="close-outline"]').css('display', '');
    }

    function createmenu() {
        $("#menuclone .combobox-options").remove();
        $(".combobox-options").clone().prependTo("#menuclone");
        $("#menuclone .combobox-options").kendoContextMenu({
            target: ".strel",
            showOn: "click",
            select: function(e) {
                $elem = $(e.item); //e.target
                $target = $(e.target);
                $telem = $target.closest(".cldostup");
                $telem.attr("data-roly", $elem.attr("data-value"));
                $target.text($elem.text());
                dostupknop();
            }
        });
    }

    $('[data-icon="save"]').click(function() {
        var data = [];
        var dat = {};
        $(".cldostup").each(function() {
            $el = $(this);
            dat = {
                roly: $el.attr('data-roly'),
                user: $el.attr('data-user'),
                adgrup: $el.attr('data-adgrup'),
                usergrup: $el.attr('data-usergrup'),
            }
            data.push(dat);
        })
        kendo.ui.progress($("#iddostup"), true);

        $.ajax({
            type: 'POST',
            url: '/php/dostup.php?idcategory=' + idcat + '&save=ok',
            data: {
                rol: data,
                category: category,
                project: project
            },
            // timeout: 300000, // in milliseconds
            success: function(b) {
                kendo.ui.progress($("#iddostup"), false);
                windostup.close();
            }
        })
    })

    var spisok;

    function spisoc_on(el) {
        if ($("#idspisok")[0]) {
            $('#idspisok').data('kendoWindow').close();
        }

        $("#dopidspisok").append('<div id="idspisok" style="display: none;"></div>');
        spisoc = $('#idspisok').kendoWindow({
            width: '300px',
            height: '500px',
            title: $(el).text(),
            content: {
                url: '/tpl/spisok.php?spis=' + $(el).attr('data'),
                type: "POST",
                data: {
                    noname: 'name'
                },
            },
            visible: false,
            modal: false,
            pinned: false,
            resizable: false,
            autoFocus: true,
            open: function(e) {
                this.center()
            },
            close: function(e) {
                $(document).off('click', '.clspis');
                $("#idspisok").remove();
            }
        }).data('kendoWindow');
        setTimeout(() => {
            spisoc.open();
        }, 50);

    }

    $(document).on('click', '.dostupitems .remove', function() {
        $(this).closest(".cldostup").remove();
        dostupknop();
    })
</script>

<style>
    .combobox-wrapper {
        display: block;
        width: 1px;
        height: 1px;
        line-height: 1px;
        position: absolute;
        right: 0;
        bottom: -5px;
        z-index: 2;
    }

    .combobox-container {
        display: block;
        top: 0px;
        /* max-width: 220px;
        min-width: 120px; */
        width: auto;
        /* display: none; */
        background-color: #fff;
        border: 1px solid #d1d1d1;
        width: auto;
        max-width: 350px;
        margin: -1px 8px 0 0;
        padding: 4px;
        position: absolute;
        right: 0;
        top: 0;
        border-radius: 4px;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        background: #fff;
        box-shadow: 0 2px 4px rgb(0 0 0 / 30%);
        -moz-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 0 2px 4px rgb(0 0 0 / 30%);
        touch-callout: none;
        -o-touch-callout: none;
        -moz-touch-callout: none;
        -webkit-touch-callout: none;
        user-select: none;
        -o-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    /* .combobox-options {
        list-style: none;
        max-height: 200px;
        line-height: 21px;
        margin: 0;
        padding: 0;
        position: relative;
        z-index: 0;
        overflow: hidden;
    }

    .option-item {
        text-decoration: none;
        line-height: 24px;
        margin: 0;
        padding: 0 12px;
        overflow: hidden;
        white-space: nowrap;
        cursor: pointer;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        -moz-text-overflow: ellipsis;
        -webkit-text-overflow: ellipsis;
    } */
</style>