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
define( 'ENGINE_DIR', '..' );

if(isset($_GET['project'])) {
  $dbname = 'bz_'.$_GET['project'];
}else{
  $dbname = 'bz_admin';
}

//include ENGINE_DIR . '/data/config.php';

require_once ENGINE_DIR . '/classes/mysql.php';
require_once ENGINE_DIR . '/classes/templates.class.php';
require_once ENGINE_DIR . '/data/dbconfig.php';
require_once ENGINE_DIR . '/modules/functions.php';
//require_once ENGINE_DIR . '/modules/sitelogin.php';
//require_once ROOT_DIR . '/language/' . $config[ 'langs' ] . '/website.lng';
//require_once( DLEPlugins::Check( ENGINE_DIR . '/modules/functions.php' ) );
include_once( DLEPlugins::Check( ENGINE_DIR . '/classes/parse.class.php' ) );
$parse = new ParseFilter();

//$db->free();
$db->connect(DBUSER, DBPASS, 'hv_app', DBHOST);

$db2 = new db;

$db2->connect(DBUSER, DBPASS, $dbname, DBHOST);
//$baza = $_GET['project'];
//$db2-> connect(DBUSER, DBPASS, 'bz_'.$baza, DBHOST);

$comand = $_POST['comand'];

if ($comand=='edit'){
   // $template = $_POST[ 'template' ];
   $app = $_POST['app'];
   $template = $db->safesql( $parse->process( $_POST[ 'template' ], false )  );
    //$template = $db->safesql( $parse->BB_Parse( $parse->process( $template ) ) );
  //  $template = str_replace( "\r\n\r\n", "\n", $_POST[ 'template' ] );
   // $template = addslashes($_POST[ 'template' ]);
   $row = $db2->super_query( "SELECT template FROM " . PREFIX . "_static WHERE name = '$app'" );
  $templ = $row['template'];
   $added_time = time();
   $thistime = date( "Y-m-d H:i:s", $added_time );
   $autor = $member_id['name'];
   if ($autor==""){$autor="APP";}

   $db->query( "INSERT INTO hvtemplateshistory (data, template, user) values ('$thistime', '$templ', '$autor' )");

    $db2->query( "UPDATE " . PREFIX . "_static SET template='{$template}' WHERE name = '$app'" );

    echo "Ok";
}
if ($comand=='titleedit'){
  $app = $_POST['app'];
  $title = $_POST['title'];
  $db2->query( "UPDATE " . PREFIX . "_static SET descr='{$title}' WHERE name = '$app'" );
    echo "Ok";
}

if ($comand=='open'){
  $app = $_POST['app'];
    $row = $db2->super_query( "SELECT template, descr FROM " . PREFIX . "_static WHERE name = '$app'" );
    $template = stripslashes( $row['template'] );
    $template = preg_replace( '#(\A[\s]*<br[^>]*>[\s]*|<br[^>]*>[\s]*\Z)#is', '', $template );
    echo  '<h1 class="title">'.$row["descr"].'</h1>'.$template;
}

if ($comand=='imagesdir'){
    $wimage = "";
    $fimg = "";
    $path = "../../templates/cherapp/CherApp/images/Set/"; // задаем путь до сканируемой папки с изображениями
    $path2 = "CherApp/images/Set/";
    $images = scandir($path); // сканируем папку
    if ($images !== false) { // если нет ошибок при сканировании
    $images = preg_grep("/\.(?:png|gif|jpe?g)$/i", $images); // через регулярку создаем массив только изображений
    if (is_array($images)) { // если изображения найдены
    foreach($images as $image) { // делаем проход по массиву
    $fimg .= "<img src='".$path2.htmlspecialchars(urlencode($image))."' alt='".$image."' />";
  }
    $wimage .= $fimg;
    
} else { // иначе, если нет изображений
    $wimage .= "<div style='text-align:center'>Не обнаружено изображений в директории!</div>\n";
    }
  } else { // иначе, если директория пуста или произошла ошибка
    $wimage .= "<div style='text-align:center'>Директория пуста или произошла ошибка при сканировании.</div>";
}
    echo $wimage; // выводим полученный результат    
}

