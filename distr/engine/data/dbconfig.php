<?PHP

define ("DBHOST", "localhost:3306");

if (isset($_COOKIE['site_bz']))
    $gl_bd = 'bz_'.$_COOKIE['site_bz'];
else
    $gl_bd = 'bz_admin';  // Основная база данных

if (isset($_COOKIE['dbname']))
    $dbname = 'bz_'.$_COOKIE['dbname'];
else
    $dbname = $gl_bd;

define ("DBNAME", $dbname);

define ("DBUSER", "root");

define ("DBPASS", "password");

define ("PREFIX", "dle");

define ("USERPREFIX", "dle");

define ("COLLATE", "utf8mb4");

define('SECURE_AUTH_KEY', '(cs5bD :Z/agx^Ou>B>SDu;x^fALz+Ef3vP`iinrm^37)]/`o jdXuCEn.I+D');

$db = new db;

?>
