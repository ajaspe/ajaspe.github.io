---
layout: publication
code: 2017-JCGT-ssvdags
title: "Symmetry-aware Sparse Voxel DAGs (SSVDAGs) for compression-domain tracing of high-resolution geometric scenes"
authors: Alberto Jaspe-Villanueva, Fabio Marton, and Enrico Gobbetti
year: 2017
type: Journal Paper
journal: "Journal of Computer Graphics Techniques"
pub-data: "6(2): 1-30, 2017"
abstract: "Voxelized representations of complex 3D scenes are widely used nowadays to accelerate visibility queries in many GPU rendering techniques. Since GPU memory is limited, it is important that these data structures can be kept within a strict memory budget. Recently, directed acyclic graphs (DAGs) have been successfully introduced to compress sparse voxel octrees (SVOs), but they are limited to sharing identical regions of space. In this paper, we show that a more efficient lossless compression of geometry can be achieved, while keeping the same visibility-query performance, by merging subtrees that are identical through a similarity transform, and by exploiting the skewed distribution of references to shared nodes to store child pointers using a variabile bit-rate encoding. We also describe how, by selecting plane reflections along the main grid directions as symmetry transforms, we can construct highly compressed GPU-friendly structures using a fully out-of-core method. Our results demonstrate that state-of-the-art compression and real-time tracing performance can be achieved on high-resolution voxelized representations of real-world scenes of very different characteristics, including large CAD models, 3D scans, and typical gaming models, leading, for instance, to real-time GPU in-core visualization with shading and shadows of the full Boeing 777 at sub-millimetric precision. This article is based on an earlier work: 	extit{SSVDAGs: Symmetry-aware Sparse Voxel DAGs, in Proceedings of the 20th ACM SIGGRAPH Symposium on Interactive 3D Graphics and Games (c) ACM, 2016. 10.1145/2856400.2856420.} We include here a more thorough exposition, a description of alternative construction and tracing methods, as well as additional results. In order to facilitate understanding, evaluation and extensions, the full source code of the method is provided as accompanying material."
projects: 
 - Massive models
links:
 - {name: CRS4 Website, url: http://vic.crs4.it/vic/cgi-bin/bib-page.cgi?id=%27Jaspe:2017:SSV%27}
 - {name: JCGT Website, url: https://jcgt.org/published/0006/02/01/}
youtube: foYPjPKFKWw
bibtex: "@Article{Jaspe:2017:SSV,\n
    author = {Alberto Jaspe-Villanueva and Fabio Marton and Enrico Gobbetti},\n
    title = {{Symmetry-aware Sparse Voxel DAGs} ({SSVDAGs}) for compression-domain tracing of high-resolution geometric scenes},\n
    journal = {Journal of Computer Graphics Techniques},\n
    volume = {6},\n
    number = {2},\n
    pages = {1--30},\n
    year = {2017},\n
    issn = {2331-7418},\n
    url = {http://vic.crs4.it/vic/cgi-bin/bib-page.cgi?id='Jaspe:2017:SSV'},\n
}" 

---