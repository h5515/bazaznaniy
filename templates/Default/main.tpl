<!DOCTYPE html>
<html[available=lostpassword|register] class="page_form_style"[/available] lang="ru"><head>
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
{headers}
<meta name="HandheldFriendly" content="true">
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="user-scalable=0, initial-scale=1.0, maximum-scale=1.0, width=device-width">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<link rel="shortcut icon" href="{THEME}/images/favicon.ico">
<link rel="apple-touch-icon" href="{THEME}/images/touch-icon-iphone.png">
<link rel="apple-touch-icon" sizes="76x76" href="{THEME}/images/touch-icon-ipad.png">
<link rel="apple-touch-icon" sizes="120x120" href="{THEME}/images/touch-icon-iphone-retina.png">
<link rel="apple-touch-icon" sizes="152x152" href="{THEME}/images/touch-icon-ipad-retina.png">
<link href="{THEME}/css/engine.css" type="text/css" rel="stylesheet">
<link href="{THEME}/css/styles.css?v=4" type="text/css" rel="stylesheet">
<link href="{THEME}/css/common.css" rel="stylesheet" type="text/css" media="all">
<link href="{THEME}/css/iziModal.min.css" type="text/css" rel="stylesheet">
<link href="{THEME}/css/popModal.css" type="text/css" rel="stylesheet">
<link rel="stylesheet" href="{THEME}/css/easySelectStyle.css" type="text/css">
<link href="{THEME}/css/tagify.css" rel="stylesheet" type="text/css">
<link href="{THEME}/css/mycss.css" rel="stylesheet" type="text/css">
<link href="{THEME}/css/iosCheckbox-theme.scss" rel="stylesheet" type="text/css">
	
<script src="{THEME}/js/iziModal.js"></script> 
<script src="{THEME}/js/mayscript.js?v=4"></script> 
<script src="{THEME}/js/jquery.cookie.js"></script> 
<script src="{THEME}/js/jquery.tagify.min.js"></script> 
<script src="{THEME}/js/modalin.js"></script> 
<script src="{THEME}/js/iosCheckbox.js"></script> 
<script src="{THEME}/js/easySelect.js"></script> 
<script src="{THEME}/js/popModal.js"></script> 
<!--<script src="{THEME}/js/jquery-ui.min.js"></script> -->
<script src="{THEME}/js/jquery.nestable.js"></script>
<script src="{THEME}/js/formtooltip.js"></script> 

</head><body>
<script>var project_url = "{link-project}";</script>
<div class="rightside2"> <a id="upper" href="/" title="????????????">
  <svg class="icon icon-up">
    <use xlink:href="#icon-up"></use>
  </svg>
  </a> </div>
