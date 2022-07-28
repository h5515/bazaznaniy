<?php
/*
=====================================================
 DataLife Engine - by SoftNews Media Group 
-----------------------------------------------------
 http://dle-news.ru/
-----------------------------------------------------
 Copyright (c) 2004,2010 SoftNews Media Group
=====================================================
 Данный код защищен авторскими правами
=====================================================
 Файл: search.php
-----------------------------------------------------
 Назначение: Быстрый поиск [дополненная версия - http://dlestore.ru]
=====================================================
*/

//@session_start();
@error_reporting(E_ALL ^ E_WARNING ^ E_NOTICE);
@ini_set('display_errors', true);
@ini_set('html_errors', false);
@ini_set('error_reporting', E_ALL ^ E_WARNING ^ E_NOTICE);

define('DATALIFEENGINE', true);
define('ROOT_DIR', '../..');
define('ENGINE_DIR', '..');
//header( "Location: /engine/ajax/search.php" );

/* -------------------------- настройки поиска ----------------------------*/

$news_limit = 50; // Максимальное кол-во новостей в результатах поиска
$title_length = 80; // Максимальная длина заголовка новости
$descr_length = 180; // Максимальная длина описания новости

/* -------------------------- настройки поиска ----------------------------*/

include ENGINE_DIR . '/data/config.php';


if ($config['http_home_url'] == "") {

  $config['http_home_url'] = explode("engine/ajax/search.php", $_SERVER['PHP_SELF']);
  $config['http_home_url'] = reset($config['http_home_url']);
  $config['http_home_url'] = "http://" . $_SERVER['HTTP_HOST'] . $config['http_home_url'];
}

require_once ENGINE_DIR . '/classes/mysql.php';
require_once ENGINE_DIR . '/classes/templates.class.php';
require_once ENGINE_DIR . '/data/dbconfig.php';
require_once ENGINE_DIR . '/modules/functions.php';
require_once ENGINE_DIR . '/modules/sitelogin.php';
require_once ROOT_DIR . '/language/' . $config['langs'] . '/website.lng';
if (!$is_logged) $member_id['user_group'] = 5;

//################# Определение групп пользователей
$user_group = get_vars("usergroup");

function Colors($int)
{
  if ($int == 1) return "#EFFF00";
  if ($int == 2) return "#44B6FF";
  if ($int == 3) return "#0AFF00";
  if ($int == 4) return "#F000FF";
  if ($int == 5) return "#FF8600";
  if ($int == 6) return "#FF0700";
  if ($int == 7) return "#00FFF3";
  if ($int == 8) return "#8900FF";
  if ($int == 9) return "#429F95";
  if ($int == 10) return "#709AB8";
}

function Colortext($word, $text)
{
  $searavi = array();
  $searavi = explode(' ', $word);
  $res = $text;
  $i = 1;
  foreach ($searavi as $key) {
    $key = trim($key);
    if ($key != " " && $key != "") {
      $res = preg_replace("/($key)/ui", "<span style='background:" . Colors($i) . "'><b>$1</b></span>", $res);
      //echo stripslashes( $key )."<br>";
      $i++;
    }
  }
  return $res;
}

function build_like_and($values, $field_name)
{
  $names = explode(',', $values);
  $names = array_map('trim', $names);
  $names = array_filter($names);
  $where = array();
  foreach ((array)$names as $name) {
    $where[] = "LOWER ({$field_name}) LIKE '%{$name}%'";
  }
  $where = '(' . implode(' AND ', $where) . ')';
  return $where;
}

function build_like_or($values, $field_name)
{
  $names = explode(',', $values);
  $names = array_map('trim', $names);
  $names = array_filter($names);
  $where = array();
  foreach ((array)$names as $name) {
    $where[] = "LOWER ({$field_name}) LIKE '%{$name}%'";
  }
  $where = '(' . implode(' OR ', $where) . ')';
  return $where;
}

$aapr = false;

if (!$user_group) {
  $user_group = array();

  $db->query("SELECT * FROM " . USERPREFIX . "_usergroups ORDER BY id ASC");

  while ($row = $db->get_row()) {

    $user_group[$row['id']] = array();

    foreach ($row as $key => $value) {
      $user_group[$row['id']][$key] = $value;
    }
  }
  set_vars("usergroup", $user_group);
  $db->free();
}


if (!$config['fast_search'] or !$user_group[$member_id['user_group']]['allow_search']) die("error");

//####################################################################################################################
//                    Определение категорий и их параметры
//####################################################################################################################
$cat_info = get_vars("category");


if (!is_array($cat_info)) {
  $cat_info = array();

  $db->query("SELECT * FROM " . PREFIX . "_category ORDER BY posi ASC");
  while ($row = $db->get_row()) {

    $cat_info[$row['id']] = array();

    foreach ($row as $key => $value) {
      $cat_info[$row['id']][$key] = stripslashes($value);
    }
  }
  set_vars("category", $cat_info);
  $db->free();
}

$tpl = new dle_template();
$tpl->dir = ROOT_DIR . '/templates/' . $config['skin'];
define('TEMPLATE_DIR', $tpl->dir);

if ($_POST['query'] != '')
  $query = $db->safesql(htmlspecialchars(trim(strip_tags(convert_unicode($_POST['query'], $config['charset']))), ENT_QUOTES));

if ($query != "") {
  $slovcheck = $_POST['slovcheck'];
  // echo $slovcheck;

  if ($slovcheck == 'true') { //"(short_story LIKE '%{$query}%' OR full_story LIKE '%{$query}%' OR xfields LIKE '%{$query}%' OR title LIKE '%{$query}%')";
    $sear = "(full_story LIKE '%{$query}%' OR title LIKE '%{$query}%')";
  } else {
    $searavi = array();
    $searavi = explode(' ', $query);
    $seartex = implode(',', $searavi);

    $sear = "(" . build_like_and($seartex, 'full_story') . " OR " . build_like_and($seartex, 'title') . ")";

    /*   foreach ( $searavi as $key ) {
         echo stripslashes( $key )."<br>";
       }*/
  }
}

$buffer = "";

$tagshtml = '';
$mastag = [];
$posttag = explode(',', $_POST['tagson']);

if ($_POST['command'] == 'favorit') {
  //  echo ('---------');
  $list = explode(",", $member_id['favorites']);
  $list = array_reverse($list);
  $fav_list = array();
  $order_list = array();

  foreach ($list as $daten) {
    $daten = intval($daten);
    $fav_list[] = "'" . $daten . "'";
    $order_list[] = $daten;
  }

  $list = implode(",", $fav_list);

  $favorites = "(" . $list . ")";

  if (count($order_list)) {

    $order_list = implode(",", $order_list);
    $order_list = "ORDER BY FIND_IN_SET(id, '" . $order_list . "') ";
  } else $order_list = "";

  $favorites = " AND id IN " . $favorites;
  $arhs = true;
}

if ($_POST['command'] == 'myst') {
  //$appr = true;
  $myst = " AND autor = '{$member_id['name']}' ";
  $arhs = true;
  $vivid = true;
}

if ($_POST['command'] == 'arhiv') {
  $arh = " AND arhiv=1 ";
} else {
  if (!$arhs) {
    $arh = " AND arhiv=0 ";
  }
}

if ($_POST['command'] == 'noapp') {
  $appr = true;
  $apps = " AND approve =0 ";
  $vivid = true;
}

$dlin = -1;
$dlin = strpos($_POST['command'], 'Автор - ');
if ($dlin > -1) {
  $appr = true;
  $autor = substr($_POST['command'], (strlen($_POST['command']) - 13) * -1);
  $autor = " AND autor = '{$autor}' ";
}

$dlin = -1;
$dlin = strpos($_POST['command'], 'Архив - ');
if ($dlin > -1) {
  //  $appr = true;  
  $arhiv = substr($_POST['command'], (strlen($_POST['command']) - 13) * -1);
  $mout = array();
  $mout = explode('.', $arhiv);
  if (count($mout) == 3) {
    $arhiv = " AND month(date) = '$mout[1]' AND year(date) = '$mout[2]' AND dayofmonth(date) = '$mout[0]' ";
  } else {
    $arhiv = " AND month(date) = '$mout[0]' AND year(date) = '$mout[1]' ";
  }
}


if (!$_POST['sorted'] == "") {
  $sorted = $_POST['sorted'];
} else {
  $sorted = "date";
};
if (!$_POST['directory'] == "") {
  $directory = $_POST['directory'];
} else {
  $directory = "desc";
}

$tagcheck = $_POST['tagcheck'];

