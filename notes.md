---
title: Notes
description: "Index of random notes"
menu_title: Notes
order: 3
layout: default
thumb_img: "assets/img/ajaspe.jpg"
---

# Notes
{: .page-title}

## Contents
<div class="row px-3">
	<table class="table table-dark table-hover table-striped">
		<tbody>
			  {% for note in site.notes %}
				<tr>
					<td class="text-warning col-1 text-nowrap"><span class="text-end">[<em>{{ note.updated | date: "%b %Y" }}</em>]</span></td>
					<td><a href="{{ note.url }}">{{ note.title }}</a></td>
				</tr>
				{% endfor %}
		</tbody>
	</table>
</div>

## Web demos/experiments
<div class="row px-3">
	<table class="table table-dark table-hover table-striped">
		<tbody>
			  {% for demo in site.demos %}
				<tr>
					<td class="text-warning col-1 text-nowrap"><span class="text-end">[<em>{{ demo.updated | date: "%b %Y" }}</em>]</span></td>
					<td><a href="{{ demo.url }}">{{ demo.title }}</a></td>
				</tr>
				{% endfor %}
		</tbody>
	</table>
</div>
