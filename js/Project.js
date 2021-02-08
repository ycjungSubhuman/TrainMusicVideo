var Project = {
	//specify filenames of assets here
	assetfiles: [
		'TrainMusicVideo/shaders/vertex.glsl',
		'TrainMusicVideo/midi/untitled.mid',
		'TrainMusicVideo/textures/circle.png',
		'TrainMusicVideo/textures/aspalt.png',
		'TrainMusicVideo/textures/aspalt2.png',
		'TrainMusicVideo/textures/lensflare0.png',
		'TrainMusicVideo/obj/building/building01.png',
		'TrainMusicVideo/obj/building_night/building_night.png',
		'TrainMusicVideo/obj/streetlamp/streetlamp.png',
		'TrainMusicVideo/textures/wallpaper.png',
		'TrainMusicVideo/textures/moon.png',
	],
	modelfiles: [
		['deer', 'TrainMusicVideo/obj/Deer/deer.obj', 'TrainMusicVideo/obj/Deer/deer.mtl'],
		['goldfish', 'TrainMusicVideo/obj/Goldfish/GOLDFISH.obj', 'TrainMusicVideo/obj/Goldfish/GOLDFISH.mtl'],
		['taxi', 'TrainMusicVideo/obj/LP670/lp670.obj', 'TrainMusicVideo/obj/LP670/lp670.mtl'],
		['building', 'TrainMusicVideo/obj/building/building01.obj', 'TrainMusicVideo/obj/building/building01.mtl'],
		['nightbuilding', 'TrainMusicVideo/obj/building_night/building_night.obj', 'TrainMusicVideo/obj/building_night/building_night.mtl'],
		['streetlamp', 'TrainMusicVideo/obj/streetlamp/streetlamp.obj', 'TrainMusicVideo/obj/streetlamp/streetlamp.mtl'],
	],
	midi: "TrainMusicVideo/midi/untitled.mid",
	bpm: 113, 
	loaded: false,
}
