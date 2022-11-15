const string = "d&Sign!s";
const size = 250;
const fontFile = "NeueHaasDisplayBlack.ttf";
const showText = true;
const textAlpha = 1;
const backgroundColor = 0;
const strokeAlpha = 60;
const strokeColor = 255;


const fontSampleFactor = 0.3;

const noiseZoom = 0.006;
const noiseOctaves = 4;
const noiseFalloff = 0.3;

const zOffsetChange = 0;
const individualZOffset = 0;

const lineSpeed = .5;

const newPointsCount = 9;


let font;
let points = [];
let startingPoints;

function preload() {
	font = loadFont(fontFile);

}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	textFont(font);
	textSize(size);
	stroke(strokeColor, strokeAlpha);
	noiseDetail(noiseOctaves, noiseFalloff);

	startingPoints = font.textToPoints(string, width / 2 - textWidth(string) / 2, height / 2, size, {"sampleFactor": fontSampleFactor});

	for (let p = 0; p < startingPoints.length; p++) {
		points[p] = startingPoints[p];
		points[p].zOffset = random();
	}
}

function draw() {
	if(showText){
		noStroke();
		text(string, width / 2 - textWidth(string) / 2, height);
		stroke(strokeColor, strokeAlpha);
	}
	for (let pt = 0; pt < points.length; pt++) {
		let p = points[pt];
		let noiseX = p.x * noiseZoom;
		let noiseY = p.y * noiseZoom;
		let noiseZ = frameCount * zOffsetChange + p.zOffset*individualZOffset;
		let newPX = p.x + map(noise(noiseX, noiseY, noiseZ), 0, 1, -lineSpeed, lineSpeed);
		let newPY = p.y + map(noise(noiseX, noiseY, noiseZ + 214), 0, 1, -lineSpeed, lineSpeed);
		line(p.x, p.y, newPX, newPY);
		p.x = newPX;
		p.y = newPY;
	}
}

function keyPressed() {
	if (key == 's') {
		save();
	}
}

function mouseDragged() {
	for (let i = 0; i < newPointsCount; i++) {
		let angle = random(TAU);
		let magnitude = randomGaussian() * ((newPointsCount-1)**0.5*3);
		let newPoint = {
			"x": mouseX + magnitude * cos(angle),
			"y": mouseY + magnitude * sin(angle),
			"zOffset": random()
		};
		points[points.length] = newPoint;
		startingPoints[startingPoints.length] = newPoint;
	}
}
