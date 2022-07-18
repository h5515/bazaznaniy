<?php
session_start();
@error_reporting(E_ALL ^ E_WARNING ^ E_NOTICE);
@ini_set('display_errors', true);
@ini_set('html_errors', false);
@ini_set('error_reporting', E_ALL ^ E_WARNING ^ E_NOTICE);
define('DATALIFEENGINE', true);
define('ROOT_DIR', dirname(__FILE__) . '../../');
define('ENGINE_DIR', ROOT_DIR . 'engine');

include ENGINE_DIR . '/data/config.php';
require_once ENGINE_DIR . '/classes/mysql.php';
require_once ENGINE_DIR . '/data/dbconfig.php';
require_once ENGINE_DIR . '/modules/functions.php';
require_once ENGINE_DIR . '/modules/sitelogin.php';


if ($_SESSION['super_admin'])
    $sql = "SELECT id, icon, name, alt_name, arhiv  FROM dle_category WHERE parentid = 0 AND arhiv = 0 ORDER BY posi";
else {
    if (isset($member_id['spis_category']) && $member_id['spis_category'] != '')
        $sql = "SELECT id, icon, name, alt_name, arhiv  FROM dle_category WHERE parentid = 0 AND arhiv = 0 AND id in ({$member_id['spis_category']}) ORDER BY posi";
}

if ($sql != '')
    $result = $db_gl->query($sql);
$html = '';
$obs = '';
$zak = '';
$namebz = $_GET['name_bz'];
if (!empty($result)) {
    while ($row = $db_gl->get_row($result)) {
        if ($row['icon']) {
            $icon = $row['icon'];
        } else {
            $icon = "/templates/Default/dleimages/bz.png";
        }

        $url = $_SERVER['HTTP_ORIGIN'] . '?do=cat&category=' . $row['alt_name'] . $prjlink;
        $obs .= "<li><a href='$url'><span class='cover titavatar' style='background-image: url($icon);background-size: contain;'></span>{$row['name']}</a></li>";
    }
}

if (isset($member_id['spis_project']) && $member_id['spis_project'] != '')
    $bzid =  $member_id['spis_project'];

if ((isset($bzid)) || ($_SESSION['super_admin'])) {
    if ($_SESSION['super_admin'])
        $sql = "SELECT id, Project, id_cat, arhiv FROM dle_project where arhiv = 0";
    else
        $sql = "SELECT id, Project, id_cat, arhiv FROM dle_project WHERE id in ($bzid) AND arhiv = 0";
    $row = $db_gl->query($sql);
    $db2 = new db;
    $db3 = new db;
    $db3->connect(DBUSER, DBPASS, $gl_bd, DBHOST);
    while ($row = $db_gl->get_row()) {
        $bazeest = $db3->super_query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'bz_{$row['Project']}'");
        if (isset($bazeest)) {
            $db2->connect(DBUSER, DBPASS, 'bz_' . $row['Project'], DBHOST);
            $sql = "SELECT id, icon, name, alt_name  FROM dle_category WHERE id = {$row['id_cat']}";
            $result = $db2->super_query($sql);
            if (!empty($result)) {
                if ($result['icon']) {
                    $icon = $result['icon'];
                } else {
                    $icon = "/templates/default/dleimages/bz.png";
                }
                $url = $_SERVER['HTTP_ORIGIN'] . '?do=cat&project=' . $row['Project'] . '&category=' . $result['alt_name'];

                $zak .= "<li><a href='$url'><span class='cover titavatar' style='background-image: url($icon);background-size: contain;'></span></span>{$result['name']}</a></li>";
                /* echo "<ol sid='{$result['id']}' cat='2' idcat='{$result['id']}' project='{$row['Project']}' project_id='{$row['id']}'>$tempedit<a href='$url'><div class='circlenews'><div class='circleimg' style='background: url($icon);'></div>
			  </div><div class='shottitle'>$harhiv {$result['name']}</div></a></ol>";*/
            }
        }
        $db3->close();
        $db3->free();
        $db2->close();
        $db2->free();
    }
}

