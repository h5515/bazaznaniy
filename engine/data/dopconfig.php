<?php

if (is_file(ENGINE_DIR . '/data/dopconfig/'.$dopconfigFile)){

    include ENGINE_DIR . '/data/dopconfig/'.$dopconfigFile;
    $config = array_merge($config, $dopconfig);

}