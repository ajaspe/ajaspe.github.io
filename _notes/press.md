---
title: In the press
description: "Press and media coverage of the work of Alberto Jaspe-Villanueva and his teams."
summary: "Articles, interviews and videos about my work and my teams' projects."
layout: note
kind: page
icon: fa-newspaper
updated: 2026-10-20
---

{% assign items = site.data.press.items | sort: "date" | reverse %}
{% if items.size == 0 %}
<p>Nothing here yet.</p>
{% else %}
<ul class="post-list list-unstyled">
{% for it in items %}
<li class="post-item"><span class="post-date">{{ it.date | date: "%b %Y" }}</span><div><a class="post-title" href="{{ it.url }}">{{ it.title }}</a>{% if it.lang and it.lang != "en" %} <span class="post-tag">{{ it.lang }}</span>{% endif %}<div class="post-summary">{{ it.outlet }}{% if it.note %}. {{ it.note }}{% endif %}</div></div></li>
{% endfor %}
</ul>
{% endif %}
