---
title: Calendar of Visual Computing conference deadlines
description: "Paper submission deadlines of the main computer graphics, visualization, vision and VR conferences: the next dates, the typical month of each deadline, and links to every conference."
layout: default
thumb_img: "assets/img/thumb_home_ajaspe.jpg"
updated: 2026-10-20
---

# {{page.title}}

<p class="text-center note-updated"><i class="fas fa-calendar-check"></i> Last updated {{ page.updated | date: "%B %-d, %Y" }}</p>

<p class="small text-white-50">Not an exhaustive list of Visual Computing venues, just the main ones and the ones I follow. The dates come from each conference's call for papers when it is out, and are estimated from the previous edition otherwise: always confirm them on the conference website, and tell me if you find mistakes.</p>

{% assign today = site.time | date: "%s" | plus: 0 %}
{% assign sorted = site.data.deadlines | sort: "next_date" %}
{% assign families = site.data.deadline_families %}

<div class="fam-legend">
<button type="button" class="fam-tag fam-filter active" data-family="all" style="--fam: #bbb">All</button>
{% for f in families %}<button type="button" class="fam-tag fam-filter" data-family="{{ f.id }}" style="--fam: {{ f.color }}" title="{{ f.name }}">{{ f.short }} &middot; {{ f.name }}</button>{% endfor %}
</div>

{% assign months = "January,February,March,April,May,June,July,August,September,October,November,December" | split: "," %}
<div class="row g-2 mb-2">
{% for m in months %}{% assign mi = forloop.index %}
<div class="col-6 col-md-3"><div class="deadline-month">
<div class="deadline-month-name">{{ m }}</div>
{% for h in (1..2) %}{% assign items = site.data.deadlines | where: "month", mi | where: "half", h | sort_natural: "acronym" %}
<div class="deadline-slot">{% for c in items %}{% assign fam = families | where: "id", c.family | first %}<a href="{{ c.url }}" class="deadline-chip{% if c.tier == 1 %} deadline-chip-main{% endif %}" style="--fam: {{ fam.color }}" data-family="{{ c.family }}" title="{{ c.name }}">{{ c.acronym }}</a>{% endfor %}</div>
{% endfor %}
</div></div>
{% endfor %}
</div>
<p class="deadline-legend">Typical slot of each paper deadline: upper row, first half of the month; lower row, second half. Colours follow the field and the main venues are in bold; the tags above filter the grid and the table. Click a name to go to the conference.</p>

## Next deadlines

<div class="table-responsive">
<table class="table table-dark table-hover deadline-table align-middle">
<thead><tr><th>Deadline</th><th>Conference</th><th class="d-none d-md-table-cell">Papers appear in</th><th class="text-end">Days left</th></tr></thead>
<tbody>
{% for c in sorted %}{% assign dd = c.next_date | date: "%s" | plus: 0 %}{% assign fam = families | where: "id", c.family | first %}
<tr class="deadline-row{% if dd < today %} deadline-past{% endif %}" data-date="{{ c.next_date }}" data-family="{{ c.family }}">
<td class="text-nowrap"><span class="deadline-date">{{ c.next_date | date: "%b %-d, %Y" }}</span>{% if c.status == "estimated" %}<br><span class="badge bg-secondary">estimated</span>{% endif %}</td>
<td><a href="{{ c.next_url }}"><strong{% if c.tier == 1 %} class="deadline-main"{% endif %}>{{ c.next_edition }}</strong></a> <span class="fam-tag" style="--fam: {{ fam.color }}" title="{{ fam.name }}">{{ fam.short }}</span><br><span class="small text-white-50"><a href="{{ c.url }}" class="deadline-series" title="Conference series website">{{ c.name }}</a>{% if c.note and c.note != "" %}. {{ c.note }}{% endif %}</span></td>
<td class="small text-white-50 d-none d-md-table-cell">{{ c.published_in }}</td>
<td class="text-end deadline-left"></td>
</tr>
{% endfor %}
</tbody>
</table>
</div>

<script>
(function () {
  var now = new Date(); now.setHours(0, 0, 0, 0);
  document.querySelectorAll('.deadline-row').forEach(function (r) {
    var d = new Date(r.getAttribute('data-date') + 'T00:00:00');
    var days = Math.round((d - now) / 86400000);
    var cell = r.querySelector('.deadline-left');
    if (days < 0) { r.classList.add('deadline-past'); cell.textContent = 'passed'; }
    else if (days === 0) { cell.textContent = 'today'; }
    else { r.classList.remove('deadline-past'); cell.textContent = days + ' days'; }
  });
  var buttons = document.querySelectorAll('.fam-filter');
  function apply(f) {
    document.querySelectorAll('.deadline-row[data-family], .deadline-chip[data-family]').forEach(function (el) {
      el.classList.toggle('deadline-hidden', f !== 'all' && el.getAttribute('data-family') !== f);
    });
    buttons.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-family') === f); });
  }
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-family');
      apply(b.classList.contains('active') && f !== 'all' ? 'all' : f);
    });
  });
})();
</script>

The data behind this page is a single file, [`_data/deadlines.yml`](https://github.com/ajaspe/ajaspe.github.io/blob/master/_data/deadlines.yml). Pull requests with corrections are welcome.
