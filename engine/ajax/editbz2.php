<?php
@session_start();
@error_reporting( E_ALL ^ E_WARNING ^ E_NOTICE );
@ini_set( 'display_errors', true );
@ini_set( 'html_errors', false );
@ini_set( 'error_reporting', E_ALL ^ E_WARNING ^ E_NOTICE );

define( 'DATALIFEENGINE', true );
define( 'ROOT_DIR', '../..' );
define( 'ENGINE_DIR', '..' );

require_once ENGINE_DIR . '/classes/mysql.php';
require_once ENGINE_DIR . '/classes/templates.class.php';
require_once ENGINE_DIR . '/data/dbconfig.php';
require_once ENGINE_DIR . '/modules/functions.php';
require_once ENGINE_DIR . '/modules/sitelogin.php';
require_once ROOT_DIR . '/language/' . $config[ 'langs' ] . '/website.lng';

include ENGINE_DIR . '/data/config.php';


if ( $config[ 'http_home_url' ] == "" ) {

  $config[ 'http_home_url' ] = explode( "engine/ajax/search.php", $_SERVER[ 'PHP_SELF' ] );
  $config[ 'http_home_url' ] = reset( $config[ 'http_home_url' ] );
  $config[ 'http_home_url' ] = "http://" . $_SERVER[ 'HTTP_HOST' ] . $config[ 'http_home_url' ];

}

require_once ENGINE_DIR . '/classes/mysql.php';
require_once ENGINE_DIR . '/classes/templates.class.php';
require_once ENGINE_DIR . '/data/dbconfig.php';
require_once ENGINE_DIR . '/modules/functions.php';
require_once ENGINE_DIR . '/modules/sitelogin.php';
require_once ROOT_DIR . '/language/' . $config[ 'langs' ] . '/website.lng';
if ( !$is_logged )$member_id[ 'user_group' ] = 5;

include_once( DLEPlugins::Check( ENGINE_DIR . '/classes/parse.class.php' ) );

$tpl = new dle_template();

$tpl->dir = ROOT_DIR . '/templates/' . $config[ 'skin' ];
define( 'TEMPLATE_DIR', $tpl->dir );

$idnews = $_POST[ 'idnews' ];

$sql = "SELECT p.id, p.autor, p.date, p.short_story, p.full_story, p.xfields, p.title, p.category, p.alt_name, p.comm_num, p.allow_comm, p.fixed, p.tags, e.news_read, e.allow_rate, e.rating, e.vote_num, e.votes, e.view_edit, e.editdate, e.editor, e.reason FROM " . PREFIX . "_post p LEFT JOIN dle_post_extras e ON (p.id=e.news_id) WHERE id = '$idnews'";

$result = $db->super_query( $sql );
$row = $result;

$db->free();

$tpl->load_template( 'editnews.tpl' );

$tpl->set( '{title}', $row[ 'title' ] );

$categories_list = CategoryNewsSelection( explode( ',', $row[ 'category' ] ), 0 );
$temp_array = explode( ',', $row[ 'category' ] );
$categories_default = array();

foreach ( $temp_array as $element ) {
  $element = intval( trim( $element ) );

  if ( $element > 0 ) {
    $categories_default[] = $element;
  }
}

if ( count( $categories_default ) )$categories_default = htmlspecialchars( implode( ',', $categories_default ), ENT_QUOTES, $config[ 'charset' ] );
else $categories_default = "";

    if ( $categories_default ) {
      $categories_default = "<input type=\"hidden\" name=\"categories_default\" value=\"{$categories_default}\">";
    } else $categories_default = "";
$script .= "<form method=\"post\" name=\"entryform\" id=\"entryform\" onsubmit=\"if(checkxf()=='fail') return false;\" action=\"\">";

 $cats = "<select data-placeholder=\"{$lang['addnews_cat_sel']}\" name=\"catlist[]\" id=\"category\" onchange=\"onCategoryChange(this)\" style=\"width:350px;height:110px;\" multiple=\"multiple\">";

   $cats .= $categories_list;
    $cats .= "</select>";

    $tpl->set( '{category}', $cats );

$tpl->copy_template = $categoryfilter . $script . $tpl->copy_template . $categories_default . "<input type=\"hidden\" name=\"mod\" value=\"addnews\"><input type=\"hidden\" name=\"user_hash\" value=\"{$dle_login_hash}\"></form>";

//include_once( DLEPlugins::Check( ENGINE_DIR . '/inc/xfields.php' ) );
include_once( DLEPlugins::Check( ENGINE_DIR . '/editor/shortsite.php' ) );
 include_once( DLEPlugins::Check( ENGINE_DIR . '/editor/fullsite.php' ) );

require_once (DLEPlugins::Check(ENGINE_DIR . '/classes/parse.class.php'));
$parse = new ParseFilter();

$full_txt = $row['full_story'];
$full_txt = $parse->decodeBBCodes( $full_txt, true, $config['allow_quick_wysiwyg'] );

//$tpl->set( '{fullarea}', $fullarea);

