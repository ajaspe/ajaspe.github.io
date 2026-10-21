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

{% comment %} Citation trend: compare with the newest history snapshot that is at least 30 days old, or with the oldest one while the history is younger than that. {% endcomment %}
{% assign cite_hist = site.data.citations_history %}{% assign cite_base = nil %}{% assign cite_base_label = "" %}
{% if cite_hist and cite_hist.size > 0 %}{% assign cite_cutoff = site.time | date: "%s" | plus: 0 | minus: 2592000 %}{% for snap in cite_hist %}{% assign snap_s = snap.date | date: "%s" | plus: 0 %}{% if snap_s <= cite_cutoff %}{% assign cite_base = snap %}{% endif %}{% endfor %}{% if cite_base %}{% assign cite_base_label = "in the last 30 days" %}{% elsif cite_hist.size > 1 %}{% assign cite_base = cite_hist | first %}{% assign cite_base_label = cite_base.date | date: "since %b %-d" %}{% endif %}{% endif %}
{% assign cit = site.data.citations %}{% if cit and cit.total %}<p class="pub-stats text-white-50 small">{{ site.publications | size }} publications &middot; <b>{{ cit.total }}</b> citations{% if cite_base %}{% assign cite_dtot = 0 %}{% for pair in cit.papers %}{% assign cite_b = cite_base.papers[pair[0]] %}{% if cite_b %}{% assign cite_d = pair[1].count | minus: cite_b %}{% if cite_d > 0 %}{% assign cite_dtot = cite_dtot | plus: cite_d %}{% endif %}{% endif %}{% endfor %}{% if cite_dtot > 0 %} <span class="pub-cites-delta">+{{ cite_dtot }} {{ cite_base_label }}</span>{% endif %}{% endif %} &middot; h-index <b>{{ cit.h_index }}</b> <span class="text-white-50">(according to <a href="https://www.semanticscholar.org/" class="text-white-50">{{ cit.source }}</a>, updated {{ cit.updated | date: "%b %Y" }})</span></p>{% endif %}

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
{% elsif pub.degree %}
    {% assign pubdata = pub.institution %}
    {% if pub.role == "supervisor" %}{% assign pubdatapost = "(supervised with " | append: pub.supervisors | replace: "Alberto Jaspe-Villanueva and ", "" | replace: " and Alberto Jaspe-Villanueva", "" | replace: "Alberto Jaspe-Villanueva", "" | append: ")" | replace: "(supervised with )", "" %}{% endif %}
{% endif %}
{% assign type_l = pub.type | downcase %}
{% if type_l contains "thesis" or type_l contains "project" %}{% assign type_class = "pub-type-thesis" %}
{% elsif type_l contains "journal" %}{% assign type_class = "pub-type-journal" %}
{% elsif type_l contains "conference" or type_l contains "tutorial" %}{% assign type_class = "pub-type-conference" %}
{% elsif type_l contains "book" %}{% assign type_class = "pub-type-book" %}
{% else %}{% assign type_class = "pub-type-other" %}{% endif %}
<div class="row pub-row gx-3 gy-0 py-2 rounded align-items-center">
    <div class="col-auto">
        <a href="{{ puburl | relative_url }}" class="pub-thumb-box"><img src="{{ imgpath | relative_url }}" class="pub-thumb{% if pub.degree %} pub-thumb-contain{% endif %}" loading="lazy" alt="{{ pub.title | escape }} thumbnail"></a>
    </div>
    <div class="col">
        <div class="pub-title"><a href="{{ puburl | relative_url }}">{{ pub.title }}</a>{% if pub.awards %} <span class="badge bg-danger">{{ pub.awards }}</span>{% endif %}</div>
        <div class="pub-authors">{{ pub.authors }}</div>
        <div class="pub-venue small"><span class="pub-type {{ type_class }}">{{ pub.type }}</span>{% if pub.role == "supervisor" %} <span class="pub-type pub-type-role">Supervisor</span>{% endif %}{% assign c = site.data.citations.papers[pub.code] %}{% if c and c.count > 0 %} <a href="{{ c.url }}" class="pub-cites" title="Citations according to {{ site.data.citations.source }}"><i class="fas fa-quote-right"></i> {{ c.count }}{% if cite_base and cite_base.papers[pub.code] %}{% assign cite_dp = c.count | minus: cite_base.papers[pub.code] %}{% if cite_dp > 0 %}<span class="pub-cites-delta" title="+{{ cite_dp }} {{ cite_base_label }}">+{{ cite_dp }}</span>{% endif %}{% endif %}</a>{% endif %} <em>{{ pubdata }}</em> <span class="text-white-50">{{ pubdatapost }}</span></div>
    </div>
</div>
{% endfor %}
</div>
