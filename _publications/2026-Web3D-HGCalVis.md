---
layout: publication
code: 2026-Web3D-HGCalVis
title: "HGCalVis: Web-Based Importance-Ordered Visualization of CERN's HGCal Particle Showers"
authors: Waad F. Alsheri, Matevž Tadel, Alja M. Tadel, Marco Rovere, Markus Hadwiger, Alberto Jaspe-Villanueva
year: 2026
type: Conference Paper
conference: Web3D 2026 - 28th International ACM Conference on 3D Web Technology
pub-data: "Volume 44 (2025), Number 3"
abstract: "The next major upgrade of the Compact Muon Solenoid (CMS) experiment at CERN’s Large Hadron Collider will introduce the High Granularity Calorimeter (HGCal), a new endcap sub-detector designed to cope with the order-of-magnitude increase in collision rates expected from the High-Luminosity LHC. Validating its design relies on Monte Carlo simulations that produce highly cluttered particle shower events: cascades of thousands of trajectories confined within a small detector volume, where physically significant tracks are easily occluded by lower-energy ones. We present a web-based, interactive 3D visualization system for exploring these simulated showers. The system combines a linked 2D hierarchical schematic view, cylinder-shaded lines with screen-space ambient occlusion, multi-attribute filtering, two complementary animation modes and, as our main rendering contribution, an Importance-Ordered Rendering (IOR) algorithm. IOR partitions trajectories into energy-based clusters, renders each into its own G-buffer in a separate pass, and composites them using Gaussian-filtered importance masks so that high-energy tracks remain visible without losing the spatial context provided by low-energy tracks. The system targets restricted graphics environments such as WebGL, where most existing dense-line techniques cannot be used directly. We report a performance evaluation on four production HGCal datasets (1.9k to 22.6k tracks) on both workstation and laptop hardware, a preliminary within-subjects user study (𝑁 = 19) that isolates the contribution of each main visual feature, and qualitative feedback from CERN collaborators. In the study, importance-ordered rendering increased the accuracy of identifying the highest-energy trajectory relative to unordered rendering, while energy color-coding alone did not, and the linked schematic view increased recovery of a track’s daughter set."
projects: 
 - Scientific Visualization
 - CERN
doi: 10.1145/3822516.3834872
youtube: N_8KSC_yCqM
appendix: yes
bibtex: "@inproceedings{Alsheri:2026:HGCalVis},\n
  title = {HGCalVis: Web-Based Importance-Ordered Visualization of CERN's HGCal Particle Showers},\n
  author = {Alsheri, Waad F. and Tadel, Matevž and Tadel, Alja M. and Rovere, Marco and Hadwiger, Markus and Jaspe-Villanueva, Alberto},\n
  booktitle = {Proc. Web3D 2026 - 28th International ACM Conference on 3D Web Technology},\n
  month = {October},\n
  year = {2026},\n
  doi = {10.1145/3822516.3834872}\n
}"

---
