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

{% assign cit = site.data.citations %}{% if cit and cit.total %}<p class="pub-stats text-white-50 small">{{ site.publications | size }} publications &middot; <b>{{ cit.total }}</b> citations &middot; h-index <b>{{ cit.h_index }}</b> <span class="text-white-50">(according to <a href="https://www.semanticscholar.org/" class="text-white-50">{{ cit.source }}</a>, updated {{ cit.updated | date: "%b %Y" }})</span></p>{% endif %}

<div class="container my-0 pub-list">
{% assign prev_year = "" %}
{% for pub in site.publications reversed %}
{% if pub.year != prev_year %}
{% assign prev_year = pub.year %}
<h2 class="pub-year" id="y{{ pub.year }}">{{ pub.year }}</h2>
{% endif %}
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
{% assign type_l = pub.type | downcase %}
{% if type_l contains "journal" %}{% assign type_class = "pub-type-journal" %}
{% elsif type_l contains "conference" or type_l contains "tutorial" %}{% assign type_class = "pub-type-conference" %}
{% elsif type_l contains "book" %}{% assign type_class = "pub-type-book" %}
{% else %}{% assign type_class = "pub-type-other" %}{% endif %}
<div class="row pub-row gx-3 gy-0 py-2 rounded align-items-center">
    <div class="col-auto">
        <a href="{{ puburl | relative_url }}" class="pub-thumb-box"><img src="{{ imgpath | relative_url }}" class="pub-thumb" loading="lazy" alt="{{ pub.title | escape }} thumbnail"></a>
    </div>
    <div class="col">
        <div class="pub-title"><a href="{{ puburl | relative_url }}">{{ pub.title }}</a>{% if pub.awards %} <span class="badge bg-danger">{{ pub.awards }}</span>{% endif %}</div>
        <div class="pub-authors">{{ pub.authors }}</div>
        <div class="pub-venue small"><span class="pub-type {{ type_class }}">{{ pub.type }}</span>{% assign c = site.data.citations.papers[pub.code] %}{% if c and c.count > 0 %} <a href="{{ c.url }}" class="pub-cites" title="Citations according to {{ site.data.citations.source }}"><i class="fas fa-quote-right"></i> {{ c.count }}</a>{% endif %} <em>{{ pubdata }}</em> <span class="text-white-50">{{ pubdatapost }}</span></div>
    </div>
</div>
{% endfor %}
</div>
