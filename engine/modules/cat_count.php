<?php
   echo"sanel";
    //Подключаем API CMS DLE  
    include ('engine/api/api.class.php');
    
    //24 часа назад
    $thisdate = langdate( "Y-m-d", $_TIME-86400 )." 00:00:00";
    
    //условие отбора новостей
    $where_date = " AND date > '" . $thisdate . "'";
    
    //формируем список категорий которые мы ввели в параметр cat=
    $aviable = array();
    $aviable = explode( ',', $cat );
    
    //Выполняем запрос
    $SQL = $db->query ( "SELECT * FROM " . PREFIX . "_post  WHERE category regexp '[[:<:]](" . implode ( '|', $aviable ) . ")[[:>:]]'".$where_date." and approve=1");
    $count = $row = $db->num_rows();
    if($count != 0)
        echo '+'.$count;
?>