---
title: "A.Jaspe :: Publications"
menu_title: Publications
layout: default
---
<div class="container py-4 m-0">
{% for pub in site.publications reversed %}
<div class="row my-3">
    <div class="col-md-auto">
		{% assign imgpath = "/publications/" | append: pub.code | append: "-thumb.jpg" %}
		{% assign puburl = "/publications/" | append: pub.code %}
        <a href="{{ puburl | relative_url}}">
            <img src="{{ imgpath | relative_url}}" class="img-fluid thumb" alt="{{pub.code}} thumbnail" width="100%">
        </a>
    </div>
   <div class="col">
        <p class="lead">
            <small>[ {{ pub.year }}, {{ pub.type }} ] <span class="badge bg-danger">{{ pub.awards }}</span></small><br/>
            <span class="pub_title">{{ pub.title }}</span>. 
            {{ pub.authors }}<br/>
            {% if pub.journal %}
                {% assign pubdata = pub.journal %}
                {% if pub.conference %}
                   {% assign pubdata = pubdata | append: " [presented in " | append: pub.conference | append: "]" %}
                {% endif %}
            {% elsif pub.conference %}
                {% assign pubdata = pub.conference %}
            {% elsif pub.book %}
                {% assign pubdata = pub.book %}
            {% endif %}
            <p class="font-weight-bold">{{ pubdata }}</p>
<!--
			{% assign pdfpath = "/publications/" | append: pub.code | append: ".pdf" %}
            <a href="{{ pdfpath | relative_url}}" class="btn btn-outline-warning btn-sm mx-1"><i class="fas fa-file-pdf"></i> PDF</a>
			{% if pub.doi %}
            <a href="https://doi.org/{{ pub.doi }}" class="btn btn-outline-warning btn-sm mx-1"><i class="fas fa-newspaper"></i> DOI</a>         
			{% endif %}
-->        
        </p>
    </div>
</div>
{% endfor %}
</div>