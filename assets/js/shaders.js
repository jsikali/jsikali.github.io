const upload = document.getElementById("upload");
const canvas = document.getElementById("original_image");
const ctx = canvas.getContext("2d");
const filteredCanvas = document.getElementById("filtered_image");
const gl = filteredCanvas.getContext("webgl");
const shaderSelect = document.getElementById("shader_select");
const img = new Image();

// shaders..
const vertexShader = 
`
	attribute vec2 a_position;
	varying vec2 v_uv;

	void main()
	{
		v_uv = a_position * 0.5 + 0.5;
		gl_Position = vec4(a_position, 0.0, 1.0);
	}
`;

const grayscaleFrag = 
`
	#	glsl's public static void main string args i guess
	precision mediump float;
	uniform sampler2D u_image;
	varying vec2 v_uv;

	void main()
	{
		vec4 color = texture2D(u_image, v_uv);
		float gray = (color.r + color.g + color.b) / 3.0; // adj when i figure out how to hsl
		gl_FragColor = vec4(gray, gray, gray, color.a);
	}
`;

const invertFrag = 
`
	#	glsl's public static void main string args i guess
	precision mediump float;
	uniform sampler2D u_image;
	varying vec2 v_uv;

	void main()
	{
		vec4 color = texture2D(u_image, v_uv);
		gl_FragColor = vec4(1.0 - color.r, 1.0 - color.g, 1.0 - color.b, color.a);
	}
`;

const noneFrag =
`
	precision mediump float;
	uniform sampler2D u_image;
	varying vec2 v_uv;

	void main()
	{
		gl_FragColor = texture2D(u_image, v_uv);
	}
`

// listeners
upload.addEventListener("change", getFile);
shaderSelect.addEventListener("change", renderFiltered);

// handle image upload
img.onload = () => {
	// have canvas match image (maybe adj to scale, idk)
	canvas.width = img.width;
	canvas.height = img.height;

	filteredCanvas.width = img.width;
	filteredCanvas.height = img.height;

	// put image on canvas
	ctx.drawImage(img, 0, 0);

	// render image w/shaders
	 gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    initTexture();
    initShaders();
    renderFiltered();
};

function getFile(event)
{
	// get files from the upload event
	const file = event.target.files[0];

	if(!file) return;
	img.src = URL.createObjectURL(file);
}

//handle gl stuff
let texture;
let program;

function initTexture()
{
    texture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        img
    );

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

	 gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
}
 //put fragment shader in here to then render image
function useShader(fragmentSource)
{
    const vs = compileShader(vertexShader, gl.VERTEX_SHADER);
    const fs = compileShader(fragmentSource, gl.FRAGMENT_SHADER);

    program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    gl.useProgram(program);
}

function compileShader(source, type)
{
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    {
        console.error(gl.getShaderInfoLog(shader));
    }

    return shader;
}

function drawFullScreenQuad(program)
{
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    const position = gl.getAttribLocation(program, "a_position");
    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

	 // js is so beautiful !!!!!!!!!!!!!!!!11111111
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
            -1,  1,
             1, -1,
             1,  1
        ]),
        gl.STATIC_DRAW
    );

    gl.enableVertexAttribArray(position);

    gl.vertexAttribPointer(
        position,
        2,
        gl.FLOAT,
        false,
        0,
        0
    );

    const uImage = gl.getUniformLocation(program, "u_image");

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.uniform1i(uImage, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function renderFiltered()
{
    if (!img.src) return;
    const program = programs[shaderSelect.value] || programs.none;
    gl.useProgram(program);
    drawFullScreenQuad(program);
}

const programs = {};

function createProgram(vertexSrc, fragmentSrc)
{
    const vs = compileShader(vertexSrc, gl.VERTEX_SHADER);
    const fs = compileShader(fragmentSrc, gl.FRAGMENT_SHADER);

    const program = gl.createProgram();

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    return program;
}

// minimize work by rendering shaders upfront & not repeatedly
function initShaders()
{
    programs.grayscale = createProgram(vertexShader, grayscaleFrag);
    programs.invert = createProgram(vertexShader, invertFrag);
    programs.none = createProgram(vertexShader, noneFrag);
}

const shaders = 
{
	grayscale: grayscaleFrag,
	invert: invertFrag,
	none: noneFrag
};