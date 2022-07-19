    [histor]
    <!-- <div class="block tags_block">
		<h6 class="title"><b>История изменений</b></h6>
		<div class="navigat">


		</div>
	</div>-->
    <!-- История изменений -->
    <div class="blockmy block top_block">
        <div class="tegiformcl2">
            <div class="fixnavig navclick">
                <h6 class="tegiformcl">История изменений</h6>
                <h6 class="tegiformcl4"></h6>
                <img src="images/triangledown.png" width="12" height="12" class="tegimg" id="idimgtags">
            </div>
        </div>
        <div class="navigat" lbs="history" style="display: none;">
                {history}
        </div>
    </div>

    [/histor]

    {* [related-news]
    <!-- Похожее -->
    <div class="block rel_block">
        <h4 class="title"><b>Похожее</b></h4>
        <ul class="relnews">
            {related-news}
        </ul>
    </div>
    <!-- / Похожее -->
    [/related-news] *}
    {* [poll]
    {poll}
    [/poll] *}
    <!-- Баннер 300X250 -->
    <!--<div class="banner banner_300">
	<img src="{THEME}/images/tmp/banner_300x250.png" alt="">
</div>-->
    <!-- / Баннер 300X250 -->
    <!-- Баннер 240X400 -->
    <!--<div class="banner banner_240">
	<img src="{THEME}/images/tmp/banner_240x400.png" alt="">
</div>-->
    <!-- / Баннер 240X400 -->
    [tags]
    <!-- Теги -->
    <div class="blockmy block top_block">
    <div class="tegiformcl2">
        <div class="fixnavig navclick">
            <h6 class="tegiformcl">Теги</h6>
            <h6 class="tegiformcl4"></h6>
            <img src="images/triangledown.png" width="12" height="12" class="tegimg" id="idimgtags">
        </div>
    </div>
    <div class="navigat" lbs="fulltags" style="display: none; margin-top:16px">
    <div class="tag_list">
        {tags}
        </div>
    </div>
</div>
    <!-- / Теги -->
[/tags]

<script>
	function loadblocktab(clelem){
		if ($.cookie(clelem)==1){
			$el = $('[lbs='+clelem+']');
			$el.css('display','block');
			$el.closest('.blockmy').find('.fixnavig').find('#idimgtags').css('transform', 'rotateX(180deg)');
		}

	}
    loadblocktab('fulltags');
$('.navclick').on('click', function() {
    $el = $(this).closest('.blockmy').find('.navigat').eq(0);

    if (!$el.is(":visible")) {
        $(this).find("#idimgtags").css({
            '-webkit-transform': 'rotateX(180deg)'
        });
        $.cookie($el.attr('lbs'), '1', { expires: 365 });
    } else {
        $(this).find("#idimgtags").css({
            '-webkit-transform': 'rotateX(0deg)'
        });
        $.cookie($el.attr('lbs'), '0', { expires: 365 });
    }

    $el.slideToggle("fast", function() {
        // Animation complete.
    });

})
[histor]
var first = getUrlVars()["vivid"];
if (first == 'ok') {
    // openhistory(1);
    $('.navclick').eq(0).click();
}
[/histor]
</script>