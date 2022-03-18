---

code: 2016-I3D-ssvdags
title: "SSVDAGs: Symmetry-aware Sparse Voxel DAGs"
authors: Alberto Jaspe-Villanueva, Fabio Marton, and Enrico Gobbetti
year: 2016
type: Conference full-paper
conference: ACM i3D
awards: Best papers selection
abstract: "Voxelized representations of complex 3D scenes are widely used nowadays to accelerate visibility queries in many GPU rendering techniques. Since GPU memory is limited, it is important that these data structures can be kept within a strict memory budget. Recently, directed acyclic graphs (DAGs) have been successfully introduced to compress sparse voxel octrees (SVOs), but they are limited to sharing identical regions of space. In this paper, we show that a more efficient lossless compression of geometry can be achieved, while keeping the same visibility-query performance, by merging subtrees that are identical through a similarity transform, and by exploiting the skewed distribution of references to shared nodes to store child pointers using a variabile bit-rate encoding. We also describe how, by selecting plane reflections along the main grid directions as symmetry transforms, we can construct highly compressed GPU-friendly structures using a fully out-of-core method. Our results demonstrate that state-of-the-art compression and real-time tracing performance can be achieved on high-resolution voxelized representations of real-world scenes of very different characteristics, including large CAD models, 3D scans, and typical gaming models, leading, for instance, to real-time GPU in-core visualization with shading and shadows of the full Boeing 777 at sub-millimetric precision."
projects: 
 - Massive models
lab_website: http://vic.crs4.it/vic/cgi-bin/bib-page.cgi?id=%27Jaspe:2016:SSS%27
youtube: https://www.youtube.com/watch?v=GmQswlkynP0
bibtex_id: 

---