---
title: Publications
description: "Alberto Jaspe: full list of publications"
menu_title: Publications
order: 2
layout: default
permalink: /publications/
sitemap: true   # explicit: the local Jekyll 4 would otherwise match the "publications" sitemap exclusion in _config.yml by prefix
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
{% assign cit = site.data.citations %}{% if cit and cit.total %}<p class="pub-stats text-white-50 small">{% assign patents = papers | where: "type", "Patent application" %}<span class="pub-stats-counts">{{ papers | size | minus: patents.size }} publications{% if patents.size > 0 %} &middot; {{ patents.size }} patent{% if patents.size > 1 %}s{% endif %}{% endif %} &middot; <a href="#supervised-theses" class="text-white-50">{{ theses | size }} supervised theses</a></span><span class="pub-stats-cites"><b>{{ cit.total }}</b> citations{% if cite_base %}{% assign cite_dtot = 0 %}{% for pair in cit.papers %}{% assign cite_code = pair[0] %}{% assign cite_entry = pair[1] %}{% assign cite_b = cite_base.papers[cite_code] %}{% if cite_b %}{% assign cite_d = cite_entry.count | minus: cite_b %}{% if cite_d > 0 %}{% assign cite_dtot = cite_dtot | plus: cite_d %}{% endif %}{% endif %}{% endfor %}{% if cite_dtot > 0 %} <span class="pub-cites-delta">+{{ cite_dtot }} {{ cite_base_label }}</span>{% endif %}{% endif %} &middot; h-index <b>{{ cit.h_index }}</b> <span class="text-white-50">(<a href="https://www.semanticscholar.org/" class="text-white-50">{{ cit.source }}</a>, updated {{ cit.updated | date: "%b %Y" }})</span></span></p>{% endif %}

{% comment %} The two filters live in a closed box; its summary line says what is filtered and how many are shown. {% endcomment %}
<details class="pub-filters">
<summary><i class="fas fa-filter"></i> Filter <span class="pub-filters-state"></span><span class="pub-filters-reset" role="button" tabindex="0" hidden>clear</span></summary>
<div class="pub-filters-body">
<div class="pub-filters-label">Type</div>
<div class="fam-legend pub-filter" role="group" aria-label="Filter by type">
<button type="button" class="fam-tag pub-filter-btn active" data-group="all" style="--fam: #bbb">All</button>
<button type="button" class="fam-tag pub-filter-btn" data-group="journal" style="--fam: #f48fb1">Journal</button>
<button type="button" class="fam-tag pub-filter-btn" data-group="conference" style="--fam: #6cb4ff">Conference</button>
<button type="button" class="fam-tag pub-filter-btn" data-group="book" style="--fam: #8fd18f">Book chapter</button>
<button type="button" class="fam-tag pub-filter-btn" data-group="editorial" style="--fam: #ccc">Editorial</button>
<button type="button" class="fam-tag pub-filter-btn" data-group="thesis" style="--fam: #c48be0">Academic works</button>
<button type="button" class="fam-tag pub-filter-btn" data-group="patent" style="--fam: #5fd3c8">Patent</button>
</div>
<div class="pub-filters-label">Topic</div>
<div class="fam-legend pub-filter pub-filter-tags" role="group" aria-label="Filter by topic">
<button type="button" class="fam-tag pub-tag-btn active" data-tag="all" style="--fam: #bbb">All topics</button>
{% for t in site.data.tags %}<button type="button" class="fam-tag pub-tag-btn" data-tag="{{ t[0] }}" style="--fam: #d8d8d8" title="{{ t[1].about }}">{{ t[1].name }}</button>
{% endfor %}</div>
</div>
</details>

