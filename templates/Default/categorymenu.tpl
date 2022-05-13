[not-group=5]
<div id='categorid'>
{include file="engine/modules/childs.php?id={category-id}&all=1&order=DESC&catmay=ok"}
</div>
<script>


    var updateOutput = function(e)
    {
        var list   = e.length ? e : $(e.target),
            output = list.data('output');
        if (window.JSON) {
            //output.val(window.JSON.stringify(list.nestable('serialize')));//, null, 2));
        } else {
            //output.val('JSON browser support required for this demo.');
        }
    };

    $('#nestable').nestable({
        group: 1,
        maxDepth: 500,
        threshold : 25

    }).on('change', updateOutput);

    updateOutput($('#nestable').data('output', $('#nestable-output')));

	
	$("button[data-action='collapse']").on('click',function(){
		var e = $(this).parent();
		$.cookie('collaps'+e.attr('data-id'),'1', { expires: 14 });

	});
	$("button[data-action='expand']").on('click',function(){
		var e = $(this).parent();		
		if ($.cookie('collaps'+e.attr('data-id'))) 
			$.cookie('collaps'+e.attr('data-id'),null, { expires: 14 });
	});
	
	$('li').each(function(i,elem) {
	if ($(elem).attr('data-id')) {
		if ($.cookie('collaps'+$(elem).attr('data-id'))){
			$(elem).addClass('dd-collapsed');
			
			var but1 = $(elem).find($("button[data-action='expand']"));
			var but2 = $(elem).find($("button[data-action='collapse']"));
			//alert($(but1).eq(1).text());
			but1.eq(0).css('display','block');
			but2.eq(0).css('display','none');
		}
			
	} 
});

</script> 

[/not-group]

<!--<ul>{include file="engine/mods/autocats1.php?"}</ul>-->
