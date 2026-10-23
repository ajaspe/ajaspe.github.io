---
title: Home
description: "Alberto Jaspe-Villanueva, research scientist in computer graphics and scientific visualization at KAUST (CEMSE Division): real-time exploration of massive models and complex data, cultural heritage digitization, and web-based 3D visualization."
menu_title: Home
order: 0
layout: default
thumb_img: "assets/img/thumb_site.jpg"
---

<div class="row align-items-center hero g-4">
	<div class="col-sm-4 col-md-3 col-lg-2 text-center">
		{% comment %} Phones: the wide photo across the screen, as before the 2026 home redesign. From 576 px up: the round one beside the text. {% endcomment %}
		<span class="hero-photo-wrap hero-photo-wrap-rect d-sm-none"><img src="{{ "/assets/img/ajaspe-rect.jpg" | relative_url }}" class="img-fluid w-100 rounded" alt="Alberto Jaspe-Villanueva">{% include deal-with-it.html %}</span>
		<span class="hero-photo-wrap hero-photo-wrap-round d-none d-sm-block mx-auto"><img src="{{ "/assets/img/ajaspe.jpg" | relative_url }}" class="hero-photo rounded-circle" alt="Alberto Jaspe-Villanueva">{% include deal-with-it.html %}</span>
	</div>
	<div class="col-sm-8 col-md-9 col-lg-10">
		<h1 class="brand_title">Alberto Jaspe-Villanueva</h1>
		<p class="hero-tagline">Research Scientist in Visual Computing</p>
		<p class="hero-bio">
			Hola! I'm a computer science researcher and engineer, specialized in <b>computer graphics</b>, scientific visualization, and other ways of lighting up pixels so that 3D digital worlds run fast and make sense.
		</p>
		<p class="hero-bio">
			Currently I work at the <a href="https://vccvisualization.org">High-Performance Visualization Group</a> of the
			<a href="https://cemse.kaust.edu.sa">CEMSE Division</a> at <a href="https://kaust.edu.sa">KAUST</a> (Saudi Arabia).
			Before that I was a scientist at <a href="https://www.crs4.it">CRS4</a> (Italy) and at the
			<a href="https://udc.es/en">University of A Coruña</a> (Spain).
		</p>
		<p class="hero-bio">
			Welcome to my website! Feel free to <a href='&#109;&#97;il&#116;o&#58;&#37;6&#49;j%&#54;&#49;sp&#101;&#64;g&#37;&#54;D&#97;il&#46;com'>contact me</a> if anything here interests you :)
		</p>
		<p class="hero-actions">
			<a href="/publications/" class="btn btn-outline-warning"><i class="fas fa-book me-1"></i> Publications</a>
			<a href="/research.html" class="btn btn-outline-warning"><i class="fas fa-flask me-1"></i> Research</a>
			<a href='&#109;&#97;il&#116;o&#58;&#37;6&#49;j%&#54;&#49;sp&#101;&#64;g&#37;&#54;D&#97;il&#46;com' class="btn btn-outline-light"><i class="fas fa-envelope me-1"></i> Email</a>
			<a href="https://cemse.kaust.edu.sa/profiles/alberto-jaspe-villanueva" class="btn btn-outline-light" title="My profile at KAUST"><img src="{{ "/assets/img/kaust.svg" | relative_url }}" class="btn-logo me-1" alt=""> @KAUST</a>
		</p>
	</div>
</div>


## Latest news

{% include news-list.html items=site.data.news limit=5 %}

<p class="text-end mt-2"><a href="/news/" class="btn btn-outline-warning btn-sm">All news <i class="fas fa-angle-right"></i></a></p>

{% assign cal = site.notes | where: "url", "/visual-computing-calendar/" | first %}{% assign guide = site.notes | where: "url", "/visual-computing-survival-guide/" | first %}{% assign post = site.posts | first %}
{% if cal and guide %}
## From the desk

<div class="row row-cols-1 row-cols-sm-3 g-3 note-cards desk-row">
<div class="col"><a class="card h-100 note-card" href="{{ cal.url }}"><div class="card-body"><div class="note-card-icon"><i class="fas {{ cal.icon | default: 'fa-file-alt' }}"></i></div><div><div class="note-card-title">{{ cal.title }}</div><div class="note-card-summary">Next deadlines of the main graphics, visualization, vision and VR venues, by field.</div></div></div></a></div>
<div class="col"><a class="card h-100 note-card" href="{{ guide.url }}"><div class="card-body"><div class="note-card-icon"><i class="fas {{ guide.icon | default: 'fa-file-alt' }}"></i></div><div><div class="note-card-title">{{ guide.title }}</div><div class="note-card-summary">Venues, literature, writing, reviewing, talks, impact metrics and well-being for new PhD students.</div></div></div></a></div>
{% if post %}<div class="col"><a class="card h-100 note-card" href="{{ post.url }}"><div class="card-body"><div class="note-card-icon"><i class="fas fa-pen-nib"></i></div><div><div class="note-card-meta">Latest post, {{ post.date | date: "%b %-d, %Y" }}</div><div class="note-card-title">{{ post.title }}</div>{% if post.summary %}<div class="note-card-summary">{{ post.summary | truncate: 110 }}</div>{% endif %}</div></div></a></div>{% else %}<div class="col"><a class="card h-100 note-card" href="/desk/"><div class="card-body"><div class="note-card-icon"><i class="fas fa-book-open"></i></div><div><div class="note-card-title">More on my desk</div><div class="note-card-summary">Resources, live demos and experiments, and the occasional opinion piece.</div></div></div></a></div>{% endif %}
</div>
<p class="text-end mt-2"><a href="/desk/" class="btn btn-outline-warning btn-sm">The desk <i class="fas fa-angle-right"></i></a></p>
{% endif %}
