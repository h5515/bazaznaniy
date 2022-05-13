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

function build_like_and( $values, $field_name ) {
  $names = explode( ',', $values );
  $names = array_map( 'trim', $names );
  $names = array_filter( $names );
  $where = array();
  foreach ( ( array )$names AS $name ) {
    $where[] = "LOWER ({$field_name}) LIKE '%{$name}%'";
  }
  $where = '(' . implode( ' AND ', $where ) . ')';
  return $where;
}


$category_id = $_POST[ 'category' ];

$category = array();
$category = explode( ',', $category_id );
$category_id = $category[ 0 ];


$comand = $_POST[ 'comand' ];

$tagson = $_POST[ 'tagson' ];

//$search = mb_strtolower ($_POST[ 'search' ],'UTF-8');


$search = $db->safesql( htmlspecialchars( trim( strip_tags( convert_unicode( $_POST[ 'search' ], $config[ 'charset' ] ) ) ), ENT_QUOTES ) );
$search = mb_strtolower( $search, 'utf-8' );


//$search = $_POST[ 'search' ];
//echo $search;


if ( !$category_id == '' ) {
  $ids = getSubCatList( $category_id );
  $aviable = array();
  $aviable = explode( ',', $ids );
  $catserch = "WHERE category regexp '[[:<:]](" . implode( '|', $aviable ) . ")[[:>:]]'";
}

$tagcheck = $_POST[ 'tagcheck' ];


if ( !$tagson == "" ) {
  if ( $tagcheck == 'true' ) {
    $nser = mb_strtolower( $tagson, 'utf-8' );
    $nser = " AND " . build_like_and( $nser, 'tags' );
    $sql = "SELECT id  FROM " . PREFIX . "_post $catserch $nser";
    $sql = str_replace( 'post AND', 'post', $sql );
    $row = $db->query( $sql );
    $news_id = array();
    while ( $row = $db->get_row() ) {
      $news_id[] = $row[ 'id' ];
    }


    $news_ids = implode( "','", $news_id );
    $news_ids = "AND news_id IN ('$news_ids') ";
  }

  $tagson = explode( ',', $tagson );
  $tagsonin = $tagson;
  $tagson = "AND tag NOT IN ('" . implode( "','", $tagson ) . "') ";

  //$not_allow_cats = "category NOT IN ('" . implode ( "','", $not_allow_cats ) . "') AND ";
}

$dlin = -1;
$dlin = strpos($_POST[ 'command' ],'Автор - ');
if ( $dlin>-1) {
  $autor = substr($_POST[ 'command' ],(strlen($_POST[ 'command' ])-13)*-1 );	
  $autor = " AND autor = '{$autor}' ";
  $arh = " AND arhiv=0 ";
  $_POST[ 'command' ] = 'myst';
} else {
  $autor = " AND autor = '{$member_id['name']}' ";
    $arh = " AND arhiv=0 ";
}

$dlin = -1;
//echo $_POST[ 'command' ];
$dlin = strpos($_POST[ 'command' ],'Публикации за ');
if ( $dlin>-1) {
    $arhiv = substr($_POST[ 'command' ],(strlen($_POST[ 'command' ])-26)*-1 );

$_monthsList = array("января" => "01", "февраля" => "02", 
"марта" => "03", "апреля" => "04", "мая" => "05", "июня" => "06", 
"июля" => "07", "августа" => "08", "сентября" => "09",
"октября" => "10", "ноября" => "11", "декабря" => "12");
    
$_monthsList2 = array("январь" => "01", "февраль" => "02", 
"март" => "03", "апрель" => "04", "май" => "05", "июнь" => "06", 
"июль" => "07", "август" => "08", "сентябрь" => "09",
"октябрь" => "10", "ноябрь" => "11", "декабрь" => "12");
    
$mout = array();
$mout = explode( ' ', $arhiv );

   
if (count($mout)==3){
$mout[1] = $_monthsList[$mout[1]];	
	$arh = " AND arhiv=0 ";
  $arhiv = " AND month(date) = '$mout[1]' AND year(date) = '$mout[2]' AND dayofmonth(date) = '$mout[0]' ";
} else {
  //  echo $mout[0];
 $mout[0] = $_monthsList2[mb_strtolower($mout[0])];	
    $arh = " AND arhiv=0 ";
  $arhiv = " AND month(date) = '$mout[0]' AND year(date) = '$mout[1]' ";   
}
  $autor = "";
  $_POST[ 'command' ] = 'myst';
}

/*if ( $_POST[ 'command' ] == 'arhiv' ) {
   $arh = " AND arhiv=1 "; 
    $_POST[ 'command' ] = 'myst';
}*/


if ( $_POST[ 'command' ] == 'myst' ) {
  $sql = "SELECT id  FROM " . PREFIX . "_post $catserch $autor $arhiv $arh";
  $row = $db->query( $sql );
  $news_id = array();
  while ( $row = $db->get_row() ) {
    $my_id[] = $row[ 'id' ];
  }
  $my_id = implode( "','", $my_id );
  $my_id = "AND news_id IN ('$my_id') ";
}

