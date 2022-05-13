<?php

/*
  This is a ***DEMO*** , the backend / PHP provided is very basic. You can use it as a starting point maybe, but ***do not use this on production***. It doesn't preform any server-side validation, checks, authentication, etc.

  For more read the README.md file on this folder.

  Based on the examples provided on:
  - http://php.net/manual/en/features.file-upload.php
*/

header('Content-type:multipart/form-data');
header('Access-Control-Allow-Origin: *');
header("Content-type: text/html; charset=utf-8");

function translit($str) {
  $rus = array('А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я', 'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я');
  $lat = array('A', 'B', 'V', 'G', 'D', 'E', 'E', 'Gh', 'Z', 'I', 'Y', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'F', 'H', 'C', 'Ch', 'Sh', 'Sch', 'Y', 'Y', 'Y', 'E', 'Yu', 'Ya', 'a', 'b', 'v', 'g', 'd', 'e', 'e', 'gh', 'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'h', 'c', 'ch', 'sh', 'sch', 'y', 'y', 'y', 'e', 'yu', 'ya');
  return str_replace($rus, $lat, $str);
}

// Simple PHP Upload Script:  http://coursesweb.net/php-mysql/

$uploadpath = 'templates/cherapp/CherApp/images/set/';      // directory to store the uploaded files
$max_size = 50000;          // maximum file size, in KiloBytes
$alwidth = 5900;            // maximum allowed width, in pixels
$alheight = 5800;           // maximum allowed height, in pixels
$allowtype = array('jpg','gif','png', 'bmp');         // allowed extensions

if(isset($_FILES['fileup']) && strlen($_FILES['fileup']['name']) > 1) {
    $path_parts = pathinfo(translit($_FILES['fileup']['name']));
    $dest_filename = $path_parts['filename'] . date('mdyHis') . '.' . $path_parts['extension'];
    
  $uploadpath = $uploadpath . $dest_filename;       // gets the file name
  $sepext = explode('.', strtolower($_FILES['fileup']['name']));
  $type = end($sepext);       // gets extension
  list($width, $height) = getimagesize($_FILES['fileup']['tmp_name']);     // gets image width and height
  $err = '';         // to store the errors

  // Checks if the file has allowed type, size, width and height (for images)
  if(!in_array($type, $allowtype)) $err .= 'The file: <b>'. $_FILES['fileup']['name']. '</b> not has the allowed extension type.';
  if($_FILES['fileup']['size'] > $max_size*1000) $err .= '<br/>Maximum file size must be: '. $max_size. ' KB.';
  if(isset($width) && isset($height) && ($width >= $alwidth || $height >= $alheight)) $err .= '<br/>The maximum Width x Height must be: '. $alwidth. ' x '. $alheight;

  // If no errors, upload the image, else, output the errors
  if($err == '') {
    if(move_uploaded_file($_FILES['fileup']['tmp_name'], $uploadpath)) { 
      echo 'File: <b>'. basename( $_FILES['fileup']['name']). '</b> successfully uploaded:';
      echo '<br/>File type: <b>'. $_FILES['fileup']['type'] .'</b>';
      echo '<br />Size: <b>'. number_format($_FILES['fileup']['size']/1024, 3, '.', '') .'</b> KB';
      if(isset($width) && isset($height)) echo '<br/>Image Width x Height: '. $width. ' x '. $height;
      //echo '<br/><br/>File address: <b>http://'.$_SERVER['HTTP_HOST'].rtrim(dirname($_SERVER['REQUEST_URI']), '\\\\/').'/'.$uploadpath.'</b>';
        echo '<br><br><br> NOW COOPY THIS LINK';
      
    }
    else echo '<b>Unable to upload the file.</b>';
  }
}
if(isset($_FILES['filecontent']) && strlen($_FILES['filecontent']['name']) > 1) {
    $uploadpath = 'templates/cherapp/CherApp/content/images/';
    $path_parts = pathinfo(translit($_FILES['filecontent']['name']));
    $dest_filename = $path_parts['filename'] . date('mdyHis') . '.' . $path_parts['extension'];
    
  $uploadpath = $uploadpath . $dest_filename;       // gets the file name
  $sepext = explode('.', strtolower($_FILES['filecontent']['name']));
  $type = end($sepext);       // gets extension
  list($width, $height) = getimagesize($_FILES['filecontent']['tmp_name']);     // gets image width and height
  $err = '';         // to store the errors

  // Checks if the file has allowed type, size, width and height (for images)
  if(!in_array($type, $allowtype)) $err .= 'The file: <b>'. $_FILES['filecontent']['name']. '</b> not has the allowed extension type.';
  if($_FILES['filecontent']['size'] > $max_size*1000) $err .= '<br/>Maximum file size must be: '. $max_size. ' KB.';
  if(isset($width) && isset($height) && ($width >= $alwidth || $height >= $alheight)) $err .= '<br/>The maximum Width x Height must be: '. $alwidth. ' x '. $alheight;

  // If no errors, upload the image, else, output the errors
  if($err == '') {
    if(move_uploaded_file($_FILES['filecontent']['tmp_name'], $uploadpath)) { 
      echo 'Okhttps://'.$_SERVER['HTTP_HOST'].rtrim(dirname($_SERVER['REQUEST_URI']), '\\\\/').'/'.$uploadpath;
      
    }
    else echo '<b>Unable to upload the file.</b>';
  }
}
