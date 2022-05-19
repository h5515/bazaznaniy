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
 File: sitelogin.php
-----------------------------------------------------
 Use: authorization of visitors to the site
=====================================================
*/

if (!defined('DATALIFEENGINE')) {
	header("HTTP/1.1 403 Forbidden");
	header('Location: ../../');
	die("Hacking attempt!");
}

$_IP = get_ip();
$_TIME = time();
$dle_login_hash = "";
$allow_login = true;

if (isset($_REQUEST['action']) and $_REQUEST['action'] == "logout") {

	$dle_user_id = "";
	$dle_password = "";
	set_cookie("dle_user_id", "", 0);
	set_cookie("dle_password", "", 0);
	set_cookie("dle_skin", "", 0);
	set_cookie("dle_newpm", "", 0);
	set_cookie("dle_hash", "", 0);
	set_cookie("site_bz", "", 0);
	unset($_COOKIE['site_bz']);
	set_cookie("user_name", "", 0);
	set_cookie("user_email", "", 0);
	unset($_COOKIE['site_bz']);
	set_cookie(session_name(), "", 0);
	@session_destroy();
	@session_unset();
	$is_logged = false;
	
	if ((isset( $_REQUEST['rezim'])) and ($_REQUEST['rezim']=="tui")){
		header( "Location: ".str_replace("index.php","index.php",$_SERVER['PHP_SELF']) );
	}else{
		header( "Location: ".str_replace("index.php","",$_SERVER['PHP_SELF']) );
	}

	die();
}

$is_logged = false;
$member_id = array();
$attempt_login = false;

