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

function listdir($dir) {
	
	$current_dir = @opendir( $dir );
	
	if($current_dir !== false ) {
		while ( $entryname = readdir( $current_dir ) ) {
			if( is_dir( $dir."/".$entryname ) AND ($entryname != "." AND $entryname != "..") ) {
				listdir( $dir."/".$entryname );
			} elseif( $entryname != "." AND $entryname != ".." ) {
				@unlink( $dir."/".$entryname );
			}
		}
		@closedir( $current_dir );
		@rmdir( $dir );
	}

}

function clear_all_caches() {
	global $config;
	
	listdir( ENGINE_DIR . '/cache/system/CSS' );
	listdir( ENGINE_DIR . '/cache/system/HTML' );
	listdir( ENGINE_DIR . '/cache/system/URI' );
	listdir( ENGINE_DIR . '/cache/system/plugins' );

	$catalog = '';
	$catl = '';
	if (isset($_COOKIE['dbname'])) {
		$catalog = $_COOKIE['dbname'];
		$catl = $_COOKIE['dbname'].'/';
	}
	
	$fdir = opendir( ENGINE_DIR . '/cache/system/'.$catalog );
	while ( $file = readdir( $fdir ) ) {
		if( $file != '.' AND $file != '..' AND $file != '.htaccess' AND $file != 'cron.php' ) {
			@unlink( ENGINE_DIR . '/cache/system/'.$catl . $file );
		
		}
	}
	
	if( $config['cache_type'] ) {
		$fdir = opendir( ENGINE_DIR . '/cache'.$catl );
		while ( $file = readdir( $fdir ) ) {
			if( $file != '.htaccess' AND !is_dir($file) ) {
					@unlink( ENGINE_DIR . '/cache/'.$catl . $file );
			}
		}
	}
	
	clear_cache();
	
	if (function_exists('opcache_reset')) {
		opcache_reset();
	}
	
}

function parseJsonArray($jsonArray, $parentID = 0)
{
  $return = array();
  foreach ($jsonArray as $subArray) {
     $returnSubSubArray = array();
     if (isset($subArray['children'])) {
       $returnSubSubArray = parseJsonArray($subArray['children'], $subArray['id']);
     }
     $return[] = array('id' => $subArray['id'], 'parentid' => $parentID);
     $return = array_merge($return, $returnSubSubArray);
  }

  return $return;
}
$glcat = $_REQUEST['id'];
$glcat = get_idcategories( $glcat );

    $glcat = ( int )$glcat;

if ($_REQUEST['action'] == "vostan") {
		if( !$user_group[$member_id[ 'user_group' ] ][ 'moderation' ] ) die ("error");	
	if( $_REQUEST['user_hash'] == "" or $_REQUEST['user_hash'] != $dle_login_hash ) {		
		die ("error");
	}	
	$id = ( int )$_POST['id'];
	if ($id==0) die ("error");
	$cots = getSubCatList( $id );
        $aviable = array();
        $aviable = explode( ',', $cots );
	$sql = "UPDATE dle_post set arhiv = 0 WHERE category regexp '[[:<:]](" . implode( '|', $aviable ) . ")[[:>:]]'";
	$db->query($sql);
	
	$sql = "UPDATE dle_category set arhiv = 0 WHERE id regexp '[[:<:]](" . implode( '|', $aviable ) . ")[[:>:]]'";
	$db->query($sql);	
	
	$buffer = 'reload';
}

if ($_REQUEST['action'] == "update") {
		if( !$user_group[$member_id[ 'user_group' ] ][ 'moderation' ] ) die ("error");	
	if( $_REQUEST['user_hash'] == "" or $_REQUEST['user_hash'] != $dle_login_hash ) {		
		die ("error");
	}	
	$id = ( int )$_POST['id'];
	if ($id==0) die ("error");
	
	$catname = $_POST['name'];
	
	$alt_cat_name = totranslit( stripslashes( $catname ), true, false );
	
	$row = $db->super_query("SELECT COUNT(id) as c FROM dle_category WHERE alt_name='{$alt_cat_name}'");

	if ($row['c']!=0){
		$alt_cat_name .= random_int(1, 100000);
	}
	
	$sql = "UPDATE dle_category set name = '{$catname}', alt_name = '{$alt_cat_name}' WHERE id = {$id}";
	$db->query($sql);		
	
	$buffer = $alt_cat_name;
	clear_all_caches();	
}

