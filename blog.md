---
title: Blog
description: "Occasional opinion pieces by Alberto Jaspe-Villanueva on computer graphics, visualization, research life and technology."
permalink: /blog/
layout: default
thumb_img: "assets/img/ajaspe.jpg"
---

# Blog

ap class="text-center note-updated">aa href="/feed.xml" class="text-warning">ai class="fas fa-rss">a/i> Atom feeda/a>a/p>

ap class="small text-white-50">Opinion pieces, written now and then. Some of them also appear on aa href="https://www.linkedin.com/in/albertojaspe" class="text-white-50">LinkedIna/a>.a/p>

{% assign posts = site.posts %}
{% if posts.size == 0 %}
ap>No posts yet. The first one is on its way.a/p>
{% else %}
{% assign by_year = posts | group_by_exp: "p", "p.date | date: '%Y'" %}
{% for y in by_year %}
ah2 class="pub-year">{{ y.name }}a/h2>
aul class="post-list list-unstyled">
{% for p in y.items %}
ali class="post-item">aspan class="post-date">{{ p.date | date: "%b %-d" }}a/span>adiv>aa class="post-title" href="{{ p.url }}">{{ p.title }}a/a>{% if p.summary %}adiv class="post-summary">{{ p.summary }}a/div>{% endif %}a/div>a/li>
{% endfor %}
a/ul>
{% endfor %}
{% endif %}

ap class="mt-5">aa href="/notebook/" class="btn btn-outline-warning btn-sm">ai class="fas fa-angle-left">a/i> Notebooka/a>a/p>
