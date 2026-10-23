---
title: Publications
description: "Alberto Jaspe: full list of publications"
menu_title: Publications
order: 2
layout: default
permalink: /publications/
thumb_img: "assets/img/thumb_site.jpg"
---

# Publications
{: .page-title}

{% comment %} My own work (papers and my theses) is listed first; the theses I supervised (entries with role: supervisor) come in their own section at the end. {% endcomment %}
{% assign papers = site.publications | where_exp: "p", "p.role != 'supervisor'" %}
{% assign theses = site.publications | where_exp: "p", "p.role == 'supervisor'" %}

{% comment %} Citation trend: compare with the newest history snapshot that is at least 30 days old, or with the oldest one while the history is younger than that. {% endcomment %}
{% assign cite_hist = site.data.citations_history %}{% assign cite_base = nil %}{% assign cite_base_label = "" %}
{% if cite_hist and cite_hist.size > 0 %}{% assign cite_cutoff = site.time | date: "%s" | plus: 0 | minus: 2592000 %}{% for snap in cite_hist %}{% assign snap_s = snap.date | date: "%s" | plus: 0 %}{% if snap_s <= cite_cutoff %}{% assign cite_base = snap %}{% endif %}{% endfor %}{% if cite_base %}{% assign cite_base_label = "in the last 30 days" %}{% elsif cite_hist.size > 1 %}{% assign cite_base = cite_hist | first %}{% assign cite_base_label = cite_base.date | date: "since %b %-d" %}{% endif %}{% endif %}
{% assign cit = site.data.citations %}{% if cit and cit.total %}<p class="pub-stats text-white-50 small">{% assign patents = papers | where: "type", "Patent application" %}{{ papers | size | minus: patents.size }} publications{% if patents.size > 0 %} &middot; {{ patents.size }} patent{% if patents.size > 1 %}s{% endif %}{% endif %} &middot; <b>{{ cit.total }}</b> citations{% if cite_base %}{% assign cite_dtot = 0 %}{% for pair in cit.papers %}{% assign cite_code = pair[0] %}{% assign cite_entry = pair[1] %}{% assign cite_b = cite_base.papers[cite_code] %}{% if cite_b %}{% assign cite_d = cite_entry.count | minus: cite_b %}{% if cite_d > 0 %}{% assign cite_dtot = cite_dtot | plus: cite_d %}{% endif %}{% endif %}{% endfor %}{% if cite_dtot > 0 %} <span class="pub-cites-delta">+{{ cite_dtot }} {{ cite_base_label }}</span>{% endif %}{% endif %} &middot; h-index <b>{{ cit.h_index }}</b> <span class="text-white-50">(according to <a href="https://www.semanticscholar.org/" class="text-white-50">{{ cit.source }}</a>, updated {{ cit.updated | date: "%b %Y" }})</span> &middot; <a href="#supervised-theses" class="text-white-50">{{ theses | size }} supervised theses</a></p>{% endif %}

<div class="fam-legend pub-filter" role="group" aria-label="Filter by type">
<button type="button" class="fam-tag pub-filter-btn active" data-group="all" style="--fam: #bbb">All</button>
<button type="button" class="fam-tag pub-filter-btn" data-group="journal" style="--fam: rgb(255, 166, 93)">Journal</button>
<button type="button" class="fam-tag pub-filter-btn" data-group="conference" style="--fam: #6cb4ff">Conference</button>
<button type="button" class="fam-tag pub-filter-btn" data-group="book" style="--fam: #8fd18f">Book chapter</button>
<button type="button" class="fam-tag pub-filter-btn" data-group="editorial" style="--fam: #ccc">Editorial</button>
<button type="button" class="fam-tag pub-filter-btn" data-group="thesis" style="--fam: #c48be0">Academic works</button>
<button type="button" class="fam-tag pub-filter-btn" data-group="patent" style="--fam: #5fd3c8">Patent</button>
</div>
<div class="fam-legend pub-filter pub-filter-tags" role="group" aria-label="Filter by topic">
<button type="button" class="fam-tag pub-tag-btn active" data-tag="all" style="--fam: #bbb">All topics</button>
{% for t in site.data.tags %}<button type="button" class="fam-tag pub-tag-btn" data-tag="{{ t[0] }}" style="--fam: #d8d8d8" title="{{ t[1].about }}">{{ t[1].name }}</button>
{% endfor %}</div>

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
<h2 id="supervised-theses" class="mt-5">Supervised academic theses</h2>

<p class="small text-white-50">Theses and final projects I have supervised or co-supervised.</p>

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

<script>
(function () {
  // two filters, type and topic, combined with AND; the choice is kept in the URL hash (#type=journal&tag=point-clouds)
  var typeButtons = document.querySelectorAll('.pub-filter-btn');
  var tagButtons = document.querySelectorAll('.pub-tag-btn');
  var state = { type: 'all', tag: 'all' };
  function visibleRowsAfter(h) {
    var el = h.nextElementSibling;
    while (el && !el.classList.contains('pub-year')) {
      if (el.classList.contains('pub-row') && !el.classList.contains('pub-hidden')) { return true; }
      el = el.nextElementSibling;
    }
    return false;
  }
  function apply() {
    document.querySelectorAll('.pub-list .pub-row[data-group]').forEach(function (r) {
      var okType = state.type === 'all' || r.getAttribute('data-group') === state.type;
      var okTag = state.tag === 'all' || (' ' + (r.getAttribute('data-tags') || '') + ' ').indexOf(' ' + state.tag + ' ') >= 0;
      r.classList.toggle('pub-hidden', !(okType && okTag));
    });
    document.querySelectorAll('.pub-list .pub-year').forEach(function (h) { h.classList.toggle('pub-hidden', !visibleRowsAfter(h)); });
    var sup = document.getElementById('supervised-theses');
    if (sup) {
      var any = document.querySelectorAll('#supervised-theses ~ .pub-list .pub-row:not(.pub-hidden)').length > 0;
      sup.classList.toggle('pub-hidden', !any);
      if (sup.nextElementSibling && sup.nextElementSibling.tagName === 'P') { sup.nextElementSibling.classList.toggle('pub-hidden', !any); }
    }
    typeButtons.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-group') === state.type); });
    tagButtons.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-tag') === state.tag); });
    var parts = [];
    if (state.type !== 'all') { parts.push('type=' + state.type); }
    if (state.tag !== 'all') { parts.push('tag=' + state.tag); }
    if (history.replaceState) { history.replaceState(null, '', location.pathname + (parts.length ? '#' + parts.join('&') : '')); }
  }
  typeButtons.forEach(function (b) {
    b.addEventListener('click', function () {
      var g = b.getAttribute('data-group');
      state.type = (b.classList.contains('active') && g !== 'all') ? 'all' : g;
      apply();
    });
  });
  tagButtons.forEach(function (b) {
    b.addEventListener('click', function () {
      var t = b.getAttribute('data-tag');
      state.tag = (b.classList.contains('active') && t !== 'all') ? 'all' : t;
      apply();
    });
  });
  var h = location.hash.replace(/^#/, '');
  h.split('&').forEach(function (kv) {
    var p = kv.split('=');
    if (p[0] === 'type' && /^[a-z]+$/.test(p[1] || '')) { state.type = p[1]; }
    if (p[0] === 'tag' && /^[a-z-]+$/.test(p[1] || '')) { state.tag = p[1]; }
  });
  if (state.type !== 'all' || state.tag !== 'all') { apply(); }
})();
</script>
