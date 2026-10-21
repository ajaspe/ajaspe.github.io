---
title: In the press
description: "Press and media coverage of the work of Alberto Jaspe-Villanueva and his teams: newspaper articles, interviews, podcasts and videos."
summary: "Articles, interviews, podcasts and videos about my work and my teams' projects, with scans of the printed pages."
layout: note
kind: page
icon: fa-newspaper
updated: 2026-10-21
---

Newspaper articles, interviews, podcasts and videos about my work or the teams I have been part of, newest first. Videos and audio play in place when you click their thumbnail; printed pages open as scans.

{% assign items = site.data.press.items | sort: "date" | reverse %}
<div class="container my-0 pub-list press-list">
{% for it in items %}
{% assign kind = it.kind | default: "press" %}
<div class="row pub-row gx-3 gy-0 py-2 rounded align-items-center">
  <div class="col-auto">
  {% if it.youtube %}
    <a href="{{ it.url }}" class="pub-thumb-box press-play" data-embed="https://www.youtube-nocookie.com/embed/{{ it.youtube }}?autoplay=1&rel=0{% if it.youtube_list %}&playlist={{ it.youtube_list | join: ',' }}{% endif %}" data-title="{{ it.title | escape }}" title="Play here"><img src="/assets/press/yt-{{ it.youtube }}.jpg" class="pub-thumb" loading="lazy" alt="{{ it.title | escape }}, video thumbnail"><span class="press-play-icon"><i class="fas fa-play"></i></span></a>
  {% elsif it.spotify %}
    <a href="{{ it.url }}" class="pub-thumb-box press-play press-icon-box" data-embed="https://open.spotify.com/embed/episode/{{ it.spotify }}?theme=0" data-height="152" data-title="{{ it.title | escape }}" title="Play here"><i class="fas fa-podcast"></i><span class="press-play-icon"><i class="fas fa-play"></i></span></a>
  {% elsif it.linkedin %}
    <a href="{{ it.url }}" class="pub-thumb-box press-play press-icon-box" data-embed="https://www.linkedin.com/embed/feed/update/urn:li:activity:{{ it.linkedin }}" data-height="640" data-title="{{ it.title | escape }}" title="Show the post here"><i class="fab fa-linkedin"></i><span class="press-play-icon"><i class="fas fa-play"></i></span></a>
  {% elsif it.thumb %}
    <a href="{{ it.scan | default: it.url }}" class="pub-thumb-box"><img src="{{ it.thumb }}" class="pub-thumb" loading="lazy" alt="{{ it.title | escape }}, scan of the page"></a>
  {% else %}
    <a href="{{ it.url }}" class="pub-thumb-box press-icon-box"><i class="fas fa-newspaper"></i></a>
  {% endif %}
  </div>
  <div class="col">
    <div class="pub-title"><a href="{{ it.url }}">{{ it.title }}</a>{% if it.lang and it.lang != "en" %} <span class="post-tag">{{ it.lang }}</span>{% endif %}</div>
    <div class="pub-authors">{{ it.outlet }}</div>
    <div class="pub-venue small"><span class="pub-type press-kind-{{ kind }}">{{ kind }}</span> <em>{% if it.date_label %}{{ it.date_label }}{% else %}{{ it.date | date: "%B %-d, %Y" }}{% endif %}</em> <span class="text-white-50">{{ it.note }}</span>{% if it.scan and it.scan != it.url %} <a href="{{ it.scan }}">Scan</a>{% endif %}{% for l in it.more %} &middot; <a href="{{ l.url }}">{{ l.name }}</a>{% endfor %}</div>
  </div>
  <div class="col-12 press-player" hidden></div>
</div>
{% endfor %}
</div>

{% include play-in-place.html %}
