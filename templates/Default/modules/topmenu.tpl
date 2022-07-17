<!--<a[available=main] class="active"[/available] href="/" title="Главная">
Главная</a> -->

<!--<a href="#" onClick="ShowModal('Статистика','/index.php?do=stats&stroka=ok',77569, 'static');return false;">Статистика</a>-->


[group=1,2,3]
[available=cat|showfull]
{* <a href="#"
    onClick="ShowModal('Добавить статью','/index.php?do=addnews&category={category-id}{link-project}&stroka=ok',55798,'add','','true');return false;"
    id="idaddnew"><span class='k-icon k-i-plus-outline' style="margin-right: 6px;font-size: 19px;"
        title="Добавить статью"></span><span id="addidname">Добавить статью</span></a> *}
<button id="addidname" class="tlbutton k-button k-button-md k-rounded-md k-button-solid k-button-solid-info" title="Добавить статью" onclick="ShowModal('Добавить статью','/index.php?do=addnews&category={category-id}{link-project}&stroka=ok',55798,'add','','true');" style="margin-right: 3px;"><span class="k-icon k-i-plus-outline"></span>Добавить статью</button>
[/available]
[/group]
[not-group=5]
[available=cat]
{* <div id="svitcer" class="switch-btn switch-on"></div> *}
<span id="idsvitr"><input id="svitcat" aria-label="Развернуть" /></span>
<script>
    var kSwitch;
    var tour = '1';
    var bolswith;
    bolswith = ($.cookie('switch') == '1');
    kSwitch = $("#svitcat").kendoSwitch({
        size: "small",
        checked: bolswith,
        change: function(e) {
            if (e.checked) {
                $(".storykorotk").slideToggle(300);
                //	$(".imagc1").attr('src', 'images/arrow_up.png');
                $(".imagc").css({
                    '-webkit-transform': 'rotateX(180deg)'
                });
                $.cookie('switch', '1', { expires: 365 });
            } else {
                if (tour !== '1') {
                    $(".storykorotk").slideToggle(300);
                } else {
                    $(".storykorotk").hide();
                    tour = '2';
                }
                $(".imagc").css({
                    '-webkit-transform': 'rotateX(0deg)'
                });
                $.cookie('switch', '0', { expires: 365 });
            }
        }
    }).data("kendoSwitch");
</script>

<style>
    #idsvitr .k-switch-off .k-switch-track {
        border-color: #0053df;
        background-color: #f0ffff63;
    }

    #idsvitr .k-switch-sm .k-switch-label-off {
        color: #013183;
    }

    #idsvitr .k-switch-sm .k-switch-track {
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