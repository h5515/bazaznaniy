<?php
if (!defined('DATALIFEENGINE') or !defined('LOGGED_IN')) {
  header("HTTP/1.1 403 Forbidden");
  header('Location: ../../');
  die("Hacking attempt!");
}


function clear_html( $txt ) {

	if(!$txt) return;

	$find = array ('/data:/i','/about:/i','/vbscript:/i','/onclick/i','/onload/i','/onunload/i','/onabort/i','/onerror/i','/onblur/i','/onchange/i','/onfocus/i','/onreset/i','/onsubmit/i','/ondblclick/i','/onkeydown/i','/onkeypress/i','/onkeyup/i','/onmousedown/i','/onmouseup/i','/onmouseover/i','/onmouseout/i','/onselect/i','/javascript/i','/onmouseenter/i','/onwheel/i','/onshow/i','/onafterprint/i','/onbeforeprint/i','/onbeforeunload/i','/onhashchange/i','/onmessage/i','/ononline/i','/onoffline/i','/onpagehide/i','/onpageshow/i','/onpopstate/i','/onresize/i','/onstorage/i','/oncontextmenu/i','/oninvalid/i','/oninput/i','/onsearch/i','/ondrag/i','/ondragend/i','/ondragenter/i','/ondragleave/i','/ondragover/i','/ondragstart/i','/ondrop/i','/onmousemove/i','/onmousewheel/i','/onscroll/i','/oncopy/i','/oncut/i','/onpaste/i','/oncanplay/i','/oncanplaythrough/i','/oncuechange/i','/ondurationchange/i','/onemptied/i','/onended/i','/onloadeddata/i','/onloadedmetadata/i','/onloadstart/i','/onpause/i','/onprogress/i',	'/onratechange/i','/onseeked/i','/onseeking/i','/onstalled/i','/onsuspend/i','/ontimeupdate/i','/onvolumechange/i','/onwaiting/i','/ontoggle/i');
	$replace = array ("d&#1072;ta:", "&#1072;bout:", "vbscript<b></b>:", "&#111;nclick", "&#111;nload", "&#111;nunload", "&#111;nabort", "&#111;nerror", "&#111;nblur", "&#111;nchange", "&#111;nfocus", "&#111;nreset", "&#111;nsubmit", "&#111;ndblclick", "&#111;nkeydown", "&#111;nkeypress", "&#111;nkeyup", "&#111;nmousedown", "&#111;nmouseup", "&#111;nmouseover", "&#111;nmouseout", "&#111;nselect", "j&#1072;vascript", '&#111;nmouseenter', '&#111;nwheel', '&#111;nshow', '&#111;nafterprint','&#111;nbeforeprint','&#111;nbeforeunload','&#111;nhashchange','&#111;nmessage','&#111;nonline','&#111;noffline','&#111;npagehide','&#111;npageshow','&#111;npopstate','&#111;nresize','&#111;nstorage','&#111;ncontextmenu','&#111;ninvalid','&#111;ninput','&#111;nsearch','&#111;ndrag','&#111;ndragend','&#111;ndragenter','&#111;ndragleave','&#111;ndragover','&#111;ndragstart','&#111;ndrop','&#111;nmousemove','&#111;nmousewheel','&#111;nscroll','&#111;ncopy','&#111;ncut','&#111;npaste','&#111;ncanplay','&#111;ncanplaythrough','&#111;ncuechange','&#111;ndurationchange','&#111;nemptied','&#111;nended','&#111;nloadeddata','&#111;nloadedmetadata','&#111;nloadstart','&#111;npause','&#111;nprogress',	'&#111;nratechange','&#111;nseeked','&#111;nseeking','&#111;nstalled','&#111;nsuspend','&#111;ntimeupdate','&#111;nvolumechange','&#111;nwaiting','&#111;ntoggle');

	$txt = preg_replace( $find, $replace, $txt );
	$txt = preg_replace( "#<iframe#i", "&lt;iframe", $txt );
	$txt = preg_replace( "#<script#i", "&lt;script", $txt );
	$txt = str_replace( "<?", "&lt;?", $txt );
	$txt = str_replace( "?>", "?&gt;", $txt );

	return $txt;

}

