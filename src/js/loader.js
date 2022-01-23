app.loader
	.add('red',            './assets/red.png')
	.add('green',          './assets/green.png')
	.add('blue',           './assets/blue.png')
	.add('yellow',         './assets/yellow.png')
	.add('purple',         './assets/purple.png')
	.add('bomb',           './assets/bomb.png')
	.add('particle_blast', './assets/particle_blast.png')

app.loader.onProgress.add((e) => {
	//console.log(e.progress)
})

app.loader.onError.add((e) => {
	console.error(e.message)
})

app.loader.onComplete.add(() => {
	const { resources } = app.loader

	app.visual = {
		tile_red       : resources.red.texture,
		tile_green     : resources.green.texture,
		tile_blue      : resources.blue.texture,
		tile_yellow    : resources.yellow.texture,
		tile_purple    : resources.purple.texture,
		tile_bomb      : resources.bomb.texture,
		particle_blast : resources.particle_blast.texture,
	}
})

app.loader.load(() => app.scene.start('Main'))