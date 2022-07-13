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
				<li><span class="k-icon k-i-user"></span>Мой профиль</li>
				<li id="idlogout"><span class="k-icon k-i-logout"></span>Выход</li>
			</ul>
		</li>
	</ul>
</div>

<script>
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

<style>
	.headeruz .k-menu:not(.k-context-menu)>.k-item {
		color: white;
	}

	.menuavatar:after {
		content: ".";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}

	.headeruz .k-menu-horizontal .k-menu-link {
		border-style: none;
	}

	.headeruz .k-menu-group,
	.headeruz .k-menu.k-context-menu {
		background-color: #0053df;
		color: white;
		/* width: 100%; */
	}

	.headeruz .k-animation-container {
		width: 170px !important;
		top: 33px !important;
		left: 42px !important;
	}

	.headeruz .k-menu-group .k-item>.k-link.k-hover,
	.headeruz .k-menu-group .k-item>.k-link:hover,
	.headeruz .k-menu.k-context-menu .k-item>.k-link.k-hover,
	.headeruz .k-menu.k-context-menu .k-item>.k-link:hover {
		color: white;
		background-color: #013ea7;
	}

	@media (max-width: 980px) {
		.headeruz .k-animation-container {
			width: 157px !important;
			top: 33px !important;
			left: -81px !important;
		}
	}
</style>