if (isset($_POST['login']) and $_POST['login_name'] and $_POST['login_password'] and $_POST['login'] == "submit") {

	$_POST['login_name'] = mb_strtolower((string)$_POST['login_name']);
	$_POST['login_password'] = (string)$_POST['login_password'];

	if (strlen($_POST['login_password']) > 72) $_POST['login_password'] = substr($_POST['login_password'], 0, 72);

	if ($config['login_log']) $allow_login = check_allow_login($_IP, $config['login_log']);

	$allow_user = true;

	if ($config['auth_metod']) {

		$_POST['login_name'] = $db->safesql(trim(str_replace(array("\x22", "\x60", "\t", '\n', '\r', "\n", "\r", '\\', ",", "/", "#", ";", ":", "~", "[", "]", "{", "}", ")", "(", "*", "^", "%", "$", "<", ">", "?", "!", '"', "'", " ", "&"), '', strip_tags($_POST['login_name']))));

		if (!$_POST['login_name'] or strlen($_POST['login_name']) > 40 or count(explode("@", $_POST['login_name'])) != 2) $allow_user = false;
		$where_name = "email='{$_POST['login_name']}'";
	} else {

		$_POST['login_name'] = $db->safesql($_POST['login_name']);

		if (preg_match("/[\||\'|\<|\>|\"|\!|\?|\$|\@|\/|\\\|\&\~\*\+]/", $_POST['login_name'])) $allow_user = false;
		$where_name = "name='{$_POST['login_name']}'";
	}

	if ($allow_login and $allow_user) {
		include(ENGINE_DIR ."/data/supconfig.php");
		$bd2 = new db;
		$bd2->connect($supconfig['dbuser'], $supconfig['dbpass'], $supconfig['dbname'], $supconfig['dbhost']);
		$member_id = $bd2->super_query("SELECT * FROM " . USERPREFIX . "_users WHERE {$where_name}");


		// if (empty($member_id)) {
		// 	$rows = $bd2->query("SELECT Project FROM " . USERPREFIX . "_project");
		// 	$db3 = new db;
		// 	foreach ($rows as $prj) {
		// 		$db3->connect(DBUSER, DBPASS, "bz_" . $prj['Project'], DBHOST);
		// 		$member_id = $db3->super_query("SELECT * FROM " . USERPREFIX . "_users WHERE {$where_name}");
		// 		if (!empty($member_id)) {
		// 			set_cookie("site_bz", $prj['Project'], 365);
		// 			$_COOKIE['site_bz'] = $prj['Project'];
		// 			break;
		// 		}
		// 		$db3->close();
		// 	}
		// 	$db3->free();
		// }

		$bd2->free();

		if ((!is_null($member_id['avtoriz_ad'])) && ($member_id['avtoriz_ad'] == 0)) {
			if ($member_id['user_id'] and $member_id['password']) {

				if (is_md5hash($member_id['password'])) {

					if ($member_id['password'] == md5(md5($_POST['login_password']))) {
						$is_logged = true;
					}
				} else {

					if (password_verify($_POST['login_password'], $member_id['password'])) {
						$is_logged = true;
					}
				}
			}
		} else {
			include(ENGINE_DIR ."/modules/ldapconnect.php");
			$is_logged = ldap_auth($_POST['login_name'], $_POST['login_password']);
			if ($is_logged && is_null($member_id['avtoriz_ad'])) {
				//$member_id = $db->super_query("SELECT * FROM " . USERPREFIX . "_users WHERE {$where_name}");
				die('Пользователь не найден в базе данных. Обратитесь к Администратору.');
			}
		}

		if ($is_logged) {


			session_regenerate_id();


			if (password_needs_rehash($member_id['password'], PASSWORD_DEFAULT)) {

				if ($config['charset'] == "utf-8" and version_compare($config['version_id'], '11.2', '>=')) {

					$member_id['password'] = password_hash($_POST['login_password'], PASSWORD_DEFAULT);

					if (!$member_id['password']) {
						die("PHP extension Crypt must be loaded for password_hash to function");
					}

					$new_pass_hash = "password='" . $db->safesql($member_id['password']) . "', ";
				} else $new_pass_hash = "";
			} else $new_pass_hash = "";

			if (!$config['twofactor_auth'] or !$member_id['twofactor_auth']) {

				if (isset($_POST['login_not_save']) and intval($_POST['login_not_save'])) {

					set_cookie("dle_user_id", "", 0);
					set_cookie("dle_password", "", 0);
				} else {

					set_cookie("dle_user_id", $member_id['user_id'], 365);
					set_cookie("dle_password", md5($member_id['password']), 365);
				}
			}

			if (!$config['twofactor_auth'] or !$member_id['twofactor_auth']) {
				$_SESSION['dle_user_id'] = $member_id['user_id'];
				$_SESSION['dle_password'] = md5($member_id['password']);
				$_SESSION['member_lasttime'] = $member_id['lastdate'];
			}

			$member_id['lastdate'] = $_TIME;

			if ($config['twofactor_auth'] and $member_id['twofactor_auth']) {
				$config['ip_control'] = 2;
				$config['log_hash'] = 1;
			}

			if (function_exists('openssl_random_pseudo_bytes')) {

				$stronghash = md5(openssl_random_pseudo_bytes(15));
			} else $stronghash = md5(uniqid(mt_rand(), TRUE));

			$salt = sha1(str_shuffle("abcdefghjkmnpqrstuvwxyz0123456789") . $stronghash);
			$hash = '';

			for ($i = 0; $i < 9; $i++) {
				$hash .= $salt[mt_rand(0, 39)];
			}

			$hash = md5($hash);
			$member_id['hash'] = $hash;

			//$_SESSION['user_name'] = $member_id['name'];

			set_cookie("user_name", $member_id['name'], 365);
			$_COOKIE['user_name'] = $member_id['name'];
			set_cookie("user_email", $member_id['email'], 365);
			$_COOKIE['user_email'] = $member_id['email'];

			if ($config['log_hash']) {
				set_cookie("dle_hash", $hash, 365);
				$_COOKIE['dle_hash'] = $hash;
			}

			$db->query("UPDATE LOW_PRIORITY " . USERPREFIX . "_users SET {$new_pass_hash}lastdate='{$_TIME}', hash='{$hash}', logged_ip='{$_IP}' WHERE user_id='{$member_id['user_id']}'");

			// if ($user_group[$member_id['user_group']]['allow_admin']) {

			// 	$db->query("INSERT INTO " . USERPREFIX . "_admin_logs (name, date, ip, action, extras) values ('" . $db->safesql($member_id['name']) . "', '{$_TIME}', '{$_IP}', '101', '')");
			// }

			if ($member_id['administrator'] == 6458) {
				$_SESSION['super_admin'] = true;
			}

			/*if ($config['twofactor_auth'] and $member_id['twofactor_auth']) {

				$is_logged = false;

				if (!$_SESSION['twofactor_auth']) {

					$_SESSION['twofactor_auth'] = md5($member_id['password']);
					$_SESSION['twofactor_id'] = $member_id['user_id'];

					if (isset($_POST['login_not_save']) and intval($_POST['login_not_save'])) {
						$_SESSION['no_save_cookie'] = 1;
					}

					include_once(DLEPlugins::Check(ENGINE_DIR . '/classes/mail.class.php'));

					$pin = generate_pin();

					$db->query("DELETE FROM " . USERPREFIX . "_twofactor WHERE user_id='{$member_id['user_id']}'");

					$db->query("INSERT INTO " . USERPREFIX . "_twofactor (user_id, pin, date) values ('{$member_id['user_id']}', '{$pin}', '{$_TIME}')");

					$row = $db->super_query("SELECT * FROM " . PREFIX . "_email WHERE name='twofactor' LIMIT 0,1");

					$mail = new dle_mail($config, $row['use_html']);

					$row['template'] = stripslashes($row['template']);
					$row['template'] = str_replace("{%username%}", $member_id['name'], $row['template']);
					$row['template'] = str_replace("{%pin%}", $pin, $row['template']);
					$row['template'] = str_replace("{%ip%}", $_IP, $row['template']);

					$mail->send($member_id['email'], $lang['twofactor_subj'], $row['template']);

					unset($pin);
					unset($row);
					unset($mail);
				}

				$member_id = array();

				header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
				header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
				header("Cache-Control: no-store, no-cache, must-revalidate");
				header("Cache-Control: post-check=0, pre-check=0", false);
				header("Pragma: no-cache");
			} else {*/

				$attempt_login = true;
				$dostup_bz = true;
			//}
		} else {

			$is_logged = false;
			$attempt_login = true;

			if ($member_id['user_id'] and $user_group[$member_id['user_group']]['allow_admin']) {

				$db->query("INSERT INTO " . USERPREFIX . "_admin_logs (name, date, ip, action, extras) values ('" . $db->safesql($member_id['name']) . "', '{$_TIME}', '{$_IP}', '91', '')");
			}

			$member_id = array();
		}
	}
} elseif (isset($_SESSION['dle_user_id']) and  intval($_SESSION['dle_user_id']) > 0 and $_SESSION['dle_password']) {

	$attempt_login = true;
	$nam = $_COOKIE['user_name'];

	if (isset($_COOKIE['dbname']) && $_COOKIE['dbname'] != $gl_bd && $_COOKIE['user_name'] && $_COOKIE['site_bz'] != $_COOKIE['dbname']) {

		$db3 = new db;
		$db3->connect(DBUSER, DBPASS, $gl_bd, DBHOST);
		$proh = false;
		$all_bz = $db3->super_query("SELECT allow_bz FROM dle_usergroups WHERE ID = (SELECT user_group FROM dle_users WHERE name='{$nam}')");
		$abz = explode(',', $all_bz['allow_bz']);
		foreach ($abz as $ab) {
			if ($ab == 'all') {
				$proh = true;
				$dostup_bz = true;
				break;
			}
		}
		if (!$proh) {
			$sqls = "SELECT Project FROM dle_project WHERE id regexp '[[:<:]](" . implode('|', $abz) . ")[[:>:]]'";
			$rowh = $db3->query($sqls);
			$dostup_bz = false;
			$dbn = trim(strtolower($_COOKIE['dbname']));
			foreach ($rowh as $hs) {
				$esbd = trim(strtolower($hs['Project']));
				if ($esbd == $dbn) {
					$dostup_bz = true;
					break;
				}
			}
		}
		$db3->free();
		if ($dostup_bz) {
			$row = $db->super_query("SELECT count(name) as count FROM dle_users WHERE name = '{$nam}'");
			if ($row['count'] < 1) {
				$db2 = new db;
				$db2->connect(DBUSER, DBPASS, $gl_bd, DBHOST);
				$us = $db2->super_query("SELECT * FROM dle_users WHERE name = '{$nam}'");
				$estemail = false;
				if (isset($_COOKIE['user_email'])) {
					$row = $db->super_query("SELECT *, count(email) as count FROM dle_users WHERE email = '{$_COOKIE['user_email']}'");
					$estemail = $row['count'] > 0;
				}
				if ($estemail) {
					$db2->query("UPDATE dle_users SET user_id={$row['user_id']} WHERE name = '{$nam}'");
					$_SESSION['dle_user_id'] = $row['user_id'];
					if ($row['user_group'] == '1')
						$grup = ", user_group = '2'";
					$db->query("UPDATE dle_users SET password='{$us['password']}', name='{$us['name']}', foto='{$us['foto']}', fullname='{$us['fullname']}', hash='{$us['hash']}' {$grup} WHERE email='{$row['email']}'");
					$db->query("UPDATE dle_files SET author='{$us['name']}' WHERE author='{$row['name']}'");
					$db->query("UPDATE dle_images SET author='{$us['name']}' WHERE author='{$row['name']}'");
					$db->query("UPDATE dle_post SET autor='{$us['name']}' WHERE autor='{$row['name']}'");
					$db->query("UPDATE dle_post_arhiv SET autor='{$us['name']}' WHERE autor='{$row['name']}'");
					$db->query("UPDATE dle_post_extras SET editor='{$us['name']}' WHERE editor='{$row['name']}'");
					$db->query("UPDATE dle_vote_result SET name='{$us['name']}' WHERE name='{$row['name']}'");
					clear_cache();
				} else {

					$as = $db2->query("SELECT * FROM dle_users WHERE name = '{$_COOKIE['user_name']}'");
					$values = $as->fetch_all(MYSQLI_ASSOC);
					$columns = array();
					if (!empty($values)) {
						$columns = array_keys($values[0]);

						foreach ($columns as $col) {
							$val .= $col . ",";
							if ($col == 'user_group') {
								if ($us[$col] == '1') {
									$val2 .= "'1',";
								} else {
									$val2 .= "'4',";
								}
							} else
								$val2 .= "'{$us[$col]}',";
						}
						$val = substr($val, 0, -1);
						$val2 = substr($val2, 0, -1);
						$sql = "INSERT INTO " . USERPREFIX . "_users ({$val}) value ({$val2})";
						$db->query($sql);
					}
				}
				$db2->free();
			}
		}
		//$_SESSION['dle_user_id'] = $row['user_id'];
	} else {
		$dostup_bz = true;
	}
	include(ENGINE_DIR ."/data/supconfig.php");
	$db2 = new db;
	$db2->connect($supconfig['dbuser'], $supconfig['dbpass'], $supconfig['dbname'], $supconfig['dbhost']);
	$member_id = $db2->super_query("SELECT * FROM " . USERPREFIX . "_users WHERE user_id='" . intval($_SESSION['dle_user_id']) . "'");
	$db2->free();
	//and md5($member_id['password']) == $_SESSION['dle_password']
	if ($member_id['user_id'] and $member_id['password']) {

		$is_logged = true;

		if ($config['twofactor_auth'] and $member_id['twofactor_auth']) {
			$config['ip_control'] = 2;
			$config['log_hash'] = 1;
		}
	} else {

		$member_id = array();
		$is_logged = false;
		if ($config['login_log']) $db->query("INSERT INTO " . PREFIX . "_login_log (ip, count, date) VALUES('{$_IP}', '1', '" . time() . "') ON DUPLICATE KEY UPDATE count=count+1, date='" . time() . "'");
	}

	if ($config['log_hash'] and (($_COOKIE['dle_hash'] != $member_id['hash']) or ($member_id['hash'] == ""))) {

		$member_id = array();
		$is_logged = false;
	}
} elseif (isset($_COOKIE['dle_user_id']) and intval($_COOKIE['dle_user_id']) > 0 and $_COOKIE['dle_password']) {

	$attempt_login = true;

	if ($config['login_log']) $allow_login = check_allow_login($_IP, $config['login_log']);

	if ($allow_login) {

		$member_id = $db->super_query("SELECT * FROM " . USERPREFIX . "_users WHERE user_id='" . intval($_COOKIE['dle_user_id']) . "'");

		if (isset($_COOKIE['dbname']) && $_COOKIE['dbname'] != $gl_bd && $_COOKIE['user_name'] && empty($member_id)) {
			$db2 = new db;
			$db2->connect(DBUSER, DBPASS, $gl_bd, DBHOST);
			$us = $db2->super_query("SELECT * FROM dle_users WHERE name = '{$_COOKIE['user_name']}'");
			$as = $db2->query("SELECT * FROM dle_users WHERE name = '{$_COOKIE['user_name']}'");
			$values = $as->fetch_all(MYSQLI_ASSOC);
			$columns = array();
			if (!empty($values)) {
				$columns = array_keys($values[0]);

				foreach ($columns as $col) {
					$val .= $col . ",";
					if ($col == 'user_group') {
						if ($us[$col] == '1') {
							$val2 .= "'1',";
						} else {
							$val2 .= "'4',";
						}
					} else
						$val2 .= "'{$us[$col]}',";
				}
				$val = substr($val, 0, -1);
				$val2 = substr($val2, 0, -1);
				$sql = "INSERT INTO " . USERPREFIX . "_users ({$val}) value ({$val2})";
				$db->query($sql);
			}
			$db2->free();
			$member_id = $db->super_query("SELECT * FROM " . USERPREFIX . "_users WHERE user_id='" . intval($_COOKIE['dle_user_id']) . "'");
			//$_SESSION['dle_user_id'] = $row['user_id'];
		}

		if ($member_id['user_id'] and $member_id['password'] and md5($member_id['password']) == $_COOKIE['dle_password']) {

			$is_logged = TRUE;
			$dostup_bz = true;
			session_regenerate_id();

			$_SESSION['dle_user_id'] = $member_id['user_id'];
			$_SESSION['dle_password'] = md5($member_id['password']);
			$_SESSION['member_lasttime'] = $member_id['lastdate'];

			if ($config['twofactor_auth'] and $member_id['twofactor_auth']) {
				$config['ip_control'] = 2;
				$config['log_hash'] = 1;
			}
		} else {

			if ($member_id['user_id'] and $user_group[$member_id['user_group']]['allow_admin']) {

				$db->query("INSERT INTO " . USERPREFIX . "_admin_logs (name, date, ip, action, extras) values ('" . $db->safesql($member_id['name']) . "', '{$_TIME}', '{$_IP}', '92', '')");
			}

			$member_id = array();
			$is_logged = false;

			if ($config['login_log']) $db->query("INSERT INTO " . PREFIX . "_login_log (ip, count, date) VALUES('{$_IP}', '1', '" . time() . "') ON DUPLICATE KEY UPDATE count=count+1, date='" . time() . "'");
		}

		if ($config['log_hash'] and (($_COOKIE['dle_hash'] != $member_id['hash']) or ($member_id['hash'] == ""))) {

			$member_id = array();
			$is_logged = false;
		}
	}
}

