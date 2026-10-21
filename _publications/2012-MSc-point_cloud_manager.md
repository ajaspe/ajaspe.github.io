---
layout: publication
code: 2012-MSc-point_cloud_manager
title: "Point Cloud Manager: a Multiresolution System for Managing Massive Point Cloud Datasets"
authors: Alberto Jaspe-Villanueva
year: 2012
type: Master's Thesis
role: author
degree: "Master's Thesis"
program: "Master on High Performance Computing"
institution: "University of A Coruña, Spain"
supervisors: "Emilio J. Padrón and Javier Taibo, UDC"
defense: "2012"
links:
 - { name: "UDC library record (Spanish version)", url: "https://crunia.udc.gal/nde/fulldisplay?docid=alma991002602779707714&context=L&vid=34CISUG_UDC:CRUNIA_NDE&lang=gl" }
distinction: "AMD Best Master Thesis Award 2012; Best Graduate Thesis Award 2013 of the Professional Association of Computer Science Engineering of Galicia (CPEIG)"
awards: "AMD Best Master Thesis Award and Best Graduate Thesis Award"
abstract: "La tecnología LIDAR (Laser Imaging Detection and Ranging) consiste en el escaneado con láseres de alta precisión para obtener un modelo digital 3D georreferenciado del mundo real. Su uso se está estandarizando rápidamente en múltiples disciplinas de la ingeniería, ya bien sea en su versión aérea (escaneando la superficie terrestre desde un avión), terrestre (estacionado) o móvil (ubicado en un vehículo). Estos dispositivos generan un inmenso conjunto de samples con coordenadas e información asociada (como el color o el índice de reflectividad) que denominamos nubes de puntos o point clouds. La magnitud habitual de estos datasets es del orden de cientos o miles de millones de puntos, que se traducen en varios cientos de gigabytes de datos. Conseguir una visualización 3D de estas nubes de puntos en PCs de escritorio requiere el uso de técnicas especiales denominadas multirresolución, basadas en estructuras de datos espaciales y jerarquías caché por software, así como complejos algoritmos de render programados a bajo nivel sobre las unidades de procesamiento gráfico o GPUs. El objetivo será visualizar de forma interactiva cualquier dataset LiDAR, independientemente de su tamaño y de las capacidades del ordenador. Este proyecto pretende abordar este problema, realizando un estudio del estado de la cuestión y una implementación eficiente."
topics:
 - point-clouds
 - massive-models
projects:
 - pcm
no_pdf: true
no_teaser: true
bibtex: "@MastersThesis{Jaspe:2012:PCM,\n
    author = {Alberto Jaspe-Villanueva},\n
    title = {Point Cloud Manager: a Multiresolution System for Managing Massive Point Cloud Datasets},\n
    school = {University of A Coru{\\~n}a, Master on High Performance Computing},\n
    year = {2012},\n
}"
---

Presented in Spanish as *Sistema multirresolución de visualización 3D en tiempo real para grandes bases de datos LIDAR*. The thesis designed and implemented the first version of the Point Cloud Manager (PCM) library: an out-of-core, multiresolution structure for laser-scanned point clouds of arbitrary size, later extended in two [book](/publications/2016-book_EBDMOI-pcm.html) [chapters](/publications/2016-book_VCEGDT-pbr_architecture_heritage.html) and the master's theses it supervised.
