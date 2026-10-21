---
layout: publication
code: 2012-PFC-mures_global_illumination_points
title: "Global Illumination for Point-Based Rendering"
authors: Luis Omar Álvarez Mures
year: 2012
type: Final Degree Project
role: supervisor
degree: "Final Degree Project (Proyecto Fin de Carrera)"
program: "Technical Engineering in Computer Systems"
institution: "University of A Coruña, Spain"
supervisors: "Alberto Jaspe-Villanueva and Emilio J. Padrón, UDC"
defense: "July 9, 2012"
links:
 - { name: "UDC library record", url: "https://crunia.udc.gal/nde/fulldisplay?docid=alma991001852869707714&context=L&vid=34CISUG_UDC:CRUNIA_NDE&lang=gl" }
abstract: "The objective of this project is designing and implementing a point-based rendering engine that utilizes ray tracing for global illumination computation. Point-based rendering has several advantages compared to the more classic polygon-based rendering that uses polygon meshes, specially when polygons can be smaller than a pixel. In this project we explore how to represent point models without ray tracing techniques (with a projective camera) and using ray tracing that is the true focus of this project. It is also important to mention that because of the nature of point clouds, datasets tend to be really large. That is why a k-d tree is used to accelerate the ray tracing process. A k-d tree is a space partitioning structure for data organization (in our case, point data). This acceleration structure reduces greatly rendering times, and without it the rendering process would take too long and be too computationally expensive. Point-based rendering also has some disadvantages, like for example the zero-dimensional nature of points. This means that a point has no surface, volume or normal vector. This results in problems in the rendering process. In this project we explore several solutions for these problems. To facilitate the usage of the project to the end user, and to also make testing easier, a plugin compatible with Blender will be programmed. It allows the rendering of scenes created in Blender with our project and facilitates the use of the engine thanks to the integration with the interface of Blender."
topics:
 - point-clouds
 - rendering
projects:
 - pcm
bibtex: "@MastersThesis{Mures:2012:GIP,\n
    author = {Luis Omar {\\'A}lvarez Mures},\n
    title = {Global Illumination for Point-Based Rendering},\n
    school = {University of A Coru{\\~n}a},\n
    type = {Bachelor's final project},\n
    year = {2012},\n
    note = {Supervisors: Alberto Jaspe-Villanueva and Emilio J. Padr{\\'o}n},\n
}"
---

Omar's final degree project (Technical Engineering) explored global illumination for point-based rendering of scanned models, the starting point of his later work on the Point Cloud Manager library.
