---
title: Publications
description: "List of Alberto Jaspe's publications"
menu_title: Publications
layout: default
---
<div class="container my-5 py-5 publicationrow">
{% for pub in site.publications reversed %}
{% assign puburl = "/publications/" | append: pub.code | append: ".html" %}
<div class="row my-2 rounded" id="contarinerrow">
    <div class="col-md-auto my-2">
		{% assign imgpath = "/publications/" | append: pub.code | append: "-thumb.jpg" %}
        <a href="{{ puburl | relative_url}}">
            <img id="paperthumb" src="{{ imgpath | relative_url}}" class="img-fluid img-thumbnail" alt="{{pub.title}} thumbnail" width="100%">
        </a>
    </div>
   <div class="col my-2">
        <p>[ {{ pub.year }}, {{ pub.type }} ] <span class="badge bg-danger">{{ pub.awards }}</span></p>
        <p class="lead">
            <span class="pub_title"><a href="{{ puburl | relative_url}}">{{ pub.title }}</a></span>. 
            <small>{{ pub.authors }}</small><br/>
			{% assign pubdatapost = "" %}
            {% if pub.journal %}
                {% assign pubdata = pub.journal %}
                {% if pub.conference %}
                   {% assign pubdatapost = "(presented in " | append: pub.conference | append: ")" %}
                {% endif %}
            {% elsif pub.conference %}
                {% assign pubdata = pub.conference %}
            {% elsif pub.book %}
                {% assign pubdata = pub.book %}
            {% endif %}
        </p>
        <p class="lead">{{ pubdata }} <small class="text-white-50 fst-italic">{{ pubdatapost }}</small></p>
<!--
        <p>
            {% assign pdfpath = "/publications/" | append: pub.code | append: ".pdf" %}
            <a href="{{ pdfpath | relative_url}}" class="btn btn-outline-warning btn-sm mx-1"><i class="fas fa-file-pdf"></i> PDF</a>
			{% if pub.doi %}
            <a href="https://doi.org/{{ pub.doi }}" class="btn btn-outline-warning btn-sm mx-1"><i class="fas fa-newspaper"></i> DOI</a>         
			{% endif %}
        </p>
-->        
    </div>
</div>
{% endfor %}
</div>