if ($_REQUEST['action'] == "del") {
		if( !$user_group[$member_id[ 'user_group' ] ][ 'moderation' ] ) die ("error");	
	if( $_REQUEST['user_hash'] == "" or $_REQUEST['user_hash'] != $dle_login_hash ) {		
		die ("error");
	}	
	$id = ( int )$_POST['id'];
	if ($id==0) die ("error");
	$cots = getSubCatList( $id );
        $aviable = array();
        $aviable = explode( ',', $cots );
	//$sql = "DELETE dle_post set arhiv = 1 WHERE category regexp '[[:<:]](" . implode( '|', $aviable ) . ")[[:>:]]'";
	//$db->query($sql);
	
	$sql = "DELETE FROM dle_category WHERE id regexp '[[:<:]](" . implode( '|', $aviable ) . ")[[:>:]]'";
	$db->query($sql);	
	
	$sql = "SELECT id FROM dle_post Where category regexp '[[:<:]](" . implode( '|', $aviable ) . ")[[:>:]]'";
	$result = $db->query($sql);
	
	while ( $row = $db->get_row( $sql_result ) ) {
		deletenewsbyid( $row['id'], false);
	}
	clear_all_caches();	
	$buffer = 'reloadparent';
}

if ($_REQUEST['action'] == "arhiv") {
		if( !$user_group[$member_id[ 'user_group' ] ][ 'moderation' ] ) die ("error");	
	if( $_REQUEST['user_hash'] == "" or $_REQUEST['user_hash'] != $dle_login_hash ) {		
		die ("error");
	}	
	$id = ( int )$_POST['id'];
	if ($id==0) die ("error");
	$cots = getSubCatList( $id );
        $aviable = array();
        $aviable = explode( ',', $cots );
	$sql = "UPDATE dle_post set arhiv = 1 WHERE category regexp '[[:<:]](" . implode( '|', $aviable ) . ")[[:>:]]'";
	$db->query($sql);
	
	$sql = "UPDATE dle_category set arhiv = 1 WHERE id regexp '[[:<:]](" . implode( '|', $aviable ) . ")[[:>:]]'";
	$db->query($sql);	
	
	$buffer = 'reloadparent';
}

if ($_REQUEST['action'] == "addcat") {
	if( !$user_group[$member_id[ 'user_group' ] ][ 'moderation' ] ) die ("error");	
	if( $_REQUEST['user_hash'] == "" or $_REQUEST['user_hash'] != $dle_login_hash ) {		
		die ("error");
	}
	$catname = $_POST['name'];
	$parentid = ( int )$_POST['id'];
	$alt_cat_name = totranslit( stripslashes( $catname ), true, false );
	
	if ($parentid==0) die ("error");
	if ($catname=="") die ("error");	
	
	$row = $db->super_query("SELECT COUNT(id) as c FROM dle_category WHERE alt_name='{$alt_cat_name}'");

	if ($row['c']!=0){
		$alt_cat_name .= random_int(1, 100000);
	}

	$row = $db->super_query("SELECT MAX(posi) as max FROM dle_category");
	$pos = $row['max']+1;
	
	$db->query( "INSERT INTO dle_category (parentid, name, posi, alt_name) VALUES ({$parentid},'{$catname}',{$pos},'{$alt_cat_name}')");
	
	$id = $db->insert_id();
	
	$buffer = $id."|".$alt_cat_name;
	clear_all_caches();
	
}


if ($_REQUEST['action'] == "catsort") {

	if( !$user_group[$member_id[ 'user_group' ] ][ 'moderation' ] ) die ("error");	
	if( $_REQUEST['user_hash'] == "" or $_REQUEST['user_hash'] != $dle_login_hash ) {		
		die ("error");
	}
	
	$_POST['list'] = json_decode(stripslashes($_POST['list']), true);

	if ( !is_array($_POST['list']) ) die ("error");
	
	$_POST['list'] = parseJsonArray($_POST['list']);
	
	$i= 0;

	foreach ( $_POST['list'] as $value ) {
		$i++;

		$id = intval($value['id']);
		$parentid = intval($value['parentid']);
		
		if ( $id ) {
			//$buffer .= $id.", ";
			if ($parentid!=0) $parent = "parentid='{$parentid}',";
				else
					$parent = "parentid='{$glcat}',";
			$db->query( "UPDATE " . PREFIX . "_category SET $parent posi='{$i}' WHERE id = '{$id}'" );

		}
	}

	//clear_all_caches();
	//$db->query( "INSERT INTO " . USERPREFIX . "_admin_logs (name, date, ip, action, extras) values ('".$db->safesql($member_id['name'])."', '{$_TIME}', '{$_IP}', '11', '')" );

	$buffer = 'ok';
	//$db->free();
	clear_all_caches();
}


	echo $buffer;



?>