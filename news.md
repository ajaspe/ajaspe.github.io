---
title: News
description: "News archive of Alberto Jaspe-Villanueva: papers, awards, committees, talks and travel, grouped by year"
layout: default
permalink: /news/
thumb_img: "assets/img/thumb_home_ajaspe.jpg"
---

# News
{: .page-title}

{% assign news_by_year = site.data.news | sort: "date" | reverse | group_by_exp: "n", "n.date | date: '%Y'" %}
{% for y in news_by_year %}

## {{ y.name }}

{% include news-list.html items=y.items %}

{% endfor %}
