<?php

header('Content-type: text/html');
header('Access-Control-Allow-Origin: *');

//@session_start();
@error_reporting( E_ALL ^ E_WARNING ^ E_NOTICE );
@ini_set( 'display_errors', true );
@ini_set( 'html_errors', false );
@ini_set( 'error_reporting', E_ALL ^ E_WARNING ^ E_NOTICE );

define( 'DATALIFEENGINE', true );
define( 'ROOT_DIR', '../..' );
define( 'ENGINE_DIR', '../../engine' );

include ENGINE_DIR . '/data/config.php';


require_once ENGINE_DIR . '/classes/plugins.class.php';
require_once ENGINE_DIR . '/classes/mysql.php';
require_once ENGINE_DIR . '/data/dbconfig.php';
require_once ENGINE_DIR . '/modules/functions.php';
require_once ENGINE_DIR . '/modules/sitelogin.php';


require_once( DLEPlugins::Check( ENGINE_DIR . '/modules/functions.php' ) );

set_time_limit(0);

// where does the data come from ? In real world this would be a SQL query or something
$data_source_file = 'data.txt';


if (isset($_POST['comand']) and $_POST['comand']=='sendserver'){
    $html = $_POST['tabl'];
    $tim = $_POST['tims'];
    $fil = 'timer.txt';
    $filtim = 'stimer.txt';
    $stimer = $_POST['stimer'];
    file_put_contents($filtim, $stimer, LOCK_EX);
    file_put_contents($fil, $tim, LOCK_EX);
    file_put_contents($data_source_file, $html, LOCK_EX);
    echo "Данные отправлены успешно";
    die();
}

$fileserver = 'clientnomer.txt';

if (isset($_POST['comand']) and $_POST['comand']=='sendclient'){
    $nomeradd = trim($_POST['nomeradd']);
    $nomerclear = trim($_POST['nomerclear']);
    $user = trim($_POST['user']);
    $result = array(
        'nomeradd' => $nomeradd,
        'nomerclear' => $nomerclear,
        'user' => $user
    );
    $json = json_encode($result);
    file_put_contents($fileserver , $json, LOCK_EX);
    die();
}


if (isset($_GET['comand']) and $_GET['comand']=='connectserver'){
    while (true) {
        $last_ajax_call = isset($_GET['timestamp']) ? (int)$_GET['timestamp'] : null; 
        clearstatcache();
        $last_change_in_data_file = filemtime($fileserver);
        if ($last_ajax_call == null || $last_change_in_data_file > $last_ajax_call) {
            $data = file_get_contents($fileserver);
            $data = str_replace('\n\n    ','',$data);
            $data = str_replace('\n','',$data);
            $result = json_decode($data,true);
            if ($result['nomeradd']!='')
            $addreg = $result['nomeradd'];
            else
            $addreg = '';
            if ($result['nomerclear'])
            $noreg = $result['nomerclear'];
            else
            $noreg = '';
            $user = $result['user'];
            $res = array(
                'timestamp' => $last_change_in_data_file,
                'nomeradd' => $addreg,
                'nomerclear' => $noreg,
                'user' => $user
            );
            echo json_encode($res);
            break;
        } else {
            sleep( 1 );
            continue;
        }
    }
    die();
};

// main loop
while (true) {

    // if ajax request has send a timestamp, then $last_ajax_call = timestamp, else $last_ajax_call = null
    $last_ajax_call = isset($_GET['timestamp']) ? (int)$_GET['timestamp'] : null;

    // PHP caches file data, like requesting the size of a file, by default. clearstatcache() clears that cache
    clearstatcache();
    // get timestamp of when file has been changed the last time
    $last_change_in_data_file = filemtime($data_source_file);

    // if no timestamp delivered via ajax or data.txt has been changed SINCE last ajax timestamp
    if ($last_ajax_call == null || $last_change_in_data_file > $last_ajax_call) {

        // get content of data.txt
        $timeB = time();
        $fiveMinutes = 200;
        if ( ($last_change_in_data_file+$fiveMinutes) <= $timeB) {
           $nerab = true;
          }
          else {
            $nerab = false;
          }

        $data = file_get_contents($data_source_file);
        $fil = 'timer.txt';
        $tim = file_get_contents($fil);

        $filtim = 'stimer.txt';
        $stimer = file_get_contents($filtim);
        // put data.txt's content and timestamp of last data.txt change into array
        $result = array(
            'data_from_file' => $data,
            'timestamp' => $last_change_in_data_file,
            'ubdatetim' => $tim,
            'nerab' => $nerab,
            'stimer' => $stimer
        );

        // encode to JSON, render the result (for AJAX)
        $json = json_encode($result);
        echo $json;

        // leave this loop step
        break;

    } else {
        // wait for 1 sec (not very sexy as this blocks the PHP/Apache process, but that's how it goes)
        sleep( 1 );
        continue;
    }
}