if (isset($_POST['login']) and !$is_logged and $allow_login and !$_SESSION['twofactor_auth']) {

	if ($config['login_log']) $db->query("INSERT INTO " . PREFIX . "_login_log (ip, count, date) VALUES('{$_IP}', '1', '" . time() . "') ON DUPLICATE KEY UPDATE count=count+1, date='" . time() . "'");

	if (function_exists('msgbox')) {
		if ($config['auth_metod']) msgbox($lang['login_err'], $lang['login_err_3']);
		else msgbox($lang['login_err'], $lang['login_err_1']);
	}
}

if (!$allow_login) {
	if (function_exists('msgbox')) {
		$lang['login_err_2'] = str_replace("{time}", $config['login_ban_timeout'], $lang['login_err_2']);
		msgbox($lang['login_err'], $lang['login_err_2']);
	}
}

/*if ($is_logged) {

	if ($config['online_status']) $stime = 1200;
	else $stime = 14400;

	if (($member_id['lastdate'] + $stime) < $_TIME) {

		$db->query("UPDATE LOW_PRIORITY " . USERPREFIX . "_users SET lastdate='{$_TIME}' WHERE user_id='{$member_id['user_id']}'");
	}

	if (!allowed_ip($member_id['allowed_ip'])) {

		$is_logged = false;
		if (function_exists('msgbox')) {
			msgbox($lang['login_err'], $lang['ip_block_login']);
		}
	}

	/*	if ($config['ip_control'] == '2' and !check_netz($member_id['logged_ip'], $_IP) and !isset($_POST['login'])) $is_logged = false;
	elseif ($config['ip_control'] == '1' and $user_group[$member_id['user_group']]['allow_admin'] and !check_netz($member_id['logged_ip'], $_IP) and !isset($_POST['login'])) $is_logged = false;*/
