<?php

header('Content-type: text/html');
header('Access-Control-Allow-Origin: *');
@session_start();
@error_reporting( E_ALL ^ E_WARNING ^ E_NOTICE );
@ini_set( 'display_errors', true );
@ini_set( 'html_errors', false );
@ini_set( 'error_reporting', E_ALL ^ E_WARNING ^ E_NOTICE );

define( 'DATALIFEENGINE', true );
define( 'ROOT_DIR', '../..' );
define( 'ENGINE_DIR', '../engine' );

include ENGINE_DIR . '/data/config.php';


require_once ENGINE_DIR . '/classes/plugins.class.php';
require_once ENGINE_DIR . '/classes/mysql.php';
require_once ENGINE_DIR . '/data/dbconfig.php';
require_once ENGINE_DIR . '/modules/functions.php';
require_once ENGINE_DIR . '/modules/sitelogin.php';


require_once( DLEPlugins::Check( ENGINE_DIR . '/modules/functions.php' ) );
include_once( DLEPlugins::Check( ENGINE_DIR . '/classes/parse.class.php' ) );
$parse = new ParseFilter();

if (empty($member_id)){
    $homepage = file_get_contents('client/login.html');
    echo $homepage;
}else{
    $home = file_get_contents('client/index.html');
    $home = str_replace('%username%',$member_id['fullname'],$home);
    $home = str_replace('%userlogin%',$member_id['name'],$home);
    /*if ($member_id['foto']){
        $foto = $config[ 'http_home_url' ] . "uploads/fotos/" . $member_id[ 'foto' ];
    }else{
        $foto = 'client/images/noavatar.png';
    }*/
    if ( $member_id[ 'foto' ] ) {

        if ( strpos( $member_id[ 'foto' ], "//" ) === 0 )$avatar = "http:" . $member_id[ 'foto' ];
        else $avatar = $member_id[ 'foto' ];
  
        $avatar = @parse_url( $avatar );
  
        if ( $avatar[ 'host' ] ) {
  
            $foto = $member_id[ 'foto' ] ;
  
        } else $foto = $config[ 'http_home_url' ] . "uploads/fotos/" . $member_id[ 'foto' ] ;
  
        unset( $avatar );
  
      } else $foto = $config[ 'http_home_url' ] ."templates/Default/dleimages/noavatar.png";

    $home = str_replace('%foto%',$foto,$home);
    echo $home;
}