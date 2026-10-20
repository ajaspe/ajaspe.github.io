---
title: Home
description: "Alberto Jaspe-Villanueva, research scientist in computer graphics and scientific visualization at KAUST (CEMSE Division): real-time exploration of massive models and complex data, cultural heritage digitization, and web-based 3D visualization."
menu_title: Home
order: 0
layout: default
thumb_img: "assets/img/thumb_home_ajaspe.jpg"
---

<div class="row align-items-center hero g-4">
	<div class="col-md-3 col-lg-2 text-center">
		<img src="{{ "/assets/img/ajaspe.jpg" | relative_url }}" class="hero-photo rounded-circle" alt="Alberto Jaspe-Villanueva">
	</div>
	<div class="col-md-9 col-lg-10">
		<h1 class="brand_title">Alberto Jaspe-Villanueva</h1>
		<p class="hero-tagline">Research Scientist in Computer Graphics and Visualization</p>
		<p class="hero-bio">
			Hola! I'm a <b>computer science researcher and engineer</b> at the
			<a href="https://vccvisualization.org">High-Performance Visualization Group</a> of the
			<a href="https://cemse.kaust.edu.sa">CEMSE Division</a> at <a href="https://kaust.edu.sa">KAUST</a> (Saudi Arabia).
			Before that I was a research scientist at <a href="https://www.crs4.it">CRS4</a> (Italy), where I developed my
			<a href="https://diglib.eg.org/handle/10.2312/2632715">PhD</a>, defended at the
			<a href="https://udc.es/en">University of A Coruña</a> (Spain).
		</p>
		<p class="hero-actions">
			<a href="/publications/" class="btn btn-outline-warning"><i class="fas fa-book me-1"></i> Publications</a>
			<a href="/research.html" class="btn btn-outline-warning"><i class="fas fa-flask me-1"></i> Research</a>
			<a href='&#109;&#97;il&#116;o&#58;&#37;6&#49;j%&#54;&#49;sp&#101;&#64;g&#37;&#54;D&#97;il&#46;com' class="btn btn-outline-light"><i class="fas fa-envelope me-1"></i> Email</a>
			<a href="https://cemse.kaust.edu.sa/profiles/alberto-jaspe-villanueva" class="btn btn-outline-light"><i class="fas fa-building me-1"></i> KAUST profile</a>
		</p>
	</div>
</div>


## Latest news

{% include news-list.html items=site.data.news limit=5 %}

<p class="text-end mt-2"><a href="/news/" class="btn btn-outline-warning btn-sm">All news <i class="fas fa-angle-right"></i></a></p>

{% assign vis = site.data.visitors %}<div class="visitor-stats gc-block{% if vis and vis.total > 0 %} gc-ready{% endif %}" id="visitors">
<h2>Visitors</h2>
<p class="small text-white-50 mt-0 mb-3">Visits counted by <a href="https://albertojaspe.goatcounter.com" class="text-white-50">GoatCounter</a>, without cookies. The <a href="https://albertojaspe.goatcounter.com" class="text-white-50">full statistics</a> are public{% if vis and vis.total > 0 %}; numbers refreshed daily, last on {{ vis.updated | date: "%b %-d, %Y" }}{% endif %}.</p>
<div class="row g-3 text-center">
	<div class="col-4"><div class="stat-tile"><div class="stat-num" data-gc-stat="week">{% if vis and vis.total > 0 %}{{ vis.week }}{% else %}&nbsp;{% endif %}</div><div class="stat-label">last 7 days</div></div></div>
	<div class="col-4"><div class="stat-tile"><div class="stat-num" data-gc-stat="month">{% if vis and vis.total > 0 %}{{ vis.month }}{% else %}&nbsp;{% endif %}</div><div class="stat-label">last 30 days</div></div></div>
	<div class="col-4"><div class="stat-tile"><div class="stat-num" data-gc-stat="total">{% if vis and vis.total > 0 %}{{ vis.total }}{% else %}&nbsp;{% endif %}</div><div class="stat-label">since 2022</div></div></div>
</div>
{% if vis.daily and vis.daily.size > 6 %}{% assign vmax = 1 %}{% for d in vis.daily %}{% if d.count > vmax %}{% assign vmax = d.count %}{% endif %}{% endfor %}{% assign n = vis.daily.size %}{% assign w = 600.0 | divided_by: n %}{% assign bw = w | times: 0.72 %}{% assign first = vis.daily | first %}{% assign last = vis.daily | last %}
<div class="stat-tile visits-chart mt-3">
<svg viewBox="0 0 600 100" preserveAspectRatio="none" class="visits-svg" role="img" aria-label="Daily visits over the last {{ n }} days">
{% for d in vis.daily %}{% assign h = d.count | times: 100.0 | divided_by: vmax %}{% assign x = forloop.index0 | times: w %}{% assign y = 100 | minus: h %}<rect x="{{ x }}" y="{{ y }}" width="{{ bw }}" height="{{ h }}" class="visits-bar"><title>{{ d.date | date: "%b %-d" }}: {{ d.count }} visits</title></rect>{% endfor %}
</svg>
<div class="d-flex justify-content-between visits-axis"><span>{{ first.date | date: "%b %-d" }}</span><span>visits per day, peak {{ vmax }}</span><span>{{ last.date | date: "%b %-d" }}</span></div>
</div>
{% endif %}
</div>
