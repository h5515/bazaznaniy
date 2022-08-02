[allow-download]
	<div class="attachment">
		<div class="attatops">
	    <div class="attacimag">
		<img src="{icon}"/>
		</div>
		<div class="attacright">
			<div class="attadownload"><a href="{link}" ><span class='k-icon k-i-download'></span> Скачать файл</a></div>
			<div class="attaname">{name}</div>
		</div>
		</div>
		<div class="attainfo"><span class="attasize">{size}</span><span class="attacount">(cкачиваний: {count})</span></div>
		[allow-online]<div class="attaonline"><a href="{online-view-link}" target="_blank">Посмотреть файл онлайн</a></div>[/allow-online]

		{* Скачать файл: <a href="{link}" >{name}</a> [count] [{size}] (cкачиваний: {count})[/count]
		[allow-online]<br />Посмотреть онлайн файл: <a href="{online-view-link}" target="_blank">{name}</a>[/allow-online] *}
	</div>
[/allow-download]
[not-allow-download]<span class="attachment">У вас нет доступа к скачиванию файлов с нашего сервера</span>[/not-allow-download]