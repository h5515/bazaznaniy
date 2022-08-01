<?php
/*
=====================================================
 DataLife Engine - by SoftNews Media Group 
-----------------------------------------------------
 http://dle-news.ru/
-----------------------------------------------------
 Copyright (c) 2004-2020 SoftNews Media Group
=====================================================
 This code is protected by copyright
=====================================================
 File: controller.php
-----------------------------------------------------
 Use: AJAX Controller
=====================================================
*/

@error_reporting(E_ALL ^ E_WARNING ^ E_DEPRECATED ^ E_NOTICE);
@ini_set('error_reporting', E_ALL ^ E_WARNING ^ E_DEPRECATED ^ E_NOTICE);
@ini_set('display_errors', true);
@ini_set('html_errors', false);

define('DATALIFEENGINE', true);
define('ROOT_DIR', substr(dirname(__FILE__), 0, -12));
define('ENGINE_DIR', ROOT_DIR . '/engine');

$mod = str_replace(chr(0), '', (string)$_REQUEST['mod']);
$mod = trim(strtolower(strip_tags($mod)));
$mod = preg_replace("/\s+/ms", "_", $mod);
$mod = str_replace("/", "_", $mod);
$mod = preg_replace("/[^a-z0-9\_\-]+/mi", "", $mod);

if (!$mod) {

	header("HTTP/1.1 403 Forbidden");
	header('Location: ../../');
	die("Hacking attempt!");
}

require_once(ENGINE_DIR . '/classes/plugins.class.php');

@header("Content-type: text/html; charset=" . $config['charset']);
date_default_timezone_set($config['date_adjust']);

$admin_modules = array("adminfunction", "antivirus", "clean", "upload", "find_relates", "find_tags", "keywords", "rebuild", "rss", "sitemap", "templates", "updates", "plugins");

if (in_array($mod, $admin_modules)) {

	include_once(DLEPlugins::Check(ENGINE_DIR . '/inc/include/functions.inc.php'));

	$selected_language = $config['langs'];

	if (isset($_COOKIE['selected_language'])) {

		$_COOKIE['selected_language'] = trim(totranslit($_COOKIE['selected_language'], false, false));

		if ($_COOKIE['selected_language'] != "" and @is_dir(ROOT_DIR . '/language/' . $_COOKIE['selected_language'])) {
			$selected_language = $_COOKIE['selected_language'];
		}
	}

	if (file_exists(DLEPlugins::Check(ROOT_DIR . '/language/' . $selected_language . '/adminpanel.lng'))) {
		include_once(DLEPlugins::Check(ROOT_DIR . '/language/' . $selected_language . '/adminpanel.lng'));
	}
} else {

	include_once(DLEPlugins::Check(ENGINE_DIR . '/modules/functions.php'));

	if ($_REQUEST['skin']) {
		$_REQUEST['skin'] = $_REQUEST['dle_skin'] = trim(totranslit($_REQUEST['skin'], false, false));
	}

	if ($_REQUEST['dle_skin']) {

		$_REQUEST['dle_skin'] = trim(totranslit($_REQUEST['dle_skin'], false, false));

		if ($_REQUEST['dle_skin'] and @is_dir(ROOT_DIR . '/templates/' . $_REQUEST['dle_skin'])) {

			$config['skin'] = $_REQUEST['dle_skin'];
		} else {

			$_REQUEST['dle_skin'] = $_REQUEST['skin'] = $config['skin'];
		}
	} elseif ($_COOKIE['dle_skin']) {

		$_COOKIE['dle_skin'] = trim(totranslit((string)$_COOKIE['dle_skin'], false, false));

		if ($_COOKIE['dle_skin'] and is_dir(ROOT_DIR . '/templates/' . $_COOKIE['dle_skin'])) {
			$config['skin'] = $_COOKIE['dle_skin'];
		}
	}

	if ($config["lang_" . $config['skin']] and file_exists(DLEPlugins::Check(ROOT_DIR . '/language/' . $config["lang_" . $config['skin']] . '/website.lng'))) {

		include_once(DLEPlugins::Check(ROOT_DIR . '/language/' . $config["lang_" . $config['skin']] . '/website.lng'));
	} else {

		include_once(DLEPlugins::Check(ROOT_DIR . '/language/' . $config['langs'] . '/website.lng'));
	}
}

if (!$config['http_home_url']) {
	$config['http_home_url'] = explode("engine/ajax/controller.php", $_SERVER['PHP_SELF']);
	$config['http_home_url'] = reset($config['http_home_url']);
}

