---
layout: publication

code: 2014-VMV-soar
title: "SOAR: Stochastic Optimization for Affine global point set Registration"
authors: Marco Agus, Enrico Gobbetti, Alberto Jaspe-Villanueva, Claudio Mura, and Renato Pajarola
year: 2014
type: Conference Paper
conference: Workshop on Vision, Modeling and Visualization, VMV'14
abstract: "We introduce a stochastic algorithm for pairwise affine registration of partially overlapping 3D point clouds with unknown point correspondences. The algorithm recovers the globally optimal scale, rotation, and translation alignment parameters and is applicable in a variety of difficult settings, including very sparse, noisy, and outlier-ridden datasets that do not permit the computation of local descriptors. The technique is based on a stochastic approach for the global optimization of an alignment error function robust to noise and resistant to outliers. At each optimization step, it alternates between stochastically visiting a generalized BSP-tree representation of the current solution landscape to select a promising transformation, finding point-to-point correspondences using a GPU-accelerated technique, and incorporating new error values in the BSP tree. In contrast to previous work, instead of simply constructing the tree by guided random sampling, we exploit the problem structure through a low-cost local minimization process based on analytically solving absolute orientation problems using the current correspondences. We demonstrate the quality and performance of our method on a variety of large point sets with different scales, resolutions, and noise characteristics."
projects: 
 - Point clouds
doi: 10.2312/vmv.20141282
links:
 - {name: CRS4 Website, url: http://vic.crs4.it/vic/cgi-bin/bib-page.cgi?id=%27Agus:2014:SSO%27}
youtube: FZJSfOIfwAI
bibtex: "@InProceedings{Agus:2014:SSO,
    author = {Marco Agus and Enrico Gobbetti and Alberto Jaspe-Villanueva and Claudio Mura and Renato Pajarola},
    title = {SOAR: Stochastic Optimization for Affine global point set Registration},
    booktitle = {Proc. 19th International Workshop on Vision, Modeling and Visualization (VMV)},
    pages = {103-110},
    month = {October},
    year = {2014},
    url = {http://vic.crs4.it/vic/cgi-bin/bib-page.cgi?id='Agus:2014:SSO'},
}" 

---