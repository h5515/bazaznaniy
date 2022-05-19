<?php
define('DATALIFEENGINE', true);
define('ROOT_DIR', dirname(__FILE__) . '../../');
define('ENGINE_DIR', ROOT_DIR . 'engine');
include ENGINE_DIR . '/data/config.php';
require_once ENGINE_DIR . '/classes/mysql.php';
require_once ENGINE_DIR . '/data/dbconfig.php';
require_once ENGINE_DIR . '/modules/functions.php';

function compile_menu()
{
    global $db;
    $rows = $db->query("SELECT * FROM dle_cat_roly_right ORDER BY id");
    $html = "";
    foreach ($rows as $key => $value) {
        $html .= "<li class='option-item' data-value='{$value['id']}'>{$value['name']}</li>";
    }
    echo $html;
}

?>

<div id="buttonadduser">
    <p>
        <button type="button" data-role="button" data-icon="add" onclick="">Добавить пользователей</button>
        <button type="button" data-role="button" data-icon="add" onclick="">Добавить группы</button>
    </p>
</div>
<div class="dostupitems">


</div>

<div class="dostupbutend">
    <button type="button" data-role="button" data-icon="close" onclick="windostup.close();">Закрыть</button>
    <button type="button" data-role="button" data-icon="save" class="k-button-solid-primary" style="display: none;" onclick="">Сохранить</button>
    <button type="button" data-role="button" data-icon="close-outline" style="display: none;" onclick="windostup.close();">Отмена</button>
</div>

<div class="combobox-wrapper">
    <div class="combobox-container">
        <ul class="combobox-options">
            <?php compile_menu(); ?>
        </ul>
    </div>
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
    kendo.init("#buttonadduser");
    kendo.init(".dostupbutend");
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

    .combobox-options {
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
        background: #fff url(../../../skins/default/images/blank.gif);
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
    }
</style>