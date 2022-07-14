<!--<a[available=main] class="active"[/available] href="/" title="Главная">
Главная</a> -->

<!--<a href="#" onClick="ShowModal('Статистика','/index.php?do=stats&stroka=ok',77569, 'static');return false;">Статистика</a>-->


 [not-group=5]
[available=cat|showfull]
<a href="#" onClick="ShowModal('Добавить статью','/index.php?do=addnews&category={category-id}{link-project}&stroka=ok',55798,'add','','true');return false;" id="idaddnew"><span class='k-icon k-i-plus-outline' style="margin-right: 6px;font-size: 19px;" title="Добавить статью"></span><span id="addidname">Добавить статью</span></a>
[/available]
[/not-group] 
[not-group=5]
[available=cat]
<div id="svitcer" class="switch-btn switch-on"></div>
<span id="idsvitr"><input id="svitcat" aria-label="Развернуть" /></span>
<script>

var kSwitch;
kSwitch = $("#svitcat").kendoSwitch({
    size: "small",
}).data("kendoSwitch");;
</script>

<style>
#idsvitr .k-switch-off .k-switch-track {
    border-color: #0053df;
    background-color: #f0ffff63;
}
#idsvitr .k-switch-sm .k-switch-label-off{
    color: #013183;
}

#idsvitr .k-switch-sm .k-switch-track{
    height: 19px;
}

#idsvitr .k-switch-sm .k-switch-thumb {
    width: 26px;
    height: 23px;

}



</style>
[/available]
<!--<a href="#" onClick="Hidekp();return false;">Тест</a>-->


[/not-group] 

<!--<button class="open-iframe button">iframe</button>stroka=ok--> 
