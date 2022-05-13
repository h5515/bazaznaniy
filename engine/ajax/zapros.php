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

$comand = $_POST['comand'];

$aviable = explode( ',', $_POST['categor'] );
$catserch = "WHERE category regexp '[[:<:]](" . implode( '|', $aviable ) . ")[[:>:]]'";

if ($comand=="autor"){
	$sql = "SELECT autor, COUNT(id) AS count  FROM " . PREFIX . "_post $catserch GROUP BY autor ORDER BY count DESC";
}
//echo $sql;

$db->query( $sql );

while ( $row = $db->get_row() ) {
	echo "<span><a href='#' onClick=\"filtered(this,'Автор - {$row['autor']}');return false;\"><table class='navigatr'><tr><td>{$row['autor']}</td><td align='right'>{$row['count']}</td></tr></table></a></span>";	
  }

$db->free();


?>