if ( $_POST[ 'command' ] == 'favorit' ) {
  //  echo ('---------');
  $list = explode( ",", $member_id[ 'favorites' ] );
  $list = array_reverse( $list );
  $fav_list = array();
  $order_list = array();

  foreach ( $list as $daten ) {
    $daten = intval( $daten );
    $fav_list[] = "'" . $daten . "'";
    $order_list[] = $daten;
  }

  $list = implode( ",", $fav_list );

  $favorites = "(" . $list . ")";

  if ( count( $order_list ) ) {

    $order_list = implode( ",", $order_list );
    $order_list = "ORDER BY FIND_IN_SET(news_id, '" . $order_list . "') ";

  } else $order_list = "";

  $favorites = " AND news_id IN " . $favorites;

}

if ( $_POST[ 'command' ] == 'noread' ) {
  $noread = " AND news_id NOT in (SELECT id_news FROM dle_post_read WHERE id_user = '{$member_id['user_id']}') ";
}


$counts = array();
$tags = array();
$list = array();
$sizes = array( "clouds_xsmall", "clouds_small", "clouds_medium", "clouds_large", "clouds_xlarge" );
$min = 1;
$max = 1;
$range = 1;

$config[ 'tags_number' ] = intval( $config[ 'tags_number' ] );
if ( $config[ 'tags_number' ] < 1 )$config[ 'tags_number' ] = 10;

//echo "111 ".$catserch;

/*if ($search=="" AND $comand!="all"){
    $comand = 'hide';
}*/

//echo $catserch." - ".$favorites;
if ( $comand == 'search' ) {
  if ( $catserch != '' ) {
    $catserch = $catserch . " AND ";
    if ( $tagson != '' ) {
      $tagson = str_replace( 'AND', '', $tagson );
      $tagson = $tagson . " AND ";
    }
    if ( $news_ids != '' ) {
      $news_ids = str_replace( 'AND', '', $news_ids );
      $news_ids = $news_ids . " AND ";
    }
    if ( $my_id != '' ) {
      $my_id = str_replace( 'AND', '', $my_id );
      $my_id = $my_id . " AND ";
    }
    if ( $favorites != '' ) {
      $favorites = str_replace( 'AND', '', $favorites );
      $favorites = $favorites . " AND ";
    }
    if ( $noread != '' ) {
      $noread = str_replace( 'AND', '', $noread );
      $noread = $noread . " AND ";
    }
  } else {
    $catserch = "WHERE";
  }
  //echo $catserch." - ". $tagson." - ". $news_ids." - ".$favorites;
  $sql = "SELECT tag, category, COUNT(*) AS count FROM " . PREFIX . "_tags $catserch $tagson $news_ids $my_id $favorites $noread LOWER (tag) LIKE '%{$search}%' GROUP BY tag ORDER BY tag";
}

if ( $comand == 'all' ) {
  $sql = "SELECT tag, category, COUNT(*) AS count FROM " . PREFIX . "_tags $catserch $tagson $news_ids $my_id $favorites $noread GROUP BY tag ORDER BY tag";
}
if ( $comand == 'hide' ) {
  $sql = "SELECT tag, category, COUNT(*) AS count FROM " . PREFIX . "_tags $catserch $tagson $news_ids $my_id $favorites $noread GROUP BY tag ORDER BY tag LIMIT 0,{$config['tags_number']}";
}

if ( $_POST[ 'command' ] == 'noapp' || $_POST[ 'command' ] == 'arhiv' ) {

  //if ( !strpos($catserch, "AND") ) $catserch = $catserch." AND ";
  if ( !strpos( $catserch, "AND" ) )$nser = $nser . " AND ";
  else $nser = "";
  if ( $search != "" ) {
    $pois = $search;
    $search = " LOWER (tags) LIKE '%{$search}%' AND ";
  }
  //echo $nser;
    if ( $_POST[ 'command' ] == 'noapp'){
        $stex = " approve =0 and arhiv=0 ";
    }
    if ( $_POST[ 'command' ] == 'arhiv'){
        $stex = " approve =1 and arhiv=1 ";
    }
    
  $sql = "SELECT tags FROM " . PREFIX . "_post $catserch $nser $search $stex AND tags <>'' ";
}
//echo $sql;

$db->query( $sql );