//}

if ($is_logged) {

	$dle_login_hash = sha1(SECURE_AUTH_KEY . $member_id['user_id'] . sha1($member_id['password']) . $member_id['hash']);

	/*if ($user_group[$member_id['user_group']]['time_limit']) {
		if ($member_id['time_limit'] != "" and (intval($member_id['time_limit']) < $_TIME)) {

			$db->query("UPDATE " . USERPREFIX . "_users SET user_group='{$user_group[$member_id['user_group']]['rid']}', time_limit='' WHERE user_id='{$member_id['user_id']}'");
			$member_id['user_group'] = $user_group[$member_id['user_group']]['rid'];
		}
	}

	if ($user_group[$member_id['user_group']]['force_reg'] and $user_group[$member_id['user_group']]['force_reg_days'] > 0) {

		if ($_TIME > ($member_id['reg_date'] + (86400 * $user_group[$member_id['user_group']]['force_reg_days']))) {

			$db->query("UPDATE " . USERPREFIX . "_users SET user_group='{$user_group[$member_id['user_group']]['force_reg_group']}' WHERE user_id='{$member_id['user_id']}'");
			$member_id['user_group'] = $user_group[$member_id['user_group']]['force_reg_group'];
		}
	}

	if ($user_group[$member_id['user_group']]['force_news'] and $user_group[$member_id['user_group']]['force_news_count'] > 0) {

		if ($member_id['news_num']) {

			$approved = $db->super_query("SELECT COUNT(*) as count FROM " . PREFIX . "_post WHERE autor='{$member_id['name']}' AND approve = '0'");

			if (($member_id['news_num'] - $approved['count']) >= $user_group[$member_id['user_group']]['force_news_count']) {

				$db->query("UPDATE " . USERPREFIX . "_users SET user_group='{$user_group[$member_id['user_group']]['force_news_group']}' WHERE user_id='{$member_id['user_id']}'");
				$member_id['user_group'] = $user_group[$member_id['user_group']]['force_news_group'];
			}
		}
	}

	if ($user_group[$member_id['user_group']]['force_comments'] and $user_group[$member_id['user_group']]['force_comments_count'] > 0) {

		if ($member_id['comm_num']) {

			if ($config['allow_cmod'] and $user_group[$member_id['user_group']]['allow_modc']) {

				$approved = $db->super_query("SELECT COUNT(*) as count FROM " . PREFIX . "_comments WHERE user_id='{$member_id['user_id']}' AND approve = '0'");
			} else {
				$approved = array('count' => 0);
			}

			if (($member_id['comm_num'] - $approved['count']) >= $user_group[$member_id['user_group']]['force_comments_count']) {

				$db->query("UPDATE " . USERPREFIX . "_users SET user_group='{$user_group[$member_id['user_group']]['force_comments_group']}' WHERE user_id='{$member_id['user_id']}'");
				$member_id['user_group'] = $user_group[$member_id['user_group']]['force_comments_group'];
			}
		}
	}

	if ($user_group[$member_id['user_group']]['force_rating'] and $user_group[$member_id['user_group']]['force_rating_count'] > 0) {

		$userrating = $db->super_query("SELECT SUM(rating) as rating FROM " . PREFIX . "_post_extras WHERE user_id ='{$member_id['user_id']}'");

		if ($userrating['rating'] >= $user_group[$member_id['user_group']]['force_rating_count']) {

			$db->query("UPDATE " . USERPREFIX . "_users SET user_group='{$user_group[$member_id['user_group']]['force_rating_group']}' WHERE user_id='{$member_id['user_id']}'");
			$member_id['user_group'] = $user_group[$member_id['user_group']]['force_rating_group'];
		}
	}*/
} else {
	$dostup_bz = true;
	$member_id = array();
	//$dle_login_hash = sha1(SECURE_AUTH_KEY . $_IP);
}

if (!$is_logged and $attempt_login) {

	set_cookie("dle_user_id", "", 0);
	set_cookie("dle_password", "", 0);
	set_cookie("dle_hash", "", 0);
	$_SESSION['dle_user_id'] = 0;
	$_SESSION['dle_password'] = "";
}
