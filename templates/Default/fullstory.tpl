<article class="box story[fixed] fixed_story[/fixed] fullstory" itemscope itemtype="http://schema.org/Article">
    
	<div class="box_in">
	[no-redact]
		[not-group=5]
		<ul class="story_icons ignore-select">
			<li class="fav_btn">
				[add-favorites]<span title="Добавить в закладки" id ="favid{news-id}"><svg class="icon icon-fav"><use xlink:href="#icon-fav"></use></svg></span>[/add-favorites]
				[del-favorites]<span title="Убрать из закладок" id ="favid{news-id}"><svg class="icon icon-star"><use xlink:href="#icon-star"></use></svg></span>[/del-favorites]
			</li>		
			[not-group=6]
			<li class="edit_btn">
				[edit]<i title="Редактировать"></i>[/edit]
			</li>
			[/not-group]			
		</ul>		
		[/not-group]
	[/no-redact]
	[redact]  
	<ul class="story_icons ignore-select"> 
	<li class="complaint" title="Отредактирована"><a href="/index.php?newsid={news-id}{link-project}" target="_blank" class="redact2"><span class="k-icon k-i-clock"></span></a></li>
	</ul>
   [/redact]
		<h2 class="title" itemprop="headline">{title}</h2>
		<div class="text" itemprop="articleBody">
			{full-story}
			[edit-date]<p class="editdate grey">Статью отредактировал: <b>{editor}</b> - {edit-date}<br>
			[edit-reason]Причина: {edit-reason}[/edit-reason]</p>[/edit-date]
		</div>
		{pages}
		<div class="story_tools ignore-select">
			<div class="category">
				<svg class="icon icon-cat"><use xlink:href="#icon-cat"></use></svg>
				{link-category}
				
			</div>
			[rating]
				<div class="rateleft">
				[rating-type-4]
				<div class="rate_like-dislike">
					[rating-plus]<span title="Нравится"><svg class="icon icon-like">
							<use xlink:href="#icon-like"></use>
						</svg></span>[/rating-plus]
					{rating}
					[rating-minus]<span title="Не нравится"><svg class="icon icon-dislike">
							<use xlink:href="#icon-dislike"></use>
						</svg></span>[/rating-minus]
				</div>
				[/rating-type-4]
				</div>
			[/rating]
		</div>
		[fixed]<span class="fixed_label" title="Важная новость"></span>[/fixed]
	</div>
	<div class="meta ignore-select">
		<ul class="right">
		
                        [redact]  
 			<li class="complaint" title="Отредактирована"><a href="/index.php?newsid={news-id}{link-project}" target="_blank" class="redact2"><img class="icon icon-bad redact" src="images/redact.png" width="16" height="16" /></a></li>
            [/redact]
            
            [if approve = "0"]  
 			<li class="complaint" title="Ожидает публикацию"><img class="icon icon-bad" src="images/noavialabl.png" width="16" height="16" /> </li>
            [/if]
            [if arhiv = "1"]  
 			<li class="complaint" title="В Архиве"><img class="icon icon-bad" src="images/archive.png" width="16" height="16" /> </li>
            [/if]
			<li class="grey" title="Просмотров: {views}"><svg class="icon icon-views"><use xlink:href="#icon-views"></use></svg> {views}</li>
			<li title="Комментариев: {comments-num}">[com-link]<svg class="icon icon-coms"><use xlink:href="#icon-coms"></use></svg> {comments-num}[/com-link]</li>
		</ul>
		<ul class="left">
			<li class="story_date"><svg class="icon icon-info"><use xlink:href="#icon-info"></use></svg> {author}<span class="grey"> от </span><time datetime="{date=Y.m.d}" class="grey" itemprop="datePublished">{date}</time></li>
		</ul>
	</div>
	<meta itemprop="author" content="{login}">
</article>
<div class="rightside ignore-select">
	{include file="modules/rightside_fullstory.tpl"}
</div>
{* <div class="box next-prev ignore-select">
	[prev-url]<a href="{prev-url}" class="btn">Предыдущая публикация</a>[/prev-url]
	[next-url]<a href="{next-url}" class="btn right">Следующая публикация</a>[/next-url]
</div> *}
<!--[banner_header]
<div class="box banner ignore-select">
	banner_header
</div>
[/banner_header]-->

[no-histor]
<div class="comments ignore-select">
	<div class="box">
		[comments]<h4 class="heading">Комментарии <span class="grey hnum">{comments-num}</span></h4>[/comments]
		<div class="com_list">
			{comments}
		</div>
	</div>
	{navigation}
	{addcomments}
</div>
[/no-histor]
