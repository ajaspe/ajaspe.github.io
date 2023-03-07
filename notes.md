---
title: Notes Index
description: "Index of random notes"
#menu_title: Notes
order: 2
layout: default
thumb_img: "assets/img/ajaspe.jpg"
---

# Index of notes


<div class="row px-3">
	<table class="table table-dark table-sm table-borderless table-striped">
		<thead><tr class="bg-warning text-white border-bottom"><td class="display-6 brand-color">hola</td></tr></thead>
		<tbody class="table-borderless">
			  {% for note in site.notes %}
				<tr>
					<td class="text-warning col-1"><p class="text-end"><em>{{ note.last_modification_date }}</em></p></td>
					<td></td>
					<td><a href="{{ note.url }}">{{ note.title }}</a></td>
				</tr>
				{% endfor %}
		</tbody>
	</table>
</div>