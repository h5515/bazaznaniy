<?php
@session_start();
@error_reporting( E_ALL ^ E_WARNING ^ E_NOTICE );
@ini_set( 'display_errors', true );
@ini_set( 'html_errors', false );
@ini_set( 'error_reporting', E_ALL ^ E_WARNING ^ E_NOTICE );

define( 'DATALIFEENGINE', true );
define( 'ROOT_DIR', '../..' );
define( 'ENGINE_DIR', '..' );

include ENGINE_DIR . '/data/config.php';

require_once ENGINE_DIR . '/classes/mysql.php';
require_once ENGINE_DIR . '/classes/templates.class.php';
require_once ENGINE_DIR . '/data/dbconfig.php';
require_once ENGINE_DIR . '/modules/functions.php';
require_once ENGINE_DIR . '/modules/sitelogin.php';
require_once ROOT_DIR . '/language/' . $config[ 'langs' ] . '/website.lng';

$id = $_REQUEST['id'];
$ustl = $_REQUEST['ustl'];
$user = $member_id['name'];

$db->query( "DELETE FROM " . PREFIX . "_post_read WHERE user = '{$user}' AND id_news = '{$id}'");
if ($ustl=='true'){   
    $db->query( "INSERT INTO " . PREFIX . "_post_read (id_news, user) VALUES ('".$id."','".$user."')");
}

 clear_cache( array('full_'.$id, 'news_', 'related_', 'tagscloud_', 'archives_', 'calendar_', 'topnews_', 'rss', 'stats' ) );

?>
