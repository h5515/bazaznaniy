[not-available=showfull]

<aside class="rightside">
	
[available=cat]
		<!-- Теги -->
	<div class="blockmy block top_block">
		    <div class="tegiformcl2" >   
			<div class="fixnavig" onClick="opentegform({category-id});return false;">
			<h6 class="tegiformcl">Теги</h6><h6 class="tegiformcl4"></h6>
			<img src="images/triangledown.png" width="12" height="12" class="tegimg" id="idimgtags">
			</div>   
            {* <table width="100%" onClick="opentegform({category-id});return false;" class="teghover"><tr class="tegtr" ><td width="100%" class="nowraps tegtr"><h6 class="tegiformcl">Теги</h6><h6 class="tegiformcl4"></h6></td><td align="right" valign="bottom" class="tegtr"><img src="images/triangledown.png" width="12" height="12" class="tegimg" id="idimgtags"></td></tr></table> *}
            </div>
        <div id="idtags" class="csstags">
        <div class="clinputm">
		<button class="btn q_search_btn" title="Найти" onclick="$('.clinputm #sertags').focus();">
                    <svg class="icon icon-search">
                      <use xlink:href="#icon-search"></use>
                    </svg>
                    <span class="title_hide">Найти</span>
                  </button>
         <input id="sertags" name="sertags" placeholder="Поиск Тегов..." type="searchtags" autocomplete="off" onkeyup="AllTag('{category-id}','search')" style="margin-right: 27px;">   
         {* <a class="q_search_adv3" href="#" onClick="AllTag({category-id},'clear'); return false;" title="Очистить">  
             <div class="icon-set4"></div></a>    *}
			 <button class="zadsear btn q_search_btn"><span class="k-icon k-i-x-circle"
                      onclick="AllTag({category-id},'clear');"></span></button>  
        </div>
		<div class="tag_list">
			{tags}
		</div>
        </div>
	</div>

	<!-- / Теги -->	
	
	
		<!-- Навигация -->

<div class="blockmy block top_block">
		<div class="tegiformcl2" >     
		<div class="fixnavig navclick">
		<h6 class="tegiformcl">Навигация</h6><h6 class="tegiformcl4"></h6>
		<img src="images/triangledown.png" width="12" height="12" class="tegimg" id="idimgtags">
		</div>
		</div>
		<div class="navigat" lbs="navigat" style="display: none; margin-top:10px">

			<span><a href="#" onClick="filtered(this,'favorit');return false;"><table class="navigatr"><tr><td>Закладки</td><td id="favorit" align="right">{favorite-count}</td></tr></table></a></span>

	<!--		[available=main|favorites]
			<span><a href="index.php?do=favorites"><table class="navigatr"><tr><td>Закладки</td><td id="favorit" align="right">{favorite-count}</td></tr></table></a></span>
			[/available]-->
			
			<span><a href="#" onClick="filtered(this,'noread');return false;"><table class="navigatr"><tr><td>Непрочитанные статьи</td><td id="readno" align="right">{read-count}</td></tr></table></a></span>
            
			<span><a href="#" onClick="filtered(this,'myst');return false;"><table class="navigatr"><tr><td>Мои статьи</td><td align="right">{my-count}</td></tr></table></a></span>
            
			<span><a href="#" onClick="filtered(this,'noapp');return false;"><table class="navigatr"><tr><td>Ожидают публикацию</td><td align="right">{noapp-count}</td></tr></table></a></span>
			
			<span><a href="#" onClick="openm('idpoavtor');return false;"><table class="navigatr"><tr><td>По автору</td><td align="right"><img src="images/triangledown.png" width="12" height="12" /></im> </td></tr> </table></a>
		<div id="idpoavtor" class="menu_on hide navigat"></div>
		</span>
	
			<span><a href="#" onClick="openm('idkalendar');return false;"><table class="navigatr"><tr><td>Календарь</td><td align="right"><img src="images/triangledown.png" width="12" height="12" /></im> </td></tr> </table></a>
		<div id="idkalendar" class="menu_on hide navigat">
			
		<div class="title h6 title_tabs">
			<h6><b>Архив</b></h6>
			<ul>
				<li class="active">
					<a title="В виде календаря" href="#arch_calendar" aria-controls="arch_calendar" data-toggle="tab">
						<svg class="icon icon-calendar"><use xlink:href="#icon-calendar"></use></svg><span class="title_hide">В виде календаря</span>
					</a>
				</li>
				<li>
					<a title="В виде списка" href="#arch_list" aria-controls="arch_list" data-toggle="tab">
						<svg class="icon icon-archive"><use xlink:href="#icon-archive"></use></svg><span class="title_hide">В виде списка</span>
					</a>
				</li>
			</ul>
		</div>
            
		<div class="tab-content">
			<div class="tab-pane active" id="arch_calendar">{calendar}</div>
			<div class="tab-pane" id="arch_list">{archives}</div>
		</div>