if ( $_POST[ 'command' ] == 'noapp'|| $_POST[ 'command' ] == 'arhiv' ) {
  $tri = array();
  $tegi = array();
  $row = array();
  $tags = array();
  $is = 0;
  $as = -1;
  $e = false;
  while ( $row = $db->get_row() ) {
    $trin = explode( ',', $row[ 'tags' ] );

    foreach ( $trin as $tru => $values ) {
      $b = false;
        $e = false;
        
      foreach ( $tugs as $var => $val ) {
        if ( $values == $val[ 'tag' ] ) {
          $b = true;
          $is = $var;
        }
      }
      if ( !$b ) {
        $c = false;
        $e = false;
        foreach ( $tagsonin as $ton => $val ) {
          //    echo  $val."-".$values."|";
          if ( trim( $val ) == trim( $values ) )$c = true;

        }
          
                    if ( $pois != "" ) {
             // echo mb_strtolower( $values)." - ".mb_strtolower($pois);
            if ( !strpos(mb_strtolower( $values),mb_strtolower($pois) ) ){ $e = true;}
          }

        if ( !$c && !$e ) {
          $as++;
          $tugs[ $as ][ 'tag' ] = $values;
          $tugs[ $as ][ 'count' ] = 1;
        }
      } else {
        if ( !$e )
          $tugs[ $is ][ 'count' ]++;
      }
      // echo $tugs[$as]['tag']."-";

    }

  }
  foreach ( $tugs as $tru => $values ) {
    $tags[ $values[ 'tag' ] ] = $values[ 'count' ];
    $counts[] = $values[ 'count' ];
  }
  $comand = "";
} else {
  while ( $row = $db->get_row() ) {

    $tags[ $row[ 'tag' ] ] = $row[ 'count' ];
    $counts[] = $row[ 'count' ];

  }
}

$db->free();

if ( count( $counts ) ) {
  $min = min( $counts );
  $max = max( $counts );
  $range = ( $max - $min );
}

if ( !$range )$range = 1;

foreach ( $tags as $tag => $value ) {

  $list[ $tag ][ 'tag' ] = $tag;
  $list[ $tag ][ 'size' ] = $sizes[ sprintf( "%d", ( $value - $min ) / $range * 4 ) ];
  $list[ $tag ][ 'count' ] = $value;
}

usort( $list, "compare_tags" );
$tags = array();

foreach ( $list as $value ) {

  if ( trim( $value[ 'tag' ] ) != "" ) {

    $url_tag = str_replace( array( "&#039;", "&quot;", "&amp;" ), array( "'", '"', "&" ), $value[ 'tag' ] );

    if ( $config[ 'allow_alt_url' ] )
      $tags[] = "<span class=\"{$value['size']}\"><a href=\"" . $config[ 'http_home_url' ] . "tags/" . rawurlencode( $url_tag ) . "/\" title=\"" . $lang[ 'tags_count' ] . " " . $value[ 'count' ] . "\">" . $value[ 'tag' ] . "</a></span>";
    else {
      if ( !$category_id == '' ) {
        $tags[] = "<span class=\"{$value['size']}\"><a href=\"#\" onClick=\"tagsclick('" . $value[ 'tag' ] . "',this,$category_id)\" title=\"" . $lang[ 'tags_count' ] . " " . $value[ 'count' ] . "\">" . $value[ 'tag' ] . "</a></span>";
      } else {
        $tags[] = "<span class=\"{$value['size']}\"><a href=\"$PHP_SELF?do=tags&amp;tag=" . rawurlencode( $url_tag ) . "\" title=\"" . $lang[ 'tags_count' ] . " " . $value[ 'count' ] . "\">" . $value[ 'tag' ] . "</a></span>";
      }
    }

  }

}

echo implode( " ", $tags );

//if ( count( $counts ) == 0 )echo $lang[ 'not_tags' ];


if ( $comand == 'all' ) {
  if ( $tagcheck == 'false' ) {
    $row = $db->super_query( "SELECT COUNT(DISTINCT tag) as count FROM " . PREFIX . "_tags $catserch $tagson $news_ids $my_id $favorites $noread  " );
    if ( $row[ 'count' ] >= $config[ 'tags_number' ] ) {
      echo "<div class=\"tags_more\"><a href=\"#\" onClick=\"AllTag(" . $category_id . ",'hide')\">" . $lang[ 'hide_tags' ] . "</a></div>";
    }
  } else {
    if ( $tagson == '' ) {
      $row = $db->super_query( "SELECT COUNT(DISTINCT tag) as count FROM " . PREFIX . "_tags $catserch $tagson $news_ids $my_id $favorites $noread  " );

      if ( $row[ 'count' ] >= $config[ 'tags_number' ] ) {
        echo "<div class=\"tags_more\"><a href=\"#\" onClick=\"AllTag(" . $category_id . ",'hide')\">" . $lang[ 'hide_tags' ] . "</a></div>";
      }
    }
  }
}
if ( $comand == 'hide' ) {

  $row = $db->super_query( "SELECT COUNT(DISTINCT tag) as count FROM " . PREFIX . "_tags $catserch $tagson $news_ids $my_id $favorites $noread  " );

  if ( $row[ 'count' ] >= $config[ 'tags_number' ] ) {
    if ( !$category_id == '' ) {
      echo "<div class=\"tags_more\"><a href=\"#\" onClick=\"AllTag(" . $category_id . ",'all')\">" . $lang[ 'all_tags' ] . "</a></div>";
    } else {
      echo "<div class=\"tags_more\"><a href=\"$PHP_SELF?do=tags\">" . $lang[ 'all_tags' ] . "</a></div>";
    }
    //echo "<div class=\"tags_more\"><a href=\"#\" onClick=\"AllTag(" . $category_id . ",'all')\">" . $lang[ 'all_tags' ] . "</a></div>";

  }
}


?>