if( $action == "delok" ) {
  if( $_REQUEST['user_hash'] == "" or $_REQUEST['user_hash'] != $dle_login_hash ) {		
		die( "Hacking attempt! User not found" );	
	}
	
	if( !check_referer($_SERVER['PHP_SELF']."?mod=appproject") ) {
		msg( "error", $lang['index_denied'], $lang['no_referer'], "javascript:history.go(-1)" );
	}

  $id = intval( $_REQUEST['id'] );
  $bzdel = $_REQUEST['bzdel']=='ДА';
  $row = $db->super_query("SELECT *, count(Name) as count FROM " . USERPREFIX . "_project WHERE id='{$id}'");
  $db->query( "DELETE FROM " . USERPREFIX . "_project WHERE id = '{$id}'" );

  if ($bzdel){
  $sql = 'DROP DATABASE IF EXISTS bz_'.$row['Project'];
  $db->query($sql);
  }

  header('Location: ?mod=appproject');
  die();

}elseif( $action == "del" ) {
  if( $_REQUEST['user_hash'] == "" or $_REQUEST['user_hash'] != $dle_login_hash ) {		
		die( "Hacking attempt! User not found" );	
	}
	
	if( !check_referer($_SERVER['PHP_SELF']."?mod=appproject") ) {
		msg( "error", $lang['index_denied'], $lang['no_referer'], "javascript:history.go(-1)" );
	}
  $id = intval( $_REQUEST['id'] );

  $row = $db->super_query("SELECT *, count(Name) as count FROM " . USERPREFIX . "_project WHERE id='{$id}'");
  if ($row['count']<1){
    msg( "error", 'Ошибка', 'Проект с ID - <b>'.$id.'</b> не найден', "javascript:history.go(-1)" );
  }

  msg( "info", $lang['all_info'], "<form action=\"?mod=appproject&action=delok\" method=\"post\">Точно удалить проект <b>{$row['Name']}</b>?&nbsp;<br><br><input type=\"hidden\" name=\"user_hash\" value=\"{$dle_login_hash}\" /><input type=\"hidden\" name=\"id\" value=\"{$id}\" />
  Удалить базу данных <b>bz_{$row['Project']}</b>?&nbsp;&nbsp;&nbsp;<select style=\"text-align:center\" class=\"uniform\" name=\"bzdel\" ><option>ДА</option><option SELECTED>НЕТ</option></select>
   <input  class=\"btn bg-brown-600 btn-sm btn-raised position-right\" type=\"submit\" value=\"Да\"></form>", "?mod=appproject" );
  
  die();

}elseif ($action == "add") {
  $p_name = $db->safesql( trim( clear_html($_REQUEST['project_name']) ) );
  $p_baze = $db->safesql( trim( clear_html($_REQUEST['bd_name']) ) );

  $row = $db->super_query("SELECT count(Name) as count FROM " . USERPREFIX . "_project WHERE Name='{$p_name}'");
  if ($row['count']>0){
    msg( "error", 'Ошибка', 'Имя проекта - <b>'.$p_name.'</b> уже существует', "javascript:history.go(-1)" );
  }
  $row = $db->super_query("SELECT count(Project) as count FROM " . USERPREFIX . "_project WHERE Project='{$p_baze}'");
  if ($row['count']>0){
    msg( "error", 'Ошибка', 'База данных - <b>'.$p_baze.'</b> уже существует', "javascript:history.go(-1)" );
  }
  
 
  $sql = 'CREATE DATABASE bz_'.$p_baze;    
  $db->query($sql);

  $db2 = new db;
  $db2->connect(DBUSER, DBPASS, 'bz_'.$p_baze, DBHOST);
  $filename = 'engine/data/bd_install.sql';
  $templine = '';
  $lines = file($filename);
  foreach ($lines as $line)
  {
  if (substr($line, 0, 2) == '--' || $line == '')
    continue;
  $templine .= $line;
  if (substr(trim($line), -1, 1) == ';'){
    $db2->query(($templine));
    $templine = '';
    }
  }
  $p_baze = strtolower($p_baze);
  $sql = "INSERT INTO " . USERPREFIX . "_category (Name, alt_name, posi) value ('{$p_name}','{$p_baze}',1)";
  $db2->query($sql);
  $row[ 'id' ] = $db2->insert_id();
  $db2->free();

  $db->query("INSERT INTO " . USERPREFIX . "_project (Name, Project,id_cat) 
  values ('{$p_name}','{$p_baze}', {$row['id']})");

 // require_once ENGINE_DIR . '/data/dbconfig.php';
  header('Location: ?mod=appproject');
  die();

}elseif ($action == "addedit") {
  $p_name = $db->safesql( trim( clear_html($_REQUEST['project_name']) ) );
  $id = $_REQUEST['id'];
  $row = $db->super_query("SELECT count(Name) as count FROM " . USERPREFIX . "_project WHERE id='{$id}'");
  if ($row['count']<1){
    msg( "error", 'Ошибка', 'Проект с ID - <b>'.$id.'</b> не найден', "javascript:history.go(-1)" );
  }
  $db->query( "UPDATE " . USERPREFIX . "_project set Name='{$p_name}' WHERE id='{$id}'" );
  header('Location: ?mod=appproject');
  die();
}elseif ($action == "addproject"||$action == "edit") {

  if ($action == "addproject"){
    $submit_value = 'Создать проект';
    $form_action = "?mod=appproject&amp;action=add";
  }
  else{
    $submit_value = 'Изменить проект';
    $form_action = "?mod=appproject&amp;action=addedit";
  }

    $p_name = '';
    $p_baze = '';
    $disab = '';
  if (isset($_REQUEST['id'])){
    $id = $_REQUEST['id'];
    $disab = 'disabled';
    $row = $db->super_query("SELECT *, count(name) as count FROM " . USERPREFIX . "_project WHERE id='{$id}'");
    if ($row['count']<1){
      msg( "error", 'Ошибка', 'Проект - <b>'.$id.'</b> не найден в базе данных.', "javascript:history.go(-1)" );
    }
    $p_name = $db->safesql( trim( clear_html($row['Name']) ) );
    $p_baze = $db->safesql( trim( clear_html($row['Project']) ) );
  }

  
  echoheader("<i class=\"fa fa-id-card-o position-left\"></i><span class=\"text-semibold\">Проекты</span>", 'Управление проектами');
  echo <<<HTML
  <form action="{$form_action}" method="post" class="systemsettings">
  <input type="hidden" name="user_hash" value="" />
  <input type="hidden" name="id" value="{$id}" />
  <div class="panel panel-default">
  <table class="table table-striped">
  <tr>
    <td style="width:58%"><h6 class="media-heading text-semibold">Название проекта</h6><span class="text-muted text-size-small hidden-xs">Краткое название проекта не более 30 символов.</span></td>
    <td style="width:42%"><input type="text" class="form-control" name="project_name" minlength="2" value="{$p_name}" required></td>
  </tr>
  <tr>
    <td><h6 class="media-heading text-semibold">Имя базы данных</h6><span class="text-muted text-size-small hidden-xs">Только латиница.</span></td>
    <td><input type="text" class="form-control" name="bd_name" minlength="2" value="{$p_baze}" {$disab} required></td>
  </tr>
  <tr>
    <td><h6 class="media-heading text-semibold">Иконка</h6><span class="text-muted text-size-small hidden-xs">Иконка редактируется в главной категории проекта.</span></td>
    <td></td>
  </tr>
  
  </table>
  </div>
  <div class="mb-20">
	  <button type="submit" class="btn bg-teal btn-raised position-left"><i class="fa fa-floppy-o position-left"></i>{$submit_value}</button>
  </div>
  </form>  
HTML;
if (!$disab){
    echo <<<HTML
  <script>
  function rus_to_latin ( str ) {
    
    var ru = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 
        'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i', 
        'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 
        'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 
        'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya', ' ': '_'
    }, n_str = [];
    
    str = str.replace(/[ъь]+/g, '').replace(/й/g, 'i');
    
    for ( var i = 0; i < str.length; ++i ) {
       n_str.push(
              ru[ str[i] ]
           || ru[ str[i].toLowerCase() ] == undefined && str[i]
           || ru[ str[i].toLowerCase() ].toUpperCase()
       );
    }
    
    return n_str.join('');
}
    $('[name=project_name]').on('input',function(){
      $('[name=bd_name]').val(rus_to_latin($(this).val()));
    })
  </script>
HTML;
 }
echofooter();

} 

