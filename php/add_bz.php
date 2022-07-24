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

function saveimg()
{
    $imil = "";
    if (isset($_POST['imgbz']) && $_POST['imgbz'] != "") {
        $rnam = uniqid();
        $imfile = ROOT_DIR . "uploads/icons/" . $rnam . ".png";
        $imil = "/uploads/icons/" . $rnam . ".png";
        base64ToFile($_POST['imgbz'], $imfile);
    }
    return $imil;
}

if (empty($member_id['name'])) {
    die("Hacking attempt!");
}

function stop($txt)
{
    $str = "";
    if (isset($_POST['ajax']))
        $str = "Error: $txt";
    else
        header("Location: ../../index.php?error=$txt");
    die($str);
}

// if (empty($_REQUEST['namebaza']))
//     die();

if ($_POST['category'] == 1)
    $prj = $_POST['idcategory'];
if ($_POST['category'] == '2')
    $prj = $_POST['project'];

if ($_REQUEST['rezim'] == 'clearcash') {
    clear_all_caches();
    $scr = "notification('Кэш очищен.', 'success');";
    die($scr);
}

$ajax = false;

$ajax = true;

$p_name = $db->safesql(trim(clear_html($_REQUEST['namebaza'])));
$p_baze = strtolower($db->safesql(trim(clear_html($_REQUEST['namebd']))));

if (preg_match("/[^а-яА-ЯёЁa-zA-Z0-9 \-_]+/u", $p_name)) {
    stop("Найдены неподходящие символы в имени базы знаний - <b>$p_name</b> (не подходят все, кроме: а-я, А-Я, a-z, A-Z, 0-9, -, _, пробел)");
}
if (preg_match("/[^a-zA-Z0-9\-_]+/", $p_baze)) {
    stop("Найдены неподходящие символы в имени базы SQL - <b>$p_baze</b> (не подходят все, кроме: a-z, A-Z, 0-9, -, _)");
}

$catimg = "";



