---

code: 2015-EG-chc+rt
title: "CHC+RT: Coherent Hierarchical Culling for Ray Tracing"
authors: Oliver Mattausch, Jiri Bittner, Alberto Jaspe-Villanueva, Enrico Gobbetti, Michael Wimmer, and Renato Pajarola
year: 2015
type: Journal full-paper
conference: EuroGraphics (EG'15)
journal: "Computer Graphics Forum"
journal-data: "34(2): 537-548, 2015"
abstract: "We propose a new technique for in-core and out-of-core GPU ray tracing using a generalization of hierarchical occlusion culling in the style of the CHC++ method. Our method exploits the rasterization pipeline and hardware occlusion queries in order to create coherent batches of work for localized shader-based ray-tracing kernels. By combining hierarchies in both ray space and object space, the method is able to share intermediate traversal results among multiple rays. We exploit temporal coherence among similar ray sets between frames and also within the given frame. A suitable management of the current visibility state makes it possible to benefit from occlusion culling for less coherent ray types like diffuse reflections. Since large scenes are still a challenge for modern GPU ray tracers, our method is most useful for scenes with medium to high complexity, especially since our method inherently supports ray tracing highly complex scenes that do not fit in GPU memory. For in-core scenes our method is comparable to CUDA ray tracing and performs up to 5.94 times better than pure shader-based ray tracing."
projects: 
 - Massive models
doi: 10.1111/cgf.12582
lab_website: http://vic.crs4.it/vic/cgi-bin/bib-page.cgi?id=%27Mattausch:2015:CCH%27
youtube: https://www.youtube.com/watch?v=4Ma920yhVHE
bibtex_id: 

---