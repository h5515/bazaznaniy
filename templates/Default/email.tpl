<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<title>{%title%}</title>
<meta content="text/html; charset={charset}" http-equiv="Content-Type">
<style type="text/css">

p {
	margin:0px;
	padding: 0px;
}

a:active,
a:visited,
a:link {
	color: #4b719e;
	text-decoration:none;
}

a:hover {
	color: #FF0505;
	text-decoration: underline;
}
	.ramka {
		border:solid 1px;
		border-color: #8199F4;
		border-radius: 15px;
		overflow: hidden;
		padding: 10px;
		max-width: 1100px;
		/*width: 100%;*/
	}
	
</style>
</head>
<body>

    
<p> <span style="font-size: 14px; color: #FF0004">Добрый день!<br>
	<b>Статья удалена из базы знаний:</b>
	</span> </p>
<p><span style="font-size: 14px;color: rgb(0, 0, 0);">Автор: <b>{%username%}</b></span></p>
<p><span style="font-size: 14px;color: rgb(0, 0, 0);"> Категория: {%category%} </span></p>
<p><span style="font-size: 14px;color: rgb(0, 0, 0);">Дата добавления: <b>{%date%}</b> </span></p>
<h3><a href="{%link%} "> {%title%}</a></h3>

	<p><div class="ramka">
		{content}
	</div></p>
    <br>
<p>С уважением,</p>
<p><a href="https://bz.fto.com.ru:470/">База знаний ФТО</a></p>

</body>
</html>