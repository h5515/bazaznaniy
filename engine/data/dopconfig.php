<?php
echo "2<br>";
if (is_file(ENGINE_DIR . '/data/dopconfig/'.$dopconfigFile)){
    echo "3<br>";
    include ENGINE_DIR . '/data/dopconfig/'.$dopconfigFile;
    $config = array_merge($config, $dopconfig);
    echo "4<br>";
}