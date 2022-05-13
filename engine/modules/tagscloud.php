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
 File: tagscloud.php
-----------------------------------------------------
 Use: tags cloud
=====================================================
*/

if( !defined('DATALIFEENGINE') ) {
	header( "HTTP/1.1 403 Forbidden" );
	header ( 'Location: ../../' );
	die( "Hacking attempt!" );
}

$is_change = false;

if (!$config['allow_cache']) { $config['allow_cache'] = 1; $is_change = true;}

$tpl->result['tags_cloud'] = dle_cache("tagscloud", $config['skin']);

if (!$category_id==''){
	$ids = getSubCatList( $category_id );
	
	$aviable = array();
    $aviable = explode( ',', $ids );
	$catserch = "WHERE category regexp '[[:<:]](" . implode ( '|', $aviable ) . ")[[:>:]]'";
	}

//if ($tpl->result['tags_cloud'] === false) {

	$counts = array();
	$tags = array();
	$list = array();
	$sizes = array( "clouds_xsmall", "clouds_small", "clouds_medium", "clouds_large", "clouds_xlarge" );
	$min   = 1;
	$max   = 1;
	$range = 1;

	$config['tags_number'] = intval($config['tags_number']);
	if ($config['tags_number'] < 1 ) $config['tags_number'] = 10;

	//echo "111 ".$catserch;
	
	$db->query("SELECT tag, category, COUNT(*) AS count FROM " . PREFIX . "_tags $catserch GROUP BY tag ORDER BY tag LIMIT 0,{$config['tags_number']}");

	while($row = $db->get_row()){

		$tags[$row['tag']] = $row['count'];
		$counts[] = $row['count'];

	}
	$db->free();

	if (count($counts)) {
		$min   = min($counts);
		$max   = max($counts);
		$range = ($max-$min);
	}

	if (!$range) $range = 1;

	foreach ($tags as $tag => $value) {

		$list[$tag]['tag']   = $tag;
		$list[$tag]['size']  = $sizes[sprintf("%d", ($value-$min)/$range*4 )];
		$list[$tag]['count']  = $value;
	}

	usort ($list, "compare_tags");
	$tags = array();	

	foreach ($list as $value) {

		if (trim($value['tag']) != "" ) {

			$url_tag = str_replace(array("&#039;", "&quot;", "&amp;"), array("'", '"', "&"), $value['tag']);
		
			if ($config['allow_alt_url'] )
	        	$tags[] = "<span class=\"{$value['size']}\"><a href=\"".$config['http_home_url']."tags/".rawurlencode($url_tag)."/\" title=\"".$lang['tags_count']." ".$value['count']."\">".$value['tag']."</a></span>";
			else{
                if (!$category_id==''){
				$tags[] = "<span class=\"{$value['size']}\"><a href=\"#\" onClick=\"tagsclick('".$value['tag']."',this,$category_id); return false;\" title=\"".$lang['tags_count']." ".$value['count']."\">".$value['tag']."</a></span>";
                } else {
                  $tags[] = "<span class=\"{$value['size']}\"><a href=\"$PHP_SELF?do=tags&amp;tag=".rawurlencode($url_tag)."\" title=\"".$lang['tags_count']." ".$value['count']."\">".$value['tag']."</a></span>";  
                }
            }
               
		}

	}

	$tpl->result['tags_cloud'] = implode(" ", $tags);
    
    $sql = "SELECT COUNT(DISTINCT tag) as count FROM " . PREFIX . "_tags ".$catserch;

	$row = $db->super_query($sql );
 //echo $row['count'];

	if ($row['count'] >= $config['tags_number']) {
		
		if ($config['allow_alt_url'] )
        	$tpl->result['tags_cloud'] .= "<div class=\"tags_more\"><a href=\"".$config['http_home_url']."tags/\">".$lang['all_tags']."</a></div>";
		else{
            if (!$category_id==''){
			$tpl->result['tags_cloud'] .= "<div class=\"tags_more\"><a href=\"#\" onClick=\"AllTag(".$category_id.",'all')\">".$lang['all_tags']."</a></div>";
            } else {
            $tpl->result['tags_cloud'] .= "<div class=\"tags_more\"><a href=\"$PHP_SELF?do=tags\">".$lang['all_tags']."</a></div>";
            }
        }

	}

	create_cache ("tagscloud", $tpl->result['tags_cloud'], $config['skin']);
