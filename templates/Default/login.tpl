<div class="headeruz"><button id="search_btn"> <span>
			<svg class="icon icon-search">
				<use xlink:href="#icon-search"></use>
			</svg>
			<svg class="icon icon-cross">
				<use xlink:href="#icon-cross"></use>
			</svg>
		</span> </button>
	<ul class="menuavatar">
		<li><span class="cover titavatar" style="background-image: url({foto});" title="{fullname}"></span><span
				class="hedfullname">{fullname}</span>
			<ul>
				<li><span class="k-icon k-i-strip-font-elements"></span>Тема
					<ul id="radiogroup">
					</ul>
				</li>
				<li><span class="k-icon k-i-user"></span>Мой профиль</li>
				<li id="idlogout"><span class="k-icon k-i-logout"></span>Выход</li>
			</ul>
		</li>
	</ul>
</div>

<script>
	$("#radiogroup").kendoRadioGroup({
		items: ["White", "Blue"],
		layout: "vertical",
		value: mytheme,
		change: function(e) {
			//kendoConsole.log("Change event fired! --> Old value: " + e.oldValue + " --> New value: " + e.newValue);
			dt = {
				theme: e.newValue,
			}
			getajax('/php/theme.php', dt)
		},
	});
	$(".menuavatar").kendoMenu();

	$("#idlogout").click(function(e) {
		data = {
			action: "logout",
			avtkey: "jfdskal289234pfg$#84532"
		}
		$.ajax({
			type: 'POST',
			url: '/engine/ajax/login.php',
			data: data,
			// timeout: 300000, // in milliseconds
			success: function(b) {
				location.reload();
			}
		})
	})
</script>