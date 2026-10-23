---
layout: publication
code: 2014-BSc-mures_realtime_point_clouds
title: "Realtime Management Tool for Massive 3D Point Clouds"
authors: Luis Omar Álvarez Mures
year: 2014
type: Bachelor's Thesis
tags:
 - point-clouds
 - massive-models
role: supervisor
degree: "Final Year Project (Trabajo Fin de Grado)"
program: "Degree in Computer Engineering, mention in Software Engineering"
institution: "University of A Coruña, Spain"
supervisors: "Emilio J. Padrón and Alberto Jaspe-Villanueva, UDC"
defense: "September 2014"
links:
 - { name: "UDC library record", url: "https://crunia.udc.gal/nde/fulldisplay?docid=alma991002761479707714&context=L&vid=34CISUG_UDC:CRUNIA_NDE&lang=gl" }
abstract: "The objective of this project is designing and implementing a multi-platform point-based rendering visualizer that allows the management and interactive manipulation of big 3D point clouds. These clouds can be obtained using a LIDAR scanner or cheaper alternatives like KINECT. These systems can nowadays generate data-sets with huge amounts of point data, position, color, normals, reflectivity, etc. As a consequence, these point clouds will not fit on system RAM and will have to reside in an HDD. Due to this fact, real-time rendering of massive point clouds is a complex task. The resulting software tool developed in this project, will oﬀer the end user the functionality necessary for working with these types of datasets. Including a complete 3D visualizer, with advanced OpenGL point-rendering capabilities, multiple point cloud support, multiple cameras, multi-resolution capabilities, point cloud transformation and preprocessing, distance measurements, object segmentation, CAD exportation of segmented objects, etc. To implement all of these features, we will utilize PCM. PCM is a project in development from the University of A Coruña, that provides a series of low level tools for working with point clouds on commodity hardware. This project will not only extend PCM with the aforementioned functionality and a high level software tool for the end user, but will improve the existing code and some performance aspects of PCM."
topics:
 - point-clouds
 - massive-models
projects:
 - pcm
bibtex: "@MastersThesis{Mures:2014:RMT,\n
    author = {Luis Omar {\\'A}lvarez Mures},\n
    title = {Realtime Management Tool for Massive {3D} Point Clouds},\n
    school = {University of A Coru{\\~n}a},\n
    year = {2014},\n
    note = {Supervisors: Alberto Jaspe-Villanueva and Emilio J. Padr{\\'o}n},\n
}"
---

Omar's final year project turned the Point Cloud Manager library into an interactive tool for editing and managing massive point clouds in real time, the basis of the [2016 book chapters](/publications/2016-book_EBDMOI-pcm.html) on PCM.
