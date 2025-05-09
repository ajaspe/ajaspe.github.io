---
title: Home
description: "Alberto Jaspe personal website"
menu_title: Home
order: 0
layout: default
thumb_img: "assets/img/thumb_home_ajaspe.jpg"
---

<div class="row">
	<p><span class="brand_title">Alberto Jaspe-Villanueva</span><br>
		<span class="lead"><b class="text-bold">Computer Graphics and Visualization</b></span>
	</p>
</div>
<div class="row">
	<div class="col-md-2 text-center">
        <img src="{{ "/assets/img/ajaspe-rect.jpg" | relative_url }}" class="d-md-none img-fluid w-100 centered" alt="Alberto Jaspe">
        <img src="{{ "/assets/img/ajaspe.jpg" | relative_url }}" class="d-none d-md-block w-100 img-fluid rounded-circle" alt="Alberto Jaspe">
	</div>
	<div class="col-md-10">
		<p class="lead">
			Hola! I'm a <b>computer science researcher and engineer</b>, currently working on the
			<a href="https://vccvisualization.org">High-Performance Visualization Group</a> at the
			<a href="https://vcc.kaust.edu.sa">Visual Computer Center</a> at
			<a href="https://kaust.edu.sa">KAUST</a> (Saudi Arabia).
			Previously I worked in the <a href="https://vic.crs4.it">Visual Computing Group</a> at <a
				href="https://www.crs4.it">CRS4</a> (Italy), where I developed my <a
				href="https://diglib.eg.org/handle/10.2312/2632715">PhD</a>, discussed at the <a
				href="https://udc.es/en">University of A Coruña</a> (Spain).
		</p>
	</div>
</div>
<div class="row">
	<p class="lead">
		My main interest lies in the <b>real-time exploration of massive models and complex data, from
			acquisition to rendering and interaction</b>.
		For this I deal with multiresolution structures, algorithms, GPUs, raytracing, C++,
		OpenGL, GLSL, sometimes WebGL and JavaScript, etc. And often it's fun :)
	</p>
</div>
<div>
	<p class="text-center">
		<a href='&#109;&#97;il&#116;o&#58;&#37;6&#49;j%&#54;&#49;sp&#101;&#64;g&#37;&#54;D&#97;il&#46;com' class="btn btn-secondary m-0">
			<i class="fas fa-envelope"></i> aj&#97;sp&#101;&#64;g&#109;ail&#46;&#99;om</a>
		<!-- <a href='/assets/cv-ajaspe-dec21.pdf' class="btn btn-secondary m-0">
			<i class="fa fa-file"></i> CV</a> -->
		<a href="https://scholar.google.es/citations?user=qv99TYgAAAAJ" class="btn btn-secondary m-0">
			<i class="fas fa-graduation-cap"></i> Ggle. Scholar</a>
		<a href="https://www.linkedin.com/in/albertojaspe" class="btn btn-secondary m-0">
			<i class="fab fa-linkedin"></i> LinkedIn</a>
		<a href="https://twitter.com/albertojaspe" class="btn btn-secondary m-0">
			<i class="fab fa-twitter"></i> Twitter</a>
		<a href="https://bsky.app/profile/ajaspe.bsky.social" class="btn btn-secondary m-0">
			<i class="fab fa-bluesky"></i> BlueSky</a>
		<a href="https://github.com/ajaspe" class="btn btn-secondary m-0">
			<i class="fab fa-github color:red"></i> GitHub</a>
		<a href="https://orcid.org/0000-0003-3899-308X" class="btn btn-secondary m-0">
			<i class="fab fa-orcid"></i> Orcid </a>
		<a href="https://vccvisualization.org/people/jaspe" class="btn btn-secondary m-0">
			<i class="fas fa-building"></i> VCC profile</a>
		</p>
</div>

## News

<div class="row px-3">
	<table class="table table-dark table-borderless table-striped">
		<tbody class="table-borderless">
				{% for news in site.data.news %}
				<tr>
					<td class="text-warning col-1 text-end">[<em>{{ news.date }}</em>]</td>
					<td><div style="margin-bottom: -1em">{{ news.text | markdownify }}</div></td>
				</tr>
				{% endfor %}
		</tbody>
	</table>
</div>					
