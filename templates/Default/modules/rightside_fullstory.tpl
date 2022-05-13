    [histor]
    <!-- <div class="block tags_block">
		<h6 class="title"><b>История изменений</b></h6>
		<div class="navigat">


		</div>
	</div>-->
    <!-- История изменений -->
    <div class="blockmy block top_block histortop">



        <table width="100%" onClick="openhistory({category-id});return false;" class="teghover">
            <tr class="tegtr">
                <td width="100%" class="nowraps tegtr">
                    <h6 class="tegiformcl">История изменений</h6>
                    <h6 class="tegiformcl4" style="border-top: 1px none #D1D1D1;background:none;"></h6>
                </td>
                <td align="right" valign="bottom" class="tegtr"><img src="images/triangledown.png" width="12"
                        height="12" class="tegimg" / id="idimgtags"></td>
            </tr>
        </table>

        <!--<a href="#" onClick="opentegform();return false;" class="tegiformcl"><b>Теги</b></h6><div class="tgimg"></div>
            </a>-->

        <div id="idtags" class="csstags">
            <div class="tag_list">
                {history}
            </div>
        </div>
    </div>
    <script>
      var first = getUrlVars()["vivid"];
        if (first =='ok') {
            openhistory(1);
        }
    </script>
    [/histor]

    [related-news]
    <!-- Похожее -->
    <div class="block rel_block">
        <h4 class="title"><b>Похожее</b></h4>
        <ul class="relnews">
            {related-news}
        </ul>
    </div>
    <!-- / Похожее -->
    [/related-news]
    [poll]
    {poll}
    [/poll]
    <!-- Баннер 300X250 -->
    <!--<div class="banner banner_300">
	<img src="{THEME}/images/tmp/banner_300x250.png" alt="">
</div>-->
    <!-- / Баннер 300X250 -->
    <!-- Баннер 240X400 -->
    <!--<div class="banner banner_240">
	<img src="{THEME}/images/tmp/banner_240x400.png" alt="">
</div>-->
    <!-- / Баннер 240X400 -->
    [tags]
    <!-- Теги -->
    <div class="block tags_block">
        <h4 class="title"><b>Теги</b></h4>
        <div class="tag_list">
            {tags}
        </div>
    </div>
    <!-- / Теги -->
[/tags]