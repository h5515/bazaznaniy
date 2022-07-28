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
 File: addnews.php
-----------------------------------------------------
 Use: Add news
=====================================================
*/

if (!defined('DATALIFEENGINE')) {
  header("HTTP/1.1 403 Forbidden");
  header('Location: ../../');
  die("Hacking attempt!");
}

$allow_addnews = true;

include_once(DLEPlugins::Check(ENGINE_DIR . '/classes/parse.class.php'));
$parse = new ParseFilter();

$id = (isset($_REQUEST['id'])) ? intval($_REQUEST['id']) : 0;
$found = false;

if (isset($_COOKIE['dbname'])) {
  $prjlink = '&project=' . $_COOKIE['dbname'] . '&';
  $prjlink2 = '&project=' . $_COOKIE['dbname'];
} else {
  $prjlink = '';
  $prjlink2 = '';
}
if ($config['allow_alt_url']) $canonical = $config['http_home_url'] . "addnews.html";
else $canonical = $PHP_SELF . "?do=addnews" . $prjlink2;

/*if ( $id AND $is_logged AND $user_group[ $member_id[ 'user_group' ] ][ 'allow_adds' ] ) {
  $row = $db->super_query( "SELECT id, autor, category, tags FROM " . PREFIX . "_post WHERE id = '{$id}' AND approve = '0'" );
  if ( $id == $row[ 'id' ]AND( $member_id[ 'name' ] == $row[ 'autor' ]OR $user_group[ $member_id[ 'user_group' ] ][ 'allow_all_edit' ] ) )$found = true;
  else $found = false;
	echo '1';
}*/

$found = true;

if ($id and !$found) {
  $lang['add_err_9'] = $lang['add_err_10'];
  $allow_addnews = false;
}

/*if ( $config[ 'max_moderation' ]AND!$user_group[ $member_id[ 'user_group' ] ][ 'moderation' ]AND!$found ) {

  $stats_approve = $db->super_query( "SELECT COUNT(*) as count FROM " . PREFIX . "_post WHERE approve != '1'" );
  $stats_approve = $stats_approve[ 'count' ];

  if ( $stats_approve >= $config[ 'max_moderation' ] )$allow_addnews = false;

}*/

if ($is_logged and $config['news_restricted'] and (($_TIME - $member_id['reg_date']) < ($config['news_restricted'] * 86400))) {
  $lang['add_err_9'] = str_replace('{days}', intval($config['news_restricted']), $lang['news_info_7']);
  $allow_addnews = false;
}

if ($member_id['restricted'] and $member_id['restricted_days'] and $member_id['restricted_date'] < $_TIME) {

  $member_id['restricted'] = 0;
  $db->query("UPDATE LOW_PRIORITY " . USERPREFIX . "_users SET restricted='0', restricted_days='0', restricted_date='' WHERE user_id='{$member_id['user_id']}'");
}

if ($member_id['restricted'] == 1 or $member_id['restricted'] == 3) {

  if ($member_id['restricted_days']) {

    $lang['news_info_4'] = str_replace('{date}', langdate("j F Y H:i", $member_id['restricted_date']), $lang['news_info_4']);
    $lang['add_err_9'] = $lang['news_info_4'];
  } else {

    $lang['add_err_9'] = $lang['news_info_5'];
  }

  $allow_addnews = false;
}

