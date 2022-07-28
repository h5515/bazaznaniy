-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               5.7.21-log - MySQL Community Server (GPL)
-- Операционная система:         Win64
-- HeidiSQL Версия:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Дамп структуры для таблица bz_it.dle_category
CREATE TABLE IF NOT EXISTS `dle_category` (
  `id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `parentid` mediumint(8) NOT NULL DEFAULT '0',
  `posi` mediumint(8) NOT NULL DEFAULT '1',
  `name` varchar(50) NOT NULL DEFAULT '',
  `alt_name` varchar(50) NOT NULL DEFAULT '',
  `icon` varchar(200) NOT NULL DEFAULT '',
  `skin` varchar(50) NOT NULL DEFAULT '',
  `descr` varchar(300) NOT NULL DEFAULT '',
  `keywords` text,
  `news_sort` varchar(10) NOT NULL DEFAULT '',
  `news_msort` varchar(4) NOT NULL DEFAULT '',
  `news_number` smallint(5) NOT NULL DEFAULT '0',
  `short_tpl` varchar(40) NOT NULL DEFAULT '',
  `full_tpl` varchar(40) NOT NULL DEFAULT '',
  `metatitle` varchar(255) NOT NULL DEFAULT '',
  `show_sub` tinyint(1) NOT NULL DEFAULT '0',
  `allow_rss` tinyint(1) NOT NULL DEFAULT '1',
  `fulldescr` text,
  `disable_search` tinyint(1) NOT NULL DEFAULT '0',
  `disable_main` tinyint(1) NOT NULL DEFAULT '0',
  `disable_rating` tinyint(1) NOT NULL DEFAULT '0',
  `disable_comments` tinyint(1) NOT NULL DEFAULT '0',
  `enable_dzen` tinyint(1) NOT NULL DEFAULT '1',
  `enable_turbo` tinyint(1) NOT NULL DEFAULT '1',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `rating_type` tinyint(1) NOT NULL DEFAULT '-1',
  `arhiv` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `parentid` (`parentid`),
  KEY `posi` (`posi`),
  KEY `arhiv` (`arhiv`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_category: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_category` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_category_face
CREATE TABLE IF NOT EXISTS `dle_category_face` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `name_pages` varchar(255) DEFAULT NULL,
  `description` text,
  `description_pages` text,
  `module_placement` enum('nowhere','first_page','all_pages') DEFAULT NULL,
  `show_name` enum('show','default','hide') DEFAULT NULL,
  `show_description` enum('show','default','hide') DEFAULT NULL,
  `name_placement` enum('first_page','all_pages') DEFAULT NULL,
  `description_placement` enum('first_page','all_pages') DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

-- Дамп данных таблицы bz_it.dle_category_face: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_category_face` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_category_face` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_comments
CREATE TABLE IF NOT EXISTS `dle_comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `date` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `autor` varchar(40) NOT NULL DEFAULT '',
  `email` varchar(40) NOT NULL DEFAULT '',
  `text` text,
  `ip` varchar(46) NOT NULL DEFAULT '',
  `is_register` tinyint(1) NOT NULL DEFAULT '0',
  `approve` tinyint(1) NOT NULL DEFAULT '1',
  `rating` int(11) NOT NULL DEFAULT '0',
  `vote_num` int(11) NOT NULL DEFAULT '0',
  `parent` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  KEY `approve` (`approve`),
  KEY `parent` (`parent`),
  KEY `rating` (`rating`),
  FULLTEXT KEY `text` (`text`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_comments: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_comments` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_comments_files
CREATE TABLE IF NOT EXISTS `dle_comments_files` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `c_id` int(10) NOT NULL DEFAULT '0',
  `author` varchar(40) NOT NULL DEFAULT '',
  `date` varchar(15) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `c_id` (`c_id`),
  KEY `author` (`author`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_comments_files: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_comments_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_comments_files` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_comment_rating_log
CREATE TABLE IF NOT EXISTS `dle_comment_rating_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `c_id` int(11) NOT NULL DEFAULT '0',
  `member` varchar(40) NOT NULL DEFAULT '',
  `ip` varchar(46) NOT NULL DEFAULT '',
  `rating` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `c_id` (`c_id`),
  KEY `member` (`member`),
  KEY `ip` (`ip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_comment_rating_log: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_comment_rating_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_comment_rating_log` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_draft
CREATE TABLE IF NOT EXISTS `dle_draft` (
  `id` int(11) NOT NULL,
  `user` char(50) DEFAULT NULL,
  `full` text,
  UNIQUE KEY `user` (`user`,`id`) USING BTREE,
  FULLTEXT KEY `full` (`full`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы bz_it.dle_draft: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_draft` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_draft` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_files
CREATE TABLE IF NOT EXISTS `dle_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(250) NOT NULL DEFAULT '',
  `onserver` varchar(250) NOT NULL DEFAULT '',
  `author` varchar(40) NOT NULL DEFAULT '',
  `date` varchar(15) NOT NULL DEFAULT '',
  `dcount` int(11) NOT NULL DEFAULT '0',
  `size` bigint(20) NOT NULL DEFAULT '0',
  `checksum` char(32) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `news_id` (`news_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_files: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_files` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_ignore_list
CREATE TABLE IF NOT EXISTS `dle_ignore_list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL DEFAULT '0',
  `user_from` varchar(40) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  KEY `user_from` (`user_from`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_ignore_list: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_ignore_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_ignore_list` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_images
CREATE TABLE IF NOT EXISTS `dle_images` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `images` text,
  `news_id` int(10) NOT NULL DEFAULT '0',
  `author` varchar(40) NOT NULL DEFAULT '',
  `date` varchar(15) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `author` (`author`),
  KEY `news_id` (`news_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_images: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_images` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_links
CREATE TABLE IF NOT EXISTS `dle_links` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `word` varchar(255) NOT NULL DEFAULT '',
  `link` varchar(255) NOT NULL DEFAULT '',
  `only_one` tinyint(1) NOT NULL DEFAULT '0',
  `replacearea` tinyint(1) NOT NULL DEFAULT '1',
  `rcount` tinyint(3) NOT NULL DEFAULT '0',
  `targetblank` tinyint(1) NOT NULL DEFAULT '0',
  `title` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_links: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_links` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_links` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_login_log
CREATE TABLE IF NOT EXISTS `dle_login_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ip` varchar(46) NOT NULL DEFAULT '',
  `count` smallint(6) NOT NULL DEFAULT '0',
  `date` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ip` (`ip`),
  KEY `date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_login_log: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_login_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_login_log` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_logs
CREATE TABLE IF NOT EXISTS `dle_logs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `news_id` int(10) NOT NULL DEFAULT '0',
  `member` varchar(40) NOT NULL DEFAULT '',
  `ip` varchar(46) NOT NULL DEFAULT '',
  `rating` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `news_id` (`news_id`),
  KEY `member` (`member`),
  KEY `ip` (`ip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_logs: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_logs` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_lostdb
CREATE TABLE IF NOT EXISTS `dle_lostdb` (
  `id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `lostname` mediumint(8) NOT NULL DEFAULT '0',
  `lostid` varchar(40) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `lostid` (`lostid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_lostdb: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_lostdb` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_lostdb` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_mail_log
CREATE TABLE IF NOT EXISTS `dle_mail_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `mail` varchar(50) NOT NULL DEFAULT '',
  `hash` varchar(40) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `hash` (`hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_mail_log: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_mail_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_mail_log` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_metatags
CREATE TABLE IF NOT EXISTS `dle_metatags` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(250) NOT NULL DEFAULT '',
  `title` varchar(200) NOT NULL DEFAULT '',
  `description` varchar(300) NOT NULL DEFAULT '',
  `keywords` text,
  `page_title` varchar(255) NOT NULL DEFAULT '',
  `page_description` text,
  `robots` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_metatags: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_metatags` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_metatags` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_notice
CREATE TABLE IF NOT EXISTS `dle_notice` (
  `id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `notice` text,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_notice: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_notice` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_notice` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_plugins
CREATE TABLE IF NOT EXISTS `dle_plugins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  `description` varchar(255) NOT NULL DEFAULT '',
  `icon` varchar(255) NOT NULL DEFAULT '',
  `version` varchar(10) NOT NULL DEFAULT '',
  `dleversion` varchar(10) NOT NULL DEFAULT '',
  `versioncompare` char(2) NOT NULL DEFAULT '',
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `mysqlinstall` text NOT NULL,
  `mysqlupgrade` text NOT NULL,
  `mysqlenable` text NOT NULL,
  `mysqldisable` text NOT NULL,
  `mysqldelete` text NOT NULL,
  `filedelete` tinyint(1) NOT NULL DEFAULT '0',
  `filelist` text NOT NULL,
  `upgradeurl` varchar(255) NOT NULL DEFAULT '',
  `needplugin` varchar(100) NOT NULL DEFAULT '',
  `phpinstall` text NOT NULL,
  `phpupgrade` text NOT NULL,
  `phpenable` text NOT NULL,
  `phpdisable` text NOT NULL,
  `phpdelete` text NOT NULL,
  `notice` text NOT NULL,
  `mnotice` tinyint(1) NOT NULL DEFAULT '0',
  `posi` mediumint(8) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_plugins: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_plugins` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_plugins` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_plugins_files
CREATE TABLE IF NOT EXISTS `dle_plugins_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plugin_id` int(11) NOT NULL DEFAULT '0',
  `file` varchar(255) NOT NULL DEFAULT '',
  `action` varchar(10) NOT NULL DEFAULT '',
  `searchcode` text NOT NULL,
  `replacecode` mediumtext NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `searchcount` smallint(6) NOT NULL DEFAULT '0',
  `replacecount` smallint(6) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `plugin_id` (`plugin_id`),
  KEY `active` (`active`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_plugins_files: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_plugins_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_plugins_files` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_plugins_logs
CREATE TABLE IF NOT EXISTS `dle_plugins_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plugin_id` int(11) NOT NULL DEFAULT '0',
  `area` text NOT NULL,
  `error` text NOT NULL,
  `type` varchar(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `plugin_id` (`plugin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_plugins_logs: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_plugins_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_plugins_logs` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_poll
CREATE TABLE IF NOT EXISTS `dle_poll` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `news_id` int(10) unsigned NOT NULL DEFAULT '0',
  `title` varchar(200) NOT NULL DEFAULT '',
  `frage` varchar(200) NOT NULL DEFAULT '',
  `body` text NOT NULL,
  `votes` mediumint(8) NOT NULL DEFAULT '0',
  `multiple` tinyint(1) NOT NULL DEFAULT '0',
  `answer` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `news_id` (`news_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_poll: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_poll` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_poll` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_poll_log
CREATE TABLE IF NOT EXISTS `dle_poll_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `news_id` int(10) unsigned NOT NULL DEFAULT '0',
  `member` varchar(40) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `news_id` (`news_id`),
  KEY `member` (`member`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_poll_log: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_poll_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_poll_log` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_post
CREATE TABLE IF NOT EXISTS `dle_post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `autor` varchar(40) NOT NULL DEFAULT '',
  `date` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `short_story` mediumtext,
  `full_story` mediumtext,
  `xfields` mediumtext,
  `title` varchar(255) NOT NULL DEFAULT '',
  `descr` varchar(300) NOT NULL DEFAULT '',
  `keywords` text,
  `category` varchar(190) NOT NULL DEFAULT '0',
  `alt_name` varchar(190) NOT NULL DEFAULT '',
  `comm_num` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `allow_comm` tinyint(1) NOT NULL DEFAULT '1',
  `allow_main` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `approve` tinyint(1) NOT NULL DEFAULT '0',
  `fixed` tinyint(1) NOT NULL DEFAULT '0',
  `allow_br` tinyint(1) NOT NULL DEFAULT '1',
  `symbol` varchar(3) NOT NULL DEFAULT '',
  `tags` varchar(255) NOT NULL DEFAULT '',
  `metatitle` varchar(255) NOT NULL DEFAULT '',
  `arhiv` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `autor` (`autor`),
  KEY `alt_name` (`alt_name`),
  KEY `category` (`category`),
  KEY `approve` (`approve`),
  KEY `allow_main` (`allow_main`),
  KEY `date` (`date`),
  KEY `symbol` (`symbol`),
  KEY `comm_num` (`comm_num`),
  KEY `fixed` (`fixed`),
  KEY `arhiv` (`arhiv`) USING BTREE,
  FULLTEXT KEY `short_story` (`short_story`,`full_story`,`xfields`,`title`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_post: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_post` DISABLE KEYS */;
INSERT INTO `dle_post` (`id`, `autor`, `date`, `short_story`, `full_story`, `xfields`, `title`, `descr`, `keywords`, `category`, `alt_name`, `comm_num`, `allow_comm`, `allow_main`, `approve`, `fixed`, `allow_br`, `symbol`, `tags`, `metatitle`, `arhiv`) VALUES
	(1, 'admin', '2021-09-04 15:55:10', '', '<h1>Добро пожаловать в базу знаний ФТО!</h1><p>После добавление статьи. Данную статью следует удалить.</p><p><br></p><p><a class=\\"highslide\\" href=\\"http://localhost:81/uploads/posts/2021-09/1630770970_ttt.jpg\\"><img src=\\"http://localhost:81/uploads/posts/2021-09/thumbs/1630770970_ttt.jpg\\" class=\\"fr-fic fr-dib\\" alt=\\"\\"></a></p>', '', 'Добро пожаловать', '', '', '2', 'dobro-pozhalovat', 0, 1, 1, 1, 0, 0, 'Д', '', '', 0);
/*!40000 ALTER TABLE `dle_post` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_post_arhiv
CREATE TABLE IF NOT EXISTS `dle_post_arhiv` (
  `ids` int(11) NOT NULL AUTO_INCREMENT,
  `id` int(11) NOT NULL,
  `autor` varchar(40) NOT NULL DEFAULT '',
  `date` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `short_story` mediumtext,
  `full_story` mediumtext,
  `xfields` mediumtext,
  `title` varchar(255) NOT NULL DEFAULT '',
  `descr` varchar(300) NOT NULL DEFAULT '',
  `keywords` text,
  `category` varchar(190) NOT NULL DEFAULT '0',
  `alt_name` varchar(190) NOT NULL DEFAULT '',
  `comm_num` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `allow_comm` tinyint(1) NOT NULL DEFAULT '1',
  `allow_main` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `approve` tinyint(1) NOT NULL DEFAULT '0',
  `fixed` tinyint(1) NOT NULL DEFAULT '0',
  `allow_br` tinyint(1) NOT NULL DEFAULT '1',
  `symbol` varchar(3) NOT NULL DEFAULT '',
  `tags` varchar(255) NOT NULL DEFAULT '',
  `metatitle` varchar(255) NOT NULL DEFAULT '',
  `arhiv` tinyint(1) NOT NULL DEFAULT '0',
  `istor` tinyint(1) NOT NULL DEFAULT '0',
  `edate` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`ids`),
  KEY `autor` (`autor`),
  KEY `alt_name` (`alt_name`),
  KEY `category` (`category`),
  KEY `approve` (`approve`),
  KEY `allow_main` (`allow_main`),
  KEY `date` (`date`),
  KEY `symbol` (`symbol`),
  KEY `comm_num` (`comm_num`),
  KEY `fixed` (`fixed`),
  KEY `arhiv` (`arhiv`),
  KEY `istor` (`istor`),
  KEY `id` (`id`) USING BTREE,
  FULLTEXT KEY `short_story` (`short_story`,`full_story`,`xfields`,`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_post_arhiv: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_post_arhiv` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_post_arhiv` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_post_extras
CREATE TABLE IF NOT EXISTS `dle_post_extras` (
  `eid` int(11) NOT NULL AUTO_INCREMENT,
  `news_id` int(11) NOT NULL DEFAULT '0',
  `news_read` int(11) NOT NULL DEFAULT '0',
  `allow_rate` tinyint(1) NOT NULL DEFAULT '1',
  `rating` int(11) NOT NULL DEFAULT '0',
  `vote_num` int(11) NOT NULL DEFAULT '0',
  `votes` tinyint(1) NOT NULL DEFAULT '0',
  `view_edit` tinyint(1) NOT NULL DEFAULT '0',
  `disable_index` tinyint(1) NOT NULL DEFAULT '0',
  `related_ids` varchar(255) NOT NULL DEFAULT '',
  `access` varchar(150) NOT NULL DEFAULT '',
  `editdate` int(11) unsigned NOT NULL DEFAULT '0',
  `editor` varchar(40) NOT NULL DEFAULT '',
  `reason` varchar(255) NOT NULL DEFAULT '',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `disable_search` tinyint(1) NOT NULL DEFAULT '0',
  `need_pass` tinyint(1) NOT NULL DEFAULT '0',
  `allow_rss` tinyint(1) NOT NULL DEFAULT '1',
  `allow_rss_turbo` tinyint(1) NOT NULL DEFAULT '1',
  `allow_rss_dzen` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`eid`),
  KEY `news_id` (`news_id`),
  KEY `user_id` (`user_id`),
  KEY `rating` (`rating`),
  KEY `disable_search` (`disable_search`),
  KEY `allow_rss` (`allow_rss`),
  KEY `news_read` (`news_read`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_post_extras: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_post_extras` DISABLE KEYS */;
INSERT INTO `dle_post_extras` (`eid`, `news_id`, `news_read`, `allow_rate`, `rating`, `vote_num`, `votes`, `view_edit`, `disable_index`, `related_ids`, `access`, `editdate`, `editor`, `reason`, `user_id`, `disable_search`, `need_pass`, `allow_rss`, `allow_rss_turbo`, `allow_rss_dzen`) VALUES
	(1, 1, 4, 0, 0, 0, 0, 0, 0, '', '', 0, '', '', 1, 0, 0, 1, 1, 1);
/*!40000 ALTER TABLE `dle_post_extras` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_post_extras_cats
CREATE TABLE IF NOT EXISTS `dle_post_extras_cats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_id` int(11) NOT NULL DEFAULT '0',
  `cat_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `news_id` (`news_id`),
  KEY `cat_id` (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_post_extras_cats: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_post_extras_cats` DISABLE KEYS */;
INSERT INTO `dle_post_extras_cats` (`id`, `news_id`, `cat_id`) VALUES
	(1, 1, 2);
/*!40000 ALTER TABLE `dle_post_extras_cats` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_post_log
CREATE TABLE IF NOT EXISTS `dle_post_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_id` int(11) NOT NULL DEFAULT '0',
  `expires` varchar(15) NOT NULL DEFAULT '',
  `action` tinyint(1) NOT NULL DEFAULT '0',
  `move_cat` varchar(190) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `news_id` (`news_id`),
  KEY `expires` (`expires`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_post_log: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_post_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_post_log` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_post_pass
CREATE TABLE IF NOT EXISTS `dle_post_pass` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_id` int(11) NOT NULL DEFAULT '0',
  `password` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `news_id` (`news_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_post_pass: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_post_pass` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_post_pass` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_post_read
CREATE TABLE IF NOT EXISTS `dle_post_read` (
  `id_news` int(11) NOT NULL,
  `user` varchar(20) NOT NULL DEFAULT '',
  UNIQUE KEY `id_news` (`id_news`,`user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Дамп данных таблицы bz_it.dle_post_read: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_post_read` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_post_read` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_post_view
CREATE TABLE IF NOT EXISTS `dle_post_view` (
  `user` varchar(20) DEFAULT NULL,
  `post_id` int(7) DEFAULT NULL,
  `date_read` varchar(20) DEFAULT NULL,
  UNIQUE KEY `user` (`user`,`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы bz_it.dle_post_view: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_post_view` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_post_view` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_question
CREATE TABLE IF NOT EXISTS `dle_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(255) NOT NULL DEFAULT '',
  `answer` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_question: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_question` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_question` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_read_log
CREATE TABLE IF NOT EXISTS `dle_read_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `news_id` int(11) NOT NULL DEFAULT '0',
  `ip` varchar(46) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `news_id` (`news_id`),
  KEY `ip` (`ip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_read_log: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_read_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_read_log` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_redirects
CREATE TABLE IF NOT EXISTS `dle_redirects` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `from` varchar(250) NOT NULL DEFAULT '',
  `to` varchar(250) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_redirects: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_redirects` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_redirects` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_rss
CREATE TABLE IF NOT EXISTS `dle_rss` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `allow_main` tinyint(1) NOT NULL DEFAULT '0',
  `allow_rating` tinyint(1) NOT NULL DEFAULT '0',
  `allow_comm` tinyint(1) NOT NULL DEFAULT '0',
  `text_type` tinyint(1) NOT NULL DEFAULT '0',
  `date` tinyint(1) NOT NULL DEFAULT '0',
  `search` text NOT NULL,
  `max_news` tinyint(3) NOT NULL DEFAULT '0',
  `cookie` text NOT NULL,
  `category` smallint(5) NOT NULL DEFAULT '0',
  `lastdate` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_rss: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_rss` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_rss` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_rssinform
CREATE TABLE IF NOT EXISTS `dle_rssinform` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `tag` varchar(40) NOT NULL DEFAULT '',
  `descr` varchar(255) NOT NULL DEFAULT '',
  `category` varchar(200) NOT NULL DEFAULT '',
  `url` varchar(255) NOT NULL DEFAULT '',
  `template` varchar(40) NOT NULL DEFAULT '',
  `news_max` smallint(5) NOT NULL DEFAULT '0',
  `tmax` smallint(5) NOT NULL DEFAULT '0',
  `dmax` smallint(5) NOT NULL DEFAULT '0',
  `approve` tinyint(1) NOT NULL DEFAULT '1',
  `rss_date_format` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_rssinform: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_rssinform` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_rssinform` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_sendlog
CREATE TABLE IF NOT EXISTS `dle_sendlog` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user` varchar(40) NOT NULL DEFAULT '',
  `date` int(11) unsigned NOT NULL DEFAULT '0',
  `flag` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  KEY `date` (`date`),
  KEY `flag` (`flag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_sendlog: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_sendlog` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_sendlog` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_statmenu
CREATE TABLE IF NOT EXISTS `dle_statmenu` (
  `id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `parentid` mediumint(8) NOT NULL DEFAULT '0',
  `posi` mediumint(8) NOT NULL DEFAULT '1',
  `name` varchar(50) NOT NULL DEFAULT '',
  `url` varchar(255) NOT NULL DEFAULT '',
  `alt_name` varchar(255) NOT NULL DEFAULT '',
  `alt_name_pr` mediumint(8) NOT NULL DEFAULT '0',
  `metatitle` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_statmenu: 0 rows
/*!40000 ALTER TABLE `dle_statmenu` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_statmenu` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_subscribe
CREATE TABLE IF NOT EXISTS `dle_subscribe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(40) NOT NULL DEFAULT '',
  `email` varchar(50) NOT NULL DEFAULT '',
  `news_id` int(11) NOT NULL DEFAULT '0',
  `hash` varchar(32) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `news_id` (`news_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_subscribe: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_subscribe` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_subscribe` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_tags
CREATE TABLE IF NOT EXISTS `dle_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_id` int(11) NOT NULL DEFAULT '0',
  `tag` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `category` varchar(119) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `news_id` (`news_id`),
  KEY `tag` (`tag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_tags: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_tags` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_users
CREATE TABLE IF NOT EXISTS `dle_users` (
  `name` varchar(40) NOT NULL DEFAULT '',
  `favorites` text,
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_users: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_users` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_views
CREATE TABLE IF NOT EXISTS `dle_views` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_views: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_views` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_views` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_vote
CREATE TABLE IF NOT EXISTS `dle_vote` (
  `id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `category` text,
  `vote_num` mediumint(8) NOT NULL DEFAULT '0',
  `date` varchar(25) NOT NULL DEFAULT '0',
  `title` varchar(200) NOT NULL DEFAULT '',
  `body` text,
  `approve` tinyint(1) NOT NULL DEFAULT '1',
  `start` varchar(15) NOT NULL DEFAULT '',
  `end` varchar(15) NOT NULL DEFAULT '',
  `grouplevel` varchar(250) NOT NULL DEFAULT 'all',
  PRIMARY KEY (`id`),
  KEY `approve` (`approve`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_vote: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_vote` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_vote` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_vote_result
CREATE TABLE IF NOT EXISTS `dle_vote_result` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `ip` varchar(46) NOT NULL DEFAULT '',
  `name` varchar(40) NOT NULL DEFAULT '',
  `vote_id` mediumint(8) NOT NULL DEFAULT '0',
  `answer` tinyint(3) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `answer` (`answer`),
  KEY `vote_id` (`vote_id`),
  KEY `ip` (`ip`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_vote_result: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_vote_result` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_vote_result` ENABLE KEYS */;

-- Дамп структуры для таблица bz_it.dle_xfsearch
CREATE TABLE IF NOT EXISTS `dle_xfsearch` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_id` int(11) NOT NULL DEFAULT '0',
  `tagname` varchar(50) NOT NULL DEFAULT '',
  `tagvalue` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `news_id` (`news_id`),
  KEY `tagname` (`tagname`),
  KEY `tagvalue` (`tagvalue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дамп данных таблицы bz_it.dle_xfsearch: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `dle_xfsearch` DISABLE KEYS */;
/*!40000 ALTER TABLE `dle_xfsearch` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
