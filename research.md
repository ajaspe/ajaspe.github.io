---
title: Research
description: "A.Jaspe: Research"
menu_title: Research
order: 1
layout: default
---

## Research Activities

* __Guest Editor__ :
	- [Frontiers on Virtual Reality](https://www.frontiersin.org/journals/virtual-reality), research topic: [Acquiring, exploring and spreading Cultural Heritage with immersive technologies](https://www.frontiersin.org/research-topics/25084/acquiring-exploring-and-spreading-cultural-heritage-with-immersive-technologies).
* __Conference Chairing__ :
	- [Web3D 2023](https://web3d.siggraph.org) Program chair.
	- [Smart Tools and Applications (STAG)](https://www.stag-conference.org): __2019__ Posters chair; __2021__ Best paper chair; __2022__ Thesis award chair.
	- [EuroVis 2015](https://dblp.org/db/conf/vissym/eurovis2015.html) Fast-forward session chair.
* __International Program Committees__ :
	- [International Conference on Computer Graphics Theory and Applications (GRAPP)](https://grapp.scitevents.org/)
	- [Smart Tools and Applications (STAG)](https://www.stag-conference.org)
	- [Eurographics Workshop on Graphics and Cultural Heritage (GCH)](https://gch2022.ewi.tudelft.nl)
	- [International Conference on Visualization and Computer Human Interaction (VisCHI)](https://www.hbku.edu.qa/en/vischi)
	- [ACM Siggraph Web3D](https://web3d.siggraph.org)
	- [Computer Graphics International (CGI)](https://www.cgs-network.org/cgi24/)
	- [Congreso Español de Informática Gráfica (CEIG)](https://www.eurographics.es/ceig23)
* __Invited Reviewer__ : 
	- Journals: [CGF](https://onlinelibrary.wiley.com/journal/14678659), [IEEE TVCG](https://www.computer.org/csdl/journal/tg), [ACM JOCCH](https://dl.acm.org/journal/jocch), [C&G](https://www.sciencedirect.com/journal/computers-and-graphics), [JGT](https://www.tandfonline.com/toc/ujgt21/current), [MDPI Heritage](https://www.mdpi.com/journal/heritage), [MDPI Sensors](https://www.mdpi.com/journal/sensors), [MPDI Electronics](https://www.mdpi.com/journal/electronics), [Graphical Models](https://www.sciencedirect.com/journal/graphical-models), etc.
	- Conferences: [IEEE Vis](https://ieeevis.org),[EuroVis](http://www.eurovis.org/), [EuroGraphics](http://www.euro.graphics/),  [ACM CHI](https://dl.acm.org/conference/chi), [Pacific Graphics](https://pg2023.org/), etc.
* __Academic roles__:
	- Assistant in the [Scientific Visualization course](https://vccvisualization.org/CS247_Scientific_Visualization) at [KAUST](https://cemse.kaust.edu.sa).
	- PhD and Master thesis advisor, and regular PhD committee member at [UDC](https://udc.es).
	- Lecturer in the __Virtual and Augmented Reality__ course (2017) at [European Institute of Design](https://www.ied.edu/).

## Publications

<div class="container my-0 publicationrow">
{% for pub in site.publications reversed %}
{% assign puburl = "/publications/" | append: pub.code | append: ".html" %}
<div class="row my-2 rounded" id="contarinerrow">
    <div class="col-md-auto my-2">
		{% assign imgpath = "/publications/" | append: pub.code | append: "-thumb.jpg" %}
        <a href="{{ puburl | relative_url}}">
            <img src="{{ imgpath | relative_url}}" id="paperthumb" class="img-fluid img-thumbnail imglight" alt="{{pub.title}} thumbnail" width="100%">
        </a>
    </div>
   <div class="col-md my-2">
        <p><b>[ {{ pub.year }}, {{ pub.type }} ]</b> <span class="badge bg-danger">{{ pub.awards }}</span></p>
        <p class="lead">
            <span class="pub_title"><a href="{{ puburl | relative_url}}">{{ pub.title }}</a></span>. 
            <small>{{ pub.authors }}</small><br/>
			{% assign pubdatapost = "" %}
            {% if pub.journal %}
                {% assign pubdata = pub.journal %}
                {% if pub.conference %}
                   {% assign pubdatapost = "(presented at " | append: pub.conference | append: ")" %}
                {% endif %}
            {% elsif pub.conference %}
                {% assign pubdata = pub.conference %}
            {% elsif pub.book %}
                {% assign pubdata = pub.book %}
            {% endif %}
        </p>
        <p><em>{{ pubdata }} <span class="text-white-50">{{ pubdatapost }}</span></em></p>
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
