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

{% comment %} Papers and academic works (theses, final projects) are listed separately; a thesis is any entry with a `degree` field. {% endcomment %}
{% assign papers = site.publications | where_exp: "p", "p.degree == nil" %}
{% assign theses = site.publications | where_exp: "p", "p.degree" %}

{% comment %} Citation trend: compare with the newest history snapshot that is at least 30 days old, or with the oldest one while the history is younger than that. {% endcomment %}
{% assign cite_hist = site.data.citations_history %}{% assign cite_base = nil %}{% assign cite_base_label = "" %}
{% if cite_hist and cite_hist.size > 0 %}{% assign cite_cutoff = site.time | date: "%s" | plus: 0 | minus: 2592000 %}{% for snap in cite_hist %}{% assign snap_s = snap.date | date: "%s" | plus: 0 %}{% if snap_s <= cite_cutoff %}{% assign cite_base = snap %}{% endif %}{% endfor %}{% if cite_base %}{% assign cite_base_label = "in the last 30 days" %}{% elsif cite_hist.size > 1 %}{% assign cite_base = cite_hist | first %}{% assign cite_base_label = cite_base.date | date: "since %b %-d" %}{% endif %}{% endif %}
{% assign cit = site.data.citations %}{% if cit and cit.total %}<p class="pub-stats text-white-50 small">{{ papers | size }} publications &middot; <b>{{ cit.total }}</b> citations{% if cite_base %}{% assign cite_dtot = 0 %}{% for pair in cit.papers %}{% assign cite_code = pair[0] %}{% assign cite_entry = pair[1] %}{% assign cite_b = cite_base.papers[cite_code] %}{% if cite_b %}{% assign cite_d = cite_entry.count | minus: cite_b %}{% if cite_d > 0 %}{% assign cite_dtot = cite_dtot | plus: cite_d %}{% endif %}{% endif %}{% endfor %}{% if cite_dtot > 0 %} <span class="pub-cites-delta">+{{ cite_dtot }} {{ cite_base_label }}</span>{% endif %}{% endif %} &middot; h-index <b>{{ cit.h_index }}</b> <span class="text-white-50">(according to <a href="https://www.semanticscholar.org/" class="text-white-50">{{ cit.source }}</a>, updated {{ cit.updated | date: "%b %Y" }})</span> &middot; <a href="#academic-works" class="text-white-50">{{ theses | size }} academic works</a></p>{% endif %}

<div class="container my-0 pub-list">
{% assign prev_year = "" %}
{% for pub in papers reversed %}
{% if pub.year != prev_year %}
{% assign prev_year = pub.year %}
<h2 class="pub-year" id="y{{ pub.year }}">{{ pub.year }}</h2>
{% endif %}
{% include pub-row.html pub=pub %}
{% endfor %}
</div>

{% if theses.size > 0 %}
<h2 id="academic-works" class="mt-5">Academic works</h2>

<p class="small text-white-50">Theses and final projects: my own, and the ones I have supervised.</p>

<div class="container my-0 pub-list">
{% assign prev_year = "" %}
{% for pub in theses reversed %}
{% if pub.year != prev_year %}
{% assign prev_year = pub.year %}
<h2 class="pub-year" id="t{{ pub.year }}">{{ pub.year }}</h2>
{% endif %}
{% include pub-row.html pub=pub %}
{% endfor %}
</div>
{% endif %}
