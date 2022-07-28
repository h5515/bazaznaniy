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

if (empty($member_id['name'])||empty($_POST['news_id'])) die();
$id = $_POST['news_id'];
$script = "";
$con = $db->super_query("SELECT count(post_id) as count FROM dle_post_view WHERE user = '{$member_id['name']}' and post_id = $id")['count'];
if ($con<1)
    $script = "top.postMessage('prochitan','*');";

$db->query("INSERT INTO dle_post_view (user, post_id, date_read) VALUES ('{$member_id['name']}',$id, '{$_TIME}') ON DUPLICATE KEY UPDATE date_read = '{$_TIME}'");

echo $script;