if (($action == "")) {
  echoheader("<i class=\"fa fa-id-card-o position-left\"></i><span class=\"text-semibold\">Проекты</span>", 'Управление проектами');
  $row = $db->query("SELECT Name, id, count(*) as count FROM " . USERPREFIX . "_project GROUP BY name");
  $entries = "";

  while ($row = $db->get_row()) {


    $dlink = "<li><a href=\"?mod=appproject&action=del&user_hash={$dle_login_hash}&id={$row['id']}\"><i class=\"fa fa-trash-o position-left text-danger\"></i>'Удалить'</a></li>";

    $menu_link = <<<HTML
    <div class="btn-group">
      <a href="#" class="dropdown-toggle nocolor" data-toggle="dropdown" aria-expanded="true"><i class="fa fa-bars"></i><span class="caret"></span></a>
      <ul class="dropdown-menu text-left dropdown-menu-right">
        <li><a href="?mod=appproject&action=edit&id={$row['id']}"><i class="fa fa-pencil-square-o position-left"></i>{$lang['group_sel1']}</a></li>
        <li class="divider"></li>
        {$dlink}
      </ul>
    </div>
HTML;

    $entries .= "
    <tr>
    <td class=\"cursor-pointer\" onclick=\"document.location = '?mod=appproject&action=edit&id={$row['id']}'; return false;\">{$row['id']}</td>
    <td class=\"cursor-pointer\" onclick=\"document.location = '?mod=appproject&action=edit&id={$row['id']}'; return false;\">{$row['Name']}</td>
    <td>{$menu_link}</td>
    </tr>";
  }
  $db->free();
  echo <<<HTML
<div class="panel panel-default">
<div class="panel-heading">
Список проектов
</div>

<table class="table table-xs table-hover">
  <thead>
  <tr>
    <th style="width: 60px">ID</th>
    <th>Название проекта</th>
    <th style="width: 70px"></th>
  </tr>
  </thead>
  <tbody>
    {$entries}
  </tbody>
</table>

<div class="panel-footer">
    <button class="btn bg-teal btn-sm btn-raised" type="button" onclick="document.location='?mod=appproject&action=addproject'"><i class="fa fa-plus-circle position-left"></i>Новый проект</button>
</div>	

</div>	
HTML;
echofooter(); 
}

