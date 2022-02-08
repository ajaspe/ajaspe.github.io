
let spots;
let frogs;
let frogsOrig;
let numSpots;
let numFrogs;
let finished = 0;
let finishedText;
let numAlgSteps = 0;

function generateRandomColor() {
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function activateSpot(numSpot, color) {
    //console.log("activate", numSpot, color);
    spots[numSpot].active = true;
    spots[numSpot].btn.style.background = color;
}

function deactivateSpot(numSpot) {
    //console.log("deactivate", numSpot);
    spots[numSpot].active = false;
    spots[numSpot].btn.style.background = "white";
}

function clearAll() {
    document.getElementById("frogs").innerHTML= '';
    frogs = new Array(numFrogs);
    spots = new Array(numSpots);
    finished = 0;
    numAlgSteps = 0;
}

function initFrogs() {

    clearAll();
    let freeSpots = [...spots.keys()];

    let frogs_div = document.getElementById("frogs");
    for (let i = 0; i < numSpots; i++) {
        spots[i] = {}
        let btn = document.createElement("input");
        btn.type = "button";
        btn.style.background = "white";
        btn.name = "btn" + i;
        frogs_div.appendChild(btn);
        spots[i].btn = btn;
        spots[i].active = false;
        deactivateSpot(i);
    }

    for (let i = freeSpots.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = freeSpots[i];
        freeSpots[i] = freeSpots[j];
        freeSpots[j] = temp;
    }

    for (let i = 0; i < numFrogs; i++) {
        frogs[i] = {}
        frogs[i].pos = freeSpots[i];
        frogs[i].color = generateRandomColor();
        activateSpot(frogs[i].pos, frogs[i].color);
    }

    finishedText = document.createElement("input");
    finishedText.type = "button";
    finishedText.value = "0";
    frogs_div.append(finishedText);

    frogsOrig = JSON.parse(JSON.stringify(frogs));
}


function whatNextStep(frog) {
    let nextStep = frogs[frog].pos + 1;
    while (nextStep < numSpots )
        if (spots[nextStep].active) nextStep++;
        else break;
    return nextStep;
}

function stepFrog(frog) {
    if(frogs[frog].pos >= numSpots) return true;
    numAlgSteps++;
    document.getElementById("numAlgSteps").value = numAlgSteps;
    let nextStep = whatNextStep(frog);
    deactivateSpot(frogs[frog].pos);
    frogs[frog].pos = nextStep;
    if (nextStep < numSpots) {
        activateSpot(nextStep, frogs[frog].color);
        return false;
    }
    finished++;
    finishedText.value = finished;
    return true;
}

document.getElementById("createDS").onclick = function () {
    numSpots = parseInt(document.getElementById("numSpots").value);
    numFrogs = parseInt(document.getElementById("numFrogs").value);
    initFrogs();
}

document.getElementById("reset").onclick = function () {
    frogs = JSON.parse(JSON.stringify(frogsOrig));
    
    for (let i = 0; i < numSpots; i++)
        deactivateSpot(i);
    for (let i = 0; i < numFrogs; i++)
        activateSpot(frogs[i].pos, frogs[i].color);
    finished = 0;
    numAlgSteps = 0;
}

document.getElementById("algo1").onclick = async function () {

    // acumulate them in the end
    for (let i = 0; i < numFrogs; i++) {
        while (whatNextStep(i) <= numSpots ) {
            stepFrog(i);
            const waitMs = document.getElementById("speed").max - document.getElementById("speed").value;
            if(waitMs > 0) await sleep(waitMs);
        }
    }
}

document.getElementById("algo2").onclick = async function () {

    // sort frogs by position in the array
    frogs.sort((a, b) => (a.pos > b.pos) ? 1 : ((b.pos > a.pos) ? -1 : 0))

    // acumulate them in the end
    for (let i = 0; i < numFrogs; i++) {
        while (whatNextStep(i) <= numSpots ) {
            stepFrog(i);
            const waitMs = document.getElementById("speed").max - document.getElementById("speed").value;
            if(waitMs > 0) await sleep(waitMs);
        }
    }
}


document.getElementById("algo3").onclick = async function () {

    // sort frogs by position in the array
    frogs.sort((a, b) => (a.pos > b.pos) ? 1 : ((b.pos > a.pos) ? -1 : 0))

    // acumulate them in the end
    for (let i = 0; i < numFrogs; i++) {
        while (whatNextStep(i) < numSpots ) {
            stepFrog(i);
            const waitMs = document.getElementById("speed").max - document.getElementById("speed").value;
            if(waitMs > 0) await sleep(waitMs);
        }
    }

    // sort frogs by  position in the array
    frogs.sort((a, b) => (a.pos > b.pos) ? 1 : ((b.pos > a.pos) ? -1 : 0))

    // then jump all of them to the end starting by the last one
    for (let i = 0; i < numFrogs; i++) {
        stepFrog(i);
        const waitMs = document.getElementById("speed").max - document.getElementById("speed").value;
        if(waitMs > 0) await sleep(waitMs);
    }
}

document.getElementById("algo4").onclick = async function () {

    // sort frogs by position in the array
    frogs.sort((a, b) => (a.pos < b.pos) ? 1 : ((b.pos < a.pos) ? -1 : 0))

    // acumulate them in the end
    for (let i = 0; i < numFrogs; i++) {
        while (whatNextStep(i) < numSpots ) {
            stepFrog(i);
            let waitMs = document.getElementById("speed").max - document.getElementById("speed").value;
            if(waitMs > 0) await sleep(waitMs);
        }
    }

    // sort frogs by  position in the array
    frogs.sort((a, b) => (a.pos > b.pos) ? 1 : ((b.pos > a.pos) ? -1 : 0))

    // then jump all of them to the end starting by the last one
    for (let i = 0; i < numFrogs; i++) {
        stepFrog(i);
        let waitMs = document.getElementById("speed").max - document.getElementById("speed").value;
        if(waitMs > 0) await sleep(waitMs);
    }
}


