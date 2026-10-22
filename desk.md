---
title: The Desk
description: "Guides and resources, occasional opinion posts and live demos by Alberto Jaspe-Villanueva: conference deadlines, a survival guide for new visual computing researchers, X3D Copilot, MARLIE and more."
menu_title: Desk
order: 3
permalink: /desk/
redirect_from:
  - /notes.html
  - /notebook/
layout: default
thumb_img: "assets/img/ajaspe.jpg"
---

# The Desk

<p class="small text-white-50">Things that are not papers: pages I keep updating, the occasional opinion piece, and live demos and experiments.</p>

## Guides and resources
{% assign living = site.notes | where: "kind", "living" | sort: "title" %}
<div class="row row-cols-1 row-cols-sm-2 g-3 note-cards">
{% for n in living %}
<div class="col"><a class="card h-100 note-card" href="{{ n.url }}"><div class="card-body"><div class="note-card-icon"><i class="fas {{ n.icon | default: 'fa-file-alt' }}"></i></div><div><div class="note-card-title">{{ n.title }}</div>{% if n.summary %}<div class="note-card-summary">{{ n.summary }}</div>{% endif %}{% if n.updated %}<div class="note-card-meta">Updated {{ n.updated | date: "%b %Y" }}</div>{% endif %}</div></div></a></div>
{% endfor %}
</div>

{% assign pages = site.notes | where: "kind", "page" | sort: "title" %}
{% if pages.size > 0 %}
## Pages
<div class="row row-cols-1 row-cols-sm-2 g-3 note-cards">
{% for n in pages %}
<div class="col"><a class="card h-100 note-card" href="{{ n.url }}"><div class="card-body"><div class="note-card-icon"><i class="fas {{ n.icon | default: 'fa-bookmark' }}"></i></div><div><div class="note-card-title">{{ n.title }}</div>{% if n.summary %}<div class="note-card-summary">{{ n.summary }}</div>{% endif %}</div></div></a></div>
{% endfor %}
</div>
{% endif %}

{% assign posts = site.posts %}
{% if posts.size > 0 %}
## Blog
<ul class="post-list list-unstyled">
{% for p in posts limit: 3 %}
<li class="post-item"><span class="post-date">{{ p.date | date: "%b %-d, %Y" }}</span><div><a class="post-title" href="{{ p.url }}">{{ p.title }}</a>{% if p.summary %}<div class="post-summary">{{ p.summary }}</div>{% endif %}</div></li>
{% endfor %}
</ul>
<p class="text-end mt-2"><a href="/blog/" class="btn btn-outline-warning btn-sm">All posts <i class="fas fa-angle-right"></i></a> <a href="/feed.xml" class="btn btn-outline-light btn-sm" title="Atom feed"><i class="fas fa-rss"></i> Feed</a></p>
{% endif %}

## Live demos and experiments
{% assign experiments = site.demos | concat: site.data.experiments | sort: "updated" | reverse %}
<ul class="post-list list-unstyled">
{% for d in experiments %}
<li class="post-item"><span class="post-date">{{ d.updated | date: "%b %Y" }}</span><div><a class="post-title" href="{{ d.url }}">{{ d.title }}</a>{% if d.description and d.description != d.title %}<div class="post-summary">{{ d.description }}</div>{% endif %}</div></li>
{% endfor %}
</ul>
