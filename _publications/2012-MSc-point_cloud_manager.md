---
layout: publication
code: 2012-MSc-point_cloud_manager
title: "Point Cloud Manager: a Multiresolution System for Managing Massive Point Cloud Datasets"
authors: Alberto Jaspe-Villanueva
year: 2012
type: Master's Thesis
role: author
degree: "Master's Thesis"
program: "Master on High Performance Computing (Máster en Computación de Altas Prestaciones)"
institution: "University of A Coruña, Spain"
supervisors: "Emilio J. Padrón and Javier Taibo, UDC"
defense: "September 3, 2012"
links:
 - { name: "UDC library record (2013 degree-project version)", url: "https://crunia.udc.gal/nde/fulldisplay?docid=alma991002602779707714&context=L&vid=34CISUG_UDC:CRUNIA_NDE&lang=gl" }
distinction: "AMD Best Master Thesis Award 2012; Best Graduate Thesis Award 2013 of the Professional Association of Computer Science Engineering of Galicia (CPEIG)"
awards: "AMD Best Master Thesis Award and Best Graduate Thesis Award"
abstract: "Con la reciente evolución de los equipos láser LIDAR y los escáneres 3D, las nubes de puntos (conjuntos de muestras espaciales, normalmente de superficies de objetos, con diversa información asociada) cada vez son más utilizadas en múltiples disciplinas, como la ingeniería civil, arquitectura, topografía o efectos especiales y animación 3D. Pero a medida que los requisitos de precisión aumentan, crece también el tamaño de las BBDD generadas, haciendo difícil su tratamiento. Además, con la generalización de uso de GPUs en equipos de escritorio comunes, y su evidente orientación hacia los cálculos tridimensionales, sería deseable poder aprovechar su enorme potencia de computación para procesar este tipo de datasets. Se presenta en esta memoria el sistema Point Cloud Manager, para la gestión, procesado y visualización de grandes datasets de nubes de puntos en equipos convencionales, cualesquiera sean sus capacidades. Para ello, se ha diseñado una estructura de datos espacial multirresolución y un sistema de caché software de dos niveles, capaz de procesar este tipo de datos, independientemente de su tamaño, así como una colección de herramientas para su gestión y visualización."
topics:
 - point-clouds
 - massive-models
projects:
 - pcm
bibtex: "@MastersThesis{Jaspe:2012:PCM,\n
    author = {Alberto Jaspe-Villanueva},\n
    title = {Point Cloud Manager: a Multiresolution System for Managing Massive Point Cloud Datasets},\n
    school = {University of A Coru{\\~n}a, Master on High Performance Computing},\n
    year = {2012},\n
}"
---

Written in Spanish as *Point Cloud Manager: sistema multirresolución para el tratamiento de grandes datasets de nubes de puntos 3D* and defended on 3 September 2012 (58 pages). The thesis designed and implemented the first version of the Point Cloud Manager (PCM) library: an out-of-core, multiresolution structure for laser-scanned point clouds of arbitrary size, later extended in two [book](/publications/2016-book_EBDMOI-pcm.html) [chapters](/publications/2016-book_VCEGDT-pbr_architecture_heritage.html) and the master's theses it supervised.