if (!$_POST['tagson'] == "") {

  $tagson = mb_strtolower($_POST['tagson'], 'utf-8');

  if ($tagcheck == 'false') {
    $tagson = " AND " . build_like_or($tagson, 'tags');
  } else {
    $tagson = " AND " . build_like_and($tagson, 'tags');
  }


  /*  $tagson = $db->safesql( htmlspecialchars( trim( strip_tags( convert_unicode( $_POST[ 'tagson' ], $config[ 'charset' ] ) ) ), ENT_QUOTES ) );
   // $tagson = mb_strtolower( $tagson, 'utf-8' );   
    $tagson = explode( ',', $tagson);
   // $tagson = " AND tags regexp '[[:<:]](" . implode( '|', $tagson ) . ")[[:>:]]' ";
    $tagson = " AND tags IN ('" . implode( "','", $tagson ) . "')";    */
}


if (!$_POST['categoris'] == "") {
  $categor = $_POST['categoris'];

  $category = explode(',', $categor);
  $categorys = $category[0];

  $aviable = array();
  $aviable = explode(',', $categor);
  if ($query != "") {
    $tcat = " AND category regexp '[[:<:]](" . implode('|', $aviable) . ")[[:>:]]' ";
  } else {
    $tcat = " category regexp '[[:<:]](" . implode('|', $aviable) . ")[[:>:]]' ";
  }
} else {
  $tcat = "";
}

if ($_POST['command'] == 'noread') {
  $noread = " AND id NOT in (SELECT id_news FROM dle_post_read WHERE user = '{$member_id['name']}') ";
}

$fixed = " ORDER by fixed desc, ";

if ($_POST['command'] == 'esread') {
  $noread = " AND id in (SELECT post_id FROM dle_post_view WHERE user = '{$member_id['name']}' ORDER BY date_read) ";
  $fixed = " ORDER by ";
}

//"SELECT p.id, p.autor, p.date, p.short_story, CHAR_LENGTH(p.full_story) as full_story, p.xfields, p.title, p.category, p.alt_name, p.comm_num, p.allow_comm, p.fixed, p.tags, e.news_read, e.allow_rate, e.rating, e.vote_num, e.votes, e.view_edit, e.editdate, e.editor, e.reason FROM dle_post p LEFT JOIN dle_post_extras e ON (p.id=e.news_id) WHERE id IN ('24','29','28','31','27','5') AND approve=1 AND date < '2022-07-26 04:31:22' ORDER BY FIND_IN_SET(id, '24,29,28,31,27,5')   LIMIT 0,50"

if ($sear == '') {
  $jprot = ', q.id_news as id_news';
  $join_read = " LEFT JOIN " . PREFIX . "_post_read q ON (p.id=q.id_news AND q.user='" . $member_id['name'] . "')";
}

if (!$appr) {
  $apps = " AND approve =1 ";
}

if ($sear != '') {
  $tpl->load_template('ss.result.tpl');
} else {
  $tpl->load_template('shortstory.tpl');
}

prot:
if ($vivid and $proxod) {
  $tabl = "post_arhiv";
  $ids = 'p.ids,';
  $edat = ', p.edate';
} else {
  $tabl = "post";
  $ids = '';
  $edat = '';
}
//echo $categor;
$sql = "SELECT $ids p.id, p.autor, p.date $edat, p.short_story, p.full_story, p.xfields, p.title, p.category, p.alt_name, p.comm_num, p.allow_comm, p.fixed, p.tags, p.approve, p.arhiv, e.news_read, e.allow_rate, e.rating, e.vote_num, e.votes, e.view_edit, e.editdate, e.editor, e.reason" . $jprot . " FROM " . PREFIX . "_" . $tabl . " p" . $join_read . " LEFT JOIN dle_post_extras e ON (p.id=e.news_id) WHERE" . $sear . $tcat . $tagson . $favorites . $noread . $myst . $apps . $autor . $arhiv . $arh . $fixed . $sorted . " " . $directory . " LIMIT $news_limit";


$dlin = -1;
$dlin = strpos($sql, 'WHERE AND');
if ($dlin > -1) {
  $sql = str_replace('WHERE AND', 'WHERE', $sql);
}


$array_words = $query;

$array_words = preg_replace('/(ё|е)/ui', 'е', $array_words);


$db->query($sql);

