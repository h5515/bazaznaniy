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
 File: shortsite.php
-----------------------------------------------------
 Use: WYSIWYG for news at website 
=====================================================
*/

if (!defined('DATALIFEENGINE')) {
	header("HTTP/1.1 403 Forbidden");
	header('Location: ../../');
	die("Hacking attempt!");
}

$p_name = urlencode($member_id['name']);

if ($config['allow_site_wysiwyg'] == "1") {

	if ($user_group[$member_id['user_group']]['allow_image_upload'] or $user_group[$member_id['user_group']]['allow_file_upload']) {

		$image_upload = "'dleupload',";
		$image_q_upload = ", 'imageUpload'";
	} else {
		$image_upload = "";
		$image_q_upload = "";
	}

	if ($config['bbimages_in_wysiwyg']) {
		$implugin = 'dleimg';
	} else $implugin = 'insertImage';


	//$js_array[] = "engine/skins/codemirror/js/code.js";
	$js_array[] = "engine/editor/jscripts/wswyng/codemirror.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/xml.min.js";

	//	$js_array[] = "engine/editor/jscripts/froala/editor.js";
	//	$js_array[] = "engine/editor/jscripts/froala/languages/{$lang['wysiwyg_language']}.js";
	//	$css_array[] = "engine/editor/jscripts/froala/fonts/font-awesome.css";
	//	$css_array[] = "engine/editor/jscripts/froala/css/editor.css";

	$css_array[] = "engine/editor/jscripts/froala/css/myeditor.css";

	$css_array[] = "engine/editor/jscripts/wswyng/font-awesome.min.css";
	$css_array[] = "engine/editor/jscripts/wswyng/codemirror.min.css";

	$css_array[] = "engine/editor/jscripts/wswyng/css/froala_editor.css";
	$css_array[] = "engine/editor/jscripts/wswyng/css/froala_style.css";
	$css_array[] = "engine/editor/jscripts/wswyng/css/plugins/code_view.css";
	$css_array[] = "engine/editor/jscripts/wswyng/css/plugins/draggable.css";
	$css_array[] = "engine/editor/jscripts/wswyng/css/plugins/colors.css";
	$css_array[] = "engine/editor/jscripts/wswyng/css/plugins/emoticons.css";
	$css_array[] = "engine/editor/jscripts/wswyng/css/plugins/image_manager.css";
	$css_array[] = "engine/editor/jscripts/wswyng/css/plugins/image.css";
	$css_array[] = "engine/editor/jscripts/wswyng/css/plugins/line_breaker.css";
	$css_array[] = "engine/editor/jscripts/wswyng/css/plugins/table.css";
	$css_array[] = "engine/editor/jscripts/wswyng/css/plugins/char_counter.css";
	$css_array[] = "engine/editor/jscripts/wswyng/css/plugins/video.css";
	$css_array[] = "engine/editor/jscripts/wswyng/css/plugins/fullscreen.css";
	$css_array[] = "engine/editor/jscripts/wswyng/css/plugins/file.css";
	$css_array[] = "engine/editor/jscripts/wswyng/css/plugins/quick_insert.css";
	$css_array[] = "engine/editor/jscripts/wswyng/css/plugins/help.css";
	$css_array[] = "engine/editor/jscripts/wswyng/css/plugins/special_characters.css";
	$css_array[] = "engine/editor/jscripts/wswyng/css/third_party/spell_checker.css";

	$js_array[] = "engine/editor/jscripts/wswyng/js/froala_editor.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/align.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/char_counter.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/code_beautifier.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/code_view.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/colors.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/draggable.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/emoticons.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/entities.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/file.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/font_family.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/font_size.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/forms.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/fullscreen.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/help.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/image.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/image_manager.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/inline_class.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/inline_style.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/line_breaker.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/line_height.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/link.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/lists.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/paragraph_format.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/paragraph_style.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/print.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/quick_insert.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/quote.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/save.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/special_characters.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/table.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/url.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/video.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/plugins/word_paste.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/third_party/spell_checker.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/third_party/embedly.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/third_party/font_awesome.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/third_party/image_tui.min.js";
	$js_array[] = "engine/editor/jscripts/wswyng/js/languages/ru.js";

	$js_array[] = "engine/editor/jscripts/wswyng/myeditor.js";
	$js_array[] = "engine/editor/jscripts/wswyng/redact.js";

	if (!$man) {
		$toolbarofset = 50;
	} else {
		$toolbarofset = 0;
	}
	$sql = "SELECT full FROM dle_draft WHERE id = {$id} AND user = '{$p_name}'";
	$his = $db->super_query($sql);

	$prjlink = '';
	if (isset($_COOKIE['dbname']))
	$prjlink = '&project=' . $_COOKIE['dbname'];

	if (isset($his['full'])){
		$history = 'dlehistory';
		$buts = 3;
		$text  = $his['full'];
		$onload_scripts[] = <<<HTML
FroalaEditor.DefineIcon('dlehistory', {
    NAME: 'dle dle-i-dleicon icon-history',
    template: 'dleicons'
});
FroalaEditor.RegisterCommand('dlehistory', {
    title: 'Открыть последнее изменение',
    focus: true,
    undo: true,
    refreshAfterCallback: true,
    callback: function() {
        this.html.set(`{$text}`);
    }
});
HTML;
	}else{
		$history = '';
		$buts = 2;
	}

	$onload_scripts[] = <<<HTML
	toolbarofset = {$toolbarofset};
	p_name = '{$p_name}';
	id = '{$id}';
	maxsize = {$config['max_up_size']};
	logincache= '{$dle_login_hash}';
	platetext = 'Напишите статью...';
	histor = '{$history}';
	buts = {$buts};
	
	ActiveeditorNew('.wysiwygeditor','short_story',150,null, 1500, '$prjlink');
	
HTML;
	/* $onload_scripts[] = <<<HTML
      $('.wysiwygeditor').froalaEditor({
        dle_root: dle_root,
        dle_upload_area : "short_story",
        dle_upload_user : "{$p_name}",
        dle_upload_news : "{$id}",
        width: '100%',
        height: '410',
        language: '{$lang['wysiwyg_language']}',

        imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif', 'webp'],
        imageDefaultWidth: 0,
        imageInsertButtons: ['imageBack', '|', 'imageByURL'{$image_q_upload}],
		imageUploadURL: 'engine/ajax/controller.php?mod=upload',
		imageUploadParam: 'qqfile',
		imageUploadParams: { "subaction" : "upload", "news_id" : "{$id}", "area" : "short_story", "author" : "{$p_name}", "mode" : "quickload", "user_hash" : "{$dle_login_hash}"  },
        imageMaxSize: {$config['max_up_size']} * 1024,


        toolbarButtonsMD: ['bold', 'italic', 'underline', 'strikeThrough', '|', 'align', 'indent', 'outdent', '|', 'subscript', 'superscript', '|', 'insertTable', 'formatOL', 'formatUL', 'insertHR', '|', 'clearFormatting', 'dlecode', '|','html','undo', 'redo', 'fullscreen', '-', 
                         'fontFamily', 'fontSize', '|', 'color', 'paragraphFormat', 'paragraphStyle', '|', 'insertLink', 'dleleech', '|', 'emoticons', '{$implugin}',{$image_upload}'|', 'insertVideo', 'dleaudio', 'dlemedia','|', 'dlehide', 'dlequote', 'dlespoiler','page_dropdown'],

        toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', '|', 'align', 'indent', 'outdent', '|', 'subscript', 'superscript', '|', 'insertTable', 'formatOL', 'formatUL', 'insertHR', '|', 'clearFormatting', 'dlecode', '|', 'html','undo', 'redo', 'fullscreen','-', 
                         'fontFamily', 'fontSize', '|', 'color', 'paragraphFormat', 'paragraphStyle', '|', 'insertLink', 'dleleech', '|', 'emoticons', '{$implugin}',{$image_upload}'|', 'insertVideo', 'dleaudio', 'dlemedia','|', 'dlehide', 'dlequote', 'dlespoiler','page_dropdown']

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
HTML; */

	$shortarea = <<<HTML
<textarea id="short_story" name="short_story" class="wysiwygeditor" style="width:100%;height:200px;">{$row['short_story']}</textarea>
HTML;
} else {


	if ($user_group[$member_id['user_group']]['allow_image_upload'] or $user_group[$member_id['user_group']]['allow_file_upload']) $image_upload = "dleupload ";
	else $image_upload = "";

	if ($config['bbimages_in_wysiwyg']) {
		$implugin = 'dleimage';
	} else $implugin = 'image';

	$js_array[] = "engine/editor/jscripts/tiny_mce/tinymce.min.js";

	$onload_scripts[] = <<<HTML
	
	tinyMCE.baseURL = dle_root + 'engine/editor/jscripts/tiny_mce';
	tinyMCE.suffix = '.min';
	
	tinymce.init({
		selector: 'textarea.wysiwygeditor',
		language : "{$lang['wysiwyg_language']}",
		element_format : 'html',
		width : "100%",
		height : "350",
		theme: "modern",
		plugins: ["advlist autolink lists link image charmap anchor searchreplace visualblocks visualchars fullscreen media nonbreaking table contextmenu emoticons paste textcolor colorpicker codemirror spellchecker dlebutton codesample"],
		relative_urls : false,
		convert_urls : false,
		remove_script_host : false,
		verify_html: false,
		toolbar_items_size: 'small',
		menubar: false,
		branding: false,
		toolbar1: "fontselect fontsizeselect | table | link dleleech unlink | {$image_upload}{$implugin} dleemo dlemp dletube dlaudio | dlehide dlequote dlespoiler codesample dlebreak dlepage code",
		toolbar2: "undo redo | copy paste pastetext | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | subscript superscript | bullist numlist forecolor backcolor spellchecker removeformat",
		formats: {
		  bold: {inline: 'b'},  
		  italic: {inline: 'i'},
		  underline: {inline: 'u', exact : true},  
		  strikethrough: {inline: 's', exact : true}
		},
		codesample_languages: [ {text: 'HTML/JS/CSS', value: 'markup'}],
		spellchecker_language : "ru",
		spellchecker_languages : "Russian=ru,Ukrainian=uk,English=en",
		spellchecker_rpc_url : "https://speller.yandex.net/services/tinyspell",
		image_advtab: true,
		image_caption: true,
		image_dimensions: false,
		dle_root : dle_root,
		dle_upload_area : "short_story",
		dle_upload_user : "{$p_name}",
		dle_upload_news : "{$id}",

		content_css : dle_root+"engine/editor/css/content.css"

	});
HTML;

	$shortarea = <<<HTML
    <textarea id="short_story" name="short_story" class="wysiwygeditor" style="width:98%;height:200px;">{$row['short_story']}</textarea>
HTML;
}