</div>
		</span>	
    
        <span><a href="#" onClick="filtered(this,'arhiv');return false;"><table class="navigatr"><tr><td>Архив</td><td align="right">{arhiv-count}</td></tr></table></a></span>
            
		</div>
</div>

	[/available]

	<!-- / Навигация -->	
    {* [not-available=addnews]
    {vote}
	[/not-available] *}
    
	[available=main|cat]
	<!-- Популярное -->
	<div class="blockmy block top_block">
	<div class="tegiformcl2" >     
	<div class="fixnavig navclick">
	<h6 class="tegiformcl">Популярное</h6><h6 class="tegiformcl4"></h6>
	<img src="images/triangledown.png" width="12" height="12" class="tegimg" id="idimgtags">
	</div>
	</div>
	<div class="navigat" lbs="popular" style="display: none; margin-top:16px">
		<ol class="topnews">
			{topnews}
		</ol>
	</div>
	</div>
    
	<!-- / Популярное -->
	
		<!-- Последние комментарии -->

	<div class="blockmy block top_block">
	<div class="tegiformcl2" >     
	<div class="fixnavig navclick">
	<h6 class="tegiformcl">Комментарии</h6><h6 class="tegiformcl4"></h6>
	<img src="images/triangledown.png" width="12" height="12" class="tegimg" id="idimgtags">
	</div>
	</div>
	<div class="navigat" lbs="comment" style="display: none; margin-top:16px">
		<ul class="lastcomm">
			
			{customcomments template="modules/lastcomments" [not-available=main]category="{subcat}"[/not-available] available="global" from="0" limit="10" order="date" sort="desc" cache="yes"}
		</ul>
	</div>
	</div>
	
	<!-- / Последние комментарии -->
	
	<!-- Баннер 300X250 -->
	<!--<div class="banner banner_300">
		<img src="{THEME}/images/tmp/banner_300x250.png" alt="">
	</div>-->
	<!-- / Баннер 300X250 -->
	<!-- Баннер 240X400 -->
	<!--<div class="banner banner_240">
		<img src="{THEME}/images/tmp/banner_240x400.png" alt="">
	</div>
	<!-- / Баннер 240X400 -->
	

	[/available]
	
	<!-- Архив -->
<!--	<div class="block top_block">
		<div class="title h6 title_tabs">
			<h6><b>Архив</b></h6>
			<ul>
				<li class="active">
					<a title="В виде календаря" href="#arch_calendar" aria-controls="arch_calendar" data-toggle="tab">
						<svg class="icon icon-calendar"><use xlink:href="#icon-calendar"></use></svg><span class="title_hide">В виде календаря</span>
					</a>
				</li>
				<li>
					<a title="В виде списка" href="#arch_list" aria-controls="arch_list" data-toggle="tab">
						<svg class="icon icon-archive"><use xlink:href="#icon-archive"></use></svg><span class="title_hide">В виде списка</span>
					</a>
				</li>
			</ul>
		</div>
		<div class="tab-content">
			<div class="tab-pane active" id="arch_calendar">{calendar}</div>
			<div class="tab-pane" id="arch_list">{archives}</div>
		</div>
	</div>-->
	<!-- / Архив -->
	<!-- Изменить оформление -->
	<!--<div class="block_bg change_skin">
		<h4 class="title">Изменить оформление</h4>
		<div class="styled_select">
			{1changeskin1}
			<svg class="icon icon-down"><use xlink:href="#icon-down"></use></svg>
		</div>
	</div>-->
	<!-- / Изменить оформление -->
	
<script>
	function loadblocktab(clelem){
		if ($.cookie(clelem)==1){
			$el = $('[lbs='+clelem+']');
			$el.css('display','block');
			$el.closest('.blockmy').find('.fixnavig').find('#idimgtags').css('transform', 'rotateX(180deg)');
		}

	}
	loadblocktab('navigat');

	if ($.trim($('.tag_list').html())=='')
	$('.tag_list').closest('.blockmy').remove();

	if ($.trim($('[lbs=popular] .topnews').html())=='')
	$('[lbs=popular]').closest('.blockmy').remove();
	else
	loadblocktab('popular');

	if ($.trim($('[lbs=comment] .lastcomm').html())=='')
	$('[lbs=comment]').closest('.blockmy').remove();
	else
	loadblocktab('comment');

	$('.navclick').on('click',function(){
		$el = $(this).closest('.blockmy').find('.navigat').eq(0);

		if (!$el.is(":visible")){
		$(this).find("#idimgtags").css({
            '-webkit-transform': 'rotateX(180deg)'
        });
		$.cookie($el.attr('lbs'), '1', { expires: 365 });
		}else{
			$(this).find("#idimgtags").css({
            '-webkit-transform': 'rotateX(0deg)'
        });	
		$.cookie($el.attr('lbs'), '0', { expires: 365 });
		}
		
		$el.slideToggle( "fast", function() {
		// Animation complete.
		});

	})
</script>
	
	

</aside>
[/not-available]