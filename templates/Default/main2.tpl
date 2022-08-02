<!DOCTYPE html>
<html[available=lostpassword|register] class="page_form_style" [/available] lang="ru">

  <head>
    <meta HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE">
    <meta HTTP-EQUIV="PRAGMA" CONTENT="NO-CACHE">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    [not-available=editbz]
    {headers}
    [/not-available]
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


    
    <link href="{THEME}/css/engine.css?v={VERSION}" type="text/css" rel="stylesheet">
    <link href="{THEME}/css/styles.css?v={VERSION}" type="text/css" rel="stylesheet">
    <link href="{THEME}/css/common.css?v={VERSION}" rel="stylesheet" type="text/css" media="all">
    <link rel="stylesheet" href="{THEME}/css/easySelectStyle.css?v={VERSION}" type="text/css">
    <link href="{THEME}/css/iziModal.css?v={VERSION}" type="text/css" rel="stylesheet">
    <link href="{THEME}/css/iziModal.min.css?v={VERSION}" type="text/css" rel="stylesheet">

    <link href="{THEME}/css/popModal.css?v={VERSION}" type="text/css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,700,700i&display=swap" rel="stylesheet">

    {* <link href="/kendo/styles/kendo.fiori.min.css?v=4" rel="stylesheet"> *}
    {* <link href="/kendo/styles/kendo.classic-main.css?v=4" rel="stylesheet">  *}
    <link href="/kendo/styles/kendo.default-main.min.css?v={VERSION}" rel="stylesheet">
    
    <link href="{THEME}/css/mykendo.css?v={VERSION}" rel="stylesheet" type="text/css">
    <link href="{THEME}/css/tagify.css?v={VERSION}" rel="stylesheet" type="text/css">
    <link href="{THEME}/css/mycss.css?v={VERSION}" rel="stylesheet" type="text/css">
    <link href="{THEME}/css/new/new.css?v={VERSION}" rel="stylesheet" type="text/css">

    {themecss}

    <script src="/kendo/js/kendo.all.min.js?v={VERSION}"></script>


    <script src="{THEME}/js/mayscript.js?v=4?v={VERSION}"></script>
    <script src="{THEME}/js/jquery.cookie.js?v={VERSION}"></script>
    <script src="{THEME}/js/easySelect.js?v={VERSION}"></script>
    <script src="{THEME}/js/popModal.js?v={VERSION}"></script>
  </head>

  <body>
    <script>
      var project_url = "{link-project}";
    </script>
    <div class="page[available=showfull] showfull[/available]">
      <div class="wrp">
        <div class="conteiner">
          <div class="midside">
            {info}
            {content}


            <!--{include file="modules/footside1.tpl"}-->
          </div>
          {* [histor]
          {include file="modules/rigthedit.tpl"}
          [/histor] *}
        </div>



        {AJAX}
       
        <script src="{THEME}/js/iziModal.js?v={VERSION}"></script>
        <script src="{THEME}/js/iziModal.min.js?v={VERSION}"></script>
        <script>
          jQuery(function($) {
          $.get("{THEME}/images/sprite.svg", function(data) {
          var div = document.createElement("div");
          div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
          document.body.insertBefore(div, document.body.childNodes[0]);
          });
          });
        </script>
        <script>
          //  var uget = getUrlVars()["stroka"];
          //alert (uget);
          //alert($('.relnews').html());

          $(".relnews").each(function(index, el) {
            //  alert('11');

            var e = $(".relnews"),

              fix = e.html().replaceAll("index.php?", "index.php?stroka=ok&");
            e.html(fix);

          });
        </script>
        <div id="layer"></div>

        <script>
          $('.urlmetka').on('click', function() {
            //alert('per'+$(this).attr('data-url'));
            var destination = $(this).closest('.text').find('#per' + $(this).attr('data-url')).offset().top - 60;
            jQuery('html, body').animate({ scrollTop: destination }, 1100);
            return false;
          })
          setTimeout(() => {
            $('.addboxk .highslide').attr("onclick", "").unbind("click");
            // $('.addboxk .highslide').each(function(){
            // // $el = $(this).find('img');
            // // $el.appendTo($(this).closest('span'));
            // // $(this).remove();
            
            // $(this).on('click',function(event){
            //   alert(1)
            //   event.stopImmediatePropagation();
            //   return false;
            // })
            // });
          }, 1000);
          
        </script>
  </body>

</html>