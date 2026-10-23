---
layout: publication
published: false   # hidden until the paper/patent is public; remove this line to show it
code: 2026-ArXiv-genetic_frame_selection
title: "Less Is More: Genetic Frame Selection for Efficient Novel View Synthesis"
authors: Diego E. Farchione, Ramzi Idoughi, Alberto Jaspe-Villanueva, and Peter Wonka
year: 2026
type: Preprint
tags:
 - capture-reconstruction
 - machine-learning
journal: "arXiv preprint"
pub-data: "arXiv:2609.35573, September 2026"
abstract: "Feed-forward novel view synthesis reconstructs a scene from many input images in a single forward pass, yet more views do not necessarily improve performance: redundant or poorly chosen frames increase computational cost and may degrade reconstruction quality. We address the problem of selecting, from an already captured sequence, a fixed-size subset of input views that is most informative for reconstructing specified target viewpoints. We propose a render-free view selector that scores candidate frames based on three complementary criteria: target-view coverage, measured against observed frames that stand in for the targets, redundancy with previously selected views, and image sharpness. A lightweight scoring network then selects the most informative frames without rendering, reconstruction, or per-scene optimization at inference time. To train the selector, we distill an expensive offline search procedure in which a genetic algorithm identifies high-quality subsets by directly optimizing reconstruction performance on training scenes. The selector learns to reproduce these choices from geometric and image-level features alone. Across six datasets and multiple input budgets, our method consistently outperforms both geometric and reconstruction-aware view-selection baselines while incurring significantly lower selection costs than reconstruction-based alternatives. Moreover, carefully selected subsets can outperform feed-forward reconstruction from the full input sequence. The learned selector generalizes across diverse reconstruction paradigms (feed-forward, 3D Gaussian Splatting, and NeRF), to object-targeted reconstruction and to a cross-capture setting in which the target views come from a separate acquisition pass. More broadly, our results indicate that explicitly reasoning about target relevance and inter-view redundancy is a fundamental factor in efficient scene reconstruction."
projects:
 - Novel View Synthesis
 - Gaussian Splatting
doi: 10.48550/arXiv.2609.35573
no_pdf: true
no_teaser: true
links:
 - { name: arXiv, url: "https://arxiv.org/abs/2609.35573" }
 - { name: PDF, url: "https://arxiv.org/pdf/2609.35573" }
bibtex: "@misc{Farchione:2026:LessIsMore,\n
  title = {Less Is More: Genetic Frame Selection for Efficient Novel View Synthesis},\n
  author = {Farchione, Diego E. and Idoughi, Ramzi and Jaspe-Villanueva, Alberto and Wonka, Peter},\n
  year = {2026},\n
  eprint = {2609.35573},\n
  archivePrefix = {arXiv},\n
  primaryClass = {cs.CV},\n
  doi = {10.48550/arXiv.2609.35573}\n
}"
---
