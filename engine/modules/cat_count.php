<?php
   echo"sanel";
    //���������� API CMS DLE  
    include ('engine/api/api.class.php');
    
    //24 ���� �����
    $thisdate = langdate( "Y-m-d", $_TIME-86400 )." 00:00:00";
    
    //������� ������ ��������
    $where_date = " AND date > '" . $thisdate . "'";
    
    //��������� ������ ��������� ������� �� ����� � �������� cat=
    $aviable = array();
    $aviable = explode( ',', $cat );
    
    //��������� ������
    $SQL = $db->query ( "SELECT * FROM " . PREFIX . "_post  WHERE category regexp '[[:<:]](" . implode ( '|', $aviable ) . ")[[:>:]]'".$where_date." and approve=1");
    $count = $row = $db->num_rows();
    if($count != 0)
        echo '+'.$count;
?>