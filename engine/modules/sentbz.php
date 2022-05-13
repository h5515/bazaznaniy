<?php

/*if ( !defined( 'DATALIFEENGINE' ) ) {
  header( "HTTP/1.1 403 Forbidden" );
  header( 'Location: ../../' );
  die( "Hacking attempt!" );
}*/

//if ( !$is_logged OR!$user_group[ $member_id[ 'user_group' ] ][ 'admin_newsletter' ] )die( "error" );


//include_once( DLEPlugins::Check( ENGINE_DIR . '/classes/parse.class.php' ) );
//$parse = new ParseFilter();
//$parse->allow_code = false;

//echo $titles. " - ".$message;  Передать параметр $ids

$rows = $db->super_query( "SELECT id, title, full_story, autor, date, category FROM " . PREFIX . "_post WHERE id='" . $ids . "' LIMIT 0,1" );


if ( !$rows[ 'category' ] ) {
  $my_cat = "---";
  $my_cat_link = "---";
} else {

  $my_cat = array();
  $my_cat_link = array();
  $cat_list = $rows[ 'cats' ] = explode( ',', $rows[ 'category' ] );

  if ( count( $cat_list ) == 1 OR( $view_template == "rss"
      AND $config[ 'rss_format' ] == 2 ) ) {

    if ( $cat_info[ $cat_list[ 0 ] ][ 'id' ] ) {
      $my_cat[] = $cat_info[ $cat_list[ 0 ] ][ 'name' ];
      $my_cat_link = get_categories( $cat_list[ 0 ], $config[ 'category_separator' ] );
    } else {
      $my_cat_link = "---";
    }

  } else {

    foreach ( $cat_list as $element ) {

      if ( $element AND $cat_info[ $element ][ 'id' ] ) {
        $my_cat[] = $cat_info[ $element ][ 'name' ];
        if (isset($_COOKIE['dbname']))
							$prjlink = '&project=' . $_COOKIE['dbname'].'&';
						  else
							$prjlink = '';
        if ( $config[ 'allow_alt_url' ] )$my_cat_link[] = "<a href=\"" . $config[ 'http_home_url' ] . get_url( $element ) . "/\">{$cat_info[$element]['name']}</a>";
        else $my_cat_link[] = "<a href=\"$PHP_SELF?do=cat&{$prjlink}category={$cat_info[$element]['alt_name']}\">{$cat_info[$element]['name']}</a>";
      }

    }

    if ( count( $my_cat_link ) ) {
      $my_cat_link = implode( $config[ 'category_separator' ], $my_cat_link );
    } else $my_cat_link = "---";

  }

  if ( count( $my_cat ) ) {
    $my_cat = implode( $config[ 'category_separator' ], $my_cat );
  } else $my_cat = "---";
}

$categor = $my_cat_link;

$message = $rows[ 'full_story' ];

if ( $config[ 'allow_alt_url' ] ) {
  if ( $config[ 'seo_type' ] == 1 OR $config[ 'seo_type' ] == 2 ) {
    if ( $categor and $config[ 'seo_type' ] == 2 ) {
      $full_link = $config[ 'http_home_url' ] . get_url( $categor ) . "/" . $rows[ 'id' ] . "-" . $alt_name . ".html";
    } else {
      $full_link = $config[ 'http_home_url' ] . $row[ 'id' ] . "-" . $alt_name . ".html";
    }
  } else {
    $full_link = $config[ 'http_home_url' ] . date( 'Y/m/d/', $thistime ) . $alt_name . ".html";
  }
} else {
  $full_link = $config[ 'http_home_url' ] . "index.php?newsid=" . $rows[ 'id' ];
}


if ( $member_id[ 'fullname' ] ) {
  $avtor = $member_id[ 'fullname' ];
} else {
  $avtor = $member_id[ 'name' ];
}
$link = $full_link;

$rows['date'] = strtotime( $rows['date'] );

$times = date( "d.m.Y H:i", $rows[ 'date' ] );

$titles = $rows[ 'title' ];

$titles = htmlspecialchars( strip_tags( trim( $titles ) ), ENT_QUOTES, $config[ 'charset' ] );
$titles = str_replace( "&amp;amp;", "&amp;", $titles );

//$message = stripslashes( $parse->process( $message ) );

//if ( !$titles OR!$message )die( "error" );

$where = array();

$where[] = "banned != 'yes'";
$where[] = "allow_mail = '1'";

if ( $empfanger )$where[] = $empfanger;


$where = " WHERE " . implode( " AND ", $where );

//$db2 = new db;   

if (!$deletes==1){
$tema = $lang[ 'tema_mail' ];
$shem = "newsletter";
}else{
$tema = $lang[ 'tema_del' ];
$shem = "twofactor";	
}
$rows = $db->super_query( "SELECT template FROM " . PREFIX . "_email WHERE name='".$shem."' LIMIT 0,1" );

$rows[ 'template' ] = str_replace( "{%charset%}", $config[ 'charset' ], $rows[ 'template' ] );
$rows[ 'template' ] = str_replace( "{%title%}", $titles, $rows[ 'template' ] );
$rows[ 'template' ] = str_replace( "{%content%}", $message, $rows[ 'template' ] );
$rows[ 'template' ] = str_replace( "{%username%}", $avtor, $rows[ 'template' ] );
$rows[ 'template' ] = str_replace( "{%date%}", $times, $rows[ 'template' ] );
$rows[ 'template' ] = str_replace( "{%category%}", $categor, $rows[ 'template' ] );
$rows[ 'template' ] = str_replace( "{%link%}", $link, $rows[ 'template' ] );

 /*(!$deletes){
$rows[ 'template' ] = preg_replace ( "'\\[delet\\](.+?)\\[/delet\\]'si", '',$rows[ 'template' ] );
}else{
$rows[ 'template' ] = preg_replace ( "'\\{%no-delet\\%}(.+?)\\{%/no-delet\\%}'si", '',$rows[ 'template' ] );	
}
$rows[ 'template' ] = str_replace( "{%delet%}", $link, $rows[ 'template' ] );
$rows[ 'template' ] = str_replace( "{%/delet%}", $link, $rows[ 'template' ] );
$rows[ 'template' ] = str_replace( "{%no-delet%}", $link, $rows[ 'template' ] );
$rows[ 'template' ] = str_replace( "{%/no-delet%}", $link, $rows[ 'template' ] );*/

$titles = str_replace( array( '&amp;', '&quot;', '&#039;' ), array( '&', '"', "'" ), $titles );
//$message = str_replace( "\\\", "", $message );
$message = stripslashes( $rows[ 'template' ] );

//echo $message;

include_once( DLEPlugins::Check( ENGINE_DIR . '/classes/mail.class.php' ) );
$mail = new dle_mail( $config, true );
//$mail->keepalive = true;


$i = 0;
$t = 0;
$h_mail = array();
$bcc = array();

$db->query( "SELECT email FROM " . USERPREFIX . "_users" . $where . " ORDER BY user_id DESC" );

//$db->close();

while ( $row2 = $db->get_row() ) {
  // echo $row2[ 'email' ]; 
  if ( $i == 0 ) {
    $h_mail[ $t ] = $row2[ 'email' ];
  } else {
    $bcc[ $t ][] = $row2[ 'email' ];
  }

  $i++;

  if ( $i == 6 ) {
    $i = 0;
    $t++;
  }

  $step++;
}

//$db->free();

foreach ( $h_mail as $key => $email ) {
  $mail->html_mail = true;
  $mail->bcc = $bcc[ $key ];
  $mail->send( $email, $tema, $message );
}


?>