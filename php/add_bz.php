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
require_once ROOT_DIR . '/language/' . $config['langs'] . '/website.lng';
require_once(ENGINE_DIR . '/classes/plugins.class.php');
include_once(DLEPlugins::Check(ENGINE_DIR . '/classes/parse.class.php'));

function clear_html($txt)
{
    if (!$txt) return;
    $find = array('/data:/i', '/about:/i', '/vbscript:/i', '/onclick/i', '/onload/i', '/onunload/i', '/onabort/i', '/onerror/i', '/onblur/i', '/onchange/i', '/onfocus/i', '/onreset/i', '/onsubmit/i', '/ondblclick/i', '/onkeydown/i', '/onkeypress/i', '/onkeyup/i', '/onmousedown/i', '/onmouseup/i', '/onmouseover/i', '/onmouseout/i', '/onselect/i', '/javascript/i', '/onmouseenter/i', '/onwheel/i', '/onshow/i', '/onafterprint/i', '/onbeforeprint/i', '/onbeforeunload/i', '/onhashchange/i', '/onmessage/i', '/ononline/i', '/onoffline/i', '/onpagehide/i', '/onpageshow/i', '/onpopstate/i', '/onresize/i', '/onstorage/i', '/oncontextmenu/i', '/oninvalid/i', '/oninput/i', '/onsearch/i', '/ondrag/i', '/ondragend/i', '/ondragenter/i', '/ondragleave/i', '/ondragover/i', '/ondragstart/i', '/ondrop/i', '/onmousemove/i', '/onmousewheel/i', '/onscroll/i', '/oncopy/i', '/oncut/i', '/onpaste/i', '/oncanplay/i', '/oncanplaythrough/i', '/oncuechange/i', '/ondurationchange/i', '/onemptied/i', '/onended/i', '/onloadeddata/i', '/onloadedmetadata/i', '/onloadstart/i', '/onpause/i', '/onprogress/i',    '/onratechange/i', '/onseeked/i', '/onseeking/i', '/onstalled/i', '/onsuspend/i', '/ontimeupdate/i', '/onvolumechange/i', '/onwaiting/i', '/ontoggle/i');
    $replace = array("d&#1072;ta:", "&#1072;bout:", "vbscript<b></b>:", "&#111;nclick", "&#111;nload", "&#111;nunload", "&#111;nabort", "&#111;nerror", "&#111;nblur", "&#111;nchange", "&#111;nfocus", "&#111;nreset", "&#111;nsubmit", "&#111;ndblclick", "&#111;nkeydown", "&#111;nkeypress", "&#111;nkeyup", "&#111;nmousedown", "&#111;nmouseup", "&#111;nmouseover", "&#111;nmouseout", "&#111;nselect", "j&#1072;vascript", '&#111;nmouseenter', '&#111;nwheel', '&#111;nshow', '&#111;nafterprint', '&#111;nbeforeprint', '&#111;nbeforeunload', '&#111;nhashchange', '&#111;nmessage', '&#111;nonline', '&#111;noffline', '&#111;npagehide', '&#111;npageshow', '&#111;npopstate', '&#111;nresize', '&#111;nstorage', '&#111;ncontextmenu', '&#111;ninvalid', '&#111;ninput', '&#111;nsearch', '&#111;ndrag', '&#111;ndragend', '&#111;ndragenter', '&#111;ndragleave', '&#111;ndragover', '&#111;ndragstart', '&#111;ndrop', '&#111;nmousemove', '&#111;nmousewheel', '&#111;nscroll', '&#111;ncopy', '&#111;ncut', '&#111;npaste', '&#111;ncanplay', '&#111;ncanplaythrough', '&#111;ncuechange', '&#111;ndurationchange', '&#111;nemptied', '&#111;nended', '&#111;nloadeddata', '&#111;nloadedmetadata', '&#111;nloadstart', '&#111;npause', '&#111;nprogress',    '&#111;nratechange', '&#111;nseeked', '&#111;nseeking', '&#111;nstalled', '&#111;nsuspend', '&#111;ntimeupdate', '&#111;nvolumechange', '&#111;nwaiting', '&#111;ntoggle');
    $txt = preg_replace($find, $replace, $txt);
    $txt = preg_replace("#<iframe#i", "&lt;iframe", $txt);
    $txt = preg_replace("#<script#i", "&lt;script", $txt);
    $txt = str_replace("<?", "&lt;?", $txt);
    $txt = str_replace("?>", "?&gt;", $txt);
    return $txt;
}


function base64ToFile($data, $path)
{
    $source = fopen($data, 'r');
    $destination = fopen($path, 'w');

    stream_copy_to_stream($source, $destination);
    fclose($source);
    fclose($destination);
}

if (empty($member_id['name'])){
    die( "Hacking attempt!" );
}

$p_name = $db->safesql(trim(clear_html($_REQUEST['namebaza'])));
$p_baze = $db->safesql(trim(clear_html($_REQUEST['namebd'])));

if (preg_match("/[^а-яА-ЯёЁa-zA-Z0-9 \-_]+/u", $p_name)) {
    header("Location: ../../index.php?error=Найдены неподходящие символы в имени базы знаний - <b>$p_name</b> (не подходят все, кроме: а-я, А-Я, a-z, A-Z, 0-9, -, _, пробел)");
    die();
}
if (preg_match("/[^a-zA-Z0-9\-_]+/", $p_baze)) {
    header("Location: ../../index.php?error=Найдены неподходящие символы в имени базы SQL - <b>$p_baze</b> (не подходят все, кроме: a-z, A-Z, 0-9, -, _)");
    die();
}

$row = $db->super_query("SELECT count(Name) as count FROM " . USERPREFIX . "_project WHERE Name='{$p_name}'");
if ($row['count'] > 0) {
    header('Location: ../../index.php?error=Имя базы знаний - <b>' . $p_name . '</b> уже существует.');
    die();
}
$row = $db->super_query("SELECT count(Project) as count FROM " . USERPREFIX . "_project WHERE Project='{$p_baze}'");
if ($row['count'] > 0) {
    header('Location: ../../index.php?error=База данных SQL- <b>' . $p_baze . '</b> уже существует.');
    die();
}
$catimg = "";
if (isset($_POST['imgbz'])&&$_POST['imgbz']!=""){
    $rnam = uniqid();
    $imfile = ROOT_DIR."uploads/icons/".$rnam.".png";
    $catimg = "/uploads/icons/".$rnam.".png";
    base64ToFile($_POST['imgbz'], $imfile);
}

$sql = 'CREATE DATABASE bz_' . $p_baze;
$db->query($sql);

$db2 = new db;
$db2->connect(DBUSER, DBPASS, 'bz_' . $p_baze, DBHOST);
$filename = ENGINE_DIR.'/data/bd_install.sql';
$templine = '';
$lines = file($filename);
foreach ($lines as $line)
{
if (substr($line, 0, 2) == '--' || $line == '')
  continue;
$templine .= $line;
if (substr(trim($line), -1, 1) == ';'){
  $db2->query(($templine));
  $templine = '';
  }
}
$p_baze = strtolower($p_baze);
$sql = "INSERT INTO " . USERPREFIX . "_category (Name, alt_name, posi, icon) value ('{$p_name}','{$p_baze}',1 ,'{$catimg}')";
$db2->query($sql);
$row[ 'id' ] = $db2->insert_id();
$db2->free();

$db->query("INSERT INTO " . USERPREFIX . "_project (Name, Project,id_cat,avtor) 
values ('{$p_name}','{$p_baze}', {$row['id']}, '{$member_id['name']}')");
header('Location: ../../index.php');