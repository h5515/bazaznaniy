<div class="footer_menu clrfix">
	
<!--	<div class="rightside">
		<a id="upper" href="/" title="Наверх">
			<svg class="icon icon-up"><use xlink:href="#icon-up"></use></svg>
		</a>
	</div>-->
	
	<div class="midside">
		<ul class="foot_menu">
		[not-group=5]
			<li>
				<b role="button" data-toggle="collapse" data-target="#fmenu_3" aria-expanded="false" class="collapsed">Посетителю<i></i></b>
				<div class="collapse" id="fmenu_3">
					<nav>
						
						<a href="/">Главная</a>
						<a href="/index.php?do=rules{link-project}">Правила</a>
				
						<!--<a href="/index.php?do=register">Регистрация</a>-->
		
						<!--<a href="/index.php?do=stats">Статистика</a>-->
						<a href="#" onClick="ShowModal('Статистика','/index.php?do=stats&stroka=ok{link-project}',77569, 'static');return false;">Статистика</a>
						
					</nav>
				</div>
			</li>
			[/not-group]
			[group=1,2,3]
			<li>
				<b role="button" data-toggle="collapse" data-target="#fmenu_1" aria-expanded="false" class="collapsed">
					Разделы сайта<i></i>
				</b>
				<div class="collapse" id="fmenu_1">
					<nav>
						<!--<a href="/index.php?do=search&amp;mode=advanced">Расширенный поиск</a>-->
						<a href="/index.php?do=lastnews{link-project}">Последние статьи</a>
						<a href="/index.php?do=lastcomments{link-project}">Последние комментарии</a>
						<script>
							var str = document.location.href;
							if (str.includes('?'))
								str = str+'&catarhiv=ok';
							else
								str = str+'?catarhiv=ok';
							var url = str.replace('#','');
						</script>
						<a href="#" onClick="document.location.href = url+'{link-project}';return false;" id='pokazarhiv'>Показать категории в архиве</a>
						<script>if (getUrlVars()["catarhiv"] && getUrlVars()["catarhiv"]!="") {url=document.location.href.replace('catarhiv=ok','');$('#pokazarhiv').attr('onClick','document.location.href = url'); $('#pokazarhiv').text('Скрыть категории в архиве')}</script>
						<!--<a href="/index.php?action=mobile" target="_blank" rel="nofollow">Мобильная версия сайта</a>&catarhiv=ok-->
					</nav>
				</div>
			</li>
			[/group]
			<!--<li>
				<b role="button" data-toggle="collapse" data-target="#fmenu_2" aria-expanded="false" class="collapsed">Поддержка<i></i></b>
				<div class="collapse" id="fmenu_2">
					<nav>
						<a href="http://dle-news.ru/" target="_blank">Сайт системы</a>
						<a href="http://forum.dle-news.ru/" target="_blank">Форум поддержки</a>
						<a href="http://dle-news.ru/price.html" target="_blank">Приобретение скрипта</a>
						<a href="/index.php?do=feedback">Контакты</a>
					</nav>
				</div>
			</li>-->

		</ul>
	</div>
</div>