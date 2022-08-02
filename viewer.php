<?php
define('DATALIFEENGINE', true);
define('ROOT_DIR', dirname(__FILE__));
define('ENGINE_DIR', ROOT_DIR . '/engine');



include ENGINE_DIR . '/data/config.php';
require_once ENGINE_DIR . '/classes/mysql.php';
require_once ENGINE_DIR . '/data/dbconfig.php';
require_once ENGINE_DIR . '/modules/functions.php';

session_start();
if (isset($_GET['project'])) {
    $_SESSION['dbname'] = $_GET['project'];
    set_cookie("dbname", $_GET['project'], 365);
    $_COOKIE['dbname'] = $_GET['project'];
} else {
    unset($_SESSION["dbname"]);
    set_cookie("dbname", '', 0);
    unset($_COOKIE['dbname']);
}

require_once ENGINE_DIR . '/modules/sitelogin.php';

if (empty($member_id['name']) || empty($_GET['id']) || $_GET['id'] = '')
    die('Haker atack.');

if (isset($_COOKIE['dbname'])) {
    $prjlink = '&project=' . $_COOKIE['dbname'];
} else {
    $prjlink = '';
}

$id = $_GET['id'];

$link = $config['http_home_url'] . "index.php?do=download&id=" . $id . $prjlink;

?>

<div id="placeholder"></div>
<script type="text/javascript" src="http://10.1.82.74/web-apps/apps/api/documents/api.js"></script>

<script>
new DocsAPI.DocEditor("placeholder", {
    "document": {
        "fileType": "docx",
        "key": "Khirz6zTPdfd7",
        "title": "Example Document Title.docx",
        "url": "<?php echo $link;?>"
    },
    "documentType": "word"
});

</script>