$html = "<li><a href='\'><span class='cover titavatar' style='background-image: url(images/logo.ico);background-size: contain;width:20px;height:20px;'></span>На главную</a></li>";

$name_category = $_GET['category'];
$name_project = $_GET['project'];
$id_news = $_GET['id_news'];
$scat_id = $_GET['cat_id'];

if ($name_project != 'false') {
    $cat = 2;
    $cat_id = $db_gl->super_query("SELECT id FROM dle_project WHERE project = '$name_project'");
    if (isset($cat_id))
        $prj = $cat_id['id'];
} else {
    $cat = 1;
    /*if (!is_array($cat_info)) {
        $cat_info = array();
        $db->query("SELECT * FROM " . PREFIX . "_category ORDER BY posi ASC");
        while ($row = $db->get_row()) {
            if (!$row['active']) continue;
            $cat_info[$row['id']] = array();
            foreach ($row as $key => $value) {
                $cat_info[$row['id']][$key] = stripslashes($value);
            }
            $cat_info[$row['id']]['newscount'] = 0;
        }
        set_vars("category", $cat_info);
        $db->free();
    }
    if (($name_category == 'false') and ($id_news != 'false')) {
        $row = $db->super_query("SELECT category FROM dle_post WHERE id = {$id_news}");
        if (isset($row['category'])) {
            $dcat = explode(',', $row['category']);
            $category_id = $dcat[0];
        }
    }
    if ($name_category != 'false' && empty($category_id)) $category_id = get_ID($cat_info, $name_category);
    if (isset($category_id))
        $cat_id = get_idcategories($category_id);*/
    if (isset($scat_id))
        $prj = $scat_id;
}

if ((isset($prj) && check_dostup($cat, $prj, 1))||$_SESSION['super_admin']){
    if ($cat == 2){
        $sr = "'{$scat_id}','{$prj}'";
        $prog = "project='$name_project' project_id='$prj'";
    }else{    
        $sr = "'{$prj}',''";
        $prog = '';
    }
    
    $html .= "
    <li>Параметры
    <ul id='idparambz' sid='$scat_id' cat='$cat' idcat='$scat_id' $prog>
    <li><a href='#' onclick=\"ondostup('$namebz',{$sr},'$cat');return false;\" class='deldostup'><span class='k-icon k-i-lock'></span><span>Доступ</span></a></li>
    <li><span class='k-icon k-i-edit-tools'></span><span class='popmenu' elem='edit_name'> Редактировать имя </span></li>
    <li><span class='k-icon k-i-image-edit'></span><span class='popmenu' elem='edit_obl'> Изменить обложку </span></li>
    <li><span class='k-icon k-i-file-zip'></span><span class='popmenu' elem='arhive' id='idmenarch'> Архивировать </span></li>
    <li><span class='k-icon k-i-delete'></span><span class='popmenu' elem='delete'> Удалить </span></li>
    <li><span class='k-icon k-i-apply-format'></span><span class='popmenu' elem='clearcash'> Очистить кэш </span></li>
    </ul>
    </li>
    <script src='/templates/Default/js/new/bz_param.js'></script>
    ";
}

if ($obs != '' && $zak != '') {
    $html .= "
    <li><a href='#' onclick='return false;' style='justify-content: space-between;'>Внутренние инструкции</a>
    <ul>$obs</ul></li>
    <li><a href='#' onclick='return false;' style='justify-content: space-between;'>Инструкции заказчика</a>
    <ul>$zak</ul></li>
    ";
} else {
    $html .= $obs . $zak;
}
//<span class='k-icon k-i-user'>

$data = array(
    "html" => $html,
    "script" => "$('.menubz').kendoMenu();
    if ($('[gbar=true]')[0])
        $('#idmenarch').text(' Восстановить ').attr('elem', 'noarhive');
    "
);

sentajax($data);
