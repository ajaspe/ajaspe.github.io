---
layout: publication
code: 2013-PFC-neira_point_clouds_webgl
title: "Sistema cliente-servidor para la visualización de nubes de puntos con WebGL"
authors: Javier Rey Neira
year: 2013
type: Final Degree Project
role: supervisor
degree: "Final Degree Project (Proyecto Fin de Carrera)"
program: "Ingeniería Informática, five-year engineering degree"
institution: "University of A Coruña, Spain"
supervisors: "Emilio J. Padrón and Alberto Jaspe-Villanueva, UDC"
defense: "September 16, 2013"
abstract: "Con la reciente evolución de los equipos láser LIDAR y los escáneres 3D, las nubes de puntos (conjuntos de muestras espaciales, normalmente de superficies de objetos, con diversa información asociada) cada vez son más utilizadas en múltiples disciplinas, como la ingeniería civil, arquitectura, topografía o efectos especiales y animación 3D. Pero a medida que los requisitos de precisión aumentan, crece también el tamaño de las BBDD generadas, haciendo difícil su tratamiento. Además, con la generalización de uso de GPUs en equipos de escritorio comunes, y su evidente orientación hacia los cálculos tridimensionales, sería deseable poder aprovechar su enorme potencia de computación para procesar este tipo de datasets. En este contexto se sitúa el desarrollo del software para manejo y render de puntos PCM, en el marco del cual se enmarca este proyecto fin de carrera. PCM es una biblioteca para la gestión y procesado de grandes datasets de nubes de puntos en equipos convencionales, independientemente de las capacidades hardware del equipo y del tamaño de la nube de puntos. Consiste en una estructura de datos espacial multirresolución y de un sistema de caché software de dos niveles. En este proyecto se usa una arquitectura cliente-servidor para, usando esta librería PCM, ampliar sus posibilidad de forma que el usuario no necesite ningún tipo de información y puedo acceder a los datasets desde un simple navegador web mediante HTML y WebGL."
topics:
 - point-clouds
 - web3d
projects:
 - pcm
bibtex: "@MastersThesis{Rey:2013:SCS,\n
    author = {Javier Rey Neira},\n
    title = {Sistema cliente-servidor para la visualizaci{\\'o}n de nubes de puntos con {WebGL}},\n
    school = {University of A Coru{\\~n}a},\n
    year = {2013},\n
    type = {Proyecto Fin de Carrera, Ingenier{\\'i}a Inform{\\'a}tica},\n    note = {Supervisors: Emilio J. Padr{\\'o}n and Alberto Jaspe-Villanueva},\n
}"
---

A client-server architecture that streams multiresolution point clouds managed by the Point Cloud Manager library to a WebGL viewer in the browser, an early web-based 3D exploration system.
