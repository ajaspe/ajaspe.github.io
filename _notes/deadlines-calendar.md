---
title: Calendar of Visual Computing conference deadlines
description: "Paper submission deadlines of the main computer graphics, visualization, vision and VR conferences: the next dates, the typical month of each deadline, and links to every conference."
layout: default
thumb_img: "assets/img/thumb_home_ajaspe.jpg"
updated: 2026-10-20
---

# {{page.title}}

<p class="small text-white-50">Living page, last updated {{ page.updated | date: "%B %-d, %Y" }}. This is not an exhaustive list of Visual Computing venues, just the main ones and the ones I follow. The dates come from each conference's call for papers when it is out, and are estimated from the previous edition otherwise: always confirm them on the conference website, and tell me if you find mistakes.</p>

{% assign today = site.time | date: "%s" | plus: 0 %}
{% assign sorted = site.data.deadlines | sort: "next_date" %}

## Next deadlines

<div class="table-responsive">
<table class="table table-dark table-hover deadline-table align-middle">
<thead><tr><th>Deadline</th><th>Conference</th><th class="d-none d-md-table-cell">Papers appear in</th><th class="text-end">Days left</th></tr></thead>
<tbody>
{% for c in sorted %}{% assign dd = c.next_date | date: "%s" | plus: 0 %}
<tr class="deadline-row{% if dd < today %} deadline-past{% endif %}" data-date="{{ c.next_date }}">
<td class="text-nowrap"><span class="deadline-date">{{ c.next_date | date: "%b %-d, %Y" }}</span>{% if c.status == "estimated" %}<br><span class="badge bg-secondary">estimated</span>{% endif %}</td>
<td><a href="{{ c.next_url }}"><strong>{{ c.next_edition }}</strong></a><br><span class="small text-white-50">{{ c.name }}{% if c.note and c.note != "" %}. {{ c.note }}{% endif %}</span></td>
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
})();
</script>

## The year at a glance

Typical slot of each paper deadline, by half-month. The main venues are highlighted; click a name to go to the conference.

{% assign months = "January,February,March,April,May,June,July,August,September,October,November,December" | split: "," %}
<div class="row g-2 mb-2">
{% for m in months %}{% assign mi = forloop.index %}
<div class="col-6 col-md-3"><div class="deadline-month">
<div class="deadline-month-name">{{ m }}</div>
{% for h in (1..2) %}{% assign items = site.data.deadlines | where: "month", mi | where: "half", h | sort_natural: "acronym" %}
<div class="deadline-slot">{% for c in items %}<a href="{{ c.url }}" class="deadline-chip{% if c.tier == 1 %} deadline-chip-main{% endif %}" title="{{ c.name }}">{{ c.acronym }}</a>{% endfor %}</div>
{% endfor %}
</div></div>
{% endfor %}
</div>
<p class="deadline-legend">Upper row: first half of the month. Lower row: second half.</p>

## The venues

{% assign families = "graphics:Computer graphics,visualization:Visualization,vision:Computer vision,vr:Virtual and augmented reality,web:Web 3D,heritage:Cultural heritage" | split: "," %}
{% for f in families %}{% assign parts = f | split: ":" %}{% assign items = site.data.deadlines | where: "family", parts[0] | sort_natural: "acronym" %}{% if items.size > 0 %}
### {{ parts[1] }}
{% for c in items %}* [**{{ c.acronym }}**]({{ c.url }}): {{ c.name }}. <span class="text-white-50">{{ c.published_in }}.</span>
{% endfor %}{% endif %}{% endfor %}

The data behind this page is a single file, [`_data/deadlines.yml`](https://github.com/ajaspe/ajaspe.github.io/blob/master/_data/deadlines.yml). Pull requests with corrections are welcome.
