<script src="{THEME}/js/jquery.tagify.min.js"></script>
<br>
<article class="box story">
	<div class="box_in">
		<h4 class="title h1">Добавить статью</h4>
		<div class="addform">
			<ul class="ui-form">
				<li class="form-group">
					<label for="title" class="imp">Заголовок</label>
					<input type="text" name="title" id="title" value="{title}" class="wide" required>
				</li>
				[urltag]
				<!--<li class="form-group">
					<label for="alt_name" class="imp">URL статьи</label>
					<input type="text" name="alt_name" id="alt_name" value="{alt-name}" class="wide">
				</li>-->
				[/urltag]
				<li class="form-group">
					<label for="category" class="imp">Категория</label>
					{category}
				</li>
				<script>
					function oprostogle(elem) {
						if ($(elem).find('.k-icon').hasClass('k-i-plus-outline')) {
							$(elem).find('.k-icon').removeClass('k-i-plus-outline').addClass('k-i-minus-outline');
						} else {
							$(elem).find('.k-icon').removeClass('k-i-minus-outline').addClass('k-i-plus-outline');
						}
						$('.addvote').toggle();
						return false;
					}
				</script>
				<li class="form-group">
					<label><a href="#" onclick="oprostogle(this)" style="text-decoration: none;"><span
								class="k-icon k-i-plus-outline"></span> Добавить Опрос</a></label>
				</li>
				<li class="form-group addvote" style="display:none;">
					<label for="vote_title">Заголовок опроса</label>
					<input type="text" name="vote_title" value="{votetitle}" class="wide" />
				</li>
				<li class="form-group addvote" style="display:none;">
					<label for="frage">Вопрос</label>
					<input type="text" name="frage" value="{frage}" class="wide" />
				</li>
				<li class="form-group addvote" style="display:none;">
					<label for="vote_body">Список ответов</label>
					<textarea name="vote_body" rows="5" class="wide"
						placeholder="Каждая новая строка является новым вариантом ответа">{votebody}</textarea><br /><label><input
							type="checkbox" name="allow_m_vote" value="1" {allowmvote}> Разрешить выбор нескольких
						вариантов</label>
				</li>
				<!--<li class="form-group">
					<label for="short_story">Краткое описание</label>
					[not-wysywyg]
					<div class="bb-editor">
						{bbcode}
						<textarea name="short_story" id="short_story" onfocus="setFieldName(this.name)" rows="10" class="wide" required>{short-story}</textarea>
					</div>
					[/not-wysywyg]
					{shortarea}
				</li>-->
				<li class="form-group">
					<label for="full_story">Описание</label>
					[not-wysywyg]
					<div class="bb-editor">
						{bbcode}
						<textarea name="full_story" id="full_story" onfocus="setFieldName(this.name)" rows="12"
							class="wide">{full-story}</textarea>
					</div>
					[/not-wysywyg]
					{fullarea}
				</li>

				<li class="form-group">
					<table style="width:100%">
						{xfields}
					</table>
				</li>
				<li class="form-group addtags">
					<label for="alt_name">Ключевые слова</label>
					<input placeholder="Для фиксации нажмите Enter" type="text" name="tags" id="tags" value="{tags}"
						maxlength="150" autocomplete="off" class="">

					<!-- <input name='basic' value='tag1, tag2 autofocus'  class="wide">-->

				</li>
				<li class="form-group addtags">
					{autor}
					<div class="admin_checkboxs">{admintag}</div>
				</li>
				[recaptcha]
				<li class="form-group">{recaptcha}</li>
				[/recaptcha]
				[question]
				<li class="form-group">
					<label for="question_answer">{question}</label>
					<input placeholder="Введите ответ" type="text" name="question_answer" id="question_answer"
						class="wide" required>
				</li>
				[/question]
			</ul>


			<script>

				var input = document.querySelector('input[name=autor12]');
				if (input) {

					new Tagify(input, {
						whitelist: [{autorinput}],
						maxTags: 1,
						enforceWhitelist: true,
						dropdown: {
							maxItems: 30,
							classname: "tags-look",
							enabled: 0,
							closeOnSelect: false
						}
					});
				}

				var input2 = document.querySelector('input[name=tags]');
				new Tagify(input2, {
					whitelist: [{tagsinput}],
					maxTags: 50,
					dropdown: {
						maxItems: 50,
						classname: "tags-look",
						enabled: 0,
						closeOnSelect: false
					}
				});
				$(function() {


					$("#idselectcat").easySelect({
						buttons: true,
						placeholder: 'Выберите категорию...',
						selectColor: '#414c52',
						placeholderColor: '#838383',
						itemTitle: 'Selected items',
						showEachItem: true,
						width: '100%',
						dropdownMaxHeight: 'auto'
					})
				});
			</script>

			<p style="margin: 20px 0 0 0;" class="grey"><span style="color: #e85319">*</span> — поля отмеченные
				звездочкой обязательны для заполнения.</p>
			<div class="form_submit">
				[sec_code]
				<div class="c-captcha">
					{sec_code}
					<input placeholder="Повторите код" title="Введите код указанный на картинке" type="text"
						name="sec_code" id="sec_code" required>
				</div>
				[/sec_code]
				<!--onClick="proverload('start')"-->
				<button class="btn btn-big" type="submit" name="add"><b>Отправить</b></button>
				<button class="btn-border btn-big" onclick="preview()" type="submit"
					name="nview"><b>Предпросмотр</b></button>
			</div>
		</div>
	</div>

</article>