if ($_POST['category'] == 1) {
    if ($_REQUEST['rezim'] == 'arhive') {
        if (!check_dostup($_POST['category'], $prj, 1)) {
            die("Error: Доступ запрещён.");
        }
        if (empty($_POST['idcategory'])) {
            $err = 'Error: Что-то пошло не так. Отсутствует ID базы.';
            die($err);
        }
        $id = (int)$_POST['idcategory'];
	    if ($id == 0) die("error");
        load_catinfo();
        $cots = getSubCatList($id);
        $aviable = array();
        $aviable = explode(',', $cots);

        $sql = "UPDATE dle_post set arhiv = 1 WHERE category regexp '[[:<:]](" . implode('|', $aviable) . ")[[:>:]]'";
        $db->query($sql);
    
        $sql = "UPDATE dle_category set arhiv = 1 WHERE id regexp '[[:<:]](" . implode('|', $aviable) . ")[[:>:]]'";
        $db->query($sql);

        clear_all_caches();
        $scr = "window.location.href = '/';";
        die($scr);
    }
    if ($_REQUEST['rezim'] == 'noarhive') {
        if (!check_dostup($_POST['category'], $prj, 1)) {
            die("Error: Доступ запрещён.");
        }
        if (empty($_POST['idcategory'])) {
            $err = 'Error: Что-то пошло не так. Отсутствует ID базы.';
            die($err);
        }
        $id = (int)$_POST['idcategory'];
	    if ($id == 0) die("error");
        load_catinfo();
        $cots = getSubCatList($id);
        $aviable = array();
        $aviable = explode(',', $cots);

        $sql = "UPDATE dle_post set arhiv = 0 WHERE category regexp '[[:<:]](" . implode('|', $aviable) . ")[[:>:]]'";
        $db->query($sql);
    
        $sql = "UPDATE dle_category set arhiv = 0 WHERE id regexp '[[:<:]](" . implode('|', $aviable) . ")[[:>:]]'";
        $db->query($sql);

        clear_all_caches();
        $scr = "location.reload();";
        die($scr);
    }
    if ($_REQUEST['rezim'] == 'izmenobloz') {
        if (!check_dostup($_POST['category'], $prj, [1,2])) {
            die("Error: Доступ запрещён.");
        }
        if (empty($_POST['idcategory'])) {
            $err = 'Error: Что-то пошло не так. Отсутствует ID базы.';
            die($err);
        }
        $sql = "SELECT icon FROM dle_category WHERE  id = {$_POST['idcategory']}";
        $row = $db->super_query($sql);
        if (isset($row['icon']) && $row['icon'] <> '') {
            $file = ROOT_DIR . $row['icon'];
            if (file_exists($file))
                unlink($file);
        }
        if ($_POST['imgbz'] != 'del')
            $catimg = saveimg();

        $sql = "UPDATE dle_category SET icon = '$catimg' WHERE id = {$_POST['idcategory']}";
        $db->query($sql);
        if ($catimg == '')
            $catimg = '/templates/Default/dleimages/bz.png';
        $scr = "$('[cat=1][idcat={$_POST['idcategory']}]').find('.circleimg').css('background','url($catimg)');";

        if ($_POST['globloz']==1)
        $scr = "$('#titlebzgl').find('.titavatar').css('background-image','url($catimg)');";

        if ($catimg == '/templates/Default/dleimages/bz.png')
            $catimg = '/templates/Default/dleimages/no_icon.png';
        $scr .= "$('#nestable [data-id={$_POST['idcategory']}]').find('img.imagt').attr('src','$catimg');";
        die($scr);
    }

    if ($_REQUEST['rezim'] == "delete") {
        if (!check_dostup($_POST['category'], $prj, 1)) {
            die("Error: Доступ запрещён.");
        }
        $id = (int)$_POST['idcategory'];
        if ($id == 0) die("Error: Что-то пошло не так. Отсутствует ID базы.");
        load_catinfo();
        $cots = getSubCatList($id);
        $aviable = array();
        $aviable = explode(',', $cots);
    
        $sql = "DELETE FROM dle_category WHERE id regexp '[[:<:]](" . implode('|', $aviable) . ")[[:>:]]'";
        $db->query($sql);
    
        $sql = "SELECT id FROM dle_post Where category regexp '[[:<:]](" . implode('|', $aviable) . ")[[:>:]]'";
        $result = $db->query($sql);
    
        while ($row = $db->get_row($sql_result)) {
            deletenewsbyid($row['id'], false);
        }
        clear_all_caches();
        $scr = "window.location.href = '/';";
        die($scr);
    }

    $row = $db->super_query("SELECT count(id) as count FROM " . USERPREFIX . "_category WHERE alt_name='{$p_baze}'");
    if ($row['count'] > 0) {
        stop('Латинское имя базы знаний - <b>' . $p_baze . '</b> уже существует.');
    }
    if ($_REQUEST['rezim'] == 'izmenname') {
        if (!check_dostup($_POST['category'], $prj, 1)) {
            die("Error: Доступ запрещён.");
        }
        if (empty($_POST['idcategory'])) {
            stop('Что-то пошло не так. Отсутствует ID базы.');
        }
        $sql = "UPDATE dle_category SET name = '$p_name', alt_name = '$p_baze' WHERE id = {$_POST['idcategory']}";
        $db->query($sql);
        clear_all_caches();
        $scr = "$('[cat=1][idcat={$_POST['idcategory']}]').find('.shottitle').text('$p_name');";
        $scr .= "$('[cat=1][idcat={$_POST['idcategory']}]').find('.menuurl').attr('href','?do=cat&category={$p_baze}');";
        $scr .= "if ($('#titlebzgl')[0]){ $('#titlebzgl').attr('href','?do=cat&category={$p_baze}'); $('#titlebzgl').find('.logo_title').text('{$p_name}') }";
        die($scr);
    } else {
        $catimg = saveimg();
        $sql = "INSERT INTO " . USERPREFIX . "_category (Name, alt_name, posi, icon) value ('{$p_name}','{$p_baze}',1 ,'{$catimg}')";
        $db->query($sql);
        $id = $db->insert_id();
        $sql = "INSERT INTO dle_cat_dostup (id_category, roly, user, ad_grup, user_grup, category, project) 
                VALUE ($id, 1, '{$member_id['name']}', '','',1,0)";
        $db->query($sql);
        clear_all_caches();
    }
}

