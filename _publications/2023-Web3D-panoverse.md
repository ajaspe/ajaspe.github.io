---
layout: publication
code: 2023-Web3D-panoverse
title: "PanoVerse: automatic generation of stereoscopic environments from single indoor panoramic images for Metaverse applications"
authors: Giovanni Pintore, Alberto Jaspe-Villanueva, Markus Hadwiget, Enrico Gobbetti, Jens Schneider, and Marco Agus
year: 2023
type: Conference Paper
conference: Web3D 2023 - 28th International ACM Conference on 3D Web Technology
abstract: "We present a novel framework, dubbed PanoVerse, for the automatic creation and presentation of immersive stereoscopic environments from a single indoor panoramic image. Once per 360° shot, a novel data-driven architecture generates a fixed set of panoramic stereo pairs distributed around the current central view-point. Once per frame, directly on the HMD, we rapidly fuse the precomputed views to seamlessly cover the exploration workspace. To realize this system, we introduce several novel techniques that combine and extend state-of-the art data-driven techniques. In particular, we present a gated architecture for panoramic monocular depth estimation and, starting from the re-projection of visible pixels based on predicted depth, we exploit the same gated architecture for inpainting the occluded and disoccluded areas, introducing a mixed GAN with self-supervised loss to evaluate the stereoscopic consistency of the generated images. At interactive rates, we interpolate precomputed panoramas to produce photorealistic stereoscopic views in a lightweight WebXR viewer. The system works on a variety of available VR headsets and can serve as a base component for Metaverse applications. We demonstrate our technology on several indoor scenes from publicly available data."
projects: 
 - Indoor modelling
doi: 10.1145/3611314.3615914
links:
 - {name: VCCVis Website, url: "https://vccvisualization.org/research/panoverse/"}
 - {name: CRS4 Website, url: "http://vic.crs4.it/vic/cgi-bin/bib-page.cgi?id=%27Pintore:2023:PAG%27"}
youtube: ZUHBNyZecdw
bibtex: "@inproceedings{Pintore:2023:PAG,\n
    author = {Giovanni Pintore and Alberto {Jaspe Villanueva} and Markus Hadwiget and Enrico Gobbetti and Jens Schneider and Marco Agus},\n
    title = {PanoVerse: automatic generation of stereoscopic environments from single indoor panoramic images for Metaverse applications},\n
    booktitle = {Proc. Web3D 2023 - 28th International ACM Conference on 3D Web Technology},\n
    month = {October},\n
    year = {2023},\n
    doi = {10.1145/3611314.3615914},\n
    note = {To appear},\n
    url = {http://vic.crs4.it/vic/cgi-bin/bib-page.cgi?id='Pintore:2023:PAG'},\n
}" 
---


## Realtime results

Here you can find the results of the paper: \"[PanoVerse: automatic generation of stereoscopic environments from single indoor panoramic images for Metaverse applications](https://albertojaspe.net/publications/2023-Web3D-panoverse.html)\" presented at [ACM Web3D 2023](https://web3d.siggraph.org). We show how to create and explore an stereoscopic environment from a single image (monoscopic) 360 indoor panorama.

You need a [WebXR](https://immersiveweb.dev)-enabled browser and any VR device.

<div class="container">

  <div class="row py-3 g-3">
	<div class="col-md-6">
		<div class="thumbnail">
		<img class="rounded img-fluid" src="/demos/panoverse/1/mono-thumb.jpg">
		<div class="text-center my-1">
			<a href="/demos/panoverse/1/mono.png"><button type="button" class="btn btn-primary btn-sm">Original Monoscopic</button></a>
			<a href="/demos/panoverse/stereo.html?scene=1"><button type="button" class="btn btn-success btn-sm">Generated Stereo (WebXR)</button></a>
		</div>
		</div>
	</div>
	<div class="col-md-6">
		<div class="thumbnail">
		<img class="rounded img-fluid" src="/demos/panoverse/2/mono-thumb.jpg">
		<div class="text-center my-1">
			<a href="/demos/panoverse/2/mono.png"><button type="button" class="btn btn-primary btn-sm">Original Monoscopic</button></a>
			<a href="/demos/panoverse/stereo.html?scene=2"><button type="button" class="btn btn-success btn-sm">Generated Stereo (WebXR)</button></a>
		</div>
		</div>
	</div>
  </div>

  <div class="row py-3 g-3">
	<div class="col-md-6">
		<div class="thumbnail">
		<img class="rounded img-fluid" src="/demos/panoverse/3/mono-thumb.jpg">
		<div class="text-center my-1">
			<a href="/demos/panoverse/3/mono.png"><button type="button" class="btn btn-primary btn-sm">Original Monoscopic</button></a>
			<a href="/demos/panoverse/stereo.html?scene=3"><button type="button" class="btn btn-success btn-sm">Generated Stereo (WebXR)</button></a>
		</div>
		</div>
	</div>
	<div class="col-md-6">
		<div class="thumbnail">
		<img class="rounded img-fluid" src="/demos/panoverse/4/mono-thumb.jpg">
		<div class="text-center my-1">
			<a href="/demos/panoverse/4/mono.png"><button type="button" class="btn btn-primary btn-sm">Original Monoscopic</button></a>
			<a href="/demos/panoverse/stereo.html?scene=4"><button type="button" class="btn btn-success btn-sm">Generated Stereo (WebXR)</button></a>
		</div>
		</div>
	</div>
  </div>

  <div class="row py-3 g-3">
	<div class="col-md-6">
		<div class="thumbnail">
		<img class="rounded img-fluid" src="/demos/panoverse/5/mono-thumb.jpg">
		<div class="text-center my-1">
			<a href="/demos/panoverse/5/mono.png"><button type="button" class="btn btn-primary btn-sm">Original Monoscopic</button></a>
			<a href="/demos/panoverse/stereo.html?scene=5"><button type="button" class="btn btn-success btn-sm">Generated Stereo (WebXR)</button></a>
		</div>
		</div>
	</div>
	<div class="col-md-6">
		<div class="thumbnail">
		<img class="rounded img-fluid" src="/demos/panoverse/6/mono-thumb.jpg">
		<div class="text-center my-1">
			<a href="/demos/panoverse/6/mono.png"><button type="button" class="btn btn-primary btn-sm">Original Monoscopic</button></a>
			<a href="/demos/panoverse/stereo.html?scene=6"><button type="button" class="btn btn-success btn-sm">Generated Stereo (WebXR)</button></a>
		</div>
		</div>
	</div>
  </div>

  <div class="row py-3 g-3">
	<div class="col-md-6">
		<div class="thumbnail">
		<img class="rounded img-fluid" src="/demos/panoverse/7/mono-thumb.jpg">
		<div class="text-center my-1">
			<a href="/demos/panoverse/7/mono.png"><button type="button" class="btn btn-primary btn-sm">Original Monoscopic</button></a>
			<a href="/demos/panoverse/stereo.html?scene=7"><button type="button" class="btn btn-success btn-sm">Generated Stereo (WebXR)</button></a>
		</div>
		</div>
	</div>
	<div class="col-md-6">
		<div class="thumbnail">
		<img class="rounded img-fluid" src="/demos/panoverse/8/mono-thumb.jpg">
		<div class="text-center my-1">
			<a href="/demos/panoverse/8/mono.png"><button type="button" class="btn btn-primary btn-sm">Original Monoscopic</button></a>
			<a href="/demos/panoverse/stereo.html?scene=8"><button type="button" class="btn btn-success btn-sm">Generated Stereo (WebXR)</button></a>
		</div>
		</div>
	</div>
  </div>

</div>