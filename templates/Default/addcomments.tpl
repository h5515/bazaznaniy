[no-histor]
<div class="box">
	<div id="addcomment" class="addcomment">
		<button id="btaddcomment" style="margin: 10px;">Добавить комментарий</button>
		<button id="otmencomment" style="margin: 10px; display:none;">Отмена</button>
		<div class="box_in" style="display: none;">
			<h3>Оставить комментарий</h3>
			<ul class="ui-form">
				[not-logged]
				<li class="form-group combo">
					<div class="combo_field"><input placeholder="Ваше имя" type="text" name="name" id="name"
							class="wide" required></div>
					<div class="combo_field"><input placeholder="Ваш e-mail" type="email" name="mail" id="mail"
							class="wide"></div>
				</li>
				[/not-logged]
				<li id="comment-editor">{editor}</li>
				[recaptcha]
				<li>{recaptcha}</li>
				[/recaptcha]
				[question]
				<li class="form-group">
					<label for="question_answer">{question}</label>
					<input placeholder="Ответ" type="text" name="question_answer" id="question_answer" class="wide"
						required>
				</li>
				[/question]
			</ul>
			<div class="form_submit">
				[sec_code]
				<div class="c-captcha">
					{sec_code}
					<input placeholder="Повторите код" title="Введите код указанный на картинке" type="text"
						name="sec_code" id="sec_code" required>
				</div>
				[/sec_code]
				<button id="idcomrit" type="submit" name="submit" title="Отправить комментарий"><span class='k-icon k-i-comment'></span>Отправить
						комментарий</button>
			</div>
		</div>
	</div>
</div>
<script>
	$("#idcomrit").kendoButton({
		themeColor: "primary",
	});
	$("#btaddcomment").kendoButton({
		themeColor: "info",
		icon: "comment",
		click: function() {
			$("#addcomment .box_in").slideDown(100);
			$("#otmencomment").show();
			$("#btaddcomment").hide();
			//$("html, body").animate({ scrollTop: $(document).height() }, 100);
		}
	});
	$("#otmencomment").kendoButton({
		themeColor: "secondary",
		icon: "x-outline",
		click: function() {
			$("#addcomment .box_in").slideUp(100);
			$("#otmencomment").hide();
			$("#btaddcomment").show();
		}
	});
</script>
[/no-histor]