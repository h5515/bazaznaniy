<?php

$dir = __DIR__ . '/../templates/Default/css/theme';
 
$files = array();
foreach(glob($dir . '/*.css') as $file) {
	$files[] = pathinfo($file,PATHINFO_FILENAME);	
} 

echo '["blue","'.implode('","', $files).'"]';