//}


if ($do == "alltags") {

	if( $config['allow_alt_url'] ) $canonical = $config['http_home_url'] . "tags/"; else $canonical = $PHP_SELF."?do=tags";

	if( $config['allow_alt_url'] AND $config['seo_control'] ) {

		if ( substr ( $_SERVER['REQUEST_URI'], - 1, 1 ) != '/' OR $_GET['cstart'] OR substr ( $_SERVER['REQUEST_URI'], - 2 ) == '//' OR strpos ($_SERVER['REQUEST_URI'], "do=tags" ) !== false) {

			$re_url = explode ( "index.php", strtolower ( $_SERVER['PHP_SELF'] ) );
			$re_url = reset ( $re_url );
				
			$re_url .= "tags/";
			
			header("HTTP/1.0 301 Moved Permanently");
			header("Location: {$re_url}");
			die("Redirect");
		}
	}

	$tpl->result['content'] = dle_cache("alltagscloud", $config['skin']);

	if (!$tpl->result['content']) {

		$tpl->load_template('tagscloud.tpl');

		$counts = array();
		$tags = array();
		$list = array();
		$sizes = array( "clouds_xsmall", "clouds_small", "clouds_medium", "clouds_large", "clouds_xlarge" );
		$min   = 1;
		$max   = 1;
		$range = 1;
		$limit = false;
		
		if ( preg_match( "#\\{tags limit=['\"](.+?)['\"]\\}#i", $tpl->copy_template, $matches ) ) {
			$limit= true;
			$sql_select = "SELECT tag, COUNT(*) AS count FROM " . PREFIX . "_tags $catserch GROUP BY tag ORDER BY tag DESC LIMIT 0,".intval($matches[1]);

		} else $sql_select = "SELECT tag, COUNT(*) AS count FROM " . PREFIX . "_tags $catserch GROUP BY tag";

		$db->query($sql_select);

		while($row = $db->get_row()){

			$tags[$row['tag']] = $row['count'];
			$counts[] = $row['count'];

		}
		$db->free();

		if (count($counts)) {
			$min   = min($counts);
			$max   = max($counts);
			$range = ($max-$min);
		}

		if (!$range) $range = 1;

		foreach ($tags as $tag => $value) {

			$list[$tag]['tag']   = $tag;
			$list[$tag]['size']  = $sizes[sprintf("%d", ($value-$min)/$range*4 )];
			$list[$tag]['count']  = $value;

		}

		usort ($list, "compare_tags");
		$tags = array();	

		foreach ($list as $value) {

			if (trim($value['tag']) != "" ) {

				$url_tag = str_replace(array("&#039;", "&quot;", "&amp;"), array("'", '"', "&"), $value['tag']);
				
				if ($config['allow_alt_url'] )
	        		$tags[] = "<span class=\"{$value['size']}\"><a href=\"".$config['http_home_url']."tags/".rawurlencode($url_tag)."/\" title=\"".$lang['tags_count']." ".$value['count']."\">".$value['tag']."</a></span>";
				else
					$tags[] = "<span class=\"{$value['size']}\"><a href=\"$PHP_SELF?do=tags&amp;tag=".rawurlencode($url_tag)."\" title=\"".$lang['tags_count']." ".$value['count']."\">".$value['tag']."</a></span>";
			}

		}

		$tags = implode('', $tags);

		if ( $limit ) $tpl->set( $matches[0], $tags);
		else $tpl->set('{tags}', $tags);

		$tpl->compile('content');
		$tpl->clear();

		create_cache ("alltagscloud", $tpl->result['content'], $config['skin']);

	}

}

if ($is_change) $config['allow_cache'] = false;

?>