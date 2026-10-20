---
title: GLSL Playground
description: "Playground experiment for playing with GLSL shaders using WebGL2"
layout: default
thumb_img: "assets/img/thumb_glsl.jpg"
updated: 2022-09-10
---
<script src="libs/ace/ace.js" type="text/javascript" charset="utf-8"></script>
<script src="glsl-playground.js" type="module"></script>

<div class="my-4">

<div markdown="1">
# GLSL Playground

This is a simple WebGL2 playground for GLSL fragment shaders, *heavily inspired* by [Shadertoy](https://shadertoy.com).  
Edit the source (thanks [ace editor](https://ace.c9.io/)). Use `Ctrl+Enter` to recompile on the fly. The following uniforms are defined by default:
* `float iTime` : a timer in seconds
* `vec2 iResolution` : canvas resolution in pixels
* `vec2 iMouse` : coordinates of the mouse  

--- 
</div>

<div class="w-100" id="editor" style="height:350px;"></div>

<button type="button" id="run_button">Run</button> (Ctrl + Enter)
<br />
<canvas class="w-100" height="400px" id='glcanvas' style='background-color: red;'></canvas>

</div> 