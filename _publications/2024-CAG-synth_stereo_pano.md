---
layout: publication
code: 2024-CAG-synth_stereo_pano
title: "Deep synthesis and exploration of omnidirectional stereoscopic environments from a single surround-view panoramic image"
authors: "Giovanni Pintore, Alberto Jaspe-Villanueva, Markus Hadwiger, Jens Schneider, Marco Agus, Fabio Marton, Fabio Bettio, Enrico Gobbetti"
year: 2024
type: Journal Paper
journal: "Computer & Graphics"
pub-data: "ISSN 0097-8493. To appear"
doi: 10.1016/j.cag.2024.103907
abstract: "We introduce an innovative approach to automatically generate and explore immersive stereoscopic indoor environments derived from a single monoscopic panoramic image in an equirectangular format. Once per 360° shot, we estimate the per-pixel depth using a gated deep network architecture. Subsequently, we synthesize a collection of panoramic slices through reprojection and view-synthesis employing deep learning. These slices are distributed around the central viewpoint, with each slice’s projection center placed on the circular path covered by the eyes during a head rotation. Furthermore, each slice encompasses an angular extent sufficient to accommodate the potential gaze directions of both the left and right eye and to provide context for reconstruction. For fast display, a stereoscopic multiple-center-of-projection stereo pair in equirectangular format is composed by suitably blending the precomputed slices. At run-time, the pair is loaded in a lightweight WebXR viewer that responds to head rotations, offering both motion and stereo cues. The approach combines and extends state-of-the-art data-driven techniques, incorporating several innovations. Notably, a gated architecture is introduced for panoramic monocular depth estimation. Leveraging the predicted depth, the same gated architecture is then applied to the re-projection of visible pixels, facilitating the inpainting of occluded and disoccluded regions by incorporating a mixed Generative Adversarial Network (GAN). The resulting system works on a variety of available VR headsets and can serve as a base component for immersive applications. We demonstrate our technology on several indoor scenes from publicly available data."
projects: 
 - Indoor modelling
no_pdf: true
links:
 - { name: CRS4 Site, url: "https://www.crs4.it/vic/cgi-bin/bib-page.cgi?id=%27Pintore:2024:DSE%27" }
projects: 

---