if (!$allow_addnews) {

  msgbox($lang['all_info'], $lang['add_err_9'] . "<br /><br /><a href=\"#\" onClick=\"IzimodalClose('modalEdit');return false;\">$lang[all_close]</a>");
} else {
  if (
    isset($_REQUEST['mod']) and $_REQUEST['mod'] == "addnews"
    and $is_logged and $user_group[$member_id['user_group']]['allow_adds']
  ) {
    @header('X-XSS-Protection: 0;');

    $stop = "";

    if (
      $_REQUEST['user_hash'] == ""
      or $_REQUEST['user_hash'] != $dle_login_hash
    ) {
      $stop .= "<li>" . $lang['sess_error'] . "</li>";
    }

    $allow_comm = intval($_POST['allow_comm']);

    $approveest = $_POST['approveest'];

    if ($user_group[$member_id['user_group']]['allow_main']) $allow_main = intval($_POST['allow_main']);
    else $allow_main = 0;

    $allow_rss_dzen = 1;
    $allow_rss_turbo = 1;
    $disable_rss_dzen = 0;
    $disable_rss_turbo = 0;
    $approve = intval($_POST['approve']);
    $zaparch = $_POST['zaparch'];
    $allow_rating = intval($_POST['allow_rating']);

    if ($user_group[$member_id['user_group']]['allow_fixed']) $news_fixed = intval($_POST['news_fixed']);
    else $news_fixed = 0;

    if (!is_array($_POST['catlist'])) $_POST['catlist'] = array();

    if (!count($_POST['catlist'])) {

      $catlist = array();
      $catlist[] = '0';
    } else $catlist = $_POST['catlist'];

    $category_list = array();

    foreach ($catlist as $value) {
      $category_list[] = intval($value);
    }

    $catlist = $category_list;
    $category_list = $db->safesql(implode(',', $category_list));


    foreach ($catlist as $selected) {

      if ($cat_info[$selected]['disable_main']) $allow_main = 0;
      if ($cat_info[$selected]['disable_comments']) $allow_comm = 0;
      if ($cat_info[$selected]['disable_rating']) $allow_rating = 0;

      if ($member_id['user_group'] > 2) {
        if (!$cat_info[$selected]['enable_dzen']) $disable_rss_dzen++;
        if (!$cat_info[$selected]['enable_turbo']) $disable_rss_turbo++;
      }
    }

    if ($member_id['user_group'] > 2) {
      if ($disable_rss_dzen and $disable_rss_dzen = count($catlist)) $allow_rss_dzen = 0;
      if ($disable_rss_turbo and $disable_rss_turbo = count($catlist)) $allow_rss_turbo = 0;
    }

    if (!$config['allow_add_tags']) $_POST['tags'] = "";
    elseif (@preg_match("/[\||\<|\>]/", $_POST['tags'])) $_POST['tags'] = "";
    else $_POST['tags'] = @$db->safesql(htmlspecialchars(strip_tags(stripslashes(trim($_POST['tags']))), ENT_COMPAT, $config['charset']));

    if ($_POST['reason']) {
      $reason = $_POST['reason'];
    }

    if ($_POST['tags']) {


      $mty = str_replace(chr(38), "", $_POST['tags']);
      $mty = str_replace("quot;", "", $mty);
      $mty = str_replace('[', "", $mty);
      $mty = str_replace(']', "", $mty);
      $mty = str_replace('{value:', '', $mty);
      $mty = str_replace("}", "", $mty);

      $_POST['tags'] = $mty;

      $temp_array = array();
      $tags_array = array();
      $temp_array = explode(",", $_POST['tags']);


      /*  echo $_POST[ 'tags' ]."<br><br>-";
      
        exit;*/

      if (count($temp_array)) {

        foreach ($temp_array as $value) {
          if (trim($value)) $tags_array[] = trim($value);
        }
      }

      if (count($tags_array)) $_POST['tags'] = implode(", ", $tags_array);
      else $_POST['tags'] = "";
    }

    if (trim($_POST['vote_title'] != "")) {

      $add_vote = 1;
      $vote_title = $db->safesql(trim($parse->process(strip_tags($_POST['vote_title']))));
      $frage = $db->safesql(trim($parse->process(strip_tags($_POST['frage']))));
      $vote_body = $db->safesql($parse->BB_Parse($parse->process(strip_tags($_POST['vote_body'])), false));
      $allow_m_vote = intval($_POST['allow_m_vote']);
    } else $add_vote = 0;

    if (!$user_group[$member_id['user_group']]['moderation']) {
      $approve = 0;
      $allow_comm = 1;
      $allow_main = 1;
      $allow_rating = 1;
      $news_fixed = 0;
    }

    if ($approve) $msg = $lang['add_ok_1'];
    else $msg = $lang['add_ok_2'];

    if ($member_id['cat_add']) $allow_list = explode(',', $member_id['cat_add']);
    else $allow_list = explode(',', $user_group[$member_id['user_group']]['cat_add']);

    if ($user_group[$member_id['user_group']]['moderation']) {
      foreach ($catlist as $selected) {
        if (
          $allow_list[0] != "all"
          and !in_array($selected, $allow_list)
        ) {
          $approve = 0;
          $msg = $lang['add_ok_3'];
        }
      }
    }

    if ($member_id['cat_allow_addnews']) $allow_list = explode(',', $member_id['cat_allow_addnews']);
    else $allow_list = explode(',', $user_group[$member_id['user_group']]['cat_allow_addnews']);

    if ($allow_list[0] != "all") {
      foreach ($catlist as $selected) {
        if (!in_array($selected, $allow_list)) {
          $stop .= "<li>" . $lang['news_err_41'] . "</li>";
        }
      }
    }


    if (!$user_group[$member_id['user_group']]['allow_html']) {

      $config['allow_site_wysiwyg'] = 0;
      $_POST['short_story'] = strip_tags($_POST['short_story']);
      $_POST['full_story'] = strip_tags($_POST['full_story']);
    }

    if ($config['allow_site_wysiwyg']) {

      $parse->allow_code = false;
      $full_story = $db->safesql($parse->BB_Parse($parse->process($_POST['full_story'])));
      $short_story = $db->safesql($parse->BB_Parse($parse->process($_POST['short_story'])));
      $allow_br = 0;
    } else {

      $full_story = $db->safesql($parse->BB_Parse($parse->process($_POST['full_story']), false));
      $short_story = $db->safesql($parse->BB_Parse($parse->process($_POST['short_story']), false));
      $allow_br = 1;
    }


    if ($parse->not_allowed_text) {
      $stop .= "<li>" . $lang['news_err_39'] . "</li>";
    }

    $title = $db->safesql($parse->process(trim(strip_tags($_POST['title']))));
    $alt_name = trim($parse->process(stripslashes(strip_tags($_POST['alt_name']))));

    $add_module = "yes";
    $xfieldsaction = "init";
    $category = $catlist;
    $xf_existing = array();
    include(DLEPlugins::Check(ENGINE_DIR . '/inc/xfields.php'));

    if (
      $alt_name == ""
      or !$alt_name
    ) $alt_name = totranslit(stripslashes($title), true, false);
    else $alt_name = totranslit($alt_name, true, false);

    if (dle_strlen($alt_name, $config['charset']) > 190) {
      $alt_name = dle_substr($alt_name, 0, 190, $config['charset']);
    }

    $alt_name = $db->safesql($alt_name);

    if (!$title) $stop .= $lang['add_err_1'];
    if (dle_strlen($title, $config['charset']) > 200) $stop .= $lang['add_err_2'];

    if ($config['allow_alt_url'] and !$config['seo_type']) {

      $db->query("SELECT id, date FROM " . PREFIX . "_post WHERE alt_name ='{$alt_name}'");

      while ($found_news = $db->get_row()) {
        if ($found_news['id'] and date('Y-m-d', strtotime($found_news['date'])) == date('Y-m-d', $_TIME)) {
          $stop .= "<li>" . $lang['add_err_11'] . "</li>";
          break;
        }
      }
    }

    if ($config['create_catalog']) $catalog_url = $db->safesql(dle_substr(htmlspecialchars(strip_tags(stripslashes(trim($title))), ENT_QUOTES, $config['charset']), 0, 1, $config['charset']));
    else $catalog_url = "";

    if ($user_group[$member_id['user_group']]['disable_news_captcha'] and $member_id['news_num'] >= $user_group[$member_id['user_group']]['disable_news_captcha']) {

      $user_group[$member_id['user_group']]['news_question'] = false;
      $user_group[$member_id['user_group']]['news_sec_code'] = false;
    }

    if ($user_group[$member_id['user_group']]['news_sec_code']) {

      if ($config['allow_recaptcha']) {

        require_once(DLEPlugins::Check(ENGINE_DIR . '/classes/recaptcha.php'));
        $sec_code = 1;
        $sec_code_session = false;

        if ($_POST['g-recaptcha-response']) {

          $reCaptcha = new ReCaptcha($config['recaptcha_private_key']);

          $resp = $reCaptcha->verifyResponse(get_ip(), $_POST['g-recaptcha-response']);

          if ($resp === null or !$resp->success) {

            $stop .= "<li>" . $lang['recaptcha_fail'] . "</li>";
          }
        } else $stop .= "<li>" . $lang['recaptcha_fail'] . "</li>";
      } elseif ($_REQUEST['sec_code'] != $_SESSION['sec_code_session'] or !$_SESSION['sec_code_session']) $stop .= "<li>" . $lang['recaptcha_fail'] . "</li>";
    }

    if ($user_group[$member_id['user_group']]['news_question']) {

      if (intval($_SESSION['question'])) {

        $answer = $db->super_query("SELECT id, answer FROM " . PREFIX . "_question WHERE id='" . intval($_SESSION['question']) . "'");


        $answers = explode("\n", $answer['answer']);

        $pass_answer = false;

        if (function_exists('mb_strtolower')) {
          $question_answer = trim(mb_strtolower($_POST['question_answer'], $config['charset']));
        } else {
          $question_answer = trim(strtolower($_POST['question_answer']));
        }

        if (count($answers) and $question_answer) {
          foreach ($answers as $answer) {

            if (function_exists('mb_strtolower')) {
              $answer = trim(mb_strtolower($answer, $config['charset']));
            } else {
              $answer = trim(strtolower($answer));
            }

            if ($answer and $answer == $question_answer) {
              $pass_answer = true;
              break;
            }
          }
        }

        if (!$pass_answer) $stop .= $lang['reg_err_24'];
      } else $stop .= $lang['reg_err_24'];
    }

    if ($user_group[$member_id['user_group']]['flood_news']) {
      if (flooder($member_id['name'], $user_group[$member_id['user_group']]['flood_news'])) {
        $stop .= "<li>" . $lang['news_err_4'] . " " . $lang['news_err_43'] . " {$user_group[$member_id['user_group']]['flood_news']} " . $lang['news_err_6'] . "</li>";
      }
    }

    $max_detected = false;
    if ($user_group[$member_id['user_group']]['max_day_news'] and !$found) {
      $row = $db->super_query("SELECT COUNT(*) as count FROM " . PREFIX . "_post WHERE date >= '" . date("Y-m-d", $_TIME) . "' AND date < '" . date("Y-m-d", $_TIME) . "' + INTERVAL 24 HOUR AND autor = '{$member_id['name']}'");
      if ($row['count'] >= $user_group[$member_id['user_group']]['max_day_news']) {
        $stop .= "<li>" . $lang['news_err_44'] . "</li>";
        $max_detected = true;
      }
    }

    if ($stop) {
      $stop = "<ul>" . $stop . "</ul><a href=\"javascript:history.go(-1)\">$lang[all_prev]</a>";
      msgbox($lang['add_err_6'], $stop);
    }

    if (!$stop) {

      $_SESSION['sec_code_session'] = 0;
      $_SESSION['question'] = false;

      if ($found) {

        $vse = $user_group[$member_id['user_group']]['moderation'];

        $tabl = PREFIX . "_post";
        $prox = false;
        if (!$vse) {
          if ($_GET['vivid'] == "ok") {
            $arc = true;
          } else $arc = false;

          $added_time = time();
          $thistime = date("Y-m-d H:i:s", $added_time);
          $db2 = new db;
          if (!$arc) {
            $count = $db2->super_query("SELECT COUNT(id) as c, approve, fixed, allow_comm, allow_main, autor, tags FROM dle_post WHERE id = '{$id}' ");
            if ($count['c'] > 0 && $count['autor'] == $member_id['name'] && $count['approve'] == '0')
              $mystat = true;

            $added_time = time();
          }
          if (!$mystat) {
            $count = $db2->super_query("SELECT COUNT(id) as c, id, approve, fixed, allow_comm, allow_main, autor, tags FROM dle_post_arhiv WHERE ids = '{$id}' ");
            $gid = $count['id'];
            if ($count['c'] > 0 && $count['autor'] == $member_id['name'] && $count['approve'] == '0') {
              $estst = true;
              $mystat = true;
              $prox = true;
              $tabl = PREFIX . "_post_arhiv";
              $sql = "UPDATE $tabl set title='$title', short_story='$short_story', full_story='$full_story', xfields='$filecontents', category='$category_list', alt_name='$alt_name', allow_comm='$allow_comm', short_story = '$reason', approve='$approve', allow_main='$allow_main', fixed='$news_fixed', allow_br='$allow_br', tags='" . $_POST['tags'] . "', edate = '$added_time' WHERE ids='{$id}'";
            } else {
              $estst = true;
              $prox = true;
              //if ($gid=="")$gid = $_GET['id'];	
              $gid = $_GET['id'];
              $sql = "INSERT INTO " . PREFIX . "_post_arhiv (id, date, autor, short_story, full_story, xfields, title, keywords, category, alt_name, allow_comm, approve, allow_main, fixed, allow_br, symbol, tags, edate) values ('{$gid}','$thistime', '{$member_id['name']}', '$reason', '$full_story', '$filecontents', '$title', '', '$category_list', '$alt_name', '$allow_comm', '0', '$allow_main', '$news_fixed', '$allow_br', '$catalog_url', '" . $_POST['tags'] . "', '$added_time')";
            }
          }
        }



        if (!$prox) {

          if ($_POST['autor12'] != "") {
            $mtr = str_replace(chr(38), "", $_POST['autor12']);
            $mtr = str_replace("quot;", "", $mtr);
            $mtr = str_replace("\"", "", $mtr);
            $mtr = str_replace('[', "", $mtr);
            $mtr = str_replace(']', "", $mtr);
            $mtr = str_replace('{value:', '', $mtr);
            $mtr = str_replace("}", "", $mtr);
            $tags_array = array();
            $temp_array = explode(",", $mtr);

            $atr = "autor = '{$temp_array[0]}', ";
          } else {
            $atr = "";
          }

          $idsviv = 'id';
          if ($vse) {
            if ($_GET['vivid'] == "ok" and !$approve) {
              $tabl = PREFIX . "_post_arhiv";
              $idsviv = 'ids';
              $short_story = $reason;
            }
            if ($_GET['vivid'] == "ok" and $approve) {
              $db2 = new db;
              $count = $db2->super_query("SELECT id, title, full_story, category, date, autor, tags, alt_name FROM dle_post WHERE id = (SELECT id FROM dle_post_arhiv WHERE ids = {$id}) ");
              $vid = $count['id'];
              $vtitle = $count['title'];
              $vfull_story = $count['full_story'];
              $vcategory = $count['category'];
              $vdate = $count['date'];
              $vautor = $count['autor'];
              $vtags = $count['tags'];
              $valt_name = $count['alt_name'];
              $zamen = true;
              $idv = $id;
              $id = $vid;

              $sqlv = "UPDATE dle_post_arhiv set autor='$vautor', date='$vdate', title='$vtitle', full_story='$vfull_story', category='$vcategory', alt_name='$valt_name', approve='1',  tags='$vtags' WHERE ids='{$idv}'";

              $count = $db2->super_query("SELECT autor, date, edate, short_story FROM dle_post_arhiv WHERE ids = {$idv}");
              if ($temp_array[0] != $count['autor'])
                $temp_array[0] = $count['autor'];

              $vdates = "date = '{$count['date']}',";
              $vdateses = $count['edate'];
              $reason = $count['short_story'];
            } else if ($approve and $approveest == 'ok') {
              $db2 = new db;
              $count = $db2->super_query("SELECT id, title, full_story, category, date, autor, tags, alt_name FROM dle_post WHERE id = {$id}");
              $vid = $count['id'];
              $vtitle = $count['title'];
              $vfull_story = $count['full_story'];
              $vcategory = $count['category'];
              $vdate = $count['date'];
              $vautor = $count['autor'];
              $vtags = $count['tags'];
              $valt_name = $count['alt_name'];
              $zamen = true;
              $idv = $id;
              $id = $vid;

              $sqlv = "INSERT INTO dle_post_arhiv (id, autor, date, title, full_story, category, alt_name, approve, tags) VALUES ('$id','$vautor','$vdate', '$vtitle','$vfull_story','$vcategory','$valt_name', '1', '$vtags')";

              $added_time = time();
              $thistime = date("Y-m-d H:i:s", $added_time);
              $vdates = "date = '{$thistime}',";
            }
          }
          //$vdates
          $sql = "UPDATE $tabl set $atr title='$title', $vdates short_story='$short_story', full_story='$full_story', xfields='$filecontents', category='$category_list', alt_name='$alt_name', allow_comm='$allow_comm', approve='$approve', allow_main='$allow_main', fixed='$news_fixed', allow_br='$allow_br', tags='" . $_POST['tags'] . "' WHERE $idsviv='{$id}'";
        }
        $db->query("DELETE FROM dle_draft WHERE id={$id} and user='{$member_id['name']}'");
        $db->query($sql);

        if ($zamen)
          $db->query($sqlv);

        if (!$estst) {
          if ($reason != "") $view_edit = 1;
          else $view_edit = 0;
          $added_time = time();

          if ($vse and $_GET['vivid'] != "ok") {
            $db2 = new db;
            $count = $db2->super_query("SELECT reason, editor, editdate FROM dle_post_extras WHERE news_id = {$id}");
            if ($reason != $count['reason']) {
              $autoredit = $member_id['name'];
              $vdateses = $added_time;
            } else {
              $autoredit = $count['editor'];
              $vdateses = $count['editdate'];
            }
          } else {
            $autoredit = $temp_array[0];
            if ($autoredit == "") $autoredit = $member_id['name'];

            if ($vdateses == "") $vdateses = $added_time;
          }

          $db->query("UPDATE " . PREFIX . "_post_extras SET allow_rate='{$allow_rating}', votes='{$add_vote}', reason='{$reason}', editor='{$autoredit}', view_edit='{$view_edit}', editdate='{$vdateses}' WHERE news_id='{$id}'");


          if ($_POST['tags'] != $row['tags'] or $approve) {
            $db->query("DELETE FROM " . PREFIX . "_tags WHERE news_id = '$id'");

            if (
              $_POST['tags'] != ""
              and $approve
            ) {

              $tags = array();

              $_POST['tags'] = explode(",", $_POST['tags']);

              $catidsarr = explode(",", $category_list);


              foreach ($_POST['tags'] as $value) {

                $tags[] = "('" . $id . "', '" . trim($value) . "', '" . $category_list . "')";
              }

              $tags = implode(", ", $tags);
              $db->query("INSERT INTO " . PREFIX . "_tags (news_id, tag, category) VALUES " . $tags);
            }
          }
          $db->query("DELETE FROM " . PREFIX . "_post_extras_cats WHERE news_id = '{$id}'");
          if ($category_list != $row['category'] or $approve) {
            // $db->query( "DELETE FROM " . PREFIX . "_post_extras_cats WHERE news_id = '{$id}'" );

            if ($category_list and $approve) {

              $cat_ids = array();

              $cat_ids_arr = explode(",", $category_list);

              foreach ($cat_ids_arr as $value) {

                $cat_ids[] = "('" . $id . "', '" . trim($value) . "')";
              }

              $cat_ids = implode(", ", $cat_ids);
              $db->query("INSERT INTO " . PREFIX . "_post_extras_cats (news_id, cat_id) VALUES " . $cat_ids);
            }
          }

          $db->query("DELETE FROM " . PREFIX . "_xfsearch WHERE news_id = '{$id}'");

          if (count($xf_search_words) and $approve) {

            $temp_array = array();

            foreach ($xf_search_words as $value) {

              $temp_array[] = "('" . $id . "', '" . $value[0] . "', '" . $value[1] . "')";
            }

            $xf_search_words = implode(", ", $temp_array);
            $db->query("INSERT INTO " . PREFIX . "_xfsearch (news_id, tagname, tagvalue) VALUES " . $xf_search_words);
          }


          if ($add_vote) {

            $count = $db->super_query("SELECT COUNT(*) as count FROM " . PREFIX . "_poll WHERE news_id = '{$id}'");

            if ($count['count']) $db->query("UPDATE  " . PREFIX . "_poll set title='$vote_title', frage='$frage', body='$vote_body', multiple='$allow_m_vote' WHERE news_id = '{$row['id']}'");
            else $db->query("INSERT INTO " . PREFIX . "_poll (news_id, title, frage, body, votes, multiple, answer) VALUES('{$id}', '$vote_title', '$frage', '$vote_body', 0, '$allow_m_vote', '')");
          } else {
            $db->query("DELETE FROM " . PREFIX . "_poll WHERE news_id='{$row['id']}'");
            $db->query("DELETE FROM " . PREFIX . "_poll_log WHERE news_id='{$row['id']}'");
          }
        }
        clear_all_caches();
      } else {

        if ($max_detected) die("Hacking attempt!");
        $added_time = time();
        $thistime = date("Y-m-d H:i:s", $added_time);


        if ($_POST['autor12'] != "") {
          $mtr = str_replace(chr(38), "", $_POST['autor12']);
          $mtr = str_replace("quot;", "", $mtr);
          $mtr = str_replace("\"", "", $mtr);
          $mtr = str_replace('[', "", $mtr);
          $mtr = str_replace(']', "", $mtr);
          $mtr = str_replace('{value:', '', $mtr);
          $mtr = str_replace("}", "", $mtr);
          $tags_array = array();
          $temp_array = explode(",", $mtr);

          $atr = $temp_array[0];
        } else {
          $atr = $member_id['name'];
        }

        $db->query("DELETE FROM dle_draft WHERE id=0 and user='{$atr}'");
        $db->query("INSERT INTO " . PREFIX . "_post (date, autor, short_story, full_story, xfields, title, keywords, category, alt_name, allow_comm, approve, allow_main, fixed, allow_br, symbol, tags) values ('$thistime', '$atr', '$short_story', '$full_story', '$filecontents', '$title', '', '$category_list', '$alt_name', '$allow_comm', '$approve', '$allow_main', '$news_fixed', '$allow_br', '$catalog_url', '" . $_POST['tags'] . "')");

        $row['id'] = $db->insert_id();

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // ???????? ?? ????? ???? ????????????
        /*		  if ($approve==1){
        			$ids = $row[ 'id' ] ;
                include ENGINE_DIR . '/modules/sentbz.php';
        		  }*/

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        $db->query("INSERT INTO " . PREFIX . "_post_extras (news_id, allow_rate, votes, user_id, allow_rss, allow_rss_turbo, allow_rss_dzen) VALUES('{$row['id']}', '{$allow_rating}', '{$add_vote}','{$member_id['user_id']}', '1', '{$allow_rss_turbo}', '{$allow_rss_dzen}')");


        if ($approve) {

          // $db->query( "INSERT INTO " . USERPREFIX . "_admin_logs (name, date, ip, action, extras) values ('" . $db->safesql( $member_id[ 'name' ] ) . "', '{$_TIME}', '{$_IP}', '1', '{$title}')" );

        }

        if ($add_vote) {
          $db->query("INSERT INTO " . PREFIX . "_poll (news_id, title, frage, body, votes, multiple, answer) VALUES('{$row['id']}', '{$vote_title}', '{$frage}', '{$vote_body}', 0, '{$allow_m_vote}', '')");
        }


        $member_id['name'] = $db->safesql($member_id['name']);

        $db->query("UPDATE " . PREFIX . "_images set news_id='{$row['id']}' where author = '{$member_id['name']}' AND news_id = '0'");
        $db->query("UPDATE " . PREFIX . "_files set news_id='{$row['id']}' where author = '{$member_id['name']}' AND news_id = '0'");
        //$db->query("UPDATE " . USERPREFIX . "_users set news_num=news_num+1 where user_id='{$member_id['user_id']}'");

        if ($user_group[$member_id['user_group']]['flood_news']) {
          $db->query("INSERT INTO " . PREFIX . "_flood (id, ip, flag) values ('$_TIME', '{$member_id['name']}', '1')");
        }


        if (
          $_POST['tags'] != ""
          and $approve
        ) {

          $tags = array();

          $_POST['tags'] = explode(",", $_POST['tags']); //$category_id


          $catidsarr = explode(",", $category_list);

          foreach ($_POST['tags'] as $value) {

            $tags[] = "('" . $row['id'] . "', '" . trim($value) . "', '" . trim($catidsarr[0]) . "')";
          }

          $tags = implode(", ", $tags);
          $db->query("INSERT INTO " . PREFIX . "_tags (news_id, tag, category) VALUES " . $tags);
        }

        if ($category_list and $approve) {

          $cat_ids = array();

          $cat_ids_arr = explode(",", $category_list);

          foreach ($cat_ids_arr as $value) {

            $cat_ids[] = "('" . $row['id'] . "', '" . trim($value) . "')";
          }

          $cat_ids = implode(", ", $cat_ids);
          $db->query("INSERT INTO " . PREFIX . "_post_extras_cats (news_id, cat_id) VALUES " . $cat_ids);
        }

        if (count($xf_search_words) and $approve) {

          $temp_array = array();

          foreach ($xf_search_words as $value) {

            $temp_array[] = "('" . $row['id'] . "', '" . $value[0] . "', '" . $value[1] . "')";
          }

          $xf_search_words = implode(", ", $temp_array);
          $db->query("INSERT INTO " . PREFIX . "_xfsearch (news_id, tagname, tagvalue) VALUES " . $xf_search_words);
        }

        if (!$approve and $config['mail_news']) {

          include_once(DLEPlugins::Check(ENGINE_DIR . '/classes/mail.class.php'));

          $row = $db->super_query("SELECT * FROM " . PREFIX . "_email WHERE name='new_news' LIMIT 0,1");
          $mail = new dle_mail($config, $row['use_html']);

          $row['template'] = stripslashes($row['template']);
          $row['template'] = str_replace("{%username%}", $member_id['name'], $row['template']);
          $row['template'] = str_replace("{%date%}", langdate("j F Y H:i", $added_time, true), $row['template']);
          $row['template'] = str_replace("{%title%}", stripslashes(stripslashes($title)), $row['template']);

          $category_list = explode(",", $category_list);
          $my_cat = array();

          foreach ($category_list as $element) {

            $my_cat[] = $cat_info[$element]['name'];
          }

          $my_cat = stripslashes(implode(', ', $my_cat));

          $row['template'] = str_replace("{%category%}", $my_cat, $row['template']);

          $mail->send($config['admin_mail'], $lang['mail_news'], $row['template']);
        }
      }

      $categories_default = "";

      if (isset($_POST['categories_default'])) {

        $temp_array = explode(',', $_POST['categories_default']);
        $categories_default = array();

        foreach ($temp_array as $element) {
          $element = intval(trim($element));

          if ($element > 0) {
            $categories_default[] = $element;
          }
        }

        if (count($categories_default)) $categories_default = htmlspecialchars(implode(',', $categories_default), ENT_QUOTES, $config['charset']);
        else $categories_default = "";
      }

      if ($categories_default) {
        if (isset($_COOKIE['dbname'])) {
          $prjlink = 'project=' . $_COOKIE['dbname'] . '&';
          $prjlink2 = '&project=' . $_COOKIE['dbname'];
        } else {
          $prjlink = '';
          $prjlink2 = '';
        }
        $add_url = "<a href=\"{$PHP_SELF}?do=addnews&amp;{$prjlink}category={$categories_default}\">{$lang['add_noch']}</a>";
      } elseif ($config['allow_alt_url']) {
        $add_url = "<a href=\"{$config['http_home_url']}addnews.html\">{$lang['add_noch']}</a>";
      } else $add_url = "<a href=\"{$PHP_SELF}?do=addnews{$prjlink2}\">{$lang['add_noch']}</a>";

      if ($approve == '1') {
        $app = "app";
      } else $app = "";

      //  echo '111';
      //$ids = $row['id'];
      if ($vse or $estst) {
        $user_id = $member_id['name'];
        $db->query("DELETE FROM " . PREFIX . "_post_read WHERE id_news = '{$id}'");
        $db->query("INSERT INTO " . PREFIX . "_post_read (id_news, user) VALUES ('" . $id . "','" . $user_id . "')");
      }

      if ($vse)
        msgbox($lang['add_mok'], $lang['add_ok_m2'] . "<br><script>oks=true; showalert('" . $lang['add_mok'] . "','" . $lang['add_ok_m2'] . "','" . $id . "','" . $app . "');</script><a href=\"#\" onclick=\"IzimodalClose('modalEdit')\">" . $lang['all_close'] . "</a>");
      else
        msgbox($lang['add_mok'], $lang['add_ok_m1'] . "<br><script>oks=true; showalert('" . $lang['add_mok'] . "','" . $lang['add_ok_m1'] . "','" . $id . "');</script><a href=\"#\" onclick=\"IzimodalClose('modalEdit')\">" . $lang['all_close'] . "</a>");

      //  if ( $approve ) {

      clear_cache(array('news_', 'related_', 'tagscloud_', 'archives_', 'topnews_', 'rss', 'stats'));
      foreach ($catlist as $selected) {
        clear_cache(array('calendar' . $selected . '_', 'archives' . $selected . '_'));
      }
      //}

    }
  } elseif ($is_logged and $user_group[$member_id['user_group']]['allow_adds']) {

    $js_array[] = "engine/classes/js/sortable.js";
    $js_array[] = "engine/classes/uploads/html5/fileuploader.js";
    $js_array[] = "engine/classes/calendar/calendar.js";

    $css_array[] = "engine/classes/calendar/calendar.css";

    $tpl->load_template('addnews.tpl');

    $addtype = "addnews";
    $categories_default = "";

    if (!$user_group[$member_id['user_group']]['allow_html']) {

      $config['allow_site_wysiwyg'] = 0;
    }

    if ($found) {

      if (!$_GET['vivid'] == "ok") {
        $tabl = "_post";
        $rid = 'id';
      } else {
        $tabl = "_post_arhiv";
        $rid = 'ids';
      }

      $row = $db->super_query("SELECT * FROM " . PREFIX . $tabl . " LEFT JOIN " . PREFIX . "_post_extras ON (" . PREFIX . $tabl . ".id=" . PREFIX . "_post_extras.news_id) WHERE {$rid} = '{$id}' "); //( $member_id[ 'name' ] == $row[ 'autor' ]OR  AND $user_group[ $member_id[ 'user_group' ] ][ 'allow_all_edit' ]
      /* if ( $id == $row[ 'id' ] )$found = true;
       else $found = false;*/
      $found = true;
    } else {
      $row = array();
    }
    $myautr = $row['autor'];
    if ($found) {
      $fixed = $row['fixed'];
      $approve = $row['approve'];

      $cat_list = explode(',', $row['category']);
      $categories_list = CategoryNewsSelection($cat_list, 0);
      $tpl->set('{title}', $parse->decodeBBCodes($row['title'], false));
      $tpl->set('{alt-name}', $row['alt_name']);

      if ($_GET['vivid'] != "ok")
        $reas =  $parse->decodeBBCodes($row['reason'], false);
      else
        $reas =  $parse->decodeBBCodes($row['short_story'], false);

      $tpl->set('{reason}', $reas);

      if ($config['allow_site_wysiwyg'] or $row['allow_br'] != '1') {
        $row['short_story'] = $parse->decodeBBCodes($row['short_story'], TRUE, $config['allow_site_wysiwyg']);
        $row['full_story'] = $parse->decodeBBCodes($row['full_story'], TRUE, $config['allow_site_wysiwyg']);
      } else {
        $row['short_story'] = $parse->decodeBBCodes($row['short_story'], false);
        $row['full_story'] = $parse->decodeBBCodes($row['full_story'], false);
      }

      $aviable = array();
      foreach ($cat_info as $cats) {
        $aviable[] =  $cats['id'];
        //if( $cats['parentid'] == $parentid ) $root_category[] = $cats['id'];
      }
      $cstsql = "WHERE category regexp '[[:<:]](" . implode('|', $aviable) . ")[[:>:]]'";

      $sql = 'SELECT DISTINCT tag  FROM dle_tags ' . $cstsql . ' ORDER BY tag';
      $result = $db->query($sql);
      if (!empty($result)) {
        while ($row2 = $db->get_row($result)) {
          $itags = $itags . '"' . $row2['tag'] . '",';
        }
        $itags = substr($itags, 0, -1);
      }

      $sql = 'SELECT fullname FROM dle_users ORDER BY fullname';
      $result2 = $db_gl->query($sql);
      if (!empty($result2)) {
        while ($row2 = $db->get_row($result2)) {
          $autr = $autr . '"' . $row2['fullname'] . '",';
        }
        $autr = substr($autr, 0, -1);
      }
      $tpl->set('{autorinput}', $autr);
      $tpl->set('{short-story}', $row['short_story']);
      $tpl->set('{full-story}', $row['full_story']);
      $tpl->set('{tags}', $row['tags']);
      $tpl->set('{tagsinput}', $itags);
      $tpl->set('{ids}', $id);
      if ($_GET['vivid'] == 'ok')
        $tpl->set('{vivid}', ",'1'");
      else
        $tpl->set('{vivid}', "");


      if ($row['votes']) {
        $poll = $db->super_query("SELECT * FROM " . PREFIX . "_poll where news_id = '{$row['id']}'");
        $poll['title'] = $parse->decodeBBCodes($poll['title'], false);
        $poll['frage'] = $parse->decodeBBCodes($poll['frage'], false);
        $poll['body'] = $parse->decodeBBCodes($poll['body'], false);
        $poll['multiple'] = $poll['multiple'] ? "checked" : "";

        $tpl->set('{votetitle}', $poll['title']);
        $tpl->set('{frage}', $poll['frage']);
        $tpl->set('{votebody}', $poll['body']);
        $tpl->set('{allowmvote}', $poll['multiple']);
      } else {
        $tpl->set('{votetitle}', '');
        $tpl->set('{frage}', '');
        $tpl->set('{votebody}', '');
        $tpl->set('{allowmvote}', '');
      }
    } else {

      if (isset($_GET['category'])) {

        $categories_list = CategoryNewsSelection(explode(',', $_GET['category']), 0);
        $temp_array = explode(',', $_GET['category']);
        $categories_default = array();

        foreach ($temp_array as $element) {
          $element = intval(trim($element));

          if ($element > 0) {
            $categories_default[] = $element;
          }
        }

        if (count($categories_default)) $categories_default = htmlspecialchars(implode(',', $categories_default), ENT_QUOTES, $config['charset']);
        else $categories_default = "";
      } else $categories_list = CategoryNewsSelection(0, 0);

      $tpl->set('{title}', '');
      $tpl->set('{alt-name}', '');
      $tpl->set('{short-story}', '');
      $tpl->set('{full-story}', '');
      $tpl->set('{tags}', '');
      $tpl->set('{votetitle}', '');
      $tpl->set('{frage}', '');
      $tpl->set('{votebody}', '');
      $tpl->set('{allowmvote}', '');
    }

    if ($config['allow_site_wysiwyg']) {

      include_once(DLEPlugins::Check(ENGINE_DIR . '/editor/shortsite.php'));
      include_once(DLEPlugins::Check(ENGINE_DIR . '/editor/fullsite.php'));
      $bb_code = "";
    } else {
      $bb_editor = true;
      include_once(DLEPlugins::Check(ENGINE_DIR . '/modules/bbcode.php'));
    }

    if (!$config['allow_site_wysiwyg']) {

      $tpl->set('[not-wysywyg]', '');
      $tpl->set('[/not-wysywyg]', '');
    } else $tpl->set_block("'\\[not-wysywyg\\].*?\\[/not-wysywyg\\]'si", '');

    if ($config['allow_site_wysiwyg']) {

      $tpl->set('{shortarea}', $shortarea);
      $tpl->set('{fullarea}', $fullarea);
    } else {
      $tpl->set('{shortarea}', '');
      $tpl->set('{fullarea}', '');
    }

    $xfieldsaction = "categoryfilter";
    include_once(DLEPlugins::Check(ENGINE_DIR . '/inc/xfields.php'));

    if ($config['allow_multi_category']) {

      $cats = "<select id=\"idselectcat\" data-placeholder=\"{$lang['addnews_cat_sel']}\" name=\"catlist[]\" id=\"category\" onchange=\"onCategoryChange(this)\" style=\"width:350px;height:110px;\" multiple=\"multiple\" class=\"hide\">";
    } else {

      $cats = "<select id=\"idselectcat\" data-placeholder=\"{$lang['addnews_cat_sel']}\" name=\"catlist[]\" id=\"category\" onchange=\"onCategoryChange(this)\" style=\"width:350px;\" class=\"hide\">";
    }

    $cats .= $categories_list;
    $cats .= "</select>";

    $tpl->set('{bbcode}', $bb_code);
    $tpl->set('{category}', $cats);

    if ($user_group[$member_id['user_group']]['moderation']) {

      if ($_GET['vivid'] == 'ok') {
        $sqls = "SELECT autor FROM dle_post WHERE id = (SELECT id FROM dle_post_arhiv WHERE ids = {$_GET['id']}) ";
        $results = $db->query($sqls);
        while ($row3 = $db->get_row($results)) {
          if ($row3['autor'] != $myautr) {
            $polautor = $row3['autor'];
            $glautor = $polautor;
            $estrez = true;
          }
        }
        if (isset($polautor))
          $polautor = $db_gl->super_query("SELECT fullname FROM dle_users WHERE name = '$polautor'")['fullname'];

          if (isset($myautr))
          $myautr = $db_gl->super_query("SELECT fullname FROM dle_users WHERE name = '$myautr'")['fullname'];

          if (isset($glautor))
          $glautor = $db_gl->super_query("SELECT fullname FROM dle_users WHERE name = '$glautor'")['fullname'];

        if ($estrez) {
          $polautor = " главной статьи:<a href='#' onClick = 'smenautor(\"{$glautor}\");return false;'><b> {$polautor} </b></a>изменить на автора отредактировавшего статью: <a href='#' onClick = 'smenautor(\"{$myautr}\");return false;'>{$myautr}</a>";
          $myautr = $glautor;
        } else $polautor = "";
      } else $polautor = "";

     

      $autr =  '<label for="alt_name"  class="imp">Автор' . $polautor . '</label>
					<input placeholder="" type="text" name="autor12" id="autor12" value="' . $myautr . '" maxlength="150" autocomplete="off"  class="wide" minlength="1" required> ';




      $tpl->set('{autor}', $autr);
    } else $tpl->set('{autor}', '');
    // echo "Moderator".$user_group[ $member_id[ 'user_group' ] ][ 'moderation' ];
    // echo "allow_all_edit".$user_group[$member_id['user_group']]['allow_all_edit'];
    if ($user_group[$member_id['user_group']]['moderation']) {

      if ($approve == '1') {
        $admintag = "<div class=\"checkbox\"><label><input type=\"checkbox\" name=\"approve\" id=\"approve\" value=\"1\" checked=\"checked\" />{$lang['add_al_ap']}</label></div>";
        $admintag .= '<input type="hidden" name="approveest" value="ok">';
      } else {
        $admintag = "<div class=\"checkbox\"><label><input type=\"checkbox\" name=\"approve\" id=\"approve\" value=\"1\" />{$lang['add_al_ap']}</label></div>";
      }

      $admintag .= "<div id=\"opt_holder_comments\" class=\"checkbox\"><label><input type=\"checkbox\" name=\"allow_comm\" value=\"1\" checked=\"checked\" />" . $lang['add_al_com'] . "</label></div>";

      if ($user_group[$member_id['user_group']]['allow_main']) $admintag .= "<div id=\"opt_holder_main\" class=\"checkbox\"><label><input type=\"checkbox\" name=\"allow_main\" id=\"allow_main\" value=\"1\" checked=\"checked\" />" . $lang['add_al_m'] . "</label></div>";

      $admintag .= "<div id=\"opt_holder_rating\" class=\"checkbox\"><label><input type=\"checkbox\" name=\"allow_rating\" id=\"allow_rating\" value=\"1\" checked=\"checked\" />{$lang['addnews_allow_rate']}</label></div>";


      if ($fixed == '0') {
        if ($user_group[$member_id['user_group']]['allow_fixed']) $admintag .= "<div class=\"checkbox\"><label><input type=\"checkbox\" name=\"news_fixed\" id=\"news_fixed\" value=\"1\"/>{$lang['add_al_fix']}</label></div>";
      } else {
        if ($user_group[$member_id['user_group']]['allow_fixed']) $admintag .= "<div class=\"checkbox\"><label><input type=\"checkbox\" name=\"news_fixed\" id=\"news_fixed\" value=\"1\" checked=\"checked\" />{$lang['add_al_fix']}</label></div>";
      }

      $tpl->set('{admintag}', $admintag);
    } else $tpl->set('{admintag}', '');


    if ($is_logged and $member_id['user_group'] < 3) {

      $tpl->set('[urltag]', '');
      $tpl->set('[/urltag]', '');
    } else
      $tpl->set_block("'\\[urltag\\].*?\\[/urltag\\]'si", "");

    $tpl->set('[editor]', '');
    $tpl->set('[/editor]', '');
    $tpl->set_block("'\\[not-editor\\].*?\\[/not-editor\\]'si", "");

    if (!$config['allow_add_tags']){
      $tpl->set_block("'\\[allow_tags\\].*?\\[/allow_tags\\]'si", "");
    }else{
      $tpl->set('[allow_tags]', '');
      $tpl->set('[/allow_tags]', '');
    }

    if ($found) {

      $xfieldsaction = "list";
      $xfieldmode = "site";
      $xfieldsid = $row['xfields'];
      $xfieldscat = $row['category'];
      $author = urlencode($row['autor']);
      $news_id = $row['id'];
      include(DLEPlugins::Check(ENGINE_DIR . '/inc/xfields.php'));
    } else {

      $xfieldsaction = "list";
      $xfieldmode = "site";
      $xfieldsadd = true;
      $news_id = 0;
      $author = urlencode($member_id['name']);
      include(DLEPlugins::Check(ENGINE_DIR . '/inc/xfields.php'));
    }

    if (!$config['allow_site_wysiwyg']) $output = str_replace("<!--panel-->", $bb_code, $output);

    $tpl->set('{xfields}', $output);

    if (count($xfieldinput)) {
      foreach ($xfieldinput as $key => $value) {
        if (!$config['allow_site_wysiwyg']) $value = str_replace("<!--panel-->", $bb_code, $value);
        $tpl->copy_template = str_replace("[xfinput_{$key}]", $value, $tpl->copy_template);
      }
    }

    if ($user_group[$member_id['user_group']]['disable_news_captcha'] and $member_id['news_num'] >= $user_group[$member_id['user_group']]['disable_news_captcha']) {

      $user_group[$member_id['user_group']]['news_question'] = false;
      $user_group[$member_id['user_group']]['news_sec_code'] = false;
    }

    if ($user_group[$member_id['user_group']]['news_question']) {

      $tpl->set('[question]', "");
      $tpl->set('[/question]', "");

      $question = $db->super_query("SELECT id, question FROM " . PREFIX . "_question ORDER BY RAND() LIMIT 1");
      $tpl->set('{question}', htmlspecialchars(stripslashes($question['question']), ENT_QUOTES, $config['charset']));

      $_SESSION['question'] = $question['id'];
    } else {

      $tpl->set_block("'\\[question\\](.*?)\\[/question\\]'si", "");
      $tpl->set('{question}', "");
    }

    if ($user_group[$member_id['user_group']]['news_sec_code']) {

      if ($config['allow_recaptcha']) {

        $tpl->set('[recaptcha]', "");
        $tpl->set('[/recaptcha]', "");

        if ($config['allow_recaptcha'] == 2) {

          $tpl->set('{recaptcha}', "");
          $tpl->copy_template .= "<input type=\"hidden\" name=\"g-recaptcha-response\" id=\"g-recaptcha-response\" value=\"\"><script src=\"https://www.google.com/recaptcha/api.js?render={$config['recaptcha_public_key']}\"></script>";
          $tpl->copy_template .= "<script>grecaptcha.ready(function() {grecaptcha.execute('{$config['recaptcha_public_key']}', {action: 'addnews'}).then(function(token) {\$('#g-recaptcha-response').val(token);});});</script>";
        } else {

          $tpl->set('{recaptcha}', "<div class=\"g-recaptcha\" data-sitekey=\"{$config['recaptcha_public_key']}\" data-theme=\"{$config['recaptcha_theme']}\"></div><script src=\"https://www.google.com/recaptcha/api.js?hl={$lang['wysiwyg_language']}\"></script>");
        }

        $tpl->set_block("'\\[sec_code\\](.*?)\\[/sec_code\\]'si", "");
        $tpl->set('{sec_code}', "");
      } else {

        $tpl->set('[sec_code]', "");
        $tpl->set('[/sec_code]', "");
        $tpl->set('{sec_code}', "<a onclick=\"reload(); return false;\" href=\"#\" title=\"{$lang['reload_code']}\"><span id=\"dle-captcha\"><img src=\"engine/modules/antibot/antibot.php\" alt=\"{$lang['reload_code']}\" width=\"160\" height=\"80\" /></span></a>");
        $tpl->set_block("'\\[recaptcha\\](.*?)\\[/recaptcha\\]'si", "");
        $tpl->set('{recaptcha}', "");
      }
    } else {

      $tpl->set('{sec_code}', "");
      $tpl->set('{recaptcha}', "");
      $tpl->set_block("'\\[recaptcha\\](.*?)\\[/recaptcha\\]'si", "");
      $tpl->set_block("'\\[sec_code\\](.*?)\\[/sec_code\\]'si", "");
    }

    if ($config['allow_site_wysiwyg'] == "2") $save = "tinyMCE.triggerSave();";
    else $save = "";

    $script = "
<script>
<!--
function preview(){";

    $script .= "if(document.entryform.title.value == ''){ DLEalert('$lang[add_err_7]', dle_info); }
    else{
        dd=window.open('','prv','height=400,width=750,resizable=1,scrollbars=1,left=0,top=0,menubar=0,toolbar=0,location=0,status=0')
        document.entryform.mod.value='preview';document.entryform.action='{$PHP_SELF}?do=preview{$prjlink2}&newsid={$id}';document.entryform.target='prv'
        document.entryform.submit();dd.focus()
        dd.resizeTo(screen.availWidth, screen.availHeight);
        setTimeout(\"document.entryform.mod.value='addnews';document.entryform.action='';document.entryform.target='_self'\",500)
    }
}";

    $script .= <<<HTML
	function split( val ) {
		return val.split( /,\s*/ );
	}
	
	function extractLast( term ) {
		return split( term ).pop();
	}

	function find_relates ( )
	{
		var title = document.getElementById('title').value;

		ShowLoading('');

		$.post('engine/ajax/controller.php?mod=find_relates', { title: title, mode: 1, user_hash: '{$dle_login_hash}' }, function(data){
	
			HideLoading('');
	
			$('#related_news').html(data);
	
		});

		return false;

	};
	
	function xfimagedelete( xfname, xfvalue )
	{
		
		DLEconfirm( '{$lang['image_delete']}', '{$lang['p_info']}', function () {
		
			ShowLoading('');
			
			$.post('engine/ajax/controller.php?mod=upload', { subaction: 'deluploads', user_hash: '{$dle_login_hash}', news_id: '{$news_id}', author: '{$author}', 'images[]' : xfvalue }, function(data){
	
				HideLoading('');
				
				$('#uploadedfile_'+xfname).html('');
				$('#xf_'+xfname).val('');
				$('#xfupload_' + xfname + ' .qq-upload-button, #xfupload_' + xfname + ' .qq-upload-button input').removeAttr('disabled');
				
			});
			
		} );

		return false;

	};

	function xffiledelete( xfname, xfvalue )
	{
		
		DLEconfirm( '{$lang['file_delete']}', '{$lang['p_info']}', function () {
		
			ShowLoading('');
			
			$.post('engine/ajax/controller.php?mod=upload', { subaction: 'deluploads', user_hash: '{$dle_login_hash}', news_id: '{$news_id}', author: '{$author}', 'files[]' : xfvalue }, function(data){
	
				HideLoading('');
				
				$('#uploadedfile_'+xfname).html('');
				$('#xf_'+xfname).val('');
				$('#xf_'+xfname).hide('');
				$('#xfupload_' + xfname + ' .qq-upload-button, #xfupload_' + xfname + ' .qq-upload-button input').removeAttr('disabled');
				
			});
			
		} );

		return false;

	};
	
	function xfaddalt( id, xfname ) {
	
		var sel_alt = $('#xf_'+id).data('alt').toString().trim();
		sel_alt = sel_alt.replace(/"/g, '&quot;');
		sel_alt = sel_alt.replace(/'/g, '&#039;');
		
		DLEprompt('{$lang['bb_alt_image']}', sel_alt, '{$lang['p_prompt']}', function (r) {
			r = r.replace(/</g, '');
			r = r.replace(/>/g, '');
			r = r.replace(/,/g, '&#44;');
			
			$('#xf_'+id).data('alt', r);
			xfsinc(xfname);
		
		}, true);
		
	};
	
	function xfsinc(xfname) {
	
		var order = [];
		
		$( '#uploadedfile_' + xfname + ' .uploadedfile' ).each(function() {
			var xfurl = $(this).data('id').toString().trim();
			var xfalt = $(this).data('alt').toString().trim();
			
			if(xfalt) {
				order.push(xfalt + '|'+ xfurl);
			} else {
				order.push(xfurl);
			}

		});
	
		$('#xf_' + xfname).val(order.join(','));
	};
	
	function checkxf() {

		var status = '';
		var alert_text = '{$lang['addnews_xf_alert_1']}';
		var alert_all_text = [];
		
		{$save}

		$('[uid=\"essential\"]:visible').each(function(indx) {

			if($.trim($(this).find('[rel=\"essential\"]').val()).length < 1) {
			
				if( $(this).find('[rel=\"essential\"]').data('alert') ) {
				
					alert_all_text.push( alert_text.replace(/{field}/g, $(this).find('[rel=\"essential\"]').data('alert') ) );
					
					DLEalert(alert_all_text, dle_info);
					
				}

				status = 'fail';
			
			}

		});

		if (status == 'fail' ) {
			DLEalert(alert_all_text.join('<br><br>'), dle_info);
            return false;
		}
        
       
		if(document.entryform.category.value == ''){
            DLEalert('{$lang['add_cat_1']}', dle_info); 
            status = 'fail';
            return false;
        }
        
		if(document.entryform.category.value == 0){
            DLEalert('{$lang['add_cat_1']}', dle_info); 
            status = 'fail';
            return false;
        }
        
		if(document.entryform.title.value == ''){

			DLEalert('{$lang['add_err_7']}', dle_info); 

			status = 'fail';
            return false;

		}

		return status;

	};

	var text_upload = "{$lang['bb_t_up']}";

//-->
</script>
HTML;

    $onload_scripts[] = <<<HTML
$('[data-rel=links]').autocomplete({
	source: function( request, response ) {
		$.getJSON( 'engine/ajax/controller.php?mod=find_tags&user_hash={$dle_login_hash}&mode=xfield', {
			term: extractLast( request.term )
		}, response );
	},
	search: function() {
		var term = extractLast( this.value );
		if ( term.length < 3 ) {
			return false;
		}
	},
	focus: function() {
		return false;
	},
	select: function( event, ui ) {
		var terms = split( this.value );
		terms.pop();
		terms.push( ui.item.value );
		terms.push( '' );
		this.value = terms.join( ', ' );
		return false;
	}
});
HTML;

    if ($config['allow_add_tags']) {

      $onload_scripts[] = <<<HTML
$( '#tags' ).autocomplete({
	source: function( request, response ) {
		$.getJSON( 'engine/ajax/controller.php?mod=find_tags&user_hash={$dle_login_hash}', {
			term: extractLast( request.term )
		}, response );
	},
	search: function() {
		var term = extractLast( this.value );
		if ( term.length < 3 ) {
			return false;
		}
	},
	focus: function() {
		return false;
	},
	select: function( event, ui ) {
		var terms = split( this.value );
		terms.pop();
		terms.push( ui.item.value );
		terms.push( '' );
		this.value = terms.join( ', ' );
		return false;
	}
});
HTML;
    }

    $script .= "<form method=\"post\" name=\"entryform\" id=\"entryform\" onsubmit=\"if(!checkxf()){return false;}\" action=\"\">";

    if ($categories_default) {

      $categories_default = "<input type=\"hidden\" name=\"categories_default\" value=\"{$categories_default}\">";
    } else $categories_default = "";

    $tpl->copy_template = $categoryfilter . $script . $tpl->copy_template . $categories_default . "<input type=\"hidden\" name=\"mod\" value=\"addnews\"><input type=\"hidden\" name=\"user_hash\" value=\"{$dle_login_hash}\"></form>";

    if (!$config['allow_site_wysiwyg']) $tpl->copy_template .= $bb_js_code;

    $tpl->compile('content');

    $tpl->clear();
  } else msgbox($lang['all_info'], "$lang[add_err_8]<br /><a href=\"javascript:history.go(-1)\">{$lang['all_prev']}</a>");
}
