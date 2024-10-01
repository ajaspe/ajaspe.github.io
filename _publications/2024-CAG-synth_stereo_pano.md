---
layout: publication
code: 2024-CAG-synth_stereo_pano
title: "Deep synthesis and exploration of omnidirectional stereoscopic environments from a single surround-view panoramic image"
authors: "Giovanni Pintore, Alberto Jaspe-Villanueva, Markus Hadwiger, Jens Schneider, Marco Agus, Fabio Marton, Fabio Bettio, Enrico Gobbetti"
year: 2024
type: Journal Paper
journal: "Computer & Graphics"
pub-data: "ISSN 0097-8493, Vol 119. To appear"
doi: 10.1016/j.cag.2024.103907
abstract: "We introduce an innovative approach to automatically generate and explore immersive stereoscopic indoor environments derived from a single monoscopic panoramic image in an equirectangular format. Once per 360° shot, we estimate the per-pixel depth using a gated deep network architecture. Subsequently, we synthesize a collection of panoramic slices through reprojection and view-synthesis employing deep learning. These slices are distributed around the central viewpoint, with each slice’s projection center placed on the circular path covered by the eyes during a head rotation. Furthermore, each slice encompasses an angular extent sufficient to accommodate the potential gaze directions of both the left and right eye and to provide context for reconstruction. For fast display, a stereoscopic multiple-center-of-projection stereo pair in equirectangular format is composed by suitably blending the precomputed slices. At run-time, the pair is loaded in a lightweight WebXR viewer that responds to head rotations, offering both motion and stereo cues. The approach combines and extends state-of-the-art data-driven techniques, incorporating several innovations. Notably, a gated architecture is introduced for panoramic monocular depth estimation. Leveraging the predicted depth, the same gated architecture is then applied to the re-projection of visible pixels, facilitating the inpainting of occluded and disoccluded regions by incorporating a mixed Generative Adversarial Network (GAN). The resulting system works on a variety of available VR headsets and can serve as a base component for immersive applications. We demonstrate our technology on several indoor scenes from publicly available data."
projects: 
 - Indoor modelling
 - Virtual reality
links:
 - { name: CRS4 Site, url: "https://www.crs4.it/vic/cgi-bin/bib-page.cgi?id=%27Pintore:2024:DSE%27" }
youtube: Qzuef6cjY1Q
bibtex: "@Article{Pintore:2024:DSE,\n
    author = {Pintore, Giovanni and Jaspe-Villanueva, Alberto and Hadwiger, Markus and Schneider, Jens and Agus, Marco and Marton, Fabio and Bettio, Fabio and Gobbetti, Enrico},\n
    title = {Deep synthesis and exploration of omnidirectional stereoscopic environments from a single surround-view panoramic image},\n
    journal = {Computers & Graphics},\n
    volume = {119},\n
    pages = {103907},\n
    month = {March},\n
    year = {2024},\n
    doi = {10.1016/j.cag.2024.103907},\n
    url = {http://vic.crs4.it/vic/cgi-bin/bib-page.cgi?id='Pintore:2024:DSE'},\n
}"
---

## Realtime results

Here you can find some of the examples resulting from the paper: \"[Deep synthesis and exploration of omnidirectional stereoscopic environments from a single surround-view panoramic image](https://albertojaspe.net/publications/2024-CAG-synth_stereo_pano.html)\", which significatively improves the quality of [our previous one](https://albertojaspe.net/publications/2023-Web3D-panoverse.html). We show how to create and explore an stereoscopic environment from a single image (monoscopic) 360 indoor panorama.

You need a [WebXR](https://immersiveweb.dev)-enabled browser and any VR device.

<div class="container">

  <div class="row py-3 g-3">
	<div class="col-md-6">
		<div class="thumbnail">
		<img class="rounded img-fluid" src="/demos/panoverse/cag/1/mono-thumb.jpg">
		<div class="text-center my-1">
			<a href="/demos/panoverse/cag/1/mono.png"><button type="button" class="btn btn-primary btn-sm">Input Monoscopic</button></a>
			<a href="/demos/panoverse/stereo.html?scene=cag/1"><button type="button" class="btn btn-success btn-sm">Generated Stereo (WebXR)</button></a>
		</div>
		</div>
	</div>
	<div class="col-md-6">
		<div class="thumbnail">
		<img class="rounded img-fluid" src="/demos/panoverse/cag/2/mono-thumb.jpg">
		<div class="text-center my-1">
			<a href="/demos/panoverse/cag/2/mono.png"><button type="button" class="btn btn-primary btn-sm">Input Monoscopic</button></a>
			<a href="/demos/panoverse/stereo.html?scene=cag/2"><button type="button" class="btn btn-success btn-sm">Generated Stereo (WebXR)</button></a>
		</div>
		</div>
	</div>
  </div>

  <div class="row py-3 g-3">
	<div class="col-md-6">
		<div class="thumbnail">
		<img class="rounded img-fluid" src="/demos/panoverse/cag/3/mono-thumb.jpg">
		<div class="text-center my-1">
			<a href="/demos/panoverse/cag/3/mono.png"><button type="button" class="btn btn-primary btn-sm">Input Monoscopic</button></a>
			<a href="/demos/panoverse/stereo.html?scene=cag/3"><button type="button" class="btn btn-success btn-sm">Generated Stereo (WebXR)</button></a>
		</div>
		</div>
	</div>
	<div class="col-md-6">
		<div class="thumbnail">
		<img class="rounded img-fluid" src="/demos/panoverse/cag/4/mono-thumb.jpg">
		<div class="text-center my-1">
			<a href="/demos/panoverse/cag/4/mono.png"><button type="button" class="btn btn-primary btn-sm">Input Monoscopic</button></a>
			<a href="/demos/panoverse/stereo.html?scene=cag/4"><button type="button" class="btn btn-success btn-sm">Generated Stereo (WebXR)</button></a>
		</div>
		</div>
	</div>
  </div>

</div>