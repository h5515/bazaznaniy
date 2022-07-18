<div class="box story[fixed] fixed_story[/fixed] shortstory kolichestvo">
    <div class="box_in">
        <div class="poverh">
            [fixed]<span class="fixed_label" title="Важная новость"></span>[/fixed]
            <ul class="story_icons">
                <li class="fav_btn">
                    [add-favorites]<span title="Добавить в закладки" id="favid{news-id}"><svg class="icon icon-fav">
                            <use xlink:href="#icon-fav"></use>
                        </svg></span>[/add-favorites]
                    [del-favorites]<span title="Убрать из закладок" id="favid{news-id}"><svg class="icon icon-star">
                            <use xlink:href="#icon-star"></use>
                        </svg></span>[/del-favorites]
                </li>
                <li class="edit_btn">
                    [edit]<i title="Редактировать"></i>[/edit]
                </li>
            </ul>


            <h2 class="title">
            <div class="titglaz" onclick="ShowModal('{title}','{full-link}&stroka=ok{vived}&cluck={news-id}',{news-id}, 'Grup');" title="Быстрый просмотр"><span class="k-icon k-i-eye"></span></div>
            <div class="tittarget" onclick="window.open('{full-link}', '_blank');" title="Открыть в новой вкладке"><span class="k-icon k-i-hyperlink-open-sm"></span></div>
            [no-redact]
            <a href="{full-link}">[/no-redact]
                    <span class="newtitle">{title}</span>[no-redact]</a>[/no-redact]</h2>
            <div class="imagc" ><div class="absimac" onClick="ShowNews('{news-id}');" title="Развернуть, свернуть статью"></div><a href="#" onClick="ShowNews('{news-id}'); return false;"><span class='imagc1 k-icon k-i-caret-alt-down' id="imagid2{news-id}"></span></a>
            <span class="aricocl k-icon k-i-caret-alt-expand"></span>
            </div>
        </div>
    </div>
    <div class="text" itemprop="articleBody">
    <div class="ramka">
        <!--short-story limit="x"-->
        <div class="storykorotk" id="storyid{news-id}">
            <hr>
            <div class="contenttext" itemprop="articleBody">{short-story}</div>
        </div>
        [edit-date]<p class="editdate grey">Статью отредактировал: <b>{editor}</b> - {edit-date}<br>
            [edit-reason]Причина: {edit-reason}[/edit-reason]</p>[/edit-date]
    </div>
    </div>
    <div class="box_out">
        <div class="category">
            <svg class="icon icon-cat">
                <use xlink:href="#icon-cat"></use>
            </svg>
            {link-category}
        </div>
        [rating]
        <div class="rate">
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
    <div class="meta">
        <ul class="right">

            <!--		<li class="complaint" title="Жалоба">[complaint]<svg class="icon icon-bad"><use xlink:href="#icon-bad"></use></svg><span class="title_hide">Жалоба</span>[/complaint]</li>-->
            [redact]
            <li class="complaint" title="Отредактирована"><a href="/index.php?newsid={news-ids}{link-project}"
                    target="_blank" class="redact2"><img class="icon icon-bad redact" src="images/redact.png" width="16"
                        height="16" /></a></li>
            [/redact]

            [if approve = "0"]
            <li class="complaint" title="Ожидает публикацию"><img class="icon icon-bad" src="images/noavialabl.png"
                    width="16" height="16" /> </li>
            [/if]
            [if arhiv = "1"]
            <li class="complaint" title="В Архиве"><img class="icon icon-bad" src="images/archive.png" width="16"
                    height="16" /> </li>
            [/if]

            <li class="grey" title="Просмотров: {views}"><svg class="icon icon-views">
                    <use xlink:href="#icon-views"></use>
                </svg> {views}</li>
            <li title="Комментариев: {comments-num}">[com-link]<svg class="icon icon-coms">
                    <use xlink:href="#icon-coms"></use>
                </svg> {comments-num}[/com-link]</li>
        </ul>
        <ul class="left">
            <li class="story_date"><svg class="icon icon-info">
                    <use xlink:href="#icon-info"></use>
                </svg> {author}<span class="grey"> от </span><time datetime="{date=Y.m.d}" class="grey">{date}</time>
            </li>
        </ul>
    </div>
    [tags]
    <div id="tagsscot" class="tagshides hide">
            <div class="tag_list2">
                {tags}
            </div>
    </div>
    [/tags]
</div>