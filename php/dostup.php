<?php
// session_start();
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
require_once ROOT_DIR . '/language/' . $config['langs'] . '/website.lng';
require_once(ENGINE_DIR . '/classes/plugins.class.php');
include_once(DLEPlugins::Check(ENGINE_DIR . '/classes/parse.class.php'));

if (empty($_POST['idcategory'])) {
    $err = 'Error: Что-то пошло не так. Отсутствует ID базы.';
    die($err);
}

$_POST['script_error'] = "windostup.center();";


if ($_POST['category'] == 1) {

    $sql = "SELECT a.user, a.roly as rolyid, b.name as roly, a.ad_grup, a.user_grup FROM dle_cat_dostup as a
LEFT JOIN dle_cat_roly_right as b ON a.roly = b.id 
WHERE a.id_category = {$_POST['idcategory']} 
ORDER BY a.roly
";

    $rows = $db->query($sql);
    $shablon = shablon_load("dostup.html");
    $db2 = new db;
    include(ENGINE_DIR . "/data/supconfig.php");
    $db2->connect($supconfig['dbuser'], $supconfig['dbpass'], $supconfig['dbname'], $supconfig['dbhost']);


    foreach ($rows as $key => $value) {
        $value['us'] = "";
        $value['icon'] = "";
        $value['strel']= "";
        if (isset($value['user'])) {
            $sql = "SELECT fullname FROM dle_users WHERE name = '{$value['user']}'";
            $row = $db2->super_query($sql);
            $value['us'] = $row['fullname'];
            $value['icon'] = "user.png";
            if ($value['rolyid']==1)
                $value['strel']='true';
        }
        if (isset($value['ad_grup'])) {
            $sql = "SELECT name FROM hv_s_adgrup WHERE guid = '{$value['ad_grup']}'";
            $row = $db2->super_query($sql);
            $value['us'] = $row['name'];
            $value['icon'] = "groupad.png";
        }
        if (isset($value['user_grup'])) {
            $sql = "SELECT fullname FROM dle_users WHERE name = '{$value['user_grup']}'";
            $row = $db2->super_query($sql);
            $value['us'] = "Группа ({$row['fullname']})";
            $value['icon'] = "groupuser.png";
        }
        $html .= compile_table($shablon, $value);
    }
    $db2->close();
    $db2->free();
}

$data = array(
    "html" => $html,
    "script" => "windostup.center();"
);

sentajax($data);