$js_code = <<<HTML
<script>
var text_upload = "$lang[bb_t_up]";


      $('.wysiwygeditor').froalaEditor({
        dle_root: dle_root,
        dle_upload_area : "short_story",
        dle_upload_user : "{$p_name}",
        dle_upload_news : "{$row['id']}",
        width: '100%',
        height: '280',
        zIndex: 9990,
        language: '{$lang['wysiwyg_language']}',

        imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif', 'webp'],
        imageDefaultWidth: 0,
        imageInsertButtons: ['imageBack', '|', 'imageByURL'{$image_q_upload}],
		imageUploadURL: dle_root + 'engine/ajax/controller.php?mod=upload',
		imageUploadParam: 'qqfile',
		imageUploadParams: { "subaction" : "upload", "news_id" : "{$row['id']}", "area" : "short_story", "author" : "{$p_name}", "mode" : "quickload", "user_hash" : "{$dle_login_hash}"},
        imageMaxSize: {$config['max_up_size']} * 1024,
        imagePaste: false,
		
        toolbarButtonsXS: ['bold', 'italic', 'underline', 'strikeThrough', '|', 'align', 'indent', 'outdent', '|', 'subscript', 'superscript', '|', 'insertTable', 'formatOL', 'formatUL', 'insertHR', '|', 'clearFormatting', 'dlecode', '|', 'html', '-', 
                         'fontFamily', 'fontSize', '|', 'color', 'paragraphFormat', 'paragraphStyle', '|', 'insertLink', 'dleleech', '|', 'emoticons', '{$implugin}',{$image_upload}'|', 'insertVideo', 'dleaudio', 'dlemedia','|', 'dlehide', 'dlequote', 'dlespoiler', 'fullscreen'],

						 
        toolbarButtonsSM: ['bold', 'italic', 'underline', 'strikeThrough', '|', 'align', 'indent', 'outdent', '|', 'subscript', 'superscript', '|', 'insertTable', 'formatOL', 'formatUL', 'insertHR', '|', 'clearFormatting', 'dlecode', '|', 'html', '-', 
                         'fontFamily', 'fontSize', '|', 'color', 'paragraphFormat', 'paragraphStyle', '|', 'insertLink', 'dleleech', '|', 'emoticons', '{$implugin}',{$image_upload}'|', 'insertVideo', 'dleaudio', 'dlemedia','|', 'dlehide', 'dlequote', 'dlespoiler', 'fullscreen'],

        toolbarButtonsMD: ['bold', 'italic', 'underline', 'strikeThrough', '|', 'align', 'indent', 'outdent', '|', 'subscript', 'superscript', '|', 'insertTable', 'formatOL', 'formatUL', 'insertHR', '|', 'clearFormatting', 'dlecode', '|', 'html', '-', 
                         'fontFamily', 'fontSize', '|', 'color', 'paragraphFormat', 'paragraphStyle', '|', 'insertLink', 'dleleech', '|', 'emoticons', '{$implugin}',{$image_upload}'|', 'insertVideo', 'dleaudio', 'dlemedia','|', 'dlehide', 'dlequote', 'dlespoiler', 'fullscreen'],

        toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', '|', 'align', 'indent', 'outdent', '|', 'subscript', 'superscript', '|', 'insertTable', 'formatOL', 'formatUL', 'insertHR', '|', 'clearFormatting', 'dlecode', '|', 'html', '-', 
                         'fontFamily', 'fontSize', '|', 'color', 'paragraphFormat', 'paragraphStyle', '|', 'insertLink', 'dleleech', '|', 'emoticons', '{$implugin}',{$image_upload}'|', 'insertVideo', 'dleaudio', 'dlemedia','|', 'dlehide', 'dlequote', 'dlespoiler', 'fullscreen']

      }).on('froalaEditor.image.inserted froalaEditor.image.replaced', function (e, editor, \$img, response) {
	  
			if( response ) {
			
			    response = JSON.parse(response);
			  
			    \$img.removeAttr("data-returnbox").removeAttr("data-success").removeAttr("data-xfvalue").removeAttr("data-flink");

				if(response.flink) {
				  if(\$img.parent().hasClass("highslide")) {
		
					\$img.parent().attr('href', response.flink);
		
				  } else {
		
					\$img.wrap( '<a href="'+response.flink+'" class="highslide"></a>' );
					
				  }
				}
			  
			}
			
		});	
   
   
</script>
HTML;

$params = "onfocus=\"setNewField(this.name, document.ajaxnews{$idnews})\" class=\"wysiwygeditor\""; 

$full_area = <<<HTML
<div class="bb-editor">
<textarea id="full_txt" name="full_txt" {$params}>{$full_txt}</textarea>
</div>
HTML;

$tpl->set( '{fullarea}', $full_area );

$tpl->set( '{js_code}', $js_code);

$tpl->compile( 'editnews' );
echo $tpl->result[ 'editnews' ];

// echo "<p>Привет!!!</p>". $_POST[ 'idnews' ];
?>