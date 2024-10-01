---
layout: publication
code: 2023-Web3D-panoverse
title: "PanoVerse: automatic generation of stereoscopic environments from single indoor panoramic images for Metaverse applications"
authors: Giovanni Pintore, Alberto Jaspe-Villanueva, Markus Hadwiger, Enrico Gobbetti, Jens Schneider, and Marco Agus
year: 2023
type: Conference Paper
awards: Honorable Mention award
conference: Web3D 2023 - 28th International ACM Conference on 3D Web Technology
abstract: "We present a novel framework, dubbed PanoVerse, for the automatic creation and presentation of immersive stereoscopic environments from a single indoor panoramic image. Once per 360° shot, a novel data-driven architecture generates a fixed set of panoramic stereo pairs distributed around the current central view-point. Once per frame, directly on the HMD, we rapidly fuse the precomputed views to seamlessly cover the exploration workspace. To realize this system, we introduce several novel techniques that combine and extend state-of-the art data-driven techniques. In particular, we present a gated architecture for panoramic monocular depth estimation and, starting from the re-projection of visible pixels based on predicted depth, we exploit the same gated architecture for inpainting the occluded and disoccluded areas, introducing a mixed GAN with self-supervised loss to evaluate the stereoscopic consistency of the generated images. At interactive rates, we interpolate precomputed panoramas to produce photorealistic stereoscopic views in a lightweight WebXR viewer. The system works on a variety of available VR headsets and can serve as a base component for Metaverse applications. We demonstrate our technology on several indoor scenes from publicly available data."
projects: 
 - Indoor modelling
 - Virtual reality
doi: 10.1145/3611314.3615914
links:
 - {name: VCCVis Website, url: "https://vccvisualization.org/research/panoverse/"}
 - {name: CRS4 Website, url: "http://vic.crs4.it/vic/cgi-bin/bib-page.cgi?id=%27Pintore:2023:PAG%27"}
youtube: ZUHBNyZecdw
bibtex: "@inproceedings{Pintore:2023:PAG,\n
    author = {Giovanni Pintore and Alberto {Jaspe Villanueva} and Markus Hadwiger and Enrico Gobbetti and Jens Schneider and Marco Agus},\n
    title = {PanoVerse: automatic generation of stereoscopic environments from single indoor panoramic images for Metaverse applications},\n
    booktitle = {Proc. Web3D 2023 - 28th International ACM Conference on 3D Web Technology},\n
    month = {October},\n
    year = {2023},\n
    doi = {10.1145/3611314.3615914},\n
    note = {To appear},\n
    url = {http://vic.crs4.it/vic/cgi-bin/bib-page.cgi?id='Pintore:2023:PAG'},\n
}" 
---

## Note
Please check the extended version of this paper for Computer & Graphics journal: \"[Deep synthesis and exploration of omnidirectional stereoscopic environments from a single surround-view panoramic image](2024-CAG-synth_stereo_pano.html)\". It contains live demo and several improvements with respect to this one.

## Honorable Mention Diploma

<p align="center">
<img class="rounded img-fluid" width="50%" src="/publications/2023-Web3D-panoverse-award.jpg">
</p>