[not-available=lostpassword|register]
<div class="page[available=showfull] showfull[/available]">
  <div class="wrp"> 
    <!-- Header -->
    <header id="header">
      <div class="header">
        <div class="wrp">
          <div class="midside">
            <div id="header_menu"> 
              <!-- ?????????????? --> 
              <a class="logotype" href="/"> <span class="logo_icon"><img src="images/logo.ico" width="42" height="42" alt="" /></span> <span class="logo_title">???????? ???????????? ??????</span> </a> 
              <!-- / ?????????????? --> 
              <!-- ???????????????? ???????? -->
              [not-dostup]
              <nav id="top_menu"> {include file="modules/topmenu.tpl"} </nav>
              
              <!-- / ???????????????? ???????? --> 
              <!-- ???????????? ???????????? ???????????????????? --> 
              {include file="modules/paramset.tpl"} 
              [/not-dostup]
              <!-- / ???????????? ???????????? ???????????????????? --> 
              <!-- ???????????? ???????????? ???????? -->
              <button id="mobile_menu_btn"> <span class="menu_toggle"> <i class="mt_1"></i><i class="mt_2"></i><i class="mt_3"></i> </span> <span class="menu_toggle__title"> ???????? </span> </button>
              <!-- / ???????????? ???????????? ???????? --> 
              {login} 
              <!-- ???????????? ???????????? ???????? -->
              <button id="search_btn"> <span>
              <svg class="icon icon-search">
                <use xlink:href="#icon-search"></use>
              </svg>
              <svg class="icon icon-cross">
                <use xlink:href="#icon-cross"></use>
              </svg>
              </span> </button>
              <!-- / ???????????? ???????????? ???????? --> 
            </div>
          </div>
          [not-dostup]
          <div id="cat_menu" >
            <nav class="cat_menu">
              <div class="cat_menu__tm">{include file="modules/topmenu.tpl"}</div>
              {catmenu} </nav>
              [available=main] 
              [not-group=5]
                <div class="chone">
                <a href="index.php?newsid=9" target="_blank"> <img src="images/ctonovogo.png"><span>?????? ???????????? ?? ?????</span></a>
                </div>
                [/not-group]
              [/available]
            
            <!--<div class="soc_links">
								<a class="soc_vk" href="#" title="???? ??????????????????">
									<svg class="icon icon-vk"><use xlink:href="#icon-vk"></use></svg>
								</a>
								<a class="soc_tw" href="#" title="???? ?? Twitter">
									<svg class="icon icon-tw"><use xlink:href="#icon-tw"></use></svg>
								</a>
								<a class="soc_fb" href="#" title="???? ?? Facebook">
									<svg class="icon icon-fb"><use xlink:href="#icon-fb"></use></svg>
								</a>
								<a class="soc_gp" href="#" title="???? ?? Google">
									<svg class="icon icon-gp"><use xlink:href="#icon-gp"></use></svg>
								</a>
							</div>--> 
			  [available=cat] 
			  [group=1,2]
              <script src="{THEME}/js/Catmenu.js"></script> 
			  
           	[/group]
			  [/available]
              
          </div>
          [/not-dostup]
        </div>
      </div>
    </header>
    <!-- / Header -->
    
    <div class="conteiner">
      <div class="midside">
        <div class="content_top"> 
        [not-dostup]
        [not-group=5]
          <!-- {include file="modules/carousel1.tpl"}--> 
          {include file="modules/pagetools.tpl"} </div>
          [/not-group]
          [/not-dostup]
        <section id="content"> {info}
          [page-title]
          <div class="box box_in story">
            <h2 class="title">{page-title}</h2>
            {page-description}</div>
          [/page-title]
          [not-dostup]
          [not-group=5]
          [available=lastcomments]
          <div class="box">
            <h1 class="heading h4">?????????????????? ??????????????????????</h1>
            <div class="com_list"> {content} </div>
          </div>
          [/available]
          
          
          
          
          
          [available=cat] 
          <!--?????????????????? -->
          <div id="tagser" class="tagifyoff2 hide">
            <input name='tags-outside2' class='tagify--outside2' placeholder='' width=100%>
          </div>
          <!-- -------------- --> 
          <!-- ?????????? -->
          
            <div class="q_search">
              <div class="setting" onClick="onFoc()">
                <div class="params">
                  <input type="checkbox" id="tagcheck2" onFocus="onFoc()" onChange="Saveparam()" checked>
                  <label for="tagcheck2" onClick="onFoc()">???????????? ???????????????????? ???? ??????????.</label>
                </div>
              </div>
              <!-- <input id="story" name="story" placeholder="?????????? ?? ???? {category-title}..." type="search" onFocus="Setboxon()" onBlur="Setboxout()" onDblClick="Showsetting()">-->
              <input id="story" name="story" placeholder="?????????? ?? ???? {category-title}..." type="search">
              <button class="btn q_search_btn" type="submit" title="??????????" onClick="document.location.href = '/index.php?do=search&amp;mode=advanced'">
              <svg class="icon icon-search">
                <use xlink:href="#icon-search"></use>
              </svg>
              <span class="title_hide">??????????</span></button>
              <!--&catlist[]={category-id}-->
                
              <div style="left: 20px;position: inherit;z-index: 1;">
              <div id="idkolich" class="kolich">10</div>
              <!--?????????????????? ????????????????-->
              <div id="indload" class="indload"><img src="images/Loading.gif" width="24" height="24"/></div>
              <!--/////?????????????????? ????????????????--> 
              <a class="q_search_adv2" href="#" onClick="Clearsearch(); return false;" title="????????????????">
              <div class="icon-set2"></div>
                  </div>
              <!--<img class="icon-set2" src="/images/Delete-80.png" />--> 
              </a> 
              <!--	<a class="q_search_adv4" href="#" onClick="Showsetting(); return false;" title="??????????????????">
			<div class="icon-set3"></div>
			</a>--> 
              
              <!--<a class="q_search_adv" href="/index.php?do=search&amp;mode=advanced" title="?????????????????????? ??????????">
              <svg class="icon icon-set">
                <use xlink:href="#icon-set"></use>
              </svg>
              <span class="title_hide">?????????????????????? ??????????</span></a>--> 
            </div>
            <input type="hidden" name="do" value="search">
            <input type="hidden" name="subaction" value="search">
            
          <!--?????????? ???? ?????????? -->
          <div id="tagser" class="tagifyoff hide">
            <input name='tags-outside' class='tagify--outside' placeholder='' width=100%>
          </div>
          <!-- -------------- --> 
          
          <!--???????????????????? ???????????????? ???????????? style='display:none'-->
          <div id='searchsuggestions2' style='display:none'></div>
          <!-- / ?????????? --> 
          [/available]   
          
          
          [not-available=lastcomments|main]
          <div id='searchsuggestions3'> {content} </div>
          [/not-available]
          
          [available=main]
          {include file="engine/modules/childs.php?id={category-id}&all=1&order=DESC&catmay=no"}
          [/available]
          
          [/not-group]
            
                      
          <!--    <a href=""  data-izimodal-open="#modal" >?????????????? ????????????????</a>
          <div id="modal" class="modais" data-izimodal-group="group1" data-iziModal-title="{title}" data-iziModal-icon="/images/logo.ico" data-izimodal-iframeURL="/index.php?newsid=1&stroka=ok"></div>--> 
          [/not-dostup]
        </section>
        <!--{include file="modules/footside1.tpl"}--> 
      </div>
      [not-group=5]
      [available=cat]
      [not-dostup]
      {include file="modules/rightside.tpl"}
      [/not-dostup]
      [/available]  
      [/not-group]
       </div>
     
    {include file="modules/footmenu.tpl"} </div>
    
  {include file="modules/footer.tpl"} </div>
