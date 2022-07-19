<?php
if ( !defined( 'DATALIFEENGINE' ) ) {
  header( "HTTP/1.1 403 Forbidden" );
  header( 'Location: ../../' );
  die( "Hacking attempt!" );
}

//$tpl->load_template('tagscloud.tpl');
$db2 = new db;

if ($id_bz==""){
if ($_GET['newsid']!="")
$ids = $_GET['newsid'];
	else
		if  ($_GET['id']!="")
			$ids = $_GET['id'];
if ($ids!="")
$idr = $ids;
$sqls = "SELECT id FROM dle_post_arhiv WHERE ids = {$idr}";
$result2 = $db2->super_query( $sqls );

$id_bz = $result2[ 'id' ];
} 

$sqls = "SELECT id, autor, date, approve, title FROM dle_post WHERE id = {$id_bz}";
$result2 = $db2->super_query( $sqls );

$fullname = $db_gl->super_query("SELECT fullname FROM dle_users WHERE name ='{$result2['autor']}'")['fullname'];

$tex = array();

if (isset($_COOKIE['dbname']))
$prjlink = '&project=' . $_COOKIE['dbname'];
else
$prjlink = '';

$link = $config[ 'http_home_url' ] . "index.php?newsid=" . $result2[ 'id' ].$prjlink;


if ( !$result2[ 'approve' ] ) {
  $approv = '<img class="iconapphis" src="images/noavialabl.png" width="16" height="16"/>';
} else
  $approv = '<img class="iconapphis" src="images/vcsnormal.png" width="16" height="16"/>';

$tex[] = "<div class='divhis'><table class='tablehis'>";

$dat = date("d.m.Y H:i",strtotime($result2['date']));

if ($_GET['stroka']!='ok')
	$prosmotrbol = false;

if ($_GET['do']=='editbz') $sel = "_blank"; else $sel = "_self";

if ($result2['id']==$_GET['cluck']) $cls = "trhisactive";else $cls = "";
if ($prosmotrbol){
$tex[] = "<tr onclick='window.open(\"{$link}&stroka=ok&cluck={$result2['id']}\",\"_self\");' class='trhis titleModal light {$cls}' title='{$result2['title']}' valign='center' data-placement='left'><td class='tdhis'>{$approv}</td><td class='tdhis'>{$dat}</td><td class='tdhis'>{$fullname}</td></tr></table></div>";	
}else {
$tex[] = "<tr onclick='window.open(\"{$link}&cluck={$result2['id']}\",\"{$sel}\");' class='trhis titleModal light {$cls}' title='{$result2['title']}' valign='center' data-placement='left'><td class='tdhis'>{$approv}</td><td class='tdhis'>{$dat}</td><td class='tdhis'>{$fullname}</td></tr></table></div>";
}

$sqls = "SELECT ids, autor, date, title, approve FROM dle_post_arhiv WHERE id = {$id_bz} ORDER BY date DESC";//AND NOT ids = {$idr}
$result2 = $db2->query( $sqls );
//$result2 = $db2->super_query($sqls);
 if ($result2) {
	 $tex[]="<div class='divhisur'><table class='tablehis'>";
	 $est = true;
 }

 if (isset($_COOKIE['dbname']))
$prjlink = '&project=' . $_COOKIE['dbname'];
else
$prjlink = '';
		  
while ( $rows3 = $db2->get_row( $result2 ) ) {
  $link = $config[ 'http_home_url' ] . "index.php?newsid=" . $rows3[ 'ids' ].$prjlink."&vivid=ok";
	//$rows3[ 'approve' ] = true;
  if ( !$rows3[ 'approve' ] ) {
    $approv = '<img class="iconapphis" src="images/noavialabl.png" width="16" height="16"/>';
  } else
    $approv = '<img class="iconapphis" src="images/history.png" width="16" height="16"/>';
	$dat = date("d.m.Y H:i",strtotime($rows3['date']));
	if ($rows3['ids']==$_GET['cluck']) $cls = "trhisactive";else $cls = "";

  $fullname = $db_gl->super_query("SELECT fullname FROM dle_users WHERE name ='{$rows3['autor']}'")['fullname'];

if ($prosmotrbol){
	$tex[] = "<tr onclick='window.open(\"{$link}&stroka=ok&cluck={$rows3['ids']}\",\"_self\");' class='trhis titleModal light {$cls}' title='{$rows3['title']}' valign='center' data-placement='left'><td class='tdhis'>{$approv}</td><td class='tdhis'>{$dat}</td><td class='tdhis'>{$fullname}</td></tr>";
}else {
  $tex[] = "<tr onclick='window.open(\"{$link}&cluck={$rows3['ids']}\",\"{$sel}\");' class='trhis titleModal light {$cls}' title='{$rows3['title']}' valign='center' data-placement='left'><td class='tdhis'>{$approv}</td><td class='tdhis'>{$dat}</td><td class='tdhis'>{$fullname}</td></tr>";
}
}
if ($est)
$tex[] = "</table></div>";

$tpl->result[ 'history' ] = join( $tex );


?>