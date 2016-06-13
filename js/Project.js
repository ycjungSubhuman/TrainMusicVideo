var Project = {
	//specify filenames of assets here
	assetfiles: [
		'shaders/vertex.glsl',
		'midi/untitled.mid',
		'textures/circle.png',
		'textures/aspalt.png',
		'obj/building/building01.png',
		'obj/building_night/building_night.png',
		'obj/streetlamp/streetlamp.png',
	],
	modelfiles: [
		['goldfish', 'obj/Goldfish/GOLDFISH.obj', 'obj/Goldfish/GOLDFISH.mtl'],
		['building', 'obj/building/building01.obj', 'obj/building/building01.mtl'],
		['nightbuilding', 'obj/building_night/building_night.obj', 'obj/building_night/building_night.mtl'],
		['streetlamp', 'obj/streetlamp/streetlamp.obj', 'obj/streetlamp/streetlamp.mtl'],
	],
	midi: "midi/untitled.mid",
	bpm: 113, 
	loaded: false,
}