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
*/

@ob_start ();
@ob_implicit_flush (0);

@error_reporting ( E_ALL ^ E_WARNING ^ E_DEPRECATED ^ E_NOTICE );
@ini_set ( 'error_reporting', E_ALL ^ E_WARNING ^ E_DEPRECATED ^ E_NOTICE );

@ini_set ( 'display_errors', true );
@ini_set ( 'html_errors', false );
 
define ( 'DATALIFEENGINE', true );
define ( 'ROOT_DIR', dirname ( __FILE__ ) );
define ( 'ENGINE_DIR', ROOT_DIR . '/engine' );

/*if(isset($_GET['project'])) {
    $_SESSION['dbname'] = $_GET['project'];
}*/

/*if(isset($_GET['project'])) {
    set_cookies("dbname", $_GET['project'], 365);
      $_COOKIE['dbname'] = $_GET['project'];
  }else{
    set_cookies("dbname", '', 0);
      unset($_COOKIE['dbname']);
  }*/

//require_once (ENGINE_DIR . '/classes/plugins.class.php');

if(isset($_GET['stroka'])) {
    $man = true;
} else {
    $man = false;
}

$content=false;
if(isset($_GET['content'])){
    if ($_GET['content']=="ok"){
        $content=true;
    }
}

//echo ($_GET['vivid']."--112233<br>");
$vdt = 0; 

if(isset($_GET['vivid'])){
 if ($_GET['vivid']=="ok"){
     $vdt = 1;
 }
} 

if ($man){
require_once (ROOT_DIR . '/engine/init2.php');
} else 
require_once (ROOT_DIR . '/engine/init.php');    
//require_once ROOT_DIR . '/engine/init.php';


?>