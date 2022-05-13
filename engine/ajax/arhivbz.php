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
require_once( DLEPlugins::Check( ENGINE_DIR . '/modules/functions.php' ) );

$id = $_POST['id'];
$arh = $_POST['arh'];

$sql = "SELECT title, id, tags, category FROM " . PREFIX . "_post WHERE id='{$id}'";
$row = $db->super_query($sql);

$db->query( "UPDATE " . PREFIX . "_post SET arhiv='{$arh}' WHERE id='{$id}'" );

if ($arh==1) {
$db->query( "DELETE FROM " . PREFIX . "_tags WHERE news_id = '{$row['id']}'" );
$texla = "перенесена в Архив!";
}
else {
$texla = "восстановлена!";
    $tags = array();
           // echo  $row[ 'tags' ];
            $tig = explode( ",", $row[ 'tags' ] );

            foreach ( $tig as $value ) {

             $tags[] = "('" . $row[ 'id' ] . "', '" . trim( $value ) . "', '" . $row['category'] . "')";
            }

            $tags = implode( ", ", $tags );
            $sql = "INSERT INTO " . PREFIX . "_tags (news_id, tag, category) VALUES " . $tags;
           // echo $sql;
            $db->query( $sql );

}
$db->free();
  clear_cache( array( 'news_', 'related_', 'tagscloud_', 'topnews_', 'rss', 'stats' ) );
$cat = explode( ",", $row[ 'category' ] );
	   foreach ( $cat as $selected ) {
			   clear_cache( array( 'calendar'.$selected.'_', 'archives'.$selected.'_')); 
		   }
echo "Статья ({$row['title']}) {$texla}";


?>