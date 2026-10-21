---
layout: publication
code: 2018-PhD-scalable_exploration_massive_models
title: "Scalable Exploration of 3D Massive Models"
authors: Alberto Jaspe-Villanueva
year: 2018
type: PhD Thesis
role: author
degree: "Doctor of Philosophy (PhD)"
program: "PhD Programme in Information and Communications Technology"
institution: "University of A Coruña, Spain (research carried out at CRS4, Italy)"
supervisors: "Enrico Gobbetti, CRS4 and Julián Dorado, UDC"
committee: "Reviewers: Oliver Staadt (University of Rostock) and Rafael Ballester-Ripoll (University of Zürich)"
defense: "2018"
distinction: "Cum laude by unanimous decision of an international committee; selected for the Thesis Fast Forward session at SIGGRAPH 2019 (Los Angeles)"
abstract: "This thesis introduces scalable techniques that advance the state-of-the-art in massive model creation and exploration. Concerning model creation, we present methods for improving reality-based scene acquisition and processing, introducing an efficient implementation of scalable out-of-core point clouds and a data-fusion approach for creating detailed colored models from cluttered scene acquisitions. The core of this thesis concerns enabling technology for the exploration of general large datasets. Two novel solutions are introduced. The first is an adaptive out-of-core technique exploiting the GPU rasterization pipeline and hardware occlusion queries in order to create coherent batches of work for localized shader-based ray tracing kernels, opening the door to out-of-core ray tracing with shadowing and global illumination. The second is an aggressive compression method that exploits redundancy in large models to compress data so that it fits, in fully renderable format, in GPU memory. The method is targeted to voxelized representations of 3D scenes, which are widely used to accelerate visibility queries on the GPU. Compression is achieved by merging subtrees that are identical through a similarity transform and by exploiting the skewed distribution of references to shared nodes to store child pointers using a variable bit-rate encoding. The capability and performance of all methods are evaluated on many very massive real-world scenes from several domains, including cultural heritage, engineering, and gaming."
topics:
 - massive-models
 - voxels
 - rendering
 - point-clouds
projects:
 - diva
no_pdf: true
links:
 - { name: "PDF and record at the UDC repository", url: "http://hdl.handle.net/2183/21430" }
 - { name: "SIGGRAPH 2019 Thesis Fast Forward", url: "https://s2019.siggraph.org/" }
bibtex: "@PhdThesis{Jaspe:2018:SEM,\n
    author = {Alberto Jaspe-Villanueva},\n
    title = {Scalable Exploration of {3D} Massive Models},\n
    school = {University of A Coru{\\~n}a},\n
    year = {2018},\n
    url = {http://hdl.handle.net/2183/21430},\n
}"
---

The thesis gathers the work of my Marie Curie fellowship at CRS4 within the [DIVA](https://www.diva-itn.eu) network: scalable point-cloud management, out-of-core ray tracing ([CHC+RT](/publications/2015-EG-chc+rt.html)) and the compressed voxel structures of [SSVDAGs](/publications/2016-I3D-ssvdags.html), evaluated on scenes such as the full Boeing 777 at sub-millimetric precision.
