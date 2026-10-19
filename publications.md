---
title: Publications
description: "Alberto Jaspe: full list of publications"
menu_title: Publications
order: 2
layout: default
permalink: /publications/
thumb_img: "assets/img/thumb_home_ajaspe.jpg"
---

# Publications
{: .page-title}

<div class="container my-0 pub-list">
{% for pub in site.publications reversed %}
{% assign puburl = "/publications/" | append: pub.code | append: ".html" %}
{% assign imgpath = "/publications/" | append: pub.code | append: "-thumb.jpg" %}
{% assign pubdata = "" %}
{% assign pubdatapost = "" %}
{% if pub.journal %}
    {% assign pubdata = pub.journal %}
    {% if pub.conference %}{% assign pubdatapost = "(presented at " | append: pub.conference | append: ")" %}{% endif %}
{% elsif pub.conference %}
    {% assign pubdata = pub.conference %}
{% elsif pub.book %}
    {% assign pubdata = pub.book %}
{% endif %}
<div class="row pub-row g-3 py-2 rounded align-items-center">
    <div class="col-auto">
        <div class="pub-thumb-box">
            <a href="{{ puburl | relative_url }}"><img src="{{ imgpath | relative_url }}" class="pub-thumb img-thumbnail imglight" loading="lazy" alt="{{ pub.title }} thumbnail"></a>
        </div>
    </div>
    <div class="col">
        <div class="pub-title"><a href="{{ puburl | relative_url }}">{{ pub.title }}</a>{% if pub.awards %} <span class="badge bg-danger">{{ pub.awards }}</span>{% endif %}</div>
        <div class="pub-authors">{{ pub.authors }}</div>
        <div class="pub-venue small"><span class="text-warning">{{ pub.year }}</span> &middot; {{ pub.type }} &middot; <em>{{ pubdata }}</em> <span class="text-white-50">{{ pubdatapost }}</span></div>
    </div>
</div>
{% endfor %}
</div>
