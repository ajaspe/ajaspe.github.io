---
title: Research
description: "A.Jaspe: Research"
menu_title: Research
order: 1
layout: default
---

## Activities

* __Guest Editor__ :
	- [Frontiers on Virtual Reality](https://www.frontiersin.org/journals/virtual-reality), research topic: [Acquiring, exploring and spreading Cultural Heritage with immersive technologies](https://www.frontiersin.org/research-topics/25084/acquiring-exploring-and-spreading-cultural-heritage-with-immersive-technologies).
* __Conference Chairing__ :
	- [Web3D 2023](https://web3d.siggraph.org) Program chair.
	- [Smart Tools and Applications (STAG)](https://www.stag-conference.org): __2019__ Posters chair; __2021__ Best paper chair; __2022__ Thesis award chair.
	- __EuroVis 2014__ Fast-forward session chair.
* __International Program Committees__ :
	- [International Conference on Computer Graphics Theory and Applications (GRAPP)](https://grapp.scitevents.org/)
	- [Smart Tools and Applications (STAG)](https://www.stag-conference.org)
	- [Eurographics Workshop on Graphics and Cultural Heritage (GCH)](https://gch2022.ewi.tudelft.nl)
	- [International Conference on Visualization and Computer Human Interaction (VisCHI)](https://www.hbku.edu.qa/en/vischi)
	- [Congreso Español de Informática Gráfica (CEIG)](https://www.eurographics.es/ceig23)
* __Invited Reviewer__ : 
	- Journals: [CGF](https://onlinelibrary.wiley.com/journal/14678659), [IEEE TVCG](https://www.computer.org/csdl/journal/tg), [ACM JOCCH](https://dl.acm.org/journal/jocch), [C&G](https://www.sciencedirect.com/journal/computers-and-graphics), [JGT](https://www.tandfonline.com/toc/ujgt21/current), [MDPI Heritage](https://www.mdpi.com/journal/heritage), [MDPI Sensors](https://www.mdpi.com/journal/sensors), [MPDI Electronics](https://www.mdpi.com/journal/electronics), etc.
	- Conferences: [IEEE Vis](https://ieeevis.org), [ACM CHI](https://dl.acm.org/conference/chi), etc.
* __Academic roles__: PhD and Master thesis advisor, and invited PhD committee member at [UDC](https://udc.es). Assistant in [Scientific Visualization course](https://vccvisualization.org/CS247_Scientific_Visualization) in [KAUST](https://cemse.kaust.edu.sa). Lecturer in __Virtual and Augmented Reality__ (2017) in [European Institute of Design](https://www.ied.edu/).

## Publications

<div class="container my-0 publicationrow">
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