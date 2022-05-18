<div id="buttonadduser">
    <p>
        <button type="button" data-role="button" data-icon="add" onclick="">Добавить пользователей</button>
        <button type="button" data-role="button" data-icon="add" onclick="">Добавить группы</button>
    </p>
</div>
<div class="dostupitems">


</div>

<div class="dostupbutend">
    <button type="button" data-role="button" data-icon="close" onclick="windostup.close();">Закрыть</button>
    <button type="button" data-role="button" data-icon="save" class="k-button-solid-primary" style="display: none;" onclick="">Сохранить</button>
    <button type="button" data-role="button" data-icon="close-outline" style="display: none;" onclick="windostup.close();">Отмена</button>
</div>



<script>
    idcat = "<?php echo $_GET['idcat']?>";
    project = "<?php echo $_GET['project']?>";
    category = "<?php echo $_GET['category']?>";
    dt = {
        user_hash: dle_login_hash,
        idcategory: idcat,
        project: project,
        category: category,
    }
    getajaxhtml('/php/dostup.php', dt, '.dostupitems');
    kendo.init("#buttonadduser");
    kendo.init(".dostupbutend");
</script>