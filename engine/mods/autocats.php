<?
if(!defined('DATALIFEENGINE'))die("Hacking attempt!");
$cid = isset($parent)?intval($parent):false;
foreach($cat_info as $k=>$v){
    if($cid!==false){
        if($cid==$v['parentid']){
            if($category_id==$k OR $cat_info[$category_id]['parentid']==$k) echo "<li class=\"current\"><a href=\"/".get_url($k)."/\">{$v['name']}</a></li>\n";    //��������� �������� ���������, ��� �������� ��������� parent
            else echo "<li><a href=\"/".get_url($k)."/\">{$v['name']}</a></li>\n";    //������ ���������, ��� �������� ��������� parent
        }
    }elseif($category_id==$v['parentid']) echo "<li><a href=\"/".get_url($k)."/\">{$v['name']}</a></li>\n";        //�������������� ������ ������������ �� �������������� ���������
}
?>