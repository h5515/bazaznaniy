<article class="box story[fixed] fixed_story[/fixed] shortstory kolichestvo">
<img src="images/glaz.png" class="glaz" onclick="ShowModal('{titles}','{full-link}&stroka=ok&cluck={news-id}',{news-id});" title="Быстрый просмотр">

	<div class="box_in">
		[not-group=5]
		<ul class="story_icons">
			<li class="fav_btn">
				[add-favorites]<span title="Добавить в закладки" id ="favid{news-id}"><svg class="icon icon-fav"><use xlink:href="#icon-fav"></use></svg></span>[/add-favorites]
				[del-favorites]<span title="Убрать из закладок" id ="favid{news-id}"><svg class="icon icon-star"><use xlink:href="#icon-star"></use></svg></span>[/del-favorites]
			</li>
			<li class="edit_btn">
				[edit][/edit]
			</li>
		</ul>
		[/not-group]
		<h2 class="title"><a href="{full-link}">{title}</a></h2>
		<div class="ramka"><!--short-story limit="x"-->
            <div class="hide">{short-story limit="500"}</div>
			

			
			[edit-date]<p class="editdate grey">Статью отредактировал: <b>{editor}</b> - {edit-date}<br>
			[edit-reason]Причина: {edit-reason}[/edit-reason]</p>[/edit-date]
			
				[search-full]
			<div class="searchfull">
				{story limit="5000000"}
			</div>
			
			[/search-full]		
			
		</div>
		<div class="story_tools">
        <!--
         <a href="#" onClick="ShowModal('{titles}','{full-link}&stroka=ok&cluck={news-id}',{news-id});return false;">Быстрый просмотр</a>

			[rating]
				<div class="rate">
					[rating-type-1]<div class="rate_stars">{rating}</div>[/rating-type-1]
					[rating-type-2]
					<div class="rate_like">
					[rating-plus]
						<svg class="icon icon-love"><use xlink:href="#icon-love"></use></svg>
						{rating}
					[/rating-plus]
					</div>
					[/rating-type-2]
					[rating-type-3]
					<div class="rate_like-dislike">
						[rating-plus]<span title="Нравится"><svg class="icon icon-like"><use xlink:href="#icon-like"></use></svg></span>[/rating-plus]
						{rating}
						[rating-minus]<span title="Не нравится"><svg class="icon icon-dislike"><use xlink:href="#icon-dislike"></use></svg></span>[/rating-minus]
					</div>
					[/rating-type-3]
					[rating-type-4]
					<div class="rate_like-dislike">
						<span class="ratingtypeplusminus ignore-select ratingplus">{likes}</span>
						[rating-plus]<span title="Нравится"><svg class="icon icon-like"><use xlink:href="#icon-like"></use></svg></span>[/rating-plus]
						<span class="ratingtypeplusminus ratingminus ignore-select">{dislikes}</span>
						[rating-minus]<span title="Не нравится"><svg class="icon icon-dislike"><use xlink:href="#icon-dislike"></use></svg></span>[/rating-minus]
					</div>
					[/rating-type-4]
				</div>
			[/rating]-->
            			<div class="category" style="margin-top: -1px;">
				<svg class="icon icon-cat"><use xlink:href="#icon-cat"></use></svg>
				{link-category}
				
			</div>
            
   [tags]  
            <div id="tagsscot" class="tagshides hide">
        <fieldset class="paramteg">
        <legend class="param2"> Теги </legend>
            <div class="tag_list2">
            {tags}
            </div>
      </fieldset>
                </div>
         [/tags] 

		</div>
		[fixed]<span class="fixed_label" title="Важная новость"></span>[/fixed]
	</div>
	<div class="meta">
		<ul class="right">
               [redact]  
 			<li class="complaint" title="Отредактирована"><a href="/index.php?newsid={news-ids}{link-project}" target="_blank" class="redact2"><img class="icon icon-bad redact" src="images/redact.png" width="16" height="16" /></a></li>
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
			<li class="story_date"><svg class="icon icon-info"><use xlink:href="#icon-info"></use></svg> {author}<span class="grey"> от </span><time datetime="{date=Y.m.d}" class="grey">{date}</time></li>
		</ul>
	</div>

</article>