{%- comment -%}
  Newest first: by year, then by month inside the year. The month comes from a "month: 11" in the front matter if there
  is one, else from "month = ..." in the BibTeX, else from a month name in pub-data ("September 2026"). Papers without
  a known month go last in their year. Same month: by file name, as before.
{%- endcomment -%}
{%- assign mon3 = "jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec" | split: "," -%}
{%- assign monfull = "january,february,march,april,may,june,july,august,september,october,november,december" | split: "," -%}
{%- assign sort_keys = "" -%}
{%- for p in papers -%}
  {%- assign m = 0 -%}
  {%- if p.month -%}{%- assign m = p.month | plus: 0 -%}{%- endif -%}
  {%- if m == 0 and p.bibtex -%}
    {%- assign bib = p.bibtex | downcase -%}
    {%- if bib contains "month" -%}
      {%- assign bm = bib | split: "month" | slice: 1, 1 | first | remove: " " | remove: "=" | remove: "{" | remove: '"' | slice: 0, 3 -%}
      {%- for n in mon3 -%}{%- if n == bm -%}{%- assign m = forloop.index -%}{%- endif -%}{%- endfor -%}
    {%- endif -%}
  {%- endif -%}
  {%- if m == 0 and p.pub-data -%}
    {%- assign pd = p.pub-data | downcase -%}
    {%- for n in monfull -%}{%- if pd contains n -%}{%- assign m = forloop.index -%}{%- endif -%}{%- endfor -%}
  {%- endif -%}
  {%- assign k = p.year | times: 100 | plus: m -%}
  {%- assign sort_keys = sort_keys | append: k | append: "~" | append: p.code | append: "|" -%}
{%- endfor -%}
{%- assign sort_keys = sort_keys | split: "|" | sort | reverse -%}
<div class="container my-0 pub-list">
{% assign prev_year = "" %}
{% for sk in sort_keys %}
{% assign sk_code = sk | split: "~" | last %}
{% assign pub = papers | where: "code", sk_code | first %}
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
  var box = document.querySelector('.pub-filters');
  var stateEl = document.querySelector('.pub-filters-state');
  var resetEl = document.querySelector('.pub-filters-reset');
  function reset(e) { e.preventDefault(); e.stopPropagation(); state.type = 'all'; state.tag = 'all'; apply(); }
  if (resetEl) {
    resetEl.addEventListener('click', reset);
    resetEl.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { reset(e); } });
  }
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
    // summary line of the closed box: the active filters and how many publications they leave
    var labels = [];
    document.querySelectorAll('.pub-filter-btn.active, .pub-tag-btn.active').forEach(function (b) {
      if (b.getAttribute('data-group') !== 'all' && b.getAttribute('data-tag') !== 'all') { labels.push(b); }
    });
    if (stateEl) {
      if (labels.length) {
        var all = document.querySelectorAll('.pub-list .pub-row[data-group]');
        var shown = document.querySelectorAll('.pub-list .pub-row[data-group]:not(.pub-hidden)').length;
        stateEl.innerHTML = '';
        labels.forEach(function (b) {
          var s = document.createElement('span');
          s.className = 'pub-filters-chip'; s.textContent = b.textContent; s.style.background = b.style.getPropertyValue('--fam');
          stateEl.appendChild(s);
        });
        stateEl.appendChild(document.createTextNode(shown + ' of ' + all.length));
      } else {
        stateEl.textContent = 'by type or topic';
      }
      resetEl.hidden = !labels.length;
    }
    var parts = [];
    if (state.type !== 'all') { parts.push('type=' + state.type); }
    if (state.tag !== 'all') { parts.push('tag=' + state.tag); }
    // leave other anchors alone (#supervised-theses, #y2020): only write or clear a filter hash
    if (history.replaceState && (parts.length || /(^|&)(type|tag)=/.test(location.hash.slice(1)))) { history.replaceState(null, '', location.pathname + (parts.length ? '#' + parts.join('&') : '')); }
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
  apply();
  // arriving with a filter in the URL (e.g. a topic tag of a publication page): show the box open
  if (box && (state.type !== 'all' || state.tag !== 'all')) { box.open = true; }
})();
</script>
