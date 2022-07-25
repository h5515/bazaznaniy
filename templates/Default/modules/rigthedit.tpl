[available=editbz]

<div class="rightside ignore-select" style="margin-top: 21px;">
<div class="blockmy block top_block">
<div class="tegiformcl2">
	<div class="fixnavig navclick">
		<h6 class="tegiformcl">История изменений</h6>
		<h6 class="tegiformcl4"></h6>
		<img src="images/triangledown.png" width="12" height="12" class="tegimg" id="idimgtags">
	</div>
</div>
<div class="navigat" lbs="historyedit" style="display: none;">
	{history}
</div>
</div>
</div>

<script>
        function loadblocktab(clelem) {
            if (!$('[lbs=' + clelem + ']')[0])
                return;
            $el = $('[lbs=' + clelem + ']');
            if ($.cookie(clelem) == 1) {
                $el.css('display', 'block');
                $el.closest('.blockmy').find('.fixnavig').find('#idimgtags').css('transform', 'rotateX(180deg)');
            }
            if ($.cookie(clelem) == 0){
                $el.css('display', 'none');
                $el.closest('.blockmy').find('.fixnavig').find('#idimgtags').css('transform', '');
            }

        }
		loadblocktab('historyedit');
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

</script>
[/available]