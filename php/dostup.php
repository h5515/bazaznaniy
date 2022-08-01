<?php
// session_start();
@error_reporting(E_ALL ^ E_WARNING ^ E_NOTICE);
@ini_set('display_errors', true);
@ini_set('html_errors', false);
@ini_set('error_reporting', E_ALL ^ E_WARNING ^ E_NOTICE);
define('DATALIFEENGINE', true);
define('ROOT_DIR', dirname(__FILE__) . '/../');
define('ENGINE_DIR', ROOT_DIR . 'engine');

include ENGINE_DIR . '/data/config.php';
require_once ENGINE_DIR . '/classes/mysql.php';
require_once ENGINE_DIR . '/data/dbconfig.php';
require_once ENGINE_DIR . '/modules/functions.php';
dle_session();
require_once ENGINE_DIR . '/modules/sitelogin.php';
require_once ROOT_DIR . '/language/' . $config['langs'] . '/website.lng';
require_once(ENGINE_DIR . '/classes/plugins.class.php');
include_once(DLEPlugins::Check(ENGINE_DIR . '/classes/parse.class.php'));

if (isset($_GET['save'])) {
    $id_cat = $_GET['idcategory'];
    $rol = $_POST['rol'];

    $category = $_POST['category'];
    $project = $_POST['project'];
    $dproject = '';
    if ($project != "") $dproject = "AND project = '{$project}'";


        $db_gl->query("DELETE FROM dle_cat_dostup WHERE id_category = {$id_cat} AND category = $category $dproject");


    foreach ($rol as $key => $value) {
        if ($value['user'] == '') $value['user'] = null;
        if ($value['adgrup'] == '') $value['adgrup'] = null;
        if ($value['usergrup'] == '') $value['usergrup'] = null;
            $db_gl->query("INSERT INTO dle_cat_dostup (id_category, roly, user, ad_grup, user_grup, category, project) VALUE (
        '{$id_cat}', '{$value['roly']}', '{$value['user']}', '{$value['adgrup']}', '{$value['usergrup']}', '$category', '$project'
        )");

    }
    die();
}

// if (empty($_POST['idcategory'])) {
//     $err = 'Error: Что-то пошло не так. Отсутствует ID базы.';
//     die($err);
// }

$_POST['script_error'] = "windostup.center();";


$cat = $_POST['category'];
$project = $_POST['project'];

if ($project != "") $project = "AND project = '{$project}'";
else
if ($_POST['idcategory'] != '')
    $idacc = "a.id_category = {$_POST['idcategory']} AND";

$sql = "SELECT a.user, a.roly as rolyid, b.name as roly, a.ad_grup, a.user_grup FROM dle_cat_dostup as a
LEFT JOIN dle_cat_roly_right as b ON a.roly = b.id 
WHERE $idacc category = $cat $project
ORDER BY a.roly
";

$rows = $db_gl->query($sql);
$shablon = shablon_load("dostup.html");
$db2 = new db;
//   include(ENGINE_DIR . "/data/supconfig.php");
$db2->connect(DBUSER, DBPASS, DBGNAME, DBHOST);


foreach ($rows as $key => $value) {
    $value['us'] = "";
    $value['icon'] = "";
    $value['strel'] = "";
    if (isset($value['user']) && $value['user'] != '') {
        $sql = "SELECT fullname, foto FROM dle_users WHERE name = '{$value['user']}'";
        $row = $db2->super_query($sql);
        $value['us'] = $row['fullname'];
        $value['icon'] = "user.png";
        if ($value['rolyid'] == 1 && mb_strtolower($member_id['name']) == mb_strtolower($value['user']))
            $value['strel'] = 'true';
        if (isset($row['foto']) && $row['foto'] != '') {
            if (!file_exists(ROOT_DIR . "/uploads/fotos/" . $row['foto'])) {
                $value['foto'] = "/templates/Default/dleimages/noavatar.png";
            } else {
                $value['foto'] = $config['http_home_url'] . "uploads/fotos/" . $row['foto'];
            }
        } else $value['foto'] = "/templates/Default/dleimages/noavatar.png";
    }
    if (isset($value['ad_grup']) && $value['ad_grup'] != '') {
        $sql = "SELECT name FROM hv_s_adgrup WHERE guid = '{$value['ad_grup']}'";
        $row = $db2->super_query($sql);
        $value['us'] = $row['name'];
        $value['icon'] = "groupad.png";
        $value['foto'] = '';
    }
    if (isset($value['user_grup']) && $value['user_grup'] != '') {
        $sql = "SELECT fullname FROM dle_users WHERE name = '{$value['user_grup']}'";
        $row = $db2->super_query($sql);
        $value['us'] = "Группа ({$row['fullname']})";
        $value['icon'] = "groupuser.png";
        $value['foto'] = '';
    }
    $html .= compile_table($shablon, $value);
}
$db2->close();
$db2->free();


$data = array(
    "html" => $html,
    "script" => 'windostup.center();createmenu();'
);

sentajax($data);
