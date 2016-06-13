var Project = {
	//specify filenames of assets here
	assetfiles: [
		'shaders/vertex.glsl',
		'midi/untitled.mid',
		'textures/circle.png',
		'textures/aspalt.png',
		'textures/aspalt2.png',
		'textures/lensflare0.png',
		'obj/building/building01.png',
		'obj/building_night/building_night.png',
		'obj/streetlamp/streetlamp.png',
	],
	modelfiles: [
		['deer', 'obj/Deer/deer.obj', 'obj/Deer/deer.mtl'],
		['goldfish', 'obj/Goldfish/GOLDFISH.obj', 'obj/Goldfish/GOLDFISH.mtl'],
		['taxi', 'obj/LP670/lp670.obj', 'obj/LP670/lp670.mtl'],
		['building', 'obj/building/building01.obj', 'obj/building/building01.mtl'],
		['nightbuilding', 'obj/building_night/building_night.obj', 'obj/building_night/building_night.mtl'],
		['streetlamp', 'obj/streetlamp/streetlamp.obj', 'obj/streetlamp/streetlamp.mtl'],
	],
	midi: "midi/untitled.mid",
	bpm: 113, 
	loaded: false,
}