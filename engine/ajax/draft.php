<?php
if ( !defined( 'DATALIFEENGINE' ) ) {
    header( "HTTP/1.1 403 Forbidden" );
    header( 'Location: ../../' );
    die( "Hacking attempt!" );
  }
  
  $allow_addnews = true;
  
  include_once( DLEPlugins::Check( ENGINE_DIR . '/classes/parse.class.php' ) );
  $parse = new ParseFilter();
  
  $id = $_POST[ 'news_id' ];
  $autor = $_POST[ 'author' ];
  $text = $_POST[ 'body' ];
  $text  = $db->safesql( $parse->BB_Parse( $parse->process($_POST[ 'body' ] ) ) );
  
  $sql = "INSERT INTO dle_draft " .
  "(id,user,full) " .
  "VALUES ({$id},'{$autor}','{$text}')" .
  "ON DUPLICATE KEY UPDATE full = '{$text}'";

  $db->query($sql);
 
?>