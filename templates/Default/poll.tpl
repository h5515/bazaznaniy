<div class="block_grey">
	<h4 class="title">{question}</h4>
	<div class="vote_more"><a href="#" onclick="ShowAllVotes(); return false;">Другие опросы...</a></div>
		<div class="vote_list">
			{list}
		</div>
	[voted]
		<div class="vote_votes grey">Проголосовало: {votes}</div>
	[/voted]
	[not-voted]
		<div id="butgrupopros">
		<button title="Голосовать" data-role="button" class="k-button-solid-primary" type="submit" onclick="doPoll('vote', '{news-id}'); return false;" ><b>Голосовать</b></button>
		<button title="Результаты опроса" data-role="button" type="button" onclick="doPoll('results', '{news-id}'); return false;">
		<span class="k-icon k-i-align-left" style="font-size: 21px;"></span>
		</button>
		</div>
		<script>kendo.init("#butgrupopros");</script>
	[/not-voted]
</div>