if (strpos($config['http_home_url'], "//") === 0) {
	$config['http_home_url'] = isSSL() ? $config['http_home_url'] = "https:" . $config['http_home_url'] : $config['http_home_url'] = "http:" . $config['http_home_url'];
} elseif (strpos($config['http_home_url'], "/") === 0) {
	$config['http_home_url'] = isSSL() ? $config['http_home_url'] = "https://" . $_SERVER['HTTP_HOST'] . $config['http_home_url'] : "http://" . $_SERVER['HTTP_HOST'] . $config['http_home_url'];
} elseif (isSSL() and stripos($config['http_home_url'], 'http://') !== false) {
	$config['http_home_url'] = str_replace("http://", "https://", $config['http_home_url']);
}

if (substr($config['http_home_url'], -1, 1) != '/') $config['http_home_url'] .= '/';

dle_session();

$user_group = get_vars("usergroup");
if (isset($user_group) && count($user_group) < 1)
  unset($user_group);

if (!$user_group) {
	$user_group = array();

	$db_gl->query("SELECT * FROM " . USERPREFIX . "_usergroups ORDER BY id ASC");

	while ($row = $db_gl->get_row()) {

		$user_group[$row['id']] = array();

		foreach ($row as $key => $value) {
			$user_group[$row['id']][$key] = stripslashes($value);
		}
	}
	set_vars("usergroup", $user_group);
}

$cat_info = get_vars("category");

if (!is_array($cat_info)) {
	$cat_info = array();

	$db->query("SELECT * FROM " . PREFIX . "_category ORDER BY posi ASC");
	while ($row = $db->get_row()) {

		if (!$row['active']) continue;

		$cat_info[$row['id']] = array();

		foreach ($row as $key => $value) {
			$cat_info[$row['id']][$key] = stripslashes($value);
		}
	}
	set_vars("category", $cat_info);
	$db->free();
}

$is_logged = false;

require_once(DLEPlugins::Check(ENGINE_DIR . '/modules/sitelogin.php'));


if (isset($_SESSION['dbname'])) {
	$_GET['project'] = $_SESSION['dbname'];
}

if (isset($_GET['project'])) {
	$bz_cat = 2;
	$glcat = get_bz($_GET['project']);
} else {
	$bz_cat = 1;
	if (isset($_POST['category']) && $_POST['category'] <> '')
		$glcat = $_POST['category'];
	if (isset($_POST['categoris']) && $_POST['categoris'] <> '')
		$glcat = $_POST['categoris'];
	if (isset($_POST['action']))
		$glcat = $_POST['id'];
	if (isset($_POST['post_id']))
		$glcat = get_idcat_post($_POST['post_id']);
	if (isset($_GET['mod']) && ($_GET['mod'] == 'editcomments' || $_GET['mod'] == 'deletecomments') && isset($_GET['id']))
		$glcat = get_idcategocomment($_GET['id']);
	if (isset($_POST['comm_txt']) && $_POST['action'] == 'save' && isset($_POST['id']))
		$glcat = get_idcategocomment($_POST['id']);

	if (isset($_GET['mod']) && $_GET['mod'] == 'rating')
		$glcat = get_idcat_post($_GET['news_id']);

	if (isset($_POST['subaction']) && $_POST['subaction'] == 'upload')
		$glcat = get_idcat_post($_POST['news_id']);
	$glcat = explode(',', $glcat);
	$glcat = get_idcategories($glcat[0]);
}

if ($_SESSION['super_admin'])
	$member_id['user_group'] = 1;
else
	$member_id['user_group'] = $member_id['dostup'][$bz_cat][$glcat]['roly'];

if (empty($glcat) && empty($_GET['project']) && empty($member_id['user_group'])) {
	$dopconfigFile = $_SESSION['dopconfig'];
} else {
	if ($bz_cat == 1)
		$dopconfigFile = "dopconfig$glcat.php";
	else
		$dopconfigFile = "dopconfig{$_GET['project']}.php";
}

include ENGINE_DIR . '/data/dopconfig.php';

if (empty($member_id['user_group']) && isset($_SESSION['user_group']))
	$member_id['user_group'] = $_SESSION['user_group'];

if (!$is_logged) $member_id['user_group'] = 5;

if ($is_logged and $member_id['banned'] == "yes") die("User banned");


if (file_exists(DLEPlugins::Check(ENGINE_DIR . '/ajax/' . $mod . '.php'))) {

	include_once(DLEPlugins::Check(ENGINE_DIR . '/ajax/' . $mod . '.php'));
} else {

	header("HTTP/1.1 403 Forbidden");
	header('Location: ../../');
	die("Hacking attempt!");
}
