---
title: Blog
description: "Occasional opinion pieces by Alberto Jaspe-Villanueva on computer graphics, visualization, research life and technology."
permalink: /blog/
layout: default
thumb_img: "assets/img/thumb_site.jpg"
---

# Blog

<p class="text-center note-updated"><a href="/feed.xml" class="text-warning"><i class="fas fa-rss"></i> Atom feed</a></p>

<p class="small text-white-50">Opinion pieces, written now and then. Some of them also appear on <a href="https://www.linkedin.com/in/albertojaspe" class="text-white-50">LinkedIn</a>.</p>

{% assign posts = site.posts %}
{% if posts.size == 0 %}
<p>No posts yet. The first one is on its way.</p>
{% else %}
{% assign by_year = posts | group_by_exp: "p", "p.date | date: '%Y'" %}
{% for y in by_year %}
<h2 class="pub-year">{{ y.name }}</h2>
<ul class="post-list list-unstyled">
{% for p in y.items %}
<li class="post-item"><span class="post-date">{{ p.date | date: "%b %-d" }}</span><div><a class="post-title" href="{{ p.url }}">{{ p.title }}</a>{% if p.summary %}<div class="post-summary">{{ p.summary }}</div>{% endif %}</div></li>
{% endfor %}
</ul>
{% endfor %}
{% endif %}

<p class="mt-5"><a href="/desk/" class="btn btn-outline-warning btn-sm"><i class="fas fa-angle-left"></i> Desk</a></p>