$news_id = [];
while ($row = $db->get_row()) {

  //$row['date'] = strtotime($row['date']);
  //$row['category'] = intval($row['category']);

  //        $db2 = new db;
  //        $sql2 = 'SELECT name FROM dle_category WHERE id = "' . $row['category'] . '"';
  //        $result2 = $db2->super_query( $sql2 );
  //        $cat = $result2['name'];

  $news_id[] = $row['id'];
  if (!$row['category']) {
    $my_cat = "---";
    $my_cat_link = "---";
  } else {

    $my_cat = array();
    $my_cat_link = array();
    $cat_list = $row['cats'] = explode(',', $row['category']);

    if (count($cat_list) == 1 or ($view_template == "rss"
      and $config['rss_format'] == 2)) {

      if ($cat_info[$cat_list[0]]['id']) {
        $my_cat[] = $cat_info[$cat_list[0]]['name'];
        $my_cat_link = get_categories($cat_list[0], $config['category_separator']);
      } else {
        $my_cat_link = "---";
      }
    } else {

      foreach ($cat_list as $element) {

        if ($element and $cat_info[$element]['id']) {
          $my_cat[] = $cat_info[$element]['name'];
          if (isset($_COOKIE['dbname']))
            $prjlink = '&project=' . $_COOKIE['dbname'] . '&';
          else
            $prjlink = '';
          if ($config['allow_alt_url']) $my_cat_link[] = "<a href=\"" . $config['http_home_url'] . get_url($element) . "/\">{$cat_info[$element]['name']}</a>";
          else $my_cat_link[] = "<a href=\"$PHP_SELF?do=cat&{$prjlink}category={$cat_info[$element]['alt_name']}\">{$cat_info[$element]['name']}</a>";
        }
      }

      if (count($my_cat_link)) {
        $my_cat_link = implode($config['category_separator'], $my_cat_link);
      } else $my_cat_link = "---";
    }

    if (count($my_cat)) {
      $my_cat = implode($config['category_separator'], $my_cat);
    } else $my_cat = "---";
  }


  $news_found = TRUE;
  $attachments[] = $row['id'];
  $row['date'] = strtotime($row['date']);

  if ($config['allow_banner'] and count($banners)) {

    foreach ($banners as $name => $value) {
      $tpl->copy_template = str_replace("{banner_" . $name . "}", $value, $tpl->copy_template);

      if ($value) {
        $tpl->copy_template = str_replace("[banner_" . $name . "]", "", $tpl->copy_template);
        $tpl->copy_template = str_replace("[/banner_" . $name . "]", "", $tpl->copy_template);
      }
    }
  }

  $tpl->set_block("'{banner_(.*?)}'si", "");
  $tpl->set_block("'\\[banner_(.*?)\\](.*?)\\[/banner_(.*?)\\]'si", "");

  if (isset($middle)) {

    if ($news_c == $middle_s) {
      $tpl->copy_template .= bannermass($banners_topz, $ban_short['top']);
    } else if ($news_c == $middle) {
      $tpl->copy_template .= bannermass($banners_cenz, $ban_short['cen']);
    } else if ($news_c == $middle_e) {
      $tpl->copy_template .= bannermass($banners_downz, $ban_short['down']);
    }
    $news_c++;
  }

  $news_count++;

  if (!$row['category']) {
    $my_cat = "---";
    $my_cat_link = "---";
  } else {

    $my_cat = array();
    $my_cat_link = array();
    $cat_list = $row['cats'] = explode(',', $row['category']);

    if (count($cat_list) == 1 or ($view_template == "rss"
      and $config['rss_format'] == 2)) {

      if ($cat_info[$cat_list[0]]['id']) {
        $my_cat[] = $cat_info[$cat_list[0]]['name'];
        $my_cat_link = get_categories($cat_list[0], $config['category_separator']);
      } else {
        $my_cat_link = "---";
      }
    } else {

      foreach ($cat_list as $element) {

        if ($element and $cat_info[$element]['id']) {
          $my_cat[] = $cat_info[$element]['name'];
          if (isset($_COOKIE['dbname']))
            $prjlink = '&project=' . $_COOKIE['dbname'] . '&';
          else
            $prjlink = '';
          if ($config['allow_alt_url']) $my_cat_link[] = "<a href=\"" . $config['http_home_url'] . get_url($element) . "/\">{$cat_info[$element]['name']}</a>";
          else $my_cat_link[] = "<a href=\"$PHP_SELF?do=cat&{$prjlink}category={$cat_info[$element]['alt_name']}\">{$cat_info[$element]['name']}</a>";
        }
      }

      if (count($my_cat_link)) {
        $my_cat_link = implode($config['category_separator'], $my_cat_link);
      } else $my_cat_link = "---";
    }

    if (count($my_cat)) {
      $my_cat = implode($config['category_separator'], $my_cat);
    } else $my_cat = "---";
  }

  $url_cat = $category_id;

  if (stripos($tpl->copy_template, "[category=") !== false) {
    $tpl->copy_template = preg_replace_callback("#\\[(category)=(.+?)\\](.*?)\\[/category\\]#is", "check_category", $tpl->copy_template);
  }

  if (stripos($tpl->copy_template, "[not-category=") !== false) {
    $tpl->copy_template = preg_replace_callback("#\\[(not-category)=(.+?)\\](.*?)\\[/not-category\\]#is", "check_category", $tpl->copy_template);
  }

  $category_id = $row['category'];

  if (strpos($tpl->copy_template, "[catlist=") !== false) {
    $tpl->copy_template = preg_replace_callback("#\\[(catlist)=(.+?)\\](.*?)\\[/catlist\\]#is", "check_category", $tpl->copy_template);
  }

  if (strpos($tpl->copy_template, "[not-catlist=") !== false) {
    $tpl->copy_template = preg_replace_callback("#\\[(not-catlist)=(.+?)\\](.*?)\\[/not-catlist\\]#is", "check_category", $tpl->copy_template);
  }

  $temp_rating = $config['rating_type'];
  $config['rating_type'] = if_category_rating($row['category']);

  if ($config['rating_type'] === false) {
    $config['rating_type'] = $temp_rating;
  }

  $category_id = $url_cat;

  if ($config['allow_alt_url']) {

    if ($config['seo_type'] == 1 or $config['seo_type'] == 2) {

      if ($row['category'] and $config['seo_type'] == 2) {

        $cats_url = get_url($row['category']);

        if ($cats_url) {

          $full_link = $config['http_home_url'] . $cats_url . "/" . $row['id'] . "-" . $row['alt_name'] . ".html";
        } else $full_link = $config['http_home_url'] . $row['id'] . "-" . $row['alt_name'] . ".html";
      } else {

        $full_link = $config['http_home_url'] . $row['id'] . "-" . $row['alt_name'] . ".html";
      }
    } else {

      $full_link = $config['http_home_url'] . date('Y/m/d/', $row['date']) . $row['alt_name'] . ".html";
    }
  } else {

    $full_link = $config['http_home_url'] . "index.php?newsid=" . $row['id'];
  }

  if ($row['category']) {

    $cats_url = get_url($row['category']);

    if ($cats_url) $cats_url .= "/";
    if (isset($_COOKIE['dbname']))
      $prjlink = '&project=' . $_COOKIE['dbname'] . '&';
    else
      $prjlink = '';
    if ($config['allow_alt_url']) $tpl->set('{category-url}', $config['http_home_url'] . $cats_url);
    else $tpl->set('{category-url}', "$PHP_SELF?do=cat&{$prjlink}category={$cat_info[$row['category']]['alt_name']}");
  } else $tpl->set('{category-url}', "#");


  $row['category'] = intval($row['category']);

  if ($proxod) {
    $row['comm_num'] = 0;
    $row['news_read'] = 0;
    $tpl->set('[redact]', "");
    $tpl->set('[/redact]', "");
    $tpl->set_block("'\\[no-redact\\](.*?)\\[/no-redact\\]'si", "");
  } else {
    $tpl->set_block("'\\[redact\\](.*?)\\[/redact\\]'si", "");
    $tpl->set('[no-redact]', "");
    $tpl->set('[/no-redact]', "");
  }


  if ($proxod) {
    $rid = $row['ids'];
  } else
    $rid = $row['id'];


  $news_find = array('{comments-num}' => number_format($row['comm_num'], 0, ',', ' '), '{views}' => number_format($row['news_read'], 0, ',', ' '), '{category}' => $my_cat, '{link-category}' => $my_cat_link, '{news-id}' => $rid);

  if ($proxod)
    $tpl->set('{news-ids}', $row['id']);
  else
    $tpl->set('{news-ids}', "");

  $tpl->set('', $news_find);

  if ($row['category'] and $cat_info[$row['category']]['icon']) {

    $tpl->set('{category-icon}', $cat_info[$row['category']]['icon']);
    $tpl->set('[category-icon]', "");
    $tpl->set('[/category-icon]', "");
    $tpl->set_block("'\\[not-category-icon\\](.*?)\\[/not-category-icon\\]'si", "");
  } else {

    $tpl->set('{category-icon}', "{THEME}/dleimages/no_icon.gif");
    $tpl->set('[not-category-icon]', "");
    $tpl->set('[/not-category-icon]', "");
    $tpl->set_block("'\\[category-icon\\](.*?)\\[/category-icon\\]'si", "");
  }


  if (date('Ymd', $row['date']) == date('Ymd', $_TIME)) {

    $tpl->set('{date}', $lang['time_heute'] . langdate(", H:i", $row['date'], $short_news_cache));
  } elseif (date('Ymd', $row['date']) == date('Ymd', ($_TIME - 86400))) {

    $tpl->set('{date}', $lang['time_gestern'] . langdate(", H:i", $row['date'], $short_news_cache));
  } else {

    $tpl->set('{date}', langdate($config['timestamp_active'], $row['date'], $short_news_cache));
  }

  $news_date = $row['date'];
  $tpl->copy_template = preg_replace_callback("#\{date=(.+?)\}#i", "formdate", $tpl->copy_template);

  $global_news_count++;

  if (strpos($tpl->copy_template, "[newscount=") !== false) {
    $tpl->copy_template = preg_replace_callback("#\\[(newscount)=(.+?)\\](.*?)\\[/newscount\\]#is", "check_newscount", $tpl->copy_template);
  }

  if (strpos($tpl->copy_template, "[not-newscount=") !== false) {
    $tpl->copy_template = preg_replace_callback("#\\[(not-newscount)=(.+?)\\](.*?)\\[/not-newscount\\]#is", "check_newscount", $tpl->copy_template);
  }

  if ($row['fixed']) {

    $tpl->set('[fixed]', "");
    $tpl->set('[/fixed]', "");
    $tpl->set_block("'\\[not-fixed\\](.*?)\\[/not-fixed\\]'si", "");
  } else {

    $tpl->set('[not-fixed]', "");
    $tpl->set('[/not-fixed]', "");
    $tpl->set_block("'\\[fixed\\](.*?)\\[/fixed\\]'si", "");
  }

  if ($row['comm_num']) {

    if ($row['allow_comm']) {

      $tpl->set('[comments]', "");
      $tpl->set('[/comments]', "");
    } else $tpl->set_block("'\\[comments\\](.*?)\\[/comments\\]'si", "");

    $tpl->set_block("'\\[not-comments\\](.*?)\\[/not-comments\\]'si", "");
  } else {

    if ($row['allow_comm']) {

      $tpl->set('[not-comments]', "");
      $tpl->set('[/not-comments]', "");
    } else $tpl->set_block("'\\[not-comments\\](.*?)\\[/not-comments\\]'si", "");

    $tpl->set_block("'\\[comments\\](.*?)\\[/comments\\]'si", "");
  }

  if ($row['votes']) {

    $tpl->set('[poll]', "");
    $tpl->set('[/poll]', "");
    $tpl->set_block("'\\[not-poll\\](.*?)\\[/not-poll\\]'si", "");
  } else {

    $tpl->set('[not-poll]', "");
    $tpl->set('[/not-poll]', "");
    $tpl->set_block("'\\[poll\\](.*?)\\[/poll\\]'si", "");
  }

  if (strpos($tpl->copy_template, "{poll}") !== false and $view_template != "rss") {

    if ($row['votes']) {

      include(DLEPlugins::Check(ENGINE_DIR . '/modules/poll.php'));

      $tpl->set('{poll}', $tpl->result['poll']);
    } else {

      $tpl->set('{poll}', '');
    }
  }

  if ($row['view_edit'] and $row['editdate'] or $proxod) {

    if ($proxod)
      $row['editdate'] = $row['edate'];

    if (date('Ymd', $row['editdate']) == date('Ymd', $_TIME)) {

      $tpl->set('{edit-date}', $lang['time_heute'] . langdate(", H:i", $row['editdate'], $short_news_cache));
    } elseif (date('Ymd', $row['editdate']) == date('Ymd', ($_TIME - 86400))) {

      $tpl->set('{edit-date}', $lang['time_gestern'] . langdate(", H:i", $row['editdate'], $short_news_cache));
    } else {

      $tpl->set('{edit-date}', langdate($config['timestamp_active'], $row['editdate'], $short_news_cache));
    }

    if ($proxod)
      $editst = $row['autor'];
    else
      $editst = $row['editor'];
    
      $editst = $db_gl->super_query("SELECT fullname FROM dle_users WHERE name = '{$editst}'")['fullname'];

    $tpl->set('{editor}', $editst);

    if ($proxod)
      $reas = $row['short_story'];
    else
      $reas = $row['reason'];

    $tpl->set('{edit-reason}', $reas);

    if ($row['reason'] or $reas != "") {

      $tpl->set('[edit-reason]', "");
      $tpl->set('[/edit-reason]', "");
    } else {
      $tpl->set_block("'\\[edit-reason\\](.*?)\\[/edit-reason\\]'si", "");
    }

    $tpl->set('[edit-date]', "");
    $tpl->set('[/edit-date]', "");
  } else {

    $tpl->set('{edit-date}', "");
    $tpl->set('{editor}', "");
    $tpl->set('{edit-reason}', "");
    $tpl->set_block("'\\[edit-date\\](.*?)\\[/edit-date\\]'si", "");
    $tpl->set_block("'\\[edit-reason\\](.*?)\\[/edit-reason\\]'si", "");
  }

  if ($config['allow_tags'] and $row['tags']) {

    $tpl->set('[tags]', "");
    $tpl->set('[/tags]', "");

    $tags = array();

    
    $row['tags'] = explode(",", $row['tags']);

    foreach ($row['tags'] as $value) {

      $value = trim($value);
      $url_tag = str_replace(array("&#039;", "&quot;", "&amp;"), array("'", '"', "&"), $value);

      if ($config['allow_alt_url']) $tags[] = "<a href=\"" . $config['http_home_url'] . "tags/" . rawurlencode($url_tag) . "/\">" . $value . "</a>";
      else $tags[] = "<span class=\"clouds_xsmall\"><a href=\"#\" onClick=\"tagsclick('" . $value . "',this,$categorys)\">" . $value . "</a></span>";
     
      if (!in_array($value, $posttag)&&!in_array($value, $mastag)){
        $tagshtml .= "<span class=\"clouds_xsmall\"><a href=\"#\" onClick=\"tagsclick('" . $value . "',this,$categorys)\">" . $value . "</a></span>";
        $mastag[] = $value;
      }
    }

    $tpl->set('{tags}', implode($config['tags_separator'], $tags));

  } else {

    $tpl->set_block("'\\[tags\\](.*?)\\[/tags\\]'si", "");
    $tpl->set('{tags}', "");
  }

  if ($config['rating_type'] == "1") {
    $tpl->set('[rating-type-2]', "");
    $tpl->set('[/rating-type-2]', "");
    $tpl->set_block("'\\[rating-type-1\\](.*?)\\[/rating-type-1\\]'si", "");
    $tpl->set_block("'\\[rating-type-3\\](.*?)\\[/rating-type-3\\]'si", "");
    $tpl->set_block("'\\[rating-type-4\\](.*?)\\[/rating-type-4\\]'si", "");
  } elseif ($config['rating_type'] == "2") {
    $tpl->set('[rating-type-3]', "");
    $tpl->set('[/rating-type-3]', "");
    $tpl->set_block("'\\[rating-type-1\\](.*?)\\[/rating-type-1\\]'si", "");
    $tpl->set_block("'\\[rating-type-2\\](.*?)\\[/rating-type-2\\]'si", "");
    $tpl->set_block("'\\[rating-type-4\\](.*?)\\[/rating-type-4\\]'si", "");
  } elseif ($config['rating_type'] == "3") {
    $tpl->set('[rating-type-4]', "");
    $tpl->set('[/rating-type-4]', "");
    $tpl->set_block("'\\[rating-type-1\\](.*?)\\[/rating-type-1\\]'si", "");
    $tpl->set_block("'\\[rating-type-2\\](.*?)\\[/rating-type-2\\]'si", "");
    $tpl->set_block("'\\[rating-type-3\\](.*?)\\[/rating-type-3\\]'si", "");
  } else {
    $tpl->set('[rating-type-1]', "");
    $tpl->set('[/rating-type-1]', "");
    $tpl->set_block("'\\[rating-type-4\\](.*?)\\[/rating-type-4\\]'si", "");
    $tpl->set_block("'\\[rating-type-3\\](.*?)\\[/rating-type-3\\]'si", "");
    $tpl->set_block("'\\[rating-type-2\\](.*?)\\[/rating-type-2\\]'si", "");
  }

  if ($row['allow_rate']) {

    if ($config['short_rating'] and $user_group[$member_id['user_group']]['allow_rating']) {

      $tpl->set('{rating}', ShowRating($row['id'], $row['rating'], $row['vote_num'], 1));

      if ($config['rating_type']) {

        $tpl->set('[rating-plus]', "<a href=\"#\" onclick=\"doRate('plus', '{$row['id']}'); return false;\" >");
        $tpl->set('[/rating-plus]', '</a>');

        if (
          $config['rating_type'] == "2"
          or $config['rating_type'] == "3"
        ) {

          $tpl->set('[rating-minus]', "<a href=\"#\" onclick=\"doRate('minus', '{$row['id']}'); return false;\" >");
          $tpl->set('[/rating-minus]', '</a>');
        } else {
          $tpl->set_block("'\\[rating-minus\\](.*?)\\[/rating-minus\\]'si", "");
        }
      } else {
        $tpl->set_block("'\\[rating-plus\\](.*?)\\[/rating-plus\\]'si", "");
        $tpl->set_block("'\\[rating-minus\\](.*?)\\[/rating-minus\\]'si", "");
      }
    } else {

      $tpl->set('{rating}', ShowRating($row['id'], $row['rating'], $row['vote_num'], 0));
      $tpl->set_block("'\\[rating-plus\\](.*?)\\[/rating-plus\\]'si", "");
      $tpl->set_block("'\\[rating-minus\\](.*?)\\[/rating-minus\\]'si", "");
    }

    if ($row['vote_num']) $ratingscore = str_replace(',', '.', round(($row['rating'] / $row['vote_num']), 1));
    else $ratingscore = 0;

    $tpl->set('{ratingscore}', $ratingscore);

    $dislikes = ($row['vote_num'] - $row['rating']) / 2;
    $likes = $row['vote_num'] - $dislikes;

    if ($proxod) {
      $tpl->set('{rating}', "");
      $tpl->set('{vote-num}', "");
      $tpl->set('{likes}', "");
      $tpl->set('{dislikes}', "");
      $tpl->set('{ratingscore}', "");
      $tpl->set_block("'\\[rating\\](.*?)\\[/rating\\]'si", "");
      $tpl->set_block("'\\[rating-plus\\](.*?)\\[/rating-plus\\]'si", "");
      $tpl->set_block("'\\[rating-minus\\](.*?)\\[/rating-minus\\]'si", "");
    } else {

      $tpl->set('{likes}', "<span id=\"likes-id-" . $row['id'] . "\" class=\"ignore-select\">" . $likes . "</span>");
      $tpl->set('{dislikes}', "<span id=\"dislikes-id-" . $row['id'] . "\" class=\"ignore-select\">" . $dislikes . "</span>");
      $tpl->set('{vote-num}', "<span id=\"vote-num-id-" . $row['id'] . "\" class=\"ignore-select\">" . $row['vote_num'] . "</span>");
      $tpl->set('[rating]', "");
      $tpl->set('[/rating]', "");
    }
  } else {

    $tpl->set('{rating}', "");
    $tpl->set('{vote-num}', "");
    $tpl->set('{likes}', "");
    $tpl->set('{dislikes}', "");
    $tpl->set('{ratingscore}', "");
    $tpl->set_block("'\\[rating\\](.*?)\\[/rating\\]'si", "");
    $tpl->set_block("'\\[rating-plus\\](.*?)\\[/rating-plus\\]'si", "");
    $tpl->set_block("'\\[rating-minus\\](.*?)\\[/rating-minus\\]'si", "");
  }

  $config['rating_type'] = $temp_rating;

  if ($config['allow_alt_url']) {

    $go_page = $config['http_home_url'] . "user/" . urlencode($row['autor']) . "/";
    $tpl->set('[day-news]', "<a href=\"" . $config['http_home_url'] . date('Y/m/d/', $row['date']) . "\" >");
  } else {

    $go_page = "$PHP_SELF?subaction=userinfo&amp;user=" . urlencode($row['autor']);
    $tpl->set('[day-news]', "<a href=\"$PHP_SELF?year=" . date('Y', $row['date']) . "&amp;month=" . date('m', $row['date']) . "&amp;day=" . date('d', $row['date']) . "\" >");
  }

  $tpl->set('[/day-news]', "</a>");
  $tpl->set('[profile]', "<a href=\"" . $go_page . "\">");
  $tpl->set('[/profile]', "</a>");
  $tpl->set_block("'\\[not-news\\](.*?)\\[/not-news\\]'si", "");

  $tpl->set('{login}', $row['autor']);

  $use = $db_gl->super_query("SELECT fullname FROM dle_users WHERE name = '{$row['autor']}'");

  $tpl->set('{author}', "<a onclick=\"ShowProfile('" . urlencode($row['autor']) . "', '" . $go_page . "', '" . $user_group[$member_id['user_group']]['admin_editusers'] . "'); return false;\" href=\"" . $go_page . "\">" . $use['fullname'] . "</a>");

  $allow_userinfo = true;     // and( $member_id[ 'name' ] == $row[ 'autor' ]and!$user_group[ $member_id[ 'user_group' ] ][ 'allow_all_edit' ] )

  if ($proxod) {
    $runt = ',1';
    $ids = $row['ids'];
  } else {
    $ids = $row['id'];
  }


  if ($allow_userinfo and !$user_group[$member_id['user_group']]['allow_edit'] and $user_group[$member_id['user_group']]['allow_adds']) {
    if (!$row['approve'] && $row['autor'] == $member_id['name']) {
      $tpl->set('[edit]', "<a onclick=\"return dropdownmenu(this, event, MenuNewsBuild('" . $ids . "', 'short', '" . $row['arhiv'] . "', '" . $row['approve'] . "'" . $runt . "), '170px')\" href=\"#\">");
      $tpl->set('[/edit]', "</a>");
      $allow_comments_ajax = true;
    } else {
      $tpl->set('[edit]', "<a href=\"#\" onClick=\"ShowEdit('" . $ids . "'" . $runt . "); return false;\" title='Редактировать'/>");
      $tpl->set('[/edit]', "</a>");
    }
  } elseif ($is_logged and (($member_id['name'] == $row['autor'] and $user_group[$member_id['user_group']]['allow_edit']) or $user_group[$member_id['user_group']]['allow_all_edit'])) {

    //$_SESSION[ 'referrer' ] = htmlspecialchars( $_SERVER[ 'REQUEST_URI' ], ENT_QUOTES, $config[ 'charset' ] );
    $tpl->set('[edit]', "<a onclick=\"return dropdownmenu(this, event, MenuNewsBuild('" . $ids . "', 'short', '" . $row['arhiv'] . "', '" . $row['approve'] . "'" . $runt . "), '170px')\" href=\"#\">");
    $tpl->set('[/edit]', "</a>");
    $allow_comments_ajax = true;
  } else $tpl->set_block("'\\[edit\\](.*?)\\[/edit\\]'si", "");

  if (($row['full_story'] < 13) and $config['hide_full_link']) $tpl->set_block("'\\[full-link\\](.*?)\\[/full-link\\]'si", "");
  else {

    $tpl->set('[full-link]', "<a href=\"" . $full_link . "\">");

    $tpl->set('[/full-link]', "</a>");
  }

  if (isset($_COOKIE['dbname']))
    $prjlink = '&project=' . $_COOKIE['dbname'];
  else
    $prjlink = '';

  $full_link .= $prjlink;

  $tpl->set('{full-link}', $full_link);

  if ($row['allow_comm']) {

    $tpl->set('[com-link]', "<a href=\"" . $full_link . "#comment\">");
    $tpl->set('[/com-link]', "</a>");
  } else $tpl->set_block("'\\[com-link\\](.*?)\\[/com-link\\]'si", "");

  if ($is_logged and !$vivid) {

    $fav_arr = explode(',', $member_id['favorites']);
    // or $config['allow_cache']
    if (!in_array($row['id'], $fav_arr)) {
      //  echo '1';
      $tpl->set('{favorites}', "<a id=\"fav-id-" . $row['id'] . "\" href=\"$PHP_SELF?do=favorites&amp;doaction=add&amp;id=" . $row['id'] . "\"><img src=\"" . $config['http_home_url'] . "templates/{$config['skin']}/dleimages/plus_fav.gif\" onclick=\"doFavorites('" . $row['id'] . "', 'plus', 0); return false;\" title=\"" . $lang['news_addfav'] . "\" style=\"vertical-align: middle;border: none;\" alt=\"\"></a>");
      $tpl->set('[add-favorites]', "<a id=\"fav-id-" . $row['id'] . "\" onclick=\"doFavorites('" . $row['id'] . "', 'plus', 1); return false;\" href=\"$PHP_SELF?do=favorites&amp;doaction=add&amp;id=" . $row['id'] . "\">");
      $tpl->set('[/add-favorites]', "</a>");
      $tpl->set_block("'\\[del-favorites\\](.*?)\\[/del-favorites\\]'si", "");
    } else {
      //       echo '2';
      $tpl->set('{favorites}', "<a id=\"fav-id-" . $row['id'] . "\" href=\"$PHP_SELF?do=favorites&amp;doaction=del&amp;id=" . $row['id'] . "\"><img src=\"" . $config['http_home_url'] . "templates/{$config['skin']}/dleimages/minus_fav.gif\" onclick=\"doFavorites('" . $row['id'] . "', 'minus', 0); return false;\" title=\"" . $lang['news_minfav'] . "\" style=\"vertical-align: middle;border: none;\" alt=\"\"></a>");
      $tpl->set('[del-favorites]', "<a id=\"fav-id-" . $row['id'] . "\" onclick=\"doFavorites('" . $row['id'] . "', 'minus', 1); return false;\" href=\"$PHP_SELF?do=favorites&amp;doaction=del&amp;id=" . $row['id'] . "\">");
      $tpl->set('[/del-favorites]', "</a>");
      $tpl->set_block("'\\[add-favorites\\](.*?)\\[/add-favorites\\]'si", "");
    }
  } else {
    $tpl->set('{favorites}', "");
    $tpl->set_block("'\\[add-favorites\\](.*?)\\[/add-favorites\\]'si", "");
    $tpl->set_block("'\\[del-favorites\\](.*?)\\[/del-favorites\\]'si", "");
  }
  if ($proxod && $row['approve!=0']) {
    $tpl->set('{vived}', "&vivid=ok");
  } else
    $tpl->set('{vived}', "");

  $tpl->set('[complaint]', "<a href=\"javascript:AddComplaint('" . $row['id'] . "', 'news')\">");
  $tpl->set('[/complaint]', "</a>");

  if ($allow_userinfo) {

    $tpl->set('{approve}', $lang['approve']);
  } else $tpl->set('{approve}', "");


  $row['xfields'] = stripslashes($row['xfields']);

  if ($xfound and count($xfields)) {
    $row['xfields_array'] = xfieldsdataload($row['xfields']);
  }

  $tpl->copy_template = if_check($tpl->copy_template);

  if ($xfound and count($xfields)) {
    $xfieldsdata = $row['xfields_array'];

    foreach ($xfields as $value) {
      $preg_safe_name = preg_quote($value[0], "'");

      if ($value[20]) {

        $value[20] = explode(',', $value[20]);

        if ($value[20][0] and !in_array($member_id['user_group'], $value[20])) {
          $xfieldsdata[$value[0]] = "";
        }
      }

      if ($value[3] == "yesorno") {

        if (intval($xfieldsdata[$value[0]])) {
          $xfgiven = true;
          $xfieldsdata[$value[0]] = $lang['xfield_xyes'];
        } else {
          $xfgiven = false;
          $xfieldsdata[$value[0]] = $lang['xfield_xno'];
        }
      } else {

        if ($xfieldsdata[$value[0]] == "") $xfgiven = false;
        else $xfgiven = true;
      }

      if (!$xfgiven) {
        $tpl->copy_template = preg_replace("'\\[xfgiven_{$preg_safe_name}\\](.*?)\\[/xfgiven_{$preg_safe_name}\\]'is", "", $tpl->copy_template);
        $tpl->copy_template = str_ireplace("[xfnotgiven_{$value[0]}]", "", $tpl->copy_template);
        $tpl->copy_template = str_ireplace("[/xfnotgiven_{$value[0]}]", "", $tpl->copy_template);
      } else {
        $tpl->copy_template = preg_replace("'\\[xfnotgiven_{$preg_safe_name}\\](.*?)\\[/xfnotgiven_{$preg_safe_name}\\]'is", "", $tpl->copy_template);
        $tpl->copy_template = str_ireplace("[xfgiven_{$value[0]}]", "", $tpl->copy_template);
        $tpl->copy_template = str_ireplace("[/xfgiven_{$value[0]}]", "", $tpl->copy_template);
      }

      if (strpos($tpl->copy_template, "[ifxfvalue {$value[0]}") !== false) {
        $tpl->copy_template = preg_replace_callback("#\\[ifxfvalue(.+?)\\](.+?)\\[/ifxfvalue\\]#is", "check_xfvalue", $tpl->copy_template);
      }

      if ($value[6] and !empty($xfieldsdata[$value[0]])) {
        $temp_array = explode(",", $xfieldsdata[$value[0]]);
        $value3 = array();

        foreach ($temp_array as $value2) {

          $value2 = trim($value2);

          if ($value2) {

            $value4 = str_replace(array("&#039;", "&quot;", "&amp;", "&#123;", "&#91;", "&#58;"), array("'", '"', "&", "{", "[", ":"), $value2);

            if ($value[3] == "datetime") {

              $value2 = strtotime($value4);

              if (!trim($value[24])) $value[24] = $config['timestamp_active'];

              if ($value[25]) {

                if ($value[26]) $value2 = langdate($value[24], $value2);
                else $value2 = langdate($value[24], $value2, false, $customlangdate);
              } else $value2 = date($value[24], $value2);
            }

            if ($config['allow_alt_url']) $value3[] = "<a href=\"" . $config['http_home_url'] . "xfsearch/" . $value[0] . "/" . rawurlencode($value4) . "/\">" . $value2 . "</a>";
            else $value3[] = "<a href=\"$PHP_SELF?do=xfsearch&amp;xfname=" . $value[0] . "&amp;xf=" . rawurlencode($value4) . "\">" . $value2 . "</a>";
          }
        }

        if (empty($value[21])) $value[21] = ", ";

        $xfieldsdata[$value[0]] = implode($value[21], $value3);

        unset($temp_array);
        unset($value2);
        unset($value3);
        unset($value4);
      } elseif (
        $value[3] == "datetime"
        and !empty($xfieldsdata[$value[0]])
      ) {

        $xfieldsdata[$value[0]] = strtotime(str_replace("&#58;", ":", $xfieldsdata[$value[0]]));

        if (!trim($value[24])) $value[24] = $config['timestamp_active'];

        if ($value[25]) {

          if ($value[26]) $xfieldsdata[$value[0]] = langdate($value[24], $xfieldsdata[$value[0]]);
          else $xfieldsdata[$value[0]] = langdate($value[24], $xfieldsdata[$value[0]], false, $customlangdate);
        } else $xfieldsdata[$value[0]] = date($value[24], $xfieldsdata[$value[0]]);
      }

      if (
        $config['allow_links'] and $value[3] == "textarea"
        and function_exists('replace_links')
      ) $xfieldsdata[$value[0]] = replace_links($xfieldsdata[$value[0]], $replace_links['news']);

      if (
        $value[3] == "image"
        and $xfieldsdata[$value[0]]
      ) {

        $temp_array = explode('|', $xfieldsdata[$value[0]]);

        if (count($temp_array) > 1) {

          $temp_alt = $temp_array[0];
          $temp_value = $temp_array[1];
        } else {

          $temp_alt = '';
          $temp_value = $temp_array[0];
        }

        $path_parts = @pathinfo($temp_value);

        if ($value[12] and file_exists(ROOT_DIR . "/uploads/posts/" . $path_parts['dirname'] . "/thumbs/" . $path_parts['basename'])) {
          $thumb_url = $config['http_home_url'] . "uploads/posts/" . $path_parts['dirname'] . "/thumbs/" . $path_parts['basename'];
          $img_url = $config['http_home_url'] . "uploads/posts/" . $path_parts['dirname'] . "/" . $path_parts['basename'];
        } else {
          $img_url = $config['http_home_url'] . "uploads/posts/" . $path_parts['dirname'] . "/" . $path_parts['basename'];
          $thumb_url = "";
        }

        if ($thumb_url) {
          $tpl->set("[xfvalue_thumb_url_{$value[0]}]", $thumb_url);
          $xfieldsdata[$value[0]] = "<a href=\"$img_url\" class=\"highslide\" target=\"_blank\"><img class=\"xfieldimage {$value[0]}\" src=\"$thumb_url\" alt=\"{$temp_alt}\"></a>";
        } else {
          $tpl->set("[xfvalue_thumb_url_{$value[0]}]", $img_url);
          $xfieldsdata[$value[0]] = "<img class=\"xfieldimage {$value[0]}\" src=\"{$img_url}\" alt=\"{$temp_alt}\">";
        }

        $tpl->set("[xfvalue_image_url_{$value[0]}]", $img_url);
      }

      if (
        $value[3] == "image"
        and !$xfieldsdata[$value[0]]
      ) {
        $tpl->set("[xfvalue_thumb_url_{$value[0]}]", "");
        $tpl->set("[xfvalue_image_url_{$value[0]}]", "");
      }

      if (
        $value[3] == "imagegalery"
        and $xfieldsdata[$value[0]] and stripos($tpl->copy_template, "[xfvalue_{$value[0]}") !== false
      ) {

        $fieldvalue_arr = explode(',', $xfieldsdata[$value[0]]);
        $gallery_image = array();
        $gallery_single_image = array();
        $xf_image_count = 0;
        $single_need = false;

        if (stripos($tpl->copy_template, "[xfvalue_{$value[0]} image=") !== false) $single_need = true;

        foreach ($fieldvalue_arr as $temp_value) {
          $xf_image_count++;

          $temp_value = trim($temp_value);

          if ($temp_value == "") continue;

          $temp_array = explode('|', $temp_value);

          if (count($temp_array) > 1) {

            $temp_alt = $temp_array[0];
            $temp_value = $temp_array[1];
          } else {

            $temp_alt = '';
            $temp_value = $temp_array[0];
          }

          $path_parts = @pathinfo($temp_value);

          if ($value[12] and file_exists(ROOT_DIR . "/uploads/posts/" . $path_parts['dirname'] . "/thumbs/" . $path_parts['basename'])) {
            $thumb_url = $config['http_home_url'] . "uploads/posts/" . $path_parts['dirname'] . "/thumbs/" . $path_parts['basename'];
            $img_url = $config['http_home_url'] . "uploads/posts/" . $path_parts['dirname'] . "/" . $path_parts['basename'];
          } else {
            $img_url = $config['http_home_url'] . "uploads/posts/" . $path_parts['dirname'] . "/" . $path_parts['basename'];
            $thumb_url = "";
          }

          if ($thumb_url) {

            $gallery_image[] = "<li><a href=\"$img_url\" onclick=\"return hs.expand(this, { slideshowGroup: 'xf_{$row['id']}_{$value[0]}' })\" target=\"_blank\"><img src=\"{$thumb_url}\" alt=\"{$temp_alt}\"></a></li>";
            $gallery_single_image['[xfvalue_' . $value[0] . ' image="' . $xf_image_count . '"]'] = "<a href=\"{$img_url}\" class=\"highslide\" target=\"_blank\"><img class=\"xfieldimage {$value[0]}\" src=\"{$thumb_url}\" alt=\"{$temp_alt}\"></a>";
          } else {
            $gallery_image[] = "<li><img src=\"{$img_url}\" alt=\"{$temp_alt}\"></li>";
            $gallery_single_image['[xfvalue_' . $value[0] . ' image="' . $xf_image_count . '"]'] = "<img class=\"xfieldimage {$value[0]}\" src=\"{$img_url}\" alt=\"{$temp_alt}\">";
          }
        }

        if ($single_need and count($gallery_single_image)) {
          foreach ($gallery_single_image as $temp_key => $temp_value) $tpl->set($temp_key, $temp_value);
        }

        $xfieldsdata[$value[0]] = "<ul class=\"xfieldimagegallery {$value[0]}\">" . implode($gallery_image) . "</ul>";
      }

      if ($config['image_lazy']) $xfieldsdata[$value[0]] = preg_replace_callback("#<(img|iframe)(.+?)>#i", "enable_lazyload", $xfieldsdata[$value[0]]);

      $tpl->set("[xfvalue_{$value[0]}]", $xfieldsdata[$value[0]]);

      if (preg_match("#\\[xfvalue_{$preg_safe_name} limit=['\"](.+?)['\"]\\]#i", $tpl->copy_template, $matches)) {
        $count = intval($matches[1]);

        $xfieldsdata[$value[0]] = str_replace("><", "> <", $xfieldsdata[$value[0]]);
        $xfieldsdata[$value[0]] = strip_tags($xfieldsdata[$value[0]], "<br>");
        $xfieldsdata[$value[0]] = trim(str_replace("<br>", " ", str_replace("<br />", " ", str_replace("\n", " ", str_replace("\r", "", $xfieldsdata[$value[0]])))));
        $xfieldsdata[$value[0]] = preg_replace('/\s+/u', ' ', $xfieldsdata[$value[0]]);

        if ($count and dle_strlen($xfieldsdata[$value[0]], $config['charset']) > $count) {

          $xfieldsdata[$value[0]] = dle_substr($xfieldsdata[$value[0]], 0, $count, $config['charset']);

          if (($temp_dmax = dle_strrpos($xfieldsdata[$value[0]], ' ', $config['charset']))) $xfieldsdata[$value[0]] = dle_substr($xfieldsdata[$value[0]], 0, $temp_dmax, $config['charset']);
        }

        $tpl->set($matches[0], $xfieldsdata[$value[0]]);
      }
    }
  }

  $row['full_story'] = stripslashes($row['full_story']);

  if (stripos($tpl->copy_template, "image-") !== false) {

    $images = array();
    preg_match_all('/(img|src)=("|\')[^"\'>]+/i', $row['full_story'] . $row['xfields'], $media);
    $data = preg_replace('/(img|src)("|\'|="|=\')(.*)/i', "$3", $media[0]);

    foreach ($data as $url) {
      $info = pathinfo($url);
      if (isset($info['extension'])) {
        if (
          $info['filename'] == "spoiler-plus"
          or $info['filename'] == "spoiler-minus"
          or strpos($info['dirname'], 'engine/data/emoticons') !== false
        ) continue;
        $info['extension'] = strtolower($info['extension']);
        if (($info['extension'] == 'jpg') || ($info['extension'] == 'jpeg') || ($info['extension'] == 'gif') || ($info['extension'] == 'png') || ($info['extension'] == 'webp')) array_push($images, $url);
      }
    }

    if (count($images)) {
      $i_count = 0;
      foreach ($images as $url) {
        $i_count++;
        $tpl->copy_template = str_replace('{image-' . $i_count . '}', $url, $tpl->copy_template);
        $tpl->copy_template = str_replace('[image-' . $i_count . ']', "", $tpl->copy_template);
        $tpl->copy_template = str_replace('[/image-' . $i_count . ']', "", $tpl->copy_template);
        $tpl->copy_template = preg_replace("#\[not-image-{$i_count}\](.+?)\[/not-image-{$i_count}\]#is", "", $tpl->copy_template);
      }
    }

    $tpl->copy_template = preg_replace("#\[image-(.+?)\](.+?)\[/image-(.+?)\]#is", "", $tpl->copy_template);
    $tpl->copy_template = preg_replace("#\\{image-(.+?)\\}#i", "{THEME}/dleimages/no_image.jpg", $tpl->copy_template);
    $tpl->copy_template = preg_replace("#\[not-image-(.+?)\]#i", "", $tpl->copy_template);
    $tpl->copy_template = preg_replace("#\[/not-image-(.+?)\]#i", "", $tpl->copy_template);
  }
  $row['full_story'] = preg_replace("'\[metka=(.*?)\]'si", "<span id='per\\1'></span>", $row['full_story']);
  $row['full_story'] = preg_replace("'\[url_metka=(.*?)\](.*?)\[/url_metka\]'si", "<a href='#' class='urlmetka' data-url='\\1'>\\2</a>", $row['full_story']);


  $row['title'] = stripslashes($row['title']);
  $til = str_replace("&amp;amp;", "&amp;", htmlspecialchars($row['title'], ENT_QUOTES, $config['charset']));

  $titles = $til;

  $serc = preg_quote($array_words);
  //$til = preg_replace('/(ё|е)/ui','е',$til);
  $til = str_replace('Ё', 'Е', $til);
  $til = str_replace('ё', 'е', $til);


  if ($slovcheck == 'true') {
    $text = preg_replace("/($serc)/ui", "<span style='background:#EFFF00'><b>$1</b></span>", $til);
  } else {
    $text = Colortext($serc, $til); //preg_replace( "/($serc)/ui", "<span style='background:#EFFF00'><b>$1</b></span>", $til );
  }

  $tpl->set('{title}', $text);
  $tpl->set('{titles}', $titles);

  if (preg_match("#\\{title limit=['\"](.+?)['\"]\\}#i", $tpl->copy_template, $matches)) {
    $count = intval($matches[1]);
    $row['title'] = strip_tags($row['title']);

    if ($count and dle_strlen($row['title'], $config['charset']) > $count) {

      $row['title'] = dle_substr($row['title'], 0, $count, $config['charset']);

      if (($temp_dmax = dle_strrpos($row['title'], ' ', $config['charset']))) $row['title'] = dle_substr($row['title'], 0, $temp_dmax, $config['charset']);
    }

    $tpl->set($matches[0], str_replace("&amp;amp;", "&amp;", htmlspecialchars($row['title'], ENT_QUOTES, $config['charset'])));
  }

  if ($view_template == "rss") {

    $tpl->set('{rsslink}', $full_link);
    $tpl->set('{rssauthor}', $row['autor']);
    $tpl->set('{rssdate}', date("r", $row['date']));


    if ($row['allow_rss_turbo']) {
      $tpl->set('{allow-turbo}', "true");
      $tpl->set('[allow-turbo]', "");
      $tpl->set('[/allow-turbo]', "");
    } else {
      $tpl->set('{allow-turbo}', "false");
      $tpl->set_block("'\\[allow-turbo\\](.*?)\\[/allow-turbo\\]'si", "");
    }

    if ($row['allow_rss_dzen']) {
      $tpl->set('[allow-dzen]', "");
      $tpl->set('[/allow-dzen]', "");
    } else {
      $tpl->set_block("'\\[allow-dzen\\](.*?)\\[/allow-dzen\\]'si", "");
    }

    $row['full_story'] = stripslashes($row['full_story']);
    if (strlen($row['full_story']) < 13) $row['full_story'] = $row['full_story'];

    $row['full_story'] = preg_replace("'\[attachment=(.*?)\]'si", "", $row['full_story']);
    $row['full_story'] = preg_replace("#\[hide(.*?)\](.+?)\[/hide\]#is", "", $row['full_story']);
    $row['full_story'] = preg_replace("#<!--dle_spoiler(.+?)<!--spoiler_text-->#is", "", $row['full_story']);
    $row['full_story'] = preg_replace("#<!--spoiler_text_end-->(.+?)<!--/dle_spoiler-->#is", "", $row['full_story']);
    $row['full_story'] = str_ireplace("{short-story}", "&#123;short-story}", $row['full_story']);
    $row['full_story'] = str_ireplace("{full-story}", "&#123;full-story}", $row['full_story']);

    if ($config['rss_format'] != 1) {

      $row['full_story'] = preg_replace("#<!--(.+?)-->#is", "", $row['full_story']);

      $tpl->copy_template = preg_replace("#\<\!\[CDATA\[(.*?)\{short\-story\}(.*?)\]\]\>#i", "<![CDATA[\\1 " . preg_quote_replacement($row['full_story']) . " \\2]]>", $tpl->copy_template);

      $row['full_story'] = str_replace("><", "> <", $row['full_story']);
      $row['full_story'] = trim(htmlspecialchars(strip_tags(str_replace(array("<br>", "<br />"), " ", $row['full_story'])), ENT_QUOTES, $config['charset']));
      $row['full_story'] = preg_replace('/\s+/u', ' ', $row['full_story']);

      $tpl->set('{short-story}', $row['full_story']);
    } else {

      $row['full_story'] = preg_replace("#<!--(.+?)-->#is", "", $row['full_story']);

      $tpl->set('{short-story}', $row['full_story']);
    }

    if ($config['rss_format'] == 2) {

      $images = array();
      preg_match_all('/(img|src)=("|\')[^"\'>]+/i', $row['full_story'], $media);
      $data = preg_replace('/(img|src)("|\'|="|=\')(.*)/i', "$3", $media[0]);

      foreach ($data as $url) {
        $info = pathinfo($url);
        if (isset($info['extension'])) {
          if (
            $info['filename'] == "spoiler-plus"
            or $info['filename'] == "spoiler-minus"
            or strpos($info['dirname'], 'engine/data/emoticons') !== false
          ) continue;
          $info['extension'] = strtolower($info['extension']);
          if (($info['extension'] == 'jpg') || ($info['extension'] == 'jpeg') || ($info['extension'] == 'gif') || ($info['extension'] == 'png') || ($info['extension'] == 'webp')) {
            if ($info['extension'] == 'jpg') $info['extension'] = 'jpeg';
            array_push($images, "<enclosure url=\"{$url}\" type=\"image/{$info['extension']}\" />");
          }
        }
      }

      if (count($images)) {

        $tpl->set('{images}', "\n" . implode("\n", $images));
      } else {
        $tpl->set('{images}', '');
      }
    }

    $row['full_story'] = preg_replace("#<!--dle_spoiler(.+?)<!--spoiler_text-->#is", "", $row['full_story']);
    $row['full_story'] = preg_replace("#<!--spoiler_text_end-->(.+?)<!--/dle_spoiler-->#is", "", $row['full_story']);

    $row['full_story'] = preg_replace("#<!--(.+?)-->#is", "", $row['full_story']);
    $row['full_story'] = preg_replace("'\[attachment=(.*?)\]'si", "", $row['full_story']);
    $row['full_story'] = preg_replace("#\[hide(.*?)\](.+?)\[/hide\]#is", "", $row['full_story']);
    $row['full_story'] = str_ireplace("{short-story}", "&#123;short-story}", $row['full_story']);
    $row['full_story'] = str_ireplace("{full-story}", "&#123;full-story}", $row['full_story']);

    $tpl->copy_template = preg_replace("#\<\!\[CDATA\[(.*?)\{full\-story\}(.*?)\]\]\>#is", "<![CDATA[\\1 " . preg_quote_replacement($row['full_story']) . " \\2]]>", $tpl->copy_template);

    $row['full_story'] = str_replace("><", "> <", $row['full_story']);
    $row['full_story'] = trim(htmlspecialchars(strip_tags(str_replace(array("<br>", "<br />"), " ", $row['full_story'])), ENT_QUOTES, $config['charset']));
    $row['full_story'] = preg_replace('/\s+/u', ' ', $row['full_story']);

    $tpl->set('{full-story}', $row['full_story']);
  } else {

    if ($config['allow_links'] and function_exists('replace_links') and isset($replace_links['news'])) $row['full_story'] = replace_links($row['full_story'], $replace_links['news']);

    if ($smartphone_detected) {

      if (!$config['allow_smart_format']) {

        $row['full_story'] = strip_tags($row['full_story'], '<p><br><a>');
      } else {


        if (!$config['allow_smart_images']) {

          $row['full_story'] = preg_replace("#<!--TBegin(.+?)<!--TEnd-->#is", "", $row['full_story']);
          $row['full_story'] = preg_replace("#<!--MBegin(.+?)<!--MEnd-->#is", "", $row['full_story']);
          $row['full_story'] = preg_replace("#<img(.+?)>#is", "", $row['full_story']);
        }

        if (!$config['allow_smart_video']) {

          $row['full_story'] = preg_replace("#<!--dle_video_begin(.+?)<!--dle_video_end-->#is", "", $row['full_story']);
          $row['full_story'] = preg_replace("#<!--dle_audio_begin(.+?)<!--dle_audio_end-->#is", "", $row['full_story']);
          $row['full_story'] = preg_replace("#<!--dle_media_begin(.+?)<!--dle_media_end-->#is", "", $row['full_story']);
        }
      }
    }

    if ($config['image_lazy']) $row['full_story'] = preg_replace_callback("#<(img|iframe)(.+?)>#i", "enable_lazyload", $row['full_story']);

    if (!$proxod) {
      if ($row['id_news'] == '') {
        $prochit = '<br><div align="center" class="prochit"><span><a href="#" onClick="procitano(' . $row['id'] . ',this);return false;" id="st' . $row['id'] . '" class="button21"><img src="images\voskl.png"/><b>Не прочитано!</b></a></span></div><br>';
      } else {
        $prochit = '<br><div align="center" class="prochit"><span><a href="#" onClick="procitano(' . $row['id'] . ',this);return false;" id="st' . $row['id'] . '" class="button21"><img src="images\galka.png"/>Прочитано!</a></span></div><br>';
      }
    } else {
      $prochit = "";
    }
    $tpl->set('{short-story}', $row['full_story'] . $prochit);
  }


  if (preg_match("#\\{story limit=['\"](.+?)['\"]\\}#i", $tpl->copy_template, $matches)) {
    $count = intval($matches[1]);

    $row['full_story'] = preg_replace("'\[attachment=(.*?)\]'si", "", $row['full_story']);
    $row['full_story'] = preg_replace("#\[hide(.*?)\](.+?)\[/hide\]#is", "", $row['full_story']);
    $row['full_story'] = preg_replace("#<!--dle_spoiler(.+?)<!--spoiler_text-->#is", "", $row['full_story']);
    $row['full_story'] = preg_replace("#<!--spoiler_text_end-->(.+?)<!--/dle_spoiler-->#is", "", $row['full_story']);

    // $row[ 'full_story' ] = str_replace( "><", "> <", $row[ 'full_story' ] );
    $row['full_story'] = strip_tags($row['full_story'], "<br>");
    // $row[ 'full_story' ] = trim( str_replace( "<br>", " ", str_replace( "<br />", " ", str_replace( "\n", " ", str_replace( "\r", "", $row[ 'full_story' ] ) ) ) ) );
    $row['full_story'] = preg_replace('/\s+/u', ' ', $row['full_story']);

    if ($count and dle_strlen($row['full_story'], $config['charset']) > $count) {

      $row['full_story'] = dle_substr($row['full_story'], 0, $count, $config['charset']);

      if (($temp_dmax = dle_strrpos($row['full_story'], ' ', $config['charset']))) $row['full_story'] = dle_substr($row['full_story'], 0, $temp_dmax, $config['charset']);
    }

    $til = $row['full_story'];
    //$til = preg_replace('/(ё|е)/ui','е',$til);  
    $til = str_replace('Ё', 'Е', $til);
    $til = str_replace('ё', 'е', $til);

    $codec = mb_detect_encoding($til, "auto");

    if ($slovcheck == 'true') {
      if ($codec == 'UTF-8')
      $pos = mb_stripos($til, $array_words, 0, 'UTF-8');
      else
      $pos = stripos($til, $array_words, 0);
    } else {
      $searavi = array();
      $searavi = explode(' ', $array_words);
      $pos = mb_stripos($til, $searavi[0], 0, 'UTF-8');
    }
    //  $pos = strripos($til, $array_words);

    if ($pos > -1) {

      // $til = $row[ 'full_story' ];

      if ($pos - 200 <= 0) {
        $pos = 0;
      } else {
        $pos = $pos - 200;
      }

      if ($codec != 'UTF-8'){
      $til = iconv('UTF-8', 'windows-1251', $til);      
      $til = substr($til, $pos, 400);
      }else{
        $til = mb_substr($til, $pos, 400);
      }


      if ($codec != 'UTF-8')
      $til = iconv('windows-1251', 'UTF-8', $til);

      

      //  echo $til;

      $serc = preg_quote($array_words);
      //echo $til;

      if ($slovcheck == 'true') {
        $text = preg_replace("/($serc)/ui", "<span style='background:#EFFF00'><b>$1</b></span>", $til);
      } else {
        $text = Colortext($serc, $til);
      }

      //$text = $til;
      // $text = $text."+++" .$pos   ;

    } else {
      $text = "";
      $tpl->set_block("'\\[search-full\\](.*?)\\[/search-full\\]'si", "");
    }
    $tpl->set('[search-full]', "");
    $tpl->set('[/search-full]', "");
    $tpl->set($matches[0], $text);
  }
  $tpl->set('[search-full]', "");
  $tpl->set('[/search-full]', "");



  $tpl->compile('results');
}
if ($vivid and !$proxod and $appr) {
  $proxod = true;
  goto prot;
}