if ($_POST['category'] == 2) {
    if ($_REQUEST['rezim'] == 'arhive') {
        if (!check_dostup($_POST['category'], $prj, 1)) {
            die("Error: Доступ запрещён.");
        }
        if (empty($_POST['idcategory'])) {
            $err = 'Error: Что-то пошло не так. Отсутствует ID базы.';
            die($err);
        }
        $db_gl->query("UPDATE dle_project SET arhiv = 1 WHERE  project = '{$_POST['project']}'");

        $db2 = new db;
        $dbname = 'bz_' . $_POST['project'];
        $db2->connect(DBUSER, DBPASS, $dbname, DBHOST);
        $id = (int)$_POST['idcategory'];
	    if ($id == 0) die("error");
        load_catinfo($_POST['project']);
        $cots = getSubCatList($id);
        $aviable = array();
        $aviable = explode(',', $cots);

        $sql = "UPDATE dle_post set arhiv = 1 WHERE category regexp '[[:<:]](" . implode('|', $aviable) . ")[[:>:]]'";
        $db2->query($sql);
    
        $sql = "UPDATE dle_category set arhiv = 1 WHERE id regexp '[[:<:]](" . implode('|', $aviable) . ")[[:>:]]'";
        $db2->query($sql);

        clear_all_caches();

        $db2->close();
        $db2->free();

        $scr = "window.location.href = '/';";
        die($scr);
    }
    if ($_REQUEST['rezim'] == 'noarhive') {
        if (!check_dostup($_POST['category'], $prj, 1)) {
            die("Error: Доступ запрещён.");
        }
        if (empty($_POST['idcategory'])) {
            $err = 'Error: Что-то пошло не так. Отсутствует ID базы.';
            die($err);
        }
        $db_gl->query("UPDATE dle_project SET arhiv = 0 WHERE  project = '{$_POST['project']}'");

        $db2 = new db;
        $dbname = 'bz_' . $_POST['project'];
        $db2->connect(DBUSER, DBPASS, $dbname, DBHOST);
        $id = (int)$_POST['idcategory'];
	    if ($id == 0) die("error");
        load_catinfo($_POST['project']);
        $cots = getSubCatList($id);
        $aviable = array();
        $aviable = explode(',', $cots);

        $sql = "UPDATE dle_post set arhiv = 0 WHERE category regexp '[[:<:]](" . implode('|', $aviable) . ")[[:>:]]'";
        $db2->query($sql);
    
        $sql = "UPDATE dle_category set arhiv = 0 WHERE id regexp '[[:<:]](" . implode('|', $aviable) . ")[[:>:]]'";
        $db2->query($sql);

        clear_all_caches();

        $db2->close();
        $db2->free();

        $scr = "location.reload();";
        die($scr);
    }
    if ($_REQUEST['rezim'] == 'izmenobloz') {
        if (!check_dostup($_POST['category'], $prj, [1,2])) {
            die("Error: Доступ запрещён.");
        }
        if (empty($_POST['idcategory'])) {
            $err = 'Error: Что-то пошло не так. Отсутствует ID базы.';
            die($err);
        }
        if (empty($_POST['project'])) {
            stop('Что-то пошло не так. Отсутствует имя проекта.');
        }
        $db2 = new db;
        $dbname = 'bz_' . $_POST['project'];
        $db2->connect(DBUSER, DBPASS, $dbname, DBHOST);
        $sql = "SELECT icon FROM dle_category WHERE  id = {$_POST['idcategory']}";
        $row = $db2->super_query($sql);
        if (isset($row['icon']) && $row['icon'] <> '') {
            $file = ROOT_DIR . $row['icon'];
            if (file_exists($file))
                unlink($file);
        }
        if ($_POST['imgbz'] != 'del')
            $catimg = saveimg();

        $sql = "UPDATE dle_category SET icon = '$catimg' WHERE id = {$_POST['idcategory']}";
        $db2->query($sql);
        $db2->close();
        $db2->free();
        if ($catimg == '')
            $catimg = '/templates/Default/dleimages/bz.png';
        $scr = "$('[cat=2][idcat={$_POST['idcategory']}][project={$_POST['project']}]').find('.circleimg').css('background','url($catimg)');";

        if ($_POST['globloz']==1)
        $scr = "$('#titlebzgl').find('.titavatar').css('background-image','url($catimg)');";

        if ($catimg == '/templates/Default/dleimages/bz.png')
            $catimg = '/templates/Default/dleimages/no_icon.png';
        $scr .= "$('#nestable [data-id={$_POST['idcategory']}]').find('img.imagt').attr('src','$catimg');";

        die($scr);
    }

    if ($_REQUEST['rezim'] == "delete") {
        if (!check_dostup($_POST['category'], $prj, 1)) {
            die("Error: Доступ запрещён.");
        }
        if (empty($_POST['project'])) {
            $err = 'Error: Что-то пошло не так. Отсутствует ID базы.';
            die($err);
        }
        $dbname = 'bz_' . $_POST['project'];
        $db2->connect(DBUSER, DBPASS, $dbname, DBHOST);

        $id = (int)$_POST['idcategory'];
        if ($id == 0) die("Error: Что-то пошло не так. Отсутствует ID базы.");
        load_catinfo($_POST['project']);
        $cots = getSubCatList($id);
        $aviable = array();
        $aviable = explode(',', $cots);
    
        $sql = "SELECT id FROM dle_post Where category regexp '[[:<:]](" . implode('|', $aviable) . ")[[:>:]]'";
        $result = $db2->query($sql);
        $db->close();
        $db->free();
        $db = new db;
        $db->connect(DBUSER, DBPASS, $dbname, DBHOST);
        while ($row = $db2->get_row($sql_result)) {
            deletenewsbyid($row['id'], false);
        }
        $db2->close();
        $db2->free();
        

        $db2->connect(DBUSER, DBPASS, '', DBHOST);
        $db2->query("DROP DATABASE $dbname");
        $db2->close();
        $db2->free();
        $db_gl->query("DELETE FROM dle_project WHERE  project = '{$_POST['project']}'");
        clear_all_caches();
        $scr = "window.location.href = '/';";
        die($scr);
    }

    $row = $db->super_query("SELECT count(Name) as count FROM " . USERPREFIX . "_project WHERE Name='{$p_name}'");
    if ($row['count'] > 0) {
        stop('Имя базы знаний - <b>' . $p_name . '</b> уже существует.');
    }
    $row = $db->super_query("SELECT count(Project) as count FROM " . USERPREFIX . "_project WHERE Project='{$p_baze}'");
    if ($row['count'] > 0) {
        stop('База данных SQL- <b>' . $p_baze . '</b> уже существует.');
    }

    if ($_REQUEST['rezim'] == 'izmenname') {
        if (!check_dostup($_POST['category'], $prj, 1)) {
            die("Error: Доступ запрещён.");
        }
        if (empty($_POST['project'])) {
            stop('Что-то пошло не так. Отсутствует имя проекта.');
        }
        $db2 = new db;
        $dbname = 'bz_' . $_POST['project'];
        $nextDbname = 'bz_' . $p_baze;
        $db2->connect(DBUSER, DBPASS, $dbname, DBHOST);
        $sql = "SHOW tables";
        $rows = $db2->query($sql);
        $tables = [];
        foreach ($rows as $key => $value) {
            $tables[] = $value["Tables_in_" . $dbname];
        }
        $db2->query("SET FOREIGN_KEY_CHECKS = 0;");
        $sql = 'CREATE DATABASE ' . $nextDbname;
        $db2->query($sql);
        foreach ($tables as $table) {
            $newTable = $nextDbname . "." . $table;
            $table = $dbname . "." . $table;
            $db2->query("RENAME TABLE $table TO $newTable;");
        }
        $db2->query("SET FOREIGN_KEY_CHECKS = 1;");
        $db2->query("DROP DATABASE $dbname");
        $db2->close();
        $db2->free();

        $db_gl->query("UPDATE dle_project SET name = '$p_name', project = '$p_baze' WHERE project = '{$_POST['project']}'");
        $db2 = new db;
        $db2->connect(DBUSER, DBPASS, $nextDbname, DBHOST);
        $db2->query("UPDATE dle_category SET name='$p_name', alt_name='$p_baze' WHERE id = {$_POST['idcategory']}");
        $db2->close();
        $db2->free();
      // $scr = "$('[cat=2][idcat={$_POST['idcategory']}][project={$_POST['project']}]').find('.shottitle').text('$p_name');$('[cat=2][idcat={$_POST['idcategory']}][project={$_POST['project']}]').attr('project','$p_baze');";
       $scr = "window.location.href = '/';";
        die($scr);
    } else {
        $sql = 'CREATE DATABASE bz_' . $p_baze;
        $db->query($sql);

        $db2 = new db;
        $db2->connect(DBUSER, DBPASS, 'bz_' . $p_baze, DBHOST);
        $filename = ENGINE_DIR . '/data/bd_install.sql';
        $templine = '';
        $lines = file($filename);
        foreach ($lines as $line) {
            if (substr($line, 0, 2) == '--' || $line == '')
                continue;
            $templine .= $line;
            if (substr(trim($line), -1, 1) == ';') {
                $db2->query(($templine));
                $templine = '';
            }
        }
        $catimg = saveimg();
        $sql = "INSERT INTO " . USERPREFIX . "_category (Name, alt_name, posi, icon) value ('{$p_name}','{$p_baze}',1 ,'{$catimg}')";
        $db2->query($sql);
        $row['id'] = $db2->insert_id();
        $db2->free();

        $db->query("INSERT INTO " . USERPREFIX . "_project (Name, Project,id_cat,avtor) 
                    values ('{$p_name}','{$p_baze}', {$row['id']}, '{$member_id['name']}')");

        $id = $db->insert_id();
        $sql = "INSERT INTO dle_cat_dostup (id_category, roly, user, ad_grup, user_grup, category, project) 
                VALUE ({$row['id']}, 1, '{$member_id['name']}', '','',2,$id)";
        $db->query($sql);
    }
}

header('Location: ../../index.php');
