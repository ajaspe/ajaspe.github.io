---
layout: publication
code: 2018-EG-dags_tutorial
title: "Voxel DAGs and Multiresolution Hierarchies: From Large-Scale Scenes to Pre-computed Shadows"
authors: Ulf Assarsson, Markus Billeter, Dan Dolonius, Elmar Eisemann, Alberto Jaspe-Villanueva, Leonardo Scandolo, and Erik Sintorn
year: 2018
type: Tutorial
conference: EuroGraphics 2018
abstract: "In this tutorial, we discuss voxel DAGs and multiresolution hierarchies, which are representations that can encode large volumes of data very efficiently. Despite a significant compression ratio, an advantage of these structures is that their content can be efficiently accessed in real-time. This property enables various applications. We begin the tutorial by introducing the concepts of sparsity and of coherency in voxel structures, and explain how a directed acyclic graph (DAG) can be used to represent voxel geometry in a form that exploits both aspects, while remaining usable in its compressed from for e.g. ray casting. In this context, we also discuss extensions that cover the time domain or consider an advanced encoding strategies exploiting symmetries and entropy. We then move on to voxel attributes, such as colors, and explain how to integrate such information with the voxel DAGs. We will provide implementation details and present methods for efficiently constructing the DAGs and also cover how to efficiently access the data structures with e.g. GPU-based ray tracers. The course will be rounded of with a segment on applications. We highlight a few examples and show their results. Pre-computed shadows are a special application, which will be covered in detail. In this context, we also explain how some of previous ideas contribute to multi-resolution hierarchies, which gives an outlook on the potential generality of the presented solutions."
projects: 
 - Massive models
doi: 10.2312/egt.20181028
links:
 - {name: Tutorial Website, url: https://www.crs4.it/vic/eg2018-tutorial-voxels}
bibtex: "@InProceedings{Assarsson:2018:VDM,\n
    author = {Ulf Assarsson and Markus Billeter and Dan Dolonius and Elmar Eisemann and Alberto Jaspe-Villanueva and Leonardo Scandolo and Erik Sintorn},\n
    editor = {Tobias Ritschel and Alexandru Telea},\n
    title = {Voxel DAGs and Multiresolution Hierarchies: From Large-Scale Scenes to Pre-computed Shadows},\n
    booktitle = {Proc. EUROGRAPHICS Tutorials},\n
    month = {April},\n
    year = {2018},\n
    url = {http://vic.crs4.it/vic/cgi-bin/bib-page.cgi?id='Assarsson:2018:VDM'},\n
}" 

---