$tpl->load_template('ss.main.tpl');

if (!$tpl->result['results']) {

  $tpl->set('[not-results]', "");
  $tpl->set('[/not-results]', "");
  $tpl->set_block("'\\[results\\](.*?)\\[/results\\]'si", "");
} else {

  $tpl->set('[results]', "");
  $tpl->set('[/results]', "");
  $tpl->set_block("'\\[not-results\\](.*?)\\[/not-results\\]'si", "");
}

$tpl->set('{results}', $tpl->result['results']);
$tpl->set('{query}', $query);
$tpl->compile('main');
$tpl->clear();

@header("Content-type: text/css; charset=" . $config['charset']);

if ($config['files_allow']) if (strpos($tpl->result['main'], "[attachment=") !== false) {
  $tpl->result['main'] = show_attach($tpl->result['main'], $attachments);
}

//$tags = $db

$_SESSION['sernews_id'] = $news_id;

echo $tpl->result['main'];

// if ($_POST['tagcheck']=='true')
// $scriptag = "$('.tag_list').html(`$tagshtml`);";
// else
// $scriptag = '';
$dcript = '';
if ($_POST['command'] == 'esread') {
  $con = $db->super_query("SELECT COUNT(id) as c FROM " . PREFIX . "_post WHERE category regexp '[[:<:]](" . implode('|', $aviable) . ")[[:>:]]' and id in (SELECT post_id FROM dle_post_view WHERE user = '{$member_id['name']}') AND approve=1 and arhiv=0");
  $dcript = "$('#reades').text('{$con['c']}')";
}

echo "
<script>
$dcript
$('.urlmetka').unbind();
  $('.urlmetka').on('click',function(){
    //alert('per'+$(this).attr('data-url'));
    var destination = $(this).closest('.text').find('#per'+$(this).attr('data-url')).offset().top-60;
    jQuery('html, body').animate( { scrollTop: destination }, 1100 );
    return false;
  })
</script>
";
//<script src='templates/Default/js/rascras.js'></script> 