<link href="{THEME}/css/engine.css" type="text/css" rel="stylesheet">
<link href="{THEME}/css/styles.css?v=2" type="text/css" rel="stylesheet">
<link href="{THEME}/css/common.css" rel="stylesheet" type="text/css" media="all">
<link href="{THEME}/css/mycss.css" rel="stylesheet" type="text/css">
<script src="{THEME}/js/mayscript.js?v=2"></script>
[full-preview]
<div class="page[available=showfull] showfull[/available]">
    <div class="wrp">
        <div class="conteiner">
            <div class="midside">

                <article class="box story">
                    <div class="box_in">
                        <h1 class="title">{title}</h1>
                        <div class="text">
                            {full-story}
                        </div>
                        <div class="story_tools">
                            <div class="category">
                                {link-category}
                            </div>
                        </div>
                    </div>
                    <div class="meta">
                        <ul class="left">
                            <li class="grey"><time datetime="{date=Y-m-d}">[day-news]{date}[/day-news]</time></li>
                        </ul>
                    </div>
                </article>



            </div>

        </div>
<div>
        [/full-preview]
        [static-preview]
        <article class="box story">
            <div class="box_in">
                <h1 class="title">{description}</h1>
                <div class="text">{static}</div>
            </div>
        </article>
        {pages}
[/static-preview]
<script>
$('.urlmetka').on('click',function(){
    //alert('per'+$(this).attr('data-url'));
    var destination = $(this).closest('.text').find('#per'+$(this).attr('data-url')).offset().top-60;
    jQuery('html, body').animate( { scrollTop: destination }, 1100 );
    return false;
  })
</script>