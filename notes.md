---
title: Notes Index
description: "Index of random notes"
menu_title: Notes
order: 2
layout: default
thumb_img: "assets/img/ajaspe.jpg"
---

## Contents
<div class="row px-3">
	<table class="table table-dark table-sm table-borderless table-striped">
		<tbody class="table-borderless">
			  {% for note in site.notes %}
				<tr>
					<td class="text-warning col-1"><p class="text-end">[<em>{{ note.last_modification_date }}</em>]</p></td>
					<td><a href="{{ note.url }}">{{ note.title }}</a></td>
				</tr>
				{% endfor %}
		</tbody>
	</table>
</div>

## Web experiments
<div class="row px-3">
	<table class="table table-dark table-sm table-borderless table-striped">
		<tbody class="table-borderless">
			  {% for experiment in site.experiments %}
				<tr>
					<td class="text-warning col-1"><p class="text-end">[<em>{{ experiment.last_modification_date }}</em>]</p></td>
					<td><a href="{{ experiment.url }}">{{ experiment.title }}</a></td>
				</tr>
				{% endfor %}
		</tbody>
	</table>
</div>
