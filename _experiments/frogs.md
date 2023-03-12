---
title: Frogs experiment
description: "The frogs experiment"
layout: default
last_modification_date: 03/07/2022
---

# The frogs experiment

This is just a viusual representation of a interesting problem I saw somewhere, minimize the number of steps that a random set of frogs need to do to arrive to the end.

---

<div>
    <input type="button" id="createDS" value="Create Dataset">
    NumSpots <input type="text" id="numSpots" value="100">
    NumFrogs <input type="text" id="numFrogs" value="60">
    <br>
    Speed <input type="range" min="0" max="200" value="100" class="slider" id="speed">
    <br>
    <input type="button" id="reset" value="Reset">
    <br>
    NumAlgSteps <input type="text" id="numAlgSteps" value="0">
    <br>
    <input type="button" id="algo1" value="Algorithm 1 (naive)">
    <input type="button" id="algo2" value="Algorithm 2 (sort+naive)">
    <input type="button" id="algo3" value="Algorithm 3 (accum end)">
</div>

---

<div id="frogs"></div>
<script src="frogs.js" type="module"></script>
