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
 File: show.short.php
-----------------------------------------------------
 Use:  view short news
=====================================================
*/

if (!defined('DATALIFEENGINE')) {
	header("HTTP/1.1 403 Forbidden");
	header('Location: ../../');
	die("Hacking attempt!");
}

if ($allow_active_news) {

	if ($config['allow_banner']) include_once(DLEPlugins::Check(ENGINE_DIR . '/modules/banners.php'));

	$news_count = $cstart;
	$global_news_count = 0;
	$news_found = FALSE;

	if ($view_template != "rss") {
		if ($category_id and $cat_info[$category_id]['short_tpl'] != '') $tpl->load_template($cat_info[$category_id]['short_tpl'] . '.tpl');
		else $tpl->load_template('shortstory.tpl');
	}

	if (stripos($tpl->copy_template, "[xf") !== false or stripos($tpl->copy_template, "[if") !== false) {

		$xfound = true;
		$xfields = xfieldsload();

		if (count($xfields)) {
			$temp_xf = $xfields;
			foreach ($temp_xf as $k => $v) {
				if (stripos($tpl->copy_template, $v[0]) === false) {
					unset($xfields[$k]);
				}
			}
			unset($temp_xf);
		}
	} else $xfound = false;

	if (count($banners) and $config['allow_banner'] and !$smartphone_detected) {

		$news_c = 1;

		if (isset($ban_short)) {
			for ($indx = 0, $max = sizeof($ban_short['top']), $banners_topz = ''; $indx < $max; $indx++)
				if ($ban_short['top'][$indx]['zakr']) {
					$banners_topz .= $ban_short['top'][$indx]['text'];
					unset($ban_short['top'][$indx]);
				}

			for ($indx = 0, $max = sizeof($ban_short['cen']), $banners_cenz = ''; $indx < $max; $indx++)
				if ($ban_short['cen'][$indx]['zakr']) {
					$banners_cenz .= $ban_short['cen'][$indx]['text'];
					unset($ban_short['cen'][$indx]);
				}

			for ($indx = 0, $max = sizeof($ban_short['down']), $banners_downz = ''; $indx < $max; $indx++)
				if ($ban_short['down'][$indx]['zakr']) {
					$banners_downz .= $ban_short['down'][$indx]['text'];
					unset($ban_short['down'][$indx]);
				}

			$middle = floor($config['news_number'] / 2);
			$middle_s = floor(($middle - 1) / 2);
			$middle_e = floor($middle + (($config['news_number'] - $middle) / 2) + 1);
		}
	}

	//echo $sql_select;

	$sql_result = $db->query($sql_select);

	while ($row = $db->get_row($sql_result)) {

		$news_found = TRUE;
		$attachments[] = $row['id'];
		$row['date'] = strtotime($row['date']);

		if ($config['allow_banner'] and count($banners)) {

			foreach ($banners as $name => $value) {
				$tpl->copy_template = str_replace("{banner_" . $name . "}", $value, $tpl->copy_template);

				if ($value) {
					$tpl->copy_template = str_replace("[banner_" . $name . "]", "", $tpl->copy_template);
					$tpl->copy_template = str_replace("[/banner_" . $name . "]", "", $tpl->copy_template);
				}
			}
		}

		$tpl->set_block("'{banner_(.*?)}'si", "");
		$tpl->set_block("'\\[banner_(.*?)\\](.*?)\\[/banner_(.*?)\\]'si", "");

		if (isset($middle)) {

			if ($news_c == $middle_s) {
				$tpl->copy_template .= bannermass($banners_topz, $ban_short['top']);
			} else if ($news_c == $middle) {
				$tpl->copy_template .= bannermass($banners_cenz, $ban_short['cen']);
			} else if ($news_c == $middle_e) {
				$tpl->copy_template .= bannermass($banners_downz, $ban_short['down']);
			}
			$news_c++;
		}

		$news_count++;

		if (!$row['category']) {
			$my_cat = "---";
			$my_cat_link = "---";
		} else {

			$my_cat = array();
			$my_cat_link = array();
			$cat_list = $row['cats'] = explode(',', $row['category']);

			if (count($cat_list) == 1 or ($view_template == "rss" and $config['rss_format'] == 2)) {

				if ($cat_info[$cat_list[0]]['id']) {
					$my_cat[] = $cat_info[$cat_list[0]]['name'];
					$my_cat_link = get_categories($cat_list[0], $config['category_separator']);
				} else {
					$my_cat_link = "---";
				}
			} else {

				foreach ($cat_list as $element) {

					if ($element and $cat_info[$element]['id']) {
						$my_cat[] = $cat_info[$element]['name'];
						if (isset($_COOKIE['dbname']))
							$prjlink = 'project=' . $_COOKIE['dbname'].'&';
						  else
							$prjlink = '';
						if ($config['allow_alt_url']) $my_cat_link[] = "<a href=\"" . $config['http_home_url'] . get_url($element) . "/\">{$cat_info[$element]['name']}</a>";
						else $my_cat_link[] = "<a href=\"$PHP_SELF?do=cat&{$prjlink}category={$cat_info[$element]['alt_name']}\">{$cat_info[$element]['name']}</a>";
					}
				}

				if (count($my_cat_link)) {
					$my_cat_link = implode($config['category_separator'], $my_cat_link);
				} else $my_cat_link = "---";
			}

			if (count($my_cat)) {
				$my_cat = implode($config['category_separator'], $my_cat);
			} else $my_cat = "---";
		}

		$url_cat = $category_id;

		if (stripos($tpl->copy_template, "[category=") !== false) {
			$tpl->copy_template = preg_replace_callback("#\\[(category)=(.+?)\\](.*?)\\[/category\\]#is", "check_category", $tpl->copy_template);
		}

		if (stripos($tpl->copy_template, "[not-category=") !== false) {
			$tpl->copy_template = preg_replace_callback("#\\[(not-category)=(.+?)\\](.*?)\\[/not-category\\]#is", "check_category", $tpl->copy_template);
		}

		$category_id = $row['category'];

		if (strpos($tpl->copy_template, "[catlist=") !== false) {
			$tpl->copy_template = preg_replace_callback("#\\[(catlist)=(.+?)\\](.*?)\\[/catlist\\]#is", "check_category", $tpl->copy_template);
		}

		if (strpos($tpl->copy_template, "[not-catlist=") !== false) {
			$tpl->copy_template = preg_replace_callback("#\\[(not-catlist)=(.+?)\\](.*?)\\[/not-catlist\\]#is", "check_category", $tpl->copy_template);
		}

		$temp_rating = $config['rating_type'];
		$config['rating_type'] = if_category_rating($row['category']);

		if ($config['rating_type'] === false) {
			$config['rating_type'] = $temp_rating;
		}

		$category_id = $url_cat;

		if ($config['allow_alt_url']) {

			if ($config['seo_type'] == 1 or $config['seo_type'] == 2) {

				if ($row['category'] and $config['seo_type'] == 2) {

					$cats_url = get_url($row['category']);

					if ($cats_url) {

						$full_link = $config['http_home_url'] . $cats_url . "/" . $row['id'] . "-" . $row['alt_name'] . ".html";
					} else $full_link = $config['http_home_url'] . $row['id'] . "-" . $row['alt_name'] . ".html";
				} else {

					$full_link = $config['http_home_url'] . $row['id'] . "-" . $row['alt_name'] . ".html";
				}
			} else {

				$full_link = $config['http_home_url'] . date('Y/m/d/', $row['date']) . $row['alt_name'] . ".html";
			}
		} else {
			if (isset($_COOKIE['dbname']))
				$prjlink = '&project=' . $_COOKIE['dbname'];
			else
				$prjlink = '';

			$full_link = $config['http_home_url'] . "index.php?newsid=" . $row['id'].$prjlink;
		}

		if ($row['category']) {

			$cats_url = get_url($row['category']);

			if ($cats_url) $cats_url .= "/";
			if (isset($_COOKIE['dbname']))
			$prjlink = '&project=' . $_COOKIE['dbname'].'&';
			else
			$prjlink = '';
			if ($config['allow_alt_url']) $tpl->set('{category-url}', $config['http_home_url'] . $cats_url);
			else $tpl->set('{category-url}', "$PHP_SELF?do=cat&{$prjlink}category={$cat_info[$row['category']]['alt_name']}");
		} else $tpl->set('{category-url}', "#");


		$row['category'] = intval($row['category']);

		$news_find = array('{comments-num}' => number_format($row['comm_num'], 0, ',', ' '), '{views}' => number_format($row['news_read'], 0, ',', ' '), '{category}' => $my_cat, '{link-category}' => $my_cat_link, '{news-id}' => $row['id']);

		$tpl->set('', $news_find);

		if ($row['category'] and $cat_info[$row['category']]['icon']) {

			$tpl->set('{category-icon}', $cat_info[$row['category']]['icon']);
			$tpl->set('[category-icon]', "");
			$tpl->set('[/category-icon]', "");
			$tpl->set_block("'\\[not-category-icon\\](.*?)\\[/not-category-icon\\]'si", "");
		} else {

			$tpl->set('{category-icon}', "{THEME}/dleimages/no_icon.gif");
			$tpl->set('[not-category-icon]', "");
			$tpl->set('[/not-category-icon]', "");
			$tpl->set_block("'\\[category-icon\\](.*?)\\[/category-icon\\]'si", "");
		}

		if (date('Ymd', $row['date']) == date('Ymd', $_TIME)) {

			$tpl->set('{date}', $lang['time_heute'] . langdate(", H:i", $row['date'], $short_news_cache));
		} elseif (date('Ymd', $row['date']) == date('Ymd', ($_TIME - 86400))) {

			$tpl->set('{date}', $lang['time_gestern'] . langdate(", H:i", $row['date'], $short_news_cache));
		} else {

			$tpl->set('{date}', langdate($config['timestamp_active'], $row['date'], $short_news_cache));
		}

		$news_date = $row['date'];
		$tpl->copy_template = preg_replace_callback("#\{date=(.+?)\}#i", "formdate", $tpl->copy_template);

		$global_news_count++;

		if (strpos($tpl->copy_template, "[newscount=") !== false) {
			$tpl->copy_template = preg_replace_callback("#\\[(newscount)=(.+?)\\](.*?)\\[/newscount\\]#is", "check_newscount", $tpl->copy_template);
		}

		if (strpos($tpl->copy_template, "[not-newscount=") !== false) {
			$tpl->copy_template = preg_replace_callback("#\\[(not-newscount)=(.+?)\\](.*?)\\[/not-newscount\\]#is", "check_newscount", $tpl->copy_template);
		}

		if ($row['fixed']) {

			$tpl->set('[fixed]', "");
			$tpl->set('[/fixed]', "");
			$tpl->set_block("'\\[not-fixed\\](.*?)\\[/not-fixed\\]'si", "");
		} else {

			$tpl->set('[not-fixed]', "");
			$tpl->set('[/not-fixed]', "");
			$tpl->set_block("'\\[fixed\\](.*?)\\[/fixed\\]'si", "");
		}

		if ($row['comm_num']) {

			if ($row['allow_comm']) {

				$tpl->set('[comments]', "");
				$tpl->set('[/comments]', "");
			} else $tpl->set_block("'\\[comments\\](.*?)\\[/comments\\]'si", "");

			$tpl->set_block("'\\[not-comments\\](.*?)\\[/not-comments\\]'si", "");
		} else {

			if ($row['allow_comm']) {

				$tpl->set('[not-comments]', "");
				$tpl->set('[/not-comments]', "");
			} else $tpl->set_block("'\\[not-comments\\](.*?)\\[/not-comments\\]'si", "");

			$tpl->set_block("'\\[comments\\](.*?)\\[/comments\\]'si", "");
		}

		if ($row['votes']) {

			$tpl->set('[poll]', "");
			$tpl->set('[/poll]', "");
			$tpl->set_block("'\\[not-poll\\](.*?)\\[/not-poll\\]'si", "");
		} else {

			$tpl->set('[not-poll]', "");
			$tpl->set('[/not-poll]', "");
			$tpl->set_block("'\\[poll\\](.*?)\\[/poll\\]'si", "");
		}

		if (strpos($tpl->copy_template, "{poll}") !== false and $view_template != "rss") {

			if ($row['votes']) {

				include(DLEPlugins::Check(ENGINE_DIR . '/modules/poll.php'));

				$tpl->set('{poll}', $tpl->result['poll']);
			} else {

				$tpl->set('{poll}', '');
			}
		}

		if ($row['view_edit'] and $row['editdate']) {

			if (date('Ymd', $row['editdate']) == date('Ymd', $_TIME)) {

				$tpl->set('{edit-date}', $lang['time_heute'] . langdate(", H:i", $row['editdate'], $short_news_cache));
			} elseif (date('Ymd', $row['editdate']) == date('Ymd', ($_TIME - 86400))) {

				$tpl->set('{edit-date}', $lang['time_gestern'] . langdate(", H:i", $row['editdate'], $short_news_cache));
			} else {

				$tpl->set('{edit-date}', langdate($config['timestamp_active'], $row['editdate'], $short_news_cache));
			}

			$tpl->set('{editor}', $row['editor']);
			$tpl->set('{edit-reason}', $row['reason']);

			if ($row['reason']) {

				$tpl->set('[edit-reason]', "");
				$tpl->set('[/edit-reason]', "");
			} else
				$tpl->set_block("'\\[edit-reason\\](.*?)\\[/edit-reason\\]'si", "");

			$tpl->set('[edit-date]', "");
			$tpl->set('[/edit-date]', "");
		} else {

			$tpl->set('{edit-date}', "");
			$tpl->set('{editor}', "");
			$tpl->set('{edit-reason}', "");
			$tpl->set_block("'\\[edit-date\\](.*?)\\[/edit-date\\]'si", "");
			$tpl->set_block("'\\[edit-reason\\](.*?)\\[/edit-reason\\]'si", "");
		}

		if ($config['allow_tags'] and $row['tags']) {

			$tpl->set('[tags]', "");
			$tpl->set('[/tags]', "");

			$tags = array();

			$row['tags'] = explode(",", $row['tags']);

			foreach ($row['tags'] as $value) {

				$value = trim($value);
				$url_tag = str_replace(array("&#039;", "&quot;", "&amp;"), array("'", '"', "&"), $value);

				if ($config['allow_alt_url']) $tags[] = "<a href=\"" . $config['http_home_url'] . "tags/" . rawurlencode($url_tag) . "/\">" . $value . "</a>";
				else { //$tags[] = "<a href=\"$PHP_SELF?do=tags&amp;tag=" . rawurlencode( $url_tag ) . "\">" . $value . "</a>";
					$tags[] = "<span class=\"clouds_xsmall\"><a href=\"#\" onClick=\"tagsclick('" . $value . "',this,$category_id)\">" . $value . "</a></span>";
				}
			}

			$tpl->set('{tags}', implode($config['tags_separator'], $tags));
		} else {

			$tpl->set_block("'\\[tags\\](.*?)\\[/tags\\]'si", "");
			$tpl->set('{tags}', "");
		}

		if ($config['rating_type'] == "1") {
			$tpl->set('[rating-type-2]', "");
			$tpl->set('[/rating-type-2]', "");
			$tpl->set_block("'\\[rating-type-1\\](.*?)\\[/rating-type-1\\]'si", "");
			$tpl->set_block("'\\[rating-type-3\\](.*?)\\[/rating-type-3\\]'si", "");
			$tpl->set_block("'\\[rating-type-4\\](.*?)\\[/rating-type-4\\]'si", "");
		} elseif ($config['rating_type'] == "2") {
			$tpl->set('[rating-type-3]', "");
			$tpl->set('[/rating-type-3]', "");
			$tpl->set_block("'\\[rating-type-1\\](.*?)\\[/rating-type-1\\]'si", "");
			$tpl->set_block("'\\[rating-type-2\\](.*?)\\[/rating-type-2\\]'si", "");
			$tpl->set_block("'\\[rating-type-4\\](.*?)\\[/rating-type-4\\]'si", "");
		} elseif ($config['rating_type'] == "3") {
			$tpl->set('[rating-type-4]', "");
			$tpl->set('[/rating-type-4]', "");
			$tpl->set_block("'\\[rating-type-1\\](.*?)\\[/rating-type-1\\]'si", "");
			$tpl->set_block("'\\[rating-type-2\\](.*?)\\[/rating-type-2\\]'si", "");
			$tpl->set_block("'\\[rating-type-3\\](.*?)\\[/rating-type-3\\]'si", "");
		} else {
			$tpl->set('[rating-type-1]', "");
			$tpl->set('[/rating-type-1]', "");
			$tpl->set_block("'\\[rating-type-4\\](.*?)\\[/rating-type-4\\]'si", "");
			$tpl->set_block("'\\[rating-type-3\\](.*?)\\[/rating-type-3\\]'si", "");
			$tpl->set_block("'\\[rating-type-2\\](.*?)\\[/rating-type-2\\]'si", "");
		}

		if ($row['allow_rate']) {

			if ($config['short_rating'] and $user_group[$member_id['user_group']]['allow_rating']) {

				$tpl->set('{rating}', ShowRating($row['id'], $row['rating'], $row['vote_num'], 1));

				if ($config['rating_type']) {

					$tpl->set('[rating-plus]', "<a href=\"#\" onclick=\"doRate('plus', '{$row['id']}'); return false;\" >");
					$tpl->set('[/rating-plus]', '</a>');

					if ($config['rating_type'] == "2" or $config['rating_type'] == "3") {

						$tpl->set('[rating-minus]', "<a href=\"#\" onclick=\"doRate('minus', '{$row['id']}'); return false;\" >");
						$tpl->set('[/rating-minus]', '</a>');
					} else {
						$tpl->set_block("'\\[rating-minus\\](.*?)\\[/rating-minus\\]'si", "");
					}
				} else {
					$tpl->set_block("'\\[rating-plus\\](.*?)\\[/rating-plus\\]'si", "");
					$tpl->set_block("'\\[rating-minus\\](.*?)\\[/rating-minus\\]'si", "");
				}
			} else {

				$tpl->set('{rating}', ShowRating($row['id'], $row['rating'], $row['vote_num'], 0));
				$tpl->set_block("'\\[rating-plus\\](.*?)\\[/rating-plus\\]'si", "");
				$tpl->set_block("'\\[rating-minus\\](.*?)\\[/rating-minus\\]'si", "");
			}

			if ($row['vote_num']) $ratingscore = str_replace(',', '.', round(($row['rating'] / $row['vote_num']), 1));
			else $ratingscore = 0;

			$tpl->set('{ratingscore}', $ratingscore);

			$dislikes = ($row['vote_num'] - $row['rating']) / 2;
			$likes = $row['vote_num'] - $dislikes;

			$tpl->set('{likes}', "<span id=\"likes-id-" . $row['id'] . "\" class=\"ignore-select\">" . $likes . "</span>");
			$tpl->set('{dislikes}', "<span id=\"dislikes-id-" . $row['id'] . "\" class=\"ignore-select\">" . $dislikes . "</span>");
			$tpl->set('{vote-num}', "<span id=\"vote-num-id-" . $row['id'] . "\" class=\"ignore-select\">" . $row['vote_num'] . "</span>");
			$tpl->set('[rating]', "");
			$tpl->set('[/rating]', "");
			$tpl->set_block("'\\[redact\\](.*?)\\[/redact\\]'si", "");
		} else {
			$tpl->set_block("'\\[redact\\](.*?)\\[/redact\\]'si", "");
			$tpl->set('{rating}', "");
			$tpl->set('{vote-num}', "");
			$tpl->set('{likes}', "");
			$tpl->set('{dislikes}', "");
			$tpl->set('{ratingscore}', "");
			$tpl->set_block("'\\[rating\\](.*?)\\[/rating\\]'si", "");
			$tpl->set_block("'\\[rating-plus\\](.*?)\\[/rating-plus\\]'si", "");
			$tpl->set_block("'\\[rating-minus\\](.*?)\\[/rating-minus\\]'si", "");
		}
		$tpl->set('[no-redact]', "");
		$tpl->set('[/no-redact]', "");

		$config['rating_type'] = $temp_rating;

		if ($config['allow_alt_url']) {

			$go_page = $config['http_home_url'] . "user/" . urlencode($row['autor']) . "/";
			$tpl->set('[day-news]', "<a href=\"" . $config['http_home_url'] . date('Y/m/d/', $row['date']) . "\" >");
		} else {

			$go_page = "$PHP_SELF?subaction=userinfo&amp;user=" . urlencode($row['autor']);
			$tpl->set('[day-news]', "<a href=\"$PHP_SELF?year=" . date('Y', $row['date']) . "&amp;month=" . date('m', $row['date']) . "&amp;day=" . date('d', $row['date']) . "\" >");
		}

		$tpl->set('[/day-news]', "</a>");
		$tpl->set('[profile]', "<a href=\"" . $go_page . "\">");
		$tpl->set('[/profile]', "</a>");
		$tpl->set_block("'\\[not-news\\](.*?)\\[/not-news\\]'si", "");

		$tpl->set('{login}', $row['autor']);

		$use = $db_gl->super_query("SELECT fullname FROM dle_users WHERE name = '{$row['autor']}'");

		$tpl->set('{author}', "<a onclick=\"ShowProfile('" . urlencode($row['autor']) . "', '" . $go_page . "', '" . $user_group[$member_id['user_group']]['admin_editusers'] . "'); return false;\" href=\"" . $go_page . "\">" . $use['fullname'] . "</a>");
		///and ($member_id['name'] == $row['autor'] and ! $user_group[$member_id['user_group']]['allow_all_edit'])
		$allow_userinfo = true;

		if ($_GET['vivid'] == "ok") {
			$ids = $row['ids'];
		} else {
			$ids = $row['id'];
		}
		/*  if ( $member_id[ 'cat_add' ] )$allow_list = explode( ',', $member_id[ 'cat_add' ] );
		$ida = get_idcategories( $ids );
		if ($allow_list){
			foreach ( $catlist as $allow_list ) {
				
				
			}
		}*/

		if ($allow_userinfo and !$user_group[$member_id['user_group']]['allow_edit']and $user_group[ $member_id[ 'user_group' ] ][ 'allow_adds' ]) {
			$tpl->set('[edit]', "<a href=\"#\" onClick=\"ShowEdit('" . $ids . "'); return false;\" title='Редактировать'/></a>");
			$tpl->set('[/edit]', "");
		} elseif ($is_logged and (($member_id['name'] == $row['autor'] and $user_group[$member_id['user_group']]['allow_edit']) or $user_group[$member_id['user_group']]['allow_all_edit'])) {

			$_SESSION['referrer'] = htmlspecialchars($_SERVER['REQUEST_URI'], ENT_QUOTES, $config['charset']);
			$tpl->set('[edit]', "<a onclick=\"return dropdownmenu(this, event, MenuNewsBuild('" . $row['id'] . "', 'short', '" . $row['arhiv'] . "', '" . $row['approve'] . "' ), '170px')\" href=\"#\">");
			$tpl->set('[/edit]', "</a>");
			$allow_comments_ajax = true;
		} else $tpl->set_block("'\\[edit\\](.*?)\\[/edit\\]'si", "");

		if (($row['full_story'] < 13) and $config['hide_full_link']) $tpl->set_block("'\\[full-link\\](.*?)\\[/full-link\\]'si", "");
		else {

			$tpl->set('[full-link]', "<a href=\"" . $full_link . "\">");

			$tpl->set('[/full-link]', "</a>");
		}

		$tpl->set('{full-link}', $full_link);

		if ($row['allow_comm']) {

			$tpl->set('[com-link]', "<a href=\"" . $full_link . "#comment\">");
			$tpl->set('[/com-link]', "</a>");
		} else $tpl->set_block("'\\[com-link\\](.*?)\\[/com-link\\]'si", "");

		if ($is_logged) {

			$fav_arr = explode(',', $member_id['favorites']);
			// or $config['allow_cache']
			if (!in_array($row['id'], $fav_arr)) {
				//  echo '1';
				$tpl->set('{favorites}', "<a id=\"fav-id-" . $row['id'] . "\" href=\"$PHP_SELF?do=favorites&amp;doaction=add&amp;id=" . $row['id'] . "\"><img src=\"" . $config['http_home_url'] . "templates/{$config['skin']}/dleimages/plus_fav.gif\" onclick=\"doFavorites('" . $row['id'] . "', 'plus', 0); return false;\" title=\"" . $lang['news_addfav'] . "\" style=\"vertical-align: middle;border: none;\" alt=\"\"></a>");
				$tpl->set('[add-favorites]', "<a id=\"fav-id-" . $row['id'] . "\" onclick=\"doFavorites('" . $row['id'] . "', 'plus', 1); return false;\" href=\"$PHP_SELF?do=favorites&amp;doaction=add&amp;id=" . $row['id'] . "\">");
				$tpl->set('[/add-favorites]', "</a>");
				$tpl->set_block("'\\[del-favorites\\](.*?)\\[/del-favorites\\]'si", "");
			} else {
				//       echo '2';
				$tpl->set('{favorites}', "<a id=\"fav-id-" . $row['id'] . "\" href=\"$PHP_SELF?do=favorites&amp;doaction=del&amp;id=" . $row['id'] . "\"><img src=\"" . $config['http_home_url'] . "templates/{$config['skin']}/dleimages/minus_fav.gif\" onclick=\"doFavorites('" . $row['id'] . "', 'minus', 0); return false;\" title=\"" . $lang['news_minfav'] . "\" style=\"vertical-align: middle;border: none;\" alt=\"\"></a>");
				$tpl->set('[del-favorites]', "<a id=\"fav-id-" . $row['id'] . "\" onclick=\"doFavorites('" . $row['id'] . "', 'minus', 1); return false;\" href=\"$PHP_SELF?do=favorites&amp;doaction=del&amp;id=" . $row['id'] . "\">");
				$tpl->set('[/del-favorites]', "</a>");
				$tpl->set_block("'\\[add-favorites\\](.*?)\\[/add-favorites\\]'si", "");
			}
		} else {
			$tpl->set('{favorites}', "");
			$tpl->set_block("'\\[add-favorites\\](.*?)\\[/add-favorites\\]'si", "");
			$tpl->set_block("'\\[del-favorites\\](.*?)\\[/del-favorites\\]'si", "");
		}
		$tpl->set('{vived}', "");
		$tpl->set('[complaint]', "<a href=\"javascript:AddComplaint('" . $row['id'] . "', 'news')\">");
		$tpl->set('[/complaint]', "</a>");

		if ($allow_userinfo) {

			$tpl->set('{approve}', $lang['approve']);
		} else $tpl->set('{approve}', "");


		$row['xfields'] = stripslashes($row['xfields']);

		if ($xfound and count($xfields)) {
			$row['xfields_array'] = xfieldsdataload($row['xfields']);
		}

		$tpl->copy_template = if_check($tpl->copy_template);

		if ($xfound and count($xfields)) {
			$xfieldsdata = $row['xfields_array'];

			foreach ($xfields as $value) {
				$preg_safe_name = preg_quote($value[0], "'");

				if ($value[20]) {

					$value[20] = explode(',', $value[20]);

					if ($value[20][0] and !in_array($member_id['user_group'], $value[20])) {
						$xfieldsdata[$value[0]] = "";
					}
				}

				if ($value[3] == "yesorno") {

					if (intval($xfieldsdata[$value[0]])) {
						$xfgiven = true;
						$xfieldsdata[$value[0]] = $lang['xfield_xyes'];
					} else {
						$xfgiven = false;
						$xfieldsdata[$value[0]] = $lang['xfield_xno'];
					}
				} else {

					if ($xfieldsdata[$value[0]] == "") $xfgiven = false;
					else $xfgiven = true;
				}

				if (!$xfgiven) {
					$tpl->copy_template = preg_replace("'\\[xfgiven_{$preg_safe_name}\\](.*?)\\[/xfgiven_{$preg_safe_name}\\]'is", "", $tpl->copy_template);
					$tpl->copy_template = str_ireplace("[xfnotgiven_{$value[0]}]", "", $tpl->copy_template);
					$tpl->copy_template = str_ireplace("[/xfnotgiven_{$value[0]}]", "", $tpl->copy_template);
				} else {
					$tpl->copy_template = preg_replace("'\\[xfnotgiven_{$preg_safe_name}\\](.*?)\\[/xfnotgiven_{$preg_safe_name}\\]'is", "", $tpl->copy_template);
					$tpl->copy_template = str_ireplace("[xfgiven_{$value[0]}]", "", $tpl->copy_template);
					$tpl->copy_template = str_ireplace("[/xfgiven_{$value[0]}]", "", $tpl->copy_template);
				}

				if (strpos($tpl->copy_template, "[ifxfvalue {$value[0]}") !== false) {
					$tpl->copy_template = preg_replace_callback("#\\[ifxfvalue(.+?)\\](.+?)\\[/ifxfvalue\\]#is", "check_xfvalue", $tpl->copy_template);
				}

				if ($value[6] and !empty($xfieldsdata[$value[0]])) {
					$temp_array = explode(",", $xfieldsdata[$value[0]]);
					$value3 = array();

					foreach ($temp_array as $value2) {

						$value2 = trim($value2);

						if ($value2) {

							$value4 = str_replace(array("&#039;", "&quot;", "&amp;", "&#123;", "&#91;", "&#58;"), array("'", '"', "&", "{", "[", ":"), $value2);

							if ($value[3] == "datetime") {

								$value2 = strtotime($value4);

								if (!trim($value[24])) $value[24] = $config['timestamp_active'];

								if ($value[25]) {

									if ($value[26]) $value2 = langdate($value[24], $value2);
									else $value2 = langdate($value[24], $value2, false, $customlangdate);
								} else $value2 = date($value[24], $value2);
							}

							if ($config['allow_alt_url']) $value3[] = "<a href=\"" . $config['http_home_url'] . "xfsearch/" . $value[0] . "/" . rawurlencode($value4) . "/\">" . $value2 . "</a>";
							else $value3[] = "<a href=\"$PHP_SELF?do=xfsearch&amp;xfname=" . $value[0] . "&amp;xf=" . rawurlencode($value4) . "\">" . $value2 . "</a>";
						}
					}

					if (empty($value[21])) $value[21] = ", ";

					$xfieldsdata[$value[0]] = implode($value[21], $value3);

					unset($temp_array);
					unset($value2);
					unset($value3);
					unset($value4);
				} elseif ($value[3] == "datetime" and !empty($xfieldsdata[$value[0]])) {

					$xfieldsdata[$value[0]] = strtotime(str_replace("&#58;", ":", $xfieldsdata[$value[0]]));

					if (!trim($value[24])) $value[24] = $config['timestamp_active'];

					if ($value[25]) {

						if ($value[26]) $xfieldsdata[$value[0]] = langdate($value[24], $xfieldsdata[$value[0]]);
						else $xfieldsdata[$value[0]] = langdate($value[24], $xfieldsdata[$value[0]], false, $customlangdate);
					} else $xfieldsdata[$value[0]] = date($value[24], $xfieldsdata[$value[0]]);
				}

				if ($config['allow_links'] and $value[3] == "textarea" and function_exists('replace_links')) $xfieldsdata[$value[0]] = replace_links($xfieldsdata[$value[0]], $replace_links['news']);

				if ($value[3] == "image" and $xfieldsdata[$value[0]]) {

					$temp_array = explode('|', $xfieldsdata[$value[0]]);

					if (count($temp_array) > 1) {

						$temp_alt = $temp_array[0];
						$temp_value = $temp_array[1];
					} else {

						$temp_alt = '';
						$temp_value = $temp_array[0];
					}

					$path_parts = @pathinfo($temp_value);

					if ($value[12] and file_exists(ROOT_DIR . "/uploads/posts/" . $path_parts['dirname'] . "/thumbs/" . $path_parts['basename'])) {
						$thumb_url = $config['http_home_url'] . "uploads/posts/" . $path_parts['dirname'] . "/thumbs/" . $path_parts['basename'];
						$img_url = $config['http_home_url'] . "uploads/posts/" . $path_parts['dirname'] . "/" . $path_parts['basename'];
					} else {
						$img_url = 	$config['http_home_url'] . "uploads/posts/" . $path_parts['dirname'] . "/" . $path_parts['basename'];
						$thumb_url = "";
					}

					if ($thumb_url) {
						$tpl->set("[xfvalue_thumb_url_{$value[0]}]", $thumb_url);
						$xfieldsdata[$value[0]] = "<a href=\"$img_url\" class=\"highslide\" target=\"_blank\"><img class=\"xfieldimage {$value[0]}\" src=\"$thumb_url\" alt=\"{$temp_alt}\"></a>";
					} else {
						$tpl->set("[xfvalue_thumb_url_{$value[0]}]", $img_url);
						$xfieldsdata[$value[0]] = "<img class=\"xfieldimage {$value[0]}\" src=\"{$img_url}\" alt=\"{$temp_alt}\">";
					}

					$tpl->set("[xfvalue_image_url_{$value[0]}]", $img_url);
				}

				if ($value[3] == "image" and !$xfieldsdata[$value[0]]) {
					$tpl->set("[xfvalue_thumb_url_{$value[0]}]", "");
					$tpl->set("[xfvalue_image_url_{$value[0]}]", "");
				}

				if ($value[3] == "imagegalery" and $xfieldsdata[$value[0]] and stripos($tpl->copy_template, "[xfvalue_{$value[0]}") !== false) {

					$fieldvalue_arr = explode(',', $xfieldsdata[$value[0]]);
					$gallery_image = array();
					$gallery_single_image = array();
					$xf_image_count = 0;
					$single_need = false;

					if (stripos($tpl->copy_template, "[xfvalue_{$value[0]} image=") !== false) $single_need = true;

					foreach ($fieldvalue_arr as $temp_value) {
						$xf_image_count++;

						$temp_value = trim($temp_value);

						if ($temp_value == "") continue;

						$temp_array = explode('|', $temp_value);

						if (count($temp_array) > 1) {

							$temp_alt = $temp_array[0];
							$temp_value = $temp_array[1];
						} else {

							$temp_alt = '';
							$temp_value = $temp_array[0];
						}

						$path_parts = @pathinfo($temp_value);

						if ($value[12] and file_exists(ROOT_DIR . "/uploads/posts/" . $path_parts['dirname'] . "/thumbs/" . $path_parts['basename'])) {
							$thumb_url = $config['http_home_url'] . "uploads/posts/" . $path_parts['dirname'] . "/thumbs/" . $path_parts['basename'];
							$img_url = $config['http_home_url'] . "uploads/posts/" . $path_parts['dirname'] . "/" . $path_parts['basename'];
						} else {
							$img_url = 	$config['http_home_url'] . "uploads/posts/" . $path_parts['dirname'] . "/" . $path_parts['basename'];
							$thumb_url = "";
						}

						if ($thumb_url) {

							$gallery_image[] = "<li><a href=\"$img_url\" onclick=\"return hs.expand(this, { slideshowGroup: 'xf_{$row['id']}_{$value[0]}' })\" target=\"_blank\"><img src=\"{$thumb_url}\" alt=\"{$temp_alt}\"></a></li>";
							$gallery_single_image['[xfvalue_' . $value[0] . ' image="' . $xf_image_count . '"]'] = "<a href=\"{$img_url}\" class=\"highslide\" target=\"_blank\"><img class=\"xfieldimage {$value[0]}\" src=\"{$thumb_url}\" alt=\"{$temp_alt}\"></a>";
						} else {
							$gallery_image[] = "<li><img src=\"{$img_url}\" alt=\"{$temp_alt}\"></li>";
							$gallery_single_image['[xfvalue_' . $value[0] . ' image="' . $xf_image_count . '"]'] = "<img class=\"xfieldimage {$value[0]}\" src=\"{$img_url}\" alt=\"{$temp_alt}\">";
						}
					}

					if ($single_need and count($gallery_single_image)) {
						foreach ($gallery_single_image as $temp_key => $temp_value) $tpl->set($temp_key, $temp_value);
					}

					$xfieldsdata[$value[0]] = "<ul class=\"xfieldimagegallery {$value[0]}\">" . implode($gallery_image) . "</ul>";
				}

				if ($config['image_lazy']) $xfieldsdata[$value[0]] = preg_replace_callback("#<(img|iframe)(.+?)>#i", "enable_lazyload", $xfieldsdata[$value[0]]);

				$tpl->set("[xfvalue_{$value[0]}]", $xfieldsdata[$value[0]]);

				if (preg_match("#\\[xfvalue_{$preg_safe_name} limit=['\"](.+?)['\"]\\]#i", $tpl->copy_template, $matches)) {
					$count = intval($matches[1]);

					$xfieldsdata[$value[0]] = str_replace("><", "> <", $xfieldsdata[$value[0]]);
					$xfieldsdata[$value[0]] = strip_tags($xfieldsdata[$value[0]], "<br>");
					$xfieldsdata[$value[0]] = trim(str_replace("<br>", " ", str_replace("<br />", " ", str_replace("\n", " ", str_replace("\r", "", $xfieldsdata[$value[0]])))));
					$xfieldsdata[$value[0]] = preg_replace('/\s+/u', ' ', $xfieldsdata[$value[0]]);

					if ($count and dle_strlen($xfieldsdata[$value[0]], $config['charset']) > $count) {

						$xfieldsdata[$value[0]] = dle_substr($xfieldsdata[$value[0]], 0, $count, $config['charset']);

						if (($temp_dmax = dle_strrpos($xfieldsdata[$value[0]], ' ', $config['charset']))) $xfieldsdata[$value[0]] = dle_substr($xfieldsdata[$value[0]], 0, $temp_dmax, $config['charset']);
					}

					$tpl->set($matches[0], $xfieldsdata[$value[0]]);
				}
			}
		}

		$row['full_story'] = stripslashes($row['full_story']);

		if (stripos($tpl->copy_template, "image-") !== false) {

			$images = array();
			preg_match_all('/(img|src)=("|\')[^"\'>]+/i', $row['full_story'] . $row['xfields'], $media);
			$data = preg_replace('/(img|src)("|\'|="|=\')(.*)/i', "$3", $media[0]);

			foreach ($data as $url) {
				$info = pathinfo($url);
				if (isset($info['extension'])) {
					if ($info['filename'] == "spoiler-plus" or $info['filename'] == "spoiler-minus" or strpos($info['dirname'], 'engine/data/emoticons') !== false) continue;
					$info['extension'] = strtolower($info['extension']);
					if (($info['extension'] == 'jpg') || ($info['extension'] == 'jpeg') || ($info['extension'] == 'gif') || ($info['extension'] == 'png') || ($info['extension'] == 'webp')) array_push($images, $url);
				}
			}

			if (count($images)) {
				$i_count = 0;
				foreach ($images as $url) {
					$i_count++;
					$tpl->copy_template = str_replace('{image-' . $i_count . '}', $url, $tpl->copy_template);
					$tpl->copy_template = str_replace('[image-' . $i_count . ']', "", $tpl->copy_template);
					$tpl->copy_template = str_replace('[/image-' . $i_count . ']', "", $tpl->copy_template);
					$tpl->copy_template = preg_replace("#\[not-image-{$i_count}\](.+?)\[/not-image-{$i_count}\]#is", "", $tpl->copy_template);
				}
			}

			$tpl->copy_template = preg_replace("#\[image-(.+?)\](.+?)\[/image-(.+?)\]#is", "", $tpl->copy_template);
			$tpl->copy_template = preg_replace("#\\{image-(.+?)\\}#i", "{THEME}/dleimages/no_image.jpg", $tpl->copy_template);
			$tpl->copy_template = preg_replace("#\[not-image-(.+?)\]#i", "", $tpl->copy_template);
			$tpl->copy_template = preg_replace("#\[/not-image-(.+?)\]#i", "", $tpl->copy_template);
		}

		$row['title'] = stripslashes($row['title']);
		$tpl->set('{title}', str_replace("&amp;amp;", "&amp;",  htmlspecialchars($row['title'], ENT_QUOTES, $config['charset'])));

		if (!isset($row['approve'])) {
			$tpl->set('{im-app}', '');
		} else {

			if (!$row['approve']) {
				$tpl->set('{im-app}', '<img width="24" height="24" src="/images/voskznak.png"/>');
			} else {
				$tpl->set('{im-app}', '');
			}
		}

		if (preg_match("#\\{title limit=['\"](.+?)['\"]\\}#i", $tpl->copy_template, $matches)) {
			$count = intval($matches[1]);
			$row['title'] = strip_tags($row['title']);

			if ($count and dle_strlen($row['title'], $config['charset']) > $count) {

				$row['title'] = dle_substr($row['title'], 0, $count, $config['charset']);

				if (($temp_dmax = dle_strrpos($row['title'], ' ', $config['charset']))) $row['title'] = dle_substr($row['title'], 0, $temp_dmax, $config['charset']);
			}

			$tpl->set($matches[0], str_replace("&amp;amp;", "&amp;",  htmlspecialchars($row['title'], ENT_QUOTES, $config['charset'])));
		}

		if ($view_template == "rss") {

			$tpl->set('{rsslink}', $full_link);
			$tpl->set('{rssauthor}', $row['autor']);
			$tpl->set('{rssdate}', date("r", $row['date']));


			if ($row['allow_rss_turbo']) {
				$tpl->set('{allow-turbo}', "true");
				$tpl->set('[allow-turbo]', "");
				$tpl->set('[/allow-turbo]', "");
			} else {
				$tpl->set('{allow-turbo}', "false");
				$tpl->set_block("'\\[allow-turbo\\](.*?)\\[/allow-turbo\\]'si", "");
			}

			if ($row['allow_rss_dzen']) {
				$tpl->set('[allow-dzen]', "");
				$tpl->set('[/allow-dzen]', "");
			} else {
				$tpl->set_block("'\\[allow-dzen\\](.*?)\\[/allow-dzen\\]'si", "");
			}

			$row['full_story'] = stripslashes($row['full_story']);
			if (strlen($row['full_story']) < 13) $row['full_story'] = $row['full_story'];

			$row['full_story'] = preg_replace("'\[attachment=(.*?)\]'si", "", $row['full_story']);
			$row['full_story'] = preg_replace("#\[hide(.*?)\](.+?)\[/hide\]#is", "", $row['full_story']);
			$row['full_story'] = preg_replace("#<!--dle_spoiler(.+?)<!--spoiler_text-->#is", "", $row['full_story']);
			$row['full_story'] = preg_replace("#<!--spoiler_text_end-->(.+?)<!--/dle_spoiler-->#is", "", $row['full_story']);
			$row['full_story'] = str_ireplace("{short-story}", "&#123;short-story}", $row['full_story']);
			$row['full_story'] = str_ireplace("{full-story}", "&#123;full-story}", $row['full_story']);

			if ($config['rss_format'] != 1) {

				$row['full_story'] = preg_replace("#<!--(.+?)-->#is", "", $row['full_story']);

				$tpl->copy_template = preg_replace("#\<\!\[CDATA\[(.*?)\{short\-story\}(.*?)\]\]\>#i", "<![CDATA[\\1 " . preg_quote_replacement($row['full_story']) . " \\2]]>", $tpl->copy_template);

				$row['full_story'] = str_replace("><", "> <", $row['full_story']);
				$row['full_story'] = trim(htmlspecialchars(strip_tags(str_replace(array("<br>", "<br />"), " ", $row['full_story'])), ENT_QUOTES, $config['charset']));
				$row['full_story'] = preg_replace('/\s+/u', ' ', $row['full_story']);

				$tpl->set('{short-story}',  $row['full_story']);
			} else {

				$row['full_story'] = preg_replace("#<!--(.+?)-->#is", "", $row['full_story']);

				$tpl->set('{short-story}', $row['full_story']);
			}

			if ($config['rss_format'] == 2) {

				$images = array();
				preg_match_all('/(img|src)=("|\')[^"\'>]+/i', $row['full_story'], $media);
				$data = preg_replace('/(img|src)("|\'|="|=\')(.*)/i', "$3", $media[0]);

				foreach ($data as $url) {
					$info = pathinfo($url);
					if (isset($info['extension'])) {
						if ($info['filename'] == "spoiler-plus" or $info['filename'] == "spoiler-minus" or strpos($info['dirname'], 'engine/data/emoticons') !== false) continue;
						$info['extension'] = strtolower($info['extension']);
						if (($info['extension'] == 'jpg') || ($info['extension'] == 'jpeg') || ($info['extension'] == 'gif') || ($info['extension'] == 'png') || ($info['extension'] == 'webp')) {
							if ($info['extension'] == 'jpg') $info['extension'] = 'jpeg';
							array_push($images, "<enclosure url=\"{$url}\" type=\"image/{$info['extension']}\" />");
						}
					}
				}

				if (count($images)) {

					$tpl->set('{images}', "\n" . implode("\n", $images));
				} else {
					$tpl->set('{images}', '');
				}
			}

			$row['full_story'] = preg_replace("#<!--dle_spoiler(.+?)<!--spoiler_text-->#is", "", $row['full_story']);
			$row['full_story'] = preg_replace("#<!--spoiler_text_end-->(.+?)<!--/dle_spoiler-->#is", "", $row['full_story']);

			$row['full_story'] = preg_replace("#<!--(.+?)-->#is", "", $row['full_story']);
			$row['full_story'] = preg_replace("'\[attachment=(.*?)\]'si", "", $row['full_story']);
			$row['full_story'] = preg_replace("#\[hide(.*?)\](.+?)\[/hide\]#is", "", $row['full_story']);
			$row['full_story'] = str_ireplace("{short-story}", "&#123;short-story}", $row['full_story']);
			$row['full_story'] = str_ireplace("{full-story}", "&#123;full-story}", $row['full_story']);

			$tpl->copy_template = preg_replace("#\<\!\[CDATA\[(.*?)\{full\-story\}(.*?)\]\]\>#is", "<![CDATA[\\1 " . preg_quote_replacement($row['full_story']) . " \\2]]>", $tpl->copy_template);

			$row['full_story'] = str_replace("><", "> <", $row['full_story']);
			$row['full_story'] = trim(htmlspecialchars(strip_tags(str_replace(array("<br>", "<br />"), " ", $row['full_story'])), ENT_QUOTES, $config['charset']));
			$row['full_story'] = preg_replace('/\s+/u', ' ', $row['full_story']);

			$tpl->set('{full-story}',  $row['full_story']);
		} else {

			if ($config['allow_links'] and function_exists('replace_links') and isset($replace_links['news'])) $row['full_story'] = replace_links($row['full_story'], $replace_links['news']);

			if ($smartphone_detected) {

				if (!$config['allow_smart_format']) {

					$row['full_story'] = strip_tags($row['full_story'], '<p><br><a>');
				} else {


					if (!$config['allow_smart_images']) {

						$row['full_story'] = preg_replace("#<!--TBegin(.+?)<!--TEnd-->#is", "", $row['full_story']);
						$row['full_story'] = preg_replace("#<!--MBegin(.+?)<!--MEnd-->#is", "", $row['full_story']);
						$row['full_story'] = preg_replace("#<img(.+?)>#is", "", $row['full_story']);
					}

					if (!$config['allow_smart_video']) {

						$row['full_story'] = preg_replace("#<!--dle_video_begin(.+?)<!--dle_video_end-->#is", "", $row['full_story']);
						$row['full_story'] = preg_replace("#<!--dle_audio_begin(.+?)<!--dle_audio_end-->#is", "", $row['full_story']);
						$row['full_story'] = preg_replace("#<!--dle_media_begin(.+?)<!--dle_media_end-->#is", "", $row['full_story']);
					}
				}
			}

			if ($config['image_lazy']) $row['full_story'] = preg_replace_callback("#<(img|iframe)(.+?)>#i", "enable_lazyload", $row['full_story']);


			if (!$_GET['vivid'] == "ok") {
				if ($row['id_news'] == '' && $row['approve'] == '1') {
					$prochit = '<br><div align="center" class="prochit"><span><a href="#" onClick="procitano(' . $row['id'] . ',this);return false;" id="st' . $row['id'] . '" class="button21 prs' . $row['id'] . '"><img src="images\voskl.png"/><b>Не прочитано!</b></a></span></div><br>';
				} else {
					$prochit = '<br><div align="center" class="prochit"><span><a href="#" onClick="procitano(' . $row['id'] . ',this);return false;" id="st' . $row['id'] . '" class="button21 prs' . $row['id'] . '"><img src="images\galka.png"/>Прочитано!</a></span></div><br>';
				}
			}
			$row['full_story'] = preg_replace( "'\[metka=(.*?)\]'si", "<span id='per\\1'></span>", $row['full_story'] );
			$row['full_story'] = preg_replace( "'\[url_metka=(.*?)\](.*?)\[/url_metka\]'si", "<a href='#' class='urlmetka' data-url='\\1'>\\2</a>", $row['full_story'] );


			$tpl->set('{short-story}', $row['full_story'] . $prochit);
		}

		if (preg_match("#\\{short-story limit=['\"](.+?)['\"]\\}#i", $tpl->copy_template, $matches)) {
			$count = intval($matches[1]);

			$row['full_story'] = preg_replace("'\[attachment=(.*?)\]'si", "", $row['full_story']);
			$row['full_story'] = preg_replace("#\[hide(.*?)\](.+?)\[/hide\]#is", "", $row['full_story']);
			$row['full_story'] = preg_replace("#<!--dle_spoiler(.+?)<!--spoiler_text-->#is", "", $row['full_story']);
			$row['full_story'] = preg_replace("#<!--spoiler_text_end-->(.+?)<!--/dle_spoiler-->#is", "", $row['full_story']);

			$row['full_story'] = str_replace("><", "> <", $row['full_story']);
			$row['full_story'] = strip_tags($row['full_story'], "<br>");
			$row['full_story'] = trim(str_replace("<br>", " ", str_replace("<br />", " ", str_replace("\n", " ", str_replace("\r", "", $row['full_story'])))));
			$row['full_story'] = preg_replace('/\s+/u', ' ', $row['full_story']);

			if ($count and dle_strlen($row['full_story'], $config['charset']) > $count) {

				$row['full_story'] = dle_substr($row['full_story'], 0, $count, $config['charset']);

				if (($temp_dmax = dle_strrpos($row['full_story'], ' ', $config['charset']))) $row['full_story'] = dle_substr($row['full_story'], 0, $temp_dmax, $config['charset']);
			}

			$tpl->set($matches[0], $row['full_story']);
		}

		$tpl->compile('content');
	}

	if (!$news_found and !$allow_userinfo and $do != 'newposts' and $do != 'favorites') {

		if (preg_match("'\\[not-news\\](.*?)\\[/not-news\\]'si", $tpl->copy_template, $match)) {
			$need_404 = true;
			$tpl->result['content'] .= $match[1];
		}
	}

	if (stripos($tpl->result['content'], "[hide") !== false) {

		$tpl->result['content'] = preg_replace_callback(
			"#\[hide(.*?)\](.+?)\[/hide\]#is",
			function ($matches) use ($member_id, $user_group, $lang) {

				$matches[1] = str_replace(array("=", " "), "", $matches[1]);
				$matches[2] = $matches[2];

				if ($matches[1]) {

					$groups = explode(',', $matches[1]);

					if (in_array($member_id['user_group'], $groups) or $member_id['user_group'] == "1") {
						return $matches[2];
					} else return "<div class=\"quote dlehidden\">" . $lang['news_regus'] . "</div>";
				} else {

					if ($user_group[$member_id['user_group']]['allow_hide']) return $matches[2];
					else return "<div class=\"quote dlehidden\">" . $lang['news_regus'] . "</div>";
				}
			},
			$tpl->result['content']
		);
	}

	$tpl->result['content'] = str_ireplace("{PAGEBREAK}", '', $tpl->result['content']);

	if ($config['allow_banner'] and count($banner_in_news) and !$view_template) {

		foreach ($banner_in_news as $name) {
			$tpl->result['content'] = str_replace("{banner_" . $name . "}", $banners[$name], $tpl->result['content']);

			if ($banners[$name]) {
				$tpl->result['content'] = str_replace("[banner_" . $name . "]", "", $tpl->result['content']);
				$tpl->result['content'] = str_replace("[/banner_" . $name . "]", "", $tpl->result['content']);
			}
		}

		$tpl->result['content'] = preg_replace("'\\[banner_(.*?)\\](.*?)\\[/banner_(.*?)\\]'si", '', $tpl->result['content']);
	} elseif ($view_template) {

		$tpl->result['content'] = preg_replace("'{banner_(.*?)}'si", '', $tpl->result['content']);
		$tpl->result['content'] = preg_replace("'\\[banner_(.*?)\\](.*?)\\[/banner_(.*?)\\]'si", '', $tpl->result['content']);
	}

	$tpl->clear();
	$db->free($sql_result);

	if (!$view_template) {

		$count_all = $db->super_query($sql_count);

		if ($news_found and !$count_all['count']) {
			$db->query("ANALYZE TABLE `" . PREFIX . "_post`, `" . PREFIX . "_post_extras`");
			$count_all = $db->super_query($sql_count);
		}

		$count_all = $count_all['count'];
	} else $count_all = 0;


	if ($do == "") $do = $subaction;
	if ($do == "" and $year) $do = "date";
	$ban_short = array();
	unset($ban_short);

	if (!$news_found and $allow_userinfo and $member_id['name'] == $user and $user_group[$member_id['user_group']]['allow_adds']) {

		$tpl->load_template('info.tpl');
		$tpl->set('{error}', $lang['mod_list_f']);
		$tpl->set('{title}', $lang['all_info']);
		$tpl->compile('content');
		$tpl->clear();
	} elseif (!$news_found and $do == 'newposts' and $view_template != 'rss') {

		msgbox($lang['all_info'], $lang['newpost_notfound']);
	} elseif (!$news_found and $do == 'favorites') {

		if (!$count_all) msgbox($lang['all_info'], $lang['fav_notfound']);
		else msgbox($lang['all_info'], $lang['fav_notfound_1']);
	}


	if (!$view_template and $count_all and $config['news_navigation'] and $news_found) {

		$tpl->load_template('navigation.tpl');

		//----------------------------------
		// Previous link
		//----------------------------------


		$no_prev = false;
		$no_next = false;

		if (isset($cstart) and $cstart != "" and $cstart > 0) {
			$prev = $cstart / $config['news_number'];

			if ($config['allow_alt_url']) {

				if ($prev == 1)
					$prev_page = $url_page . "/";
				else
					$prev_page = $url_page . "/page/" . $prev . "/";

				$tpl->set_block("'\[prev-link\](.*?)\[/prev-link\]'si", "<a href=\"" . $prev_page . "\">\\1</a>");
			} else {
				if (isset($_COOKIE['dbname']))
				$prjlink = '&project=' . $_COOKIE['dbname'].'&';
			  else
				$prjlink = '';
				if ($prev == 1) {

					if ($user_query) $prev_page = $PHP_SELF . "?" . $user_query.$prjlink;
					else $prev_page = $config['http_home_url'];
				} else {

					if ($user_query) $prev_page = $PHP_SELF . "?cstart=" . $prev . "&amp;" . $user_query.$prjlink;
					else $prev_page = $PHP_SELF . "?cstart=" . $prev.$prjlink;
				}

				$tpl->set_block("'\[prev-link\](.*?)\[/prev-link\]'si", "<a href=\"" . $prev_page . "\">\\1</a>");
			}
		} else {
			$tpl->set_block("'\[prev-link\](.*?)\[/prev-link\]'si", "<span>\\1</span>");
			$no_prev = TRUE;
		}

		//----------------------------------
		// Pages
		//----------------------------------
		if ($config['news_number']) {

			$pages = "";

			if ($count_all > $config['news_number']) {

				$enpages_count = @ceil($count_all / $config['news_number']);

				$cstart = ($cstart / $config['news_number']) + 1;
				if (isset($_COOKIE['dbname']))
				$prjlink = '&project=' . $_COOKIE['dbname'];
			  else
				$prjlink = '';
				if ($enpages_count <= 10) {

					for ($j = 1; $j <= $enpages_count; $j++) {

						if ($j != $cstart) {

							if ($config['allow_alt_url']) {

								if ($j == 1)
									$pages .= "<a href=\"" . $url_page .$prjlink. "/\">$j</a> ";
								else
									$pages .= "<a href=\"" . $url_page . "/page/" . $j . "/\">$j</a> ";
							} else {

								if ($j == 1) {

									if ($user_query) {
										$pages .= "<a href=\"{$PHP_SELF}?{$user_query}{$prjlink}\">$j</a> ";
									} else $pages .= "<a href=\"{$config['http_home_url']}\">$j</a> ";
								} else {

									if ($user_query) {
										$pages .= "<a href=\"$PHP_SELF?cstart=$j&amp;$user_query".$prjlink."\">$j</a> ";
									} else $pages .= "<a href=\"$PHP_SELF?cstart=".$j.$prjlink."\">$j</a> ";
								}
							}
						} else {

							$pages .= "<span>$j</span> ";
						}
					}
				} else {

					$start = 1;
					$end = 10;
					$nav_prefix = "<span class=\"nav_ext\">{$lang['nav_trennen']}</span> ";

					if ($cstart > 0) {

						if ($cstart > 6) {

							$start = $cstart - 4;
							$end = $start + 8;

							if ($end >= $enpages_count - 1) {
								$start = $enpages_count - 9;
								$end = $enpages_count - 1;
							}
						}
					}
					if (isset($_COOKIE['dbname']))
					$prjlink = '&project=' . $_COOKIE['dbname'];
				  else
					$prjlink = '';
					if ($end >= $enpages_count - 1) $nav_prefix = "";
					else $nav_prefix = "<span class=\"nav_ext\">{$lang['nav_trennen']}</span> ";

					if ($start >= 2) {

						if ($start >= 3) $before_prefix = "<span class=\"nav_ext\">{$lang['nav_trennen']}</span> ";
						else $before_prefix = "";

						if ($config['allow_alt_url']) $pages .= "<a href=\"" . $url_page.$prjlink . "/\">1</a> " . $before_prefix;
						else {
							if ($user_query) $pages .= "<a href=\"$PHP_SELF?{$user_query}{$prjlink}\">1</a> " . $before_prefix;
							else $pages .= "<a href=\"{$config['http_home_url']}{$prjlink}\">1</a> " . $before_prefix;
						}
					}

					for ($j = $start; $j <= $end; $j++) {

						if ($j != $cstart) {
							if (isset($_COOKIE['dbname']))
							$prjlink = '&project=' . $_COOKIE['dbname'];
						  else
							$prjlink = '';
							if ($config['allow_alt_url']) {

								if ($j == 1)
									$pages .= "<a href=\"" . $url_page . "/\">$j</a> ";
								else
									$pages .= "<a href=\"" . $url_page . "/page/" . $j .$prjlink . "/\">$j</a> ";
							} else {

								if ($j == 1) {

									if ($user_query) {
										$pages .= "<a href=\"{$PHP_SELF}?{$user_query}{$prjlink}\">$j</a> ";
									} else $pages .= "<a href=\"{$config['http_home_url']}\">$j</a> ";
								} else {

									if ($user_query) {
										$pages .= "<a href=\"$PHP_SELF?cstart=$j&amp;$user_query\">$j</a> ";
									} else $pages .= "<a href=\"$PHP_SELF?cstart=".$j.$prjlink."\">$j</a> ";
								}
							}
						} else {

							$pages .= "<span>$j</span> ";
						}
					}

					if ($cstart != $enpages_count) {

						if ($config['allow_alt_url']) {

							$pages .= $nav_prefix . "<a href=\"" . $url_page . "/page/{$enpages_count}/\">{$enpages_count}</a>";
						} else {
							if (isset($_COOKIE['dbname']))
							$prjlink = '&project=' . $_COOKIE['dbname'];
						  else
							$prjlink = '';
							if ($user_query) $pages .= $nav_prefix . "<a href=\"$PHP_SELF?cstart={$enpages_count}{$prjlink}&amp;$user_query\">{$enpages_count}</a>";
							else $pages .= $nav_prefix . "<a href=\"$PHP_SELF?cstart={$enpages_count}{$prjlink}\">{$enpages_count}</a>";
						}
					} else
						$pages .= "<span>{$enpages_count}</span> ";
				}
			}
			$tpl->set('{pages}', $pages);
		}

		//----------------------------------
		// Next link
		//----------------------------------
		if ($config['news_number'] and $config['news_number'] < $count_all and $news_count < $count_all) {
			$next_page = $news_count / $config['news_number'] + 1;
			if (isset($_COOKIE['dbname']))
			$prjlink = '&project=' . $_COOKIE['dbname'].'&';
		  else
			$prjlink = '';
			if ($config['allow_alt_url']) {
				$next = $url_page . '/page/' . $next_page . '/';
				$tpl->set_block("'\[next-link\](.*?)\[/next-link\]'si", "<a href=\"" . $next . "\">\\1</a>");
			} else {

				if ($user_query) $next = $PHP_SELF . "?cstart=" . $next_page . "&amp;" . $user_query. $prjlink;
				else $next = $PHP_SELF . "?cstart=" . $next_page. $prjlink;

				$tpl->set_block("'\[next-link\](.*?)\[/next-link\]'si", "<a href=\"" . $next . "\">\\1</a>");
			}
		} else {
			$tpl->set_block("'\[next-link\](.*?)\[/next-link\]'si", "<span>\\1</span>");
			$no_next = TRUE;
		}

		if (!$no_prev or !$no_next) {

			$tpl->compile('navigation');

			switch ($config['news_navigation']) {

				case "2":

					$tpl->result['content'] = '{newsnavigation}' . $tpl->result['content'];
					break;

				case "3":

					$tpl->result['content'] = '{newsnavigation}' . $tpl->result['content'] . '{newsnavigation}';
					break;

				default:
					$tpl->result['content'] .= '{newsnavigation}';
					break;
			}
		} else $tpl->result['navigation'] = "";

		$tpl->clear();
	} else $tpl->result['navigation'] = "";
}
