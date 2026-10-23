---
title: Visual Computing Resources
description: "Where to start and where to go deeper in computer graphics and visualization: free textbooks and courses, reference books, paper lists, blogs, tools and datasets, collected by Alberto Jaspe-Villanueva."
layout: note
kind: living
icon: fa-book
summary: "Free textbooks and courses, reference books, paper lists, blogs, tools and datasets for computer graphics and visualization, with a line on why each one is there."
redirect_from:
  - /notes/visual-computing-resources.html
thumb_img: "assets/img/thumb_site.jpg"
updated: 2026-10-23
---

A personal, opinionated list, organized by what you want to do with it rather than by format. Every link has one line saying why it is here. All links were checked on the date above; blogs that have not posted in a while are marked as <span class="post-tag">archive</span>, their back catalogue is still worth reading.

## Start here

Three free, tutorial-style places to begin. Everything else on this page can wait until these make sense.

* [Cem Yuksel's courses](https://www.cemyuksel.com/courses/): recorded university lectures, from the basics to interactive rendering.
* [Ray Tracing in One Weekend](https://raytracing.github.io/): a working path tracer in a few hundred lines, then two more books that make it real.
* [Immersive Linear Algebra](https://immersivemath.com/ila/): the linear algebra you need, with interactive figures.

## Reference books

The ones on my shelf. Click a cover for the book's site.

<div class="book-covers">
	<a href="https://www.realtimerendering.com/"><img class="imglight" src="/assets/img/book_covers/realtime-rendering.jpg" alt="Real-Time Rendering"></a>
	<a href="https://cgpp.net"><img class="imglight" src="/assets/img/book_covers/computer_graphics_priciples_and_practice.jpg" alt="Computer Graphics: Principles and Practice"></a>
	<a href="https://pbrt.org"><img class="imglight" src="/assets/img/book_covers/physically_based_rendering.jpg" alt="Physically Based Rendering"></a>
	<a href="https://www.routledge.com/Fundamentals-of-Computer-Graphics/Marschner-Shirley/p/book/9780367505035"><img class="imglight" src="/assets/img/book_covers/fundamentals_computer_graphics.jpg" alt="Fundamentals of Computer Graphics"></a>
	<a href="https://www.gameenginebook.com"><img class="imglight" src="/assets/img/book_covers/game_engine_architecture.jpg" alt="Game Engine Architecture"></a>
	<a href="https://developer.nvidia.com/gpugems/gpugems/contributors"><img class="imglight" src="/assets/img/book_covers/gpu_gems.jpg" alt="GPU Gems"></a>
	<a href="https://www.cs.ubc.ca/~tmm/vadbook/"><img class="imglight" src="/assets/img/book_covers/visualization_analysis_and_design.jpg" alt="Visualization Analysis and Design"></a>
</div>

* [**Real-Time Rendering**](https://www.realtimerendering.com/) (Akenine-Möller et al.): the encyclopedia of interactive graphics; its website keeps the reading lists current.
* [**Computer Graphics: Principles and Practice**](https://cgpp.net) (Hughes et al.): the broad, classic foundation.
* [**Physically Based Rendering**](https://pbrt.org) (Pharr, Jakob, Humphreys): the reference on rendering, free online as the [4th edition](https://pbr-book.org/) with the code of a production-quality renderer; the printed edition is worth having too.
* [**Fundamentals of Computer Graphics**](https://www.routledge.com/Fundamentals-of-Computer-Graphics/Marschner-Shirley/p/book/9780367505035) (Marschner, Shirley): the undergraduate textbook I would teach from.
* [**Game Engine Architecture**](https://www.gameenginebook.com) (Gregory): how all of it fits together in a real system.
* [**GPU Gems**](https://developer.nvidia.com/gpugems/gpugems/contributors): the three volumes, free online; dated in places, timeless in others.
* [**Visualization Analysis and Design**](https://www.cs.ubc.ca/~tmm/vadbook/) (Munzner): the textbook of visualization, the one to read before designing a view of anything.

## Free textbooks and tutorials

Also free and complete, for the next layer once the basics are in place.

* [Scratchapixel](https://scratchapixel.com/): the gentlest full introduction to how images are made, from the math up.
* [Learn OpenGL](https://learnopengl.com/): the standard tutorial for real-time graphics with a modern API; still the best way to understand the pipeline.
* [WebGPU Fundamentals](https://webgpufundamentals.org/): the same journey for the web's new GPU API, which is where much of my recent work lives.
* [The Book of Shaders](https://thebookofshaders.com/): fragment shaders explained with live editors; the fastest route to thinking in GPU terms.
* [Computer Graphics from Scratch](https://gabrielgambetta.com/computer-graphics-from-scratch/): rasterization and ray tracing with no libraries, for the fundamentals.

## Going deeper

* [Keenan Crane: Discrete Differential Geometry](https://www.cs.cmu.edu/~kmcrane/Projects/DDG/): the notes and lectures for geometry processing, once the basics are solid.
* [The Graphics Codex](https://graphicscodex.com): Morgan McGuire's compact reference of the equations and concepts, always open in a tab.
* [Casual Effects](https://casual-effects.com/): McGuire's site: papers, tools and the Computer Graphics Archive of test models.
* [Journal of Computer Graphics Techniques](https://jcgt.org/): free, peer-reviewed, practical techniques with code.
* [Physically Based Shading courses](https://blog.selfshadow.com/publications/): the SIGGRAPH course notes that defined modern material models, collected by Stephen Hill.
* [Eurographics Digital Library](https://diglib.eg.org): open access to most Eurographics papers.
* [A Primer on Bézier Curves](https://pomax.github.io/bezierinfo/): everything about the curves, interactive.
* [Shervine Amidi's cheatsheets](https://stanford.edu/~shervine/teaching/): the machine learning you need next to graphics, on a few pages.
* Introductions to [Spherical Harmonics](https://puye.blog/posts/SH-Introduction-EN/) and [Spherical Gaussians](https://puye.blog/posts/SG-Intro-EN/): the two representations behind most lighting approximations.
* [Color: From Hexcodes to Eyeballs](https://jamie-wong.com/post/color/) (Jamie Wong): the best single explanation of color for programmers.

## Keeping up

* [Two Minute Papers](https://www.youtube.com/channel/UCbfYPyITQ-7l4upoX8nvctg): the papers of the week in video form.
* [Graphics Programming Weekly](https://www.jendrikillner.com/) (Jendrik Illner): the newsletter of the field, every Sunday.
* [Ke-Sen Huang's paper lists](https://kesen.realtimerendering.com): every paper of every graphics conference, the day the program is out; especially for computer graphics.
* [IEEE VIS on YouTube](https://www.youtube.com/@IEEEVisualizationConference): the recorded paper presentations of the visualization conference, year by year.
* [Real-Time Rendering blog](https://www.realtimerendering.com/blog/): news and link roundups from the book's authors.
* [Geeks3D](https://www.geeks3d.com/): GPU and demoscene news, tools and tests.
* [Shadertoy](https://www.shadertoy.com/): thousands of shaders to read and tweak; the living textbook of procedural graphics.

### Blogs

* [Íñigo Quilez](https://iquilezles.org): distance fields, procedural everything, and the articles behind Shadertoy.
* [Aras Pranckevičius](https://aras-p.info/blog/): engine internals, Gaussian splatting, and honest performance work.
* [Bart Wronski](https://bartwronski.com): signal processing and image quality for rendering.
* [The blog at the bottom of the sea](https://blog.demofox.org/) (Alan Wolfe): sampling, noise and exotic computation, with code.
* [C0DE517E](https://www.c0de517e.com/) (Angelo Pesce): rendering architecture and industry perspective, now at a new address.
* [Ingo Wald](https://ingowald.blog/): ray tracing and large data, from the author of much of it.
* [Max Liani](https://maxliani.wordpress.com/): production rendering and software craft.
* [Anteru](https://anteru.net/) (Matthäus G. Chajdas): GPUs, APIs and the industry from the inside.
* [A Graphics Guy's Note](https://agraphicsguynotes.com/) (Jiayin Cao): deep dives into renderers and papers.
* [Juan Diego Montoya](https://juandiegomontoya.github.io): modern OpenGL and engine experiments.
* [Nathan Reed](https://www.reedbeta.com/): clear explanations of rendering math. <span class="post-tag">archive</span>
* [Pete Shirley](http://psgraphics.blogspot.com): short notes from the author of the ray tracing books. <span class="post-tag">archive</span>
* [Humus](http://www.humus.name) (Emil Persson): demos and techniques from the 2000s and 2010s. <span class="post-tag">archive</span>

## Visualization

* [IEEE VIS](https://ieeevis.org) and [EuroVis](https://www.eurovis.org): the two conferences, with their paper lists and recorded talks.
* [Data Visualization Society](https://www.datavisualizationsociety.org/): the community side, with challenges and a newsletter.
* [D3](https://d3js.org/) and [Observable](https://observablehq.com/): the web toolkit for data graphics, and the notebooks to prototype with it.
* [Vega-Lite](https://vega.github.io/vega-lite/): charts described as data; the fastest way to a correct plot.
* [Altair](https://altair-viz.github.io/) and [Plotly](https://plotly.com/): charts from Python; Altair is Vega-Lite's Python face, Plotly the interactive, batteries-included one.
* [Streamlit](https://streamlit.io/) and [marimo](https://marimo.io/): web apps and reactive notebooks in Python, the quickest way to put a visualization in front of someone.
* [ParaView](https://www.paraview.org/) and [VTK](https://vtk.org/): the workhorses of scientific visualization.
* [Inviwo](https://inviwo.org/): a research framework for interactive visualization, good for prototyping new techniques.

## Tools

* [RenderDoc](https://renderdoc.org/): the frame debugger; learn it before anything else goes wrong.
* [NVIDIA Nsight Graphics](https://developer.nvidia.com/nsight-graphics): profiling and debugging on NVIDIA GPUs.
* [Blender](https://www.blender.org/): modeling, rendering and a Python API for generating test scenes.
* [MeshLab](https://www.meshlab.net/) and [CloudCompare](https://www.cloudcompare.org/): inspecting, cleaning and comparing meshes and point clouds.
* [Polyscope](https://polyscope.run/): a viewer for research prototypes in C++ and Python, with almost no code.
* [Open3D](https://www.open3d.org/): point clouds, meshes and reconstruction from Python.
* [three.js](https://threejs.org/), [Babylon.js](https://www.babylonjs.com/) and [X_ITE](https://create3000.github.io/x_ite/): 3D on the web, from scene graphs to standards-based X3D.
* [Compiler Explorer](https://godbolt.org/): see what your code compiles to.

## Data

* [Stanford 3D Scanning Repository](https://graphics.stanford.edu/data/3Dscanrep/): the bunny, the dragon and friends.
* [Computer Graphics Archive](https://casual-effects.com/data/): McGuire's cleaned-up test scenes (Sponza, San Miguel, Bistro and more).
* [Poly Haven](https://polyhaven.com/): free HDRIs, textures and models under CC0.

## Systems and performance

* [Agner Fog's optimization manuals](https://www.agner.org/optimize/): how CPUs really execute your code.
* [x86-64 Assembly Language Programming](http://www.egr.unlv.edu/~ed/assembly64.pdf) (Ed Jorgensen): a free textbook, for when you need to read what the compiler did.

<p class="small text-white-50 mt-5">With thanks to <a href="https://www.cs.upc.edu/~ppau/" class="text-white-50">Pere-Pau Vázquez</a> for his suggestions to this page.</p>
