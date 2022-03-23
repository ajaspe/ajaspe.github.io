---
title: GLSL
description: "GLSL"
layout: default
---
<script src="libs/ace/ace.js" type="text/javascript" charset="utf-8"></script>
<script src="glsl-playground.js" type="module"></script>

<div class="my-4">

<div markdown="1">
## GLSL Playground

This is a playground of GLSL fragment shaders, *heavely inspired* in [Shadetoy](https://shadertoy.com").

Use Ctrl+R to recompile.The following uniforms are defined by default for your enjoyment:
* *iGlobalTime* [float]: a timer in seconds
* *iResolution* [vec2]: canvas resolution in pixels
* *iMouse* [vec2]: coordinates of the mouse
</div>

<div class="w-100" id="editor" style="height:350px;"></div>

<button type="button" id="run_button">Run</button> (Ctrl + Intro)
<br />
<canvas class="w-100" height="400px" id='glcanvas' style='background-color: red;'></canvas>

</div> 