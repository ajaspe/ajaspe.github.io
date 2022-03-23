// Alberto Jaspe 2017
// https://albertojaspe.net

let shader_vertex;
let shader_fragmet;
let SHADER_PROGRAM;
let GL;
let time_mark = 0.0;
let mousePosX = 0;
let mousePosY = 0;
let good = true;
let editor;
let glCanvas = document.getElementById("glcanvas");
let shader_vertex_source = "attribute vec2 pos; void main(void) { gl_Position = vec4(pos, 0., 1.); }";
let shader_fragment_source = "\
// \"Light Circles\" by Deefunct [https://www.shadertoy.com/view/MlyGzW]\n\n\
precision mediump float;\n\
uniform float iGlobalTime;\n\
uniform vec2 iResolution;\n\
uniform vec2 iMouse;\n\
\n\
void main(void) {\n\
\tvec2 uv = 1.5*(2.0*gl_FragCoord.xy - iResolution.xy) / iResolution.y;\n\
\tvec2 mouse = 1.5*(2.0*iMouse.xy - iResolution.xy) / iResolution.y;\n\
\tvec2 offset = vec2(cos(iGlobalTime/2.0)*mouse.x,sin(iGlobalTime/2.0)*mouse.y);\n\
\n\
\tvec3 light_color = vec3(0.9, 0.65, 0.5);\n\
\tfloat light = 0.1 / distance(normalize(uv), uv);\n\
\n\
\tif(length(uv) < 1.0)\n\
\t\tlight *= 0.1 / distance(normalize(uv-offset), uv-offset);\n\
\n\
\tgl_FragColor = vec4(light*light_color, 1.0);\n\
}";



let getShader = function(source, type, typeString, GL) {
    let shader = GL.createShader(type);
    GL.shaderSource(shader, source);
    GL.compileShader(shader);
    if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
        alert("ERROR IN " + typeString + " SHADER : " + GL.getShaderInfoLog(shader));
        good = false;
        console.log("Shader change: WRONG!");
        return false;
    }
    good = true;
    console.log("Shader change: OK!");
    return shader;
};

let updateShader = function () {
    SHADER_PROGRAM = GL.createProgram();
    shader_fragmet = getShader(ace.edit("editor").getValue(), GL.FRAGMENT_SHADER, "FRAGMENT", GL);
    if (good) {
        GL.attachShader(SHADER_PROGRAM, shader_vertex);
        GL.attachShader(SHADER_PROGRAM, shader_fragmet);
        GL.linkProgram(SHADER_PROGRAM);
        GL.useProgram(SHADER_PROGRAM);
        time_mark = performance.now();
        glCanvas.width = glCanvas.getBoundingClientRect().width;
        glCanvas.height = glCanvas.getBoundingClientRect().height;
        GL.uniform2f(GL.getUniformLocation(SHADER_PROGRAM, "iResolution"), glCanvas.width, glCanvas.height);
        console.log(glCanvas.getBoundingClientRect().width, glCanvas.getBoundingClientRect().height);
    }
}


document.getElementById("run_button").addEventListener("click", updateShader);
window.addEventListener('resize', updateShader);


editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/glsl");
editor.setShowPrintMargin(false);
editor.commands.addCommand({
    name: 'compileAndRun',
    bindKey: { win: 'Ctrl-Enter', mac: 'Command-Enter' },
    exec: function (editor) { updateShader(); },
    readOnly: true
});
editor.setValue(shader_fragment_source);
editor.blockScrolling = Infinity;

function getMousePos(glCanvas, evt) {
    let rect = glCanvas.getBoundingClientRect();
    mousePosX = evt.clientX - rect.left;
    mousePosY = evt.clientY - rect.top;
}

glCanvas.addEventListener('mousemove', function (evt) {
    getMousePos(glCanvas, evt);
}, false);

try {
    GL = glCanvas.getContext("webgl2");
} catch (e) {
    alert("You are not webgl compatible :(");
}

shader_vertex = getShader(shader_vertex_source, GL.VERTEX_SHADER, "VERTEX", GL);
let shader_fragment = getShader(shader_fragment_source, GL.FRAGMENT_SHADER, "FRAGMENT", GL);
SHADER_PROGRAM = GL.createProgram();
GL.attachShader(SHADER_PROGRAM, shader_vertex);
GL.attachShader(SHADER_PROGRAM, shader_fragment);
GL.linkProgram(SHADER_PROGRAM);
let _position = GL.getAttribLocation(SHADER_PROGRAM, "pos");
GL.enableVertexAttribArray(_position);

let triangle_vertex = [
    -1, 1,
    -1, -1,
    1, 1,
    1, -1
];

let TRIANGLE_VERTEX = GL.createBuffer();
GL.bindBuffer(GL.ARRAY_BUFFER, TRIANGLE_VERTEX);
GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(triangle_vertex), GL.STATIC_DRAW);

let triangle_faces = [0, 1, 2, 3];
let TRIANGLE_FACES = GL.createBuffer();
GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangle_faces), GL.STATIC_DRAW);

GL.clearColor(0.0, 0.0, 0.0, 0.0);

updateShader();

let animate = function () {
    if (good) {
        GL.uniform1f(GL.getUniformLocation(SHADER_PROGRAM, "iGlobalTime"), (performance.now() - time_mark) / 1000.0);
        GL.uniform2f(GL.getUniformLocation(SHADER_PROGRAM, "iMouse"), mousePosX, mousePosY);

        GL.viewport(0.0, 0.0, glCanvas.getBoundingClientRect().width, glCanvas.getBoundingClientRect().height);
        GL.clear(GL.COLOR_BUFFER_BIT);
        GL.bindBuffer(GL.ARRAY_BUFFER, TRIANGLE_VERTEX);
        GL.vertexAttribPointer(_position, 2, GL.FLOAT, false, 4 * 2, 0);

        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
        GL.drawElements(GL.TRIANGLE_STRIP, 4, GL.UNSIGNED_SHORT, 0);
        GL.flush();
    }
    //console.log("frame");
    window.requestAnimationFrame(animate);

};
animate();


