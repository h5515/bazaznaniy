<?php
if (!defined('DATALIFEENGINE')) {
  die("Hacking attempt!");
}
global $category_id, $gl_bd;

if (isset($_COOKIE['dbname']))
  $prjlink = '&project=' . $_COOKIE['dbname'];
else
  $prjlink = '';


if ($catmay == "no") {
  // $sql = 'SELECT not_allow_cats FROM dle_usergroups'
  if (isset($_COOKIE['site_bz'])) {
    set_cookie("dbname", $_COOKIE['site_bz'], 365);
    $_COOKIE['dbname'] = $_COOKIE['site_bz'];
    $gl_bd = 'bz_' . $_COOKIE['site_bz'];
  }

  $db->connect(DBUSER, DBPASS, $gl_bd, DBHOST);

  // $not_allow_cats = explode(',', $user_group[$member_id['user_group']]['not_allow_cats']); ' AND NOT id regexp '[[:<:]](" . implode('|', $not_allow_cats) . ")[[:>:]]'
  $sql = "SELECT id, icon, name, alt_name  FROM dle_category WHERE parentid = '" . $sid . "' ORDER BY posi";
  $result = $db->query($sql);
  echo '<div class="container"><div class="padding"><article class="block-news"><div id="dle-content">';
  if (!empty($result)) {


    while ($row = $db->get_row($result)) {
      if ($row['icon']) {
        $icon = $row['icon'];
      } else {
        $icon = "{THEME}/dleimages/bz.png";
      }
      //  $url = $config[ 'http_home_url' ] . get_url( $row[ 'id' ] ) . "/";
      if (isset($_COOKIE['dbname']))
        $prjlink = '&project=' . $_COOKIE['dbname'] . '&';
      else
        $prjlink = '';
      if ($config['allow_alt_url']) {
        $url = $config['http_home_url'] . get_url($row['id']) . "/";
      } else {
        $url = $PHP_SELF . '?do=cat&' . $prjlink . 'category=' . $row['alt_name'] . $prjlink;
      }


      echo '<article class="block-news"><ol><a href="' . $url . '"><img src="' . $icon . '" alt="' . $row['name'] . '" /></a>
			  <div class="shottitle"><a href="' . $url . '">' . $row['name'] . '</a></div>
			  </ol></article>';
    }
  }
  if (isset($member_id['name'])) {
    $sql = "SELECT id FROM dle_project WHERE avtor = '{$member_id['name']}'";
    $rows = $db->query($sql);
    foreach ($rows as $key => $value) {
       $bzid[] = $value['id'];
    }
  }
  if ((isset($bzid)) || ($_SESSION['super_admin'])) {
    //$bzid = explode(',', $bzid);

    if ($_SESSION['super_admin'])
      $sql = "SELECT Project, id_cat FROM dle_project ";
    else
      $sql = "SELECT Project, id_cat FROM dle_project WHERE id regexp '[[:<:]](" . implode('|', $bzid) . ")[[:>:]]'";
    $row = $db->query($sql);
    $db2 = new db;
    $db3 = new db;
    $db3->connect(DBUSER, DBPASS, $gl_bd, DBHOST);
  }
  while ($row = $db->get_row()) {
    $bazeest = $db3->super_query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'bz_{$row['Project']}'");
    if (isset($bazeest)) {
      $db2->connect(DBUSER, DBPASS, 'bz_' . $row['Project'], DBHOST);
      $sql = "SELECT id, icon, name, alt_name  FROM dle_category WHERE id = {$row['id_cat']}";
      $result = $db2->super_query($sql);
      if (!empty($result)) {
        if ($result['icon']) {
          $icon = $result['icon'];
        } else {
          $icon = "{THEME}/dleimages/bz.png";
        }
        $url = $PHP_SELF . '?do=cat&project=' . $row['Project'] . '&category=' . $result['alt_name'];

        echo '<article class="block-news"><ol><a href="' . $url . '"><img src="' . $icon . '" alt="' . $result['name'] . '" /></a>
			  <div class="shottitle"><a href="' . $url . '">' . $result['name'] . '</a></div>
			  </ol></article>';
      }
    }
    $db3->close();
    $db3->free();
    $db2->close();
    $db2->free();
  }
  echo '</div></article></div></div>';
} else {


  function Newszaden($cat, $dbObj)
  {

    $thisdate = date("Y-m-d", strtotime("-3 DAY")) . " 00:00:00"; //langdate( "Y-m-d", $_TIME-86400 )." 00:00:00";

    $where_date = " AND date > '" . $thisdate . "'";

    $aviable = array();
    $aviable = explode(',', $cat);


    $sql = "SELECT * FROM " . PREFIX . "_post  WHERE category regexp '[[:<:]](" . implode('|', $aviable) . ")[[:>:]]'" . $where_date . " and approve=1 and arhiv=0";
    //return $sql;}
    $SQL = $dbObj->query($sql);
    $count = $row = $dbObj->num_rows();
    if ($count != 0)
      return '  +' . $count;
  }

  function getSubCatList2($match, $cot_ins)
  {

    $ids = is_array($match) ? $match[1] : $match;

    if (!$cot_ins[$ids]) {
      return $ids;
    }
    $list = [$ids];
    foreach ($cot_ins as $v) {
      if ($v['parentid'] == $ids) {
        $list[] = getSubCatList2($v['id'], $cot_ins);
      }
    }
    return join(',', $list);
  }

  if (!empty($id)) {
    $id = get_idcategories($id);

    $id = (int)$id;

    if ($_GET['catarhiv'] != "ok") {
      $arhivcat = " AND active = 1 ";
      $arhivpost = " AND arhiv = 0 ";
    } else {
      $dopurl = "&catarhiv=ok";
    }

    if (!empty($catmay)) {
      function ParentIs($sid, $dbObj, $lev, $cat_i)
      {

        global $config, $category_id, $tid, $cat_info;
        $category = intval($category_id);
        //id, icon, name, alt_name
        if ($_GET['catarhiv'] != "ok") {
          $arhivcat = " AND active = 1 ";
          $arhivpost = " AND arhiv = 0 ";
        } else {
          $dopurl = "&catarhiv=ok";
        }
        $sql = 'SELECT id, name, icon, alt_name, arhiv FROM dle_category WHERE parentid = "' . $sid . '"' . $arhivpost . '  ORDER BY posi';
        $result = $dbObj->query($sql);
        $db2 = new db;
        if ($result) {
          if ($result->num_rows) {
            echo "<ol class='dd-list'>";
            $aviable = array();
            while ($row = $dbObj->get_row($result)) {
              $cots = getSubCatList2($row['id'], $cat_i);
              $aviable = explode(',', $cots);
              $count = $db2->super_query("SELECT COUNT(id) as c FROM " . PREFIX . "_post  WHERE category regexp '[[:<:]](" . implode('|', $aviable) . ")[[:>:]]' and approve=1 {$arhivpost}");
              if ($row['icon']) {
                $icon = $row['icon'];
              } else {
                $icon = "{THEME}/dleimages/no_icon.png";
              }
              if ($row['arhiv']) {
                $icon = "images/archive.png";
                //$clasarc = ' style="display:none" ';
              }

              $bul = "";
              $bul2 = "";
              if ($category == $row['id']) {
                $bul = 'class = "activ" ';
                // $bul = "<b>";
                $bul2 = "</b>";
              }
              // $url = $config[ 'http_home_url' ] . get_url( $row[ 'id' ] ) . "/";
              if (isset($_COOKIE['dbname']))
                $prjlink = '&project=' . $_COOKIE['dbname'];
              else
                $prjlink = '';
              if (isset($_COOKIE['dbname']))
                $prjlink = '&project=' . $_COOKIE['dbname'] . '&';
              else
                $prjlink = '';
              if ($config['allow_alt_url']) {
                $url = $config['http_home_url'] . get_url($row['id']) . "/";
              } else {
                $url = $PHP_SELF . '?do=cat&' . $prjlink . 'category=' . $row['alt_name'] . $prjlink . $dopurl;
              }

              $zaden = Newszaden($cots, $dbObj);

              /*              echo "<li>" . $bul . '<a href="' . $url . '"><img src="' . $icon . '" width="16" height="16" alt="" /> ' . $row[ 'name' ] . '<span style="float: right;">' . $count[ 'c' ]. $zaden . '</span></a>' . $bul2 . "</li>";*/
              echo "<li data-id='{$row['id']}' class='dd-item dd3-item'>" . '<a href="' . $url . '" ' . $bul . '><img src="' . $icon . '" width="16" height="16" alt="" class="imagt leftimg"> <span class="catname">' . $row['name'] . '</span><span style="float: right;" class="CatRig">' . $count['c'] . $zaden . '</span></a><div class="dd3-handle dd-handle dd3-hid" name = "cat"></div>';

              foreach ($row as $key => $value) {
                $cat_info[$row['id']][$key] = stripslashes($value);
              }

              parentIs($row['id'], $dbObj, $lev + 1, $cat_i);
            }
            echo "</ol>" . "</li>";
          }
        }
      }

      ///////////////  ??????  ////////////////////////////////////////////////////////////////////////////
      $lev = 0;


      //id, icon, name, alt_name
      $sql = 'SELECT id, name, icon, alt_name FROM dle_category WHERE id = "' . $id . '"' . $arhivpost . '  ORDER BY posi';
      $result = $db->super_query($sql);
      $row = $result;


      /// $cat_info[ $row[ 'id' ] ][ 'newscount' ] = 0;

      if (!empty($result)) {
        $category = intval($category_id);
        $b = true;
        echo "<ol>";
        if ($row['icon']) {
          $icon = $row['icon'];
        } else {
          $icon = "{THEME}/dleimages/bz.png";
        }
        // $url = $config[ 'http_home_url' ] . get_url( $row[ 'id' ] ) . "/";
        if (isset($_COOKIE['dbname']))
          $prjlink = '&project=' . $_COOKIE['dbname'] . '&';
        else
          $prjlink = '';
        if ($config['allow_alt_url']) {
          $url = $config['http_home_url'] . get_url($row['id']) . "/";
        } else {
          $url = $PHP_SELF . '?do=cat&' . $prjlink . 'category=' . $row['alt_name'] . $prjlink;
        }

        $bul = "";
        $bul2 = "";
        if ($category == $row['id']) {
          $bul = 'class = "activ" ';
          // $bul = "<b>";
          $bul2 = "</b>";
        }
        $cots = $this->getSubCatList($id);
        $cat_in = $cat_info;
        $cat_info = array();
        $cat_info[$row['id']] = array();
        $db2 = new db;
        $aviable = array();
        $aviable = explode(',', $cots);

        $sql = "SELECT COUNT(id) as c FROM " . PREFIX . "_post  WHERE category regexp '[[:<:]](" . implode('|', $aviable) . ")[[:>:]]' and approve=1 {$arhivpost}";

        $count = $db2->super_query($sql);

        $zaden = Newszaden($cots, $db);

        /*   echo "<li>" . $bul . '<a href="' . $url . '"><img src="' . $icon . '" width="16" height="16" alt="" /> ' . $row[ 'name' ] . '<span style="float: right;">' . $count[ 'c' ]. $zaden . '</span></a>' . $bul2 . "</li>";*/
        echo "<li  data-id='{$row['id']}'>" . '<a href="' . $url . '" ' . $bul . '><img src="' . $icon . '" width="16" height="16" alt="" / class="imagt leftimg"> <span class="catname">' . $row['name'] . '</span><span style="float: right;" class="CatRig">' . $count['c'] . $zaden . '</span></a><div class="dd3-handle dd-handle dd3-hid" name = "catgl"></div><div class="dd" id="nestable" style="width: 100%;">'; // . "</li>";

        foreach ($row as $key => $value) {
          $cat_info[$row['id']][$key] = stripslashes($value);
        }
      }

      ParentIs($id, $db, $lev, $cat_in);
      if ($b) {
        echo "</li></ol>";
      }
      /*    foreach ( $cat_info as $keys ){
        echo $keys['name']."<br>";
      }*/
      set_vars("categorycat", $cat_info);
    } else {
      if (!empty($limit)) {
        $limit = ' LIMIT ' . $limit;
      }
      $template = strip_tags($template);
      $order = empty($order) ? 'ASC' : $order;
      $all = empty($all) ? 1 : $all;
      $orderf = empty($orderf) ? 'id' : $orderf;
      $dateFormat = empty($dateFormat) ? 'd.m.Y' : $dateFormat;
      if (empty($id)) {
        echo 'No ID';
        return;
      }

      if (!function_exists('GetAllChilds')) {
        function GetAllChilds(&$result, $cacheFile, $dbObj, $table, $fieldGet, $fieldSearch, $keySearch, $onlyFirstLevel = false)
        {
          $catalog = '';
          $catl = '';
          if (isset($_COOKIE['dbname'])) {
            $catalog = $_COOKIE['dbname'];
            $catl = $_COOKIE['dbname'] . '/';
          }
          $dir = __DIR__ . '/../cache/' . $catl;
          if (!is_dir($dir)) {
            mkdir($dir, 0777);
          }
          $separator = ',';
          $cache = $dir . 'gettree_' . $cacheFile . '_' . $keySearch . '_' . ($onlyFirstLevel ? '1' : '0');
          $cacheContent = file_exists($cache) ? file_get_contents($cache) : null;
          if ($cacheContent !== null) {
            $result = explode($separator, $cacheContent);
            if (time() < $result[0]) {
              array_shift($result);
              return count($result);
            }
          }
          $sql = 'SELECT `' . $fieldGet . '` FROM `' . $table . '` WHERE `' . $fieldSearch . '` = "' . $keySearch . '"';
          $resultQuery = $dbObj->query($sql);
          $level = array();
          while ($row = $dbObj->get_row($resultQuery)) { //$resultQuery->fetch_assoc()
            $id = $row[$fieldGet];
            if (!in_array($id, $result)) {
              $level[] = $id;
              $result[] = $id;
            }
          }

          foreach ($level as $id) {
            GetAllChilds($result, $cacheFile, $dbObj, $table, $fieldGet, $fieldSearch, $id, false);
          }

          file_put_contents($cache, implode($separator, $result));
          return count($result);
        }
      }

      $allChilds = array($id);
      GetAllChilds($allChilds, 'catchilds', $db, PREFIX . "_category", 'id', 'parentid', $id);

      $tpl->load_template($template);

      $sql = $all == 1 ?
        "SELECT c.*, cp.id as parentId, cp.alt_name as parentAlt, cp.name as parentName FROM " . PREFIX . "_category c JOIN " . PREFIX . "_category cp ON cp.id = c.`parentid` WHERE c.`parentid` = '" . $id . "' ORDER BY c.`" . $orderf . "` " . $order . $limit : 'SELECT c.*, cp.id as parentId, cp.alt_name as parentAlt, cp.name as parentName FROM ' . PREFIX . '_category c JOIN ' . PREFIX . '_category cp ON cp.id = c.`parentid` WHERE c.`id` = (SELECT category FROM ' . PREFIX . '_post WHERE id = (SELECT MAX(id) FROM ' . PREFIX . '_post WHERE category IN (' . implode(',', $allChilds) . '))) ORDER BY c.`' . $orderf . '` ' . $order . $limit;
      //echo $sql;
      $result = $db->query($sql);
      $db2 = new db;
      while ($row = $db->get_row($result)) {
        //print_r($row);
        $tpl->set_block("'\\[catlist=" . $id . "\\](.*?)\\[/catlist\\]'si", "\$1");
        $tpl->set_block("'\\[catlist=\d+\\](.*?)\\[/catlist\\]'si", "");

        $count = $db2->super_query('SELECT COUNT(id) as c FROM ' . PREFIX . '_post WHERE category = "' . $row['id'] . '"');
        $lastNew = $db2->super_query('SELECT * FROM ' . PREFIX . '_post WHERE category = "' . $row['id'] . '" ORDER BY date DESC LIMIT 1');

        $full_link = $config['http_home_url'] . get_url($row['id']) . '/';
        //������ �����
        $tpl->set('{newscount}', $count['c']);
        $tpl->set('{lastpost-comments-num}', $lastNew ? $lastNew['comm_num'] : 0);

        $tpl->set('{lastpost-title}', str_replace(array('\"', "\'"), array('"', "'"), $lastNew['title']));
        $tpl->set('{lastpost-url}', $full_link . $lastNew['id'] . '-' . $lastNew['alt_name'] . '.html');
        $tpl->set('{lastpost-date}', $lastNew ? date($dateFormat, strtotime($lastNew['date'])) : '');
        $tpl->set('{image}', $row['icon'] == '' ? '{THEME}/dleimages/no_icon.png' : $row['icon']);
        $tpl->set('{title}', $row['name']);
        $tpl->set('{parent-title}', $row['parentName']);
        $tpl->set('{parent-url}', $config['http_home_url'] . get_url($row['parentId']) . '/');

        $tpl->set('[full-link]', "<a href=\"" . $full_link . "\">");
        $tpl->set('[/full-link]', "</a>");
        $tpl->compile('categorychilds');
      }
      $db2->close();
      $tpl->clear();
      $db->free($result);
      echo $tpl->result['categorychilds'];
    }
  }
}
