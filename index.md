---
title: Home
description: "Alberto Jaspe-Villanueva, research scientist in computer graphics and scientific visualization at KAUST: real-time exploration of massive models and complex data, cultural heritage digitization, and web-based 3D visualization."
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
			<a href="https://vcc.kaust.edu.sa">Visual Computing Center</a>, <a href="https://kaust.edu.sa">KAUST</a> (Saudi Arabia).
			Before that I was a research scientist at <a href="https://www.crs4.it">CRS4</a> (Italy), where I developed my
			<a href="https://diglib.eg.org/handle/10.2312/2632715">PhD</a>, defended at the
			<a href="https://udc.es/en">University of A Coruña</a> (Spain).
		</p>
		<p class="hero-actions">
			<a href="/publications/" class="btn btn-outline-warning"><i class="fas fa-book me-1"></i> Publications</a>
			<a href="/research.html" class="btn btn-outline-warning"><i class="fas fa-flask me-1"></i> Research</a>
			<a href='&#109;&#97;il&#116;o&#58;&#37;6&#49;j%&#54;&#49;sp&#101;&#64;g&#37;&#54;D&#97;il&#46;com' class="btn btn-outline-light"><i class="fas fa-envelope me-1"></i> Email</a>
			<a href="https://vccvisualization.org/people/jaspe" class="btn btn-outline-light"><i class="fas fa-building me-1"></i> VCC profile</a>
		</p>
	</div>
</div>

## Highlights

{% assign featured = site.publications | where: "featured", true | reverse %}
{% if featured.size > 0 %}{% assign hl_items = featured %}{% else %}{% assign hl_items = site.publications | reverse %}{% endif %}
<div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 highlights">
{% for pub in hl_items limit: 4 %}
{% assign puburl = "/publications/" | append: pub.code | append: ".html" %}
{% assign hl_img = "/publications/" | append: pub.code | append: "-thumb.jpg" %}
{% if pub.journal %}{% assign hl_venue = pub.journal %}{% elsif pub.conference %}{% assign hl_venue = pub.conference | split: " - " | first %}{% if hl_venue contains "," %}{% assign hl_venue = hl_venue | split: "," | last | strip %}{% endif %}{% elsif pub.book %}{% assign hl_venue = pub.book %}{% else %}{% assign hl_venue = "" %}{% endif %}
<div class="col">
	<a href="{{ puburl | relative_url }}" class="hl-card card h-100">
		<div class="hl-img"><img src="{{ hl_img | relative_url }}" alt="{{ pub.title | escape }} thumbnail" loading="lazy"></div>
		<div class="card-body">
			<div class="hl-title">{{ pub.title }}</div>
			<div class="hl-meta small"><span class="text-warning">{{ pub.year }}</span> &middot; {{ hl_venue | truncate: 40 }}</div>
			{% if pub.awards %}<span class="badge bg-danger mt-2">{{ pub.awards }}</span>{% endif %}
		</div>
	</a>
</div>
{% endfor %}
</div>

## Latest news

{% include news-list.html items=site.data.news limit=5 %}

<p class="text-end mt-2"><a href="/news/" class="btn btn-outline-warning btn-sm">All news <i class="fas fa-angle-right"></i></a></p>