if ($comand=='LoadTemplate'){
  $row = $db->query( "SELECT Name FROM hvtemplates" );
  while ( $row = $db->get_row() ) {
    $html .= '<tr><td>'.$row['Name'].'</td></tr>';
  };
  $html = '<tr><th>Наименование</th></tr>'.$html;
  echo $html;
}

if ($comand=='PoluchTemplate'){
  $Name = $_POST['Name'];
  $row = $db->super_query( "SELECT Template FROM hvtemplates WHERE Name = '".$Name."' ORDER BY id" );
  $template = stripslashes( $row['Template'] );
  $template = preg_replace( '#(\A[\s]*<br[^>]*>[\s]*|<br[^>]*>[\s]*\Z)#is', '', $template );

  echo $template;
}

if ($comand=='SaveTemplate'){
  $Name = $_POST['Name'];
  $Template = $_POST['Template'];
  $Replac = $_POST['Replac'];
  $row = $db->super_query( "SELECT count(Name) as con FROM hvtemplates WHERE Name = '".$Name."'");

  if (($Replac=='no') && ($row[ 'con' ] > 0 )){
    $html = '<span>Шаблон - ('.$Name.') существует в базе. <a href="#" onClick=SaveSablon("da");$(this).parent().remove();return;>Перезаписать?</a></span>';
    echo 'es'.$html;
  }else{
    $template = $db->safesql( $parse->process( $Template, false )  );
    if ($Replac=='da'){
      $db->query( "UPDATE hvtemplates SET template='{$template}' WHERE Name = '".$Name."'" );
      echo "Ok";
    }else{
      $db->query( "INSERT INTO hvtemplates (name, template) VALUES ('{$Name}','{$Template}')" );
      echo "Ok";
    }
  }
  
}

if ($comand=='DeleteTemplate'){
  $Name = $_POST['Name'];
  $db->query( "DELETE FROM hvtemplates WHERE Name = '".$Name."'" );
  echo 'OkУдалено!';
}

if ($comand=='EditTemplate'){
  $Name = $_POST['Name'];
  $NameNew = $_POST['NameNew']; 
  $db->query( "UPDATE hvtemplates SET Name='{$NameNew}' WHERE Name = '".$Name."'" );
  echo "OkИмя шаблона изменено!";
}

if ($comand=='CreateAjax'){
  $baza = $_POST['baza'];
  $tabl = $_POST['tabl'];
  $column = $_POST['column']; 
  $thistime = date( "Y-m-d H:i:s", time() );
  if (strpos(strtoupper($tabl),strtoupper('hv'))>-1){
    $db3 = new db;
    $db3->connect(DBUSER, DBPASS, $baza, DBHOST);
  $db3->query("INSERT INTO $tabl SET $column='', data = '$thistime' " );
  $id = $db3->insert_id();
  $db3->free();
  echo "Ok".$id;
  }else 
    echo 'Er<span style="color:red"><b>Запрещено создавать индекс не в таблицах Hv!</span>';
}

if ($comand=='LoadAjax'){
  $baza = $_POST['baza'];
  $tabl = $_POST['tabl'];
  $column = $_POST['column']; 
  $id = $_POST['id']; 
  $index = $_POST['index'];
  if ($index==-1) $index = '';
  $db3 = new db;
  $db3->connect(DBUSER, DBPASS, $baza, DBHOST);
  $row = $db3->super_query("SELECT $column FROM $tabl WHERE id = $id " );
  $db3->free();
  $template = stripslashes( $row[$column] );
  $template = preg_replace( '#(\A[\s]*<br[^>]*>[\s]*|<br[^>]*>[\s]*\Z)#is', '', $template );
  echo "Ok".$index."|".$template;
}

if ($comand=='SaveAjax'){
  $baza = $_POST['baza'];
  $tabl = $_POST['tabl'];
  $column = $_POST['column']; 
  $id = $_POST['id']; 
  $template= $_POST['template'];
  $db3 = new db;
  $template = $db3->safesql( $parse->process( $template, false )  );
  $db3->connect(DBUSER, DBPASS, $baza, DBHOST);
  //$db3->super_query("SELECT $column FROM $tabl WHERE id = $id " );
  $db3->query( "UPDATE $tabl SET $column='{$template}' WHERE id = $id ");
  $db3->free();
  echo "Ok";
}

$db->free();
$db2->free();