[/not-available]
	[available=lostpassword|register]
<div class="page_form"> <a class="page_form__back" href="/" title="?????????????????? ???? ??????????????">
  <svg class="icon icon-left">
    <use xlink:href="#icon-left"></use>
  </svg>
  </a>
  <div class="page_form__body">
    <div class="page_form__logo"> 
      <!-- ?????????????? -->
      <a href="/">
      <svg class="icon icon-logo">
        <img src="images/logo.ico" width="42" height="42" alt="" />
      </svg>
      <span class="title_hide">???????? ???????????? ??????</span> </a> 
      <!-- / ?????????????? --> 
    </div>
    {info}
    {content}
    <div class="page_form__foot grey"> {include file="modules/copyright.tpl"} </div>
  </div>
</div>
[/available]
    
	{AJAX} 
<script src="{THEME}/js/lib.js"></script> 
<script>
		jQuery(function($){
			$.get("{THEME}/images/sprite.svg", function(data) {
			  var div = document.createElement("div");
			  div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
			  document.body.insertBefore(div, document.body.childNodes[0]);
			});
		});
	</script> 
<script src="{THEME}/js/Srcfooter.js"></script> 
[available=cat] 
<script>
Loadparam ();
/*$('.sortable-ul, .sortable-ul li > ul').sortable({
  update:function(e, ui) {
    var questionList = $(this).sortable("toArray", { attribute:"itemid" });
    var sectionId = e.target.dataset.listId;
    var questionId = ui.item.context.dataset.itemId;
    var index = ui.item.index();
    updateData({sectionId, questionId, questionList});
  }
});  
function updateData(obj) {
  var data = JSON.stringify(obj,null, 2);
  console.log(data);
}
    
    */
</script> 
<script>

$(document).ready(function()
{
	    if (dle_admin){
        $('.dd3-handle').removeClass('dd3-hid');
    }
	
   		$('#nestable').nestable().on('change',function(){
			pos = window.JSON.stringify($('.dd').nestable('serialize')).indexOf('"id":0'); 
		//	alert(pos+'<br>'+window.JSON.stringify($('.dd').nestable('serialize')));
			if (pos==-1){
			ShowLoading('');
			    $.post(dle_root + "engine/ajax/controller.php?mod=catsort", {
        		user_hash: dle_login_hash,
				action: 'catsort',
				id: {category-id},
				list: window.JSON.stringify($('.dd').nestable('serialize')),
				  }, function (b) {
					HideLoading('');
					  if ($.trim(b)!='ok') alert('????????????! - !'+b+'!');
					
      				})
		}
		});
				var fils = {
					catgl :{
							tooltip: "<img src='images/plus_cat.png' class='catedit addcat2' title ='????????????????' />",
							position: 'top',					
						},
					cat : {
							tooltip: "<img src='images/plus_cat.png' class='catedit addcat' title ='????????????????' /><img src='images/edit_cat.png' class='catedit editcat' title ='??????????????????????????'/><img src='images/trash_cat.png' class='catedit delcat' title ='?????????????? ?????? ????????????????????????'/> ",
							position: 'bottom',
							}
				};
	
				var fields = {
						cat : {
							tooltip: "<img src='images/plus_cat.png' class='catedit addcat' title ='????????????????' /><img src='images/edit_cat.png' class='catedit editcat' title ='??????????????????????????'/><img src='images/trash_cat.png' class='catedit delcat' title ='?????????????? ?????? ????????????????????????'/> ",
							position: 'bottom',
							}
						};
	$("#categorid").formtoolip(fils, { fontSize : 15, padding : 3, borderRadius :  5});
	//$("#nestable").formtoolip(fields, { fontSize : 15, padding : 3, borderRadius :  5});
	
});
	
HigslideActive();
</script> 
[/available]

<div id="layer"></div>

<script>
$('.histortop').attr('style','margin-top:-70px;');
  $('.urlmetka').on('click',function(){
    //alert('per'+$(this).attr('data-url'));
    var destination = $(this).closest('.text').find('#per'+$(this).attr('data-url')).offset().top-60;
    jQuery('html, body').animate( { scrollTop: destination }, 1100 );
    return false;
  })
</script>

<script src="{THEME}/js/rascras.js"></script> 

</body>
</html>